
    function simular() {
      let NMD = parseInt(document.getElementById("nmd").value);
      const PVUH = parseFloat(document.getElementById("pvuh").value); // Precio huevo vendido
      const PVUP = parseFloat(document.getElementById("pvup").value); // Precio pollo vendido

      let CD = 0;   // Día actual
      let THR = 0;  // Total huevos rotos
      let TPS = 0;  // Total pollos vendidos
      let TH = 0;   // Total huevos vendidos

      let tbody = document.querySelector("#tablaResultados tbody");
      tbody.innerHTML = ""; // Limpiar tabla

      while (CD < NMD) {
        let rhpg = Math.random();
        let HPG = 0;

        // Determinar huevos puestos
        if (rhpg >= 0.34 && rhpg <= 0.74) HPG = 1;
        else if (rhpg > 0.74 && rhpg <= 0.92) HPG = 2;
        else if (rhpg > 0.92 && rhpg <= 0.98) HPG = 3;
        else if (rhpg > 0.98) HPG = 4;

        // Si no hubo huevos ese día → fila vacía
        if (HPG === 0) {
          let filaVacia = `<tr>
              <td>${CD + 1}</td>
              <td>${rhpg.toFixed(4)}</td>
              <td>0</td>
              <td>-</td>
              <td>-</td>
              <td>Sin producción</td>
          </tr>`;
          tbody.innerHTML += filaVacia;
        } else {
          // Simular huevos
          let huevosRestantes = HPG;
          while (huevosRestantes > 0) {
            let rEH = Math.random();
            let rEP = "-";
            let resultado = "";

            if (rEH <= 0.2) {
              resultado = "Huevo roto";
              THR++;
            } else if (rEH <= 0.5) {
              rEP = Math.random();
              if (rEP > 0.2) {
                resultado = "Pollo vivo";
                TPS++;
              } else {
                resultado = "Pollo muerto";
              }
            } else {
              resultado = "Se quedó huevo";
              TH++;
            }

            let fila = `<tr>
                <td>${CD + 1}</td>
                <td>${rhpg.toFixed(4)}</td>
                <td>${HPG}</td>
                <td>${rEH.toFixed(4)}</td>
                <td>${rEP !== "-" ? rEP.toFixed(4) : "-"}</td>
                <td>${resultado}</td>
            </tr>`;
            tbody.innerHTML += fila;

            huevosRestantes--;
          }
        }

        CD++;
      }

      // Calcular ingresos
      let IGT = TH * PVUH + TPS * PVUP;
      let IDP = IGT / NMD;

      // Mostrar resultados
      document.getElementById("resultadosFinales").innerHTML = `
        <h3>Resultados Finales</h3>
        <p><strong>Ingreso neto total:</strong> Bs. ${IGT.toFixed(2)}</p>
        <p><strong>Ingreso promedio diario:</strong> Bs. ${IDP.toFixed(2)}</p>
        <p><strong>Total de huevos vendidos:</strong> ${TH}</p>
        <p><strong>Total de pollos vendidos:</strong> ${TPS}</p>
        <p><strong>Total de huevos rotos:</strong> ${THR}</p>
      `;
    }
