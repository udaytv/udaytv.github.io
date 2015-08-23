define([
    'jquery',
    'alert-util',
    'angular',
    'jquery',
    'angular-dir/angular-route',
    'angular-dir/angular-sanitize',
    'angular-dir/angular-touch',
    'bindonce',
    'uiPagination',
    'common/ajax-loader/angular/ajax-loader.httpInterceptors',
    'services'
], function ($, alertUtil, angular) {
    var module = angular.module('tablectrl', []);

    module.directive('manage', function (services) {
        var target = false, scope = '', appCtrl;

        function getTarget() {
            return target;
        }

        var handleClick = function handleClick(e, selector) {
            var $target = $(e.target);
            selector = selector || '#btn-manage';
            var text = $target.text();
            // update closure.
            target = e.target.getAttribute('id');
            $("span", selector).eq(0).text(text);
        }

        function handleUpdate(scope) {
            services.update(getTarget(), scope.inputText).then(function (data) {
                var title = (!data.hasOwnProperty("code") || data.code != '0') ? 'Error' : 'Success';
                alertUtil.showMessage({
                    title: title,
                    content: data.description
                });
                target=false;
                $("span", "#btn-manage").eq(0).text("Manage");
                scope.inputText = "";
                scope.refreshCache++;
            });
        }

        return {
            restrict: 'A',
            controller: function ($scope) {
                scope = $scope;
                     appCtrl = $scope.appCtrl,
                    $scope.getTarget = getTarget,
                    $scope.inputText = '',
                    $scope.isLoading = true;
             },
            link: function(scope, element, attrs, accordionCtrl) {
                scope.handleUpdate = handleUpdate,
                    scope.handleClick = handleClick;
            }
        }
    });

    module.controller('tableController', function ($scope, $rootScope, $timeout, $log, services) {
        var appCtrl = $scope.appCtrl;
        appCtrl['isAdmin'] = true;
        $scope.sortColumn = 'date'
            , $scope.sortOrder = false
            , $scope.totalItems = 0
            , $scope.currentPage = 1
            , $scope.numPerPage = 10
            , $scope.maxSize = 5
            , $scope.statusId = "0"
            , $scope.refreshTable = 1;

        services.getStatus().then(function (data) {
            $scope.statusList = data;
            $scope.statusList.splice(0, 0, {"label": "All", "value": "0"});
        });

        $scope.updateStatus = function () {
            $scope.currentPage = 1;
        }

        $scope.$on('event:viewTable', function () {
            $log.log('table: event:viewTable');
            $scope.currentPage = 1;
            displayFilter();
            $timeout(function () {
                appCtrl.submitSuccess = false;
            }, 10000);
        });

        var displayFilter = $scope.displayFilter = appCtrl.displayFilter = function () {
            var start = ($scope.currentPage - 1) * $scope.numPerPage;
            $log.log("start=" + start + ", column=" + $scope.sortColumn + " #" + ++$scope.refreshTable);
            services.getEnhancements(start, $scope.numPerPage, $scope.sortColumn, $scope.statusId).then(function (data) {
                $scope.list = data.data;
                $scope.totalItems = data.code;
                if ($scope.currentPage > $scope.numPages())
                    $scope.currentPage = 1;
            });
        }

        $scope.numPages = function () {
            return Math.ceil($scope.totalItems / $scope.numPerPage);
        };

        $scope.sort_by = function (sortBy) {
            if (sortBy == $scope.sortColumn)
                $scope.sortOrder = !$scope.sortOrder;
            else
                $scope.sortColumn = sortBy;
        };

        $scope.showEnhancement = function (enhancement) {
            $rootScope.$broadcast('event:enhancement', enhancement);
            $scope.showFormView = false;
        };

        $scope.$watch('currentPage + numPerPage + sortOrder + sortColumn + statusId', displayFilter);
        displayFilter();
    });


});
