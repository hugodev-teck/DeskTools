    //-------------------------------------------------------------------------charspe-----------------------------------------------------------
const specialChars = [
    '€', '£', '¥', '©', '®', '™', '°', '•',
    '±', '≠', '≤', '≥', '÷', '×', '∞', 'µ',
    'α', 'β', 'π', 'Ω', '∑', '∆', '√', '∫',
    '✓', '✗', '★', '♥', '♦', '♣', '♠', '♪',
    '←', '↑', '→', '↓', '↔', '⇒', '⇔', '½',
    
    '😀', '😂', '🥰', '😎', '🤔', '😭', '😡', '😱',
    '👍', '👎', '👏', '🙏', '🤝', '✌️', '💪', '👀',
    '📅', '📁', '✉️', '📞', '📌', '📎', '🔒', '🔑',
    '✅', '❌', '⚠️', '⛔', '💡', '🔥', '✨', '🚩'
];

window.toggleSpecialCharacters = function() {
    const modal = document.getElementById('special-char-modal');
    const grid = document.getElementById('char-grid');
    
    if (modal && grid) {
        if (grid.innerHTML.trim() === '') {
            specialChars.forEach(char => {
                const btn = document.createElement('button');
                btn.className = 'dw-char-btn';
                btn.innerText = char;
                btn.onclick = () => insertSpecialChar(char);
                grid.appendChild(btn);
            });
        }
        
        modal.style.display = 'block';
    }
};

window.insertSpecialChar = function(char) {
    if (typeof insertAtCursorHTML === 'function') {
        insertAtCursorHTML(char);
    } else {
        document.execCommand('insertText', false, char);
    }
    
    document.getElementById('special-char-modal').style.display = 'none';
};
// Sélection de la div contenant les caractères spéciaux
const specialCharactersContainer = document.getElementById('special-characters-container');

// Sélection de tous les boutons de caractères spéciaux
const specialCharacterButtons = document.querySelectorAll('.special-character');

// Ajout d'un gestionnaire d'événements pour chaque bouton de caractères spéciaux
specialCharacterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Récupérer le caractère spécial associé à ce bouton
        const specialCharacter = button.textContent;

        // Insérer le caractère spécial dans l'éditeur de texte
        const editor = document.getElementById('editor');
        editor.focus();
        document.execCommand('insertText', false, specialCharacter);
    });
});

