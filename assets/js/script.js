function roll(event){
    event.preventDefault();
    let computerResult=Math.floor(Math.random()*5); //Generates a number between 0-4
    console.log(computerResult)
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

function playerAnswer(){
    if(document.getElementById('rock').checked) {
        console.log('rock');
    } else if(document.getElementById('paper').checked) {
          console.log('paper');
    } else if(document.getElementById('scissors').checked) {
        console.log('scissors');
    } else if(document.getElementById('lizard').checked) {
        console.log('lizard');
    } else if(document.getElementById('spock').checked) {
        console.log('spock');
    }
}

/* The above code checks the player's input and responds
accordingly. Currently, it only logs to the console, but
in a future version, I'll use it to compare the player's
answer to the computer's to see who wins.
*/