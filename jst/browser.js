var BrowserDetect, Incompatibility;

BrowserDetect = {
  init: function(callback) {
    this.browser = this.searchString(this.dataBrowser) || "Other";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    this.mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.iPad = /iPad/i.test(navigator.userAgent);
    this.iPhone = /iPhone/i.test(navigator.userAgent);
    this.Chrome = /Chrome/i.test(navigator.userAgent);
    this.Safari = /Safari/i.test(navigator.userAgent) && !BrowserDetect.Chrome;
    return callback();
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
  ]
};

Incompatibility = function() {
  if (BrowserDetect.browser === 'Chrome' && BrowserDetect.version < 17) {
    location.href = './compat.html';
  }
  if (BrowserDetect.browser === 'MSIE' && BrowserDetect.version < 10) {
    location.href = './compat.html';
  }
  if (BrowserDetect.browser === 'Explorer' && BrowserDetect.version < 10) {
    location.href = './compat.html';
  }
  if (BrowserDetect.browser === 'FireFox' && BrowserDetect.version < 20) {
    location.href = './compat.html';
  }
  if (BrowserDetect.browser === 'Safari' && BrowserDetect.version < 6) {
    location.href = './compat.html';
  }
  if (!BrowserDetect.browser.indexOf(['Chrome', 'MSIE', 'FireFox', 'Safari'])) {
    return location.href = './compat.html';
  }
};
