let computerResult = "";
function roll(event){
    event.preventDefault();
    computerResult = Math.floor(Math.random()*5); //Generates a number 0-4
    console.log('computer value: '+computerResult);
    play();                               //checks player's choice
}
let gameForm = document.getElementsByTagName('input');
gameForm[0,1,2,3,4].addEventListener('submit', roll);

/* note that gameForm targets <input> elements instead
of the <form>. This is because targetting the <form>
caused <label>s to fire the same event as <input>s upon
submit, causing two events where only one was warranted.
This bug was solved thanks to users on Stack Overflow,
linked in the README */

function play(){
    playerAnswer();
    checkResults();
    checkDifficulty();
}

let result = "";
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

/* The above code checks the player's selection and assigns it a value
called 'result' which is later compared to 'computerResult' to see who
wins
*/

let compOptions = ["rock", "paper", "scissors", "lizard", "spock"];
/* rock = 0
paper = 1
scissors = 2
lizard = 3
spock = 4 */
let resultsBox = document.getElementById('results-box');
let score = document.getElementById('score'); //score gets a <span>, used with totalScore
let totalScore = 0;          //totalscore tracks total wins, used in win() function
let difficulty = 0;
let winLose = "";                           //winLose is used with the whoWins and checkResults 
                                            //function to determinewhether the player  or
function whoWins(){                         //computer won the game
	if (result == computerResult){
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

function checkDifficulty(){         //this code should let the computer reroll if it loses
    if(difficulty == 0){            //a number of times according to the difficulty to  
            whoWins();              //potentially pick a winning number
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

function win(){
    resultsBox.innerHTML = "comp picked " + compOptions[computerResult] + "! you win!";
    //Changes the <div>'s content to say what computer picked and that you won!
    totalScore++
    score.innerHTML = totalScore;
    difficulty++
}

function lose(){
    resultsBox.innerHTML = "comp picked " + compOptions[computerResult] + "! you lost!";
    //Changes the <div>'s content to say what computer picked and that you Lose!
}

function draw(){
    resultsBox.innerHTML = "comp picked " + compOptions[computerResult] + " too! you draw!";
    //Changes the <div>'s content to say what computer picked and that you Draw!
}

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
        if(computerResult==2){              //if comp chooses scissors
            winLose=1;
        } else if (computerResult==3){      //if comp chooses lizard
            winLose=1;
        } else if (computerResult==0){      //if comp chooses rock
            winLose=0;
        } else if (computerResult==4){      //if comp chooses spock
            winLose=0;
        }
    }
    if(result==2){                      //if player chooses scissors
        if(computerResult==1){          //if comp chooses paper
            winLose=0;
        } else if (computerResult==3){  //if comp chooses lizard
            winLose=0;
        } else if (computerResult==0){  //if comp chooses rock
            winlose=1;
        } else if (computerResult==4){  //if comp chooses spock
            winLose=1;
        }
    }
    if(result==3){                      //if player chooses lizard
        if(computerResult==2){          //if comp chooses scissors
            winlose=1;
        } else if (computerResult==1){  //if comp chooses paper
            winLose=0;
        } else if (computerResult==0){  //if comp chooses rock
            winlose=1;
        } else if (computerResult==4){  //if comp chooses spock
            winLose=0;
        }
    }
    if(result==4){                      //if player chooses spock
        if(computerResult==2){          //if comp chooses scissors
            winLose=0;
        } else if (computerResult==3){  //if comp chooses lizard
            winlose=1;
        } else if (computerResult==0){  //if comp chooses rock
            winLose=0;
        } else if (computerResult==1){  //if comp chooses paper
            winLose=1;
        }
    }
}