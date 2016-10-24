'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var HighlightValueConverter;

  

  return {
    setters: [],
    execute: function () {
      _export('HighlightValueConverter', HighlightValueConverter = function () {
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
      }());

      _export('HighlightValueConverter', HighlightValueConverter);
    }
  };
});