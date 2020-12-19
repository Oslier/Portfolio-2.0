let w = 0;
let x = 0;
let iterations = 1;

function setup(){
    var myCanvas = document.getElementById("canvas");
    var width = myCanvas.offsetWidth;
    var height = myCanvas.offsetHeight;
    var innerCanvas = createCanvas(width, height);
    innerCanvas.parent(myCanvas);

    

    pixelDensity(1);

}

function draw(){
    if (iterations <= 50) {
        
    
    loadPixels();
    for(var x = 0; x < width; x++){
        for(var y = 0; y < height; y++){
            

            var a = map(x, 0, width, -2, 2);
            var b = map(y, 0, height, -2, 2);

            var ca = a;
            var cb = b;

            var n = 0;

            while(n < iterations){
                var aa = a*a - b*b;
                var bb = 2 * a * b;
                
                a = aa + ca;
                b = bb + cb;

                if(abs(a + b) > 16){
                    break;
                }

                n++;
            }
            

            var bright = map(n, 0, iterations, 0, 255);
            if(n === iterations){
                bright = 255;
            }

            /*var pix = (x + y * width) * 4;
            pixels[pix + 0] = sqrt(bright);
            pixels[pix + 1] = bright * bright / 255;
            pixels[pix + 2] = bright;
            pixels[pix + 3] = 255;*/

            if (w < 100) {
                w++;
            }
            else{
                w=0;
            }

            var pix = (x + y * width) * 4;
            pixels[pix + 0] = 27 + sqrt(bright);
            pixels[pix + 1] = 38 + (bright * bright / 255);
            pixels[pix + 2] = 44 + bright;
            pixels[pix + 3] = 255;
        }
    }

    iterations+=0.5;
    updatePixels();

    if(screen.width < 600){
        var innerCanvas = createCanvas(100, 100);
    }
}
}