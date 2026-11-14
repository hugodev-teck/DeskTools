function setupFileIO() {
   const saveBtns = document.querySelectorAll('#save');
   const openBtns = document.querySelectorAll('#open');
   const fileInput = document.getElementById('file-input');
   
   saveBtns.forEach(saveBtn => {
   saveBtn.onclick = async () => {
         const saveVersion = typeof window.getPaperDocumentVersion === 'function'
            ? window.getPaperDocumentVersion()
            : undefined;
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
         const dTitle = typeof window.getPaperDocumentTitle === 'function'
            ? window.getPaperDocumentTitle()
            : (document.getElementById('doc-title') ? document.getElementById('doc-title').value.trim() : "");
         const dAuthor = document.getElementById('doc-author') ? document.getElementById('doc-author').value : "";
         const dSubject = document.getElementById('doc-subject') ? document.getElementById('doc-subject').value : "";
         const dKeywords = document.getElementById('doc-keywords') ? document.getElementById('doc-keywords').value : "";
         
         const pageElements = document.querySelectorAll('#pages-container .page');
         const pageSnapshots = Array.from(pageElements, page => ({
            html: page.innerHTML,
            drawing: page.getAttribute('data-draw-data') || null
         }));
         
         const fullHtml = pageSnapshots.map(page => page.html).join('');

         let profileMetadata;
         try {
            profileMetadata = await getPrismDocumentMetadata(fullHtml);
         } catch (error) {
            console.error("Impossible de préparer les métadonnées du document.", error);
            alert(error.message || "Impossible de préparer les métadonnées du document.");
            return;
         }
         
         const usedFonts = {};
         if (window.customFonts) {
             Object.keys(window.customFonts).forEach(fontKey => {
                 if (fullHtml.includes(fontKey)) {
                     usedFonts[fontKey] = window.customFonts[fontKey];
                 }
             });
         }

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
               subject: dSubject,
               keywords: dKeywords,
               ...profileMetadata,
               author: dAuthor || profileMetadata.author || ""
            },
            pages: [],
            drawings: [], // NOUVEAU : On stocke les dessins séparément
            auxiliaryData: {
               comments: window.documentComments,
               customFonts: usedFonts
            }
         };
         
         // On sauvegarde le texte et le dessin pour chaque page
         pageSnapshots.forEach(page => {
            documentData.pages.push(page.html);
            documentData.drawings.push(page.drawing);
         });
         
         const jsonString = JSON.stringify(documentData, null, 2);
         const blob = new Blob([jsonString], {
            type: 'application/json'
         });
         const a = document.createElement('a');
         a.href = URL.createObjectURL(blob);
         a.download = typeof window.getPaperDocumentFileName === 'function'
            ? window.getPaperDocumentFileName('dw')
            : 'Document.dw';
         a.click();
         if (typeof window.markPaperDocumentSaved === 'function') {
            window.markPaperDocumentSaved(saveVersion);
         }
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
               
               // --- SÉCURITÉ DE RÉTROCOMPATIBILITÉ TOTALE ---
               const metadata = documentData.metadata || {};
               const pagesData = documentData.pages || [];
               const drawingsData = documentData.drawings || [];
               const auxiliaryData = documentData.auxiliaryData || {};
               // ---------------------------------------------

               // Application des métadonnées avec valeurs de secours
               if (document.getElementById('paper-size')) document.getElementById('paper-size').value = metadata.paperSize || 'A4';
               if (document.getElementById('margin-size')) document.getElementById('margin-size').value = metadata.margins || 'normal';
               
               const orientationRadio = document.querySelector(`input[name="orientation"][value="${metadata.orientation || 'portrait'}"]`);
               if (orientationRadio) orientationRadio.checked = true;
               
               if (document.getElementById('header-text')) document.getElementById('header-text').value = metadata.headerText || "";
               if (document.getElementById('footer-text')) document.getElementById('footer-text').value = metadata.footerText || "";
               if (document.getElementById('show-page-num')) document.getElementById('show-page-num').checked = metadata.showPageNum !== false;
               if (document.getElementById('doc-title')) document.getElementById('doc-title').value = metadata.title || "";
               if (typeof window.syncPaperDocumentTitle === 'function') window.syncPaperDocumentTitle();
               if (document.getElementById('doc-author')) document.getElementById('doc-author').value = metadata.author || "";
               if (!metadata.author && typeof applyPrismAuthorProfile === 'function') applyPrismAuthorProfile();
               if (document.getElementById('doc-subject')) document.getElementById('doc-subject').value = metadata.subject || "";
               if (document.getElementById('doc-keywords')) document.getElementById('doc-keywords').value = metadata.keywords || "";
               
               if (typeof updateHeaderFooter === 'function') updateHeaderFooter();
               
               // Chargement sécurisé des commentaires
               window.documentComments = auxiliaryData.comments || {};
               
               // Chargement sécurisé des polices personnalisées
               if (auxiliaryData.customFonts) {
                   const importedFonts = auxiliaryData.customFonts;
                   Object.keys(importedFonts).forEach(key => {
                       if (!window.customFonts[key]) {
                           window.customFonts[key] = importedFonts[key];
                           if (typeof registerCustomFont === 'function') {
                               registerCustomFont(key, importedFonts[key].displayName, importedFonts[key].dataUrl);
                           }
                       }
                   });
                   localStorage.setItem('dw_custom_fonts', JSON.stringify(window.customFonts));
               }
               
               container.innerHTML = '';
               
               // Reconstruction des pages (gère aussi le cas des très vieux fichiers où pagesData pouvait être vide)
               if (pagesData.length > 0) {
                  pagesData.forEach((pageHTML, index) => {
                     const newPage = document.createElement('div');
                     newPage.className = 'page';
                     newPage.contentEditable = true;
                     newPage.addEventListener('input', () => rebalancePages(newPage));
                     newPage.addEventListener('focus', () => activePage = newPage);
                     newPage.addEventListener('keydown', (e) => {
                        if (e.key === 'Backspace') handleBackspace(newPage, e);
                     });
                     
                     // Restauration du dessin associé à la page s'il existe
                     if (drawingsData[index]) {
                         newPage.setAttribute('data-draw-data', drawingsData[index]);
                     }
                     
                     newPage.innerHTML = window.cleanHTML(pageHTML);
                     container.appendChild(newPage);

                     // Restauration des événements LaTeX
                     newPage.querySelectorAll('.dw-latex-wrapper').forEach(wrapper => {
                        const latexId = wrapper.id;
                        wrapper.setAttribute('contenteditable', 'false');
                        wrapper.onmouseenter = () => showLatexOverlay(wrapper, latexId);
                        wrapper.onmouseleave = () => hideLatexOverlay();
                    });
                  });
                  
                  // Synchronisation du calque fantôme pour les dessins
                  if (typeof window.syncDrawingsLayer === 'function') {
                      setTimeout(window.syncDrawingsLayer, 100);
                  }
               }
               else {
                  // Si vraiment le tableau de pages est vide, on crée une page par défaut
                  createNewPage();
               }

               if (typeof applyPageSettings === 'function') {
                  applyPageSettings();
               }
               if (typeof renderComments === 'function') {
                  renderComments();
                  closeCommentsPanel();
               }
               if (typeof window.markPaperDocumentSaved === 'function') {
                  window.markPaperDocumentSaved();
               }
            }
            catch (error) {
               // Ce bloc ne s'activera plus que si le fichier JSON est syntaxiquement invalide (corrompu)
               alert("Erreur critique : Format .dw invalide ou corrompu.");
               console.error(error);
            }
            updateStatusBar();
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
                  if (typeof window.markPaperDocumentDirty === 'function') {
                     window.markPaperDocumentDirty();
                  }
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
               if (typeof window.markPaperDocumentDirty === 'function') {
                  window.markPaperDocumentDirty();
               }
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
