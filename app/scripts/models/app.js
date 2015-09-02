/*global haunt, Backbone*/

haunt.Models = haunt.Models || {};

(function () {
  'use strict';

  haunt.Models.App = Backbone.Model.extend({

    url: '',

    initialize: function() {
      this.pages = new haunt.Collections.Pages();
      this.set('org', 'Adequate Design Studios');
      this.set('user', 'Terence Mckenna');
      this.set('currentPage', 0);

      this.on('pageUp pageDown skipPage', function(pageIdx){
        this.set('currentPage', pageIdx);
      });
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
