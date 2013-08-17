module = angular.module("liam")

class InboxController
	constructor: (@$scope) ->
		@bindScope()

	
	bindScope: ->
		@$scope.messages = [
			{from: "Moroni De Vinci A La Spaghetti With Meatballs", subject:"architecto beatae vitae dicta sunt explicabo.", age: 50}
			{from: "Tiancum", subject:"labore et dolore magnam aliquam quaerat voluptatem",age: 43}
			{from: "Jacob", subject:"Lorem ipsum dolor sit amet, consectetur adipisicing elit",age: 27}
			{from: "Nephi", subject:"architecto beatae vitae dicta sunt explicabo.",age: 29}
			{from: "Enos", subject:"Vel illum qui dolorem eum fugiat",age: 34}
		]
		@$scope.gridOptions =
			data: 'messages'

InboxController.$inject = [
	"$scope"
	]

angular.module('liam').controller "InboxCtrl", InboxController
