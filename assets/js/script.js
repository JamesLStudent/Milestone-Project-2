function roll(event){
    event.preventDefault();
    let computerResult=Math.floor(Math.random()*5);
    console.log(computerResult)
}
let gameForm = document.getElementById('game-form');
gameForm.addEventListener('submit', roll);