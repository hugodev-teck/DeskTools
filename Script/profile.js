(function () {
    const PROFILE_STORAGE_KEY = "prism.authorProfile.v1";
    const FINGERPRINT_STORAGE_KEY = "prism.authorProfile.includeFingerprint";
    let lastAutoFilledAuthor = "";

    function readProfile() {
        try {
            const profile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || "{}");
            return {
                email: typeof profile.email === "string" ? profile.email : "",
                lastName: typeof profile.lastName === "string" ? profile.lastName : "",
                firstName: typeof profile.firstName === "string" ? profile.firstName : "",
                role: typeof profile.role === "string" ? profile.role : ""
            };
        } catch (error) {
            console.error("Le profil local est illisible.", error);
            return { email: "", lastName: "", firstName: "", role: "" };
        }
    }

    function fullName(profile) {
        return [profile.firstName, profile.lastName].filter(Boolean).join(" ");
    }

    function applyProfileToPaper(profile = readProfile()) {
        const authorInput = document.getElementById("doc-author");
        if (!authorInput) return;

        if (!authorInput.value.trim() || authorInput.value === lastAutoFilledAuthor) {
            authorInput.value = fullName(profile);
        }
        lastAutoFilledAuthor = fullName(profile);
    }

    function createProfileMenu() {
        if (document.getElementById("prism-profile-modal")) return;

        const style = document.createElement("style");
        style.textContent = `
            #prism-profile-modal {
                align-items: center;
                background: rgba(0, 0, 0, .45);
                display: none;
                inset: 0;
                justify-content: center;
                position: fixed;
                z-index: 2147483000;
            }
            #prism-profile-modal[aria-hidden="false"] { display: flex; }
            #prism-profile-dialog {
                background: #fff;
                border-radius: 12px;
                box-shadow: 0 12px 40px rgba(0, 0, 0, .25);
                box-sizing: border-box;
                color: #222;
                font: 15px/1.45 Arial, sans-serif;
                max-height: calc(100vh - 32px);
                max-width: 460px;
                overflow: auto;
                padding: 24px;
                width: calc(100% - 32px);
            }
            #prism-profile-dialog h2 { margin: 0 0 8px; }
            #prism-profile-dialog p { color: #555; margin: 0 0 18px; }
            #prism-profile-dialog label { display: block; font-weight: 600; margin: 12px 0 5px; }
            #prism-profile-dialog input[type="text"],
            #prism-profile-dialog input[type="email"] {
                border: 1px solid #bbb;
                border-radius: 5px;
                box-sizing: border-box;
                font: inherit;
                padding: 9px;
                width: 100%;
            }
            #prism-profile-dialog .prism-profile-check {
                align-items: flex-start;
                display: flex;
                font-weight: 400;
                gap: 8px;
                margin-top: 16px;
            }
            #prism-profile-dialog .prism-profile-actions {
                display: flex;
                gap: 10px;
                justify-content: flex-end;
                margin-top: 20px;
            }
            #prism-profile-dialog button {
                border: 0;
                border-radius: 5px;
                cursor: pointer;
                font: inherit;
                padding: 9px 14px;
            }
            #prism-profile-save { background: #155eef; color: #fff; }
            #prism-profile-clear { background: #eee; color: #222; }
            #prism-profile-error { color: #b42318 !important; margin-top: 10px !important; }
        `;
        document.head.appendChild(style);

        const modal = document.createElement("div");
        modal.id = "prism-profile-modal";
        modal.setAttribute("aria-hidden", "true");
        modal.innerHTML = `
            <section id="prism-profile-dialog" role="dialog" aria-modal="true" aria-labelledby="prism-profile-title">
                <h2 id="prism-profile-title">Profil auteur</h2>
                <p>Ces informations restent dans ce navigateur. Elles sont ajoutées aux documents que vous exportez.</p>
                <form id="prism-profile-form">
                    <label for="prism-profile-email">E-mail</label>
                    <input id="prism-profile-email" name="email" type="email" autocomplete="email">
                    <label for="prism-profile-last-name">Nom</label>
                    <input id="prism-profile-last-name" name="lastName" type="text" autocomplete="family-name">
                    <label for="prism-profile-first-name">Prénom</label>
                    <input id="prism-profile-first-name" name="firstName" type="text" autocomplete="given-name">
                    <label for="prism-profile-role">Fonction</label>
                    <input id="prism-profile-role" name="role" type="text" autocomplete="organization-title">
                    <label class="prism-profile-check">
                        <input id="prism-profile-fingerprint" type="checkbox">
                        <span>Ajouter l’empreinte SHA-256 du contenu aux métadonnées des exports</span>
                    </label>
                    <p id="prism-profile-error" role="alert" hidden></p>
                    <div class="prism-profile-actions">
                        <button id="prism-profile-clear" type="button">Effacer le profil</button>
                        <button type="button" data-profile-close>Fermer</button>
                        <button id="prism-profile-save" type="submit">Enregistrer</button>
                    </div>
                </form>
            </section>
        `;
        document.body.appendChild(modal);

        const existingProfileButton = document.getElementById("prism-profile-button");
        const profileButton = existingProfileButton || document.createElement("button");
        if (!existingProfileButton) {
            profileButton.id = "prism-profile-button";
            profileButton.type = "button";
            profileButton.textContent = "Profil";
        }
        profileButton.setAttribute("aria-haspopup", "dialog");

        const toolbar = document.getElementById("top-bar");
        if (!existingProfileButton && toolbar) {
            toolbar.insertBefore(profileButton, toolbar.firstChild);
        } else if (!existingProfileButton) {
            document.body.appendChild(profileButton);
        }

        function closeMenu() {
            modal.setAttribute("aria-hidden", "true");
            profileButton.focus();
        }

        function openMenu() {
            const profile = readProfile();
            document.getElementById("prism-profile-email").value = profile.email;
            document.getElementById("prism-profile-last-name").value = profile.lastName;
            document.getElementById("prism-profile-first-name").value = profile.firstName;
            document.getElementById("prism-profile-role").value = profile.role;
            document.getElementById("prism-profile-fingerprint").checked =
                localStorage.getItem(FINGERPRINT_STORAGE_KEY) === "true";
            document.getElementById("prism-profile-error").hidden = true;
            modal.setAttribute("aria-hidden", "false");
            document.getElementById("prism-profile-email").focus();
        }

        profileButton.addEventListener("click", openMenu);
        modal.querySelectorAll("[data-profile-close]").forEach(button => {
            button.addEventListener("click", closeMenu);
        });
        modal.addEventListener("click", event => {
            if (event.target === modal) closeMenu();
        });
        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
                closeMenu();
            }
        });

        document.getElementById("prism-profile-form").addEventListener("submit", event => {
            event.preventDefault();
            const email = document.getElementById("prism-profile-email").value.trim();
            if (email && !document.getElementById("prism-profile-email").validity.valid) {
                document.getElementById("prism-profile-error").textContent = "Saisissez une adresse e-mail valide.";
                document.getElementById("prism-profile-error").hidden = false;
                return;
            }

            try {
                const profile = {
                    email,
                    lastName: document.getElementById("prism-profile-last-name").value.trim(),
                    firstName: document.getElementById("prism-profile-first-name").value.trim(),
                    role: document.getElementById("prism-profile-role").value.trim()
                };
                localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
                localStorage.setItem(
                    FINGERPRINT_STORAGE_KEY,
                    String(document.getElementById("prism-profile-fingerprint").checked)
                );
                applyProfileToPaper(profile);
                document.dispatchEvent(new CustomEvent("prism-profile-change", { detail: profile }));
                closeMenu();
            } catch (error) {
                console.error("Impossible d’enregistrer le profil local.", error);
                document.getElementById("prism-profile-error").textContent =
                    "Impossible d’enregistrer le profil dans ce navigateur.";
                document.getElementById("prism-profile-error").hidden = false;
            }
        });

        document.getElementById("prism-profile-clear").addEventListener("click", () => {
            try {
                localStorage.removeItem(PROFILE_STORAGE_KEY);
                localStorage.removeItem(FINGERPRINT_STORAGE_KEY);
                document.getElementById("prism-profile-form").reset();
                document.dispatchEvent(new CustomEvent("prism-profile-change", {
                    detail: { email: "", lastName: "", firstName: "", role: "" }
                }));
                applyProfileToPaper({ email: "", lastName: "", firstName: "", role: "" });
                closeMenu();
            } catch (error) {
                console.error("Impossible d’effacer le profil local.", error);
                document.getElementById("prism-profile-error").textContent =
                    "Impossible d’effacer le profil dans ce navigateur.";
                document.getElementById("prism-profile-error").hidden = false;
            }
        });

        if (!localStorage.getItem("prism.authorProfile.prompted")) {
            localStorage.setItem("prism.authorProfile.prompted", "true");
            openMenu();
        }
        applyProfileToPaper();
    }

    window.getPrismAuthorProfile = readProfile;
    window.applyPrismAuthorProfile = applyProfileToPaper;

    window.getPrismDocumentMetadata = async function (content) {
        const profile = readProfile();
        const author = fullName(profile);
        const hasProfile = Boolean(profile.email || author || profile.role);
        const metadata = {};

        if (hasProfile) {
            metadata.author = author;
            metadata.email = profile.email;
            metadata.firstName = profile.firstName;
            metadata.lastName = profile.lastName;
            metadata.role = profile.role;
        }

        if (localStorage.getItem(FINGERPRINT_STORAGE_KEY) === "true") {
            if (!window.crypto?.subtle) {
                throw new Error("L’empreinte SHA-256 nécessite un navigateur sécurisé (HTTPS ou localhost).");
            }

            const bytes = new TextEncoder().encode(String(content));
            const digest = await window.crypto.subtle.digest("SHA-256", bytes);
            const hex = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
            metadata.fingerprint = { algorithm: "SHA-256", scope: "document-content", value: hex };
        }

        return metadata;
    };

    document.addEventListener("DOMContentLoaded", createProfileMenu, { once: true });
})();
