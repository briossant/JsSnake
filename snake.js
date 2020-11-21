// variables for the canvas
let can=document.getElementById('can');
let ctx = can.getContext('2d');
let width=600;
let height=400;
let scale=2;
let fact=20;
let rwidth=width* scale;
let rheight=height* scale;
// canvas init
can.width = rwidth;
can.height = rheight;
can.style.width = width + 'px';
can.style.height = height + 'px';

let deb=document.getElementById('deb'); // to show score
document.addEventListener('keydown',mov); // listen keyboard input

let bot_button=document.getElementById("bot_button"); // to modify button txt
let botplay=false; // bot activated ?
let bot1_lim=9999999;   // score after bot1 switch to bot2

let dir=['E']; // instruction list

// put white pixel at x,y
function draw(x,y) {
    ctx.fillStyle = '#fbfbff';
    ctx.fillRect(x*fact,y*fact,fact,fact);
}

// put black pixel at x,y
function undraw(x,y) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(x*fact,y*fact,fact,fact);
}

// give a random int in [0;max[
function rdmInt(max){
    return Math.floor(Math.random()*Math.floor(max));
}

// activate the bots
function activate_bots(){
    botplay = !botplay;
    if (botplay){
        bot_button.innerText='Bot : ON'
    }else{
        bot_button.innerText='Bot : OFF'
    }
}

function game() {
    // clear the board
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0,rwidth,rheight);
    deb.innerHTML='';

    // - variable -
    let speed=~~document.getElementById('speed_input').value;
    let score=0; // don't need to explain
    let wait; // the interval
    let alive=true; // snake life
    let q=3; // snake length
    let hx=Math.round(rwidth/(fact*2)); // x coordinate of player head
    let hy=Math.round(rheight/(fact*2)); // y coordinate of player head
    let qco=[]; // coordinate of each snake part
    //game board in a 2d array
    let grid=new Array(rwidth/fact);
    for(let x =0;x<grid.length;x++){
        grid[x]=new Array(rheight/fact);
        for(let y=0;y<grid[x].length;y++){
            grid[x][y]=0;
        }
    }

    let cmpt=0; // counter of turn
    let miamcoo=[]; // apple coordinates
    dir=['E']; // instruction list initialisation

    //draw start player
    for(let i=0;i<q;i++){
        grid[hx-i][hy]+=i+1;
        draw(hx-i,hy);
        qco.push([hx-i,hy])
    }

    // generate a random apple on board
    function rdmiam() {
        deb.innerHTML='score : '+score;
        let mx=rdmInt(rwidth/fact);
        let my=rdmInt(rheight/fact);
        while(grid[mx][my]!==0){
            mx=rdmInt(rwidth/fact);
            my=rdmInt(rheight/fact);
        }
        miamcoo=[mx,my];
        ctx.fillStyle = '#ff0c00';
        ctx.fillRect(mx*fact,my*fact,fact,fact);
    }

    // Move the player at screen
    let mod=()=>{
        grid[hx][hy]=1;
        draw(hx,hy);
        if(miamcoo[0]!==hx || miamcoo[1]!==hy){
            undraw(qco[q-1][0],qco[q-1][1]);
            grid[qco[q-1][0]][qco[q-1][1]]=0;
            qco.splice(q-1,1)
        }else{
            score++;
            q++;
            draw(miamcoo[0],miamcoo[1]);
            rdmiam()
        }
        qco.unshift([hx,hy])
    };

    // Move the player in code and do multiple test
    let boucle=()=>{
        cmpt++;
        if (botplay===true){
            if(score<bot1_lim){
                dir=bot1_BFS(grid,hx,hy,miamcoo[0],miamcoo[1])
            }else{
                dir=bot2_DFS(grid,hx,hy,qco[q-1][0],qco[q-1][1])
            }
        }
        if(dir[0]==='N'){
            hy--;
            if(hy<0||grid[hx][hy]===1){
                alive=false;
            }else {
                mod()
            }
        }else if(dir[0]==='S'){
            hy++;
            if(hy>=rheight/fact||grid[hx][hy]===1){
                alive=false;
            }else {
                mod()
            }
        }else if(dir[0]==='W'){
            hx--;
            if(hx<0||grid[hx][hy]===1){
                alive=false;
            }else {
                mod()
            }
        }else if(dir[0]==='E'){
            hx++;
            if(hx>=rwidth/fact||grid[hx][hy]===1){
                alive=false;
            }else {
                mod()
            }
        }
        if(dir.length>1){
            dir.shift()
        }
        if(alive===false){
            clearInterval(wait);
            deb.innerHTML+='  PERDU'
        }
    };

    //start the game
    if(alive===true){
        rdmiam();
        wait=window.setInterval(boucle,speed);
    }
}

// input to instruction function
function mov(cle) {
    if(botplay===false) {
        if (cle.code === 'ArrowUp' && dir[dir.length-1]!=='S') {
            dir.push('N');
        } else if (cle.code === 'ArrowDown' && dir[dir.length-1]!=='N') {
            dir.push('S');
        } else if (cle.code === 'ArrowLeft' && dir[dir.length-1]!=='E') {
            dir.push('W');
        } else if (cle.code === 'ArrowRight' && dir[dir.length-1]!=='W') {
            dir.push('E');
        }
    }
}