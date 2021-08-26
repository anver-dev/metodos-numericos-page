// DOM Elements
const matrizDOM = document.getElementById("matriz");
const btnCrout = document.getElementById("crout");
const btnDoolittle = document.getElementById("doolittle");
const btnCholesky = document.getElementById("cholesky");

const DOOLITTLE = "DOOLITTLE";
const CROUT = "CROUT";

btnCrout.onclick = function () {
  var matriz = validarYObtenerMatriz(matrizDOM);
  console.log(matriz);
  factorizacionDoolittleOCrout(matriz,"CROUT");
};

btnDoolittle.onclick = function () {
  var matriz = validarYObtenerMatriz(matrizDOM);
  console.log(matriz);
  factorizacionDoolittleOCrout(matriz,"DOOLITTLE");
};

function validarYObtenerMatriz(matrizDOM) {
  var matriz = [];
  var filas = matrizDOM.value.split("\n");

  if (filas.length < 2) {
    console.log("Matriz invalida: tamaño de filas");
  } else {
    for (let fil = 0; fil < filas.length; fil++) {
      var columnas = filas[fil].split(" ");
      if (!columnas.length) {
        console.log("Matriz invalida: columna vacia");
        break;
      }
      if (columnas.length != filas.length) {
        console.log("Matriz invalida: no es cuadrada");
        matriz = [];
        break;
      } else {
        matriz[fil] = [];
        for (let col = 0; col < columnas.length; col++) {
          const valor = columnas[col];

          if (isNaN(valor) || isNaN(parseFloat(valor))) {
            console.info("Matriz invalida: inserte valores numericos");
            matriz = [];
            break;
          } else {
            matriz[fil][col] = parseFloat(valor);
          }
        }
      }
    }
  }
  return matriz;
}

function factorizacionDoolittleOCrout(matriz, tipoFactorizacion) {
  var matrizL = inicializaMatrizEnCeros(matriz.length);
  var matrizU = inicializaMatrizEnCeros(matriz.length);

  let dimension = matriz.length;
  let productoParaU = 0;
  let productoParaL = 0;

  for (let k = 0; k < dimension; k++) {
    if(tipoFactorizacion == DOOLITTLE) {
      matrizL[k][k] = 1;
    }
    if (tipoFactorizacion == CROUT) {
      matrizU[k][k] = 1;
    }

    for (let j = k; j < dimension; j++) {
      for (let p = 0; p < k - 1; p++) {
        productoParaU += matrizL[k][p] * matrizU[p][j];
      }
      matrizU[k][j] = (matriz[k][j] - productoParaU)/matrizL[k][k];
      productoParaU = 0;
    }

    for (let i = k; i < dimension; i++) {
      for (let p = 0; p < k - 1; p++) {
        productoParaL += matrizL[i][p] * matrizU[p][k];
      }
      matrizL[i][k] = (matriz[i][k] - productoParaL)/matrizU[k][k];
      productoParaL = 0;
    }
  }
  
  console.log("MATRIZ L: ");
  console.log(matrizL);
  console.log("MATRIZ U: ");
  console.log(matrizU);
  console.log("MATRIZ: ");
  console.log(matriz);
}


function inicializaMatrizEnCeros(dimension) {
  var U = [];
  for (let fil = 0; fil < dimension; fil++) {
    U[fil] = [];
    for (let col = 0; col < dimension; col++) U[fil][col] = 0;
  }

  return U;
}
