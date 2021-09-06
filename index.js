function diceRoll() {
  // Random dice numbers
  for (let i = 1; i < 5; i ++){
    let imageSrc = "dice" + Math.floor(Math.random() * 6 + 1) + ".png";
    document.querySelectorAll("img")[i].setAttribute("src", imageSrc);
  }
  
  // Dice animation
  $(".dice").addClass("rotate").on("animationend", ()=>{
    $(".dice").removeClass("rotate");
  })
}

// Dropdown Menu
let dropdownOptions = document.querySelectorAll('#list li');
dropdownOptions.forEach(dropdownOption => {
  dropdownOption.addEventListener('click', e => {
    let numberOfChoices = parseInt(e.target.innerText);
    document.getElementById('dropdownMenu').innerHTML = `${numberOfChoices}<span class="caret"></span>`;
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

// Actively changing Dice Captions
let userInputFields = document.querySelectorAll('#userInputFields input');  
userInputFields.forEach(((userInputField, i) => {
  userInputField.addEventListener('change', e => {
    i++;
    document.getElementById('caption' + i).innerHTML = e.target.value;
  });
}));

// Declaring Variables
var randomNo1 = 6, 
randomNo2 = 6, 
randomNo3 = 6,
randomNo4 = 6;
var Image1;
var Image2;
var Image3;
var Image4;
var isTie;
var winNo;
var userChoices = [];
var winner;
var winnerPosition;

// Responding to Submit
$("#submit").click(e => {
  // Changes button html and roll dice
  e.preventDefault();
  $("#submit").html("Again");
  diceRoll();

  // Storing User inputs
  var choice1 = $("#choice1").val();
  var choice2 = $("#choice2").val();
  var choice3 = $("#choice3").val();
  var choice4 = $("#choice4").val();
  var noOfChoices = parseInt($("#dropdownMenu").innerText);
  var diceValues = [];

  // Picking Winner
  switch(noOfChoices) {
    case 2: 
      if (randomNo1 === randomNo2) {
        $("#title").html("Tie, please try again!").addClass("redify bigger").removeClass("greenify");
      } else if (randomNo1 > randomNo2) {
        winner = choice1
        printWin(winner);
      } else {
        winner = choice2;
        printWin(winner);
      }
      break;
    case 3: 
      userChoices = [choice1, choice2, choice3];
      diceValues.push(randomNo1, randomNo2, randomNo3);
      let maxDice = Math.max(...diceValues);
      diceValues.filter(x => x === maxDice).length > 1 ? isTie = "True" : isTie = "False";
      if (isTie === "True") {
        $("#title").html("Tie, please try again!").addClass("redify bigger").removeClass("greenify");;
      } else {
        winnerPosition = diceValues.indexOf(maxDice);
        winner = userChoices[winnerPosition];
      printWin();
      }
      break;
    case 4: 
      diceValues.push(randomNo1, randomNo2, randomNo3, randomNo4);
      let maxDice2 = Math.max(...diceValues);
      diceValues.filter(x => x === maxDice2).length > 1 ? isTie = "True" : isTie = "False";
      if (isTie === "True") {
        $("#title").html("Tie, please try again!").addClass("redify bigger").removeClass("greenify");;
      } else {
        winnerPosition = diceValues.indexOf(maxDice2);
        winner = userChoices[winnerPosition];
      printWin();
      }
      break;
  }
});

// Printing Winner
function printWin() {
  $("#title").html(winner + " wins! 🏆");
  $("#title").addClass("greenify bigger").removeClass("redify");
}

