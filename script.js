const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const upButton = document.getElementById('up');
const leftButton = document.getElementById('left');
const downButton = document.getElementById('down');
const rightButton = document.getElementById('right');

const scale = 20;
const rows = 20;
const columns = 20;
canvas.width = columns * scale;
canvas.height = rows * scale;

let snake;
let fruit;
let score = 0;

function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
            score++;
            scoreElement.innerText = 'Score: ' + score;
        }

        snake.checkCollision();
    }, 250);
}

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

    this.draw = function() {
        ctx.fillStyle = "#4cafab";
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        ctx.fillRect(this.x, this.y, scale, scale);
    };

    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.total - 1] = { x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= canvas.width) {
            this.x = 0;
        }
        if (this.y >= canvas.height) {
            this.y = 0;
        }
        if (this.x < 0) {
            this.x = canvas.width - scale;
        }
        if (this.y < 0) {
            this.y = canvas.height - scale;
        }
    };

    this.changeDirection = function(direction) {
        switch (direction) {
            case 'Up':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale * 1;
                }
                break;
            case 'Down':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                }
                break;
            case 'Left':
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                }
                break;
            case 'Right':
                if (this.xSpeed === 0) {
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                }
                break;
        }
    };

    this.eat = function(fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        }
        return false;
    };

    this.checkCollision = function() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                this.total = 0;
                this.tail = [];
                score = 0;
                scoreElement.innerText = 'Score: ' + score;
            }
        }
    };
}

function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = Math.floor(Math.random() * columns) * scale;
        this.y = Math.floor(Math.random() * rows) * scale;
    };

    this.draw = function() {
        ctx.fillStyle = "#4caf50";
        ctx.fillRect(this.x, this.y, scale, scale);
    };
}

window.addEventListener('keydown', (evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
});

upButton.addEventListener('click', () => snake.changeDirection('Up'));
leftButton.addEventListener('click', () => snake.changeDirection('Left'));
downButton.addEventListener('click', () => snake.changeDirection('Down'));
rightButton.addEventListener('click', () => snake.changeDirection('Right'));

setup();
