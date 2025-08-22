// menu.js - Funcionalidad para el menú flotante

document.addEventListener('DOMContentLoaded', function() {
    const floatingNavbar = document.getElementById('floatingNavbar');
    let lastScrollY = window.scrollY;
    
    // Controlar la visibilidad del menú basado en el scroll
    function controlNavbar() {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // Scroll hacia abajo - ocultar menú
            floatingNavbar.classList.add('hidden');
        } else {
            // Scroll hacia arriba - mostrar menú
            floatingNavbar.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    }
    
    // Configurar el evento de scroll con throttling para mejor rendimiento
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                controlNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Funcionalidad del menú móvil
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
    
    // Estado de autenticación (simulado)
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const authButton = document.getElementById('authButton');
    
    // Actualizar el texto del botón de autenticación
    function updateAuthButton() {
        if (authButton) {
            authButton.textContent = isLoggedIn ? 'Perfil' : 'Iniciar sesión';
            authButton.href = isLoggedIn ? 'perfil.html' : 'login.html';
        }
    }
    
    // Inicializar
    updateAuthButton();
});