'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect(); //field의 전체적인 사이즈와 위치까지 알수 있도록
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up__refresh');
const popUpText = document.querySelector('.pop-up__message');

const carrotSound = new Audio('./sound/carrot_pull.mp3'); //audio HTMLElement Return
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');

let started = false; //게임의 상태를 알고있는 변수 (시작)
let score = 0; //최종 점수기억
let timer = undefined; //총 얼마만의 시간이 남았는지 기억 초기 시작되지 않았을 때는 undefined

field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () =>{
  if(started){
      stopGame();
  } else{
      startGame();
  }
});
popUpRefresh.addEventListener('click', ()=> {
    startGame();
    hidePopUp();
});


function startGameTimer(second){
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec); //시작전에 업데이트
    timer = setInterval(() => {
        if(remainingTimeSec <= 0){ //interval이 1초마다 불려질때, 남아있는 시간이 0초보다 같거나 작다면?
            clearInterval(timer) //진행되지 않도록 
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec) //계속 게임이 돌아가고 있다면, 동일하게 update를 쓰고 그 후에는 
        //5초로 시작했다면 한바퀴 돌고나서 4초로 바뀌고 .. 하나씩 줄어야함.
    },1000);
}

function stopGameTimer(){
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60); //floor는 integer함수로 소수점을 내려주는 함수
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function startGame(){
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopUpWithText('REPLAY?');
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win){
    started = false;
    hideGameButton();
    if(win){
        playSound(winSound);
    }else{
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopUpWithText(win ? 'YOU WON!!' : 'YOU LOST');
}

function showStopButton(){
    const icon = document.querySelector('.fas')
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function hideGameButton(){
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function showPopUpWithText(text){
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide');
}

function hidePopUp(){
    popUp.classList.add('pop-up--hide')
}

function StartGame(){
    score = 0;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function initGame(){
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    console.log(fieldRect);
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFieldClick(event){
    if(!started){
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')){ //matches css selector가 맞는지 확인하는 함수!
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
    if(score === CARROT_COUNT){
        finishGame(true);
    }
    }else if(target.matches('.bug')){
        finishGame(false);
        }
    } 


function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}

function updateScoreBoard(){
    gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for(let i =0 ; i < count ; i++){
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

function randomNumber(min, max){
   return Math.random() * (max - min) + min;
}


//재생버튼을 누르면 게임이 초기화가 되면서 다시 랜덤되고, 타이머가 시작되는것! 그리고 남은당근 갯수 표기
 
