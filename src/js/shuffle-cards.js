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
