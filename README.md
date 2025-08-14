# 🔗 Plinkk - Template de Site de Liens Moderne

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Klaynight-dev/links_website_template)

**Plinkk** est un template moderne et entièrement personnalisable pour créer votre propre page de liens (type Linktree). Avec un design Discord-like, des animations fluides et des effets visuels avancés.

## ✨ Fonctionnalités

### 🎨 Interface Moderne
- **Design glassmorphism** avec effets de flou et transparence
- **Barre de statut Discord** avec états dynamiques (en ligne, occupé, absent, hors ligne)
- **Thèmes adaptatifs** qui s'ajustent automatiquement au système
- **Animations fluides** et transitions cinématographiques
- **Effets néon** personnalisables sur le profil

### 🔧 Fonctionnalités Avancées
- **Système de labels** avec couleurs personnalisées
- **Descriptions dépliables** au survol des liens
- **Copie d'email** avec easter eggs et animations
- **Réseaux sociaux** avec icônes SVG intégrées
- **Validation de sécurité** pour tous les contenus utilisateur
- **TypeScript** pour une meilleure robustesse du code

### 🎯 Interactions
- **Hover effects** sophistiqués
- **Animations d'entrée** personnalisables
- **Système de vibrations** pour les interactions mobiles
- **Gestion tactile** optimisée

## 🚀 Installation Rapide

### Prérequis
- **Node.js** (v16 ou supérieur)
- **npm** ou **yarn**
- Un éditeur de code (VS Code recommandé)

### 1. Cloner le projet
```bash
git clone https://github.com/Klaynight-dev/links_website_template.git
cd links_website_template
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Compiler TypeScript
```bash
# Compilation unique
npm run build

# Mode développement (recompilation automatique)
npm run dev
```

### 4. Lancer le serveur de développement
```bash
# Serveur Python simple
npm run serve

# Ou avec Live Server (VS Code)
# Clic droit sur index.html > "Open with Live Server"
```

### 5. Accéder au site
Ouvrez votre navigateur à l'adresse : `http://localhost:8000`

## ⚙️ Configuration

### Configuration du Profil

Éditez le fichier `contents/js/config/profileConfig.js` :

```javascript
const profileData = {
    // Informations de base
    userName: "Votre Nom",
    email: "votre@email.com",
    description: "Votre description",
    
    // Profil
    profileImage: "URL_de_votre_photo",
    profileLink: "https://votre-site.com",
    profileIcon: "URL_de_votre_icone",
    profileSiteText: "Nom du site",
    
    // Barre de statut Discord
    statusbar: {
        text: "En ligne", // Texte de statut
        color: "#43b581"  // Couleur (optionnel)
    },
    
    // Liens personnalisés
    links: [
        {
            icon: "URL_de_l_icone",
            url: "https://votre-lien.com",
            text: "Nom du lien",
            description: "Description optionnelle",
            showDescription: true
        }
    ],
    
    // Labels colorés
    labels: [
        {
            data: "Frontend",
            color: "#3498db",
            fontColor: "#ffffff"
        }
    ],
    
    // Réseaux sociaux
    socialIcon: [
        {
            icon: "github",
            url: "https://github.com/votre-username"
        }
    ],
    
    // Personnalisation visuelle
    selectedThemeIndex: 5,
    neonEnable: 1,
    neonColors: ["#7289DA", "#FF4500", "#00FF00"],
    
    // Animations
    EnableAnimationArticle: 1,
    EnableAnimationButton: 1,
    EnableAnimationBackground: 1,
    canvaEnable: 1,
    
    // Métadonnées SEO
    meta: {
        title: "Votre Nom - Liens",
        description: "Page de liens de Votre Nom",
        keywords: "profil, liens, portfolio",
        url: "https://votre-domaine.com"
    }
};
```

### Barre de Statut Discord

La barre de statut détecte automatiquement l'état basé sur le texte :

