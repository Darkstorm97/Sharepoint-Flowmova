# Déploiement d'un package SPFx dans l'App Catalog

Cette procédure a été validée avec le laboratoire `spfx-environment-check`.

## 1. Produire le package

Depuis le dossier du projet SPFx :

```powershell
heft build --production
heft package-solution --production
```

Le package est généré dans `sharepoint/solution`.

## 2. Téléverser le package

Dans l'App Catalog du tenant :

1. ouvrir la page de gestion des applications ;
2. téléverser le fichier `.sppkg` ;
3. vérifier le nom, la version et les permissions demandées ;
4. activer l'application ;
5. ne pas choisir le déploiement global lorsque le test doit rester limité à un site.

## 3. Installer sur un site

Sur le site cible :

1. ouvrir **Contenu du site** ;
2. sélectionner **Nouveau**, puis **Application** ;
3. ouvrir les applications disponibles pour l'organisation ;
4. sélectionner l'application SPFx ;
5. attendre la fin de son installation.

Le téléversement dans l'App Catalog et l'installation sur le site sont deux opérations distinctes lorsque le déploiement global est désactivé.

## 4. Ajouter la Web Part

1. modifier une page SharePoint moderne ;
2. sélectionner le bouton d'ajout d'une Web Part ;
3. rechercher le nom déclaré dans le manifeste ;
4. ajouter la Web Part et vérifier son rendu ;
5. publier ou abandonner la page selon le scénario de test.

## Contrôles requis

- package activé dans l'App Catalog ;
- installation limitée au site prévu ;
- aucune permission inattendue ;
- Web Part visible dans le sélecteur ;
- ressources client chargées correctement ;
- désinstallation et mise à jour testées avant une livraison réelle.
