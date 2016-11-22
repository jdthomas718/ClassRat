/* global angular */
//Returns a promise object returned by $http service for the class section API call
//This service relies on the unique class id of the class chosen by the user to make the call
angular.module('ClassRat').service('getClassSectionService', function($http) {
    var ClassSectionService = {
        // $http returns a promise, which has a then function, which also returns a promise
        async: function(classId) {
            var promise = $http.get('/api/classes/' + classId + '/professors/').then(function(response) {
        // The return value gets picked up by the then method in the controller.
                return response.data;
            },
            //On failure
            function(error)
            {
                console.log("ClassSectionService Request Failed: " + error);
            });
        // Return the promise to the controller    
            return promise;
        }
    }; 
    return ClassSectionService;
});