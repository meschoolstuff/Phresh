document.getElementById("finish").addEventListener('click', function () {
    getFormInputs();
    newPage();
});

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
            .update({
                "preferences": preferences
            })
    })
}
getFormInputs();

function newPage() {
    location.href = "dailyList-list.html"
}

