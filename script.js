/* =====================================================
   PORTFOLIO — JAVASCRIPT
   ===================================================== */


/* =====================================================
   MENU MOBILE
   ===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

}


document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.textContent = "☰";
        }

    });

});


/* =====================================================
   HEADER AU DÉFILEMENT
   ===================================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =====================================================
   NAVIGATION ACTIVE
   ===================================================== */

const sections =
    document.querySelectorAll("main section");

const navigationLinks =
    document.querySelectorAll(".nav-link");


function updateActiveLink() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveLink
);


/* =====================================================
   ANNÉE AUTOMATIQUE
   ===================================================== */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   ANIMATION AU DÉFILEMENT
   ===================================================== */

const animatedElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-content, " +
        ".timeline-item, " +
        ".skill-card, " +
        ".project-card, " +
        ".vision-content, " +
        ".contact-content"
    );


const observer =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


/* =====================================================
   BOUTON PARCOURS
   ===================================================== */

const journeyButton =
    document.querySelector(
        'a[href="#parcours"]'
    );

if (journeyButton) {

    journeyButton.addEventListener(
        "click",
        () => {

            setTimeout(() => {

                journeyButton.textContent =
                    "Parcours découvert ✓";

            }, 500);

        }
    );

}


/* =====================================================
   FORMULAIRE
   ===================================================== */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const message =
                document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            const submitButton =
                contactForm.querySelector(".contact-submit");

            submitButton.disabled = true;
            submitButton.innerHTML = "Envoi en cours...";

            try {

                const response = await fetch(
                    contactForm.action,
                    {
                        method: "POST",
                        body: new FormData(contactForm),
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );

                if (response.ok) {

                    alert(
                        `Merci ${name} ! Votre message a bien été envoyé.`
                    );

                    contactForm.reset();

                } else {

                    alert(
                        "Une erreur est survenue. Veuillez réessayer."
                    );
                }

            } catch (error) {

                alert(
                    "Impossible d'envoyer le message pour le moment. Vérifiez votre connexion."
                );

            } finally {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    'Envoyer le message <span>→</span>';
            }
        }
    );
}


/* =====================================================
   MODE SOMBRE / MODE CLAIR
   ===================================================== */

const themeToggle =
    document.getElementById("themeToggle");


if (themeToggle) {

    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    /*
       Restaurer le thème enregistré
    */

    if (savedTheme === "light") {

        document.body.classList.add(
            "light-mode"
        );

        themeToggle.textContent = "☀";

    } else {

        themeToggle.textContent = "◐";

    }


    /*
       Changer le thème
    */

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-mode"
            );


            const lightMode =
                document.body.classList.contains(
                    "light-mode"
                );


            if (lightMode) {

                themeToggle.textContent = "☀";

                localStorage.setItem(
                    "portfolio-theme",
                    "light"
                );

            } else {

                themeToggle.textContent = "◐";

                localStorage.setItem(
                    "portfolio-theme",
                    "dark"
                );

            }

        }
    );

}


/* =====================================================
   TEST
   ===================================================== */

console.log(
    "Portfolio JavaScript chargé correctement."
);
