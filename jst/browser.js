var agent;

agent = {
  i: function(callback) {
    this.agent = this.searchString(this.dataBrowser) || "Other";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    this.mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.iPad = /iPad/i.test(navigator.userAgent);
    this.iPhone = /iPhone/i.test(navigator.userAgent);
    this.Chrome = /Chrome/i.test(navigator.userAgent);
    this.Safari = /Safari/i.test(navigator.userAgent) && !agent.Chrome;
    return callback();
    return callback(compatible());
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
    if (agent.browser === 'Chrome' && agent.version < 17) {
      return agent.redirect();
    }
    if (agent.browser === 'MSIE' && agent.version < 10) {
      return agent.redirect();
    }
    if (agent.browser === 'Explorer' && agent.version < 10) {
      return agent.redirect();
    }
    if (agent.browser === 'FireFox' && agent.version < 20) {
      return agent.redirect();
    }
    if (agent.browser === 'Safari' && agent.version < 6) {
      return agent.redirect();
    }
    if (!agent.browser.indexOf(['Chrome', 'MSIE', 'FireFox', 'Safari'])) {
      return agent.redirect();
    }
    return true;
  },
  redirect: function() {
    location.href = './compat.html';
    return false;
  }
};
