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

      // fraction of the window size to trigger page breakpoint
        // 0: top; 0.5: middle; 1: bottom
      this.set('breakpointRatio', 0.5);

      this.on('changePage', function(dir, pageIdx){
        this.set({
          'currentPage': pageIdx,
          'navDirection': dir
        });
      });
    }

  });

})();
