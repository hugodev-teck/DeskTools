window.checkPageOverflow = window.rebalancePages;
const btnOpenModal = document.getElementById('openModalBtn');
const btnOpenInster = document.getElementById('openModalinster');
const btnOpenPara = document.getElementById('openModalpara');
const closeBtn = document.querySelector('.closebtn');

let currentSelectedImage = null;
let isResizing = false;
let isDraggingImage = false;
let currentHandle = null;
let startX, startY, startW, startH, imgRatio;
let dragOffsetX = 0,
   dragOffsetY = 0;

let undoStack = [];
let redoStack = [];
const MAX_HISTORY = 50;
let isRestoringHistory = false;
let typingTimer = null;

const importInput = document.getElementById('import-word-input');
window.documentComments = window.documentComments || {};
let commentPanelTimer = null;

const pageDimensions = {
   'A4': {
      width: 210,
      height: 297
   },
   'A5': {
      width: 148,
      height: 210
   },
   'Letter': {
      width: 215.9,
      height: 279.4
   },
   'Legal': {
      width: 215.9,
      height: 355.6
   }
};

const pageMargins = {
   'no': 0,
   'narrow': 10,
   'normal': 20,
   'wide': 30
};

document.addEventListener('DOMContentLoaded', function () {
   adaptContentHeight();
   window.addEventListener('resize', adaptContentHeight);
});

if (btnOpenModal) {
   btnOpenModal.addEventListener('click', () => {
      document.getElementById('menu-modal-content').style.display = 'block';
   });
}
if (btnOpenInster) {
   btnOpenInster.addEventListener('click', () => {
      document.getElementById('menu-modal-content').style.display = 'block';
   });
}
if (btnOpenPara) {
   btnOpenPara.addEventListener('click', () => {
      document.getElementById('menu-modal-content').style.display = 'block';
   });
}
if (closeBtn) {
   closeBtn.addEventListener('click', () => {
      document.getElementById('menu-modal-content').style.display = 'none';
   });
}
window.addEventListener('click', (event) => {
   const modal = document.getElementById('menu-modal-content');
   if (modal && event.target === modal) {
      modal.style.display = 'none';
   }
});

function openTab(event, tabName) {
   const tabcontent = document.getElementsByClassName('tabcontent');
   for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
   }
   const tablinks = document.getElementsByClassName('tablinks');
   for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active');
   }
   document.getElementById(tabName).style.display = 'block';
   event.currentTarget.classList.add('active');
}

function toggleMenu() {
   const m = document.getElementById('menu');
   if (m) m.style.left = (m.style.left === '0px' || m.style.left === '0%') ? '-100%' : '0px';
};

document.addEventListener('mouseup', (e) => {
    // SÉCURITÉ : Si on a cliqué sur du texte pur, on cible la balise qui l'entoure
    let targetEl = e.target;
    if (targetEl.nodeType === 3) targetEl = targetEl.parentNode;

    const toolbar = document.getElementById('table-floating-toolbar') || document.querySelector('.table-toolbar');
    if (!toolbar) return; // Si le menu n'existe pas dans le HTML, on s'arrête

    // 1. Si on clique sur le menu lui-même, on s'arrête
    if (targetEl.closest('#table-floating-toolbar') || targetEl.closest('.table-toolbar')) return;

    // 2. On cherche la CELLULE précise et le TABLEAU
    const cell = targetEl.closest('td, th');
    const table = targetEl.closest('table');

    if (table && cell) {
        window.currentSelectedTable = table;
        window.currentSelectedCell = cell; 
        
        const rect = cell.getBoundingClientRect();
        
        toolbar.style.display = 'flex';
        toolbar.style.position = 'fixed';
        toolbar.style.zIndex = '1000000';
        
        const toolbarWidth = toolbar.offsetWidth || 150; 
        toolbar.style.top = `${rect.top - 45}px`; 
        toolbar.style.left = `${rect.left + (rect.width / 2) - (toolbarWidth / 2)}px`;
        
    } else {
        // Clic en dehors = on cache
        toolbar.style.display = 'none';
        window.currentSelectedTable = null;
        window.currentSelectedCell = null;
    }
});

function adaptContentHeight() {
   const topBar = document.getElementById('top-bar');
   const middleBar = document.getElementById('middle-bar');
   const content = document.getElementById('content');
   if (topBar && middleBar && content) {
      const topBarHeight = topBar.offsetHeight;
      const middleBarHeight = middleBar.offsetHeight;
      const availableHeight = window.innerHeight - topBarHeight - middleBarHeight;
      content.style.height = availableHeight + "px";
   }
}
document.addEventListener('contextmenu', function (event) {
   event.preventDefault();
   const customMenu = document.getElementById('custom-menu');
   customMenu.style.display = 'block';
   customMenu.style.left = event.pageX + 'px';
   customMenu.style.top = event.pageY + 'px';
});
document.addEventListener('click', function (event) {
   const customMenu = document.getElementById('custom-menu');
   customMenu.style.display = 'none';
   const imageMenu = document.getElementById('image-context-menu');
   if (imageMenu) {
      imageMenu.remove();
   }
});

function applyPageSettings() {
   const paperSize = document.getElementById('paper-size').value;
   const marginSize = document.getElementById('margin-size').value;
   const orientation = document.querySelector('input[name="orientation"]:checked').value;
   let width = pageDimensions[paperSize].width;
   let height = pageDimensions[paperSize].height;
   if (orientation === 'landscape') {
      const temp = width;
      width = height;
      height = temp;
   }
   const padding = pageMargins[marginSize];
   const textInfo = document.querySelector('#MiseEnPage p');
   if (textInfo) {
      textInfo.innerText = `Le type de feuille est actuellement '${paperSize}' en mode ${orientation}.`;
   }
   const pages = document.querySelectorAll('.page');
   pages.forEach(page => {
      page.style.width = `${width}mm`;
      page.style.height = `${height}mm`;
      page.style.padding = `${padding}mm`;
   });
   if (pages.length > 0 && typeof rebalancePages === 'function') {
      console.log('Lancement du recalcul avec rebalancePages !');
      setTimeout(() => rebalancePages(pages[0]), 100);
   }
   else if (pages.length > 0) {
      console.error("Alerte : La fonction rebalancePages est introuvable.");
   }
};

function checkPageOverflow(page) {
   if (typeof rebalancePages === 'function') {
      rebalancePages(page);
   }
};

function setupPageSettingsListeners() {
   const paperSizeSelect = document.getElementById('paper-size');
   if (paperSizeSelect) paperSizeSelect.addEventListener('change', applyPageSettings);
   const marginSizeSelect = document.getElementById('margin-size');
   if (marginSizeSelect) marginSizeSelect.addEventListener('change', applyPageSettings);
   const orientationRadios = document.querySelectorAll('input[name="orientation"]');
   orientationRadios.forEach(radio => {
      radio.addEventListener('change', applyPageSettings);
   });
}
document.addEventListener('DOMContentLoaded', () => {
   setupPageSettingsListeners();
});
const menu = document.getElementById('menu');
const menudev = document.getElementById('menudev');
menudev.addEventListener('click', (event) => {
   event.stopPropagation();
   toggleMenu();
});
document.addEventListener('click', (event) => {
   const isClickInsideMenu = menu.contains(event.target);
   if (!isClickInsideMenu) {
      menu.style.left = "-100%";
   }
});

