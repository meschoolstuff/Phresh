
// shows the list of restaurants from our database
function ShowCollection() {
  firebase.auth().onAuthStateChanged(function (user) {

    // gets the list of all preferences for this user
    db.collection("users").doc(user.uid).get()
      .then(function (snap) {
        var prefs = snap.data().preferences; // key = preferences
        console.log(prefs);

        // get a collection of all docs where "type" appears in preference array
        db.collection("restaurants-list")
          .where("type", "array-contains-any", prefs)
          // READ document data corresponding to our restaurants.
          .get()
          .then(function (doc) {
            if (doc) {
              doc.forEach(function (doc) {
                var pic = doc.data().img;             //key "picture"
                var heading = doc.data().title;       //key "name"
                var bio = doc.data().description;     //key "description"
                var id = doc.id;
                var codestring =
                  '<div class="card mt-3 container-fluid">'
                  + '<img src="' + pic + '" class="card-img-top">'
                  + '<div class="card-body">'
                  + '<h5 class="card-title">' + heading + '</h5>'
                  + '<p class="card-text">' + bio + '</p>'
                  + '<div id="buttons">'
                  + '<div class="container-fluid text-center">'
                  + '<button id="' + id + '" type="button" class="btn btn-success text-center">Directions</button>'
                  + '</div>'
                  + '</div>'
                  + '</div>'
                  + '</div>';

                // append with jquery to DOM
                $("#cards-go-here").append(codestring);
                addDirectionListener(id)
              })
            }
          })

      })

  })
}
ShowCollection();

// adds a direction litener to the id button, which will lead to the directions page.
function addDirectionListener(id) {
  document.getElementById(id)
    .addEventListener("click", function () {
      console.log(id + " was clicked!")
      // adds the id of the restaurant into the html address of the next page, the next page will use this 
      // to select the restaurant document and grab data from it and display the map.
      window.location.href = "dailyList-choice.html?id=" + id;
    });
}