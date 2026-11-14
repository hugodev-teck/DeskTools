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

