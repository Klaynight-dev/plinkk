function runCanvasAnimation(ctx, canvas) {
    const NUM_BUBBLES = 50;
    const MIN_RADIUS = 10;
    const MAX_RADIUS = 30;
    const MIN_SPEED = 0.005;
    const MAX_SPEED = 0.1;
    const MIN_OPACITY = 0.5;
    const MAX_OPACITY = 1.0;
    const MIN_BLUR = 0;
    const MAX_BLUR = 5;
    const COLOR_START = '#001f3f';
    const COLOR_END = '#0074D9';

    const bubbles = [];
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createBubble() {
        const depth = Math.random();
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS,
            speed: (Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED) * depth,
            opacity: Math.random() * (MAX_OPACITY - MIN_OPACITY) + MIN_OPACITY,
            color: `rgba(255, 255, 255, ${Math.random() * (MAX_OPACITY - MIN_OPACITY) + MIN_OPACITY})`,
            depth: depth,
            blur: Math.random() * (MAX_BLUR - MIN_BLUR) + MIN_BLUR
        };
    }

    function drawBubble(bubble) {
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.filter = `blur(${bubble.blur}px)`;
        ctx.fill();
        ctx.closePath();
    }

    function updateBubbles() {
        for (let i = 0; i < bubbles.length; i++) {
            bubbles[i].y -= bubbles[i].speed;
            bubbles[i].x += Math.sin(bubbles[i].y / 50) * 2 * bubbles[i].depth;
            if (bubbles[i].y + bubbles[i].radius < 0) {
                bubbles[i] = createBubble();
                bubbles[i].y = canvas.height + bubbles[i].radius;
            }
        }

        // Ensure there are always enough bubbles on the screen
        while (bubbles.length < NUM_BUBBLES) {
            bubbles.push(createBubble());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, COLOR_START);
        gradient.addColorStop(1, COLOR_END);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        bubbles.forEach(drawBubble);
        updateBubbles();

        requestAnimationFrame(animate);
    }

    function handleMouseMove(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }

    function applyParallax() {
        for (let i = 0; i < bubbles.length; i++) {
            const dx = (mouse.x - canvas.width / 2) * 0.005 * bubbles[i].depth;
            const dy = (mouse.y - canvas.height / 2) * 0.005 * bubbles[i].depth;
            bubbles[i].x += dx;
            bubbles[i].y += dy;
        }
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    for (let i = 0; i < NUM_BUBBLES; i++) {
        bubbles.push(createBubble());
    }

    function animateWithParallax() {
        applyParallax();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, COLOR_START);
        gradient.addColorStop(1, COLOR_END);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        bubbles.forEach(drawBubble);
        updateBubbles();

        requestAnimationFrame(animateWithParallax);
    }

    animateWithParallax();
}