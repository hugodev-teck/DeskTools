let pendingTableRange = null;
let pendingTablePage = null;

function setTableCreatorError(message) {
   const error = document.getElementById('table-creator-error');
   if (!error) return;
   error.textContent = message;
   error.hidden = !message;
}

function setTableToolbarStatus(message) {
   const status = document.getElementById('table-toolbar-status');
   if (!status) return;
   status.textContent = message;
   status.hidden = !message;
}

function hideTableCreator() {
   const modal = document.getElementById('table-creator-modal');
   if (modal) modal.setAttribute('aria-hidden', 'true');
   pendingTableRange = null;
   pendingTablePage = null;
}

function toggleTableCreator(event) {
   if (event) event.stopPropagation();
   const modal = document.getElementById('table-creator-modal');
   if (!modal) {
      console.error("La fenêtre de création de tableau est introuvable.");
      return;
   }
   if (modal.getAttribute('aria-hidden') === 'false') {
      hideTableCreator();
      return;
   }

   const selection = window.getSelection();
   pendingTableRange = selection && selection.rangeCount > 0
      ? selection.getRangeAt(0).cloneRange()
      : null;
   pendingTablePage = pendingTableRange
      ? getPageForRange(pendingTableRange)
      : (typeof activePage !== 'undefined' && activePage ? activePage : document.querySelector('.page'));

   const button = event && event.currentTarget;
   if (button) {
      const rect = button.getBoundingClientRect();
      modal.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - 250))}px`;
      modal.style.top = `${Math.max(12, Math.min(rect.bottom + 6, window.innerHeight - 230))}px`;
   }
   setTableCreatorError('');
   modal.setAttribute('aria-hidden', 'false');
   const rows = document.getElementById('tbl-rows');
   if (rows) rows.focus();
}

function getPageForRange(range) {
   const node = range && range.startContainer;
   const element = node && (node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement);
   return element ? element.closest('.page') : null;
}

function confirmInsertTable() {
   const rowsInput = document.getElementById('tbl-rows');
   const colsInput = document.getElementById('tbl-cols');
   const rows = rowsInput ? Number(rowsInput.value) : NaN;
   const cols = colsInput ? Number(colsInput.value) : NaN;
   if (!Number.isInteger(rows) || rows < 1 || rows > 30 ||
       !Number.isInteger(cols) || cols < 1 || cols > 20) {
      setTableCreatorError('Choisissez entre 1 et 30 lignes et entre 1 et 20 colonnes.');
      return;
   }

   const hasHeader = Boolean(document.getElementById('tbl-header')?.checked);
   const table = document.createElement('table');
   table.className = 'dw-table';
   table.id = `dw-table-insert-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
   if (hasHeader) {
      const head = table.createTHead();
      const headerRow = head.insertRow();
      for (let column = 0; column < cols; column++) {
         const cell = document.createElement('th');
         cell.scope = 'col';
         cell.textContent = `En-tête ${column + 1}`;
         headerRow.appendChild(cell);
      }
   }

   const body = table.createTBody();
   const bodyRows = Math.max(0, rows - Number(hasHeader));
   for (let rowIndex = 0; rowIndex < bodyRows; rowIndex++) {
      const row = body.insertRow();
      for (let column = 0; column < cols; column++) {
         const cell = row.insertCell();
         cell.appendChild(document.createElement('br'));
      }
   }

   if (!insertAtSavedTableRange(table.outerHTML + '<p><br></p>')) return;
   hideTableCreator();

   const insertedTable = document.getElementById(table.id);
   if (insertedTable) {
      insertedTable.removeAttribute('id');
      const page = insertedTable.closest('.page');
      if (page && typeof rebalancePages === 'function') rebalancePages(page);
      if (typeof window.markPaperDocumentDirty === 'function') {
         window.markPaperDocumentDirty();
      }
      saveTableHistoryState();
      focusTableCell(insertedTable.querySelector('tbody td, th'), 'start');
   }
}

function insertAtCursorHTML(html) {
   const selection = window.getSelection();
   const range = selection && selection.rangeCount > 0
      ? selection.getRangeAt(0).cloneRange()
      : null;
   const page = getPageForRange(range) ||
      (typeof activePage !== 'undefined' && activePage ? activePage : document.querySelector('.page'));
   return insertHTMLAtRange(html, range, page);
}

