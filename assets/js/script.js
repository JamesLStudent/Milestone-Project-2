let computerResult = "";
function roll(event){
    event.preventDefault();
    computerResult = Math.floor(Math.random()*5); //Generates a number between 0-4
    console.log(computerResult);
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
        checkResults()
    } else if(document.getElementById('paper').checked) {
        result = 1;
        checkResults()
    } else if(document.getElementById('scissors').checked) {
        result = 2;
        checkResults()
    } else if(document.getElementById('lizard').checked) {
        result = 3;
        checkResults()
    } else if(document.getElementById('spock').checked) {
        result = 4;
        checkResults()
    }
}

/* The above code checks the player's selection and responds
accordingly.
*/
let divResult = document.getElementById('results-box').innerHTML; //finds an empty <div>

function win(){
    divResult = "Win!"; //Changes the <div>'s content to say Win!
}

function lose(){
    divResult = "Lose!"; //Changes the <div>'s content to say Lose!
}

function draw(){
    divResult = "Draw!"; //Changes the <div>'s content to say Draw!
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