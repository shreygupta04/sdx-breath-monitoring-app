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
var curveInterval;
var curveTimeout;

var endAngleMultiplier = 1.3
var count = 0;

var Keys = {
    up: false,
    right: false
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
function curve() {
    count += 1
    endAngleMultiplier += 0.01
    ctx.moveTo(startX, startY)
    ctx.arc(startX + 19, startY + 12, 20, 1.3 * Math.PI, endAngleMultiplier * Math.PI)
    ctx.stroke()
    if(count === 60) {
        clearInterval(curveInterval)
        count = 0
        endAngleMultiplier = 1.3
    }
}

window.onkeydown = function(e) {
    var kc = e.keyCode;
    e.preventDefault();
    clearTimeout(curveTimeout)
    if (kc === 38) {
        clearInterval(downInterval)
        Keys.up = true;
        Keys.right = false
        upLine()
    }
    if (kc === 39) {
        clearInterval(downInterval)
        Keys.right = true;
        Keys.up = false
        straightLine()
    }
};

window.onkeyup = function(e) {
    var kc = e.keyCode;
    e.preventDefault();
    curveInterval = setInterval(curve, 5)
    curveTimeout = setTimeout(function () {
        startX += 33.5
        startY -= 4
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
        startX = 50
        startY = height/2 + 115
        clearInterval(time)
        $("p").text("00:00")
        down = 0
        clearInterval(straight)
        ctx.beginPath()
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    });
  });