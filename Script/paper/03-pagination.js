const rebalancePages = (startPage) => {
    if (!startPage || !startPage.classList.contains('page')) return;

    const sel = window.getSelection();
    let markerId = null;
    if (sel.rangeCount > 0 && startPage.contains(sel.anchorNode)) {
        try {
            const range = sel.getRangeAt(0);
            const marker = document.createElement('span');
            markerId = 'dw-caret-' + Date.now();
            marker.id = markerId;
            range.insertNode(marker);
        } catch(e) {}
    }

    let currentPage = startPage;
    let loopGuard = 0;

    while (currentPage && loopGuard < 150) {
        loopGuard++;
        let nextPage = currentPage.nextElementSibling;

        if (currentPage.scrollHeight > currentPage.clientHeight) {
            
            if (!nextPage || !nextPage.classList.contains('page')) {
                nextPage = createNewPage(currentPage);
                if (!nextPage) break;
            }

            while (currentPage.scrollHeight > currentPage.clientHeight && currentPage.lastChild) {
                const elToMove = currentPage.lastChild;
                const isOnlyChild = (currentPage.childNodes.length === 1);

                const badContainers = ['DIV', 'SECTION', 'ARTICLE', 'CENTER'];
                const isSpecial = elToMove.classList && (
                    elToMove.classList.contains('dw-image-wrapper') || 
                    elToMove.classList.contains('dw-html-chart') || 
                    elToMove.classList.contains('dw-toc-container') ||
                    elToMove.classList.contains('dw-toc-line') ||
                    elToMove.classList.contains('dw-table') ||
                    elToMove.classList.contains('page')
                );

                const blockTags = ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'TABLE', 'UL', 'OL', 'BLOCKQUOTE'];
                
                const hasBlockChildren = elToMove.children ? Array.from(elToMove.children).some(child => blockTags.includes(child.tagName)) : false;

                if (badContainers.includes(elToMove.tagName) && !isSpecial && hasBlockChildren) {
                    while (elToMove.firstChild) {
                        let child = elToMove.firstChild;
                        if (child.nodeType === 1 && elToMove.style.textAlign) {
                            child.style.textAlign = elToMove.style.textAlign;
                        }
                        
                        if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
                            let p = document.createElement('div');
                            if (elToMove.style.cssText) p.style.cssText = elToMove.style.cssText;
                            p.appendChild(child);
                            currentPage.insertBefore(p, elToMove);
                        } else {
                            currentPage.insertBefore(child, elToMove);
                        }
                    }
                    elToMove.remove();
                    continue; 
                }

                if (elToMove.tagName === 'TABLE') {
                    nextPage.insertBefore(elToMove, nextPage.firstChild);
                    
                    let cloneTable = elToMove.cloneNode(false);
                    cloneTable.innerHTML = '';
                    if (cloneTable.style) cloneTable.style.marginBottom = '0px';
                    if (elToMove.style) elToMove.style.marginTop = '0px';
                    
                    currentPage.appendChild(cloneTable);
                    
                    let nextTbody = elToMove.querySelector('tbody') || elToMove;
                    let cloneTbody = document.createElement('tbody');
                    cloneTable.appendChild(cloneTbody);

                    let thead = elToMove.querySelector('thead');
                    if (thead) cloneTable.insertBefore(thead.cloneNode(true), cloneTbody);

                    let rowAdded = false;
                    while (nextTbody.firstChild) {
                        let row = nextTbody.firstChild;
                        cloneTbody.appendChild(row);
                        
                        if (currentPage.scrollHeight > currentPage.clientHeight) {
                            if (!rowAdded && isOnlyChild) {
                                rowAdded = true;
                                break; 
                            }
                            nextTbody.insertBefore(row, nextTbody.firstChild);
                            break;
                        }
                        if (row.nodeType === 1) rowAdded = true; 
                    }

                    if (cloneTbody.querySelectorAll('tr').length === 0) cloneTable.remove();
                    if (nextTbody.querySelectorAll('tr').length === 0) elToMove.remove();
                    
                    if (isOnlyChild && !rowAdded) break; 
                    continue;
                }

                const isSpecialBlock = elToMove.classList && (
                  elToMove.classList.contains('dw-html-chart') || 
                  elToMove.classList.contains('dw-latex-wrapper') ||
                  elToMove.classList.contains('dw-image-wrapper') || 
                  elToMove.classList.contains('dw-toc-line')
               );

               if (isSpecialBlock) {
                  nextPage.insertBefore(elToMove, nextPage.firstChild);
                  if (isOnlyChild) break;
                  continue;
               }

                const splittableTags = ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'SPAN', 'B', 'I', 'U', 'LI']; 
                
                if (splittableTags.includes(elToMove.tagName)) {
                    
                    if (elToMove.textContent.trim() === '' && elToMove.querySelectorAll('img, table, .dw-image-wrapper, .dw-html-chart').length === 0) {
                        nextPage.insertBefore(elToMove, nextPage.firstChild);
                        if (isOnlyChild) break;
                        continue; 
                    }

                    nextPage.insertBefore(elToMove, nextPage.firstChild);
                    
                    let clone = elToMove.cloneNode(false); 
                    clone.innerHTML = ''; 
                    if (clone.style) { clone.style.marginBottom = '0px'; clone.style.paddingBottom = '0px'; }
                    if (elToMove.style) { elToMove.style.marginTop = '0px'; elToMove.style.paddingTop = '0px'; }
                    
                    currentPage.appendChild(clone);
                    
                    let contentAdded = false;
                    while (elToMove.firstChild) {
                        clone.appendChild(elToMove.firstChild);
                        
                        if (currentPage.scrollHeight > currentPage.clientHeight) {
                            let overflowChild = clone.lastChild;
                            
                            if (!contentAdded && isOnlyChild) {
                                contentAdded = true;
                                break; 
                            }

                            elToMove.insertBefore(overflowChild, elToMove.firstChild); 
                            
                            if (overflowChild.nodeType === 3) { 
                                let words = overflowChild.nodeValue.split(/(\s+)/);
                                let keepText = '';
                                let moveText = '';
                                
                                overflowChild.nodeValue = ''; 
                                let tempNode = document.createTextNode('');
                                clone.appendChild(tempNode);
                                
                                for (let i = 0; i < words.length; i++) {
                                    tempNode.nodeValue += words[i];
                                    
                                    if (currentPage.scrollHeight > currentPage.clientHeight) {
                                        if (keepText === '' && isOnlyChild) {
                                            tempNode.nodeValue = words[i];
                                            moveText = words.slice(i+1).join('');
                                        } else {
                                            tempNode.nodeValue = keepText;
                                            moveText = words.slice(i).join('');
                                        }
                                        break;
                                    }
                                    keepText = tempNode.nodeValue;
                                }
                                
                                overflowChild.nodeValue = moveText;
                                if (tempNode.nodeValue === '') tempNode.remove();
                                if (overflowChild.nodeValue === '') overflowChild.remove();
                            }
                            break; 
                        }
                        
                        if (clone.lastChild.nodeType !== 3 || clone.lastChild.nodeValue.trim() !== '') {
                            contentAdded = true;
                        }
                    }
                    
                    if (clone.innerHTML === '') clone.remove();
                    if (elToMove.innerHTML === '') elToMove.remove();
                    
                    if (isOnlyChild && !contentAdded) break;
                } else {
                    nextPage.insertBefore(elToMove, nextPage.firstChild);
                    if (isOnlyChild) break;
                }
            }
        }
        
        else if (nextPage && nextPage.classList.contains('page')) {
            let overflowedDuringPull = false;
            
            while (nextPage.firstChild) {
                const firstChild = nextPage.firstChild;
                currentPage.appendChild(firstChild);
                
                if (currentPage.scrollHeight > currentPage.clientHeight) {
                    const splittableTags = ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'SPAN', 'B', 'I', 'U', 'LI'];

                    const isSpecialPull = firstChild.classList && (
                        firstChild.classList.contains('dw-html-chart') || 
                        firstChild.classList.contains('dw-latex-wrapper') ||
                        firstChild.classList.contains('dw-image-wrapper') || 
                        firstChild.classList.contains('dw-toc-line')
                     );
                


                     const canBeCut = !isSpecialPull && (
                        (splittableTags.includes(firstChild.tagName) && firstChild.textContent.trim() !== '') || 
                        firstChild.tagName === 'TABLE'
                     );
                     
                     if (canBeCut) {
                        overflowedDuringPull = true;
                        break; 
                     } else {
                        nextPage.insertBefore(firstChild, nextPage.firstChild);
                        break;
                     }
                }
            }

            if (overflowedDuringPull) continue; 

            const hasMedia = nextPage.querySelector('img, table, .dw-image-wrapper, .dw-html-chart, .dw-toc-container, .dw-toc-line');
            const markerNode = markerId ? document.getElementById(markerId) : null;
            const hasMarker = markerNode && nextPage.contains(markerNode);
            const htmlContent = nextPage.innerHTML.trim();
            
            if (!hasMarker && !hasMedia && (htmlContent === '' || htmlContent === '<br>' || htmlContent === '<p><br></p>' || htmlContent === '<div><br></div>')) {
                nextPage.remove();
            }
        }
        
        currentPage = currentPage.nextElementSibling;
    }

    if (markerId) {
        const marker = document.getElementById(markerId);
        if (marker) {
            const targetPage = marker.closest('.page');
            if (targetPage) targetPage.focus();

            const newRange = document.createRange();
            newRange.setStartBefore(marker);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
            
            if (marker.scrollIntoViewIfNeeded) {
                marker.scrollIntoViewIfNeeded();
            } else {
                marker.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            
            marker.remove(); 
        }
    }
};


