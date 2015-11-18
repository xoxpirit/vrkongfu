var __initialize = this.__initialize = function() {

  var fold = document.querySelector('#fold');

  /**
   * Preload images.
   */
  var awning = document.querySelector('#awning .progress');
  var elems = document.querySelectorAll('.preload');
  var reveal = _.after(elems.length, function() {
    lockAspect();
    fold.style.opacity = 1;
    setTimeout(revealFoldContent, 1000);
  });

  elems.index = 0;

  _.each(elems, function(elem) {

    var img = document.createElement('img');
    var src = elem.getAttribute('preload-href');
    img.onload = function() {
      elems.index++;
      elem.style.backgroundImage = 'url(' + src + ')';
      awning.style.width = 100 * (elems.index / elems.length) + '%';
      reveal();
    };
    img.src = src;

  });

  var defaultAspect = '16:9';

  function lockAspect(elements) {

    var elems = elements || document.querySelectorAll('.lock-aspect');
    var width, height, aspect;

    _.each(elems, lock);

    if (elems.length > 0) {
      window.addEventListener('resize', resize, false);
    }

    function lock(elem) {

      if (!elem.aspect) {
        aspect = (elem.getAttribute('aspect-ratio') || defaultAspect).split(':');
        elem.aspect = aspect[0] / aspect[1];
      }

      width = elem.getBoundingClientRect().width;
      height = width / elem.aspect;

      elem.style.height = height + 'px';

    }

    function resize() {

      _.each(elems, lock);

    }

  }

  /**
   * Styled transitions for dramatic effect.
   */
  function revealFoldContent() {

    var elems = document.querySelectorAll('.transition');
    fold.style.minHeight = fold.getBoundingClientRect().height + 'px';

    Transition.duration = 1000;
    Transition.stagger = 250;

    for (var i = 0; i < elems.length; i++) {
      new Transition(elems[i]).in();
    }

    var loop = function() {
      requestAnimationFrame(loop);
      Transition.update();
    };

    loop();

    if (window.onvrseload) {
      window.onvrseload();
    }

  }
  
  function collapsedButton() {
	  
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
    
   }

  /**
   * Exports
   */

  __initialize.lockAspect = lockAspect;
  __initialize.revealFoldContent = revealFoldContent;
  __initialize.collapsedButton = collapsedButton;

};