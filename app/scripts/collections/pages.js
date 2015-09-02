/*global haunt, Backbone*/

haunt.Collections = haunt.Collections || {};

(function () {
  'use strict';

  haunt.Collections.Pages = Backbone.Collection.extend({

    model: haunt.Models.Page

  });

})();
