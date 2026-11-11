window.deleteChart = function (id) {
   const chart = document.getElementById(id);
   if (chart) {
      const page = chart.closest('.page');
      chart.remove();
      if (page && typeof rebalancePages === 'function') rebalancePages(page);
   }
};
window.openEditChart = function (id) {
   currentEditingGraphId = id;
   const container = document.getElementById(id);
   document.getElementById('edit-chart-title').value = container.querySelector('.dw-chart-title').innerText;
   const type = container.getAttribute('data-chart-type');
   const mathZone = document.getElementById('math-function-zone');
   mathZone.style.display = (type === 'math') ? 'block' : 'none';
   const headers = document.querySelectorAll('.chart-data-table thead th');
   if (headers.length >= 2) {
      headers[0].textContent = type === 'math' ? 'X' : 'Libellé';
      headers[1].textContent = type === 'math' ? 'Y' : 'Valeur';
   }
   const dataRaw = container.getAttribute('data-chart-json');
   let data = JSON.parse(dataRaw.replace(/&quot;/g, '"'));
   const tbody = document.getElementById('edit-chart-tbody');
   tbody.innerHTML = '';
   data.forEach(d => addChartDataRow(type === 'math' ? d.x : d.label, type === 'math' ? d.y : d.val));
   document.getElementById('modal-chart-edit').style.display = 'block';
};
window.addChartDataRow = function (label = "Nouv.", val = 10) {
   const tbody = document.getElementById('edit-chart-tbody');
   const tr = document.createElement('tr');
   const isMathChart = currentEditingGraphId && document.getElementById(currentEditingGraphId)?.getAttribute('data-chart-type') === 'math';
   tr.innerHTML = isMathChart ? `
         <td><input type="number" class="edit-x-input" value="${escapeChartText(label)}" step="any"></td>
         <td><input type="number" class="edit-y-input" value="${escapeChartText(val)}" step="any"></td>
         <td><button class="chart-row-delete" type="button" aria-label="Supprimer ce point" onclick="this.closest('tr').remove()">&times;</button></td>
    ` : `
         <td><input type="text" class="edit-label-input" value="${escapeChartText(label)}"></td>
         <td><input type="number" class="edit-val-input" value="${escapeChartText(val)}"></td>
         <td><button class="chart-row-delete" type="button" aria-label="Supprimer cette ligne" onclick="this.closest('tr').remove()">&times;</button></td>
    `;
   tbody.appendChild(tr);
};
window.saveChartData = function () {
   if (!currentEditingGraphId) return;
   const container = document.getElementById(currentEditingGraphId);
   container.querySelector('.dw-chart-title').innerText = document.getElementById('edit-chart-title').value;
   let newData = [];
   if (container.getAttribute('data-chart-type') === 'math') {
      const xs = document.querySelectorAll('.edit-x-input');
      const ys = document.querySelectorAll('.edit-y-input');
      for (let i = 0; i < xs.length; i++) newData.push({ x: Number(xs[i].value), y: Number(ys[i].value) });
   } else {
      const labels = document.querySelectorAll('.edit-label-input');
      const vals = document.querySelectorAll('.edit-val-input');
      for (let i = 0; i < labels.length; i++) newData.push({ label: labels[i].value, val: vals[i].value });
   }
   container.setAttribute('data-chart-json', JSON.stringify(newData).replace(/"/g, '&quot;'));
   renderChartVisuals(currentEditingGraphId);
   document.getElementById('modal-chart-edit').style.display = 'none';
};
window.generateMathFunction = function () {
   const funcStr = normalizeMathExpression(document.getElementById('math-func-input').value);
   if (!funcStr) return;
   if (!currentEditingGraphId || document.getElementById(currentEditingGraphId)?.getAttribute('data-chart-type') !== 'math') return;
   const tbody = document.getElementById('edit-chart-tbody');
   tbody.innerHTML = '';
   const start = Number(document.getElementById('math-x-min').value);
   const end = Number(document.getElementById('math-x-max').value);
   const step = Number(document.getElementById('math-x-step').value);
   if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(step) || step <= 0 || start >= end) {
      alert('Vérifiez les bornes et le pas du repère.');
      return;
   }
   for (let x = start; x <= end && x < start + step * 250; x += step) {
      try {
         const mathFunc = new Function('x', `return ${funcStr};`);
         let y = mathFunc(x);
         if (Number.isFinite(y)) addChartDataRow(formatChartNumber(x), Math.round(y * 100) / 100);
      }
      catch (e) {
         alert("Fonction invalide. Exemples : x^2, sin(x), cos(x) ou sqrt(abs(x)).");
         break;
      }
   }
};

