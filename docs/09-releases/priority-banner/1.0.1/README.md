# Dossier de livraison — Priority Banner 1.0.1

Date de préparation : 9 août 2026

Éditeur : FlowMova

Statut : candidat à la certification Microsoft Marketplace, avec contrôles manuels restants

## Contenu du dossier

- [Guide d’installation, de mise à jour et de désinstallation](installation.md)
- [Notes de version](release-notes.md)
- [Checklist de certification](certification-checklist.md)
- [Instructions destinées aux testeurs Microsoft](test-instructions.md)

La fiche commerciale et les textes français et anglais se trouvent dans [la fiche Store](../../../06-store/priority-banner-listing.md). Les icônes et captures sont disponibles dans [les ressources Store](../../../06-store/assets/priority-banner/README.md).

## Artefact de référence

- fichier : `priority-banner.sppkg`
- version de solution : `1.0.1.0`
- version du composant : `1.0.1`
- emplacement local : `products/priority-banner/sharepoint/solution/priority-banner.sppkg`
- taille contrôlée : 34 756 octets
- SHA-256 contrôlé : `5355947A50F4182C6B3C1BF9FD3E7E9169F5137013290BC51208B4224D0B332D`

Le package est généré localement et n’est pas suivi par Git. Le hash doit être recalculé après toute nouvelle compilation, même si le numéro de version ne change pas.

## Résultats déjà obtenus

- build de production réussi avec SPFx 1.23.2 ;
- 7 tests automatisés réussis sur 7 ;
- audit npm des dépendances de production : 0 vulnérabilité connue au 9 août 2026 ;
- package accepté et déployé dans le tenant de validation ;
- PartnerID de localisation FlowMova `7145647` intégré au manifeste du package ;
- page moderne publiée et comportement fonctionnel confirmé ;
- pages publiques du produit, du support, de confidentialité et des conditions accessibles avec un statut HTTP 200.

## Conditions avant soumission

La livraison ne doit être soumise qu’après fermeture de tous les éléments marqués **bloquant** dans la checklist. Les identifiants de test ou autres secrets ne doivent jamais être ajoutés à ce dépôt.
