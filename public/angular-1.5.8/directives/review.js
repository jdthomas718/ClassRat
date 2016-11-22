/* global angular */
// Directive for displaying reviews
angular.module('ClassRat').directive('review', function() {
    return {
        restrict: 'A',
        replace: false,
        templateUrl: '../../templates/reviews.html',
        scope: {
            reviewId: '=',
            username: '=',
            rating: '=',
            date: '=',
            reviewText: '='
        }
    };
});