module = angular.module("liam")

class MainController
	constructor: (@$scope, @$location, @$state, @$auth, @$http, @$rootScope) ->
		@bindScope()
		@bootstrapUser()
	
	bindScope: ->
		
	bootstrapUser: =>
		@$auth.verifyIdentity (err, user) =>
			if not @$auth.isLoggedIn()
				@$state.transitionTo 'login'
			else
				transition = @$rootScope.deferredTransition
				@$state.transitionTo transition.state, transition.stateParams
	

MainController.$inject = [
	"$scope"
	"$location"
	"$state"
	"$auth",
	"$http"
	"$rootScope"
	]

angular.module('liam').controller "MainCtrl", MainController
