//------------------------------------------------------IMPRESSION-----------------------------------------------------------
const printButton = document.getElementById('apply-stand-new-line');

// Ajoutez un écouteur d'événements au bouton d'impression
function printContent() {
    const printContent = document.getElementById('editor').innerHTML;
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.open();
    printWindow.document.write(`
        <html>
        <head>
            <title>Impression</title>
            <style>
              table {
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            overflow: hidden; /* Affiche les barres de défilement si nécessaire */
        }
        </style>
        </head>
        <body>
            ${printContent}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
}
//---------------------------------------------------------------------ZOOM----------------------------------------
// Ajoute un écouteur d'événements pour la molette de la souris
document.addEventListener('wheel', function(event) {
  // Vérifie si la touche Ctrl est enfoncée
  if (event.ctrlKey === true) {
    const zoomBar = document.getElementById('zoomBar');
    const valeurZoom = document.getElementById('valeur-zoom');
    // Empêche le comportement par défaut du zoom du navigateur
    event.preventDefault();

    // Récupère l'élément que vous souhaitez zoomer (dans ce cas, la zone de texte)
    var editor = document.getElementById('editor');

    // Récupère le facteur de zoom actuel
    var currentZoom = parseFloat(editor.style.zoom) || 1;

    // Ajuste le facteur de zoom en fonction de la direction de la molette
    var delta = event.deltaY > 0 ? -0.1 : 0.1; // Sens de défilement de la molette
    var newZoom = currentZoom + delta;

    // Limite le facteur de zoom entre 0.5 et 3 (à ajuster selon vos besoins)
    newZoom = Math.min(Math.max(0.5, newZoom), 2);

    valeurZoom.textContent = Math.floor(newZoom * 100) + '%';
    zoomBar.value = newZoom*100 ;

    // Applique le nouveau facteur de zoom
    editor.style.zoom = newZoom;
  }
}, { passive: false });

document.addEventListener('DOMContentLoaded', function() {
  var editor = document.getElementById('editor');
  var zoomBar = document.getElementById('zoomBar');
  var valeurZoom = document.getElementById('valeur-zoom');

  // Ajoute un écouteur d'événements pour la modification de la barre de zoom
zoomBar.addEventListener('input', function() {
  // Récupère la valeur de la barre de zoom
  var valeur = zoomBar.value;

  // Met à jour l'affichage de la valeur de zoom
  valeurZoom.textContent = valeur + '%';

  // Applique le zoom à l'élément que vous souhaitez zoomer (dans ce cas, la zone de texte)
  editor.style.zoom = valeur / 100;
});
});
