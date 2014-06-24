
xls = require('xlsjs')
workbook = xls.readFile('mktt_events.xls')

labels =
  Market: 'B'
  Day: 'C'
  Date: 'D'
  Event: 'E'
  Type: 'F'
  Time: 'G'
  Address: 'H'
  City: 'I'
  State: 'J'
  Zip: 'K'

sheet = workbook.Sheets['Routing Schedule']
console.log workbook.Sheets['Routing Schedule']['B21'].v
console.log workbook.Sheets['Routing Schedule']['B22'].v

datas = []
for i in [9..41]
  data = {}
  for k, v of labels
    if sheet[v + i]
      data[k] =  if k is 'Date' then sheet[v + i].w else sheet[v + i].v
  datas[i] = data if data isnt null

console.log JSON.stringify datas
