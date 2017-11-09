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
  var firstTimeConverted;
  var timeCurrent;
  var diffTime;
  var tRemainder;
  var minTilTrain;
  var nextTrain
  

  $("#submitBtn").on("click", function(event) {
      event.preventDefault();

      frequency = $("#frequency").val().trim()
      trainName = $("#trainName").val().trim(),
      destination = $("#destination").val().trim(),
      tTimeInitial = $("#t-time-initial").val().trim(),

      firstTimeConverted = moment(tTimeInitial, "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      timeCurrent = moment();
      console.log("CURRENT TIME" + 
      moment(timeCurrent).format("hh:mm"));

      diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      tRemainder = diffTime % frequency;
      console.log(tRemainder);

      minTilTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + minTilTrain);

	  nextTrain = moment().add(minTilTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


      database.ref().push({

        trainName: trainName,
        destination: destination,
        // tTimeInitial: $("#t-time-initial").val().trim(),
        frequency: frequency,
        nextTrain: nextTrain,
        minTilTrain: minTilTrain

      });
    });

  database.ref().on("child_added", function(snapshot) {      

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      var tname = snapshot.val().trainName;
      var tdest = snapshot.val().destination;
      var tTime = snapshot.val().tTimeInitial;
      var tFreq = snapshot.val().frequency;

   	  

      $("tbody").append("<tr><td>" + tname + "</td> <td>" + tdest + "</td><td>" + tFreq + "</td><td>" 
      	+ tTime + "</td><td>" + "MINUTES AWAY" + "</td></tr>");

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

  	

 
