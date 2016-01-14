'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngAnimate',
	'ngRoute',
	'ngResource'
])
.run(function($rootScope, $location) {
	
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		//화면 전환 시작할때 실행되는 부분
	});
})
.config(['$resourceProvider', function($resourceProvider) {
	$resourceProvider.defaults.stripTrailingSlashes = false;
}])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}]);