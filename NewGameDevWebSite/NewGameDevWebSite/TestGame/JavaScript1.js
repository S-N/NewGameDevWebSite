$(document).ready(function () {
    var canvas = $("#GameCanvas");
    var context = canvas.get(0).getContext("2d");


    var circles = new Array();

    var Circle = function () {
        this.x = 50;
        this.y = 100;
        this.vx = 5;
        this.vy = 5;
        this.radius = 50;

        this.draw = function () {
            context.fillStyle = "rgba(0, 0, 255, 0.5)";
            context.beginPath();
            context.arc(this.x, this.y, 50, 0, Math.PI * 2, false);
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.closePath();
            context.fill();
        }
    }

    function Setup() {
        var circle = new Circle();
        circles.push(circle);

        Anime();
    }

    function Anime() {
        context.clearRect(0, 0, canvas.width(), canvas.height());

        for (var i = 0; i < circles.length; i++) {
            circles[i].x += circles[i].vx;
            circles[i].y += circles[i].vy;

            if ((circles[i].x + circles[i].radius) > canvas.width()) {
                circles[i].vx = -circles[i].vx;
            } else if ((circles[i].x - circles[i].radius) < 0) {
                circles[i].vx = -circles[i].vx;
            }

            if ((circles[i].y + circles[i].radius) > canvas.height()) {
                circles[i].vy = -circles[i].vy;
            } else if ((circles[i].y - circles[i].radius) < 0) {
                circles[i].vy = -circles[i].vy;
            }
        }

        for (var i = 0; i < circles.length; i++) {
            circles[i].draw();
        }
        setTimeout(Anime, 33);
    }

    Setup();
});
  