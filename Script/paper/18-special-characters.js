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

