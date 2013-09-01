module = angular.module("liam")

class FolderController
	constructor: (@$scope, @$stateParams, @$http) ->
		@bindScope()

	
	bindScope: =>
		@$scope.messages = []
		@$scope.folder = @$stateParams.folder
		@$http.get("/api/mailbox/#{@$scope.folder}").success (messages) =>
			@$scope.messages = messages

		@$scope.isReadingMessage = @isReadingMessage
		@$scope.readMessage = @readMessage
		@$scope.noMessage = @noMessage
		@$scope.isUnread = @isUnread
		@$scope.addressName = @addressName

	addressName: (address) =>
		r = /(.*) \<(.*)\>/
		match = r.exec address
		return match[1]

	isReadingMessage: () =>
		return @$scope.read?

	isUnread: (message) =>
		return not _.contains message.attributes.flags, '\\Seen'

	readMessage: (message) =>
		@$scope.read = message

	noMessage: () =>
		@$scope.read = null


FolderController.$inject = [
	"$scope",
	"$stateParams",
	"$http"
	]

angular.module('liam').controller "FolderCtrl", FolderController
