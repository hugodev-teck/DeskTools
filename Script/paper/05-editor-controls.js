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
