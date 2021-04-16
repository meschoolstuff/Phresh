
// displays a random restaurant from the restaurant database
function displayRandomRestaurant() {
  // generates a random number between 1 - 5, corresponding to the id numbers of each of the restaurants
  var randomNum = Math.floor(Math.random() * 5) + 1
  db.collection("restaurants-list")
    // compares the random number to the various restaurant ids?
    .where("id", ">=", randomNum)
    // places a limit on the number of restaurants the random function will display
    .limit(1)
    // READS from the restaurant database
    .get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        var pic = doc.data().img;
        var heading = doc.data().title;
        var bio = doc.data().description;
        var id = doc.id;
        var restaurant = '<div class="card mt-3 container-fluid">'
          + '<img src="' + pic + '" class="card-img-top">'
          + '<div class="card-body">'
          + '<h5 class="card-title">' + heading + '</h5>'
          + '<p class="card-text">' + bio + '</p>'
          + '<div id="buttons">'
          + '<div class="container-fluid text-center">'
          + '<button id="no" onclick="location.reload()" type="button" class="btn btn-primary">Nope</button>'
          + '<button id="' + id + '" type="button" class="btn btn-success text-center">I was</button>'
          + '</div>'
          + '</div>'
          + '</div>'
          + '</div>';
        $("#restaurant-goes-here").append(restaurant);

        // adds a direction listener to the card's "I was" button right after the card is created.
        addDirectionListener(id)
      })
    })
}
displayRandomRestaurant();

// adds a direction litener to the id button, which will lead to the directions page.
function addDirectionListener(id) {
  document.getElementById(id)
    .addEventListener("click", function () {
      console.log(id + " was clicked!")
      // adds the id of the restaurant into the html address of the next page, the next page will use this 
      // to select the restaurant document and grab data from it and display the map.
      window.location.href = "random-choice.html?id=" + id;
    });
}
