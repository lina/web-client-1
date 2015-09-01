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

      this.listenTo(this.model, 'change:currentPage', function(app){
        console.log(app.get('currentPage'));
      })
      
      this.calculateSize();
      $(window).on('resize', this.calculateSize.bind(this));
      $(window).on('scroll', _.throttle(this.changePage.bind(this), 100));
    },

    calculateSize: function(){
      this.DIMENSIONS = {};
      this.DIMENSIONS.headerHeight = this.headerView.$el.outerHeight();
      this.DIMENSIONS.footerHeight = this.footerView.$el.outerHeight();
      this.DIMENSIONS.windowHeight = $(window).outerHeight();
      this.DIMENSIONS.pageHeight = this.DIMENSIONS.windowHeight - this.DIMENSIONS.headerHeight - this.DIMENSIONS.footerHeight,
      this.DIMENSIONS.bodyHeight = this.DIMENSIONS.pageHeight * this.pageTemplates.length,
      this.DIMENSIONS.breakPoints = _.range(this.pageTemplates.length + 1, 0, -1).map(function(pageIdx){ 
        return this.DIMENSIONS.bodyHeight / pageIdx;
      }, this); 

      this.$el.find('.page-container').css({
        top: this.DIMENSIONS.headerHeight,
        bottom: this.DIMENSIONS.footerHeight
      });

      $('body').css({ 'height': this.DIMENSIONS.bodyHeight });
    },

    changePage: function(e){
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

    // changePage: function(e){
    //   // get the index of the breakpoint bucket that pageYOffset falls within
    //   for(var i=0; i< this.DIMENSIONS.breakPoints.length; i++){
    //     if(pageYOffset < this.DIMENSIONS.breakPoints[i]){
    //       if(this.model.get('currentPage') !== i){
    //         this.model.set('currentPage', i);
    //       }
    //       break;
    //     }
    //   }
    // },

    render: function () {
      this.$el.html( this.template({
        data: this.model.toJSON(),
        pages: this.pageTemplates
      }) );
      return this.$el;
    }

  });

})();
