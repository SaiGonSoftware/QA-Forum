(function() {
	'use strict';

	angular.module('ChatBotApp')
		.controller('ChatController', ChatController);

	ChatController.$inject = ['$scope', 'localStorageService'];

	function ChatController($scope, localStorageService) {
		var socket = io.connect();
		var loginUser = localStorageService.cookie.get('currentUser');
		var facebookUser = localStorageService.cookie.get('facebookUser');
		var currentUser = loginUser ? loginUser : facebookUser;
		socket.emit('new user', currentUser);
		var chat = $('.media-list');
		var onlineList = $('.list-online');
		$scope.SendMessage = function() {
			var message = $("#chatMessageSend").val();
			if(!currentUser) {
				toastr.warning("Vui lòng đăng nhập để tham gia phòng chat");
				return false;
			}
			socket.emit('send message', message);
			$("#chatMessageSend").val('');
		};

		socket.on('new message', function(data) {
			chat.append('<p>' + data.msg + '</p>');
		});

		socket.on('get users', function(data) {
			var listUserOnline = '';
			for(var i = 0; i < data.length; i++) {
				listUserOnline += '<p>' + data[i] + '</p>';
			}
			onlineList.html(listUserOnline);
		});
	}
})();
