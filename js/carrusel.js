document.addEventListener('DOMContentLoaded', function() {
            const carouselSlide = document.querySelector('.carousel-slide');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.carousel-control.prev');
            const nextBtn = document.querySelector('.carousel-control.next');
            const indicators = document.querySelectorAll('.carousel-indicator');
            
            let counter = 0;
            const size = slides[0].clientWidth;
            let autoSlideInterval;
            
            // Configurar el ancho del carrusel
            function setupCarousel() {
                carouselSlide.style.transform = 'translateX(' + (-counter * size) + 'px)';
            }
            
            // Iniciar el desplazamiento automático
            function startAutoSlide() {
                autoSlideInterval = setInterval(nextSlide, 5000);
            }
            
            // Detener el desplazamiento automático
            function stopAutoSlide() {
                clearInterval(autoSlideInterval);
            }
            
            // Navegar a la siguiente imagen
            function nextSlide() {
                if (counter >= slides.length - 1) {
                    counter = -1;
                }
                counter++;
                transitionSlide();
            }
            
            // Navegar a la imagen anterior
            function prevSlide() {
                if (counter <= 0) {
                    counter = slides.length;
                }
                counter--;
                transitionSlide();
            }
            
            // Transición suave entre imágenes
            function transitionSlide() {
                carouselSlide.style.transform = 'translateX(' + (-counter * size) + 'px)';
                
                // Actualizar indicadores
                updateIndicators();
            }
            
            // Actualizar indicadores activos
            function updateIndicators() {
                indicators.forEach((indicator, index) => {
                    if (index === counter) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
            
            // Navegar a una imagen específica
            function goToSlide(index) {
                counter = index;
                transitionSlide();
            }
            
            // Event listeners para controles
            nextBtn.addEventListener('click', function() {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
            
            prevBtn.addEventListener('click', function() {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
            
            // Event listeners para indicadores
            indicators.forEach((indicator) => {
                indicator.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    stopAutoSlide();
                    goToSlide(index);
                    startAutoSlide();
                });
            });
            
            // Reiniciar el carrusel al redimensionar la ventana
            window.addEventListener('resize', function() {
                // Recalcular el tamaño
                const newSize = slides[0].clientWidth;
                carouselSlide.style.transform = 'translateX(' + (-counter * newSize) + 'px)';
            });
            
            // Pausar el carrusel cuando el ratón está sobre él
            document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoSlide);
            
            // Reanudar el carrusel cuando el ratón sale
            document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoSlide);
            
            // Inicializar el carrusel
            setupCarousel();
            startAutoSlide();
        });