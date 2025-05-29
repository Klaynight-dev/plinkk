function createProfileContainer(profileData) {
    const profileContainer = document.createElement("div");
    profileContainer.className = "profile-container";

    const profileLink = document.createElement("a");
    profileLink.href = profileData.profileLink;
    profileLink.target = "_blank";
    profileLink.tabIndex = 0;

    const profilePicWrapper = document.createElement("div");
    profilePicWrapper.className = "profile-pic-wrapper";

    const profilePic = document.createElement("img");
    profilePic.src = profileData.profileImage;
    profilePic.alt = "Profile Picture";
    profilePic.className = "profile-pic";
    profilePicWrapper.appendChild(profilePic);

    const profileLinkDiv = document.createElement("div");
    profileLinkDiv.className = "profile-link";

    const profileLinkSpan = document.createElement("span");

    const profileIcon = document.createElement("img");
    profileIcon.src = profileData.profileIcon;
    profileIcon.alt = "globe";

    const profileSiteText = document.createElement("p");
    profileSiteText.textContent = profileData.profileSiteText;

    profileLinkSpan.appendChild(profileIcon);
    profileLinkSpan.appendChild(profileSiteText);
    profileLinkDiv.appendChild(profileLinkSpan);

    profileLink.appendChild(profilePicWrapper);
    profileLink.appendChild(profileLinkDiv);
    profileContainer.appendChild(profileLink);

    // "display:none;" si le texte est vide
    if (profileData.profileSiteText.trim() === "") {
        profileSiteText.style.display = "none";
    } if (profileData.profileImage.trim() === "") {
        profilePic.style.display = "none";
    } if (profileData.profileIcon.trim() === "") {
        profileIcon.style.display = "none";
    } if (profileData.profileLink.trim() === "") {
        profileLink.style.display = "none";
    } if (profileData.profileHoverColor.trim() === "") {
        profileContainer.style.display = "none";
    }

    return profileContainer;
}

function createUserName(profileData) {
    const userName = document.createElement("h1");
    userName.textContent = profileData.userName;

    if (!profileData.userName.trim()) {
        userName.style.display = "none";
    }

    return userName;
}

