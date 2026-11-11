window.generateTableOfContents = function() {
    const pages = document.querySelectorAll('.page');
    if (pages.length === 0) return;

    let headingCount = 0;
    let tocItemsHTML = '';

    pages.forEach((page, index) => {
        const pageNumber = index + 1; 
        const headings = page.querySelectorAll('h1, h2, h3');
        
        headings.forEach(heading => {
            if (heading.innerText.trim() === "SOMMAIRE") return;
            
            headingCount++;
            if (!heading.id) {
                heading.id = 'dw-heading-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
            }

            const level = parseInt(heading.tagName.substring(1)); 
            const indent = (level - 1) * 25; 
            const isBold = level === 1 ? 'font-weight: bold; color: #000;' : 'color: #444;';
            const text = heading.innerText.trim() || "Titre vide";

            tocItemsHTML += `
                <div class="dw-toc-line" contenteditable="false" style="background: #ffffff; padding: 4px 25px; border-left: 1px solid #ddd; border-right: 1px solid #ddd; font-family: Arial, sans-serif;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-left: ${indent}px; margin-bottom: 4px; cursor: pointer; font-size: 14px; ${isBold}" 
                         onclick="document.getElementById('${heading.id}').scrollIntoView({behavior: 'smooth', block: 'center'})"
                         onmouseover="this.style.color='#008CBA'" 
                         onmouseout="this.style.color='${level === 1 ? '#000' : '#444'}'">
                        
                        <span style="background: #ffffff; padding-right: 8px; z-index: 1;">${text}</span>
                        <span style="flex-grow: 1; border-bottom: 2px dotted #ccc; margin: 0 5px; position: relative; top: -3px;"></span>
                        <span style="background: #ffffff; padding-left: 8px; z-index: 1;">${pageNumber}</span>
                    </div>
                </div>
            `;
        });
    });

    if (headingCount === 0) {
        alert("Aucun titre (Titre 1, Titre 2 ou Titre 3) n'a été trouvé dans votre document.");
        return;
    }

    const headerHTML = `
        <div class="dw-toc-line dw-toc-header" contenteditable="false" style="position: relative; background: #ffffff; padding: 25px 25px 10px 25px; border-radius: 8px 8px 0 0; border: 1px solid #ddd; border-bottom: none; margin-top: 20px; font-family: Arial, sans-serif;">
            <div style="position: absolute; top: 15px; right: 15px; display: flex; gap: 8px; z-index: 10;">
                <button class="btn-smr-dd" onclick="generateTableOfContents()" style="background: #e5e7eb; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 11px; color: #374151; font-weight: bold;">↻ Actualiser</button>
                <button class="btn-smr-dd" onclick="deleteTableOfContents()" style="background: #fee2e2; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 11px; color: #991b1b; font-weight: bold;">✖ Supprimer</button>
            </div>
            <h2 style="margin-top: 0; text-align: center; color: #111; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">Sommaire</h2>
        </div>
    `;

    const footerHTML = `
        <div class="dw-toc-line dw-toc-footer" contenteditable="false" style="background: #ffffff; height: 15px; border-radius: 0 0 8px 8px; border: 1px solid #ddd; border-top: none; margin-bottom: 20px;"></div>
    `;

    const fullHTML = headerHTML + tocItemsHTML + footerHTML;

    const existingLines = document.querySelectorAll('.dw-toc-line');
    
    if (existingLines.length > 0) {
        const firstLine = existingLines[0];
        const marker = document.createElement('span');
        firstLine.parentNode.insertBefore(marker, firstLine);
        
        existingLines.forEach(line => line.remove());
        
        marker.insertAdjacentHTML('afterend', fullHTML);
        const page = marker.closest('.page');
        marker.remove();
        
        if (page && typeof rebalancePages === 'function') {
            setTimeout(() => rebalancePages(page), 50);
        }
    } else {
        insertAtCursorHTML(fullHTML + '<p><br></p>');
        const activePage = document.activeElement.closest('.page') || pages[0];
        if (activePage && typeof rebalancePages === 'function') {
            setTimeout(() => rebalancePages(activePage), 50);
        }
    }
};

window.deleteTableOfContents = function() {
    const lines = document.querySelectorAll('.dw-toc-line');
    if (lines.length > 0) {
        const firstPage = lines[0].closest('.page');
        lines.forEach(line => line.remove());
        
        if (firstPage && typeof rebalancePages === 'function') {
            setTimeout(() => rebalancePages(firstPage), 50);
        }
    }
};

window.clearFormatting = function () {
   document.execCommand('removeFormat', false, null);
   document.execCommand('formatBlock', false, 'P');
   const selection = window.getSelection();
   if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let container = range.commonAncestorContainer;
      if (container.nodeType === 3) container = container.parentNode;
      let nodesToClean = new Set();
      let parentBlock = container.closest ? container.closest('p, div, h1, h2, h3, h4, h5, h6') : null;
      if (parentBlock && !parentBlock.classList.contains('page')) {
         nodesToClean.add(parentBlock);
      }
      if (container.querySelectorAll) {
         container.querySelectorAll('*').forEach(el => {
            if (range.intersectsNode(el)) {
               nodesToClean.add(el);
               let closestP = el.closest('p, div, h1, h2, h3, h4, h5, h6');
               if (closestP && !closestP.classList.contains('page')) {
                  nodesToClean.add(closestP);
               }
            }
         });
      }
      nodesToClean.forEach(el => {
         el.removeAttribute('class');
         el.removeAttribute('style');
         if (['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(el.tagName)) {
            el.style.margin = '0';
            el.style.padding = '0';
            el.style.lineHeight = 'normal';
         }
      });
      const page = container.closest ? container.closest('.page') : null;
      if (page && typeof window.rebalancePages === 'function') {
         setTimeout(() => {
            window.rebalancePages(page);
         }, 50);
      }
   }
};
