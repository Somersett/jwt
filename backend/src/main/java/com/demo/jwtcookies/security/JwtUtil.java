package com.demo.jwtcookies.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * ============================================================
 *  JwtUtil - Utilidades para JSON Web Tokens
 * ============================================================
 *
 *  Responsabilidades:
 *  - Generar tokens JWT firmados con HMAC-SHA256
 *  - Validar tokens (firma + expiración)
 *  - Extraer claims (username, role, fechas)
 *
 *  Estructura de un JWT:
 *  [Header].[Payload].[Signature]
 *
 *  Header:  {"alg":"HS256","typ":"JWT"}
 *  Payload: {"sub":"admin","role":"ROLE_ADMIN","iat":...,"exp":...}
 *  Firma:   HMACSHA256(base64(header)+"."+base64(payload), secret)
 * ============================================================
 */
@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationMs;

    // ─────────────────────────────────────────────────────────
    //  CLAVE DE FIRMA
    // ─────────────────────────────────────────────────────────

    /**
     * Genera la clave secreta HMAC-SHA256 a partir del valor en application.properties.
     * La clave debe tener al menos 256 bits (32 caracteres) para HS256.
     */
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // ─────────────────────────────────────────────────────────
    //  GENERACION DEL TOKEN
    // ─────────────────────────────────────────────────────────

    /**
     * Genera un JWT con la siguiente estructura de claims:
     *  - sub  (subject)   : username del usuario
     *  - role             : rol del usuario (ej: ROLE_ADMIN)
     *  - iat  (issuedAt)  : timestamp de creación
     *  - exp  (expiration): timestamp de expiración (ahora + 1 hora)
     *
     * @param username nombre de usuario
     * @param role     rol del usuario
     * @return token JWT firmado en formato compact: header.payload.signature
     */
    public String generateToken(String username, String role) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", role);

        long nowMs      = System.currentTimeMillis();
        Date issuedAt   = new Date(nowMs);
        Date expiration = new Date(nowMs + expirationMs);

        return Jwts.builder()
                .claims(extraClaims)        // Claims personalizados
                .subject(username)          // "sub"
                .issuedAt(issuedAt)         // "iat"
                .expiration(expiration)     // "exp"
                .signWith(getSigningKey())  // Firma HMAC-SHA256
                .compact();                 // Serializa a String
    }

    // ─────────────────────────────────────────────────────────
    //  EXTRACCION DE CLAIMS
    // ─────────────────────────────────────────────────────────

    /**
     * Parsea y verifica el token, retornando todos los claims del payload.
     * Lanza JwtException si la firma es inválida o el token está expirado.
     */
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())     // Verifica la firma
                .build()
                .parseSignedClaims(token)        // Parsea y verifica
                .getPayload();                   // Retorna el payload (Claims)
    }

    /** Extrae el username (claim "sub") del token */
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    /** Extrae la fecha de expiración (claim "exp") */
    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    /** Extrae la fecha de emisión (claim "iat") */
    public Date extractIssuedAt(String token) {
        return extractAllClaims(token).getIssuedAt();
    }

    /** Extrae el rol del usuario (claim "role") */
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    // ─────────────────────────────────────────────────────────
    //  VALIDACION
    // ─────────────────────────────────────────────────────────

    /**
     * Valida el token verificando:
     *  1. Que la firma sea correcta (usando la clave secreta)
     *  2. Que el token no haya expirado
     *
     * @param token JWT a validar
     * @return true si el token es válido, false en caso contrario
     */
    public boolean isTokenValid(String token) {
        try {
            Claims claims = extractAllClaims(token);
            return !claims.getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    /** Retorna los milisegundos configurados de expiración */
    public long getExpirationMs() {
        return expirationMs;
    }
}
