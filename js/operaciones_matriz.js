export default function inicial(dimension = 3) {
  const $cuerpoTabla = document.querySelector("#tabla_matriz");
  
  if(dimension < 2) throw "El minimo para la matriz es 2x2";

  $cuerpoTabla.innerHTML = " ";
  
  for (let i = 0; i < dimension; i++) {
    const $tr = document.createElement("tr");

    for (let j = 0; j < dimension; j++) {
      let $td = document.createElement("td");
      let celda = document.createElement("input");

      celda.setAttribute("type", "text");
      celda.setAttribute("class", "form-control celda");
      celda.setAttribute("required", "true");
      celda.setAttribute("id", `${i}${j}`);

      $td.appendChild(celda);
      $tr.appendChild($td);
    }

    $cuerpoTabla.appendChild($tr);
  }

  document.getElementById("00").focus();
}

export const manejoDeMatriz = {
  aumentarTamanio() {
    let dimension =
      document.querySelector("#matriz tbody tr").childElementCount;
    inicial(dimension + 1);
  },
  disminuirTamanio() {
    let dimension =
      document.querySelector("#matriz tbody tr").childElementCount;
    inicial(dimension - 1);
  },
};

export const imprimeMatriz = matriz => {
  let dimension = matriz.length;
  var $resultados = document.getElementById("resultados");

  let $tablaResultados = document.createElement("table");
  let $cuerpoTablaResultados = document.createElement("tbody");

  for (let i = 0; i < dimension; i++) {
    const $tr = document.createElement("tr");

    for (let j = 0; j < dimension; j++) {
      let $td = document.createElement("td");
      let celda = document.createElement("input");

      celda.setAttribute("type", "text");
      celda.setAttribute("class", "form-control celda");
      celda.setAttribute("required", "true");
      celda.setAttribute("id", `${i}${j}`);
      celda.disabled = true;

      celda.value = matriz[i][j];

      $td.appendChild(celda);
      $tr.appendChild($td);
      
    }
    $cuerpoTablaResultados.appendChild($tr);
  }

  $tablaResultados.appendChild($cuerpoTablaResultados);
  $resultados.appendChild($tablaResultados);
  $resultados.classList.add("animacion")
}

export const obtenerMatriz = () => {
  let matriz = [];
  let dimension = document.querySelector("#matriz tbody tr").childElementCount;
  for (let i = 0; i < dimension; i++) {
    let fila = [];
    for (let j = 0; j < dimension; j++) {
      let valor = document.getElementById(`${i}${j}`).value;

      if (isNaN(valor) || isNaN(parseFloat(valor))) {
        throw new Error("Inserte valores válidos");
        break;
      } else {
        fila[j] = parseFloat(valor);
      }
    }
    if (fila.length != dimension) {
      matriz = [];
      throw new Error("");
    } else {
      matriz.push(fila);
    }
  }
  console.log(matriz);

  return matriz;
};