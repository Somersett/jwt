package com.demo.jwtcookies.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.*;

/**
 * ============================================================
 *  CookieController - CRUD de Cookies HTTP
 * ============================================================
 *
 *  GET    /api/cookies         → Listar todas las cookies
 *  POST   /api/cookies         → Crear nueva cookie
 *  PUT    /api/cookies/{name}  → Actualizar valor de cookie
 *  DELETE /api/cookies/{name}  → Eliminar cookie
 *
 *  Conceptos importantes de Cookies HTTP:
 *
 *  - HttpOnly: la cookie NO es accesible por JavaScript.
 *              Protege contra XSS. El JWT_TOKEN usa este flag.
 *
 *  - Secure:   la cookie solo se envia por HTTPS.
 *              En desarrollo puede ser false.
 *
 *  - SameSite: controla cuándo se envia la cookie con
 *              peticiones cross-site (Lax/Strict/None).
 *
 *  - Path:     la cookie solo se envia para rutas que
 *              coincidan con el path especificado.
 *
 *  - MaxAge:   segundos hasta que expire la cookie.
 *              MaxAge=0 elimina la cookie.
 * ============================================================
 */
@RestController
@RequestMapping("/api/cookies")
public class CookieController {

    // ─────────────────────────────────────────────────────────
    //  GET /api/cookies  → Listar cookies
    // ─────────────────────────────────────────────────────────

    /**
     * Lista TODAS las cookies que el navegador envio en la peticion.
     * Incluye cookies HttpOnly (el servidor puede leerlas aunque JS no).
     */
    @GetMapping
    ResponseEntity<?> listCookies(HttpServletRequest request) {
        jakarta.servlet.http.Cookie[] cookies = request.getCookies();

        List<Map<String, Object>> cookieList = new ArrayList<>();

        if (cookies != null) {
            for (jakarta.servlet.http.Cookie cookie : cookies) {
                Map<String, Object> info = new LinkedHashMap<>();
                info.put("name",     cookie.getName());
                info.put("value",    cookie.getValue());
                info.put("path",     cookie.getPath() != null ? cookie.getPath() : "/");
                info.put("maxAge",   cookie.getMaxAge());
                info.put("httpOnly", cookie.isHttpOnly());
                info.put("secure",   cookie.getSecure());
                info.put("domain",   cookie.getDomain() != null ? cookie.getDomain() : "localhost");
                cookieList.add(info);
            }
        }

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("count",   cookieList.size());
        response.put("cookies", cookieList);
        response.put("note",    "Las cookies HttpOnly no son accesibles por JavaScript, " +
                "solo el servidor puede leerlas.");

        return ResponseEntity.ok(response);
    }

    // ─────────────────────────────────────────────────────────
    //  POST /api/cookies  → Crear cookie
    // ─────────────────────────────────────────────────────────

    /**
     * Crea una nueva cookie con los parametros especificados.
     *
     * Body JSON esperado:
     * {
     *   "name":     "mi-cookie",        (requerido)
     *   "value":    "mi-valor",         (requerido)
     *   "maxAge":   3600,               (opcional, default: 3600)
     *   "httpOnly": false,              (opcional, default: false)
     *   "sameSite": "Lax"              (opcional, default: "Lax")
     * }
     */
    @PostMapping
    ResponseEntity<?> createCookie(
            @RequestBody Map<String, Object> body,
            HttpServletResponse response) {

        String name = (String) body.get("name");
        String value = (String) body.getOrDefault("value", "");

        if (name == null || name.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error",   "Nombre requerido",
                    "message", "El campo 'name' es obligatorio"
            ));
        }

        // Prevenir sobreescribir cookies del sistema
        if ("JWT_TOKEN".equals(name)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error",   "Operacion no permitida",
                    "message", "No se puede modificar la cookie JWT_TOKEN desde este endpoint"
            ));
        }

        int     maxAge   = body.containsKey("maxAge")   ? (Integer) body.get("maxAge")  : 3600;
        boolean httpOnly = body.containsKey("httpOnly") && Boolean.TRUE.equals(body.get("httpOnly"));
        String  sameSite = (String) body.getOrDefault("sameSite", "Lax");

        ResponseCookie cookie = ResponseCookie.from(name, value)
                .httpOnly(httpOnly)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofSeconds(maxAge))
                .sameSite(sameSite)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(Map.of(
                "message",  "✅ Cookie '" + name + "' creada exitosamente",
                "name",     name,
                "value",    value,
                "maxAge",   maxAge,
                "httpOnly", httpOnly
        ));
    }

    // ─────────────────────────────────────────────────────────
    //  PUT /api/cookies/{name}  → Actualizar cookie
    // ─────────────────────────────────────────────────────────

    /**
     * Actualiza el valor de una cookie existente.
     * Tecnicamente se sobreescribe con Set-Cookie.
     *
     * Body JSON:
     * {
     *   "value":  "nuevo-valor",
     *   "maxAge": 7200
     * }
     */
    @PutMapping("/{name}")
    ResponseEntity<?> updateCookie(
            @PathVariable String name,
            @RequestBody Map<String, Object> body,
            HttpServletResponse response) {

        if ("JWT_TOKEN".equals(name)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "No se puede modificar JWT_TOKEN desde este endpoint"
            ));
        }

        String value  = (String) body.getOrDefault("value", "");
        int    maxAge = body.containsKey("maxAge") ? (Integer) body.get("maxAge") : 3600;

        ResponseCookie cookie = ResponseCookie.from(name, value)
                .httpOnly(false)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofSeconds(maxAge))
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(Map.of(
                "message", "✅ Cookie '" + name + "' actualizada exitosamente",
                "name",    name,
                "value",   value
        ));
    }

    // ─────────────────────────────────────────────────────────
    //  DELETE /api/cookies/{name}  → Eliminar cookie
    // ─────────────────────────────────────────────────────────

    /**
     * Elimina una cookie estableciendo maxAge=0.
     * El navegador elimina la cookie al recibir Set-Cookie con maxAge=0.
     */
    @DeleteMapping("/{name}")
    ResponseEntity<?> deleteCookie(
            @PathVariable String name,
            HttpServletResponse response) {

        if ("JWT_TOKEN".equals(name)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Para eliminar el JWT usa POST /api/auth/logout"
            ));
        }

        ResponseCookie cookie = ResponseCookie.from(name, "")
                .httpOnly(false)
                .secure(false)
                .path("/")
                .maxAge(Duration.ZERO)   // maxAge=0 → el navegador elimina la cookie
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(Map.of(
                "message", "✅ Cookie '" + name + "' eliminada exitosamente"
        ));
    }
}