function createEmailAndDescription(profileData) {
    const container = document.createElement("div");
    container.className = "email-description-container";

    const emailDiv = document.createElement("div");
    emailDiv.className = "email";
    emailDiv.style.position = "relative"; // Pour le positionnement du modal

    emailDiv.style.padding = "0";

    const emailLink = document.createElement("a");
    emailLink.href = `mailto:${profileData.email}`;
    emailLink.textContent = profileData.email;
    emailLink.style.display = "block"; // pour que le padding s'applique sur toute la largeur
    emailLink.style.padding = "12px";  // padding interne
    emailLink.style.textAlign = "center"; // centrer le texte
    emailDiv.appendChild(emailLink);

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.title = "Copier l'email";
    copyBtn.className = "copy-btn";
    copyBtn.innerHTML = `
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
    `;
    emailDiv.appendChild(copyBtn);

    // --- Système de spam & easter egg ---
    let spamCount = 0;
    let lastClick = 0;
    let resetTimeout = null;
    let iconTimeout = null;
    let rpLaunched = false;

    copyBtn.addEventListener("click", () => {
        const now = Date.now();
        if (now - lastClick < 400) {
            spamCount++;
        } else {
            spamCount = 1;
            rpLaunched = false; // reset RP si on arrête de spam
            // reset visuel si besoin
            copyBtn.classList.remove("btn-crack", "btn-broken", "btn-explode");
            copyBtn.style = "";
        }
        lastClick = now;

        // Reset du compteur après 5s sans clic
        if (resetTimeout) clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
            spamCount = 0;
            rpLaunched = false;
            copyBtn.classList.remove("btn-crack", "btn-broken", "btn-explode");
            copyBtn.style = "";
        }, 5000);

        // Vibrations
        if (spamCount >= 3 && spamCount < 6) {
            copyBtn.classList.add("vibrate_btn");
            setTimeout(() => copyBtn.classList.remove("vibrate_btn"), 200);
        } else if (spamCount >= 6 && spamCount < 10) {
            emailDiv.classList.add("vibrate_parent");
            setTimeout(() => emailDiv.classList.remove("vibrate_parent"), 200);
        } else if (spamCount >= 10 && spamCount < 100) {
            document.body.classList.add("vibrate_parent");
            setTimeout(() => document.body.classList.remove("vibrate_parent"), 200);
        }

        // Copie dans le presse-papier
        navigator.clipboard.writeText(profileData.email)
            .then(() => {
                copyBtn.innerHTML = `
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                `;
                // Timer indépendant pour l'icône
                if (iconTimeout) clearTimeout(iconTimeout);
                iconTimeout = setTimeout(() => {
                    copyBtn.innerHTML = `
                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                    `;
                }, 2000);
            });

        // RP spécial à partir de 100
        if (spamCount >= 100 && !rpLaunched) {
            rpLaunched = true;
            launchCopyRP(copyBtn, emailDiv, () => {
                // callback à la fin du RP (optionnel)
            });
            return;
        }

        // Effets progressifs selon le spamCount
        if (spamCount >= 200 && spamCount < 500) {
            copyBtn.classList.add("btn-crack");
        } else if (spamCount >= 500 && spamCount < 1000) {
            copyBtn.classList.remove("btn-crack");
            copyBtn.classList.add("btn-broken");
        } else if (spamCount >= 1000) {
            copyBtn.classList.remove("btn-broken");
            copyBtn.classList.add("btn-explode");
            copyBtn.innerHTML = "💥";
            setTimeout(() => {
                copyBtn.style.opacity = "0";
                showCopyModal("Le bouton a explosé !", copyBtn);
            }, 800);
            return;
        }

        // Messages d'easter egg classiques
        let msg = "";
        if (spamCount === 1) msg = "Copie !";
        else if (spamCount === 2) msg = "Super Copie !";
        else if (spamCount === 3) msg = "Hyper Copie !";
        else if (spamCount === 4) msg = "Ultra Copie !";
        else if (spamCount === 5) msg = "Mega Copie !";
        else if (spamCount === 6) msg = "Stop spam 😅";
        else if (spamCount > 6 && spamCount < 10) msg = "Trop de copies !";
        else if (spamCount >= 10 && spamCount < 20) msg = "Arrête de spammer !";
        else if (spamCount >= 20 && spamCount < 30) msg = "Tu es vraiment motivé à copier !";
        else if (spamCount >= 30 && spamCount < 40) msg = "Tu ne t'arrêtes jamais ?";
        else if (spamCount >= 40 && spamCount < 50) msg = "Toujours là ?";
        else if (spamCount >= 50 && spamCount < 60) msg = "C'est infini ?";
        else if (spamCount >= 60 && spamCount < 70) msg = "Tu veux casser le bouton ?";
        else if (spamCount >= 70 && spamCount < 80) msg = "Courageux !";
        else if (spamCount >= 80 && spamCount < 90) msg = "Toujours pas fatigué ?";
        else if (spamCount >= 90 && spamCount < 100) msg = "100 bientôt !";
        else if (spamCount >= 100 && spamCount < 101) msg = "Tu es un vrai spammeur !";
        if (msg) showCopyModal(msg, copyBtn);
    });

    // RP avec histoire et effets
    function launchCopyRP(copyBtn, emailDiv, onEnd) {
        const rpMessages = [
            "💥 Le bouton commence à chauffer...",
            "😱 Tu sens cette odeur de plastique brûlé ?",
            "⚡ Des fissures apparaissent sur le bouton !",
            "🛑 Le bouton crie : « Arrête de me copier ! »",
            "🔥 Le bouton se fissure de plus en plus...",
            "🤖 Le bouton : « Je vais craquer... »",
            "🌈 Explosion de couleurs !",
            "🎉 Le bouton se déforme et tremble...",
            "👏 Tu es un vrai spammeur !"
        ];
        let i = 0;
        let rpInterval = setInterval(() => {
            showCopyModal(rpMessages[i], copyBtn);
            // Effets visuels progressifs
            if (i === 2) {
                copyBtn.classList.add("btn-crack");
            }
            if (i === 4) {
                copyBtn.classList.add("vibrate_btn");
            }
            if (i === 6) {
                copyBtn.style.background = "linear-gradient(90deg, #ff00cc, #3333ff)";
                copyBtn.style.color = "#fff";
            }
            if (i === 7) {
                copyBtn.classList.add("btn-broken");
            }
            i++;
            if (i >= rpMessages.length) {
                clearInterval(rpInterval);
                if (onEnd) onEnd();
            }
        }, 1200);
    }

    // Description
    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "profile-description";
    const descriptionText = document.createElement("p");
    descriptionText.textContent = profileData.description;
    descriptionDiv.appendChild(descriptionText);

    container.appendChild(emailDiv);
    container.appendChild(descriptionDiv);

    // Affichage conditionnel
    if (!profileData.description.trim()) descriptionDiv.style.display = "none";
    if (!profileData.email.trim()) emailDiv.style.display = "none";

    return container;
}

