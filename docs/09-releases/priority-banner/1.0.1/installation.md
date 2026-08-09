# Guide d’installation — Priority Banner 1.0.1

## Prérequis

- un tenant SharePoint Online ;
- un App Catalog de tenant ou de collection de sites ;
- un administrateur autorisé à téléverser et déployer un package SPFx ;
- un propriétaire de site autorisé à installer une application et modifier une page moderne.

Priority Banner ne requiert aucune permission Microsoft Graph, inscription d’application Entra ID, liste SharePoint, infrastructure Azure, licence externe ou compte chez FlowMova.

## Installation dans l’App Catalog

1. Récupérer le fichier `priority-banner.sppkg` provenant de la livraison officielle.
2. Ouvrir l’App Catalog SharePoint approprié.
3. Téléverser le fichier dans la bibliothèque **Apps for SharePoint**.
4. Vérifier que SharePoint affiche le nom **Priority Banner** et la version `1.0.1.0`.
5. Sélectionner **Déployer** dans la fenêtre de confirmation.
6. Vérifier que l’état du package est activé et qu’aucune erreur n’apparaît dans la colonne des erreurs du package.

## Ajout à un site

Lorsque la solution n’est pas activée globalement pour tous les sites :

1. ouvrir le site cible ;
2. ouvrir **Contenu du site** ;
3. sélectionner **Nouveau**, puis **Application** ;
4. choisir **Depuis votre organisation** ;
5. sélectionner **Priority Banner** et attendre la fin de l’installation.

## Ajout à une page

1. Ouvrir une page SharePoint moderne et sélectionner **Modifier**.
2. Ajouter un nouveau composant Web.
3. Rechercher **Priority Banner** ou **Bandeau prioritaire**, selon la langue SharePoint.
4. Ajouter le composant et ouvrir son panneau de propriétés.
5. Saisir au minimum un titre.
6. Configurer, si nécessaire, le message, la priorité, le format, le bouton, la traduction, l’expiration et la fermeture.
7. Publier ou republier la page.

Plusieurs instances peuvent être ajoutées à une même page. Chaque instance conserve sa propre configuration.

## Mise à jour depuis la version 1.0.0

1. Téléverser le nouveau `priority-banner.sppkg` dans le même App Catalog.
2. Accepter le remplacement du package existant.
3. Vérifier que la version proposée est supérieure à la version déployée.
4. Sélectionner **Déployer**.
5. Si SharePoint signale une mise à jour dans **Contenu du site**, ouvrir les détails de l’application et appliquer la mise à jour.
6. Attendre quelques minutes, puis effectuer une actualisation forcée du navigateur avec `Ctrl + F5`.
7. Modifier une page et vérifier l’icône, le nom, la description et une instance déjà configurée.

La mise à jour vers 1.0.1 ne modifie pas les propriétés enregistrées dans les pages et ne crée aucune ressource SharePoint.

## Désinstallation d’un site

1. Retirer les instances Priority Banner des pages qui ne doivent plus les afficher.
2. Ouvrir **Contenu du site**.
3. Ouvrir les options de **Priority Banner**, puis sélectionner **Supprimer**.
4. Confirmer que les pages restantes ne dépendent plus du composant.

## Retrait du tenant

Le retrait du package de l’App Catalog désactive la solution pour tous les sites qui en dépendent. Cette opération doit uniquement être réalisée par un administrateur après inventaire des usages.

Priority Banner ne crée ni liste ni fichier de données. La fermeture d’un message est mémorisée uniquement dans le stockage local du navigateur avec une clé propre à l’instance. La désinstallation ne nettoie pas automatiquement ce stockage local.

## Dépannage rapide

- **Le composant n’apparaît pas** : confirmer que l’application est installée sur le site et que le package est activé dans l’App Catalog.
- **L’ancienne icône ou description reste visible** : vérifier le numéro de version, attendre la propagation, puis utiliser `Ctrl + F5` ou une fenêtre privée.
- **Le bouton n’apparaît pas** : renseigner son libellé et une URL valide.
- **Le bandeau n’apparaît plus** : vérifier la date d’expiration et, pour un message fermable, le stockage local du navigateur.
- **Support** : `https://darkstorm97.github.io/Sharepoint-Flowmova/support.html`.
