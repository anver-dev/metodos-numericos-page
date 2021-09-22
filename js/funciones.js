export const algoritmosLU = {
  doolittleOCrout(matriz, tipoFactorizacion) {
    let dimension = matriz.length;
    let productoParaU = 0;
    let productoParaL = 0;
    let productoParaDiagonal = 0;
  
    let matrizL = inicializaMatrizEnCeros(dimension);
    let matrizU = inicializaMatrizEnCeros(dimension);
  
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

    const result = {
      matrizL,
      matrizU
    }

    return result;
  },

  cholesky(matriz) {
    let dimension = matriz.length;
    let matrizL = inicializaMatrizEnCeros(dimension);
  
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j <= i; j++) {
        let sum = 0;
        for (let k = 0; k < j; k++) {
          sum += matrizL[i][k] * matrizL[j][k];
        }
        if (i == j) matrizL[i][i] = parseFloat((Math.sqrt(matriz[i][i] - sum)).toFixed(4));
        else matrizL[i][j] = parseFloat(((1 / matrizL[j][j]) * (matriz[i][j] - sum)).toFixed(4));
      }
      if (matrizL[i][i] <= 0) {
        throw new Exception("Matrix not positive definite");
      }
    }
    return matrizL;
  }
}

function validarYObtenerMatriz(m) {
  let matriz = [];
  let filas = m.value.split("\n");

  if (filas.length < 2) {
    console.log("Matriz invalida: tamaño de filas");
  } else {
    for (let fil = 0; fil < filas.length; fil++) {
      let columnas = filas[fil].split(" ");
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


function reduccionGauss(matriz, pivoteoParcial) {
  let matrizAuxiliar = JSON.parse(JSON.stringify(matriz));
  let dimension = matrizAuxiliar.length;
  let matrizFinal = inicializaMatrizEnCeros(dimension);
  let constante = 0;

  for (let k = 0; k < dimension - 1; k++) {
    
    if (pivoteoParcial && k == 0) {
      matrizAuxiliar = aplicarPivoteoParcial(matrizAuxiliar, k);
    }
    
    console.log("Matriz aplicando pivoteo: ");
    console.log(matrizAuxiliar);
    
    for (let i = k + 1; i < dimension; i++) {
      constante = matrizAuxiliar[i][k] / matrizAuxiliar[k][k];
      for (let j = k; j < dimension; j++) {
        matrizAuxiliar[i][j] = matrizAuxiliar[i][j] - (constante * matrizAuxiliar[k][j]);
      }
    }

    console.log("Matriz aplicando gauss: ");
    console.log(matrizAuxiliar);
   
  }
}

function aplicarPivoteoParcial(matrizP, fila) {
  let mayor = 0;
  let filaMayor = 0;
  let dimension = matrizP.length;
  let arregloAuxiliar = [];

  console.log("aplicando pivoteo. Fila: " + fila);
  for (let i = 0; i < dimension; i++) {
    if (Math.abs(matrizP[i][fila]) > mayor) {
      mayor = Math.abs(matrizP[i][fila]);
      filaMayor = i;
    }
  }

  for (let j = 0; j < dimension; j++) {
    arregloAuxiliar[j] = matrizP[fila][j];
  }

  for (let j = 0; j < dimension; j++) {
    matrizP[fila][j] = matrizP[filaMayor][j];
  }

  for (let j = 0; j < dimension; j++) {
    matrizP[filaMayor][j] = arregloAuxiliar[j];
  }

  return matrizP;
}

function inicializaMatrizEnCeros(dimension) {
  let matrizCeros = [];
  for (let fil = 0; fil < dimension; fil++) {
    matrizCeros[fil] = [];
    for (let col = 0; col < dimension; col++) matrizCeros[fil][col] = 0;
  }

  return matrizCeros;
}
