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
      this.listenTo(this.model, 'hide', this.hide);
    },

    show: function() {
      this.$el.addClass('active');
    },

    hide: function() {
      // hack to account for previous slide transitioning out.  must match the .page transition time
        // could be improved
      setTimeout(function(){
        this.$el.removeClass('active');
      }.bind(this), 600)
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
