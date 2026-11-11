window.latexHideTimeout = null;

window.showLatexOverlay = function(wrapper, id) {
    if (window.latexHideTimeout) {
        clearTimeout(window.latexHideTimeout);
    }

    let overlay = document.getElementById('global-latex-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'global-latex-overlay';
        overlay.style.cssText = "position: fixed; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(2px); display: flex; justify-content: center; align-items: center; gap: 15px; z-index: 100000; border-radius: 6px;";
        overlay.innerHTML = `
            <button class="dw-chart-btn dw-btn-edit" id="latex-overlay-edit">Modifier</button>
            <button class="dw-chart-btn dw-btn-delete" id="latex-overlay-delete">Supprimer</button>
        `;
        document.body.appendChild(overlay);

        overlay.addEventListener('mouseenter', () => {
            if (window.latexHideTimeout) clearTimeout(window.latexHideTimeout);
        });
        overlay.addEventListener('mouseleave', () => {
            hideLatexOverlay();
        });
    }

    document.getElementById('latex-overlay-edit').onclick = () => openLatexEditor(id);
    document.getElementById('latex-overlay-delete').onclick = () => deleteLatex(id);

    const rect = wrapper.getBoundingClientRect();
    overlay.style.top = rect.top + 'px';
    overlay.style.left = rect.left + 'px';
    overlay.style.width = rect.width + 'px';
    overlay.style.height = rect.height + 'px';
    overlay.style.display = 'flex';
};

window.hideLatexOverlay = function() {
    if (window.latexHideTimeout) clearTimeout(window.latexHideTimeout);
    
    window.latexHideTimeout = setTimeout(() => {
        const overlay = document.getElementById('global-latex-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }, 150);
};

window.addEventListener('scroll', () => {
    const overlay = document.getElementById('global-latex-overlay');
    if (overlay && overlay.style.display === 'flex') {
        overlay.style.display = 'none';
    }
}, true);

window.addEventListener('resize', () => {
    const overlay = document.getElementById('global-latex-overlay');
    if (overlay) overlay.style.display = 'none';
});

document.addEventListener('input', () => {
    const overlay = document.getElementById('global-latex-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
});

window.insertLatex = function(latexString, offset = 0) {
    const input = document.getElementById('latex-input');
    const startPos = input.selectionStart;
    const endPos = input.selectionEnd;
    const text = input.value;
    
    input.value = text.substring(0, startPos) + latexString + text.substring(endPos);
    
    const newPos = startPos + latexString.length - offset;
    input.selectionStart = newPos;
    input.selectionEnd = newPos;
    
    input.focus(); 
    previewLatex(); 
};

window.handleLatexPreset = function(selectElement) {
    const val = selectElement.value;
    if (!val) return;
    
    let latexText = val;
    let offset = 0;
    
    if (val.includes('|')) {
        const parts = val.split('|');
        latexText = parts[0];
        offset = parseInt(parts[1], 10);
    }
    
    insertLatex(latexText, offset);
    
    selectElement.value = "";
};

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
        const activePage = document.activeElement.closest('.page');
        if (activePage) {
            e.preventDefault();
            
            const container = document.getElementById('pages-container');
            if (!container) return;

            const selection = window.getSelection();
            const range = document.createRange();

            range.selectNodeContents(container);
            
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
});

