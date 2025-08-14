function runCanvasAnimation(ctx, canvas) {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const raindrops = [];
    const gravity = 0.1;
    const wind = 0.05;

    const backgroundImage = new Image();
    backgroundImage.src = 'https://img.freepik.com/photos-gratuite/mystere-fantasmagorique-ancienne-architecture-rue-ville-illuminee-genere-par-ia_24640-91439.jpg?t=st=1738795584~exp=1738799184~hmac=f6a8bcfc403260761241409cbf8f84d7af09daeb226abbe99b3a4ce182349fe2&w=1380';

    class Raindrop {
        constructor(x, y, length, speed, width) {
            this.x = x;
            this.y = y;
            this.length = length;
            this.speed = speed;
            this.width = width;
            this.velocityY = speed;
        }

        update() {
            this.velocityY += gravity;
            this.y += this.velocityY;
            this.x += wind;
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
                this.velocityY = this.speed;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.strokeStyle = 'rgba(174,194,224,0.5)';
            ctx.lineWidth = this.width;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    }

    function createRaindrops() {
        for (let i = 0; i < 500; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const length = Math.random() * 20 + 10;
            const speed = Math.random() * 5 + 2;
            const width = Math.random() * 1.5 + 0.5;
            raindrops.push(new Raindrop(x, y, length, speed, width));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); 

        raindrops.forEach(raindrop => {
            raindrop.update();
            raindrop.draw();
        });

        requestAnimationFrame(animate);
    }

    backgroundImage.onload = function() {
        createRaindrops();
        animate();
    };

    const rainSound = new Audio('https://lasonotheque.org/UPLOAD/mp3/2719.mp3');
    rainSound.loop = true;
    rainSound.play();
}
