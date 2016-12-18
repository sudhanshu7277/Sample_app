angular.module('myApp').controller('dynamicUDFformsController', ['$scope', '$http', '$window', 'dynamicFormService', function ($scope, $http, $window, dynamicFormService) {
    //EPW860: Starts
    //Adding code for Dynamic page 
    $scope.accountNo = '0005407777777777777';
    $scope.siteId = 'ALPH X';
    $scope.department = 'CCCS-SD';


    dynamicFormService.getFormForID().then(function (data) {
        $scope.udfFields = data;
        //        console.log('this is the data i was looking for');
        //        console.log($scope.udfFields);
    }, function (error) {
        //console.log('Something went wrong:' + error);
    });

}]);



//JSON data provider service for dynamic page
angular.module('myApp').factory('dynamicFormService', function ($http) {
    var service = {}; //Create a service object

    //Create data call methods
    service.getFormForID = function () { //we can pass arguments in this function 
        return $http.get('/udfFormlayout').then(function (result) {
                return result.data;
            },
            function (error) {
                return error;
            });
    };

    return service; // return service object
});
//JSON data end