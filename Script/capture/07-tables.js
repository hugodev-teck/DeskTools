//-----------------------------------------------Tableau----------------------------------------------
// Sélectionnez le bouton d'insertion de tableau
const insertTableButton = document.getElementById('insert-table-btn');

// Ajoutez un écouteur d'événements pour l'insertion de tableau
insertTableButton.addEventListener('click', () => {
    // Récupérez le nombre de lignes et de colonnes à partir des champs d'entrée
    const numRows = parseInt(document.getElementById('num-rows').value);
    const numCols = parseInt(document.getElementById('num-cols').value);

    // Générez le code HTML pour le tableau en fonction du nombre de lignes et de colonnes
    let tableHtml = '<table border="1">';
    for (let i = 0; i < numRows; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < numCols; j++) {
            tableHtml += '<td contenteditable="true" style="width: 100px;"></td>'; // Vous pouvez ajuster la largeur selon vos besoins
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    // Insérez le tableau dans l'éditeur
    document.getElementById('editor').insertAdjacentHTML('beforeend', tableHtml);
});
