function updateResultsHeight() {
    const screenHeight=window.innerHeight;
    const desiredHeight=screenHeight * 0.725;
    const resultsElement=document.getElementById("results");
    resultsElement.style.maxHeight=desiredHeight+"px";
}

// Appel initial de la fonction pour définir la hauteur au chargement de la page
updateResultsHeight();
window.addEventListener("resize", updateResultsHeight);

//fin
function searchCode() {
    const searchInput=document .getElementById("searchInput") .value.toLowerCase();

    // Vérifier si jsonData est déjà défini
    if (typeof jsonData==='undefined') {
        // Chargement du fichier JSON en utilisant une balise <script>
        const script=document.createElement("script");
        script.src="Lib/OfficialDeskCodeLib/Dev/co-script/code/list.js"; // Remplacez par le chemin vers votre fichier JSON

        // Manipulation des données lorsque le fichier JSON est chargé
        script.onload=()=> {
            const results=jsonData.filter((code)=> {
                    const title=code.title.toLowerCase();
                    const description=code.description.toLowerCase();
                    return (title.includes(searchInput) || description.includes(searchInput));
                }

            );
            displayResults(results);
        }

        ;
        document.head.appendChild(script);
    }

    else {

        // Utiliser directement la fonction de manipulation des données
        const results=jsonData.filter((code)=> {
                const title=code.title.toLowerCase();
                const description=code.description.toLowerCase();
                return (title.includes(searchInput) || description.includes(searchInput));
            }

        );
        displayResults(results);
    }
}

function displayResults(results) {
    const resultsContainer=document.getElementById("results");
    resultsContainer.innerHTML="";

    if (results.length===0) {
        resultsContainer.innerHTML="Aucun résultat trouvé.";
        return;
    }

    const maxResultsToShow=140; // Nombre maximum de résultats à afficher
    const resultsToShow=results.slice(0, maxResultsToShow); // Limiter les résultats

    resultsToShow.forEach((code)=> {
            const codeItem=document.createElement("div");
            codeItem.classList.add("code-item");
            const title=document.createElement("h3");
            title.textContent=code.title;
            const description=document.createElement("p");
            description.textContent=code.description;
            const codeBlock=document.createElement("pre");

            codeBlock.innerHTML=`<code>${code.code}</code>`;
            const insertButton=document.createElement("button");
            insertButton.textContent="Insérer";

            insertButton.addEventListener("click", ()=> {
                    // Insérer le code dans l'éditeur Monaco
                    insertCodeIntoEditor(code.code);
                }

            );
            codeItem.appendChild(title);
            codeItem.appendChild(description);
            codeItem.appendChild(codeBlock);
            codeItem.appendChild(insertButton);
            resultsContainer.appendChild(codeItem);
        }

    );
}

//fin
// Fonction pour récupérer le langage de l'éditeur actif
function getActiveEditorLanguage() {
    const activeEditor=editorsData[activeEditorId].editor;
    const model=activeEditor.getModel();

    if (model) {
        return model.getLanguageId();
    }

    return null; // Retourne null si aucun modèle n'est trouvé
}

