// Dice roll animation
function playDiceRollAnimation() {
  $(".dice").addClass("rotate")
  .on("animationend", ()=>{
    $(".dice").removeClass("rotate");
  })
}

// Responding to Dropdown Menu
let dropdownOptions = document.querySelectorAll('#list li');
dropdownOptions.forEach(dropdownOption => {
  dropdownOption.addEventListener('click', e => {
    let numberOfChoices = parseInt(e.target.innerText);
    document.getElementById('noOfChoices').innerHTML = numberOfChoices;
    // Toggling the Number of Input Fields and Dice
    switch(numberOfChoices) {
      case 2:
        $(".3choices, .4choices").addClass("d-none");
        break;
      case 3: 
        $(".4choices").addClass("d-none");
        $(".3choices").removeClass("d-none");
        break;
      case 4: 
        $(".3choices, .4choices").removeClass("d-none");
        break;
    }
  })
})

// Actively render Dice Captions on Change
let userInputFields = document.querySelectorAll('#userInputFields input');  
userInputFields.forEach((userInputField, index) => {
  userInputField.addEventListener('change', e => {
    index++;
    document.getElementById("caption" + index).innerHTML = e.target.value;
  });
});

// Respond to Submit
$("#submit").click(e => {
  e.preventDefault();
  $("#submit").html("Again");
  playDiceRollAnimation();

  var numberOfChoices = parseInt(document.getElementById('noOfChoices').innerHTML);
  
  var diceRolls = [];
  var userChoices = [];
  // Generate Diceroll values
  for (let i = 1; i <= numberOfChoices; i++){
    diceRoll = Math.floor(Math.random()*6 + 1);
    document.querySelectorAll("img")[i].setAttribute("src", ("dice" + diceRoll + ".png"));
    diceRolls.push(diceRoll);
    // Storing User inputs
    userChoices.push($(`#choice-${i}`).val());
  }
  
  // Pick highest Diceroll or Tie
  maxDiceRoll = Math.max(...diceRolls);
  diceRolls.filter(n => n === maxDiceRoll).length > 1 ? isTie = true : isTie = false;
  if (isTie === true) {
    printTie();
  } else {
    winnerPosition = diceRolls.indexOf(maxDiceRoll);
    winner = userChoices[winnerPosition];
  printWin();
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
