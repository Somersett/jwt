/**
 * ============================================================
 *  login.js — Lógica de la página de login
 * ============================================================
 *  Maneja:
 *  - Envío del formulario de login
 *  - Comunicación con POST /api/auth/login
 *  - Redirección al dashboard tras login exitoso
 *  - Estados de error y carga
 * ============================================================
 */

'use strict';

// ── Referencias al DOM ──────────────────────────────────────
const loginForm   = document.getElementById('loginForm');
const loginBtn    = document.getElementById('loginBtn');
const btnText     = document.getElementById('btnText');
const btnSpinner  = document.getElementById('btnSpinner');
const btnArrow    = document.getElementById('btnArrow');
const errorBox    = document.getElementById('errorBox');
const errorText   = document.getElementById('errorText');
const togglePwd   = document.getElementById('togglePwd');
const passwordInput = document.getElementById('password');

// ── Redirección si ya está autenticado ──────────────────────
// Verificamos en el SERVIDOR (no solo en la cookie legible por JS).
// Razón: JWT_TOKEN es HttpOnly → JS no puede leerla directamente.
// /api/jwt/info lee la cookie HttpOnly en el servidor y dice si es válida.
(async function checkAuth() {
    try {
        const res = await fetch('/api/jwt/info', { credentials: 'same-origin' });
        if (res.ok) {
            // El servidor confirmó que hay un JWT válido → ya está logueado
            window.location.replace('/dashboard.html');
        }
        // Si res.status es 401 → no hay sesión activa → quedarse en login ✅
    } catch (e) {
        // Error de red → quedarse en login
    }
})();

// ── Mostrar/ocultar contraseña ──────────────────────────────
togglePwd.addEventListener('click', () => {
    const isText = passwordInput.type === 'text';
    passwordInput.type = isText ? 'password' : 'text';
    togglePwd.querySelector('svg').innerHTML = isText
        ? /* ojo cerrado */
          `<path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0
           001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542
           10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512
           1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003
           0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"/><path
           d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335
           6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542
           7 .847 0 1.669-.105 2.454-.303z"/>`
        : /* ojo abierto */
          `<path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path
           fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10
           3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542
           7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018
           0z" clip-rule="evenodd"/>`;
});

// ── Manejo del formulario ───────────────────────────────────
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();

    const username = document.getElementById('username').value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        showError('Por favor completa todos los campos.');
        return;
    }

    setLoading(true);

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'same-origin'   // Incluir cookies en la petición
        });

        const data = await response.json();

        if (response.ok) {
            // ✅ Login exitoso
            // El servidor ya estableció la cookie JWT_TOKEN (HttpOnly)
            // Redirigir al dashboard con animación de salida
            loginBtn.innerHTML = `
                <svg style="width:20px;height:20px" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8
                    8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8
                    12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                ¡Acceso concedido!
            `;
            loginBtn.style.background = 'linear-gradient(135deg,#10b981,#059669)';

            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 700);

        } else {
            // ❌ Error de autenticación
            showError(data.message || data.error || 'Credenciales incorrectas.');
            setLoading(false);
            // Agitar el campo de contraseña
            passwordInput.value = '';
            passwordInput.focus();
        }

    } catch (err) {
        showError('No se pudo conectar al servidor. ¿Está corriendo Spring Boot?');
        setLoading(false);
        console.error('[Login Error]', err);
    }
});

// ── Helpers ─────────────────────────────────────────────────

/** Activa/desactiva el estado de carga del botón */
function setLoading(loading) {
    loginBtn.disabled = loading;
    btnText.textContent = loading ? 'Verificando...' : 'Iniciar Sesión';
    btnSpinner.classList.toggle('hidden', !loading);
    btnArrow.classList.toggle('hidden', loading);
}

/** Muestra el mensaje de error con animación */
function showError(msg) {
    errorText.textContent = msg;
    errorBox.classList.remove('hidden');
}

/** Oculta el mensaje de error */
function hideError() {
    errorBox.classList.add('hidden');
}

/** Lee una cookie por nombre desde document.cookie */
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

/** Rellena el formulario con credenciales predefinidas (demo) */
function fillCredentials(username, password) {
    document.getElementById('username').value = username;
    passwordInput.value = password;
    hideError();
    // Efecto visual: resaltar los campos
    ['username', 'password'].forEach(id => {
        const el = document.getElementById(id);
        el.style.borderColor = 'rgba(59,130,246,0.7)';
        setTimeout(() => { el.style.borderColor = ''; }, 1000);
    });
}
