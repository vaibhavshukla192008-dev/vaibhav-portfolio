/* =========================================================
   VAIBHAV SHUKLA — FUTURISTIC HUD SYSTEM
   Main Interface Controller
========================================================= */


/* =========================================================
   01. SYSTEM BOOT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const bootScreen = document.getElementById("bootScreen");
    const bootProgress = document.getElementById("bootProgress");
    const bootText = document.getElementById("bootText");

    const bootMessages = [
        "INITIALIZING SYSTEM...",
        "LOADING INTERFACE...",
        "CALIBRATING HUD...",
        "CONNECTING MODULES...",
        "VERIFYING SYSTEM...",
        "ALL SYSTEMS ONLINE"
    ];

    let progress = 0;
    let messageIndex = 0;

    const bootInterval = setInterval(() => {

        progress += Math.floor(Math.random() * 8) + 4;

        if (progress > 100) {
            progress = 100;
        }

        if (bootProgress) {
            bootProgress.style.width = `${progress}%`;
        }

        const newMessageIndex = Math.min(
            Math.floor(progress / 20),
            bootMessages.length - 1
        );

        if (newMessageIndex !== messageIndex) {
            messageIndex = newMessageIndex;

            if (bootText) {
                bootText.textContent = bootMessages[messageIndex];
            }
        }

        if (progress >= 100) {

            clearInterval(bootInterval);

            if (bootText) {
                bootText.textContent = "ALL SYSTEMS ONLINE";
            }

            setTimeout(() => {

                if (bootScreen) {
                    bootScreen.classList.add("hidden");
                }

                document.body.classList.add("system-ready");

            }, 700);
        }

    }, 120);


    /* =========================================================
       02. LIVE SYSTEM CLOCK
    ========================================================= */

    function updateSystemTime() {

        const timeElement =
            document.getElementById("systemTime");

        if (!timeElement) {
            return;
        }

        const now = new Date();

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        timeElement.textContent =
            `${hours}:${minutes}:${seconds}`;
    }

    updateSystemTime();

    setInterval(updateSystemTime, 1000);


    /* =========================================================
       03. MOUSE HUD TRACKING
    ========================================================= */

    document.addEventListener("mousemove", (event) => {

        const x = `${event.clientX}px`;
        const y = `${event.clientY}px`;

        document.documentElement.style.setProperty(
            "--mouse-x",
            x
        );

        document.documentElement.style.setProperty(
            "--mouse-y",
            y
        );

    });


    /* =========================================================
       04. NAVIGATION ACTIVE STATE
    ========================================================= */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navButtons = document.querySelectorAll(
        ".nav-button"
    );

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 250;

            if (window.scrollY >= sectionTop) {
                currentSection =
                    section.getAttribute("id");
            }

        });

        navButtons.forEach((button) => {

            button.classList.remove("active");

            const onclickValue =
                button.getAttribute("onclick");

            if (
                onclickValue &&
                onclickValue.includes(currentSection)
            ) {
                button.classList.add("active");
            }

        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =========================================================
       05. REVEAL ELEMENTS ON SCROLL
    ========================================================= */

    const revealElements = document.querySelectorAll(
        ".interface-section, .profile-card, .skill-card, .project-card"
    );

    revealElements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =========================================================
       06. MODULE HOVER EFFECT
    ========================================================= */

    const modules =
        document.querySelectorAll(".module");

    modules.forEach((module) => {

        module.addEventListener("mouseenter", () => {

            module.style.setProperty(
                "--module-glow",
                "1"
            );

        });

        module.addEventListener("mouseleave", () => {

            module.style.setProperty(
                "--module-glow",
                "0"
            );

        });

    });


    /* =========================================================
       07. KEYBOARD CONTROLS
    ========================================================= */

    document.addEventListener("keydown", (event) => {

        /*
            ESC = CLOSE MODULE
        */

        if (event.key === "Escape") {
            closeSystem();
        }


        /*
            ENTER = OPEN SYSTEM
        */

        if (
            event.key === "Enter" &&
            !document.querySelector(
                ".module-overlay.active"
            )
        ) {
            openSystem();
        }

    });


    /* =========================================================
       08. CONSOLE SYSTEM MESSAGE
    ========================================================= */

    console.log(
        "%c VAIBHAV SYSTEM ONLINE ",
        "background:#00eaff;color:#001216;padding:8px;font-weight:bold;"
    );

    console.log(
        "%c PERSONAL DIGITAL INTERFACE // VS-01 ",
        "color:#00eaff;"
    );

});


/* =========================================================
   09. SCROLL TO SECTION
========================================================= */

