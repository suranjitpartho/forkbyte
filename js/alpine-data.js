document.addEventListener('alpine:init', () => {
    Alpine.data('layout', () => ({
        isScrolled: false,
        mobileMenuOpen: false,
        mouseX: 0,
        mouseY: 0,
        init() {
            window.addEventListener('scroll', () => {
                this.isScrolled = window.pageYOffset > 50;
            });
            window.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            });
        }
    }));

    Alpine.data('counter', (target, suffix = '') => ({
        current: 0,
        target: target,
        suffix: suffix,
        duration: 1500,
        init() {
            // Use IntersectionObserver to start animation when in view
            let observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.startCounting();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(this.$el);
        },
        startCounting() {
            let start = 0;
            let end = this.target;
            let startTime = null;
            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / this.duration, 1);
                // Ease out quart
                const ease = 1 - Math.pow(1 - progress, 4);
                this.current = Math.floor(ease * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }));
})
