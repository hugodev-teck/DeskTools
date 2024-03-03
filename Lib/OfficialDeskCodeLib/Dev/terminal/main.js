let lang="";
const terminal = document.getElementById("terminal");
const input = document.getElementById("terminalboxtextinput");

function printToTerminal(text) {
    const line = document.createElement("div");
    line.textContent = text;
    terminal.appendChild(line);
    input.value = ""; // Efface le champ d'entrée
    scrollToBottom();
}

function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}

function printError(text) {
    const line = document.createElement("div");
    line.textContent = text;
    line.classList.add("error"); // Ajoute la classe pour la couleur d'erreur
    terminal.appendChild(line);
    input.value = ""; // Efface le champ d'entrée
    scrollToBottom();
}

function printWarning(text) {
    const line = document.createElement("div");
    line.textContent = text;
    line.classList.add("warning"); // Ajoute la classe pour la couleur d'avertissement
    terminal.appendChild(line);
    input.value = ""; // Efface le champ d'entrée
    scrollToBottom();
}
// exempel l'apelle de la fonction addLink
// const myLink = { url: "https://example.com", text: "Cliquez ici" };
// addLink(myLink, "Avant le lien ", " après le lien");
function addLink(link, beforeText, afterText) {
    const line = document.createElement("div");

    // Ajoute le texte avant le lien
    const beforeTextNode = document.createTextNode(beforeText);
    line.appendChild(beforeTextNode);

    // Crée le lien
    const linkElement = document.createElement('a');
    linkElement.href = link.url;
    linkElement.textContent = link.text;
    linkElement.target = '_blank';
    line.appendChild(linkElement);

    // Ajoute le texte après le lien
    const afterTextNode = document.createTextNode(afterText);
    line.appendChild(afterTextNode);

    // Ajoute la ligne à l'élément terminal
    terminal.appendChild(line);
}
printToTerminal("Welcome, please first enter a command in the text zone below :");
printToTerminal("Use 'Help' to show the command");
printToTerminal("Language set to [FR]\n");
lang="FR";
// Écouteur pour détecter la touche "Entrée"
input.addEventListener("keyup", function (event) {
        if (event.key==="Enter") {
            const command=input.value.trim();

            if (command !=="") {
                printToTerminal("> "+ input.value);

                if (command==="help" && lang==="FR") {
                    printToTerminal("Commande disponible :");
                    printToTerminal("---------------------");
                    printToTerminal("- help     : Affiche le contenu de l'aide");
                    printToTerminal("- run file : Initialise le fichier en cours...");
                    printToTerminal("- new      : ouvrir un nouvel onglet");
                    printToTerminal("- ctab     : fermer tout les onglet");
                    printToTerminal("- open     : ouvrir un nouveau fichier depuis le pc");
                    printToTerminal("- save     : enregister un fichier depuis bd");
                    printToTerminal("- net start: Démmare une instance local arg -blob\n");
                }
                else if (command==="help" && lang==="ANG") {
                    printToTerminal("Built-in commands :");
                    printToTerminal("-------------------");
                    printToTerminal("- help     : show the help");
                    printToTerminal("- run file : init debugger");
                    printToTerminal("- new      : Open a new tab");
                    printToTerminal("- ctab     : Close all tabs");
                    printToTerminal("- open     : Open a new file from pc");
                    printToTerminal("- save     : Save a file in the pc via db");
                    printToTerminal("- net start:start local network arg -blob\n");
                    
                }

                else if (command==="run file") {
                    printToTerminal("[100%] : Initialisation en cours");
                    printToTerminal("[100%] : Traitement du fichier");
                    printToTerminal("[100%] : Démarrage de la page Nav");
                    printToTerminal("[100%] : Set debugger");
                    debugHtmlEditor();
                    printToTerminal("[OK] : Exit code 0\n");
                }
                else if (command==="new") {
                    printToTerminal("[100%] : Ouverture d'un onglet...");
                    addTab();
                    printToTerminal("[OK] : Exit code 0\n");
                }
                else if (command==="ctab") {
                    printToTerminal("[100%] : Fermeture des onglet en cours...");
                    clearTabs();
                    printToTerminal("[OK] : Exit code 0\n");
                }
                else if (command==="open") {
                    printToTerminal("[100%] : Ouverture de la boite de dialogue");
                    openFile();
                    printToTerminal("[OK] : Exit code 0\n");
                }
                else if (command==="save") {
                    printToTerminal("[100%] : Ouverture de la boite de dialogue");
                    saveFile();
                    printToTerminal("[OK] : Exit code 0\n");
                }
                else if (command==="net start -blob"){
                    printToTerminal("[100%] : Ouverture du serveur local Blob");
                    startServerBlob();
                }
                else if (command==="olink"){
                    var link = '';
                    printToTerminal("[68%] : préparation en cours...");
                    printToTerminal("[75%] : préparation en cours...");
                    printToTerminal("[85%] : préparation en cours...");
                    printToTerminal("[88%] : préparation en cours...");
                    printToTerminal("[100%] : préparation en cours...");
                    if(link === '') {
                    printWarning("[DATA] : data miss, target site")
                    printError("[DATA] : Miss the target")
                    printToTerminal("Enter the target to contine : ")
                    }

                }
                else {
                    printError("'"+command+"' n’est pas reconnu en tant que commande interne ou externe, un programme exécutable ou un fichier de commandes. Vérifiez l'orthographe du nom. tapez 'HELP' pour plus d'aide");
                    printError(command);
                    printError("^ ~line 1 err. 404 NotFoundInSystem");
                    printError("+~~");
                    printError("    + CategoryInfo          : ObjectNotFound: (zd:"+command+") [], CommandNotFoundException");
                    printError("    + FullyQualifiedErrorId : CommandNotFoundException\n");
                    printError(" ");
                }
            }

            else {
                printToTerminal("> ");
            }
        }
    }

);

function startServerBlob() {
    // Récupérer le contenu de l'éditeur Monaco
    var editorContent=editorsData[activeEditorId].editor.getValue();

    // Créer un nouveau blob avec le contenu de l'éditeur
    var blob = new Blob([editorContent], { type: 'text/html' });

    // Créer une URL à partir du blob
    var url = URL.createObjectURL(blob);

    printWarning("[warn] : Votre serveur local Blob va démarer dans un instant...");
    const myLink = { url: url, text: "blob" };
    addLink(myLink, "Lien du serveur ", " ici\n");
    
}