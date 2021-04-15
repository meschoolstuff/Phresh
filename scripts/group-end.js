// displays the details of the winner
function displayDetails(rid) {
    db.collection("restaurants-list")
      .where("id", "==", rid)
      .onSnapshot(function (snap) {
        snap.forEach(function (doc) {
          var pic = doc.data().img; //key "picture"
          var heading = doc.data().title; //key "name"
          var bio = doc.data().description; //key "description"

          $("#heading").text(heading);
          $("#bio").text(bio);
          $("#restaurant-image").attr("src", pic);
        });
      });
  }


// finds the current winner in the database
function getCurrentWinner() {
  // https://some.site/?id=123 just for reference. not using
  const parsedUrl = new URL(window.location.href);
  console.log(parsedUrl.searchParams.get("id")); // "123"

  // extract id from url, assign to variable
  var id = parsedUrl.searchParams.get("id");

  db.collection("rooms")
    .doc(id)
    .onSnapshot(function (doc) {
      var winner = doc.data().current_winner;
      console.log(winner);
      displayDetails(winner);
      showVotes(id, winner);
      showTotalVotes(id);
    });
}

// function shows how many votes the winning restaurant got
function showVotes(roomId, winner) {
  db.collection("rooms").doc(roomId + "").collection("votes").doc("r" + winner).get()
      .then(function (doc) {
          console.log(doc.data().id);
          var votes = doc.data().value;
          $("#votes-goes-here").text(votes);
      })
}

// function shows how many votes the winning restaurant got
function showTotalVotes(roomId) {
  db.collection("rooms").doc(roomId + "").get()
      .then(function (doc) {
          var totalVotes = doc.data().total_votes;
          console.log(doc.data().id);
          $("#total-votes-goes-here").text(totalVotes);
      })
}

// run the function
getCurrentWinner();