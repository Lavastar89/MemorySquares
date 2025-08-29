var boxNum = undefined;
var Boxes = [];
var ClickedBoxes = [];
var KeyNum = 0;
var Score = 0;
var Highscore = 0;
var CanClick = false;
var hard = false
var ALERT = true

for (let i = 1; i <= 9; i += 1) {
  document.getElementById(String(i)).addEventListener('click', () => {
    CHECK(i);
  });
}
document.getElementById("HardBttn").addEventListener('click', () => {
  hard == false ? hard = true:hard = false
  if(ALERT == true){
    alert("You have just enabled hard mode, the pattern now does not repeat, and only shows you the additional square. Feel free to toggle hard mode in between games.")
    hard = true
    ALERT = false
  }
  HardTggl()
})

function CHECK(P) {
  if (CanClick == false) return;
  click(P);
}

function HardTggl(){
if(hard == false){
  console.log("Not hard")
  LightUp('HardBttn', 'BttnGray')
}else{
  console.log("Hard mode")
  LightUp('HardBttn', 'BttnRed')
}
}

function click(ID) {
  if (ID !== Boxes[KeyNum]) {
    RESET();
  } else if (ID == Boxes[KeyNum]) {
    LightUp(ID, 'green');
    ClickedBoxes.push(ID);
    KeyNum += 1;
    if (ClickedBoxes.length == Boxes.length) {
      ClickedBoxes = [];
      Score += 1;
      ScoreKeeping(1);
      KeyNum = 0;
      for (let i = 1; i <= 9; i += 1) {
        LightUp(i, 'green');
        CanClick = false;
        setTimeout(() => {
          LightUp(i, 'gray');
        }, 300);
      }
      setTimeout(() => {
        CanClick = true;
      }, 301);
      setTimeout(play, 810);
    } else
      setTimeout(() => {
        LightUp(ID, 'gray');
      }, 135);
  }
}

function chose() {
  return (boxNum = Math.floor(Math.random() * 9) + 1);
}

function LightUp(ID, color) {
  if (color == 'blue') {
    document.getElementById(ID).className = 'boxBlue';
  } else if (color == 'gray') {
    document.getElementById(ID).className = 'box';
  } else if (color == 'darkgray') {
    document.getElementById(ID).className = 'boxDarkgray';
  } else if (color == 'red') {
    document.getElementById(ID).className = 'boxRed';
  } else if (color == 'green') {
    document.getElementById(ID).className = 'boxGreen';
  }else if (color == 'BttnRed') {
    document.getElementById(ID).style.color = "white"
    document.getElementById(ID).style.backgroundColor = "red"
  }else if (color == 'BttnGray'){
    document.getElementById(ID).style.color = "black"
    document.getElementById(ID).style.backgroundColor = ""
  }
}

function play() {
  document.getElementById('start').style.visibility = 'hidden';
  document.getElementById('HardBttn').style.visibility = 'hidden';
  var W = undefined;
  CanClick = false;
  Boxes.push(chose());
  if (Boxes.length > 0) {
  if(hard == true){
    CanClick = false
    LightUp(Boxes[(Boxes.length) - 1], "blue")
    setTimeout(() => {LightUp(Boxes[(Boxes.length) - 1], "gray")
      CanClick = true
    }, 250)
  }else{
    for (let i = 0; i < Boxes.length; i++) {
    setTimeout(() => {
      LightUp(Boxes[i], 'blue');
    }, (i + 0.5) * 500);

    setTimeout(() => {
      LightUp(Boxes[i], 'gray');
    }, (i + 0.5) * 500 + 250);

    W = (i + 0.5) * 500 + 250;
    }
    setTimeout(() => {
      CanClick = true;
    }, W);
  }
  }
}

function RESET() {
  boxNum = undefined;
  Boxes = [];
  ClickedBoxes = [];
  KeyNum = 0;
  CanClick = false;
  if (Score > Highscore) {
    ScoreKeeping(2);
  }
  Score = 0;
  ScoreKeeping(1);
  for (let i = 1; i <= 9; i += 1) {
    LightUp(i, 'red');
    setTimeout(() => {
      LightUp(i, 'gray');
    }, 600);
  }
  setTimeout(() => {
    document.getElementById('start').style.visibility = 'visible';
    document.getElementById('HardBttn').style.visibility = 'visible';
  }, 601);
}

function ScoreKeeping(action) {
  if (action == 1) {
    document.getElementById('SCORE').innerHTML = 'Score: ' + Score;
  } else if (action == 2) {
    Highscore = Score;
    document.getElementById('HIGHSCORE').innerHTML = 'Highscore: ' + Highscore;
  }
}
