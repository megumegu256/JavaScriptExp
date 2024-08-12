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
    
    var z = new Array(x.length);
    for (var i = 0; i < x.length; i++) {
        z[i] = new Array(y[0].length).fill(0);
    }

    for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < y[0].length; j++) {
            z[i][j] = 0;
            for (var k = 0; k < y.length; k++) {
                z[i][j] += x[i][k] * y[k][j];
            }
        }
    }
    return z;
}

function cMat(n) {
    var mat = new Array(n);
    for (var i = 0; i < n; i++) {
        mat[i] = new Array(n).fill(0);
    }
    return mat;
}

function E(n){
    mat = cMat(n);
    for (var i = 0; i < n; i++) {
        mat[i][i] = 1.0;
    }
    return mat;
}

function nrm(n,iv,jv,vt){
    var z = E(n);

    var th = 3.14159265358979323846*vt/180
    var cv = Math.cos(th);
    var sv = Math.sin(th);

    z[iv][iv] = cv;
    z[iv][jv] = sv;
    z[jv][iv] = -sv;
    z[jv][jv] = cv;

    return z;
}

function rot(n,x,y){
    var z = x;
    var t = 0;
    var jt = 0;
    var m;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n-i-1; j++) {
            jt = j+i+1;
            m = nrm(n,i,jt,y[t]);

            z = mult(m,z);
        
            t++;
        }
    }
    return z;
}

function sum(x,y,z){
    for (var i = 0; i < x.length; i++) {
        z[i] = x[i] + y[i];
    }
}

var N = 3;
var V = new Array(comb(N,2)).fill(0);

function butotnClickn(){
    if (isNaN(ele_n.value)==0 && ele_n.value != "") {
        N = parseInt(ele_n.value,10);
    }
    ele_n.value = "";
    butotnClick();
}

function butotnClickv(){
    Vs = ele_v.value.split(" ");
    if (ele_v.value != ""){
        V = new Array(comb(N,2)).fill(0);
        for (let i = 0; i < Vs.length; i++) {
            if (isNaN(Vs[i])==0) {
                V[i] = parseInt(Vs[i],10);
            }
        }
    }
    ele_v.value = "";
    butotnClick();
}

function butotnClick(){
    var f;
    var point = new Array(N);
    for (var i = 0; i < N; i++) {
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

    console.log("point:");
    console.log(point);

    var g;
    var p;

    var lines = new Array(2);
    for (var i = 0; i < 2; i++) {
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
}

let ele_n = document.getElementById('ele_n');
ele_n.value = "";

let checkButtonn = document.getElementById('checkButtonn');
checkButtonn.addEventListener('click', butotnClickn);


let ele_v = document.getElementById('ele_v');
ele_v.value = "";

let checkButtonv = document.getElementById('checkButtonv');
checkButtonv.addEventListener('click', butotnClickv);
