/*global BbWebClient, $*/


window.haunt = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function () {
    'use strict';
    this.app = new this.Models.App();
    this.appView = new this.Views.AppView({ model: this.app });
  }
};

$(document).ready(function (){
  $(document).foundation();
  haunt.init();
});
