# Checklist de certification — Priority Banner 1.0.1

Date du contrôle : 9 août 2026

Légende :

- `[x]` vérifié ;
- `[ ]` à réaliser ;
- **Bloquant** : doit être fermé avant la soumission.

## 1. Package et métadonnées

- [x] Le package est indépendant et contient un seul Web Part.
- [x] La solution porte le nom **Priority Banner**.
- [x] Les versions sont cohérentes : solution `1.0.1.0`, composant `1.0.1`.
- [x] SPFx 1.23.2 est supérieur à la version minimale 1.11 indiquée par Microsoft.
- [x] Les ressources clientes sont incluses dans le `.sppkg`.
- [x] Le package se compile et passe la validation de l’outil SPFx.
- [x] Le package a été accepté et déployé dans l’App Catalog du tenant de validation.
- [x] L’auteur est **FlowMova** dans le package et la fiche Store.
- [x] Les URL du produit, de confidentialité et des conditions sont présentes.
- [x] Le `mpnId` contient le PartnerID FlowMova `7145647` fourni par Partner Center.
- [x] SHA-256 du candidat final recalculé et consigné après intégration du PartnerID.

## 2. Permissions, données et sécurité

- [x] Aucun `webApiPermissionRequests` n’est déclaré.
- [x] Aucune permission Microsoft Graph n’est demandée.
- [x] Aucun appel HTTP externe n’a été trouvé dans le code applicatif.
- [x] Aucune clé, aucun secret et aucun identifiant client ne sont incorporés.
- [x] Aucune liste SharePoint, base de données ou infrastructure Azure n’est requise.
- [x] Le stockage local contient uniquement l’état de fermeture d’une instance.
- [x] `npm audit --omit=dev` indique 0 vulnérabilité connue au 9 août 2026.
- [ ] **Bloquant —** répéter l’audit npm et la revue des secrets immédiatement avant la soumission.

## 3. Fonctionnement du Web Part

- [x] Le rendu est limité au `domElement` fourni par SPFx.
- [x] Toutes les propriétés exposées modifient un comportement visible ou une validation.
- [x] La première insertion guide l’auteur lorsque le titre n’est pas encore configuré.
- [x] Les formats Standard et Compact fonctionnent.
- [x] Les quatre niveaux de priorité fonctionnent.
- [x] Le titre est obligatoire et le message est facultatif.
- [x] Le bouton est facultatif et son URL est validée.
- [x] Une expiration passée est refusée et un message expiré disparaît.
- [x] La fermeture persiste localement et le niveau Critique reste non fermable.
- [x] Plusieurs instances fonctionnent indépendamment sur une page.
- [x] Les langues `fr-CA`, `fr-FR`, `en-CA` et `en-US` sont fournies.
- [x] Les thèmes SharePoint, le clavier et les tailles mobile, tablette et ordinateur ont été couverts pendant la validation fonctionnelle.
- [x] L’unique hôte déclaré est SharePoint ; aucun test Teams n’est requis pour 1.0.1.

## 4. Matrice de tests encore requise

- [ ] **Bloquant —** installer et tester sur le site racine du tenant.
- [x] Installer et tester sur un site non racine : `/sites/FlowmovaComposant`.
- [ ] **Bloquant —** tester la dernière version de Microsoft Edge sur Windows.
- [ ] **Bloquant —** tester la dernière version de Google Chrome sur Windows.
- [ ] **Bloquant —** tester la dernière version de Mozilla Firefox sur Windows.
- [ ] Contrôler une nouvelle fois le thème sombre et un thème de marque personnalisé.
- [ ] Contrôler le comportement avec le stockage local désactivé ou indisponible.
- [ ] Contrôler une URL d’action interne et une URL externe, y compris le retour vers SharePoint.
- [ ] Mesurer que le chargement initial reste nettement inférieur à 10 secondes.

## 5. Fiche Marketplace

- [x] La fiche contient une proposition de valeur et décrit le Web Part inclus.
- [x] Les descriptions française et anglaise sont préparées.
- [x] Les limites et l’absence de dépendances externes sont expliquées.
- [x] Aucun superlatif invérifiable, comparatif concurrentiel ou contenu publicitaire tiers n’est utilisé.
- [x] Cinq captures PNG de 1280 × 720 avec légendes sont disponibles.
- [x] Les formats de logo 48 × 48, 90 × 90 et 216 à 350 px sont disponibles.
- [x] Les pages publiques produit, support, confidentialité et conditions répondent avec HTTP 200.
- [x] Une adresse de support publique est fournie.
- [ ] **Bloquant —** recopier les textes sans divergence dans Partner Center.
- [ ] **Bloquant —** vérifier une dernière fois les dimensions exigées dans l’interface Partner Center au moment du téléversement.
- [ ] Sélectionner la catégorie principale **Productivity** et valider la catégorie secondaire disponible.
- [ ] Sélectionner l’option d’acquisition gratuite appropriée pour la version 1.0.1.

## 6. Instructions et environnement de certification

- [x] Les [instructions de test](test-instructions.md) décrivent l’installation, la configuration et les résultats attendus.
- [x] Aucun compte externe FlowMova n’est nécessaire.
- [x] Aucun scénario collaboratif nécessitant plusieurs identités n’est inclus.
- [ ] **Bloquant —** renseigner les notes de certification dans Partner Center.
- [ ] Si Microsoft demande un tenant fourni par l’éditeur, transmettre les identifiants uniquement dans le canal sécurisé Partner Center, jamais dans Git.
- [ ] Confirmer que le compte de test fourni, le cas échéant, peut installer le `.sppkg` et n’est pas bloqué par une MFA inaccessible au certificateur.

## 7. Références officielles contrôlées

- [Préparer une application SPFx pour Microsoft Marketplace](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-checklist)
- [Erreurs courantes de validation SPFx](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-common-validation-errors)
- [Règles de contenu des fiches Microsoft Marketplace](https://learn.microsoft.com/en-us/partner-center/marketplace-offers/marketplace-criteria-content-validation)
- [Examiner et publier une offre](https://learn.microsoft.com/en-us/partner-center/marketplace-offers/review-publish-offer)

Les exigences Partner Center peuvent évoluer. Cette checklist doit être comparée à l’interface et aux politiques actives le jour de la soumission.
