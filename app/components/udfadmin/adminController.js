//var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);
angular.module('myApp').controller('AdminCtrl', ['$scope', '$http', '$filter', '$uibModal', '$window', 'appUtilsService',
    function($scope, $http, $filter, $uibModal, $window, appUtilsService) {

        /**
    $scope.openUser = function(size){
        
        var uibModalInstance = $uibModal.open({

            templateUrl: '/components/udfadmin/addRole.html',
            controller: 'addUserinstancectrl',
            size: size,
            windowClass: 'center-modal',

            resolve: {
                params: function () {
                    return {
                        'groups': [
                            {'key': '1', 'value': 'Department - 1'},
                            {'key': '2', 'value': 'Department - 2'},
                            {'key': '3', 'value': 'Department - 3'},
                            {'key': '4', 'value': 'Department - 4'},
                            {'key': '5', 'value': 'Department - 5'},
                            {'key': '6', 'value': 'Department - 6'}
                        ]
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
    }  **/

        $scope.addOnClick = function(templateName) {
            appUtilsService.setTemplateUrl($scope, templateName);

            console.log("role url is " + $scope.crudUrl.url);
            console.log("crudUrl" + $scope.crudUrl);
        };
    }
])
    .controller('addUserinstancectrl', ['$scope', '$uibModalInstance', 'params',
        function($scope, $uibModalInstance, params) {
            console.log("I AM PARAMS ---- " + params);
            $scope.roleUsers = [];
            $scope.groups = params.groups;
            $scope.collectInformation = function() {

            }
            $scope.ok = function() {
                $uibModalInstance.close();
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss();
            };

            // Created by vls189 , controller for UDF Roles 
        }
    ]).controller('AdminRolesCtrl', ['$scope', '$http', '$filter', '$uibModal', '$window', '$compile', 'appUtilsService',
        function($scope, $http, $filter, $uibModal, $window, $compile, appUtilsService) {
            console.log("HELLO UDFADMIN ROLES CONTROLLER !!");

            $scope.udfAdminRole = [];
            $scope.adminRoleRecords = [];
            $scope.rolesInfo = [];
            $scope.addOnClickValue = false;

            $scope.addOnClick = function(templateName) {
                appUtilsService.setTemplateUrl($scope, templateName);

                console.log("role url is " + $scope.crudUrl.url);
                console.log("crudUrl" + $scope.crudUrl);
            };

            // cancel back to crud section vls189
            $scope.cancel = function() {
                $scope.crudUrl.clicked = false;
            };

            console.log("adminRoleRecords#", $scope.adminRoleRecords);
            $http.get('/UDFadminRoles')
                .success(function(response) {

                    //change udf to rolesInfo
                    $scope.adminRoleRecords = response;
                    console.log("WHY ?" + $scope.adminRoleRecords);
                    $scope.rolesInfo = "";
                    $scope.perPage();
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });

            $scope.orderByField = 'role_id';
            $scope.reverseSort = false;
            $scope.allItemsSelected = false;


            // function to select all roles 
            $scope.selectAll = function(data, value) {
                data.forEach(function(d, i) {
                    data[i].isChecked = value;
                })
            }

           /** $scope.selectAll = function() {
                // Loop through all the udf and set their isChecked property
                for (var i = 0; i < $scope.adminRoleRecords.length; i++) {
                    $scope.adminRoleRecords[i].isChecked = $scope.allItemsSelected;
                }
            }; **/

            //Pagination - Start

            $scope.itemsPerPage = 5;
            $scope.pageSizes = [5, 10, 25, 50];
            $scope.currentPage = 0;


            // show items per page
            $scope.perPage = function() {
                $scope.rolesInfo.length = 0; //change udf to rolesInfo
                $scope.udfAdminRole.length = 0;
                $scope.currentPage = 0;
                $scope.groupToPages();
            };

            $scope.groupToPages = function() {
                for (var i = 0; i < $scope.adminRoleRecords.length; i++) {
                    if (i % $scope.itemsPerPage === 0) {
                        $scope.udfAdminRole[Math.floor(i / $scope.itemsPerPage)] = [$scope.adminRoleRecords[i]];
                    } else {
                        $scope.udfAdminRole[Math.floor(i / $scope.itemsPerPage)].push($scope.adminRoleRecords[i]);
                    }
                }
            };

            $scope.range = function(start, end) {
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


            $scope.prevPage = function() {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };

            $scope.nextPage = function() {
                if ($scope.currentPage < $scope.udfAdminRole.length - 1) {
                    $scope.currentPage++;
                }
            };

            $scope.setPage = function() {
                $scope.currentPage = this.range1;
            };

            //Pagination - End
            
            /** $scope.openRerouteFrm = function(index) {
                var host = $window.location.host;
                $window.location.href = "http://" + host + "/#/" + "udfDymForm";
            }; **/

            // udf Admin Queues controller vls89 STARTS HERE
        }
    ]).controller('AdminQueuesCtrl', ['$scope', '$http', '$filter', '$uibModal', '$window', '$compile', 'appUtilsService',
        function($scope, $http, $filter, $uibModal, $window, $compile, appUtilsService) {
            console.log("HELLO UDFADMIN QUEUES CONTROLLER !!");

            $scope.udfAdminQueue = [];
            $scope.adminQueueRecords = [];
            $scope.queuesInfo = [];
            $scope.addOnClickValue = false;

            $scope.addOnClick = function(templateName) {
                appUtilsService.setTemplateUrl($scope, templateName);

                console.log("role url is " + $scope.crudUrl.url);
                console.log("crudUrl" + $scope.crudUrl);
            };

            // cancel back to crud section vls189
            $scope.cancel = function() {
                $scope.crudUrl.clicked = false;
                console.log("Queue cancel was clicked");
            };

            console.log("adminQueueRecords#", $scope.adminQueueRecords);
            $http.get('/UDFadminQueues')
                .success(function(response) {
                    $scope.adminQueueRecords = response;
                    //  console.log("adminQueueRecords Objects" + adminQueueRecords);
                    $scope.queuesInfo = "";
                    $scope.perPage();
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });

            $http.get('/depts')
                .success(function(response) {
                    $scope.adminDeptRecords = response;
                    console.log("dept records " + $scope.adminDeptRecords);
                    $scope.deptInfo = "";
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });

            $scope.orderByField = 'queue_id';
            $scope.reverseSort = false;
            $scope.allItemsSelected = false;


            // function to select all queues 
            $scope.selectAll = function(data, value) {
                data.forEach(function(d, i) {
                    data[i].isChecked = value;
                })
            }


            //Pagination - Start


            /**$scope.selectAll = function () {
        // Loop through all the udf and set their isChecked property
        for (var i = 0; i < $scope.adminQueueRecords.length; i++) {
            $scope.adminQueueRecords[i].isChecked = $scope.allItemsSelected;
        }
    }; **/

            $scope.itemsPerPage = 5;
            $scope.pageSizes = [5, 10, 25, 50];
            $scope.currentPage = 0;


            // show items per page
            $scope.perPage = function() {
                $scope.queuesInfo.length = 0;
                $scope.udfAdminQueue.length = 0;
                $scope.currentPage = 0;
                $scope.groupToPages();
            };

            $scope.groupToPages = function() {
                for (var i = 0; i < $scope.adminQueueRecords.length; i++) {
                    if (i % $scope.itemsPerPage === 0) {
                        $scope.udfAdminQueue[Math.floor(i / $scope.itemsPerPage)] = [$scope.adminQueueRecords[i]];
                    } else {
                        $scope.udfAdminQueue[Math.floor(i / $scope.itemsPerPage)].push($scope.adminQueueRecords[i]);
                    }
                };
            };

            $scope.range = function(start, end) {
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


            $scope.prevPage = function() {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };

            $scope.nextPage = function() {
                if ($scope.currentPage < $scope.udfAdminQueue.length - 1) {
                    $scope.currentPage++;
                }
            };

            $scope.setPage = function() {
                $scope.currentPage = this.range1;
            };

            //Pagination - End


            /** $scope.openRerouteFrm = function (index) {
        var host = $window.location.host;
        $window.location.href = "http://" + host + "/#/" + "udfDymForm";
    }; **/

        }
    ]).controller('addDepartmentCtrl', ['$scope', '$http', '$filter', '$window', '$compile', 'appUtilsService',
        function($scope, $http, $filter, $window, $compile, appUtilsService) {


            $scope.forms = [];
            $scope.adminQueueRecords = [];
            $scope.form = [];
            $scope.queueInfo = [];
            
            $http.get('/UDFadminDepts').then(function(result) {
                    $scope.forms = result;
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });

            $http.get('/UDFadminQueues')
                .success(function(response) {
                    $scope.adminQueueRecords = response;
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });

            // Function to select all departments 
            $scope.selectAll = function(data, value) {
                data.forEach(function(d, i) {
                    data[i].isChecked = value;
                })
            }


        }
    ]).controller('AdminDeptCtrl', ['$scope', '$http', '$filter', '$window', '$compile', 'appUtilsService',
        function($scope, $http, $filter, $window, $compile, appUtilsService) {
            console.log("HELLO UDFADMIN QUEUES CONTROLLER !!");

            $scope.udfAdminDept = [];
            $scope.adminDeptRecords = [];
            $scope.deptInfo = [];
            $scope.addOnClickValue = false;

            $scope.addOnClick = function(templateName) {
                appUtilsService.setTemplateUrl($scope, templateName);

                console.log("role url is " + $scope.crudUrl.url);
                console.log("crudUrl" + $scope.crudUrl);
            };

            // cancel back to crud section vls189
            $scope.cancel = function() {
                $scope.crudUrl.clicked = false;
                console.log("deptsQueue cancel was clicked");
            };


            $http.get('/UDFadminDepts')
                .success(function(response) {
                    $scope.adminDeptRecords = response;
                    console.log("dept records " + $scope.adminDeptRecords);
                    $scope.deptInfo = "";
                    $scope.perPage();
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });

            $scope.orderByField = 'dept_id';
            $scope.reverseSort = false;
            $scope.allItemsSelected = false;

            // Function to select all departments
            $scope.selectAll = function(data, value) {
                data.forEach(function(d, i) {
                    data[i].isChecked = value;
                })
            }

            //Pagination - Start


            /**$scope.selectAll = function () {
        // Loop through all the udf and set their isChecked property
        for (var i = 0; i < $scope.udfAdminDept.length; i++) {
            $scope.udfAdminDept[i].isChecked = $scope.allItemsSelected;
        }
    }; **/

            $scope.itemsPerPage = 10;
            $scope.pageSizes = [5, 10, 25, 50];
            $scope.currentPage = 0;


            // show items per page
            $scope.perPage = function() {
                $scope.deptInfo.length = 0;
                $scope.udfAdminDept.length = 0;
                $scope.currentPage = 0;
                $scope.groupToPages();
            };

            $scope.groupToPages = function() {
                for (var i = 0; i < $scope.adminDeptRecords.length; i++) {
                    if (i % $scope.itemsPerPage === 0) {
                        $scope.udfAdminDept[Math.floor(i / $scope.itemsPerPage)] = [$scope.adminDeptRecords[i]];
                    } else {
                        $scope.udfAdminDept[Math.floor(i / $scope.itemsPerPage)].push($scope.adminDeptRecords[i]);
                    }
                };
            };

            $scope.range = function(start, end) {
                var ret = [];
                if (!end) {
                    end = Math.floor(start / $scope.itemsPerPage) + 1;
                    start = 0;
                }
                for (var i = start; i < end; i++) {
                    ret.push(i);
                }
                console.log(ret);
                return ret;
            };


            $scope.prevPage = function() {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };

            $scope.nextPage = function() {
                if ($scope.currentPage < $scope.udfAdminDept.length - 1) {
                    $scope.currentPage++;
                }
            };

            $scope.setPage = function() {
                $scope.currentPage = this.range1;
            };

            //Pagination - End

        }
    ]).controller('addWorkerCtrl', ['$scope', '$http', '$filter', '$window', '$compile', 'appUtilsService',
        function($scope, $http, $filter, $window, $compile, appUtilsService) {

            $scope.depts = [], $scope.adminRoleRecords = [];
            $http.get('/UDFadminDepts').then(function(result) {
                    $scope.depts = result.data;
                },
                function(error) {
                    return error;
                });

            $http.get('/UDFadminRoles')
                .success(function(response) {
                    $scope.adminRoleRecords = response;
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });

            // Function to select all departments 
            $scope.selectAll = function(data, value) {
                data.forEach(function(d, i) {
                    data[i].isChecked = value;
                })
            }


        }
    ])
    .controller('AdminWorkerCtrl', ['$scope', '$http', '$filter', '$window', '$compile', 'appUtilsService',
        function($scope, $http, $filter, $window, $compile, appUtilsService) {
           // console.log("HELLO UDFADMIN Workers CONTROLLER !!");

            $scope.udfAdminWorker = [];
            $scope.adminWorkerRecords = [];
            $scope.workerInfo = [];
            $scope.addOnClickValue = false;

            $scope.addOnClick = function(templateName) {
                appUtilsService.setTemplateUrl($scope, templateName);

                console.log("role url is " + $scope.crudUrl.url);
                console.log("crudUrl" + $scope.crudUrl);
            };

            // cancel back to crud section vls189
            $scope.cancel = function() {
                $scope.crudUrl.clicked = false;
                console.log("Worker cancel was clicked");
            };


            $http.get('/UDFadminWorkers')
                .success(function(response) {
                    $scope.adminWorkerRecords = response;
             //       console.log("Worker records " + $scope.adminWorkerRecords);
                    $scope.workerInfo = "";
                    $scope.perPage();
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });

            $scope.orderByField = 'user_id';
            $scope.reverseSort = false;
            $scope.allItemsSelected = false;

            // Function to select all Workers
            $scope.selectAll = function(data, value) {
                data.forEach(function(d, i) {
                    data[i].isChecked = value;
                })
            }

            //Pagination - Start

            /**$scope.selectAll = function () {
        // Loop through all the udf and set their isChecked property
        for (var i = 0; i < $scope.udfAdminWorker.length; i++) {
            $scope.udfAdminWorker[i].isChecked = $scope.allItemsSelected;
        }
    }; **/

            $scope.itemsPerPage = 10;
            $scope.pageSizes = [5, 10, 25, 50];
            $scope.currentPage = 0;


            // show items per page
            $scope.perPage = function() {
                $scope.workerInfo.length = 0;
                $scope.udfAdminWorker.length = 0;
                $scope.currentPage = 0;
                $scope.groupToPages();
            };

            $scope.groupToPages = function() {
                for (var i = 0; i < $scope.adminWorkerRecords.length; i++) {
                    if (i % $scope.itemsPerPage === 0) {
                        $scope.udfAdminWorker[Math.floor(i / $scope.itemsPerPage)] = [$scope.adminWorkerRecords[i]];
                    } else {
                        $scope.udfAdminWorker[Math.floor(i / $scope.itemsPerPage)].push($scope.adminWorkerRecords[i]);
                    }
                };
            };

            $scope.range = function(start, end) {
                var ret = [];
                if (!end) {
                    end = Math.floor(start / $scope.itemsPerPage) + 1;
                    start = 0;
                }
                for (var i = start; i < end; i++) {
                    ret.push(i);
                }
                console.log(ret);
                return ret;
            };


            $scope.prevPage = function() {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };

            $scope.nextPage = function() {
                if ($scope.currentPage < $scope.udfAdminWorker.length - 1) {
                    $scope.currentPage++;
                }
            };

            $scope.setPage = function() {
                $scope.currentPage = this.range1;
            };

            //Pagination - End

        }
    ]);