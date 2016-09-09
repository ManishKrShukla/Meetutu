'use strict';

/**
 * @ngdoc function
 * @name meetutuApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the meetutuApp
 */
angular.module('meetutuApp')
    .controller('MapCtrl', ['$timeout', '$location', 'UserService', 'chatService', '$scope', function($timeout, $location, userService, chatService, $scope) {
        var vm = this;

        vm.windowOptions = {
            show: false,
            userName: userService.userDetails.userName,
            chat: [],
            user: {}
        };

        vm.markers = [

        ];

        vm.pos = userService.userDetails.position;

        if (!userService.userDetails.position) {
            $location.path("/");
            return;
        }

        vm.map = { center: { latitude: vm.pos.latitude, longitude: vm.pos.longitude }, zoom: 12 };
        vm.options = { markers: {}, scrollwheel: false };

        vm.onClick = function(marker, event, model) {
            vm.closeClick();

            vm.windowOptions.show = !vm.windowOptions.show;

            vm.windowOptions.user = {
                skills: model.skills,
                coords: model.coords,
                name: model.name,
                show: true
            };

            chatService.emit("chat", vm.windowOptions.user.name);

            if (model.teacher) {
                vm.windowOptions.chat.push({
                    message: `Hey There. I am ${model.name}, a guy who can teach you stuff. How can i help you today.`,
                    sent: false,
                });
            }

        };

        chatService.on("message", (message) => {
            vm.windowOptions.chat.push({
                message: message,
                sent: false,
            });

            $scope.$apply();

            vm.scrollChat();
        });

        vm.scrollChat = function() {
            var objDiv = document.getElementById("msg_container_base");
            objDiv.scrollTop = objDiv.scrollHeight;
        };

        vm.sendMessage = function() {
            chatService.emit("message", { id: vm.windowOptions.user.name, message: vm.chatMessage });

            vm.windowOptions.chat.push({
                message: vm.chatMessage,
                sent: true,
            });

            vm.scrollChat();
            vm.chatMessage = "";
        };

        vm.closeClick = function() {
            chatService.emit("leave", vm.windowOptions.user.name);
            vm.windowOptions.show = false;
            vm.windowOptions.chat = [];
            vm.windowOptions.user = {};
        };

        userService.getUserCoords().then((markers) => {
            markers.data.forEach((marker, $index) => {
                marker.id = $index;

                if (marker.teacher) {
                    marker.icon = 'images/t.png';
                } else {
                    marker.icon = 'images/l.png';
                }

                vm.markers.push(marker);
            });

        });

    }]);