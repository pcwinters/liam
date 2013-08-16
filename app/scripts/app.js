'use strict';

var app = angular.module

angular.module('liam', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('openpgp', function(){
    openpgp.init();
    return openpgp;
  });