// Dice roll animation
function playDiceRollAnimation() {
  // Playing dice animation
  $(".dice").addClass("rotate").on("animationend", ()=>{
    $(".dice").removeClass("rotate");
  })
}

// Dropdown Menu
let dropdownOptions = document.querySelectorAll('#list li');
dropdownOptions.forEach(dropdownOption => {
  dropdownOption.addEventListener('click', e => {
    let numberOfChoices = parseInt(e.target.innerText);
    document.getElementById('noOfChoices').innerHTML = numberOfChoices;
    // Toggling the Number of Blanks and Dice
    switch(numberOfChoices) {
      case 2:
        $(".choice3, .choice4").addClass("d-none");
        break;
      case 3: 
        $(".choice4").addClass("d-none");
        $(".choice3").removeClass("d-none");
        break;
      case 4: 
        $(".choice3, .choice4").removeClass("d-none");
        break;
    }
  })
})

// Actively rendering Dice Captions
let userInputFields = document.querySelectorAll('#userInputFields input');  
userInputFields.forEach(((userInputField, i) => {
  userInputField.addEventListener('change', e => {
    i++;
    document.getElementById('caption' + i).innerHTML = e.target.value;
  });
}));

// Responding to Submit
$("#submit").click(e => {
  // Changes button html and rolls dice
  e.preventDefault();
  $("#submit").html("Again");

  // Storing User inputs
  var userInput1 = $("#choice1").val();
  var userInput2 = $("#choice2").val();
  var userInput3 = $("#choice3").val();
  var userInput4 = $("#choice4").val();
  var numberOfChoices = parseInt(document.getElementById('noOfChoices').innerHTML);

  // Generating random dice numbers
  var randomNos = [];
  for (let i = 1; i <= 4; i ++){
    randomNo = Math.floor(Math.random() * 6 + 1);
    let imageSrc = "dice" + randomNo + ".png";
    randomNos.push(randomNo);
    document.querySelectorAll("img")[i].setAttribute("src", imageSrc);
  }
  playDiceRollAnimation();

  console.log(numberOfChoices);
  // Picking Winner
  let maxDiceNo = 0;
  switch(numberOfChoices) {
    case 2: 
      if (randomNos[0] === randomNos[1]) {
        printTie();
      } else if (randomNos[0] > randomNos[1]) {
        winner = userInput1
        printWin(winner);
      } else {
        winner = userInput2;
        printWin(winner);
      }
      break;
    case 3: 
      userChoices = [userInput1, userInput2, userInput3];
      maxDiceNo = Math.max(...randomNos);
      randomNos.filter(x => x === maxDiceNo).length > 1 ? isTie = "True" : isTie = "False";
      if (isTie === "True") {
        printTie();
      } else {
        winnerPosition = randomNos.indexOf(maxDiceNo);
        winner = userChoices[winnerPosition];
      printWin();
      }
      break;
    case 4: 
      userChoices = [userInput1, userInput2, userInput3, userInput4];
      maxDiceNo = Math.max(...randomNos);
      randomNos.filter(x => x === maxDiceNo).length > 1 ? isTie = "True" : isTie = "False";
      if (isTie === "True") {
        printTie();
      } else {
        winnerPosition = randomNos.indexOf(maxDiceNo);
        winner = userChoices[winnerPosition];
      printWin();
      }
      break;
  }
});

// Printing Tie
function printTie() {
  $("#title").html("Tie, please try again!").addClass("redify big-font").removeClass("greenify");
}

// Printing Winner
function printWin() {
  $("#title").html(winner + " wins! 🏆");
  $("#title").addClass("greenify big-font").removeClass("redify");
}
