import { getCookie, setCookie } from './cookies.js';
// 1. Définition centralisée des Easter Eggs
export const easterEggsList = [
    {
        name: "konamiEgg",
        label: "Konami Code",
        activeCookie: "konamiEggActive",
        unlockCookie: "konamiEgg",
        themeClass: "konami-theme",
        onActivate: function () {
            document.body.classList.add("konami-theme");
            if (!document.title.includes("👑"))
                document.title = "👑 " + document.title;
            const klayFooter = document.querySelector('footer a p');
            if (klayFooter)
                klayFooter.classList.add("rainbow-footer");
            const h1 = document.querySelector("h1");
            if (h1) {
                h1.style.color = "gold";
                h1.style.textShadow = "0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4)";
            }
        },
        onDeactivate: function () {
            document.body.classList.remove("konami-theme");
            document.title = document.title.replace(/^👑\s*/, "");
            const klayFooter = document.querySelector('footer a p');
            if (klayFooter)
                klayFooter.classList.remove("rainbow-footer");
            const h1 = document.querySelector("h1");
            if (h1) {
                h1.style.color = "";
                h1.style.textShadow = "";
            }
        }
    },
    {
        name: "reverseEgg",
        label: "Mode Inversé",
        activeCookie: "reverseEggActive",
        unlockCookie: "reverseEgg",
        themeClass: "reverse-theme",
        onActivate: function () {
            document.body.classList.add("reverse-theme");
        },
        onDeactivate: function () {
            document.body.classList.remove("reverse-theme");
        }
    },
    {
        name: "companionEgg",
        label: "Compagnon secret",
        activeCookie: "companionEggActive",
        unlockCookie: "companionEgg",
        themeClass: "companion-theme",
        onActivate: function () {
            if (document.getElementById("companion-egg"))
                return;
            const companion = document.createElement("div");
            companion.id = "companion-egg";
            companion.className = "companion-animal";
            companion.innerHTML = `
                <svg width="60" height="48" viewBox="0 0 60 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <ellipse cx="30" cy="38" rx="18" ry="8" fill="#222" opacity="0.15"/>
                        <g class="cat-tail">
                            <rect x="44" y="34" width="12" height="6" rx="3" fill="#F4C542"/>
                        </g>
                        <ellipse cx="30" cy="28" rx="16" ry="12" fill="#F4C542"/>
                        <g class="cat-ear-left">
                            <polygon points="16,18 20,24 22,20" fill="#F4C542"/>
                        </g>
                        <g class="cat-ear-right">
                            <polygon points="44,18 40,24 38,20" fill="#F4C542"/>
                        </g>
                        <ellipse cx="22" cy="26" rx="3" ry="4" fill="#fff"/>
                        <ellipse cx="38" cy="26" rx="3" ry="4" fill="#fff"/>
                        <ellipse cx="22" cy="27" rx="1" ry="2" fill="#222"/>
                        <ellipse cx="38" cy="27" rx="1" ry="2" fill="#222"/>
                        <ellipse cx="30" cy="32" rx="3" ry="2" fill="#fff"/>
                        <ellipse cx="30" cy="33" rx="1.5" ry="1" fill="#222"/>
                        <ellipse cx="18" cy="36" rx="2" ry="1" fill="#F4C542"/>
                        <ellipse cx="42" cy="36" rx="2" ry="1" fill="#F4C542"/>
                    </g>
                </svg>
            `;
            Object.assign(companion.style, {
                position: "fixed",
                bottom: "20px",
                left: "0",
                width: "60px",
                height: "48px",
                zIndex: "9999",
                pointerEvents: "none",
                userSelect: "none"
            });
            document.body.appendChild(companion);
            // Mouvement naturel
            let direction = 1;
            let pos = 0;
            let speed = 1.5 + Math.random() * 1.5;
            let isPaused = false;
            let bouncePhase = 0;
            let lastTimestamp = null;
            function animateSVG() {
                // Queue qui remue
                const tail = companion.querySelector('.cat-tail');
                if (tail) {
                    const t = Date.now() / 300;
                    tail.setAttribute("transform", `rotate(${Math.sin(t) * 20} 50 37)`);
                }
                // Oreilles qui bougent
                const earL = companion.querySelector('.cat-ear-left');
                const earR = companion.querySelector('.cat-ear-right');
                if (earL)
                    earL.setAttribute("transform", `rotate(${Math.sin(Date.now() / 400) * 8} 18 18)`);
                if (earR)
                    earR.setAttribute("transform", `rotate(${-Math.sin(Date.now() / 400) * 8} 42 18)`);
            }
            function moveCompanion(timestamp) {
                if (!lastTimestamp)
                    lastTimestamp = timestamp;
                const dt = (timestamp - lastTimestamp) / 16; // normalise à ~60fps
                lastTimestamp = timestamp;
                if (!isPaused) {
                    const max = window.innerWidth - 60;
                    pos += direction * speed * dt;
                    // Rebond aux bords
                    if (pos >= max) {
                        direction = -1;
                        pos = max;
                        speed = 1.5 + Math.random() * 1.5;
                    }
                    if (pos <= 0) {
                        direction = 1;
                        pos = 0;
                        speed = 1.5 + Math.random() * 1.5;
                    }
                    // Animation de rebond
                    bouncePhase += 0.08 * dt + Math.random() * 0.01;
                    const bounce = 8 * Math.abs(Math.sin(bouncePhase));
                    companion.style.left = pos + "px";
                    companion.style.bottom = (20 + bounce) + "px";
                    companion.style.transform = direction === 1 ? "scaleX(1)" : "scaleX(-1)";
                    // Pause aléatoire
                    if (Math.random() < 0.003) {
                        isPaused = true;
                        setTimeout(() => {
                            isPaused = false;
                            speed = 1.5 + Math.random() * 1.5;
                        }, 400 + Math.random() * 1200);
                    }
                }
                animateSVG();
                companion._animFrame = requestAnimationFrame(moveCompanion);
            }
            companion._animFrame = requestAnimationFrame(moveCompanion);
        },
        onDeactivate: function () {
            const companion = document.getElementById("companion-egg");
            if (companion) {
                cancelAnimationFrame(companion._animFrame);
                companion.remove();
            }
        }
    },
    // Ajoute ici d'autres eggs au même format
];
// 2. Initialisation des Easter Eggs (détection)
export function initEasterEggs() {
    // Konami
    let konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], konamiIndex = 0;
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === konami[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konami.length) {
                unlockEgg("konamiEgg");
                konamiIndex = 0;
            }
        }
        else {
            konamiIndex = 0;
        }
    });
    // Reverse
    let reverseBuffer = "";
    window.addEventListener("keydown", function (e) {
        var _a;
        if (["INPUT", "TEXTAREA"].includes(((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.tagName) || ""))
            return;
        reverseBuffer += e.key.toLowerCase();
        if (reverseBuffer.length > 7)
            reverseBuffer = reverseBuffer.slice(-7);
        if (reverseBuffer.endsWith("reverse")) {
            unlockEgg("reverseEgg");
            reverseBuffer = "";
        }
    });
    if (easterEggsList.some(egg => getCookie(egg.unlockCookie))) {
        createEasterEggGearButton();
    }
    easterEggsList.forEach(egg => {
        if (getCookie(egg.activeCookie) === "1") {
            if (egg.onActivate)
                egg.onActivate();
        }
    });
}
// 3. Fonction pour débloquer un egg
export function unlockEgg(eggName) {
    const egg = easterEggsList.find(e => e.name === eggName);
    if (!egg)
        return;
    let firstTime = !getCookie(egg.unlockCookie);
    if (firstTime) {
        setCookie(egg.unlockCookie, "1", 365);
        setCookie(egg.activeCookie, "1", 365);
        document.dispatchEvent(new Event("egg-unlocked"));
        if (egg.onActivate)
            egg.onActivate();
        createEasterEggGearButton();
        showEggUnlockedModal(egg.label, true);
        // Met à jour le menu si déjà ouvert
        if (document.querySelector('.easter-egg-modal')) {
            updateEasterEggModal(document.querySelector('.easter-egg-modal'));
        }
    }
    else {
        // toggle activation
        let isActive = getCookie(egg.activeCookie) === "1";
        setCookie(egg.activeCookie, isActive ? "0" : "1", 365);
        if (isActive && egg.onDeactivate)
            egg.onDeactivate();
        if (!isActive && egg.onActivate)
            egg.onActivate();
        showEggUnlockedModal(egg.label, false);
        if (document.querySelector('.easter-egg-modal')) {
            updateEasterEggModal(document.querySelector('.easter-egg-modal'));
        }
    }
}
// 4. Affiche un message temporaire lors du déblocage
export function showEggUnlockedModal(label, firstTime) {
    const modal = document.createElement("div");
    modal.className = "egg-unlocked-modal";
    modal.innerHTML = `
        <span style="font-size:2em;display:block;margin-bottom:8px;">🥚</span>
        <span style="font-size:1.2em;">${firstTime ? "Easter Egg débloqué !" : "Easter Egg déjà débloqué !"}</span><br>
        <span style="color:#00ff8f;font-weight:bold;">${label} activé !</span>
    `;
    Object.assign(modal.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(30,30,60,0.97)",
        color: "#fff",
        padding: "24px 36px",
        borderRadius: "14px",
        fontSize: "1.5em",
        fontWeight: "bold",
        zIndex: "9999",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        textAlign: "center"
    });
    document.body.appendChild(modal);
    setTimeout(() => modal.remove(), 2000);
}
// 5. Génère dynamiquement le bouton et le modal
export function createEasterEggGearButton() {
    const article = document.querySelector("article");
    if (document.getElementById("easter-egg-gear-btn"))
        return;
    const modal = document.createElement("div");
    modal.className = "easter-egg-modal";
    Object.assign(modal.style, {
        position: "absolute",
        top: "45px",
        left: "0",
        padding: "18px 24px",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
        zIndex: "1001",
        minWidth: "220px",
        fontSize: "1em",
        display: "none",
        flexDirection: "column",
        gap: "12px"
    });
    article === null || article === void 0 ? void 0 : article.appendChild(modal);
    const btn = document.createElement("button");
    btn.id = "easter-egg-gear-btn";
    btn.title = "Easter Eggs";
    btn.innerHTML = `<ion-icon name="settings-outline"></ion-icon>`;
    btn.className = "easter-egg-gear-btn";
    const iconBtn = btn.querySelector("ion-icon");
    btn.addEventListener("click", (e) => {
        iconBtn.style.transform = iconBtn.style.transform === "rotate(180deg)" ? "rotate(0deg)" : "rotate(180deg)";
        e.stopPropagation();
        if (modal) {
            modal.style.display = modal.style.display === "none" ? "flex" : "none";
        }
    });
    document.addEventListener("click", (e) => {
        iconBtn.style.transform = "rotate(0deg)";
        if (modal && !modal.contains(e.target) && !btn.contains(e.target)) {
            modal.style.display = "none";
        }
    });
    // Style du bouton
    Object.assign(btn.style, {
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: "1000",
        border: "none",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.3em",
        cursor: "pointer",
        transition: "background 0.5s"
    });
    article === null || article === void 0 ? void 0 : article.appendChild(btn);
    // Titre
    const titleDiv = document.createElement("div");
    titleDiv.style.marginBottom = "8px";
    titleDiv.style.fontWeight = "bold";
    titleDiv.textContent = "Easter Eggs";
    modal.appendChild(titleDiv);
    // Compteur d'easter eggs débloqués aligné à droite du titre, collé au bord droit du modal
    titleDiv.style.display = "flex";
    titleDiv.style.justifyContent = "space-between";
    titleDiv.style.alignItems = "center";
    const unlockedCount = easterEggsList.filter(egg => getCookie(egg.unlockCookie)).length;
    const totalCount = easterEggsList.length;
    const counterDiv = document.createElement("div");
    counterDiv.style.fontSize = "0.95em";
    counterDiv.style.color = "#00ff8f";
    counterDiv.style.fontWeight = "bold";
    counterDiv.style.marginLeft = "16px";
    counterDiv.textContent = `${unlockedCount} / ${totalCount} débloqués`;
    titleDiv.appendChild(counterDiv);
    function updateCounter() {
        const unlockedCount = easterEggsList.filter(egg => getCookie(egg.unlockCookie)).length;
        counterDiv.textContent = `${unlockedCount} / ${easterEggsList.length} débloqués`;
    }
    document.addEventListener("egg-unlocked", updateCounter);
    updateEasterEggModal(modal);
    if (document.querySelector('.easter-egg-modal')) {
        updateEasterEggModal(document.querySelector('.easter-egg-modal'));
    }
}
export function updateEasterEggModal(modal) {
    // Vide le contenu sauf le titre (premier enfant)
    while (modal.children.length > 1) {
        modal.removeChild(modal.lastChild);
    }
    easterEggsList.forEach(egg => {
        const unlocked = !!getCookie(egg.unlockCookie);
        const checked = getCookie(egg.activeCookie) === "1";
        const row = document.createElement("div");
        row.className = "egg-switch-row";
        const label = document.createElement("span");
        label.textContent = egg.label;
        row.appendChild(label);
        const switchLabel = document.createElement("label");
        switchLabel.className = "switch";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = egg.name + "-switch";
        input.checked = checked;
        input.disabled = !unlocked;
        const slider = document.createElement("span");
        slider.className = "slider";
        switchLabel.appendChild(input);
        switchLabel.appendChild(slider);
        row.appendChild(switchLabel);
        if (!unlocked) {
            row.style.filter = "blur(4px) grayscale(1)";
            row.style.opacity = "0.5";
            row.title = "Débloque cet Easter Egg pour l'activer !";
        }
        input.addEventListener("change", function () {
            setCookie(egg.activeCookie, this.checked ? "1" : "0", 365);
            if (this.checked && egg.onActivate)
                egg.onActivate();
            if (!this.checked && egg.onDeactivate)
                egg.onDeactivate();
        });
        modal.appendChild(row);
    });
}
// Easter Egg : compagnon après 1h cumulée sur la page
export function trackCompanionEggTime() {
    const EGG_NAME = "companionEgg";
    const UNLOCK_COOKIE = "companionEgg";
    const STORAGE_KEY = "companionEggTime";
    const UNLOCK_TIME = 3600; // en secondes (1h)
    if (getCookie(UNLOCK_COOKIE))
        return; // déjà débloqué
    let time = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    setInterval(() => {
        time++;
        localStorage.setItem(STORAGE_KEY, time.toString());
        if (time >= UNLOCK_TIME && !getCookie(UNLOCK_COOKIE)) {
            unlockEgg(EGG_NAME);
        }
    }, 1000);
}
export default {
    easterEggsList,
    initEasterEggs,
    unlockEgg,
    trackCompanionEggTime,
    showEggUnlockedModal,
    createEasterEggGearButton,
    updateEasterEggModal
};
