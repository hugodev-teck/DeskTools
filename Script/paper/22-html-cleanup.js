window.cleanHTML = function(htmlString) {
    if (!htmlString) return "";

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const badTags = ['script', 'iframe', 'object', 'embed', 'applet', 'meta', 'link', 'base', 'style'];
    badTags.forEach(tag => {
        doc.querySelectorAll(tag).forEach(el => el.remove());
    });

    const safeChartClick = /^(openEditChart|deleteChart)\('chart-\d+'\)$/;
    const safeLatexClick = /^(openLatexEditor|deleteLatex)\('(latex-\d+)'\)$/; // <-- AJOUTÉ POUR LE LATEX
    const safeTocClick = /^document\.getElementById\('dw-heading-[\w-]+'\)\.scrollIntoView\(\{behavior:\s*'smooth',\s*block:\s*'center'\}\)$/;
    const safeTocBtnClick = /^(generateTableOfContents\(\)|deleteTableOfContents\(\))$/;
    const safeHoverColor = /^this\.style\.color='#[0-9a-fA-F]+'$/;

    doc.querySelectorAll('*').forEach(el => {
        
        if (el.hasAttribute('href') && el.getAttribute('href').trim().toLowerCase().startsWith('javascript:')) {
            el.removeAttribute('href');
        }

        Array.from(el.attributes).forEach(attr => {
            const attrName = attr.name.toLowerCase();
            
            if (attrName.startsWith('on')) {
                const attrValue = attr.value.trim();
                let isSafe = false;

                if (attrName === 'onclick') {
                    if (safeChartClick.test(attrValue) || safeLatexClick.test(attrValue) || safeTocClick.test(attrValue) || safeTocBtnClick.test(attrValue)) {
                        isSafe = true;
                    }
                } else if (attrName === 'onmouseover' || attrName === 'onmouseout') {
                    if (safeHoverColor.test(attrValue)) {
                        isSafe = true;
                    }
                }

                if (!isSafe) {
                    el.removeAttribute(attrName);
                }
            }
        });
    });

    return doc.body.innerHTML;
};

