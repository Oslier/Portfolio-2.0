const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let particlesArray;

let mouse = {
    x:null,
    y:null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('onmousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

class Particle{
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
    }

    update() {
        if(this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        /*let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > canvas.width - this.size * 10){
                this.x -= 10;
            }
            if(mouse.y < this.x && this.y < canvas.height - this.size * 10){
                this.y += 10;
            }
            if(mouse.y > this.x && this.y > canvas.height - this.size * 10){
                this.y -= 10;
            }
        }*/
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

function initParticle(){
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 1000;
    for(let i = 0; i < numberOfParticles; i++){
        let size = (Math.random() + 0.01);
        let x = (Math.random() *canvas.width);
        let y = (Math.random() *canvas.height);
        let directionX = (Math.random() * 2) - 0.5;
        let directionY = (Math.random() * 2) - 0.5;
        let color = '#8C5523';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }

    connect();
}

function connect(){
    for(let a = 0; a < particlesArray.length; a++){
        for(let b = 0; b < particlesArray.length; b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if(distance < (canvas.width/4) * (canvas.height/4)){
                opacityValue = 0.1 + (0.9 - distance/2000);
                ctx.strokeStyle = 'rgba(187, 225, 250,' + opacityValue + ')';
                ctx.lineWidth = 0.05;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

initParticle();
animate();