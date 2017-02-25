(function() {
	'use strict';

	angular.module('ChatBotApp')
		.factory('SaveMessageService', SaveMessageService)
		.factory('GetMessageService', GetMessageService);

	SaveMessageService.$inject = ['$http'];
	GetMessageService.$inject = ['$http'];

	function SaveMessageService($http) {
		var saveMessageService = {};
		saveMessageService.SaveMessage = function(message) {
			return $http({
				url: '/api/Account/SaveMessage',
				method: 'POST',
				data: JSON.stringify(message),
				header: {
					'content-type': 'application/json'
				}
			});
		};
		return saveMessageService;
	}

	function GetMessageService($http) {
		var getMessageService = {};
		getMessageService.GetMessage = function(message) {
			return $http({
				url: '/api/Account/GetMessage',
				method: 'GET'
			});
		};
		return getMessageService;
	}
})();
