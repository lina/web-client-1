/*global app, Backbone, JST*/

app.Views = app.Views || {};

(function () {
  'use strict';

  app.Views.App = Backbone.View.extend({

    template: JST['app/scripts/templates/app.ejs'],

    id: 'app',

    events: {},

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      $('body').append(this.render());
    },

    render: function () {
      this.$el.html(this.template({
        data: this.model.toJSON(),
        partials: {
          header: new app.Views.Header({ model: this.model }).render().html(),
          footer: new app.Views.Footer({ model: this.model }).render().html()
        }
      }));
      return this.$el;
    }

  });

})();
