/*global haunt, Backbone, JST*/

haunt.Views = haunt.Views || {};

(function () {
  'use strict';

  haunt.Views.AppView = Backbone.View.extend({

    template: JST['app/scripts/templates/app.ejs'],

    id: 'app',

    events: {},

    initialize: function (){
      $('body').append(new haunt.Views.HeaderView({ model: this.model }).render());
      $('body').append(this.render());
      $('body').append(new haunt.Views.FooterView({ model: this.model }).render());
    },

    render: function () {
      this.$el.html( this.template(this.model.toJSON()) );
      return this.$el;
    }

  });

})();
