/**
 * Reverse emails for bot support.
 */
(function() {

  Array.prototype.slice.call(document.querySelectorAll('a.email'), 0).forEach(function(elem) {
    var n = elem.getAttribute('href');
    elem.setAttribute('href', 'mailto:' + reverse(n));
  });

  function reverse(s) {
    var o = [];
    for (var i = s.length - 1, j = 0; i >= 0; i--, j++) {
      o[j] = s[i];
    }
    return o.join('');
  }

})();