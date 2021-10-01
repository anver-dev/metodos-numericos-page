import {
  crearMatriz,
  obtenerMatriz,
  imprimeMatriz,
  limpiaResultados,
  generaVectorInicial
} from "./manejo_matriz.js";
import { algoritmosLU } from "./algoritmos.js";
import { error, warning, quitarAlerta } from "./alertas.js";

document.getElementById("cholesky").addEventListener(
  "click",
  function (e) {
    try {
      e.preventDefault();
      crearMatriz();
    } catch (e) {
      limpiaResultados();

      if (e instanceof RangeError) warning(e.message);
      else error(e.message);
    }
  },
  false
);

document.getElementById("metodoJacobi").addEventListener("click", function (e) {
  try {
    e.preventDefault();
    crearMatriz();
    generaVectorInicial();
  } catch (e) {
    limpiaResultados();

    if (e instanceof RangeError) warning(e.message);
    else error(e.message);
  }
});

document.getElementById("resolverCholesky").addEventListener(
  "click",
  function (event) {
    try {
      const matrziCholesky = algoritmosLU.cholesky(obtenerMatriz());
      imprimeMatriz(matrziCholesky);
    } catch (e) {
      limpiaResultados();
      error(e.message);
    }
  },
  false
);
