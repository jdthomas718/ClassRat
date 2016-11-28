/* global angular */
angular.module('ClassRat').controller('reviewInputCtrl', function($scope, $http, sharedReviewInputFormService, addReviewService) {
    $scope.sharedObj = sharedReviewInputFormService;
    $scope.newReview = {}; //newReview object that will hold the newly created review
    clearReviewForm();
    $scope.onSubmit = function() {
        $scope.newReview.profId = $scope.sharedObj.getSharedProfId();
        $scope.newReview.classId = $scope.sharedObj.getSharedClassId();
        addReviewService.async($scope.newReview).then(function() {
            if ($scope.sectionReviews !== undefined) {
                var newReviewCopy = JSON.parse(JSON.stringify($scope.newReview));
                newReviewCopy.created = new Date();
                $scope.sectionReviews.push(newReviewCopy); // deep copy object and add to reviews
            }
            clearReviewForm();
          //  alert("Thanks!");
        });
        $scope.sharedObj.submitted = true;
        /*alert($scope.newReview.profId);
        alert($scope.newReview.classId);
        alert($scope.newReview.username);
        alert($scope.newReview.rating);
        alert($scope.newReview.text);*/
    };
    
    function clearReviewForm() {
        $scope.newReview.username = "Anonymous"; //Default Username
        $scope.newReview.rating = 3; //Default rating
        $scope.newReview.text = "";
    }
});