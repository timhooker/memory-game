// Function to handle main game actions

// When you click on a tile (:checked)
  //  register the checked tile

// When you click on a second tile ( $(:checked).length = 2 )
  // disable all tiles

  // compare the value to the first tile
    // if matches
      // add a class to the tile that lets us know they match
        // and disables the tiles
      // enable remaining tiles
    // if doesn't match
      // timeout(turn the tiles back over)
      // decrement the count
      // enable remaining tiles
