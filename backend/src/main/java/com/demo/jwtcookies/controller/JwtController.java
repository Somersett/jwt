package com.demo.jwtcookies.controller;

import com.demo.jwtcookies.security.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * ============================================================
 *  JwtController - Informacion y decodificacion del JWT
 * ============================================================
 *
 *  GET /api/jwt/info  → Retorna info completa del JWT actual
 *
 *  Este endpoint:
 *  1. Lee el JWT de la cookie HttpOnly (el JS no puede hacerlo)
 *  2. Lo decodifica y retorna header, payload y metadatos
 *  3. El frontend puede mostrar esta info sin acceder al token
 *
 *  Estructura de un JWT (base64url):
 *  eyJhbGciOiJIUzI1NiJ9  ← Header
 *  .eyJzdWIiOiJhZG1pbiJ9 ← Payload
 *  .SflKxwRJSMeKKF2QT4fw  ← Signature
 * ============================================================
 */
@RestController
@RequestMapping("/api/jwt")
public class JwtController {

    @Autowired
    private JwtUtil jwtUtil;

    // ─────────────────────────────────────────────────────────
    //  GET /api/jwt/info
    // ─────────────────────────────────────────────────────────

    /**
     * Retorna informacion completa sobre el JWT almacenado en cookie.
     *
     * Response incluye:
     * - token:      El token completo (para visualizacion)
     * - header:     JSON decodificado del header
     * - payload:    JSON decodificado del payload
     * - username:   Claim "sub"
     * - role:       Claim "role"
     * - issuedAt:   Timestamp de creacion
     * - expiration: Timestamp de expiracion
     * - isValid:    true/false
     */
    @GetMapping("/info")
    ResponseEntity<?> getJwtInfo(HttpServletRequest request) {

        String token = extractTokenFromCookie(request);

        // ── Sin token ────────────────────────────────────────
        if (token == null) {
            return ResponseEntity.status(401).body(Map.of(
                    "error",   "No hay token JWT",
                    "message", "No se encontro la cookie JWT_TOKEN. Por favor inicia sesion."
            ));
        }

        // ── Token invalido o expirado ─────────────────────────
        if (!jwtUtil.isTokenValid(token)) {
            return ResponseEntity.status(401).body(Map.of(
                    "error",   "Token invalido o expirado",
                    "message", "El JWT no es valido o ha expirado. Inicia sesion nuevamente."
            ));
        }

        // ── Decodificar y retornar info ───────────────────────
        try {
            Claims claims = jwtUtil.extractAllClaims(token);

            // Decodificar header y payload de base64url a JSON legible
            String[] parts      = token.split("\\.");
            String   headerJson  = decodeBase64Url(parts[0]);
            String   payloadJson = decodeBase64Url(parts[1]);

            // Calcular tiempo restante en segundos
            long nowMs       = System.currentTimeMillis();
            long expMs       = claims.getExpiration().getTime();
            long remainingSec = Math.max(0, (expMs - nowMs) / 1000);

            // Usar LinkedHashMap para mantener orden en la respuesta JSON
            Map<String, Object> info = new LinkedHashMap<>();
            info.put("token",          token);
            info.put("header",         headerJson);
            info.put("payload",        payloadJson);
            info.put("username",       claims.getSubject());
            info.put("role",           claims.get("role", String.class));
            info.put("issuedAt",       claims.getIssuedAt().toString());
            info.put("issuedAtMs",     claims.getIssuedAt().getTime());
            info.put("expiration",     claims.getExpiration().toString());
            info.put("expirationMs",   expMs);
            info.put("remainingSec",   remainingSec);
            info.put("isValid",        true);

            return ResponseEntity.ok(info);

        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of(
                    "error",   "Error procesando JWT",
                    "message", e.getMessage()
            ));
        }
    }

    // ─────────────────────────────────────────────────────────
    //  Metodos privados
    // ─────────────────────────────────────────────────────────

    private String extractTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("JWT_TOKEN".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    /**
     * Decodifica una cadena base64url (sin padding) a String UTF-8.
     * Los JWT usan base64url que puede no tener padding '='.
     */
    private String decodeBase64Url(String encoded) {
        // Agregar padding si es necesario
        int mod = encoded.length() % 4;
        if (mod != 0) {
            encoded = encoded + "=".repeat(4 - mod);
        }
        byte[] decoded = Base64.getUrlDecoder().decode(encoded);
        return new String(decoded, java.nio.charset.StandardCharsets.UTF_8);
    }
}
