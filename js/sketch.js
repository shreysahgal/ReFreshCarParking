var locs = []; // this will probably be a 19 long list
let nearest = 0;
var btn;
var cnv;

function setup() {
    cnv = createCanvas(window.innerWidth / 3, window.innerHeight / 2);
    cnv.style('z-index', '-1');
    var cxp = window.innerWidth / 2 - width / 2;
    var cyp = window.innerHeight / 2 - height / 2 + height / 3;
    cnv.position(cxp, cyp - 70);
    // test locs
    //    for (var i = 0; i < 19; i++) {
    //        locs.push(new spot(i));
    //    }
    //    var bclass = document.getElementById("bt");
    //    btn = document.createElement("Button");
    //    btn.setAttribute('margin-left', '50%');
    //    btn.addEventListener("click", function () {
    //        if (nearest == 0) {
    //
    //            btn.setAttribute('onclick', 'text(\'No available spot.\', width/2, height/2)');
    //        } else {
    //
    //            btn.setAttribute('onclick', 'text(\'Your spot is number \'+nearest, width/2, height/2)');
    //        }
    //    });
    //
    //    btn.innerHTML = "Get a Spot";
    //    bclass.appendChild(btn);
}

function draw() {
    background(255);
    nearest = getNearestSpot();
    locs = spots; // i will undo this once spots works
    textAlign(RIGHT);
    textSize(width / 20); // 57 for each loc
    strokeWeight(0);
    text('Entrance', width, height / 2 - width / 58);
    text('<--', width, height / 2 + width / 58);
    strokeWeight(1);
    let boxWidth = width / 70 * 3;
    let boxHeight = height / 10;

    locs.forEach(function (spot, ind) {

        let rightPadding = width / 58; // account for enterance text
        ind++;
        
        if (spot.taken) {
            fill('RED');
        } else {
            fill('GREEN');
        }
        
        if (ind - 1 == USERSPOT) {
            fill('YELLOW');
        }
        

        if (ind % 2 == 1) {
            rect(width - rightPadding - (boxWidth * (ind + 1)), -10, boxWidth, boxHeight);
            fill(0);
            textAlign(CENTER);
            textSize(width / 20);
            strokeWeight(0);
            text(ind, width - rightPadding - (boxWidth * (ind + 1)) + boxWidth / 2, boxHeight + height / 12)
            strokeWeight(1);
            stroke(255);
            line(width - rightPadding - (boxWidth * (ind + 1)), boxHeight, width - rightPadding - (boxWidth * (ind + 1)) + boxWidth, boxHeight);
        } else {
            rect(width - rightPadding - (boxWidth * (ind + 1)), height - boxHeight, boxWidth, boxHeight);
            fill(0);
            textAlign(CENTER);
            textSize(width / 20);
            strokeWeight(0);
            text(ind, width - rightPadding - (boxWidth * (ind + 1)) + boxWidth / 2, height - boxHeight)
            strokeWeight(1);
            stroke(255);
            line(width - rightPadding - (boxWidth * (ind + 1)), height - boxHeight, width - rightPadding - (boxWidth * (ind + 1)) + boxWidth, height - boxHeight);

        }
        stroke(0);

    });
    //    if (nearest == 0) {
    //
    //        btn.setAttribute('onclick', 'text(\'No available spot.\', width/2, height/2)');
    //    } else {
    //
    //        btn.setAttribute('onclick', 'text(\'Your spot is number \'+nearest, width/2, height/2)');
    //    }

}

function getNearestSpot() {
    locs.forEach(function (x, i) {
        if (!x.taken) {
            return i + 1;
        }
    });
    return 0;

}
window.onresize = function () {
    //    var w = window.innerWidth;
    //    var h = window.innerHeight;
    //    cnv.size(w/3, h/5);
    //    width = w;
    //    height = h;
    setup();
    x = document.getElementById("getspot")
    x.setAttribute("left", toString(window.innerWidth / 2 - x.offsetWidth / 2));
};


// everything below is for testing only
//function spot(ind) {
//    this.value = ind + 1;
//    this.taken = getRandomInt(2) == 0;
//}
//
//function getRandomInt(max) {
//    return Math.floor(Math.random() * Math.floor(max));
//}
