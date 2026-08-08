# Architecture de Priority Banner

Statut : validée

Date de validation : 8 août 2026

Produit : **Priority Banner** — **Bandeau prioritaire**

Auteur et éditeur : `Flowmova`

## Objectifs d'architecture

- fonctionner dans tout type de site SharePoint moderne ;
- rester indépendant des autres produits du catalogue ;
- conserver toutes les données dans le tenant du client ;
- éviter Azure, Microsoft Graph et les services externes dans le MVP ;
- fournir une installation guidée et une administration compréhensible par une PME ;
- permettre une publication individuelle sur le Store.

## Vue d'ensemble

Priority Banner est un Web Part SPFx React. Il lit les communications dans une liste SharePoint du site courant avec `SPHttpClient`, choisit le message admissible selon les dates et la priorité, puis l'affiche dans un format Standard ou Compact.

Les fermetures autorisées sont enregistrées uniquement dans le navigateur de l'utilisateur. Aucun accusé de lecture ni aucune donnée personnelle ne sont transmis à SharePoint dans le MVP.

## Stack technique

| Élément | Choix |
|---|---|
| SharePoint Framework | 1.23.2 |
| Node.js | 22 LTS |
| Interface | React 17 et Fluent UI 8 |
| Langage | TypeScript 5.8 |
| Construction | Heft |
| Accès SharePoint | `SPHttpClient` et API REST SharePoint |
| Stockage métier | Liste SharePoint Online |
| Fermetures | `localStorage` du navigateur |
| Backend Azure | Aucun |
| Microsoft Graph | Aucune permission |
| Télémétrie externe | Aucune dans le MVP |

## Projet indépendant

Le produit sera créé dans `products/priority-banner` et possédera son propre `package.json`, sa configuration SPFx, ses identifiants, ses tests, son versionnement et son package.

```text
products/
└── priority-banner/
    ├── config/
    ├── sharepoint/
    ├── src/
    │   └── webparts/
    │       └── priorityBanner/
    │           ├── components/
    │           ├── domain/
    │           ├── models/
    │           ├── services/
    │           ├── storage/
    │           ├── loc/
    │           └── tests/
    ├── package.json
    └── README.md
```

Le package technique utilisera le nom stable `priority-banner`. Le package de distribution sera `priority-banner.sppkg`. Aucun package partagé ne sera requis chez le client.

## Responsabilités internes

- `components` : rendu React, états visuels et accessibilité ;
- `domain` : règles d'admissibilité, priorité, langue et validation ;
- `models` : contrats TypeScript des communications et de la configuration ;
- `services` : lecture SharePoint, validation du schéma et création guidée de la liste ;
- `storage` : gestion locale des communications fermées ;
- `loc` : ressources françaises et anglaises ;
- `tests` : tests unitaires, composants et services simulés.

Les composants React ne doivent pas contenir directement les requêtes SharePoint ni les règles de sélection.

## Source de données

### Stratégie retenue

Le Web Part fournit un assistant permettant à un propriétaire de site :

1. de sélectionner une liste compatible du site courant ;
2. ou de créer la liste standard en une action.

Si la liste standard existe mais que des colonnes sont absentes, l'assistant propose une réparation non destructive. Cette réparation ajoute uniquement les colonnes manquantes, peut être relancée sans dommage et ne supprime aucun élément ni aucune colonne. Une colonne existante dont le type est incompatible n'est jamais remplacée automatiquement : le composant affiche alors les détails nécessaires à une intervention administrative.

La création s'exécute dans le contexte de l'utilisateur courant et nécessite donc ses permissions SharePoint habituelles de gestion des listes. Le composant affiche des instructions lorsque ces permissions sont insuffisantes.

Le provisionnement automatique d'une liste avec la fonctionnalité du package SPFx reste une solution de repli à réévaluer après les tests d'installation. Il n'est pas retenu pour le premier développement afin d'éviter de créer une ressource non désirée sur chaque site.

