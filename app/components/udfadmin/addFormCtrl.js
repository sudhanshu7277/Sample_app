angular.module('myApp').controller('addFormCtrl', ['$scope', 'appUtilsService', function ($scope, appUtilsService) {
	$scope.addOnClick = function(templateName){
            appUtilsService.setTemplateUrl($scope, templateName);
            console.log("role url is " + $scope.crudUrl.url);
     		console.log("crudUrl" + $scope.crudUrl);
    };

    $scope.myForm = {
		    			schema: {
						  "fields": [
						    {
						      "type": "text",
						      "name": "formName",
						      "displayName": "Form name",
						      "validation": {
						        "messages": {},
						        "required": true
						      },
						      "placeholder": "Enter form name here",
						      "tooltip": "Enter form name"
						    },
						    {
						      "type": "text",
						      "name": "description",
						      "displayName": "description",
						      "validation": {
						        "messages": {},
						        "required": true
						      },
						      "placeholder": "Enter description here",
						      "tooltip": "Enter description"
						    },
						    {
						      "type": "radiobuttonlist",
						      "name": "Gender",
						      "displayName": "Gender",
						      "options": [
						        {
						          "value": "male",
						          "text": "Male"
						        },
						        {
						          "value": "female",
						          "text": "Female"
						        }
						      ],
						      "value": "male"
						    },
						    {
						      "type": "email",
						      "name": "email",
						      "displayName": "Email",
						      "validation": {
						        "messages": {}
						      },
						      "placeholder": "Enter your email address here",
						      "tooltip": "Enter your email address here"
						    },
						    {
						      "type": "checkboxlist",
						      "name": "color",
						      "displayName": "Colors",
						      "options": [
						        {
						          "value": "red",
						          "text": "Red"
						        },
						        {
						          "value": "blue",
						          "text": "Blue"
						        },
						        {
						          "value": "green",
						          "text": "Green"
						        }
						      ],
						      "value": {}
						    }
						  ]
						}
  					};


}]);