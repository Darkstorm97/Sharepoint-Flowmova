# Grille initiale des applications candidates

Date de l'évaluation : 7 août 2026

## Barème

Chaque idée est notée sur 100 à partir des critères déjà définis dans le cadre du projet.

| Critère | Poids |
|---|---:|
| Fréquence du problème | 20 |
| Importance métier | 15 |
| Volonté de payer probable | 15 |
| Possibilité de différenciation | 15 |
| Simplicité du MVP | 10 |
| Permissions limitées | 10 |
| Absence de backend obligatoire | 5 |
| Compatibilité avec le Store | 10 |
| **Total** | **100** |

Les notes sont des hypothèses de travail fondées sur l'[étude de marché initiale](../03-etude-des-besoins/etude-marche-initiale.md). Elles devront être corrigées après les entretiens clients.

Cette grille compare principalement les applications métier pouvant devenir un premier produit autonome. Elle ne limite pas le [catalogue produit initial](catalogue-produit-initial.md), qui comprend aussi des composants génériques d'esthétique, de contenu et d'engagement pour les intranets.

## Classement

| Rang | Application candidate | Score | Valeur principale | Risque principal |
|---:|---|---:|---|---|
| 1 | Gestionnaire de révision et d'expiration documentaire | **88** | Réduit les documents périmés et prépare les preuves d'audit | Concurrence de solutions documentaires plus complètes |
| 2 | Suivi des certifications, permis et formations à renouveler | **85** | Évite les expirations touchant les employés, équipements ou fournisseurs | Modèle de données variable selon le secteur |
| 3 | Suivi léger des audits et actions correctives | **83** | Rend visibles les constats, responsables, échéances et preuves de clôture | Les workflows peuvent rapidement devenir complexes |
| 4 | Centre de politiques avec accusé de lecture | **80** | Prouve que les employés ont lu une politique donnée | Plusieurs concurrents directs sont déjà présents |
| 5 | Portail d'onboarding par rôle | **70** | Coordonne RH, gestionnaire, TI et nouvel employé | Microsoft Lists et des suites établies couvrent déjà le besoin |
| 6 | Navigateur documentaire guidé par métadonnées | **68** | Aide les utilisateurs à trouver le bon document sans connaître SharePoint | Valeur dépendante de la qualité des métadonnées |
| 7 | Annuaire de compétences interne | **64** | Trouve une personne par expertise, service ou emplacement | Marché saturé et permissions Graph possibles |
| 8 | Centre de connaissances et FAQ | **61** | Réduit les questions répétitives | Fonction facile à reproduire avec les outils natifs |
| 9 | Calendrier consolidé d'entreprise | **56** | Regroupe les événements provenant de plusieurs sources | Forte concurrence et faible volonté de payer probable |

## Détail des quatre premiers candidats

### 1. Gestionnaire de révision et d'expiration documentaire — 88/100

**Utilisateur principal :** responsable qualité, conformité ou opérations.

**MVP possible :**

- connexion à une bibliothèque SharePoint choisie ;
- configuration du propriétaire et de la périodicité de révision ;
- calcul de la prochaine échéance ;
- tableau de bord des documents à jour, proches de l'échéance ou en retard ;
- action de révision avec commentaire et nouvelle date ;
- filtres par responsable, service et niveau de risque ;
- export CSV ou Excel pour un audit.

**Pourquoi il arrive en tête :** la conséquence d'un oubli est compréhensible, la démonstration est immédiate et l'application peut compléter les bibliothèques du client sans imposer un nouveau système documentaire.

### 2. Suivi des certifications, permis et formations — 85/100

**Utilisateur principal :** RH, santé et sécurité, opérations ou gestionnaire de fournisseurs.

**MVP possible :**

- registre des exigences et pièces justificatives ;
- date d'émission et date d'expiration ;
- personne, actif ou fournisseur concerné ;
- vue des renouvellements à 30, 60 et 90 jours ;
- statut de conformité et export des preuves.

**Différenciation possible :** proposer trois modèles prêts à l'emploi — employés, équipements et fournisseurs — sans devenir une plateforme de formation complète.

### 3. Suivi léger des audits et actions correctives — 83/100

**Utilisateur principal :** responsable qualité, sécurité ou opérations.

**MVP possible :**

- création d'un constat avec gravité et preuve ;
- attribution d'une action, d'un responsable et d'une échéance ;
- suivi des actions en retard ;
- validation de la clôture ;
- tableau de bord et export d'audit.

**Différenciation possible :** rester beaucoup plus simple qu'un logiciel QHSE, avec une installation autonome et des écrans adaptés aux utilisateurs occasionnels.

### 4. Centre de politiques avec accusé de lecture — 80/100

**Utilisateur principal :** RH, conformité ou direction.

**MVP possible :**

- publication de politiques ;
- ciblage des personnes ou groupes ;
- accusé de lecture horodaté ;
- liste des réponses manquantes ;
- export de preuve.

**Pourquoi il n'est pas premier :** la valeur est forte, mais plusieurs produits du Marketplace proposent déjà un périmètre similaire. Il faudrait une différenciation nette par la simplicité, le prix, le multilingue ou un secteur précis.

## Applications métier à ne pas commencer en premier

- **Annuaire :** facile à démontrer, mais de nombreux produits offrent déjà recherche, filtres, organigramme et intégration Teams.
- **Calendrier :** utile mais souvent perçu comme une amélioration visuelle plutôt qu'une solution à un risque métier.
- **Onboarding générique :** besoin réel, mais Microsoft fournit un modèle Lists et des concurrents proposent déjà des suites très complètes.
- **FAQ générique vendue seule :** MVP simple, mais barrière à l'entrée et volonté de payer faibles. Elle reste pertinente comme composant du Intranet Starter Pack.
- **Tableau de bord KPI générique :** la valeur dépend d'intégrations multiples et entre directement en concurrence avec Power BI.

## Recommandation pour l'étape suivante

Cette grille continue de guider la validation des futures applications métier. Tester en priorité les trois hypothèses suivantes auprès de PME :

1. gestionnaire de révision et d'expiration documentaire ;
2. suivi des certifications, permis et formations ;
3. suivi léger des audits et actions correctives.

Depuis cette analyse, [Priority Banner a été sélectionné](priority-banner-mvp.md) comme premier produit de la gamme Intranet Starter Pack afin de commencer par un composant utile, visible et techniquement limité. Cette décision ne remplace pas la validation terrain nécessaire avant de sélectionner la première application métier de conformité.
