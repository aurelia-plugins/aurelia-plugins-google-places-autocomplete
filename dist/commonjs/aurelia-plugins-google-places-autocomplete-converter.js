'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});



var HighlightValueConverter = exports.HighlightValueConverter = function () {
  function HighlightValueConverter() {
    
  }

  HighlightValueConverter.prototype.toView = function toView(array) {
    array.forEach(function (item) {
      if (!item.matched_substrings || !item.matched_substrings.length) return;
      var description = item.description;
      item.innerHTML = '';
      for (var i = 0, j = item.matched_substrings.length; i < j; i++) {
        var length = item.matched_substrings[i].length;
        var offset = item.matched_substrings[i].offset;
        item.innerHTML += [description.slice(0, offset), '<strong>', description.slice(offset, length), '</strong>', description.slice(length)].join('');
      }
    });
    return array;
  };

  return HighlightValueConverter;
}();