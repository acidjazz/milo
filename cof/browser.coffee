
BrowserDetect =

  init: (callback) ->
    @browser = @searchString(@dataBrowser) or "Other"
    @version = @searchVersion(navigator.userAgent) or @searchVersion(navigator.appVersion) or "Unknown"
    @mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    @iPad = /iPad/i.test(navigator.userAgent)
    @iPhone = /iPhone/i.test(navigator.userAgent)
    @Chrome = /Chrome/i.test(navigator.userAgent)
    @Safari = /Safari/i.test(navigator.userAgent) && !BrowserDetect.Chrome
    return callback()

  searchString: (data) ->
    i = 0

    while i < data.length
      dataString = data[i].string
      @versionSearchString = data[i].subString
      return data[i].identity  unless dataString.indexOf(data[i].subString) is -1
      i++
    return

  searchVersion: (dataString) ->
    index = dataString.indexOf(@versionSearchString)
    return  if index is -1
    parseFloat dataString.substring(index + @versionSearchString.length + 1)

  dataBrowser: [
    { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" }
    { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" }
    { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" }
    { string: navigator.userAgent, subString: "Safari", identity: "Safari" }
    { string: navigator.userAgent, subString: "Opera", identity: "Opera" }

  ]

Incompatibility = ->

  location.href = './compat.html' if BrowserDetect.browser == 'Chrome' and BrowserDetect.version < 17
  location.href = './compat.html' if BrowserDetect.browser == 'MSIE' and BrowserDetect.version < 10
  location.href = './compat.html' if BrowserDetect.browser == 'Explorer' and BrowserDetect.version < 10
  location.href = './compat.html' if BrowserDetect.browser == 'FireFox' and BrowserDetect.version < 20
  location.href = './compat.html' if BrowserDetect.browser == 'Safari' and BrowserDetect.version < 6
  location.href = './compat.html' if !BrowserDetect.browser.indexOf ['Chrome','MSIE','FireFox','Safari']

#if BrowserDetect.mobile and document.domain is _.domain
#  location.href = location.href.replace _.domain, _.mdomain
#else if !BrowserDetect.mobile and document.domain is _.mdomain
#  location.href = location.href.replace _.mdomain, _.domain

