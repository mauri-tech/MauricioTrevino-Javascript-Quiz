// Defined an array of objects called "quizQuestions", which contains the quiz questions and answer choices.
var quizQuestions = [{
    question: "What is the correct syntax for declating a variable in Javascript?",
    choiceA: "var MyVariable",
    choiceB: "variable myVariable",
    choiceC: "#myVariable",
    choiceD: "!myVariable",
    correctAnswer: "a"},
  {
    question: "How do you add a comment in JavaScript?",
    choiceA: "/* This is a comment */",
    choiceB: "// This is a comment",
    choiceC: "' This is a comment",
    choiceD: "# This is a comment",
    correctAnswer: "b"},
   {
    question: "How do you create a function in JavaScript?",
    choiceA: "function myFunction() {}",
    choiceB: "function = myFunction() {}",
    choiceC: "myFunction() {}",
    choiceD: "new function myFunction() {}",
    correctAnswer: "a"},
    {
    question: "What is the correct way to write a for loop in JavaScript?",
    choiceA: "for i = 0 to 10",
    choiceB: "for (i <= 10; i++)",
    choiceC: "for (i = 0; i <= 10)",
    choiceD: "for i = 0, i <= 10, i++",
    correctAnswer: "b"},
    {
    question: "How do you access the value of an element with the id \"myElement\" in JavaScript?",
    choiceA: "document.getElementById(\"myElement\")",
    choiceB: "document.myElement",
    choiceC: "#myElement",
    choiceD: "document.valueOf(\"myElement\")",
    correctAnswer: "a"},  
    {
    question: "The extention of Javascript is:",
    choiceA: "script.html",
    choiceB: "script.js",
    choiceC: "script.doc",
    choiceD: "script.png",
    correctAnswer: "b"},
    {
    question: "[Bonus 😂]What do you get when you mix a JavaScript developer with a bottle of water?",
    choiceA: "Null",
    choiceB: "Undefined",
    choiceC: "NaN",
    choiceD: "A wet programmer",
    correctAnswer: "b"},    
    ];

// Define variables in HTML for manipulation
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var endGameBtns = document.getElementById("endGameBtns");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDisplayName = document.getElementById("highscore-initials");
var highscoreDisplayScore = document.getElementById("highscore-score");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var quizBody = document.getElementById("quiz");
var quizTimer = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var resultsEl = document.getElementById("result");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var submitScoreBtn = document.getElementById("submitScore");

// Variables used in progress tracking 
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// These functions will be used to control the flow of the quiz.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none"; // Hide the gameover screeen
    startQuizDiv.style.display = "none"; // Hide the start screen
    generateQuizQuestion(); // Generate the first quiz question

    //Star the timer
    timerInterval = setInterval(function() {
        timeLeft--; // Decrement the time left by 1 sec
        quizTimer.textContent = "Time left: " + timeLeft; // Update the timer on the page
    

// If times runs out, show the score
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block"; // Show quiz body
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quizBody.style.display = "none" // Hide quiz body
    gameoverDiv.style.display = "flex"; // Show the gameover screen
    clearInterval(timerInterval); // Stop timer 
    highscoreInputName.value = ""; // Clear the highscore input field
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!"; // Display final score
}


submitScoreBtn.addEventListener("click", function highscore(){

// if the user didnt enter their initials, show error msg
    if(highscoreInputName.value === "") {
        alert("⚠️ Initials cannot be blank");
        return false;
    }else{

// Retrive the saved highscores from local storage or create an empty array if none are found
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        
// Trim any white space      
        var currentUser = highscoreInputName.value.trim();

// Create an object to hold the user's score and initials        
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    

// Hide the gameover screen and show the highscores        
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// Displays a list of high scores from local storage. 
// the function "generateHighscores()"" first clears the list of high scores from the page, 
// then retrieves the saved high scores from local storage and parses them into a JavaScript object. 
// tt then loops through this object, creating a new li element for each name and score, 
// and appending these elements to the corresponding lists on the page.
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}
// The showHighscore() function hides the other pages and displays the high scores page, 
// and calls generateHighscores() to populate the page with the list of scores.

function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This funct is responsible for resetting the game state so that the quiz can be played again. 
// The "clearScore" function clears the high scores from local storage and removes the displayed high scores from the page. 
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function hides the high scores page and game over page, shows the start quiz page, and resets the timer, score, and current question index to their initial values.
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
}


function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;


 // Check if the user's answer is correct 
    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;

// Increment the score and display a message to the user indicating that their answer is correct
        alert("Correct answer ✅ ");
 // Move on to the next question         
        currentQuestionIndex++;
        generateQuizQuestion();
        //Check if answer is incorrect
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
 // Display a message to the user indicating that their answer is incorrect
        alert("That's not correct ❌")
        timeLeft -= 10;
// Move on to the next question and substract 10sec
        currentQuestionIndex++;
        generateQuizQuestion();
// If the current question is the last question, display the final score to the user
    }else{
        showScore();
    }
}
// Trigger to start javascript quiz
startQuizButton.addEventListener("click",startQuiz);



         
