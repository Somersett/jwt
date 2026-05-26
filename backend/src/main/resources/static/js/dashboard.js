/**
 * ============================================================
 *  dashboard.js — Panel Administrador JWT + Cookies
 * ============================================================
 *  Maneja:
 *  - Verificación de autenticación al cargar
 *  - Navegación entre secciones (sidebar)
 *  - Carga y visualización del JWT
 *  - CRUD de cookies via API
 *  - Prueba de ruta privada
 *  - Countdown de expiración del JWT
 *  - Toast notifications
 *  - Modal de edición
 * ============================================================
 */

'use strict';

// ── Estado global ────────────────────────────────────────────
const state = {
    jwtData:         null,    // Datos del JWT desde la API
    cookies:         [],      // Lista de cookies
    countdownTimer:  null,    // Timer del countdown
    editingCookie:   null,    // Cookie siendo editada
};

// ── Referencias DOM frecuentes ───────────────────────────────
const $ = id => document.getElementById(id);

// ════════════════════════════════════════════════════════════
//  INICIALIZACIÓN
// ════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupNavigation();
    setupLogout();
    setupMobileMenu();
    setupCookieForm();
    setupEditModal();
    loadAllData();
});

/** Verifica que haya sesión activa; si no, redirige al login */
function checkAuth() {
    const userInfo = getCookie('USER_INFO');
    if (!userInfo) {
        window.location.replace('/index.html');
        return;
    }
    // Actualizar UI con info del usuario (sin llamar a la API aún)
    const parts    = userInfo.split('|');
    const username = parts[0] || 'Usuario';
    const role     = parts[1] || 'ROLE_USER';
    updateUserUI(username, role);
}

/** Carga todos los datos iniciales en paralelo */
function loadAllData() {
    loadJwtInfo();
    loadCookies();
}

// ════════════════════════════════════════════════════════════
//  NAVEGACIÓN
// ════════════════════════════════════════════════════════════

function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.dataset.section;
            navigateTo(sectionId, item);

            // Cerrar sidebar en móvil
            document.getElementById('sidebar').classList.remove('open');
        });
    });
}

function navigateTo(sectionId, navItem) {
    // Desactivar todo
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

    // Activar el seleccionado
    navItem.classList.add('active');
    const section = document.getElementById(`section-${sectionId}`);
    if (section) section.classList.add('active');

    // Actualizar título del topbar
    const titles = {
        overview: 'Dashboard',
        jwt:      'JWT Viewer',
        cookies:  'Cookie Manager',
        private:  'Ruta Privada',
    };
    $('pageTitle').textContent = titles[sectionId] || sectionId;

    // Recargar datos al cambiar de sección
    if (sectionId === 'jwt')     loadJwtInfo();
    if (sectionId === 'cookies') loadCookies();
}

// ════════════════════════════════════════════════════════════
//  JWT INFO
// ════════════════════════════════════════════════════════════

async function loadJwtInfo() {
    try {
        const data = await apiGet('/api/jwt/info');
        state.jwtData = data;

        // ── Overview section ─────────────────────────────────
        $('statUsername').textContent  = data.username;
        $('statJwtStatus').textContent = '✅ Válido';
        $('statJwtStatus').style.color = 'var(--green-light)';
        $('statusDot').classList.remove('invalid');

        updateUserUI(data.username, data.role);
        renderUserInfoCard(data);
        startCountdown(data.expirationMs);

        // ── JWT Viewer section ────────────────────────────────
        renderTokenDisplay(data.token);
        renderJsonBlock($('jwtHeader'),  formatJson(data.header));
        renderJsonBlock($('jwtPayload'), formatJson(data.payload));
        renderJwtMeta(data);

    } catch (err) {
        handleJwtError(err);
    }
}

/** Renders el token en 3 partes coloreadas: Header.Payload.Signature */
function renderTokenDisplay(token) {
    const container = $('tokenDisplay');
    const parts = token.split('.');
    if (parts.length !== 3) {
        container.textContent = 'Token inválido';
        return;
    }
    container.innerHTML = `
        <span class="token-part header">${parts[0]}</span
        ><span class="token-part dot">.</span
        ><span class="token-part payload">${parts[1]}</span
        ><span class="token-part dot">.</span
        ><span class="token-part sig">${parts[2]}</span>
    `;

    // Botón copiar token
    $('copyTokenBtn').onclick = () => {
        navigator.clipboard.writeText(token).then(() => {
            showToast('Token copiado al portapapeles', 'success');
        });
    };

    // Botón refrescar
    $('refreshJwtBtn').onclick = () => loadJwtInfo();
}

