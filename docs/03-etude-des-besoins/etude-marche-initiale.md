# Étude de marché initiale

Date de l'analyse : 7 août 2026

## Objectif

Identifier des applications SharePoint à forte valeur ajoutée pour des petites et moyennes entreprises qui utilisent déjà Microsoft 365 et recherchent une solution simple à installer, à comprendre et à administrer.

Cette étude est une analyse qualitative du marché. Elle sert à établir une présélection ; elle ne remplace pas les entretiens avec des clients potentiels, l'observation de leurs processus ni un test de volonté de payer.

## Cible retenue

Le client prioritaire est une PME qui :

- possède déjà SharePoint Online dans Microsoft 365 ;
- gère encore certains processus avec des courriels, des fichiers Excel ou des rappels manuels ;
- ne dispose pas nécessairement d'une équipe SharePoint spécialisée ;
- privilégie une installation rapide et un coût prévisible ;
- souhaite conserver ses données dans son tenant ;
- refuse un projet de conseil long pour résoudre un problème limité.

Les acheteurs ou prescripteurs probables sont les responsables qualité, conformité, opérations, ressources humaines et Microsoft 365.

## Méthode

Les idées ont été comparées selon quatre sources de signal :

1. la présence d'offres comparables dans Microsoft Marketplace, qui confirme qu'un problème est commercialisable ;
2. le nombre et la maturité apparente des offres, qui donnent un indice de saturation ;
3. les fonctions déjà fournies par Microsoft 365, qui peuvent rendre une application générique difficile à vendre ;
4. la compatibilité avec nos contraintes : package SPFx autonome, peu de permissions, données dans le tenant et absence de serveur externe obligatoire.

Une présence sur le Marketplace ne prouve ni la taille du marché ni le chiffre d'affaires d'un produit. Les conclusions commerciales ci-dessous sont donc des hypothèses argumentées à tester.

## Ce que montre le marché visible

### 1. La conformité documentaire correspond à un besoin achetable

