const duck = document.querySelector('.duck');
const screenWidth = document.querySelector('body').clientWidth;
const screenHeight = document.querySelector('body').clientHeight;
let pos = 0;
let directionX = true;

const move = (id, speed) => {
    const element = document.getElementById(id);
    element.style.transform = 'scaleX(1)';
    setInterval(frame, speed);
    function frame(){
        if(directionX){
            pos++;
            element.style.left = pos + 'px';
            switchDirection(id);
        }
        if(!directionX){
            pos--;
            element.style.left = pos + 'px';
            switchDirection(id);
        }
    }
}

const switchDirection = (id) =>{
    const element = document.getElementById(id);
    if(pos === screenWidth){
        element.style.transform = 'scaleX(-1)';
        directionX = !directionX;
    }
    if (pos === 0){
        element.style.transform = 'scaleX(1)';
        directionX = !directionX;
    }
}

// move('duck-1', 10);
// move('duck-2', 5);
// move('duck-3', 20);