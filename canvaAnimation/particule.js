function runCanvasAnimation(ctx, canvas) {

    const PARTICLE_COLOR = '#8C5523';
    const BACKGROUND_COLOR = '#000000';
    const PARTICLE_SIZE_MIN = 1;
    const PARTICLE_SIZE_MAX = 5;
    const PARTICLE_SPEED_MIN = -1;
    const PARTICLE_SPEED_MAX = 1;
    const PARTICLE_DENSITY = 5000; // Min : 10 (avec lags)

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.directionY = -this.directionY;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / PARTICLE_DENSITY;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN)) + PARTICLE_SIZE_MIN;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * (PARTICLE_SPEED_MAX - PARTICLE_SPEED_MIN)) + PARTICLE_SPEED_MIN;
            let directionY = (Math.random() * (PARTICLE_SPEED_MAX - PARTICLE_SPEED_MIN)) + PARTICLE_SPEED_MIN;
            let color = PARTICLE_COLOR;

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    init();
    animate();
}