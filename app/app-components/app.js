'use strict';

/**
 * @ngdoc overview
 * @name meetutuApp
 * @description
 * # meetutuApp
 *
 * Main module of the application.
 */
angular
    .module('meetutuApp', [
        'ngAnimate',
        'ngCookies',
        'ui.bootstrap',
        'ngResource',
        'ngRoute',
        'ngTagsInput',
        'ngSanitize'
    ]);

angular.module('meetutuApp').config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/main', {
            templateUrl: 'app-components/routes/users/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/', {
            templateUrl: 'app-components/routes/login/login-tpl.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);