function saveFile() {
    // Récupérer le contenu de l'éditeur Monaco
    var editorContent=activeEditorContent;
    // Récupérer le nom du fichier à partir de l'entrée de l'utilisateur
    var fileNameInput=document.getElementById("file-name");
    var fileName=fileNameInput.value || "default"; // Utiliser 'default' si le champ est vide
    // Récupérer l'extension du langage sélectionné
    var selectedLanguage=getActiveEditorLanguage();
    var extension="";

    // Définir l'extension du fichier en fonction du langage sélectionné
    if (selectedLanguage==="html") {
        extension=".html";
    }

    else if (selectedLanguage==="javascript") {
        extension=".js";
    }

    else if (selectedLanguage==="python") {
        extension=".py";
    }

    else if (selectedLanguage==="c") {
        extension=".c";
    }

    else if (selectedLanguage==="cpp") {
        extension=".cpp";
    }

    else if (selectedLanguage==="java") {
        extension=".java";
    }

    else if (selectedLanguage==="ruby") {
        extension=".rb";
    }

    else if (selectedLanguage==="php") {
        extension=".php";
    }

    else if (selectedLanguage==="swift") {
        extension=".swift";
    }

    else if (selectedLanguage==="rust") {
        extension=".rs";
    }

    else if (selectedLanguage==="go") {
        extension=".go";
    }

    else if (selectedLanguage==="typescript") {
        extension=".ts";
    }

    else if (selectedLanguage==="css") {
        extension=".css";
    }

    else if (selectedLanguage==="sass") {
        extension=".sass";
    }

    else if (selectedLanguage==="scss") {
        extension=".scss";
    }

    else if (selectedLanguage==="less") {
        extension=".less";
    }

    else if (selectedLanguage==="stylus") {
        extension=".styl";
    }

    else if (selectedLanguage==="coffee") {
        extension=".coffee";
    }

    else if (selectedLanguage==="lua") {
        extension=".lua";
    }

    else if (selectedLanguage==="perl") {
        extension=".pl";
    }

    else if (selectedLanguage==="bash") {
        extension=".sh";
    }

    else if (selectedLanguage==="r") {
        extension=".r";
    }

    else if (selectedLanguage==="sql") {
        extension=".sql";
    }

    else if (selectedLanguage==="swift") {
        extension=".swift";
    }

    else if (selectedLanguage==="vb") {
        extension=".vb";
    }

    else if (selectedLanguage==="vbscript") {
        extension=".vbs";
    }

    else if (selectedLanguage==="scala") {
        extension=".scala";
    }

    else if (selectedLanguage==="kotlin") {
        extension=".kt";
    }

    else if (selectedLanguage==="asm") {
        extension=".asm";
    }

    else if (selectedLanguage==="typescript") {
        extension=".ts";
    }

    else if (selectedLanguage==="perl") {
        extension=".pl";
    }

    else if (selectedLanguage==="powershell") {
        extension=".ps1";
    }

    else if (selectedLanguage==="haskell") {
        extension=".hs";
    }

    else if (selectedLanguage==="elixir") {
        extension=".ex";
    }

    else if (selectedLanguage==="erlang") {
        extension=".erl";
    }

    else if (selectedLanguage==="d") {
        extension=".d";
    }

    else if (selectedLanguage==="clojure") {
        extension=".clj";
    }

    else if (selectedLanguage==="f#") {
        extension=".fs";
    }

    else if (selectedLanguage==="ocaml") {
        extension=".ml";
    }

    else if (selectedLanguage==="racket") {
        extension=".rkt";
    }

    else if (selectedLanguage==="swift") {
        extension=".swift";
    }

    else if (selectedLanguage==="typescript") {
        extension=".ts";
    }

    else if (selectedLanguage==="julia") {
        extension=".jl";
    }

    else if (selectedLanguage==="nim") {
        extension=".nim";
    }

    else if (selectedLanguage==="pascal") {
        extension=".pas";
    }

    else if (selectedLanguage==="scheme") {
        extension=".scm";
    }

    else if (selectedLanguage==="verilog") {
        extension=".v";
    }

    else if (selectedLanguage==="vhdl") {
        extension=".vhd";
    }

    else if (selectedLanguage==="yaml") {
        extension=".yaml";
    }

    // Créer un objet Blob avec le contenu
    var blob=new Blob([editorContent], {
            type: "text/plain"
        }

    );
    // Créer un lien pour le téléchargement
    var a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    // Définir le nom du fichier en utilisant le nom saisi et l'extension correspondante
    var finalFileName=fileName+extension;
    a.download=finalFileName;
    // Simuler un clic sur le lien pour déclencher le téléchargement
    a.click();
}

function openFile() {
    // Créer un champ de fichier invisible
    var fileInput=document.createElement("input");
    fileInput.type="file";
    fileInput.style.display="none";

    // Lorsqu'un fichier est sélectionné, chargez son contenu dans un nouvel onglet
    fileInput.addEventListener("change", function (e) {
            var file=e.target.files[0];
            var reader=new FileReader();

            reader.onload=function (event) {
                var fileContent=event.target.result;
                var fileName=file.name; // Récupérer le nom du fichier
                // Créer un nouvel onglet et éditeur pour le fichier
                addTab(fileName); // Passer le nom du fichier à la fonction addTab
                var newEditorId='editor'+ (editorCount - 1); // Récupérer l'ID du nouvel éditeur
                editorsData[newEditorId].editor.setValue(fileContent); // Définir le contenu du nouvel éditeur
                // Mettre à jour la valeur de l'élément input avec le nom du fichier
                document.getElementById("file-name").value=fileName;
                document.title="DeskCode | "+ fileName;
                // Activer le nouvel onglet
                openEditor(newEditorId);
            }

            ;
            reader.readAsText(file);
        }

    );
    // Cliquez sur le champ de fichier pour ouvrir la boîte de dialogue de sélection de fichier
    fileInput.click();
}

