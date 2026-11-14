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
