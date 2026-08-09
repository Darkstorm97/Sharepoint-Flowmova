# Architecture de Priority Banner

Statut : validée — 8 août 2026

Produit : **Priority Banner — Bandeau prioritaire**

Auteur et éditeur : `Flowmova`

## Vue d’ensemble

Priority Banner est un Web Part SPFx React autonome. Chaque instance conserve sa configuration dans les propriétés standard de la page SharePoint et affiche exactement un message. Plusieurs instances peuvent cohabiter sans partager leur état.

```text
Propriétés de l’instance
        │
        ├── sélection automatique de la langue
        ├── validation du contenu et de l’expiration
        └── rendu React Standard ou Compact
                 │
                 └── fermeture locale facultative
```

Il n’effectue aucune requête de données, ne crée aucune liste et ne dépend ni de Microsoft Graph, ni d’Azure, ni d’un service externe. Les listes éventuellement créées par une version de développement antérieure sont laissées intactes.

## Stack

| Élément | Choix |
|---|---|
| SharePoint Framework | 1.23.2 |
| Node.js | 22 LTS |
| Interface | React 17 et Fluent UI 8 |
| Langage | TypeScript 5.8 |
| Construction | Heft |
| Configuration métier | Propriétés de chaque instance du Web Part |
| Fermeture | `localStorage` du navigateur |
| Graph, Azure, télémétrie externe | Aucun |

Le projet indépendant se trouve dans `products/priority-banner` et produit `priority-banner.sppkg`.

## Propriétés d’une instance

- langue principale interne : `fr` ou `en` ;
- titre et message principaux obligatoires ;
- priorité ;
- URL et libellé d’action facultatifs ;
- autorisation de fermeture ;
- expiration ISO facultative ;
- activation et contenu de la traduction facultative ;
- format Standard ou Compact.

Il n’existe pas de date de début. Lors de la saisie, l’expiration doit être strictement postérieure à l’instant courant. À échéance, une minuterie relance le rendu : en lecture le Web Part est masqué, tandis qu’en modification un état explicatif permet de changer l’expiration.

## Langue

À l’initialisation d’une nouvelle instance, la culture de l’interface SharePoint détermine la langue principale et ce choix est stocké. Pour chaque visiteur, le composant détecte à nouveau la culture courante :

1. si elle diffère de la langue principale et que la traduction titre/message est complète, la traduction est utilisée ;
2. sinon, le titre, le message et l’action principaux sont utilisés ensemble.

Le composant ne mélange jamais deux langues et n’affiche aucun sélecteur. L’interface est localisée pour `fr-CA`, `fr-FR`, `en-CA` et `en-US`.

## Fermeture

La clé `localStorage` combine l’identifiant de l’instance et une signature du contenu. Une fermeture reste donc locale au navigateur et le message réapparaît lorsqu’il est modifié. Un message Critique ignore toujours l’option et demeure non fermable.

## Sécurité et accessibilité

- texte rendu comme texte, sans HTML injecté ;
- URL validée : HTTP, HTTPS, ancre ou chemin relatif ;
- aucun secret ou jeton ;
- rôles d’annonce réservés aux priorités appropriées ;
- clavier, contraste, thèmes SharePoint et petits écrans pris en charge.

## Cycle de vie

1. charger `priority-banner.sppkg` dans l’App Catalog ;
2. ajouter l’application au site ;
3. ajouter une ou plusieurs instances à une page ;
4. configurer chaque message dans le panneau de propriétés ;
5. publier la page.

La suppression du composant ne supprime aucune donnée du site. Une future application « Message Center » pourra introduire une liste et une administration centralisée comme produit séparé.
