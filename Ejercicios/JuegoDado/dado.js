function simular() {
            let NMJ = parseInt(document.getElementById("nmj").value);
            const PUJ = parseFloat(document.getElementById("puj").value);   // Costo de cada juego
            const CUS7 = parseFloat(document.getElementById("cus7").value); // Premio al jugador si suma 7

            let CJ = 0;
            let GNC = 0;
            let NJGC = 0;

            let tbody = document.querySelector("#tablaResultados tbody");
            tbody.innerHTML = ""; // limpiar resultados previos

            while (CJ < NMJ) {
                GNC += PUJ;

                let rdado1 = Math.random();
                let rdado2 = Math.random();

                let Dado1 = Math.round(1 + (6 - 1) * rdado1);
                let Dado2 = Math.round(1 + (6 - 1) * rdado2);
                let SD = Dado1 + Dado2;

                if (SD === 7) {
                    GNC -= CUS7;
                } else {
                    NJGC++;
                }

                // Agregar fila a la tabla
                let fila = `<tr>
                    <td>${CJ + 1}</td>
                    <td>${rdado1.toFixed(4)}</td>
                    <td>${rdado2.toFixed(4)}</td>
                    <td>${Dado1}</td>
                    <td>${Dado2}</td>
                    <td>${SD}</td>
                    <td>${GNC.toFixed(2)}</td>
                    <td>${NJGC}</td>
                </tr>`;
                tbody.innerHTML += fila;

                CJ++;
            }

            let PJC = (NJGC / NMJ) * 100;

            document.getElementById("resultadosFinales").innerHTML = `
                <h3>Resultados Finales</h3>
                <p><strong>Ganancia neta de la casa:</strong> Bs. ${GNC.toFixed(2)}</p>
                <p><strong>Número de juegos ganados por la casa:</strong> ${NJGC}</p>
                <p><strong>% de juegos ganados por la casa:</strong> ${PJC.toFixed(2)}%</p>
            `;
        }
