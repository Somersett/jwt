package com.demo.jwtcookies.dto;

/**
 * DTO para la peticion de login.
 * El cliente envia este JSON en el body de POST /api/auth/login
 *
 * Ejemplo:
 * {
 *   "username": "admin",
 *   "password": "123456"
 * }
 */
public class LoginRequest {

    private String username;
    private String password;

    public LoginRequest() {}

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