/** Renderiza el bloque JSON con syntax highlight básico */
function renderJsonBlock(el, jsonStr) {
    try {
        const parsed   = JSON.parse(jsonStr);
        const pretty   = JSON.stringify(parsed, null, 2);
        el.innerHTML = highlightJson(pretty);
    } catch {
        el.textContent = jsonStr;
    }
}

/** Colorea JSON simple (strings=amarillo, numbers=cyan, bool/null=naranja) */
function highlightJson(json) {
    return json
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"([^"]+)":/g, '<span style="color:#93c5fd">"$1"</span>:')
        .replace(/: "([^"]*)"/g, ': <span style="color:#fcd34d">"$1"</span>')
        .replace(/: (\d+)/g, ': <span style="color:#6ee7b7">$1</span>')
        .replace(/: (true|false|null)/g, ': <span style="color:#f9a8d4">$1</span>');
}

/** Renderiza los metadatos del JWT (iat, exp, etc.) */
function renderJwtMeta(data) {
    const container = $('jwtMeta');
    const items = [
        { label: 'Subject (sub)', value: data.username },
        { label: 'Role',          value: data.role },
        { label: 'Emitido (iat)', value: formatDateTime(data.issuedAtMs) },
        { label: 'Expira (exp)',  value: formatDateTime(data.expirationMs) },
        { label: 'Válido',        value: data.isValid ? '✅ Sí' : '❌ No' },
        { label: 'Algoritmo',     value: 'HMAC-SHA256 (HS256)' },
    ];

    container.innerHTML = items.map(item => `
        <div class="meta-item">
            <div class="meta-label">${item.label}</div>
            <div class="meta-value">${item.value}</div>
        </div>
    `).join('');
}

/** Renderiza la tarjeta de info del usuario en el overview */
function renderUserInfoCard(data) {
    const list = $('userInfoList');
    const roleDisplay = data.role.replace('ROLE_', '');
    list.innerHTML = `
        <div class="info-row">
            <span class="info-label">Username</span>
            <span class="info-value">${data.username}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Rol</span>
            <span class="info-value">
                <span class="tag ${roleDisplay === 'ADMIN' ? 'blue' : 'green'}">${roleDisplay}</span>
            </span>
        </div>
        <div class="info-row">
            <span class="info-label">Estado</span>
            <span class="info-value">
                <span class="tag green">✅ Autenticado</span>
            </span>
        </div>
        <div class="info-row">
            <span class="info-label">Expira</span>
            <span class="info-value">${formatDateTime(data.expirationMs)}</span>
        </div>
    `;
}

/** Maneja errores al cargar JWT */
function handleJwtError(err) {
    console.error('[JWT Error]', err);
    $('statJwtStatus').textContent = '❌ Sin sesión';
    $('statJwtStatus').style.color = 'var(--red-light)';
    $('statusDot').classList.add('invalid');
    $('statCountdown').textContent  = '—';
    $('statUsername').textContent   = getCookie('USER_INFO')?.split('|')[0] || '—';

    const tokenDisplay = $('tokenDisplay');
    if (tokenDisplay) {
        tokenDisplay.innerHTML = '<span style="color:var(--text-muted)">No se pudo cargar el token JWT.</span>';
    }
}

// ════════════════════════════════════════════════════════════
//  COUNTDOWN DE EXPIRACIÓN
// ════════════════════════════════════════════════════════════

