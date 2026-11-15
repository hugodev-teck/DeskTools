let isDrawingMode = false;
let currentTool = 'freehand';
let currentShape = 'rect';
let currentColor = '#000000';
let drawingObserversInitialized = false;

window.toggleDrawingMode = function() {
    setupDrawingLayer();
    
    window.isDrawingMode = !window.isDrawingMode;
    const middleBar = document.getElementById('middle-bar');
    if (middleBar) middleBar.classList.toggle('drawing-mode-active', window.isDrawingMode);
    
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
            canvas.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: crosshair;";
            shadow.appendChild(canvas);
            
            // Restaure le tracé pour continuer
            const savedData = pages[index].getAttribute('data-draw-data');
            if (savedData) {
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
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

document.addEventListener('click', (e) => {
    const shapeBtn = e.target.closest('.draw-shape-btn');
    if (shapeBtn) {
        document.querySelectorAll('.draw-shape-btn').forEach(button => {
            const isActive = button === shapeBtn;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
        document.querySelectorAll('.draw-tool-btn').forEach(button => {
            button.classList.remove('active');
            button.setAttribute('aria-pressed', 'false');
        });
        currentShape = shapeBtn.dataset.shape;
        currentTool = 'shape';
        return;
    }

    const toolBtn = e.target.closest('.draw-tool-btn');
    if (toolBtn) {
        document.querySelectorAll('.draw-tool-btn').forEach(b => {
            const isActive = b === toolBtn;
            b.classList.toggle('active', isActive);
            b.setAttribute('aria-pressed', String(isActive));
        });
        currentTool = toolBtn.getAttribute('data-tool');
        document.querySelectorAll('.draw-shape-btn').forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
        });
    }

    const colorBtn = e.target.closest('.draw-color-btn');
    if (colorBtn) {
        document.querySelectorAll('.draw-color-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        colorBtn.classList.add('active');
        colorBtn.setAttribute('aria-pressed', 'true');
        currentColor = colorBtn.getAttribute('data-color');
    }
});

function initCanvasEvents(canvas, realPage) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let isDrawing = false;
    let canvasSnapshot = null;
    let textSelection = null;
    let startX = 0;
    let startY = 0;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const getCanvasPoint = (event) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * canvas.width / rect.width,
            y: (event.clientY - rect.top) * canvas.height / rect.height
        };
    };

    const saveDrawing = () => {
        realPage.setAttribute('data-draw-data', canvas.toDataURL());
        if (typeof window.markPaperDocumentDirty === 'function') window.markPaperDocumentDirty();
    };

    const updateTextSelection = (point) => {
        if (!textSelection) {
            textSelection = document.createElement('div');
            textSelection.className = 'dw-text-selection';
            canvas.parentElement.appendChild(textSelection);
        }

        const left = Math.min(startX, point.x);
        const top = Math.min(startY, point.y);
        const scaleX = canvas.clientWidth / canvas.width;
        const scaleY = canvas.clientHeight / canvas.height;
        textSelection.style.left = `${left * scaleX}px`;
        textSelection.style.top = `${top * scaleY}px`;
        textSelection.style.width = `${Math.abs(point.x - startX) * scaleX}px`;
        textSelection.style.height = `${Math.abs(point.y - startY) * scaleY}px`;
    };

    canvas.addEventListener('mousedown', (e) => {
        if (!window.isDrawingMode) return;
        const point = getCanvasPoint(e);
        startX = point.x;
        startY = point.y;

        if (currentTool === 'bucket') {
            ctx.globalCompositeOperation = 'source-over';
            if (fillCanvas(ctx, point.x, point.y, currentColor)) saveDrawing();
            return;
        }

        isDrawing = true;

        if (currentTool === 'text') {
            updateTextSelection(point);
            return;
        }

        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;

        if (currentTool === 'freehand') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.beginPath();
            ctx.moveTo(startX, startY);
        } else if (currentTool === 'shape') {
            ctx.globalCompositeOperation = 'source-over';
            canvasSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } else if (currentTool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 20;
            ctx.beginPath();
            ctx.arc(startX, startY, ctx.lineWidth / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(startX, startY);
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing || !window.isDrawingMode) return;
        const point = getCanvasPoint(e);

        if (currentTool === 'text') {
            updateTextSelection(point);
            return;
        }

        if (currentTool === 'freehand') {
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
        } else if (currentTool === 'eraser') {
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
        } else if (currentTool === 'shape') {
            ctx.putImageData(canvasSnapshot, 0, 0);
            drawShape(ctx, currentShape, startX, startY, point.x, point.y);
        }
    });

    canvas.addEventListener('mouseup', (e) => {
        if (!isDrawing) return;

        if (currentTool === 'text') {
            const point = getCanvasPoint(e);
            if (textSelection) textSelection.remove();
            textSelection = null;
            isDrawing = false;
            createTextEditor(canvas, realPage, startX, startY, point.x, point.y, currentColor);
            return;
        }

        if (currentTool === 'shape') {
            const point = getCanvasPoint(e);
            ctx.putImageData(canvasSnapshot, 0, 0);
            drawShape(ctx, currentShape, startX, startY, point.x, point.y);
        }

        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = 2;
        isDrawing = false;
        canvasSnapshot = null;
        saveDrawing();
    });

    canvas.addEventListener('mouseleave', () => {
        if (!isDrawing) return;
        if (currentTool === 'text') {
            if (textSelection) textSelection.remove();
            textSelection = null;
            isDrawing = false;
            return;
        }

        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = 2;
        isDrawing = false;
        canvasSnapshot = null;
        saveDrawing();
    });
}

