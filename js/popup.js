'use strict';

export default class popUp{
    constructor (){
        this.popUp = this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        popUpRefresh.addEventListener('click', () =>{
                this.onClick && this.onClick();
                hide();
              });
        }
    
    setClickListener(onClick){
        this.onClick = onclick; //맴버변수
    }

    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
      }

    hide(){
        this.popUp.classList.add('pop-up--hide');
    }
}