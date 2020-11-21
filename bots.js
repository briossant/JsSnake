let w=rwidth/fact;
let h=rheight/fact;

let pos=(x,y)=>{return y*w+x};
let X=(p)=>{return p%w};
let Y=(p)=>{return Math.floor(p/w)};

// search the fastest path to the apple
function bot1_BFS(grid,x,y,mx,my){
    let res=['E'];
    let vz=[[-1,0],[1,0],[0,1],[0,-1]];
    let vz_str=['E','W','N','S'];
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
    function boucle(){
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
        if(file.length>0){
            boucle()
        }
    }
    boucle();
    G.forEach(el=>{
        console.log(el);
    });
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
    console.log(res);
    return res[res.length-1]
}

// search the longest path possible
function bot2_DFS(grid,x,y,qx,qy){
    let res=['N'];
    //to do
    return res
}

