/* =========================================================
   VAIBHAV SHUKLA — FUTURISTIC HUD SYSTEM
   Main Interface Controller
========================================================= */


/* =========================================================
   01. ADMIN CREATOR CODE
========================================================= */

const ADMIN_CODE_NAME = "VI1019";


/* =========================================================
   02. VOICE SYSTEM
========================================================= */

function speakSystem(message) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    try {

        window.speechSynthesis.cancel();

        const speech =
            new SpeechSynthesisUtterance(message);

        speech.lang = "en-US";
        speech.rate = 0.92;
        speech.pitch = 1;
        speech.volume = 1;

        window.speechSynthesis.speak(speech);

    } catch (error) {

        console.warn(
            "Voice system unavailable:",
            error
        );

    }
}


/* =========================================================
   03. ACCESS SCREEN
========================================================= */

function showAccessScreen() {

    const accessScreen =
        document.getElementById("accessScreen");

    if (!accessScreen) {
        return;
    }

    accessScreen.classList.add("active");

    document.body.classList.add(
        "access-control-active"
    );

    const voiceStatus =
        document.getElementById(
            "accessVoiceStatus"
        );

    if (voiceStatus) {

        voiceStatus.textContent =
            "WELCOME TO OUR VS SYSTEM";

    }

    setTimeout(() => {

        speakSystem(
            "Welcome to our VS system."
        );

    }, 250);

}


/* =========================================================
   04. HIDE ACCESS SCREEN
========================================================= */

function unlockPortfolio() {

    const accessScreen =
        document.getElementById("accessScreen");

    if (!accessScreen) {
        return;
    }

    accessScreen.classList.remove("active");

    accessScreen.classList.add("unlocked");

    document.body.classList.remove(
        "access-control-active"
    );

    document.body.classList.add(
        "portfolio-unlocked"
    );

    setTimeout(() => {

        accessScreen.style.display = "none";

    }, 700);

}


/* =========================================================
   05. VISITOR ACCESS
========================================================= */

function setupVisitorAccess() {

    const visitorButton =
        document.getElementById(
            "visitorAccess"
        );

    if (!visitorButton) {
        return;
    }

    visitorButton.addEventListener(
        "click",
        () => {

            const voiceStatus =
                document.getElementById(
                    "accessVoiceStatus"
                );

            if (voiceStatus) {

                voiceStatus.textContent =
                    "VISITOR ACCESS GRANTED";

            }

            speakSystem(
                "Hello, welcome to our VS system."
            );

            visitorButton.disabled = true;

            setTimeout(() => {

                unlockPortfolio();

            }, 1300);

        }
    );

}


/* =========================================================
   06. ADMIN ACCESS SCREEN
========================================================= */

function setupAdminAccess() {

    const adminButton =
        document.getElementById(
            "adminAccess"
        );

    const accessOptions =
        document.getElementById(
            "accessOptions"
        );

    const adminVerification =
        document.getElementById(
            "adminVerification"
        );

    const adminInput =
        document.getElementById(
            "adminCodeInput"
        );

    if (
        !adminButton ||
        !accessOptions ||
        !adminVerification
    ) {
        return;
    }

    adminButton.addEventListener(
        "click",
        () => {

            accessOptions.style.display =
                "none";

            adminVerification.hidden =
                false;

            const voiceStatus =
                document.getElementById(
                    "accessVoiceStatus"
                );

            if (voiceStatus) {

                voiceStatus.textContent =
                    "ADMIN CHANNEL // VERIFICATION REQUIRED";

            }

            if (adminInput) {

                adminInput.value = "";

                setTimeout(() => {

                    adminInput.focus();

                }, 200);

            }

        }
    );

}


/* =========================================================
   07. BACK TO ACCESS OPTIONS
========================================================= */

function setupBackButton() {

    const backButton =
        document.getElementById(
            "backToAccess"
        );

    const accessOptions =
        document.getElementById(
            "accessOptions"
        );

    const adminVerification =
        document.getElementById(
            "adminVerification"
        );

    const adminMessage =
        document.getElementById(
            "adminMessage"
        );

    if (
        !backButton ||
        !accessOptions ||
        !adminVerification
    ) {
        return;
    }

    backButton.addEventListener(
        "click",
        () => {

            adminVerification.hidden =
                true;

            accessOptions.style.display =
                "grid";

            if (adminMessage) {

                adminMessage.textContent =
                    "";

                adminMessage.className =
                    "admin-message";

            }

            const voiceStatus =
                document.getElementById(
                    "accessVoiceStatus"
                );

            if (voiceStatus) {

                voiceStatus.textContent =
                    "SYSTEM INITIALIZED";

            }

        }
    );

}