function startCountdown(expirationMs) {
    if (state.countdownTimer) clearInterval(state.countdownTimer);

    const update = () => {
        const remaining = Math.max(0, expirationMs - Date.now());
        const el = $('statCountdown');
        if (!el) return;

        if (remaining === 0) {
            el.textContent = '⚠️ Expirado';
            el.style.color  = 'var(--red-light)';
            $('statusDot').classList.add('invalid');
            clearInterval(state.countdownTimer);
            return;
        }

        const h = Math.floor(remaining / 3_600_000);
        const m = Math.floor((remaining % 3_600_000) / 60_000);
        const s = Math.floor((remaining % 60_000) / 1_000);

        el.textContent = h > 0
            ? `${h}h ${pad(m)}m ${pad(s)}s`
            : `${pad(m)}m ${pad(s)}s`;

        // Advertencia cuando queda menos de 5 minutos
        if (remaining < 300_000) {
            el.style.color = 'var(--red-light)';
        }
    };

    update();
    state.countdownTimer = setInterval(update, 1000);
}

const pad = n => String(n).padStart(2, '0');

// ════════════════════════════════════════════════════════════
//  COOKIE MANAGER
// ════════════════════════════════════════════════════════════

async function loadCookies() {
    try {
        const data     = await apiGet('/api/cookies');
        state.cookies  = data.cookies || [];
        renderCookieTable(state.cookies);
        $('statCookieCount').textContent = state.cookies.length;
        $('cookieCountBadge').textContent = state.cookies.length;
    } catch (err) {
        console.error('[Cookies Error]', err);
        $('cookieTableBody').innerHTML = `
            <tr><td colspan="6" class="table-empty">
                Error al cargar cookies
            </td></tr>
        `;
    }
}

/** Renderiza la tabla de cookies */
function renderCookieTable(cookies) {
    const tbody = $('cookieTableBody');

    if (!cookies.length) {
        tbody.innerHTML = `
            <tr><td colspan="6" class="table-empty">
                <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3
                    3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                    clip-rule="evenodd"/>
                </svg>
                No hay cookies activas
            </td></tr>
        `;
        return;
    }

    // Cookies del sistema (protegidas)
    const systemCookies = ['JWT_TOKEN'];

    tbody.innerHTML = cookies.map(c => {
        const isSystem = systemCookies.includes(c.name);
        const truncVal = c.value.length > 40
            ? c.value.substring(0, 40) + '...'
            : c.value;

        return `
        <tr>
            <td>
                <span class="cookie-name ${isSystem ? 'system' : ''}">
                    ${c.name}
                    ${isSystem ? '<span class="tag purple" style="margin-left:6px;font-size:0.6rem">SISTEMA</span>' : ''}
                </span>
            </td>
            <td>
                <span class="cookie-value" title="${escapeHtml(c.value)}">${escapeHtml(truncVal)}</span>
            </td>
            <td>${c.path}</td>
            <td>
                <span class="bool-badge ${c.httpOnly ? 'yes' : 'no'}">
                    ${c.httpOnly ? '🔒 Sí' : 'No'}
                </span>
            </td>
            <td>
                <span class="bool-badge ${c.secure ? 'yes' : 'no'}">
                    ${c.secure ? '✅ Sí' : 'No'}
                </span>
            </td>
            <td>
                <div style="display:flex;gap:6px">
                    ${!isSystem ? `
                        <button class="btn-sm ghost" onclick="openEditModal('${escapeHtml(c.name)}', '${escapeHtml(c.value)}')">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379
                                5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                            </svg>
                            Editar
                        </button>
                        <button class="btn-sm red" onclick="deleteCookieByName('${escapeHtml(c.name)}')">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382
                                4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1
                                1 0 100-2h-3.382l-.724-1.447A1 1 0 0011
                                2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2
                                0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"/>
                            </svg>
                            Borrar
                        </button>
                    ` : `<span style="color:var(--text-muted);font-size:0.75rem">Protegida</span>`}
                </div>
            </td>
        </tr>
        `;
    }).join('');
}

/** Formulario para crear nueva cookie */
function setupCookieForm() {
    const form = $('createCookieForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name     = $('newCookieName').value.trim();
        const value    = $('newCookieValue').value.trim();
        const maxAge   = parseInt($('newCookieMaxAge').value) || 3600;
        const httpOnly = $('newCookieHttpOnly').checked;

        if (!name) {
            showToast('El nombre de la cookie es requerido', 'error');
            return;
        }

        try {
            const result = await apiPost('/api/cookies', { name, value, maxAge, httpOnly });
            showToast(result.message, 'success');
            form.reset();
            $('newCookieMaxAge').value = '3600';
            await loadCookies();
        } catch (err) {
            showToast(err.message || 'Error al crear la cookie', 'error');
        }
    });

    $('refreshCookiesBtn').addEventListener('click', () => {
        loadCookies();
        showToast('Lista de cookies actualizada', 'info');
    });
}

