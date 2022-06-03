var questions = [
    {
    question: "Which of the following is true about variable naming conventions in JavaScript?",
    answers: {
     a: "You should not use any of the JavaScript reserved keyword as variable name.",
     b: "JavaScript variable names should not start with a numeral (0-9)",
     c: "Both of the above"
    },
     correctAnswer: "c"
    },
    {
        question: "Can you assign a anonymous function to a variable?", 
        answers: {
        a: "True",
        b: "False",
        c: "Maybe..?"
        },
        correctAnswer: "a"
        
    },
    {
        question: "Why so JavaScript and Java have similar name?",
        answers: {
        a: "JavaScript is a stripped-down version of Java",  
        b: "JavaScript's syntax is loosely based on Java's",
        c: "None of the above"
        },
        correctAnswer: "b"
    },
    {
        question: " Which of the following attribute can hold the JavaScript version?",
        answers: {
        a: "LANGUAGE",
        b: "SCRIPT",
        c: "VERSION"
        },
        correctAnswer: "a"
    },
    {
        question: "Which of the following is correct about JavaScript?",
        answers: {
        a: "JavaScript is Assembly-language",
        b: "JavaScript is an Object-Based language",
        c: "JavaScript is an Object-Oriented language"
        },
        correctAnswer: "b"
    },
    {
        question: "Arrays in JavaScript are defined by which of the following statements?",
        answers: {
        a: "It is an ordered list of string",
        b: "It is an ordered list of objects", 
        c: "It is an ordered list of values"
        },
        correctAnswer: "c"
    },
    {
        question: "And Finally What is JavaScript?",
        answers: {
        a: " JavaScript is a scripting language used to make the website interactive",
        b: "JavaScript is an assembly language used to make the website interactive", 
        c: "JavaScript is a compiled language used to make the website interactive"
        },
        correctAnswer: "a"
    }
    
]
var score = 0;
var questionIndex = 0;
var time = 180;
var intervalId = 180;
var initialsElement = document.getElementById('initials');

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const startButton = document.getElementById('start-btn');
const resultsText = document.getElementById('resultsText');
const initialInput = document.getElementById('initialInput');
const submitInitialsBtn = document.getElementById('submitInitialsBtn');
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");
var timer = document.getElementById("timer");
var highScoreSection = document.getElementById("highScoreSection");
var goBackBtn = document.getElementById("goBackBtn");
var listOfHighScores = document.getElementById("listOfHighScores");
var start = document.getElementById("start");

startButton.addEventListener("click", startQuiz);

function startQuiz(){
    questionIndex = 0;
    score = 0
    time = 120
    updateCountdown();
    timer.classList.remove("hidden");
    quizTimer();
    start.classList.add("hidden");
    var quiz = document.getElementById('quiz')
    quiz.classList.remove("hidden");
    showQuestion(questionIndex);
    
}
 
function showQuestion(index) {
    if( index > questions.length - 1){
        clearInterval(intervalId);
        quizContainer.classList.add("hidden");
        resultsText.textContent = ("Quiz Complete. Your score is " + score);
        initialInput.classList.remove("hidden");
        timer.classList.add("hidden");
       
       
    } else {
        resultsContainer.classList.add("hidden");
        initialInput.classList.add("hidden");
        var question = document.getElementById('question')
        var answer1 = document.getElementById('answer1')
        var answer2 = document.getElementById('answer2')
        var answer3 = document.getElementById('answer3')
    
        question.textContent = questions[index].question
        answer1.textContent = questions[index].answers.a
        answer2.textContent = questions[index].answers.b
        answer3.textContent = questions[index].answers.c
    }  
}

function submitAnswer(button){
    
      var answerSelected = button.textContent
      var correctAnswerKey = questions[questionIndex].correctAnswer
      var correctAnswerValue = questions[questionIndex].answers[correctAnswerKey]
     
     if (answerSelected === correctAnswerValue){
        resultsText.textContent = "Correct!";
        score++;
      } else {
        
        resultsText.textContent = "Wrong! Correct answer is " + correctAnswerValue ;
        time = time - 20;
      }
      questionIndex++;
      showQuestion(questionIndex)
      resultsContainer.classList.remove("hidden");
      
}   
   var saveHighScore = function(event) {
       event.preventDefault();
       if (initialsElement.value === "") {
        alert("Enter your initials!");
        return;
    } 
    quizContainer.classList.add("hidden");
        timer.classList.add("hidden");
        highScoreSection.classList.remove("hidden");

        var savedHighScores = localStorage.getItem("highscore");
        var scoresArray;
    
        if (savedHighScores === null) {
            scoresArray = [];
        } else {
            scoresArray = JSON.parse(savedHighScores)
        }

    var playerScore = 
    {
       "score": score,
       "initials": initialsElement.value
    }
    scoresArray.push(playerScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    localStorage.setItem('highscore', scoresArrayString);
    
    showHighScores();
  };

  var i = 0;
  function showHighScores() {
    resultsContainer.classList.add("hidden");
    timer.classList.add("hidden");
    highScoreSection.classList.remove("hidden");

    if (savedHighScores === null) {
        return;
    }

    var savedHighScores = localStorage.getItem("highscore");
    var storedHighScores = JSON.parse(savedHighScores);
    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}
  
    submitInitialsBtn.addEventListener("click", function(event){ 
        saveHighScore(event);
    });

    viewHighScore.addEventListener("click", function(event) { 
        showHighScores(event);
    });

    goBackBtn.addEventListener("click", function() {
        highScoreSection.classList.add("hidden");
        resultsContainer.classList.add("hidden");
        start.classList.remove("hidden");
    });

    clearHighScoreBtn.addEventListener("click", function(){
        localStorage.removeItem("highscore");
        listOfHighScores.innerHTML = "High Scores Cleared!";
    });
    
  
  function quizTimer() {
   intervalId = setInterval(updateCountdown, 1000);
  }

  function updateCountdown() {
    const countdownEl = document.getElementById('time');
    const minutes = Math.floor(time / 60);
    var seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    if (time > 0) {
        time--;
    } else {
        countdownEl.innerHTML = "Time's Up";
    }
   }