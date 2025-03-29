const ball = document.getElementById('ball');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const projection = document.getElementById('projection');
const shadow = document.getElementById('shadow');

const gravity = 0.01;
let animationId;
let isAnimating = false;
let isPaused = false;

const initialX = 50;
const initialY = 50;
let x = initialX;
let y = initialY;
let vx = 2;
let vy = 0;
let time = 0;

function updateProjection() {
    const angle = Math.atan2(y - initialY, x - initialX);
    const dx = 570 - initialX;
    const dy = dx * Math.tan(angle);
    const lineLength = Math.sqrt(dx ** 2 + dy ** 2);

    projection.style.width = lineLength + 'px';
    projection.style.left = initialX + 10 + 'px';
    projection.style.top = initialY + 10 + 'px';
    projection.style.transform = `rotate(${angle}rad)`;

    shadow.style.top = (dy + 50) + 'px';
}

function updateBallPosition() {
    if (isPaused) {
        return;
    }

    time += 1;

    x += vx;
    vy += gravity;
    y += vy;

    if (y + 20 > 380) {
        y = 380 - 20;
        cancelAnimationFrame(animationId);
        return;
    }

    ball.style.left = x + 'px';
    ball.style.top = y + 'px';

    updateProjection();

    animationId = requestAnimationFrame(updateBallPosition);
}

startBtn.addEventListener('click', function() {
    if (!isAnimating) {
        isAnimating = true;
        updateBallPosition();
    }
})

pauseBtn.addEventListener('click', function() {
    if (isAnimating) {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? '继续' : '暂停';
        if (!isPaused) {
            updateBallPosition();
        }
    }
});

resetBtn.addEventListener('click', function() {
    cancelAnimationFrame(animationId);
    isAnimating = false;
    isPaused = false;
    x = initialX;
    y = initialY;
    vy = 0;
    time = 0;
    ball.style.left = initialX + 'px';
    ball.style.top = initialY + 'px';
    projection.style.width = '520px';
    projection.style.left = '60px';
    projection.style.top = '60px';
    projection.style.transform = 'rotate(0rad)';
    shadow.style.top = '50px';
    pauseBtn.textContent = '暂停';
});