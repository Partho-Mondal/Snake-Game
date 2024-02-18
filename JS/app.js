// Game constants and variables
let inputDirection = {x : 0, y : 0};
const foodSound = new Audio("/Assets/music/food.mp3");
const gameOverSound = new Audio("/Assets/music/gameover.mp3");
const moveSound = new Audio("/Assets/music/move.mp3");
const musicSound = new Audio("/Assets/music/music.mp3");

let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [
    {x : 13, y : 15}
];

let food = {x : 6, y : 7};

// Game Function
function main(ctime) {    
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine() {
    // Updating the snake array and food
    if(isCollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        inputDirection = {x : 0, y : 0};
        alert("Game Over...Press enter to paly again!");
        snakeArray = [{x : 13, y : 15}];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArray[0].y == food.y && snakeArray[0].x == food.x) {
        foodSound.play();
        score += 1;
        if(score > hiscore) {
            hiscore = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscore));
            hiscoreBox.innerHTML = "High Score : "+ hiscore;
        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArray.unshift({x : snakeArray[0].x + inputDirection.x, y : snakeArray[0].y + inputDirection.y});
        let a = 2;
        let b = 16;
        food = {x : Math.round(a + (b-a)*Math.random()), y : Math.round(a + (b-a)*Math.random())};
    }

    // Moving the snake
    for(let i = snakeArray.length-2; i >= 0; i--) {
        snakeArray[i+1] = {...snakeArray[i]};
    }
    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y;

    // Display the snake
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index == 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

function isCollide(snake) {
    // If you bump into yourself
    for(let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x  && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}


// Main Logic 
musicSound.play();
const hiscoreBox = document.getElementById("hiscoreBox");
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null) {
    hiscore = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscore));
} else {
    hiscore = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score : " + hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = {x : 0, y : 1};  // Start the game
    moveSound.play();
    switch(e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
        
        default:
            break;    
    }
});
