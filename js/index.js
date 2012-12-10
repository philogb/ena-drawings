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
  }).send();

  function renderDrawings(drawings) {
    //generate markup
    var html = drawings.map(function(d) {
      return '<div class=\'comic\'>' +
        '<h3 class=\'title\'>' +
          (d.title || 'untitled') +
        '</h3>' +

        (d.img.length > 1 ? ' <div class=\'nav\'>' +
         d.img.length + ' frames. Click image for next frame.</div>' : '') +

        '<div class=\'frames\'>' +
          d.img.map(function(src, i) {
            return '<img src=\'img/' + src + '.' + d.format +
              '\' class=\'' + (i === 0 ? 'show' : 'hide') + '\'' +
              'title=\'' + (i + 1) + ' of ' + d.img.length + ' - click to see next \' />';
          }).join('') +
        '</div>' +
        '<figcaption>' + (d.description || 'by ena') + '</figcaption>' +
        '</div>';
    });
    var main = document.body.getElement('.main');
    main.innerHTML = html.join('');

    //add event(s)
    main.addEvent('click:relay(img)', function(e) {
      var img = this,
          next = img.getNext() || img.getParent().getElement('img');
      img.className = 'hide';
      next.className = 'show';
    });
  }
});
