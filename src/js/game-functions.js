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
