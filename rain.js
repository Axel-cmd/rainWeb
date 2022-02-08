const canvas = document.querySelector('canvas');
var canvasContext;

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const fps = 60;
var allRains = [];
var defaultRainProperties = { 
    quantity: 1500,
    width: 2,
    minHeight: 30,
    maxHeight: 60,
    color: 'rgba(100, 0, 150, 0.5)'
}

const verifyThatCanvasIsSupported = () => {
    if (canvas.getContext) {
        canvas.width = windowWidth;
        canvas.height = windowHeight;
        canvasContext = canvas.getContext("2d");
        return true;
    } else {
        console.error("Oops canvas is not supported !");
        return false;
    }
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
        //'rgb(0, 0, 200)'
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

const randomizeRainPosition = (min, max) => {
    return randomize(min, max);
}

const randomizeRainScale = () => {
    return randomize(defaultRainProperties.minHeight, defaultRainProperties.maxHeight)
}

const createAllRect = () => {
    for(let rect = 0; rect < defaultRainProperties.quantity; rect++){
        allRains.push(new Rain(
            
            {x: randomizeRainPosition(0, windowWidth), y: randomizeRainPosition(-windowHeight, 0)}, 
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
        update();
    }, 1000/fps)
}

drawScene();



