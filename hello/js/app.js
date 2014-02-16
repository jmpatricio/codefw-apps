/* 
 * Custom js
 *
 * @author : João Patrício
 */
	var scotchApp = angular.module('scotchApp', ['ngRoute']);
	var appDir = codeFW_getAppBaseDir();
	var viewsDir = '/' + appDir + 'views/';
	
	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : viewsDir+'parts/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : viewsDir+'parts/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : viewsDir+'parts/contacts.html',
				controller  : 'contactController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
$http({
  method: 'GET',
  url: codeFW_getApiBaseUrl() 
}).success(function(data, status, headers, config) {
  // data contains the response
  // status is the HTTP status
  // headers is the header getter function
  // config is the object that was used to create the HTTP request
  //
  $scope.message = data;
}).error(function(data, status, headers, config) {
});

	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

	scotchApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
        

	});

