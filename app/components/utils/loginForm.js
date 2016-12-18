angular.module('myApp').controller('loginCtrl', ['$scope', '$http', '$filter', '$uibModal', '$window', 'appUtilsService', function ($scope, $http, $filter, $uibModal, $window, appUtilsService) {
	
	$scope.showPassword = function () {
	    
	    $scope.key_attr = $('#key').attr('type');
	    
	    if($scope.key_attr != 'text') {
	        
	        $('.checkbox').addClass('show');
	        $('#key').attr('type', 'text');
	        
	    } else {
	        
	        $('.checkbox').removeClass('show');
	        $('#key').attr('type', 'password');
	        
	    }
	    
	}

}]);
