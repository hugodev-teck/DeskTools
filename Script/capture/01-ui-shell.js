    window.addEventListener('DOMContentLoaded', function() {
  // Sélectionnez les éléments par leur ID
  var topBar = document.getElementById('top-bar');
  var middleBar = document.getElementById('middle-bar');
  var content = document.getElementById('content');
  
  // Calcul de la hauteur du contenu en pourcentage
  var topBarHeight = topBar.offsetHeight; // Hauteur de #topbar
  var middleBarHeight = middleBar.offsetHeight; // Hauteur de #middle-bar
  var windowHeight = window.innerHeight; // Hauteur de la fenêtre du navigateur
  
  var contentHeightPercentage = 100 - (topBarHeight / windowHeight * 100) - (middleBarHeight / windowHeight * 100); // Calcul de la hauteur de #content en pourcentage
  
  // Définir la hauteur de #content en pourcentage
  content.style.height = contentHeightPercentage + '%';
});
//--------------------------NEW-----------------------------
function openPrintPreviewModal() {
       // Afficher la fenêtre modale
    document.getElementById('imprprev').style.display = 'block';
}

// Fonction pour fermer le modal d'aperçu avant impression
function closePrintPreviewModal() {
  document.getElementById("imprprev").style.display = "none";
}

// Fonction pour afficher le contenu dans l'aperçu avant impression
function displayContentForPrintPreview() {
  // Insérez ici le code pour récupérer et afficher le contenu à imprimer dans l'aperçu
}

// Fonction appelée lorsque le bouton "Aperçu avant impression" est cliqué
function handlePrintPreviewButtonClick() {
  displayContentForPrintPreview(); // Afficher le contenu dans l'aperçu avant impression
  openPrintPreviewModal(); // Ouvrir le modal d'aperçu avant impression
}
    //------------------------------------------------------Gestion menu---------------------------------------------------------
    const menu = document.getElementById('menu');
const menudev = document.getElementById('menudev');

menudev.addEventListener('click', (event) => {
    event.stopPropagation(); // Arrête la propagation de l'événement pour éviter la fermeture immédiate du menu
    toggleMenu(); // Afficher ou masquer le menu
});

// Écouter les clics en dehors du menu pour le masquer
document.addEventListener('click', (event) => {
    const isClickInsideMenu = menu.contains(event.target);
    if (!isClickInsideMenu) {
        menu.style.left = "-100%"; // Masquer le menu si le clic est en dehors du menu
    }
});

function toggleMenu() {
    // Si le menu est actuellement affiché, masquez-le. Sinon, affichez-le.
    if (menu.style.left === "0px" || menu.style.left === "") {
        menu.style.left = "-100%"; // Masquer le menu
    } else {
        menu.style.left = "0"; // Afficher le menu
    }
}
//---------------------------------------------Gestion du loader------------------------------------------------------
setTimeout(function() {
        var loader = document.getElementById('loader');
        loader.style.display = 'none';
        init();
        }, 5846);
//----------------------------------------------Gestion du modal pour les parametre------------------------------------
// Fonction pour ouvrir un onglet spécifique
function openTab(event, tabName) {
  // Récupère tous les éléments avec la classe "tabcontent" et les masque
  const tabcontent = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  // Récupère tous les éléments avec la classe "tablinks" et supprime la classe "active"
  const tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove('active');
  }

  // Affiche l'onglet sélectionné et ajoute la classe "active" au bouton de l'onglet sélectionné
  document.getElementById(tabName).style.display = 'block';
  event.currentTarget.classList.add('active');
}

// Événement pour ouvrir la fenêtre modale
document.getElementById('openModalBtn').addEventListener('click', () => {
  document.getElementById('myModal').style.display = 'block';
});

// Événement pour ouvrir la fenêtre modale
document.getElementById('openModalinster').addEventListener('click', () => {
  document.getElementById('myModal').style.display = 'block';
});

document.getElementById('openModalpara').addEventListener('click', () => {
  document.getElementById('myModal').style.display = 'block';
});

// Événement pour fermer la fenêtre modale
document.querySelector('.closebtn').addEventListener('click', () => {
  document.getElementById('myModal').style.display = 'none';
});

// Événement pour fermer la fenêtre modale en cliquant en dehors de celle-ci
window.addEventListener('click', (event) => {
  if (event.target === document.getElementById('myModal')) {
    document.getElementById('myModal').style.display = 'none';
  }
});
  //-----------------------------------------------------------------------Custom menu-----------------------------------------------------------
  // Prevent default context menu
  document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    // Show the custom context menu
    var customMenu = document.getElementById('custom-menu');
    customMenu.style.display = 'block';
    customMenu.style.left = event.pageX + 'px';
    customMenu.style.top = event.pageY + 'px';
  });

  // Hide the custom context menu when clicking outside
  document.addEventListener('click', function(event) {
    var customMenu = document.getElementById('custom-menu');
    customMenu.style.display = 'none';
  });
