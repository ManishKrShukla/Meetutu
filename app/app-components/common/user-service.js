'use strict';

/**
 * @ngdoc function
 * @name meetutuApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the meetutuApp
 */
angular.module('meetutuApp').service('UserService', ['$q', '$timeout', '$http', function($q, $timeout, $http) {

    this.userDetails = {
        userName: '',
        email: '',
        password: '',
        teacher: true,
        skills: []
    };

    this.getUserCoords = function() {
        var defer = $q.defer();

        $http({ url: "http://localhost:3000/map-coords" }).then((response) => {
            defer.resolve(response);
        });

        return defer.promise;
    };

    this.addUser = function() {
        var deferred = $q.defer();
        let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        users.push(this.userDetails); //ideally, password shall be hashed before saving, but skipping it as of now.
        localStorage.setItem("users", JSON.stringify(users));

        $timeout(() => {
            deferred.resolve(true);
        }, 3000);

        return deferred.promise;
    };

    this.checkUser = function(userDetails) {
        let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        var user = users.filter((u) => u.email = userDetails.email && u.password === userDetails.password)[0];

        if (user) {
            this.userDetails = user;
        }

        return user;
    };

    this.skills = [
        { text: 'angular' },
        { text: 'ember' },
        { text: 'react' },
        { text: 'java' },
        { text: 'node' },
        { text: 'python' },
        { text: 'typescript' },
        { text: 'php' },
        { text: 'asp' },
        { text: 'csharp' },
        { text: 'android' },
        { text: 'ios' },
        { text: 'swift' },
        { text: 'test1' },
        { text: 'test2' },
        { text: 'test3' },
        { text: 'test4' },
        { text: 'test5' },
        { text: 'test6' },
        { text: 'test7' },
        { text: 'test8' },
        { text: 'test9' },
        { text: 'test10' },
        { text: 'test11' },
        { text: 'test12' },
        { text: 'test13' },
        { text: 'test14' },
    ];
}]);