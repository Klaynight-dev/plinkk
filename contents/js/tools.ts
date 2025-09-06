import { setSafeText, isSafeUrl, isSafeColor, disableDrag, disableContextMenuOnImage } from './assets/security.js';
import { btnIconThemeConfig } from './config/btnIconThemeConfig.js';

export function createProfileContainer(profileData: any) {
    const profileContainer = document.createElement("div");
    profileContainer.className = "profile-container";

    const profileLink = document.createElement("a");
    if (isSafeUrl(profileData.profileLink)) {
        profileLink.href = profileData.profileLink;
        profileLink.target = "_blank";
        profileLink.rel = "noopener noreferrer";
    } else {
        profileLink.href = "#";
        profileLink.title = "Lien non valide";
    }
    profileLink.tabIndex = 0;

    const profilePicWrapper = document.createElement("div");
    profilePicWrapper.className = "profile-pic-wrapper";

    const profilePic = document.createElement("img");
    if (isSafeUrl(profileData.profileImage)) {
        profilePic.src = profileData.profileImage;
    } else {
        profilePic.src = "./contents/images/logo.png";
    }
    profilePic.onerror = () => {
        profilePic.src = "./contents/images/logo.png";
    };
    profilePic.alt = "Profile Picture";
    profilePic.className = "profile-pic";
    profilePic.loading = "lazy";
    disableDrag(profilePic);
    disableContextMenuOnImage(profilePic);
    profilePicWrapper.appendChild(profilePic);

    const profileLinkDiv = document.createElement("div");
    profileLinkDiv.className = "profile-link";

    const profileLinkSpan = document.createElement("span");

    const profileIcon = document.createElement("img");
    if (isSafeUrl(profileData.profileIcon)) {
        profileIcon.src = profileData.profileIcon;
    } else {
        profileIcon.src = "./contents/images/icons/default-icon.svg";
    }
    profileIcon.onerror = () => {
        profileIcon.src = "./contents/images/icons/default-icon.svg";
    };
    profileIcon.alt = "globe";
    profileIcon.className = "profile-icon";
    profileIcon.loading = "lazy";
    disableDrag(profileIcon);
    disableContextMenuOnImage(profileIcon);

    const profileSiteText = document.createElement("p");
    setSafeText(profileSiteText, profileData.profileSiteText);

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
    } if (profileData.profileHoverColor.trim() === "" || !isSafeColor(profileData.profileHoverColor)) {
        profileContainer.style.display = "none";
    }

    return profileContainer;
}

export function createUserName(profileData) {
    const userName = document.createElement("h1");
    setSafeText(userName, profileData.userName);

    if (!profileData.userName.trim()) {
        userName.style.display = "none";
    }

    return userName;
}

export function createEmailAndDescription(profileData) {
    const container = document.createElement("div");
    container.className = "email-description-container";

    const emailDiv = document.createElement("div");
    emailDiv.className = "email";
    emailDiv.style.position = "relative"; // Pour le positionnement du modal

    emailDiv.style.padding = "0";

    const emailLink = document.createElement("a");
    emailLink.href = `mailto:${profileData.email}`;
    setSafeText(emailLink, profileData.email);
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
            copyBtn.style.cssText = "";
        }
        lastClick = now;

        // Reset du compteur après 5s sans clic
        if (resetTimeout) clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
            spamCount = 0;
            rpLaunched = false;
            copyBtn.classList.remove("btn-crack", "btn-broken", "btn-explode");
            copyBtn.style.cssText = "";
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
        if (navigator.clipboard) {
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
                })
                .catch(() => {
                    showCopyModal("Erreur lors de la copie", copyBtn);
                });
        } else {
            // Fallback : sélection manuelle
            const tempInput = document.createElement("input");
            tempInput.value = profileData.email;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            showCopyModal("Copié (fallback)", copyBtn);
        }

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
    setSafeText(descriptionText, profileData.description);
    descriptionDiv.appendChild(descriptionText);

    container.appendChild(emailDiv);
    container.appendChild(descriptionDiv);

    // Affichage conditionnel
    if (!profileData.description.trim()) descriptionDiv.style.display = "none";
    if (!profileData.email.trim()) emailDiv.style.display = "none";

    return container;
}

