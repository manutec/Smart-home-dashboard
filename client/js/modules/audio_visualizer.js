let audioCanvas = document.getElementById("audioCanvas");
let ctx = audioCanvas.getContext("2d");//creamos el contexto
var audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // definir contexto de audio
let player = document.getElementById('player');
const analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
const WIDTH = audioCanvas.width;
const HEIGHT = audioCanvas.height;
console.log("javaaaa");
const data = new Uint8Array(analyser.frequencyBinCount);
navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {

    if (window.URL) {
        player.srcObject = stream;
        const source = audioCtx.createMediaStreamSource(stream);
        analyser.fftSize = 2048;
        source.connect(analyser);
        //ctx.translate(0,HEIGHT/2);//mitad de pantalla
        loopAnimation();
       
      } else {
       // player.src = stream;
        
      }

});


function loopAnimation(){
    requestAnimationFrame(loopAnimation);
    //analyser.getByteFrequencyData(data);
    analyser.getByteTimeDomainData(data);
    // drawBar(data,'#000055','#cb3077',0);
    //analyser.fftSize = 64;
    drawLine(data,'#000055','#cb3077');
}

function drawBar(data,color1,color2){
    var grad= ctx.createLinearGradient(WIDTH/2, HEIGHT, WIDTH/2);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    ctx.strokeStyle = grad;
    ctx.clearRect(0,0,WIDTH,HEIGHT); //x,y,width,height
    let space = WIDTH / data.length;
    data.forEach((value,i)=>{
        ctx.beginPath();
        ctx.moveTo(space*i,WIDTH); //x,y
        ctx.lineTo(space*i,HEIGHT-value*2); //x,y
        ctx.stroke();
    });
}

function drawLine(data,color1,color2){
    var grad= ctx.createLinearGradient(WIDTH/2, HEIGHT, WIDTH/2, 0);
    ctx.clearRect(0,0,WIDTH,HEIGHT); //x,y,width,height
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 3;
    let space = WIDTH / data.length;
    
    data.forEach((value,i)=>{
        ctx.beginPath();
        const v = value/128.0;
        const va= data[i+1]/128.8;
        const y = v * HEIGHT/2;
        const ya = va * HEIGHT/2;
        ctx.moveTo(space*i,y); //x,y
        ctx.lineTo(space*i+space,ya); //x,y
        ctx.stroke();
    });
}