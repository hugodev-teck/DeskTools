let savedLatexRange = null;

window.openLatexEditor = function(id = null) {
    const modal = document.getElementById('modal-latex-edit');
    const input = document.getElementById('latex-input');
    const preview = document.getElementById('latex-preview');
    const idField = document.getElementById('current-latex-id');
    const alignSelect = document.getElementById('latex-align');

    // Mémorise la position exacte du curseur dans la page au moment d'ouvrir
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !id) {
        savedLatexRange = sel.getRangeAt(0);
    } else if (!id) {
        savedLatexRange = null;
    }

    if (id) {
        // Mode Modification
        const container = document.getElementById(id);
        input.value = container.getAttribute('data-latex-raw').replace(/\\n/g, '\n');
        idField.value = id;
        alignSelect.value = container.getAttribute('data-latex-align') || 'center';
    } else {
        // Mode Création
        input.value = "";
        idField.value = "";
        alignSelect.value = 'center';
    }
    
    preview.innerHTML = "";
    previewLatex(); 
    modal.style.display = 'block';
};

window.previewLatex = function() {
    const rawInput = document.getElementById('latex-input').value;
    const preview = document.getElementById('latex-preview');
    const alignVal = document.getElementById('latex-align').value;
    const processedLatex = rawInput.replace(/\n/g, ' \\\\ ');

    preview.style.textAlign = alignVal;

    try {
        katex.render(processedLatex, preview, { throwOnError: false, displayMode: true });
    } catch (e) {
        preview.innerHTML = "<span style='color:red; font-size:12px;'>Erreur de syntaxe LaTeX</span>";
    }
};

window.saveLatexFormula = function() {
    const rawLatex = document.getElementById('latex-input').value;
    let elementId = document.getElementById('current-latex-id').value;
    const alignVal = document.getElementById('latex-align').value;

    if (!rawLatex.trim()) return;

    if (!elementId) {
        elementId = 'latex-' + Date.now();
        const html = `
            <div class="dw-html-chart dw-latex-wrapper" id="${elementId}" data-latex-raw="" data-latex-align="${alignVal}" contenteditable="false" style="position: relative; width: 100%; max-width: 100%; height: auto; min-height: 50px; text-align: ${alignVal}; background: transparent; border: none; box-shadow: none; padding: 10px 0; margin: 10px 0;" onmouseenter="showLatexOverlay(this, '${elementId}')" onmouseleave="hideLatexOverlay()">
                <div class="latex-render-zone" style="font-size: 18px; width: 100%;"></div>
            </div>&nbsp;
        `;
        
        // On utilise la sélection mémorisée à l'ouverture de la modale
        if (savedLatexRange) {
            const page = savedLatexRange.startContainer.nodeType === 3 ? savedLatexRange.startContainer.parentNode.closest('.page') : savedLatexRange.startContainer.closest('.page');
            if (page) {
                savedLatexRange.deleteContents();
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const frag = document.createDocumentFragment();
                while (tempDiv.firstChild) {
                    frag.appendChild(tempDiv.firstChild);
                }
                savedLatexRange.insertNode(frag);
                savedLatexRange = null; // On réinitialise
                
                if (typeof rebalancePages === 'function') rebalancePages(page);
            } else {
                insertAtCursorHTML(html);
            }
        } else {
            insertAtCursorHTML(html);
        }
    }

    // MISE À JOUR DU RENDU
    setTimeout(() => {
        const container = document.getElementById(elementId);
        if (container) {
            container.setAttribute('data-latex-raw', rawLatex.replace(/"/g, '&quot;').replace(/\n/g, '\\n'));
            container.setAttribute('data-latex-align', alignVal);
            container.style.textAlign = alignVal;
            
            const renderZone = container.querySelector('.latex-render-zone');
            const processedLatex = rawLatex.replace(/\n/g, ' \\\\ ');
            
            katex.render(processedLatex, renderZone, { throwOnError: false, displayMode: true });
            
            const page = container.closest('.page');
            if (page && typeof rebalancePages === 'function') rebalancePages(page);
        }
    }, 50);

    document.getElementById('modal-latex-edit').style.display = 'none';
};

window.deleteLatex = function(id) {
    const element = document.getElementById(id);
    if (element) {
        const page = element.closest('.page');
        
        hideLatexOverlay();
        const overlay = document.getElementById('global-latex-overlay');
        if (overlay) overlay.style.display = 'none';

        element.remove();
        
        if (page && typeof rebalancePages === 'function') {
            rebalancePages(page);
        }
    }
};