// Modal localisé au bouton, au-dessus ou en dessous selon la place
function showCopyModal(message, btn) {
    let modal = btn.parentNode.querySelector(".copy-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.className = "copy-modal";
        btn.parentNode.appendChild(modal);
    }
    modal.textContent = message;
    modal.classList.add("show");
    modal.style.position = "absolute";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -100%)";
    modal.style.background = "rgba(40,40,40,0.95)";
    modal.style.color = "#fff";
    modal.style.padding = "8px 18px";
    modal.style.borderRadius = "8px";
    modal.style.fontSize = "1em";
    modal.style.fontWeight = "bold";
    modal.style.boxShadow = "0 4px 24px rgba(0,0,0,0.25)";
    modal.style.pointerEvents = "none";
    modal.style.zIndex = "100";
    modal.style.transition = "opacity 0.3s cubic-bezier(0.4,0,0.2,1)";

    // Calcul de la place à l'écran
    const btnRect = btn.getBoundingClientRect();
    const modalHeight = 60;
    if (btnRect.top - modalHeight < 10) {
        modal.style.top = "calc(100% + 10px)";
        modal.style.transform = "translate(-50%, 0)";   
    } else {
        modal.style.top = "-10px";
        modal.style.transform = "translate(-50%, -100%)";
    }
    modal.style.opacity = "1";

    clearTimeout(modal._timeout);
    modal._timeout = setTimeout(() => {
        modal.classList.remove("show");
        modal.style.opacity = "0";
    }, 1500);
}
function addEmailStyles() {
    const styleSheet = document.styleSheets[0];
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

function createLinkBoxes(profileData) {
    const maxLinkNumber = 20;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!profileData.links || !profileData.links.length) {
        console.warn("No links found in profile data.");
    } else if (profileData.links.length > maxLinkNumber) {
        console.warn(`Too many links found in profile data, only the first ${maxLinkNumber} will be displayed.`);
    }
    return profileData.links.slice(0, maxLinkNumber).map(link => {
        const discordBox = document.createElement("div");
        const discordIcon = document.createElement("img");
        if (profileData.buttonThemeEnable === 0 && link.showDescription === true) {
            discordIcon.style.top = "24px";
        }

        if (profileData.buttonThemeEnable === 1) {
            const themeConfig = btnIconThemeConfig?.find(config => config.name === link.name);
            if (themeConfig) {  
                const themeClass = themeConfig.themeClass + (themeConfig.themeClassAlt ? ` ${themeConfig.themeClassAlt}` : "");
                discordBox.className = `button ${themeClass}`;
                
                discordIcon.classList = "link-icon";
                discordIcon.src = themeConfig.icon;
                discordBox.appendChild(discordIcon);
                discordIcon.className = "icon";
            } else {
                discordBox.className = "discord-box";
                discordIcon.classList = "link-icon";
                discordIcon.src = link.icon;
                discordIcon.alt = link.text;
                discordBox.appendChild(discordIcon);
            }
        } else {
            discordBox.className = "discord-box";
            discordIcon.classList = "link-icon";
            discordIcon.src = link.icon;
            discordIcon.alt = link.text;
            discordBox.appendChild(discordIcon);
        }

        const discordLink = document.createElement("a");
        discordLink.href = link.url;
        discordLink.target = "_blank";
        discordLink.textContent = link.text;
        discordBox.appendChild(discordLink);

        if (link.description && link.description.trim() !== "" && link.showDescription) {
            // Create the arrow emoji element
            const arrow = document.createElement("span");
            arrow.className = "desc-arrow";
            arrow.style.display = "inline-flex";
            arrow.style.alignItems = "center";
            arrow.style.justifyContent = "center";
            arrow.style.transition = "opacity 0.7s cubic-bezier(0.4,0,0.2,1)";
            arrow.style.opacity = "1";
            arrow.style.marginLeft = "5px";
            arrow.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" 
                xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1" 
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `;
            discordLink.appendChild(arrow);

            const desc = document.createElement("p");
            desc.className = "link-description";
            desc.textContent = link.description;

            desc.style.transition = "max-height 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.7s cubic-bezier(0.4,0,0.2,1), margin 0.7s cubic-bezier(0.4,0,0.2,1), padding 0.7s cubic-bezier(0.4,0,0.2,1)";
            desc.style.overflow = "hidden";
            desc.style.maxHeight = "0";
            desc.style.opacity = "0";
            desc.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            desc.style.padding = "0 5px";
            desc.style.borderRadius = "5px";
            desc.style.border = "1px solid rgba(255, 255, 255, 0.5)";
            desc.style.marginTop = "0";
            desc.style.marginBottom = "0";
            desc.style.display = "block";
            
            discordIcon.style.transition = "transform 0.7s cubic-bezier(0.4,0,0.2,1)";
            if (profileData.buttonThemeEnable === 1) {
                discordIcon.style.transform = "translateY(3px)";
            }

            arrow.style.transform = "translateY(3px)";

            if (isTouchDevice) {
                // Sur mobile/tactile : bouton pour afficher/masquer la description
                const showDescBtn = document.createElement("button");
                showDescBtn.textContent = "Afficher la description";
                showDescBtn.className = "show-desc-btn";
                showDescBtn.style.marginLeft = "10px";
                showDescBtn.style.fontSize = "0.9em";
                showDescBtn.style.padding = "2px 8px";
                showDescBtn.style.borderRadius = "6px";
                showDescBtn.style.border = "none";
                showDescBtn.style.background = "#eee";
                showDescBtn.style.cursor = "pointer";
                showDescBtn.style.transition = "background 0.2s";
                let descVisible = false;
                showDescBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    descVisible = !descVisible;
                    if (descVisible) {
                        desc.style.maxHeight = "200px";
                        desc.style.opacity = "1";
                        desc.style.marginTop = "8px";
                        desc.style.marginBottom = "5px";
                        desc.style.padding = "5px";
                        arrow.style.opacity = "0";
                        showDescBtn.textContent = "Masquer la description";
                    } else {
                        desc.style.maxHeight = "0";
                        desc.style.opacity = "0";
                        desc.style.marginTop = "0";
                        desc.style.marginBottom = "0";
                        desc.style.padding = "0 5px";
                        arrow.style.opacity = "1";
                        showDescBtn.textContent = "Afficher la description";
                    }
                });
                discordBox.appendChild(showDescBtn);
            } else {
                // Desktop : hover classique
                discordLink.addEventListener("mouseover", () => {
                    discordBox.style.transition = "transform 0.7s cubic-bezier(0.4,0,0.2,1)";
                    desc.style.maxHeight = "200px";
                    desc.style.opacity = "1";
                    desc.style.marginTop = "8px";
                    desc.style.marginBottom = "5px";
                    desc.style.padding = "5px";
                    arrow.style.opacity = "0";
                });
                discordLink.addEventListener("mouseout", () => {
                    desc.style.maxHeight = "0";
                    desc.style.opacity = "0";
                    desc.style.marginTop = "0";
                    desc.style.marginBottom = "0";
                    desc.style.padding = "0 5px";
                    arrow.style.opacity = "1";
                });
            }

            discordLink.appendChild(desc);
        }
        
        if (!link.text.trim()) {
            discordLink.style.display = "none";
        }
        return discordBox;
    });
}
function validateProfileConfig(profileData, themes, btnIconThemeConfig, canvaData, animationBackground) {
    const errors = [];

    // Validate themes
    if (!Array.isArray(themes) || themes.length === 0) {
        errors.push("Themes array is missing or empty.");
    } else {
        themes.forEach((theme, i) => {
            if (!theme.background || !theme.textColor || !theme.buttonBackground || !theme.buttonHoverBackground) {
                errors.push(`Theme at index ${i} is missing required properties.`);
            }
        });
    }

    // Validate profileData
    if (typeof profileData !== "object" || profileData === null) {
        errors.push("profileData is not an object.");
    } else {
        const requiredProfileFields = [
            "profileLink", "profileImage", "profileIcon", "profileSiteText", "profileHoverColor",
            "userName", "email", "description", "links", "labels", "socialIcon", "statusbar", "background"
        ];
        requiredProfileFields.forEach(field => {
            if (!(field in profileData)) {
                errors.push(`profileData is missing field: ${field}`);
            }
        });
        if (!Array.isArray(profileData.links)) {
            errors.push("profileData.links is not an array.");
        }
        if (!Array.isArray(profileData.labels)) {
            errors.push("profileData.labels is not an array.");
        }
        if (!Array.isArray(profileData.socialIcon)) {
            errors.push("profileData.socialIcon is not an array.");
        }
        if (typeof profileData.statusbar !== "object" || profileData.statusbar === null) {
            errors.push("profileData.statusbar is not an object.");
        }
    }

    // Validate btnIconThemeConfig
    if (!Array.isArray(btnIconThemeConfig)) {
        errors.push("btnIconThemeConfig is not an array.");
    }

    // Validate canvaData
    if (!Array.isArray(canvaData)) {
        errors.push("canvaData is not an array.");
    } else {
        canvaData.forEach((canva, i) => {
            if (!canva.fileNames) {
                errors.push(`canvaData at index ${i} is missing fileNames.`);
            }
        });
    }

    // Validate animationBackground
    if (!Array.isArray(animationBackground)) {
        errors.push("animationBackground is not an array.");
    } else {
        animationBackground.forEach((anim, i) => {
            if (!anim.keyframes) {
                errors.push(`animationBackground at index ${i} is missing keyframes.`);
            }
        });
    }

    if (errors.length > 0) {
        console.error("Validation errors:", errors);
        return false;
    }
    return true;
}
function applyDynamicStyles(profileData, styleSheet, selectedAnimationBackgroundIndex, EnableAnimationBackground, animationDurationBackground, useCanvas, selectedCanvasIndex) {
    if (useCanvas) {
        const canvas = document.createElement("canvas");
        canvas.id = "backgroundCanvas";
        document.body.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.id = "container";

        try {
            const script = document.createElement("script");
            script.src = `./contents/js/canvaAnimation/${canvaData[selectedCanvasIndex].fileNames}`;
            document.body.appendChild(script);

            script.onload = () => {
                if (typeof runCanvasAnimation === "function") {
                    runCanvasAnimation(ctx, canvas);
                } else {
                    console.error("runCanvasAnimation is not a function");
                    setBackgroundStyles(profileData);
                }
            };
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

function setBackgroundStyles(profileData) {
    if (Array.isArray(profileData.background)) {
        document.body.style.background = `linear-gradient(${profileData.degBackgroundColor}deg, ${profileData.background.join(", ")})`;
        document.body.style.backgroundSize = "cover";
    } else {
        document.body.style.background = `url(${profileData.background})`;
        document.body.style.backgroundSize = `${profileData.backgroundSize}%`;
    }
}

function applyTheme(theme) {
    const article = document.getElementById("profile-article");
    article.style.background = theme.background;
    article.style.color = theme.textColor;
    document.querySelectorAll(".discord-box").forEach(box => {
        box.style.backgroundColor = theme.buttonBackground;
        box.style.color = theme.buttonTextColor;
    });
    document.querySelectorAll(".discord-box").forEach(box => {
        box.addEventListener("mouseover", () => {
            box.style.backgroundColor = theme.buttonHoverBackground;
            box.style.boxShadow = "0 0 50px " + theme.buttonHoverBackground;
        });
        box.addEventListener("mouseout", () => {
            box.style.backgroundColor = theme.buttonBackground;
            box.style.boxShadow = "none";
        });
    });
    if (profileData.buttonThemeEnable !== 1) {
        document.querySelectorAll("a").forEach(link => {
            link.style.color = theme.textColor;
        });
        document.querySelectorAll("a:hover").forEach(link => {
            link.style.color = theme.linkHoverColor;
        });
    }
    const emailDiv = document.querySelector(".email");
    const emailHover = document.querySelector(".email a");
    emailDiv.style.backgroundColor = theme.buttonBackground;
    emailDiv.style.color = theme.buttonTextColor;

    emailHover.addEventListener("mouseover", () => {
        emailDiv.style.backgroundColor = theme.buttonHoverBackground;
        emailDiv.style.boxShadow = `0 0 10px ${theme.buttonHoverBackground}`;
        emailHover.style.color = theme.buttonTextColor;
    });
    emailHover.addEventListener("mouseout", () => {
        emailDiv.style.backgroundColor = theme.buttonBackground;
        emailDiv.style.boxShadow = `0 0 10px ${theme.buttonBackground}`;
        emailHover.style.color = theme.textColor;
    });

    const themeToggle = document.querySelector(".theme-toggle-button");
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

    // Apply the new property articleHoverBoxShadow
    const styleSheet = document.styleSheets[0];
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
    } else {
        console.warn("Easter eggs button not found. Make sure it exists in your HTML.");
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
        console.warn("Easter eggs modal not found. Make sure it exists in your HTML.");
    }

    // Appliquer le style à tous les boutons .show-desc-btn
    const boutonsAffichageDescription = document.querySelectorAll(".show-desc-btn");
    boutonsAffichageDescription.forEach(bouton => {
        bouton.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        bouton.style.color = theme.textColor;
        bouton.addEventListener("mouseover", () => {
            bouton.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
            bouton.style.boxShadow = `0 0 10px ${theme.buttonHoverBackground}`;
        });
        bouton.addEventListener("mouseout", () => {
            bouton.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            bouton.style.boxShadow = `0 0 10px ${theme.buttonBackground}`;
        });
    });
    
}

function applyAnimation(animation, animationEnabled) {
    const article = document.getElementById("profile-article");
    if (animationEnabled) {
        article.style.animation = animation.keyframes;
    }
}

function applyAnimationButton(animation, animationButtonEnabled, delayAnimationButton) {
    const articleChildren = document.querySelectorAll("#profile-article > *:not(.easter-egg-modal)");
    if (animationButtonEnabled) {
        articleChildren.forEach((child, index) => {
            child.style.animationDelay = `${(index + 1) * delayAnimationButton}s`;
            child.style.animation = `${animation.keyframes} ${animation.duration || delayAnimationButton * index}s`;
            child.style.animationFillMode = "backwards";
        });
    }
}

function setIconBasedOnTheme(theme) {
    const iconElement = document.getElementById("theme-icon");
    if (document.body.classList.contains("dark-theme") || theme.darkTheme) {
        iconElement.name = "moon-outline";
    } else {
        iconElement.name = "sunny-outline";
    }
}

function loadThemeConfig(theme) {
    applyTheme(theme);
    setIconBasedOnTheme(theme);
}

function toggleTheme(theme) {
    const currentTheme = document.body.classList.contains("dark-theme") ? theme : theme.opposite;
    document.body.classList.toggle("dark-theme");
    applyTheme(currentTheme);
    setIconBasedOnTheme(currentTheme);
    setCookie("theme", document.body.classList.contains("dark-theme") ? "dark" : "light", 365);
}

function createToggleThemeButton(theme) {
    const button = document.createElement("button");
    button.className = "theme-toggle-button";
    const icon = document.createElement("ion-icon");
    icon.id = "theme-icon";
    icon.name = theme.darkTheme ? "moon-outline" : "sunny-outline";
    button.appendChild(icon);
    
    button.addEventListener("click", () => toggleTheme(theme));

    const article = document.getElementById("profile-article");
    article.appendChild(button);

    if (!theme) {
        button.style.display = "none";
    }
}

function createLabelButtons(profileData) {
    const maxLabelNumber = 7;
    if (!profileData.labels || !profileData.labels.length) {
        console.warn("No labels found in profile data.");
    } else if (profileData.labels.length > maxLabelNumber) {
        console.warn(`Too many labels found in profile data, only the first ${maxLabelNumber} will be displayed.`);
    }
    const container = document.createElement("div");
    container.className = "label-buttons-container";

    profileData.labels.slice(0, maxLabelNumber).forEach(label => {
        const button = document.createElement("div");
        button.className = "label-button";
        button.style.backgroundColor = `${label.color}80`;
        button.style.border = `2px solid ${label.color}`;
        button.style.color = label.fontColor;
        button.textContent = label.data;

        button.addEventListener("mouseover", () => {
            button.style.backgroundColor = label.color;
        });

        button.addEventListener("mouseout", () => {
            button.style.backgroundColor = `${label.color}80`;
        });

        container.appendChild(button);
        if (!label.data.trim() || (!label.color.trim() || label.color.trim() === "#") || (!label.fontColor.trim() || label.fontColor.trim() === "#")) {
            button.style.display = "none";
        }
    });

    const article = document.getElementById("profile-article");
    article.appendChild(container);
}
function applyFirstTheme(theme) {
    const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = getCookie("theme");

    console.log("Dark theme media quary:", darkThemeMediaQuery.matches);

    if (savedTheme) {
        if (savedTheme === "dark") {
            loadThemeConfig(theme.darkTheme ? theme : theme.opposite);
            document.body.classList.add("dark-theme");
        } else {
            loadThemeConfig(theme.darkTheme ? theme.opposite : theme);
        }
    } else {
        if (darkThemeMediaQuery.matches) {
            if (theme.darkTheme) {
                loadThemeConfig(theme);
            } else {
                loadThemeConfig(theme.opposite);
                document.body.classList.add("dark-theme");
            }
        } else {
            if (theme.darkTheme) {
                loadThemeConfig(theme.opposite);
                document.body.classList.add("dark-theme");
            } else {
                loadThemeConfig(theme);
            }
        }
    }
}

function createIconList(profileData) {
    const maxIconNumber = 10;
    const iconList = document.createElement("div");
    iconList.className = "icon-list";

    if (!profileData.socialIcon || !profileData.socialIcon.length) {
        console.warn("No social icons found in profile data.");
    } else if (profileData.socialIcon.length > maxIconNumber) {
        console.warn(`Too many social icons found in profile data, only the first ${maxIconNumber} will be displayed.`);
    }

    profileData.socialIcon.slice(0, maxIconNumber).forEach(iconData => {
        const iconItem = document.createElement("div");
        iconItem.className = "icon-item";

        const iconImg = document.createElement("img");
        iconImg.src = `./contents/images/icons/${iconData.icon.toLowerCase().replace(/ /g, '-')}.svg`;
        iconImg.alt = iconData.icon;

        const iconLink = document.createElement("a");
        iconLink.href = iconData.url;
        iconLink.target = "_blank";

        iconLink.appendChild(iconImg);
        iconItem.appendChild(iconLink);
        iconList.appendChild(iconItem);
    });

    if (profileData.socialIcon.length === 0) {
        iconList.style.display = "none";
    }

    const article = document.getElementById("profile-article");
    article.appendChild(iconList);
}

function createStatusBar(profileData) {
    const maxCaracter = 25;
    const circleStatusBar = document.createElement("div");
    circleStatusBar.className = "circle-status-bar";
    circleStatusBar.style.border = `10px solid ${profileData.statusbar.borderColor}`;
    circleStatusBar.style.backgroundColor = profileData.statusbar.colorBg;
    circleStatusBar.style.transition = "transform 0.3s ease-in-out"; // Add animation

    const statusBarText = document.createElement("div");
    statusBarText.className = "statusBarText";
    statusBarText.textContent = profileData.statusbar.text.substring(0, maxCaracter);
    if (profileData.statusbar.text.length > maxCaracter) {
        statusBarText.textContent += "...";
        console.warn("Status bar text is too long, it will be truncated.");
    }
    statusBarText.style.color = profileData.statusbar.colorText;
    circleStatusBar.appendChild(statusBarText);

    if (!profileData.statusbar.text.trim()) {
        circleStatusBar.style.display = "none";
    }

    const article = document.querySelector("article");
    article.appendChild(circleStatusBar);

    // Add hover effect for animation
    circleStatusBar.addEventListener("mouseover", () => {
        circleStatusBar.style.transform = "scale(1.1)";
        statusBarText.style.display = "block";
        circleStatusBar.style.width = "fit-content";
        circleStatusBar.style.borderRadius = "20px";
        circleStatusBar.style.border = "none";
        if (profileData.statusbar.fontTextColor === 0) {
            circleStatusBar.style.backgroundColor = profileData.statusbar.colorBg;
        } else if (profileData.statusbar.fontTextColor === 1) {
            circleStatusBar.style.backgroundColor = profileData.statusbar.borderColor;
        } else {
            console.error("Invalid fontTextColor value: ", profileData.statusbar.fontTextColor, "; Expected 0 or 1.");
            circleStatusBar.style.background = "none";
        }
        circleStatusBar.style.padding = "5px";
    });
    circleStatusBar.addEventListener("mouseout", () => {
        circleStatusBar.style.transform = "scale(1)";
        statusBarText.style.display = "none";
        circleStatusBar.style.width = "50px";
        circleStatusBar.style.borderRadius = "50%";
        circleStatusBar.style.border = `10px solid ${profileData.statusbar.borderColor}`;
        circleStatusBar.style.backgroundColor = profileData.statusbar.colorBg;
        circleStatusBar.style.padding = "0";
        circleStatusBar.style.width = "28px";
    });
}