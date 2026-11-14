let currentEditingGraphId = null;
const chartColors = ['#0f766e', '#0ea5e9', '#f59e0b', '#e11d48', '#7c3aed', '#14b8a6', '#64748b'];
const escapeChartText = value => String(value ?? '').replace(/[&<>"']/g, character => ({
   '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));
window.openChartSelection = function () {
   const modal = document.getElementById('modal-chart-select');
   modal.style.display = 'block';
   modal.querySelector('.chart-type-card')?.focus();
};
window.insertNewChart = function (type) {
   document.getElementById('modal-chart-select').style.display = 'none';
   const defaultData = type === 'math' ? [{ x: -2, y: 4 }, { x: -1, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 }] : [{
      label: "A", val: 10
   }, { label: "B", val: 25
   }, { label: "C", val: 15
   }, { label: "D", val: 40 }];
   const id = 'chart-' + Date.now();
   const dataJSON = JSON.stringify(defaultData).replace(/"/g, '&quot;');
   const html = `<p><br></p>
        <div class="dw-html-chart" id="${id}" data-chart-type="${type}" data-chart-json="${dataJSON}" contenteditable="false">
            <div class="dw-chart-overlay">
                <button class="dw-chart-btn dw-btn-edit" onclick="openEditChart('${id}')">Modifier</button>
                <button class="dw-chart-btn dw-btn-delete" onclick="deleteChart('${id}')">Supprimer</button>
            </div>
            <div class="dw-chart-title">Titre du graphique</div>
            <div class="dw-chart-render" id="render-${id}"></div>
        </div><p><br></p> <p><br></p>
    `;
   insertAtCursorHTML(html);
   setTimeout(() => renderChartVisuals(id), 50);
};
window.renderChartVisuals = function (id) {
   const container = document.getElementById(id);
   if (!container) return;
   const type = container.getAttribute('data-chart-type');
   const titleText = container.querySelector('.dw-chart-title');
   const renderZone = document.getElementById(`render-${id}`);
   const dataRaw = container.getAttribute('data-chart-json');
   let data = [];
   try {
      data = JSON.parse(dataRaw.replace(/&quot;/g, '"'));
   }
   catch (e) {
      return;
   }
   const maxVal = Math.max(...data.map(d => parseFloat(d.val) || 0), 1);
   const colors = chartColors;
   renderZone.innerHTML = '';
   if (type === 'math') {
      renderMathChart(renderZone, data);
   }
   else if (type === 'bar') {
      renderZone.style.borderBottom = '2px solid #9ca3af';
      renderZone.style.borderLeft = '2px solid #9ca3af';
      data.forEach(d => {
         const h = ((parseFloat(d.val) || 0) / maxVal) * 100;
         renderZone.innerHTML += `
                <div class="dw-bar-col">
                    <div class="dw-bar-val">${escapeChartText(d.val)}</div>
                    <div class="dw-bar-fill" style="height: ${h}%;"></div>
                    <div class="dw-bar-label" title="${escapeChartText(d.label)}">${escapeChartText(d.label)}</div>
                </div>
            `;
      });
   }
   else if (type === 'line') {
      renderZone.style.borderBottom = '2px solid #9ca3af';
      renderZone.style.borderLeft = '2px solid #9ca3af';
      let points = data.map((d, index) => {
         let x = (index / Math.max(1, data.length - 1)) * 100;
         let y = 100 - (((parseFloat(d.val) || 0) / maxVal) * 100);
         return `${x},${y}`;
      }).join(' ');
      let circlesHTML = data.map((d, index) => {
         let x = (index / Math.max(1, data.length - 1)) * 100;
         let y = 100 - (((parseFloat(d.val) || 0) / maxVal) * 100);
         return `<circle cx="${x}" cy="${y}" r="2" fill="#e11d48"/>
                    <text x="${x}" y="${y-4}" font-size="4" fill="#475569" text-anchor="middle">${escapeChartText(d.val)}</text>`;
      }).join('');
      renderZone.innerHTML = `
            <svg viewBox="0 -5 100 110" style="width:100%; height:100%; overflow:visible;">
                <polyline points="${points}" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round"/>
                ${circlesHTML}
            </svg>
        `;
   }
   else if (type === 'pie') {
      renderZone.style.borderBottom = 'none';
      renderZone.style.borderLeft = 'none';
      let total = data.reduce((sum, d) => sum + (parseFloat(d.val) || 0), 0);
      let gradientStr = [];
      let currentPercent = 0;
      let legendHTML = '';
      data.forEach((d, i) => {
         let val = parseFloat(d.val) || 0;
         let percent = (val / total) * 100;
         let color = colors[i % colors.length];
         gradientStr.push(`${color} ${currentPercent}% ${currentPercent + percent}%`);
         currentPercent += percent;
         legendHTML += `<div style="display:flex; align-items:center; font-size:12px; margin-bottom:4px;">
                <span style="display:inline-block; width:12px; height:12px; background:${color}; margin-right:8px; border-radius:3px;"></span>
                ${escapeChartText(d.label)} (${escapeChartText(val)})
            </div>`;
      });
      renderZone.innerHTML = `
            <div style="display:flex; width:100%; align-items:center; justify-content:center; gap:30px;">
                <div class="dw-pie-chart" style="background: conic-gradient(${gradientStr.join(', ')});"></div>
                <div style="display:flex; flex-direction:column; justify-content:center;">${legendHTML}</div>
            </div>
        `;
   }
   else if (type === 'hbar') {
      renderZone.style.borderBottom = 'none';
      renderZone.style.borderLeft = 'none';
      renderZone.style.flexDirection = 'column';
      renderZone.style.justifyContent = 'center';
      renderZone.style.alignItems = 'stretch';
      data.forEach(d => {
         const w = ((parseFloat(d.val) || 0) / maxVal) * 100;
         const isSmall = w < 15;
         renderZone.innerHTML += `
                <div class="dw-hbar-row">
                    <div class="dw-hbar-label" title="${escapeChartText(d.label)}">${escapeChartText(d.label)}</div>
                    <div class="dw-hbar-track">
                        <div class="dw-hbar-fill" style="width: ${w}%;">
                            ${!isSmall ? `<span class="dw-hbar-val-in">${escapeChartText(d.val)}</span>` : ''}
                        </div>
                        ${isSmall ? `<span class="dw-hbar-val-out">${escapeChartText(d.val)}</span>` : ''}
                    </div>
                </div>
            `;
      });
   }
   else if (type === 'lineplus') {
      renderZone.style.borderBottom = 'none';
      renderZone.style.borderLeft = 'none';
      const chartWidth = 95;
      const chartHeight = 85;
      const offsetX = 15;
      const offsetY = 5;
      let points = data.map((d, index) => {
         let x = offsetX + (index / Math.max(1, data.length - 1)) * chartWidth;
         let y = offsetY + chartHeight - (((parseFloat(d.val) || 0) / maxVal) * chartHeight);
         return `${x},${y}`;
      }).join(' ');
      let circlesHTML = data.map((d, index) => {
         let x = offsetX + (index / Math.max(1, data.length - 1)) * chartWidth;
         let y = offsetY + chartHeight - (((parseFloat(d.val) || 0) / maxVal) * chartHeight);
         return `<circle cx="${x}" cy="${y}" r="2" fill="#ef4444"/>`;
      }).join('');
      let yAxisHTML = `
            <line x1="${offsetX}" y1="${offsetY}" x2="${offsetX}" y2="${offsetY + chartHeight}" stroke="#9ca3af" stroke-width="0.5"/>
            <text x="${offsetX - 2}" y="${offsetY + 2}" font-size="4" fill="#6b7280" text-anchor="end">${maxVal}</text>
            <text x="${offsetX - 2}" y="${offsetY + (chartHeight / 2) + 1.5}" font-size="4" fill="#6b7280" text-anchor="end">${Math.round(maxVal/2)}</text>
            <text x="${offsetX - 2}" y="${offsetY + chartHeight}" font-size="4" fill="#6b7280" text-anchor="end">0</text>
        `;
      let xAxisHTML = `
            <line x1="${offsetX}" y1="${offsetY + chartHeight}" x2="${offsetX + chartWidth}" y2="${offsetY + chartHeight}" stroke="#9ca3af" stroke-width="0.5"/>
        `;
      let xLabelsHTML = data.map((d, index) => {
         let x = offsetX + (index / Math.max(1, data.length - 1)) * chartWidth;
         let shortLabel = String(d.label).length > 6 ? String(d.label).substring(0, 5) + '.' : d.label;
         return `<text x="${x}" y="${offsetY + chartHeight + 7}" font-size="4" fill="#4b5563" text-anchor="middle">${escapeChartText(shortLabel)}</text>`;
      }).join('');
      renderZone.innerHTML = `
            <svg viewBox="0 0 115 105" style="width:100%; height:100%; overflow:visible; font-family: sans-serif;">
                ${yAxisHTML}
                ${xAxisHTML}
                ${xLabelsHTML}
                <polyline points="${points}" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linejoin="round"/>
                ${circlesHTML}
            </svg>
        `;
   }
};
function renderMathChart(renderZone, data) {
   const points = data
      .map(point => ({ x: Number(point.x), y: Number(point.y) }))
      .filter(point => Number.isFinite(point.x) && Number.isFinite(point.y));
   if (!points.length) {
      renderZone.innerHTML = '<div class="dw-chart-empty">Ajoutez des points pour afficher le repère.</div>';
      return;
   }
   const xValues = points.map(point => point.x);
   const yValues = points.map(point => point.y);
   const minX = Math.min(0, ...xValues);
   const maxX = Math.max(0, ...xValues);
   const minY = Math.min(0, ...yValues);
   const maxY = Math.max(0, ...yValues);
   const xSpan = Math.max(maxX - minX, 1);
   const ySpan = Math.max(maxY - minY, 1);
   const padX = xSpan * 0.08;
   const padY = ySpan * 0.08;
   const left = minX - padX;
   const right = maxX + padX;
   const bottom = minY - padY;
   const top = maxY + padY;
   const height = 85;
   const plotWidth = Math.max(140, Math.round((renderZone.clientWidth / Math.max(renderZone.clientHeight, 1)) * 84));
   const toSvgX = x => ((x - left) / (right - left)) * plotWidth;
   const toSvgY = y => height - ((y - bottom) / (top - bottom)) * height;
   const xAxis = toSvgY(0);
   const yAxis = toSvgX(0);
   const curvePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${toSvgX(point.x)} ${toSvgY(point.y)}`).join(' ');
   const circles = points.map(point => `<circle cx="${toSvgX(point.x)}" cy="${toSvgY(point.y)}" r="1.15" fill="#e11d48"><title>(${point.x}; ${point.y})</title></circle>`).join('');
   const xLabels = points.filter((point, index, all) => index === 0 || index === all.length - 1 || point.x === 0).map(point => `<text x="${toSvgX(point.x)}" y="${Math.min(height + 5, xAxis + 5)}" text-anchor="middle">${escapeChartText(formatChartNumber(point.x))}</text>`).join('');
   const yLabels = [bottom, 0, top].map(value => `<text x="${Math.max(2, yAxis - 2)}" y="${toSvgY(value) + 1.5}" text-anchor="end">${escapeChartText(formatChartNumber(value))}</text>`).join('');
   const gridId = `math-grid-${Date.now()}`;
   renderZone.className = 'dw-chart-render dw-math-render';
   renderZone.innerHTML = `<svg viewBox="0 0 ${plotWidth} 84" preserveAspectRatio="none" aria-label="Repère cartésien">
      <defs><pattern id="${gridId}" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="#dbe7e8" stroke-width="0.35"/></pattern></defs>
      <rect x="0" y="0" width="${plotWidth}" height="78" fill="url(#${gridId})"/>
      <line x1="0" y1="${xAxis}" x2="${plotWidth}" y2="${xAxis}" class="dw-math-axis"/>
      <line x1="${yAxis}" y1="0" x2="${yAxis}" y2="78" class="dw-math-axis"/>
      <path d="${curvePath}" class="dw-math-curve"/>
      ${circles}${xLabels}${yLabels}
   </svg>`;
}
function formatChartNumber(value) {
   return Number.isInteger(value) ? String(value) : Number(value.toFixed(2)).toString();
}
function normalizeMathExpression(expression) {
   return expression.trim()
      .replace(/\^/g, '**')
      .replace(/\b(sin|cos|tan|sqrt|abs|log|exp)\s*\(/g, 'Math.$1(')
      .replace(/\bPI\b/g, 'Math.PI');
}
