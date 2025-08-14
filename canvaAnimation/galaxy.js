function runCanvasAnimation(ctx, canvas) {
    const NUM_STARS = 1000;
    const NUM_BACKGROUND_STARS = 200;
    const STAR_SIZE_MIN = 2;
    const STAR_SIZE_MAX = 5;
    const BACKGROUND_STAR_SIZE = 3; // Nouvelle constante pour la taille des étoiles de fond
    const GALAXY_RADIUS = Math.min(canvas.width, canvas.height);
    const ROTATION_SPEED = 0.001;
    const BACKGROUND_COLOR = 'black';
    const NUM_ARMS = 4;
    const ARM_SPREAD = 0.5;
    const BLACK_HOLE_RADIUS = 150;
    const BLACK_HOLE_COLOR_START = 'white';
    const BLACK_HOLE_COLOR_END = 'black';
    const ROTATION_ANGLE = Math.PI / 4; // 45 degrees
    const SCALE_Y = 0.5;

    const stars = [];
    const backgroundStars = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStar() {
        const arm = Math.floor(Math.random() * NUM_ARMS);
        const angle = (Math.random() * 2 * Math.PI / NUM_ARMS) + (arm * 2 * Math.PI / NUM_ARMS);
        const radius = Math.random() * GALAXY_RADIUS;
        const spiralOffset = ARM_SPREAD * radius;
        const finalAngle = angle + spiralOffset;
        const color = `hsl(${Math.random() * 360}, 100%, 80%)`;
        return {
            x: canvas.width / 2 + radius * Math.cos(finalAngle),
            y: canvas.height / 2 + radius * Math.sin(finalAngle),
            size: Math.random() * (STAR_SIZE_MAX - STAR_SIZE_MIN) + STAR_SIZE_MIN,
            angle: finalAngle,
            radius: radius,
            speed: ROTATION_SPEED * (0.5 + Math.random() * 0.5),
            color: color,
            flicker: Math.random() * 0.5 + 0.5
        };
    }

    function createBackgroundStar() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: BACKGROUND_STAR_SIZE, // Utilisation de la constante pour la taille des étoiles de fond
            color: 'white'
        };
    }

    function drawStar(star) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * star.flicker, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.shadowBlur = star.size * 2;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.closePath();
    }

    function drawBackgroundStar(star) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
        ctx.closePath();
    }

    function updateStars() {
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            star.angle += star.speed;
            star.x = canvas.width / 2 + star.radius * Math.cos(star.angle);
            star.y = canvas.height / 2 + star.radius * Math.sin(star.angle);
            star.flicker = Math.random() * 0.5 + 0.5;
        }
    }

    function drawBlackHole() {
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, BLACK_HOLE_RADIUS / 2,
            canvas.width / 2, canvas.height / 2, BLACK_HOLE_RADIUS
        );
        gradient.addColorStop(0, BLACK_HOLE_COLOR_START);
        gradient.addColorStop(1, BLACK_HOLE_COLOR_END);
    
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, BLACK_HOLE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        drawBlackHole();
    
        // Draw background stars
        for (let i = 0; i < backgroundStars.length; i++) {
            drawBackgroundStar(backgroundStars[i]);
        }
    
        // Apply 3D transformation
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(ROTATION_ANGLE);
        ctx.scale(1, SCALE_Y);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
    
        for (let i = 0; i < stars.length; i++) {
            drawStar(stars[i]);
        }
    
        ctx.restore();
    
        updateStars();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < NUM_STARS; i++) {
        stars.push(createStar());
    }

    for (let i = 0; i < NUM_BACKGROUND_STARS; i++) {
        backgroundStars.push(createBackgroundStar());
    }

    animate();
}
