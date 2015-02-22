app.timer = function() {
  var timer = 0;
  var seconds = 0;

  function showInt() {
    ++timer;
    var minutes = Math.floor(timer/60);
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
  });
};
