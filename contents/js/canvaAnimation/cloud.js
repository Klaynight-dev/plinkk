function runCanvasAnimation(ctx, canvas) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    let particleArr = [];
    const colors = [
        'white',
        'rgba(255, 255, 255, 0.3)',
        'rgba(173, 216, 230, 0.8)',
        'rgba(211, 211, 211, 0.8)',
        // Ajoute autant de couleurs que tu veux
    ];

    const maxSize = 40;
    const minSize = 0;
    const mouseRadius = 60;

    //mouse position
    let mouse = {
        x: null,
        y: null
    };

    window.addEventListener('mousemove', 
        function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        }
    )

    //create constructor function for particle
    function Particle(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    //add draw method to particle prototype
    Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    //add update method to the particle prototype
    Particle.prototype.update = function() {
        if(this.x + this.size*2 > canvas.width || this.x - this.size*2 < 0) {
            this.directionX = -this.directionX;
        }
        if(this.y + this.size*2 > canvas.height || this.y - this.size*2 < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        //mouse interactivity
        if( mouse.x - this.x < mouseRadius 
            && mouse.x - this.x > -mouseRadius
            && mouse.y - this.y < mouseRadius
            && mouse.y - this.y > -mouseRadius) {
                if(this.size < maxSize) {
                    this.size += 3;
                } 
            } else if(this.size > minSize) {
                    this.size -= 0.1;
            }
            if(this.size < 0) {
                this.size = 0;
            }
            this.draw();
    }

    //create particle array
    function init() {
        particleArr = [];
        for(let i = 0 ; i < 1000 ; i++) {
            let size = 0;
            let x = (Math.random() * ((innerWidth - size*2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size*2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * .2) - .1;
            let directionY = (Math.random() * .2) - .1;
            let color = colors[Math.floor(Math.random() * colors.length)];

            particleArr.push(new Particle(x, y, directionX, directionY, size, color));
        }
    } 

    //animate loop 
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for(let i = 0 ; i < particleArr.length ; i++) {
            particleArr[i].update();
        }
    }

    init();
    animate();

    window.addEventListener('resize', 
        function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        }
    )

    setInterval(function() {
        mouse.x = undefined;
        mouse.y = undefined;
    }, 1000);
}