/* =========================================================
   08. ADMIN VERIFICATION
========================================================= */

function setupAdminVerification() {

    const verifyButton =
        document.getElementById(
            "verifyAdmin"
        );

    const adminInput =
        document.getElementById(
            "adminCodeInput"
        );

    const adminMessage =
        document.getElementById(
            "adminMessage"
        );

    const voiceStatus =
        document.getElementById(
            "accessVoiceStatus"
        );

    if (
        !verifyButton ||
        !adminInput ||
        !adminMessage
    ) {
        return;
    }


    function verifyCode() {

        const enteredCode =
            adminInput.value
                .trim()
                .toLowerCase();


        /* =============================================
           CORRECT CODE
        ============================================== */

        if (
            enteredCode ===
            ADMIN_CODE_NAME
                .trim()
                .toLowerCase()
        ) {

            adminMessage.textContent =
                "ACCESS VERIFIED // WELCOME BOSS";

            adminMessage.className =
                "admin-message success";

            if (voiceStatus) {

                voiceStatus.textContent =
                    "ADMIN ACCESS GRANTED";

            }

            speakSystem(
                "Welcome boss."
            );

            verifyButton.disabled =
                true;

            adminInput.disabled =
                true;

            setTimeout(() => {

                unlockPortfolio();

            }, 1500);

            return;

        }


        /* =============================================
           WRONG CODE
        ============================================== */

        adminMessage.textContent =
            "ACCESS DENIED // INVALID CODE";

        adminMessage.className =
            "admin-message error";

        if (voiceStatus) {

            voiceStatus.textContent =
                "ACCESS DENIED // RETRY";

        }

        adminInput.value = "";

        adminInput.focus();

    }


    verifyButton.addEventListener(
        "click",
        verifyCode
    );


    /* ENTER KEY */

    adminInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                verifyCode();

            }

        }
    );

}


