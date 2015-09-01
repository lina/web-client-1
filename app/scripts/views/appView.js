/*global haunt, Backbone, JST*/

haunt.Views = haunt.Views || {};

(function () {
  'use strict';

  haunt.Views.AppView = Backbone.View.extend({

    template: JST['app/scripts/templates/app.ejs'],

    templatePage1: JST['app/scripts/templates/pages/page1.ejs'],

    templatePage2: JST['app/scripts/templates/pages/page2.ejs'],

    templatePage3: JST['app/scripts/templates/pages/page3.ejs'],

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
      this.$el.find('.page-container').css({
        top: this.headerView.$el.outerHeight(),
        bottom: this.footerView.$el.outerHeight()
      });
    },

    render: function () {
      this.$el.html( this.template({
        data: this.model.toJSON(),
        pages: [
          this.templatePage1(),
          this.templatePage2(),
          this.templatePage3(),
        ]
      }) );
      return this.$el;
    }

  });

})();
