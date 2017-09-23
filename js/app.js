var canvasWidth = 505;

// creat div tag for display score and game
var scoreDiv = document.createElement('div');

// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    this.x = x;
    this.y = y;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //  the enemies loop to left  when  reaching canvas Width
    if (this.x >= canvasWidth) {
        this.x = 0;
    }

    // To Check collision
    this.checkCollisions();
};
Enemy.prototype.checkCollisions = function() {
    // check for collision between enemy and player
    if (
        player.y + 131 >= this.y + 90 && player.x + 25 <= this.x + 88 && player.y + 73 <= this.y + 135 && player.x + 76 >= this.x + 11) {
        alert('You lose');
        player.reset();
        //decrease score
        player.score -= 1;

    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed, score, Level) {
    this.sprite = 'images/char-boy.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
    // player score
    this.score = score;
    // game level
    this.Level = Level;
};

Player.prototype.update = function() {
    // To check player reaching top
    if (player.y < 60) {
        player.reset();
        alert('You won');
        // increace score and level when player won
        this.score += 1;
        this.Level += 1;
        // icreace defaclity of game
        DifficultyOfLevel();

    }


};

// Draw the player on the screen, required method for game. show player score and Level of game

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ShowScoreAndLevel(this.score, this.Level);

};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed;
    }
    //To prevent player  from play out boundary
    if (player.y > 383) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }

};

// to Show   score of player  and level of game
var ShowScoreAndLevel = function(playerScore, gameLevel) {
    scoreDiv.innerHTML = 'Your Score: ' + playerScore + ' / ' + 'Game Level: ' + gameLevel;
    document.body.prepend(scoreDiv);
};
Player.prototype.reset = function() {
    this.x = 202.5;
    this.y = 383;
};

// icreace defaclity of game
var DifficultyOfLevel = function() {
    // To remove all enemies
    allEnemies.length = 0;

    //add enemies based on number score
    for (var i = 0; i <= player.Level; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 80, Math.random() * 256);

        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(202.5, 383, 80, 0, 1);
var enemy = new Enemy(0, Math.random() * 184 + 80, Math.random() * 256);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
