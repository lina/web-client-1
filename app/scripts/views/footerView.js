/*global haunt, Backbone, JST*/

haunt.Views = haunt.Views || {};

(function () {
  'use strict';

  haunt.Views.FooterView = Backbone.View.extend({

    template: JST['app/scripts/templates/footer.ejs'],

    tagName: 'footer',

    className: 'animate',

    events: {},

    initialize: function () {
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
