gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    const cards = [
        {selector: "#card-1", endTranslateX: -200, rotate: 30},
        {selector: "#card-2", endTranslateX: -300, rotate: -20},
        {selector: "#card-3", endTranslateX: -400, rotate: 15},
        {selector: "#card-4", endTranslateX: -500, rotate: -20},
        {selector: "#card-5", endTranslateX: -600, rotate: 10}
    ];
    
    // Horizontal Scroll Animation
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
});