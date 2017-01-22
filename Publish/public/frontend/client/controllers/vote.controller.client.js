/**
 * Created by ngohungphuc on 29/12/2016.
 */
(function() {
	'use strict';
	angular
		.module('ChatBotApp')
		.controller('LikeController', LikeController)
		.controller('DislikeController', DislikeController);

	LikeController.$inject = ['$scope', 'localStorageService', 'LikeService'];
	DislikeController.$inject = ['$scope', 'localStorageService', 'DislikeService'];

	function LikeController($scope, localStorageService, LikeService) {
		var loginUser = localStorageService.cookie.get('currentUser');
		var facebookUser = localStorageService.cookie.get('facebookUser');
		var currentUser = loginUser ? loginUser : facebookUser;
		$scope.LikeAnswer = function(answerId) {

			if(!currentUser) {
				toastr.warning("Vui lòng đăng nhập để like bài viết");
				return false;
			}
			if(!$("#likeBtn-" + answerId).hasClass("active-vote")) {
				$("#likeBtn-" + answerId).addClass("active-vote");
				$("#dislikeBtn-" + answerId).attr("disabled", "disabled").off('click');
			} else {
				$("#likeBtn-" + answerId).removeClass("active-vote");
				$("#dislikeBtn-" + answerId).attr("disabled", false);
			}
			$scope.LikeData = {
				UserLike: currentUser,
				AnswerId: answerId
			};
			LikeService.LikeAnswer($scope.LikeData).then(function(result) {
				if(result.data.checkLikeAndDislike) {
					$("#like-" + answerId).text(result.data.totalLike);
					$("#dislike-" + answerId).text(result.data.totalDislike);
				} else {
					toastr.warning(result.data.msg);
					$("#like-" + answerId).text(result.data.totalLike);
				}
			});
		};
	}

	function DislikeController($scope, localStorageService, DislikeService) {
		var loginUser = localStorageService.cookie.get('currentUser');
		var facebookUser = localStorageService.cookie.get('facebookUser');
		var currentUser = loginUser ? loginUser : facebookUser;
		$scope.DislikeAnswer = function(answerId) {
			if(!currentUser) {
				toastr.warning("Vui lòng đăng nhập để dislike bài viết");
				return false;
			}

			$scope.DislikeData = {
				UserDislike: currentUser,
				AnswerId: answerId
			};
			if(!$("#dislikeBtn-" + answerId).hasClass("active-vote")) {
				$("#dislikeBtn-" + answerId).addClass("active-vote");
				$("#likeBtn-" + answerId).attr("disabled", "disabled").off('click');
			} else {
				$("#dislikeBtn-" + answerId).removeClass("active-vote");
				$("#likeBtn-" + answerId).attr("disabled", false);
			}

			DislikeService.DislikeAnswer($scope.DislikeData).then(function(result) {
				if(result.data.checkLikeAndDislike) {
					$("#like-" + answerId).text(result.data.totalLike);
					$("#dislike-" + answerId).text(result.data.totalDislike);
				} else {
					toastr.warning(result.data.msg);
					$("#dislike-" + answerId).text(result.data.totalDislike);
				}
			});
		};
	}
})();
