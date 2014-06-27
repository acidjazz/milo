
loader =

  scripts: {}

  i: (callback) ->

    @browser = @searchString(@dataBrowser) or "Other"
    @version = @searchVersion(navigator.userAgent) or @searchVersion(navigator.appVersion) or "Unknown"
    @mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    @iPad = /iPad/i.test(navigator.userAgent)
    @iPhone = /iPhone/i.test(navigator.userAgent)
    @Chrome = /Chrome/i.test(navigator.userAgent)
    @Safari = /Safari/i.test(navigator.userAgent) && !loader.Chrome

    if loader.compatible()
      loader.loadscripts loader.scripts, ->
        loader.config ->
          callback true
    else
      callback false

  searchString: (data) ->
    i = 0
    while i < data.length
      dataString = data[i].string
      @versionSearchString = data[i].subString
      return data[i].identity unless dataString.indexOf(data[i].subString) is -1
      i++
    return

  searchVersion: (dataString) ->
    index = dataString.indexOf(@versionSearchString)
    return if index is -1
    parseFloat dataString.substring(index + @versionSearchString.length + 1)

  dataBrowser: [
    { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" }
    { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" }
    { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" }
    { string: navigator.userAgent, subString: "Safari", identity: "Safari" }
    { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
  ]

  compatible: ->
    return loader.redirect() if loader.browser == 'Chrome' and loader.version < 17
    return loader.redirect() if loader.browser == 'MSIE' and loader.version < 10
    return loader.redirect() if loader.browser == 'Explorer' and loader.version < 10
    return loader.redirect() if loader.browser == 'FireFox' and loader.version < 20
    return loader.redirect() if loader.browser == 'Safari' and loader.version < 6
    return loader.redirect() if !loader.browser.indexOf ['Chrome','MSIE','FireFox','Safari']
    return true

  redirect: ->
    location.href = './compat.html'
    return false

  loadscripts: (list, complete) ->
    paths = []
    i = 0
    paths.push folder + script + '.js' for script in scripts for folder, scripts of list
    for path in paths
      loader.load path, ->
        complete() if ++i is paths.length

  config: (complete) ->
    $.getJSON './cfg/config.json', (result) ->
      window.cfg = result.cfg
      complete()

  load: (script, complete) ->

    g = document.createElement 'script'
    s = document.getElementsByTagName('script')[0]

    g.src = script
    g.addEventListener 'load' , (e) ->
      complete()
    , false

    s.parentNode.insertBefore g, s

