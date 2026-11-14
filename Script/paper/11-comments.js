function closeCommentsPanel() {
   const panel = document.getElementById('comments-panel');
   if (panel) panel.style.right = '-300px';
   document.querySelectorAll('.dw-comment-highlight.active-highlight').forEach(el => el.classList.remove('active-highlight'));
   document.querySelectorAll('.comment-box.active-box').forEach(el => el.classList.remove('active-box'));
};

function resetCommentTimer() {
   if (commentPanelTimer) clearTimeout(commentPanelTimer);
   commentPanelTimer = setTimeout(() => {
      closeCommentsPanel();
   }, 10000);
};
document.addEventListener('click', (e) => {
   const highlight = e.target.closest('.dw-comment-highlight');
   if (highlight) {
      activateComment(highlight.id);
   }
});

function activateComment(id) {
   const panel = document.getElementById('comments-panel');
   if (panel) panel.style.right = '0';
   resetCommentTimer();
   document.querySelectorAll('.dw-comment-highlight.active-highlight').forEach(el => el.classList.remove('active-highlight'));
   document.querySelectorAll('.comment-box.active-box').forEach(el => el.classList.remove('active-box'));
   const span = document.getElementById(id);
   const box = document.getElementById('box-' + id);
   if (span) span.classList.add('active-highlight');
   if (box) {
      box.classList.add('active-box');
      box.scrollIntoView({
         behavior: 'smooth',
         block: 'nearest'
      });
   }
};

let pendingCommentRange = null;

function getCommentAuthor() {
   const profile = typeof window.getPrismAuthorProfile === 'function'
      ? window.getPrismAuthorProfile()
      : {};
   const firstName = profile.firstName || '';
   const lastName = profile.lastName || '';
   return {
      firstName,
      lastName,
      name: [firstName, lastName].filter(Boolean).join(' ')
   };
}

function updateCommentDialogState() {
   const author = getCommentAuthor();
   const hasAuthor = Boolean(author.firstName.trim() && author.lastName.trim());
   const hasSelection = pendingCommentRange && !pendingCommentRange.collapsed &&
      pendingCommentRange.startContainer.isConnected && pendingCommentRange.endContainer.isConnected;
   const preview = document.getElementById('comment-selection-preview');
   const authorName = document.getElementById('comment-author-name');
   const submit = document.getElementById('comment-submit');
   const error = document.getElementById('comment-modal-error');

   if (preview) {
      preview.textContent = hasSelection
         ? pendingCommentRange.toString()
         : "Aucun texte sélectionné. Fermez cette fenêtre, sélectionnez un passage, puis choisissez « Commenter ».";
   }
   if (authorName) authorName.textContent = hasAuthor ? author.name : 'Profil à compléter';
   if (submit) submit.disabled = !hasSelection || !hasAuthor;
   if (error) {
      error.textContent = !hasSelection
         ? "Un passage de texte doit être sélectionné avant d’ajouter un commentaire."
         : !hasAuthor
            ? "Renseignez votre prénom et votre nom dans votre profil pour signer ce commentaire."
            : '';
      error.hidden = !error.textContent;
   }
}

function closeCommentDialog() {
   const modal = document.getElementById('comment-modal');
   if (modal) modal.setAttribute('aria-hidden', 'true');
   pendingCommentRange = null;
}

function addComment() {
   const selection = window.getSelection();
   pendingCommentRange = selection && !selection.isCollapsed && selection.rangeCount > 0
      ? selection.getRangeAt(0).cloneRange()
      : null;

   const modal = document.getElementById('comment-modal');
   if (!modal) {
      console.error("La fenêtre de commentaire Paper est introuvable.");
      return;
   }

   const input = document.getElementById('comment-input');
   if (input) input.value = '';
   updateCommentDialogState();
   modal.setAttribute('aria-hidden', 'false');

   const customMenu = document.getElementById('custom-menu');
   if (customMenu) customMenu.style.display = 'none';
   if (input) input.focus();
}

