
        function simular() {
            let NMH = parseInt(document.getElementById("nmh").value);
            const CUA = parseFloat(document.getElementById("cua").value);  // Costo unitario artículo
            const PVU = parseFloat(document.getElementById("pvu").value);  // Precio venta unidad
            const CF = parseFloat(document.getElementById("cf").value);    // Costo fijo

            let CH = 0;           // Día actual
            let TARTCC = 0;       // Total artículos comprados
            let CCLI = 0;         // Contador clientes por día
            let ARTCC = 0;        // Artículos por cliente

            let tbody = document.querySelector("#tablaResultados tbody");
            tbody.innerHTML = ""; // limpiar tabla anterior

            while (CH < NMH) {
                let rllecli = Math.random();
                let LLECLI = Math.round(0 + (4 - 0) * rllecli);

                // Mostrar cantidad de clientes por día
                if (LLECLI !== 0) {
                    CCLI = 0;
                    while (CCLI < LLECLI) {
                        let rartcc = Math.random();

                        if (rartcc >= 0.2 && rartcc <= 0.5) ARTCC = 1;
                        else if (rartcc > 0.5 && rartcc <= 0.9) ARTCC = 2;
                        else if (rartcc > 0.9) ARTCC = 3;
                        else ARTCC = 0;

                        TARTCC += ARTCC;

                        // Agregar fila a la tabla
                        let fila = `<tr>
                            <td>${CH + 1}</td>
                            <td>${rllecli.toFixed(4)}</td>
                            <td>${LLECLI}</td>
                            <td>${CCLI + 1}</td>
                            <td>${rartcc.toFixed(4)}</td>
                            <td>${ARTCC}</td>
                        </tr>`;
                        tbody.innerHTML += fila;

                        CCLI++;
                    }
                } else {
                    // Si no hay clientes, mostrar fila
                    let fila = `<tr>
                        <td>${CH + 1}</td>
                        <td>${rllecli.toFixed(4)}</td>
                        <td>0</td>
                        <td>-</td>
                        <td>-</td>
                        <td>0</td>
                    </tr>`;
                    tbody.innerHTML += fila;
                }

                CH++;
            }

            // Cálculo final
            let GNETA = (TARTCC * (PVU - CUA)) - CF;

            document.getElementById("resultadosFinales").innerHTML = `
                <h3>Resultados Finales</h3>
                <p><strong>Ganancia neta de la tienda:</strong> Bs. ${GNETA.toFixed(2)}</p>
                <p><strong>Total de artículos comprados:</strong> ${TARTCC}</p>
            `;
        }
