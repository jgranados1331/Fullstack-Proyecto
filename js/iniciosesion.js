document.addEventListener('DOMContentLoaded', function() {
            const inputs = document.querySelectorAll('input');
            
            inputs.forEach(input => {
                // Establecer opacidad inicial
                input.style.opacity = '0.5';
                
                // Evento focus
                input.addEventListener('focus', function() {
                    this.style.opacity = '1';
                    this.style.borderColor = '#6a11cb';
                });
                
                // Evento blur
                input.addEventListener('blur', function() {
                    if (this.value === '') {
                        this.style.opacity = '0.5';
                    }
                    this.style.borderColor = '#ddd';
                });
                
                // Cambiar opacidad si ya tiene valor al cargar
                if (input.value !== '') {
                    input.style.opacity = '1';
                }
            });
            
            // Efecto de animación al cargar la página
            document.querySelector('.login-container').style.transform = 'translateY(20px)';
            document.querySelector('.login-container').style.opacity = '0';
            
            setTimeout(() => {
                document.querySelector('.login-container').style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                document.querySelector('.login-container').style.transform = 'translateY(0)';
                document.querySelector('.login-container').style.opacity = '1';
            }, 100);
        });