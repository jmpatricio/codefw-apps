var chatApp = angular.module('chatApp', ['ngRoute']);
var appDir = codeFW_getAppBaseDir();
var apiUrl = codeFW_getApiBaseUrl();
var viewsDir = '/' + appDir + 'views/';

chatApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : viewsDir+'chat.html',
			controller  : 'chatController'
		});
});

chatApp.factory('dataFactory', function($http) {
	return {
		list_users : function() {
			return $http({
				url : '/'+apiUrl,
				params : { 
					clientid : codeFW_getClientId(),
					method : 'list_users'
				},
				method : 'GET'
			})
		},
		list_messages : function(user_id) {
			return $http({
				url : '/'+apiUrl,
				params : { 
					clientid : codeFW_getClientId(),
					method : 'list_messages',
					id_user : user_id
				},
				method : 'GET'
			})
		},
		add_message : function(message, id_from, id_to) {
			return $http({
				url : '/'+apiUrl,
				params : { 
					clientid : codeFW_getClientId(),
					method : 'add_message',
					message : message,
					id_from : id_from,
					id_to : id_to
				},
				method : 'GET'
			})
		}
	}
});

chatApp.controller('chatController', function($scope, dataFactory) {
	$scope.users = [];
	$scope.messages = [];
	$scope.message = [];
	$scope.from = [];
	$scope.to = [];
	$scope.changeUserFrom = function(user_id) {
		$scope.from = user_id;
		$scope.list_messages(user_id);
	};
	$scope.changeUserTo = function(user_id) {
		$scope.to = user_id;
	};
	$scope.listUsers = function() {
		dataFactory.list_users()
		.success(function(data) {
			$scope.users = data;
		});
	};
	$scope.list_messages = function(user_id) {
		dataFactory.list_messages(user_id)
		.success(function(data) {
			$scope.messages = data;
		});
	};
	$scope.add_message = function(message) {
		dataFactory.add_message(message, $scope.from, $scope.to);
		$scope.list_messages($scope.from);
	};
	
	$scope.listUsers();
});

/*USER:

get_user(id);
list_users();

MESSAGE
get_message(id);
add_message(message);
update_message(message);
list_messages(id_user);
set_read(id)*/