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
  factorizacionDoolittleOCrout(matriz, "CROUT");
};

btnDoolittle.onclick = function () {
  var matriz = validarYObtenerMatriz(matrizDOM);
  console.log(matriz);
  factorizacionDoolittleOCrout(matriz, "DOOLITTLE");
};

btnCholesky.onclick = function () {
  var matriz = validarYObtenerMatriz(matrizDOM);
  console.log(matriz);
  factorizacionCholesky(matriz);
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
  let dimension = matriz.length;
  let productoParaU = 0;
  let productoParaL = 0;
  let productoParaDiagonal = 0;

  var matrizL = inicializaMatrizEnCeros(dimension);
  var matrizU = inicializaMatrizEnCeros(dimension);


  for (let k = 0; k < dimension; k++) {
    if (tipoFactorizacion == DOOLITTLE) {
      matrizL[k][k] = 1;

      for (let s = 0; s < k; s++) {
        productoParaDiagonal += matrizL[k][s] * matrizU[s][k];
      }
      matrizU[k][k] = (matriz[k][k] - productoParaDiagonal) / matrizL[k][k];
    }

    if (tipoFactorizacion == CROUT) {
      matrizU[k][k] = 1;

      for (let s = 0; s < k; s++) {
        productoParaDiagonal += matrizL[k][s] * matrizU[s][k];
      }

      matrizL[k][k] = (matriz[k][k] - productoParaDiagonal) / matrizU[k][k];
    }

    productoParaDiagonal = 0;

    for (let j = k + 1; j < dimension; j++) {
      for (let p = 0; p < k; p++) {
        productoParaU += matrizL[k][p] * matrizU[p][j];
      }
      matrizU[k][j] = (matriz[k][j] - productoParaU) / matrizL[k][k];
      productoParaU = 0;
    }

    for (let i = k + 1; i < dimension; i++) {
      for (let p = 0; p < k; p++) {
        productoParaL += matrizL[i][p] * matrizU[p][k];
      }
      matrizL[i][k] = (matriz[i][k] - productoParaL) / matrizU[k][k];
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

function factorizacionCholesky(matriz) {
  let dimension = matriz.length;
  let sumaProductoParaL = 0;
  let sumaProducto = 0;
  let matrizL = inicializaMatrizEnCeros(dimension);
  let matrizU = inicializaMatrizEnCeros(dimension);

  for (let i = 0; i < dimension; i++)  {
    for (let j = 0; j <= i; j++) {
        let sum = 0;
        for (let k = 0; k < j; k++) {
            sum += matrizL[i][k] * matrizL[j][k];
        }
        if (i == j) matrizL[i][i] = Math.sqrt(matriz[i][i] - sum);
        else        matrizL[i][j] = 1 / matrizL[j][j] * (matriz[i][j] - sum);
    }
    if (matrizL[i][i] <= 0) {
        throw new RuntimeException("Matrix not positive definite");
    }
}
  console.log("MATRIZ L: ");
  console.log(matrizL);
  console.log("MATRIZ: ");
  console.log(matriz);
}

function inicializaMatrizEnCeros(dimension) {
  var matrizCeros = [];
  for (let fil = 0; fil < dimension; fil++) {
    matrizCeros[fil] = [];
    for (let col = 0; col < dimension; col++) matrizCeros[fil][col] = 0;
  }

  return matrizCeros;
}
