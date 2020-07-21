const canvas = document.querySelector('.main-canvas');
const width = canvas.width = $(window).width();
const height = canvas.height = $(window).height();
canvas.style.top = "100px";

var ctx = canvas.getContext('2d');

ctx.strokeStyle = '#C5E16C'
ctx.lineWidth = 5;
ctx.beginPath()

var startX = 50
var startY = height/2 + 115

var downInterval;
var curveUpInterval;
var curveUpTimeout;
var curveDownInterval;
var curveDownTimeout;
var curveDownReady = true;

var timeInterval;
var timeReady = false;

var endAngleMultiplierUp = 1.3
var endAngleMultiplierDown = 0.7
var count = 0;

var Keys = {
    up: true,
    right: true
};


// clears canvas when startX reaches near the end of the canvas
function endOfCanvas() {
    if(startX  > width - 50) {
        startX = 50
        ctx.beginPath()
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
}

// moves the line forward
function straightLine() {
    endOfCanvas()
    for(i = 0; i < 3; i++) {
        ctx.moveTo(startX, startY)
        ctx.lineTo(startX += 1, startY)
        ctx.stroke()
    }
}

// moves the line down
function downLine() {
    endOfCanvas()
    for(i = 0; i < 3; i++) {
        ctx.moveTo(startX, startY)
        ctx.lineTo(startX += 0.5, startY += 1)
        ctx.stroke()
    }
}

// moves the line up
function upLine() {
    endOfCanvas()
    for(i = 0; i < 3; i++) {
        ctx.moveTo(startX, startY)
        ctx.lineTo(startX += 0.5, startY -= 1)
        ctx.stroke()
    }
}

// quadratic curve for when the user releases key
function curveUp() {
    Keys.up = Keys.right = false
    count += 1
    endAngleMultiplierUp += 0.01
    ctx.moveTo(startX, startY)
    ctx.arc(startX + 19, startY + 12, 20, 1.3 * Math.PI, endAngleMultiplierUp * Math.PI)
    ctx.stroke()
    if(count === 60) {
        clearInterval(curveUpInterval)
        count = 0
        endAngleMultiplierUp = 1.3
        startX += 33.5
        startY -= 4
        Keys.up = Keys.right = true
    }
}

// quadratic curve for when the user presses key
function curveDown() {
    curveDownInterval = setInterval(function() {
        count += 1
        endAngleMultiplierDown -= 0.01
        ctx.moveTo(startX, startY)
        ctx.arc(startX + 19, startY - 12, 20, 0.7 * Math.PI, endAngleMultiplierDown * Math.PI, true)
        ctx.stroke()
        if(count === 60) {
            clearInterval(curveDownInterval)
            count = 0
            endAngleMultiplierDown = 0.7
            startX += 33.5
            startY += 4
        }
    }, 5)
}


window.onkeydown = function(e) {
    var kc = e.keyCode;
    e.preventDefault();
    clearTimeout(curveUpTimeout)
    if (kc === 38 & Keys.up) {
        clearInterval(downInterval)
        if(curveDownReady) {
            curveDown()
            curveDownReady = false
        }
        else {
            Keys.up = true;
            Keys.right = false
            upLine()
        }
    }
    if (kc === 39 & Keys.right) {
        clearInterval(downInterval)
        Keys.right = true;
        Keys.up = false
        straightLine()
        if(timeReady) {
            timeInterval = setInterval(updateTime, 1000)
            timeReady = false
        }
    }
};

window.onkeyup = function(e) {
    var kc = e.keyCode;
    e.preventDefault();
    timeReady = true
    clearInterval(timeInterval)
    $("p").text("00:00")
    curveDownReady = true
    curveUpInterval = setInterval(curveUp, 5)
    curveUpTimeout = setTimeout(function () {
        downInterval = setInterval(downLine, 20)
    }, 300)
};


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
    });
    $(".abdomenbtn").click(function(){
        $(".abdomenbtn").addClass('btn-light').removeClass('btn-dark')
        $(".chestbtn").addClass('btn-dark').removeClass('btn-light')
        $(".chest").hide();
        $(".abdomen").show();
    });
    $(".clearbtn").click(function() {
        clearInterval(timeInterval)
        clearInterval(downInterval)
        $("p").text("00:00")
        ctx.beginPath()
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        startX = 50
        startY = height/2 + 115
        curveDownReady = true;
        timeReady = false;
        endAngleMultiplierUp = 1.3
        endAngleMultiplierDown = 0.7
        count = 0;
    });
  });