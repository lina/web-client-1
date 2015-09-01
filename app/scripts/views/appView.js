/*global haunt, Backbone, JST*/

haunt.Views = haunt.Views || {};

(function () {
  'use strict';

  haunt.Views.AppView = Backbone.View.extend({

    template: JST['app/scripts/templates/app.ejs'],

    id: 'app',

    events: {},

    initialize: function (){
      this.headerView = new haunt.Views.HeaderView({ model: this.model });
      this.footerView = new haunt.Views.FooterView({ model: this.model });
      
      $('body').append(this.headerView.render());
      $('body').append(this.render());
      $('body').append(this.footerView.render());
      
      this.computeSize();
    },

    computeSize: function(){
      this.$el.css({
        top: this.headerView.$el.outerHeight(),
        bottom: this.footerView.$el.outerHeight()
      });

    },

    render: function () {
      this.$el.html( this.template(this.model.toJSON()) );
      return this.$el;
    }

  });

})();
