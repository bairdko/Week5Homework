

//variables
var correct = 0;
var incorrect = 0;
var i = 0;


//location variables
var timer = $("#timer");
var questionLoc = $("#question");
var correctLoc = $("#correct");
var incorrectLoc = $("#incorrect");


//array of answers
var trivia = [
  {question:"Question1",
   answerChoices:["opt A","opt B","opt C","opt D"],
   key: [true,false,false,false]},
  {question:"Question2",
   answerChoices:["opt a","opt b","opt c","opt d"],
   key:[false,false,true,false]} 
];


//timer 
var timeLeft = 30;
var timerDisplay = setInterval(countdown,1000);

function restartTimer(){
  timeLeft = 30;
  timer.text(timeLeft);
  timerDisplay = setInterval(countdown,1000);
};

function countdown(){
  timeLeft--;
  timer.text(timeLeft);
  if(timeLeft <= 0){
    clearInterval(timerDisplay);
  }
  
}

//sets questions and answers

function setQuestion(){
  var listRef = $("ol");

  questionLoc.html("<h3>" + trivia[i].question + "</h3>");

  for(var j = 0; j < trivia[i].answerChoices.length; j++){
    listRef.append('<li class = "answers" val = "' + trivia[i].key[j] + '">'+trivia[i].answerChoices[j]+'</li>');
    
  }
}

function changeQuestion(){

  $('li').css("background-color","transparent");

  if(i === trivia.length){
    $('ol').empty();
    clearInterval(timerDisplay);
    questionLoc.text("You've answered all the questions! Press restart game to play again");
  }
  else{
    $('ol').empty();
    setQuestion();
  }
}

function testAnswer(){
  var selectedButton = $(this);
  var isCorrect = $(this).attr("val");

  if(isCorrect === "true"){
    correct++;

    clearInterval(timerDisplay);
    selectedButton.css("background-color","rgba(23,162,184,.6)");

    setTimeout(function(){
      correctLoc.text(correct);
      restartTimer();
      i++;
      changeQuestion();
    },1000);

  }
  else{
    incorrect++;

    clearInterval(timerDisplay);
    $('li[val="true"]').css("background-color","rgba(23,162,184,.6)");
    selectedButton.css("background-color","rgba(247,200,184,.6)");
    
    setTimeout(function(){
      incorrectLoc.text(incorrect);
      restartTimer();
      i++;
      changeQuestion();
    },1000);

  }

  if(timeLeft = 0){
    console.log(loser);
  }

}

function restartGame(){
  i = 0;
  correct = 0;
  incorrect = 0;

  correctLoc.text(correct);
  incorrectLoc.text(incorrect);
  
  restartTimer();
  changeQuestion();
}

setQuestion();

//test if true
$(document).on("click",".answers",testAnswer);

//THIS IS NOT COMPLETE, NEED TO MAKE IT SO THAT THE GAME TURNS OFF IF YOU DONT ANSWER AFTER 30 seconds
$(document).on("click","#restart",restartGame);
