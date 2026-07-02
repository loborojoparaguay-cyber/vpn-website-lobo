// Main JavaScript

// Mobile Menu Toggle
document.getElementById('mobile-menu')?.addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact WhatsApp Function
function contactWhatsApp(plan) {
    // CAMBIA ESTE NÚMERO POR TU WHATSAPP (incluye código de país sin +)
    const phoneNumber = '1234567890';
    const message = `Hola! Estoy interesado en el ${plan} de VPN Premium`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Modal Functions
function openTrialModal() {
    document.getElementById('trialModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeTrialModal() {
    document.getElementById('trialModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('trialModal');
    if (event.target === modal) {
        closeTrialModal();
    }
}

// Submit Trial Request
function submitTrialRequest(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        whatsapp: document.getElementById('whatsapp').value,
        email: document.getElementById('email').value,
        plan: document.getElementById('plan').value,
        message: document.getElementById('message').value,
        date: new Date().toISOString()
    };
    
    // Save to localStorage (simula una base de datos)
    let trials = JSON.parse(localStorage.getItem('vpn_trials') || '[]');
    trials.push(formData);
    localStorage.setItem('vpn_trials', JSON.stringify(trials));
    
    // Show success message
    alert('¡Solicitud enviada! Te contactaremos pronto por WhatsApp.');
    
    // Send notification via WhatsApp to admin
    const phoneNumber = '1234567890'; // TU NÚMERO AQUÍ
    const adminMessage = `🎁 NUEVA SOLICITUD DE PRUEBA\n\n` +
                        `Nombre: ${formData.name}\n` +
                        `WhatsApp: ${formData.whatsapp}\n` +
                        `Email: ${formData.email}\n` +
                        `Plan: ${formData.plan}\n` +
                        `Mensaje: ${formData.message}`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(adminMessage)}`, '_blank');
    
    // Reset form and close modal
    document.getElementById('trialForm').reset();
    closeTrialModal();
}

// Animations on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .contact-btn');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Add active class to navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.padding = '1rem 0';
    }
});
