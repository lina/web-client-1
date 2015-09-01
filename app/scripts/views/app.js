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
      $('body').append(new app.Views.Footer({ model: this.model }).render());
    },

    render: function () {
      this.$el.html( this.template(this.model.toJSON()) );
      return this.$el;
    }

  });

})();