- **🟢 En ligne** : "online", "disponible", "actif"
- **🔴 Occupé** : "busy", "occupé", "work"
- **🟡 Absent** : "away", "absent", "afk"
- **⚫ Hors ligne** : "offline", "off", "déconnecté"

```javascript
statusbar: {
    text: "En développement" // Sera automatiquement détecté comme "occupé"
}
```

## 🎨 Thèmes Disponibles

| Index | Nom | Description |
|-------|-----|-------------|
| 0 | Dark Classic | Thème sombre classique |
| 1 | Light Modern | Thème clair moderne |
| 2 | Discord Blue | Inspiré de Discord |
| 3 | Cyberpunk | Néon et futurisme |
| 4 | Forest Green | Tons verts naturels |
| 5 | Ocean Blue | Bleus océaniques |

## 🎭 Animations

### Animations d'Article
- Fade In, Slide Up, Zoom In, Bounce, etc.

### Animations de Boutons
- Hover Effects, Pulse, Glow, Shake, etc.

### Animations Canvas
- Particules, Confetti, Matrix, DNA, Galaxie, etc.

## 📱 Responsive Design

Le template est entièrement responsive avec :
- **Mobile First** approach
- **Breakpoints optimisés** pour tous les appareils
- **Touch gestures** pour mobile
- **Animations adaptées** selon l'appareil

## 🔧 Scripts NPM

```bash
# Compiler TypeScript
npm run build

# Mode développement avec watch
npm run dev

# Nettoyer les fichiers compilés
npm run clean

# Serveur de développement
npm run serve
```

## 🎯 Fonctionnalités Avancées

### Easter Eggs
- **Spam du bouton copier** : Animations progressives avec messages humoristiques
- **Vibrations système** : Effets de secousse sur spam
- **Explosion du bouton** : Animation d'explosion après 1000 clics

### Sécurité
- **Validation d'URL** : Protection contre les liens malveillants
- **Sanitisation** : Nettoyage automatique des contenus
- **CSP Headers** : Protection contre les injections

### Performance
- **Lazy Loading** : Chargement différé des images
- **Code Splitting** : Modules séparés pour de meilleures performances
- **Optimisations CSS** : Animations GPU-accelerated

## 🛠️ Développement

### Structure du Projet
```
links_website_template/
├── index.html                 # Page principale
├── contents/
│   ├── css/
│   │   ├── styles.css        # Styles principaux
│   │   ├── animations.css    # Animations CSS
│   │   └── button.css        # Styles de boutons
│   ├── js/
│   │   ├── init.ts          # Initialisation TypeScript
│   │   ├── tools.ts         # Fonctions utilitaires
│   │   ├── assets/
│   │   │   └── security.js  # Sécurité
│   │   └── config/
│   │       ├── profileConfig.js
│   │       ├── themeConfig.js
│   │       └── animationConfig.js
│   └── images/
│       ├── icons/           # Icônes SVG
│       └── logo.png
├── package.json
├── tsconfig.json
└── README.md
```

### Ajouter de Nouvelles Fonctionnalités

1. **Nouveau Thème** :
```javascript
// Dans themeConfig.js
{
    background: "rgba(128, 0, 128, 0.6)",
    hoverColor: "#9932CC",
    textColor: "#FFFFFF",
    buttonBackground: "#4B0082",
    buttonHoverBackground: "#9932CC",
    buttonTextColor: "#FFFFFF",
    linkHoverColor: "#DA70D6"
}
```

2. **Nouvelle Animation** :
```javascript
// Dans animationConfig.js
{
    name: "rotateIn",
    keyframes: "rotateIn 1s ease-out"
}
```

## 🐛 Dépannage

### Problèmes Courants

**TypeScript ne compile pas :**
```bash
npm install typescript@latest
npm run build
```

**Images ne s'affichent pas :**
- Vérifiez les URLs dans `profileConfig.js`
- Assurez-vous que les images sont accessibles publiquement

