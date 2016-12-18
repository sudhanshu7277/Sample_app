angular.module('myApp').service('appUtilsService', function(){
	this.setTemplateUrl = function(scope, templateName){
		scope.crudUrl = {};
        scope.crudUrl.clicked = true;
        scope.crudUrl.url = '/components/udfadmin/roles/'+templateName+'.html';
	};
});