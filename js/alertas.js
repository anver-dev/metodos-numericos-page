const $alert = document.getElementById("alerta");

const construirAlerta = function (_mensaje, _tipoAlerta) {
  $alert.innerHTML = `
    <div class="alert alert-${_tipoAlerta} alert-dismissible fade show animacion content_collapse" role="alert">
        ${_mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

  $alert.classList.add("mostrar_alerta");
};

export const error = (_mensaje) => {
  construirAlerta(_mensaje, "danger");
};

export const warning = (_mensaje) => {
  construirAlerta(_mensaje, "warning");
};

export const quitarAlerta = () => {
  $alert.innerHTML = ``;
};

export const choleskyResuelto = function () {
  const $divTituloCholesky = document.querySelector(
    "#tituloResultadosCholesky"
  );

  $divTituloCholesky.innerHTML = `<h6><i class='bx bx-check'></i> La matriz resultado es: </h6><hr>`;
};
