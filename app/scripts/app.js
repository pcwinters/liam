'use strict';

var app = angular.module

angular.module('liam', ['ui.compat', 'angular-table', 'ngSanitize', 'ngCookies'])
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
      verifyIdentity: function(callback) {
        $http.get("/api/auth/identity").success(function(user){
          if(!!user) {
            var theUser = {
              lastName: user.family_name,
              firstName: user.given_name,
              username: user.email
            } 
            changeUser(theUser);
            callback(null, theUser);
          } else {
            callback()
          }

        });
      },
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
      },
      google: {
        clientId: '1066133385516-fknpq8be830as60j87etq5vdujk0gv00.apps.googleusercontent.com',
        scope: [
          'https://www.googleapis.com/auth/userinfo.profile', 
          'https://www.googleapis.com/auth/userinfo.email',
          'https://mail.google.com/'
          ]
      },
      googleAuth: function(callback){
        // var url = 'https://accounts.google.com/o/oauth2/auth?'+
        //   'client_id='+encodeURIComponent(this.google.clientId)+
        //   '&scope='+encodeURIComponent(this.google.scope)+
        //   '&state='+encodeURIComponent(state)+
        //   '&response_type=token'+
        //   '&redirect_uri='+encodeURIComponent(this.google.redirectUri);
        // window.location.href = url;

        gapi.auth.authorize({
          client_id: this.google.clientId,
          response_type: 'token',
          access_type: 'online',
          // approval_prompt: 'force',
          scope: this.google.scope,
          immediate: false,
          // authuser: -1
        }, callback)
      }
    }
  })
  .config(function ($stateProvider, $urlRouterProvider, $routeProvider) {
    
    // For any unmatched url, send to /route1
    $urlRouterProvider.when('/m', '/m/inbox');
    $urlRouterProvider.otherwise("/m/inbox");
    
    // Now set up the states
    $stateProvider
      .state('root', {
        url: "access_token",
        access: {
          public: true
        },
        controller: function(){
          debugger
        }
      })
      .state('login', {
        url: "/a/login",
        templateUrl: "views/account/login.html",
        access: {
          public: true
        }      
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
    // $rootScope.$watch('isLoggedIn()', function(isLoggedIn){
    //   if(!isLoggedIn){
    //     $state.transitionTo('login');
    //   }
    // });
    $rootScope.$on('$stateChangeStart', function(event, toState, params){
      var access = toState.access || {}
      if(!$auth.isLoggedIn() && !access.public) {
        event.preventDefault();
        $rootScope.deferredTransition = {state:toState, stateParams:params};
        // $state.transitionTo('login');
      }
    });
  });