// variable to keep track of which restaurant the user is at through the methods
var count = 1;

// method that shows the first restaurant
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

// listens to yes and no and update the vote count accordingly
// runs showNextCollection() to show the next restaurant
function triggerNext(resId) {
    var yes = document.getElementById("yes-button");

    var no = document.getElementById("no-button");

    // https://some.site/?id=123 just for reference. not using
    const parsedUrl = new URL(window.location.href);
    console.log(parsedUrl.searchParams.get("id")); // "123"

    // extract id from url, assign to variable
    var id = parsedUrl.searchParams.get("id");

    // listen to yes button and increments value
    $("#yes-button").on('click', function () {
    console.log("yes was clicked");
    if (count == 1) {
        db.collection("rooms").doc(id).collection("votes").doc("r1").update({
            value: firebase.firestore.FieldValue.increment(1)
        });
        $("#yes-button").unbind();
        $("#no-button").unbind();
        showNextCollection()
    }
    else if (count == 2) {
        db.collection("rooms").doc(id).collection("votes").doc("r2").update({
            value: firebase.firestore.FieldValue.increment(1)
        });
        $("#yes-button").unbind();
        $("#no-button").unbind();
        showNextCollection()
    }
    else if (count == 3) {
        db.collection("rooms").doc(id).collection("votes").doc("r3").update({
            value: firebase.firestore.FieldValue.increment(1)
        });
        $("#yes-button").unbind();
        $("#no-button").unbind();
        showNextCollection()
    }
    else if (count == 4) {
        db.collection("rooms").doc(id).collection("votes").doc("r4").update({
            value: firebase.firestore.FieldValue.increment(1)
        });
        $("#yes-button").unbind();
        $("#no-button").unbind();
        showNextCollection()
    }
    else if (count == 5) {
        db.collection("rooms").doc(id).collection("votes").doc("r5").update({
            value: firebase.firestore.FieldValue.increment(1)
        });
        $("#yes-button").unbind();
        $("#no-button").unbind();
        calculateWin(id)
        incrementTotalVotes(id)
    }
    });

    // listen to no button and decrements value
    $("#no-button").on('click', function () {
    console.log("no was clicked");
    if (count == 1) {
        $("#no-button").unbind();
        $("#yes-button").unbind();
        showNextCollection()
    }
    else if (count == 2) {
        $("#no-button").unbind();
        $("#yes-button").unbind();
        showNextCollection()
    }
    else if (count == 3) {
        $("#no-button").unbind();
        $("#yes-button").unbind();
        showNextCollection()
    }
    else if (count == 4) {
        $("#no-button").unbind();
        $("#yes-button").unbind();
        showNextCollection()
    }
    else if (count == 5) {
        $("#no-button").unbind();
        $("#yes-button").unbind();
        calculateWin(id)
        incrementTotalVotes(id)
    }
    });

}

// show the next restaurant in line, then run the method that listens to the buttons
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

// updates the current winner at the end of the user's voting
// redirects to show the results
function calculateWin(id) {
    db.collection("rooms").doc(id).collection("votes").orderBy("value", "desc").limit(1).get().then(function(snap) {
      snap.forEach(function(doc) {
        var highest = doc.data().id;
        console.log(highest);
        db.collection("rooms").doc(id).update({
          current_winner: highest
        })
      })
      window.location.href = "group-end.html?id=" + id;
    })
  }

  // keep track of total finished voters
  function incrementTotalVotes(id) {
      db.collection("rooms").doc(id).update({
        total_votes: firebase.firestore.FieldValue.increment(1)
      })
  }

  // run showGroupCollection()
showGroupCollection();