function scrollToSection(sectionId) {

    const section =
        document.getElementById(sectionId);

    if (!section) {
        return;
    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   10. MODULE DATABASE
========================================================= */

const moduleData = {

    "CONTENT": {
        title: "CONTENT CREATION",
        description:
            "Digital content creation focused on study content, creative ideas, storytelling and audience-focused media."
    },

    "WEB DEVELOPMENT": {
        title: "WEB DEVELOPMENT",
        description:
            "Building modern web interfaces and digital systems using frontend technologies and Flask-based development."
    },

    "VIDEO EDITING": {
        title: "VIDEO EDITING",
        description:
            "Visual editing and storytelling for creator content, study videos, social media and digital projects."
    },

    "CANVA DESIGN": {
        title: "CANVA DESIGN",
        description:
            "Creating presentations, graphics, social media visuals, branding assets and creative digital designs."
    },

    "CREATIVE PROJECTS": {
        title: "CREATIVE PROJECTS",
        description:
            "A collection of active websites, esports systems, educational projects and creative presentation work."
    },


    /* =========================
       PROJECTS
    ========================= */

    "GARG GREEN ENERGY": {
        title: "GARG GREEN ENERGY",
        description:
            "Professional renewable-energy website project designed around solar solutions, clean energy and modern digital presentation.",

        url:
            "https://garg-green-energy-portal.onrender.com"
    },


    "SHIVA ACADEMY": {
        title: "SHIVA ACADEMY",
        description:
            "Educational website project built as a live web application.",

        url:
            "https://shiva-academy-tq7j.onrender.com"
    },


    "ESPORTS CAREER CONTINUITY": {
        title: "ESPORTS CAREER CONTINUITY",

        description:
            "A career-continuity project focused on esports player profiles, career records and digital career tracking.",

        url:
            "https://ecc-career-continuity.onrender.com/"
    },


    "PPT 1": {
        title: "PPT 1",

        description:
            "Creative presentation project designed in Canva.",

        url:
            "https://www.canva.com/design/DAHTZJFh4tw/UYxIBJgloiQBTvrFKAKPbA/edit"
    },


    "PPT 2": {
        title: "PPT 2",

        description:
            "Creative presentation project designed in Canva.",

        url:
            "https://www.canva.com/design/DAHUEHrYtDk/ie1u_zfE-SOVbcQDLyJNBg/edit?utm_content=DAHUEHrYtDk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
    }

};


/* =========================================================
   11. OPEN MODULE
========================================================= */

function openModule(moduleName) {

    const overlay =
        document.getElementById("moduleOverlay");

    const title =
        document.getElementById("moduleTitle");

    const description =
        document.getElementById("moduleDescription");

    const status =
        document.getElementById("moduleStatus");

    const action =
        document.getElementById("moduleAction");


    if (!overlay) {
        return;
    }


    const data =
        moduleData[moduleName] || {

            title: moduleName,

            description:
                "System module initialized successfully."

        };


    if (title) {

        title.textContent =
            data.title;

    }


    if (description) {

        description.textContent =
            data.description;

    }


    if (status) {

        status.textContent =
            "ONLINE";

    }


    /*
        PROJECT ACTION
    */

    if (action) {

        if (data.url) {

            action.href =
                data.url;

            action.target =
                "_blank";

            action.rel =
                "noopener noreferrer";

            action.style.display =
                "inline-flex";

            action.textContent =
                "OPEN PROJECT ↗";

        }

        else {

            action.removeAttribute(
                "href"
            );

            action.style.display =
                "none";

        }

    }


    overlay.classList.add("active");

    document.body.style.overflow =
        "hidden";
}


/* =========================================================
   12. OPEN MAIN SYSTEM
========================================================= */

function openSystem() {

    const overlay =
        document.getElementById("moduleOverlay");

    const title =
        document.getElementById("moduleTitle");

    const description =
        document.getElementById("moduleDescription");

    const action =
        document.getElementById("moduleAction");


    if (!overlay) {
        return;
    }


    if (title) {

        title.textContent =
            "VAIBHAV SYSTEM";

    }


    if (description) {

        description.textContent =
            "Personal command interface initialized. Select a module to explore the system.";

    }


    if (action) {

        action.removeAttribute(
            "href"
        );

        action.style.display =
            "none";

    }


    overlay.classList.add("active");

    document.body.style.overflow =
        "hidden";
}


/* =========================================================
   13. CLOSE SYSTEM
========================================================= */

function closeSystem() {

    const overlay =
        document.getElementById("moduleOverlay");

    if (!overlay) {
        return;
    }


    overlay.classList.remove("active");

    document.body.style.overflow =
        "";
}


/* =========================================================
   14. CLOSE WHEN CLICKING OUTSIDE WINDOW
========================================================= */

document.addEventListener("click", (event) => {

    const overlay =
        document.getElementById("moduleOverlay");

    const windowElement =
        document.querySelector(".module-window");


    if (!overlay || !windowElement) {
        return;
    }


    if (
        overlay.classList.contains("active") &&
        event.target === overlay
    ) {

        closeSystem();

    }

});


/* =========================================================
   15. RANDOM HUD FLICKER
========================================================= */

setInterval(() => {

    const elements =
        document.querySelectorAll(
            ".panel-code, .module-number, .card-code"
        );


    if (!elements.length) {
        return;
    }


    const randomElement =
        elements[
            Math.floor(
                Math.random() *
                elements.length
            )
        ];


    randomElement.style.opacity =
        "0.35";


    setTimeout(() => {

        randomElement.style.opacity =
            "1";

    }, 120);

}, 2500);


/* =========================================================
   16. SYSTEM STATUS
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add(
        "interface-loaded"
    );

});