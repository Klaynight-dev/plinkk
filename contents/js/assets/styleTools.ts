import { getCookie, setCookie } from './cookies.js';
import { canvaData } from '../config/canvaConfig.js';
import { profileData } from '../config/profileConfig.js';
import { themes } from '../config/themeConfig.js';
import { animationBackground } from '../config/animationConfig.js';

// Types pour TypeScript
interface Theme {
    darkTheme?: boolean;
    opposite?: Theme;
    background: string;
    textColor: string;
    buttonBackground: string;
    buttonTextColor: string;
    buttonHoverBackground: string;
    linkHoverColor: string;
    articleHoverBoxShadow: string;
}

interface ProfileData {
    buttonThemeEnable: number;
    background: string | string[];
    backgroundSize?: number;
    degBackgroundColor?: number;
    neonEnable: number;
    neonColors: string[];
    selectedThemeIndex: number;
}

interface Animation {
    keyframes: string;
    duration?: number;
}

interface CanvaData {
    fileNames: string;
}

declare global {
    interface Window {
        Effect?: any;
        MatrixSymbol?: any;
    }
    function runCanvasAnimation(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void;
}

export function applyFirstTheme(theme: Theme): void {
    const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = getCookie("theme");

    console.log("Dark theme media quary:", darkThemeMediaQuery.matches);

    if (savedTheme) {
        if (savedTheme === "dark") {
            loadThemeConfig(theme.darkTheme ? theme : theme.opposite!);
            document.body.classList.add("dark-theme");
        } else {
            loadThemeConfig(theme.darkTheme ? theme.opposite! : theme);
        }
    } else {
        if (darkThemeMediaQuery.matches) {
            if (theme.darkTheme) {
                loadThemeConfig(theme);
            } else {
                loadThemeConfig(theme.opposite!);
                document.body.classList.add("dark-theme");
            }
        } else {
            if (theme.darkTheme) {
                loadThemeConfig(theme.opposite!);
                document.body.classList.add("dark-theme");
            } else {
                loadThemeConfig(theme);
            }
        }
    }
}

export function setIconBasedOnTheme(theme: Theme): void {
    const iconElement = document.getElementById("theme-icon") as HTMLElement & { name: string };
    if (document.body.classList.contains("dark-theme") || theme.darkTheme) {
        iconElement.name = "moon-outline";
    } else {
        iconElement.name = "sunny-outline";
    }
}

export function loadThemeConfig(theme: Theme): void {
    applyTheme(theme);
    setIconBasedOnTheme(theme);
}

export function toggleTheme(theme: Theme): void {
    const currentTheme = document.body.classList.contains("dark-theme") ? theme : theme.opposite!;
    document.body.classList.toggle("dark-theme");
    applyTheme(currentTheme);
    setIconBasedOnTheme(currentTheme);
    setCookie("theme", document.body.classList.contains("dark-theme") ? "dark" : "light", 365);
}

export function createToggleThemeButton(theme: Theme): void {
    const button = document.createElement("button");
    button.className = "theme-toggle-button";
    const icon = document.createElement("ion-icon") as HTMLElement & { name: string };
    icon.id = "theme-icon";
    icon.name = theme.darkTheme ? "moon-outline" : "sunny-outline";
    button.appendChild(icon);
    
    button.addEventListener("click", () => toggleTheme(theme));

    const article = document.getElementById("profile-article");
    article?.appendChild(button);

    if (!theme) {
        button.style.display = "none";
    }
}

export function applyTheme(theme: Theme): void {
    const article = document.getElementById("profile-article") as HTMLElement;
    article.style.background = theme.background;
    article.style.color = theme.textColor;
    
    document.querySelectorAll(".discord-box").forEach((box: Element) => {
        const htmlBox = box as HTMLElement;
        htmlBox.style.backgroundColor = theme.buttonBackground;
        htmlBox.style.color = theme.buttonTextColor;
    });
    
    document.querySelectorAll(".discord-box").forEach((box: Element) => {
        const htmlBox = box as HTMLElement;
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
        document.querySelectorAll("a").forEach((link: Element) => {
            const htmlLink = link as HTMLElement;
            htmlLink.style.color = theme.textColor;
        });
        document.querySelectorAll("a:hover").forEach((link: Element) => {
            const htmlLink = link as HTMLElement;
            htmlLink.style.color = theme.linkHoverColor;
        });
    }
    
    const emailDiv = document.querySelector(".email") as HTMLElement;
    const emailHover = document.querySelector(".email a") as HTMLElement;
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

    const themeToggle = document.querySelector(".theme-toggle-button") as HTMLElement;
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
    const styleSheet = document.styleSheets[0] as CSSStyleSheet;
    styleSheet.insertRule(`
        article:hover {
            box-shadow: ${theme.articleHoverBoxShadow};
        }
    `, styleSheet.cssRules.length);

    // Apply scrollbar styles
    styleSheet.insertRule(`
        ::-webkit-scrollbar {
            width: 12px;
        }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
        ::-webkit-scrollbar-track {
            background: ${theme.background};
            border-radius: 10px;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
        }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, ${theme.buttonBackground}, ${theme.buttonHoverBackground});
            border-radius: 10px;
            border: 3px solid ${theme.background};
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
        }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, ${theme.buttonHoverBackground}, ${theme.buttonBackground});
        }
    `, styleSheet.cssRules.length);

    const easterEggsBtn = document.querySelector(".easter-egg-gear-btn") as HTMLElement;
    const easterEggsModal = document.querySelector(".easter-egg-modal") as HTMLElement;

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
    } else {
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
    } else {
        console.log("Easter eggs modal not found - will be created when needed.");
    }

    // Appliquer le style à tous les boutons .show-desc-btn
    const boutonsAffichageDescription = document.querySelectorAll(".show-desc-btn");
    boutonsAffichageDescription.forEach((bouton: Element) => {
        const htmlBouton = bouton as HTMLElement;
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

export function setBackgroundStyles(profileData: ProfileData): void {
    if (Array.isArray(profileData.background)) {
        document.body.style.background = `linear-gradient(${profileData.degBackgroundColor}deg, ${profileData.background.join(", ")})`;
        document.body.style.backgroundSize = "cover";
    } else {
        document.body.style.background = `url(${profileData.background})`;
        document.body.style.backgroundSize = `${profileData.backgroundSize}%`;
    }
}

export function applyAnimation(animation: Animation, animationEnabled: boolean): void {
    const article = document.getElementById("profile-article") as HTMLElement;
    if (animationEnabled) {
        article.style.animation = animation.keyframes;
    }
}

export function applyAnimationButton(animation: Animation, animationButtonEnabled: boolean, delayAnimationButton: number): void {
    const articleChildren = document.querySelectorAll("#profile-article > *:not(.easter-egg-modal)");
    if (animationButtonEnabled) {
        articleChildren.forEach((child: Element, index: number) => {
            const htmlChild = child as HTMLElement;
            htmlChild.style.animationDelay = `${(index + 1) * delayAnimationButton}s`;
            htmlChild.style.animation = `${animation.keyframes} ${animation.duration || delayAnimationButton * index}s`;
            htmlChild.style.animationFillMode = "backwards";
        });
    }
}

export function applyDynamicStyles(
    profileData: ProfileData, 
    styleSheet: CSSStyleSheet, 
    selectedAnimationBackgroundIndex: number, 
    EnableAnimationBackground: boolean, 
    animationDurationBackground: number, 
    useCanvas: boolean, 
    selectedCanvasIndex: number
): void {
    if (useCanvas) {
        const canvas = document.createElement("canvas");
        canvas.id = "backgroundCanvas";
        document.body.appendChild(canvas);
        const ctx = canvas.getContext("2d")!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.id = "container";

        try {
            // Pour Matrix effect, nous devons charger les dépendances d'abord
            if (canvaData[selectedCanvasIndex].fileNames === 'matrix-effect/app.js') {
                console.log("Loading Matrix Effect animation...");
                
                // Fonction helper pour charger un script
                const loadScript = (src: string): Promise<void> => {
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
                loadScript('./dist/canvaAnimation/matrix-effect/effect.js')
                    .then(() => {
                        console.log("Effect.js loaded, checking window.Effect:", typeof window.Effect);
                        return loadScript('./dist/canvaAnimation/matrix-effect/symbol.js');
                    })
                    .then(() => {
                        console.log("Symbol.js loaded, checking window.Symbol:", typeof window.Symbol);
                        return loadScript('./dist/canvaAnimation/matrix-effect/app.js');
                    })
                    .then(() => {
                        console.log("App.js loaded, checking runCanvasAnimation:", typeof runCanvasAnimation);
                        if (typeof runCanvasAnimation === "function") {
                            runCanvasAnimation(ctx, canvas);
                        } else {
                            console.error("runCanvasAnimation is not a function");
                            setBackgroundStyles(profileData);
                        }
                    })
                    .catch((error) => {
                        console.error("Error loading Matrix effect scripts:", error);
                        setBackgroundStyles(profileData);
                    });
            } else {
                // Pour les autres animations
                const script = document.createElement("script");
                script.src = `./dist/canvaAnimation/${canvaData[selectedCanvasIndex].fileNames}`;
                document.body.appendChild(script);

                script.onload = () => {
                    if (typeof runCanvasAnimation === "function") {
                        runCanvasAnimation(ctx, canvas);
                    } else {
                        console.error("runCanvasAnimation is not a function");
                        setBackgroundStyles(profileData);
                    }
                };
            }
        } catch (error) {
            console.error("Error loading canvas animation:", error);
            setBackgroundStyles(profileData);
        }

    } else {
        setBackgroundStyles(profileData);
    }

    if (EnableAnimationBackground && !useCanvas && !Array.isArray(profileData.background)) {
        document.body.style.animation = `${animationBackground[selectedAnimationBackgroundIndex].keyframes} ${animationDurationBackground}s`;
    } else {
        document.body.style.animation = "none";
    }

    // Appliquer le neon si activé
    if (profileData.neonEnable === 0) {
        styleSheet.insertRule(`
            .profile-pic-wrapper::before,
            .profile-pic-wrapper::after {
                display: none;
            }
        `, styleSheet.cssRules.length);
    } else {
        const neonGradient = profileData.neonColors.join(", ");
        styleSheet.insertRule(`
            .profile-pic-wrapper::after, .profile-pic-wrapper::before {
                background: linear-gradient(45deg, ${neonGradient});
            }
        `, styleSheet.cssRules.length);
    }
}

export function addEmailStyles(): void {
    const styleSheet = document.styleSheets[0] as CSSStyleSheet;
    styleSheet.insertRule(`
        .email {
            width: 100%;
            border: 2px solid ${themes[profileData.selectedThemeIndex % themes.length].buttonHoverBackground};
            border-radius: 10px;
            background-color: #2C2F33;
            color: white;
            font-size: 1em;
            font-weight: bold;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
    `, styleSheet.cssRules.length);

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
