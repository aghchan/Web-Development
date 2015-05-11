
// make a new biker object
biker = new Biker();
ducker = new Duck();
var quackNoise = new Audio("shortquack.mp3");
var counter = 0;
var check = "false";
check = true;
function quack() {
    quackNoise.play();
}
// creator function for biker object
// need to build object with a creator function if you
// want to have private methods and properties
function Biker() { 
   // get SVG objects, save as private arrays
   var circles = document.getElementsByClassName("wheel");
   var lines = document.getElementsByClassName("biker");
   this.height = 0;  // remember how high the biker is
   this.stepSize = -1;  // remember if you are going up or down



   // private method 
   function moveY(shape, att, jump) {
	y = shape.getAttribute(att);
	y = Number(y) + jump; 
	shape.setAttribute(att, y);
	};

   // a public method to jump up or down
   // positive values move down, negative move up
   this.vertical = function (jump) {
	for (i=0; i< circles.length; i++) {
		// private method, don't say "this"
		moveY( circles[i],"cy",jump);
	}
   	for (i=0; i<lines.length; i++) {
		moveY( lines[i], "y1", jump);
		moveY( lines[i], "y2", jump);
	}
	this.height = this.height+jump;
   }
}

// called when "jump!" button is pushed
function moveBiker(i) {
	check = true;
	biker.stepSize = i;
	// use the move method of the global biker object
	
	if(biker.height <= 0 && biker.height >= -100){
		biker.stepSize = -1;
		biker.vertical(-(10*i));
	}

}

// called every 30ms
var singleFrame = function () {
	var bik = document.getElementById("bod");
	var duc = document.getElementById("duck");
	document.getElementById("dumb").innerHTML = counter;

	if((biker.height <= 0) && (duc.getAttribute("x") != (bik.getAttribute("x1")))){
		if(duc.getAttribute("x") == bik.getAttribute("x1")){
					document.getElementById("dumb").innerHTML = "1";
		}
		biker.vertical(biker.stepSize);
		biker.stepSize = 1;
	//	ducker = new Duck();
		ducker.moveDuck();

		if(check == "true"){
			stepSize = -1;
			moveBiker(50);
			stepsize = 1;
			check = false;

		}	
		if (biker.height <= -60) {
			biker.stepSize = 1;
		} 
		else if (biker.height >= 0) {
			biker.stepSize = -1;
		}
	}
	else {
		document.getElementById("dumb").innerHTML = "GAME OVER";
		biker.stepSize = 0;
		quack();
	}


}

function Duck() {
    // these private variables are created when we create the new duck
    var duck = document.getElementById("duck");
    var x = Math.floor((Math.random() * 500) + 600);


    // this public function can be called to move the duck
    this.moveDuck = function() {

        x = x-2;
        if (x<-100) {
            x = 700+x;
        }
        duck.setAttribute("x",x);
    }
    
}


// called when page is loaded
// call function "singleFrame" every 30ms
var animObj = setInterval(singleFrame, 30); 	

var svgNS = "http://www.w3.org/2000/svg";

var stripeA = document.createElementNS(svgNS,"rect");
stripeA.setAttribute("x",0);
stripeA.setAttribute("y",227);
stripeA.setAttribute("width",20);
stripeA.setAttribute("height",300-227);

gameSVG = document.getElementById("drawing");
gameSVG.appendChild(stripeA);