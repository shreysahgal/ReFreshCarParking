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
var spots = [];

// add all the spots to the list
ref.limitToLast(5).on("value", function (snapshot) {
    let spot;
    var btn;
    spots = [];
    for (var i = 1; i < snapshot.numChildren() + 1; i++) {
        spots.push(snapshot.child((i - 1).toString()).val());
    }
    formatHTML();
});

function formatHTML() {
    for (var i = 0; i < spots.length; i++) {
        let spot = spots[i];
        $("<div/>").text(spot.taken).prepend($("<b/>").text(spot.name + ": ")).appendTo($("#spotDiv"));
        btn = document.createElement("Button");
        btn.setAttribute('id', 'button' + i);
        btn.setAttribute('class', i+1);
        btn.setAttribute('class', 'blah');
        btn.setAttribute("class", spot.taken.toString());
        btn.setAttribute('onclick', 'doThing(this.id.substring(6, 7))');
        btn.innerHTML = "Button " + i;
        document.getElementById("spotDiv").appendChild(btn);
    }
}

ref.limitToLast(5).on("child_changed", function() {
    document.getElementById("spotDiv").innerHTML = "";
});

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
    console.log(b);
    
    update(val, newClass, b.id);
}

function update(index, newVal, name) {
    ref.child(index).set({
        name: "spot" + index,
        taken: newVal == "true"
    })
}