Plusieurs offres traitent la publication de politiques, l'accusé de lecture, les rappels et la preuve de conformité. [Policy Acknowledgement 365](https://marketplace.microsoft.com/en-us/product/saas/wa200010676?tab=overview) annonce une installation en moins de dix minutes et un stockage dans des listes SharePoint. [Read and Understood](https://marketplace.microsoft.com/en-us/product/office/wa200007564) automatise les demandes d'accusé de lecture et fournit des rapports exportables. [Controlled Documents](https://marketplace.microsoft.com/en-gb/product/saas/valto.controlled_documents?tab=Overview) couvre le contrôle documentaire et les exigences ISO.

Ce signal confirme la valeur du problème, mais montre aussi qu'un simple « centre de politiques avec accusé de lecture » serait déjà concurrencé.

### 2. La révision et l'expiration des documents forment une niche plus précise

[K-Docs Approve](https://marketplace.microsoft.com/en-us/product/saas/wa200009359?tab=overview) met en avant les prochaines dates de révision, les indicateurs visuels, l'historique et une installation guidée sans Power Automate. [docCentrum](https://marketplace.microsoft.com/en-us/product/saas/intelligentdecisioningltd.doccentrum?tab=overview) couvre tout le cycle de vie documentaire.

Ces offres valident le problème. Elles sont cependant larges. Une application plus légère, centrée sur les documents à réviser, les responsables, les échéances et les preuves exportables, pourrait mieux convenir aux PME qui ne veulent pas remplacer leur gestion documentaire.

### 3. Les annuaires, calendriers et solutions d'onboarding sont encombrés

Les annuaires sont représentés par plusieurs produits proches, notamment [Company Directory](https://marketplace.microsoft.com/en-us/product/office/wa200006510), [Employee Directory and Organization Chart](https://marketplace.microsoft.com/en-us/product/WA200007242?tab=Overview) et [Directory Plus](https://marketplace.microsoft.com/en-us/product/office/WA200007200?tab=Overview). Certains requièrent en plus une permission Microsoft Graph étendue pour lire les profils du tenant, comme [ThePoint Employee Directory](https://marketplace.microsoft.com/en-us/product/WA200011097?tab=Overview).

Le calendrier possède également de nombreuses variantes, dont [Office Calendar](https://marketplace.microsoft.com/en-us/product/WA200006671?tab=Overview) et [Mini Calendar Lite](https://marketplace.microsoft.com/en-us/product/office/WA104148557?tab=Overview). [Employee Onboarding 365](https://marketplace.microsoft.com/en-us/product/office/wa200004757?tab=overview) est déjà une suite riche et bien établie.

Ces catégories restent utiles, mais leur différenciation et leur monétisation seraient plus difficiles pour un premier produit.

### 4. Une application générique de suivi concurrence directement Microsoft Lists

Microsoft fournit déjà des modèles Lists pour le suivi des problèmes, l'onboarding, les actifs, le recrutement, les demandes de déplacement et l'avancement du travail. La [documentation d'administration de Microsoft Lists](https://learn.microsoft.com/en-us/sharepoint/control-lists) répertorie ces modèles.

Une application ne doit donc pas seulement afficher une liste plus joliment. Elle doit apporter une logique métier difficile à reproduire : calcul d'échéances, alertes, preuves, vue de risque, configuration guidée et rapports prêts pour un audit.

## Positionnement recommandé

Le meilleur espace initial est une application de conformité opérationnelle légère, installée dans SharePoint et conçue pour les PME :

- une seule promesse métier clairement mesurable ;
- configuration guidée en moins de quinze minutes ;
- listes et bibliothèques SharePoint comme stockage principal ;
- aucune infrastructure Azure obligatoire pour l'édition de base ;
- aucune permission Microsoft Graph étendue dans le MVP si elle peut être évitée ;
- interface neutre et adaptable à la marque du client ;
- export exploitable comme preuve lors d'un audit.

## Opportunité principale

L'hypothèse la plus prometteuse est un **gestionnaire de révision et d'expiration documentaire**.

Sa promesse serait : « savoir immédiatement quels documents doivent être révisés, par qui et avant quelle date, puis prouver que le suivi a été effectué ».

Le produit ne remplacerait ni SharePoint ni un système documentaire complet. Il ajouterait une couche opérationnelle ciblée sur les bibliothèques existantes du client :

- propriétaire et fréquence de révision ;
- prochaine date de révision calculée ;
- statuts à jour, à surveiller, à échéance et en retard ;
- tableau de bord par responsable ou service ;
- journal des décisions et commentaires ;
- export de la situation pour un audit ;
- rappels dans une phase ultérieure, selon la solution technique la plus simple et publiable.

## Compatibilité avec le Store

Microsoft confirme que les solutions SPFx peuvent être publiées dans Microsoft Marketplace et le Store SharePoint afin d'être installées dans les tenants Microsoft 365. La documentation recommande une version SPFx prise en charge et impose une validation avant publication : [publication des applications SPFx](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview).

Notre environnement SPFx 1.23.2 dépasse la version minimale actuellement indiquée. La publication reste cependant un processus distinct du déploiement dans notre App Catalog de test. La description commerciale devra notamment présenter la valeur, les limites, les dépendances et les services externes éventuels, conformément aux [erreurs de validation courantes](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-common-validation-errors).

## Risques à valider

- Une partie des PME peut considérer que les colonnes, vues et règles SharePoint suffisent déjà.
- Les rappels fiables peuvent nécessiter Power Automate ou un service planifié ; le MVP doit préciser ce qui fonctionne sans dépendance.
- Le mot « conformité » ne doit pas laisser croire que l'application garantit une certification réglementaire.
- Le propriétaire du budget et la volonté de payer restent inconnus.
- Les besoins peuvent différer fortement entre les secteurs réglementés et les PME de services.

## Validation terrain nécessaire

Avant de sélectionner le premier MVP, réaliser de 8 à 12 entretiens avec des PME, dont au moins la moitié gèrent des politiques, procédures, certifications ou audits. Pour chaque entretien, recueillir :

- le processus actuel et les outils utilisés ;
- la fréquence des retards ou documents périmés ;
- les conséquences concrètes d'un oubli ;
- le temps mensuel consacré au suivi ;
- les personnes responsables et le décideur d'achat ;
- les exigences d'installation et de sécurité ;
- le prix acceptable pour éviter ce problème.

La sélection finale ne sera prise qu'après cette validation.
