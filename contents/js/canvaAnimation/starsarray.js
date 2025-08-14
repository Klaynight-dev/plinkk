function runCanvasAnimation(ctx, canvas) {

    const STAR_DENSITY = 2500;
    const SHOOTING_STAR_PROBABILITY = 0.01;
    const SHOOTING_STAR_MIN_LENGTH = 10;
    const SHOOTING_STAR_MAX_LENGTH = 80;
    const SHOOTING_STAR_MIN_SPEED = 5;
    const SHOOTING_STAR_MAX_SPEED = 10;
    const SHOOTING_STAR_ANGLE = Math.PI / 4;
    const STAR_COLOR = '#FFFFFF';
    const SHOOTING_STAR_COLOR = '#FFFFFF';
    const SHOOTING_STAR_OPACITY_DECREASE = 0.01;
    const MAX_PARALLAX_MOVEMENT = 100;
    const STAR_SIZE = 2;
    const GRADIENT_COLOR_START = '#000000';
    const GRADIENT_COLOR_END = '#222222';

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let starsArray = [];
    let shootingStarsArray = [];
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    class Star {
        constructor(x, y, size, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    class ShootingStar {
        constructor(x, y, length, speed, angle, color) {
            this.x = x;
            this.y = y;
            this.length = length;
            this.speed = speed;
            this.angle = angle;
            this.color = color;
            this.opacity = 1;
        }
    
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.length * Math.cos(this.angle), this.y + this.length * Math.sin(this.angle));
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }
    
        update() {
            this.x += this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);
            this.opacity -= SHOOTING_STAR_OPACITY_DECREASE;
            this.draw();
        }
    
        isOutOfBounds() {
            return (
                this.x < 0 || this.x > canvas.width ||
                this.y < 0 || this.y > canvas.height
            );
        }
    }
    
    function animate() {
        requestAnimationFrame(animate);
        let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, GRADIENT_COLOR_START);
        gradient.addColorStop(1, GRADIENT_COLOR_END);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        let parallaxX = ((mouseX - canvas.width / 2) / canvas.width) * MAX_PARALLAX_MOVEMENT;
        let parallaxY = ((mouseY - canvas.height / 2) / canvas.height) * MAX_PARALLAX_MOVEMENT;
    
        for (let i = 0; i < starsArray.length; i++) {
            ctx.save();
            ctx.translate(starsArray[i].x + parallaxX, starsArray[i].y + parallaxY);
            starsArray[i].draw();
            ctx.restore();
        }
    
        if (Math.random() < SHOOTING_STAR_PROBABILITY) {
            // Spawn in a square of 66% of the screen size, centered on the left side at the top
            x = Math.random() * (canvas.width * 2 / 3);
            y = Math.random() * (canvas.height * 2 / 3);
            let length = SHOOTING_STAR_MIN_LENGTH + Math.random() * (SHOOTING_STAR_MAX_LENGTH - SHOOTING_STAR_MIN_LENGTH);
            let speed = SHOOTING_STAR_MIN_SPEED + Math.random() * (SHOOTING_STAR_MAX_SPEED - SHOOTING_STAR_MIN_SPEED);
            let angle = Math.random() * SHOOTING_STAR_ANGLE;
            let color = SHOOTING_STAR_COLOR;
    
            shootingStarsArray.push(new ShootingStar(x, y, length, speed, angle, color));
        }
    
        for (let i = 0; i < shootingStarsArray.length; i++) {
            ctx.save();
            ctx.translate(parallaxX, parallaxY);
            shootingStarsArray[i].update();
            ctx.restore();
            if (shootingStarsArray[i].isOutOfBounds()) {
                shootingStarsArray.splice(i, 1);
                i--;
            }
        }
    }
    

    function init() {
        starsArray = [];
        shootingStarsArray = [];
        let numberOfStars = (canvas.height * canvas.width) / STAR_DENSITY;
        for (let i = 0; i < numberOfStars; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let size = Math.random() * STAR_SIZE;
            let color = STAR_COLOR;

            starsArray.push(new Star(x, y, size, color));
        }
    }
    

    document.addEventListener('mousemove', function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    init();
    animate();
}