import { crearMatriz, obtenerMatriz, imprimeMatriz } from "./manejo_matriz.js";
import { algoritmosLU } from "./algoritmos.js";
import { error, warning, quitarAlerta } from "./alertas.js";

document.getElementById("cholesky").addEventListener(
  "click",
  function (event) {
    try {
      crearMatriz();
    } catch (e) {
      if (e instanceof RangeError) {
        warning(e.message);
      } else {
        error(e.message);
      }
    }
  },
  false
);

document.getElementById("resolverCholesky").addEventListener(
  "click",
  function (event) {
    try {
      const matrziCholesky = algoritmosLU.cholesky(obtenerMatriz());
      console.log(matrziCholesky);
      imprimeMatriz(matrziCholesky);
    } catch (e) {
      console.error(e);
      error(e.message);
    }
  },
  false
);

