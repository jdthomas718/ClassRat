/* global angular */
// Directive for the class-section buttons
angular.module('ClassRat').directive('classButtonItem', function() {
	return {
	    restrict: 'A',
	    replace: false,
		templateUrl: '../../templates/professorList.html',
	    scope: true
	};
});