# Feuille de route — Priority Banner

Cette feuille de route découpe le MVP en lots courts, vérifiables et déployables progressivement dans le tenant de développement.

## Lot 1 — Fondation SPFx — terminé

- projet SPFx autonome dans `products/priority-banner` ;
- identité, identifiants et métadonnées Flowmova ;
- package indépendant `priority-banner.sppkg` ;
- ressources `fr-CA`, `fr-FR`, `en-CA` et `en-US` ;
- structure `components`, `domain`, `models`, `services`, `storage` et `tests` ;
- premier bandeau statique ;
- build et package de production validés.

## Lot 2 — Expérience visuelle

- formats Standard et Compact ;
- niveaux Information, Important, Urgent et Critique ;
- comportement responsive et accessible ;
- propriétés de prévisualisation dans le panneau du Web Part.

## Lot 3 — Données SharePoint

- modèle de message ;
- création et validation de la liste de configuration ;
- lecture des messages avec `SPHttpClient` ;
- états de chargement, absence de contenu et erreur.

## Lot 4 — Règles métier

- dates de début et de fin ;
- priorisation des messages actifs ;
- ciblage initial prévu par le MVP ;
- fermeture persistante dans le navigateur.

## Lot 5 — Qualité et administration

- assistant de configuration ;
- tests unitaires des règles métier ;
- tests d'accessibilité, de langues et de compatibilité ;
- documentation d'installation et d'exploitation.

## Lot 6 — Publication

- validation complète dans le tenant ;
- package de livraison indépendant ;
- informations, captures et politique de confidentialité pour le Store ;
- contrôle final des permissions et de la présence discrète de la marque.
