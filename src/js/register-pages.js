$(function() {

  app.manager = app.PageManager();

  app.manager.registerPage('newgame', function() {
    $.get('views/newgame.html').done(function (html) {
      var template = _.template(html, { variable: 'm' });
      $('main').html(template());
      $('main').attr('class', 'main-container');
    }).fail(function(obj, text, err) {
      console.log(err + ' ' + text);
    });
  });

  app.manager.registerPage('gametiles', function(deck) {
    $.get('views/gametiles.html').done(function(html){
      var template = _.template(html, { variable: 'm' });
      var gametiles = template({deck: deck});
      console.log(gametiles);
      $('.game-board').html(gametiles);
    }).fail(function(obj, text, err) {
      console.log('could not find gametiles');
    });
  });


  app.manager.registerPage('easygame', function() {
    $.get('views/gameboard.html').done(function(html){
      var template = _.template(html, { variable: 'm' });
      // generate deck of cards & pass into template
      var deck = {
        tiles: app.gameDeck('9'),
        level: 'easy-tile'
      };
      $('main').html(template());
      $('main').attr('class', 'game-container');
      app.views.gametiles(deck);
      app.timer();
    }).fail(function(obj, text, err) {
      console.log('could not find gameboard');
    });
  });

  app.manager.registerPage('hardgame', function() {
    $.get('views/gameboard.html').done(function(html){
      var template = _.template(html, { variable: 'm' });
      // generate deck of cards & pass into template
      var deck = {
        tiles: app.gameDeck('16'),
        level: 'hard-tile'
      };
      $('main').html(template());
      $('main').attr('class', 'game-container');
      app.views.gametiles(deck);
      app.timer();
    }).fail(function(obj, text, err) {
      console.log('could not find gameboard');
    });
  });

  app.manager.registerPage('result', function(result) {
    $.get('views/game-over.html').done(function(html){
       var gameover = _.template(html, { variable: 'm' });
       // generate deck of cards & pass into template
       $('main').append(gameover({item:result}));
      //  $('main').attr('class', 'game-container');
    }).fail(function(obj, text, err) {
      console.log('could not find results page');
    });
  });

});
