/* global angular */
//Returns a promise object returned by $http service for the initial class data API call 
angular.module('ClassRat').service('getClassDataService', function($http) {
    var ClassDataService = {
        // $http returns a promise, which has a then function, which also returns a promise
        async: function() {
            var promise = $http.get('/api/classes/').then(function(response) {
        // The return value gets picked up by the then method in the controller.
                return response.data;
            },
            //On failure
            function(error)
            {
                console.log("ClassDataService Request Failed: " + error);
            });
        // Return the promise to the controller
            return promise;
        }
    };
    return ClassDataService;
});