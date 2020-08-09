const canvas = document.querySelector('.main-canvas');
const width = canvas.width = $(window).width();
const height = canvas.height = $(window).height();
canvas.style.top = "100px";

var ctx = canvas.getContext('2d');

ctx.strokeStyle = '#E21515'
ctx.lineWidth = 5;
ctx.beginPath()

var x = 50
var y = height/2 + 160

var dx = 0.25;
var dy = 1;

var rightPressed = false;
var upPressed = false;
var start = false

var drawInterval;
var timeInterval;
var timeReady = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(event) {
    if(event.keyCode == 39) {
        if(active === "abdomen") {
            var abdomenTop = $('.abdomen').position().top - $('.main-canvas').position().top
        }
        else {
            var chestTop = $('.chest').position().top - $('.main-canvas').position().top
            
        }
        if(timeReady === true && ( (y > abdomenTop && y < abdomenTop + 30) || (y > chestTop && y < chestTop + 30) )) {
            timeReady = false
            timeInterval = setInterval(updateTime, 1000)
        }
        rightPressed = true;
    }
    else if(event.keyCode == 38) {
        $('p').text('00:00')
        timeReady = true
        if(start === false) {
            start = true
            drawInterval = setInterval(draw, 10)
        }
        upPressed = true;
    }
    
}

function keyUpHandler(event) {
    timeReady = true
    clearInterval(timeInterval)
    $("p").text("00:00")
    if(event.keyCode == 39) {
        rightPressed = false;
    }
    else if(event.keyCode == 38) {
        upPressed = false;
    }
}

function draw() {
    if (y >=  height - 50) {
        clearInterval(timeInterval)
        clearInterval(drawInterval)
        start = false
        ctx.beginPath()
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        x = 50
        y = height/2 + 160
        timeReady = false;
        endAngleMultiplierUp = 0.7
        endAngleMultiplierDown = 1.3
    }
    if (x >= width) {
        x = 50
        ctx.beginPath()
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    
    ctx.strokeStyle = '#E21515'
    ctx.moveTo(x, y)
    if(rightPressed == false && upPressed == false) {
        x += dx
        y += dy
    }
    else if(rightPressed) {
        x += dx
    }
    else if(upPressed) {
        x += dx;
        y -= dy;
    }
    ctx.lineTo(x, y);
    ctx.stroke()
}

function curveUp() {
    clearInterval(drawInterval)
    var curveUpInterval = setInterval(helper, 5)
    var endAngleMultiplierUp = 0.7
    function helper() {
        endAngleMultiplierUp -= 0.01
        ctx.moveTo(x, y)
        ctx.arc(x + 19, y - 12, 20, 0.7 * Math.PI, endAngleMultiplierUp * Math.PI, true)
        ctx.stroke()
        console.log(endAngleMultiplierUp)
        if(endAngleMultiplierUp <= 0.2) {
            clearInterval(curveUpInterval)
            x += 33.5
            y += 3
            
        }
    }
}

function curveDown() {
    clearInterval(drawInterval)
    var curveDownInterval = setInterval(temp, 5)
    var endAngleMultiplierDown = 1.3
    function temp() {
        endAngleMultiplierDown += 0.01
        ctx.moveTo(x, y)
        ctx.arc(x + 19, y + 12, 20, 1.3 * Math.PI, endAngleMultiplierDown * Math.PI)
        ctx.stroke()
        console.log(endAngleMultiplierDown)
        if(endAngleMultiplierDown >= 1.8) {
            clearInterval(curveDownInterval)
            x += 34.5
            y -= 2
        }
    }
}


// increments timer at top of the screen
function updateTime() {
    var newTime = parseInt($("p").text().slice(-2)) + 1
    newTime = newTime.toString()
    if(newTime.length === 2) {
        console.log(newTime)
        $("p").text("00:" + newTime.toString())
    }
    else {
        $("p").text("00:0" + newTime.toString())
    }
}


var active = "chest"

// changes green line depending on button selected
// clear button to reset program
$(".chestbtn").addClass('btn-light').removeClass('btn-dark')
        $(".abdomenbtn").addClass('btn-dark').removeClass('btn-light')
        $(".abdomen").hide();
        $(".chest").show();
        
$(document).ready(function(){
    $(".chestbtn").click(function(){
        $(".chestbtn").addClass('btn-light').removeClass('btn-dark')
        $(".abdomenbtn").addClass('btn-dark').removeClass('btn-light')
        $(".abdomen").hide();
        $(".chest").show();
        active = "chest"
    });
    $(".abdomenbtn").click(function(){
        $(".abdomenbtn").addClass('btn-light').removeClass('btn-dark')
        $(".chestbtn").addClass('btn-dark').removeClass('btn-light')
        $(".chest").hide();
        $(".abdomen").show();
        active = "abdomen"
    });
    $(".clearbtn").click(function() {
        clearInterval(timeInterval)
        $("p").text("00:00")
        ctx.beginPath()
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        x = 50
        y = height/2 + 160

        dx = 0.5;
        dy = 1;

        rightPressed = false;
        upPressed = false;
        start = false

        drawInterval;
        timeInterval;
        timeReady = false;
        clearInterval(timeInterval)
        clearInterval(drawInterval)
        endAngleMultiplierUp = 0.7
        endAngleMultiplierDown = 1.3
    });
  });

//number line setup
w = width
h = height
with(ctx) {
    beginPath();
    lineWidth = 2;
    strokeStyle = '#fff';
    moveTo(0, window.innerHeight/4 * 3 - 70);
    lineTo(w, window.innerHeight/4 * 3 - 70);
    stroke();
    for(var i = -40; i <= 40; i++) {
        beginPath();
        strokeStyle = '#fff';
        lineWidth = 2;
        moveTo(w/2 + i * 20, window.innerHeight/4 * 3 - 75);
        lineTo(w/2 + i * 20, window.innerHeight/4 * 3 - 65);
        fillStyle = '#ff0';
        fill();
        stroke();
        console.log("hello!")
    }
}