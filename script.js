document.addEventListener('DOMContentLoaded', () => {
    // Elegant entry animation staggering for cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 400 + (index * 150));
    });

    // Interactive main button action
    const actionBtn = document.getElementById('actionBtn');
    if (actionBtn) {
        actionBtn.addEventListener('click', function(e) {
            // Ripple effect setup
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            // Positioning the ripple
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - 10;
            const y = e.clientY - rect.top - 10;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            // Execute action
            const btnText = this.querySelector('.btn-text');
            const originalText = btnText.innerText;
            btnText.innerText = "Let's Go! 🚀";
            
            // Emphasize cards briefly to show connection
            cards.forEach((card, index) => {
                setTimeout(() => {
                    const originalBorder = card.style.borderColor;
                    card.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    card.style.transform = 'scale(1.03)';
                    
                    setTimeout(() => {
                        card.style.borderColor = originalBorder;
                        card.style.transform = 'scale(1)';
                    }, 250);
                }, index * 100);
            });
            
            // Cleanup and revert
            setTimeout(() => {
                ripple.remove();
                setTimeout(() => {
                    btnText.innerText = originalText;
                }, 1000);
            }, 600);
            
            console.log("Welcome to your beautifully crafted web app!");
        });
    }

    // Dynamic style addition for ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(15);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Subtle 3D mouse tracking effect on the container
    const container = document.querySelector('.container');
    if (container) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
            
            const shape1 = document.querySelector('.shape-1');
            const shape2 = document.querySelector('.shape-2');
            const shape3 = document.querySelector('.shape-3');
            
            // Subtly move background blobs
            if (shape1) shape1.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
            if (shape2) shape2.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
            if (shape3) shape3.style.transform = `translate(${x * 20}px, ${y * -20}px)`;
            
            // Very subtle tilt on the main glassmorphism container
            container.style.transform = `perspective(1000px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg)`;
        });
        
        // Reset transform on mouse leave window
        document.addEventListener('mouseleave', () => {
            container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    }
});
