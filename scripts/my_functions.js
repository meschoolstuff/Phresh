function sayHello(){
    firebase.auth().onAuthStateChanged(function(somebody){
        if(somebody){
            console.log(somebody.uid);
            db.collection("users")
            .doc(somebody.uid)
            .get()                      // Read!
            .then(function(doc){
                // console.log(doc.data().name);
                var n = doc.data().name;
                $("#name-goes-here").text(n);
                // do other things and get other things
            })
        }
    })
}
sayHello();

function sayGroupCode() {
    firebase.auth().onAuthStateChanged(function(somebody){
        if(somebody){
            console.log(somebody.uid);
            db.collection("users")
            .doc(somebody.uid)
            .get()                      // Read!
            .then(function(doc){
                // console.log(doc.data().name);
                var n = doc.data().groupCode;
                $("#code-goes-here").text(n);
                // do other things and get other things
            })
        }
    })
}
sayGroupCode();

