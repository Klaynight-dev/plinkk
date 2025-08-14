function runCanvasAnimation(ctx, canvas) {
    const NEURON_COUNT = 150;
    const MAX_DISTANCE = 150;
    const REPULSION_RADIUS = 200;
    const NEURON_MIN_RADIUS = 1;
    const NEURON_MAX_RADIUS = 6;
    const NEURON_SPEED = 1;
    const REPULSION_FORCE = 5;
    const NEURON_COLOR = 'white';
    const BACKGROUND_COLOR_START = '#000000';
    const BACKGROUND_COLOR_END = '#000030';
    const FADE_IN_SPEED = 0.0001;
    const SCREEN_REPULSION = 0;

    const neurons = [];
    const connections = [];
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function handleMouseMove(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function createNeuron() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * (NEURON_MAX_RADIUS - NEURON_MIN_RADIUS) + NEURON_MIN_RADIUS,
            dx: (Math.random() - 0.5) * NEURON_SPEED,
            dy: (Math.random() - 0.5) * NEURON_SPEED,
            opacity: 0.5
        };
    }

    function drawNeuron(neuron) {
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${neuron.opacity})`;
        ctx.fill();
        ctx.closePath();
    }

    function updateNeurons() {
        for (let i = 0; i < neurons.length; i++) {
            neurons[i].x += neurons[i].dx;
            neurons[i].y += neurons[i].dy;
            neurons[i].opacity = Math.min(neurons[i].opacity + FADE_IN_SPEED, 1);
    
            if (neurons[i].x < 0) {
                neurons[i].dx = Math.abs(neurons[i].dx); // Reverse direction
            } else if (neurons[i].x > canvas.width) {
                neurons[i].dx = -Math.abs(neurons[i].dx); // Reverse direction
            }
    
            if (neurons[i].y < 0) {
                neurons[i].dy = Math.abs(neurons[i].dy); // Reverse direction
            } else if (neurons[i].y > canvas.height) {
                neurons[i].dy = -Math.abs(neurons[i].dy); // Reverse direction
            }
        }
    
        while (neurons.length < NEURON_COUNT) {
            neurons.push(createNeuron());
        }
    }
    
    function createConnections() {
        connections.length = 0;
        for (let i = 0; i < neurons.length; i++) {
            for (let j = i + 1; j < neurons.length; j++) {
                const dx = neurons[i].x - neurons[j].x;
                const dy = neurons[i].y - neurons[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < MAX_DISTANCE) {
                    connections.push({ neuron1: neurons[i], neuron2: neurons[j], distance });
                }
            }
        }
    }

    function drawConnections() {
        for (let i = 0; i < connections.length; i++) {
            const { neuron1, neuron2, distance } = connections[i];
            const opacity = 1 - distance / MAX_DISTANCE;
            ctx.beginPath();
            ctx.moveTo(neuron1.x, neuron1.y);
            ctx.lineTo(neuron2.x, neuron2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.stroke();
            ctx.closePath();
        }
    }

    function applyRepulsion() {
        for (let i = 0; i < neurons.length; i++) {
            const dx = neurons[i].x - mouseX;
            const dy = neurons[i].y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < REPULSION_RADIUS) {
                const angle = Math.atan2(dy, dx);
                const force = (REPULSION_RADIUS - distance) / REPULSION_RADIUS;
                neurons[i].x += Math.cos(angle) * force * REPULSION_FORCE;
                neurons[i].y += Math.sin(angle) * force * REPULSION_FORCE;

                neurons[i].x = Math.max(-SCREEN_REPULSION, Math.min(canvas.width + SCREEN_REPULSION, neurons[i].x));
                neurons[i].y = Math.max(-SCREEN_REPULSION, Math.min(canvas.height + SCREEN_REPULSION, neurons[i].y));
            }
        }
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    for (let i = 0; i < NEURON_COUNT; i++) {
        neurons.push(createNeuron());
    }

    function animate() {
        applyRepulsion();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, BACKGROUND_COLOR_START);
        gradient.addColorStop(1, BACKGROUND_COLOR_END);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        createConnections();
        drawConnections();
        neurons.forEach(drawNeuron);
        updateNeurons();

        requestAnimationFrame(animate);
    }

    animate();
}