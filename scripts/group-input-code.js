var count = 0;

function readInput() {
    var input = document.getElementById("groupCode").value;
    console.log(input);

    var roomRef = db.collection("rooms").doc("" + input);

    roomRef
    .get()
    .then((doc) => {
        if (doc.exists) {
        var id = "" + input;
        console.log("Document data:", doc.data());
        console.log("exists!");
        addSubmitListener(id);
        } else if (count == 0) {
        // doc.data() will be undefined in this case
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

function addSubmitListener(id) {
    // document.getElementById("submit").addEventListener("click", function () {
    console.log(id + "was clicked!");
    //   window.location.href="details.html";
    window.location.href = "group-picks.html?id=" + id;
    // });
}

function printErrorMessage() {
    $("#error-message").append(
    "<label class='container-fluid mt-5 text-center text-danger h3'>Group Code Does Not Exist!</label>"
    );
}