function insertAtSavedTableRange(html) {
   const range = pendingTableRange && pendingTableRange.cloneRange();
   const page = pendingTablePage && pendingTablePage.isConnected
      ? pendingTablePage
      : (getPageForRange(range) || (typeof activePage !== 'undefined' ? activePage : null));
   return insertHTMLAtRange(html, range, page);
}

function insertHTMLAtRange(html, range, page) {
   if (!page || !page.isConnected) {
      setTableCreatorError("Cliquez dans une page du document avant d’insérer le tableau.");
      return false;
   }

   const selection = window.getSelection();
   if (!range || !range.startContainer.isConnected || !range.endContainer.isConnected ||
       !page.contains(range.startContainer) || !page.contains(range.endContainer)) {
      range = document.createRange();
      range.selectNodeContents(page);
      range.collapse(false);
   }
   if (!selection) {
      console.error("La sélection du document n’est pas disponible pour l’insertion.");
      return false;
   }

   saveTableHistoryState();
   page.focus();
   selection.removeAllRanges();
   selection.addRange(range);
   const originalHTML = page.innerHTML;
   let commandReportedSuccess = false;
   try {
      commandReportedSuccess = typeof document.execCommand === 'function' &&
         document.execCommand('insertHTML', false, html);
   } catch (error) {
      console.warn("L’insertion via la commande d’édition a échoué ; utilisation de l’insertion DOM.", error);
   }
   let inserted = page.innerHTML !== originalHTML;
   if (!inserted) {
      const insertionRange = range.cloneRange();
      insertionRange.deleteContents();
      const fragment = insertionRange.createContextualFragment(html);
      const lastInsertedNode = fragment.lastChild;
      insertionRange.insertNode(fragment);
      if (lastInsertedNode && lastInsertedNode.isConnected) {
         insertionRange.setStartAfter(lastInsertedNode);
         insertionRange.collapse(true);
         selection.removeAllRanges();
         selection.addRange(insertionRange);
      }
      inserted = true;
   }
   if (!inserted && commandReportedSuccess) {
      console.error("La commande d’édition a signalé un succès sans modifier le contenu.");
   }
   if (!inserted) {
      console.error("Le navigateur n’a pas inséré le contenu à la position sélectionnée.");
      return false;
   }
   if (!commandReportedSuccess) {
      page.dispatchEvent(new Event('input', { bubbles: true }));
   }
   if (typeof window.markPaperDocumentDirty === 'function') {
      window.markPaperDocumentDirty();
   }
   saveTableHistoryState();

   return true;
}

window.insertTableQuick = function() {
   const selection = window.getSelection();
   pendingTableRange = selection && selection.rangeCount > 0
      ? selection.getRangeAt(0).cloneRange()
      : null;
   pendingTablePage = pendingTableRange
      ? getPageForRange(pendingTableRange)
      : (typeof activePage !== 'undefined' && activePage ? activePage : document.querySelector('.page'));

   const rows = document.getElementById('tbl-rows');
   const columns = document.getElementById('tbl-cols');
   const header = document.getElementById('tbl-header');
   if (rows) rows.value = '3';
   if (columns) columns.value = '3';
   if (header) header.checked = true;
   confirmInsertTable();
};

function focusTableCell(cell, position = 'start') {
   if (!cell) return;
   const page = cell.closest('.page');
   if (page) page.focus();
   const selection = window.getSelection();
   if (!selection) return;
   const range = document.createRange();
   range.selectNodeContents(cell);
   range.collapse(position === 'start');
   selection.removeAllRanges();
   selection.addRange(range);
}

function saveTableHistoryState() {
   if (typeof saveHistoryState === 'function') saveHistoryState();
}

let tableResizeOverlay = null;
let tableResizeDrag = null;

function getTableColumnWidths(table) {
   const firstRow = table.rows[0];
   if (!firstRow || tableHasMergedCells(table)) return null;

   const cells = Array.from(firstRow.cells);
   if (!cells.length || Array.from(table.rows).some(row => row.cells.length !== cells.length)) return null;

   const tableWidth = table.getBoundingClientRect().width;
   const measuredWidths = cells.map(cell => cell.getBoundingClientRect().width);
   const measuredTotal = measuredWidths.reduce((total, width) => total + width, 0);
   if (!tableWidth || !measuredTotal) return null;
   return measuredWidths.map(width => width * tableWidth / measuredTotal);
}

