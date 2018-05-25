// configure firebase
var config = {
    apiKey: "AIzaSyDeoEr4XwbablH5-hD2ILJuPx_hDIPxbek",
    authDomain: "refresh-car-parking.firebaseapp.com",
    databaseURL: "https://refresh-car-parking.firebaseio.com",
    projectId: "refresh-car-parking",
    storageBucket: "refresh-car-parking.appspot.com",
    messagingSenderId: "424468954928"
};
firebase.initializeApp(config);
var ref = firebase.database().ref(); // ref is the root

// list of all the spots (this will be used to display html and will be updated)
var s = [];
var spots = [];

// add all the spots to the list
ref.on("value", function (snapshot) {
    let spot;
    var btn;
    s = [];
    for (var i = 1; i < snapshot.numChildren() + 1; i++) {
        s.push(snapshot.child((i - 1).toString()).val());
    }
    formatHTML(snapshot.numChildren());
});

function formatHTML(lim) {
    spots = s;
}



function doThing(val) {
    var b = document.getElementById("button" + val);
    oldClass = b.classList.item(0);
    b.classList.remove(oldClass);
    var newClass;
    if (oldClass == "true") {
        b.classList.add("false");
        newClass = "false";
    } else if (oldClass = "false") {
        b.classList.add("true");
        newClass = "true";
    }
//    console.log(b);

    update(val, newClass, b.id);
}

function update(index, newVal, name) {
    ref.child(index).set({
        name: "spot" + index,
        taken: newVal == "true"
    });
//    console.log(ref.child(index));
}

window.onload = function () {
    x = document.getElementById("getspot");
    x.style.left = window.innerWidth / 2 - 50;
}
var donzo = false;
function getSpot() {
    ref.on("value", function (snapshot) {
        var i = 0;
        while(i < 19 && !donzo) {
            console.log(i < 19 && !donzo);
            if (!snapshot.child(i).val()['taken']) {
                donzo = true;
                console.log("the i of the thing : " + i)
                ref.child(i).update({
                    taken: true
                })
                console.log("it should be done... now!");
            }
            i++;
        }
        console.log("done");
    });
    formatHTML(18);
    donzo = false;
}
