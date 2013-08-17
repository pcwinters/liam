module = angular.module("liam")

class ComposeController
	constructor: (@$scope, @$timeout, @openpgp) ->
		@delay = 2000
		@bodyNav = 'text'
		@bindScope()

	
	bindScope: ->
		@$scope.message = 
			body: 'This is my message body'
			encrypted: null

		@$scope.queueEncrypt = @queueEncrypt
		@$scope.encrypt = @encrypt
		@$scope.isQueuedForEncryption = @isQueuedForEncryption
		@$scope.isEditor = @isEditor
		@$scope.navigateEditor = @navigateEditor

		@$scope.$watch 'message.body', @queueEncrypt
		@$scope.bodyNav = @$scope.navigateEditor @bodyNav
	

	isEditor: (name) =>
		return @$scope.bodyNav == name

	navigateEditor: (name) =>
		return @$scope.bodyNav = name

	isQueuedForEncryption: () =>
		promise = @$scope.encryptPromise
		return promise

	queueEncrypt: () =>
		if @$scope.encryptPromise? then @$scope.encryptPromise.cancel()
		@$scope.encryptPromise = @$timeout @encrypt, @delay
		@$scope.encryptPromise.then () =>
			@$scope.encryptPromise = null
		
	encrypt: () =>
		# @openpgp.init()
		pub_key = @openpgp.read_publicKey($('#pubkey').text());
		# pub_key = @openpgp.read_publicKey(publicKey);
		@$scope.message.encrypted = @openpgp.write_encrypted_message pub_key, @$scope.message.body
		#@$scope.message.encrypted = @$scope.message.body

ComposeController.$inject = [
	"$scope"
	"$timeout"
	"openpgp"
	]

angular.module('liam').controller "ComposeCtrl", ComposeController
