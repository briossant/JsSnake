let can=document.getElementById('can');
let ctx = can.getContext('2d');
let width=600;
let height=400;
let scale=2;
let fact=20;
let timeout=false;
let rwidth=width* scale;
let rheight=height* scale;
let botplay=false;

can.width = rwidth;
can.height = rheight;
can.style.width = width + 'px';
can.style.height = height + 'px';

let deb=document.getElementById('deb');

document.addEventListener('keydown',mov);

let dir=['E'];

function draw(x,y) {
    ctx.fillStyle = '#fbfbff';
    ctx.fillRect(x*fact,y*fact,fact,fact);
}

function undraw(x,y) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(x*fact,y*fact,fact,fact);
}

function rdmInt(max){
    return Math.floor(Math.random()*Math.floor(max));
}

function game() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0,rwidth,rheight);
    deb.innerHTML='';
    let score=0;
    let wait;
    let alive=true;
    let q=3;
    let hx=Math.round(rwidth/(fact*2));
    let hy=Math.round(rheight/(fact*2));
    let qco=[];
    let grid=new Array(rwidth/fact);
    for(let x =0;x<grid.length;x++){
        grid[x]=new Array(rheight/fact);
        for(let y=0;y<grid[x].length;y++){
            grid[x][y]=0;
        }
    }

    let cmpt=0;
    let miamcoo=[];
    dir=['E'];

    for(let i=0;i<q;i++){
        grid[hx-i][hy]+=i+1;
        draw(hx-i,hy);
        qco.push([hx-i,hy])
    }

    function rdmiam() {
        deb.innerHTML='score : '+score;
        let mx=rdmInt(rwidth/fact);
        let my=rdmInt(rheight/fact);
        miamcoo=[mx,my];
        ctx.fillStyle = '#ff0c00';
        ctx.fillRect(mx*fact,my*fact,fact,fact);
    }

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

    let boucle=()=>{
        cmpt++;
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
        timeout=false;
        if(alive===false){
            clearInterval(wait);
            deb.innerHTML+='  PERDU'
        }
    };

    if(alive===true){
        rdmiam();
        wait=window.setInterval(boucle,100);
    }
}

function mov(cle) {
    if(botplay===false) {
        if (cle.code === 'ArrowUp' && dir[dir.length-1]!=='S') {
            dir.push('N');
            timeout = true
        } else if (cle.code === 'ArrowDown' && dir[dir.length-1]!=='N') {
            dir.push('S');
            timeout = true
        } else if (cle.code === 'ArrowLeft' && dir[dir.length-1]!=='E') {
            dir.push('W');
            timeout = true
        } else if (cle.code === 'ArrowRight' && dir[dir.length-1]!=='W') {
            dir.push('E');
            timeout = true
        }
    }
}