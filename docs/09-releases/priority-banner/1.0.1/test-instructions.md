# Instructions de test pour la certification Microsoft

Produit : Priority Banner 1.0.1

Éditeur : FlowMova

Composant inclus : un Web Part SharePoint nommé **Priority Banner** en anglais et **Bandeau prioritaire** en français.

## Objet du produit

Le Web Part permet à un auteur de page de publier un message prioritaire directement dans une page SharePoint moderne. Il ne nécessite aucun compte FlowMova, service externe, consentement API, liste SharePoint ou configuration Azure.

## Prérequis du testeur

- un tenant SharePoint Online avec un App Catalog ;
- un compte pouvant téléverser et déployer un `.sppkg` ;
- un compte pouvant installer une application sur un site et modifier une page moderne.

Aucun identifiant externe n’est requis. Aucun secret ou identifiant de tenant ne doit être ajouté à ce document public.

## Installation

1. Téléverser `priority-banner.sppkg` dans l’App Catalog.
2. Vérifier le nom **Priority Banner** et la version `1.0.1.0`.
3. Sélectionner **Deploy**.
4. Installer l’application sur un site SharePoint si elle n’est pas déjà disponible globalement.
5. Modifier une page moderne et ajouter **Priority Banner** depuis le sélecteur de composants.

Résultat attendu : le Web Part est ajouté sans erreur et affiche un état invitant l’auteur à configurer un titre.

## Scénario 1 — Message Standard

1. Ouvrir le panneau de propriétés.
2. Saisir un titre.
3. Saisir un message facultatif.
4. Sélectionner successivement Information, Important, Urgent et Critique.
5. Publier la page.

Résultat attendu : le contenu et le style changent selon le niveau. Le format Standard conserve l’icône et le libellé du niveau.

## Scénario 2 — Format Compact et bouton

1. Sélectionner le format Compact.
2. Renseigner un libellé de bouton et une URL HTTPS valide.
3. Publier la page.

Résultat attendu : le format Compact affiche l’icône, le titre et le bouton. Le message détaillé n’est pas affiché dans ce format.

## Scénario 3 — Validation de l’expiration

1. Saisir une date d’expiration antérieure à la date actuelle.
2. Vérifier le message de validation.
3. Saisir ensuite une date future.

Résultat attendu : la date passée est refusée. La date future est acceptée et le bandeau disparaît automatiquement lorsqu’elle est dépassée.

## Scénario 4 — Fermeture

1. Utiliser un niveau autre que Critique et activer la fermeture.
2. Fermer le bandeau, puis recharger la page.
3. Passer le même bandeau au niveau Critique.

Résultat attendu : la fermeture reste mémorisée dans le navigateur pour un message fermable. Un message Critique ne présente pas de commande de fermeture.

## Scénario 5 — Langues

1. Activer la traduction.
2. Saisir le contenu principal et sa traduction.
3. ouvrir la page dans un contexte SharePoint français, puis anglais.

Résultat attendu : le composant sélectionne automatiquement le contenu français ou anglais selon la langue SharePoint, sans afficher de sélecteur de langue.

## Scénario 6 — Plusieurs instances

1. Ajouter au moins trois instances sur la même page.
2. Configurer des niveaux et formats différents.
3. Publier la page.

Résultat attendu : chaque instance conserve son contenu, son style, son expiration et son état de fermeture indépendamment.

## Points complémentaires

- tester sur un site racine et un site non racine ;
- tester Microsoft Edge, Google Chrome et Mozilla Firefox sur Windows ;
- tester une largeur mobile et le thème sombre ;
- vérifier que tous les liens configurés sont accessibles ;
- confirmer qu’aucune demande de permission API n’apparaît.

## Limites attendues

- aucune gestion centralisée des messages ;
- aucune date de début ;
- aucune synchronisation de la fermeture entre navigateurs ou appareils ;
- aucune langue autre que le français et l’anglais dans cette version ;
- aucune intégration Microsoft Teams déclarée.

## Support

- produit : `https://darkstorm97.github.io/Sharepoint-Flowmova/priority-banner.html`
- support : `https://darkstorm97.github.io/Sharepoint-Flowmova/support.html`
- courriel : `paulinmoffo07@gmail.com`
