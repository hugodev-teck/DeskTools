//-------------------------------------------------Taille de police-------------------------------------
    // Sélection des menus déroulants
    const fontFamilySelect = document.getElementById('font-family');
    const fontSizeSelect = document.getElementById('font-size');

    // Écouteurs d'événements pour chaque menu déroulant
    fontFamilySelect.addEventListener('change', () => {
      const selectedFont = fontFamilySelect.value;
      document.execCommand('fontName', false, selectedFont);
    });
    fontSizeSelect.addEventListener('change', () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.fontSize = fontSizeSelect.value + 'px'; // Ajoutez 'px' à la valeur de la taille de police
        range.surroundContents(span);
    }
});
//--------------------------------------------------------preloadtitle---------------------------------------------
function insertStyledText(name) {
  const editor = document.getElementById('editor');
  const styledText = document.createElement('span');
  if(name === 'titre1') {
    styledText.textContent = '[Votre titre ici]';
  // Appliquer le style directement depuis JavaScript
  styledText.style.color = 'rgb(18, 18, 131)';
  styledText.style.fontFamily = 'Arial';
  styledText.style.fontSize = '35px';
  styledText.style.fontStyle = 'italic';
  // Insérer le texte stylisé dans l'éditeur
  editor.appendChild(styledText);
  }
  if(name === 'titre2') {
    styledText.textContent = '[Votre titre ici]';
  // Appliquer le style directement depuis JavaScript
  styledText.style.color = 'rgb(252, 193, 0)';
  styledText.style.fontFamily = 'sans-serif';
  styledText.style.fontSize = '35px';
  styledText.style.fontStyle = 'italic';
  // Insérer le texte stylisé dans l'éditeur
  editor.appendChild(styledText);
  }
  if(name === 'titre3') {
    styledText.textContent = '[Votre titre ici]';
  // Appliquer le style directement depuis JavaScript
  styledText.style.color = 'rgb(61, 61, 61)';
  styledText.style.fontFamily = 'sans-serif';
  styledText.style.fontSize = '30px';
  styledText.style.fontStyle = 'italic';
  // Insérer le texte stylisé dans l'éditeur
  editor.appendChild(styledText);
  }
  if(name === 'soustitre') {
    styledText.textContent = '[Votre texte ici]';
  // Appliquer le style directement depuis JavaScript
  styledText.style.color = 'rgb(48, 48, 48)';
  styledText.style.fontFamily = 'Arial';
  styledText.style.fontSize = '23px';
  // Insérer le texte stylisé dans l'éditeur
  editor.appendChild(styledText);
  }
  if(name === 'citation') {
    styledText.textContent = '"Votre citation ici"';
  // Appliquer le style directement depuis JavaScript
  styledText.style.color = 'gray';
  styledText.style.fontFamily = 'Univers';
  styledText.style.fontSize = '14px';
  styledText.style.fontStyle = 'italic';
  // Insérer le texte stylisé dans l'éditeur
  editor.appendChild(styledText);
  }
  if(name === 'si') {
    styledText.textContent = '[Votre texte ici]';
  // Appliquer le style directement depuis JavaScript
  styledText.style.color = 'black';
  styledText.style.fontFamily = 'Univers';
  styledText.style.fontSize = '12px';
  // Insérer le texte stylisé dans l'éditeur
  editor.appendChild(styledText);
  }
}
//---------------------------------------------------ADVANCETEXTOPTION-----------------------------------------------------------
    // Sélection des boutons
    const alignLeftButton = document.querySelector('.class1-button:nth-of-type(1)');
const alignCenterButton = document.querySelector('.class1-button:nth-of-type(2)');
const alignRightButton = document.querySelector('.class1-button:nth-of-type(3)');
const justifyButton = document.querySelector('.class1-button:nth-of-type(4)'); // Nouveau bouton pour le texte justifié
const superscriptButton = document.querySelector('.class1-button:nth-of-type(5)');
const subscriptButton = document.querySelector('.class1-button:nth-of-type(6)');
const unorderedListButton = document.getElementById('unordered-list-button');
const orderedListButton = document.getElementById('ordered-list-button');

// Fonction pour récupérer la sélection de texte
function getSelectedText() {
  return window.getSelection().toString();
}

// Écouteurs d'événements pour chaque bouton
alignLeftButton.addEventListener('click', () => {
  document.execCommand('justifyLeft', false, null);
});

alignCenterButton.addEventListener('click', () => {
  document.execCommand('justifyCenter', false, null);
});

alignRightButton.addEventListener('click', () => {
  document.execCommand('justifyRight', false, null);
});

justifyButton.addEventListener('click', () => {
  const selectedText = getSelectedText();
  if (selectedText) {
    document.execCommand('justifyFull', false, null);
  }
});

superscriptButton.addEventListener('click', () => {
  const selectedText = getSelectedText();
  if (selectedText) {
    document.execCommand('superscript', false, null);
  }
});

subscriptButton.addEventListener('click', () => {
  const selectedText = getSelectedText();
  if (selectedText) {
    document.execCommand('subscript', false, null);
  }
});

unorderedListButton.addEventListener('click', () => {
  document.execCommand('insertUnorderedList', false, null);
});

orderedListButton.addEventListener('click', () => {
  document.execCommand('insertOrderedList', false, null);
});
    //-------------------------------------------------COPY/CUT/PAST-----------------------------------------------------------------
    // Sélection des boutons de la classe 2
    const copyButton = document.querySelector('.class2-button:nth-of-type(1)');
    const pasteButton = document.querySelector('.class2-button:nth-of-type(2)');
    const cutButton = document.querySelector('.class2-button:nth-of-type(3)');

    // Écouteurs d'événements pour chaque bouton
    copyButton.addEventListener('click', () => {
    const selectedText = getSelectedText();
    if (selectedText) {
      document.execCommand('copy');
    }
    });

    pasteButton.addEventListener('click', () => {
      document.execCommand('paste');
    });

    cutButton.addEventListener('click', () => {
      const selectedText = getSelectedText();
      if (selectedText) {
        document.execCommand('cut');
      }
    });
    // Pour le menu deroulant 
  document.getElementById('menucut').addEventListener('click', function() {
    const selectedText = getSelectedText();
      if (selectedText) {
        document.execCommand('cut');
      }
  });

  document.getElementById('menucopy').addEventListener('click', function() {
    const selectedText = getSelectedText();
    if (selectedText) {
      document.execCommand('copy');
    }
  });

  document.getElementById('menupast').addEventListener('click', function() {
    document.execCommand('paste');
  });
    //-----------------------------------------------BOLT/ITALIC/UNDERLINE----------------------------------------------------------
    // Sélection des boutons de la classe2-button-solo
    const boldButton = document.getElementById('apply-stand');
    const italicButton = document.querySelector('.class2-button-solo:nth-of-type(2)');
    const underlineButton = document.querySelector('.class2-button-solo:nth-of-type(3)');

    // Fonction pour vérifier si le texte est mis en forme
    function isApplied(command) {
      return document.queryCommandState(command);
    }

    // Écouteurs d'événements pour chaque bouton
    boldButton.addEventListener('click', () => {
    const selectedText = getSelectedText();
      if (selectedText) {
        document.execCommand('bold');
      }
    });

    italicButton.addEventListener('click', () => {
      const selectedText = getSelectedText();
      if (selectedText) {
        document.execCommand('italic');
      }
    });

    underlineButton.addEventListener('click', () => {
      const selectedText = getSelectedText();
      if (selectedText) {
        document.execCommand('underline');
      }
    });