function createTextEditor(canvas, realPage, startX, startY, endX, endY, color) {
    const width = canvas.width;
    const height = canvas.height;
    let left = Math.min(startX, endX);
    let top = Math.min(startY, endY);
    let boxWidth = Math.abs(endX - startX);
    let boxHeight = Math.abs(endY - startY);

    if (boxWidth < 24 && boxHeight < 24) {
        boxWidth = Math.min(240, width - left);
        boxHeight = Math.min(100, height - top);
    } else {
        boxWidth = Math.max(boxWidth, 80);
        boxHeight = Math.max(boxHeight, 48);
    }

    left = Math.max(0, Math.min(left, width - boxWidth));
    top = Math.max(0, Math.min(top, height - boxHeight));

    const scaleX = canvas.clientWidth / width;
    const scaleY = canvas.clientHeight / height;
    const editor = document.createElement('textarea');
    editor.className = 'dw-text-editor';
    editor.placeholder = 'Saisir le texte... (Ctrl+Entrée pour valider)';
    editor.setAttribute('aria-label', 'Texte à ajouter au dessin');
    editor.style.left = `${left * scaleX}px`;
    editor.style.top = `${top * scaleY}px`;
    editor.style.width = `${boxWidth * scaleX}px`;
    editor.style.height = `${boxHeight * scaleY}px`;
    canvas.parentElement.appendChild(editor);
    editor.focus();

    let finished = false;
    const finish = (commit) => {
        if (finished) return;
        finished = true;

        if (commit && editor.value.trim()) {
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            const x = parseFloat(editor.style.left) / scaleX;
            const y = parseFloat(editor.style.top) / scaleY;
            const textWidth = parseFloat(editor.style.width) / scaleX;
            const textHeight = parseFloat(editor.style.height) / scaleY;
            drawTextInBox(ctx, editor.value, x, y, textWidth, textHeight, color);
            realPage.setAttribute('data-draw-data', canvas.toDataURL());
            if (typeof window.markPaperDocumentDirty === 'function') window.markPaperDocumentDirty();
        }

        editor.remove();
    };

    editor.addEventListener('keydown', (event) => {
        event.stopPropagation();
        if (event.key === 'Escape') {
            event.preventDefault();
            finish(false);
        } else if (event.key === 'Enter' && event.ctrlKey) {
            event.preventDefault();
            finish(true);
        }
    });
    editor.addEventListener('blur', () => finish(true));
}

