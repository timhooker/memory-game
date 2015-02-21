$(function () {

  app.router.add('', function() {
    app.manager.goTo('newgame', {});
  });

  app.router.add('game/easy', function() {
    app.manager.goTo('easygame');
    window.setTimeout(app.memoryGame, 500);
  });

  app.router.add('game/hard', function() {
    app.manager.goTo('hardgame');
    window.setTimeout(app.memoryGame, 500); 
  });

  app.router.add('game/win', function() {
    console.log('you win!!');
  });

  app.processHash = function() {
    var hash = location.hash || '#';

    if (!app.router.run(hash.slice(1))) {
      show404Page();
    }
  };

  window.addEventListener('hashchange', app.processHash);

  app.processHash();

});
