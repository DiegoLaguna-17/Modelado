function generarAleatorios(){
    let X0=document.getElementById("semilla").value;
    let k=document.getElementById("k").value;
    let p=document.getElementById("p").value;
    let g=Math.log(p)/Math.log(2);
    let m=p;
    let c=primoCercano(m);
    let a=1+4*k;
    let xs=[];
    xs.push(X0);
    for(let i=1;i<m;i++){
        let xi=(a*xs[i-1]+c)%(m);
        xs.push(xi);
    }
    let rs=[];
    for(let j=0;j<p;j++){
        let ri=xs[j]/(m-1);
        rs.push(ri);
    }

    const area=document.getElementById("aleatorios");
    area.value=rs.join("\n");
} 


function primoCercano(m) {
  if (m < 2) return 2;
  for (let d = 0; ; d++) {
    if (m - d >= 2 && esPrimo(m - d)) return m - d; // busca hacia abajo primero
    if (esPrimo(m + d)) return m + d;               // luego hacia arriba
  }
}


function esPrimo(a){
    let divs=0;
    for(let i=1;i<=a;i++){
        if(a%i==0){
            divs++;
        }
    }
    if(divs==2){
        return true;
    }
    return false;
}