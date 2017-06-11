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
    $( group + ' > li' ).removeClass( "hidden" ); //remove css class hidden
}


//function to announce player
function announcePlayer(myPlayer, playerNum){
    //Remove all html, button etc in order to replace with text
    $('#messageRow').empty();

    //creating two bootstrap rows.  Probably could have created a well
    var html = '<div class="row"><div class="col-xs-offset-5 col-sm-offset-5 col-md-offset-5 col-lg-offset-5"><span id="playerName"></span></div></div> <div class="row"><div class="col-xs-offset-5 col-sm-offset-5 col-md-offset-5 col-lg-offset-5"><span id="message"></span></div></div>'
    $('#messageRow').html(html);

    var playerMessages = ("Hi " + myPlayer.name + " You are Player " + playerNum);

    $('#playerName').text(playerMessages);
}


//turn switching
//essentially have 4 browser windows, 2 in each tab
function runPlayerTurn(currentPlayer, p1, p2, database){

    //check if both players have made moves
    if(p1.move != '' && p2.move != ''){
        //check who wins
        //update wins/loss
        //reset moves to ''
        //push to db
    } else if (currentPlayer == myPlayer && myPlayer == p1){

    } else if (currentPlayer != myPlayer && myPlayer == p1){

    } else if (currentPlayer == myPlayer && myPlayer == p2){

    } else if (currentPlayer != myPlayer && myPlayer == p2){

    }
}

//check for winner
function checkWinner(p1, p2){


}


//document. ready function to start
$(document).ready(function(){
    startFirebase();


    //Define variables here
    //objects with properties
    var playerOne = {
        name: "",
        move: "",
        playerNumber: 1,
        wins: 0,
        lose: 0
    };

    var playerTwo = {
        name: "",
        move: "",
        playerNumber: 2,
        wins: 0,
        lose: 0
    };

    var myPlayer;


//implement click listener
    $('#start').on('click', function() {
        var name = $("#name").val();

        //check if playerOne.name is blank
        if(playerOne.name == '') {
            //set playerOne to name in firebase db
            database.ref().set({
                //important to establish both objects in each statement as to not overwrite
                //initial issue - overwriting player 1 in Firebase
                playerOne:name, //set to the value in the textbox in html
                playerTwo: playerTwo.name //set the value to the object (line 60)
            });
            myPlayer = playerOne;
            announcePlayer(myPlayer, 1);



        } else if (playerTwo.name == ''){
            //set playerTwo to name in firebase db
            database.ref().set({
                playerOne: playerOne.name, //set the value to the object (line 55)
                playerTwo: name //set to the value in the textbox in html
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


    //function to remove player names and reset to blank strings in firebase
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


    //define firebase as database
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

        //define currentPlayer variable
        //both clients need to understand whose turn it is
        //currentPlayer will either be player1 or player2

        var currentPlayer = snapshot.val().currentPlayer;
        var p1 = snapshot.val().p1;
        var p2 = snapshot.val().p2;

        if (currentPlayer == undefined){
            if(playerOne.name != '' && playerTwo.name != ''){
                database.ref().set({
                    playerOne: playerOne.name,
                    playerTwo: playerTwo.name,
                    currentPlayer: playerOne,
                    p1: playerOne,
                    p2: playerTwo
                });
            }
        } else {
            if(playerOne.name != '' && playerTwo.name != ''){
                runPlayerTurn(currentPlayer, myPlayer, p1, p2, database);
            }
        }
    });
});






