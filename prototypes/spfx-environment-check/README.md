# SPFx Environment Check

Laboratoire technique utilisé pour valider la chaîne de développement SharePoint Framework avant de créer un produit commercial.

Ce projet n'est pas destiné au Microsoft Store et ne doit pas servir de base fonctionnelle au premier composant.

## Stack validée

- SharePoint Framework 1.23.2
- Node.js 22 LTS
- React 17
- Fluent UI 8
- TypeScript 5.8
- Heft 1.2

## Web Part

- Nom : `EnvironmentCheck`
- Type : Web Part React
- Permissions Microsoft Graph : aucune
- Isolation de domaine : désactivée
- Déploiement automatique sur tous les sites : désactivé
- Ressources client incluses dans le package : oui

## Installation

Depuis ce dossier :

```powershell
npm install
```

Le dossier `node_modules` n'est pas suivi par Git.

## Certificat de développement

À exécuter une seule fois pour le compte Windows utilisé :

```powershell
heft trust-dev-cert
```

## Test local

```powershell
npm run start
```

Le serveur de développement expose les ressources sur `https://localhost:4321`. La Web Part doit être chargée depuis une page SharePoint de test ou le Workbench configuré dans `config/serve.json`.

Pour arrêter le serveur : `Ctrl+C`.

## Build de production

```powershell
heft build --production
heft package-solution --production
```

Package généré :

```text
sharepoint/solution/spfx-environment-check.sppkg
```

Le `.sppkg` est un artefact généré et n'est pas suivi par Git.

## Résultats de validation

- génération Yeoman : réussie ;
- installation des dépendances : réussie ;
- compilation TypeScript, Sass, ESLint et Webpack : réussie ;
- certificat HTTPS local : approuvé ;
- manifeste local sur le port 4321 : accessible ;
- affichage de la Web Part dans SharePoint : validé ;
- build de production : réussi ;
- création et validation du `.sppkg` : réussies ;
- déploiement dans l'App Catalog : à valider.

## Limites

Ce laboratoire utilise encore le Workbench SharePoint pour la validation initiale. Microsoft prévoit son retrait le 1er décembre 2026. Les futurs composants devront utiliser le SPFx Debug Toolbar ou une page SharePoint moderne pour le débogage courant.