/** Abre el modal de edición de cookie */
function openEditModal(name, value) {
    state.editingCookie = name;
    $('editCookieName').value  = name;
    $('editCookieValue').value = value;
    $('editCookieMaxAge').value = 3600;
    $('editModal').classList.remove('hidden');
}

function setupEditModal() {
    $('closeModal').addEventListener('click',  closeEditModal);
    $('cancelEdit').addEventListener('click',  closeEditModal);
    $('editModal').addEventListener('click', e => {
        if (e.target === $('editModal')) closeEditModal();
    });

    $('confirmEdit').addEventListener('click', async () => {
        const name   = state.editingCookie;
        const value  = $('editCookieValue').value;
        const maxAge = parseInt($('editCookieMaxAge').value) || 3600;

        try {
            const result = await apiPut(`/api/cookies/${name}`, { value, maxAge });
            showToast(result.message, 'success');
            closeEditModal();
            await loadCookies();
        } catch (err) {
            showToast(err.message || 'Error al actualizar', 'error');
        }
    });
}

function closeEditModal() {
    $('editModal').classList.add('hidden');
    state.editingCookie = null;
}

/** Elimina una cookie por nombre */
async function deleteCookieByName(name) {
    if (!confirm(`¿Eliminar la cookie "${name}"?`)) return;

    try {
        const result = await apiDelete(`/api/cookies/${name}`);
        showToast(result.message, 'success');
        await loadCookies();
    } catch (err) {
        showToast(err.message || 'Error al eliminar', 'error');
    }
}

// ════════════════════════════════════════════════════════════
//  RUTA PRIVADA
// ════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    $('testPrivateBtn').addEventListener('click', () => testPrivateRoute(true));
    $('testNoTokenBtn').addEventListener('click', () => testPrivateRoute(false));
});

async function testPrivateRoute(withJwt) {
    const card    = $('privateResponseCard');
    const pre     = $('privateResponse');
    const icon    = $('privateResponseIcon');
    const tagEl   = $('privateStatusTag');

    card.style.display = 'block';
    pre.textContent    = 'Enviando petición...';

    try {
        let response;

        if (withJwt) {
            // Petición normal (el browser envía la cookie JWT automáticamente)
            response = await fetch('/api/private', {
                credentials: 'same-origin'
            });
        } else {
            // Simular petición sin token: usar XMLHttpRequest sin cookies
            // (En realidad el navegador siempre envía cookies same-origin,
            //  así que mostramos el mensaje educativo de que NO se puede
            //  simular sin CORS/cross-origin)
            showToast(
                'Nota: Para simular sin token, elimina la cookie JWT_TOKEN manualmente',
                'info'
            );
            response = await fetch('/api/private', {
                credentials: 'omit'   // No enviar cookies
            });
        }

        const data = await response.json();

        if (response.ok) {
            // Éxito
            icon.className   = 'card-icon green';
            tagEl.className  = 'tag green';
            tagEl.textContent = `✅ ${response.status} OK`;
        } else {
            // Error
            icon.className   = 'card-icon red';
            tagEl.className  = 'tag red';
            tagEl.textContent = `❌ ${response.status} ${response.statusText || 'Error'}`;
        }

        pre.innerHTML = highlightJson(JSON.stringify(data, null, 2));

    } catch (err) {
        icon.className   = 'card-icon red';
        tagEl.className  = 'tag red';
        tagEl.textContent = '❌ Error de red';
        pre.textContent  = `Error: ${err.message}`;
    }
}

// ════════════════════════════════════════════════════════════
//  LOGOUT
// ════════════════════════════════════════════════════════════

