// PUBLIC CLASS
export class HighlightValueConverter {
  // INTERFACE METHODS
  toView(array) {
    array.forEach(item => {
      if (!item.matched_substrings || !item.matched_substrings.length) return;
      var description = item.description;
      var length = item.matched_substrings[0].length;
      var offset = item.matched_substrings[0].offset;
      item.innerHTML = [description.slice(0, offset), '<strong>', description.slice(offset, length), '</strong>', description.slice(length)].join('');
    });
    return array;
  }
}
