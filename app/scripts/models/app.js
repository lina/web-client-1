/*global haunt, Backbone*/

haunt.Models = haunt.Models || {};

(function () {
  'use strict';

  haunt.Models.App = Backbone.Model.extend({

    url: '',

    initialize: function() {
      this.set('org', 'Adequate Design Studios');
      this.set('user', 'Terence Mckenna');
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
