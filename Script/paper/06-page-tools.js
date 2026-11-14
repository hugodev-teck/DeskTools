
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

