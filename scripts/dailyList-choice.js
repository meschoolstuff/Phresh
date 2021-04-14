function getDirections() {
  const parsedUrl = new URL(window.location.href);
  console.log(parsedUrl.searchParams.get("id"));

  // previous page put the id into the current html address, will read this id and assign it to a variable.
  var id = parsedUrl.searchParams.get("id");
  console.log(id);

  // use this ID to read data from firestore
  db.collection("restaurants-list")
    .doc(id)
    .get()
    .then(function (doc) {
      // with the id, we will read from the document the title, description and location of the restaurant document.
      var heading = doc.data().title;
      var bio = doc.data().description;
      var direction = doc.data().location;
      // with the read and stored into variables, we concantenate them together to create an HTML structure.
      var codestring =
        '<div id="directions">'
        + '<div class="container-fluid mt-4">'
        + '<div class="card container-fluid">'
        + direction
        + '</div>'
        + '</div>'
        + '<div id="caption" class="mt-2">'
        + '<h5>' + heading + '</h5>'
        + '<p>' + bio + '</p>'
        + '</div>'
        + '</div>'
        + '</div>';
      // we then append our newly built HTML structure into an HTML DOM element .
      $("#details-go-here").append(codestring);
    })
}
getDirections();