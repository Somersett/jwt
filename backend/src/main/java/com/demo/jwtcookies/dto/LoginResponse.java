package com.demo.jwtcookies.dto;

/**
 * DTO para la respuesta de login exitoso.
 * El servidor retorna este JSON tras un POST /api/auth/login exitoso.
 *
 * Nota: el token JWT se envia TAMBIEN como cookie HttpOnly.
 * Esta respuesta incluye info no sensible para el frontend.
 *
 * Ejemplo de respuesta:
 * {
 *   "username": "admin",
 *   "role": "ROLE_ADMIN",
 *   "expiresIn": 3600,
 *   "message": "Login exitoso. JWT generado y guardado en cookie."
 * }
 */
public class LoginResponse {

    private String username;
    private String role;
    private long   expiresIn;   // segundos
    private String message;

    public LoginResponse() {}

    public LoginResponse(String username, String role, long expiresIn, String message) {
        this.username  = username;
        this.role      = role;
        this.expiresIn = expiresIn;
        this.message   = message;
    }

    public String getUsername()           { return username; }
    public void   setUsername(String v)   { this.username = v; }

    public String getRole()               { return role; }
    public void   setRole(String v)       { this.role = v; }

    public long   getExpiresIn()          { return expiresIn; }
    public void   setExpiresIn(long v)    { this.expiresIn = v; }

    public String getMessage()            { return message; }
    public void   setMessage(String v)    { this.message = v; }
}
