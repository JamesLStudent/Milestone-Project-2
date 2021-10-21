//----------------------------------- Event Listener and initial Roll

let computerResult = "";
function roll(event){
    event.preventDefault();
    computerResult = Math.floor(Math.random()*5); //Generates a number 0-4 and calls it computerResult
    console.log('computer value: '+computerResult);
    play();                               //runs the code to play the game
    resultsBox.setAttribute('style', 'padding:5px')
}
let gameForm = document.getElementsByTagName('input');      //event listener waiting for the
gameForm[2].addEventListener('submit', roll);               //submit button to get pressed

/* note that gameForm targets <input> elements instead
of the <form>. This is because targetting the <form>
caused <label>s to fire the same event as <input>s upon
submit, causing two events where only one was warranted.
This bug was solved thanks to users on Stack Overflow,
linked in the README */


//------------------------------- Play function and the functions it calls


function play(){
    playerAnswer();         //determines player choice
    if (result == null){
        resultsBox.innerHTML = "Pick an option before pressing play!"
    } else {
    checkResults();         //checks against comp results to find win or loss
    checkDifficulty();      //lets the comp pick again if it lost and difficulty
    }                       // is >0, and also runs the win/lose/draw functions
}

let result = null;

function playerAnswer(){
    if(document.getElementById('rock').checked) {
        result = 0;
        console.log('player value: ' + result);             //checks player's choice and returns
    } else if(document.getElementById('paper').checked) {   //a result from 0-4 based on what they
        result = 1;                                         //chose
        console.log('player value: ' + result);
    } else if(document.getElementById('scissors').checked) {
        result = 2;
        console.log('player value: ' + result);
    } else if(document.getElementById('lizard').checked) {
        result = 3;
        console.log('player value: ' + result);
    } else if(document.getElementById('spock').checked) {
        result = 4;
        console.log('player value: ' + result);
    }
}

let winLose = null;                           //winLose is used with whoWins and checkResults
function checkResults(){
    if(result==0){                          //if player chooses rock
        if(computerResult==2){              //if comp chooses scissors
            winLose=0;
        } else if (computerResult==3){      //if comp chooses lizard
            winLose=0;
        } else if (computerResult==1){      //if comp chooses paper
            winLose=1;
        } else if (computerResult==4){      //if comp chooses spock
            winLose=1;
        }
    }
    if(result==1){                          //if player chooses paper
        if (computerResult==0){      //if comp chooses rock
            winLose=0;
        } else if (computerResult==4){      //if comp chooses spock
            winLose=0;
        } else if(computerResult==2){              //if comp chooses scissors
            winLose=1;
        } else if (computerResult==3){      //if comp chooses lizard
            winLose=1;
        }
    }
    if(result==2){                      //if player chooses scissors
        if(computerResult==1){          //if comp chooses paper
            winLose=0;
        } else if (computerResult==3){  //if comp chooses lizard
            winLose=0;
        } else if (computerResult==0){  //if comp chooses rock
            winLose=1;
        } else if (computerResult==4){  //if comp chooses spock
            winLose=1;
        }
    }
    if(result==3){                      //if player chooses lizard
        if (computerResult==1){         //if comp chooses paper
            winLose=0;
        } else if (computerResult==4){  //if comp chooses spock
            winLose=0;
        } else if(computerResult==2){   //if comp chooses scissors
            winLose=1;
        } else if (computerResult==0){  //if comp chooses rock
            winLose=1;
        }
    }
    if(result==4){                      //if player chooses spock
        if(computerResult==2){          //if comp chooses scissors
            winLose=0;
        } else if (computerResult==0){  //if comp chooses rock
            winLose=0;
        } else if (computerResult==1){  //if comp chooses paper
            winLose=1;
        } else if (computerResult==3){  //if comp chooses lizard
            winLose=1;
        }
    }
}

let difficulty = 0;
function checkDifficulty(){
    if(difficulty == 0){            //this code should let the computer reroll on a loss
        checkResults();             //a number of times according to the difficulty to  
        whoWins();                  //potentially turn a loss into a win
    } else if(difficulty == 1){
        if(winLose == 0){
            rollAgain();
            checkResults();
        }
        whoWins();
    } else if(difficulty >= 2){
        if(winLose==0){
            rollAgain();
            checkResults();
            if(winLose==0){
                rollAgain();
                checkResults();
            }
        }
        whoWins();
    }
}

function whoWins(){                   //function to determine whether the player  or
	if (result == computerResult){    //computer won the game
		draw();
	} else if (winLose==0){
		win();
	} else if (winLose==1){
		lose();
	}
}

function rollAgain(){
    computerResult = Math.floor(Math.random()*5);
    console.log("computer's reroll value: "+computerResult);
}


//------------------------------------- Win, Lose and Draw functions


let compOptions = ["rock", "paper", "scissors", "lizard", "spock"];
/* rock = 0
paper = 1
scissors = 2
lizard = 3
spock = 4 */
let resultsBox = document.getElementById('results-box');
let scoreSpan = document.getElementById('score'); //scoreSpan gets a <span>, used with totalScore
let totalScore = 0;          //totalScore tracks total wins, used in win() function with highScore
let currentScore= 0;
let highScore = document.getElementById('high-score');
let wins = 0;
let diffDiv = document.getElementById("difficulty-tracker");

function win(){
    resultsBox.innerHTML = "Your opponent picked " + compOptions[computerResult] + "! You win! Congrats :)";
    //Changes the <div>'s content to say what computer picked and that you won!
    if(totalScore == currentScore){
        totalScore++
    }
    highScore.innerHTML = totalScore;
    currentScore++
    scoreSpan.innerHTML = currentScore;
    wins++
    if (wins == 3){
        difficulty++
        diffDiv.innerHTML = "Hard";            //This should increase the difficulty more slowly, and should
    }                                                                        //be easy to modify later if desired
    if (wins == 6){
        difficulty++
        diffDiv.innerHTML = "Impossible!";
    }
    console.log(wins)
    console.log(difficulty)
}

function lose(){
    resultsBox.innerHTML = "Your opponent picked " + compOptions[computerResult] + "! You lost! :(";
    //Changes the <div>'s content to say what computer picked and that you Lose!
    currentScore--
    if (currentScore < 0){
        currentScore = 0;
    }
    scoreSpan.innerHTML = currentScore;
}

function draw(){
    resultsBox.innerHTML = "Your opponent picked " + compOptions[computerResult] + " too! You draw!";
    //Changes the <div>'s content to say what computer picked and that you Draw!
}

// ------------------------------------ Reset Button

function resetScores(event){
    event.preventDefault();
    currentScore = 0;
    scoreSpan.innerHTML = 0;
    wins = 0;
    difficulty = 0;
    diffDiv.innerHTML = "Normal"
}
let diffTracker = document.getElementById('reset-button');
diffTracker.addEventListener('click', resetScores);

//resetting the difficulty also resets your current score, so you can't keep
//resetting and play on normal difficulty forever for higher win chances. 
//It does not reset your highscore, however, so you can reset to try for better
//luck while the game is at base difficulty, if you like.