function applyTableColumnWidths(table, widths) {
   let colgroup = table.querySelector(':scope > colgroup');
   if (!colgroup) {
      colgroup = document.createElement('colgroup');
      table.insertBefore(colgroup, table.firstChild);
   }
   while (colgroup.children.length < widths.length) colgroup.appendChild(document.createElement('col'));
   while (colgroup.children.length > widths.length) colgroup.lastElementChild.remove();

   widths.forEach((width, index) => {
      colgroup.children[index].style.width = `${width}px`;
   });
   table.style.width = `${widths.reduce((total, width) => total + width, 0)}px`;
}

function createTableResizeOverlay() {
   if (tableResizeOverlay) return tableResizeOverlay;
   tableResizeOverlay = document.createElement('div');
   tableResizeOverlay.id = 'dw-table-resize-overlay';
   tableResizeOverlay.setAttribute('aria-label', 'Poignées de redimensionnement du tableau');
   document.body.appendChild(tableResizeOverlay);

   tableResizeOverlay.addEventListener('pointerdown', event => {
      const handle = event.target.closest('[data-resize-type]');
      if (!handle || !window.currentSelectedTable) return;
      const table = window.currentSelectedTable;
      const type = handle.dataset.resizeType;
      const row = type === 'row' ? table.rows[Number(handle.dataset.rowIndex)] : null;
      const widths = type === 'column' || type === 'table' ? getTableColumnWidths(table) : null;
      if (type === 'column' && !widths) return;

      event.preventDefault();
      event.stopPropagation();
      saveTableHistoryState();
      if (handle.setPointerCapture) handle.setPointerCapture(event.pointerId);
      tableResizeDrag = {
         pointerId: event.pointerId,
         type,
         table,
         row,
         columnIndex: Number(handle.dataset.columnIndex),
         startX: event.clientX,
         startY: event.clientY,
         startWidth: table.getBoundingClientRect().width,
         startHeight: table.getBoundingClientRect().height,
         startRowHeight: row ? row.getBoundingClientRect().height : 0,
         widths
      };
   });

   document.addEventListener('pointermove', event => {
      const drag = tableResizeDrag;
      if (!drag || event.pointerId !== drag.pointerId || !drag.table.isConnected) return;
      event.preventDefault();
      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;

      if (drag.type === 'column') {
         const index = drag.columnIndex;
         const minimum = 50;
         const delta = Math.max(
            minimum - drag.widths[index],
            Math.min(deltaX, drag.widths[index + 1] - minimum)
         );
         const widths = drag.widths.slice();
         widths[index] += delta;
         widths[index + 1] -= delta;
         applyTableColumnWidths(drag.table, widths);
      } else if (drag.type === 'row' && drag.row && drag.row.isConnected) {
         drag.row.style.height = `${Math.max(32, drag.startRowHeight + deltaY)}px`;
      } else if (drag.type === 'table') {
         const page = drag.table.closest('.page');
         const minimumWidth = 120;
         const pageStyle = page ? window.getComputedStyle(page) : null;
         const pagePadding = pageStyle
            ? parseFloat(pageStyle.paddingLeft) + parseFloat(pageStyle.paddingRight)
            : 0;
         const maximumWidth = page
            ? Math.max(minimumWidth, page.clientWidth - pagePadding)
            : window.innerWidth;
         const width = Math.max(minimumWidth, Math.min(drag.startWidth + deltaX, maximumWidth));
         const height = Math.max(48, drag.startHeight + deltaY);
         drag.table.style.height = `${height}px`;
         if (drag.widths) {
            const scale = width / drag.startWidth;
            applyTableColumnWidths(drag.table, drag.widths.map(columnWidth => columnWidth * scale));
         } else {
            drag.table.style.width = `${width}px`;
         }
      }

   });

   document.addEventListener('pointerup', finishTableResize);
   document.addEventListener('pointercancel', finishTableResize);
   return tableResizeOverlay;
}

