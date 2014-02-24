var appDir = codeFW_getAppBaseDir();
var apiUrl = codeFW_getApiBaseUrl();
var viewsDir = '/' + appDir + 'views/';
var chatApp = angular.module('chatApp', ['ngRoute'])

.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : viewsDir+'chat.html',
			controller  : 'chatController'
		});
})

.factory('dataFactory', function($http) {
	return {
		list_users : function() {
			return $http({
				url : '/'+apiUrl,
				params : { 
					clientid : codeFW_getClientId(),
					method : 'list_users'
				},
				method : 'GET'
			});
		},
		list_messages : function(id_from, id_to) {
			return $http({
				url : '/'+apiUrl,
				params : { 
					clientid : codeFW_getClientId(),
					method : 'list_messages',
					id_from : id_from,
					id_to : id_to
				},
				method : 'GET'
			});
		},
		add_message : function(message, id_from, id_to) {
			return $http({
				url : '/'+apiUrl,
				params : { 
					clientid : codeFW_getClientId(),
					method : 'add_message',
					content : message,
					id_from : id_from,
					id_to : id_to
				},
				method : 'GET'
			});
		},
		set_read : function(id) {
			return $http({
				url : '/'+apiUrl,
				params : { 
					clientid : codeFW_getClientId(),
					method : 'set_read',
					id : id
				},
				method : 'GET'
			});
		}
	}
})

.controller('chatController', function($scope, dataFactory, $interval) {
	$scope.users = null;
	$scope.messages = null;
	$scope.message = null;
	$scope.from = null;
	$scope.to = null;
	var promise = null;
	$scope.changeUserFrom = function(id_to) {
		$scope.from = id_to;
		$interval.cancel(promise);
		promise = $interval(function(){
			$scope.list_messages($scope.from, id_to);
		},1000);
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
	$scope.list_messages = function(id_from, id_to) {
		dataFactory.list_messages(id_from, id_to)
		.success(function(data) {
			if($scope.messages!==data)
				$scope.messages = data;
		});
	};
	$scope.add_message = function() {
		if($scope.from&&$scope.to) {
			dataFactory.add_message($scope.message, $scope.from, $scope.to);
			$scope.message = "";
		}
	};
	$scope.set_read = function(message_id) {
		dataFactory.set_read(message_id);
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
list_messages(id_from, id_to);
set_read(id)*/