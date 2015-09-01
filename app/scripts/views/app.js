/*global app, Backbone, JST*/

app.Views = app.Views || {};

(function () {
  'use strict';

  app.Views.App = Backbone.View.extend({

    template: JST['app/scripts/templates/app.ejs'],

    id: 'app',

    events: {},

    initialize: function (){
      $('body').append(new app.Views.Header({ model: this.model }).render());
      $('body').append(this.render());
    },

    render: function () {
      this.$el.html(this.template({
        data: this.model.toJSON(),
        partials: {
          footer: new app.Views.Footer({ model: this.model }).render().prop('outerHTML')
        }
      }));
      return this.$el;
    }

  });

})();
