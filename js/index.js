import inicial, { manejoDeMatriz, obtenerMatriz, imprimeMatriz } from "./operaciones_matriz.js";
import { algoritmosLU } from "./funciones.js";
import { error, quitarAlerta } from "./alertas.js";

inicial();

document.getElementById("cholesky").addEventListener(
  "click",
  function (event) {
    try {
      const matrziCholesky = algoritmosLU.cholesky(obtenerMatriz());
      console.log(matrziCholesky);
      imprimeMatriz(matrziCholesky);
    } catch (mensaje) {
      console.error(mensaje);
      error(mensaje);
    }
  },
  false
);

document.getElementById("agregarCeldas").addEventListener(
  "click",
  function (event) {
    try {
      quitarAlerta();
      manejoDeMatriz.aumentarTamanio();
    } catch (mensaje) {
      error(mensaje);
    }
  },
  false
);

document.getElementById("quitarCeldas").addEventListener(
  "click",
  function (event) {
    try {
      quitarAlerta();
      manejoDeMatriz.disminuirTamanio();
    } catch (mensaje) {
      error(mensaje);
    }
  },
  false
);