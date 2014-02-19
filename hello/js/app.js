/* 
 * Custom js
 *
 * @author : André Bittencourt, <andreb2890@yahoo.com.br>
 */

	var appjs = angular.module('appjs', ['ngRoute']);
	var appDir = codeFW_getAppBaseDir();
	var apiUrl = codeFW_getApiBaseUrl();
	var viewsDir = '/' + appDir + 'views/';
	
	appjs.config(function($routeProvider) {
		$routeProvider

			.when('/', {
				templateUrl : viewsDir+'home.html',
				controller  : 'homeController'
			})
			.when('/edit', {
				templateUrl : viewsDir+'edit.html',
				controller  : 'editController'
			})
			.otherwise({ redirectTo : '/' });
	});
		
	appjs.factory('dataFactory', function($http) {
		return {
			getData : function() {
				return $http({
					url : '/'+apiUrl+'?clientid='+codeFW_getClientId()+'&method=hello_world&params=',
					method : 'GET'
				})
			},
			editData : function(user) {
				
			}
		}
	});

	appjs.controller('homeController', function($scope, dataFactory) {
		$scope.data = [];
		$scope.loadData = function() {
			dataFactory.getData()
			.success(function(data) {
				$scope.data = data.names;
			});
		}
		
		$scope.loadData();
	});
	
	appjs.controller('editController', function($scope, dataFactory) {
		$scope.data = [];
		$scope.loadData = function() {
			
		}
		
		$scope.loadData();
	});
	