# 0001 — Sélection de Priority Banner comme premier produit

Statut : acceptée, périmètre révisé le 8 août 2026

## Décision

Le premier produit est **Priority Banner**, ou **Bandeau prioritaire** en français, publié par `Flowmova` dans la gamme Intranet Starter Pack. Son nom générique lui permet de servir un intranet, un site d’équipe, un portail de projet, un extranet ou un site de service.

Le MVP est un Web Part SPFx autonome dans lequel chaque instance représente un message configuré directement sur la page. Il ne dépend d’aucune liste SharePoint, d’aucun backend Azure et d’aucune permission Microsoft Graph étendue.

## Raisons

- besoin de communication simple et valeur visuelle immédiate ;
- configuration rapide et compréhensible par une PME ;
- plusieurs messages possibles en ajoutant plusieurs instances ;
- aucun schéma de liste à installer, réparer ou maintenir ;
- déploiement, démonstration et publication Store simples ;
- langue et expiration prises en charge sans alourdir l’expérience.

## Conséquences

- Priority Banner reste prioritaire pour la conception et le développement ;
- la version avancée centralisée par liste devient un futur produit distinct « Message Center » ;
- les listes créées pendant le prototype sont laissées intactes et ne sont plus utilisées ;
- aucun ciblage global, accusé de lecture ou administration à l’échelle du tenant n’entre dans ce MVP.
