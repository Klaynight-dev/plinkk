function runCanvasAnimation(bgCtx, background) {
    const body = document.getElementById("body");

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    function Snow(options) {
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.5;
        this.x = options.x;
        this.y = options.y;
        this.angle = Math.random() * Math.PI * 2;
    }

    Snow.prototype.reset = function () {
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.5;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.angle = Math.random() * Math.PI * 2;
    }

    Snow.prototype.update = function () {
        this.y += this.speed;
        this.angle += 0.01;
        this.x += Math.sin(this.angle) * 0.1;

        if (this.y > height) {
            this.reset();
        } else {
            bgCtx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    bgCtx.fillRect(0, 0, width, height);

    const entities = [];

    for (let i = 0; i < height; i++) {
        entities.push(new Snow({
            x: Math.random() * width,
            y: Math.random() * height
        }));
    }

    function animate() {
        bgCtx.fillStyle = '#6B92B9';
        bgCtx.fillRect(0, 0, width, height);
        bgCtx.fillStyle = '#ffffff';
        bgCtx.strokeStyle = '#ffffff';

        for (let i = 0; i < entities.length; i++) {
            entities[i].update();
        }
        requestAnimationFrame(animate);
    }

    animate();

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;

        background.width = width;
        background.height = height;
    }
}
