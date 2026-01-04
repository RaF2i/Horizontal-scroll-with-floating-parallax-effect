gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    const isMobile = () => window.innerWidth <= 768;
    
    if (isMobile()) {
        const container = document.querySelector('.container');
        const wrapper = document.querySelector('.wrapper');
        const cards = [
            {element: document.querySelector("#card-1"), translateFactor: -1.0, rotateFactor: 30, yFactor: 0.5},
            {element: document.querySelector("#card-2"), translateFactor: 1.5, rotateFactor: -20, yFactor: -0.3},
            {element: document.querySelector("#card-3"), translateFactor: -2.0, rotateFactor: 15, yFactor: 0.4},
            {element: document.querySelector("#card-4"), translateFactor: 2.5, rotateFactor: -20, yFactor: -0.2},
            {element: document.querySelector("#card-5"), translateFactor: -3.0, rotateFactor: 10, yFactor: 0.3}
        ];

        let ticking = false;
        
        const updateParallax = () => {
            const scrollLeft = container.scrollLeft;
            const maxScroll = wrapper.offsetWidth - container.clientWidth;
            const scrollProgress = Math.min(scrollLeft / maxScroll, 1);
            
            cards.forEach((card) => {
                if (card.element) {
                    const translateX = scrollProgress * card.translateFactor * 100;
                    const translateY = scrollProgress * card.yFactor * 50;
                    const rotation = scrollProgress * card.rotateFactor * 2;
                    
                    gsap.to(card.element, {
                        x: translateX,
                        y: translateY,
                        rotation: rotation,
                        duration: 0.2,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                }
            });
        };
        
        container.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        updateParallax();
    } else {
        // Desktop
        const cards = [
            {selector: "#card-1", endTranslateX: -200, rotate: 30},
            {selector: "#card-2", endTranslateX: -300, rotate: -20},
            {selector: "#card-3", endTranslateX: -400, rotate: 15},
            {selector: "#card-4", endTranslateX: -500, rotate: -20},
            {selector: "#card-5", endTranslateX: -600, rotate: 10}
        ];
        
        ScrollTrigger.create({  
            trigger: ".wrapper",
            start: "top top",
            end: "+=250vh",
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
                gsap.to(".wrapper", {
                    x: `${-220 * self.progress}vw`,
                    duration: 0.5,
                    ease: "power3.out"
                });
                
                cards.forEach((card) => {
                    gsap.to(card.selector, {
                        x: `${card.endTranslateX * self.progress}px`,
                        rotation: `${card.rotate * self.progress * 2}`,
                        duration: 0.5,
                        ease: "power3.out"
                    });
                });
            }
        });
    }

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            location.reload(); 
        }, 500);
    });
});