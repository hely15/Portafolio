// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Animación de entrada para las secciones
    const sections = document.querySelectorAll('section');
    
    // Función para verificar si un elemento está en el viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    };
    
    // Función para animar las secciones cuando están en el viewport
    const animateSections = () => {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('active');
            }
        });
    };
    
    // Ejecutar la animación al cargar la página
    animateSections();
    
    // Ejecutar la animación al hacer scroll
    window.addEventListener('scroll', animateSections);
    
    // Animación para los números de estadísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let count = 0;
        const duration = 2000; // 2 segundos
        const interval = Math.floor(duration / target);
        
        const counter = setInterval(() => {
            count++;
            stat.textContent = count + '+';
            
            if (count >= target) {
                clearInterval(counter);
            }
        }, interval);
    });
    
    // Animación para los círculos de habilidades
    const skillCircles = document.querySelectorAll('.circle');
    
    skillCircles.forEach(circle => {
        const percentage = circle.getAttribute('stroke-dasharray').split(',')[0];
        const circumference = 100;
        
        circle.style.strokeDasharray = '0, ' + circumference;
        
        setTimeout(() => {
            circle.style.transition = 'stroke-dasharray 1.5s ease-in-out';
            circle.style.strokeDasharray = percentage + ', ' + circumference;
        }, 500);
    });
    
    // Animación para el texto de la profesión
    const professionText = document.querySelector('.profession');
    const text = professionText.textContent;
    professionText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            professionText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
    
    // Animación para los elementos del menú
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Agregar clase active al link clickeado
            this.classList.add('active');
            
            // Obtener el id de la sección a la que se quiere ir
            const targetId = this.getAttribute('href');
            
            // Scroll suave a la sección
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Animación para las tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 * index);
    });
    
    // Animación para los elementos del portafolio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 200 * index);
    });
    
    // Efecto hover para los botones
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-3px)';
            if (button.classList.contains('hire-btn')) {
                button.style.boxShadow = '0 5px 15px rgba(147, 51, 234, 0.3)';
            }
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0)';
            if (button.classList.contains('hire-btn')) {
                button.style.boxShadow = 'none';
            }
        });
    });
    
    // Animación para el formulario de contacto
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            group.style.transition = 'all 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateX(0)';
        }, 200 * index);
    });
});

