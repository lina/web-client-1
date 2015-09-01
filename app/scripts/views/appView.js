/*global haunt, Backbone, JST*/

haunt.Views = haunt.Views || {};

(function () {
  'use strict';

  haunt.Views.AppView = Backbone.View.extend({

    template: JST['app/scripts/templates/app.ejs'],

    pageTemplates: [
      JST['app/scripts/templates/pages/page1.ejs'],
      JST['app/scripts/templates/pages/page2.ejs'],
      JST['app/scripts/templates/pages/page3.ejs'],
    ],

    id: 'app',

    events: {},

    initialize: function (){
      this.headerView = new haunt.Views.HeaderView({ model: this.model });
      this.footerView = new haunt.Views.FooterView({ model: this.model });
      
      $('body').append(this.headerView.render());
      $('body').append(this.render());
      $('body').append(this.footerView.render());
      
      this.calculateSize();
      $(window).on('resize', this.calculateSize.bind(this));
      $('body').on('scroll', function(e){ console.log(e); });
    },

    calculateSize: function(){
      var headerHeight = this.headerView.$el.outerHeight(),
          footerHeight = this.footerView.$el.outerHeight(),
          pageHeight = $(window).outerHeight() - headerHeight - footerHeight;

      this.$el.find('.page-container').css({
        top: headerHeight,
        bottom: footerHeight
      });

      $('body').css({ 'height': pageHeight * this.pageTemplates.length });
    },

    render: function () {
      this.$el.html( this.template({
        data: this.model.toJSON(),
        pages: this.pageTemplates
      }) );
      return this.$el;
    }

  });

})();
