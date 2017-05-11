//--------------------------------------------------The Dice--------------------------------------------------------//

function diceRoll4() {                                //these are the roll functions for each *_*sided die//
  var sides = 4
  var roll = 1 + Math.floor(Math.random() * sides);
  return roll;
}
function diceRoll6() {
  var sides = 6
  var roll = 1 + Math.floor(Math.random() * sides);
  return roll;
}
function diceRoll8() {
  var sides = 8
  var roll = 1 + Math.floor(Math.random() * sides);
  return roll;
}
function diceRoll10() {
  var sides = 10
  var roll = 1 + Math.floor(Math.random() * sides);
  return roll;
}
function diceRoll12() {
  var sides = 12
  var roll = 1 + Math.floor(Math.random() * sides);
  return roll;
}
function diceRoll20() {
  var sides = 20
  var roll = 1 + Math.floor(Math.random() * sides);
  return roll;
}

//-----------------------------------------------Rolling The Dice---------------------------------------------------//

function roll(chosenDie) {                            //roll any d4,d6,d8,d10,d12,or d20 with this function//
var dice;
  switch (chosenDie) {
    case "d4":
      dice = diceRoll4();
      break;
    case "d6":
      dice = diceRoll6();
      break;
    case "d8":
      dice = diceRoll8();
      break;
    case "d10":
      dice= diceRoll10();
      break;
    case "d12":
      dice = diceRoll12();
      break;
    case "d20":
      dice = diceRoll20();
      break;
    default:
      dice = diceRoll6();
  }
  return dice;
}

//---------------------------------------Remaining Health calulation ------------------------------------------------//

function newHp(Hp, attTotal) {                             //calculates the user's Hp after an attack
  var currentHp;
  var attackValue = attTotal;
  currentHp = Hp - attackValue;
  Hp = currentHp;
  return currentHp;
}

//-------------------------------------------------Battle Sequence---------------------------------------------------//

function attRound(userHp=50,compHp=50) {                   //Battle function call.
  var userD20 = roll("d20");
  var compD20 = roll("d20");

  if (userD20 > compD20) {
    var attTotal = userAttFirst();
    var compHp = newHp(compHp, attTotal);
    attTotal = compAttSecond();
    var userHp = newHp(userHp, attTotal);
    alert("Your hp: " + userHp + "        " + "comp Hp:" + compHp);
    console.log("user HP:" + userHp + "     " + "comp Hp:" + compHp);
    if (userHp > 0 && compHp > 0) {
      var nextRound = attRound(userHp,compHp);
    }
    else {
      end(userHp,compHp);
    }
  }
  else if (compD20 > userD20) {
    attTotal = compAttFirst();
    userHp = newHp(userHp, attTotal);
    attTotal = userAttSecond();
    compHp = newHp(compHp, attTotal);
    alert("Your hp: " + userHp + "        " + "comp Hp:" + compHp);
    console.log("user HP:" + userHp + "     " + "comp Hp:" + compHp);
    if (userHp > 0 && compHp > 0) {
      nextRound = attRound(userHp,compHp);
    }
    else {
      end(userHp,compHp);
    }
  }
  else if (userD20 = compD20) {
    attRound();
  }

//-----------------------------------------------Boss Battle Sequence------------------------------------------------//

}

function bossAttRound(userHp=50,compHp=80) {                   //Boss battle function call.
  var userD20 = roll("d20");
  var compD20 = roll("d20");

  if (userD20 > compD20) {
    var attTotal = userAttFirst();
    var compHp = newHp(compHp, attTotal);
    attTotal = bossCompAttSecond();
    var userHp = newHp(userHp, attTotal);
    alert("Your hp: " + userHp + "        " + "comp Hp:" + compHp);
    console.log("user HP:" + userHp + "     " + "comp Hp:" + compHp);
    if (userHp > 0 && compHp > 0) {
      var nextRound = bossAttRound(userHp,compHp);
    }
    else {
      finalEnd(userHp,compHp);
    }
  }
  else if (compD20 > userD20) {
    attTotal = bossCompAttFirst();
    userHp = newHp(userHp, attTotal);
    attTotal = userAttSecond();
    compHp = newHp(compHp, attTotal);
    alert("Your hp: " + userHp + "        " + "comp Hp:" + compHp);
    console.log("user HP:" + userHp + "     " + "comp Hp:" + compHp);
    if (userHp > 0 && compHp > 0) {
      nextRound = bossAttRound(userHp,compHp);
    }
    else {
      finalEnd(userHp,compHp);
    }
  }
  else if (userD20 = compD20) {
    bossAttRound();
  }

}

