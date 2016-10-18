//Hard-coded class data
var classListCtrl = function($scope) {
    $scope.data = {
        classes: [{
            id: 0xf00b412,
            code: "CSC 150",
            name: "Computer Science 1"
        }, {
            id: 0xf00b413,
            code: "CSC 250",
            name: "Computer Science 2"
        }]
    };
}

angular
    .module('ClassRat', [])
    .controller('classListCtrl', classListCtrl);