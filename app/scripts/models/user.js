/*global app, Backbone*/

app.Models = app.Models || {};

(function () {
  'use strict';

  app.Models.User = Backbone.Model.extend({

    url: '',

    initialize: function() {
    },

    defaults: {
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    }
  });

})();
