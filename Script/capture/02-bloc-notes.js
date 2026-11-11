//----------------------------------------------bloc-------------------------
// Initialiser les données du bloc-notes
let bloc = JSON.parse(localStorage.getItem('bloc')) || {
    feuilles: [],
    activeFeuille: null
};

// Sélection des éléments HTML
const allBlocText = document.getElementById('all-bloc-text');
const titleOfText = document.getElementById('title-of-text');
const dateTheDay = document.getElementById('date-the-day');
const editor = document.getElementById('editor');
const saveBlocBtn = document.getElementById('save');

function deleteEntireBloc() {
    // Demande de confirmation pour la suppression complète
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer toutes les feuilles ? Cette action est irréversible.");
    
    if (confirmation) {
        // Réinitialise le bloc
        bloc = {
            feuilles: [],
            activeFeuille: null
        };
        
        // Supprime le bloc du localStorage
        localStorage.removeItem('bloc');
        
        // Mettre à jour l'affichage
        renderFeuillesList();
        
        // Efface l'éditeur
        titleOfText.value = '';  // Efface le titre
        editor.innerHTML = '';  // Efface le contenu de l'éditeur
    }
}

function deleteCurrentFeuille() {
    if (bloc.activeFeuille !== null) {
        // Demande de confirmation pour la suppression
        const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette feuille ?");
        
        if (confirmation) {
            // Supprime la feuille active
            bloc.feuilles.splice(bloc.activeFeuille, 1);
            
            // Remet l'activeFeuille à null ou à une autre feuille si nécessaire
            bloc.activeFeuille = bloc.feuilles.length > 0 ? 0 : null;

            // Sauvegarder les changements
            saveBlocToStorage();
            
            // Mettre à jour la liste des feuilles affichées
            renderFeuillesList();
            
            // Effacer l'éditeur si nécessaire
            if (bloc.activeFeuille === null) {
                titleOfText.value = '';  // Efface le titre
                editor.innerHTML = '';  // Efface le contenu de l'éditeur
            } else {
                // Si une autre feuille est disponible, la charger dans l'éditeur
                loadFeuille(bloc.activeFeuille);
            }
        }
    } else {
        alert("Aucune feuille active à supprimer.");
    }
}

// Générer automatiquement la date
function getCurrentDate() {
    const today = new Date();
    
    // Tableau des jours de la semaine
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    
    // Tableau des mois
    const monthsOfYear = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

    // Récupérer le jour de la semaine, le jour du mois, le mois et l'année
    const dayName = daysOfWeek[today.getDay()]; // Récupère le nom du jour de la semaine
    const dayNumber = today.getDate(); // Récupère le numéro du jour dans le mois
    const monthName = monthsOfYear[today.getMonth()]; // Récupère le nom du mois
    const year = today.getFullYear(); // Récupère l'année
    console.log(`${dayName} ${dayNumber} ${monthName} ${year}`)
    // Retourne la date formatée
    return `${dayName} ${dayNumber} ${monthName} ${year}`;
}


// Sauvegarder l'état du bloc dans le localStorage
function saveBlocToStorage() {
    localStorage.setItem('bloc', JSON.stringify(bloc));
}