function finishTableResize(event) {
   const drag = tableResizeDrag;
   if (!drag || (event && event.pointerId !== drag.pointerId)) return;
   tableResizeDrag = null;
   if (!drag.table.isConnected) return;

   const page = drag.table.closest('.page');
   if (page) page.dispatchEvent(new Event('input', { bubbles: true }));
   if (typeof window.markPaperDocumentDirty === 'function') {
      window.markPaperDocumentDirty();
   }
   saveTableHistoryState();
   if (window.currentSelectedCell && window.currentSelectedCell.isConnected) {
      positionTableToolbar(window.currentSelectedCell);
   }
   positionTableResizeHandles(drag.table);
}

function positionTableResizeHandles(table) {
   const overlay = createTableResizeOverlay();
   if (!table || !table.isConnected || table !== window.currentSelectedTable) {
      overlay.replaceChildren();
      overlay.style.display = 'none';
      return;
   }

   overlay.replaceChildren();
   overlay.style.display = 'block';
   const tableRect = table.getBoundingClientRect();
   if (tableRect.width <= 0 || tableRect.height <= 0) {
      overlay.style.display = 'none';
      return;
   }

   const addHandle = (type, className, label, left, top, attributes = {}) => {
      const handle = document.createElement('button');
      handle.type = 'button';
      handle.className = `dw-table-resize-handle ${className}`;
      handle.dataset.resizeType = type;
      handle.setAttribute('aria-label', label);
      handle.title = label;
      Object.entries(attributes).forEach(([name, value]) => {
         handle.dataset[name] = String(value);
      });
      handle.style.left = `${left}px`;
      handle.style.top = `${top}px`;
      overlay.appendChild(handle);
   };

   const firstRow = table.rows[0];
   const canResizeColumns = firstRow && !tableHasMergedCells(table) &&
      Array.from(table.rows).every(row => row.cells.length === firstRow.cells.length);
   if (canResizeColumns) {
      Array.from(firstRow.cells).slice(0, -1).forEach((cell, index) => {
         const rect = cell.getBoundingClientRect();
         addHandle('column', 'dw-table-column-handle', 'Redimensionner la colonne', rect.right - 5, rect.top + 5, {
            columnIndex: index
         });
      });
   }

   Array.from(table.rows).forEach((row, index) => {
      const rect = row.getBoundingClientRect();
      if (rect.height > 0) {
         addHandle('row', 'dw-table-row-handle', 'Redimensionner la ligne', tableRect.left - 10, rect.bottom - 5, {
            rowIndex: index
         });
      }
   });

   addHandle(
      'table',
      'dw-table-corner-handle',
      'Redimensionner le tableau en largeur et en hauteur',
      tableRect.right - 8,
      tableRect.bottom - 8
   );
}

function positionTableToolbar(cell) {
   const toolbar = document.getElementById('table-floating-toolbar');
   if (!toolbar || !cell) return;
   toolbar.style.display = 'flex';

   const cellRect = cell.getBoundingClientRect();
   const toolbarRect = toolbar.getBoundingClientRect();
   const gap = 10;
   const left = cellRect.right + toolbarRect.width + gap <= window.innerWidth
      ? cellRect.right + gap
      : cellRect.left - toolbarRect.width - gap;
   toolbar.style.left = `${Math.max(8, Math.min(left, window.innerWidth - toolbarRect.width - 8))}px`;
   toolbar.style.top = `${Math.max(8, Math.min(cellRect.top, window.innerHeight - toolbarRect.height - 8))}px`;
}

function selectTableCell(cell) {
   const table = cell && cell.closest('table.dw-table');
   const toolbar = document.getElementById('table-floating-toolbar');
   if (!table || !toolbar) return;
   window.currentSelectedTable = table;
   window.currentSelectedCell = cell;
   setTableToolbarStatus('');
   positionTableToolbar(cell);
   positionTableResizeHandles(table);
}

function hideTableToolbar() {
   const toolbar = document.getElementById('table-floating-toolbar');
   if (toolbar) toolbar.style.display = 'none';
   if (tableResizeOverlay) {
      tableResizeOverlay.replaceChildren();
      tableResizeOverlay.style.display = 'none';
   }
   window.currentSelectedTable = null;
   window.currentSelectedCell = null;
}

function getSelectedTableContext() {
   const cell = window.currentSelectedCell;
   const table = window.currentSelectedTable;
   if (!cell || !table || !cell.isConnected || !table.isConnected || !table.contains(cell)) {
      setTableToolbarStatus('Sélectionnez une cellule du tableau.');
      hideTableToolbar();
      return null;
   }
   return { cell, table, row: cell.closest('tr') };
}