//-----------------------------------------First Round Hp Calculation------------------------------------------------//

function userAttFirst(attTotal) {                         //if the user attacks first, runs the user's attack,
  var attTotal = userAtt();                                      //deducts that attack total from the computer's Hp.
  return attTotal;
}
function compAttSecond(attTotal) {                         //if the computer attacks second, runs the computer's attack,
  var attTotal =  compAtt();                                      //deducts that attack total from the user's Hp.
  return attTotal;
}
function bossCompAttSecond(attTotal) {                         //if the computer attacks second, runs the computer's attack,
  var attTotal =  bossCompAtt();                                      //deducts that attack total from the user's Hp.
  return attTotal;
}
function compAttFirst(attTotal) {                         //if the computer attacks first, runs the computer's attack,
  var attTotal = compAtt();                                      //deducts that attack total from the user's Hp.
  return attTotal;
}
function bossCompAttFirst(attTotal) {                         //if the computer attacks first, runs the computer's attack,
  var attTotal = bossCompAtt();                                      //deducts that attack total from the user's Hp.
  return attTotal;
}
function userAttSecond(attTotal) {                         //if the user attacks second, runs the user's attack,
  var attTotal = userAtt();                                      //deducts that attack total from the computer's Hp.
  return attTotal;
}

//-----------------------------------------------Attack Functions----------------------------------------------------//

function userAtt() {                              //attack total for the user's attack phase
  var userAttRoll = userAttMod();
  var compDeffRoll = compDeffMod();
  var attTotal;
  if (userAttRoll > compDeffRoll) {
     attTotal = userAttRoll - compDeffRoll;
     alert("Your attack lands! your opponent takes " + attTotal + " damage!");
     console.log("Your opponent takes " + attTotal + " damage!");
  }
  else if (userAttRoll < compDeffRoll) {
     attTotal = 0;
     alert("Your opponent blocks your attack!");
     console.log("Your opponent takes " + attTotal + " damage!");
  }
  else if (userAttRoll = compDeffRoll) {
    var tieRoll = roll("d8");
    if (tieRoll <= 4) {
       attTotal = 0;
       alert("Your opponent blocks your attack!");
       console.log("Your opponent takes " + attTotal + " damage!");
    }
    else if (tieRoll > 4) {
      attTotal = tieRoll - 4;
      alert("Your attack lands! your opponent takes " + attTotal + " damage!");
      console.log("Your opponent takes " + attTotal + " damage!");
    }
  }
  return attTotal;
}

