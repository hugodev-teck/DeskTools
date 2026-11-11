function saveHistoryState() {
    if (isRestoringHistory) return;
    
    const container = document.getElementById('pages-container');
    if (!container) return;

    const currentState = container.innerHTML;

    if (undoStack.length > 0 && undoStack[undoStack.length - 1] === currentState) return;

    undoStack.push(currentState);
    if (undoStack.length > MAX_HISTORY) undoStack.shift();

    redoStack = [];
};

function scheduleHistorySave() {
    if (isRestoringHistory) return;
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        saveHistoryState();
    }, 800);
};

function performUndo() {
    if (undoStack.length <= 1) return;

    const container = document.getElementById('pages-container');
    if (!container) return;

    isRestoringHistory = true;

    redoStack.push(undoStack.pop());

    const previousState = undoStack[undoStack.length - 1];
    container.innerHTML = previousState;

    reattachPageListeners();

    isRestoringHistory = false;
    if (typeof window.markPaperDocumentDirty === 'function') window.markPaperDocumentDirty();
};

function performRedo() {
    if (redoStack.length === 0) return;

    const container = document.getElementById('pages-container');
    if (!container) return;

    isRestoringHistory = true;
    const nextState = redoStack.pop();
    undoStack.push(nextState);
    container.innerHTML = nextState;

    reattachPageListeners();

    isRestoringHistory = false;
    if (typeof window.markPaperDocumentDirty === 'function') window.markPaperDocumentDirty();
};

function reattachPageListeners() {
    document.querySelectorAll('.page').forEach(page => {
        page.contentEditable = true;
        
        page.oninput = () => {
            scheduleHistorySave();
            if (typeof rebalancePages === 'function') rebalancePages(page);
        };
        
        page.onfocus = () => window.activePage = page;
        
        page.onkeydown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); performUndo(); return; }
            if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); performRedo(); return; }
            
            if (e.key === 'Backspace' && typeof handleBackspace === 'function') handleBackspace(page, e);
        };
    });
};
