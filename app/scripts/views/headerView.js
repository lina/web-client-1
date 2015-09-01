/*global haunt, Backbone, JST*/

haunt.Views = haunt.Views || {};

(function () {
  'use strict';

  haunt.Views.HeaderView = Backbone.View.extend({

    template: JST['app/scripts/templates/header.ejs'],

    tagName: 'header',

    events: {},

    initialize: function () {
      this.listenTo(this.model, 'change:user', this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this.$el;
    }

  });

})();
