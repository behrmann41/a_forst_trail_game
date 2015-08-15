
//setting user status default
(function() {
  var userStatus = {
    energy: 100,
    steps: 0,
    berries: 0,
    water: 0
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
      //decrease energy by random number of 1-10 per step
      userStatus.energy -= Math.floor(Math.random() * 10) + 1;
    };
    increase();
    updateUserStatusDom();
    
    if (userStatus.steps % 2 == 0) {
      // verify pick berries is not already present
      if (document.getElementById("pick-berries") === null) {
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
          
          //timer on eat berry button
          
          var eatBerryInterval = function() {
            if (document.getElementById("eat-berries") === null){
              if(userStatus.berries > 0){
            //create berry button
                var eatBerryBtn = document.createElement('button')
                eatBerryBtn.id = "eat-berries";
                eatBerryBtn.innerHTML = "eat berry";
                document.getElementById("buttons").appendChild(eatBerryBtn);
                //berry button functionalty
                eatBerryBtn.addEventListener('click', function(){
                  userStatus.berries -= 1;
                  userStatus.energy += 2;
                  eatBerryTxt = document.createElement("div");
                  eatBerryTxt.innerHTML = "you ate berries and gained energy"
                  document.getElementById("left").appendChild(eatBerryTxt);
                  document.getElementById("buttons").removeChild(eatBerryBtn);
                  updateUserStatusDom(); 
                }) 
              }
            }else{
              clearInterval(eatBerryInterval);
            }
          }
          setInterval(eatBerryInterval, 10000);   
        })// ends berry event listener
      }  // end verify berry button 
    }// ends berry button if statement

    if (userStatus.steps % 4 == 0) {
      // verify look for water is not already present
      if (document.getElementById("get-water") === null) {  
        //create water button
        var waterBtn = document.createElement('button');
        waterBtn.id = "get-water";
        waterBtn.innerHTML = "look for water";
        document.getElementById("buttons").appendChild(waterBtn);
        //functionality to water button
        waterBtn.addEventListener('click', function() {
          //randome event either 1 or 0
          waterCount = Math.random() < 0.5 ? 0 : 1
          userStatus.water += waterCount;
          var waterTxt = document.createElement("div");
          //add text based on result of water find
          if (waterCount == 0) {
            waterTxt.innerHTML = "you couldn't find any water";
            document.getElementById("left").appendChild(waterTxt);
          }else {
            waterTxt.innerHTML = "you found water";
            document.getElementById("left").appendChild(waterTxt);
          }
          document.getElementById("buttons").removeChild(waterBtn);
          updateUserStatusDom();

          var drinkWaterInterval = function() {
            if (document.getElementById("drink-water") === null){
              if(userStatus.water > 0){
            //create berry button
                var drinkWaterBtn = document.createElement('button')
                drinkWaterBtn.id = "drink-water";
                drinkWaterBtn.innerHTML = "drink water";
                document.getElementById("buttons").appendChild(drinkWaterBtn);
                //berry button functionalty
                drinkWaterBtn.addEventListener('click', function(){
                  userStatus.water -= 1;
                  userStatus.energy += 10;
                  drinkWaterTxt = document.createElement("div");
                  drinkWaterTxt.innerHTML = "you drank water and gained energy"
                  document.getElementById("left").appendChild(drinkWaterTxt);
                  document.getElementById("buttons").removeChild(drinkWaterBtn);
                  updateUserStatusDom(); 
                }) 
              }
            }else{
              clearInterval(drinkWaterInterval);
            }
          } //drink water interval end
          setInterval(drinkWaterInterval, 5000);
        }); //water button event listener end
      } // verify look for water is not already present - end
    }//ends water button if statement

    if (userStatus.energy <= 0){
    var endGameTxt = document.createElement("div");
    endGameTxt.innerHTML = "you have died! zZZ(-_-)ZZz";
    document.getElementById("left").appendChild(endGameTxt);
    document.getElementById('buttons').removeChild(walkBtn);
    document.getElementById("buttons").removeChild(waterBtn);
    document.getElementById("buttons").removeChild(berryBtn);
    document.getElementById('buttons').removeChild(eatBerryBtn);
    document.getElementById('buttons').removeChild(drinkWaterBtn);
    };
  })// ends walkbtn listener
})();