
//setting user status default
(function() {
  var userStatus = {
    energy: 100,
    steps: 0,
    berries: 0,
  };
//grab element with the id of status
  var status = document.getElementById("status");
//once button is clicked add steps counter  
  function updateUserStatusDom() {
    status.innerHTML = "";
    for(key in userStatus) {
      // setting parameter that value needs to be greater then 0 before being visable
      if (userStatus[key] > 0) {
        //creates new div element within userStatus
        var div = document.createElement("div");
        div.innerHTML ="<div>" + key + ": " + userStatus[key] + "</div>";
        status.appendChild(div);
      };
    };
  };
  updateUserStatusDom();

  //button to walk down trail
  var walkBtn = document.getElementById("walk");
  //set variable for left side to input dialog
  
//each time button is clicked, it is disabled for 3 secs
  walkBtn.addEventListener('click', function() {
    this.setAttribute("disabled", "true");
      setTimeout(function() {
        walkBtn.removeAttribute("disabled")
      }, 1000)

//adds line of walking text to left div each time button is clicked
    var walkingText = document.createElement("div");
    walkingText.innerHTML = "you continue down the trail";
    document.getElementById("left").appendChild(walkingText);    
  //each time button is clicked increment steps
    function increase () {
      userStatus.steps++;
    };
    increase();
    updateUserStatusDom();
    
    if (userStatus.steps % 10 == 0) {
      //create the berry button
      var berryBtn = document.createElement('button');
      berryBtn.id = "pick-berries";
      berryBtn.innerHTML = "pick-berries";
      document.getElementById("buttons").appendChild(berryBtn);
      //add random between 1-10 number of berries
      berryBtn.addEventListener('click', function() {
        var berryCount = Math.floor(Math.random() * 10) + 1;
        userStatus.berries += berryCount;
      //add berry text
        var berryTxt = document.createElement("div");
        berryTxt.innerHTML = "you have collected " + berryCount + " berries"
        document.getElementById("left").appendChild(berryTxt);
        updateUserStatusDom();
        document.getElementById("buttons").removeChild(berryBtn);  
      }) // ends berry event listener
    } // ends if statement
  }) // ends walkbtn listener

})();

