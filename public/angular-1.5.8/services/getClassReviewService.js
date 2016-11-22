/* global angular */
//Returns a promise object returned by $http service for the class section reviews API call
//This service relies on the unique class id and professor id of the class and professor chosen by the user to make the call
angular.module('ClassRat').service('getClassReviewService', function($http) {
    var ClassReviewService = {
        // $http returns a promise, which has a then function, which also returns a promise    
        async: function(profId, classId) {
            var promise = $http.get('/api/classes/' + classId + '/professors/' + profId + '/reviews/' ).then(function(response) {
        // The return value gets picked up by the then method in the controller.
                return response.data;
            },
            //On failure
            function(error)
            {
                console.log("ClassReviewService Request Failed: " + error);
            });
        // Return the promise to the controller    
            return promise;
        }
    };
    
    return ClassReviewService;
});