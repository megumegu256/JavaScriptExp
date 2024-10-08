//階乗の計算
function fact(x){
    if(x==0){
        return 1;
    }
    return x*fact(x-1);
}

//組み合わせ(コンビネーション)の計算
function comb(n, k){
    return fact(n)/(fact(k)*fact(n-k));
}

//行列の積の計算
function mult(x, y){
    
    if(x[0].length != y.length) return null;
    
    let z = new Array(x.length);
    for (let i = 0; i < x.length; i++) {
        z[i] = new Array(y[0].length).fill(0);
    }

    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < y[0].length; j++) {
            z[i][j] = 0;
            for (let k = 0; k < y.length; k++) {
                z[i][j] += x[i][k] * y[k][j];
            }
        }
    }
    return z;
}

//n次正方行列定義
function cMat(n) {
    let mat = new Array(n);
    for (let i = 0; i < n; i++) {
        mat[i] = new Array(n).fill(0);
    }
    return mat;
}

//単位行列生成
function E(n){
    mat = cMat(n);
    for (let i = 0; i < n; i++) {
        mat[i][i] = 1.0;
    }
    return mat;
}

//回転行列生成
function nrm(n,iv,jv,vt){
    let z = E(n);

    let th = Math.PI*vt/180
    let cv = Math.cos(th);
    let sv = Math.sin(th);

    z[iv][iv] = cv;
    z[iv][jv] = sv;
    z[jv][iv] = -sv;
    z[jv][jv] = cv;

    return z;
}

//回転後の座標計算
function rot(n,x,y){
    let z = x;
    let t = 0;
    let jt = 0;
    let m;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n-i-1; j++) {
            jt = j+i+1;
            m = nrm(n,i,jt,y[t]);

            z = mult(m,z);
        
            t++;
        }
    }
    return z;
}

//行列の和の計算
function sum(x,y){
    for (let i = 0; i < x.length; i++) {
        if (isNaN(y[i])==0) {
        x[i] += y[i];
        }
    }
    return x;
}

let N = 4;
let V = [30,0,45,60,0,45];
let Vr = [0,0,0,0,0,0];

//テキストボックス初期値設定
let ele_n = document.getElementById('ele_n');
ele_n.value = "";
let checkButtonn = document.getElementById('checkButtonn');
checkButtonn.addEventListener('click', buttonClickn);
let msg_n = document.getElementById('msg_n');
msg_n.innerText = "現在のn=" +N;


let ele_v = document.getElementById('ele_v');
ele_v.value = "";
let checkButtonv = document.getElementById('checkButtonv');
checkButtonv.addEventListener('click', buttonClickv);
let msg_v = document.getElementById('msg_v');
msg_v.innerText = "現在の角度："+V;

let ele_vr = document.getElementById('ele_vr');
ele_vr.value = "";
let checkButtonvr = document.getElementById('checkButtonvr');
checkButtonvr.addEventListener('click', buttonClickvr);
let msg_vr = document.getElementById('msg_vr');
msg_vr.innerText = "現在の変化速度："+Vr;

let vncr = document.getElementById('vncr');
vncr.innerText = "(スペース区切りで"+comb(N,2)+"つ入力)";

let checkButtonc = document.getElementById('checkButtonc');
checkButtonc.addEventListener('click', buttonClickc);

let C = true;

buttonClick();


//ボタンクリック時の処理N
function buttonClickn(){
    if (isNaN(ele_n.value)==0 && ele_n.value != "") {
        N = parseInt(ele_n.value,10);
    }
    ele_n.value = "";
    vncr.innerText = "(スペース区切りで"+comb(N,2)+"つ入力)";
    buttonClick();
}

//ボタンクリック時の処理V
function buttonClickv(){
    Vs = ele_v.value.split(" ");
    if (ele_v.value != ""){
        V = new Array(comb(N,2)).fill(0);
        for (let i = 0; i < Vs.length; i++) {
            if (isNaN(Vs[i])==0) {
                if (Vs[i] != "") {
                    V[i] = parseInt(Vs[i],10);
                }else{
                    V[i] = 0;
                }
            }
        }
    }

    while (V.length < comb(N,2)) {
        V.push(0);
    }

    ele_v.value = "";
    buttonClick();
}