function setupLogout() {
    $('logoutBtn').addEventListener('click', async () => {
        // Feedback visual inmediato
        const btn = $('logoutBtn');
        btn.disabled = true;
        btn.style.opacity = '0.6';

        try {
            // 1. Pedirle al servidor que elimine la cookie HttpOnly (JWT_TOKEN)
            //    El servidor envía Set-Cookie: JWT_TOKEN=; Max-Age=0
            await apiPost('/api/auth/logout', {});
        } catch (e) {
            console.warn('[Logout] Error en la llamada al servidor:', e);
            // Aunque falle la llamada, limpiamos el lado del cliente
        } finally {
            // 2. Eliminar cookies no-HttpOnly directamente desde JS.
            //    Razón: algunos navegadores procesan los Set-Cookie de fetch()
            //    de forma asíncrona y window.location puede ejecutarse antes.
            borrarCookieJS('USER_INFO');
            // JWT_TOKEN es HttpOnly → JS no puede borrarla, solo el servidor puede.
            // La eliminación ya fue enviada por el servidor en el paso 1.

            // 3. Detener el countdown
            if (state.countdownTimer) clearInterval(state.countdownTimer);

            // 4. Pequeño delay para que el browser procese el Set-Cookie del servidor
            setTimeout(() => {
                window.location.replace('/index.html');
            }, 80);
        }
    });
}

/**
 * Borra una cookie desde JavaScript estableciendo Max-Age=0.
 * Solo funciona con cookies NO HttpOnly.
 * Para cookies HttpOnly, el servidor debe enviar Set-Cookie: name=; Max-Age=0.
 */
function borrarCookieJS(nombre) {
    document.cookie = `${nombre}=; Max-Age=0; Path=/; SameSite=Lax`;
}

// ════════════════════════════════════════════════════════════
//  MENÚ MÓVIL
// ════════════════════════════════════════════════════════════

function setupMobileMenu() {
    $('menuBtn').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });
}

// ════════════════════════════════════════════════════════════
//  UI HELPERS
// ════════════════════════════════════════════════════════════

function updateUserUI(username, role) {
    const roleDisplay = role.replace('ROLE_', '');

    // Top bar
    $('topbarUsername').textContent = username;
    $('topbarRole').textContent     = roleDisplay;
    $('userAvatar').textContent     = username.charAt(0).toUpperCase();
}

// ════════════════════════════════════════════════════════════
//  TOAST NOTIFICATIONS
// ════════════════════════════════════════════════════════════

function showToast(message, type = 'info') {
    const container = $('toastContainer');
    const toast     = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000
                  16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0
                  00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>`,
        error:   `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000
                  16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0
                  101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414
                  10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"/>`,
        info:    `<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116
                  0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1
                  1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>`,
    };

    toast.innerHTML = `
        <svg viewBox="0 0 20 20" fill="currentColor">${icons[type]}</svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('exit');
        setTimeout(() => toast.remove(), 260);
    }, 3500);
}

// ════════════════════════════════════════════════════════════
//  API WRAPPER
// ════════════════════════════════════════════════════════════

async function apiGet(url) {
    const res = await fetch(url, { credentials: 'same-origin' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || `HTTP ${res.status}`);
    return data;
}

async function apiPost(url, body) {
    const res = await fetch(url, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
        credentials: 'same-origin',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || `HTTP ${res.status}`);
    return data;
}

async function apiPut(url, body) {
    const res = await fetch(url, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
        credentials: 'same-origin',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || `HTTP ${res.status}`);
    return data;
}

async function apiDelete(url) {
    const res = await fetch(url, {
        method:  'DELETE',
        credentials: 'same-origin',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || `HTTP ${res.status}`);
    return data;
}

// ════════════════════════════════════════════════════════════
//  UTILIDADES
// ════════════════════════════════════════════════════════════

/** Lee una cookie por nombre desde document.cookie */
function getCookie(name) {
    const val   = `; ${document.cookie}`;
    const parts = val.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

/** Formatea timestamp (ms) a fecha legible */
function formatDateTime(ms) {
    if (!ms) return '—';
    return new Date(ms).toLocaleString('es-CO', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}

/** Formatea JSON string con indentación */
function formatJson(jsonStr) {
    try {
        return JSON.stringify(JSON.parse(jsonStr), null, 2);
    } catch {
        return jsonStr;
    }
}

/** Escapa caracteres HTML para insertar en atributos/contenido */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Exponer funciones globales necesarias para onclick inline en la tabla
window.openEditModal      = openEditModal;
window.deleteCookieByName = deleteCookieByName;
