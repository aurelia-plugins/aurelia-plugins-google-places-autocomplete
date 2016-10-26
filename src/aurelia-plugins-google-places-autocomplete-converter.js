// PUBLIC CLASS
export class HighlightValueConverter {
  // INTERFACE METHODS
  toView(array) {
    array.forEach(item => {
      if (!item.matched_substrings || !item.matched_substrings.length) return;
      item.innerHTML = item.description;
      for (var i = 0, j = item.matched_substrings.length; i < j; i++) {
        var length = item.matched_substrings[i].length;
        var offset = item.matched_substrings[i].offset + i * 17;
        item.innerHTML = [item.innerHTML.slice(0, offset), '<strong>', item.innerHTML.slice(offset, length), '</strong>', item.innerHTML.slice(length)].join('');
      }
    });
    return array;
  }
}
