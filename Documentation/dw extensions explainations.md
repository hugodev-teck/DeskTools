# Documentation du Format de Fichier `.dw` (Éditeur Paper)

## 1. Introduction
Le format `.dw` (Document Web) est le format de sauvegarde natif de l'application **Paper**. 
Bien qu'il possède une extension personnalisée, il s'agit techniquement d'un fichier texte structuré au format **JSON** (JavaScript Object Notation)[cite: 1]. 

Cette architecture permet de stocker non seulement le contenu brut du document, mais également toutes les métadonnées, les réglages de mise en page et les données auxiliaires (comme les polices importées ou les commentaires)[cite: 1].

---

## 2. Structure des données (Version 2.0+)

Lorsqu'un utilisateur sauvegarde un document, l'application génère un objet JSON divisé en trois sections principales[cite: 1] :

### A. `metadata` (Métadonnées)
Cette section contient les informations globales du document et les paramètres de mise en page sélectionnés par l'utilisateur[cite: 1] :
* `creationDate` / `creationTime` : Horodatage de la sauvegarde[cite: 1].
* `paperSize` : Format de la page (ex: A4, A5, Letter)[cite: 1].
* `orientation` : `portrait` ou `landscape`[cite: 1].
* `margins` : Type de marges (ex: `normal`, `narrow`)[cite: 1].
* `version` : Version du format de fichier (actuellement `"2.0"`)[cite: 1].
* `headerText` / `footerText` : Contenu des en-têtes et pieds de page[cite: 1].
* `showPageNum` : Booléen (`true`/`false`) pour l'affichage de la pagination[cite: 1].
* `title`, `author`, `subject`, `keywords` : Propriétés du document remplies dans l'onglet "Propriétés"[cite: 1].

### B. `pages` (Contenu HTML)
Il s'agit d'un tableau (Array) de chaînes de caractères[cite: 1]. Chaque entrée du tableau correspond au code HTML brut exact contenu à l'intérieur d'une balise `<div class="page">` de l'éditeur[cite: 1]. C'est ici que résident le texte, les tableaux, et le code des graphiques générés.

### C. `auxiliaryData` (Données Appliquées)
Gère les fonctionnalités avancées qui ne font pas directement partie de la structure HTML standard[cite: 1] :
* `comments` : Un objet stockant les commentaires du document (ID du commentaire, texte, date)[cite: 1].
* `customFonts` : Un objet stockant les polices importées par l'utilisateur (nom système, nom d'affichage, et la police encodée en Base64 via `dataUrl`)[cite: 1].

---

## 3. Exemple de fichier `.dw`

Voici à quoi ressemble la structure interne d'un fichier généré par Paper :

```json
{
  "metadata": {
    "creationDate": "10/09/2026",
    "creationTime": "09:15:30",
    "paperSize": "A4",
    "orientation": "portrait",
    "margins": "normal",
    "version": "2.0",
    "footerText": "Confidentiel",
    "showPageNum": true,
    "headerText": "",
    "title": "Rapport Annuel",
    "author": "Hugo",
    "subject": "",
    "keywords": ""
  },
  "pages": [
    "<h1 style=\"color: rgb(18,18,131);\">Titre de la page 1</h1><p>Contenu de la première page...</p>",
    "<p>Contenu de la page 2...</p>"
  ],
  "auxiliaryData": {
    "comments": {
      "comment-16987654321": {
        "text": "Vérifier ce paragraphe",
        "date": "10/09/2026 à 09:16"
      }
    },
    "customFonts": {}
  }
}

```

---

## 4. Cycle de Vie et Sécurité

### Sauvegarde (Exportation)

Lors du clic sur le bouton "Sauvegarder", l'application compile le DOM (Document Object Model) de chaque page, récupère les variables globales (`window.documentComments`, `window.customFonts`), génère la chaîne JSON, et déclenche le téléchargement du fichier via un objet `Blob` de type `application/json`.

### Ouverture (Importation) et Rétrocompatibilité

Lors de l'ouverture d'un fichier `.dw` via le `FileReader` :

1. Le texte est lu et converti en objet JSON.
2. Les paramètres de l'interface (menus déroulants, inputs) sont mis à jour via la section `metadata`.


3. Les polices personnalisées sont injectées dans le `localStorage` et le document.


4. Le code HTML de la section `pages` est injecté dans le DOM pour recréer visuellement les feuilles.


5. **Rétrocompatibilité (v1.0) :** Si le fichier ne peut pas être lu comme du JSON (bloc `catch`), l'application assume qu'il s'agit d'un ancien fichier `.dw` (v1) contenant uniquement du HTML brut et l'injecte directement dans le conteneur principal.



### Sécurité (Anti-XSS)

Depuis la version 2.1, l'injection du HTML (qu'il provienne d'un fichier v2 ou v1) passe systématiquement par un filtre de sécurité natif utilisant `DOMParser`. Ce filtre détruit les balises malveillantes (`<script>`, `<iframe>`...) et n'autorise que les attributs d'événements (`onclick`, `onmouseover`) strictement définis dans une liste blanche (Whitelist) correspondant aux fonctionnalités natives de Paper (Graphiques, Sommaire).