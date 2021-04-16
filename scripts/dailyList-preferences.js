
// assigns an event listener to the "finish" button, which runs the two functions inside only when clicked, this button effectively
// "saves" the user's settings when they make changes.
document.getElementById("finish").addEventListener('click', function () {
    getFormInputs();
    newPage();
});

// this function retrieves the restaurant preferences selected by the user.
function getFormInputs() {
    // Either true or false
    var fastFood = document.getElementById("fast").checked;
    var asianFood = document.getElementById("asian").checked;
    var americanFood = document.getElementById("american").checked;
    var seafood = document.getElementById("sea").checked;
    var vegetarian = document.getElementById("vegeta").checked;

    // put preferences into an array
    var preferences = [];
    if (fastFood) {
        preferences.push("fastfood");
    }

    if (asianFood) {
        preferences.push("asianfood");
    }

    if (americanFood) {
        preferences.push("americanfood");
    }
    if (seafood) {
        preferences.push("seafood");
    }
    if (vegetarian) {
        preferences.push("vegetarian");
    }

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")
            .doc(user.uid)
            // WRITES data to the preferences field in the collection of the user document
            .update({
                "preferences": preferences
            })
    })
}
getFormInputs();

// once the preferences are chosen, the user is taken to the daily list page to see their daily list 
// with their preferences taken into consideration
function newPage() {
    location.href = "dailyList-list.html"
}