//ボタンクリック時の処理Vr
function buttonClickvr(){
    Vs = ele_vr.value.split(" ");
    if (ele_vr.value != ""){
        Vr = new Array(comb(N,2)).fill(0);
        for (let i = 0; i < Vs.length; i++) {
            if (isNaN(Vs[i])==0) {
                if (Vs[i] != "") {
                    Vr[i] = parseInt(Vs[i],10);
                }else{
                    Vr[i] = 0;
                }
            }
        }
    }

    while (Vr.length < comb(N,2)) {
        Vr.push(0);
    }

    ele_vr.value = "";
    buttonClick();
}

function buttonClickc(){
    C = !C;
    buttonClick();
}



//ボタンクリック時の処理Main
function buttonClick(){
    //点の座標
    let f;
    msg_n.innerText = "現在のn=" +N;
    msg_v.innerText = "現在の角度："+V;
    msg_vr.innerText = "現在の変化速度："+Vr;

    let point = new Array(N);
    for (let i = 0; i < N; i++) {
        point[i] = new Array(Math.pow(2,N)).fill(0);
    }

    for (let j = 0; j < Math.pow(2,N); j++) {
        for (let i = 0; i < N; i++) {
            if (parseInt(j/(Math.pow(2,i)))%2 == 0) {
                f = -1;
            }else{ 
                f = 1;
            }

            point[i][j] = f;
        }
    }

    //線の組み合わせ
    let g;
    let p;

    let lines = new Array(2);
    for (let i = 0; i < 2; i++) {
        lines[i] = new Array(comb(N,2)).fill(0);
    }

    for (let j = 0; j < N; j++) {
        g = Math.pow(2,N-1);
        for (let i = 0; i < g; i++) {
            p = Math.pow(2,j);
            lines[0][j*g+i] = i+p*(parseInt(i/p));
            lines[1][j*g+i] = i+p*(parseInt(i/p))+p;
        }
    }

    //log出力 ///////////////////////////////////////
    /*
    console.log("lines:");
    console.log(lines);

    console.log("N:");
    console.log(N);
    console.log("point:");
    console.log(point);
    console.log("V:");
    console.log(V);

    console.log("rot:");
    console.log(rot(N,point,V));
    */
    /////////////////////////////////////////////////

    let rotpos = rot(N,point,V);

    //図形の表示
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (C) {
        ctx.fillStyle = '#46a';
    }else{
        ctx.fillStyle = '#dca';
    }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    

    let r = 100;

    //線の表示
    for (let i = 0; i < lines[0].length; i++) {
        if(C){
            ctx.strokeStyle = '#88f';
        }else{
            ctx.strokeStyle = '#dc8';
        }
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(r*rotpos[0][lines[0][i]]+320, r*rotpos[1][lines[0][i]]+240)
        ctx.lineTo(r*rotpos[0][lines[1][i]]+320, r*rotpos[1][lines[1][i]]+240);
        ctx.stroke();
        ctx.closePath();

        if (C) {
            ctx.strokeStyle = '#afc';
        }else{
            ctx.strokeStyle = '#fdd';
        }
            ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(r*rotpos[0][lines[0][i]]+320, r*rotpos[1][lines[0][i]]+240)
        ctx.lineTo(r*rotpos[0][lines[1][i]]+320, r*rotpos[1][lines[1][i]]+240);
        ctx.stroke();
        ctx.closePath();
    }

    //点の表示
    for (let i = 0; i < rotpos[0].length; i++) {
        if (C) {
            ctx.fillStyle = '#048';
        }else{
            ctx.fillStyle = '#840';
        }
        ctx.beginPath();
        ctx.arc(r*rotpos[0][i]+320, r*rotpos[1][i]+240, 5, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        if (C) {
            ctx.fillStyle = '#0fa';
        }else{
            ctx.fillStyle = '950';
        }
        ctx.beginPath();
        ctx.arc(r*rotpos[0][i]+320, r*rotpos[1][i]+240, 3, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}

function incrementCounter() {
    buttonClick();

    //角度の更新
    sum(V,Vr);
    
    for (let i = 0; i < V.length; i++) {
        if (V[i] >= 360) {
            V[i] = V[i]%360;
        }
    }
    
    setTimeout(sleep, 10);
    function sleep(){
        requestAnimationFrame(incrementCounter);
    }
}

// 初回の呼び出し
requestAnimationFrame(incrementCounter);