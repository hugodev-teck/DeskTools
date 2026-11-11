let isDrawingMode = false;
let currentTool = 'freehand';
let currentColor = '#000000';
let isDrawing = false;
let canvasSnapshot = null;

window.toggleDrawingMode = function() {
    if (!document.getElementById('drawings-layer')) setupDrawingLayer();
    
    window.isDrawingMode = !window.isDrawingMode;
    const toolbar = document.getElementById('drawing-floating-toolbar');
    if (toolbar) toolbar.style.display = window.isDrawingMode ? 'flex' : 'none';
    
    window.syncDrawingsLayer(); 
    
    const pages = document.querySelectorAll('.page');
    const shadows = document.querySelectorAll('.dw-shadow-page');
    
    if (window.isDrawingMode) {
        shadows.forEach((shadow, index) => {
            shadow.style.pointerEvents = 'auto'; // La vitre capture la souris
            shadow.style.backgroundImage = 'none'; 
            
            let canvas = document.createElement('canvas');
            canvas.width = shadow.offsetWidth;
            canvas.height = shadow.offsetHeight;
            canvas.style.cssText = "position: absolute; top: 0; left: 0; cursor: crosshair;";
            shadow.appendChild(canvas);
            
            // Restaure le tracé pour continuer
            const savedData = pages[index].getAttribute('data-draw-data');
            if (savedData) {
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = () => ctx.drawImage(img, 0, 0);
                img.src = savedData;
            }
            
            initCanvasEvents(canvas, pages[index]);
        });
    } else {
        shadows.forEach((shadow, index) => {
            shadow.style.pointerEvents = 'none'; 
            const canvas = shadow.querySelector('canvas');
            if (canvas) {
                // Sauvegarde secrète sur la vraie page
                pages[index].setAttribute('data-draw-data', canvas.toDataURL());
                canvas.remove();
            }
        });
        window.syncDrawingsLayer(); // Transforme les canvas en images intouchables
    }
};

// Gestion des clics sur les boutons de la barre flottante
document.addEventListener('click', (e) => {
    const toolBtn = e.target.closest('.draw-tool-btn');
    if (toolBtn) {
        document.querySelectorAll('.draw-tool-btn').forEach(b => b.classList.remove('active'));
        toolBtn.classList.add('active');
        currentTool = toolBtn.getAttribute('data-tool');
    }

    const colorBtn = e.target.closest('.draw-color-btn');
    if (colorBtn) {
        document.querySelectorAll('.draw-color-btn').forEach(b => b.classList.remove('active'));
        colorBtn.classList.add('active');
        currentColor = colorBtn.getAttribute('data-color');
    }
});

function initCanvasEvents(canvas, realPage) {
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    canvas.addEventListener('mousedown', (e) => {
        if (!window.isDrawingMode) return;
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
        
        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;

        if (currentTool === 'freehand') {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
        } else {
            canvasSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing || !window.isDrawingMode) return;
        const rect = canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        if (currentTool === 'freehand') {
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
        } else {
            ctx.putImageData(canvasSnapshot, 0, 0);
            drawShape(ctx, currentTool, startX, startY, currentX, currentY);
        }
    });

    canvas.addEventListener('mouseup', (e) => {
        if (!isDrawing) return;
        if (currentTool !== 'freehand') {
            const rect = canvas.getBoundingClientRect();
            ctx.putImageData(canvasSnapshot, 0, 0);
            drawShape(ctx, currentTool, startX, startY, e.clientX - rect.left, e.clientY - rect.top);
        }
        isDrawing = false;
        // Sauvegarde instantanée (anti-perte)
        if (realPage) {
            realPage.setAttribute('data-draw-data', canvas.toDataURL());
            if (typeof window.markPaperDocumentDirty === 'function') window.markPaperDocumentDirty();
        }
    });

    canvas.addEventListener('mouseleave', () => { 
        if (isDrawing && realPage) {
            realPage.setAttribute('data-draw-data', canvas.toDataURL());
            if (typeof window.markPaperDocumentDirty === 'function') window.markPaperDocumentDirty();
        }
        isDrawing = false; 
    });
}

function drawShape(ctx, tool, x1, y1, x2, y2) {
    ctx.beginPath();
    const width = x2 - x1;
    const height = y2 - y1;

    if (tool === 'rect') {
        ctx.strokeRect(x1, y1, width, height);
    } else if (tool === 'roundRect') {
        const radius = 10;
        ctx.roundRect ? ctx.roundRect(x1, y1, width, height, radius) : ctx.rect(x1, y1, width, height);
        ctx.stroke();
    } else if (tool === 'arrow') {
        // Tracé de la ligne principale
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Tête de flèche
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const headLength = 12;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 6), y2 - headLength * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 6), y2 - headLength * Math.sin(angle + Math.PI / 6));
        ctx.lineTo(x2, y2);
        ctx.fill();
    }
}

function setupDrawingLayer() {
    document.getElementById('content').style.position = 'relative';
    let drawingsLayer = document.getElementById('drawings-layer');
    
    if (!drawingsLayer) {
        drawingsLayer = document.createElement('div');
        drawingsLayer.id = 'drawings-layer';
        // Ce conteneur flotte au-dessus de tout le document
        drawingsLayer.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 50;";
        document.getElementById('content').appendChild(drawingsLayer);
        
        // Les "yeux" du calque : si les pages bougent, le calque suit automatiquement
        new ResizeObserver(() => window.syncDrawingsLayer()).observe(document.getElementById('pages-container'));
        new MutationObserver(() => window.syncDrawingsLayer()).observe(document.getElementById('pages-container'), { childList: true });
    }
}

window.syncDrawingsLayer = function() {
    let drawingsLayer = document.getElementById('drawings-layer');
    if (!drawingsLayer) return;
    
    const pages = document.querySelectorAll('.page');
    
    pages.forEach((page, index) => {
        const shadowId = 'shadow-page-' + index;
        let shadowPage = document.getElementById(shadowId);
        
        if (!shadowPage) {
            shadowPage = document.createElement('div');
            shadowPage.id = shadowId;
            shadowPage.className = 'dw-shadow-page';
            shadowPage.style.position = 'absolute';
            drawingsLayer.appendChild(shadowPage);
        }
        
        // On aligne parfaitement le calque fantôme sur la vraie page
        shadowPage.style.top = page.offsetTop + 'px';
        shadowPage.style.left = page.offsetLeft + 'px';
        shadowPage.style.width = page.offsetWidth + 'px';
        shadowPage.style.height = page.offsetHeight + 'px';
        
        // Affichage du dessin (si on n'est pas en train de dessiner)
        if (!window.isDrawingMode) {
            const dataUrl = page.getAttribute('data-draw-data');
            shadowPage.style.backgroundImage = dataUrl ? `url(${dataUrl})` : 'none';
            shadowPage.style.backgroundSize = '100% 100%';
        }
    });
    
    // Nettoyage si on a effacé des pages
    const shadows = document.querySelectorAll('.dw-shadow-page');
    if (shadows.length > pages.length) {
        for (let i = pages.length; i < shadows.length; i++) shadows[i].remove();
    }
};

window.addEventListener('DOMContentLoaded', () => {
    setupDrawingLayer();
    setTimeout(window.syncDrawingsLayer, 500); // Synchro initiale
});
