// Function to handle main game actions
app.memoryGame = function() {
  $('.game-checkbox').on('change', function(e) {
    // When you click on a tile (:checked)
    var tile = $(this);
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
      if($('.matched').length === $('.game-checkbox').length) {
        window.location = '#game/win';
      }

    } else {
    // if doesn't match
      // timeout(turn the tiles back over)
      var lives = $('.game-icons p');
      var count = lives.text().length;
      if(count <= 1) {
        window.location = '#game/lose';
        decrement();
        return;
      }
      // decrement the count and see if we lose
      decrement();
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
