document.addEventListener("DOMContentLoaded", function (event) {
    const $navsLinks = document.querySelectorAll(".nav_link");
    const $btnsCard = document.querySelectorAll(".btn-active-card");

    const ocultaTodos = function(clase) {
        const $divs = document.querySelectorAll(clase);

        $divs.forEach(element => {
            if(element.classList.contains("visible")) element.classList.remove("visible");
            element.classList.add("oculto");
        });
    }

    const desactivaBotones = function(clase) {
        const $btns = document.querySelectorAll(clase);

        $btns.forEach(element => {
            if(element.classList.contains("active")) element.classList.remove("active");
        });
    }

    const clickEnNav = function(evento) {
        const idDiv = this.getAttribute("href");
        
        const $divAMostrar = document.querySelector(idDiv);

        ocultaTodos(".contenido");
        
        $divAMostrar.classList.remove("oculto");
        $divAMostrar.classList.add("visible");
        $divAMostrar.focus();
    }

    const clickEnBtnCard = function(evento) {
        desactivaBotones(".btn-active-card");

        const $divs = document.querySelectorAll(".content_collapse");

        $divs.forEach(div => {
            div.classList.remove("show");
        })

        this.classList.add("active");
    }

    $navsLinks.forEach(nav => {
        nav.addEventListener("click", clickEnNav);
    });

    $btnsCard.forEach(btn => {
        btn.addEventListener("click", clickEnBtnCard);
    });

});
