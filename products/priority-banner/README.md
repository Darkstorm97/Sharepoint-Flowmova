# Priority Banner

Priority Banner est un Web Part SharePoint Framework publié par Flowmova. Il affichera des messages prioritaires programmés dans les pages SharePoint modernes.

## État

Les lots 1 et 2 mettent en place la fondation indépendante du produit et une expérience visuelle configurable. La liste SharePoint, la sélection dynamique des messages et la fermeture persistante ne sont pas encore implémentées.

Le Web Part propose actuellement :

- les formats Standard et Compact ;
- les niveaux Information, Important, Urgent et Critique ;
- un titre et un message configurables ;
- une action facultative avec validation du lien ;
- une fermeture facultative pour la session d’affichage courante ;
- un panneau de propriétés bilingue et un comportement responsive.

## Identité

- produit : Priority Banner ;
- nom français : Bandeau prioritaire ;
- auteur et éditeur : Flowmova ;
- package : `priority-banner.sppkg` ;
- permission Microsoft Graph : aucune ;
- backend Azure : aucun.

## Stack

- SharePoint Framework 1.23.2 ;
- Node.js 22 LTS ;
- React 17 ;
- Fluent UI 8 ;
- TypeScript 5.8 ;
- Heft.

## Langues

- `en-US` ;
- `en-CA` ;
- `fr-FR` ;
- `fr-CA` ;
- anglais comme langue de secours.

## Installation des dépendances

```powershell
npm.cmd install
```

## Test dans SharePoint

```powershell
npm.cmd run start
```

Le serveur de développement expose les ressources sur `https://localhost:4321` et ouvre le Workbench du site de développement configuré.

## Build de production

```powershell
npm.cmd run build
```

Package généré :

```text
sharepoint/solution/priority-banner.sppkg
```

Le package généré et les dépendances ne sont pas suivis par Git.

## Validation des lots 1 et 2

- compilation TypeScript, Sass, ESLint et Webpack réussie ;
- package SharePoint de production généré avec succès ;
- ressources `en-US`, `en-CA`, `fr-FR` et `fr-CA` incluses ;
- métadonnées Flowmova et identifiants propres au produit vérifiés ;
- aucune vulnérabilité connue dans les dépendances de production selon `npm audit --omit=dev`.
- bundle de développement vérifié avec la classe `PriorityBannerWebPart` ;
- package de production nettoyé de toute ressource de rechargement à chaud.
