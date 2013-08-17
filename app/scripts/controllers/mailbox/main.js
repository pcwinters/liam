'use strict';

angular.module('liam')
  .controller('MailboxCtrl', function ($scope, $state, $stateParams) {
    $scope.$state = $state;

    $scope.folders = [
        {name:'inbox', unread:2},
        {name:'sent'},
        {name:'draft'}
    ]

    $scope.isFolder = function(folder){
    	var is = false
    	if(folder == 'compose'){
    		is = $state.is('mailbox.compose');
    	} else {
    		is = $state.is('mailbox.folder') && $stateParams.folder == folder;
    	}
    	return is;
    };
    $scope.goFolder = function(folder){
    	if(folder=='compose'){
    		$state.transitionTo('mailbox.compose', {}, { location: true, inherit: true, relative: $state.$current });
    	} else {
			$state.transitionTo('mailbox.folder', {folder: 'inbox'}, { location: true, inherit: true, relative: $state.$current })
		}
    };
    $scope.state = function(s){
    	debugger;
    	var is = $state.is(s);
    	return is;
    }
  });
