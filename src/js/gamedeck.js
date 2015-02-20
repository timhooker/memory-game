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
