const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let score = 0;
let misses = 0;
let gameOver = false;

const archer = { x: 50, y: canvas.height - 80, width: 40, height: 60 };
const arrows = [];
const arrowSpeed = 5;

const target = { x: canvas.width - 100, y: 100, width: 40, height: 40, speed: 2, direction: 1 };

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft" && archer.x > 10) archer.x -= 20;
    else if (event.code === "ArrowRight" && archer.x < canvas.width - archer.width - 10) archer.x += 20;
    else if (event.code === "Space") arrows.push({ x: archer.x + 15, y: archer.y, width: 5, height: 15 });
});

function update() {
    if (gameOver) return;

    arrows.forEach((arrow, index) => {
        arrow.y -= arrowSpeed;
        if (arrow.y <= target.y + target.height && arrow.x >= target.x && arrow.x <= target.x + target.width) {
            score += 10;
            arrows.splice(index, 1);
        }
        if (arrow.y < 0) {
            arrows.splice(index, 1);
            misses++;
        }
    });

    target.x += target.speed * target.direction;
    if (target.x <= 0 || target.x + target.width >= canvas.width) target.direction *= -1;

    if (misses >= 5) {
        document.getElementById("gameOverScreen").style.display = "block";
        document.getElementById("finalScore").textContent = `Your Score: ${score}`;
        gameOver = true;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "brown";
    ctx.fillRect(archer.x, archer.y, archer.width, archer.height);
    arrows.forEach(arrow => {
        ctx.fillStyle = "black";
        ctx.fillRect(arrow.x, arrow.y, arrow.width, arrow.height);
    });
    ctx.fillStyle = "red";
    ctx.fillRect(target.x, target.y, target.width, target.height);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Misses: ${misses}/5`, 10, 60);
}

function gameLoop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(gameLoop);
}

document.getElementById("restartButton").addEventListener("click", () => {
    document.getElementById("gameOverScreen").style.display = "none";
    score = 0;
    misses = 0;
    gameOver = false;
    gameLoop();
});

gameLoop();

