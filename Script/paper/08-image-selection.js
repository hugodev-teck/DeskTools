function triggerImageUpload() {
    let fileInput = document.getElementById('image-input');
    if (fileInput) {
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const id = 'img-' + Date.now();
                    const html = `<span class="dw-image-wrapper" id="${id}" style="width: 300px; height: auto;" contenteditable="false" data-wrap="inline"><img src="${evt.target.result}" style="pointer-events: none;"></span>&nbsp;`;
                    insertAtCursorHTML(html);
                };
                reader.readAsDataURL(file);
            }
            fileInput.value = '';
        };
        fileInput.click();
    }
};

let dragStartX = 0, dragStartY = 0;

document.addEventListener('mousedown', (e) => {
    if (isResizing) return;

    const wrapper = e.target.closest('.dw-image-wrapper');
    const toolbar = document.getElementById('image-floating-toolbar');

    if (!wrapper && !e.target.closest('#image-floating-toolbar')) {
        document.querySelectorAll('.dw-image-wrapper').forEach(w => {
            w.classList.remove('dw-image-selected');
            w.querySelectorAll('.resize-handle').forEach(h => h.remove());
        });
        currentSelectedImage = null;
        if (toolbar) toolbar.style.display = 'none';
        return;
    }

    if (wrapper) {
        if (wrapper !== currentSelectedImage) {
            if (currentSelectedImage) {
                currentSelectedImage.classList.remove('dw-image-selected');
                currentSelectedImage.querySelectorAll('.resize-handle').forEach(h => h.remove());
            }
            currentSelectedImage = wrapper;
            wrapper.classList.add('dw-image-selected');
            
            if (!wrapper.querySelector('.resize-handle')) {
                ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].forEach(dir => {
                    let h = document.createElement('div');
                    h.className = `resize-handle ${dir}`;
                    h.addEventListener('mousedown', startResize);
                    wrapper.appendChild(h);
                });
            }
        }

        const rect = wrapper.getBoundingClientRect();
        const content = document.getElementById('content');
        if (toolbar) {
             toolbar.style.display = 'flex';
             toolbar.style.position = 'fixed'; /* Fixe la barre par rapport à ton écran */
             toolbar.style.zIndex = '1000000'; /* Force la barre à passer AU-DESSUS de tout */
             toolbar.style.top = `${rect.bottom + 15}px`; /* Juste en dessous de l'image */
             
             /* On centre la barre proprement */
             const toolbarWidth = toolbar.offsetWidth || 300; 
             toolbar.style.left = `${rect.left + (rect.width / 2) - (toolbarWidth / 2)}px`;
        }

        if (!e.target.classList.contains('resize-handle')) {
            e.preventDefault();
            isDraggingImage = true;
            hasMovedImage = false;
            
            dragStartX = e.clientX;
            dragStartY = e.clientY;

            wrapper.style.transition = 'none';

            document.addEventListener('mousemove', doDragImage);
            document.addEventListener('mouseup', stopDragImage);
        }
    }
});

function doDragImage(e) {
    if (!isDraggingImage || !currentSelectedImage) return;
    
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        hasMovedImage = true;
        
        // CORRECTION : On CACHE la barre pendant qu'on glisse l'image !
        const toolbar = document.getElementById('image-floating-toolbar');
        if (toolbar) toolbar.style.display = 'none';

        currentSelectedImage.style.transform = `translate(${dx}px, ${dy}px)`;
        currentSelectedImage.style.pointerEvents = 'none';
        currentSelectedImage.style.zIndex = '10000';
        currentSelectedImage.style.opacity = '0.7';
    }
}

function stopDragImage(e) {
    if (!isDraggingImage || !currentSelectedImage) return;
    isDraggingImage = false;

    document.removeEventListener('mousemove', doDragImage);
    document.removeEventListener('mouseup', stopDragImage);

    const wrapper = currentSelectedImage;
    
    wrapper.style.pointerEvents = 'auto';
    wrapper.style.opacity = '1';
    wrapper.style.transform = 'none';
    wrapper.style.zIndex = '';

    if (hasMovedImage) {
        const wrapType = wrapper.getAttribute('data-wrap') || 'inline';

        if (wrapType === 'devant' || wrapType === 'derriere') {
            const page = wrapper.closest('.page');
            if (page) {
                const pageRect = page.getBoundingClientRect();
                const newLeft = e.clientX - pageRect.left - (wrapper.offsetWidth / 2) + page.scrollLeft;
                const newTop = e.clientY - pageRect.top - (wrapper.offsetHeight / 2) + page.scrollTop;

                wrapper.style.position = 'absolute';
                wrapper.style.left = `${newLeft}px`;
                wrapper.style.top = `${newTop}px`;
                wrapper.style.zIndex = wrapType === 'devant' ? '50' : '-1';
            }
        } 
        else {
            let range;
            if (document.caretRangeFromPoint) {
                range = document.caretRangeFromPoint(e.clientX, e.clientY);
            }
            
            if (range && !wrapper.contains(range.startContainer)) {
                range.insertNode(wrapper);
            }
        }
    }

    const page = wrapper.closest('.page');
    if (page && typeof checkPageOverflow === 'function') checkPageOverflow(page);

    // CORRECTION : On affiche la barre PROPREMENT à la fin du glisser-déposer
    const toolbar = document.getElementById('image-floating-toolbar');
    if (toolbar) {
        const rect = wrapper.getBoundingClientRect();
        toolbar.style.display = 'flex';
        toolbar.style.position = 'fixed';
        toolbar.style.zIndex = '1000000';
        toolbar.style.top = `${rect.bottom + 15}px`;
        
        const toolbarWidth = toolbar.offsetWidth || 300; 
        toolbar.style.left = `${rect.left + (rect.width / 2) - (toolbarWidth / 2)}px`;
    }
}