function toggleMenu() {
   if (menu.style.left === "0px" || menu.style.left === "") {
      menu.style.left = "-100%";
   }
   else {
      menu.style.left = "0";
   }
}
const container = document.getElementById('pages-container');
const zoomBar = document.getElementById('zoomBar');
const valeurZoom = document.getElementById('valeur-zoom');
let activePage = null;
const init = () => {
   if (!container) return;
   container.innerHTML = '';
   activePage = createNewPage();
   activePage.focus();
   const loader = document.getElementById('loader');
   if (loader) setTimeout(() => loader.style.display = 'none', 2000);
   bindControls();
   const commentsPanel = document.getElementById('comments-panel');
   if (commentsPanel) {
      commentsPanel.addEventListener('mouseenter', () => {
         if (commentPanelTimer) clearTimeout(commentPanelTimer);
      });
      commentsPanel.addEventListener('mouseleave', () => {
         if (typeof resetCommentTimer === 'function') resetCommentTimer();
      });
   }
   setupZoom();
   setupFileIO();
   updateHeaderFooter();
   if (typeof checkOfflineStatus === 'function') {
      checkOfflineStatus();
   }
};
const createNewPage = (after = null) => {
   const page = document.createElement('div');
   page.className = 'page';
   page.contentEditable = true;
   page.addEventListener('input', () => rebalancePages(page));
   page.addEventListener('focus', () => activePage = page);
   page.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') handleBackspace(page, e);
   });
   const paperSize = document.getElementById('paper-size') ? document.getElementById('paper-size').value : 'A4';
   const marginSize = document.getElementById('margin-size') ? document.getElementById('margin-size').value : 'normal';
   const orientationEl = document.querySelector('input[name="orientation"]:checked');
   const orientation = orientationEl ? orientationEl.value : 'portrait';
   if (typeof pageDimensions !== 'undefined' && typeof pageMargins !== 'undefined') {
      let w = pageDimensions[paperSize].width;
      let h = pageDimensions[paperSize].height;
      if (orientation === 'landscape') {
         const t = w;
         w = h;
         h = t;
      }
      page.style.width = `${w}mm`;
      page.style.height = `${h}mm`;
      page.style.padding = `${pageMargins[marginSize]}mm`;
   }
   if (after && after.nextSibling) {
      container.insertBefore(page, after.nextSibling);
   }
   else {
      container.appendChild(page);
   }
   return page;
};

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
                    const canBeCut = (splittableTags.includes(firstChild.tagName) && firstChild.textContent.trim() !== '') || firstChild.tagName === 'TABLE';
                    
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


const handleBackspace = (page, e) => {
   const sel = window.getSelection();
   if (!sel.isCollapsed) return;
   if (isAtStartOfPage(page)) {
      const prevPage = page.previousElementSibling;
      if (prevPage && prevPage.classList.contains('page')) {
         e.preventDefault();
         if (page.innerText.trim() === "" && page.querySelectorAll('img, table, .dw-image-wrapper').length === 0) {
            page.remove();
            focusEnd(prevPage);
         }
         else {
            let lastBlock = prevPage.lastElementChild;
            let firstBlock = page.firstElementChild;
            const textBlocks = ['P', 'H1', 'H2', 'H3', 'H4', 'DIV', 'BLOCKQUOTE'];
            if (lastBlock && firstBlock && textBlocks.includes(lastBlock.tagName) && textBlocks.includes(firstBlock.tagName)) {
               const range = document.createRange();
               range.selectNodeContents(lastBlock);
               range.collapse(false);
               sel.removeAllRanges();
               sel.addRange(range);
               while (firstBlock.firstChild) {
                  lastBlock.appendChild(firstBlock.firstChild);
               }
               firstBlock.remove();
            }
            else {
               focusEnd(prevPage);
               document.execCommand('delete', false, null);
            }
         }
         if (typeof rebalancePages === 'function') {
            rebalancePages(prevPage);
         }
      }
   }
};
const isAtStartOfPage = (page) => {
   const sel = window.getSelection();
   if (sel.rangeCount === 0) return false;
   const range = sel.getRangeAt(0);
   const preCaretRange = range.cloneRange();
   preCaretRange.selectNodeContents(page);
   preCaretRange.setEnd(range.startContainer, range.startOffset);
   const fragment = preCaretRange.cloneContents();
   if (fragment.textContent.replace(/[\n\r]/g, '').length > 0) return false;
   if (fragment.querySelectorAll('img, table, .dw-image-wrapper').length > 0) return false;
   if (fragment.querySelectorAll('br').length > 0) return false;
   return true;
};
const focusEnd = (el) => {
   el.focus();
   const range = document.createRange();
   range.selectNodeContents(el);
   range.collapse(false);
   const sel = window.getSelection();
   sel.removeAllRanges();
   sel.addRange(range);
};
const bindControls = () => {
   const exec = (cmd, val = null) => {
      document.execCommand(cmd, false, val);
      if (activePage) rebalancePages(activePage);
   };
   const b = document.getElementById('apply-stand');
   if (b) b.onclick = (e) => {
      e.preventDefault();
      exec('bold');
   };
   const solo = document.querySelectorAll('.class2-button-solo');
   if (solo[1]) solo[1].onclick = (e) => {
      e.preventDefault();
      exec('italic');
   };
   if (solo[2]) solo[2].onclick = (e) => {
      e.preventDefault();
      exec('underline');
   };
   const al = document.querySelectorAll('#tool-container-text .class1-button');
   const cmds = ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];
   al.forEach((btn, i) => {
      if (cmds[i]) btn.onclick = () => exec(cmds[i]);
   });
   const ff = document.getElementById('font-family');
   if (ff) ff.onchange = () => exec('fontName', ff.value);
   const fs = document.getElementById('font-size');
   if (fs) fs.onchange = () => {
      const m = {
         "8": 1,
         "10": 2,
         "12": 3,
         "14": 4,
         "20": 5,
         "24": 6,
         "36": 7
      };
      exec('fontSize', m[fs.value] || 3);
   };
   document.querySelectorAll('.class1-color-button').forEach(btn => {
      btn.onclick = () => exec('foreColor', btn.dataset.color || window.getComputedStyle(btn).backgroundColor);
   });
   const tBtn = document.getElementById('insert-table-btn');
   if (tBtn) {
      tBtn.onclick = () => {
         const r = document.getElementById('num-rows').value || 2;
         const c = document.getElementById('num-cols').value || 2;
         let html = '<table style="width:100%; border:1px solid black; border-collapse:collapse;">';
         for (let i = 0; i < r; i++) {
            html += '<tr>';
            for (let j = 0; j < c; j++) html += '<td style="border:1px solid black; padding:5px;">&nbsp;</td>';
            html += '</tr>';
         }
         exec('insertHTML', html + '</table><p><br></p>');
         document.getElementById('menu-modal-content').style.display = 'none';
      };
   }
};
const setupZoom = () => {
   const setZ = (v) => {
      const f = Math.min(Math.max(0.5, v), 2);
      if (valeurZoom) valeurZoom.textContent = Math.floor(f * 100) + '%';
      if (zoomBar) zoomBar.value = f * 100;
      container.style.transform = `scale(${f})`;
      container.style.transformOrigin = 'top center';
   };
   if (zoomBar) zoomBar.oninput = () => setZ(zoomBar.value / 100);
   document.addEventListener('wheel', (e) => {
      if (e.ctrlKey) {
         e.preventDefault();
         setZ((parseFloat(zoomBar.value) / 100) + (e.deltaY > 0 ? -0.1 : 0.1));
      }
   }, {
      passive: false
   });
};
const handlePrint = () => {
   setTimeout(() => {
      window.print();
   }, 300);
};
init();

function insertStyledText(t) {
   let h = "";
   switch (t) {
      case 'titre1':
         h = '<h1 style="color:rgb(18,18,131); font-style:italic;">Titre 1</h1>';
         break;
      case 'titre2':
         h = '<h2 style="color:rgb(252,193,0); font-style:italic;">Titre 2</h2>';
         break;
      case 'titre3':
         h = '<h3 style="color:rgb(48,48,48); font-style:italic;">Titre 3</h3>';
         break;
      case 'soustitre':
         h = '<h4 style="color:rgb(48,48,48);">Sous-titre</h4>';
         break;
      case 'citation':
         h = '<blockquote style="color:gray; font-style:italic; border-left: 3px solid gray; padding-left: 10px;">"Citation"</blockquote>';
         break;
   }
   document.execCommand('insertHTML', false, h + '<p><br></p>');
};

