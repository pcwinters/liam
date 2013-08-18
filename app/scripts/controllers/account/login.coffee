module = angular.module("liam")

class LoginController
	constructor: (@$scope, @$state, @$auth) ->
		@bindScope()

	
	bindScope: ->
		@$scope.user = {}
		@$scope.login = @login
		@$scope.register = @register

	login: () =>
		@$scope.user.firstName = @$scope.user.username
		@$auth.login @$scope.user, () =>
			@$state.transitionTo 'mailbox'

	register: () =>
		@$auth.register @$scope.user, () =>
			@$state.transitionTo 'mailbox'

LoginController.$inject = [
	"$scope"
	"$state"
	"$auth"
	]

angular.module('liam').controller "LoginCtrl", LoginController
