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
