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

