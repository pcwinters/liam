module = angular.module("liam")

class ReadMessageController
	constructor: (@$scope) ->
		@bindScope()

	
	bindScope: ->
		@$scope.$parent.$watch 'read', (message) =>
			@$scope.message = message

ReadMessageController.$inject = [
	"$scope"
	]

angular.module('liam').controller "ReadMessageCtrl", ReadMessageController
