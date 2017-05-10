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

function attRound(userHp=50,compHp=50) {                   //First Round function call. This exists because the
  var userD20 = roll("d20");                               //health counter needs to start at 50, but cannot get
  var compD20 = roll("d20");                               //haulted after the first round. The counter continues
                                                           //deducting hp in the AttRound() funtion thus not resetting.


  if (userD20 > compD20) {
    var attTotal = userAttFirst();
    var compHp = newHp(compHp, attTotal);
    attTotal = compAttSecond();
    var userHp = newHp(userHp, attTotal);
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
function compAttFirst(attTotal) {                         //if the computer attacks first, runs the computer's attack,
  var attTotal = compAtt();                                      //deducts that attack total from the user's Hp.
  return attTotal;
}
function userAttSecond(attTotal) {                         //if the user attacks second, runs the user's attack,
  var attTotal = userAtt();                                      //deducts that attack total from the computer's Hp.
  return attTotal;
}

//-----------------------------------------------Attack Functions----------------------------------------------------//

function userAtt() {                              //attack total for the user's attack phase
  var userAttRoll = roll("d12");
  var compDeffRoll = roll("d10");
  var attTotal;
  if (userAttRoll > compDeffRoll) {
     attTotal = userAttRoll - compDeffRoll;
  }
  else if (userAttRoll < compDeffRoll) {
     attTotal = 0;
  }
  else if (userAttRoll = compDeffRoll) {
    var tieRoll = roll("d8");
    if (tieRoll <= 4) {
       attTotal = 0;
    }
    else if (tieRoll > 4) {
      attTotal = tieRoll - 4;
    }
  }
  return attTotal;
}

function compAtt() {                              //attack total for the computer's attack phase
  var compAttRoll = roll("d12");
  var userDeffRoll = roll("d10");
  var attTotal;
  if (compAttRoll > userDeffRoll) {
     attTotal = compAttRoll - userDeffRoll;
  }
  else if (compAttRoll < userDeffRoll) {
     attTotal = 0;
  }
  else if (compAttRoll = userDeffRoll) {
    var tieRoll = roll("d8");
    if (tieRoll <= 4) {
       attTotal = 0;
    }
    else if (tieRoll > 4) {
      attTotal = tieRoll - 4;
    }
  }
  return attTotal;
}

//----------------------------------------------End Game Function----------------------------------------------------//

function end(currentUserHp,currentcompHp) {
  userHp = currentUserHp;
  compHp = currentcompHp;
  if (userHp <= 0) {
    console.log("you lose!");
  }
  else if (compHp <= 0) {
    console.log("you win!");
  }
}
attRound();
