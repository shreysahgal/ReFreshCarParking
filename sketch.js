function setup() {
    var cnv = createCanvas(windowWidth/11, windowHeight/11);
//    cnv.style('justify-content', 'center');
    cnv.position(windowWidth/2-width/2, windowHeight/2-height/2);
    background(255, 0, 200);
    console.log(spots);
}

function draw() {
//    background(0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}