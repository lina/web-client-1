/*global haunt, Backbone, JST*/

haunt.Views = haunt.Views || {};

(function () {
  'use strict';

  haunt.Views.AppView = Backbone.View.extend({

    template: JST['app/scripts/templates/app.ejs'],

    pageTemplates: [
      { 
        template: JST['app/scripts/templates/pages/page1.ejs'],
        backgroundColor: '#80DBFF'
      },
      { 
        template: JST['app/scripts/templates/pages/page2.ejs'],
        backgroundColor: '#FFA10B'
      },
      { 
        template: JST['app/scripts/templates/pages/page3.ejs'],
        backgroundColor: '#FF5703'
      },
      { 
        template: JST['app/scripts/templates/pages/page4.ejs'],
        backgroundColor: '#52CC93'
      },
      { 
        template: JST['app/scripts/templates/pages/page5.ejs'],
        backgroundColor: '#967DB3'
      },
    ],

    id: 'app',

    events: {},

    initialize: function (){
      // render headerView, footerView, and bodyView
      this.headerView = new haunt.Views.HeaderView({ model: this.model });
      this.footerView = new haunt.Views.FooterView({ model: this.model });
      $('body').append(this.headerView.render());
      $('body').append(this.render());
      $('body').append(this.footerView.render());

      // build pageModels and pageViews
      this.pageTemplates.map(this.generatePage, this);

      this.calculateSize();

      $(window).on('resize', this.calculateSize.bind(this));
      $(window).on('scroll', _.throttle(this.pageScroll.bind(this), 100));
      this.listenTo(this.model, 'change:currentPage', this.changePage);
      
    },

    calculateSize: function(){
      this.DIMENSIONS = {};
      this.DIMENSIONS.headerHeight = this.headerView.$el.outerHeight();
      this.DIMENSIONS.footerHeight = this.footerView.$el.outerHeight();
      this.DIMENSIONS.windowHeight = innerHeight; //$(window).outerHeight();
      this.DIMENSIONS.pageHeight = this.DIMENSIONS.windowHeight - this.DIMENSIONS.headerHeight - this.DIMENSIONS.footerHeight;
      this.DIMENSIONS.bodyHeight = this.DIMENSIONS.pageHeight * this.pageTemplates.length;

      // this.$el.find('.page-container').css({
      //   top: this.DIMENSIONS.headerHeight,
      //   bottom: this.DIMENSIONS.footerHeight
      // });

      $('body').css({ 'height': this.DIMENSIONS.bodyHeight });
    },

    changePage: function(app){
      var pageNumber = app.get('currentPage');
      this.model.pages.each(function(page){
        if(page.get('pageNumber') === pageNumber){
          page.trigger('show');
        }else{
          page.trigger('hide');
        }
      });

      if(pageNumber > 0){
        this.model.trigger('showHeader');
      }else{
        this.model.trigger('hideHeader');
      }
    },

    pageScroll: function(e){
      // get the index of the breakpoint bucket that pageYOffset falls within
      // var newPage = Math.max(0, Math.min(this.pageTemplates.length, Math.floor(pageYOffset / innerHeight)));
      var offset = this.DIMENSIONS.bodyHeight / (this.pageTemplates.length + 3);
      var newPage = Math.floor(pageYOffset / offset);
      if(newPage !== this.model.get('currentPage')){
        if(this.model.get('currentPage') > newPage){
          this.model.trigger('pageDown', newPage);
        }else if(this.model.get('currentPage') < newPage){
          this.model.trigger('pageUp', newPage);
        }else{
          this.model.trigger('skipPage', newPage);
        }
      }
    },

    render: function () {
      this.$el.html( this.template(this.model.toJSON()) );
      return this.$el;
    },

    generatePage: function(pageData, idx){
      var page = this.model.pages.add({ pageNumber: idx+1 }),
          pageView = new haunt.Views.Page({ model: page });

      _.extend(pageView, pageData);

      this.$el.find('.page-container').append(pageView.render());
    }

  });

})();
