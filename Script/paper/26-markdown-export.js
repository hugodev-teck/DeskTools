window.exportToMarkdown = async function() {
    const pages = document.querySelectorAll('.page');
    let mdContent = "";
    
    // Récupération des métadonnées pour l'en-tête du fichier (Frontmatter)
    const title = typeof window.getPaperDocumentTitle === 'function'
        ? (window.getPaperDocumentTitle() || "Document sans titre")
        : (document.getElementById('doc-title') ? document.getElementById('doc-title').value.trim() : "Document sans titre");
    let profileMetadata;
    try {
        profileMetadata = await getPrismDocumentMetadata(
            Array.from(pages, page => page.innerHTML).join("")
        );
    } catch (error) {
        console.error("Impossible de préparer les métadonnées du document.", error);
        alert(error.message || "Impossible de préparer les métadonnées du document.");
        return;
    }
    const authorInput = document.getElementById('doc-author');
    const author = authorInput ? authorInput.value.trim() : "";
    const metadata = {
        title,
        author: author || profileMetadata.author || "",
        email: profileMetadata.email || "",
        firstName: profileMetadata.firstName || "",
        lastName: profileMetadata.lastName || "",
        role: profileMetadata.role || "",
        date: new Date().toLocaleDateString('fr-FR')
    };
    if (profileMetadata.fingerprint) {
        metadata.fingerprint = profileMetadata.fingerprint.value;
        metadata.fingerprintAlgorithm = profileMetadata.fingerprint.algorithm;
    }

    const frontmatter = Object.entries(metadata)
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
    if (frontmatter.length > 0) {
        mdContent += `---\n${frontmatter.join("\n")}\n---\n\n`;
    }

    pages.forEach((page, index) => {
        // On clone la page pour la manipuler sans toucher au document visible
        let clone = page.cloneNode(true);

        // 1. Sauvetage du LaTeX : on remplace la balise par le texte brut de l'équation
        clone.querySelectorAll('.dw-latex-wrapper').forEach(latex => {
            const raw = latex.getAttribute('data-latex-raw') || '';
            const textNode = document.createTextNode(`\n\n$$ ${raw.replace(/\\n/g, ' ')} $$\n\n`);
            latex.parentNode.replaceChild(textNode, latex);
        });

        // 2. Suppression des éléments non-exportables en texte (Dessins, Sommaire automatique)
        clone.querySelectorAll('.dw-page-canvas, .dw-drawing-overlay, .dw-toc-header, .dw-toc-line').forEach(el => el.remove());

        let html = clone.innerHTML;
        
        // 3. Remplacements HTML vers Markdown (Regex)
        // Titres
        html = html.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n\n');
        html = html.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n\n');
        html = html.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n\n');
        html = html.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n\n');
        
        // Formatage de base
        html = html.replace(/<(b|strong)[^>]*>(.*?)<\/\1>/gi, '**$2**');
        html = html.replace(/<(i|em)[^>]*>(.*?)<\/\1>/gi, '*$2*');
        html = html.replace(/<u[^>]*>(.*?)<\/u>/gi, '$1'); // Le MD ne gère pas le souligné nativement
        
        // Listes
        html = html.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
        html = html.replace(/<ul[^>]*>/gi, '\n');
        html = html.replace(/<\/ul>/gi, '\n');
        html = html.replace(/<ol[^>]*>/gi, '\n');
        html = html.replace(/<\/ol>/gi, '\n');
        
        // Tableaux (Conversion simplifiée : on extrait juste le texte avec des séparateurs)
        html = html.replace(/<tr[^>]*>/gi, '\n| ');
        html = html.replace(/<\/tr>/gi, ' |');
        html = html.replace(/<(td|th)[^>]*>/gi, ' ');
        html = html.replace(/<\/(td|th)>/gi, ' |');
        
        // Paragraphes et retours chariot
        html = html.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
        html = html.replace(/<br\s*[\/]?>/gi, '\n');
        html = html.replace(/<div>(.*?)<\/div>/gi, '$1\n');
        html = html.replace(/&nbsp;/g, ' ');

        // Nettoyage final : on supprime toutes les balises HTML restantes
        html = html.replace(/<[^>]+>/g, '');
        
        // Décodage des entités HTML (&amp; -> &)
        html = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

        // On ajoute le contenu de la page nettoyée, avec un séparateur horizontal Markdown
        mdContent += html.trim() + "\n\n---\n\n";
    });

    // Téléchargement du fichier
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = typeof window.getPaperDocumentFileName === 'function'
        ? window.getPaperDocumentFileName('md')
        : `${title.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_') || 'Document_Paper'}.md`;
    a.click();
};

document.addEventListener('input', triggerIfPage);
document.addEventListener('keyup', triggerIfPage);
document.addEventListener('mouseup', triggerIfPage);

window.addEventListener('DOMContentLoaded', updateStatusBar);
