/*global haunt, Backbone*/

haunt.Models = haunt.Models || {};

(function () {
  'use strict';

  haunt.Models.User = Backbone.Model.extend({

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
