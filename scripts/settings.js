function getFormInputs() {
    document.getElementById("save").addEventListener('click', function () {

        // Checks if the checkbox corresponding to each category was checked, returns true or false.
        var fastFood = document.getElementById("fast").checked;
        var asianFood = document.getElementById("asian").checked;
        var americanFood = document.getElementById("american").checked;
        var seafood = document.getElementById("sea").checked;
        var vegetarian = document.getElementById("vegeta").checked;

        // put preferences into an array
        var preferences = [];
        // if the checkbox corresponding to the choice was checked, the category is added into the preferences array.
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
            // accesses the "users" collection
            db.collection("users")
                // retrieves the document specific to this user
                .doc(user.uid)
                // WRITES data to the preferences field in the collection of the user document
                .update({
                    "preferences": preferences
                })
        })
    })
}
getFormInputs();

// This displays the user's information
function displayUserInfo() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            console.log(somebody.uid);
            // Access the "users" collection
            db.collection("users")
                // retrieves the document corresponding to the user
                .doc(somebody.uid)
                // READS data from the document
                .get()
                .then(function (doc) {
                    // console.log(doc.data().name);
                    var a = doc.data().name;
                    var b = doc.data().email;
                    var c = doc.data().groupCode;
                    // displays the data in DOM elements
                    $("#name-here").text(a);
                    $("#email-here").text(b);
                    $("#groupCode-here").text(c);

                })
        }
    })
}
displayUserInfo();

// this is the logout function for the application
const logout = document.getElementById("logout").addEventListener('click', function () {
    auth.signOut();
    location.replace("login.html");
})
