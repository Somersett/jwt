package com.demo.jwtcookies.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * ============================================================
 *  UserDetailsServiceImpl - Servicio de Usuarios en Memoria
 * ============================================================
 *
 *  En este proyecto educativo los usuarios están "hardcodeados"
 *  en memoria. En producción se usaría una base de datos.
 *
 *  Spring Security llama a loadUserByUsername() durante:
 *  1. El proceso de autenticación (login)
 *  2. La validación de tokens JWT (en el filtro)
 * ============================================================
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    // Mapa: username -> password (hasheado con BCrypt)
    private final Map<String, String[]> users = new HashMap<>();

    public UserDetailsServiceImpl() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Formato: username -> [passwordHash, role]
        users.put("admin", new String[]{
                encoder.encode("123456"),
                "ROLE_ADMIN"
        });
        users.put("user", new String[]{
                encoder.encode("password"),
                "ROLE_USER"
        });
    }

    /**
     * Carga los detalles del usuario por username.
     * Spring Security usa este método para autenticar al usuario.
     *
     * @param username el nombre de usuario a buscar
     * @return UserDetails con username, password hasheado y roles
     * @throws UsernameNotFoundException si el usuario no existe
     */
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        String[] userData = users.get(username);

        if (userData == null) {
            throw new UsernameNotFoundException(
                    "Usuario no encontrado: " + username);
        }

        String passwordHash = userData[0];
        String role         = userData[1];

        return User.builder()
                .username(username)
                .password(passwordHash)   // BCrypt hash
                .authorities(role)        // Roles/autoridades
                .accountExpired(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
