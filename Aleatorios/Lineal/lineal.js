function generarAleatorios(X0, k, p, m, c) {
    let a = 1 + 4 * k;
    let xs = [X0];
    let args = [];
    p++;
    // Generar la secuencia de xi
    for (let i = 1; i <= p; i++) {
        let xi = (a * xs[i - 1] + c) % m;
        let s = "(" + a + "*" + xs[i - 1] + "+" + c + ") MOD " + m + " = " ;
        args.push(s);
        xs.push(xi);
    }

    // Generar los ri
    let rs = [];
    for (let j = 1; j <= p; j++) {
        let ri = xs[j] / (m - 1);
        rs.push(Number(ri.toFixed(4)));
    }

    // Mostrar resultados
    const tabla = document.getElementById("tablaResultados").querySelector("tbody");
    tabla.innerHTML="";
    for (let i = 0; i < p; i++) {
        let fila=document.createElement("tr");
        fila.innerHTML=`
            <td>${i+1}</td>
            <td>${args[i]}${xs[i+1]}</td>
            <td>${rs[i]}</td>

        `;
        tabla.appendChild(fila)

    }
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

function validar(){
    let X0 = Number(document.getElementById("semilla").value);
    let k  = Number(document.getElementById("k").value);
    let p  = Number(document.getElementById("p").value);
    let c  = Number(document.getElementById("c").value);
    if (isNaN(X0) || isNaN(k) || isNaN(p) || isNaN(c)) {
        alert("Todos los valores deben ser números");
        return;
    }
    if (X0 < 1) {
        alert("La semilla debe ser un número positivo");
        return;
    }
    if (k < 1) {
        alert("La constante k debe ser positiva");
        return;
    }
    if (p < 1) {
        alert("La constante p debe ser positiva");
        return;
    }
    if (c < 1) {
        alert("La constante c debe ser positiva");
        return;
    }
    // Verificamos si c es primo
    if (!esPrimo(c)) {
        alert("La constante c no es un número primo");
        return;
    }
    let g = Math.log(p) / Math.log(2);
    let m = Math.pow(2, g);
    generarAleatorios(X0, k, p, m, c);
}
