
xls = require 'xlsjs'
workbook = xls.readFile 'schedule.xls'
fs = require 'fs'

labels =
  Market: 'A'
  Day: 'B'
  'Date': 'C'
  StartTime: 'D'
  EndTime: 'E'
  Title: 'F'
  Event: 'G'
  Address: 'H'
  City: 'I'
  State: 'J'
  Zip: 'K'
  Type: 'L'
  Description: 'M'
  LatLong: 'N'

sheet = workbook.Sheets['Routing Schedule']

datas = []
for i in [6..33]
  data = {}
  for k, v of labels
    if sheet[v + i]
      if k is 'Date'
        data[k] = sheet[v + i].w
      else if k is 'StartTime' or k is 'EndTime'
        data[k] = sheet[v + i].w
      else
        data[k] = sheet[v + i].v

  datas[i] = data if data isnt null
  #console.log "https://maps.googleapis.com/maps/api/geocode/json?address=#{data.Address},+#{data.City}+#{data.State}+#{data.Zip}&key=AIzaSyDFe86zvdhdmxXifqyjzj7iBtvGofW26tw"

fs.writeFile './schedule.json', JSON.stringify(datas), (error) ->
  console.log if error then error else 'write successful'


