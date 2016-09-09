'use strict';

angular.module('meetutuApp')
    .factory('chatService', [, function() {
        var socket = io.connect("http://localhost:3000");

        return {
            on: function(eventName, callback) {
                socket.on(eventName, callback);
            },
            emit: function(eventName, data) {
                socket.emit(eventName, data);
            }
        };
    }]);