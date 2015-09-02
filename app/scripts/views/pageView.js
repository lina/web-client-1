/*global haunt, Backbone, JST*/

haunt.Views = haunt.Views || {};

(function () {
  'use strict';

  haunt.Views.Page = Backbone.View.extend({

    events: {},

    className: "page animate",

    initialize: function () {
      this.listenTo(this.model, 'show', this.show);
      this.listenTo(this.model, 'hide', this.hide);
    },

    show: function() {
      this.$el.addClass('active');
    },

    hide: function() {
      this.$el.removeClass('active');
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this.$el;
    }

  });

})();
