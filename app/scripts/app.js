'use strict';

var app = angular.module

angular.module('liam', ['ui.compat', 'angular-table', 'ngSanitize', 'ngCookies'])
  .config(function ($stateProvider, $urlRouterProvider) {
    
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/m/inbox") 
    $urlRouterProvider.when('/m', '/m/inbox');
    
    // Now set up the states
    $stateProvider
      .state('login', {
        url: "/a/login",
        templateUrl: "views/account/login.html"
      })
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
  })
  .factory('$auth', function($http, $cookieStore, $rootScope){
    var currentUser = {username: null};
    $cookieStore.remove('user');

    function changeUser(user) {
        _.extend(currentUser, user);
    };

    return {
      user: currentUser,
      // authorize: function(accessLevel, role) {
      //     if(role === undefined)
      //         role = currentUser.role;

      //     return accessLevel.bitMask & role.bitMask;
      // },
      isLoggedIn: function(user) {
          if(user === undefined)
              user = currentUser;
          return !!user.username
      },
      register: function(user, callback) {
            // $http.post('/register', user).success(function(res) {
            //     changeUser(res);
            //     success();
            // }).error(error);
            changeUser(user);
            callback(null, currentUser);
      },
      login: function(user, callback) {
          // $http.post('/login', user).success(function(user){
          //     changeUser(user);
          //     success(user);
          // }).error(error);
          changeUser(user);
          callback(null, currentUser);
      },
      logout: function(callback) {
          // $http.post('/logout').success(function(){
          //     changeUser({
          //         username: '',
          //         role: userRoles.public
          //     });
          //     success();
          // }).error(error);
          changeUser({
            username: null
          });
          callback(null, currentUser);
      }
    }
  })
  .run(function($rootScope, $state, $timeout, $auth){
    $rootScope.isLoggedIn = $auth.isLoggedIn;
    $rootScope.currentUser = function() {
      return $auth.user;
    };
    $rootScope.userDisplayName = function() {
      if(!$rootScope.isLoggedIn())
        return null;
      var user = $rootScope.currentUser();
      if(!!user.firstName && !!user.lastName) {
        return user.firstName+" "+user.lastName
      } else {
        return user.firstName;
      }
    };
    $rootScope.$watch('isLoggedIn()', function(isLoggedIn){
      if(!isLoggedIn){
        $timeout(function(){$state.transitionTo('login', {}, { location: true, inherit: true })});
        //$state.transitionTo('login');
      }
    });
    $rootScope.$on('$stateChangeStart', function(event, toState){
      
      // $state.transitionTo('login');
    });
  });