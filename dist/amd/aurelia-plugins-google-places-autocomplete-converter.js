define(['exports'], function (exports) {
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
        var length = item.matched_substrings[0].length;
        var offset = item.matched_substrings[0].offset;
        item.innerHTML = [description.slice(0, offset), '<strong>', description.slice(offset, length), '</strong>', description.slice(length)].join('');
      });
      return array;
    };

    return HighlightValueConverter;
  }();
});