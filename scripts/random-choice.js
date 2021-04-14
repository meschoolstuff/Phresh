function getDirections() {
    const parsedUrl = new URL(window.location.href);
    console.log(parsedUrl.searchParams.get("id"));

    // extract id from url, assign to variable
    var id = parsedUrl.searchParams.get("id");
    console.log(id);

    // use this ID to read from firestore
    db.collection("restaurants-list")
      .doc(id)   
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
        $("#details-go-here").append(codestring);
        console.log("location is " + location);

      })
  }
getDirections();