function updateHeaderFooter() {
   const headerInput = document.getElementById('header-text') ? document.getElementById('header-text').value : '';
   const footerInput = document.getElementById('footer-text') ? document.getElementById('footer-text').value : '';
   const showPageNum = document.getElementById('show-page-num') ? document.getElementById('show-page-num').checked : true;
   const container = document.getElementById('pages-container');
   if (!container) return;
   if (headerInput.trim() !== "") {
      container.style.setProperty('--header-content', `"${headerInput}"`);
      container.style.setProperty('--header-border', `1px solid #ddd`);
   }
   else {
      container.style.setProperty('--header-content', `""`);
      container.style.setProperty('--header-border', `none`);
   }
   let footerContent = `"${footerInput}"`;
   if (showPageNum) {
      if (footerInput.trim() !== "") footerContent += ` " - Page " counter(page-counter)`;
      else footerContent = `"Page " counter(page-counter)`;
   }
   else if (footerInput.trim() === "") {
      footerContent = `""`;
   }
   container.style.setProperty('--footer-content', footerContent);
   container.style.setProperty('--footer-border', (footerInput.trim() !== "" || showPageNum) ? `1px solid #ddd` : `none`);
}

function toggleTableCreator(event) {
   const modal = document.getElementById('table-creator-modal');
   const btn = event.currentTarget;
   if (modal.style.display === 'block') {
      modal.style.display = 'none';
   }
   else {
      const rect = btn.getBoundingClientRect();
      modal.style.left = rect.left - 55 + 'px';
      modal.style.top = (rect.bottom + 5) + 'px';
      modal.style.display = 'block';
   }
   event.stopPropagation();
};

function confirmInsertTable() {
   const rows = parseInt(document.getElementById('tbl-rows').value, 10);
   const cols = parseInt(document.getElementById('tbl-cols').value, 10);
   if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
      alert("Veuillez entrer des nombres valides supérieurs à 0.");
      return;
   }
   let tableHTML = '<table class="dw-table"><tbody>';
   tableHTML += '<tr>';
   for (let j = 0; j < cols; j++) {
      tableHTML += `<th>En-tête ${j + 1}</th>`;
   }
   tableHTML += '</tr>';
   for (let i = 0; i < rows - 1; i++) {
      tableHTML += '<tr>';
      for (let j = 0; j < cols; j++) {
         tableHTML += '<td><br></td>';
      }
      tableHTML += '</tr>';
   }
   tableHTML += '</tbody></table><p><br></p>';
   insertAtCursorHTML(tableHTML);
   document.getElementById('table-creator-modal').style.display = 'none';
};
document.addEventListener('click', (e) => {
   const modal = document.getElementById('table-creator-modal');
   if (modal && modal.style.display === 'block') {
      if (!modal.contains(e.target) && !e.target.closest('button[onclick="toggleTableCreator(event)"]')) {
         modal.style.display = 'none';
      }
   }
});

function insertAtCursorHTML(html) {
   const page = getActivePage();
   if (page) {
      page.focus();
      document.execCommand('insertHTML', false, html);
   }
   else {
      console.error("Aucune page active trouvée pour l'insertion.");
   }
}

function getActivePage() {
   const selection = window.getSelection();
   if (selection.rangeCount > 0) {
      const node = selection.anchorNode;
      const page = node.nodeType === 3 ? node.parentNode.closest('.page') : node.closest('.page');
      if (page) return page;
   }
   return document.querySelector('.page');
}
window.insertTableQuick = () => {
   let table = `
    <table class="dw-table">
        <tbody>
            <tr>
                <th>En-tête 1</th>
                <th>En-tête 2</th>
                <th>En-tête 3</th>
            </tr>
            <tr>
                <td><br></td>
                <td><br></td>
                <td><br></td>
            </tr>
            <tr>
                <td><br></td>
                <td><br></td>
                <td><br></td>
            </tr>
        </tbody>
    </table>
    <p><br></p>`;
   insertAtCursorHTML(table);
};
document.addEventListener('click', (e) => {
   const td = e.target.closest('td, th');
   if (td && td.closest('.dw-table')) {
      currentTableCell = td;
   }
   else {
      currentTableCell = null;
   }
});

document.addEventListener('mouseup', (e) => {
    // Sécurité : si on clique sur un texte pur, on remonte à la cellule
    let targetEl = e.target;
    if (targetEl.nodeType === 3) targetEl = targetEl.parentNode;

    const toolbar = document.getElementById('table-floating-toolbar');
    if (!toolbar) return;

    // Si on clique SUR le menu, on ne fait rien
    if (targetEl.closest('#table-floating-toolbar')) return;

    // On cherche la cellule et le tableau
    const cell = targetEl.closest('td, th');
    const table = targetEl.closest('table');

    if (table && cell) {
        window.currentSelectedTable = table;
        window.currentSelectedCell = cell; 
        
        // On affiche le menu AVANT pour que le navigateur puisse mesurer sa taille réelle
        toolbar.style.display = 'flex';
        
        const rect = cell.getBoundingClientRect();
        const toolbarWidth = toolbar.offsetWidth || 150; 
        
        toolbar.style.position = 'fixed';
        toolbar.style.zIndex = '1000000';
        
        // LA MAGIE DU POSITIONNEMENT "À CÔTÉ" :
        // On teste s'il y a assez de place à droite de l'écran
        if (rect.right + toolbarWidth + 15 < window.innerWidth) {
            // Place le menu à droite de la cellule (+10px d'espace)
            toolbar.style.left = `${rect.right + 10}px`; 
        } else {
            // S'il n'y a pas la place, on le place à gauche de la cellule
            toolbar.style.left = `${rect.left - toolbarWidth - 10}px`; 
        }
        
        // On l'aligne verticalement avec le haut de la cellule
        toolbar.style.top = `${rect.top}px`; 
        
    } else {
        // Clic dans le vide = on cache
        toolbar.style.display = 'none';
        window.currentSelectedTable = null;
        window.currentSelectedCell = null;
    }
});

// 2. LES ACTIONS DU TABLEAU
window.addTableRow = function() {
    if (!window.currentSelectedCell) return;
    const currentRow = window.currentSelectedCell.closest('tr');
    if (!currentRow) return;
    
    const colsCount = currentRow.children.length;
    const newRow = document.createElement('tr');
    
    for (let i = 0; i < colsCount; i++) {
        newRow.innerHTML += '<td><br></td>';
    }
    
    currentRow.parentNode.insertBefore(newRow, currentRow.nextSibling);
};

window.addColumn = function() {
    if (!window.currentSelectedCell) return;
    const currentTable = window.currentSelectedCell.closest('table');
    if (!currentTable) return;
    
    const cellIndex = window.currentSelectedCell.cellIndex;
    
    Array.from(currentTable.rows).forEach(row => {
        const newCell = document.createElement(row.tagName === 'TH' ? 'th' : 'td');
        newCell.innerHTML = '<br>';
        if (row.cells[cellIndex]) {
            row.insertBefore(newCell, row.cells[cellIndex].nextSibling);
        } else {
            row.appendChild(newCell); // Cas extrême
        }
    });
};

window.deleteTableRow = function() {
    if (!window.currentSelectedCell) return;
    const row = window.currentSelectedCell.closest('tr');
    if (row) row.remove();
    document.getElementById('table-floating-toolbar').style.display = 'none';
};

window.deleteTableColumn = function() {
    if (!window.currentSelectedCell) return;
    const table = window.currentSelectedCell.closest('table');
    if (!table) return;
    
    const cellIndex = window.currentSelectedCell.cellIndex;
    Array.from(table.rows).forEach(row => {
        if (row.cells[cellIndex]) row.cells[cellIndex].remove();
    });
    document.getElementById('table-floating-toolbar').style.display = 'none';
};

