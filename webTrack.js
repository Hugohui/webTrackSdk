;(function() {
  const track = {
    // 应用生命周期Id，贯穿本次系统加载
    sessionId: '',

    // 页面生命周期
    pageLife: {
      DOMContentLoaded: function() {
        console.log('DOM is ready')
        const DOMContentLoadedOptions = {}
        track._sendDataToServer(track._parseParam(DOMContentLoadedOptions))
      },
      load: function() {
        console.log('Page loaded')
        const loadOptions = {}
        track._sendDataToServer(track._parseParam(loadOptions))
      },
      beforeunload: function(event) {
        console.log('Page beforeunload')
        const beforeunloadOptions = {}
        track._sendDataToServer(track._parseParam(beforeunloadOptions))
      },
      unload: function() {
        // 在这里可以使用navigator.sendBeacon(url, data)发送异步传输
        console.log('Page unloaded')
        const unloadOptions = {}
        track._sendDataToServer(track._parseParam(unloadOptions))
      }
    },

    // 基础配置
    clientConfig: {
      serverUrl: "",
      version: "1.0.0"
    },

    // 公共参数
    columns: {
      uid: '55555'
    },

    /**
     * 参数编码返回字符串
     */
    _parseParam: function(param) {
      // 公共参数拼接
      const data = Object.assign({sid: this.sessionId}, this.columns, param)
      var params = "";
      for (var e in data) {
        if (e && data[e]) {
          params += encodeURIComponent(e) + "=" + encodeURIComponent(data[e]) + "&";
        }
      }
      if (params) {
        return params.substring(0, params.length - 1);
      } else {
        return params;
      }
    },

    /**
     * 数据上报
     * @param { String } data 
     */
    _sendDataToServer: function(data) {
      // 发送数据data到服务器，其中data是一个字符串
      var that = this;
      var i2 = new Image(1,1);
      i2.onerror = function(){
        // 这里可以进行重试操作
      };
      i2.src = this.clientConfig.serverUrl + "?" + data;
      console.log(i2.src)
    },

    /**
     * 产生uuid
     */
    _generateId: function() {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var tmpid = [];
      var r;
      tmpid[8] = tmpid[13] = tmpid[18] = tmpid[23] = '-';
      tmpid[14] = '4';

      for (i=0; i<36; i++) {
        if (!tmpid[i]) {
          r = 0| Math.random()*16;
          tmpid[i] = chars[(i==19) ? (r & 0x3) | 0x8 : r];
        }
      }
      return tmpid.join('');
    },

    /**
     * 应用开始
     */
    _startSession() {
      this.sessionId = this._generateId()
    }
  }

  // 绑定页面生命周事件
  Object.keys(track.pageLife).forEach((hook) => {
    window.addEventListener(hook, track.pageLife[hook])
  })

  // 暴露公共方法
  window.__TRACK_ = {
    /**
     * 自定义事件上报
     * @param {*} options 上报数据
     */
    track: function(options) {
      track._sendDataToServer(track._parseParam(options))
    }
  }

  const onload = function onload () {
    track._startSession()
  }

  onload()
})()