function debugHtmlEditor() {
    var languageSelect=document.getElementById("language-selection");
    var selectedLanguage=languageSelect.value;
    // Récupérer l'identifiant de l'éditeur actif
    var activeEditorId=getActiveEditorId();

    // Vérifier si un éditeur est actif
    if (activeEditorId) {
        // Obtenir le contenu de l'éditeur actif
        var editorContent=editorsData[activeEditorId].editor.getValue();

        // Effectuer le débogage en fonction du langage sélectionné
        if (selectedLanguage==="html") {
            printToTerminal("[100%] : Debug en cours...");
            printToTerminal("Notice : Selected langague is HTML");
            // Créez un élément div pour afficher le contenu
            var debugContainer=document.createElement("div");
            debugContainer.innerHTML=editorContent;
            // Ouvrez une nouvelle fenêtre et affichez le contenu
            var debugWindow=window.open("",
                "",
                "width="+ screen.width + ",height="+ screen.height);
            debugWindow.document.open();
            debugWindow.document.write("<html><head><title>Debug</title></head><body>");
            debugWindow.document.write(debugContainer.innerHTML);
            debugWindow.document.write("</body></html>");
            debugWindow.document.close();
            printWarning("[warn] : Debug is now ended");
        }

        else if (selectedLanguage==="javascript") {
            // Débogage JavaScript
            // ...
        }

        else {
            printError("[erre] : Langage non pris en charge pour le débogage.");
        }
    }

    else {
        printError("[erre] : Aucun éditeur actif trouvé.");
    }
}

// Fonction pour récupérer l'identifiant de l'éditeur actif
function getActiveEditorId() {
    var editorContainers=document.getElementsByClassName('editor-container');

    for (var i=0; i < editorContainers.length; i++) {
        if (editorContainers[i].style.display !=='none') {
            return editorContainers[i].id;
        }
    }

    return null; // Aucun éditeur actif trouvé
}

setTimeout(function () {
        var loader=document.getElementById("loader");
        loader.style.display="none";
        initializeMonacoEditorWithCodeFromURL();
        hideorshowterminal();
        updateEditorHeight();
    }

    , 5000); //Laisser charger jusqu'a DOMcontent is loaded

    function applyLanguage() {
        
        // Récupérer l'éditeur actif à partir de editorsData
        const activeEditor = editorsData[activeEditorId].editor;
    
        // Vérifier si un éditeur actif a été trouvé
        if (activeEditor) {
            // Récupérer le langage sélectionné dans la liste déroulante
            var selectedLanguage = document.getElementById("language-selection").value;
            
            // Appliquer le langage sélectionné à l'éditeur actif
            monaco.editor.setModelLanguage(activeEditor.getModel(), selectedLanguage);
        } else {
            console.error("Aucun éditeur actif trouvé.");
        }
    }

function RunDebug() {
    var selectedLanguage=languageSelect.value;

    if (selectedLanguage==="HTML") {
        // Obtenir le contenu du modèle de l'éditeur Monaco
        var editorContent=monaco.editor.getModels()[0].getValue();
        // Créer un élément div pour afficher le contenu
        var printContainer=document.createElement("div");
        printContainer.innerHTML=editorContent;
        // Ajouter le contenu à la page
        document.body.appendChild(printContainer);
        // Appeler la fonction d'impression
        window.print();
        // Supprimer l'élément div après l'impression
        document.body.removeChild(printContainer);
    }
}

//-------------------------------------------------------------------------------------------------------------------------------------
// Structure pour stocker les données de chaque éditeur
var editorsData= {}

;
// Compteur pour les identifiants uniques des éditeurs
var editorCount=1;
let activeEditorContent='';

// Fonction pour vider tous les onglets sauf le premier
function clearTabs() {
    // Supprimer tous les boutons d'onglet sauf le premier
    var tabContainer=document.getElementById('tabs');

    while (tabContainer.children.length > 1) {
        tabContainer.removeChild(tabContainer.lastChild);
    }

    // Supprimer tous les conteneurs d'éditeur sauf le premier
    var editorContainer=document.getElementById('editor');

    while (editorContainer.children.length > 1) {
        editorContainer.removeChild(editorContainer.lastChild);
    }

    // Réinitialiser le compteur d'éditeurs
    editorCount=1;

    // Réinitialiser les données des éditeurs
    editorsData= {}

    ;
}

