(function () {
    let isSyncing = false;

    function sanitizeFileName(value, fallback = "Document_Paper") {
        const cleaned = String(value || "")
            .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-")
            .replace(/\s+/g, " ")
            .replace(/[. ]+$/g, "")
            .trim()
            .slice(0, 120)
            .trim();

        if (!cleaned || /^\.+$/.test(cleaned)) return fallback;
        if (/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(cleaned)) {
            return `_${cleaned}`;
        }
        return cleaned;
    }

    function getTitleInput() {
        return document.getElementById("doc-title");
    }

    function updateBrowserTitle(title) {
        document.title = title ? `${title} - Paper` : "Paper";
    }

    function syncTitleFromMetadata() {
        if (isSyncing) return;
        const metadataInput = getTitleInput();
        const toolbarInput = document.getElementById("paper-document-title");
        if (!metadataInput || !toolbarInput) return;

        isSyncing = true;
        const title = metadataInput.value.trim();
        toolbarInput.value = title;
        updateBrowserTitle(title);
        isSyncing = false;
    }

    function syncTitleToMetadata() {
        if (isSyncing) return;
        const metadataInput = getTitleInput();
        const toolbarInput = document.getElementById("paper-document-title");
        if (!metadataInput || !toolbarInput) return;

        isSyncing = true;
        metadataInput.value = toolbarInput.value;
        updateBrowserTitle(toolbarInput.value.trim());
        metadataInput.dispatchEvent(new Event("input", { bubbles: true }));
        isSyncing = false;
    }

    window.getPaperDocumentTitle = function () {
        return (getTitleInput()?.value || "").trim();
    };
    window.getPaperDocumentFileName = function (extension, fallback = "Document_Paper") {
        const title = window.getPaperDocumentTitle();
        return `${sanitizeFileName(title, fallback)}.${extension}`;
    };
    window.syncPaperDocumentTitle = syncTitleFromMetadata;

    document.addEventListener("DOMContentLoaded", () => {
        const toolbarInput = document.getElementById("paper-document-title");
        const metadataInput = getTitleInput();
        if (!toolbarInput || !metadataInput) return;

        toolbarInput.addEventListener("input", syncTitleToMetadata);
        metadataInput.addEventListener("input", syncTitleFromMetadata);
        syncTitleFromMetadata();
    }, { once: true });
})();
