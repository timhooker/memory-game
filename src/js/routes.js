$(function () {

  app.router.add('', function() {
    app.manager.goTo('newgame', {});
  });

  app.router.add('game/easy', function() {
    app.manager.goTo('easygame');
  });

  app.router.add('game/hard', function() {
    app.manager.goTo('hardgame');
  });

  app.router.add('game/win', function() {
    console.log('you win!!');
  });

  function processHash() {
    var hash = location.hash || '#';

    if (!app.router.run(hash.slice(1))) {
      show404Page();
    }
  }

  window.addEventListener('hashchange', processHash);

  processHash();

});