function triggerImageUpload() {
    let fileInput = document.getElementById('image-input');
    if (fileInput) {
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const id = 'img-' + Date.now();
                    const html = `<span class="dw-image-wrapper" id="${id}" style="width: 300px; height: auto;" contenteditable="false" data-wrap="inline"><img src="${evt.target.result}" style="pointer-events: none;"></span>&nbsp;`;
                    insertAtCursorHTML(html);
                };
                reader.readAsDataURL(file);
            }
            fileInput.value = '';
        };
        fileInput.click();
    }
};

let dragStartX = 0, dragStartY = 0;

document.addEventListener('mousedown', (e) => {
    if (isResizing) return;

    const wrapper = e.target.closest('.dw-image-wrapper');
    const toolbar = document.getElementById('image-floating-toolbar');

    if (!wrapper && !e.target.closest('#image-floating-toolbar')) {
        document.querySelectorAll('.dw-image-wrapper').forEach(w => {
            w.classList.remove('dw-image-selected');
            w.querySelectorAll('.resize-handle').forEach(h => h.remove());
        });
        currentSelectedImage = null;
        if (toolbar) toolbar.style.display = 'none';
        return;
    }

    if (wrapper) {
        if (wrapper !== currentSelectedImage) {
            if (currentSelectedImage) {
                currentSelectedImage.classList.remove('dw-image-selected');
                currentSelectedImage.querySelectorAll('.resize-handle').forEach(h => h.remove());
            }
            currentSelectedImage = wrapper;
            wrapper.classList.add('dw-image-selected');
            
            if (!wrapper.querySelector('.resize-handle')) {
                ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].forEach(dir => {
                    let h = document.createElement('div');
                    h.className = `resize-handle ${dir}`;
                    h.addEventListener('mousedown', startResize);
                    wrapper.appendChild(h);
                });
            }
        }

        const rect = wrapper.getBoundingClientRect();
        const content = document.getElementById('content');
        if (toolbar) {
             toolbar.style.display = 'flex';
             toolbar.style.position = 'fixed'; /* Fixe la barre par rapport à ton écran */
             toolbar.style.zIndex = '1000000'; /* Force la barre à passer AU-DESSUS de tout */
             toolbar.style.top = `${rect.bottom + 15}px`; /* Juste en dessous de l'image */
             
             /* On centre la barre proprement */
             const toolbarWidth = toolbar.offsetWidth || 300; 
             toolbar.style.left = `${rect.left + (rect.width / 2) - (toolbarWidth / 2)}px`;
        }

        if (!e.target.classList.contains('resize-handle')) {
            e.preventDefault();
            isDraggingImage = true;
            hasMovedImage = false;
            
            dragStartX = e.clientX;
            dragStartY = e.clientY;

            wrapper.style.transition = 'none';

            document.addEventListener('mousemove', doDragImage);
            document.addEventListener('mouseup', stopDragImage);
        }
    }
});

function doDragImage(e) {
    if (!isDraggingImage || !currentSelectedImage) return;
    
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        hasMovedImage = true;
        
        // CORRECTION : On CACHE la barre pendant qu'on glisse l'image !
        const toolbar = document.getElementById('image-floating-toolbar');
        if (toolbar) toolbar.style.display = 'none';

        currentSelectedImage.style.transform = `translate(${dx}px, ${dy}px)`;
        currentSelectedImage.style.pointerEvents = 'none';
        currentSelectedImage.style.zIndex = '10000';
        currentSelectedImage.style.opacity = '0.7';
    }
}

function stopDragImage(e) {
    if (!isDraggingImage || !currentSelectedImage) return;
    isDraggingImage = false;

    document.removeEventListener('mousemove', doDragImage);
    document.removeEventListener('mouseup', stopDragImage);

    const wrapper = currentSelectedImage;
    
    wrapper.style.pointerEvents = 'auto';
    wrapper.style.opacity = '1';
    wrapper.style.transform = 'none';
    wrapper.style.zIndex = '';

    if (hasMovedImage) {
        const wrapType = wrapper.getAttribute('data-wrap') || 'inline';

        if (wrapType === 'devant' || wrapType === 'derriere') {
            const page = wrapper.closest('.page');
            if (page) {
                const pageRect = page.getBoundingClientRect();
                const newLeft = e.clientX - pageRect.left - (wrapper.offsetWidth / 2) + page.scrollLeft;
                const newTop = e.clientY - pageRect.top - (wrapper.offsetHeight / 2) + page.scrollTop;

                wrapper.style.position = 'absolute';
                wrapper.style.left = `${newLeft}px`;
                wrapper.style.top = `${newTop}px`;
                wrapper.style.zIndex = wrapType === 'devant' ? '50' : '-1';
            }
        } 
        else {
            let range;
            if (document.caretRangeFromPoint) {
                range = document.caretRangeFromPoint(e.clientX, e.clientY);
            }
            
            if (range && !wrapper.contains(range.startContainer)) {
                range.insertNode(wrapper);
            }
        }
    }

    const page = wrapper.closest('.page');
    if (page && typeof checkPageOverflow === 'function') checkPageOverflow(page);

    // CORRECTION : On affiche la barre PROPREMENT à la fin du glisser-déposer
    const toolbar = document.getElementById('image-floating-toolbar');
    if (toolbar) {
        const rect = wrapper.getBoundingClientRect();
        toolbar.style.display = 'flex';
        toolbar.style.position = 'fixed';
        toolbar.style.zIndex = '1000000';
        toolbar.style.top = `${rect.bottom + 15}px`;
        
        const toolbarWidth = toolbar.offsetWidth || 300; 
        toolbar.style.left = `${rect.left + (rect.width / 2) - (toolbarWidth / 2)}px`;
    }
}

function startResize(e) {
    e.preventDefault();
    e.stopPropagation();
    isResizing = true;
    currentHandle = e.target.className.split(' ')[1];
    startX = e.clientX;
    startY = e.clientY;
    startW = currentSelectedImage.offsetWidth;
    startH = currentSelectedImage.offsetHeight;
    imgRatio = startW / startH;
    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
}

function doResize(e) {
    if (!isResizing || !currentSelectedImage) return;
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;
    let newW = startW, newH = startH;

    if (currentHandle.includes('e')) newW = startW + dx;
    if (currentHandle.includes('w')) newW = startW - dx;
    if (currentHandle.includes('s')) newH = startH + dy;
    if (currentHandle.includes('n')) newH = startH - dy;
    if (currentHandle.length === 2) newH = newW / imgRatio;

    if (newW > 30 && newH > 30) {
        currentSelectedImage.style.width = newW + 'px';
        currentSelectedImage.style.height = newH + 'px';
        const toolbar = document.getElementById('image-floating-toolbar');
        if (toolbar) toolbar.style.display = 'none';
    }
}

function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
    
    if (currentSelectedImage) {
        const page = currentSelectedImage.closest('.page');
        if (page && typeof checkPageOverflow === 'function') checkPageOverflow(page);
        
        // CORRECTION : On affiche la barre PROPREMENT à la fin du redimensionnement
        const toolbar = document.getElementById('image-floating-toolbar');
        if (toolbar) {
            const rect = currentSelectedImage.getBoundingClientRect();
            toolbar.style.display = 'flex';
            toolbar.style.position = 'fixed';
            toolbar.style.zIndex = '1000000';
            toolbar.style.top = `${rect.bottom + 15}px`;
            
            const toolbarWidth = toolbar.offsetWidth || 300; 
            toolbar.style.left = `${rect.left + (rect.width / 2) - (toolbarWidth / 2)}px`;
        }
    }
}