### Nom de la liste

- nom français proposé : `Messages prioritaires` ;
- nom anglais proposé : `Priority Messages` ;
- URL interne stable proposée : `Lists/PriorityMessages`.

Le nom ne fait référence ni à Flowmova ni à un intranet. Le propriétaire peut choisir un autre titre lors de la création.

### Modèle de données

| Nom interne | Type SharePoint | Obligatoire | Fonction |
|---|---|---:|---|
| `Title` | Texte | Oui | Nom administratif du message |
| `TitleFr` | Texte | Conditionnel | Titre français |
| `TitleEn` | Texte | Conditionnel | Titre anglais |
| `MessageFr` | Texte multiligne brut | Conditionnel | Description française |
| `MessageEn` | Texte multiligne brut | Conditionnel | Description anglaise |
| `ActionLabelFr` | Texte | Non | Libellé français du bouton |
| `ActionLabelEn` | Texte | Non | Libellé anglais du bouton |
| `ActionUrl` | URL | Non | Destination du bouton |
| `Priority` | Choix | Oui | `Information`, `Important`, `Urgent` ou `Critical` |
| `StartDateTime` | Date et heure | Oui | Début d'affichage |
| `EndDateTime` | Date et heure | Oui | Fin d'affichage |
| `IsEnabled` | Oui/Non | Oui | Activation administrative |
| `AllowDismiss` | Oui/Non | Oui | Autorisation de fermeture |

Les colonnes système `ID`, `Created`, `Modified`, `Author` et `Editor` sont conservées. Les colonnes utiles au filtrage sont indexées.

Au moins une version linguistique complète du titre et du message est requise. La date de fin doit être postérieure à la date de début. Le texte riche et le HTML saisi par le client ne sont pas acceptés dans le MVP.

## Accès aux données

Le repository SharePoint utilise le `SPHttpClient` fourni par le contexte SPFx. Les appels sont limités au site et à la liste configurés.

Le Web Part :

- charge les communications actives pertinentes ;
- sélectionne uniquement les colonnes nécessaires ;
- traite les dates en UTC et les affiche selon la culture active ;
- valide les données avant leur utilisation ;
- actualise les données toutes les 60 secondes ;
- relance une actualisation lorsque l'onglet du navigateur redevient visible ;
- annule les minuteries et les requêtes lors de sa destruction.

## Règles de sélection

Une communication est admissible lorsque :

- `IsEnabled` est vrai ;
- la date courante est supérieure ou égale à `StartDateTime` ;
- la date courante est strictement antérieure à `EndDateTime` ;
- une version de contenu exploitable existe dans la langue demandée ou dans la langue de secours.

Ordre de priorité :

1. `Critical` ;
2. `Urgent` ;
3. `Important` ;
4. `Information`.

À priorité égale, la date de début la plus récente gagne. À date identique, l'identifiant SharePoint le plus élevé gagne afin de rendre la sélection déterministe.

Un seul message est affiché. Si aucun message n'est admissible, le Web Part ne réserve aucun espace sur la page.

## Contenu bilingue

Pour une culture française, le composant utilise `TitleFr`, `MessageFr` et `ActionLabelFr`. Pour une culture anglaise, il utilise les champs anglais.

Si la version demandée est incomplète, le composant utilise l'autre version complète. Il n'assemble pas un titre français avec un message anglais sauf si l'administrateur l'a explicitement fourni ainsi. Aucune traduction automatique n'est effectuée.

L'interface et le panneau de propriétés prennent en charge `fr-CA`, `en-CA`, `fr-FR` et `en-US`, avec l'anglais comme langue de secours technique.

## Fermeture par l'utilisateur

La fermeture est enregistrée dans `localStorage` avec une clé composée du site, de la liste, de l'identifiant du message et de sa date de modification.

Cette stratégie garantit que :

