# Environnement Microsoft 365 de développement

## Statut

Configuration vérifiée le 7 août 2026.

Le tenant Microsoft 365 est prêt pour commencer les essais SharePoint Framework.

## Tenant

- Domaine SharePoint : `flowmova.sharepoint.com`
- Licence de développement disponible : Microsoft 365 Business Basic
- Accès au centre d'administration Microsoft 365 : validé
- Accès au centre d'administration SharePoint : validé

## App Catalog

- App Catalog au niveau du tenant : provisionné
- URL : `https://flowmova.sharepoint.com/sites/appcatalog`
- Utilisation prévue : dépôt et gestion des packages `.sppkg` de test

Le catalogue du tenant permettra de tester le cycle de déploiement réel d'un composant avant sa préparation pour le Store.

## Site de développement

- Nom : `FlowmovaComposant`
- URL : `https://flowmova.sharepoint.com/sites/FlowmovaComposant`
- Type : site de communication
- Administrateur principal : compte de développement du projet
- Partage externe : désactivé
- Workbench SharePoint hébergé : accessible

URL du Workbench :

`https://flowmova.sharepoint.com/sites/FlowmovaComposant/_layouts/15/workbench.aspx`

## Utilisation prévue

Ce site est réservé aux prototypes, aux tests fonctionnels et à la validation visuelle des composants SPFx.

Avant une publication, les tests devront aussi couvrir :

- un site racine ;
- un site non racine ;
- un site de communication ;
- un site d'équipe lorsque le composant le nécessite ;
- l'installation et la désinstallation du package ;
- les permissions et les comportements avec des utilisateurs non administrateurs.

## Points restant à préparer

- définir des comptes ou profils de test non administrateurs ;
- documenter le processus de déploiement dans l'App Catalog ;
- vérifier les exigences officielles du Store pour le composant sélectionné.

## Laboratoire SPFx

Le laboratoire `prototypes/spfx-environment-check` valide actuellement :

- Node.js 22 LTS et SPFx 1.23.2 ;
- la génération d'une Web Part React ;
- la compilation avec Heft ;
- le certificat HTTPS de développement ;
- le chargement du manifeste local dans SharePoint ;
- la création d'un package `.sppkg` de production ;
- le téléversement et l'activation du package dans l'App Catalog ;
- l'installation ciblée sur le site de développement ;
- l'ajout de la Web Part sur une page SharePoint moderne.

La chaîne technique locale vers SharePoint est validée. Le laboratoire ne doit pas être publié sur le Store : il sert uniquement de référence pour les futurs composants.
