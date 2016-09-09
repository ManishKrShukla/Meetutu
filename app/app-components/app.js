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
        'uiGmapgoogle-maps',
        'ngRoute',
        'ngTagsInput',
        'ngSanitize'
    ]);

angular.module('meetutuApp').config(['$routeProvider', 'uiGmapGoogleMapApiProvider', function($routeProvider, uiGmapGoogleMapApiProvider) {

    uiGmapGoogleMapApiProvider.configure({
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });

    $routeProvider
        .when('/map', {
            templateUrl: 'app-components/routes/map/map.html',
            controller: 'MapCtrl',
            controllerAs: 'mapCtrl'
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