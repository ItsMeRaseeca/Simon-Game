var gamePattern = [];
var randomChosenColour;
var userClickedPattern = [];
var level = 0;
var started = false;


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    userClickedPattern = [];  //IMP.
    var buttonColours = ["red","blue","green","yellow"];
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);  //IMP-2
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColour){
    $('#'+currentColour).addClass("pressed");
    setTimeout(function(){
        $('#'+currentColour).removeClass("pressed");
    },100);
}

$(document).on("keydown",function(){
    if(started===false){
        nextSequence();
        started = true;
        $("#level-title").text("Level 1");
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
      var count = 0;
      for (var i = 0; i < gamePattern.length; i++) {
        if(gamePattern[i] === userClickedPattern[i]){
          count++;
        }
      }
      if(count === gamePattern.length){
        setTimeout(function(){
            nextSequence();
          }, 1000);
      }
    } else {
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over");
        $("h2").text("(Press Any Key to Restart)")
        startOver();
    }
  }
   
  function startOver(){
    level = 0;
    gamePattern = [];
    pressed = false;
  }
