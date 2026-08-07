# Principes fondamentaux

Ce document définit le cadre initial du projet. Il sera précisé au fur et à mesure des décisions, sans imposer prématurément une architecture détaillée.

## 1. Organisation globale

- Le projet utilise un monorepo pour centraliser la documentation, les standards, les outils et le code partagé.
- Le monorepo ne doit pas créer de dépendance d'installation entre les produits.
- Les décisions structurantes sont consignées dans `docs/07-decisions`.
- Aucun composant n'est développé avant la validation de son besoin, de son périmètre MVP et de sa stratégie de distribution.

## 2. Indépendance des composants

Chaque composant doit posséder :

- un projet et un identifiant technique propres ;
- un package `.sppkg` propre ;
- un versionnement et un journal des changements propres ;
- ses tests et sa documentation ;
- ses configurations et permissions déclarées ;
- ses ressources de présentation et de publication ;
- un processus autonome de construction, d'installation, de mise à jour et de désinstallation.

Un client doit pouvoir installer un seul composant sans installer le reste de la gamme. Le code partagé peut être incorporé lors de la construction, mais ne doit pas imposer un package commun à installer séparément chez le client.

## 3. Intégration à Microsoft 365

- Utiliser SPFx, React, TypeScript, Fluent UI et les API Microsoft adaptées.
- Respecter le thème SharePoint, les modes d'affichage et les conventions d'interface Microsoft 365.
- Prévoir le responsive, l'accessibilité, le multilingue et les principaux modes de contraste.
- Utiliser les mécanismes habituels de configuration SharePoint.
- Éviter de créer des listes, bibliothèques ou ressources avec un nom commercial imposé lorsqu'un nom fonctionnel convient.

## 4. Identité de marque

- L'interface quotidienne ne doit pas afficher de publicité Flowmova.
- Aucun logo Flowmova ni lien promotionnel ne doit être imposé dans l'espace de travail du client.
- Le composant doit pouvoir adopter l'identité visuelle du client.
- Flowmova reste identifiable comme éditeur dans la fiche Store, les métadonnées techniques, la documentation, le support et les mentions légales.
- Une éventuelle offre entièrement en marque blanche sera étudiée séparément.

## 5. Données, sécurité et permissions

- Conserver les données dans le tenant Microsoft 365 du client autant que possible.
- Demander uniquement les permissions nécessaires au fonctionnement annoncé.
- Documenter la finalité de chaque permission.
- Ne jamais incorporer de secret dans le code client.
- Traiter la confidentialité, la journalisation, la suppression des données et la désinstallation dès la conception.

## 6. Dépendances et services Azure

- Une fonctionnalité réalisable correctement avec SharePoint ou Microsoft Graph ne doit pas imposer un backend Azure.
- Azure est acceptable lorsqu'il apporte une capacité indispensable : secret serveur, traitement asynchrone, intégration externe sécurisée, planification ou intelligence artificielle.
- Toute dépendance externe doit être documentée, sécurisée et prise en compte dans le coût total du produit.
- Une édition nécessitant Azure doit être clairement distinguée d'une édition autonome lorsqu'il existe une différence importante d'installation ou de coût.

## 7. Qualité produit

Chaque composant doit être :

- utile et fondé sur un besoin validé ;
- performant et maintenable ;
- configurable sans modification du code ;
- accessible et multilingue ;
- documenté pour l'administrateur et l'utilisateur ;
- testable et observable ;
- compatible avec les versions de SPFx et de Microsoft 365 officiellement ciblées.

## 8. Publication sur le Store

- La possibilité de publication est vérifiée avant le développement du MVP.
- Chaque composant possède sa propre identité de produit, ses illustrations, sa description, son support et ses informations légales.
- Les permissions, dépendances, traitements de données et comportements réseau doivent pouvoir être expliqués clairement pendant la validation.
- Les exigences exactes du Store sont vérifiées à nouveau avant chaque soumission, car elles peuvent évoluer.

## 9. Sélection du premier composant

Le premier composant sera évalué selon :

- la fréquence et l'importance du problème ;
- la clarté de la valeur apportée ;
- l'existence et les limites des solutions concurrentes ;
- la faisabilité d'un MVP limité ;
- les permissions nécessaires ;
- l'absence de dépendance externe inutile ;
- la facilité de démonstration et d'adoption ;
- le potentiel commercial ;
- la compatibilité avec une distribution autonome sur le Store.

## 10. Éléments volontairement non définis

À ce stade, les éléments suivants restent ouverts :

- le premier composant ;
- la structure finale du code ;
- le modèle de licence ;
- la tarification ;
- la stratégie de télémétrie ;
- le pipeline de livraison ;
- les services Azure éventuels.

Ils feront l'objet de décisions distinctes après collecte des informations nécessaires.
