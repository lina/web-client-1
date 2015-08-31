/*global app, Backbone, JST*/

app.Views = app.Views || {};

(function () {
  'use strict';

  app.Views.App = Backbone.View.extend({

    template: JST['app/scripts/templates/app.ejs'],

    tagName: 'div',

    id: 'app',

    className: '',

    events: {},

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      $('body').append(this.render());
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this.$el;
    }

  });

})();
