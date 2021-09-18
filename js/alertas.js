export const error = (mensaje) => {
  alert = document.getElementById("matriz_invalida");
  alert.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show animacion" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
  alert.classList.add("mostrar_alerta");
};

export const quitarAlerta = () => {
  alert = document.getElementById("matriz_invalida");
  alert.innerHTML = ``;
};
