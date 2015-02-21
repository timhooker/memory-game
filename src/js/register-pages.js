$(function() {

  app.manager = app.PageManager();

  $.get('views/gametiles.html').done(function(html){
    app.views.gametiles = _.template(html, { variable: 'm' });
  }).fail(function(obj, text, err) {
    console.log(err);
  });

  app.manager.registerPage('newgame', function() {
    $.get('views/newgame.html').done(function (html) {
      var template = _.template(html, { variable: 'm' });
      $('main').html(template());
      $('main').attr('class', 'main-container');
    }).fail(function(obj, text, err) {
      console.log(err + ' ' + text);
    });
  });

  app.manager.registerPage('easygame', function() {
    $.get('views/gameboard.html').done(function(html){
      var gameboard = _.template(html, { variable: 'm' });
      // generate deck of cards & pass into template
      var deck = app.gameDeck('9');
      $('main').html(gameboard({deck: deck, level: 'easy-tile'}));
      $('main').attr('class', 'game-container');
    }).fail(function(obj, text, err) {
      console.log('could not find gameboard');
    });
  });

  app.manager.registerPage('hardgame', function() {
    $.get('views/gameboard.html').done(function(html){
       var gameboard = _.template(html, { variable: 'm' });
       // generate deck of cards & pass into template
       var deck = app.gameDeck('16');
       $('main').html(gameboard({deck: deck, level: 'hard-tile'}));
       $('main').attr('class', 'game-container');
    }).fail(function(obj, text, err) {
      console.log('could not find gameboard');
    });
  });


});
