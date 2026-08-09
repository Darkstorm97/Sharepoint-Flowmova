# Notes de version — Priority Banner 1.0.1

Date de publication candidate : 9 août 2026

## Résumé

Priority Banner 1.0.1 est la première version candidate à une publication publique. Ce Web Part SharePoint permet aux propriétaires de pages d’afficher des communications prioritaires configurées directement dans la page, sans liste SharePoint ni service externe.

## Fonctionnalités

- quatre niveaux : Information, Important, Urgent et Critique ;
- formats Standard et Compact ;
- titre obligatoire et message facultatif ;
- bouton d’action facultatif avec validation de l’URL ;
- date d’expiration facultative et nécessairement future lors de la saisie ;
- fermeture persistante dans le navigateur, sauf pour le niveau Critique ;
- français et anglais sélectionnés automatiquement selon la langue SharePoint ;
- traduction facultative sans sélecteur de langue visible ;
- plusieurs instances indépendantes sur une même page ;
- adaptation aux thèmes SharePoint et aux écrans mobiles.

## Changements de la version 1.0.1

- ajout de l’icône produit FlowMova dans le sélecteur de composants ;
- ajout du nom convivial et des descriptions localisées dans le package ;
- passage du package SharePoint à la version `1.0.1.0` ;
- ajout des ressources françaises et anglaises pour `fr-CA`, `fr-FR`, `en-CA` et `en-US` ;
- finalisation des pages publiques de produit, support, confidentialité et conditions ;
- production des cinq captures et des formats d’icône nécessaires à la fiche Store.

## Sécurité et données

- aucune permission Microsoft Graph ou API déléguée ;
- aucun appel vers un service FlowMova ou un service tiers ;
- aucune authentification externe ;
- aucun secret incorporé ;
- aucune liste SharePoint créée ou consultée ;
- seul l’état de fermeture est conservé dans le stockage local du navigateur.

## Compatibilité

- SharePoint Online et pages modernes ;
- SPFx 1.23.2 ;
- interface française et anglaise ;
- hôte déclaré : `SharePointWebPart` uniquement ;
- aucune exposition Microsoft Teams dans cette version.

## Mise à jour

La mise à jour depuis 1.0.0 est compatible avec les instances existantes. Aucune migration de données ou modification de page n’est requise. Consulter le [guide d’installation](installation.md) pour la procédure complète.

## Limites connues

- la configuration est propre à chaque instance et n’est pas centralisée ;
- il n’existe aucun historique, workflow d’approbation ou journal d’audit ;
- la date de début n’est pas prise en charge ;
- la fermeture est mémorisée par navigateur et non synchronisée entre appareils ;
- seules les langues française et anglaise sont fournies dans la version 1.0.1 ;
- le contenu du lien d’action et sa destination sont sous la responsabilité de l’auteur de la page.

Une gestion centralisée reste envisagée pour un produit distinct et futur nommé **Message Center**.
