let w=rwidth/fact;
let h=rheight/fact;

let vz=[[-1,0],[1,0],[0,1],[0,-1]];
let vz_str=['E','W','N','S'];
let vz_str_nr=['W','E','S','N'];

let pos=(x,y)=>{return y*w+x};
let X=(p)=>{return p%w};
let Y=(p)=>{return Math.floor(p/w)};

// search the fastest path to the apple
function bot1_BFS(grid,x,y,mx,my){
    let res=['E'];
    let file=[];
    let G=new Array(w);
    for (let X=0;X<w;X++){
        G[X]=new Array(h);
        for (let Y=0;Y<h;Y++){
            if(grid[X][Y]===0){
                G[X][Y]=0
            }else{
                G[X][Y]=-1
            }
        }
    }
    G[x][y]=1;
    file.push(pos(x,y));
    while (file.length>0){
        let el=file[0];
        for (let i=0;i<vz.length;i++){
            let nx=X(el)+vz[i][0];
            let ny=Y(el)+vz[i][1];
            if(nx===mx && ny===my){
                file=['end'];
                G[nx][ny]=Infinity;
                break
            }else if(nx>=0 && nx<w && ny>=0 && ny<h){
                if(G[nx][ny]===0){
                    G[nx][ny]=G[X(el)][Y(el)]+1;
                    file.push(pos(nx,ny));
                }
            }
        }
        file.shift();
    }

    let rx=mx;
    let ry=my;
    let lim=0;
    while (G[rx][ry]!==1 && lim<w*h){
        lim++;
        for (let i=0;i<vz.length;i++){
            let nx=rx+vz[i][0];
            let ny=ry+vz[i][1];
            if(nx>=0 && nx<w && ny>=0 && ny<h) {
                if (G[nx][ny] < G[rx][ry] && G[nx][ny] > 0) {
                    res.push(vz_str[i]);
                    rx = nx;
                    ry = ny;
                    break
                }
            }
        }
    }

    //backup plan
    if (res.length===1){
        for (let i=0;i<vz.length;i++){
            let nx=x+vz[i][0];
            let ny=y+vz[i][1];
            if(nx>=0 && nx<w && ny>=0 && ny<h) {
                if(grid[nx][ny]===0) {
                    res.push(vz_str_nr[i]);
                    break
                }
            }
        }
    }

    return res[res.length-1]
}

// search the longest path possible  *NOT WORKING*
function bot2_DFS(grid,x,y,qx,qy){
    let res=['E'];
    let res_file=[];
    let file=[];
    let G=new Array(w);
    for (let X=0;X<w;X++){
        G[X]=new Array(h);
        for (let Y=0;Y<h;Y++){
            G[X][Y] = grid[X][Y] !== 0;
        }
    }
    G[x][y]=true;
    file.push(pos(x,y));
    function test(tx,ty) {
        let t=false;
        for (let i=0;i<vz.length;i++){
            let nx=tx + vz[i][0];
            let ny=ty + vz[i][1];
            if(nx>=0 && nx<w && ny>=0 && ny<h) {
                if(nx===qx && ny===qy){
                    res_file.push(vz_str_nr[i]);
                    console.log(res_file);
                    console.log(res);
                    if (res_file.length>res.length){
                        res=[...res_file];
                        break;
                    }
                }else if (G[nx][ny] === false) {
                    G[nx][ny] = true;
                    file.unshift(pos(nx, ny));
                    res_file.push(vz_str_nr[i]);
                    t = true;
                    break;
                }
            }
        }
        return t;
    }

    while (file.length>0){
        let t=test(X(file[0]),Y(file[0]));
        if (t===false&&file.length>0){
            file.shift();
            res_file.pop();
        }
    }
    console.log(res);
    return res[0]
}

