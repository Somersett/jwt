package com.demo.jwtcookies.filter;

import com.demo.jwtcookies.security.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * ============================================================
 *  JwtAuthenticationFilter - Filtro de Autenticacion JWT
 * ============================================================
 *
 *  Este filtro intercepta CADA peticion HTTP y:
 *
 *  1. Busca el token JWT en las cookies (cookie "JWT_TOKEN")
 *  2. Si no encuentra en cookie, busca en el header Authorization
 *  3. Si el token existe y es válido:
 *     a. Extrae el username del token
 *     b. Carga los detalles del usuario
 *     c. Establece la autenticación en el SecurityContext
 *  4. Continua la cadena de filtros
 *
 *  Flujo de autenticacion stateless:
 *  Request -> JwtFilter -> SecurityContext -> Controller
 *
 *  Extiende OncePerRequestFilter para ejecutarse solo 1 vez
 *  por peticion (evita ejecuciones duplicadas).
 * ============================================================
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private static final String JWT_COOKIE_NAME = "JWT_TOKEN";

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest  request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain         filterChain
    ) throws ServletException, IOException {

        // ── 1. Extraer el token JWT ──────────────────────────
        String token = extractTokenFromCookie(request);

        if (token == null) {
            // Fallback: buscar en el header Authorization: Bearer <token>
            token = extractTokenFromHeader(request);
        }

        // ── 2. Validar y autenticar ──────────────────────────
        if (token != null && jwtUtil.isTokenValid(token)) {
            String username = jwtUtil.extractUsername(token);

            // Solo autenticar si no hay autenticacion previa en el contexto
            if (username != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(username);

                // Crear el objeto de autenticacion
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                // Agregar detalles de la peticion (IP, session, etc.)
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // ── 3. Establecer en el SecurityContext ──────
                SecurityContextHolder.getContext().setAuthentication(authToken);

                log.debug("✅ JWT válido - Usuario autenticado: {} | Ruta: {} {}",
                        username, request.getMethod(), request.getRequestURI());
            }
        }

        // ── 4. Continuar la cadena de filtros ─────────────────
        filterChain.doFilter(request, response);
    }

    /**
     * Extrae el JWT de las cookies HTTP.
     * El token se guarda en la cookie "JWT_TOKEN" (HttpOnly).
     */
    private String extractTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (JWT_COOKIE_NAME.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    /**
     * Extrae el JWT del header Authorization.
     * Formato esperado: "Authorization: Bearer <token>"
     */
    private String extractTokenFromHeader(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}
