window.checkPageOverflow = window.rebalancePages;
const btnOpenModal = document.getElementById('openModalBtn');
const btnOpenInster = document.getElementById('openModalinster');
const btnOpenPara = document.getElementById('openModalpara');
const closeBtn = document.querySelector('.closebtnt');

let currentSelectedImage = null;
let isResizing = false;
let isDraggingImage = false;
let currentHandle = null;
let startX, startY, startW, startH, imgRatio;
let dragOffsetX = 0,
   dragOffsetY = 0;

let undoStack = [];
let redoStack = [];
const MAX_HISTORY = 50;
let isRestoringHistory = false;
let typingTimer = null;

const importInput = document.getElementById('import-word-input');
window.documentComments = window.documentComments || {};
let commentPanelTimer = null;

const pageDimensions = {
   'A4': {
      width: 210,
      height: 297
   },
   'A5': {
      width: 148,
      height: 210
   },
   'Letter': {
      width: 215.9,
      height: 279.4
   },
   'Legal': {
      width: 215.9,
      height: 355.6
   }
};

const pageMargins = {
   'no': 0,
   'narrow': 10,
   'normal': 20,
   'wide': 30
};

