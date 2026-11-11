//---------------------------------------------------------Image-----------------------------------------------
// Sélectionnez la zone de texte éditable
const imageInput = document.getElementById('image-input');

// Ajoutez un écouteur d'événements pour détecter la sélection d'un fichier image
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0]; // Obtenez le fichier image sélectionné
    const reader = new FileReader(); // Créez un objet FileReader pour lire le contenu du fichier

    reader.onload = function(event) {
        const imageUrl = event.target.result; // Obtenez l'URL de l'image chargée

        // Insérez l'image dans l'éditeur à l'emplacement du curseur
        const imageHtml = `<img src="${imageUrl}" alt="Image" class="inserted-image">`;
        editor.focus(); // Assurez-vous que l'éditeur est sélectionné
        document.execCommand('insertHTML', false, imageHtml); // Insérez l'image dans l'éditeur

        // Sélectionner toutes les images insérées dans l'éditeur
        const insertedImages = editor.querySelectorAll('.inserted-image');
        insertedImages.forEach(img => {
            let isResizing = false;
            let startX, startY, startWidth, startHeight;

            // Style de l'image pour empêcher qu'elle ne sorte de l'éditeur
            img.style.position = 'relative'; // Position relative pour rester dans l'éditeur
            img.style.maxWidth = '100%'; // Empêcher l'image d'excéder la largeur de l'éditeur
            img.style.height = 'auto'; // Garder le ratio d'aspect
            img.style.cursor = 'move'; // Curseur en forme de main pour le déplacement

            // Redimensionnement de l'image
            img.addEventListener('mousedown', (event) => {
                if (event.target.classList.contains('resizer')) {
                    isResizing = true;
                    startX = event.clientX;
                    startY = event.clientY;
                    startWidth = img.clientWidth;
                    startHeight = img.clientHeight;
                }
            });

            img.addEventListener('mousemove', (event) => {
                if (isResizing) {
                    const newWidth = startWidth + (event.clientX - startX);
                    const newHeight = startHeight + (event.clientY - startY);
                    img.style.width = `${newWidth}px`;
                    img.style.height = `${newHeight}px`;
                }
            });

            img.addEventListener('mouseup', () => {
                isResizing = false;
            });

            img.addEventListener('mouseleave', () => {
                isResizing = false;
            });

            // Empêcher l'image de sortir de l'éditeur en lui ajoutant des limites
            img.addEventListener('dragstart', (event) => {
                event.preventDefault(); // Empêche le glisser-déposer par défaut
            });

            img.addEventListener('contextmenu', (event) => {
                event.preventDefault(); // Empêche le clic droit sur l'image
            });
        });
    };

    reader.readAsDataURL(file); // Lire le contenu du fichier sous forme d'URL de données
});