function setWrapStyle(wrapType) {
    if (!currentSelectedImage) return;
    const img = currentSelectedImage;
    img.setAttribute('data-wrap', wrapType);
    
    img.style.display = '';
    img.style.float = '';
    img.style.clear = '';
    img.style.margin = '';
    img.style.position = '';
    img.style.zIndex = '';
    img.style.shapeOutside = '';
    img.style.left = '';
    img.style.top = '';
    img.style.transform = '';
    
    switch (wrapType) {
        case 'adapter':
            img.style.display = 'inline-block';
            img.style.float = 'left';
            img.style.margin = '10px';
            img.style.shapeOutside = `url(${img.querySelector('img').src})`;
            break;
        case 'encadre':
            img.style.display = 'inline-block';
            img.style.float = 'left';
            img.style.margin = '10px 15px 10px 0';
            break;
        case 'hautbas':
            img.style.display = 'block';
            img.style.clear = 'both';
            img.style.margin = '15px auto';
            break;
        case 'devant':
            img.style.position = 'absolute';
            img.style.zIndex = '50';
            break;
        case 'derriere':
            img.style.position = 'absolute';
            img.style.zIndex = '-1';
            break;
    }
    
    const page = img.closest('.page');
    if (page && typeof checkPageOverflow === 'function') checkPageOverflow(page);
};

function deleteImage() {
    if (currentSelectedImage) {
        currentSelectedImage.remove();
        document.getElementById('image-floating-toolbar').style.display = 'none';
        currentSelectedImage = null;
    }
};

function exportToPDF() {
   const container = document.getElementById('pages-container');
   if (!container) return;
   const paperSize = document.getElementById('paper-size') ? document.getElementById('paper-size').value : 'A4';
   const orientationEl = document.querySelector('input[name="orientation"]:checked');
   const orientation = orientationEl ? orientationEl.value : 'portrait';
   if (typeof currentSelectedImage !== 'undefined' && currentSelectedImage) {
      currentSelectedImage.classList.remove('dw-image-selected');
      currentSelectedImage.querySelectorAll('.resize-handle').forEach(h => h.remove());
   }
   document.body.classList.add('pdf-export-mode');
   const opt = {
      margin: 0,
      filename: 'Mon_Document.pdf',
      image: {
         type: 'jpeg',
         quality: 1
      },
      html2canvas: {
         scale: 2,
         useCORS: true,
         scrollY: 0
      },
      jsPDF: {
         unit: 'mm',
         format: paperSize.toLowerCase(),
         orientation: orientation
      }
   };
   html2pdf().set(opt).from(container).save().then(() => {
      document.body.classList.remove('pdf-export-mode');
   }).catch(err => {
      console.error("Erreur lors de la génération du PDF", err);
      document.body.classList.remove('pdf-export-mode');
   });
};

function closeCommentsPanel() {
   const panel = document.getElementById('comments-panel');
   if (panel) panel.style.right = '-300px';
   document.querySelectorAll('.dw-comment-highlight.active-highlight').forEach(el => el.classList.remove('active-highlight'));
   document.querySelectorAll('.comment-box.active-box').forEach(el => el.classList.remove('active-box'));
};

function resetCommentTimer() {
   if (commentPanelTimer) clearTimeout(commentPanelTimer);
   commentPanelTimer = setTimeout(() => {
      closeCommentsPanel();
   }, 10000);
};
document.addEventListener('click', (e) => {
   const highlight = e.target.closest('.dw-comment-highlight');
   if (highlight) {
      activateComment(highlight.id);
   }
});

function activateComment(id) {
   const panel = document.getElementById('comments-panel');
   if (panel) panel.style.right = '0';
   resetCommentTimer();
   document.querySelectorAll('.dw-comment-highlight.active-highlight').forEach(el => el.classList.remove('active-highlight'));
   document.querySelectorAll('.comment-box.active-box').forEach(el => el.classList.remove('active-box'));
   const span = document.getElementById(id);
   const box = document.getElementById('box-' + id);
   if (span) span.classList.add('active-highlight');
   if (box) {
      box.classList.add('active-box');
      box.scrollIntoView({
         behavior: 'smooth',
         block: 'nearest'
      });
   }
};

function addComment() {
   const sel = window.getSelection();
   if (sel.isCollapsed) {
      alert("Sélectionnez d'abord du texte pour le commenter.");
      return;
   }
   const commentText = prompt("Saisissez votre commentaire :");
   if (!commentText) return;
   const commentId = 'comment-' + Date.now();
   const range = sel.getRangeAt(0);
   const span = document.createElement('span');
   span.className = 'dw-comment-highlight';
   span.id = commentId;
   span.appendChild(range.extractContents());
   range.insertNode(span);
   window.documentComments[commentId] = {
      text: commentText,
      date: new Date().toLocaleDateString('fr-FR') + ' à ' + new Date().toLocaleTimeString('fr-FR', {
         hour: '2-digit',
         minute: '2-digit'
      })
   };
   const customMenu = document.getElementById('custom-menu');
   if (customMenu) customMenu.style.display = 'none';
   renderComments();
   activateComment(commentId);
};

function renderComments() {
   const panel = document.getElementById('comments-panel');
   const list = document.getElementById('comments-list');
   if (!panel || !list) return;
   list.innerHTML = '';
   const commentKeys = Object.keys(window.documentComments);
   if (commentKeys.length === 0) {
      closeCommentsPanel();
      return;
   }
   panel.style.right = '0';
   commentKeys.forEach(id => {
      const c = window.documentComments[id];
      list.innerHTML += `
            <div class="comment-box" id="box-${id}" onclick="activateComment('${id}')" style="cursor: pointer;">
                <button class="delete-btn" onclick="event.stopPropagation(); deleteComment('${id}')" title="Supprimer">×</button>
                <span class="comment-date">${c.date}</span>
                <p>${c.text}</p>
            </div>
        `;
   });
   resetCommentTimer();
};

function deleteComment(id) {
   delete window.documentComments[id];
   const span = document.getElementById(id);
   if (span) {
      const parent = span.parentNode;
      while (span.firstChild) {
         parent.insertBefore(span.firstChild, span);
      }
      span.remove();
   }
   renderComments();
};

function loadExternalScripts() {
   if (navigator.onLine) {
    const scriptPDF = document.createElement('script');
    scriptPDF.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    scriptPDF.async = true;

    const scriptDocx = document.createElement('script');
    scriptDocx.src = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.21/mammoth.browser.min.js";
    scriptDocx.async = true;

    const scriptZip = document.createElement('script');
    scriptZip.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
    scriptZip.async = true;

    const scriptChart = document.createElement('script');
    scriptChart.src = "https://cdn.jsdelivr.net/npm/chart.js";
    scriptChart.async = true;

    document.head.appendChild(scriptChart);
    document.head.appendChild(scriptZip);
    document.head.appendChild(scriptDocx);
    document.head.appendChild(scriptPDF);

   }
};

function checkOfflineStatus() {
   const btnPdf = document.getElementById('btn-export-pdf');
   const btnImport = document.getElementById('btn-import-word');
   if (!navigator.onLine) {
      if (btnPdf) btnPdf.classList.add('offline-disabled');
      if (btnImport) btnImport.classList.add('offline-disabled');
      const hideUntil = localStorage.getItem('hideOfflineWarningUntil');
      const now = Date.now();
      if (!hideUntil || now > parseInt(hideUntil)) {
         const modal = document.getElementById('offline-modal');
         if (modal) modal.style.display = 'block';
      }
   }
   else {
      if (btnPdf) btnPdf.classList.remove('offline-disabled');
      if (typeof loadExternalScripts === 'function') {
         loadExternalScripts();
      }
   }
};

function closeOfflineModal() {
   const checkbox = document.getElementById('offline-dont-show');
   if (checkbox && checkbox.checked) {
      const demain = Date.now() + (24 * 60 * 60 * 1000);
      localStorage.setItem('hideOfflineWarningUntil', demain);
   }
   const modal = document.getElementById('offline-modal');
   if (modal) modal.style.display = 'none';
};

