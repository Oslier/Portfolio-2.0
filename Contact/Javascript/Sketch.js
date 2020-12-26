let time = 0;
let radius = 0
let wave = [];
let i = 0;
let n = 1;
let x = 0;
let y = 0;
//let random = Math.random();
//let randomTime = 0;


function setup(){
    var myCanvas = document.getElementById("canvas");
    var width = myCanvas.offsetWidth;
    var height = myCanvas.offsetHeight;
    var innerCanvas = createCanvas(width, height);
    innerCanvas.parent(myCanvas);
    //random *= 100;

    pixelDensity(1);
}

function draw(){
    background(27, 38, 44);
    translate(300, height / 2);

    stroke(255);
    noFill();
    ellipse(0, 0, radius * 2);

    x = 0;
    y = 0;

    for(let i = 0; i < 100; i++){
        n = i * 2 + 1;
        let prevX = x;
        let prevY = y;
        radius = 100 * (4 / (n * PI));
        x += radius * cos(n * time);
        y += radius * sin(n * time);

        stroke(255, 100);
        noFill();
        ellipse(prevX, prevY, radius * 2);

        fill(255);
        ellipse(x, y, 8);
        stroke(255);
        line(prevX, prevY, x, y)
    }

    wave.unshift(y);
    translate(200, 0);
    line(x-200, y, 0, wave[0]);
    beginShape();
    noFill();
    for(i = 0; i < wave.length; i++){
        vertex(i, wave[i]);
    }
    endShape();

    time -= 0.02;

    //if(randomTime >= 100){
    //    random = Math.random();
    //    random *= 100;
    //
    //    randomTime = 0;
    //}

    if(wave.length > 2000){
        wave.pop();
    }

    //randomTime += 1;
}