# Priority Banner — fiche du MVP

Statut : validé

Date de validation : 7 août 2026

Auteur et éditeur : `Flowmova`

Gamme : Intranet Starter Pack

## Nom du produit

- nom international : **Priority Banner** ;
- nom français : **Bandeau prioritaire**.

Le nom est volontairement indépendant du contexte d'utilisation. Le produit peut être utilisé dans un intranet, un site d'équipe, un portail de projet, un extranet ou un site de service.

Le nom final utilisé dans le Store devra rester cohérent avec les manifestes, le package et la documentation.

## Problème traité

Les communications importantes publiées dans un intranet peuvent être noyées parmi les nouvelles et le contenu courant. Une PME doit pouvoir afficher rapidement un message prioritaire, pendant une période déterminée, sans développement personnalisé ni infrastructure externe.

## Promesse

Permettre à un responsable de publier une communication importante dans une page SharePoint et aux employés de comprendre immédiatement sa priorité et l'action attendue.

## Utilisateurs

- **propriétaire de site** : installe et configure le composant et sa source de données ;
- **responsable des communications** : prépare et programme les messages ;
- **employé** : consulte le message actif et accède à l'information complémentaire.

## Périmètre fonctionnel du MVP

### Composant

- Web Part SPFx destiné aux pages SharePoint modernes ;
- ajout et configuration depuis les mécanismes habituels de SharePoint ;
- interface responsive et cohérente avec Fluent UI et le thème du site.

### Source de données

- stockage dans une liste SharePoint du tenant du client ;
- possibilité pour un propriétaire de site de sélectionner une liste compatible ;
- assistant de configuration pour créer la liste fonctionnelle lorsqu'elle n'existe pas ;
- aucun nom commercial Flowmova imposé à la liste du client.

La structure technique exacte et les noms internes des colonnes seront définis dans l'architecture du composant.

### Communication

Chaque communication comporte au minimum :

- un titre ;
- une description courte ;
- un niveau de priorité ;
- une date et une heure de début ;
- une date et une heure de fin ;
- un état actif ou inactif ;
- un bouton et un lien facultatifs ;
- une option permettant ou interdisant sa fermeture.

### Priorités

Les quatre niveaux sont :

1. Information ;
2. Important ;
3. Urgent ;
4. Critique.

Chaque niveau possède un style, une icône et un contraste accessibles. Une communication critique ne peut pas être fermée par l'utilisateur.

### Règle d'affichage

- seules les communications actives dont la période inclut la date et l'heure courantes sont admissibles ;
- si plusieurs communications sont admissibles, celle ayant la priorité la plus élevée est affichée ;
- en cas de priorité identique, la communication ayant la date de début la plus récente est affichée ;
- si aucune communication n'est admissible, le composant ne laisse pas de bandeau vide sur la page.

### Personnalisation

- utilisation automatique du thème SharePoint ;
- styles prédéfinis associés aux priorités ;
- options visuelles limitées afin de préserver l'accessibilité et la cohérence ;
- libellé du bouton configurable.

### Localisation

- interface, panneau de propriétés, messages et erreurs disponibles en français et en anglais ;
- prise en charge initiale de `fr-CA`, `en-CA`, `fr-FR` et `en-US` ;
- formats de date et d'heure adaptés à la culture active ;
- anglais utilisé comme langue de secours technique.

La stratégie applicable au contenu bilingue saisi par le client sera arrêtée pendant la conception du modèle de données. Aucune traduction automatique n'est incluse.

## Sécurité et dépendances

- données conservées dans SharePoint Online ;
- aucune permission Microsoft Graph étendue ;
- aucun backend Azure obligatoire ;
- aucun secret dans le package client ;
- lecture soumise aux permissions de la liste SharePoint ;
- création ou modification de la liste réservée aux utilisateurs qui possèdent déjà les droits SharePoint nécessaires.

## Hors du MVP

- injection automatique du bandeau dans tous les sites du tenant ;
- ciblage par groupe, département, emplacement ou profil ;
- accusé de lecture ;
- statistiques de consultation ;
- notifications Teams ou courriel ;
- traduction automatique ;
- carrousel ou rotation de plusieurs communications ;
- administration centralisée à l'échelle du tenant.

Ces éléments restent des évolutions possibles et ne doivent pas complexifier la première version.

## Critères d'acceptation produit

Le MVP sera considéré fonctionnel lorsque :

- un propriétaire de site peut configurer une liste existante ou créer la source attendue ;
- un responsable peut programmer une communication sans modifier le code ;
- le composant affiche uniquement la communication admissible selon les règles définies ;
- les quatre niveaux sont visuellement distincts et accessibles ;
- la fermeture respecte la configuration et demeure impossible pour le niveau Critique ;
- l'absence de communication active ne laisse aucun espace inutile ;
- l'interface fonctionne en français et en anglais ;
- l'affichage est utilisable sur ordinateur et mobile ;
- la solution se construit et se déploie comme un package indépendant ;
- aucune permission Graph étendue ni infrastructure Azure n'est requise.

## Publication

Le produit doit posséder sa propre identité, son package `.sppkg`, son versionnement, ses tests, ses ressources Store et sa documentation. Toutes les métadonnées appliquent les [conventions communes](../06-store/conventions-localisation-metadonnees.md).

## Étape suivante

Définir l'architecture fonctionnelle et technique : modèle de liste, comportement de fermeture, configuration du Web Part, états visuels, installation, désinstallation et stratégie de test.
