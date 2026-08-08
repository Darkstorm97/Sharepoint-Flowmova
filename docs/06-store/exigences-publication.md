# Exigences de publication

## Objectif

Ce document servira de liste de contrôle pour concevoir chaque composant en vue d'une distribution publique. Les exigences officielles devront être vérifiées dans la documentation Microsoft actuelle avant de figer le MVP et avant chaque soumission.

## Contraintes initiales

- Un package et une identité propres à chaque composant.
- L'auteur et l'éditeur sont identifiés sous le nom exact `Flowmova` dans toutes les métadonnées.
- Le nom, la description et la version restent cohérents entre le code, le package, l'App Catalog et le Store.
- Le français et l'anglais sont inclus dans chaque première version publiable.
- Une installation, une mise à jour et une désinstallation documentées.
- Des permissions limitées et justifiées.
- Aucun secret incorporé dans le package client.
- Une politique de confidentialité et des conditions de support accessibles.
- Une description claire des données consultées, stockées ou transmises.
- Des ressources visuelles, une description commerciale et une documentation propres au produit.
- Une expérience stable, accessible et cohérente avec Microsoft 365.
- Une procédure de test reproductible avant soumission.

Voir les [conventions de localisation et de métadonnées](conventions-localisation-metadonnees.md) pour les règles applicables à tous les produits.

## Points à vérifier officiellement

- canal de publication approprié pour les solutions SPFx ;
- critères techniques et processus de validation applicables ;
- versions de SPFx et dépendances autorisées ;
- règles relatives aux permissions Microsoft Graph ;
- exigences de sécurité, de confidentialité et de support ;
- règles de présentation, de marque et de contenu de la fiche produit ;
- exigences particulières applicables aux services externes, licences et achats.

## Règle de décision

Un candidat ne peut pas devenir le premier MVP si une contrainte connue rend sa publication irréaliste, excessivement coûteuse ou dépendante d'une architecture disproportionnée par rapport au besoin traité.
