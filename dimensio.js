
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
function mult(x, y, z){
    if(x[1].length != y[0].length) return null;
    
    for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < y[0].length; j++) {
            z[i][j] = 0;
            for (var k = 0; k < y.length; k++) {
                z[i][j] += x[i][k] * y[k][j];
            }
        }
    }
}

function cMat(n) {
    var mat = new Array(n);
    for (var i = 0; i < n; i++) {
        mat[i] = new Array(n).fill(0);
    }
    return mat;
}

function E(z,n){
    z = cMat(n);
    for (var i = 0; i < n; i++) {
        z[i][i] = 1;
    }
}

function nrm(n,z,iv,jv,vt){
    E(z,n);

    var th = Math.pi*vt/180
    var cv = Math.cos(th);
    var sv = Math.sin(th);

    z[iv][iv] = cv;
    z[iv][jv] = -sv;
    z[jv][iv] = sv;
    z[jv][jv] = cv;
}

function rot(n,x,y){
    var t = 0;
    var jt = 0;
    var m = cMat(n);
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n-i-1; j++) {
            jt = j+i+1;
            nrm(n,m,i,jt,y[t]);
            mult(x,m,x);
        
            t++;
        }
    }

}

function sum(x,y,z){
    for (var i = 0; i < x.length; i++) {
        z[i] = x[i] + y[i];
    }
}

var N = 4;

var point = [[1,2,3,4],[0,5,3,6],[2,2,2,2],[1,1,1,1]];

var V = [0,0,0,0,0,0,0,0,0];

console.log(rot(N,point,V));