// PUBLIC CLASS
export class HighlightValueConverter {
  // INTERFACE METHODS
  toView(array) {
    for (const item of array) {
      if (!item.matched_substrings || !item.matched_substrings.length) return;
      item.innerHTML = item.description;
      for (let i = 0; i < item.matched_substrings.length; i++) {
        const offset = item.matched_substrings[i].offset + i * 17;
        const length = item.matched_substrings[i].length + offset;
        item.innerHTML = [item.innerHTML.slice(0, offset), '<strong>', item.innerHTML.slice(offset, length), '</strong>', item.innerHTML.slice(length)].join('');
      }
    }
    return array;
  }
}