'use strict';

var app = angular.module

angular.module('liam', ['ui.compat', 'angular-table'])
  .config(function ($stateProvider, $urlRouterProvider) {
    
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/m/inbox") 

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
          templateUrl: "views/mailbox/folder.html"          
        })
  })
  .factory('openpgp', function(){
    openpgp.init();
    return openpgp;
  })
  .filter('capitalize', function() {
    return function(input) {
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  });