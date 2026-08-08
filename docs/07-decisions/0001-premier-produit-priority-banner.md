# 0001 — Sélection de Priority Banner comme premier produit

Statut : acceptée

Date : 7 août 2026

## Contexte

Le catalogue comprend des composants de personnalisation d'intranet et des applications métier. Le premier développement doit démontrer le cycle complet d'un produit indépendant, de sa conception à sa publication sur le Store, avec un risque technique maîtrisé et une valeur visible pour une PME.

## Décision

Le premier produit sera **Priority Banner**, ou **Bandeau prioritaire** en français, publié par `Flowmova` dans la gamme Intranet Starter Pack.

Le nom de travail initial, Communication Banner, a été remplacé afin de ne pas associer le produit uniquement à un intranet ou à un service de communications.

Son [périmètre MVP](../04-selection-composant/priority-banner-mvp.md) est validé. Il s'agit d'un Web Part SPFx alimenté par une liste SharePoint, sans backend Azure ni permission Microsoft Graph étendue.

## Raisons

- besoin de communication interne simple à expliquer ;
- valeur visuelle immédiate dans un intranet ;
- périmètre compatible avec un premier MVP limité ;
- données conservées dans le tenant du client ;
- installation et démonstration simples ;
- possibilités d'évolution sans les imposer au premier package.

## Conséquences

- Priority Banner devient prioritaire pour la conception et le développement ;
- les autres composants du catalogue restent planifiés mais ne bloquent pas ce produit ;
- la validation terrain des applications métier de conformité peut continuer en parallèle du catalogue ;
- aucune fonction globale au tenant, de ciblage ou d'accusé de lecture n'entre dans le premier MVP.
