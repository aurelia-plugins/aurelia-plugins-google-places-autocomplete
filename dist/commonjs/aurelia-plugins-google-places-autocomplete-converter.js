'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HighlightValueConverter = exports.HighlightValueConverter = function () {
  function HighlightValueConverter() {
    _classCallCheck(this, HighlightValueConverter);
  }

  HighlightValueConverter.prototype.toView = function toView(array) {
    for (var _iterator = array, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var item = _ref;

      if (!item.matched_substrings || !item.matched_substrings.length) return;
      item.innerHTML = item.description;
      for (var i = 0; i < item.matched_substrings.length; i++) {
        var offset = item.matched_substrings[i].offset + i * 17;
        var length = item.matched_substrings[i].length + offset;
        item.innerHTML = [item.innerHTML.slice(0, offset), '<strong>', item.innerHTML.slice(offset, length), '</strong>', item.innerHTML.slice(length)].join('');
      }
    }
    return array;
  };

  return HighlightValueConverter;
}();