function compAtt() {                              //attack total for the computer's attack phase
  var compAttRoll = compAttMod();
  var userDeffRoll = userDeffMod();
  var attTotal;
  if (compAttRoll > userDeffRoll) {
     attTotal = compAttRoll - userDeffRoll;
     alert("Your block was ineffective! you take " + attTotal + " damage!");
     console.log("You take " + attTotal + " damage!")
  }
  else if (compAttRoll < userDeffRoll) {
     attTotal = 0;
     alert("You sucessfuly block the attack!");
     console.log("You take " + attTotal + " damage!");
  }
  else if (compAttRoll = userDeffRoll) {
    var tieRoll = roll("d8");
    if (tieRoll <= 4) {
       attTotal = 0;
       alert("You sucessfuly block the attack!");
       console.log("You take " + attTotal + " damage!");
    }
    else if (tieRoll > 4) {
      attTotal = tieRoll - 4;
      alert("Your block was ineffective! you take " + attTotal + " damage!");
      console.log("You take " + attTotal + " damage!")
    }
  }
  return attTotal;
}
function bossCompAtt() {                              //attack total for the boss's attack phase
  var compAttRoll = bossCompAttMod();
  var userDeffRoll = userDeffMod();
  var attTotal;
  if (compAttRoll > userDeffRoll) {
     attTotal = compAttRoll - userDeffRoll;
     alert("Your block was ineffective! you take " + attTotal + " damage!");
     console.log("You take " + attTotal + " damage!");
  }
  else if (compAttRoll < userDeffRoll) {
     attTotal = 0;
     alert("You sucessfuly block the attack!");
     console.log("You take " + attTotal + " damage!");
  }
  else if (compAttRoll = userDeffRoll) {
    var tieRoll = roll("d8");
    if (tieRoll <= 4) {
       attTotal = 0;
       alert("You sucessfuly block the attack!");
       console.log("You take " + attTotal + " damage!");
    }
    else if (tieRoll > 4) {
      attTotal = tieRoll - 4;
      alert("Your block was ineffective! you take " + attTotal + " damage!");
      console.log("You take " + attTotal + " damage!");
    }
  }
  return attTotal;
}
//-------------------------------------------------Mod Function------------------------------------------------------//

function userAttMod() {
  var userChoice = prompt("Time to Attack! Pick either:\n" +
                          "         Super Punch= sp\n" +
                          "         Flaming Kick= fk\n" +
                          "         Thundering Chop= tc\n" +
                          "         Barbaric Throw= bt\n", "'sp','fk','tc','bt' or 'im done'");
  if (userChoice === "sp") {
    var totalDamage = roll("d12") + (4 * roll("d4"));
    alert("You threw a Speed Punch for " + totalDamage + "!");
    return totalDamage;
  }
  else if (userChoice === "fk") {
    var totalDamage = roll("d12") + (3 * roll("d6"));
    alert("you threw a Flaming Kick for " + totalDamage + "!");
    return totalDamage;
  }
  else if (userChoice === "tc") {
    var totalDamage = roll("d20") + (1 * roll("d12"));
    alert("You threw a Thunder Chop for " + totalDamage + "!");
    return totalDamage;
  }
  else if (userChoice === "bt") {
    var totalDamage = roll("d20") + (2 * roll("d6"));
    alert("You exicuted a Barbaric Throw for " + totalDamage + "!");
    return totalDamage;
  }
  else if (userChoice === "im done") {
    var quit = quitOut();
    return quit;
  }
  else {
    alert ("Oh no! you need to type 'sp','fk' or 'im done'!");
    return userAttMod();
  }
}
function compAttMod() {
  var compChoice =  Math.floor(Math.random() * 3) +1;

  if (compChoice == '1') {
    var totalDamage = roll("d12") + (3 * roll("d4"));
    alert("He threw a Speed Punch for " + totalDamage + "!");
    return totalDamage;
  }
  else if (compChoice == '2') {
    var totalDamage = roll("d12") + (2 * roll("d6"));
    alert("He threw a Flaming Kick for " + totalDamage + "!");
    return totalDamage;
  }
  else if (compChoice == '3') {
    var totalDamage = roll("d8") + (2 * roll("d10"));
    alert("He threw a Thunder Chop for " + totalDamage + "!");
    return totalDamage;
  }
}
function bossCompAttMod() {
  var compChoice =  Math.floor(Math.random() * 4) +1;

  if (compChoice == '1') {
    var totalDamage = roll("d12") + (3 * roll("d4"));
    alert("He threw a Speed Punch for " + totalDamage + "!");
    return totalDamage;
  }
  else if (compChoice == '2') {
    var totalDamage = roll("d12") + (2 * roll("d6"));
    alert("He threw a Flaming Kick for " + totalDamage + "!");
    return totalDamage;
  }
  else if (compChoice == '3') {
    var totalDamage = roll("d20") + (1 * roll("d10"));
    alert("He threw a Thunder Chop for " + totalDamage + "!");
    return totalDamage;
  }
  else if (compChoice == '4') {
    var totalDamage = roll("d20") + (2 * roll("d6"));
    alert("He exicuted a Barbaric Throw for " + totalDamage + "!");
    return totalDamage;
  }
}
function userDeffMod() {
  var userChoice = prompt("pick either High Block or Low Guard to add to your defence strength", "'hb','lg' or 'im done'");
  if (userChoice === "hb") {
    var totalDeff = roll("d12") + (4 * roll("d4"));
    return totalDeff;
  }
  else if (userChoice === "lg") {
    var totalDeff = roll("d20") + (2 * roll("d6"));
    return totalDeff;
  }
  else if (userChoice === "im done") {
    var quit = quitOut();
    return quit;
  }
  else {
    alert ("Oh no! you need to type 'hb' or 'lg' or 'im done'!");
    return userDeffMod();
  }
}
function compDeffMod() {
  var compChoice = Math.floor(Math.random() * 2) +1;
  if (compChoice == '1') {
    var totalDeff = roll("d10") + (4 * roll("d4"));
    return totalDeff;
  }
  else if (compChoice == '2') {
    var totalDeff = roll("d12") + (3 * roll("d6"));
    return totalDeff;
  }
}

