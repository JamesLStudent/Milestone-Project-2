So, the game is running. The score works, the game tells you what the computer picked, and it'll
tell you whether you won or lost. Now I have a few tasks to choose from:

 - styling the page's CSS with images and fonts and stuff

 - increasing difficulty as the game progresses
	thoughts:
	 - needs a reset button to go back to difficulty: 0
	 - could have an increment/decrement difficulty button
	how could it work?

note: score can go up and down with difficulty, but there should be a highscore element that tells
you the highest you score has got to. This way I could just hide the difficulty element and write
a line in the rules saying the higher your score, the harder the game will get.

	 - let the computer roll twice and if one result wins, pick it?
		- doable with if() stataments, could even piggyback off
		  the checkResults() function, e.g

if(difficulty==0){
    win()
} else if(difficulty==1)
    roll() again? would run through the list of functions and checkResults again, causing a loop.
	   What if I wrote a rollAgain() function that does the same thing as roll() but doesn't
	   run playerAnswer, it just updates computerResult?
    rollAgain()
    and then what? we can't call the checkResults function if we're piggybacking the difficulty
    inside it, so how do we check if the computer won?
    we could create a new function called checkDifficulty, that way we'd only have to write it
    once and call it on each checkResults that results in a win, right? so:

let difficulty = 0;
function rollAgain(){
    computerResult = Math.floor(Math.random()*5);
}
function checkDifficulty(){
    if(difficulty == 0){
        win()
    } else if(difficulty == 1){
        rollAgain()
        checkResults()  <------------this causes a loop too, computer will reroll multiple times until the player no
    } else if(difficulty == 2){	     longer wins
        rollAgain()
    }
}

function checkResults(){
    if (result == computerResult){      //if player and computer choose the same
        draw();                         //it's a draw
    }
    if(result==0){                      //if player chooses rock
        if(computerResult==2){          //if computer chooses scissors
            checkDifficulty();          //player wins
        } else if (computerResult==3){  //if computer chose lizard
            checkDifficulty();          //player wins
        } else if (computerResult==1){  //if computer chose paper
            lose();                     //player loses
        } else if (computerResult==4){  //if computer chose spock
            lose();                     //player loses
        }


so, new problem: I need the difficulty to reroll only once, so the flow should be like this:

play > check results > if player beats comp > if difficulty is 0 > win
				            > if difficulty is 1 > roll again > if player beats comp > win
				       				              > if player lose or draw > lose or draw

but what's currently happening is this:

play > check results > if player beats comp > if difficulty is 0 > win
				            > if difficulty is 1 > roll again > if player beats comp > repeat step 5
				       				              > if player lose or draw > lose or draw

fix?

If I wrote a function that determined 0=win, 1=loss, and I replaced all the win()/lose() code in
checkResults() with that, like

let winLose = "";
function runWinLose(){
	if(winLose==0){
		win()

			winLose = 1;
		}
	}
}

and then I checked winLose outside of the checkResults function like so:

if(winLose == 0){
	win()
} else {
	lose()
}

then I could run winLose in the reroll like:

function rollAgain(){
    computerResult = Math.floor(Math.random()*5);
    console.log("computer's reroll value: "+computerResult);
}
function checkDifficulty(){         //this code should let the computer reroll a number of times
    if(difficulty == 0){            //according to the difficulty to potentially pick a 
        win()                       //winning number
    } else if(difficulty == 1){
	if(winLose == 1){
        	rollAgain()
		runWinLose()
	}
    } else if(difficulty == 2){
        rollAgain()
    }
}


NEW PROBLEM:
rerolling doesn't change winLose's value, so even if the computer wins, winLose's value doesn't change,
meaning the player might choose rock, comp might choose scissors and recognise that it's got to reroll,
then get paper, but because no step in between those means winLose changes, it still has a value of 0 which
the computer understands as a win. This leads to a problem where you can pick rock, the computer will reroll
and get paper, then log "computer picked paper! you win". Obviously the fix is to update winLose, but how do I
do that without looping it back in through checkResults()?

Here's what I'm thinking: Rework checkResults so all it does is take the player result, the computer result,
and tell you which wins. This will allow me to use it to validate wins and losses without worrying about creating
any loops. Here's how to implement this fix:

1 remove all functions from checkResults()
2 you'll now need to put these functions elsewhere. 

something like

function whoWins(){
	if (result == computerResult){
		draw();
	} else if (winLose==0){
		win();
	} else if (winLose=1){
		lose();
	}
}

NEW PROBLEM:
1. I think winLose(); is carrying over between rounds
2. I think whoWon(); may be logging before the reroll, then win(); happens, so
whoWon says you won, the computer rerolls, then win(); says "computer picked paper! you win!"
even though you picked rock and shouldn't have won
3. the reroll may happen even if the computer wins on initial roll

DIFFICULTY IS FINALLY WORKING!! YESSSSSSSS

okay, next: Score tracking. I'm thinking there should be a current score and a highscore,
so the current score can be decreased on losses but the highscore can't be

also add in a button to reset you difficulty (probably should reset scores as well)

also difficulty tracking. As difficulty increases, so should the number onscreen

SO

Highscore isn't actually tracking the highest score, it's tracking wins. I need a way to tell it
to only increment if the value of score is the same as the value of highscore. Simple stuff.

also, current score is going into negetive numbers pretty fast, and I want it to be at 0, minimum.
Could create a function that checks it's value, and if it == -1, set it to 0 again. More simple stuff.

Now that's done, I want a button to reset difficulty. Then I can move onto CSS