function tableHasMergedCells(table) {
   return Array.from(table.rows).some(row =>
      Array.from(row.cells).some(cell => cell.colSpan > 1 || cell.rowSpan > 1)
   );
}

function rejectMergedCellMutation(table) {
   if (!tableHasMergedCells(table)) return false;
   setTableToolbarStatus('Modifiez la structure de ce tableau sans fusionner les cellules.');
   return true;
}

function completeTableMutation(focusCell) {
   const page = (focusCell && focusCell.closest('.page')) ||
      (typeof activePage !== 'undefined' ? activePage : null);
   if (page && typeof rebalancePages === 'function') rebalancePages(page);
   saveTableHistoryState();
   if (focusCell && focusCell.isConnected) {
      selectTableCell(focusCell);
      focusTableCell(focusCell, 'start');
   } else {
      hideTableToolbar();
   }
}

function addTableRow(direction = 'below') {
   const context = getSelectedTableContext();
   if (!context) return;
   const { cell, table, row } = context;
   if (rejectMergedCellMutation(table)) return;
   const newRow = document.createElement('tr');
   for (let index = 0; index < row.cells.length; index++) {
      const newCell = document.createElement(row.parentElement.tagName === 'THEAD' ? 'th' : 'td');
      if (newCell.tagName === 'TH') newCell.scope = 'col';
      newCell.appendChild(document.createElement('br'));
      newRow.appendChild(newCell);
   }
   saveTableHistoryState();
   if (row.parentElement.tagName === 'THEAD' && direction === 'below') {
      const body = table.tBodies[0] || table.createTBody();
      body.insertBefore(newRow, body.firstChild);
   } else {
      row.parentNode.insertBefore(newRow, direction === 'above' ? row : row.nextSibling);
   }
   completeTableMutation(newRow.cells[Math.min(cell.cellIndex, newRow.cells.length - 1)]);
}

function addColumn(direction = 'right') {
   const context = getSelectedTableContext();
   if (!context) return;
   const { cell, table } = context;
   if (rejectMergedCellMutation(table)) return;
   const cellIndex = cell.cellIndex;
   let focusCell = null;

   saveTableHistoryState();
   Array.from(table.rows).forEach(row => {
      const referenceCell = row.cells[cellIndex];
      const newCell = document.createElement(referenceCell && referenceCell.tagName === 'TH' ? 'th' : 'td');
      if (newCell.tagName === 'TH') {
         newCell.scope = 'col';
         newCell.textContent = 'Nouvel en-tête';
      } else {
         newCell.appendChild(document.createElement('br'));
      }
      if (referenceCell) {
         row.insertBefore(newCell, direction === 'left' ? referenceCell : referenceCell.nextSibling);
      } else {
         row.appendChild(newCell);
      }
      if (row === cell.closest('tr')) focusCell = newCell;
   });
   completeTableMutation(focusCell);
}

function deleteTableRow() {
   const context = getSelectedTableContext();
   if (!context) return;
   if (rejectMergedCellMutation(context.table)) return;
   if (context.table.rows.length <= 1) {
      setTableToolbarStatus('Un tableau doit conserver au moins une ligne.');
      return;
   }
   const table = context.table;
   const nextRow = context.row.nextElementSibling || context.row.previousElementSibling;
   saveTableHistoryState();
   context.row.remove();
   const replacementRow = nextRow || table.rows[0];
   completeTableMutation(replacementRow && replacementRow.cells[Math.min(context.cell.cellIndex, replacementRow.cells.length - 1)]);
}

function deleteTableColumn() {
   const context = getSelectedTableContext();
   if (!context) return;
   if (rejectMergedCellMutation(context.table)) return;
   const rows = Array.from(context.table.rows);
   if (rows.every(row => row.cells.length <= 1)) {
      setTableToolbarStatus('Un tableau doit conserver au moins une colonne.');
      return;
   }

   const cellIndex = context.cell.cellIndex;
   let focusCell = null;
   saveTableHistoryState();
   rows.forEach(row => {
      const target = row.cells[cellIndex];
      if (!target) return;
      const replacement = target.nextElementSibling || target.previousElementSibling;
      if (row === context.row) focusCell = replacement;
      target.remove();
   });
   completeTableMutation(focusCell);
}

