$(document).ready(function () {
    var canvas = $("#titleCanvas");
    var context = canvas.get(0).getContext("2d");

    canvasWidth = canvas.width();
    canvasHeight = canvas.height();

    context.fillStyle = "rgb(250, 200, 100)";
    context.fillRect(0, 0, canvasWidth, canvasHeight / 5);
    context.fillRect(0, canvasHeight * (4 / 5), canvasWidth, canvasHeight / 5);

    context.strokeStyle = "black";
    context.fillStyle = "rgb(255, 110, 110)";
    context.beginPath();
    context.arc((canvasWidth/8), (canvasHeight/2), 50, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
    
    context.fillStyle = "rgb(100,100,255)";
    context.beginPath();
    context.moveTo((canvasWidth / 16), canvasHeight);
    context.lineTo((canvasWidth * (1 / 4)), canvasHeight);
    context.lineTo((canvasWidth * (1 / 4)), 0);
    context.closePath();
    context.fill();
   
    

});