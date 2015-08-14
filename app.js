
//setting user status default
(function() {
  var userStatus = {
    energy: 100,
    steps: 0
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
  var btn = document.getElementById("walk");
  //set variable for left side to input dialog
  
//each time button is clicked, it is disabled for 3 secs
  btn.addEventListener('click', function() {
    this.setAttribute("disabled", "true");
      setTimeout(function() {
        btn.removeAttribute("disabled")
      }, 3000)

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
  })

})();

