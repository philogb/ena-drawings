/*global Request:true*/

window.addEvent('domready', function() {
  //gather drawings data
  new Request.JSON({
    url: 'json/drawings.json',
    onSuccess: function(json) {
      renderDrawings(json);
    },
    onError: function() {
      console.log('error', arguments);
    }
  }).get();

  function renderDrawings(drawings) {
    //generate markup
    var html = drawings.map(function(d) {
      var l = d.img.length;
      return '<article class=\'comic\'>' +
        '<h3 class=\'title\'>' +
          (d.title || 'untitled') +
        '</h3>' +

        (l > 1 ? ' <div class=\'nav\'>' +
         l + ' frames. Click image for next frame.</div>' : '') +

        '<figure class=\'frames\'>' +
          d.img.map(function(src, i) {
            return '<img src=\'img/' + src + '.' + d.format +
              '\' class=\'' + (i === 0 ? 'show' : 'hide') + '\'' +
              'title=\'' +
              (l > 1 ? (i + 1) + ' of ' + l + ' - click to see next' : '') +
              '\' />';
          }).join('') +
        '<figcaption>' + (d.description || 'by ena') + '</figcaption>' +
        '</figure>' +
        '</article>';
    });
    var main = document.body.getElement('.main');
    main.innerHTML = html.join('');

    //add event(s)
    main.addEvent('click:relay(img)', function(e) {
      var img = this,
          next = img.getNext('img') || img.getParent().getElement('img');
      img.className = 'hide';
      next.className = 'show';
    });
  }
});
