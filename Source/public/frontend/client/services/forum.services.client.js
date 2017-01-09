/**
 * Created by ngohungphuc on 06/01/2017.
 */

(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('GetQuestionViaCategory', GetQuestionViaCategory)
        .factory('GetQuestionInfoCategoryService', GetQuestionInfoCategoryService);

    GetQuestionViaCategory.$inject = ['$http'];
    GetQuestionInfoCategoryService.$inject = ['$http'];

    function GetQuestionViaCategory($http) {
        var getQuestionViaCategory = {};
        getQuestionViaCategory.GetQuestionViaCategory = function (id) {
            return $http.get('/api/GetQuestionViaCategory/' + id);
        };
        return getQuestionViaCategory;
    }

    function GetQuestionInfoCategoryService($http) {
        var getQuestionInfoCategory = {};
        getQuestionInfoCategory.GetQuestionInfoCategory = function () {
            return $http.get('/api/GetCategoryInfo/');
        };
        return getQuestionInfoCategory;
    }
})();