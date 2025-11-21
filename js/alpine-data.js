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
    }))
})
