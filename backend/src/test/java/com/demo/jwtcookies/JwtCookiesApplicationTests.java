package com.demo.jwtcookies;

import com.demo.jwtcookies.security.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JwtCookiesApplicationTests {

    @Autowired
    private JwtUtil jwtUtil;

    @Test
    void contextLoads() {
        // Verifica que el contexto de Spring Boot cargue correctamente
        assertNotNull(jwtUtil);
    }

    @Test
    void testGenerateAndValidateToken() {
        String token = jwtUtil.generateToken("admin", "ROLE_ADMIN");
        assertNotNull(token);
        assertTrue(token.contains("."), "El JWT debe tener 3 partes separadas por puntos");
        assertEquals(3, token.split("\\.").length, "El JWT debe tener exactamente 3 partes");
    }

    @Test
    void testExtractUsername() {
        String token    = jwtUtil.generateToken("testuser", "ROLE_USER");
        String username = jwtUtil.extractUsername(token);
        assertEquals("testuser", username);
    }

    @Test
    void testExtractRole() {
        String token = jwtUtil.generateToken("admin", "ROLE_ADMIN");
        String role  = jwtUtil.extractRole(token);
        assertEquals("ROLE_ADMIN", role);
    }

    @Test
    void testTokenIsValid() {
        String token = jwtUtil.generateToken("admin", "ROLE_ADMIN");
        assertTrue(jwtUtil.isTokenValid(token), "El token recien generado debe ser valido");
    }

    @Test
    void testInvalidTokenReturnsFalse() {
        assertFalse(jwtUtil.isTokenValid("esto.no.es.un.token.valido"));
    }

    @Test
    void testTokenExpiration() {
        String token      = jwtUtil.generateToken("admin", "ROLE_ADMIN");
        Date   expiration = jwtUtil.extractExpiration(token);
        assertNotNull(expiration);
        assertTrue(expiration.after(new Date()), "La expiracion debe ser en el futuro");
    }
}
