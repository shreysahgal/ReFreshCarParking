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

var s = []; // placeholder
var spots = []; // list of taken vals of each spot (updated when db is changed)

var USERSPOT = null; // spot the user is occupying, startes as null

// add all the spots to the list
ref.on("value", function (snapshot) {
    let spot;
    var btn;
    s = [];
    for (var i = 1; i < snapshot.numChildren() + 1; i++) {
        s.push(snapshot.child((i - 1).toString()).val());
    }
    transfer(snapshot.numChildren());
});

function transfer(lim) {
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
    //    console.log(b); debugging
    update(val, newClass, b.id);
}

function update(index, newVal, name) {
    ref.child(index).set({
        name: "spot" + index,
        taken: newVal == "true"
    });
}

window.onload = function () { // move getspot button where we want it
    x = document.getElementById("getspot");
    x.style.left = window.innerWidth / 2;
}

var donzo = false;

function getSpot() {
    if (USERSPOT == null) {
        var closest = null;
        var i = 0;
        donzo = false;
        while (i < 19 && !donzo) {
            if (!spots[i]['taken']) {
                closest = i;
                donzo = true;
            }
            i++;
        }
        donzo = false;

        if (closest == null) {
            alert("I'm sorry, but there are no available spots right now. Come back later and try again!");
        } else {
            USERSPOT = closest;
            setTaken(closest);
            showUserSpot();
        }
    }
}

function removeSpot() {
    if (USERSPOT != null) {
        setUntaken(USERSPOT);
        USERSPOT = null;
    }
}

function getOrRemoveSpot() {
    b = document.getElementById("getspot");
    console.log(b.offsetWidth);
    if (b.value == "nospot") {
        b.value = "spot"; // change val of btn
        getSpot(); // get the spot
        b.innerHTML = "Get rid of your spot." // change what btn says
        hasText = "You have claimed Spot " + USERSPOT+1 + "!";
        b.style.left = window.innerWidth / 2;

    } else if (b.value == "spot") {
        b.value = "nospot"; // change val of btn
        removeSpot(); // remove the spot
        b.innerHTML = "Get a spot!"; // change what btn says
        hasText = "You currently do not have a claimed spot.";
        b.style.left = window.innerWidth / 2;
    }
}

function showUserSpot() {
    if (USERSPOT != null) {
        //        alert("your spot is spot num. " + USERSPOT);
    }
}

function randomTaken(i) {
    for (let p = 0; p < i; p++) {
        setTaken(Math.floor(Math.random() * 19));
    }
}

function setTaken(i) { // red
    ref.child(i).update({
        taken: true
    });
    transfer(18);
}

function setUntaken(i) { // green
    ref.child(i).update({
        taken: false
    });
    transfer(18);
}

function randomTaken(i) { // FOR DEBUGGING
    for (let p = 0; p < i; p++) {
        setTaken(Math.floor(Math.random() * 19));
    }
}
