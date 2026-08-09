# Priority Banner — fiche du MVP

Statut : validé — 8 août 2026

Auteur et éditeur : `Flowmova`

Gamme : Intranet Starter Pack

## Promesse

Permettre à un propriétaire de page SharePoint d’ajouter en quelques instants une communication importante, sans liste à maintenir ni infrastructure externe. Le nom reste générique afin que le produit convienne à un intranet, un portail de projet, un extranet ou un site de service.

## Expérience retenue

Une instance du Web Part correspond à un message. Le propriétaire saisit directement dans les propriétés :

- le titre et le message ;
- la priorité : Information, Important, Urgent ou Critique ;
- un bouton et un lien facultatifs ;
- l’autorisation de fermeture ;
- une date et une heure d’expiration facultatives ;
- une traduction facultative.

Plusieurs instances peuvent être ajoutées à la même page. Aucune date de début n’est demandée. Une expiration saisie doit être future ; une fois atteinte, le composant disparaît automatiquement en mode lecture sans laisser de contenu vide.

## Langues

Il n’existe aucun sélecteur de langue visible. Lors de la première configuration, la langue principale est déterminée d’après la culture de l’interface SharePoint et conservée dans les propriétés du Web Part. Si une traduction complète est fournie, le visiteur reçoit automatiquement la version correspondant à sa langue SharePoint ; sinon, le contenu principal complet est utilisé. Aucune traduction automatique n’est incluse.

## Fermeture

Une fermeture autorisée est conservée dans le navigateur et reste valable tant que le contenu ne change pas. Le niveau Critique ne peut jamais être fermé.

## Contraintes du MVP

- aucune liste SharePoint ;
- aucune permission Microsoft Graph ;
- aucun backend Azure ni service externe ;
- texte rendu sans HTML non fiable ;
- URL limitée à HTTP, HTTPS, une ancre ou un chemin relatif SharePoint ;
- package `.sppkg`, versionnement, tests et documentation propres au produit.

Un futur produit avancé de type « Message Center » pourra offrir une gestion centralisée basée sur une liste, sans complexifier ce composant simple.

## Critères d’acceptation

- configuration complète dans la page sans modifier le code ;
- plusieurs messages indépendants sur une page ;
- affichage responsive et accessible des quatre priorités ;
- détection automatique du français ou de l’anglais ;
- rejet d’une expiration passée ;
- disparition automatique après expiration ;
- fermeture persistante et réapparition après modification ;
- build et déploiement Store indépendants.
