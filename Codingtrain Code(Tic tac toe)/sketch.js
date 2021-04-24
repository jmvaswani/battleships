// Tic Tac Toe AI with Minimax Algorithm
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/154-tic-tac-toe-minimax.html
// https://youtu.be/I64-UTORVfU
// https://editor.p5js.org/codingtrain/sketches/0zyUhZdJD
var bBoard=[
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];
var boats=["patrolboat","battleship","submarine","aircraft carrier","Motherboat"];
var boatsPlaced=[false,false,false,false,false];
var boatsSelected=[false,false,false,false,false];
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;
let boardWidth;
let boardHeight;
let ai = 'X';
let human = 'O';
let currentPlayer = human;

function setup() {
  createCanvas(1000, 800);
  boardWidth=width*0.45;
  boardHeight=height*0.567;
  w = boardWidth / 10;
  h = boardHeight / 10;
 // alert(w+","+h);
  // alert(w*10+10);
  //bestMove();
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function getBoatClickedOn(x,y)
{
  if(x>90&&x<190)
  {
    for(let i=0;i<5;i++)
    {
      let boatTextHeight=570+(i*25);
      if((y>boatTextHeight-15)&&(y<boatTextHeight+5))
      {
        //alert("HI");
        return i;
      }
    }
  }
  return -1;
}
function mousePressed() {
  var j = floor((mouseX-10) / w);
  var i = floor((mouseY-10) / h);
  if (i<10 && i>=0)
  {
    if((j>=0 && j<10)||(j>11 && j<21))
    {
      bBoard[i][j]=bBoard[i][j]==0?1:0;
    }
  }
  else
  {
    let a=getBoatClickedOn(mouseX,mouseY);
    if(a!=-1)
    {
      boatsSelected[a]=boatsSelected[a]==true?false:true;
    }
  }
  //alert(boatsSelected);
    // if (currentPlayer == human) {
  //   // Human make turn
  //   let i = floor(mouseX / w);
  //   let j = floor(mouseY / h);
  //   // If valid turn
  //   if (board[i][j] == '') {
  //     board[i][j] = human;
  //     currentPlayer = human;
  //     bestMove();
  //   }
  // }
}

function draw() {
  let tH=10;
  let tW=10;
  background(0);
  stroke(255);
  strokeWeight(4);
  for(let i=0;i<=10;i++)
  {
    line(w*i+tW,0+tH,w*i+tW,boardHeight+tH);
    line(0+tW,h*i+tH,boardWidth+tW,h*i+tH);
  }
  tH=10;
  tW=502;
  stroke(100);
  for(let i=0;i<=10;i++)
  {
    line(w*i+tW,0+tH,w*i+tW,boardHeight+tH);
    line(0+tW,h*i+tH,boardWidth+tW,h*i+tH);
  }
  fill(255);
  text('Player board', 160, 520);
  text('Computer board', 700, 520);
  for (let i=0;i<5;i++)
  { 
    if(boatsPlaced[i]==false)
    {
      if(boatsSelected[i]==true)
      {
        fill(25);
        text(boats[i], 100, 570+(i*25));
        fill(255);
        continue;
      }
      let boatTextHeight=570+(i*25);
      line(90,boatTextHeight-15,190,boatTextHeight-15);
      text(boats[i], 100, boatTextHeight);
      line(90,boatTextHeight+5,190,boatTextHeight+5);
    }
  }
  
  for (let i=0;i<10;i++)
  {
  for (let j=0;j<10;j++)
  {
    if(bBoard[i][j]==1)
    {
      //translate(10+(j*w),10+(i*w));
      fill(color(204, 102, 0));
      rect( (j*w)+13,(i*h)+13, 40,40);
      translate(0,0);
    }

  }
  }
  for (let i=0;i<10;i++)
  {
    for (let j=0;j<10;j++)
   {
    if(bBoard[i][j]==1)
    {
      //translate(10+(j*w),10+(i*w));
      fill(color(204, 102, 0));
      rect( (j*w)+505,(i*h)+13, 40,40);
      translate(0,0);
    }

  }
  }
  
  //line(w, 0, w, height);
  //line(w * 2, 0, w * 2, height);
  //line(0, h, width, h);
  //line(0, h * 2, width, h * 2);
  //line(0+tW,0+tH,boardWidth+tW,0+tH);
  // line(0+tW,0+tH,0+tW,boardHeight+tH);
  // line(0,boardHeight+tH,boardWidth,boardHeight+tH);
  // line(boardWidth+tW,boardHeight+tH,boardWidth+tW,0);
  /*for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }*/
/*  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`);
    }
  }*/
}
