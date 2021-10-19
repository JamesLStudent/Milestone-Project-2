function roll(event){
    event.preventDefault();
    let computerResult=Math.floor(Math.random()*5);
    console.log(computerResult)
}
let gameForm = document.getElementsByTagName('input');
gameForm[0,1,2,3,4].addEventListener('submit', roll);