angular.module('myApp').controller('modalinstancectrl', ['$scope','$http', '$uibModalInstance','params', function ($scope, $http, $uibModalInstance, params) {
    console.log(params);
    // Select Queue - UZR188
           
    $http.get('/queues')
        .success(function (response) {
            $scope.queues = response;
            console.log('get response from Queue');
            
        })
        .error(function (error) {
            console.log('Error: ' + error);
        });
    
    $scope.save = function () {
    	console.log('get response from Save');

    	$uibModalInstance.close();  // need to change to Save 
        };

    $scope.cancel = function () {
        console.log('get response from cancel');
        $uibModalInstance.dismiss();
        };
}]);