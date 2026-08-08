# Conventions de localisation et de métadonnées

Date de validation : 7 août 2026

## Portée

Ces conventions sont obligatoires pour tous les composants et toutes les applications du catalogue.

## Auteur et éditeur

L'auteur et l'éditeur de référence sont toujours écrits exactement ainsi : **Flowmova**.

Cette valeur doit être utilisée de manière cohérente dans :

- `package.json` ;
- la configuration de la solution SPFx ;
- les manifestes des composants ;
- les métadonnées du package `.sppkg` ;
- la fiche Microsoft Marketplace ou SharePoint Store ;
- la documentation, le support et les mentions légales ;
- les informations affichées dans l'App Catalog.

Flowmova reste identifiable comme éditeur dans ces emplacements, même si l'interface quotidienne du composant adopte la marque du client.

## Métadonnées communes

Chaque produit possède ses propres identifiants, son nom fonctionnel et sa version, mais utilise une structure de métadonnées commune.

| Métadonnée | Convention |
|---|---|
| Auteur et éditeur | `Flowmova` |
| Nom du produit | Nom fonctionnel, court et cohérent dans tous les fichiers |
| Identifiant de solution | UUID unique et permanent par produit |
| Identifiant de composant | UUID unique et permanent par composant |
| Nom du package | Nom technique stable, en minuscules et sans espace |
| Version | Synchronisée entre le code, le package SPFx et la version publiée |
| Description | Courte, précise, localisée et centrée sur la valeur utilisateur |
| Icône | Propre au produit et conforme au style commun du catalogue |
| Support | Coordonnées Flowmova communes, définies avant la publication |
| Confidentialité et conditions | Liens Flowmova communs, définis avant la publication |

Les valeurs communes de support, de confidentialité et de conditions ne doivent pas être inventées dans un projet. Elles seront définies une seule fois avant la première soumission au Store.

## Langues obligatoires

Chaque composant doit prendre en charge le français et l'anglais dès sa première version publiable.

Les cultures initialement ciblées sont :

- `fr-CA` et `en-CA` pour le marché canadien ;
- `fr-FR` et `en-US` pour une compatibilité plus large ;
- anglais comme langue de secours technique lorsqu'une culture n'est pas disponible.

## Textes de l'interface

Aucun texte visible par l'utilisateur ne doit être inscrit directement dans le code lorsqu'il doit être traduit.

Les fichiers de ressources SPFx doivent couvrir :

- le nom et la description du composant ;
- les boutons, libellés, menus et messages ;
- les erreurs et confirmations ;
- le panneau de propriétés ;
- les textes d'aide et les états vides ;
- les choix et statuts fournis par le produit.

Les clés de traduction doivent être identiques dans toutes les langues et vérifiées pendant la construction et les tests.

## Contenu administré par le client

La localisation de l'interface ne traduit pas automatiquement le contenu créé par le client.

Selon le besoin du composant, l'une des stratégies suivantes doit être documentée :

- contenu unique affiché dans toutes les langues ;
- champs distincts pour le français et l'anglais ;
- utilisation des pages et actualités multilingues de SharePoint ;
- choix explicite de la langue du contenu par l'administrateur.

La traduction automatique ne doit pas être imposée et nécessiterait une décision d'architecture distincte.

## Formats régionaux

Les dates, heures, nombres et unités doivent utiliser la culture de l'utilisateur ou du site. Les formats fixes écrits directement dans le code sont interdits, sauf lorsqu'un format technique normalisé est requis pour le stockage ou l'échange de données.

## Vérification obligatoire

Avant chaque publication, vérifier au minimum :

- l'interface et le panneau de propriétés en français et en anglais ;
- les manifestes et descriptions localisés ;
- les formats de dates, d'heures et de nombres ;
- la langue de secours ;
- l'absence de texte utilisateur non localisable dans le code ;
- la cohérence de l'auteur `Flowmova`, du nom et de la version dans tous les fichiers ;
- la lisibilité des traductions sur ordinateur et mobile.
