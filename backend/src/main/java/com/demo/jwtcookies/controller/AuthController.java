package com.demo.jwtcookies.controller;

import com.demo.jwtcookies.dto.LoginRequest;
import com.demo.jwtcookies.dto.LoginResponse;
import com.demo.jwtcookies.security.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Map;

/**
 * ============================================================
 *  AuthController - Endpoints de Autenticacion
 * ============================================================
 *
 *  POST /api/auth/login   → Autenticar usuario y generar JWT
 *  POST /api/auth/logout  → Cerrar sesion y eliminar cookie
 *
 *  Flujo de Login:
 *  1. Cliente envia { username, password }
 *  2. Spring Security verifica credenciales (BCrypt)
 *  3. Se genera un JWT con username y role
 *  4. El JWT se guarda en una cookie HttpOnly (segura contra XSS)
 *  5. Se retorna la respuesta con info del usuario
 * ============================================================
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${cookie.secure:false}")
    private boolean cookieSecure;

    @Value("${cookie.maxAge:3600}")
    private int cookieMaxAge;

    // ─────────────────────────────────────────────────────────
    //  POST /api/auth/login
    // ─────────────────────────────────────────────────────────

    /**
     * Autentica al usuario y genera el JWT.
     *
     * - Verifica username/password contra UserDetailsService
     * - Genera JWT con claims: username, role, iat, exp
     * - Establece 2 cookies:
     *     JWT_TOKEN  : HttpOnly=true  (no accesible por JS, seguro)
     *     USER_INFO  : HttpOnly=false (accesible por JS para mostrar info)
     */
    @PostMapping("/login")
    ResponseEntity<?> login(
            @RequestBody LoginRequest request,
            HttpServletResponse response) {

        try {
            // ── Autenticar credenciales ──────────────────────
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            UserDetails userDetails = (UserDetails) auth.getPrincipal();
            String role  = userDetails.getAuthorities().iterator().next().getAuthority();
            String token = jwtUtil.generateToken(userDetails.getUsername(), role);

            // ── Cookie 1: JWT_TOKEN (HttpOnly) ───────────────
            // HttpOnly=true significa que JavaScript NO puede leer esta cookie.
            // Esto protege el token contra ataques XSS.
            ResponseCookie jwtCookie = ResponseCookie.from("JWT_TOKEN", token)
                    .httpOnly(true)                      // Proteccion XSS
                    .secure(cookieSecure)                // true en HTTPS
                    .path("/")                           // Disponible en toda la app
                    .maxAge(Duration.ofSeconds(cookieMaxAge))
                    .sameSite("Lax")                     // Proteccion CSRF basica
                    .build();

            // ── Cookie 2: USER_INFO (no HttpOnly) ────────────
            // Accesible por JS para mostrar username/role en el dashboard
            String userInfoValue = userDetails.getUsername() + "|" + role;
            ResponseCookie userCookie = ResponseCookie.from("USER_INFO", userInfoValue)
                    .httpOnly(false)                     // JS puede leerla
                    .secure(cookieSecure)
                    .path("/")
                    .maxAge(Duration.ofSeconds(cookieMaxAge))
                    .sameSite("Lax")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());
            response.addHeader(HttpHeaders.SET_COOKIE, userCookie.toString());

            LoginResponse loginResponse = new LoginResponse(
                    userDetails.getUsername(),
                    role,
                    cookieMaxAge,
                    "✅ Login exitoso. JWT generado y guardado en cookie HttpOnly."
            );

            return ResponseEntity.ok(loginResponse);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401)
                    .body(Map.of(
                            "error",   "Credenciales invalidas",
                            "message", "Usuario o contrasena incorrectos"
                    ));
        }
    }

    // ─────────────────────────────────────────────────────────
    //  POST /api/auth/logout
    // ─────────────────────────────────────────────────────────

    /**
     * Cierra la sesion eliminando las cookies JWT.
     * Para eliminar una cookie, se establece maxAge=0.
     */
    @PostMapping("/logout")
    ResponseEntity<?> logout(HttpServletResponse response) {

        // Eliminar JWT_TOKEN cookie
        ResponseCookie deleteJwt = ResponseCookie.from("JWT_TOKEN", "")
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .maxAge(Duration.ZERO)   // maxAge=0 elimina la cookie
                .sameSite("Lax")
                .build();

        // Eliminar USER_INFO cookie
        ResponseCookie deleteUser = ResponseCookie.from("USER_INFO", "")
                .httpOnly(false)
                .secure(cookieSecure)
                .path("/")
                .maxAge(Duration.ZERO)
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, deleteJwt.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, deleteUser.toString());

        return ResponseEntity.ok(Map.of(
                "message", "✅ Sesion cerrada exitosamente. Cookies eliminadas."
        ));
    }
}
