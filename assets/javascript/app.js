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


function updatePlayerName(selector, name, group){
    //todo: change the text in selector to equal name
    $(selector).text(name);  //what do we do here to make to replace 'waiting for player x' with name?
    $( group + ' > li' ).removeClass( "hidden" );
}



function announcePlayer(myPlayer){
    //Remove all html
    $('#messages').empty();
    //then insert html that reads Hi! [myPlayer.name] you are [player one/two]
    //create a variable that holds the text
    var playerMessages = ("Hi " + myPlayer.name + " You are Player " + playerNum);

    //insert html into #messages with your string
    $('#messages').html(playerMessages);
}



//document. ready function to start

$(document).ready(function(){
    startFirebase();

    //Define variables here
    //Define variables here
    var playerOne = {
        name: "",
        move: ""
    };

    var playerTwo = {
        name: "",
        move: ""
    };

    var myPlayer;


//implement click listener
    $('#start').on('click', function() {
        var name = $("#name").val();

        //check if playerOne.name is blank
        if(playerOne.name == '') {
            //set playerOne to name in firebase db
            database.ref().set({
                playerOne:name, //set to the value in the textbox
                playerTwo: playerTwo.name
            });
            myPlayer = playerOne;
            announcePlayer(myPlayer, 1);



        } else if (playerTwo.name == ''){
            //set playerTwo to name in firebase db
            database.ref().set({
                playerOne: playerOne.name,
                playerTwo: name //set to the value in the textbox
            });
            myPlayer = playerTwo;
            announcePlayer(myPlayer, 2);
        }

    });


    $('#send').on('click', function() {
        console.log('send');
        //get input box "info"
        var text = $("#inputID").val();
        console.log(text);

    });


    $(window).on('unload', function(){
        //reset playerOne and playerTwo to blank strings
        if (myPlayer == playerOne){
            database.ref().set({
                playerOne: "",
                playerTwo: playerTwo.name
            });
        } else if (myPlayer == playerTwo){
            database.ref().set({
                playerOne: playerOne.name,
                playerTwo: ""
            })
        }
    });



    var database = firebase.database();

    database.ref().on("value", function(snapshot) {
        playerOne.name = (snapshot.val().playerOne);
        playerTwo.name = (snapshot.val().playerTwo);

        if(playerOne.name != ''){
            updatePlayerName('#playerOneName', playerOne.name, '#playerOne');
        }
        if(playerTwo.name != ''){
            updatePlayerName('#playerTwoName', playerTwo.name, '#playerTwo');
        }

    });

});