function saveComment() {
   const input = document.getElementById('comment-input');
   const error = document.getElementById('comment-modal-error');
   const range = pendingCommentRange;
   const author = getCommentAuthor();
   const hasAuthor = Boolean(author.firstName.trim() && author.lastName.trim());
   const commentText = input ? input.value.trim() : '';

   if (!range || range.collapsed || !range.startContainer.isConnected || !range.endContainer.isConnected) {
      updateCommentDialogState();
      return;
   }
   if (!hasAuthor) {
      updateCommentDialogState();
      return;
   }
   if (!commentText) {
      if (error) {
         error.textContent = "Saisissez le commentaire avant de l’ajouter.";
         error.hidden = false;
      }
      if (input) input.focus();
      return;
   }

   const commentId = 'comment-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
   const span = document.createElement('span');
   span.className = 'dw-comment-highlight';
   span.id = commentId;
   try {
      span.appendChild(range.extractContents());
      range.insertNode(span);
   } catch (exception) {
      console.error("Impossible d’associer le commentaire au texte sélectionné.", exception);
      if (error) {
         error.textContent = "Le passage sélectionné a changé. Fermez cette fenêtre et sélectionnez-le à nouveau.";
         error.hidden = false;
      }
      return;
   }

   const now = new Date();
   window.documentComments[commentId] = {
      text: commentText,
      author: author.name,
      firstName: author.firstName,
      lastName: author.lastName,
      date: now.toLocaleDateString('fr-FR') + ' à ' + now.toLocaleTimeString('fr-FR', {
         hour: '2-digit',
         minute: '2-digit'
      })
   };
   if (typeof window.markPaperDocumentDirty === 'function') {
      window.markPaperDocumentDirty();
   }

   closeCommentDialog();
   renderComments();
   activateComment(commentId);
}

document.addEventListener('DOMContentLoaded', () => {
   const modal = document.getElementById('comment-modal');
   const submit = document.getElementById('comment-submit');
   const cancel = document.getElementById('comment-cancel');
   const input = document.getElementById('comment-input');
   const editProfile = document.getElementById('comment-edit-profile');
   const list = document.getElementById('comments-list');

   if (submit) submit.addEventListener('click', saveComment);
   if (cancel) cancel.addEventListener('click', closeCommentDialog);
   if (editProfile) {
      editProfile.addEventListener('click', () => {
         const profileButton = document.getElementById('prism-profile-button');
         if (profileButton) profileButton.click();
      });
   }
   if (input) {
      input.addEventListener('keydown', event => {
         if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') saveComment();
      });
   }
   if (modal) {
      modal.addEventListener('click', event => {
         if (event.target === modal) closeCommentDialog();
      });
   }
   document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
         closeCommentDialog();
      }
   });
   if (list) {
      list.addEventListener('click', event => {
         const deleteButton = event.target.closest('[data-delete-comment]');
         if (deleteButton) {
            event.stopPropagation();
            deleteComment(deleteButton.dataset.deleteComment);
            return;
         }
         const box = event.target.closest('[data-comment-id]');
         if (box) activateComment(box.dataset.commentId);
      });
   }
   document.addEventListener('prism-profile-change', updateCommentDialogState);
});

function renderComments() {
   const panel = document.getElementById('comments-panel');
   const list = document.getElementById('comments-list');
   if (!panel || !list) return;
   list.innerHTML = '';
   const commentKeys = Object.keys(window.documentComments);
   if (commentKeys.length === 0) {
      closeCommentsPanel();
      return;
   }
   panel.style.right = '0';
   commentKeys.forEach(id => {
      const comment = window.documentComments[id];
      const box = document.createElement('div');
      box.className = 'comment-box';
      box.id = 'box-' + id;
      box.dataset.commentId = id;
      box.style.cursor = 'pointer';

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-btn';
      deleteButton.type = 'button';
      deleteButton.dataset.deleteComment = id;
      deleteButton.title = 'Supprimer';
      deleteButton.setAttribute('aria-label', 'Supprimer le commentaire');
      deleteButton.textContent = '×';

      const author = document.createElement('span');
      author.className = 'comment-author';
      author.textContent = comment.author || [comment.firstName, comment.lastName].filter(Boolean).join(' ') || 'Auteur non renseigné';

      const date = document.createElement('span');
      date.className = 'comment-date';
      date.textContent = comment.date || '';

      const text = document.createElement('p');
      text.textContent = comment.text || '';

      box.append(deleteButton, author, date, text);
      list.appendChild(box);
   });
   resetCommentTimer();
};

function deleteComment(id) {
   delete window.documentComments[id];
   if (typeof window.markPaperDocumentDirty === 'function') {
      window.markPaperDocumentDirty();
   }
   const span = document.getElementById(id);
   if (span) {
      const parent = span.parentNode;
      while (span.firstChild) {
         parent.insertBefore(span.firstChild, span);
      }
      span.remove();
   }
   renderComments();
};
