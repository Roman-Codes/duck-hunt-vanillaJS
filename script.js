const duck = document.querySelector('.duck');
const screenWidth = document.querySelector('body').clientWidth;
const screenHeight   = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight;
let posX = 0;
let posY = 0;
let directionX = true;
let dead = false;

const allDucks = document.querySelectorAll('div.duck');

const kill = e => {
    console.log(e.target);
    const element = e.target;
    dead = !dead;
    element.style.background = 'url(./sprites/brown-kill.png)';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.animationName = 'none';
    // need to remove event listener here
    setTimeout(() => {e.target.style.background = 'url(./sprites/brown-down.png)'}, 1500);

}

allDucks.forEach( duck => {
    duck.addEventListener('click', kill);
});

const fall = (id) => {
    const element = document.getElementById(id);
    posY = element.offsetHeight;
    fallInterval = setInterval(frame);
    function frame(){
        posY++;
        element.style.top = posY + 'px';

        if (posY === (screenHeight - 100)){
            element.remove();
        }
    }
}

const move = (id, speed) => {
    const element = document.getElementById(id);
    element.style.transform = 'scaleX(1)';
    interval = setInterval(frame, speed);
    function frame(){
        if(directionX){
            posX++;
            element.style.left = posX + 'px';
            switchDirection(id);
        }

        if(!directionX){
            posX--;
            element.style.left = posX + 'px';
            switchDirection(id);
        }

        if(dead){
            clearInterval(interval);
            element.style.left = posX + 'px';
            setTimeout(()=> {fall(id)}, 1500);
        }
    }
}

const switchDirection = (id) =>{
    const element = document.getElementById(id);
    if(posX === screenWidth){
        element.style.transform = 'scaleX(-1)';
        directionX = !directionX;
    }
    if (posX === 0){
        element.style.transform = 'scaleX(1)';
        directionX = !directionX;
    }
}

// move('duck-1', 10);
// move('duck-2', 20);
move('duck-3', 30);