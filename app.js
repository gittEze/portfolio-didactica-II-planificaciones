// =====================================
// PORTFOLIO DIDÁCTICA II (ESTABLE)
// =====================================


// =====================================
// ELEMENTOS
// =====================================

const taskWrappers = document.querySelectorAll("#actividades-wrapper, #observaciones-wrapper");
const contentWrapper = document.getElementById("content-wrapper");
const contentFrame = document.getElementById("content-frame");
const sectionTitle = document.getElementById("section-title");
const backButtonContainer = document.getElementById("back-button-container");
const backButton = document.getElementById("back-to-list");
const navbar = document.querySelector(".navbar");
const clock = document.getElementById("live-clock");

let isTransitioning = false;


// =====================================
// CLICK EN ACTIVIDADES (DELEGACIÓN)
// =====================================

taskWrappers.forEach(wrapper => {

    wrapper.addEventListener("click", (e) => {

        const button = e.target.closest(".actividad-button");
        if (!button) return;

        if (e.target.closest(".activity-side-button")) return;

        if (isTransitioning) return;
        isTransitioning = true;

        const title = button.dataset.title;
        const link = button.dataset.link;

        sectionTitle.textContent = title;

        document
            .querySelectorAll(
                "#actividades-wrapper, #observaciones-wrapper"
            )
            .forEach(el => {
                el.classList.add("fade-out");
            });

        setTimeout(() => {

            document
                .querySelectorAll(
                    "#actividades-wrapper, #observaciones-wrapper"
                )
                .forEach(el => {
                    el.classList.add("hidden");
                });

            contentFrame.src = "";

            contentWrapper.classList.remove(
                "hidden",
                "fade-out"
            );

            requestAnimationFrame(() => {

                contentWrapper.classList.add("show");

                contentFrame.src = link;

                backButtonContainer.classList.add("visible");

                isTransitioning = false;

            });

        }, 250);

    });

});


// =====================================
// VOLVER AL LISTADO
// =====================================

function goBack() {

    if (isTransitioning) return;
    isTransitioning = true;

    contentWrapper.classList.remove("show");
    contentWrapper.classList.add("fade-out");

    setTimeout(() => {

        contentFrame.src = "";

        contentWrapper.classList.add("hidden");
        contentWrapper.classList.remove("fade-out");

        // Mostrar nuevamente las secciones
        document
            .querySelectorAll(
                "#actividades-wrapper, #observaciones-wrapper"
            )
            .forEach(el => {

                el.classList.remove(
                    "hidden",
                    "fade-out"
                );

            });

        sectionTitle.textContent = "Planificaciones:";

        backButtonContainer.classList.remove("visible");

        isTransitioning = false;

    }, 250);

}


// =====================================
// BOTÓN VOLVER
// =====================================

backButton.addEventListener("click", goBack);


// =====================================
// ESC PARA VOLVER
// =====================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && !contentWrapper.classList.contains("hidden")) {
        goBack();
    }

});


// =====================================
// ANIMACIÓN TARJETAS
// =====================================

const cards = document.querySelectorAll(".project-card");

cards.forEach((card, index) => {

    card.style.animationDelay = `${index * 0.08}s`;

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-4px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0px)";
    });

});


// =====================================
// RELOJ
// =====================================

function updateClock() {

    if (!clock) return;

    const now = new Date();

    clock.textContent = now.toLocaleTimeString("es-UY", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

setInterval(updateClock, 1000);
updateClock();


// =====================================
// NAVBAR SCROLL
// =====================================

window.addEventListener("scroll", () => {

    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 15);

});


// =====================================
// INICIO
// =====================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");
    window.scrollTo(0, 0);

});