# 🔐 JWT + Cookies Demo — Panel Administrador

> **Proyecto educativo** | Spring Boot + Spring Security + JWT + Cookies HTTP + Vanilla JS

Panel administrativo para demostrar autenticación JWT con manejo de cookies HTTP. Ideal para presentaciones universitarias y demostraciones técnicas.

---

## 🚀 Cómo ejecutar

### Requisitos

| Herramienta | Versión mínima |
|-------------|---------------|
| Java JDK    | 17+           |
| Maven       | 3.8+          |

### Pasos

```bash
# 1. Entrar al directorio del backend
cd backend

# 2. Compilar y ejecutar
mvn spring-boot:run

# 3. Abrir en el navegador
http://localhost:8080
```

### Credenciales de demo

| Usuario | Contraseña | Rol        |
|---------|------------|------------|
| admin   | 123456     | ROLE_ADMIN |
| user    | password   | ROLE_USER  |

---

## 📁 Estructura del Proyecto

```
JWT_COOKIES/
└── backend/
    ├── pom.xml
    └── src/
        ├── main/
        │   ├── java/com/demo/jwtcookies/
        │   │   ├── JwtCookiesApplication.java      ← Punto de entrada
        │   │   ├── config/
        │   │   │   └── SecurityConfig.java         ← Configuración Spring Security
        │   │   ├── controller/
        │   │   │   ├── AuthController.java         ← Login / Logout
        │   │   │   ├── JwtController.java          ← Info del JWT
        │   │   │   ├── CookieController.java       ← CRUD de Cookies
        │   │   │   └── PrivateController.java      ← Endpoint protegido
        │   │   ├── dto/
        │   │   │   ├── LoginRequest.java
        │   │   │   └── LoginResponse.java
        │   │   ├── filter/
        │   │   │   └── JwtAuthenticationFilter.java ← Filtro JWT
        │   │   ├── security/
        │   │   │   └── JwtUtil.java                ← Generación/validación JWT
        │   │   └── service/
        │   │       └── UserDetailsServiceImpl.java ← Usuarios en memoria
        │   └── resources/
        │       ├── application.properties
        │       └── static/                         ← Frontend
        │           ├── index.html                  ← Login
        │           ├── dashboard.html              ← Dashboard
        │           ├── css/
        │           │   ├── login.css
        │           │   └── dashboard.css
        │           └── js/
        │               ├── login.js
        │               └── dashboard.js
        └── test/
            └── java/com/demo/jwtcookies/
                └── JwtCookiesApplicationTests.java
```

---

## 🛠️ API Endpoints

### Autenticación

| Método | Endpoint           | Descripción              | Auth |
|--------|--------------------|--------------------------|------|
| POST   | `/api/auth/login`  | Iniciar sesión → JWT     | ❌   |
| POST   | `/api/auth/logout` | Cerrar sesión → borrar cookie | ✅ |

**Login Request:**
```json
POST /api/auth/login
{ "username": "admin", "password": "123456" }
```

**Login Response:**
```json
{
  "username": "admin",
  "role": "ROLE_ADMIN",
  "expiresIn": 3600,
  "message": "✅ Login exitoso. JWT generado y guardado en cookie HttpOnly."
}
```

---

### JWT

| Método | Endpoint        | Descripción                     | Auth |
|--------|-----------------|---------------------------------|------|
| GET    | `/api/jwt/info` | Info + decodificación del JWT   | ✅   |

---

### Cookies

| Método | Endpoint                  | Descripción         | Auth |
|--------|---------------------------|---------------------|------|
| GET    | `/api/cookies`            | Listar todas        | ❌   |
| POST   | `/api/cookies`            | Crear nueva cookie  | ❌   |
| PUT    | `/api/cookies/{name}`     | Actualizar valor    | ❌   |
| DELETE | `/api/cookies/{name}`     | Eliminar cookie     | ❌   |

---

### Protegida

| Método | Endpoint      | Descripción                     | Auth |
|--------|---------------|---------------------------------|------|
| GET    | `/api/private`| Solo con JWT válido → 200/403   | ✅   |

---

## 🧠 Conceptos demostrados

### JWT (JSON Web Token)

```
eyJhbGciOiJIUzI1NiJ9          ← Header  (algoritmo)
.eyJzdWIiOiJhZG1pbiJ9         ← Payload (claims: sub, role, iat, exp)
.SflKxwRJSMeKKF2QT4fwpMeJ...  ← Signature (HMAC-SHA256)
```

**Claims del token:**
- `sub` — username del usuario
- `role` — rol (ROLE_ADMIN / ROLE_USER)
- `iat` — timestamp de emisión
- `exp` — timestamp de expiración (1 hora)

---

### Cookies HTTP

| Cookie       | HttpOnly | Descripción                           |
|--------------|----------|---------------------------------------|
| `JWT_TOKEN`  | ✅ Sí    | Token JWT (protegido contra XSS)      |
| `USER_INFO`  | ❌ No    | Info básica del usuario (JS la lee)   |

**¿Por qué HttpOnly?** Previene que JavaScript malintencionado lea el JWT (ataques XSS).

---

### Flujo de autenticación

```
1. Usuario → POST /api/auth/login { username, password }
2. Spring Security verifica credenciales (BCrypt)
3. Backend genera JWT (HMAC-SHA256, 1 hora)
4. Backend → Set-Cookie: JWT_TOKEN=<jwt>; HttpOnly; Path=/
5. Navegador guarda la cookie automáticamente
6. Cada petición siguiente envía la cookie
7. JwtAuthenticationFilter lee y valida el JWT
8. Spring Security establece la autenticación
```

---

## 🎨 Tecnologías

| Layer    | Tecnología               |
|----------|--------------------------|
| Backend  | Java 17, Spring Boot 3.2 |
| Security | Spring Security 6        |
| JWT      | jjwt 0.12.3              |
| Build    | Maven                    |
| Frontend | HTML5, CSS3, Vanilla JS  |
| Diseño   | Dark theme, glassmorphism |

---

## ✅ Ejecutar tests

```bash
cd backend
mvn test
```

---

*Proyecto educativo — Presentación universitaria sobre JWT y Cookies HTTP*
