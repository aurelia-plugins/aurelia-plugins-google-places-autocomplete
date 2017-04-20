'use strict';

exports.__esModule = true;
let HighlightValueConverter = exports.HighlightValueConverter = class HighlightValueConverter {
  toView(array) {
    array.forEach(item => {
      if (!item.matched_substrings || !item.matched_substrings.length) return;
      item.innerHTML = item.description;
      for (let i = 0, j = item.matched_substrings.length; i < j; i++) {
        const offset = item.matched_substrings[i].offset + i * 17;
        const length = item.matched_substrings[i].length + offset;
        item.innerHTML = [item.innerHTML.slice(0, offset), '<strong>', item.innerHTML.slice(offset, length), '</strong>', item.innerHTML.slice(length)].join('');
      }
    });
    return array;
  }
};