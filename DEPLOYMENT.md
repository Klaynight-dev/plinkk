# 🚀 Guide de Déploiement - Plinkk

## 🎯 Déploiement Automatique

### GitHub Pages (Recommandé)

1. **Activation de GitHub Pages :**
   - Va dans les paramètres de ton repo GitHub
   - Section "Pages" → Source : "GitHub Actions"

2. **Déploiement automatique :**
   - Chaque push sur `main` déclenche le déploiement
   - Le workflow compile automatiquement le TypeScript
   - Déploie sur `https://username.github.io/nom-du-repo`

### 🔧 Workflows Disponibles

| Fichier | Déclencheur | Description |
|---------|-------------|-------------|
| `deploy-simple.yml` | Push sur main | Déploiement complet |
| `test-build.yml` | Pull Request | Test de compilation |

## 🛠️ Développement Local

### Commandes NPM

```bash
# Compiler le TypeScript
npm run build

# Mode développement (watch)
npm run dev

# Déploiement local complet
npm run deploy:local

# Aperçu local
npm run preview
```

### 📁 Structure après build

```
├── contents/
│   ├── js/
│   │   ├── init.js          # Compilé depuis init.ts
│   │   ├── tools.js         # Compilé depuis tools.ts
│   │   └── config/          # Fichiers de config JS
│   └── css/
└── index.html
```

## 🔍 Résolution de Problèmes

### Erreurs 404 (Fichiers non trouvés)

**Problème :** `Failed to load resource: the server responded with a status of 404`

**Solutions :**
1. Vérifier que les chemins dans `index.html` pointent vers `./contents/js/`
2. S'assurer que les fichiers JS compilés sont copiés au bon endroit
3. Tester localement avec `npm run test:deployment`

### Erreurs de Compilation

```bash
# Nettoyer et rebuilder
npm run clean
npm run build
```

### Erreurs de Déploiement

1. Vérifier les logs dans l'onglet "Actions" GitHub
2. S'assurer que GitHub Pages est activé
3. Vérifier les permissions du workflow

### Debug Local

```bash
# Test complet de déploiement
npm run test:deployment

# Vérifier la compilation
npm run build
ls dist/

# Tester localement
npm run preview
# Ouvre http://localhost:8000
```

## 🌐 URLs de Déploiement

- **Production :** `https://klaynight-dev.github.io/plinkk`
- **Local :** `http://localhost:8000`

## 📊 Monitoring

Les workflows GitHub Actions fournissent :
- ✅ Status de compilation
- 📁 Artifacts de build
- 🔗 URL de déploiement
- 📊 Résumés détaillés

---

*Créé avec ❤️ par Klaynight Dev*
