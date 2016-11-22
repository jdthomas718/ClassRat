/* global angular */
// Service used for submitting a new review to the API
angular.module('ClassRat').service('addReviewService', function($http) {

    var reviewService = {
            //$http returns a promise, which has a then function, which also returns a promise
            async: function(newReview) {
                
                //Create new data object for POST request
                var review = {};
                review.username = newReview.username;
                review.rating = newReview.rating;
                review.text = newReview.text;
                
                var promise = $http.post('/api/classes/'+newReview.classId+'/professors/'+newReview.profId+'/reviews/', newReview).then(
                    //On success
                    function(response) {
                        //alert("POST success!");
                     },
                     //On failure
                    function(error) {
                        alert("addReviewService request failed:"+JSON.stringify(error));
                    }
            );
            //Return promise to the controller
            return promise;
        }
    };
    
    return reviewService;
});