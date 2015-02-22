app.timer = function() {
  app.timer = 0;
  var seconds = 0;

  function showInt() {
    ++app.timer;
    var minutes = Math.floor(app.timer/60);
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
    app.timer=0;
  });
};
