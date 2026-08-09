# Priority Banner

Priority Banner est un Web Part SharePoint Framework autonome publié par Flowmova. Chaque instance affiche un message prioritaire configuré directement dans le panneau de propriétés de la page.

## Fonctionnalités du MVP

- titre, message et priorité configurables ;
- niveaux Information, Important, Urgent et Critique ;
- format Standard complet et format Compact limité au titre ;
- lien d’action facultatif ;
- fermeture persistante dans le navigateur, sauf pour un message Critique ;
- expiration facultative, obligatoirement future lors de la saisie ;
- disparition automatique à l’expiration, sans bandeau vide ;
- contenu principal français ou anglais détecté à la création ;
- traduction facultative affichée automatiquement selon la langue SharePoint du visiteur ;
- plusieurs instances indépendantes sur une même page ;
- aucune liste SharePoint, permission Graph, infrastructure Azure ou connexion externe.

Une liste `Priority Messages` créée lors des prototypes précédents n’est plus utilisée. Le composant ne la modifie et ne la supprime jamais.

## Identité et stack

- auteur et éditeur : Flowmova ;
- package : `priority-banner.sppkg` ;
- SPFx 1.23.2, Node.js 22 LTS, React 17, Fluent UI 8 et TypeScript 5.8 ;
- langues d’interface : `fr-CA`, `fr-FR`, `en-CA`, `en-US` ; anglais comme langue de secours.

## Développement

```powershell
npm.cmd install
npm.cmd run start
```

Le Workbench SharePoint charge les ressources de développement depuis `https://localhost:4321`.

## Build de production

```powershell
npm.cmd run build
```

Le package est généré dans `sharepoint/solution/priority-banner.sppkg` et n’est pas suivi par Git.
