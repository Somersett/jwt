package com.demo.jwtcookies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * ============================================================
 *  JWT Cookies Demo - Aplicacion Principal
 *  Proyecto educativo: Autenticacion JWT + Manejo de Cookies
 *  Tecnologias: Spring Boot 3, Spring Security, jjwt 0.12
 * ============================================================
 */
@SpringBootApplication
public class JwtCookiesApplication {

    public static void main(String[] args) {
        SpringApplication.run(JwtCookiesApplication.class, args);
        System.out.println("""

                ╔══════════════════════════════════════════════════╗
                ║        JWT + COOKIES DEMO - SERVIDOR LISTO       ║
                ║                                                  ║
                ║   Frontend:  http://localhost:8080               ║
                ║   Login:     http://localhost:8080/index.html    ║
                ║   API Docs:  http://localhost:8080/api/          ║
                ║                                                  ║
                ║   Usuario: admin  |  Contrasena: 123456          ║
                ╚══════════════════════════════════════════════════╝
                """);
    }
}
