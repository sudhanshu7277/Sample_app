angular.module('myApp').controller('udfsearchCltr', ['$scope', 'dynamicFormService', 'udfFormLoaderService', 'udfFormPagingService', 'udfDepartmentService', 'orderByFilter', '$http', '$location', function ($scope, dynamicFormService, udfFormLoaderService, udfFormPagingService, udfDepartmentService, orderBy, $http, $location) {
    //Scope variables
    {
        $scope.showDiv = false;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 0;
        $scope.accountNo = '0005407777777777777';
        $scope.siteId = 'ALPH X';
        $scope.department = 'CCCS-SD';
        $scope.manID = '12345';
        $scope.modelID = 0;
        $scope.formTitle = 'test form';


    }

    //Hover logic
    {
        $scope.hover = function () {
            $scope.showDiv = !$scope.showDiv;
        };
    }

    //This is for departments drop down
    {
        udfDepartmentService.getDepartments().then(function (data) {
            $scope.depts = data;
        });
    }

    //Search udf form calls and pagination logic
    {
        udfFormPagingService.total().then(function (total) {
            $scope.total = total;
            console.log("");
        });

        udfFormPagingService.getAll().then(function (data) {
            $scope.totalUDFForms = orderBy(data, 'form_name', false);
            $scope.udfFormsnDetails = orderBy(data, 'form_name', false).slice($scope.currentPage * $scope.itemsPerPage, $scope.itemsPerPage);
        });



        //Capturing form data in json form
        $scope.submit = function () {

            var data_copy = angular.copy($scope.gridPageModel);
            var data = angular.toJson(data_copy);
          
            $http({
                    method: 'POST',
                    url: '/pgsave',
                    data: data, //forms user object
                    json: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .success(function (data) {
                   /** redirect to appropriate page after submit*/
                    alert("inside success", data);
                    $location.path('/udfsearch');

                }).error(function (data) {
                 /** Need to create a generic error page and reroute to that error page*/
                    alert("inside failure", data);
                });

        };
        $scope.loadMore = function () {
            $scope.currentPage++;
            udfFormPagingService.get($scope.currentPage * $scope.itemsPerPage, $scope.itemsPerPage).then(function (records) {
                $scope.udfFormsnDetails = orderBy($scope.udfFormsnDetails.concat(records), 'form_name', false);
            });

        };

        $scope.morePageDisabledClass = function () {
            return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
        };

        $scope.pageCount = function () {
            return Math.ceil($scope.total / $scope.itemsPerPage);
        };

    }

    dynamicFormService.getFormForID().then(function (data) {
        $scope.gridPageModel = data;




        $scope.gridPageModelCopy = data;

    });
    //This is for Dynamic form load
    {
        $scope.loadDynamicForm = function (index, formName) {
            dynamicFormService.getFormForID().then(function (data) {
                console.log('this is the index' + index);
                $scope.indx = index;
                $scope.modelID = index;
                $scope.formTitle = formName;
                $scope.udfFields = [];
                $scope.udfFields[index] = data;
            }, function (error) {
                console.log('Something went wrong:' + error);
            });
        }
    }


}]);


//Services
{
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

    //UDFFormLoader service
    angular.module('myApp').factory('udfFormLoaderService', function ($http) {
        var formLoaderService = {};

        formLoaderService.getAllUdfForms = function () {
            return $http.get('/searchUDFForms').then(function (result) {
                    return result.data;
                },
                function (error) {
                    return error;
                });
        }
        return formLoaderService;
    });
    //UDFFormLoader service end

    //udfFromPaging Service
    angular.module('myApp').factory('udfFormPagingService', function (udfFormLoaderService) {

        var pager = {};

        pager.get = function (offset, limit) {
            return udfFormLoaderService.getAllUdfForms().then(function (data) {
                //            console.log('first 5 records from service:::' + data.slice(offset, offset + limit).length);
                return data.slice(offset, offset + limit);
            })
        };

        pager.total = function () {
            return udfFormLoaderService.getAllUdfForms().then(function (data) {
                // console.log('this is the lenght of data:::' + data.length);
                return data.length;
            })
        };

        pager.getAll = function () {
            return udfFormLoaderService.getAllUdfForms().then(function (data) {
                return data;
            })
        };

        return pager;
    });
    //udfFromPaging Service end


    //Get Department service
    angular.module('myApp').factory('udfDepartmentService', function ($http) {
        var departmentService = {};

        departmentService.getDepartments = function () {
            return $http.get('/depts').then(function (result) {
                    return result.data;
                },
                function (error) {
                    return error;
                });
        };

        return departmentService;
    });
    //Get Department service end

}
