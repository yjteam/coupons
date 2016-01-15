'use strict';

angular.module('myApp.login', ['ngRoute','ngAnimate'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'view/login/login.html',
            controller: 'LoginCtrl'
        });
    }])

.controller('LoginCtrl', ['$scope', '$timeout', function($scope, $timeout) {

    $timeout(function () {

        $scope.scale = 'container';

        return 123;

    }, 100, true );

}]);
