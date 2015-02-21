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

    console.log('that: ' + prevChar + ' this: ' + thisChar);

    // compare the value to the first tile
    if (prevChar === thisChar) {

      console.log('matched');
      // if matches
        // add a class to the tile that lets us know they match
      tile.addClass('matched');
      app.previous.addClass('matched');
          // and disables the tiles
      $('.matched').prop('disabled', true);
        // enable remaining tiles
      app.previous = undefined;

      if($('.matched').length === $('.game-checkbox').length) {
        window.location = '#game/win';
      }

    } else {
    // if doesn't match
      // timeout(turn the tiles back over)
      window.setTimeout(flipOver, 1000);
      // decrement the count

    }
    function flipOver() {
      tile.prop('checked', false);
      tile.attr('disabled', false);
      app.previous.prop('checked', false);
      app.previous.attr('disabled', false);
      app.previous = undefined;
    }

  });

};
