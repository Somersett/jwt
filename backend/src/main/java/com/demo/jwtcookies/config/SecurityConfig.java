package com.demo.jwtcookies.config;

import com.demo.jwtcookies.filter.JwtAuthenticationFilter;
import com.demo.jwtcookies.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * ============================================================
 *  SecurityConfig - Configuracion de Spring Security
 * ============================================================
 *
 *  Configura la seguridad de la aplicacion:
 *
 *  - CSRF deshabilitado (usamos JWT stateless, no sesiones)
 *  - Sesiones STATELESS (no se crean sesiones HTTP)
 *  - Rutas publicas y protegidas
 *  - Filtro JWT personalizado
 *  - Proveedor de autenticacion con BCrypt
 *
 *  Diferencias con Spring Security < 6.x:
 *  - Ya NO se extiende WebSecurityConfigurerAdapter
 *  - Se usan @Bean en lugar de overrides
 *  - Lambda DSL para configuracion fluida
 * ============================================================
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    @Lazy  // Evita dependencia circular con el filtro
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    /**
     * Configura la cadena de filtros de seguridad.
     * Este bean reemplaza el antiguo configure(HttpSecurity) de WebSecurityConfigurerAdapter.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // ── Deshabilitar CSRF ─────────────────────────────────
                // No necesario en APIs REST stateless con JWT
                .csrf(AbstractHttpConfigurer::disable)

                // ── Politica de sesion STATELESS ──────────────────────
                // No crear ni usar sesiones HTTP (el JWT es el estado)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // ── Reglas de autorizacion ────────────────────────────
                .authorizeHttpRequests(auth -> auth

                        // Endpoints de autenticacion: publicos
                        .requestMatchers("/api/auth/**").permitAll()

                        // Recursos estaticos (frontend): publicos
                        .requestMatchers(
                                "/",
                                "/index.html",
                                "/dashboard.html",
                                "/css/**",
                                "/js/**",
                                "/favicon.ico",
                                "/*.html",
                                "/*.css",
                                "/*.js"
                        ).permitAll()

                        // Endpoint privado: requiere autenticacion JWT valida
                        .requestMatchers("/api/private").authenticated()

                        // Otros endpoints API: accesibles (el filtro JWT establece auth si hay token)
                        .anyRequest().permitAll()
                )

                // ── Proveedor de autenticacion ────────────────────────
                .authenticationProvider(authenticationProvider())

                // ── Agregar filtro JWT antes del filtro de autenticacion
                // El JwtAuthenticationFilter se ejecuta ANTES de que Spring
                // Security intente autenticar con username/password
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    /**
     * Proveedor de autenticacion que usa UserDetailsService + BCrypt.
     * Spring Security lo usa durante el login (AuthenticationManager).
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    /**
     * AuthenticationManager: orquesta el proceso de autenticacion.
     * Los controllers lo inyectan para autenticar credenciales.
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * BCryptPasswordEncoder: hashea y verifica contraseñas.
     * BCrypt es resistente a ataques de fuerza bruta.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
