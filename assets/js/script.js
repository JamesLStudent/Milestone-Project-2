let computerResult = "";
function roll(event){
    event.preventDefault();
    computerResult = Math.floor(Math.random()*5); //Generates a number 0-4
    console.log('computer value: '+computerResult);
    playerAnswer();
}
let gameForm = document.getElementsByTagName('input');
gameForm[0,1,2,3,4].addEventListener('submit', roll);

/* note that gameForm targets <input> elements instead
of the <form>. This is because targetting the <form>
caused <label>s to fire the same event as <input>s upon
submit, causing two events where only one was warranted.
This bug was solved thanks to users on Stack Overflow,
linked in the README */

let result = "";
function playerAnswer(){
    if(document.getElementById('rock').checked) {
        result = 0;
        console.log('player value: ' + result);
        checkResults()
    } else if(document.getElementById('paper').checked) {
        result = 1;
        console.log('player value: ' + result);
        checkResults()
    } else if(document.getElementById('scissors').checked) {
        result = 2;
        console.log('player value: ' + result);
        checkResults()
    } else if(document.getElementById('lizard').checked) {
        result = 3;
        console.log('player value: ' + result);
        checkResults()
    } else if(document.getElementById('spock').checked) {
        result = 4;
        console.log('player value: ' + result);
        checkResults()
    }
}

/* The above code checks the player's selection and responds
accordingly.
*/

let compOptions = ["rock", "paper", "scissors", "lizard", "spock"];
let resultsBox = document.getElementById('results-box');
let score = document.getElementById('score');
let totalScore = 0;
function win(){
    resultsBox.innerHTML = "comp picked " + compOptions[computerResult] + "! you win!";
    //Changes the <div>'s content to say what computer picked and that you won!
    totalScore++
    score.innerHTML = totalScore;
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
    if (result == computerResult){      //if player and computer choose the same
        draw();                         //it's a draw
    }
    if(result==0){                      //if player chooses rock
        if(computerResult==2){          //if computer chooses scissors
            win();                      //player wins
        } else if (computerResult==3){  //if computer chose lizard
            win();                      //player wins
        } else if (computerResult==1){  //if computer chose paper
            lose();                     //player loses
        } else if (computerResult==4){  //if computer chose spock
            lose();                     //player loses
        }
    }
    if(result==1){                      //if player chooses paper
        if(computerResult==2){          //if computer chooses scissors
            lose();                     //player loses
        } else if (computerResult==3){  //if computer chose lizard
            lose();                     //player loses
        } else if (computerResult==0){  //if computer chose rock
            win();                      //player wins
        } else if (computerResult==4){  //if computer chose spock
            win();                      //player wins
        }
    }
    if(result==2){                      //if player chooses scissors
        if(computerResult==1){          //if computer chooses paper
            win();                      //player wins
        } else if (computerResult==3){  //if computer chose lizard
            win();                      //player wins
        } else if (computerResult==0){  //if computer chose rock
            lose();                     //player loses
        } else if (computerResult==4){  //if computer chose spock
            lose();                     //player loses
        }
    }
    if(result==3){                      //if player chooses lizard
        if(computerResult==2){          //if computer chooses scissors
            lose();                     //player loses
        } else if (computerResult==1){  //if computer chose paper
            win();                      //player wins
        } else if (computerResult==0){  //if computer chose rock
            lose();                     //player loses
        } else if (computerResult==4){  //if computer chose spock
            win();                      //player wins
        }
    }
    if(result==4){                      //if player chooses spock
        if(computerResult==2){          //if computer chooses scissors
            win();                      //player wins
        } else if (computerResult==3){  //if computer chose lizard
            lose();                     //player loses
        } else if (computerResult==0){  //if computer chose rock
            win();                      //player wins
        } else if (computerResult==1){  //if computer chose paper
            lose();                      //player loses
        }
    }
}

