'use strict';

var app = angular.module

angular.module('liam', ['ui.compat'])
  .config(function ($stateProvider, $urlRouterProvider) {
    
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/m/compose") 

    // Now set up the states
    $stateProvider
      .state('mailbox', {
        url: "/m",
        templateUrl: "views/mailbox/main.html"
      })
        .state('mailbox.compose', {
          url: "/compose",
          templateUrl: "views/mailbox/compose.html"
        })
        .state('mailbox.folder', {
          url: "/:folder",
          templateUrl: function (stateParams) {
            return "views/mailbox/"+stateParams.folder+".html"
          }
        })
  })
  .factory('openpgp', function(){
    openpgp.init();
    return openpgp;
  });