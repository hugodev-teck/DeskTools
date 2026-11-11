function startResize(e) {
    e.preventDefault();
    e.stopPropagation();
    isResizing = true;
    currentHandle = e.target.className.split(' ')[1];
    startX = e.clientX;
    startY = e.clientY;
    startW = currentSelectedImage.offsetWidth;
    startH = currentSelectedImage.offsetHeight;
    imgRatio = startW / startH;
    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
}

function doResize(e) {
    if (!isResizing || !currentSelectedImage) return;
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;
    let newW = startW, newH = startH;

    if (currentHandle.includes('e')) newW = startW + dx;
    if (currentHandle.includes('w')) newW = startW - dx;
    if (currentHandle.includes('s')) newH = startH + dy;
    if (currentHandle.includes('n')) newH = startH - dy;
    if (currentHandle.length === 2) newH = newW / imgRatio;

    if (newW > 30 && newH > 30) {
        currentSelectedImage.style.width = newW + 'px';
        currentSelectedImage.style.height = newH + 'px';
        const toolbar = document.getElementById('image-floating-toolbar');
        if (toolbar) toolbar.style.display = 'none';
    }
}

function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
    
    if (currentSelectedImage) {
        const page = currentSelectedImage.closest('.page');
        if (page && typeof checkPageOverflow === 'function') checkPageOverflow(page);
        
        // CORRECTION : On affiche la barre PROPREMENT à la fin du redimensionnement
        const toolbar = document.getElementById('image-floating-toolbar');
        if (toolbar) {
            const rect = currentSelectedImage.getBoundingClientRect();
            toolbar.style.display = 'flex';
            toolbar.style.position = 'fixed';
            toolbar.style.zIndex = '1000000';
            toolbar.style.top = `${rect.bottom + 15}px`;
            
            const toolbarWidth = toolbar.offsetWidth || 300; 
            toolbar.style.left = `${rect.left + (rect.width / 2) - (toolbarWidth / 2)}px`;
        }
    }
}

function setWrapStyle(wrapType) {
    if (!currentSelectedImage) return;
    const img = currentSelectedImage;
    img.setAttribute('data-wrap', wrapType);
    
    img.style.display = '';
    img.style.float = '';
    img.style.clear = '';
    img.style.margin = '';
    img.style.position = '';
    img.style.zIndex = '';
    img.style.shapeOutside = '';
    img.style.left = '';
    img.style.top = '';
    img.style.transform = '';
    
    switch (wrapType) {
        case 'adapter':
            img.style.display = 'inline-block';
            img.style.float = 'left';
            img.style.margin = '10px';
            img.style.shapeOutside = `url(${img.querySelector('img').src})`;
            break;
        case 'encadre':
            img.style.display = 'inline-block';
            img.style.float = 'left';
            img.style.margin = '10px 15px 10px 0';
            break;
        case 'hautbas':
            img.style.display = 'block';
            img.style.clear = 'both';
            img.style.margin = '15px auto';
            break;
        case 'devant':
            img.style.position = 'absolute';
            img.style.zIndex = '50';
            break;
        case 'derriere':
            img.style.position = 'absolute';
            img.style.zIndex = '-1';
            break;
    }
    
    const page = img.closest('.page');
    if (page && typeof checkPageOverflow === 'function') checkPageOverflow(page);
};

function deleteImage() {
    if (currentSelectedImage) {
        currentSelectedImage.remove();
        document.getElementById('image-floating-toolbar').style.display = 'none';
        currentSelectedImage = null;
    }
};

