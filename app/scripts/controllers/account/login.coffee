module = angular.module("liam")

class LoginController
	constructor: (@$scope, @$location, @$state, @$auth, @$http) ->
		@bindScope()
	
	bindScope: ->
		@$scope.user = {}
		@$scope.login = @login
		@$scope.register = @register

		@$scope.handleGoogleAuth = @handleGoogleAuth
		@$scope.googleAuth = @googleAuth

	login: () =>
		@$scope.user.firstName = @$scope.user.username
		@$auth.login @$scope.user, () =>
			@$state.transitionTo 'mailbox'

	register: () =>
		@$auth.register @$scope.user, () =>
			@$state.transitionTo 'mailbox'

	handleGoogleAuth: (authResult) =>
		@$http.post('/api/auth/google/callback', authResult).success (user) =>
			theUser = {
				lastName: user.family_name
				firstName: user.given_name
				username: user.email
			}	
			@$auth.login theUser, () =>
				@$state.transitionTo 'mailbox'

	googleAuth: () =>
		@$auth.googleAuth(@$scope.handleGoogleAuth)
		#window.location.href = 'https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&state=%2Fprofile&redirect_uri=https%3A%2F%2Foauth2-login-demo.appspot.com%2Foauthcallback&response_type=token&client_id=812741506391.apps.googleusercontent.com'
		#@gapi.auth.authorize({client_id: @gapi.clientId, scope: @gapi.scopes, immediate: false}, @$scope.handleGoogleAuth);

LoginController.$inject = [
	"$scope"
	"$location"
	"$state"
	"$auth",
	"$http"
	]

angular.module('liam').controller "LoginCtrl", LoginController
