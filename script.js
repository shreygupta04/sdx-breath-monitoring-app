const canvas = document.querySelector('.main-canvas');
const width = canvas.width = $(window).width();
const height = canvas.height = $(window).height();
canvas.style.top = "100px";

var ctx = canvas.getContext('2d');

ctx.strokeStyle = '#ff0000'
ctx.lineWidth = 5;
ctx.beginPath()

var startX = 50
var startY = height * 0.75 + 15
var speed = 10

var down = 0;


var Keys = {
    up: false,
    right: false
};

window.onkeydown = function(e) {
    var kc = e.keyCode;
    e.preventDefault();
    if (kc === 38) {
        Keys.up = true;    // so check exclusively
        Keys.right = false
    }
    if (kc === 39) {
        Keys.right = true;
        Keys.up = false
    }
    
};

window.onkeyup = function(e) {
    var kc = e.keyCode;
    e.preventDefault();
    if(down === 2) {
        down = 0
    }
    if(kc === 39) {
        down += 1
    }
    console.log(down)
    Keys.up = Keys.right = true;
};

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
    if (Keys.up && Keys.right === false) {
        if(startX  === $(window).width() - 50) {
            startX = 50
            ctx.beginPath()
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
        ctx.moveTo(startX, startY)
        if(down === 1) {
            
            ctx.lineTo(startX += 0.5, startY += 1)
        }
        else {
            
            ctx.lineTo(startX += 0.5, startY -= 1)
        }
        ctx.stroke()
    }
    else if (Keys.right && Keys.up === false) {
        if(startX  === $(window).width() - 50) {
            startX = 50
            ctx.beginPath()
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
        ctx.moveTo(startX, startY)
        ctx.lineTo(startX += 1, startY)
        ctx.stroke()
    }
}


