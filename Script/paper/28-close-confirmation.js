(function () {
    let hasUnsavedChanges = false;
    let documentVersion = 0;
    const electronBridge = window.prismDesktop;
    const usesElectronCloseGuard = Boolean(
        electronBridge &&
        electronBridge.isElectron &&
        typeof electronBridge.setPaperDocumentDirty === "function"
    );

    function markDocumentDirty() {
        hasUnsavedChanges = true;
        documentVersion += 1;
        if (usesElectronCloseGuard) electronBridge.setPaperDocumentDirty(true);
    }

    function markDocumentSaved(savedVersion) {
        if (savedVersion !== undefined && savedVersion !== documentVersion) return;
        hasUnsavedChanges = false;
        if (usesElectronCloseGuard) electronBridge.setPaperDocumentDirty(false);
    }

    function isDocumentEdit(target) {
        if (!(target instanceof Element)) return false;
        if (target.closest("#pages-container .page")) return true;

        return target.matches(
            "#doc-title, #doc-author, #doc-subject, #doc-keywords, " +
            "#header-text, #footer-text, #show-page-num, #paper-size, #margin-size, " +
            'input[name="orientation"]'
        );
    }

    document.addEventListener("input", event => {
        if (isDocumentEdit(event.target)) markDocumentDirty();
    }, true);

    document.addEventListener("change", event => {
        if (isDocumentEdit(event.target)) markDocumentDirty();
    }, true);

    if (usesElectronCloseGuard) {
        electronBridge.setPaperDocumentDirty(false);
    } else {
        window.addEventListener("beforeunload", event => {
            if (!hasUnsavedChanges) return;
            event.preventDefault();
            event.returnValue = "";
        });
    }

    window.markPaperDocumentDirty = markDocumentDirty;
    window.markPaperDocumentSaved = markDocumentSaved;
    window.getPaperDocumentVersion = () => documentVersion;
})();