// Modal localisé au bouton, au-dessus ou en dessous selon la place
export function showCopyModal(message, btn) {
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

export function createLinkBoxes(profileData) {
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
                const themeClass = themeConfig.themeClass;
                discordBox.className = `button ${themeClass}`;
                
                discordIcon.classList = "link-icon";
                discordIcon.src = themeConfig.icon;
                discordIcon.loading = "lazy";
                discordBox.appendChild(discordIcon);
                discordIcon.className = "icon";
            } else {
                discordBox.className = "discord-box";
                discordIcon.classList = "link-icon";
                discordIcon.src = link.icon;
                discordIcon.alt = link.text;
                discordIcon.loading = "lazy";
                discordBox.appendChild(discordIcon);
            }
        } else {
            discordBox.className = "discord-box";
            discordIcon.classList = "link-icon";
            discordIcon.src = link.icon;
            discordIcon.alt = link.text;
            discordIcon.loading = "lazy";
            discordBox.appendChild(discordIcon);
        }

        const discordLink = document.createElement("a");
        if (isSafeUrl(link.url)) {
            discordLink.href = link.url;
            discordLink.target = "_blank";
            discordLink.rel = "noopener noreferrer";
        } else {
            discordLink.href = "#";
            discordLink.title = "Lien non valide";
        }
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
            setSafeText(desc, link.description);

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
export function validateProfileConfig(profileData, themes, btnIconThemeConfig, canvaData, animationBackground) {
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

export function createLabelButtons(profileData) {
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
        button.style.backgroundColor = isSafeColor(label.color) ? `${label.color}80` : "#cccccc80";
        button.style.border = isSafeColor(label.color) ? `2px solid ${label.color}` : "2px solid #ccc";
        button.style.color = isSafeColor(label.fontColor) ? label.fontColor : "#222";
        setSafeText(button, label.data);

        button.addEventListener("mouseover", () => {
            button.style.backgroundColor = isSafeColor(label.color) ? label.color : "#cccccc";
        });

        button.addEventListener("mouseout", () => {
            button.style.backgroundColor = isSafeColor(label.color) ? `${label.color}80` : "#cccccc80";
        });

        container.appendChild(button);
        if (!label.data.trim() || (!label.color.trim() || label.color.trim() === "#") || (!label.fontColor.trim() || label.fontColor.trim() === "#")) {
            button.style.display = "none";
        }
    });

    const article = document.getElementById("profile-article");
    article.appendChild(container);
}

export function createIconList(profileData) {
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
        setSafeText(iconImg, iconData.icon);
        iconImg.alt = iconData.icon;
        iconImg.loading = "lazy";
        disableDrag(iconImg);
        disableContextMenuOnImage(iconImg);

        const iconLink = document.createElement("a");
        if (isSafeUrl(iconData.url)) {
            iconLink.href = iconData.url;
            iconLink.target = "_blank";
            iconLink.rel = "noopener noreferrer";
        } else {
            iconLink.href = "#";
            iconLink.title = "Lien non valide";
        }

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

export function createStatusBar(profileData) {
    const maxCaracter = 50;
    
    // Récupérer le conteneur du profil
    const profileContainer = document.querySelector(".profile-container");
    if (!profileContainer) {
        console.warn("Profile container not found for status bar");
        return;
    }
    
    // Conteneur principal de la barre de statut
    const statusBarContainer = document.createElement("div");
    statusBarContainer.className = "status-bar-container";
    
    // Texte de statut (ordre -1 pour apparaître à gauche)
    const statusBarText = document.createElement("div");
    statusBarText.className = "statusBarText";
    statusBarText.textContent = profileData.statusbar.text.substring(0, maxCaracter);
    if (profileData.statusbar.text.length > maxCaracter) {
        statusBarText.textContent += "...";
    }
    
    // Cercle de statut avec état automatique
    const circleStatusBar = document.createElement("div");
    circleStatusBar.className = "circle-status-bar";
    
    // Déterminer automatiquement l'état basé sur le texte ou couleur
    const statusText = profileData.statusbar.text.toLowerCase();
    let statusClass = "status-online"; // Par défaut
    
    if (statusText.includes("busy") || statusText.includes("occupé") || statusText.includes("work")) {
        statusClass = "status-busy";
    } else if (statusText.includes("away") || statusText.includes("absent") || statusText.includes("afk")) {
        statusClass = "status-away";
    } else if (statusText.includes("offline") || statusText.includes("off") || statusText.includes("déconnecté")) {
        statusClass = "status-offline";
    } else if (statusText.includes("online") || statusText.includes("disponible") || statusText.includes("actif")) {
        statusClass = "status-online";
    }
    
    circleStatusBar.classList.add(statusClass);

    // Assemblage du conteneur (texte puis cercle pour position gauche)
    statusBarContainer.appendChild(statusBarText);
    statusBarContainer.appendChild(circleStatusBar);

    // Masquer si pas de texte
    if (!profileData.statusbar.text.trim()) {
        statusBarContainer.style.display = "none";
        return;
    }

    // Ajouter au conteneur de profil (position relative)
    profileContainer.appendChild(statusBarContainer);

    // Interactions style Discord
    let isTextVisible = false;
    let hideTimeout;

    const showText = () => {
        clearTimeout(hideTimeout);
        statusBarText.classList.add("show");
        isTextVisible = true;
    };

    const hideText = () => {
        hideTimeout = setTimeout(() => {
            statusBarText.classList.remove("show");
            isTextVisible = false;
        }, 500);
    };

    // Gestion des événements
    statusBarContainer.addEventListener("mouseenter", showText);
    statusBarContainer.addEventListener("mouseleave", hideText);

    // Clic pour basculer l'affichage du texte
    circleStatusBar.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isTextVisible) {
            statusBarText.classList.remove("show");
            isTextVisible = false;
        } else {
            showText();
        }
    });

    // Animation d'entrée
    setTimeout(() => {
        statusBarContainer.style.opacity = "1";
        statusBarContainer.style.transform = "translateY(0)";
    }, 800);
}

export default {
    createProfileContainer,
    createUserName,
    createEmailAndDescription,
    showCopyModal,
    createLinkBoxes,
    validateProfileConfig,
    createLabelButtons,
    createIconList,
    createStatusBar
};
