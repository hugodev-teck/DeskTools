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
