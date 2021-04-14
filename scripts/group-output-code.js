function sayGroupCode() {
    firebase.auth().onAuthStateChanged(function (somebody) {
      if (somebody) {
        console.log(somebody.uid);
        db.collection("users")
          .doc(somebody.uid)
          .get() // Read!
          .then(function (doc) {
            // console.log(doc.data().name);
            var n = doc.data().groupCode;
            $("#code-goes-here").text(n);
            // do other things and get other things
            addSubmitListener(n);
          });
      }
    });
}
sayGroupCode();

function addSubmitListener(id) {
document.getElementById("submit").addEventListener("click", function () {
    console.log(id + "was clicked!");
    //   window.location.href="details.html";
    window.location.href = "group-picks.html?id=" + id;
    });
}