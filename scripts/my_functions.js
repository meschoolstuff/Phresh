// displays the user's name
function sayHello(){
    firebase.auth().onAuthStateChanged(function(somebody){
        if(somebody){
            console.log(somebody.uid);
            // accesses the "users" database
            db.collection("users")
            .doc(somebody.uid)
            // READ data
            .get()
            .then(function(doc){
                var n = doc.data().name;
                // places the data in a DOM element
                $("#name-goes-here").text(n);
            })
        }
    })
}
sayHello();



