/* 
 * Custom js
 *
 * @author : João Patrício
 */


	var HelloCtrl = function($scope){
		$scope.name = 'Hello || :P';

		$scope.getName = function(){
			return $scope.name;
		}
	}