**Animations saccadées :**
- Réduisez le nombre d'animations simultanées
- Utilisez `will-change` pour les propriétés animées

**Problèmes de responsive :**
- Testez sur différentes tailles d'écran
- Vérifiez les media queries CSS

## 🚀 Déploiement

### Vercel (Recommandé)
1. **Connectez votre repository GitHub à Vercel**
2. **Configuration automatique** : Vercel détectera le `vercel.json`
3. **Build automatique** : Le script `npm run build` sera exécuté
4. **Déploiement instantané** vers le dossier `public/`

**Configuration locale pour test :**
```bash
# Installer les dépendances
npm install

# Compiler et préparer pour la production
npm run build

# Tester localement
npm run serve
```

### Netlify
1. **Connectez votre repository GitHub**
2. **Build command** : `npm run build`
3. **Publish directory** : `public`

### GitHub Pages
1. **Fork ou clone ce repository**
   ```bash
   git clone https://github.com/Klaynight-dev/links_website_template.git
   cd links_website_template
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Compiler le projet**
   ```bash
   npm run build
   ```

4. **Push vers votre repository GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

5. **Activer GitHub Pages**
   - Allez dans les **Settings** de votre repository
   - Scrollez jusqu'à la section **Pages** 
   - Dans **Source**, sélectionnez **GitHub Actions**
   - Le déploiement se fera automatiquement à chaque push sur la branche `main`

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

**Klaynight Dev**
- GitHub: [@Klaynight-dev](https://github.com/Klaynight-dev)
- Email: contact@klaynight.fr

## 🙏 Remerciements

- Inspiration : Discord UI/UX
- Icônes : Collection SVG personnalisée
- Animations : CSS3 et JavaScript moderne
- TypeScript pour la robustesse du code

---

⭐ **N'oubliez pas de donner une étoile au projet si vous l'appréciez !**

    ```js
      const profileData = {
        profileLink: "https://github.com", // Lien du profil 
        profileImage: "https://avatars.githubusercontent.com/u/9919?s=200&v=4", // Image de profil
        profileIcon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", // Icone derrière le profil
        profileSiteText: "GitHub", // Nom derrière le profil
        userName: "GitHub User", // Nom affiché sur la page et dans le titre de l'onglet
        email: "user@github.com", // Adresse mail affichée sur la page
        links: [ // Liens affichés sur la page
            { icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", url: "https://github.com/link1", text: "Link 1" },
            { icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", url: "https://github.com/link2", text: "Link 2" },
            { icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", url: "https://github.com/link3", text: "Link 3" }
        ],
        // Image de fond
        backgroundImage: "https://static.vecteezy.com/ti/vecteur-libre/p1/12697876-motif-geometriquele-continue-noir-et-blanc-motif-repetitif-monochrome-arriere-plan-abstrait-optique-tridimensionnel-avec-cubes-troues-vectoriel.jpg",
        profileHoverColor: "#7289DA", // Couleur de hover sur l'article (l'élément principal)
        neonColors: ["#7289DA", "#FF4500", "#00FF00", "#FFD700", "#FF69B4"], // Couleurs du neon de profil
        neonEnable: 1, // 1 : Enable, 0 : Disable
        iconUrl: "https://avatars.githubusercontent.com/u/9919?s=200&v=4", // Icone de l'onglet
        description: "Mollit laboris cupidatat do enim nulla ex laborum. Nulla labore reprehenderit nisi non anim aute.", // Description affichée sur la page, display: none si vide
        meta: {
            title: "GitHub User - Linktree", // Titre de l'onglet
            description: "GitHub User's Linktree", // Description de l'onglet
            keywords: "GitHub, User, Profile, Links, Website, Template, plinkk, klaynight", // Mots-clés de l'onglet
            url: "https://github.com" // URL de l'onglet
        },
        
        EnableAnimationArticle: 1, // 1 : Enable, 0 : Disable
        EnableAnimationButton: 1, // 1 : Enable, 0 : Disable
        EnableAnimationBackground: 1, // 1 : Enable, 0 : Disable

        backgroundSize : 50, // En pourcentage
        
        selectedThemeIndex: 5,                   // Thème sélectionné            (voir ci-dessous)

        selectedAnimationIndex : 0,             // Animation de l'article       (voir ci-dessous)
        selectedAnimationButtonIndex : 10,       // Animation des boutons        (voir ci-dessous)
        selectedAnimationBackgroundIndex: 0,     // Animation de l'arrière-plan  (voir ci-dessous)

    ```js
      const profileData = {
        profileLink: "https://github.com", // Lien du profil 
        profileImage: "https://avatars.githubusercontent.com/u/9919?s=200&v=4", // Image de profil
        profileIcon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", // Icone derrière le profil
        profileSiteText: "GitHub", // Nom derrière le profil
        userName: "GitHub User", // Nom affiché sur la page et dans le titre de l'onglet
        email: "user@github.com", // Adresse mail affichée sur la page
        links: [ // Liens affichés sur la page
            { icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", url: "https://github.com/link1", text: "Link 1" },
            { icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", url: "https://github.com/link2", text: "Link 2" },
            { icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", url: "https://github.com/link3", text: "Link 3" }
        ],
        // Image de fond
        backgroundImage: "https://static.vecteezy.com/ti/vecteur-libre/p1/12697876-motif-geometriquele-continue-noir-et-blanc-motif-repetitif-monochrome-arriere-plan-abstrait-optique-tridimensionnel-avec-cubes-troues-vectoriel.jpg",
        profileHoverColor: "#7289DA", // Couleur de hover sur l'article (l'élément principal)
        neonColors: ["#7289DA", "#FF4500", "#00FF00", "#FFD700", "#FF69B4"], // Couleurs du neon de profil
        neonEnable: 1, // 1 : Enable, 0 : Disable
        iconUrl: "https://avatars.githubusercontent.com/u/9919?s=200&v=4", // Icone de l'onglet
        description: "Mollit laboris cupidatat do enim nulla ex laborum. Nulla labore reprehenderit nisi non anim aute.", // Description affichée sur la page, display: none si vide
        meta: {
            title: "GitHub User - Linktree", // Titre de l'onglet
            description: "GitHub User's Linktree", // Description de l'onglet
            keywords: "GitHub, User, Profile, Links, Website, Template, plinkk, klaynight", // Mots-clés de l'onglet
            url: "https://github.com" // URL de l'onglet
        },
        
        EnableAnimationArticle: 1, // 1 : Enable, 0 : Disable
        EnableAnimationButton: 1, // 1 : Enable, 0 : Disable
        EnableAnimationBackground: 1, // 1 : Enable, 0 : Disable

        backgroundSize : 50, // En pourcentage
        
        selectedThemeIndex: 5,                   // Thème sélectionné            (voir ci-dessous)

        selectedAnimationIndex : 0,             // Animation de l'article       (voir ci-dessous)
        selectedAnimationButtonIndex : 10,       // Animation des boutons        (voir ci-dessous)
        selectedAnimationBackgroundIndex: 0,     // Animation de l'arrière-plan  (voir ci-dessous)

        animationDurationBackground: 30,  // Durée de l'animation en secondes
        delayAnimationButton: 0.1,        // Délai de l'animation en secondes

        canvaEnable: 1, // 1 : Enable, 0 : Disable
        selectedCanvasIndex: 12,          // Animation du canva (voir ci-dessous)
    };
    ```

3. **Personnaliser les thèmes :**
  - Vous pouvez ajouter ou modifier les thèmes dans le tableau [themes](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/themeConfig.js) :
    - [background](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/themeConfig.js#L5): Couleur de fond en rgba.
    - [hoverColor](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/themeConfig.js#L6): Couleur de survol des éléments.
    - [textColor](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/themeConfig.js#L7): Couleur du texte.
    - [buttonBackground](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/themeConfig.js#L8): Couleur de fond des boutons.
    - [buttonHoverBackground](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/themeConfig.js#L9): Couleur de fond des boutons au survol.
    - [buttonTextColor](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/themeConfig.js#L10): Couleur du texte des boutons.
    - [linkHoverColor](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/themeConfig.js#L11): Couleur des liens au survol.
    - [opposite](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/themeConfig.js#L12): Configuration du thème opposé.

    ```js
    const themes = [
    {
    background: "rgba(0, 0, 0, 0.6)",
    hoverColor: "#7289DA",
    textColor: "white",
    buttonBackground: "#2C2F33",
    buttonHoverBackground: "#7289DA",
    buttonTextColor: "white",
    linkHoverColor: "#7289DA",
    opposite: {
      background: "rgba(255, 255, 255, 0.6)",
      hoverColor: "#7289DA",
      textColor: "white",
      buttonBackground: "#7289DA",
      buttonHoverBackground: "#2C2F33",
      buttonTextColor: "black",
      linkHoverColor: "#2C2F33"
    }
    },
    // Ajoutez d'autres thèmes ici
    ];
    ```

4. **Configurer les animations :**
    - Vous pouvez ajouter ou modifier les animations dans [animationConfig.js](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/animationConfig.js) :
    - [name](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/animationConfig.js#L5): Nom de l'animation.
    - [keyframes](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/animationConfig.js#L6): Définition des images clés pour l'animation.
    ```js
        const animations = [
          {
          name: "fade",
          keyframes: "fade 1s ease-in-out"
          },
          // Ajoutez d'autres animations ici
        ];
    ```

5. **Ajouter des animations de canvas :**
    - Vous pouvez ajouter ou modifier les animations de canvas dans [canvaConfig.js](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/canvaConfig.js) :
      - [animationName](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/canvaConfig.js#L5): Nom de l'animation.
      - [fileNames](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/canvaConfig.js#L6): Nom du fichier JavaScript contenant l'animation.
      - [extension](https://github.com/Klaynight-dev/links_website_template/blob/main/contents/js/config/canvaConfig.js#L7): URL des bibliothèques externes nécessaires pour l'animation.

      ```js
      const canvaData = [
        {
        animationName: 'Confetti',
        fileNames: 'confetti.js',
        extension: 'none',
        },
        // Ajoutez d'autres animations ici
      ];
      ```

## Mettre à jour votre fork automatiquement

Pour automatiser la mise à jour de votre fork avec les dernières modifications du dépôt d'origine, vous pouvez configurer un workflow GitHub Actions. Suivez les étapes ci-dessous :

1. **Créer un fichier de workflow** :
    - Dans votre fork, créez un répertoire [workflows](https://github.com/Klaynight-dev/links_website_template/blob/main/workflow) s'il n'existe pas déjà.
    - Ajoutez un fichier nommé `update_fork.yml` dans ce répertoire avec le contenu suivant :

    ```yaml
    name: Update Fork

    on:
      schedule:
        - cron: '0 0 * * 0' # Exécuter chaque dimanche à minuit
      workflow_dispatch:

    jobs:
      update-fork:
        runs-on: ubuntu-latest

        steps:
          - name: Checkout repository
            uses: actions/checkout@v2

          - name: Set up Git
            run: |
              git config --global user.name 'github-actions'
              git config --global user.email 'github-actions@github.com'

          - name: Add upstream remote
            run: git remote add upstream https://github.com/Klaynight-dev/links_website_template.git

          - name: Fetch upstream
            run: git fetch upstream

          - name: Merge upstream changes
            run: |
              git checkout main
              git merge upstream/main

          - name: Push changes
            env:
              GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            run: git push origin main
    ```

2. **Configurer le workflow** :
    - Le secret `GITHUB_TOKEN` est automatiquement fourni par GitHub Actions et permet d'authentifier les actions GitHub pour pousser les modifications.

3. **Activer le workflow** :
    - Une fois le fichier `update_fork.yml` ajouté et poussé dans votre fork, le workflow sera automatiquement exécuté selon le planning défini (chaque dimanche à minuit) ou manuellement via l'interface GitHub Actions.

## Améliorations futures pour le projet

| Numéro | Idée                           | Description                                                                                    | Statut |
|--------|--------------------------------|------------------------------------------------------------------------------------------------|--------|
| 1      | Catégorisation des liens       | Ajouter des catégories pour organiser les liens (par exemple, travail, loisirs, éducation).    | ❌    |
| 2      | Recherche et filtres           | Implémenter une fonctionnalité de recherche et des filtres pour trouver des liens spécifiques. | ❌    |
| 3      | Interface utilisateur améliorée| Travailler sur le design et l'ergonomie du site pour une meilleure expérience utilisateur.     | ❌    |
| 4      | Support multilingue            | Ajouter la prise en charge de plusieurs langues pour atteindre un public plus large.           | ❌    |
| 5      | Thèmes adaptatifs              | Ajuster automatiquement le thème selon celui du système de l'utilisateur ou ses préférences    | ✅    |
| 6      | Barre de statut Discord        | Système de statut en temps réel avec états personnalisables                                     | ✅    |
| 7      | TypeScript Migration           | Migration complète du JavaScript vers TypeScript pour plus de robustesse                        | ✅    |
| 8      | Système de sécurité avancé     | Validation et sanitisation de tous les contenus utilisateur                                     | ✅    |

## 📚 Documentation Complète

Pour une documentation détaillée, consultez le fichier [docs.md](./docs.md) qui contient :

- Configuration avancée
- Liste complète des thèmes et animations
- Guide de développement
- FAQ et dépannage
- Exemples de personnalisation

## 🤝 Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à :

1. 🐛 **Signaler des bugs** via les issues GitHub
2. 💡 **Proposer des améliorations** 
3. 🔧 **Soumettre des pull requests**
4. 📖 **Améliorer la documentation**

## 📝 Changelog

### v1.25.07.31
- ✅ Migration vers TypeScript
- ✅ Barre de statut Discord avec détection automatique
- ✅ Système de sécurité avancé
- ✅ Nouveau design glassmorphism
- ✅ Easter eggs et animations améliorées
- ✅ Support mobile optimisé

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

# Plinkk - Template de site de liens

Un template élégant pour créer votre page de liens personnalisée.

## 🚀 Déploiement sur GitHub Pages

### Instructions de déploiement :

1. **Fork ou clone ce repository**
   ```bash
   git clone https://github.com/Klaynight-dev/plinkk.git
   cd plinkk
   ```

2. **Push vers votre repository GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Activer GitHub Pages**
   - Allez dans les **Settings** de votre repository
   - Scrollez jusqu'à la section **Pages**
   - Dans **Source**, sélectionnez **GitHub Actions**
   - Le déploiement se fera automatiquement à chaque push sur la branche `main`

4. **Accéder à votre site**
   - Votre site sera disponible à l'adresse : `https://[votre-username].github.io/[nom-du-repo]`

## 🛠️ Personnalisation

1. Modifiez le fichier `contents/js/config.js` pour personnaliser vos informations
2. Remplacez les images dans `contents/images/`
3. Ajustez les styles dans `contents/css/`

## 📁 Structure du projet

```
├── contents/
│   ├── css/          # Fichiers de styles
│   ├── js/           # Scripts JavaScript
│   └── images/       # Images et assets
├── .github/
│   └── workflows/    # Actions GitHub pour le déploiement
├── index.html        # Page principale
└── README.md         # Documentation
```

## 🔧 Technologies utilisées

- HTML5
- CSS3
- JavaScript (ES6+)
- Anime.js pour les animations
- GSAP pour les animations avancées
- Ionicons pour les icônes

## 📝 Licence

Ce projet est sous licence MIT.