/* =========================================================
   09. SYSTEM BOOT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const bootScreen =
            document.getElementById(
                "bootScreen"
            );

        const bootProgress =
            document.getElementById(
                "bootProgress"
            );

        const bootText =
            document.getElementById(
                "bootText"
            );


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


        const bootInterval =
            setInterval(() => {

                progress +=
                    Math.floor(
                        Math.random() * 8
                    ) + 4;


                if (progress > 100) {

                    progress = 100;

                }


                if (bootProgress) {

                    bootProgress.style.width =
                        `${progress}%`;

                }


                const newMessageIndex =
                    Math.min(
                        Math.floor(
                            progress / 20
                        ),
                        bootMessages.length - 1
                    );


                if (
                    newMessageIndex !==
                    messageIndex
                ) {

                    messageIndex =
                        newMessageIndex;


                    if (bootText) {

                        bootText.textContent =
                            bootMessages[
                                messageIndex
                            ];

                    }

                }


                if (progress >= 100) {

                    clearInterval(
                        bootInterval
                    );


                    if (bootText) {

                        bootText.textContent =
                            "ALL SYSTEMS ONLINE";

                    }


                    /*
                        Allow the final boot
                        animation to complete.
                    */

                    setTimeout(() => {

                        if (bootScreen) {

                            bootScreen.classList.add(
                                "hidden"
                            );

                        }

                        document.body.classList.add(
                            "system-ready"
                        );


                        /*
                            Access screen appears
                            after boot has fully faded.
                        */

                        setTimeout(() => {

                            showAccessScreen();

                        }, 900);


                    }, 700);

                }

            }, 120);


        /* =================================================
           ACCESS SYSTEM SETUP
        ================================================== */

        setupVisitorAccess();

        setupAdminAccess();

        setupBackButton();

        setupAdminVerification();


        /* =================================================
           LIVE SYSTEM CLOCK
        ================================================== */

        function updateSystemTime() {

            const timeElement =
                document.getElementById(
                    "systemTime"
                );

            if (!timeElement) {
                return;
            }


            const now =
                new Date();


            const hours =
                String(
                    now.getHours()
                ).padStart(2, "0");


            const minutes =
                String(
                    now.getMinutes()
                ).padStart(2, "0");


            const seconds =
                String(
                    now.getSeconds()
                ).padStart(2, "0");


            timeElement.textContent =
                `${hours}:${minutes}:${seconds}`;

        }


        updateSystemTime();

        setInterval(
            updateSystemTime,
            1000
        );


        /* =================================================
           MOUSE HUD TRACKING
        ================================================== */

        document.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    `${event.clientX}px`;

                const y =
                    `${event.clientY}px`;


                document.documentElement.style.setProperty(
                    "--mouse-x",
                    x
                );


                document.documentElement.style.setProperty(
                    "--mouse-y",
                    y
                );

            }
        );


        /* =================================================
           NAVIGATION ACTIVE STATE
        ================================================== */

        const sections =
            document.querySelectorAll(
                "section[id]"
            );


        const navButtons =
            document.querySelectorAll(
                ".nav-button"
            );


        function updateActiveNavigation() {

            let currentSection = "";


            sections.forEach(
                (section) => {

                    const sectionTop =
                        section.offsetTop -
                        250;


                    if (
                        window.scrollY >=
                        sectionTop
                    ) {

                        currentSection =
                            section.getAttribute(
                                "id"
                            );

                    }

                }
            );


            navButtons.forEach(
                (button) => {

                    button.classList.remove(
                        "active"
                    );


                    const onclickValue =
                        button.getAttribute(
                            "onclick"
                        );


                    if (
                        onclickValue &&
                        onclickValue.includes(
                            currentSection
                        )
                    ) {

                        button.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        window.addEventListener(
            "scroll",
            updateActiveNavigation
        );


        updateActiveNavigation();


        /* =================================================
           REVEAL ON SCROLL
        ================================================== */

        const revealElements =
            document.querySelectorAll(
                ".interface-section, .profile-card, .skill-card, .project-card"
            );


        revealElements.forEach(
            (element) => {

                element.style.opacity =
                    "0";

                element.style.transform =
                    "translateY(25px)";

                element.style.transition =
                    "opacity 0.7s ease, transform 0.7s ease";

            }
        );


        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";


                                entry.target.style.transform =
                                    "translateY(0)";


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );


        /* =================================================
           MODULE HOVER
        ================================================== */

        const modules =
            document.querySelectorAll(
                ".module"
            );


        modules.forEach(
            (module) => {

                module.addEventListener(
                    "mouseenter",
                    () => {

                        module.style.setProperty(
                            "--module-glow",
                            "1"
                        );

                    }
                );


                module.addEventListener(
                    "mouseleave",
                    () => {

                        module.style.setProperty(
                            "--module-glow",
                            "0"
                        );

                    }
                );

            }
        );


        /* =================================================
           KEYBOARD CONTROLS
        ================================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeSystem();

                }


                const activeElement =
                    document.activeElement;


                const isTyping =
                    activeElement &&
                    (
                        activeElement.tagName ===
                        "INPUT" ||
                        activeElement.tagName ===
                        "TEXTAREA"
                    );


                if (
                    event.key === "Enter" &&
                    !isTyping &&
                    !document.querySelector(
                        ".module-overlay.active"
                    ) &&
                    document.body.classList.contains(
                        "portfolio-unlocked"
                    )
                ) {

                    openSystem();

                }

            }
        );


        /* =================================================
           SYSTEM CONSOLE
        ================================================== */

        console.log(
            "%c VAIBHAV SYSTEM ONLINE ",
            "background:#00eaff;color:#001216;padding:8px;font-weight:bold;"
        );

        console.log(
            "%c PERSONAL DIGITAL INTERFACE // VS-01 ",
            "color:#00eaff;"
        );


    }
);


/* =========================================================
   10. SCROLL TO SECTION
========================================================= */

function scrollToSection(sectionId) {

    const section =
        document.getElementById(
            sectionId
        );


    if (!section) {
        return;
    }


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   11. MODULE DATABASE
========================================================= */

const moduleData = {

    "CONTENT": {

        title:
            "CONTENT CREATION",

        description:
            "Digital content creation focused on study content, creative ideas, storytelling and audience-focused media."

    },


    "WEB DEVELOPMENT": {

        title:
            "WEB DEVELOPMENT",

        description:
            "Building modern web interfaces and digital systems using frontend technologies and Flask-based development."

    },


    "VIDEO EDITING": {

        title:
            "VIDEO EDITING",

        description:
            "Visual editing and storytelling for creator content, study videos, social media and digital projects."

    },


    "CANVA DESIGN": {

        title:
            "CANVA DESIGN",

        description:
            "Creating presentations, graphics, social media visuals, branding assets and creative digital designs."

    },


    "CREATIVE PROJECTS": {

        title:
            "CREATIVE PROJECTS",

        description:
            "A collection of active digital experiments, websites, creative platforms and personal technology projects."

    },


    "GARG GREEN ENERGY": {

        title:
            "GARG GREEN ENERGY",

        description:
            "A professional renewable-energy website project designed around solar solutions, clean energy and modern digital presentation."

    }

};


/* =========================================================
   12. OPEN MODULE
========================================================= */

function openModule(moduleName) {

    const overlay =
        document.getElementById(
            "moduleOverlay"
        );


    const title =
        document.getElementById(
            "moduleTitle"
        );


    const description =
        document.getElementById(
            "moduleDescription"
        );


    const status =
        document.getElementById(
            "moduleStatus"
        );


    if (!overlay) {
        return;
    }


    const data =
        moduleData[moduleName] || {

            title:
                moduleName,

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


    overlay.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   13. OPEN MAIN SYSTEM
========================================================= */

function openSystem() {

    const overlay =
        document.getElementById(
            "moduleOverlay"
        );


    const title =
        document.getElementById(
            "moduleTitle"
        );


    const description =
        document.getElementById(
            "moduleDescription"
        );


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


    overlay.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   14. CLOSE SYSTEM
========================================================= */

function closeSystem() {

    const overlay =
        document.getElementById(
            "moduleOverlay"
        );


    if (!overlay) {
        return;
    }


    overlay.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   15. CLOSE MODULE OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        const overlay =
            document.getElementById(
                "moduleOverlay"
            );


        const windowElement =
            document.querySelector(
                ".module-window"
            );


        if (
            !overlay ||
            !windowElement
        ) {

            return;

        }


        if (
            overlay.classList.contains(
                "active"
            ) &&
            event.target === overlay
        ) {

            closeSystem();

        }

    }
);


/* =========================================================
   16. RANDOM HUD FLICKER
========================================================= */

setInterval(
    () => {

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


        setTimeout(
            () => {

                randomElement.style.opacity =
                    "1";

            },
            120
        );

    },
    2500
);


/* =========================================================
   17. SYSTEM STATUS
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "interface-loaded"
        );

    }
);
/* =========================================================
   I10 // ORIGINAL HERO ANIMATION SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const mainInterface =
        document.getElementById("mainInterface");

    if (!mainInterface) {
        return;
    }

    /* ---------- CREATE I10 CONTAINER ---------- */

    const i10Hero = document.createElement("div");

    i10Hero.id = "i10Hero";

    i10Hero.innerHTML = `
        <div class="i10-flight">

            <div class="i10-energy"></div>
            <div class="i10-energy two"></div>
            <div class="i10-energy three"></div>

            <div class="i10-body">

                <div class="i10-head">
                    <div class="i10-visor"></div>
                </div>

                <div class="i10-neck"></div>

                <div class="i10-chest">
                    <div class="i10-core"></div>
                </div>

                <div class="i10-arm left"></div>
                <div class="i10-arm right"></div>

                <div class="i10-hand left"></div>
                <div class="i10-hand right"></div>

                <div class="i10-leg left"></div>
                <div class="i10-leg right"></div>

            </div>

            <div class="i10-label">
                I10 // FLIGHT SYSTEM
            </div>

        </div>
    `;

    mainInterface.appendChild(i10Hero);


    /* =====================================================
       CURSOR TRACKING
    ===================================================== */

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let targetRX = 0;
    let targetRY = 0;

    let currentRX = 0;
    let currentRY = 0;


    document.addEventListener("mousemove", (event) => {

        const x =
            (event.clientX / window.innerWidth) - 0.5;

        const y =
            (event.clientY / window.innerHeight) - 0.5;

        targetX = x * 45;
        targetY = y * 32;

        targetRY = x * 12;
        targetRX = -y * 8;

    });


    /* =====================================================
       SMOOTH HERO MOVEMENT
    ===================================================== */

    function animateI10() {

        currentX +=
            (targetX - currentX) * 0.055;

        currentY +=
            (targetY - currentY) * 0.055;

        currentRX +=
            (targetRX - currentRX) * 0.055;

        currentRY +=
            (targetRY - currentRY) * 0.055;


        i10Hero.style.setProperty(
            "--i10-x",
            `${currentX}px`
        );

        i10Hero.style.setProperty(
            "--i10-y",
            `${currentY}px`
        );

        i10Hero.style.setProperty(
            "--i10-rx",
            `${currentRX}deg`
        );

        i10Hero.style.setProperty(
            "--i10-ry",
            `${currentRY}deg`
        );


        requestAnimationFrame(animateI10);
    }

    animateI10();


    /* =====================================================
       I10 SYSTEM STATUS
    ===================================================== */

    console.log(
        "%c I10 HERO SYSTEM ONLINE ",
        "background:#00eaff;color:#001216;padding:8px;font-weight:bold;"
    );

});
/* =========================================================
   I10 // CURSOR REACTION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const i10Flight =
        document.querySelector(".i10-flight");

    if (!i10Flight) {
        return;
    }


    /* ---------- TARGETING RING ---------- */

    if (!i10Flight.querySelector(".i10-target-ring")) {

        const ring =
            document.createElement("div");

        ring.className =
            "i10-target-ring";

        i10Flight.prepend(ring);
    }


    let mouseX = 0;
    let mouseY = 0;

    let smoothX = 0;
    let smoothY = 0;

    let lastMouseX = 0;
    let lastMouseY = 0;

    let mouseSpeed = 0;


    /* ---------- CURSOR INPUT ---------- */

    document.addEventListener("mousemove", (event) => {

        mouseX =
            (event.clientX / window.innerWidth) - 0.5;

        mouseY =
            (event.clientY / window.innerHeight) - 0.5;


        const dx =
            event.clientX - lastMouseX;

        const dy =
            event.clientY - lastMouseY;

        mouseSpeed =
            Math.min(
                Math.sqrt(dx * dx + dy * dy),
                35
            );


        lastMouseX = event.clientX;
        lastMouseY = event.clientY;


        i10Flight.classList.add(
            "i10-reacting"
        );

        i10Flight.classList.remove(
            "i10-idle"
        );

    });


    /* ---------- SMOOTH REACTION ---------- */

    function updateI10() {

        smoothX +=
            (mouseX - smoothX) * 0.07;

        smoothY +=
            (mouseY - smoothY) * 0.07;


        const reactX =
            smoothX * 22;

        const reactY =
            smoothY * 16;


        const tiltY =
            smoothX * 18;

        const tiltX =
            smoothY * -12;


        i10Flight.style.setProperty(
            "--i10-react-x",
            `${reactX}px`
        );

        i10Flight.style.setProperty(
            "--i10-react-y",
            `${reactY}px`
        );

        i10Flight.style.setProperty(
            "--i10-tilt-x",
            `${tiltX}deg`
        );

        i10Flight.style.setProperty(
            "--i10-tilt-y",
            `${tiltY}deg`
        );


        const energy =
            Math.min(
                1 + mouseSpeed / 20,
                2.2
            );

        i10Flight.style.setProperty(
            "--i10-energy-power",
            energy
        );


        requestAnimationFrame(
            updateI10
        );
    }


    updateI10();


    /* ---------- IDLE DETECTION ---------- */

    let idleTimer;

    document.addEventListener("mousemove", () => {

        clearTimeout(idleTimer);

        idleTimer = setTimeout(() => {

            i10Flight.classList.remove(
                "i10-reacting"
            );

            i10Flight.classList.add(
                "i10-idle"
            );

        }, 450);

    });


    console.log(
        "%c I10 CURSOR REACTION ONLINE ",
        "background:#00eaff;color:#001216;padding:8px;font-weight:bold;"
    );

});