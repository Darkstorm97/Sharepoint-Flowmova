# Priority Banner

Priority Banner est un Web Part SharePoint Framework publié par Flowmova. Il affichera des messages prioritaires programmés dans les pages SharePoint modernes.

## État

Les lots 1 à 3 mettent en place la fondation indépendante, l’expérience visuelle et la connexion aux données SharePoint. La sélection programmée des messages et la fermeture persistante ne sont pas encore implémentées.

Le Web Part propose actuellement :

- les formats Standard et Compact ;
- les niveaux Information, Important, Urgent et Critique ;
- un titre et un message configurables ;
- une action facultative avec validation du lien ;
- une fermeture facultative pour la session d’affichage courante ;
- un panneau de propriétés bilingue et un comportement responsive.

Le Lot 3 ajoute :

- la détection de la liste standard `Lists/PriorityMessages` ;
- la création guidée de la liste et de ses colonnes par un propriétaire de site ;
- la validation du schéma avant la lecture ;
- la réparation non destructive des colonnes absentes ;
- le blocage explicite lorsqu’une colonne existante possède un type incompatible ;
- la lecture et la validation des messages avec `SPHttpClient` ;
- la sélection cohérente d’une version française ou anglaise complète ;
- les états chargement, configuration requise, création, liste vide, schéma incompatible, permission insuffisante et erreur temporaire.

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

## Validation des lots 1 à 3

- compilation TypeScript, Sass, ESLint et Webpack réussie ;
- package SharePoint de production généré avec succès ;
- ressources `en-US`, `en-CA`, `fr-FR` et `fr-CA` incluses ;
- métadonnées Flowmova et identifiants propres au produit vérifiés ;
- aucune vulnérabilité connue dans les dépendances de production selon `npm audit --omit=dev`.
- bundle de développement vérifié avec la classe `PriorityBannerWebPart` ;
- package de production nettoyé de toute ressource de rechargement à chaud.
- sept tests unitaires réussis pour le schéma, la transformation, la langue de secours et le rejet des données invalides ;
- aucune permission Microsoft Graph ni dépendance Azure ajoutée.

La création réelle de la liste et la lecture d’un premier élément doivent maintenant être confirmées dans le tenant de développement.
