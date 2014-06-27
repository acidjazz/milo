var loader;

loader = {
  scripts: {},
  i: function(callback) {
    this.browser = this.searchString(this.dataBrowser) || "Other";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    this.mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.iPad = /iPad/i.test(navigator.userAgent);
    this.iPhone = /iPhone/i.test(navigator.userAgent);
    this.Chrome = /Chrome/i.test(navigator.userAgent);
    this.Safari = /Safari/i.test(navigator.userAgent) && !loader.Chrome;
    if (loader.compatible()) {
      return loader.loadscripts(loader.scripts, function() {
        return loader.config(function() {
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
  loadscripts: function(list, complete) {
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
  config: function(complete) {
    return $.getJSON('./cfg/config.json', function(result) {
      window.cfg = result.cfg;
      return complete();
    });
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
  }
};
