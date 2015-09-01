/*global app, Backbone*/

app.Models = app.Models || {};

(function () {
  'use strict';

  app.Models.App = Backbone.Model.extend({

    url: '',

    initialize: function() {
      this.set('org', 'Adequate Design Studios');
      this.set('user', 'asdfasdf')
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