function setupFileIO() {
   const saveBtns = document.querySelectorAll('#save');
   const openBtns = document.querySelectorAll('#open');
   const fileInput = document.getElementById('file-input');
   saveBtns.forEach(saveBtn => {
      saveBtn.onclick = () => {
         if (currentSelectedImage) {
            currentSelectedImage.classList.remove('dw-image-selected');
            currentSelectedImage.querySelectorAll('.resize-handle').forEach(h => h.remove());
         }
         const paperSize = document.getElementById('paper-size') ? document.getElementById('paper-size').value : 'A4';
         const marginSize = document.getElementById('margin-size') ? document.getElementById('margin-size').value : 'normal';
         const orientationEl = document.querySelector('input[name="orientation"]:checked');
         const orientation = orientationEl ? orientationEl.value : 'portrait';
         const hText = document.getElementById('header-text') ? document.getElementById('header-text').value : "";
         const fText = document.getElementById('footer-text') ? document.getElementById('footer-text').value : "";
         const showNum = document.getElementById('show-page-num') ? document.getElementById('show-page-num').checked : true;
         const now = new Date();
         const dTitle = document.getElementById('doc-title') ? document.getElementById('doc-title').value : "";
         const dAuthor = document.getElementById('doc-author') ? document.getElementById('doc-author').value : "";
         const dSubject = document.getElementById('doc-subject') ? document.getElementById('doc-subject').value : "";
         const dKeywords = document.getElementById('doc-keywords') ? document.getElementById('doc-keywords').value : "";
         const documentData = {
            metadata: {
               creationDate: now.toLocaleDateString('fr-FR'),
               creationTime: now.toLocaleTimeString('fr-FR'),
               paperSize: paperSize,
               orientation: orientation,
               margins: marginSize,
               version: "2.0",
               footerText: fText,
               showPageNum: showNum,
               headerText: hText,
               title: dTitle,
               author: dAuthor,
               subject: dSubject,
               keywords: dKeywords
            },
            pages: [],
            auxiliaryData: {
               comments: window.documentComments
            }
         };
         const pageElements = document.querySelectorAll('#pages-container .page');
         pageElements.forEach(page => {
            documentData.pages.push(page.innerHTML);
         });
         const jsonString = JSON.stringify(documentData, null, 2);
         const blob = new Blob([jsonString], {
            type: 'application/json'
         });
         const a = document.createElement('a');
         a.href = URL.createObjectURL(blob);
         a.download = 'Document.dw';
         a.click();
      };
   });
   if (fileInput) {
      openBtns.forEach(openBtn => {
         openBtn.onclick = () => fileInput.click();
      });
      fileInput.onchange = (e) => {
         const file = e.target.files[0];
         if (!file) return;
         const reader = new FileReader();
         reader.onload = (evt) => {
            const content = evt.target.result;
            const container = document.getElementById('pages-container');
            try {
               const documentData = JSON.parse(content);
               if (documentData.metadata) {
                  if (document.getElementById('paper-size')) document.getElementById('paper-size').value = documentData.metadata.paperSize;
                  if (document.getElementById('margin-size')) document.getElementById('margin-size').value = documentData.metadata.margins;
                  const orientationRadio = document.querySelector(`input[name="orientation"][value="${documentData.metadata.orientation}"]`);
                  if (orientationRadio) orientationRadio.checked = true;
                  if (document.getElementById('header-text')) document.getElementById('header-text').value = documentData.metadata.headerText || "";
                  if (document.getElementById('footer-text')) document.getElementById('footer-text').value = documentData.metadata.footerText || "";
                  if (document.getElementById('show-page-num')) document.getElementById('show-page-num').checked = documentData.metadata.showPageNum !== false;
                  if (document.getElementById('doc-title')) document.getElementById('doc-title').value = documentData.metadata.title || "";
                  if (document.getElementById('doc-author')) document.getElementById('doc-author').value = documentData.metadata.author || "";
                  if (document.getElementById('doc-subject')) document.getElementById('doc-subject').value = documentData.metadata.subject || "";
                  if (document.getElementById('doc-keywords')) document.getElementById('doc-keywords').value = documentData.metadata.keywords || "";
                  if (typeof updateHeaderFooter === 'function') updateHeaderFooter();
               }
               container.innerHTML = '';
               window.documentComments = documentData.auxiliaryData?.comments || {};
               if (documentData.pages && documentData.pages.length > 0) {
                  documentData.pages.forEach((pageHTML, index) => {
                     const newPage = document.createElement('div');
                     newPage.className = 'page';
                     newPage.contentEditable = true;
                     newPage.addEventListener('input', () => rebalancePages(newPage));
                     newPage.addEventListener('focus', () => activePage = newPage);
                     newPage.addEventListener('keydown', (e) => {
                        if (e.key === 'Backspace') handleBackspace(newPage, e);
                     });
                     newPage.innerHTML = pageHTML;
                     container.appendChild(newPage);
                  });
               }
               else {
                  createNewPage();
               }
               if (typeof applyPageSettings === 'function') {
                  applyPageSettings();
               }
               if (typeof renderComments === 'function') {
                  renderComments();
                  closeCommentsPanel();
               }
            }
            catch (error) {
               console.log("Ancien format .dw détecté.");
               container.innerHTML = content;
               container.querySelectorAll('.page').forEach(p => {
                  p.contentEditable = true;
                  p.addEventListener('input', () => rebalancePages(p));
                  p.addEventListener('focus', () => activePage = p);
               });
            }
         };
         reader.readAsText(file);
      };
   }
}
if (importInput) {
   importInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;
      const extension = file.name.split('.').pop().toLowerCase();
      if (extension === 'docx') {
         if (typeof mammoth === 'undefined') {
            alert("Le moteur d'importation n'est pas prêt ou vous êtes hors ligne.");
            return;
         }
         const loader = document.getElementById('loader');
         if (loader) loader.style.display = 'flex';
         const reader = new FileReader();
         reader.onload = function (loadEvent) {
            const arrayBuffer = loadEvent.target.result;
            mammoth.convertToHtml({
                  arrayBuffer: arrayBuffer
               })
               .then(function (result) {
                  let htmlContent = result.value;
                  htmlContent = htmlContent.replace(/<table/g, '<table class="dw-table"');
                  htmlContent = htmlContent.replace(/<td><\/td>/g, '<td><br></td>');
                  const container = document.getElementById('pages-container');
                  container.innerHTML = '';
                  const firstPage = createNewPage();
                  firstPage.innerHTML = htmlContent;
                  setTimeout(() => {
                     if (typeof rebalancePages === 'function') {
                        rebalancePages(firstPage);
                     }
                     if (loader) loader.style.display = 'none';
                  }, 100);
                  if (result.messages.length > 0) console.log("Avertissements Word :", result.messages);
               })
               .catch(function (error) {
                  console.error("Erreur d'importation DOCX :", error);
                  alert("Impossible de lire ce fichier Word.");
                  if (loader) loader.style.display = 'none';
               });
         };
         reader.readAsArrayBuffer(file);
      }
      else if (extension === 'odt') {
         if (typeof JSZip === 'undefined') {
            alert("Le moteur ODT n'est pas prêt ou vous êtes hors ligne.");
            return;
         }
         const loader = document.getElementById('loader');
         if (loader) loader.style.display = 'flex';
         const reader = new FileReader();
         reader.onload = function (loadEvent) {
            const arrayBuffer = loadEvent.target.result;
            JSZip.loadAsync(arrayBuffer).then(function (zip) {
               return zip.file("content.xml").async("string");
            }).then(function (xmlString) {
               const parser = new DOMParser();
               const xmlDoc = parser.parseFromString(xmlString, "text/xml");
               const officeText = xmlDoc.getElementsByTagName("office:text")[0];
               let htmlContent = "";
               if (officeText) {
                  for (let node of officeText.childNodes) {
                     if (node.nodeName === "text:h") {
                        htmlContent += `<h2>${node.textContent}</h2>`;
                     }
                     else if (node.nodeName === "text:p") {
                        htmlContent += `<p>${node.textContent || "<br>"}</p>`;
                     }
                  }
               }
               const container = document.getElementById('pages-container');
               container.innerHTML = '';
               const firstPage = createNewPage();
               firstPage.innerHTML = htmlContent;
               setTimeout(() => {
                  if (typeof rebalancePages === 'function') rebalancePages(firstPage);
                  if (loader) loader.style.display = 'none';
               }, 100);
            }).catch(function (err) {
               console.error("Erreur ODT :", err);
               alert("Impossible de lire ce fichier ODT.");
               if (loader) loader.style.display = 'none';
            });
         };
         reader.readAsArrayBuffer(file);
      }
      else {
         alert("Format non supporté. Veuillez choisir un .docx ou un .odt");
      }
      e.target.value = '';
   });
}