// Fonction pour ajouter un nouvel onglet et éditeur
function addTab(fileName) {
    // Créer un nouvel identifiant pour l'éditeur
    var editorId='editor'+editorCount;
    // Créer un bouton d'onglet pour le nouvel éditeur
    var tabButton=document.createElement('button');
    tabButton.textContent=fileName ? fileName: 'Nouveau code '+ editorCount; // Utiliser le nom du fichier s'il est défini, sinon une valeur par défaut

    tabButton.onclick=function() {
        openEditor(editorId);
    }

    ;
    tabButton.style.backgroundColor='#1d1d1d';
    tabButton.style.borderColor='#353535';
    tabButton.style.borderWidth='1px';
    tabButton.style.borderStyle='solid';
    tabButton.style.color='gray';
    tabButton.style.padding='8px 10px';
    tabButton.style.fontSize='16px';
    tabButton.style.cursor='pointer';
    tabButton.style.transition='background-color 0.3s ease';
    tabButton.onmouseover=function() {
        tabButton.style.backgroundColor='#ddd';
        tabButton.style.color='black';
    }
    ;
    tabButton.onmouseout=function() {
        tabButton.style.backgroundColor='#1d1d1d';
        tabButton.style.color='gray';
    }

    ;
    document.getElementById('tabs').appendChild(tabButton);
    var editorContainer=document.createElement('div');
    editorContainer.id=editorId;
    editorContainer.classList.add('editor-container');
    document.getElementById('editor').appendChild(editorContainer);

    require.config( {
            paths: {
                'vs': 'Lib/MonacoEditor/dev/vs'
            }
        }

    );
    require(['vs/editor/editor.main'], function () {
            var editor=monaco.editor.create(document.getElementById(editorId), {
                    value: '',
                    language: 'javascript',
                    automaticLayout: true,
                    theme: 'vs-dark'
                }

            );
            editorsData[editorId]= {
                editor: editor,
                content: ''
            }

            ;
            openEditor(editorId);
            editorCount++;
        }

    );
}

// Fonction pour ouvrir un éditeur
function openEditor(editorId) {
    // Cacher tous les éditeurs
    var editorContainers=document.getElementsByClassName('editor-container');

    for (var i=0; i < editorContainers.length; i++) {
        editorContainers[i].style.display='none';
    }

    // Afficher l'éditeur spécifié
    var editorContainer=document.getElementById(editorId);
    editorContainer.style.display='block';
    // Mettre à jour le contenu de l'éditeur Monaco
    var editorData=editorsData[editorId];
    activeEditorId=editorId;
    editorData.editor.setValue(editorData.content); // Restaurer le contenu depuis les données
    // Mettre à jour la hauteur de l'éditeur
    updateEditorHeight();

    // Mettre à jour la fonction de sauvegarde du contenu
    editorData.editor.onDidChangeModelContent(function(event) {
            var newContent=editorData.editor.getValue();
            updateEditorContent(editorId, newContent);
        }

    );
    updateActiveEditorContent();
}

function updateEditorContent(editorId, newContent) {
    editorsData[editorId].content=newContent;
}

function updateActiveEditorContent() {
    const activeEditor=editorsData[activeEditorId].editor;
    activeEditorContent=activeEditor.getValue();
}

// Fonction pour mettre à jour la hauteur de l'éditeur
function updateEditorHeight() {
    const topBarHeight=document.getElementById("top_bar").offsetHeight;
    const bottomBarHeight=document.getElementById("editor_bottom-bar").offsetHeight;
    const windowHeight=window.innerHeight;
    // Calculer la hauteur disponible pour l'éditeur
    let availableHeight;
    if (document.getElementById("terminaldiv").style.display === 'none') {
        availableHeight = windowHeight - topBarHeight - bottomBarHeight - 30;
    } else {
        availableHeight = windowHeight - topBarHeight - bottomBarHeight - 30 - 350;
    }
    // Mettre à jour la hauteur de tous les éditeurs
    var editorContainers=document.getElementsByClassName('editor-container');

    for (var i=0; i < editorContainers.length; i++) {
        editorContainers[i].style.height=availableHeight+"px";
    }
}

// Appel de la fonction pour mettre à jour la hauteur lors du chargement de la page
window.onload=function () {
    addTab(); // Ajouter le premier éditeur lors du chargement de la page
    setTimeout(updateEditorHeight, 500);
    // Mettre à jour la hauteur lors du redimensionnement de la fenêtre
    window.addEventListener("resize", updateEditorHeight);
}

;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var i,
tabcontent;
tabcontent=document.getElementsByClassName("tabcontent");

for (i=0; i < tabcontent.length; i++) {
    tabcontent[i].style.display="none";
}

function CloseAllTabs() {
    var i,
    tabcontent;
    tabcontent=document.getElementsByClassName("tabcontent");

    for (i=0; i < tabcontent.length; i++) {
        tabcontent[i].style.display="none";
    }
}

