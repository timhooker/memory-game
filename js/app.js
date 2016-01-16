var app = {
  router: Rlite()
};

$(function() {

  // Generates a random deck of cards
  app.gameDeck = function (numPairs) {
    // take the cards, split them into an array and shuffle
    var cards = app.shuffle('123456789abcdefg'.split(''));

    // choose how many cards we want
    cards = cards.slice(0, numPairs);

    // double the array to create pairs
    cards = cards.concat(cards);

    // shuffle and return
    return app.shuffle(cards);
  };


});

// Function to handle main game actions
app.memoryGame = function() {
  $('.game-checkbox').on('change', function(e) {
    // When you click on a tile (:checked)
    var tile = $(this);
    var lives = $('.game-icons p');
    var count = lives.text().length;

    tile.attr('disabled', true);

    if (!app.previous) {
    //  register the checked tile
      app.previous = tile;
      return;
    }

    // When you click on a second tile
    var prevChar = app.previous.next().children('.game-icon').text();
    var thisChar = tile.next().children('.game-icon').text();
    // compare the value to the first tile
    if (prevChar === thisChar) {
      // if matches
        // add a class to the tile that lets us know they match
      tile.addClass('matched');
      app.previous.addClass('matched');
          // and disables the tiles
      $('.matched').prop('disabled', true);
        // enable remaining tiles
      app.previous = undefined;


      // see if we win and show screen if we do
      if(lives === $('.game-checkbox').length) {
        var win = {
          time: app.time + 's',
          result: 'You Win!!',
          score: count,
          class: 'game-win'
        };
        app.manager.goTo('result', win);
      }

    } else {
    // if doesn't match
      // timeout(turn the tiles back over)
      decrement();
      if(count <= 1) {
        var lose = {
          time: app.time + 's',
          result: 'You Lose!!',
          score: 0,
          class: 'game-win'
        };
        app.manager.goTo('result', lose);

        return;
      }
      // decrement the count and see if we lose
      window.setTimeout(flipOver, 1000);
    }
    function flipOver() {
      tile.prop('checked', false);
      tile.attr('disabled', false);
      app.previous.prop('checked', false);
      app.previous.attr('disabled', false);
      app.previous = undefined;
    }
    function decrement() {
      var current = lives.text().slice(0, count - 1);
      lives.text( current );
    }
  });

};

app.InstaApi = function(apiKey) {

  var baseUrl = 'https://api.instagram.com/v1/';
  if(!spec.apiKey) {
    throw console.log('you must enter an api');
  }
  var user;


  var self = {
    listings: function() {

    },
    user: function(userName) {
      var url = baseUrl + 'users/search?access_token=' + spec.apiKey + 'q=' + userID;
      var promise = $.Deferred();

      var req = $.getJSON(url).done(function(data){
        if(!data.ok) {
          promise.reject(req, 'Unknown Error', data);
        } else {

          promise.resolve(data);
          var user = data;
        }
      });
      return promise;
    }

  };


  return self;

};

app.PageManager = function () {
  app.views = {};

  var self = {
    registerPage: function (name, callback) {

      // Where do we store the templates??
      app.views[name] = callback;

    },

    goTo: function(name, data) {

      $('main').html(app.views[name](data));

    }
  };

  return self;
};

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
      console.log(html);
      var template = _.template(html, { variable: 'm' });
      var gametiles = template({deck: deck});
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

  app.router.add('game/result', function() {
    app.manager.goTo('result');
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

app.shuffle = function(arr) {

  function swap(array, x, y) {
    var tmp = array[x];
    array[x] = array[y];
    array[y] = tmp;
    return array;
  }

  for (var i =0; i < arr.length; ++i) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    arr = swap(arr, i, randomIndex);
  }

  return arr;

};

app.timer = function() {
  app.time = 0;
  var seconds = 0;

  function showInt() {
    ++app.time;
    var minutes = Math.floor(app.time/60);
    ++seconds;

    if (minutes > 59) {
      window.location = '#game/lose';
    }
    if (seconds > 59) {
      seconds = 0;
    }

    if (seconds > 9) {
      $('.time-counter p').text(minutes + ':' + seconds);
    } else {
      $('.time-counter p').text(minutes + ':0' + seconds);
    }
  }
  var timerInt = window.setInterval(showInt, 1000);
  window.addEventListener('hashchange', function() {

    clearInterval(timerInt);
    app.time=0;
  });
};


//# sourceMappingURL=app.js.map
