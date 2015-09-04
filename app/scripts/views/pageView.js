/*global haunt, Backbone, JST*/

haunt.Views = haunt.Views || {};

(function () {
  'use strict';

  haunt.Views.Page = Backbone.View.extend({

    events: {},

    className: 'page',

    initialize: function () {
      this.$el.addClass('pageNumber-' + this.model.get('pageNumber'))
      this.listenTo(this.model, 'show', this.show);
      this.listenTo(this.model, 'send2background', this.send2background);
      this.listenTo(this.model, 'hide', this.hide);
    },

    show: function() {
      this.$el.css({
        'opacity': 1,
        'zIndex': 2,
      });
    },

    send2background: function() {
      this.$el.css({
        'opacity': 1,
        'zIndex': 1,
      });
    },

    hide: function() {
      this.$el.css({
        'opacity': 0,
        'zIndex': 0,
      });
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.css({
        backgroundColor: this.backgroundColor
      })
      return this.$el;
    }

  });

})();