function openSearchReplace() {
   const modal = document.getElementById('search-replace-modal');
   if (modal) {
      modal.style.display = 'block';
      document.getElementById('sr-search-input').focus();
   }
};

function closeSearchReplace() {
   const modal = document.getElementById('search-replace-modal');
   if (modal) modal.style.display = 'none';
};
document.addEventListener('keydown', function (e) {
   if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
      e.preventDefault();
      openSearchReplace();
   }
});

function findNextText() {
   const text = document.getElementById('sr-search-input').value;
   if (!text) return;
   const found = window.find(text, false, false, true);
   if (!found) alert("Texte introuvable dans le document.");
};

function replaceCurrentText() {
   const replaceText = document.getElementById('sr-replace-input').value;
   const sel = window.getSelection();
   if (!sel.isCollapsed) {
      document.execCommand('insertText', false, replaceText);
      findNextText();
      const activePage = sel.anchorNode.closest('.page');
      if (activePage && typeof rebalancePages === 'function') rebalancePages(activePage);
   }
   else {
      findNextText();
   }
};

function replaceAllText() {
   const searchText = document.getElementById('sr-search-input').value;
   const replaceText = document.getElementById('sr-replace-input').value;
   if (!searchText) return;
   window.getSelection().removeAllRanges();
   let count = 0;
   while (window.find(searchText, false, false, false)) {
      document.execCommand('insertText', false, replaceText);
      count++;
   }
   if (count > 0) {
      alert(count + " remplacement(s) effectué(s).");
      const firstPage = document.querySelector('.page');
      if (firstPage && typeof rebalancePages === 'function') rebalancePages(firstPage);
   }
   else {
      alert("Texte introuvable.");
   }
};

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
let currentEditingGraphId = null;
window.openChartSelection = function () {
   document.getElementById('modal-chart-select').style.display = 'block';
};
window.insertNewChart = function (type) {
   document.getElementById('modal-chart-select').style.display = 'none';
   const defaultData = [{
      label: "A",
      val: 10
   }, {
      label: "B",
      val: 25
   }, {
      label: "C",
      val: 15
   }, {
      label: "D",
      val: 40
   }];
   const id = 'chart-' + Date.now();
   const dataJSON = JSON.stringify(defaultData).replace(/"/g, '&quot;');
   const html = `<p><br></p>
        <div class="dw-html-chart" id="${id}" data-chart-type="${type}" data-chart-json="${dataJSON}" contenteditable="false">
            <div class="dw-chart-overlay">
                <button class="dw-chart-btn dw-btn-edit" onclick="openEditChart('${id}')">Modifier</button>
                <button class="dw-chart-btn dw-btn-delete" onclick="deleteChart('${id}')">Supprimer</button>
            </div>
            <div class="dw-chart-title">Titre du graphique</div>
            <div class="dw-chart-render" id="render-${id}"></div>
        </div><p><br></p> <p><br></p>
    `;
   insertAtCursorHTML(html);
   setTimeout(() => renderChartVisuals(id), 50);
};
window.renderChartVisuals = function (id) {
   const container = document.getElementById(id);
   if (!container) return;
   const type = container.getAttribute('data-chart-type');
   const titleText = container.querySelector('.dw-chart-title');
   const renderZone = document.getElementById(`render-${id}`);
   const dataRaw = container.getAttribute('data-chart-json');
   let data = [];
   try {
      data = JSON.parse(dataRaw.replace(/&quot;/g, '"'));
   }
   catch (e) {
      return;
   }
   const maxVal = Math.max(...data.map(d => parseFloat(d.val) || 0), 1);
   const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
   renderZone.innerHTML = '';
   if (type === 'bar') {
      renderZone.style.borderBottom = '2px solid #9ca3af';
      renderZone.style.borderLeft = '2px solid #9ca3af';
      data.forEach(d => {
         const h = ((parseFloat(d.val) || 0) / maxVal) * 100;
         renderZone.innerHTML += `
                <div class="dw-bar-col">
                    <div class="dw-bar-val">${d.val}</div>
                    <div class="dw-bar-fill" style="height: ${h}%;"></div>
                    <div class="dw-bar-label">${d.label}</div>
                </div>
            `;
      });
   }
   else if (type === 'line') {
      renderZone.style.borderBottom = '2px solid #9ca3af';
      renderZone.style.borderLeft = '2px solid #9ca3af';
      let points = data.map((d, index) => {
         let x = (index / Math.max(1, data.length - 1)) * 100;
         let y = 100 - (((parseFloat(d.val) || 0) / maxVal) * 100);
         return `${x},${y}`;
      }).join(' ');
      let circlesHTML = data.map((d, index) => {
         let x = (index / Math.max(1, data.length - 1)) * 100;
         let y = 100 - (((parseFloat(d.val) || 0) / maxVal) * 100);
         return `<circle cx="${x}" cy="${y}" r="2" fill="#ef4444"/>
                    <text x="${x}" y="${y-4}" font-size="4" fill="#666" text-anchor="middle">${d.val}</text>`;
      }).join('');
      renderZone.innerHTML = `
            <svg viewBox="0 -5 100 110" style="width:100%; height:100%; overflow:visible;">
                <polyline points="${points}" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round"/>
                ${circlesHTML}
            </svg>
        `;
   }
   else if (type === 'pie') {
      renderZone.style.borderBottom = 'none';
      renderZone.style.borderLeft = 'none';
      let total = data.reduce((sum, d) => sum + (parseFloat(d.val) || 0), 0);
      let gradientStr = [];
      let currentPercent = 0;
      let legendHTML = '';
      data.forEach((d, i) => {
         let val = parseFloat(d.val) || 0;
         let percent = (val / total) * 100;
         let color = colors[i % colors.length];
         gradientStr.push(`${color} ${currentPercent}% ${currentPercent + percent}%`);
         currentPercent += percent;
         legendHTML += `<div style="display:flex; align-items:center; font-size:12px; margin-bottom:4px;">
                <span style="display:inline-block; width:12px; height:12px; background:${color}; margin-right:8px; border-radius:3px;"></span>
                ${d.label} (${val})
            </div>`;
      });
      renderZone.innerHTML = `
            <div style="display:flex; width:100%; align-items:center; justify-content:center; gap:30px;">
                <div class="dw-pie-chart" style="background: conic-gradient(${gradientStr.join(', ')});"></div>
                <div style="display:flex; flex-direction:column; justify-content:center;">${legendHTML}</div>
            </div>
        `;
   }
   else if (type === 'hbar') {
      renderZone.style.borderBottom = 'none';
      renderZone.style.borderLeft = 'none';
      renderZone.style.flexDirection = 'column';
      renderZone.style.justifyContent = 'center';
      renderZone.style.alignItems = 'stretch';
      data.forEach(d => {
         const w = ((parseFloat(d.val) || 0) / maxVal) * 100;
         const isSmall = w < 15;
         renderZone.innerHTML += `
                <div class="dw-hbar-row">
                    <div class="dw-hbar-label" title="${d.label}">${d.label}</div>
                    <div class="dw-hbar-track">
                        <div class="dw-hbar-fill" style="width: ${w}%;">
                            ${!isSmall ? `<span class="dw-hbar-val-in">${d.val}</span>` : ''}
                        </div>
                        ${isSmall ? `<span class="dw-hbar-val-out">${d.val}</span>` : ''}
                    </div>
                </div>
            `;
      });
   }
   else if (type === 'lineplus') {
      renderZone.style.borderBottom = 'none';
      renderZone.style.borderLeft = 'none';
      const chartWidth = 95;
      const chartHeight = 85;
      const offsetX = 15;
      const offsetY = 5;
      let points = data.map((d, index) => {
         let x = offsetX + (index / Math.max(1, data.length - 1)) * chartWidth;
         let y = offsetY + chartHeight - (((parseFloat(d.val) || 0) / maxVal) * chartHeight);
         return `${x},${y}`;
      }).join(' ');
      let circlesHTML = data.map((d, index) => {
         let x = offsetX + (index / Math.max(1, data.length - 1)) * chartWidth;
         let y = offsetY + chartHeight - (((parseFloat(d.val) || 0) / maxVal) * chartHeight);
         return `<circle cx="${x}" cy="${y}" r="2" fill="#ef4444"/>`;
      }).join('');
      let yAxisHTML = `
            <line x1="${offsetX}" y1="${offsetY}" x2="${offsetX}" y2="${offsetY + chartHeight}" stroke="#9ca3af" stroke-width="0.5"/>
            <text x="${offsetX - 2}" y="${offsetY + 2}" font-size="4" fill="#6b7280" text-anchor="end">${maxVal}</text>
            <text x="${offsetX - 2}" y="${offsetY + (chartHeight / 2) + 1.5}" font-size="4" fill="#6b7280" text-anchor="end">${Math.round(maxVal/2)}</text>
            <text x="${offsetX - 2}" y="${offsetY + chartHeight}" font-size="4" fill="#6b7280" text-anchor="end">0</text>
        `;
      let xAxisHTML = `
            <line x1="${offsetX}" y1="${offsetY + chartHeight}" x2="${offsetX + chartWidth}" y2="${offsetY + chartHeight}" stroke="#9ca3af" stroke-width="0.5"/>
        `;
      let xLabelsHTML = data.map((d, index) => {
         let x = offsetX + (index / Math.max(1, data.length - 1)) * chartWidth;
         let shortLabel = d.label.length > 6 ? d.label.substring(0, 5) + '.' : d.label;
         return `<text x="${x}" y="${offsetY + chartHeight + 7}" font-size="4" fill="#4b5563" text-anchor="middle">${shortLabel}</text>`;
      }).join('');
      renderZone.innerHTML = `
            <svg viewBox="0 0 115 105" style="width:100%; height:100%; overflow:visible; font-family: sans-serif;">
                ${yAxisHTML}
                ${xAxisHTML}
                ${xLabelsHTML}
                <polyline points="${points}" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linejoin="round"/>
                ${circlesHTML}
            </svg>
        `;
   }
};
window.deleteChart = function (id) {
   const chart = document.getElementById(id);
   if (chart) {
      const page = chart.closest('.page');
      chart.remove();
      if (page && typeof rebalancePages === 'function') rebalancePages(page);
   }
};
window.openEditChart = function (id) {
   currentEditingGraphId = id;
   const container = document.getElementById(id);
   document.getElementById('edit-chart-title').value = container.querySelector('.dw-chart-title').innerText;
   const type = container.getAttribute('data-chart-type');
   const mathZone = document.getElementById('math-function-zone');
   mathZone.style.display = (type === 'line') ? 'block' : 'none';
   const dataRaw = container.getAttribute('data-chart-json');
   let data = JSON.parse(dataRaw.replace(/&quot;/g, '"'));
   const tbody = document.getElementById('edit-chart-tbody');
   tbody.innerHTML = '';
   data.forEach(d => addChartDataRow(d.label, d.val));
   document.getElementById('modal-chart-edit').style.display = 'block';
};
window.addChartDataRow = function (label = "Nouv.", val = 10) {
   const tbody = document.getElementById('edit-chart-tbody');
   const tr = document.createElement('tr');
   tr.innerHTML = `
        <td><input type="text" class="edit-label-input" value="${label}" style="width:100%; padding:4px;"></td>
        <td><input type="number" class="edit-val-input" value="${val}" style="width:100%; padding:4px;"></td>
        <td><button onclick="this.closest('tr').remove()" style="color:red; cursor:pointer; background:none; border:none; font-weight:bold;">X</button></td>
    `;
   tbody.appendChild(tr);
};
window.saveChartData = function () {
   if (!currentEditingGraphId) return;
   const container = document.getElementById(currentEditingGraphId);
   container.querySelector('.dw-chart-title').innerText = document.getElementById('edit-chart-title').value;
   const labels = document.querySelectorAll('.edit-label-input');
   const vals = document.querySelectorAll('.edit-val-input');
   let newData = [];
   for (let i = 0; i < labels.length; i++) {
      newData.push({
         label: labels[i].value,
         val: vals[i].value
      });
   }
   container.setAttribute('data-chart-json', JSON.stringify(newData).replace(/"/g, '&quot;'));
   renderChartVisuals(currentEditingGraphId);
   document.getElementById('modal-chart-edit').style.display = 'none';
};
window.generateMathFunction = function () {
   const funcStr = document.getElementById('math-func-input').value;
   if (!funcStr) return;
   const tbody = document.getElementById('edit-chart-tbody');
   tbody.innerHTML = '';
   for (let x = 1; x <= 10; x++) {
      try {
         const mathFunc = new Function('x', `return ${funcStr};`);
         let y = mathFunc(x);
         y = Math.round(y * 100) / 100;
         addChartDataRow(`x=${x}`, y);
      }
      catch (e) {
         alert("Erreur dans la formule mathématique. Essayez 'x * 2' ou 'Math.sin(x)'");
         break;
      }
   }
};

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

function saveHistoryState() {
    if (isRestoringHistory) return;
    
    const container = document.getElementById('pages-container');
    if (!container) return;

    const currentState = container.innerHTML;

    if (undoStack.length > 0 && undoStack[undoStack.length - 1] === currentState) return;

    undoStack.push(currentState);
    if (undoStack.length > MAX_HISTORY) undoStack.shift();

    redoStack = [];
};

function scheduleHistorySave() {
    if (isRestoringHistory) return;
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        saveHistoryState();
    }, 800);
};

function performUndo() {
    if (undoStack.length <= 1) return;

    const container = document.getElementById('pages-container');
    if (!container) return;

    isRestoringHistory = true;

    redoStack.push(undoStack.pop());

    const previousState = undoStack[undoStack.length - 1];
    container.innerHTML = previousState;

    reattachPageListeners();

    isRestoringHistory = false;
};

function performRedo() {
    if (redoStack.length === 0) return;

    const container = document.getElementById('pages-container');
    if (!container) return;

    isRestoringHistory = true;
    const nextState = redoStack.pop();
    undoStack.push(nextState);
    container.innerHTML = nextState;

    reattachPageListeners();

    isRestoringHistory = false;
};

function reattachPageListeners() {
    document.querySelectorAll('.page').forEach(page => {
        page.contentEditable = true;
        
        page.oninput = () => {
            scheduleHistorySave();
            if (typeof rebalancePages === 'function') rebalancePages(page);
        };
        
        page.onfocus = () => window.activePage = page;
        
        page.onkeydown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); performUndo(); return; }
            if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); performRedo(); return; }
            
            if (e.key === 'Backspace' && typeof handleBackspace === 'function') handleBackspace(page, e);
        };
    });
};