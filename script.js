// Set up the canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Archer properties
const archer = {
    x: 50,
    y: canvas.height - 100,
    width: 40,
    height: 60,
    color: "brown"
};

// Arrow properties
const arrows = [];
const arrowSpeed = 5;

// Target properties
const target = {
    x: canvas.width - 100,
    y: 100,
    width: 40,
    height: 40,
    color: "red",
    speed: 2,
    direction: 1
};

let score = 0;
let misses = 0;

// Controls
document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft" && archer.x > 10) {
        archer.x -= 20;
    } else if (event.code === "ArrowRight" && archer.x < canvas.width - archer.width - 10) {
        archer.x += 20;
    } else if (event.code === "Space") {
        // Shoot an arrow
        arrows.push({ x: archer.x + 15, y: archer.y, width: 5, height: 15, color: "black" });
    }
});

// Function to update game elements
function update() {
    // Move arrows
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].y -= arrowSpeed;

        // Check if arrow hits target
        if (
            arrows[i].y <= target.y + target.height &&
            arrows[i].x >= target.x &&
            arrows[i].x <= target.x + target.width
        ) {
            score += 10;
            arrows.splice(i, 1);
            break;
        }

        // Remove arrows if they go off screen
        if (arrows[i] && arrows[i].y < 0) {
            arrows.splice(i, 1);
            misses++;
        }
    }

    // Move target
    target.x += target.speed * target.direction;
    if (target.x <= 0 || target.x + target.width >= canvas.width) {
        target.direction *= -1;
    }

    // End game if too many misses
    if (misses >= 5) {
        alert(`Game Over! Your score: ${score}`);
        document.location.reload();
    }
}

// Function to draw elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw archer
    ctx.fillStyle = archer.color;
    ctx.fillRect(archer.x, archer.y, archer.width, archer.height);

    // Draw arrows
    for (let arrow of arrows) {
        ctx.fillStyle = arrow.color;
        ctx.fillRect(arrow.x, arrow.y, arrow.width, arrow.height);
    }

    // Draw target
    ctx.fillStyle = target.color;
    ctx.fillRect(target.x, target.y, target.width, target.height);

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Misses: ${misses}/5`, 10, 60);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
