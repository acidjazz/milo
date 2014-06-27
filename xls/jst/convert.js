var data, datas, i, k, labels, sheet, v, workbook, xls, _i;

xls = require('xlsjs');

workbook = xls.readFile('schedule.xls');

labels = {
  Market: 'A',
  Day: 'B',
  'Date': 'C',
  StartTime: 'D',
  EndTime: 'E',
  Title: 'F',
  Event: 'G',
  Address: 'H',
  City: 'I',
  State: 'J',
  Zip: 'K',
  Type: 'L',
  Description: 'M'
};

sheet = workbook.Sheets['Routing Schedule'];

datas = [];

for (i = _i = 2; _i <= 29; i = ++_i) {
  data = {};
  for (k in labels) {
    v = labels[k];
    if (sheet[v + i]) {
      if (k === 'Date') {
        data[k] = sheet[v + i].w;
      } else if (k === 'StartTime' || k === 'EndTime') {
        data[k] = sheet[v + i].w;
      } else {
        data[k] = sheet[v + i].v;
      }
    }
  }
  if (data !== null) {
    datas[i] = data;
  }
}

console.log(JSON.stringify(datas));
