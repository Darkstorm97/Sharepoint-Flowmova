# SharePoint Components

Ce dépôt centralise la conception, la documentation et, à terme, le code des composants SharePoint développés par Flowmova.

## Vision

Créer des composants SharePoint Framework (SPFx) professionnels qui répondent à des besoins réels, s'intègrent naturellement à Microsoft 365 et peuvent être distribués individuellement sur le Store.

Le dépôt est un monorepo de travail. Chaque composant reste néanmoins un produit autonome : il possède son propre cycle de développement, son package, sa version, sa documentation et son processus de publication.

## État du projet

Le projet est actuellement dans sa phase de cadrage. Aucun composant n'a encore été sélectionné ou développé.

Un laboratoire SPFx indépendant est disponible dans `prototypes/spfx-environment-check`. Il valide l'environnement technique sans constituer un produit commercial.

Les prochaines étapes sont :

1. valider le cadre de travail global ;
2. identifier plusieurs besoins réels rencontrés par les entreprises ;
3. comparer les composants candidats ;
4. choisir un premier MVP compatible avec une publication sur le Store ;
5. définir son architecture avant de commencer le développement.

## Organisation

- `docs/01-vision` : vision et positionnement du produit ;
- `docs/02-cadre-global` : principes communs et contraintes non négociables ;
- `docs/03-etude-des-besoins` : problèmes utilisateurs et données de validation ;
- `docs/04-selection-composant` : comparaison et choix des composants ;
- `docs/05-architecture` : architecture technique commune et par produit ;
- `docs/06-store` : exigences de distribution et de publication ;
- `docs/07-decisions` : décisions d'architecture et de produit ;
- `docs/08-roadmap` : étapes et priorités validées ;
- `sources` : documents sources conservés pour référence.

## Principes essentiels

- intégration native à l'écosystème Microsoft 365 du client ;
- composants installables et déployables indépendamment ;
- publication individuelle de chaque produit sur le Store ;
- présence discrète de la marque Flowmova après installation ;
- permissions et dépendances externes réduites au minimum ;
- utilisation d'Azure uniquement lorsqu'une fonctionnalité le nécessite réellement.

Voir [les principes fondamentaux](docs/02-cadre-global/principes-fondamentaux.md) pour le cadre complet.

L'[environnement Microsoft 365 de développement](docs/05-architecture/environnement-tenant.md) est configuré et vérifié pour les futurs essais SPFx.
