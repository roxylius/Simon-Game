//Arrays
let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];

//staring level
var level = 0;

//game started
var gameStarted = false;

//changing title levels
function changeTitle(number) {
    $("h1#level-title").html('level ' + number);
}

//detects keypress
$(document).on('keypress', function () {
    if (gameStarted == false) {
        changeTitle(level);
        nextSequence();
        gameStarted = true;
    }
});

//for every new level
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4); //rand int 
    var randomChosenColor = buttonColors[randomNumber]; //color 
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100); //animation
    playSound(randomChosenColor); //audio
    gamePattern.push(randomChosenColor); //storing game pattern
    level++;
    changeTitle(level);
    userClickedPattern = [];
}

//play Audio
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

//Animation when button pressed
function animatePress(name) {
    $('#' + name).addClass("pressed");
    setTimeout(function () {
        $('#' + name).removeClass("pressed");
    }, 100);
}


//EventListeners on buttons
$(".btn").on('click', function () {
    var clickedColor = $(this).attr('id');
    playSound(clickedColor);
    animatePress(clickedColor);

    //clicks a button when game is started
    if (gameStarted == true) {
        userClickedPattern.push(clickedColor);
        checkGamePattern();
    }else{
        gameNotStarted();
    }
});

//game logic
function checkGamePattern() {
    var ifPatternMatch = 0;
    var colorMatched;

    //check color pattern in both array evertime a new button is clicked not for every level
    for (let i = 0; i < userClickedPattern.length; i++) {
        colorMatched = userClickedPattern[i] == gamePattern[i];

        if (colorMatched == false) {
            gameOver();
            break;
        } else {
            ifPatternMatch++;
        }
    }

    //checks computer pattern array length with user entered array length also check if all color matched 
    if ((ifPatternMatch == gamePattern.length) && (colorMatched == true)) {
        setTimeout(function () {
            nextSequence();
        }, 800);
    }
}

//game over (when wrong color is clicked)
function gameOver() {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
        $('body').removeClass('game-over');
    }, 100);
    $('h1').html('Game Over, Press Any Key To Restart');
    gameStarted = false;   
    level = 0;
    gamePattern = [];           //resets pattern
    userClickedPattern = [];    //resets pattern
}

//user clicks a button when game has not started
function gameNotStarted() {
    $('h1').html('Please! Press Any Key To Start The Game');
    playSound('wrong');                  //To alert user to press a key
    $('body').addClass('game-over');     //game over css
    setTimeout(function () {
        $('body').removeClass('game-over');
    }, 100);
}

//logging 
$(document).on('click', function log() {
    console.log(userClickedPattern);
    console.log(gamePattern);
    console.log(userClickedPattern.length);
});