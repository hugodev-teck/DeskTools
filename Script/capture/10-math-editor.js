//-----------------------------------------------------------------------Math Formula Editor Modal-----------------------------------------------------------

// Charger MathJax pour le rendu des formules
const loadMathJax = () => {
    if (!window.MathJax) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        script.async = true;
        document.head.appendChild(script);
    }
};

// Créer le modal pour l'éditeur de formules mathématiques
const createMathEditorModal = () => {
    const modal = document.createElement('div');
    modal.id = 'math-editor-modal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = '#fff';
    modal.style.border = '1px solid #ccc';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
    modal.style.zIndex = '1003';
    modal.style.display = 'block';
    modal.style.width = '500px';

    modal.innerHTML = `
        <h3>Éditeur de Formules Mathématiques</h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
            <!-- Zone de texte pour LaTeX -->
            <textarea id="math-latex-input" rows="4" placeholder="Écrivez votre formule en LaTeX..." style="width: 100%;"></textarea>

            <!-- Zone de rendu -->
            <div id="math-render" style="min-height: 50px; border: 1px solid #ddd; padding: 10px; font-size: 18px; background-color: #f9f9f9;">
                <!-- Le rendu sera inséré ici -->
            </div>

            <!-- Panneau des boutons -->
            <div id="math-toolbar" style="display: flex; flex-wrap: wrap; gap: 5px;">
                <button class="math-button" data-latex="\\frac{}{}">Fraction</button>
                <button class="math-button" data-latex="\\sqrt{}">Racine</button>
                <button class="math-button" data-latex="\\sum">Somme</button>
                <button class="math-button" data-latex="\\int">Intégrale</button>
                <button class="math-button" data-latex="\\pi">Pi</button>
                <button class="math-button" data-latex="\\theta">Thêta</button>
                <button class="math-button" data-latex="\\infty">Infini</button>
                <button class="math-button" data-latex="\\div">Division</button>
            </div>

            <!-- Boutons d'action -->
            <div style="margin-top: 10px; display: flex; justify-content: space-between;">
                <button id="insert-math-editor" style="background-color: #4CAF50; color: white; padding: 5px 10px;">Insérer</button>
                <button id="close-math-editor" style="background-color: #f44336; color: white; padding: 5px 10px;">Annuler</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Gestion des événements
    const latexInput = document.getElementById('math-latex-input');
    const renderDiv = document.getElementById('math-render');

    latexInput.addEventListener('input', () => {
        renderMath(latexInput.value, renderDiv);
    });

    document.querySelectorAll('.math-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const latex = event.target.dataset.latex;
            latexInput.value += latex;
            renderMath(latexInput.value, renderDiv);
        });
    });

    document.getElementById('insert-math-editor').addEventListener('click', () => {
        insertMathToEditor(latexInput.value);
        closeMathEditorModal();
    });

    document.getElementById('close-math-editor').addEventListener('click', closeMathEditorModal);
};

// Fonction pour afficher le modal
const openMathEditorModal = () => {
    const modal = document.getElementById('math-editor-modal');
    if (modal) {
        modal.style.display = 'block';
    }
};

// Fonction pour fermer le modal
const closeMathEditorModal = () => {
    const modal = document.getElementById('math-editor-modal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('math-latex-input').value = '';
        document.getElementById('math-render').innerHTML = '';
    }
};

// Fonction pour rendre les formules avec MathJax
const renderMath = (latex, element) => {
    if (window.MathJax) {
        element.innerHTML = `\\(${latex}\\)`;
        MathJax.typesetPromise([element]);
    }
};

// Fonction pour insérer la formule dans l'éditeur
const insertMathToEditor = (latex) => {
    const formulaHtml = `<span class="math-formula" style="font-family: 'Courier New', Courier, monospace; background-color: #f9f9f9; border: 1px solid #ccc; padding: 2px 4px; border-radius: 4px;">\\(${latex}\\)</span>`;
    editor.focus();
    document.execCommand('insertHTML', false, formulaHtml);
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
};
