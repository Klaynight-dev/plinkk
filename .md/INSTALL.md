# 🚀 Installation Rapide - Plinkk

Ce guide vous permettra d'installer et configurer Plinkk en moins de 5 minutes.

## ⚡ Installation Express

### 1. Prérequis
- **Node.js** v16+ ([Télécharger](https://nodejs.org/))
- **Git** ([Télécharger](https://git-scm.com/))
- Un éditeur de code (VS Code recommandé)

### 2. Installation Automatique

```bash
# Cloner et installer
git clone https://github.com/Klaynight-dev/links_website_template.git
cd links_website_template
npm install

# Compiler et lancer
npm run build
npm run serve
```

### 3. Accéder au Site
Ouvrez votre navigateur à : `http://localhost:8000`

## 🎨 Configuration Rapide

### Éditer votre Profil

Ouvrez `contents/js/config/profileConfig.js` et modifiez :

```javascript
const profileData = {
    userName: "Votre Nom",                    // ✏️ Votre nom
    email: "votre@email.com",                 // ✏️ Votre email
    description: "Votre description",         // ✏️ Votre bio
    
    profileImage: "URL_de_votre_photo",       // 🖼️ Photo de profil
    profileLink: "https://votre-site.com",    // 🔗 Lien principal
    
    // 🎯 Barre de statut Discord
    statusbar: {
        text: "En ligne"                      // ✏️ Votre statut
    },
    
    // 🔗 Vos liens
    links: [
        {
            icon: "https://github.com/favicon.ico",
            url: "https://github.com/votre-username",
            text: "GitHub",
            description: "Mon profil GitHub",
            showDescription: true
        }
        // Ajoutez d'autres liens...
    ],
    
    // Thème et animations
    selectedThemeIndex: 5,        // 0-7 (voir thèmes disponibles)
    neonEnable: 1                 // 1=activé, 0=désactivé
};
```

### États de Statut Automatiques

Le système détecte automatiquement votre état :

| Texte | État | Couleur |
|-------|------|---------|
| "online", "disponible", "actif" | 🟢 En ligne | Vert |
| "busy", "occupé", "work" | 🔴 Occupé | Rouge |
| "away", "absent", "afk" | 🟡 Absent | Orange |
| "offline", "off", "déconnecté" | ⚫ Hors ligne | Gris |

## 🎨 Thèmes Disponibles

Changez `selectedThemeIndex` pour :

- **0** : Dark Classic (Noir/Bleu)
- **1** : Light Modern (Blanc/Gris)
- **2** : Discord Blue (Bleu Discord)
- **3** : Cyberpunk (Violet/Rose)
- **4** : Forest Green (Verts)
- **5** : Ocean Blue (Bleus) ⭐ Recommandé
- **6** : Sunset Orange (Orange/Rouge)
- **7** : Minimalist (Noir/Blanc)

## 🔗 Icônes Disponibles

Pour `socialIcon`, utilisez ces noms :

### Populaires
- `github` `discord` `twitter` `instagram` `linkedin`
- `youtube` `tiktok` `twitch` `spotify` `steam`
- `email` `website` `blog` `portfolio`

### Réseaux Sociaux
- `facebook` `snapchat` `reddit` `pinterest` `tumblr`
- `mastodon` `threads` `bluesky` `telegram` `signal`

### Professionnels
- `behance` `dribbble` `figma` `dev-to` `medium`
- `stack-overflow` `gitlab` `codepen`

### Commerce
- `paypal` `venmo` `cash-app` `ko-fi` `patreon`
- `etsy` `amazon` `shop` `square`

[Liste complète dans docs.md](./docs.md#liste-des-icônes-svg)

## 🚀 Déploiement

### GitHub Pages
1. Fork le repository
2. Settings → Pages → Source: Deploy from branch `main`
3. Votre site sera disponible à `https://username.github.io/links_website_template`

### Netlify
1. Compte Netlify → New site from Git
2. Connectez votre repository GitHub
3. Deploy settings :
   - Build command : `npm run build`
   - Publish directory : `/`

### Vercel
1. Compte Vercel → Import Git Repository
2. Sélectionnez votre fork
3. Configuration automatique détectée

## 🛠️ Mode Développement

```bash
# Terminal 1 : Compilation TypeScript
npm run dev

# Terminal 2 : Serveur local
npm run serve
# OU utilisez Live Server dans VS Code
```

## ❌ Problèmes Courants

### Images ne s'affichent pas
- ✅ Utilisez des URLs HTTPS
- ✅ Vérifiez que les images sont publiques
- ✅ Testez les URLs dans votre navigateur

### TypeScript ne compile pas
```bash
npm install typescript@latest
npm run build
```

### Animations saccadées
- ✅ Réduisez le nombre d'animations simultanées
- ✅ Testez sur un autre navigateur
- ✅ Désactivez temporairement : `EnableAnimation*: 0`

## 📚 Aller Plus Loin

- **Documentation complète** : [docs.md](./docs.md)
- **Exemples avancés** : [GitHub Issues](https://github.com/Klaynight-dev/links_website_template/issues)
- **Support** : Ouvrez une issue GitHub

## 🎯 Checklist Finale

- [ ] ✏️ Nom et email configurés
- [ ] 🖼️ Photo de profil ajoutée
- [ ] 🔗 Liens principaux configurés
- [ ] 🎨 Thème sélectionné
- [ ] 🚀 Site déployé
- [ ] 📱 Test sur mobile

---

🎉 **Félicitations !** Votre site Plinkk est prêt !

💡 **Astuce** : Sauvegardez votre `profileConfig.js` pour réutiliser votre configuration facilement.
