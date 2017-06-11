/**
 * Created by ryanhoyda on 6/5/17.
 */

//wrap firebase in a function so we can call it
function startFirebase() {
// Initialize Firebase
var config = {
        apiKey: "AIzaSyDAraVHUUUkR4L0yNE3P2n2jiF2jTNy6Kg",
        authDomain: "rps-multiplayer-e8125.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-e8125.firebaseio.com",
        projectId: "rps-multiplayer-e8125",
        storageBucket: "rps-multiplayer-e8125.appspot.com",
        messagingSenderId: "763015821378"
    };

firebase.initializeApp(config);

}




//document. ready function to start

$(document).ready(function(){
    startFirebase();

    var playerOne= {
        name: "",
        move: ""
    }


    var playerTwo= {
        name: "",
        move: ""
    }





//implement click listener
    $('#start').on('click', function() {
        console.log('clicked');
        //get input box "name"
        var name = $("#name").val();



        //check if playerOne.name is blank
        if(playerOne.name == '') {
            //set playerOne to name in firebase db
            database.ref().set({
                playerOne:name
            });

        } else if (playerTwo.name == ''){
            //set playerTwo to name in firebase db
            database.ref().set({
                playerTwo:name
            });


        }

    });

    $('#send').on('click', function() {
        console.log('send');
        //get input box "info"
        var text = $("#inputID").val();
        console.log(text);

    });

    var database = firebase.database();

    database.ref().on("value", function(snapshot) {
        playerOne.name(snapshot.val().playerOne);
        playerTwo.name(snapshot.val().playerTwo);

    });

});






