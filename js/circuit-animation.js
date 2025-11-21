(function () {
    const canvas = document.getElementById('circuit-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;

    // Configuration
    const gridSize = 30; // Spacing between points
    const baseSize = 1; // Base size of squares
    const waveSpeed = 0.05; // Speed of the wave
    const waveFrequency = 0.01; // Frequency of the wave

    let time = 0;
    let mouse = { x: -1000, y: -1000 };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    resize();

    function draw() {
        ctx.clearRect(0, 0, width, height);

        const cols = Math.ceil(width / gridSize);
        const rows = Math.ceil(height / gridSize);

        time += 1;

        for (let i = 0; i <= cols; i++) {
            for (let j = 0; j <= rows; j++) {
                const x = i * gridSize;
                const y = j * gridSize;

                // Calculate distance from mouse for interaction
                const dx = x - mouse.x;
                const dy = y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const interactionRadius = 200;
                let interactionFactor = 0;

                if (dist < interactionRadius) {
                    interactionFactor = (1 - dist / interactionRadius);
                }

                // Organic Wave Calculation
                // Combine sine waves on X and Y axis with time
                const wave = Math.sin(x * waveFrequency + time * waveSpeed) +
                    Math.cos(y * waveFrequency + time * waveSpeed);

                // Map wave (-2 to 2) to a scale factor (0.5 to 1.5)
                let scale = (wave + 2) / 4 + 0.5;

                // Add interaction effect
                scale += interactionFactor * 1;

                // Opacity based on scale
                const opacity = Math.min(0.1 + (scale - 0.5) * 0.5, 0.8);

                // Draw Square
                const currentSize = baseSize * scale;

                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.fillRect(x - currentSize / 2, y - currentSize / 2, currentSize, currentSize);
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
})();
