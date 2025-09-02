import { getCookie, setCookie } from './cookies.js';
import { canvaData } from '../config/canvaConfig.js';
import { profileData } from '../config/profileConfig.js';
import { themes } from '../config/themeConfig.js';
import { animationBackground } from '../config/animationConfig.js';
export function applyFirstTheme(theme) {
    const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = getCookie("theme");
    console.log("Dark theme media quary:", darkThemeMediaQuery.matches);
    if (savedTheme) {
        if (savedTheme === "dark") {
            loadThemeConfig(theme.darkTheme ? theme : theme.opposite);
            document.body.classList.add("dark-theme");
        }
        else {
            loadThemeConfig(theme.darkTheme ? theme.opposite : theme);
        }
    }
    else {
        if (darkThemeMediaQuery.matches) {
            if (theme.darkTheme) {
                loadThemeConfig(theme);
            }
            else {
                loadThemeConfig(theme.opposite);
                document.body.classList.add("dark-theme");
            }
        }
        else {
            if (theme.darkTheme) {
                loadThemeConfig(theme.opposite);
                document.body.classList.add("dark-theme");
            }
            else {
                loadThemeConfig(theme);
            }
        }
    }
}
export function setIconBasedOnTheme(theme) {
    const iconElement = document.getElementById("theme-icon");
    if (document.body.classList.contains("dark-theme") || theme.darkTheme) {
        iconElement.name = "moon-outline";
    }
    else {
        iconElement.name = "sunny-outline";
    }
}
export function loadThemeConfig(theme) {
    applyTheme(theme);
    setIconBasedOnTheme(theme);
}
export function toggleTheme(theme) {
    const currentTheme = document.body.classList.contains("dark-theme") ? theme : theme.opposite;
    document.body.classList.toggle("dark-theme");
    applyTheme(currentTheme);
    setIconBasedOnTheme(currentTheme);
    setCookie("theme", document.body.classList.contains("dark-theme") ? "dark" : "light", 365);
}
export function createToggleThemeButton(theme) {
    const button = document.createElement("button");
    button.className = "theme-toggle-button";
    const icon = document.createElement("ion-icon");
    icon.id = "theme-icon";
    icon.name = theme.darkTheme ? "moon-outline" : "sunny-outline";
    button.appendChild(icon);
    button.addEventListener("click", () => toggleTheme(theme));
    const article = document.getElementById("profile-article");
    article === null || article === void 0 ? void 0 : article.appendChild(button);
    if (!theme) {
        button.style.display = "none";
    }
}
export function applyTheme(theme) {
    const article = document.getElementById("profile-article");
    article.style.background = theme.background;
    article.style.color = theme.textColor;
    document.querySelectorAll(".discord-box").forEach((box) => {
        const htmlBox = box;
        htmlBox.style.backgroundColor = theme.buttonBackground;
        htmlBox.style.color = theme.buttonTextColor;
    });
    document.querySelectorAll(".discord-box").forEach((box) => {
        const htmlBox = box;
        htmlBox.addEventListener("mouseover", () => {
            htmlBox.style.backgroundColor = theme.buttonHoverBackground;
            htmlBox.style.boxShadow = "0 0 50px " + theme.buttonHoverBackground;
        });
        htmlBox.addEventListener("mouseout", () => {
            htmlBox.style.backgroundColor = theme.buttonBackground;
            htmlBox.style.boxShadow = "none";
        });
    });
    if (profileData.buttonThemeEnable !== 1) {
        document.querySelectorAll("a").forEach((link) => {
            const htmlLink = link;
            htmlLink.style.color = theme.textColor;
        });
        document.querySelectorAll("a:hover").forEach((link) => {
            const htmlLink = link;
            htmlLink.style.color = theme.linkHoverColor;
        });
    }
    const emailDiv = document.querySelector(".email");
    const emailHover = document.querySelector(".email a");
    if (emailDiv) {
        emailDiv.style.backgroundColor = theme.buttonBackground;
        emailDiv.style.color = theme.buttonTextColor;
    }
    if (emailHover) {
        emailHover.addEventListener("mouseover", () => {
            if (emailDiv) {
                emailDiv.style.backgroundColor = theme.buttonHoverBackground;
                emailDiv.style.boxShadow = `0 0 10px ${theme.buttonHoverBackground}`;
                emailHover.style.color = theme.buttonTextColor;
            }
        });
        emailHover.addEventListener("mouseout", () => {
            if (emailDiv) {
                emailDiv.style.backgroundColor = theme.buttonBackground;
                emailDiv.style.boxShadow = `0 0 10px ${theme.buttonBackground}`;
                emailHover.style.color = theme.textColor;
            }
        });
    }
    const themeToggle = document.querySelector(".theme-toggle-button");
    if (themeToggle) {
        themeToggle.style.backgroundColor = theme.buttonBackground;
        themeToggle.style.color = theme.textColor;
        themeToggle.tabIndex = 1;
        themeToggle.addEventListener("mouseover", () => {
            themeToggle.style.backgroundColor = theme.buttonHoverBackground;
            themeToggle.style.boxShadow = `0 0 10px ${theme.buttonHoverBackground}`;
        });
        themeToggle.addEventListener("mouseout", () => {
            themeToggle.style.backgroundColor = theme.buttonBackground;
            themeToggle.style.boxShadow = `0 0 10px ${theme.buttonBackground}`;
        });
    }
    // Apply the new property articleHoverBoxShadow
    const styleSheet = document.styleSheets[0];
    // Vérifications de sécurité pour éviter les valeurs invalides
    if (theme.articleHoverBoxShadow && theme.articleHoverBoxShadow.trim() !== '') {
        try {
            styleSheet.insertRule(`
                article:hover {
                    box-shadow: ${theme.articleHoverBoxShadow};
                }
            `, styleSheet.cssRules.length);
        }
        catch (e) {
            console.warn('Invalid articleHoverBoxShadow value:', theme.articleHoverBoxShadow, e);
        }
    }
    // Apply scrollbar styles avec vérifications
    try {
        styleSheet.insertRule(`
            ::-webkit-scrollbar {
                width: 12px;
            }
        `, styleSheet.cssRules.length);
    }
    catch (e) {
        console.warn('Error adding scrollbar rule:', e);
    }
    if (theme.background && theme.background.trim() !== '') {
        try {
            styleSheet.insertRule(`
                ::-webkit-scrollbar-track {
                    background: ${theme.background};
                    border-radius: 10px;
                    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
                }
            `, styleSheet.cssRules.length);
        }
        catch (e) {
            console.warn('Invalid background value for scrollbar track:', theme.background, e);
        }
    }
    if (theme.buttonBackground && theme.buttonHoverBackground &&
        theme.buttonBackground.trim() !== '' && theme.buttonHoverBackground.trim() !== '' &&
        theme.background && theme.background.trim() !== '') {
        try {
            styleSheet.insertRule(`
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(45deg, ${theme.buttonBackground}, ${theme.buttonHoverBackground});
                    border-radius: 10px;
                    border: 3px solid ${theme.background};
                    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
                }
            `, styleSheet.cssRules.length);
        }
        catch (e) {
            console.warn('Invalid button colors for scrollbar thumb:', theme.buttonBackground, theme.buttonHoverBackground, e);
        }
    }
    if (theme.buttonHoverBackground && theme.buttonBackground &&
        theme.buttonHoverBackground.trim() !== '' && theme.buttonBackground.trim() !== '') {
        try {
            styleSheet.insertRule(`
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(45deg, ${theme.buttonHoverBackground}, ${theme.buttonBackground});
                }
            `, styleSheet.cssRules.length);
        }
        catch (e) {
            console.warn('Invalid button colors for scrollbar thumb hover:', theme.buttonHoverBackground, theme.buttonBackground, e);
        }
    }
    const easterEggsBtn = document.querySelector(".easter-egg-gear-btn");
    const easterEggsModal = document.querySelector(".easter-egg-modal");
    if (easterEggsBtn) {
        easterEggsBtn.style.backgroundColor = theme.buttonBackground;
        easterEggsBtn.style.color = theme.textColor;
        easterEggsBtn.addEventListener("mouseover", () => {
            if (easterEggsBtn) {
                easterEggsBtn.style.backgroundColor = theme.buttonHoverBackground;
                easterEggsBtn.style.boxShadow = `0 0 10px ${theme.buttonHoverBackground}`;
            }
        });
        easterEggsBtn.addEventListener("mouseout", () => {
            if (easterEggsBtn) {
                easterEggsBtn.style.backgroundColor = theme.buttonBackground;
                easterEggsBtn.style.boxShadow = `0 0 10px ${theme.buttonBackground}`;
            }
        });
    }
    else {
        console.log("Easter eggs button not found - will be created when Easter eggs are unlocked.");
    }
    if (easterEggsModal) {
        easterEggsModal.style.background = theme.background;
        easterEggsModal.style.color = theme.textColor;
        easterEggsModal.style.border = `2px solid ${theme.buttonHoverBackground}`;
        easterEggsModal.style.boxShadow = `0 0 30px ${theme.buttonHoverBackground}`;
        easterEggsModal.style.borderRadius = "12px";
        easterEggsModal.style.padding = "24px";
        easterEggsModal.style.transition = "background 0.3s, color 0.3s, box-shadow 0.3s";
    }
    else {
        console.log("Easter eggs modal not found - will be created when needed.");
    }
    // Appliquer le style à tous les boutons .show-desc-btn
    const boutonsAffichageDescription = document.querySelectorAll(".show-desc-btn");
    boutonsAffichageDescription.forEach((bouton) => {
        const htmlBouton = bouton;
        htmlBouton.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        htmlBouton.style.color = theme.textColor;
        htmlBouton.addEventListener("mouseover", () => {
            htmlBouton.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
            htmlBouton.style.boxShadow = `0 0 10px ${theme.buttonHoverBackground}`;
        });
        htmlBouton.addEventListener("mouseout", () => {
            htmlBouton.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            htmlBouton.style.boxShadow = `0 0 10px ${theme.buttonBackground}`;
        });
    });
}
export function setBackgroundStyles(profileData) {
    if (Array.isArray(profileData.background)) {
        document.body.style.background = `linear-gradient(${profileData.degBackgroundColor}deg, ${profileData.background.join(", ")})`;
        document.body.style.backgroundSize = "cover";
    }
    else {
        document.body.style.background = `url(${profileData.background})`;
        document.body.style.backgroundSize = `${profileData.backgroundSize}%`;
    }
}
export function applyAnimation(animation, animationEnabled) {
    const article = document.getElementById("profile-article");
    if (animationEnabled) {
        article.style.animation = animation.keyframes;
    }
}
export function applyAnimationButton(animation, animationButtonEnabled, delayAnimationButton) {
    const articleChildren = document.querySelectorAll("#profile-article > *:not(.easter-egg-modal)");
    if (animationButtonEnabled) {
        articleChildren.forEach((child, index) => {
            const htmlChild = child;
            htmlChild.style.animationDelay = `${(index + 1) * delayAnimationButton}s`;
            htmlChild.style.animation = `${animation.keyframes} ${animation.duration || delayAnimationButton * index}s`;
            htmlChild.style.animationFillMode = "backwards";
        });
    }
}
export function applyDynamicStyles(profileData, styleSheet, selectedAnimationBackgroundIndex, EnableAnimationBackground, animationDurationBackground, useCanvas, selectedCanvasIndex) {
    if (useCanvas) {
        const canvas = document.createElement("canvas");
        canvas.id = "backgroundCanvas";
        document.body.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.id = "container";
        try {
            // Pour Matrix effect, nous devons charger les dépendances d'abord
            if (canvaData[selectedCanvasIndex].fileNames === 'matrix-effect/app.js') {
                console.log("Loading Matrix Effect animation...");
                // Fonction helper pour charger un script
                const loadScript = (src) => {
                    return new Promise((resolve, reject) => {
                        console.log("Loading script:", src);
                        const script = document.createElement("script");
                        script.src = src;
                        script.onload = () => {
                            console.log("Script loaded successfully:", src);
                            resolve();
                        };
                        script.onerror = (error) => {
                            console.error("Script failed to load:", src, error);
                            reject(error);
                        };
                        document.body.appendChild(script);
                    });
                };
                // Charger les scripts dans l'ordre
                loadScript('./canvaAnimation/matrix-effect/effect.js')
                    .then(() => {
                    console.log("Effect.js loaded, checking window.Effect:", typeof window.Effect);
                    return loadScript('./canvaAnimation/matrix-effect/symbol.js');
                })
                    .then(() => {
                    console.log("Symbol.js loaded, checking window.Symbol:", typeof window.Symbol);
                    return loadScript('./canvaAnimation/matrix-effect/app.js');
                })
                    .then(() => {
                    console.log("App.js loaded, checking runCanvasAnimation:", typeof runCanvasAnimation);
                    if (typeof runCanvasAnimation === "function") {
                        runCanvasAnimation(ctx, canvas);
                    }
                    else {
                        console.error("runCanvasAnimation is not a function");
                        setBackgroundStyles(profileData);
                    }
                })
                    .catch((error) => {
                    console.error("Error loading Matrix effect scripts:", error);
                    setBackgroundStyles(profileData);
                });
            }
            else {
                // Pour les autres animations
                const script = document.createElement("script");
                script.src = `./canvaAnimation/${canvaData[selectedCanvasIndex].fileNames}`;
                document.body.appendChild(script);
                script.onload = () => {
                    if (typeof runCanvasAnimation === "function") {
                        runCanvasAnimation(ctx, canvas);
                    }
                    else {
                        console.error("runCanvasAnimation is not a function");
                        setBackgroundStyles(profileData);
                    }
                };
            }
        }
        catch (error) {
            console.error("Error loading canvas animation:", error);
            setBackgroundStyles(profileData);
        }
    }
    else {
        setBackgroundStyles(profileData);
    }
    if (EnableAnimationBackground && !useCanvas && !Array.isArray(profileData.background)) {
        document.body.style.animation = `${animationBackground[selectedAnimationBackgroundIndex].keyframes} ${animationDurationBackground}s`;
    }
    else {
        document.body.style.animation = "none";
    }
    // Appliquer le neon si activé avec vérifications
    if (profileData.neonEnable === 0) {
        try {
            styleSheet.insertRule(`
                .profile-pic-wrapper::before,
                .profile-pic-wrapper::after {
                    display: none;
                }
            `, styleSheet.cssRules.length);
        }
        catch (e) {
            console.warn('Error adding neon disable rule:', e);
        }
    }
    else {
        if (profileData.neonColors && Array.isArray(profileData.neonColors) && profileData.neonColors.length > 0) {
            const neonGradient = profileData.neonColors.filter(color => color && color.trim() !== '').join(", ");
            if (neonGradient) {
                try {
                    styleSheet.insertRule(`
                        .profile-pic-wrapper::after, .profile-pic-wrapper::before {
                            background: linear-gradient(45deg, ${neonGradient});
                        }
                    `, styleSheet.cssRules.length);
                }
                catch (e) {
                    console.warn('Invalid neon colors:', profileData.neonColors, e);
                }
            }
        }
    }
}
export function addEmailStyles() {
    const styleSheet = document.styleSheets[0];
    // Vérifier que le thème existe et a les propriétés nécessaires
    const currentTheme = themes[profileData.selectedThemeIndex % themes.length];
    const borderColor = (currentTheme === null || currentTheme === void 0 ? void 0 : currentTheme.buttonHoverBackground) || '#2C2F33';
    try {
        styleSheet.insertRule(`
            .email {
                width: 100%;
                border: 2px solid ${borderColor};
                border-radius: 10px;
                background-color: #2C2F33;
                color: white;
                font-size: 1em;
                font-weight: bold;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                transition: background-color 0.3s ease, box-shadow 0.3s ease;
            }
        `, styleSheet.cssRules.length);
    }
    catch (e) {
        console.warn('Error adding email styles:', e);
    }
    try {
        styleSheet.insertRule(`
            .email a {
                display: block;
                padding: 10px;
                text-align: center;
                text-decoration: none;
                color: white;
                border-radius: 10px;
            }
        `, styleSheet.cssRules.length);
    }
    catch (e) {
        console.warn('Error adding email link styles:', e);
    }
}
export default {
    applyFirstTheme,
    setIconBasedOnTheme,
    loadThemeConfig,
    toggleTheme,
    createToggleThemeButton,
    applyTheme,
    setBackgroundStyles,
    applyAnimation,
    applyAnimationButton,
    applyDynamicStyles,
    addEmailStyles,
};