function drawTextInBox(ctx, text, x, y, width, height, color) {
    const padding = 6;
    const lineHeight = 20;
    const maxWidth = Math.max(1, width - padding * 2);
    const maxLines = Math.max(1, Math.floor((height - padding * 2) / lineHeight));
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = color;
    ctx.font = '16px Arial';
    ctx.textBaseline = 'top';

    const lines = [];
    text.split(/\r?\n/).forEach(paragraph => {
        if (!paragraph) {
            lines.push('');
            return;
        }
        let line = '';
        paragraph.split(/\s+/).forEach(word => {
            const candidate = line ? `${line} ${word}` : word;
            if (line && ctx.measureText(candidate).width > maxWidth) {
                lines.push(line);
                line = word;
            } else {
                line = candidate;
            }
        });
        if (line) lines.push(line);
    });

    lines.slice(0, maxLines).forEach((line, index) => {
        ctx.fillText(line, x + padding, y + padding + index * lineHeight, maxWidth);
    });
    ctx.restore();
}

function fillCanvas(ctx, startX, startY, color) {
    const { width, height } = ctx.canvas;
    const seedX = Math.floor(startX);
    const seedY = Math.floor(startY);
    if (seedX < 0 || seedY < 0 || seedX >= width || seedY >= height) return false;

    const match = /^#([0-9a-f]{6})$/i.exec(color);
    if (!match) return false;

    const replacement = [
        parseInt(match[1].slice(0, 2), 16),
        parseInt(match[1].slice(2, 4), 16),
        parseInt(match[1].slice(4, 6), 16),
        255
    ];
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const seedOffset = (seedY * width + seedX) * 4;
    const target = Array.from(pixels.slice(seedOffset, seedOffset + 4));
    const tolerance = 16;
    if (target[3] === 255 &&
        Math.abs(target[0] - replacement[0]) <= tolerance &&
        Math.abs(target[1] - replacement[1]) <= tolerance &&
        Math.abs(target[2] - replacement[2]) <= tolerance) {
        return false;
    }

    const visited = new Uint8Array(width * height);
    const matches = (x, y) => {
        if (x < 0 || y < 0 || x >= width || y >= height) return false;
        const pixelIndex = y * width + x;
        if (visited[pixelIndex]) return false;
        const offset = pixelIndex * 4;
        const isMatch = target[3] === 0
            ? pixels[offset + 3] <= tolerance
            : Math.abs(pixels[offset] - target[0]) <= tolerance &&
              Math.abs(pixels[offset + 1] - target[1]) <= tolerance &&
              Math.abs(pixels[offset + 2] - target[2]) <= tolerance &&
              Math.abs(pixels[offset + 3] - target[3]) <= tolerance;
        if (!isMatch) visited[pixelIndex] = 2;
        return isMatch;
    };

    const stack = [[seedX, seedY]];
    let filled = false;
    while (stack.length) {
        const [seed, y] = stack.pop();
        let x = seed;
        while (x >= 0 && matches(x, y)) x--;
        x++;

        let spanAbove = false;
        let spanBelow = false;
        while (x < width && matches(x, y)) {
            const pixelIndex = y * width + x;
            const offset = pixelIndex * 4;
            visited[pixelIndex] = 1;
            pixels[offset] = replacement[0];
            pixels[offset + 1] = replacement[1];
            pixels[offset + 2] = replacement[2];
            pixels[offset + 3] = replacement[3];
            filled = true;

            if (y > 0) {
                const aboveMatches = matches(x, y - 1);
                if (aboveMatches && !spanAbove) stack.push([x, y - 1]);
                spanAbove = aboveMatches;
            }
            if (y < height - 1) {
                const belowMatches = matches(x, y + 1);
                if (belowMatches && !spanBelow) stack.push([x, y + 1]);
                spanBelow = belowMatches;
            }
            x++;
        }
    }

    if (filled) ctx.putImageData(imageData, 0, 0);
    return filled;
}

function drawShape(ctx, tool, x1, y1, x2, y2) {
    if (tool === 'rect') {
        ctx.strokeRect(Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1));
    } else if (tool === 'roundRect') {
        const left = Math.min(x1, x2);
        const top = Math.min(y1, y2);
        const width = Math.abs(x2 - x1);
        const height = Math.abs(y2 - y1);
        const radius = Math.min(10, width / 2, height / 2);
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(left, top, width, height, radius) : ctx.rect(left, top, width, height);
        ctx.stroke();
    } else if (tool === 'arrow') {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        const angle = Math.atan2(y2 - y1, x2 - x1);
        const headLength = 12;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 6), y2 - headLength * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 6), y2 - headLength * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
    }
}

