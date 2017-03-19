(function() {
    'use strict';

    angular.module('ChatBotApp')
        .controller('AccountInfoController', AccountInfoController);

    AccountInfoController.$inject = ['$scope', '$location', 'localStorageService', 'AccountContribService', 'UploadAvatarService'];

    function AccountInfoController($scope, $location, localStorageService, AccountContribService, UploadAvatarService) {
        $scope.HideUploadBtn = false;
        $scope.Loading = false;
        $scope.IsFormValid = false;
        $scope.IsFileValid = false;
        $scope.IsAvatarFormSubmitted = false;
        $scope.fileUpload = null;

        var loginUser = localStorageService.cookie.get('currentUser');
        var facebookUser = localStorageService.cookie.get('facebookUser');
        var currentUser = loginUser ? loginUser : facebookUser;
        if (!currentUser) {
            $location.path('/');
        }

        AccountContribService.GetAllContrib(currentUser).then(function(result) {
            $scope.user_contribs = result.data.user_contrib;
            $scope.userInfos = result.data.userInfo;
        });

        $scope.CheckFile = function(element) {
            $scope.$apply(function($scope) {
                $scope.fileUpload = element.files[0];
                $scope.fileMessage = '';
                var fileName = $scope.fileUpload.name;
                var fileIndex = fileName.lastIndexOf('.');
                var fileExtension = fileName.substring(fileIndex, fileName.length);

                if (fileExtension === '.jpeg' ||
                    fileExtension === '.jpg' ||
                    fileExtension === '.png') {
                    $scope.IsFileValid = true;
                } else {
                    toastr.warning('FIle phải có định dạng .jpeg, .jpg hoặc .png');
                }
            });
        };

        $scope.ChangeAvatar = function(input) {
            var reader = new FileReader();
            reader.onload = function() {
                var userAvatar = document.getElementById('user-avatar');
                if (userAvatar) userAvatar.src = reader.result;
                var defaultAvatar = document.getElementById('user-avatar-default');
                if (defaultAvatar) defaultAvatar.src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        };



        $scope.UploadAvatar = function() {
            $scope.IsAvatarFormSubmitted = true;
            if ($scope.fileUpload === null) {
                toastr.warning('Vui Lòng Chọn File');
                return false;
            } else {
                $scope.IsFormValid = true;
            }
            if ($scope.IsFormValid) {
                $scope.HideUploadBtn = true;
                /* for (var i = 0; i <= 100; i++) {
                    $(".progress-bar").width(i + "%");
                    $(".sr-only").html(i + "%");
                }*/
                UploadAvatarService.UploadAvatar($scope.fileUpload, currentUser).then(function(result) {
                    if (result.success) {
                        toastr.success(result.msg);
                    } else toastr.warning("Có lỗi xảy ra vui lòng thử lại");
                });

            }
        };


    }
})();