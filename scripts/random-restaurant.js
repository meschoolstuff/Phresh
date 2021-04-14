function displayRandomRestaurant() {
    var randomNum = Math.floor(Math.random() * 5) + 1
    db.collection("restaurants-list")
      .where("id", ">=", randomNum)
      .limit(1)
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
                    + '<button id="' + id + '" type="button" class="btn btn-success text-center">I Was</button>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
          $("#restaurant-goes-here").append(restaurant);
          addDirectionListener(id)
        })
      })
  }
displayRandomRestaurant();

function addDirectionListener(id) {
    document.getElementById(id)
        .addEventListener("click", function () {
        console.log(id + " was clicked!")
        window.location.href = "random-choice.html?id=" + id;
        });
}
