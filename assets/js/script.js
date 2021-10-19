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
of the <form> now. This is because targetting the <form>
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

function win(){
    document.getElementById('results-box').innerHTML = "Win!"; //Changes the <div>'s content to say Win!
}

function lose(){
    document.getElementById('results-box').innerHTML = "Lose!"; //Changes the <div>'s content to say Lose!
}

function draw(){
    document.getElementById('results-box').innerHTML = "Draw!"; //Changes the <div>'s content to say Draw!
}

function checkResults(){
    if (result == computerResult){
        draw();
    } else if(result < computerResult){
        win();
    }else if(result > computerResult){
        lose();
    }
}