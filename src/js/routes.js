$(function () {

  // # TODO:
  // set up templates for game screen
  // Connect Game into routes

  app.router.add('', function() {
    console.log('yo man');
  });

  app.router.add('game/easy', function() {
    console.log('easy game');
  });

  app.router.add('game/hard', function() {
    console.log('hard game');
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
