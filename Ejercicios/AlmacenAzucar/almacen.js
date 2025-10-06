
function simular() {
  // Leer parámetros
  let NMD = parseInt(document.getElementById('NMD').value);
  let CBOD = parseInt(document.getElementById('CBOD').value);
  let CORD = parseFloat(document.getElementById('CORD').value);
  let PVU = parseFloat(document.getElementById('PVU').value);
  let CUI = parseFloat(document.getElementById('CUI').value);
  let CUA = parseFloat(document.getElementById('CUA').value);
  let IAZU = parseInt(document.getElementById('IAZU').value);

  // Variables de control
  let TENT = 0;
  let PAZU = 0;
  let CUAT = 0;
  let CORDT = 0;
  let CUIT = 0;
  let CTOT = 0;
  let GNETA = 0;
  let IBRU = 0;
  let DIT = 0;

  // Preparar tabla de prueba de escritorio
  let tablaHTML = `<table>
    <tr>
      <th>Día</th>
      <th>Inventario Inicial</th>
      <th>Demanda</th>
      <th>rDA</th>
      <th>Pedido Pendiente</th>
      <th>rtent</th>
      <th>Llega Pedido</th>
      <th>Inventario Final</th>
      <th>Demanda Insatisfecha</th>
    </tr>`;

  // Simulación día a día
  for(let CD = 1; CD <= NMD; CD++) {
    let inventarioInicial = IAZU;
    let llegadaPedido = 0;
    let rtent = '-';

    // Entrega de pedidos
    if(TENT > 0){
      TENT -= 1;
      if(TENT === 0){
        IAZU += PAZU;
        llegadaPedido = PAZU;
        CORDT += CORD;
        CUAT += PAZU * CUA;
        PAZU = 0;
      }
    }

    // Pedido cada 7 días si no hay pedido pendiente
    if(CD % 7 === 0 && TENT === 0){
      PAZU = CBOD - IAZU;
      if(PAZU > 0){
        rtent = Math.random().toFixed(3); // mostrar número aleatorio
        TENT = Math.floor(1 + Math.random() * 2); // 1 a 3 días
      }
    }

    // Demanda diaria (exponencial media 100)
    let rDA = Math.random();
    let DA = Math.floor(-100 * Math.log(1 - rDA));

    // Satisfacer demanda
    if(DA <= IAZU){
      IAZU -= DA;
      IBRU += DA * PVU;
    } else {
      DIT += (DA - IAZU);
      IBRU += IAZU * PVU;
      IAZU = 0;
    }

    // Costo de inventario
    CUIT += IAZU * CUI;

    // Agregar fila a la tabla
    tablaHTML += `<tr>
      <td>${CD}</td>
      <td>${inventarioInicial}</td>
      <td>${DA}</td>
      <td>${rDA.toFixed(3)}</td>
      <td>${PAZU}</td>
      <td>${rtent}</td>
      <td>${llegadaPedido}</td>
      <td>${IAZU}</td>
      <td>${DIT}</td>
    </tr>`;
  }

  CTOT = CUAT + CUIT + CORDT;
  GNETA = IBRU - CTOT;

  // Mostrar resultados
  document.getElementById('resultado').innerHTML = `
    <strong>Ingreso bruto:</strong> BS ${IBRU.toFixed(2)}<br>
    <strong>Costo total:</strong> BS ${CTOT.toFixed(2)}<br>
    <strong>Ganancia neta:</strong> BS ${GNETA.toFixed(2)}<br>
    <strong>Demanda insatisfecha:</strong> ${DIT} kg
  `;

  tablaHTML += `</table>`;
  document.getElementById('tabla').innerHTML = tablaHTML;
}
