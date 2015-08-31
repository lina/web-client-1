/*global BbWebClient, $*/


window.app = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function () {
    'use strict';
    this.appModel = new this.Models.App();
    this.appView = new this.Views.App({ model: this.appModel });
  }
};

$(document).ready(function (){
  $(document).foundation();
  app.init();
});
