function generarAleatorios(X0, k, p, m){
        const valor = document.querySelector("input[name='opcion']:checked");
        let a=0;
        p++;
        if (valor.value=="a"){
            a=3+8*k
        }else{
            a=5+8*k
        }
        let xs=[]
        xs.push(X0)
        let args=[]
        for(let i=1;i<m;i++){
            let xi=(a*xs[i-1])%(m);
            let s=a+"*"+xs[i-1]+"MOD"+m+"="+xi;
            args.push(s)
            xs.push(xi);
        }
        let rs=[];
        for(let j=0;j<p;j++){
            let ri=xs[j+1]/(m-1);
            rs.push(Number(ri.toFixed(4)));
        }
        const area=document.getElementById("aleatorios");
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
function impar(X0){
    if(X0%2!=0){
        return true;
    }
    return false;
}

function validar(){
    let X0 = Number(document.getElementById("semilla").value);
    let k  = Number(document.getElementById("k").value);
    let p  = Number(document.getElementById("p").value);
    if (isNaN(X0) || isNaN(k) || isNaN(p)) {
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
    
    // Verificamos si c es primo
    if (!impar(X0)) {
        alert("La semilla no es impar");
        return;
    }
    let g = (Math.log(p) / Math.log(2))+2;
    let m = Math.pow(2, g);
    generarAleatorios(X0, k, p, m);
}