- aucune donnée personnelle n'est enregistrée sur un serveur ;
- aucune permission d'écriture n'est demandée aux lecteurs ;
- le message reste fermé dans le même navigateur ;
- le message réapparaît s'il est modifié ;
- la fermeture n'est pas synchronisée entre appareils ou navigateurs.

Le niveau `Critical` ignore toujours `AllowDismiss` et ne peut pas être fermé.

## Configuration du Web Part

Le panneau de propriétés contient :

- la sélection ou la création de la liste ;
- le format `Standard` ou `Compact` ;
- l'affichage ou non de l'icône ;
- l'affichage du bouton lorsqu'une URL valide existe ;
- une commande de vérification de la configuration.

La fréquence d'actualisation et les couleurs de priorité ne sont pas configurables dans le MVP. Cette limite garantit un comportement cohérent et accessible.

## États visuels

Le composant gère explicitement :

- le chargement ;
- la première configuration ;
- les permissions insuffisantes ;
- la liste absente ;
- le schéma incompatible ;
- le schéma réparable lorsqu'il manque uniquement des colonnes ;
- l'absence de message actif ;
- les quatre niveaux de priorité ;
- le message fermé ;
- l'erreur temporaire de lecture.

Le format Standard affiche l'icône, le niveau, le titre, la description, le bouton facultatif et la fermeture. Le format Compact privilégie une seule ligne et masque la description lorsque l'espace est insuffisant.

## Accessibilité

- navigation et fermeture au clavier ;
- contraste accessible dans les thèmes pris en charge ;
- icône toujours accompagnée d'un libellé textuel ;
- libellés accessibles pour le bouton et la fermeture ;
- ordre de lecture cohérent ;
- adaptation au zoom et aux petits écrans ;
- utilisation de `role="alert"` limitée aux niveaux Urgent et Critique afin d'éviter des annonces intrusives répétées.

## Permissions et sécurité

- les lecteurs utilisent leurs droits de lecture SharePoint existants ;
- les responsables modifient les messages uniquement s'ils possèdent les droits sur la liste ;
- la création de la liste nécessite les droits SharePoint correspondants ;
- le MVP ne modifie pas automatiquement l'héritage des permissions ;
- les URL sont validées et limitées aux destinations relatives ou aux protocoles autorisés ;
- les textes sont rendus comme texte et non comme HTML non fiable ;
- aucun secret, jeton ou identifiant sensible n'est stocké dans les propriétés du Web Part.

## Installation et cycle de vie

1. installation de `priority-banner.sppkg` dans l'App Catalog ;
2. ajout de l'application au site ;
3. ajout de Priority Banner à une page moderne ;
4. sélection ou création de la liste ;
5. ajout de la première communication.

La désinstallation ne supprime jamais automatiquement la liste ni les messages. Une procédure séparée expliquera comment supprimer ces données volontairement.

Les futures évolutions de schéma devront être détectées et appliquées sans supprimer les colonnes ou les éléments existants.

## Tests requis

- règles de dates, priorités et égalités ;
- fuseaux horaires et changements d'heure ;
- sélection française, anglaise et langue de secours ;
- validation des URL et des données incomplètes ;
- fermeture, modification et réapparition ;
- liste absente, incompatible ou inaccessible ;
- formats Standard et Compact ;
- ordinateur, tablette et mobile ;
- clavier, lecteur d'écran, zoom et contraste élevé ;
- thèmes SharePoint pris en charge ;
- construction de production et création du `.sppkg` ;
- installation, mise à jour et désinstallation dans le tenant de test ;
- absence de permission Graph et d'appel réseau externe.

## Éléments hors MVP

- extension globale injectée dans tous les sites ;
- ciblage par utilisateurs ou groupes ;
- accusé de lecture ;
- statistiques ;
- notifications Teams ou courriel ;
- synchronisation des fermetures entre appareils ;
- traduction automatique ;
- rotation de plusieurs messages ;
- administration centralisée au niveau du tenant.