// Afficher toutes les feuilles dans la liste
function renderFeuillesList() {
    allBlocText.innerHTML = ''; // Clear list
    bloc.feuilles.forEach((feuille, index) => {
        const feuilleDiv = document.createElement('div');
        feuilleDiv.classList.add('feuille');
        feuilleDiv.innerText = feuille.title;
        feuilleDiv.addEventListener('click', () => {
            selectFeuille(index);
        });
        allBlocText.appendChild(feuilleDiv);
    });
    // Créer un bouton
        const addButton = document.createElement('button');

        // Ajouter du texte au bouton
        addButton.textContent = 'Ajouter une nouvelle feuille';

        // Définir un ID pour le bouton
        addButton.id = 'add-new-bloc';

        const buttonStyle = {
          padding: '10px',
          marginBottom: '8px',
          backgroundColor: '#ffffff',
          color: 'black',
          border: 'none',
          borderRadius: '10px',
          margin: '10px 10px 10px 10px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        };

        Object.assign(addButton.style, buttonStyle); // Appliquer le style

        // Ajouter un gestionnaire d'événement pour le clic
        addButton.addEventListener('click', () => {
            // Code à exécuter lors du clic (par exemple, ajouter une nouvelle feuille)
            bloc.feuilles.push({ title: 'Nouvelle Feuille', date: getCurrentDate(), content: '' });
            bloc.activeFeuille = bloc.feuilles.length - 1;  // Rendre active la nouvelle feuille
            saveBlocToStorage();  // Sauvegarder dans le localStorage
            renderFeuillesList();
        });

        // Ajouter le bouton dans un conteneur (par exemple dans le body ou un div spécifique)
        allBlocText.appendChild(addButton);
}

// Sélectionner une feuille à afficher
function selectFeuille(index) {
    const feuille = bloc.feuilles[index];
    bloc.activeFeuille = index;
    titleOfText.value = feuille.title;
    dateTheDay.value = feuille.date;
    editor.innerHTML = feuille.content;
    saveBlocToStorage(); // Sauvegarder l'état
}

// Sauvegarde automatique lorsque l'utilisateur édite le contenu
editor.addEventListener('input', () => {
    if (bloc.activeFeuille !== null) {
        bloc.feuilles[bloc.activeFeuille].content = editor.innerHTML;
        saveBlocToStorage(); // Sauvegarder à chaque changement
    }
});

titleOfText.addEventListener('input', () => {
    if (bloc.activeFeuille === null) {
        // Si aucune feuille n'est active, créer une nouvelle feuille
        const nouvelleFeuille = {
            title: titleOfText.value,
            content: '' // Contenu par défaut vide pour la nouvelle feuille
        };

        // Ajouter cette nouvelle feuille au tableau des feuilles
        bloc.feuilles.push(nouvelleFeuille);

        // Mettre cette nouvelle feuille comme active
        bloc.activeFeuille = bloc.feuilles.length - 1;
    } else {
        // Si une feuille est déjà active, on met juste à jour son titre
        bloc.feuilles[bloc.activeFeuille].title = titleOfText.value;
    }

    // Mettre à jour la liste des feuilles
    renderFeuillesList();

    // Sauvegarder dans le localStorage
    saveBlocToStorage();
});

// Sauvegarder tout le bloc sous forme de fichier JSON
saveBlocBtn.addEventListener('click', async () => {
    const { metadata: previousMetadata, ...documentContent } = bloc;
    let profileMetadata;
    try {
        profileMetadata = await getPrismDocumentMetadata(JSON.stringify(documentContent));
    } catch (error) {
        console.error("Impossible de préparer les métadonnées du document.", error);
        alert(error.message || "Impossible de préparer les métadonnées du document.");
        return;
    }

    const blocData = JSON.stringify({
        ...documentContent,
        metadata: { ...(previousMetadata || {}), ...profileMetadata }
    }, null, 2);
    const blob = new Blob([blocData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'votre-bloc-notes.podb';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
});

// Charger les données initiales lors du chargement de la page
function init() {
    renderFeuillesList();
    if (bloc.feuilles.length > 0) {
        selectFeuille(0); // Sélectionner la première feuille
    }
}

// Sélection des éléments HTML
const openBlocBtn = document.getElementById('open');

// Fonction pour ouvrir le fichier explorateur et charger un fichier JSON
openBlocBtn.addEventListener('click', () => {
    // Crée un input type="file" programmatique pour ne pas l'afficher à l'utilisateur
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.podb'; // Accepte uniquement les fichiers JSON
    fileInput.style.display = 'none'; // On ne l'affiche pas

    // Déclencher l'ouverture du dialogue de fichier
    fileInput.click();

    // Lorsqu'un fichier est sélectionné
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedBloc = JSON.parse(e.target.result);
                    bloc = importedBloc;  // Charger le contenu du bloc
                    saveBlocToStorage();  // Sauvegarder dans le localStorage
                    renderFeuillesList(); // Mettre à jour la liste des feuilles
                    if (bloc.feuilles.length > 0) {
                        selectFeuille(0);  // Afficher la première feuille
                    }
                    alert('Bloc ouvert avec succès !');
                } catch (error) {
                    alert('Erreur lors de l\'ouverture du fichier : format non valide.');
                }
            };
            reader.readAsText(file);  // Lire le contenu du fichier en tant que texte
        }
    });
});
