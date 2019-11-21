const duck = document.querySelector('.duck');
const screenWidth = document.querySelector('body').clientWidth;
const screenHeight   = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight;
let posX = 0;
let posY = 0;
let directionX = true;
let dead = false;
const duckType = [
    {
        color:'blue',
        speed:20
    },{
        color:'black',
        speed:10
    },{
        color:'brown',
        speed: 30
    }
];

const currentDucks = [];

const randomDuckType = () => {
    const randomIndex = Math.floor((Math.random() * 100) / 33);
    return duckType[randomIndex];
}

const createDuck = () => {
    const duckType = randomDuckType();
    const duckId = Math.floor(Math.random()*100) + `${duckType.color}`;
    const duck = document.createElement('div')
    duck.className = `duck duck-${duckType.color}-h`;
    duck.id = duckId;
    currentDucks.push({
        color:duckType.color,
        id: duckId,
        speed: duckType.speed
    });
    return duck;
}

const getSpeed = (duckId) => {
    currentDucks.find( duck => {
        if (duck.id === duckId){
            return duck.speed
        }
    });
}

const addDuck = () => {
    const field = document.querySelector('body');
    const duck = createDuck();
    field.appendChild(duck);
    speed = getSpeed(duck.id);
    console.log(speed);
    move(duck.id, 10);
    duck.addEventListener('click', kill);
}

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
// move('duck-3', 30);
addDuck();