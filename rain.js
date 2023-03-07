const canvas = document.querySelector('canvas');
var canvasContext;

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const fps = 60;
const allRains = [];
const defaultRainProperties = { 
    quantity: 100,
    width: 2,
    minHeight: 30,
    maxHeight: 60,
    color: 'rgba(98, 213, 255, 0.8)'
}

const verifyThatCanvasIsSupported = () => {
    if (canvas.getContext) {
        canvas.width = windowWidth;
        canvas.height = windowHeight;
        canvasContext = canvas.getContext("2d");
        return true;
    } 

    console.error("Canvas is not supported !");
    return false;
}


const createBackground = () => {
    canvasContext.fillStyle = 'rgba(9, 7, 74, 0.8)';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

class Rain{

    constructor(position, width, height, color){
        this.x = position.x;
        this.y = position.y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.speed = 10;
    }

    createRect(context){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    setPositionY(){
        if(this.y >= window.innerHeight){
            this.y = -20;

        } else {
            this.y += this.speed;
        }
    }

    move(context) {
        context.clearRect(this.x, this.y, this.width, this.height);
        this.setPositionY()
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

const randomize = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const randomizeRainScale = () => {
    return randomize(defaultRainProperties.minHeight, defaultRainProperties.maxHeight)
}

const createAllRect = () => {
    for(let rect = 0; rect < defaultRainProperties.quantity; rect++){
        allRains.push(new Rain(
            
            {x: randomize(0, windowWidth), y: randomize(-windowHeight, 0)}, 
            defaultRainProperties.width, 
            randomizeRainScale(), 
            defaultRainProperties.color
        ));
        allRains[rect].createRect(canvasContext);
    }
}

const update = () => { 
    for(let rect = 0; rect < defaultRainProperties.quantity; rect++){
        allRains[rect].move(canvasContext);
    }
}

const drawScene = () => {
    let canvasSupported = verifyThatCanvasIsSupported();
    if(!canvasSupported) return false;
    createAllRect();
    setInterval(() => {
        // createBackground();
        update();
    }, 1000/fps)
}

drawScene();



