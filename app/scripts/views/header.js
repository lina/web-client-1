/*global app, Backbone, JST*/

app.Views = app.Views || {};

(function () {
  'use strict';

  app.Views.Header = Backbone.View.extend({

    template: JST['app/scripts/templates/header.ejs'],

    tagName: 'header',

    events: {},

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this.$el;
    }

  });

})();
