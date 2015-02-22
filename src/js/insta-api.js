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
