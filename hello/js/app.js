/* 
 * Custom js
 *
 * @author : André Bittencourt, <andreb2890@yahoo.com.br>
 */

	var appjs = angular.module('appjs', ['ngRoute']);
	var appDir = codeFW_getAppBaseDir();
	var apiUrl = codeFW_getApiBaseUrl();
	var viewsDir = '/' + appDir + 'views/';
	
	// configure our routes
	appjs.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : viewsDir+'home.html',
				controller  : 'homeController'
			})
			.when('/edit', {
				templateUrl : viewsDir+'edit.html',
				controller  : 'editController'
			})
	});
	
	/*appjs.service('userToEdit', function() {
		var user = [];
		return {
			getUser : function () {
				return user;
			},
			setUser : function(userSelected) {
				user = userSelected;
			}
	};*/

	appjs.controller('homeController', function($scope, $http) {
		// get users
		$scope.loadData = function(){
			$http.get('/'+apiUrl+'?clientid='+codeFW_getClientId()+'&method=hello_world&params=')
			.success(function(data) {
				$scope.data = data.names;
			});
		};
		$scope.loadData();
	});
	
	appjs.controller('editController', function($scope, $http) {
		
		$scope.loadData = function(){
			$http.get('/'+apiUrl+'?clientid='+codeFW_getClientId()+'&method=hello_world&params=')
			.success(function(data) {
				$scope.data = data.names;
			});
		};
		$scope.loadData();
	});
	