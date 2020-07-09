const canvas = document.querySelector('.main-canvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

ctx.strokeStyle = '#ff0000'
ctx.lineWidth = 5;
ctx.beginPath()

var startX = 50
var startY = height/2 + 80
var speed = 10

var canvasX;
var canvasY;

function lineUp() {
    if(startX  === $(window).width() - 50) {
        startX = 50
        ctx.beginPath()
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX += 1, startY -= 2)
    ctx.stroke()
}

function lineDown() {
    if(startX  === $(window).width() - 50) {
        startX = 50
        ctx.beginPath()
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX += 1, startY += 2)
    ctx.stroke()
}

var upInterval;
var downInterval;
var upCount = true
var downCount = false

document.addEventListener('keyup', (e) =>  {

    if(e.code === "ArrowUp") { 
        if(upCount === true) {
            upCount = false
            downCount = true
            clearInterval(downInterval)
            upInterval = setInterval(lineUp, speed)
        }
    }

    else if(e.code === "ArrowRight") {
        if(downCount === true) {
            downCount = false
            upCount = true
            clearInterval(upInterval)
            downInterval = setInterval(lineDown, speed)
        }
    }
});