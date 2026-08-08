# Catalogue produit initial

Date de validation conceptuelle : 7 août 2026

## Objectif du catalogue

Le catalogue doit combiner deux formes de valeur :

- des composants simples qui améliorent rapidement l'apparence et l'utilisation d'un intranet SharePoint ;
- des applications métier qui structurent un processus et réduisent un problème opérationnel.

Un produit n'a pas besoin d'être révolutionnaire pour être retenu. Un composant générique peut apporter une valeur commerciale s'il est esthétique, fiable, facile à configurer et mieux adapté aux PME que les options natives ou les solutions complexes.

## Règle d'indépendance

Les packs sont des regroupements commerciaux et non des dépendances techniques.

Chaque composant doit conserver :

- son projet et son package `.sppkg` ;
- son identité et son versionnement ;
- sa documentation d'installation et d'utilisation ;
- son processus de construction, de test et de publication ;
- la possibilité d'être acheté, installé, mis à jour et désinstallé séparément.

Un client pourra acheter un composant seul ou profiter d'un prix regroupé pour un pack. Aucun pack ne devra imposer l'installation de tous ses composants.

## 1. Intranet Starter Pack

Le Starter Pack constitue la porte d'entrée du catalogue. Il doit permettre à une PME de construire rapidement une page d'accueil moderne et cohérente sans développement personnalisé.

### Smart Hero

Bannière principale avec images, messages, appels à l'action, rotation facultative et plusieurs dispositions visuelles.

### Quick Link Cards

Cartes de navigation avec icônes, catégories, couleurs, recherche facultative et adaptation au thème du client.

### Priority Banner

Bandeau destiné aux communications importantes : information, avertissement, urgence ou interruption de service.

**Premier produit sélectionné.** Son [périmètre MVP est validé](priority-banner-mvp.md). Son nom générique lui permet d'être utilisé dans un intranet, un site d'équipe, un portail de projet, un extranet ou un site de service.

Le premier périmètre envisagé comprend :

- quatre niveaux de priorité ;
- dates de début et de fin ;
- lien ou bouton facultatif ;
- fermeture configurable par l'utilisateur ;
- données stockées dans une liste SharePoint ;
- personnalisation visuelle et affichage mobile.

Le ciblage par groupe, l'accusé de lecture et l'affichage global sur plusieurs sites seront étudiés dans des versions ultérieures.

### News Spotlight

Présentation enrichie des nouvelles SharePoint existantes sous forme de cartes, carrousel ou mise en page magazine, avec catégories et contenu prioritaire.

### Events Spotlight

Événements provenant d'une liste SharePoint, présentés sous forme de cartes, calendrier compact ou carrousel.

### FAQ Accordion

Questions-réponses avec catégories, recherche, ordre configurable et plusieurs styles d'accordéon.

## 2. Intranet Engagement Pack

Cette gamme vise la culture interne, la reconnaissance et la participation des employés.

- **Celebrations & New Employees** : anniversaires, ancienneté, promotions et nouveaux employés ;
- **Employee Spotlight** : présentation d'un employé, d'une équipe ou d'une réalisation ;
- **Kudos & Recognition** : messages de reconnaissance visibles dans l'intranet ;
- **Poll & Pulse** : sondage rapide et résultats simples ;
- **Countdown** : compte à rebours pour un événement, une campagne ou une échéance.

## 3. Intranet Content Pack

Cette gamme aide à organiser et présenter clairement le contenu interne.

- **KPI Tiles** : chiffres clés et indicateurs simples ;
- **Document Spotlight** : documents importants, récents ou fréquemment utilisés ;
- **Department Cards** : services, responsables, contacts et ressources ;
- **Content Tabs** : contenu structuré dans des onglets ;
- **Media Gallery** : images, vidéos et campagnes internes ;
- **Office Locations** : bureaux, horaires, contacts et informations pratiques ;
- **Request Launcher** : accès visuel aux demandes de congé, soutien TI, achats, dépenses ou réservations.

Le Request Launcher doit pouvoir ouvrir une liste ou un formulaire SharePoint, Microsoft Forms, Power Apps, Power Automate ou une adresse autorisée, sans imposer une technologie unique au client.

## 4. Business Apps

Cette gamme regroupe des produits autonomes qui couvrent un processus métier plus complet.

- gestion légère des congés et calendrier des absences ;
- réservation de salles, équipements ou ressources ;
- demandes internes et approbations ;
- onboarding par rôle ;
- révision et expiration documentaire ;
- suivi des certifications, permis et formations ;
- audits et actions correctives ;
- politiques et accusés de lecture.

La gestion des congés devra initialement rester indépendante des règles de paie et des particularités légales de chaque pays. Un premier MVP pourrait couvrir la demande, la validation, les types d'absence, le calendrier d'équipe, les chevauchements et l'export.

## Principes d'expérience communs

Tous les composants du catalogue devront :

- ressembler à des fonctions naturelles de Microsoft 365 ;
- suivre le thème SharePoint et permettre la personnalisation du client ;
- rester utilisables sur ordinateur, tablette et mobile ;
- respecter l'accessibilité et fournir le français et l'anglais dès la première version publiable ;
- offrir plusieurs dispositions visuelles prêtes à l'emploi ;
- éviter toute publicité ou marque Flowmova dans l'usage quotidien ;
- identifier systématiquement `Flowmova` comme auteur et éditeur dans les métadonnées, la fiche Store et la documentation ;
- privilégier les listes et bibliothèques SharePoint pour les données ;
- éviter les permissions étendues et les services externes non indispensables ;
- être conçus dès le départ pour une publication individuelle sur le Store.

Tous les produits appliquent les [conventions communes de localisation et de métadonnées](../06-store/conventions-localisation-metadonnees.md).

## Priorités du catalogue

Priority Banner est le premier produit sélectionné pour la conception et le développement.

Les composants suivants restent candidats pour la suite :

1. Quick Link Cards ;
2. News Spotlight ;
3. Celebrations & New Employees ;
4. Document Spotlight ;
5. Request Launcher.

Leur ordre sera décidé progressivement sans créer de dépendance avec Priority Banner.
