var cnv; // le canvas
var ctx; //le context 2d
var posX;
var posY;
var globalSpeed = 2;
var speedX = 0;
var speedY = 0;
var diamPacMan = 22;
var direction;
var pacman;
var bkg;

$(document).ready(function() {
	posX = 10;
	posY = 8;
	cnv = document.querySelector("#cnv");
    document.addEventListener("keydown",function getDirection(e){
        switchDirection(e.keyCode);
    },false);
    pacman = new Image();
    pacman.src = 'img/pacman.svg.png';
    bkg = new Image();
    bkg.src = 'img/pacman_bkg.png';
    setInterval(animate, 20);

});

/**
 * Function which makes elements moving (PacMan, ghosts,...)
 */
function animate() {
    drawPlatform();

    posX += speedX;
    posY += speedY;

    touch();
}

/**
 * Function which draw all the elements of the PacMan
 */
function drawPlatform() {
    ctx = cnv.getContext("2d");
    ctx.clearRect(0,0,cnv.width,cnv.height);
    ctx.beginPath();
    ctx.rect(0,0,cnv.width, cnv.height);
    ctx.fill();
    ctx.drawImage(bkg,0,0,cnv.width, cnv.height);
    ctx.drawImage(pacman, posX, posY, diamPacMan, diamPacMan);
}

/**
 * Function which change PacMan's direction
 * @param keyCode the key code
 */
function switchDirection(keyCode) {
    speedX = globalSpeed;
    speedY = globalSpeed;

    switch(keyCode) {
        //LEFT
        case 37 :
            direction  = 37;
            speedX *= -1;
            speedY = 0;
            break;

        //UP
        case 38 :
            direction = 38;
            speedX = 0;
            speedY *= -1;

            break;

        //RIGHT
        case 39 :
            direction = 39;
            speedX *= 1;
            speedY = 0;
            break;

        //DOWN
        case 40 :
            direction = 40;
            speedX = 0;
            speedY *= 1;
            break;

        default :
            break;
    }
}

/**
 * Function which determine if PacMan touch something (edges or ghosts)
 */
function touch() {
    var cornerTopLeft = ctx.getImageData(posX, posY, 1, 1).data;
    var cornerTopRight = ctx.getImageData(posX +diamPacMan , posY, 1, 1).data;
    var cornerDownLeft = ctx.getImageData(posX , posY +diamPacMan , 1, 1).data;
    var cornerDownRight = ctx.getImageData(posX +diamPacMan, posY +diamPacMan , 1, 1).data;
    /*var colLeft = ctx.getImageData(posX, posY, 1, 1).data; //left color
    var colRight = ctx.getImageData(posX + diamPacMan, posY, 1, 1).data; //right color
    var colTop = ctx.getImageData(posX, posY, 1, 1).data; //top color
    var colDown = ctx.getImageData(posX, posY + diamPacMan , 1, 1).data; //down color*/

    switch (direction) {
        case 37 :
            //if we touch left edge of a wall or left side of the canvas
            if((cornerTopLeft[0] != 0 && cornerTopLeft[1] != 0 && cornerTopLeft[2] != 0 )|| posX <= 0 ||(cornerDownLeft[0] != 0 && cornerDownLeft[1] != 0 && cornerDownLeft[2] != 0 ) ) {
                speedX = 0;
                speedY = 0;
                posX += 1;
            }
            break;

        case 38 :
            //if we touch top edge of a wall or top side of the canvas
            if((cornerTopLeft[0] != 0 && cornerTopLeft[1] != 0 && cornerTopLeft[2] != 0 ) || posY <= 0 || (cornerTopRight[0] != 0 && cornerTopRight[1] != 0 && cornerTopRight[2] != 0 )){
                speedX = 0;
                speedY = 0;
                posY += 1;
            }
            break;

        case 39 :
            //if we touch right edge of a wall or right side of the canvas
            if((cornerTopRight[0] != 0 && cornerTopRight[1] != 0 && cornerTopRight[2] != 0 )|| posX + diamPacMan >= cnv.width || (cornerDownRight[0] != 0 && cornerDownRight[1] != 0 && cornerDownRight[2] != 0 )) {
                speedX = 0;
                speedY = 0;
                posX -= 1;
            }
            break;

        case 40 :
            //if we touch down edge of a wall or down side of the canvas
            if((cornerDownLeft[0] != 0 && cornerDownLeft[1] != 0 && cornerDownLeft[2] != 0 ) || posY + diamPacMan >= cnv.height || (cornerDownRight[0] != 0 && cornerDownRight[1] != 0 && cornerDownRight[2] != 0 )) {
                speedX = 0;
                speedY = 0;
                posY -= 1;
            }
            break;

        //else
        default :
            break;
    }
}