function ensureDrawingLayer(pagesContainer) {
    pagesContainer.style.position = 'relative';
    let drawingsLayer = Array.from(pagesContainer.children).find(child => child.id === 'drawings-layer');
    if (!drawingsLayer) {
        drawingsLayer = document.createElement('div');
        drawingsLayer.id = 'drawings-layer';
        drawingsLayer.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 50;';
        pagesContainer.appendChild(drawingsLayer);
    }

    if (!drawingObserversInitialized) {
        new ResizeObserver(() => window.syncDrawingsLayer()).observe(pagesContainer);
        new MutationObserver(() => window.syncDrawingsLayer()).observe(pagesContainer, { childList: true });
        drawingObserversInitialized = true;
    }

    return drawingsLayer;
}

function setupDrawingLayer() {
    const pagesContainer = document.getElementById('pages-container');
    if (!pagesContainer) return;

    ensureDrawingLayer(pagesContainer);
    window.syncDrawingsLayer();
}

window.syncDrawingsLayer = function() {
    const pagesContainer = document.getElementById('pages-container');
    if (!pagesContainer) return;

    const drawingsLayer = ensureDrawingLayer(pagesContainer);
    const pages = pagesContainer.querySelectorAll('.page');
    const containerRect = pagesContainer.getBoundingClientRect();
    const transform = getComputedStyle(pagesContainer).transform;
    const matrix = transform === 'none' ? null : new DOMMatrixReadOnly(transform);
    const scaleX = matrix ? Math.hypot(matrix.a, matrix.b) : 1;
    const scaleY = matrix ? Math.hypot(matrix.c, matrix.d) : 1;
    const activeShadows = new Set();
    
    pages.forEach((page, index) => {
        const shadowId = 'shadow-page-' + index;
        let shadowPage = Array.from(drawingsLayer.children).find(child => child.id === shadowId);
        
        if (!shadowPage) {
            shadowPage = Array.from(page.children).find(child => child.classList.contains('dw-shadow-page'));
        }

        if (!shadowPage) {
            shadowPage = document.createElement('div');
            shadowPage.className = 'dw-shadow-page';
        }

        if (shadowPage.parentElement !== drawingsLayer) drawingsLayer.appendChild(shadowPage);
        shadowPage.id = shadowId;
        shadowPage.contentEditable = 'false';
        shadowPage.style.position = 'absolute';
        const pageRect = page.getBoundingClientRect();
        shadowPage.style.top = `${(pageRect.top - containerRect.top) / scaleY}px`;
        shadowPage.style.left = `${(pageRect.left - containerRect.left) / scaleX}px`;
        shadowPage.style.width = `${pageRect.width / scaleX}px`;
        shadowPage.style.height = `${pageRect.height / scaleY}px`;
        shadowPage.style.pointerEvents = window.isDrawingMode ? 'auto' : 'none';
        activeShadows.add(shadowPage);
        
        // Affichage du dessin (si on n'est pas en train de dessiner)
        if (!window.isDrawingMode) {
            const dataUrl = page.getAttribute('data-draw-data');
            shadowPage.style.backgroundImage = dataUrl ? `url(${dataUrl})` : 'none';
            shadowPage.style.backgroundSize = '100% 100%';
            shadowPage.style.backgroundRepeat = 'no-repeat';
        }
    });

    Array.from(drawingsLayer.children).forEach(shadowPage => {
        if (!activeShadows.has(shadowPage)) shadowPage.remove();
    });
};

window.addEventListener('DOMContentLoaded', () => {
    setupDrawingLayer();
    setTimeout(window.syncDrawingsLayer, 500); // Synchro initiale
});

// Actualiser les calques de dessin lors des transitions d'impression.
window.addEventListener('beforeprint', () => window.syncDrawingsLayer());
window.addEventListener('afterprint', () => window.syncDrawingsLayer());

const printMediaQuery = window.matchMedia && window.matchMedia('print');
if (printMediaQuery) {
    if (printMediaQuery.addEventListener) {
        printMediaQuery.addEventListener('change', () => window.syncDrawingsLayer());
    } else if (printMediaQuery.addListener) {
        printMediaQuery.addListener(() => window.syncDrawingsLayer());
    }
}
