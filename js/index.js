import { crearMatriz, manejoDeMatriz, obtenerMatriz, imprimeMatriz } from "./manejo_matriz.js";
import { algoritmosLU } from "./algoritmos.js";
import { error, quitarAlerta } from "./alertas.js";

const $agregaCeldas = document.getElementById("agregarCeldas");


document.getElementById("cholesky").addEventListener(
  "click",
  function (event) {
    try {
      crearMatriz();
      //const matrziCholesky = algoritmosLU.cholesky(obtenerMatriz());
      //console.log(matrziCholesky);
      //imprimeMatriz(matrziCholesky);
    } catch (mensaje) {
      console.error(mensaje);
      error(mensaje);
    }
  },
  false
);

