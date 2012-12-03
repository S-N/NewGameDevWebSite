$(document).ready(function () {
    var StartCanvas = $("#StartCanvas");
    var GameOverCanvas = $("#gameOverCanvas");

    var StartContext = StartCanvas.get(0).getContext("2d");
    var GameOverContext = GameOverCanvas.get(0).getContext("2d");

    var StartCanvasWidth = StartCanvas.width();
    var GameOverCanvasHeight = GameOverCanvas.height();

    var titleRadiuses = new Array();
    var titleRadius = 50;

    var titleWords = $("h1.start");
    var titlePos = $("h1.start").offset();
    var titlePosL = titlePos.left;
    var titlePosT = titlePos.top;

    var numCircle = (StartCanvasWidth / titleRadius);

        for (var i = 0 ; i < numCircle+1 ; i++) {
            StartContext.fillStyle = "white";
            StartContext.beginPath();
            StartContext.arc(50*i, (titlePosT + (titleWords.height()/2) -200), titleRadius, 0, Math.PI * 2, false);
            StartContext.closePath();
            StartContext.fill();
        }
});