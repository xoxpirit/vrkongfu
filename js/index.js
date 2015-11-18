$(function() {

  var iteratee = function(o) { return o.display_priority };

  $.getJSON('/unified.json', function(json) {

    var data = { content: [] };
    var fid = parseInt(document.querySelector('.poster a')
      .getAttribute('href')
      .match(/\?id\=([0-9]*)/)[1]);

    _.each(json.content, function(o) {

      if (o.visible_on.webplayer && o.id !== fid) {
        data.content.push(o);
      }

      o.title = o.title.toLowerCase()
        .replace('vr', 'VR')
        .replace('snl', 'SNL')
        .replace('"camera one"', '')
        .replace(': millions march nyc 12.13.14', '')
        .replace('nyt', 'NYT');

    });

    data.content = _.sortBy(data.content, iteratee).reverse();

    var template = _.template('<% _.each(content, function(o) { %><li><a href="/watch/index.html?id=<%= o.id %>"><div class="thumbnail lock-aspect preload" aspect-ratio="1310:690" preload-href="/images/projects/<%= o.cameras.default.webplayer.name %>.jpg" style="background-image: url(/images/projects/<%= o.cameras.default.webplayer.name %>.jpg);"><div class="duration"><%= o.duration %></div></div><p class="title"><%= o.title %></p><!-- <p class="date">May 31, 2015</p> --></a></li><% }); %>');

    var gallery = $('#films .gallery').html(template(data));

    if (_.isFunction(window.__initialize)) {
      window.__initialize();
      window.__initialize.lockAspect(gallery[0].querySelectorAll('div.thumbnail'));
    }

  });
  
    
     var anchor = document.querySelectorAll('button');
    
    [].forEach.call(anchor, function(anchor){
      var open = false;
      anchor.onclick = function(event){
        event.preventDefault();
        if(!open){
          this.classList.remove('collapsed');
          open = true;
        }
        else{
          this.classList.add('collapsed');
          open = false;
        }
      }
    });

});