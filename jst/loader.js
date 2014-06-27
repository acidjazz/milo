var loader;

loader = {
  i: function(callback) {
    this.browser = this.searchString(this.dataBrowser) || "Other";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    this.mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.iPad = /iPad/i.test(navigator.userAgent);
    this.iPhone = /iPhone/i.test(navigator.userAgent);
    this.Chrome = /Chrome/i.test(navigator.userAgent);
    this.Safari = /Safari/i.test(navigator.userAgent) && !loader.Chrome;
    if (loader.compatible()) {
      return loader.config(function() {
        return loader.scripts(cfg.scripts, function() {
          return callback(true);
        });
      });
    } else {
      return callback(false);
    }
  },
  searchString: function(data) {
    var dataString, i;
    i = 0;
    while (i < data.length) {
      dataString = data[i].string;
      this.versionSearchString = data[i].subString;
      if (dataString.indexOf(data[i].subString) !== -1) {
        return data[i].identity;
      }
      i++;
    }
  },
  searchVersion: function(dataString) {
    var index;
    index = dataString.indexOf(this.versionSearchString);
    if (index === -1) {
      return;
    }
    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },
  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    }, {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer"
    }, {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    }, {
      string: navigator.userAgent,
      subString: "Safari",
      identity: "Safari"
    }, {
      string: navigator.userAgent,
      subString: "Opera",
      identity: "Opera"
    }
  ],
  compatible: function() {
    if (loader.browser === 'Chrome' && loader.version < 17) {
      return loader.redirect();
    }
    if (loader.browser === 'MSIE' && loader.version < 10) {
      return loader.redirect();
    }
    if (loader.browser === 'Explorer' && loader.version < 10) {
      return loader.redirect();
    }
    if (loader.browser === 'FireFox' && loader.version < 20) {
      return loader.redirect();
    }
    if (loader.browser === 'Safari' && loader.version < 6) {
      return loader.redirect();
    }
    if (!loader.browser.indexOf(['Chrome', 'MSIE', 'FireFox', 'Safari'])) {
      return loader.redirect();
    }
    return true;
  },
  redirect: function() {
    location.href = './compat.html';
    return false;
  },
  scripts: function(list, complete) {
    var folder, i, path, paths, script, scripts, _i, _j, _len, _len1, _results;
    paths = [];
    i = 0;
    for (folder in list) {
      scripts = list[folder];
      for (_i = 0, _len = scripts.length; _i < _len; _i++) {
        script = scripts[_i];
        paths.push(folder + script + '.js');
      }
    }
    _results = [];
    for (_j = 0, _len1 = paths.length; _j < _len1; _j++) {
      path = paths[_j];
      _results.push(loader.load(path, function() {
        if (++i === paths.length) {
          return complete();
        }
      }));
    }
    return _results;
  },
  load: function(script, complete) {
    var g, s;
    g = document.createElement('script');
    s = document.getElementsByTagName('script')[0];
    g.src = script;
    g.addEventListener('load', function(e) {
      return complete();
    }, false);
    return s.parentNode.insertBefore(g, s);
  },
  config: function(complete) {
    return loader.xmlhttp('./cfg/config.json', 'GET', '', function(result) {
      var json;
      json = window.JSON.parse(result.response);
      if (json.cfg) {
        window.cfg = json.cfg;
      }
      return complete();
    });
  },
  xmlhttp: function(sURL, sMethod, sVars, fnDone) {
    var bComplete, e, xmlhttp, z;
    xmlhttp = void 0;
    bComplete = false;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (_error) {
      e = _error;
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (_error) {
        e = _error;
        try {
          xmlhttp = new XMLHttpRequest();
        } catch (_error) {
          e = _error;
          xmlhttp = false;
        }
      }
    }
    if (!xmlhttp) {
      return null;
    }
    if (!xmlhttp) {
      return false;
    }
    bComplete = false;
    sMethod = sMethod.toUpperCase();
    try {
      if (sMethod === "GET") {
        xmlhttp.open(sMethod, sURL + "?" + sVars, true);
        sVars = "";
      } else {
        xmlhttp.open(sMethod, sURL, true);
        xmlhttp.setRequestHeader("Method", "POST " + sURL + " HTTP/1.1");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      }
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && !bComplete) {
          bComplete = true;
          fnDone(xmlhttp);
        }
      };
      xmlhttp.send(sVars);
    } catch (_error) {
      z = _error;
      return false;
    }
    true;
    return this;
  }
};
