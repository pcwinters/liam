'use strict';

angular.module('liam')
  .controller('MailboxCtrl', function ($scope, $state, $stateParams, $http) {
    $scope.$state = $state;

    $scope.folders = []
    $http.get('/api/mailbox').success(function(folders) {
        $scope.folders = folders
    });

    $scope.isFolder = function(folder){
    	var is = false
    	if(folder == 'compose'){
    		is = $state.is('mailbox.compose');
    	} else {
    		is = $state.is('mailbox.folder') && $stateParams.folder == folder;
    	}
    	return is;
    };
    $scope.unread = function(folder) {
        if(folder.status.messages.unseen)
            return folder.status.messages.unseen
    };

    $scope.goFolder = function(folder){
    	if(folder=='compose'){
    		$state.transitionTo('mailbox.compose', {}, { location: true, inherit: true, relative: $state.$current });
    	} else {
			$state.transitionTo('mailbox.folder', {folder: folder}, { location: true, inherit: true, relative: $state.$current })
		}
    };
    $scope.state = function(s){
    	debugger;
    	var is = $state.is(s);
    	return is;
    }
  });
