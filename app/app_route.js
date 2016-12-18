var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'fg']);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/udfadmin', {
            templateUrl: "/components/udfadmin/udfadmin.html",
            activeTab: 'udfadmin'
                //controller: "AdminCtrl in adminController.js" 
        })
        .when('/udfadminrole', {
            templateUrl: "/components/udfadmin/udfAdminRole.html",
            activeTab: 'udfadminrole'
                //controller: "AdminCtrl in adminController.js" 
        })
        .when('/udfadminAddRole', {
        templateUrl: "/components/udfadmin/roles/addRole.html"
        //controller: "AdminCtrl in adminController.js" 
        })
        .when('/udfadminAddDepartment', {
        templateUrl: "/components/udfadmin/roles/addDepartment.html"
        //controller: "AdminCtrl in adminController.js" 
        })
        .when('/udfadminqueue', {
            templateUrl: "/components/udfadmin/udfAdminQueue.html",
            activeTab: 'udfadminqueue'
                //controller: "AdminCtrl in adminController.js" 
        }) // Url and template for UDF Queue (vls189)
        .when('/udfadmindpt', {
            templateUrl: "/components/udfadmin/udfAdminDepartments.html",
            activeTab: 'udfadmindpt'
                //controller: "AdminCtrl in adminController.js" 
        }) // Url and template for UDF Departments (vls189)
        .when('/udfadminworker', {
            templateUrl: "/components/udfadmin/udfAdminWorkers.html",
            activeTab: 'udfadminworker'
                //controller: "AdminCtrl in adminController.js" 
        }) // Url and template for UDF Workers (vls189)
        .when('/udfadminform', {
            templateUrl: "/components/udfadmin/udfadminForm.html",
            activeTab: 'udfadminform'
                //controller: "AdminCtrl in adminController.js" 
        }) // Url and template for UDF Workers (vls189)
        .when('/udfsearch', {
            templateUrl: "/components/udfsearch/udfsearch.html",
            activeTab: 'udfsearch',
            controller: "udfsearchCltr"
        })
        .when('/udfsearchGrid', {
            templateUrl: "/components/udfsearch/udfsearchGrid.html",
            activeTab: 'udfsearch',
            controller: "udfsearchCltr"
        })
        .when('/udfqueue', {
            templateUrl: "/components/udfqueue/udfqueue.html",
            activeTab: 'udfqueue',
            controller: "AppCtrl"
        })
        .when("/", {
            templateUrl: "/components/udfsearch/udfsearch.html",
            controller: "udfsearchCltr",
            activeTab: ""
        })
        .when("/udfForm", {
            templateUrl: "/components/udfadmin/udfForm.html",
            controller: "udfFormController",
            activeTab: "udfForm"
        })
        .when("/logout", {
            templateUrl: "/components/udfadmin/logOut.html", // logout template added (vls189)
            //controller: "AppCtrl",
            activeTab: "logout"
        })
        .when('/udfDymForm', {
            templateUrl: "/components/udfqueue/dynamicUDFView.html",
            controller: "dynamicUDFformsController",
            activeTab: "udfDymForm"
        });

}]);

// controller for sideBar Active control and color effect vls189
myApp.controller('sidebarCtrl', ['$scope', '$route', '$timeout', function ($scope, $route, $timeout) {
    $scope.router = $route;


    $scope.currentActiveItem = function () {
        $timeout(function () {
            $scope.currentItem = $scope.router.current.activeTab;
            $scope.currentItem = ($scope.currentItem) ? $scope.currentItem : "";
            console.log($scope.currentItem);
        }, 0);
    };


    $scope.currentActiveItem();



}]);