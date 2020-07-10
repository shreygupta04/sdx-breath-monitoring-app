const canvas = document.querySelector('.main-canvas');
const width = canvas.width = $(window).width();
const height = canvas.height = $(window).height();
canvas.style.top = "100px";

var ctx = canvas.getContext('2d');

ctx.strokeStyle = '#000000'
ctx.lineWidth = 5;
ctx.beginPath()

var startX = 50
var startY = height/2 + 115
var speed = 10

var down = 0;


var Keys = {
    up: false,
    right: false
};

var straight;
var time;
var forward;

window.onkeydown = function(e) {
    var kc = e.keyCode;
    e.preventDefault();
    if (kc === 38) {
        Keys.up = true;    // so check exclusively
        Keys.right = false
        clearInterval(straight)
        $("p").text("00:00")
        clearInterval(time)
        forward = true
    }
    if (kc === 39) {
        Keys.right = true;
        Keys.up = false
        if(forward === true) {
            time = setInterval(updateTime, 1000)
            straight = setInterval(straightLine, 20)
            forward = false
        }
    }
    
};

function straightLine() {
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX += 1, startY)
    ctx.stroke()
}

window.onkeyup = function(e) {
    var kc = e.keyCode;
    e.preventDefault();
    if(down === 2) {
        down = 0
    }
    if(kc === 39) {
        down += 1
    }
    Keys.up = Keys.right = true;
};
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
  });

setInterval(check, 10)

function check() {
    if(startX  === $(window).width() - 50) {
        startX = 50
        ctx.beginPath()
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    if (Keys.up && Keys.right === false) {
        ctx.moveTo(startX, startY)
        if(down === 1) {
            
            ctx.lineTo(startX += 0.5, startY += 1)
        }
        else {
            ctx.lineTo(startX += 0.5, startY -= 1)
        }
        ctx.stroke()
    }
}

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