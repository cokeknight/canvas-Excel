
define([], function() {
  var utils = (function () {
        var me = {};
        var _elementStyle = document.createElement('div').style;

        //获得需要兼容CSS3前缀
        var _vendor = (function () {
          var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
          var transform;
          var i = 0;
          var l = vendors.length;

          for (; i < l; i++) {  
            transform = vendors[i] + 'ransform';
            if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
          }
          return false;
        })();

        //获取样式（CSS3兼容）
        function _prefixStyle(style) {
          if (_vendor === false) return falsef;
          if (_vendor === '') return style;
          return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
        }

        me.getTime = Date.now || function getTime() { return new Date().getTime(); };

        me.addEvent = function (el, type, fn, capture) {
          if (el[0]) el = el[0];
          el.addEventListener(type, fn, !!capture);
        };

        me.removeEvent = function (el, type, fn, capture) {
          if (el[0]) el = el[0];
          el.removeEventListener(type, fn, !!capture);
        };
        me.hasTouch = 'ontouchstart' in window;
        return me;
    })();
    return utils;
})