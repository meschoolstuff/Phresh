// variable to make sure the error message only comes up once
var count = 0;

// listens to the submit button and reads the user input
function readInput() {
    var input = document.getElementById("groupCode").value;
    console.log(input);

    var roomRef = db.collection("rooms").doc("" + input);
    
    // sends the room id to addSubmitListener() function if exists
    roomRef
    .get()
    .then((doc) => {
        if (doc.exists) {
        var id = "" + input;
        console.log("Document data:", doc.data());
        console.log("exists!");
        addSubmitListener(id);
        } else if (count == 0) {
        printErrorMessage();
        console.log("No such document!");
        count = 1;
        }
    })
    .catch((error) => {
        console.log("Error getting document:", error);
    });

    return false;
}

// function that redirects user to voting room
function addSubmitListener(id) {
    console.log(id + "was clicked!");
    window.location.href = "group-picks.html?id=" + id;
}

// function to print the error message
function printErrorMessage() {
    $("#error-message").append(
    "<label class='container-fluid mt-5 text-center text-danger h3'>Group Code Does Not Exist!</label>"
    );
}