/* global angular */
// Directive for the review input form
angular.module('ClassRat').directive('reviewInputForm', function($compile) {
    return {
        restrict: 'A',
        replace: false,
        templateUrl: '../../templates/writeReview.html',
        scope: true
    }
});