var boxNum = undefined;
var Boxes = [];
var ClickedBoxes = [];
var KeyNum = 0;
var Score = 0;
var Highscore = 0;
var CanClick = false;
var hard = false
var ALERT = true
var GridSize = 1
LightUp("Bttn1", "SelectChose")
generate(1)

for(let i = 1; i <= 3; i ++){
document.getElementById("Bttn" + i).addEventListener("click", () => {selector("Bttn" + i, i)})
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

function selector(id, num){
    if(CanClick == true) return
    GridSize = num
    for(let i = 1; i <= 3; i ++){
        LightUp("Bttn" + i, "Select")
    }
    LightUp(id, "SelectChose")
}

function generate(preset) {
  let L = 2 + preset;
  const wrapperELM = document.getElementById('wrapper');
  wrapperELM.innerHTML = ""
  let parentELM = undefined;
  for (let i = 1; i <= (2 + preset) ** 2; i += 1) {
    if (L == 2 + preset) {
      parentELM = document.createElement('div');
      wrapperELM.appendChild(parentELM);
      L = 0;
    }
    const childELM = document.createElement('div');
    childELM.classList.add('box');
    2 + preset == 4 ? childELM.classList.add('box4') : undefined;
    2 + preset == 5 ? childELM.classList.add('box5') : undefined;
    childELM.id = i;
    parentELM.appendChild(childELM);
    L += 1;
  }
  for (let i = 1; i <= (2 + preset) ** 2; i += 1) {
    document.getElementById(String(i)).addEventListener('click', () => {
      CHECK(i);
    });
  }
}

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
      for (let i = 1; i <= (2 + GridSize) ** 2; i += 1) {
        LightUp(i, 'green');
        CanClick = false;
        setTimeout(() => {
          LightUp(i, 'gray');
        }, 300);
      }
      setTimeout(play, 810);
    } else
      setTimeout(() => {
        LightUp(ID, 'gray');
      }, 135);
  }
}

function chose() {
  return (boxNum = Math.floor(Math.random() * (2 + GridSize) ** 2) + 1);
}

function LightUp(ID, color) {
  if (color == 'blue') {
    document.getElementById(ID).style.backgroundColor = "blue";
  } else if (color == 'gray') {
    document.getElementById(ID).style.backgroundColor = "gray";
  } else if (color == 'red') {
    document.getElementById(ID).style.backgroundColor = "red";
  } else if (color == 'green') {
    document.getElementById(ID).style.backgroundColor = "goldenrod";
  }else if (color == 'BttnRed') {
    document.getElementById(ID).style.color = "white"
    document.getElementById(ID).style.backgroundColor = "red"
  }else if (color == 'BttnGray'){
    document.getElementById(ID).style.color = "black"
    document.getElementById(ID).style.backgroundColor = ""
  }else if(color == "SelectChose"){
    document.getElementById(ID).style.color = "white"
    document.getElementById(ID).style.backgroundColor = "black"
  }else if(color == "Select"){
    document.getElementById(ID).style.color = "black"
    document.getElementById(ID).style.backgroundColor = ""
  }
}

function play(update) {
  document.getElementById('start').style.visibility = 'hidden';
  document.getElementById('HardBttn').style.visibility = 'hidden';
  update == true ? generate(GridSize) : undefined;
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
  for (let i = 1; i <= (2 + GridSize) ** 2; i += 1) {
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
