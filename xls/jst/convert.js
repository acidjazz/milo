var data, datas, i, k, labels, sheet, v, workbook, xls, _i;

xls = require('xlsjs');

workbook = xls.readFile('mktt_events.xls');

labels = {
  Market: 'B',
  Day: 'C',
  Date: 'D',
  Event: 'E',
  Type: 'F',
  Time: 'G',
  Address: 'H',
  City: 'I',
  State: 'J',
  Zip: 'K'
};

sheet = workbook.Sheets['Routing Schedule'];

console.log(workbook.Sheets['Routing Schedule']['B21'].v);

console.log(workbook.Sheets['Routing Schedule']['B22'].v);

datas = [];

for (i = _i = 9; _i <= 41; i = ++_i) {
  data = {};
  for (k in labels) {
    v = labels[k];
    if (sheet[v + i]) {
      data[k] = k === 'Date' ? sheet[v + i].w : sheet[v + i].v;
    }
  }
  if (data !== null) {
    datas[i] = data;
  }
}

console.log(JSON.stringify(datas));
