// reads the group code from the database
function sayGroupCode() {
    firebase.auth().onAuthStateChanged(function (somebody) {
      if (somebody) {
        console.log(somebody.uid);
        db.collection("users")
          .doc(somebody.uid)
          .get() // Read!
          .then(function (doc) {
            var n = doc.data().groupCode;
            resetVotes(n);
            resetTotalVotes(id)
            $("#code-goes-here").text(n);
            addSubmitListener(n);
          });
      }
    });
}
sayGroupCode();

// listens to start and redirects
function addSubmitListener(id) {
document.getElementById("submit").addEventListener("click", function () {
    console.log(id + "was clicked!");
    window.location.href = "group-picks.html?id=" + id;
    });
}

// resets the votes to ensure that votes are zeroed at the start
function resetVotes(id) {
  id = "" + id;
  db.collection("rooms").doc(id).collection("votes").doc("r1").update({
    value: 0
  })

  db.collection("rooms").doc(id).collection("votes").doc("r2").update({
    value: 0
  })

  db.collection("rooms").doc(id).collection("votes").doc("r3").update({
    value: 0
  })

  db.collection("rooms").doc(id).collection("votes").doc("r4").update({
    value: 0
  })

  db.collection("rooms").doc(id).collection("votes").doc("r5").update({
    value: 0
  })
}

// resets the total votes field each time you run the program
function resetTotalVotes(id) {
  id = "" + id;
  db.collection("rooms").doc(id).update({
    total_votes: 0
  })
}