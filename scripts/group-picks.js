var count = 1;

function showGroupCollection() {
    db.collection("restaurants-list").doc("restaurant 1").get().then(function (doc) {
    var pic = doc.data().img;             //key "picture"
    var heading = doc.data().title;       //key "name"
    var bio = doc.data().description;     //key "description"
    var resId = doc.id;

    $("#heading").text(heading);
    $("#bio").text(bio);
    $("#restaurant-image").attr("src", pic);
    triggerNext(resId);
    })

}

function showNextCollection() {
    if (count == 1) {
    db.collection("restaurants-list").doc("restaurant 2").get().then(function (doc) {
        var pic = doc.data().img;             //key "picture"
        var heading = doc.data().title;       //key "name"
        var bio = doc.data().description;     //key "description"
        var resId = doc.id;

        $("#heading").text(heading);
        $("#bio").text(bio);
        $("#restaurant-image").attr("src", pic);

        count = count + 1;
        triggerNext(resId)
    })
    }

    if (count == 2) {
    db.collection("restaurants-list").doc("restaurant 3").get().then(function (doc) {
        var pic = doc.data().img;             //key "picture"
        var heading = doc.data().title;       //key "name"
        var bio = doc.data().description;     //key "description"
        var resId = doc.id;

        $("#heading").text(heading);
        $("#bio").text(bio);
        $("#restaurant-image").attr("src", pic);

        count = count + 1;
        triggerNext(resId)
    })
    }

    if (count == 3) {
    db.collection("restaurants-list").doc("restaurant 4").get().then(function (doc) {
        var pic = doc.data().img;             //key "picture"
        var heading = doc.data().title;       //key "name"
        var bio = doc.data().description;     //key "description"
        var resId = doc.id;

        $("#heading").text(heading);
        $("#bio").text(bio);
        $("#restaurant-image").attr("src", pic);

        count = count + 1;
        triggerNext(resId)
    })
    }

    if (count == 4) {
    db.collection("restaurants-list").doc("r5").get().then(function (doc) {
        var pic = doc.data().img;             //key "picture"
        var heading = doc.data().title;       //key "name"
        var bio = doc.data().description;     //key "description"
        var resId = doc.id;

        $("#heading").text(heading);
        $("#bio").text(bio);
        $("#restaurant-image").attr("src", pic);

        count = count + 1;
        triggerNext(resId)
    })
    }


}

function triggerNext(resId) {
    var yes = document.getElementById("yes-button");
    // var new_element = yes.cloneNode(true);
    // yes.parentNode.replaceChild(new_element, yes);

    var no = document.getElementById("no-button");
    // var new_element = no.cloneNode(true);
    // no.parentNode.replaceChild(new_element, no);

    // https://some.site/?id=123 just for reference. not using
    const parsedUrl = new URL(window.location.href);
    console.log(parsedUrl.searchParams.get("id")); // "123"

    // extract id from url, assign to variable
    var id = parsedUrl.searchParams.get("id");


    $("#yes-button").on('click', function () {
    console.log("yes was clicked");
    if (count == 1) {
        db.collection("rooms").doc(id).update({
        1: firebase.firestore.FieldValue.increment(1),
        });
        $("#yes-button").unbind();
        $("#no-button").unbind();
        showNextCollection()
    }
    else if (count == 2) {
        db.collection("rooms").doc(id).update({
        2: firebase.firestore.FieldValue.increment(1),
        });
        $("#yes-button").unbind();
        $("#no-button").unbind();
        showNextCollection()
    }
    else if (count == 3) {
        db.collection("rooms").doc(id).update({
        3: firebase.firestore.FieldValue.increment(1),
        });
        $("#yes-button").unbind();
        $("#no-button").unbind();
        showNextCollection()
    }
    else if (count == 4) {
        db.collection("rooms").doc(id).update({
        4: firebase.firestore.FieldValue.increment(1),
        });
        $("#yes-button").unbind();
        $("#no-button").unbind();
        showNextCollection()
    }
    else if (count == 5) {
        db.collection("rooms").doc(id).update({
        5: firebase.firestore.FieldValue.increment(1),
        });
        $("#yes-button").unbind();
        $("#no-button").unbind();
        window.location.href = "group-end.html?id=" + id;
    }
    });

    $("#no-button").on('click', function () {
    console.log("no was clicked");
    if (count == 1) {
        db.collection("rooms").doc(id).update({
        1: firebase.firestore.FieldValue.increment(-1),
        });
        $("#no-button").unbind();
        $("#yes-button").unbind();
        showNextCollection()
    }
    else if (count == 2) {
        db.collection("rooms").doc(id).update({
        2: firebase.firestore.FieldValue.increment(-1),
        });
        $("#no-button").unbind();
        $("#yes-button").unbind();
        showNextCollection()
    }
    else if (count == 3) {
        db.collection("rooms").doc(id).update({
        3: firebase.firestore.FieldValue.increment(-1),
        });
        $("#no-button").unbind();
        $("#yes-button").unbind();
        showNextCollection()
    }
    else if (count == 4) {
        db.collection("rooms").doc(id).update({
        4: firebase.firestore.FieldValue.increment(-1),
        });
        $("#no-button").unbind();
        $("#yes-button").unbind();
        showNextCollection()
    }
    else if (count == 5) {
        db.collection("rooms").doc(id).update({
        5: firebase.firestore.FieldValue.increment(-1),
        });
        $("#no-button").unbind();
        $("#yes-button").unbind();
        window.location.href = "group-end.html?id=" + id;
    }
    });

}
showGroupCollection();