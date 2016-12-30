/**
 * Created by ngohungphuc on 29/12/2016.
 */
(function () {
    'use strict';
    angular
        .module('ChatBotApp')
        .controller('LikeController', LikeController);

    LikeController.$inject = ['$scope', 'localStorageService', 'LikeService'];

    function LikeController($scope, localStorageService, LikeService) {
        $scope.LikeAnswer = function (answerId) {
            var totalLike = $("#like-" + answerId).text();
            $scope.LikeData = {
                UserLike: localStorageService.cookie.get('currentUser'),
                AnswerId: answerId
            };
            if (localStorageService.cookie.get('currentUser') === null) {
                toastr.warning("Vui lòng đăng nhập để thích bài viết");
                return false;
            }
            LikeService.LikeAnswer($scope.LikeData).then(function (result) {
                toastr.warning(result.data.msg);
                $("#like-" + answerId).text(result.data.totalLike);
            });
        };
    }
})();