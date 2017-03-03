(function() {
	'use strict';

	angular.module('ChatBotApp')
		.factory('HotTopicService', HotTopicService);

	HotTopicService.$inject = ['$http'];

	function HotTopicService($http) {
		var hotTopicService = {};
		hotTopicService.GetHotTopicQuestions = function() {
			return $http({ url: '/api/GetHotTopic' });
		};
		return hotTopicService;
	}
})();
