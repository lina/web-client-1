/*global app, Backbone, JST*/

app.Views = app.Views || {};

(function () {
  'use strict';

  app.Views.Footer = Backbone.View.extend({

    template: JST['app/scripts/templates/footer.ejs'],

    tagName: 'footer',

    events: {},

    initialize: function () {
      // this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this.$el;
    }

  });

})();
