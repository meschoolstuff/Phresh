// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically or whether we leave that to developer to handle.
      var user = authResult.user;
      var timeStamp = Date.now();

      // for new users, this sets the default preferences to all choices, so that they user won't be left with an empty list 
      // if they choose to view it immediately without picking preferences
      var preferences = [];
      preferences.push("fastfood");
      preferences.push("asianfood");
      preferences.push("americanfood");
      preferences.push("seafood");
      preferences.push("vegetarian");

      if (authResult.additionalUserInfo.isNewUser) {
        // if the user is new, we create a new user in our collection.
        db.collection("users")
          .doc(user.uid)
          // write data to firestore
          .set({
            // we assign this user with the name and email provided to our "users" collection 
            name: user.displayName,
            email: user.email,
            // the time stamp of the sign up is used to create a unique group code for the user
            groupCode: timeStamp,
            // default preferences is to check all options
            "preferences": preferences
          })
          .then(function () {
            db.collection("rooms").doc(timeStamp + "").set({
              total_votes: 0,
              current_winner: 0
            })
            db.collection("rooms").doc(timeStamp + "").collection("votes").doc("r1").set({
              value: 0,
              id: 1
            })
            db.collection("rooms").doc(timeStamp + "").collection("votes").doc("r2").set({
              value: 0,
              id: 2
            })
            db.collection("rooms").doc(timeStamp + "").collection("votes").doc("r3").set({
              value: 0,
              id: 3
            })
            db.collection("rooms").doc(timeStamp + "").collection("votes").doc("r4").set({
              value: 0,
              id: 4
            })
            db.collection("rooms").doc(timeStamp + "").collection("votes").doc("r5").set({
              value: 0,
              id: 5
            })
            console.log("New user added to firestore");

          })
          .then(function () {
            window.location.assign("main.html"); //re-direct to main.html after signup
          })
          .catch(function (error) {
            console.log("Error adding new user: " + error);
          });
      } else {
        return true;
      }
      return false;
    },

    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },

  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "main.html",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],

  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);