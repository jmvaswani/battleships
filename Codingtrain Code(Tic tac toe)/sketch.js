// Tic Tac Toe AI with Minimax Algorithm
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/154-tic-tac-toe-minimax.html
// https://youtu.be/I64-UTORVfU
// https://editor.p5js.org/codingtrain/sketches/0zyUhZdJD

//0 black
//1 ship placed
//2 fire (miss)
//3 fire (hit)
//4 fire (Destroyed)

var playerBoard=[
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
var computerBoard=[
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
//************* Boat data
var boats=["patrolboat","battleship","submarine","aircraft carrier","Motherboat"];
var boatsPlaced=[false,false,false,false,false];
var playerBoatsPositions=[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
var computerBoatsPositions=[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];    //i,j,(0 for vertical,1 for horizontal)
const boatLenghts=[2,3,3,4,5];
var playerBoatsAlive=[true,true,true,true,true];
var computerBoatsAlive=[true,true,true,true,true];
var computerBoatsPoints=[];
var flag = [0,0,0,0,0];
//*************
let boatDirection=0;

let rotateButtonActivated=false;
let resetButtonActivated=false;
let startButtonActivated=false;
var boatSelected=-1;//[false,false,false,false,false];
let board = [  //yeh konsa board hai..?
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
var navin;
var malay;

function setup() {
  createCanvas(1000, 800);
  boardWidth=width*0.45;
  boardHeight=height*0.567;
  w = boardWidth / 10;
  h = boardHeight / 10;
  placeComputerBoats();

  // for(let a=0; a<10; a++)
  // {
  //   for(let b=0; b<10; b++)
  //   {
  //     navin = Math.floor(Math.random() * 10);
  //     malay = Math.floor(Math.random() * 10);
  //     playerFire(navin,malay, 'h');
  //     console.log(navin,malay);
  //   }
  // }

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

function getButtonClickedOn(x,y)
{
   if(x>=398&&x<=545)
  {
    if(y>525&&y<545)
    {
      if(x>398&&x<440)
      {
        return 1;  //1 for rotate
      }
      else if(x>478&&x<520)
      {
        return 2;  //2 for rotate
      }
      else if(x>548&&x<590)
      {
        return 3;  //3 for rotate
      }
    }
  }
  return -1;
}

function handleButtons(a)
{
  if(a==1&&rotateButtonActivated)
  {
    boatDirection=boatDirection==0?1:0;
  }
  else if(a==2&&resetButtonActivated)
  {

    for (let i =0;i<5;i++)
    {
      boatsPlaced[i]=false;
    }
    boatSelected=-1;
    for(let i=0;i<10;i++)
    {
      for(let j=0;j<10;j++)
      {
        playerBoard[i][j]=0;
      }
    }
  }
  else if(a==3&&startButtonActivated)
  {
    //Start code
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
    if(j>=0 && j<10)
    {
      if(boatSelected!=-1)
      {
        if(boatDirection==0)
        {
        if(i<=10-boatLenghts[boatSelected])
        {
          let f=0;
          for(let k=0;k<boatLenghts[boatSelected];k++)
          {
            if(playerBoard[i+k][j]==1)
            {
              f=1;
            }
          }
          if(f==1)
            alert("Boat overlap");
          else
          {
            for(let k=0;k<boatLenghts[boatSelected];k++)
            {
              playerBoard[i+k][j]=1;
            }
            playerBoatsPositions[boatSelected]=[i,j,boatDirection];
            boatsPlaced[boatSelected]=true;
            boatSelected=-1;
          }
        }
        else{
          alert("Invalid placement");
        }
      }
      else
      {
        if(j<=10-boatLenghts[boatSelected])
        {
          let f=0;
          for(let k=0;k<boatLenghts[boatSelected];k++)
          {
            if(playerBoard[i][j+k]==1)
            {
              f=1;
            }
          }
          if(f==1)
            alert("Boat overlap");
          else
          {
          for(let k=0;k<boatLenghts[boatSelected];k++)
          {
            playerBoard[i][j+k]=1;
          }
          playerBoatsPositions[boatSelected]=[i,j,boatDirection];
          boatsPlaced[boatSelected]=true;
          boatSelected=-1;
          }
        }
        else{
          alert("Invalid placement");
        }
      }
      }
    }
    /*if((j>=0 && j<10)||(j>11 && j<21))
    {
      playerBoard[i][j]=playerBoard[i][j]==0?1:0;
    }*/
  }
  else if(getBoatClickedOn(mouseX,mouseY)!=-1)
  {
    let a=getBoatClickedOn(mouseX,mouseY);
    if(a!=-1)
    {
      if(boatsPlaced[a]==false)
        boatSelected=a;
    }
  }
  else
  {
    let a=getButtonClickedOn(mouseX,mouseY);
    if(a!=-1)
    {
      handleButtons(a);
    }
  }
  //alert(boatSelected);
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
/*function getBoatSelected(){
  for(let i=0;i<5;i++)
  if(boats)
}*/
function draw() {
  let tH=10;
  let tW=10;
  background(0);
  stroke(255);
  strokeWeight(4);
//************************************************Drawing boards and labels
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
      if(boatSelected==i)
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
//************************************************* Drawing 3 Buttons
  if(boatSelected!=-1)
  {
    rotateButtonActivated=true;
    fill(230, 230, 0);
    line(398,525,440,525);
    text('Rotate', 400, 540);
    line(398,545,440,545);
    fill(255);
  }
  else
    rotateButtonActivated=false;
  let boatsPlacedCount=0;
  for(let i=0;i<5;i++)
  {
    if(boatsPlaced[i]==true)
      boatsPlacedCount++;
  }

  if(boatsPlacedCount>0)
  {
    resetButtonActivated=true;
    fill(255, 51, 51);
    line(478,525,520,525);
    text('Reset', 480, 540);
    line(478,545,520,545)
    fill(255);
  }
  else
    resetButtonActivated=false

  if(boatsPlacedCount==5)
  {
    startButtonActivated=true;
    fill(102, 255, 102);
    line(548,525,590,525);
    text('Start', 550, 540);
    line(548,545,590,545)
    fill(255);
  }
  else
    startButtonActivated=false;

//***************************************************Drawing selected boxes if any
    for (let i=0;i<10;i++)
  {
    for (let j=0;j<10;j++)
    {
      if(playerBoard[i][j]==1)
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
    if(computerBoard[i][j]==1)
    {
      //translate(10+(j*w),10+(i*w));
      fill(color(50, 101, 201));
      rect( (j*w)+505,(i*h)+13, 40,40);
      translate(0,0);
    }else if(computerBoard[i][j]==3){
      fill(color(0, 128, 0));
      rect( (j*w)+505,(i*h)+13, 40,40);
      translate(0,0);
    }else if(computerBoard[i][j]==4){
      fill(color(255, 0, 0));
      rect( (j*w)+505,(i*h)+13, 40,40);
      translate(0,0);
    }
  }
  }

  //*********************************** Drawing selected ship on board for placement
  if(boatSelected!=-1)
  {
    var j = floor((mouseX-10) / w);
    var i = floor((mouseY-10) / h);
    if (i<10 && i>=0)
    {
      if(j>=0 && j<10)
      {
          if(boatDirection==0)
          {
            fill(color(204, 102, 0));
            for(let k=0;k<boatLenghts[boatSelected];k++)
            {
              rect( (j*w)+13,((i+k)*h)+13, 40,40);
            }
          }
          else if(boatDirection==1)
          {
            fill(color(204, 102, 0));
            for(let k=0;k<boatLenghts[boatSelected];k++)
            {
              rect( ((j+k)*w)+13,((i)*h)+13, 40,40);
            }
          }
      }
    }
  }
//***************************************************** Instructions
fill(255);
textSize(20);
text("Instructions",450,600);
text("1)Select a ship",435,630);
text("2)Place on board(with/without rotate)",435,660);
text("3)Place all ships",435,690);
text("4)Click on start and play!",435,720);
textSize(12);
    /*if (
      mouseX > bx - boxSize &&
      mouseX < bx + boxSize &&
      mouseY > by - boxSize &&
      mouseY < by + boxSize
    ) {
      overBox = true;
      if (!locked) {
        stroke(255);
        fill(244, 122, 158);
      }
    } else {
      stroke(156, 39, 176);
      fill(244, 122, 158);
      overBox = false;
    }*/
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
//###########################################AI logic and functions
function playerFire(i,j,player)      // 0<= I and J <=9    (Function scans computerBoard and makes the following changes )
{
  var k;
  var l;
    // After firing, if miss, make computerboard[i][j]=2, if hit but not destroyed, make =3 and if hit and destroyed, make all positions of that boat as =4, as well as change status in computerBoatsAlive
    // You can use computerBoard to find positions of ships, and to find if all positions on ship destoyed you can use computerBoatsPositions [i,j,direction]
    if(player == 'h')
    {
      if(computerBoard[i][j] == 0)
      {
        computerBoard[i][j] = 2;
      }else if(computerBoard[i][j] == 1){
        computerBoard[i][j] = 3;
        for(k = 0; k< computerBoatsPoints.length; k++){
          // console.log("HEllo");
          if(i == computerBoatsPoints[k][1] && j == computerBoatsPoints[k][2]){
            // console.log("HEllo");
            switch(computerBoatsPoints[k][0]){
              case "patrolboat":
                flag[0]++;
                if(flag[0] == 2){
                  for(l=0; l<2;l++){
                    computerBoard[computerBoatsPoints[l][1]][computerBoatsPoints[l][2]] = 4;
                  }
                }
                break;
              case "battleship":
                flag[1]++;
                if(flag[1] == 3){
                  for(l=2; l<5;l++){
                    computerBoard[computerBoatsPoints[l][1]][computerBoatsPoints[l][2]] = 4;
                  }
                }
                break;
              case "submarine":
                flag[2]++;
                if(flag[2] == 3){
                  for(let l=5; l<8;l++){
                    computerBoard[computerBoatsPoints[l][1]][computerBoatsPoints[l][2]] = 4;
                  }
                }
                break;
              case "aircraft carrier":
                flag[3]++;
                if(flag[3] == 4){
                  for(let l=8; l<12;l++){
                    computerBoard[computerBoatsPoints[l][1]][computerBoatsPoints[l][2]] = 4;
                  }
                }
                console.log("hello");
                break;
              case "Motherboat":
                flag[4]++;
                if(flag[4] == 5){
                  for(let l=12; l<17;l++){
                    computerBoard[computerBoatsPoints[l][1]][computerBoatsPoints[l][2]] = 4;
                  }
                }
                break;
            }
          }
        }
      }
    }else{

    }
  }

function opposite(direction)
{
  if(direction == "up")
    return("down");
  else if(direction == "down")
    return("up");
  else if(direction == "right")
    return("left");
  else if(direction == "left")
    return("right");
}

function remove(row,column)
{
  colIndex = availableMoves[row].indexOf(column);
  if (colIndex!=-1)
    availableMoves[row].splice(column, 1);
  else
    console.log("Some error Occured for "+row,colIndex); 

}

function computerTurn()      
{
  /*
  Function returns [i,j] to indicate where to hit
  Decided based on
  1)adjacent squares of already hit tiles(hit tiles do not count if ship destroyed)
  2)Random generated intelligent [i,j] such that it neglects  impossible places(single tiles)
  */

  if(bufferMoves.length > 0) //play move in bufferMoves ;  check if hit/miss ; if hit => add (move+direction) & (oppositeMove+direction) to probableMoves ; clear buffer
  {
    tuple = bufferMoves.shift();
    row = tuple[0];
    column = tuple[1];
    direction = tuple[2]; //string "up","down","right","left"

    //fire current block
    fire(row,column,"c");

    if(playerBoard[row][column] == 1) // Fire hit
    {
      //add opposite side if possible
      opposite = opposite(direction)
      for(i=0;i<bufferMoves.length;i++)
      {
        if(bufferMoves[i][2] == opposite)
          probableMoves.push(bufferMoves[i]);
      }
      
      //remove the current entry from availableMoves
      remove(row,column);
      
      //clear Buffer
      bufferMoves = [];

    }
    else //fire miss
    {
      //remove entries from availableMoves
      remove(row,column)
    }
  }

  else if(probableMoves.length>0)  //play move from probableMoves ; check hit/miss ; if hit => add move + direction to probableMoves
  {
    tuple = probableMoves.shift();
    row = tuple[0];
    column = tuple[1];
    direction = tuple[2];

    //fire current block
    fire(row,column,"c");
    
    if(playerBoard[row][column] == 1) // Fire hit
    {

      //add the next block of the same direction
      if(direction == "up")
        if(row>0)
          probableMoves.push([row-1,column,"up"]);
      //left
      if(direction == "left")
        if(column>0)
          probableMoves.push([row,column-1,"left"]);
      //down
      if(direction == "down")
        if(row<9)
          probableMoves.push([row+1,column,"down"]);
      //right
      if(direction == "right")
        if(column<9)
          probableMoves.push([row,column+1,"right"]);

      
      //remove the current entry from availableMoves
      remove(row,column);

    }
    else //fire miss
    {
      //remove entries from availableMoves
      remove(row,column)
    }

  }

  else //play random move => check for hit/miss ; if hit=> add moves to buffer with direction
  { 
    column=-1
    do
    {
      rowIndex = Math.floor(Math.random() * 10);
      if(availableMoves[rowIndex].length > 0 )
        columnIndex = Math.floor(Math.random() * availableMoves[row].length);  //only choose a column number  

    }while(columnIndex==-1)

    row = rowIndex;
    column = availableMoves[row][columnIndex];

    //fire current block
    fire(row,column,"c");

    if(playerBoard[row][column] == 1) // Fire hit
    {
      //add the adjacent blocks in bufferMoves
      //up
      if(row>0)
        bufferMoves.push([row-1,column,"up"]);
      //left
      if(column>0)
        bufferMoves.push([row,column-1,"left"]);
      //down
      if(row<9)
        bufferMoves.push([row+1,column,"down"]);
      //right
      if(column<9)
        bufferMoves.push([row,column+1,"right"]);

      
      //remove the current entry from availableMoves
      remove(row,column);

    }
    else //fire miss
    {
      //remove entries from availableMoves
      remove(row,column)
    }
  }
}

function checkWin()
{
  /*
  return 0 if Non conclusive
  return 1 if player win                  // use playerboatsalive and computerboats alive
  return 2 if computer win
  */
}

function placeComputerBoats()
{
  /*
  Select a boat
  Place it on the Computer board(Random position,random direction,Overlap condition,Overflow condition)
  //Make changes in computerBoard, make changes in computerBoatsPositions
  */
 var length;
 var cordinateI;
 var cordinateJ;
 var direction;
 var i;
 var j;
 var k;
 var flag;
 for(i=0; i<5; i++)
 {
   length = boatLenghts[i];
   
   //create a function to place the boat in a specific direction and let it loop
   direction = Math.floor(Math.random() * 2);
   cordinateI = Math.floor(Math.random() * 10);
   cordinateJ = Math.floor(Math.random() * 10);
   if(direction == 0)   //Vertical
   {
     if(cordinateI+length < 10)
     {
       for(j=0; j<length; j++)
       {
         if(computerBoard[cordinateI+j][cordinateJ] != 0)
         {
           flag = 1;
           break;
         }
       }

       if(flag == 0)
       {
         for(j=0; j<length; j++)
         {
           computerBoard[cordinateI+j][cordinateJ] = 1;
           computerBoatsPoints.push([boats[i],cordinateI+j,cordinateJ]);
         }
        computerBoatsPositions[i]=[cordinateI,cordinateJ,direction];
       }
       else
       {
         i--;
       }
    }
    else
    {
      i--;
    }
  }


  else if(direction == 1)
  {
    // console.log(length);
    if(cordinateJ+length < 10)
    {
      for(k=0; k<length; k++)
      {
        if(computerBoard[cordinateI][cordinateJ+k] == 0)
        {
          flag = 0;
        }
        else
        {
          flag = 1;
          break;
        }
      }
      if(flag == 0)
      {
        for(k=0; k<length; k++)
        {
          computerBoard[cordinateI][cordinateJ+k] = 1;
          computerBoatsPoints.push([boats[i],cordinateI,cordinateJ+k]);
        }
        computerBoatsPositions[i]=[cordinateI,cordinateJ,direction];
      }
      else
      {
        i--;
      }
    }
     else
     {
       i--;
     }
   }
  //  console.log(direction);
  //  for(k=0; k<10; k++)
  //  {
  //   direction = Math.floor(Math.random() * 2);
  //   console.log(direction);
  //  }
 }
 console.log(computerBoatsPoints);
//  console.log(computerBoatsPoints[0][1]);
}
