import { decimalToFraction } from "./util.js";
import { error, quitarAlerta, choleskyResuelto, warning} from "./alertas.js";

export const crearMatriz = function (dimension = 3) {
  const $cuerpoTabla = document.querySelector("#tabla_matriz");

  if (dimension > 6) throw RangeError("El máximo para la matriz es 6x6");
  if (dimension < 2) throw RangeError("El mínimo para la matriz es 2x2");

  $cuerpoTabla.innerHTML = ``;

  for (let i = 0; i < dimension; i++) {
    const $tr = document.createElement("tr");

    for (let j = 0; j < dimension; j++) {
      let $td = document.createElement("td");
      let celda = document.createElement("input");

      celda.setAttribute("type", "text");
      celda.setAttribute("class", "form-control celda");
      celda.setAttribute("required", "true");
      celda.setAttribute("id", `${i}${j}`);
      celda.setAttribute("placeholder", `0`);

      $td.appendChild(celda);
      $tr.appendChild($td);
    }

    $cuerpoTabla.appendChild($tr);
  }

  document.getElementById("00").focus();
};

export const manejoDeMatriz = {
  aumentarTamanio() {
    let dimension =
      document.querySelector("#matriz tbody tr").childElementCount;
    console.log(document.querySelector("#matriz tbody tr"));
    crearMatriz(dimension + 1);
  },
  disminuirTamanio() {
    let dimension =
      document.querySelector("#matriz tbody tr").childElementCount;
    crearMatriz(dimension - 1);
  },
  limpiarCeldas() {
    let dimension =
      document.querySelector("#matriz tbody tr").childElementCount;
    crearMatriz(dimension);
  },
};

export const imprimeMatriz = (matriz) => {
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

      let valorEnFraccion = decimalToFraction(matriz[i][j]).display;
      
      if(valorEnFraccion === "0/1") valorEnFraccion = "0";
      if(valorEnFraccion === "1/1") valorEnFraccion = "1"
      
      celda.value =  valorEnFraccion;

      $td.appendChild(celda);
      $tr.appendChild($td);
    }
    $cuerpoTablaResultados.appendChild($tr);
  }

  $tablaResultados.appendChild($cuerpoTablaResultados);
  $resultados.appendChild($tablaResultados);
  $resultados.classList.add("animacion");
  $resultados.classList.add("ms-3")
  choleskyResuelto();
};

export const obtenerMatriz = () => {
  let matriz = [];
  let dimension = document.querySelector("#matriz tbody tr").childElementCount;
  for (let i = 0; i < dimension; i++) {
    let fila = [];
    for (let j = 0; j < dimension; j++) {
      let valor = document.getElementById(`${i}${j}`).value;

      if (isNaN(valor) || isNaN(parseFloat(valor))) {
        throw new Error("Inserte valores válidos");
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

document.getElementById("agregarCeldas").addEventListener(
  "click",
  function (event) {
    try {
      console.info("agregando filas");
      quitarAlerta();
      manejoDeMatriz.aumentarTamanio();
      document.getElementById("00").focus();
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

document.getElementById("quitarCeldas").addEventListener(
  "click",
  function (event) {
    try {
      quitarAlerta();
      manejoDeMatriz.disminuirTamanio();
      document.getElementById("00").focus();
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

document.getElementById("limpiarCeldas").addEventListener(
  "click",
  function (event) {
    try {
      quitarAlerta();
      manejoDeMatriz.limpiarCeldas();
      document.getElementById("00").focus();
    } catch (mensaje) {
      error(mensaje);
    }
  },
  false
);