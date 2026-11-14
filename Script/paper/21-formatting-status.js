window.formatText = function(command) {
    event.preventDefault(); 

    document.execCommand(command, false, null);
    
    const activePage = document.activeElement.closest('.page') || window.activePage || document.querySelector('.page');
    if (activePage && typeof rebalancePages === 'function') {
        setTimeout(() => rebalancePages(activePage), 50);
    }
};

window.toggleHighlight = function(e) {
    if (e) e.preventDefault();
    
    let currentColor = document.queryCommandValue('backColor');
    
    const isYellow = (currentColor === 'rgb(255, 255, 0)' || currentColor === 'yellow' || currentColor === '#ffff00');

    if (isYellow) {
        document.execCommand('hiliteColor', false, 'transparent'); // Pour Chrome/Safari
        document.execCommand('backColor', false, 'transparent');   // Pour Firefox
    } else {
        document.execCommand('hiliteColor', false, 'yellow'); // Pour Chrome/Safari
        document.execCommand('backColor', false, 'yellow');   // Pour Firefox
    }
};

function toggleCase() {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return; 

    const text = selection.toString();
    
    const newText = (text === text.toUpperCase()) ? text.toLowerCase() : text.toUpperCase();
    
    document.execCommand('insertText', false, newText);
};

function setPaperColor(bgColor, textColor) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.backgroundColor = bgColor;
        page.style.color = textColor;
    });
};

function updateStatusBar() {
    const pages = document.querySelectorAll('.page');
    if (pages.length === 0) return;

    let fullText = "";
    pages.forEach(page => {
        fullText += page.innerText + " ";
    });
    
    const words = fullText.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    const wordDisplay = wordCount <= 1 ? `${wordCount} mot` : `${wordCount} mots`;
    document.getElementById('word-count-display').textContent = wordDisplay;

    const totalPages = pages.length;
    let currentPageIndex = 0;

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        let node = selection.anchorNode;
        if (node) {
            const activePage = node.nodeType === 3 ? node.parentNode.closest('.page') : node.closest('.page');
            if (activePage) {
                currentPageIndex = Array.from(pages).indexOf(activePage);
            }
        }
    }

    document.getElementById('page-count-display').textContent = `Page ${currentPageIndex + 1} / ${totalPages}`;
};

function triggerIfPage(event) {
    if (!event.target.closest('.page')) return;
    
    updateStatusBar();
}

