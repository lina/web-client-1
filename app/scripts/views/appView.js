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
      this.pageViews = this.pageTemplates.map(this.generatePage, this);

      this.calculateSize();

      $(window).on('resize', this.calculateSize.bind(this));
      $(window).on('scroll', _.throttle(this.pageScroll.bind(this), 30));
      this.listenTo(this.model, 'change:currentPage', this.changePage);
      
    },

    calculateSize: function(){
      this.DIMENSIONS = {};
      this.DIMENSIONS.headerHeight = this.headerView.$el.outerHeight();
      this.DIMENSIONS.footerHeight = this.footerView.$el.outerHeight();
      this.DIMENSIONS.windowHeight = innerHeight; //$(window).outerHeight();

      // page breakpoints at end of each page
      this.DIMENSIONS.pageEndBreakPoints = this.pageViews.reduce(function(pageEndBreakPoints, pageView, idx){
        var previousBreakPoint = idx > 0 ? pageEndBreakPoints[idx -1] : 0;
        return pageEndBreakPoints.concat( previousBreakPoint + pageView.$el.height() );
      }, []);

      this.DIMENSIONS.bodyHeight = this.DIMENSIONS.pageEndBreakPoints[this.DIMENSIONS.pageEndBreakPoints.length -1];

      $('body').css({ 'height': this.DIMENSIONS.bodyHeight });
    },

    pageScroll: function(e){
      // get page idx from breakpoint buckets
      var breakpointRatio = this.model.get('breakpointRatio');
      var newPageIdx = this.DIMENSIONS.pageEndBreakPoints.reduce(function(pageIdx, bp){
        return pageYOffset < bp - (innerHeight * (1-breakpointRatio)) ? pageIdx : pageIdx +1;
      }, 0);

      if(newPageIdx === this.model.get('currentPage') + 1){
        this.model.trigger('changePage', 'up', newPageIdx);
      }else if(newPageIdx === this.model.get('currentPage') - 1){
        this.model.trigger('changePage', 'down', newPageIdx);
      }else if(newPageIdx !== this.model.get('currentPage')){
        this.model.trigger('changePage', 'skip', newPageIdx);
      }
      
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
        this.model.trigger('showFooter');
      }else{
        this.model.trigger('hideHeader');
        this.model.trigger('hideFooter');
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
      return pageView;
    }

  });

})();
