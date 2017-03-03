(function() {
	'use strict';

	angular.module('ChatBotApp')
		.controller('HotTopicController', HotTopicController);

	HotTopicController.$inject = ['$scope', 'HotTopicService'];

	function HotTopicController($scope, HotTopicService) {
		HotTopicService.GetHotTopicQuestions().then(function(result) {
			$scope.hotToipics = result.data.hotToipics;
		});
	}
})();