function deleteTable() {
   const context = getSelectedTableContext();
   if (!context) return;
   const page = context.table.closest('.page');
   saveTableHistoryState();
   context.table.remove();
   hideTableToolbar();
   if (page && typeof rebalancePages === 'function') rebalancePages(page);
   if (typeof window.markPaperDocumentDirty === 'function') {
      window.markPaperDocumentDirty();
   }
   saveTableHistoryState();
}

document.addEventListener('DOMContentLoaded', () => {
   const toolbar = document.getElementById('table-floating-toolbar');
   const creator = document.getElementById('table-creator-modal');
   const pageContainer = document.getElementById('pages-container');
   if (pageContainer) {
      const selectionObserver = new MutationObserver(() => {
         const table = window.currentSelectedTable;
         const cell = window.currentSelectedCell;
         if (table && (!table.isConnected || !cell || !cell.isConnected || !table.contains(cell))) {
            hideTableToolbar();
         }
      });
      selectionObserver.observe(pageContainer, { childList: true, subtree: true });
   }

   if (toolbar) {
      toolbar.addEventListener('mousedown', event => event.preventDefault());
      toolbar.addEventListener('click', event => {
         const button = event.target.closest('[data-table-action]');
         if (!button) return;
         const actions = {
            'row-above': () => addTableRow('above'),
            'row-below': () => addTableRow('below'),
            'column-left': () => addColumn('left'),
            'column-right': () => addColumn('right'),
            'delete-row': deleteTableRow,
            'delete-column': deleteTableColumn,
            'delete-table': deleteTable
         };
         const action = actions[button.dataset.tableAction];
         if (action) action();
      });
   }

   document.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target : event.target.parentElement;
      if (!target) return;
      if (target.closest('#table-floating-toolbar')) return;
      if (target.closest('#dw-table-resize-overlay')) return;

      const cell = target.closest('.page table td, .page table th');
      if (cell) {
         cell.closest('table').classList.add('dw-table');
         selectTableCell(cell);
         return;
      }
      hideTableToolbar();

      if (creator && creator.getAttribute('aria-hidden') === 'false' &&
          !creator.contains(target) && !target.closest('button[onmousedown*="toggleTableCreator"]')) {
         hideTableCreator();
      }
   });

   document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && creator && creator.getAttribute('aria-hidden') === 'false') {
         hideTableCreator();
      }
      if (event.key === 'Enter' && creator && creator.getAttribute('aria-hidden') === 'false' &&
          (event.target.id === 'tbl-rows' || event.target.id === 'tbl-cols')) {
         event.preventDefault();
         confirmInsertTable();
      }

      const target = event.target instanceof Element ? event.target : null;
      const selection = window.getSelection();
      const selectionNode = selection && selection.anchorNode;
      const selectionElement = selectionNode &&
         (selectionNode.nodeType === Node.ELEMENT_NODE ? selectionNode : selectionNode.parentElement);
      const cell = (target && target.closest('.page table td, .page table th')) ||
         (selectionElement && selectionElement.closest('.page table td, .page table th'));
      if (event.key !== 'Tab' || !cell) return;
      const table = cell.closest('table');
      const cells = Array.from(table.querySelectorAll('th, td'));
      const cellIndex = cells.indexOf(cell);
      const nextCell = cells[cellIndex + (event.shiftKey ? -1 : 1)];
      event.preventDefault();
      if (nextCell) {
         focusTableCell(nextCell, event.shiftKey ? 'end' : 'start');
         selectTableCell(nextCell);
      } else if (!event.shiftKey) {
         selectTableCell(cell);
         addTableRow('below');
         const insertedRow = window.currentSelectedCell && window.currentSelectedCell.closest('tr');
         if (insertedRow && insertedRow.cells[0]) {
            selectTableCell(insertedRow.cells[0]);
            focusTableCell(insertedRow.cells[0], 'start');
         }
      }
   });

   window.addEventListener('resize', () => {
      if (window.currentSelectedCell && window.currentSelectedCell.isConnected) {
         positionTableToolbar(window.currentSelectedCell);
         positionTableResizeHandles(window.currentSelectedTable);
      }
   });
   document.addEventListener('scroll', () => {
      if (window.currentSelectedCell && window.currentSelectedCell.isConnected) {
         positionTableToolbar(window.currentSelectedCell);
         positionTableResizeHandles(window.currentSelectedTable);
      }
   }, true);
});
