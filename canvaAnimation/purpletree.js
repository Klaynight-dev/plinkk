function runCanvasAnimation(ctx, canvas) {
    // Initialize variables and canvas
    let cursorX = 0, cursorY = 0, points, start;
    const virtualWidth = 1920;
    const virtualHeight = 1080;
    const maxLineLength = 200;
    const lineWidth = 4;
    const numPoints = 130;
    const bgColorStart = '#0a080f';
    const bgColorStop = '#2a1b3d';
    const lineColor = '216, 63, 119';
  
    // Function definitions
    const fillScreen = (ctx) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, bgColorStart);
      gradient.addColorStop(1, bgColorStop);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
  
    const drawLine = (p1, p2, color = lineColor) => {
      ctx.strokeStyle = color;
      ctx.strokeWidth = lineWidth;
  
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    };
  
    const createPoint = () => ({
      x: Math.floor(Math.random() * virtualWidth),
      y: Math.floor(Math.random() * virtualHeight),
      deltaX: Math.random() - 0.5,
      deltaY: Math.random() - 0.5,
    });
  
    const seedPoints = num => Array(num).fill(null).map(e => createPoint());
  
    const movePoint = (coord, delta, boundry, time) => {
      let newCoord = coord + (time * delta) / 10; // anim. speed
      if (newCoord <= 0) {
        newCoord = -newCoord;
      }
      if (newCoord > boundry) {
        let bounces = Math.floor(newCoord / boundry);
        let tempCoord = newCoord % boundry;
        newCoord = (bounces % 2) === 0 ? tempCoord : boundry - tempCoord;
      }
      return newCoord;
    };
  
    const movePoints = (points, virtualWidth, virtualHeight, time) => points.map(point => {
      let newPoint = {
        ...point,
        x: movePoint(point.x, point.deltaX, virtualWidth, time),
        y: movePoint(point.y, point.deltaY, virtualHeight, time)
      };
      return newPoint;
    });
  
    const makeLines = points => {
      let lines = [];
      for (let i = 0, len = points.length - 1; i < len; i++) {
        for (let y = i + 1; y < points.length; y++) {
          const diffX = Math.abs(points[i].x - points[y].x);
          const diffY = Math.abs(points[i].y - points[y].y);
          const hypot = Math.hypot(diffX, diffY);
          if (hypot < maxLineLength) {
            lines.push([points[i], points[y], `rgba(${lineColor}, ${1 - (hypot / maxLineLength)})`]);
          }
        }
      }
      return lines;
    };
  
    const paintLines = lines => {
      lines.forEach(line => drawLine(line[0], line[1], line[2]));
    };
  
    const setSize = () => {
      canvas.width = window.screen.availWidth;
      canvas.height = window.screen.availHeight;
    };
  
    function getMouseCoordinates(canvas, evt) {
      let rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;
  
      cursorX = (evt.clientX - rect.left) * scaleX;
      cursorY = (evt.clientY - rect.top) * scaleY;
    }
  
    const mouseMoveHandler = evt => {
      getMouseCoordinates(canvas, evt);
    };
  
    // Time travel
    const wheelHandler = evt => {
      const delta = evt.deltaY < 0 ? evt.deltaY : evt.deltaY * 2;
      start = start + delta;
    };
  
    const addCursorToPoints = points => [...points, {
      x: cursorX,
      y: cursorY
    }];
  
    const pipe = (...fns) => timestamp => {
      fns.reduce((res, fn) => fn(res), timestamp);
    };
  
    // Render loop
    const render = (timestamp) => {
      const time = timestamp - start;
      fillScreen(ctx);
      pipe(
        movePointsBound,
        addCursorToPoints,
        makeLines,
        paintLines
      )(time);
  
      window.requestAnimationFrame(render);
    };
  
    // Initialization
    start = window.performance.now();
    setSize();
  
    // Set event handlers
    window.onresize = setSize;
    document.querySelector('body').addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('wheel', wheelHandler);
  
    // Get initial points
    points = seedPoints(numPoints);
  
    // Partial application of movePoints function 
    const movePointsBound = movePoints.bind(null, points, virtualWidth, virtualHeight);
  
    // Start animation
    window.requestAnimationFrame(render);
  };
  