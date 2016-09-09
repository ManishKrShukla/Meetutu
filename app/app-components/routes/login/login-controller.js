'use strict';

/**
 * @ngdoc function
 * @name meetutuApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the meetutuApp
 */
angular.module('meetutuApp').controller('LoginCtrl', ['$scope', '$q', 'UserService', '$timeout', '$location', function($scope, $q, userService, $timeout, $location) {
    var scope = $scope;
    scope.userService = userService; //Storing a reference instead of creating new objects. This helps in referencing the service in the ui and at the very same time, will prevent creation of additional variables for UI. 
    scope.locationDenied = false;

    scope.userLogin = {
        email: '',
        password: ''
    };

    scope.loadTags = function(query) {
        query = query.toLowerCase();
        return userService.skills.filter((x) => x.text.toLowerCase().startsWith(query));
    };

    scope.signUp = function() {
        if (!userService.userDetails.skills.length) {
            alert("You must add atleast one skill");
        } else {
            scope.userService.userDetails.position = scope.position;
            userService.addUser().then(() => {
                alert("User registered successfully. Login To Continue");
                window.location.reload(); // using this method to refresh since templates are cached and might not rerender.
            });
        }
    };

    scope.login = function() {
        scope.userLogin.position = scope.position;

        if (userService.checkUser(scope.userLogin)) {
            alert("Logged in successfully");
            $location.path("/users");
        } else {
            alert("no user found");
        }
    };

    scope.signinCallback = function(googleUser) {
        userService.userDetails.userName = googleUser.w3.ig;
        userService.userDetails.email = googleUser.w3.U3;
        scope.$apply();
    };

    scope.signInFailed = function(error) {
        console.log(error);
    };

    $timeout(function() {
        gapi.signin2.render('signInButton', {
            'onsuccess': scope.signinCallback,
            'onfailure': scope.signInFailed,
            'clientid': '15299379592-85pqavfcdun99j2fc6f1b5i35lremhuf.apps.googleusercontent.com',
            'cookiepolicy': 'single_host_origin',
            'requestvisibleactions': 'http://schemas.google.com/AddActivity',
            'scope': 'https://www.googleapis.com/auth/plus.login'
        });
    }, 100);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            scope.$apply(() => {
                scope.position = {
                    'latitude': position.coords.latitude,
                    'longitude': position.coords.longitude,
                    'accuracy': position.coords.accuracy
                };
            });
        }, () => {
            scope.$apply(() => {
                scope.locationDenied = true;
            });
        });
    }

}]);