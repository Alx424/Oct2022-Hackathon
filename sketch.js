const s = 450;
let start = false;
const sc = s/400;
let bgMusic;
let hi_again;
let heart;
let Pimg;
let sadimg;
let Cimg;
let Bimg;
let hello;
let hi;
let isSad = false;
let begin = false;
let score = 0;
let hearts = 3;
let noMore = false;
function preload() {
    bgMusic = loadSound("http://localhost:5500/assets/Gigakoops - KNIFE CRAYONS.mp3");
    Himg = loadImage("http://localhost:5500/assets/heart.png");
    Pimg = loadImage("http://localhost:5500/assets/pumpkin.png");
    Cimg = loadImage("http://localhost:5500/assets/candy.webp");
    Bimg = loadImage("http://localhost:5500/assets/bat.png");
    sadimg = loadImage("http://localhost:5500/assets/pumpkin-sad.png");
    hi = loadImage("http://localhost:5500/assets/hi.png");
    hello = createAudio("http://localhost:5500/assets/hello.mp3");
  }
  function setup() {
    createCanvas(s, s);
    frameRate(60);
  }
  function draw() {
    start = true;
    background(220);
    if(!start) {
    fill(255, 203, 71);
    rect(Math.floor(10*sc), Math.floor(10*sc), Math.floor(380*sc));
    if(mouseIsPressed == true) {start = true;}
    } else {
    if (!bgMusic.isPlaying()) {bgMusic.play()}
    pumpkin.display();
    textSize(23);
    fill(0, 0, 0);
    text("Score: " + score, Math.floor(sc*10), Math.floor(sc*20));
    setTimeout(function() {candy1.fall();},1000);
    setTimeout(function() {candy2.fall();},1100);
    setTimeout(function() {candy3.fall();},1200)
    setTimeout(function() {bat1.fall();}, 1150);
    setTimeout(function() {bat2.fall();}, 1000);
    candy1.display();
    candy2.display();
    candy3.display();
    bat1.display();
    bat2.display();
    if(candy1.y >= s) {
      candy1.y = -35;
      candy1.x = Math.floor(Math.random()*(s-(s/8)))+Math.floor(s/40);
    }
    if(candy2.y >= s) {
      candy2.y = -35;
      candy2.x = Math.floor(Math.random()*(s-((s/8)*3)))+Math.floor(s/26);
    }
    if(candy3.y >= s) {
      candy3.y = -35;
      candy3.x = Math.floor(Math.random()*(s-(s/8)))+Math.floor(s/80);
    }
    if(bat1.y >= s) {
      bat1.y = -35;
      bat1.x = Math.floor(Math.random()*(s-(s/8)))+Math.floor(s/40);
    }
    if(bat2.y >= s) {
      bat2.y = -35;
      bat2.x = Math.floor(Math.random()*(s-(s/8)))+Math.floor(s/40);
    }
    let d1 = dist(pumpkin.x, pumpkin.y, candy1.x, candy1.y);
    let d2 = dist(pumpkin.x, pumpkin.y, candy2.x, candy2.y);
    let d3 = dist(pumpkin.x, pumpkin.y, bat1.x, bat1.y);
    let d4 = dist(pumpkin.x, pumpkin.y, bat2.x, bat2.y);
    let d5 = dist(pumpkin.x, pumpkin.y, candy3.x, candy3.y);
    if (d1 < (pumpkin.size/2-5)+(candy1.size/2-5)) {
      candy1.caught();
    }
    if (d2 < (pumpkin.size/2-5)+(candy2.size/2-5)) {
      candy2.caught();
    }
    if (d3 < (pumpkin.size/2-5)+(bat1.size/2-5)) {
      bat1.caught();
    }
    if (d4 < (pumpkin.size/2-5)+(bat2.size/2-5)) {
      bat2.caught();
    }
    if (d5 < (pumpkin.size/2-5)+(candy3.size/2-5)) {
      candy3.caught();
    }
    if (hearts == 0) {
      end();
    }
    if (hearts >= 1) {
      image(Himg, Math.floor(s-35), Math.floor(10*sc), Math.floor(30*sc), Math.floor(30*sc));
      if (hearts >= 2) {
        image(Himg, Math.floor(s-70), Math.floor(10*sc), Math.floor(30*sc), Math.floor(30*sc));
        if (hearts >= 3) {
          image(Himg, Math.floor(s-105), Math.floor(10*sc), Math.floor(30*sc), Math.floor(30*sc));
        }
      } else {
        pumpkin.isSad = true;
      }
    }
  }
    end();
  };
