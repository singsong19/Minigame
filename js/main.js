'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect(); //field의 전체적인 사이즈와 위치까지 알수 있도록
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () =>{
  if(started){
      stopGame();
  } else{
      startGame();
  }
  started = ! started; 
});


function startGameTimer(second){
    if(second ==0){
        timer = null;
    } else{
        timer = setTimeout(function(){startGameTimer(second-1) }, 1000);
    }
}




function startGame(){
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}
function stopGame(){

        
}


function showStopButton(){
    const icon = gameBtn.querySelector('.fa-play')
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}


function initGame(){
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    console.log(fieldRect);
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for(let i =0 ; i < count ; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath)
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
   return Math.random() * (max - min) + min;
}


//재생버튼을 누르면 게임이 초기화가 되면서 다시 랜덤되고, 타이머가 시작되는것! 그리고 남은당근 갯수 표기


