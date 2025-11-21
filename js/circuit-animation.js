(function () {
    const canvas = document.getElementById('circuit-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;

    // Grid configuration matching the CSS background size
    const gridSize = 50;
    const speed = 2; // Movement speed in pixels per frame
    const packetCount = 20;
    const packets = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Packet {
        constructor() {
            this.reset();
        }

        reset() {
            // Start at a random grid intersection
            this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
            this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;

            // 0: Right, 1: Down, 2: Left, 3: Up
            this.dir = Math.floor(Math.random() * 4);
            this.life = Math.random() * 200 + 100; // Frames to live
            this.history = []; // Trail positions
            this.maxHistory = 15;
            this.color = '#30e9bb';
        }

        update() {
            this.life--;
            if (this.life <= 0) {
                this.reset();
                return;
            }

            // Record history for trail
            this.history.push({ x: this.x, y: this.y });
            if (this.history.length > this.maxHistory) {
                this.history.shift();
            }

            // Move logic
            switch (this.dir) {
                case 0: this.x += speed; break;
                case 1: this.y += speed; break;
                case 2: this.x -= speed; break;
                case 3: this.y -= speed; break;
            }

            // Boundary check
            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                this.reset();
            }

            // Intersection Logic: Chance to turn when hitting grid lines
            // We check if we are exactly at a multiple of gridSize
            if (this.x % gridSize === 0 && this.y % gridSize === 0) {
                // 30% chance to turn
                if (Math.random() < 0.3) {
                    // Pick a new valid direction (prevent 180 degree turns usually looks better, but random is fine)
                    const turn = Math.random() > 0.5 ? 1 : 3; // Turn right or left relative to current index? 
                    // Simple logic: just random new direction
                    this.dir = Math.floor(Math.random() * 4);
                }
            }
        }

        draw() {
            // Draw Trail
            if (this.history.length > 1) {
                ctx.beginPath();
                ctx.moveTo(this.history[0].x, this.history[0].y);
                for (let i = 1; i < this.history.length; i++) {
                    ctx.lineTo(this.history[i].x, this.history[i].y);
                }
                // Add current pos
                ctx.lineTo(this.x, this.y);

                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1.5;
                // Fade out trail at the end using globalAlpha if desired, or gradient.
                // Simple stroke for minimal look
                ctx.stroke();
            }

            // Draw Head
            ctx.fillStyle = '#fff'; // White hot head
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize packets
    for (let i = 0; i < packetCount; i++) {
        packets.push(new Packet());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Optional: Draw grid points strictly? No, CSS handles the grid lines.

        packets.forEach(packet => {
            packet.update();
            packet.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
})();
