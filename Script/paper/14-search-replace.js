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

