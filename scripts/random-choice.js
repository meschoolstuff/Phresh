
// gets the directions (map) of the restaurant
function getDirections() {
  // the id of the restaurant is extracted from the URL which was put there by a function on the previous page
    const parsedUrl = new URL(window.location.href);
    console.log(parsedUrl.searchParams.get("id"));

  // previous page put the id into the current html address, will read this id and assign it to a variable.
  var id = parsedUrl.searchParams.get("id");
    console.log(id);

    // use this ID to read from resturant-list database in firestore
    db.collection("restaurants-list")
      .doc(id)
      // READ data from the specified restaurant document   
      .get()
      .then(function (doc) {   
        var heading = doc.data().title;       
        var bio = doc.data().description;     
        var direction = doc.data().location;
        var codestring =
          '<div id="directions">'
          + '<div class="container-fluid mt-4">'
          + '<div class="card container-fluid">'
          + direction
          + '</div>'
          + '</div>'
          + '<div id="caption" class="mt-3">'
          + '<h5>' + heading + '</h5>'
          + '<p>' + bio + '</p>'
          + '</div>'
          + '</div>'
          + '</div>';

          // append the HTML structure to the DOM element.
        $("#details-go-here").append(codestring);
        console.log("location is " + location);

      })
  }
getDirections();