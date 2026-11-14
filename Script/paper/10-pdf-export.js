async function exportToPDF() {
   const container = document.getElementById('pages-container');
   if (!container) return;
   const paperSize = document.getElementById('paper-size') ? document.getElementById('paper-size').value : 'A4';
   const orientationEl = document.querySelector('input[name="orientation"]:checked');
   const orientation = orientationEl ? orientationEl.value : 'portrait';
   if (typeof currentSelectedImage !== 'undefined' && currentSelectedImage) {
      currentSelectedImage.classList.remove('dw-image-selected');
      currentSelectedImage.querySelectorAll('.resize-handle').forEach(h => h.remove());
   }

   let profileMetadata;
   try {
      profileMetadata = await getPrismDocumentMetadata(
         Array.from(container.querySelectorAll('.page'), page => page.innerHTML).join("")
      );
   } catch (error) {
      console.error("Impossible de préparer les métadonnées du document.", error);
      alert(error.message || "Impossible de préparer les métadonnées du document.");
      return;
   }

   document.body.classList.add('pdf-export-mode');
   const pdfKeywords = [
      profileMetadata.email,
      profileMetadata.firstName,
      profileMetadata.lastName,
      profileMetadata.role,
      profileMetadata.fingerprint && `${profileMetadata.fingerprint.algorithm}:${profileMetadata.fingerprint.value}`
   ].filter(Boolean).join(', ');
   const opt = {
      margin: 0,
      filename: typeof window.getPaperDocumentFileName === 'function'
         ? window.getPaperDocumentFileName('pdf')
         : 'Document_Paper.pdf',
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
   const pdfProperties = {
      title: (typeof window.getPaperDocumentTitle === 'function'
         ? window.getPaperDocumentTitle()
         : document.getElementById('doc-title')?.value.trim()) || 'Document sans titre',
      author: document.getElementById('doc-author')?.value || profileMetadata.author || '',
      subject: profileMetadata.role || '',
      keywords: pdfKeywords,
      creator: 'PRISM Paper'
   };
   html2pdf().set(opt).from(container).toPdf().get('pdf').then(pdf => {
      pdf.setProperties(pdfProperties);
   }).save().then(() => {
      document.body.classList.remove('pdf-export-mode');
   }).catch(err => {
      console.error("Erreur lors de la génération du PDF", err);
      document.body.classList.remove('pdf-export-mode');
   });
};
