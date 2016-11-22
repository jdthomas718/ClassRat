/* global angular */
//Star Rating Directive for User Input Form
angular.module('ClassRat').directive('starRating', function() {
  return {
		restrict : 'A',
		templateUrl : '../../templates/stars.html',
		scope : {
			ratingValue : '=ngModel',
			max : '='
		},
		link : function(scope, elem, attrs) {
			var updateStars = function() {
				scope.stars = [];
				for ( var i = 0; i < scope.max; i++) {
					scope.stars.push({
						filled : i < scope.ratingValue
					});
				}
			};
			
			scope.toggle = function(index) {
				scope.ratingValue = index + 1;
			};
			
			scope.$watch('ratingValue',
				function(oldVal, newVal) {
					if (newVal) {
						updateStars();
					}
				}
			);
		}
	};
});