function openTab(tabName) {
    // Masquer tous les onglets
    var i,
    tabcontent;
    tabcontent=document.getElementsByClassName("tabcontent");

    for (i=0; i < tabcontent.length; i++) {
        tabcontent[i].style.display="none";
    }

    // Désactiver tous les boutons d'onglets
    var tabButtons=document.getElementsByClassName("tablinks");

    for (i=0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    // Afficher l'onglet sélectionné
    document.getElementById(tabName + "Tab").style.display="block";
}

function openFileExplorer() {
    document.getElementById("fileInput").click();
}

document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.key==="q") {
            document.getElementById("editor").style.display="block";
            document.getElementById("proporeteclass").style.display="block";
            document.getElementById("emailDisplay").style.display="block";
            openTab("propriete");
        }
    }

);

function InitialiseWorkspace() {
    openTab("propriete"); // J'ai supposé que vous vouliez ouvrir cet onglet par défaut
    document.getElementById("editor").style.display="block";
    document.getElementById("proporeteclass").style.display="block";
    document.getElementById("emailDisplay").style.display="block";
    monaco.editor.getModels()[0].setValue("");
}

const inputFileName=document.getElementById("file-name");
const defaultFileName="Nouveau fichier code"; // Valeur par défaut

inputFileName.addEventListener("input", function () {
        const fileNameValue=inputFileName.value.trim(); // Récupérer la valeur en enlevant les espaces

        // Vérifier si la valeur est vide ou seulement des espaces
        if (fileNameValue==="") {
            document.title="DeskCode | "+ defaultFileName; // Restaurer la valeur par défaut
        }

        else {
            document.title="DeskCode | "+ fileNameValue; // Mettre à jour avec la nouvelle valeur
        }
    }

);

// Au chargement initial de la page
window.addEventListener("DOMContentLoaded", function () {

        // Vérifier si la valeur par défaut est déjà affichée
        if (inputFileName.value.trim()==="") {
            document.title="DeskCode | "+ defaultFileName;
        }
    }

);

function insertCodeIntoEditor(code) {
    // Récupérer l'ID de l'éditeur actif
    
    // Récupérer l'éditeur actif à partir de editorsData
    var activeEditor = editorsData[activeEditorId].editor;

    // Vérifier si un éditeur actif a été trouvé
    if (activeEditor) {
        const lineCount = activeEditor.getModel().getLineCount();
        const columnCount = activeEditor.getModel().getLineContent(lineCount).length + 1;

        const textToInsert = "\n" + code;

        activeEditor.executeEdits("insertCode", [{
            range: new monaco.Range(lineCount, columnCount, lineCount, columnCount),
            text: textToInsert,
            forceMoveMarkers: true,
        }]);

        // Si vous souhaitez également faire défiler l'éditeur pour afficher le code inséré
        activeEditor.revealLine(lineCount);
    } else {
        console.error("Aucun éditeur actif trouvé.");
    }
}

// Fonction pour insérer le code dans l'éditeur Monaco
function insertCodeFromURL(code) {
    var activeEditor = editorsData[activeEditorId].editor;

    // Vérifier si un éditeur actif a été trouvé
    if (activeEditor) {
        const lineCount = activeEditor.getModel().getLineCount();
        const columnCount = activeEditor.getModel().getLineContent(lineCount).length + 1;

        const textToInsert = code;

        activeEditor.executeEdits("insertCode", [{
            range: new monaco.Range(lineCount, columnCount, lineCount, columnCount),
            text: textToInsert,
            forceMoveMarkers: true,
        }]);

        // Si vous souhaitez également faire défiler l'éditeur pour afficher le code inséré
        activeEditor.revealLine(lineCount);
    } else {
        console.error("Aucun éditeur actif trouvé.");
    }
}

// Fonction pour récupérer le paramètre "code" de l'URL
function getCodeFromURL() {
    const urlParams=new URLSearchParams(window.location.search);
    return urlParams.get("code");
}

// Fonction pour initialiser l'éditeur Monaco avec le code récupéré depuis l'URL
function initializeMonacoEditorWithCodeFromURL() {
    InitialiseWorkspace(); // initialisé le workspace
    // Récupérer le code depuis l'URL
    const code=getCodeFromURL();

    // Vérifier si un code a été passé dans l'URL
    if (code) {
        insertCodeFromURL(code); // Insérer le code récupéré dans l'éditeur Monaco
    }
}
function hideorshowterminal() {
    if (document.getElementById("terminaldiv").style.display === 'none') {
        document.getElementById("terminaldiv").style.display = 'block';
        updateEditorHeight();
    }else {
        document.getElementById("terminaldiv").style.display = 'none';
        updateEditorHeight();
    }
}