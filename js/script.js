// Función para cargar componentes
function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            // Inicializar funcionalidades después de cargar el componente
            if (id === 'header-container') {
                initMenu();
                updateAuthButton();
            }
        })
    .catch(error => console.error('Error loading component:', error));
}

// Estado de autenticación (simulado)
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// Actualizar el texto del botón de autenticación
function updateAuthButton() {
    const authButton = document.getElementById('authButton');
    if (authButton) {
        authButton.textContent = isLoggedIn ? 'Perfil' : 'Iniciar sesión';
        authButton.href = isLoggedIn ? 'perfil.html' : 'login.html';
    }
}

// Función para alternar el estado de autenticación
function toggleAuth() {
    isLoggedIn = !isLoggedIn;
    localStorage.setItem('isLoggedIn', isLoggedIn);
    updateAuthButton();
}

// Inicializar funcionalidades del menú
function initMenu() {
    // Menú responsivo
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
        });
    }
    
    // Para los dropdowns en móvil
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            mainMenu && mainMenu.classList.contains('active') && 
            !e.target.closest('.nav-container')) {
            mainMenu.classList.remove('active');
        }
    });
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar header y footer
    loadComponent('header-container', 'components/header.html');
    loadComponent('footer-container', 'components/footer.html');
    
    // Verificar si estamos en la página de login para manejar la autenticación
    if (window.location.pathname.endsWith('login.html')) {
        // Simular proceso de login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                toggleAuth();
                window.location.href = 'index.html';
            });
        }
    }
    
    // Manejar logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleAuth();
            window.location.href = 'index.html';
        });
    }
});