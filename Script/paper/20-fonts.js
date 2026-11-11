window.customFonts = JSON.parse(localStorage.getItem('dw_custom_fonts')) || {};

const importFontBtn = document.getElementById('import-font-btn');
const customFontInput = document.getElementById('custom-font-input');
const fontSelect = document.getElementById('font-family');

window.registerCustomFont = async function(fontSystemName, displayName, dataUrl) {
    try {
        const customFont = new FontFace(fontSystemName, `url(${dataUrl})`);
        const loadedFont = await customFont.load();
        document.fonts.add(loadedFont);

        let customGroup = document.getElementById('custom-fonts-optgroup');
        if (!customGroup) {
            customGroup = document.createElement('optgroup');
            customGroup.id = 'custom-fonts-optgroup';
            customGroup.label = 'Vos Polices (Importées)';
            if (fontSelect) fontSelect.appendChild(customGroup);
        }

        if (!Array.from(customGroup.children).some(opt => opt.value === fontSystemName)) {
            const newOption = document.createElement('option');
            newOption.value = fontSystemName;
            newOption.textContent = displayName;
            newOption.style.fontFamily = fontSystemName; 
            customGroup.appendChild(newOption);
        }
    } catch (err) {
        console.error("Erreur lors de l'injection de la police :", err);
    }
};

Object.keys(window.customFonts).forEach(key => {
    registerCustomFont(key, window.customFonts[key].displayName, window.customFonts[key].dataUrl);
});

if (importFontBtn && customFontInput) {
    importFontBtn.onclick = (e) => {
        e.preventDefault();
        customFontInput.click();
    };

    customFontInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const displayName = file.name.substring(0, file.name.lastIndexOf('.'));
        const fontSystemName = 'CustomFont_' + Date.now();

        const reader = new FileReader();
        reader.onload = async (evt) => {
            const dataUrl = evt.target.result;
            
            window.customFonts[fontSystemName] = { displayName, dataUrl };
            localStorage.setItem('dw_custom_fonts', JSON.stringify(window.customFonts));

            await registerCustomFont(fontSystemName, displayName, dataUrl);
            if (fontSelect) fontSelect.value = fontSystemName;
            document.execCommand('fontName', false, fontSystemName);

            const activePage = document.querySelector('.page');
            if (activePage && typeof rebalancePages === 'function') {
                setTimeout(() => rebalancePages(activePage), 50);
            }
        };
        reader.readAsDataURL(file); 
        
        e.target.value = '';
    });
}

document.addEventListener('selectionchange', () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    let node = sel.focusNode;
    if (!node) return;
    
    if (node.nodeType === 3) node = node.parentNode; 

    if (!node.closest('.page')) return;

    const fontSelect = document.getElementById('font-family');
    const sizeSelect = document.getElementById('font-size');

    if (fontSelect) {
        let fontName = document.queryCommandValue('fontName');
        if (!fontName) {
            fontName = window.getComputedStyle(node).fontFamily;
        }
        
        if (fontName) {
            fontName = fontName.replace(/['"]/g, '').split(',')[0].trim();
            
            for (let opt of fontSelect.options) {
                if (opt.value.toLowerCase() === fontName.toLowerCase() || opt.text.toLowerCase() === fontName.toLowerCase()) {
                    fontSelect.value = opt.value;
                    break;
                }
            }
        }
    }

    if (sizeSelect) {
        let execSize = document.queryCommandValue('fontSize');
        
        const reverseSizeMap = { "1": "8", "2": "10", "3": "12", "4": "14", "5": "20", "6": "24", "7": "36" };
        
        if (execSize && reverseSizeMap[execSize]) {
            sizeSelect.value = reverseSizeMap[execSize];
        } else {
            let pxSize = window.getComputedStyle(node).fontSize;
            if (pxSize) {
                let pxVal = parseFloat(pxSize);
                let ptVal = Math.round(pxVal * 0.75); 
                
                let bestOption = "12";
                let minDiff = Infinity;
                for (let opt of sizeSelect.options) {
                    let optVal = parseInt(opt.value);
                    let diff = Math.abs(optVal - ptVal);
                    if (diff < minDiff) {
                        minDiff = diff;
                        bestOption = opt.value;
                    }
                }
                sizeSelect.value = bestOption;
            }
        }
    }
});

