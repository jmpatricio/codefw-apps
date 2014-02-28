var appDir = codeFW_getAppBaseDir();
var apiUrl = codeFW_getApiBaseUrl();
var viewsDir = '/' + appDir + 'views/';
var chatApp = angular.module('chatApp', ['ngRoute'])

.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : viewsDir+'chat.html',
			controller  : 'chatController'
		})
		.otherwise({redirectTo : '/'});
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

.controller('chatController', function($scope, dataFactory, $interval, $log) {
	$scope.$log = $log;
	
	$scope.users = null;
	$scope.messages = null;
	$scope.message = null;
	$scope.from = null;
	$scope.to = null;
	$scope.show = false;
	$scope.loaded = true;
	var promise = null;
	
	$scope.changeUserFrom = function(id_from) {
		$scope.from = id_from;
		$scope.messages = null;
		if($scope.from==$scope.to)
			$scope.to = null;
		$scope.loaded = false;
		$scope.list_messages($scope.from, $scope.to);
	};
	
	$scope.changeUserTo = function(id_to) {
		$scope.to = id_to;
		$scope.messages = null;
		if($scope.to==$scope.from)
			$scope.from = null;
		$scope.loaded = false;
		$scope.list_messages($scope.from, $scope.to);
	};
	
	$scope.listUsers = function() {
		dataFactory.list_users()
		.success(function(data) {
			$scope.users = data;
		});
	};
	
	$scope.list_messages = function(id_from, id_to) {
		if($scope.from&&$scope.to) {
			$interval.cancel(promise);
			promise = $interval(function() {
				dataFactory.list_messages(id_from, id_to)
				.success(function(data) {
					if($scope.messages!=data[1]&&data[0]!='error') {
						$scope.messages = data[1];
						$scope.show = true;
					}
					else {
						$scope.messages = null;
						$scope.show = false;
					}
					$scope.loaded = true;
				});
			},500);
		}
	};
	
	$scope.add_message = function() {
		if($scope.from&&$scope.to) {
			dataFactory.add_message($scope.message, $scope.from, $scope.to);
			$scope.message = null;
		}
	};
	
	$scope.set_read = function(message_id) {
		dataFactory.set_read(message_id);
	};
	
	$scope.listUsers();
});
