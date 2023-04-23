var canv = document.querySelector(".canvas");
var ctx = canv.getContext("2d");

isMouseDown = false;
coords =  [];

canv.width = canv.clientWidth;
canv.height = canv.clientHeight;

canv.addEventListener("mousedown", function() {
    isMouseDown = true;
});

canv.addEventListener("mouseup", function() {
    isMouseDown = false;
    ctx.beginPath();
    coords.push("mouseup");
});

canv.addEventListener("mousemove", function(e) {
    if (isMouseDown) {
         var canvasRect = canv.getBoundingClientRect();
         var mouseX = e.clientX - canvasRect.left;
         var mouseY = e.clientY - canvasRect.top;
 
         coords.push([mouseX, mouseY]);
 
         ctx.lineWidth = 20;
         ctx.lineTo(mouseX, mouseY);
         ctx.stroke();
 
         ctx.beginPath();
         ctx.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
         ctx.fill();
 
         ctx.beginPath();
         ctx.moveTo(mouseX, mouseY);
    } 
 });

function save() {
    localStorage.setItem('cords', JSON.stringify(coords));
}

function replay() {
    var timer = setInterval(function() {
        if (!coords.length) {
            clearInterval(timer);
            ctx.beginPath();
            return;
        }

        var crd = coords.shift();
        var e = {
            clientX: crd["0"],
            clientY: crd["1"]
        };
    ctx.lineWidth = 20;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    }, 30);
}

function clear() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.beginPath();
    ctx.fillStyle = "black";
}


document.addEventListener("keydown", function(e) {
    if(e.keyCode == 83) {
        save();
    }

    if(e.keyCode == 82) {
        coords = JSON.parse(localStorage.getItem("cords"));
        clear();
        replay();
    }

    if(e.keyCode == 67) {
        clear()
    }
});