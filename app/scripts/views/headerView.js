/*global haunt, Backbone, JST*/

haunt.Views = haunt.Views || {};

(function () {
  'use strict';

  haunt.Views.HeaderView = Backbone.View.extend({

    template: JST['app/scripts/templates/header.ejs'],

    tagName: 'header',

    className: 'animate',

    events: {},

    initialize: function () {
      this.listenTo(this.model, 'change:user', this.render);
      this.listenTo(this.model, 'showHeader', this.show);
      this.listenTo(this.model, 'hideHeader', this.hide);
    },

    show: function(){
      this.$el.addClass('active');
    },

    hide: function(){
      this.$el.removeClass('active');
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this.$el;
    }

  });

})();
