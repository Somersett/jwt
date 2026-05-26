package com.demo.jwtcookies.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * ============================================================
 *  PrivateController - Endpoint Protegido por JWT
 * ============================================================
 *
 *  GET /api/private  → Solo accesible con JWT valido
 *
 *  Este endpoint demuestra como proteger rutas con JWT.
 *  Si el JWT esta ausente, expirado o invalido:
 *    → Spring Security retorna 403 Forbidden
 *
 *  Si el JWT es valido:
 *    → Se retorna un mensaje de acceso autorizado
 *    → Se incluye info del usuario autenticado
 *
 *  La proteccion es configurada en SecurityConfig:
 *  .requestMatchers("/api/private").authenticated()
 * ============================================================
 */
@RestController
@RequestMapping("/api")
public class PrivateController {

    /**
     * Endpoint privado protegido por JWT.
     * Spring Security verifica el JWT antes de llegar aqui.
     */
    @GetMapping("/private")
    ResponseEntity<?> privateEndpoint() {

        // Obtener la autenticacion del SecurityContext
        // (fue establecida por JwtAuthenticationFilter)
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status",      "✅ ACCESO AUTORIZADO");
        response.put("message",     "Acceso autorizado mediante JWT");
        response.put("username",    auth.getName());
        response.put("authorities", auth.getAuthorities().toString());
        response.put("timestamp",   timestamp);
        response.put("description", "Este endpoint esta protegido por Spring Security + JWT. " +
                "Solo usuarios con un token JWT valido pueden acceder.");
        response.put("securityInfo", Map.of(
                "authType",    "JWT Bearer Token (via HttpOnly Cookie)",
                "stateless",   true,
                "sessionUsed", false
        ));

        return ResponseEntity.ok(response);
    }
}
