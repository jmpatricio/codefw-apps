/* 
 * Custom js
 *
 * @author : João Patrício
 */

//define the module
var PersonsPersonsManagement = angular.module('PersonsManagement',[]);

//define controllers
var PersonControllers = {};

//define Manage controller into Persons
PersonControllers.Manage = function($scope){
    
    $scope.persons = [
        { name: "Zé" },
        { name: "João" },
        { name: "Maria" }
    ];
    
    
    $scope.add = function(){
        var newPerson = { name: $scope.newName };
        $scope.persons.push(newPerson);
        
    };
    
};

//add controllers to module
PersonsPersonsManagement.controller(PersonControllers);