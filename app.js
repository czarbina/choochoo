console.log("please god")

var config = {
    apiKey: "AIzaSyA8d2vLGYkK07Wrtu3XJz4QXV7JFppO978",
    authDomain: "the-train-game-ea243.firebaseapp.com",
    databaseURL: "https://the-train-game-ea243.firebaseio.com",
    projectId: "the-train-game-ea243",
    storageBucket: "",
    messagingSenderId: "165866061975"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  
// Variables that will eventually have data stored
  var trainName;
  var destination;
  var tTimeInitial;
  var frequency;

  $("#submitBtn").on("click", function(event) {
      event.preventDefault();

      console.log("You clicked me");

      database.ref().push({

        trainName: $("#trainName").val().trim(),
        destination: $("#destination").val().trim(),
        tTimeInitial: $("#t-time-initial").val().trim(),
        frequency: $("#frequency").val().trim()
      });
    });

  	

 
