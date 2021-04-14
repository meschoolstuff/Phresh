// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically or whether we leave that to developer to handle.
      //------------------------------------------------------------------------------------------
      var user = authResult.user;
      var timeStamp = Date.now();
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
            db.collection("rooms").doc(timeStamp + "").collection("votes").add({

            })
            // change this!
            console.log("New user added to firestore");
            db.collection("rooms").doc(timeStamp + "").set({
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0
            })
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