//----------------------------------------------End Round Function----------------------------------------------------//

function end(currentUserHp,currentcompHp) {
  userHp = currentUserHp;
  compHp = currentcompHp;
  if (userHp <= 0) {
    var restart = prompt("Your Opponent overtakes you! you lose and black out! Play again?", "'y' or 'n'");
    if (restart === "y") {
      return attRound();
    }
    else if (restart === "n") {
      alert ("GAME OVER! Thanks for playing!");
    }
    else {
      alert ("Oh no! you need to type 'y' or 'n'!");
      return end();
    }
  }
  else if (compHp <= 0) {
    var response = prompt("You have beaten your opponent! Are you ready to move on to your next one, or can you handle the Grand Master!?", "'y','n' or 'gm'");
    if (response === "y") {
      alert("Your next challenger appears!");
      return attRound();
    }
    else if (response === "n") {
      alert ("GAME OVER! Thanks for playing!");
    }
    else if (response === "gm") {
      alert("The Grand Master Approaches...")
      alert("He is much more powerful than the other's you've ever faced...");
      alert("The FINAL BATTLE commences!");
      bossAttRound();
    }
    else {
      alert ("Oh no! you need to type 'y','n', or 'gm'!");
      return end();
    }
  }
}

//---------------------------------------------End Game Function---------------------------------------------------//

function finalEnd(currentUserHp,currentcompHp) {
  userHp = currentUserHp;
  compHp = currentcompHp;
  if (userHp <= 0) {
    var restart = prompt("The Grand Master overtakes you! you lose and black out! Play again?", "'y' or 'n'");
    if (restart === "y") {
      attRound();
    }
    else if (restart === "n") {
      alert ("GAME OVER! Thanks for playing!");
    }
    else {
      alert ("Oh no! you need to type 'y' or 'n'!");
      return finalEnd();
    }
  }
  else if (compHp <= 0) {
    var endGame = prompt("You have beaten the Grand Master and become the Tournament Champion! You have won Karate Tournament 2017! will you continue your reign of glory and vie for next years Championship?" , "'y' or 'n'");
    if (endGame === "y") {
      alert("You arrive the next year at the torunament. All eyes are on you this year as you defend your title!");
      attRound();
    }
    else if (endGame === "n") {
      alert ("You have solidified yourself into Karate history and will be remebered for your acheavements. Well done fighter!!");
    }
    else {
      alert ("Oh no! you need to type 'y','n', or 'gm'!");
      return finalEnd();
    }
  }
}
function quitOut() {
  var quit = alert("Thanks for playin!");
  return quit;
}
//---------------------------------------------Start Game Function---------------------------------------------------//

function startGame() {
  var start = prompt("Welcome to Karate Tournament 2017! Are you ready to play Karate Tournament 2017?","'y' or 'n'")
  if (start === "y") {
    alert("A challenger appears!");
    attRound();
  }
  else if (start === "n") {
    alert ("Come back when you are ready, Champion. Until then, train hard!");
  }
  else {
    alert ("Oh no! you need to type 'y' or 'n'!");
    return startGame();
  }
}