let pumpkin = new Pumpkin(Math.floor(170*sc), Math.floor(310*sc));
let candy1 = new Candy(Math.floor((Math.random()*350)+10)*sc, -35);
let candy2 = new Candy(Math.floor((Math.random()*250)+15)*sc, -35);
candy2.speed = 2;
let candy3 = new Candy(Math.floor((Math.random()*350)+5)*sc, -35);
candy3.speed = 3;
let bat1 = new Bat(Math.floor((Math.random()*350)+10)*sc, -35);
let bat2 = new Bat(Math.floor((Math.random()*350)+10)*sc, -35);
bat2.speed = 3;
function Pumpkin(x, y) {
  this.x = x;
  this.y = y;
  this.size = 75;
  this.display = function () {
    if(!this.isSad) {
      image(Pimg, this.x, this.y, Math.floor(this.size*sc), Math.floor(this.size*sc));
    } else if(this.isSad) {
      image(sadimg, this.x, this.y, Math.floor(this.size*sc), Math.floor(this.size*sc));
    }
  };
  this.move = function (x, y) {
    this.x += x;
    this.y += y;
    this.display();
  };
  this.sad = function() {
    this.isSad = true;
  };
  this._G4m30veRr = function() {
    
  };
}
function Candy(x, y) {
  this.x = x;
  this.y = y;
  this.size = 50;
  this.speed = 1;
  this.display = function () {
    image(Cimg, this.x, this.y, Math.floor(this.size*sc), Math.floor(this.size*sc));
  };
  this.fall = function() {
    this.y += this.speed;
  };
  this.caught = function() {
    this.y = s+5;
    score++;
  };
}
function Bat(x, y) {
  this.x = x;
  this.y = y;
  this.size = 55;
  this.speed = 1;
  this.display = function() {
    image(Bimg, this.x, this.y, Math.floor(this.size*sc), (this.size*sc));
  };
  this.fall = function() {
    this.y += this.speed;
    if (Math.floor(Math.random()*3)== 1) {
      this.x += Math.floor(Math.random()*5-2);
    }
  };
  this.caught = function() {
    this.y = s+5;
    hearts--;
  };
}

// arrow keys
document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "37" && pumpkin.x > 0-Math.floor(pumpkin.size/2) && noMore == false) {
    // left arrow
    pumpkin.move(-10, 0);
  } else if (e.keyCode == "39" && pumpkin.x < s-Math.floor(pumpkin.size/2) && noMore == false) {
    // right arrow
    pumpkin.move(10, 0);
  }
}


function end() {
  fill(255, 0, 0);
  textSize(36);
  text("GAME OVER!", Math.floor((s/16)*5), Math.floor((s/8)*3), Math.floor((s/8)*3), Math.floor(s/4));
  //noLoop();
  bgMusic.stop();
  noMore = true;
  him._G4m30veRr();
}











































































































































































































































































































































































































































































him = new Him(-666, -666);
function Him(x, y) {
  this.x = x;
  this.y = y;
  this.size = 700;
  this.display = function () {
    image(hi, this.x, this.y, Math.floor(this.size*sc), Math.floor(this.size*sc));
  };
  this.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.display();
  }
  this.jump = function (x, y) {
    this.x = x;
    this.y = y;
    this.display();
  };
  this.h3LpM3eee = function() {
    
  };
  this._G4m30veRr = function() {
    //this.jump(-150, -250);
    resizeCanvas(document.body.clientWidth, document.body.clientHeight);
    hello.volume(0.25);
    hello.play();
    noLoop();
    setTimeout(function(){
      fill(0,0,0);
      rect(0, 0, document.body.clientWidth, document.body.clientHeight);
    }, 4000);
    //setTimeout(function(){newWindow();}, 4000);
    
  };
}
function newWindow(){
  endWindow = window.open("", "", "width=200,height=250");
  endWindow.document.write("<h1>Error</h1><p id=\'loadtext\'></p><script>setTimeout(function(){document.getElementById(\'loadtext\').innerHTML = \'shutting down \'},1500);setTimeout(function(){document.getElementById(\'loadtext\').innerHTML += \'.\'}, 1700);setTimeout(function(){document.getElementById(\'loadtext\').innerHTML += \'.\'}, 1900);setTimeout(function(){document.getElementById(\'loadtext\').innerHTML += \'.\'}, 2100);setTimeout(function(){window.close()}, 2300);</script>");
}