//var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);
angular.module('myApp').controller('AppCtrl', ['$scope', '$http', '$filter', '$uibModal', '$window', function ($scope, $http, $filter, $uibModal, $window) {

    console.log("Hello World from Controller");
    $scope.btnShowDtlToggle = 0;
    $scope.btnShowDtlToggletxt = 'Show Details';

    $http.get('/udfqueue')
        .success(function (response) {
	 	$scope.udfqueue = [];
		$scope.udfrecords = [];
            	$scope.udf = [];
		$scope.udfrecords = response;
		$scope.udf = "";
		$scope.perPage();
        })
        .error(function (error) {
            console.log('Error: ' + error);
        });

    $http.get('/depts')
        .success(function (response) {
            $scope.depts = response;
        })
        .error(function (error) {
            console.log('Error: ' + error);
        });

    //open a Modal  - uzr188
    $scope.rerouteSelected = function (size) {
        console.log("open" + size);
        var uibModalInstance = $uibModal.open({

            templateUrl: '/components/udfqueue/reroutemodal/udfroute.html',
            controller: 'modalinstancectrl',
            size: size,
            windowClass: 'center-modal',

            resolve: {
                params: function () {
                    return {
                        key: 'value',
                        key2: 'value2'
                    };
                }

            }
        });

        uibModalInstance.result.then(
            function (result) {
                //alert(result);
            },
            function (result) {
                //alert(result);
            }
        );
    };

    //open a Confirmation page - uzr188
    $scope.markSelected = function (size) {
        console.log("open" + size);
        var uibModalInstance = $uibModal.open({

            templateUrl: '/components/udfqueue/confirmation.html',
            controller: 'modalinstancectrl',
            size: size,
            windowClass: 'center-modal',

            resolve: {
                params: function () {
                    return {
                        key: 'value',
                        key2: 'value2'
                    };
                }

            }
        });

        uibModalInstance.result.then(
            function (result) {
                //alert(result);
            },
            function (result) {
                //alert(result);
            }
        );
    };


    $scope.showDetails = function () {

        console.log($scope.btnShowDtlToggletxt);

        if ($scope.btnShowDtlToggletxt == 'Show Details') {
            angular.forEach($scope.udfrecords, function (value, key) {
                if (value.isChecked) {
                    value.showdtl = value.isChecked;
                    $scope.btnShowDtlToggletxt = 'Hide Details';
                }

            });
        } else if ($scope.btnShowDtlToggletxt == 'Hide Details') {
            $scope.allItemsSelected = false;
            angular.forEach($scope.udfrecords, function (value, key) {
                if (value.isChecked) {

                    value.showdtl = false;
                    $scope.udfrecords[key].isChecked = $scope.allItemsSelected;
                    $scope.btnShowDtlToggletxt = 'Show Details';
                    return;
                }


            });
        }

    }

    $scope.orderByField = 'udf_id';
    $scope.reverseSort = false;


    // This property will be bound to checkbox in table header
    $scope.allItemsSelected = false;

    // This executes when checkbox in table header is checked
    $scope.selectAll = function () {
        // Loop through all the udf and set their isChecked property
        for (var i = 0; i < $scope.udfrecords.length; i++) {
            $scope.udfrecords[i].isChecked = $scope.allItemsSelected;
        }
    };

//Pagination - Start

    $scope.itemsPerPage = 5;
    $scope.pageSizes = [5,10,25,50];
    $scope.currentPage = 0;


     // show items per page
    $scope.perPage = function () {
        $scope.udf.length = 0;
        $scope.udfqueue.length = 0;
        $scope.currentPage = 0;
        $scope.groupToPages();
    };



    // calculate page in place
    $scope.groupToPages = function () {
        for (var i = 0; i < $scope.udfrecords.length; i++) {  
          if (i % $scope.itemsPerPage === 0) {
            $scope.udfqueue[Math.floor(i / $scope.itemsPerPage)] = [ $scope.udfrecords[i] ];
          } else {
            $scope.udfqueue[Math.floor(i / $scope.itemsPerPage)].push($scope.udfrecords[i]);
          }
        }    
    };

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = Math.floor(start / $scope.itemsPerPage) + 1;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };


    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
          $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.udfqueue.length - 1) {
          $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.range1;
    };

/*

 $scope.currenttestPage = 0;
    $scope.mySearch = '';
    $scope.test = '';
    
    $scope.getData = function () {
          $scope.udfrecords = $filter('filter')($scope.udfrecords, $scope.mySearch);
    }
    
    $scope.numberOfPages = function(){
        $scope.getData();
        console.log($scope.udfrecords);
        //return Math.ceil($scope.udfrecords.length/$scope.itemsPerPage);                
    }

  */  
//Pagination - End

    $scope.openRerouteFrm = function (index) {
        var host = $window.location.host;
        $window.location.href = "http://" + host + "/#/" + "udfDymForm";
    };

}]);
