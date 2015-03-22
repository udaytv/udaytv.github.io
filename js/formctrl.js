define([
    'angular',
    'jquery',
    'alert-util',
    'js/common/ajax-loader/angular/ajax-loader.httpInterceptors',
    'angular-ui-bootstrap',
    'js/services'
], function (angular, $, alertUtil) {
    var module = angular.module('formctrl', [
        'ui.bootstrap',
        'ui.bootstrap.tpls',
    ]);

    module.directive('ajaxBlockerContainer', function () {
        return {
            restrict: 'C',
            link: function (scope, elm, attrs) {
                $(elm).fadeOut(function () {
                    $(this).remove();
                    $("<ul class='loader'><li></li><li></li><li></li></ul>").appendTo("div#wrapper");
                    $("ul.loader", "#wrapper").on('mouseover', function() {
                        $("ul.loader", "#wrapper").addClass("loading");
                        setTimeout(function() {
                            $("ul.loader", "#wrapper").removeClass("loading");
                        }, 1000);
                    });
                });
            }
        }
    });

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

    module.controller('appController', function ($scope, $rootScope, $http, $timeout, $log) {
        var self = this;

        self.results = [];
        self.user = {};
        self.requestData = null;
        self.hasSearchResults = hasSearchResults;
        self.executeSearch = executeSearch;
        self.showFormView = false;
        self.isAdmin = false;
        self.submitSuccess = false;
        self.hasError = false;

        function hasSearchResults() {
            return self.results && self.results.length && self.requestData;
        }

        $rootScope.$on('event:submit', function () {
            $log.log('event:submit');
        });

        $rootScope.$on('event:viewTable', function () {
            self.showFormView = false;
            $log.log('event:viewTable');
        });
        $rootScope.$on('event:viewForm', function () {
            self.isAdmin = true;
            self.showFormView = true;
            $log.log('event:viewForm');
        });
        $rootScope.$on('event:enhancement', function (event, data) {
            self.showFormView = true;
        });
        $rootScope.$on('event:success', function () {
            self.submitSuccess = true;
        });

        function executeSearch(url, requestData, $scope) {
            self.requestData = requestData;
            var frm = $scope.userForm;
            var isDirty = frm.email.$dirty || frm.description.$dirty || frm.name.$dirty || frm.phone.$dirty;
            // frm.email.$dirty = frm.description.$dirty = frm.name.$dirty = frm.phone.$dirty = false;
            requestData['editedBy'] = self.user['uid'];
            return $http.post(url, requestData, {
                params: {
                    update: isDirty
                },
                ajaxLoader: {
                    target: $('#tableView').is(':visible') ? '#tableView' : '#formView'
                }
            }).success(function (users) {
                self.submitSuccess = true;
                self.hasError = false;
                $rootScope.$broadcast('event:viewTable');
            });
        }
    });

    module.controller('formController', function ($scope, $rootScope, $http, $log, $timeout, services) {
   //    var baseUrl = '/services/api';
        var baseUrl = "http://madhu.noip.me:8080/services/api";
        var appCtrl = $scope.appCtrl;
        $scope.hasError = appCtrl.hasError;
        $scope.domainInfo = {};
        $scope.rawCriteria = {
            field: 'FULL_NAME',
            modifier: 'contains',
            rawExpression: ''
        };
        $scope.focusExpressionField = focusExpressionField;
        $scope.handleSubmit = appCtrl.handleSubmit = handleSubmit;
        $rootScope.$on('event:submit', handleSubmit);
        $scope.refreshCache = 1;
        $scope.onTypeahead = function ($item, $model, $label) {
            if (!$scope.domainInfo['affiliation'])
                $scope.domainInfo['affiliation'] = $item.affiliation;
            if (!$scope.domainInfo['email'])
                $scope.domainInfo['email'] = $item.email;
            if (!$scope.domainInfo['phone'])
                $scope.domainInfo['phone'] = $item.phone;
        }
        $scope.getNames = function (name) {
            return services.ldap(name).then(function (data) {
                $timeout(function () {
                    $("#name").focus();
                }, 500);
                var array = [];
                data.forEach(function (obj) {
                    if (obj.hasOwnProperty('jnetid'))array.push(obj);
                });
                return array;
            });
        }

        !function onload() {
            services.sayHello().then(function (data) {
                 alertUtil.showMessage({
                    title: data.code,
                    content: data.description
                });
            });
        }();

        var _refreshCacheFn = function () {
            $log.log('refreshCache=' + $scope.refreshCache);
            services.getLists().then(function (data) {
                if (data.person) {
                    var person = data.person;
                    appCtrl.user['uid'] = $scope.domainInfo.name = person['jnetid'];
                    appCtrl.user['email'] = $scope.domainInfo.email = person['email'];
                    appCtrl.user['phone'] = $scope.domainInfo.phone = person['phone'];
                    appCtrl.user['affiliation'] = $scope.domainInfo.affiliation = person['affiliation'];
                }
                $scope.statusList = data.status;
                $scope.methodList = data.method;
                $scope.managerList = data.manager;
                $scope.leadList = data.lead;
                $scope.contactList = data.contact;
                $scope.benefitList = data.benefit;
                $scope.appList = data.apps;
            });
        }

        var refreshCacheFn = function () {
            // no op
        };

        refreshCacheFn();
        $scope.$watch('refreshCache', refreshCacheFn);

        function focusExpressionField() {
            setTimeout(function () {
                $('#expression').select();
            }, 0);
        }

        function focusExpressionFieldIfEmpty(results) {
            if (!results || !results.length) {
                focusExpressionField();
            }
        }

        function handleSubmit() {
            function processExpression(rawExpression, modifier) {
                switch (modifier) {
                    case 'contains':
                        return '*' + rawExpression + '*';
                    case 'starts with':
                        return rawExpression + '*';
                    case 'is':
                    default:
                        return rawExpression;
                }
            }

            if (!$scope.userForm.$valid) {
                $scope.hasError = true;
                return false;
            } else
                $scope.hasError = false;
            var criteria = {
                field: $scope.rawCriteria.field,
                expression: processExpression($scope.rawCriteria.rawExpression, $scope.rawCriteria.modifier)
            };
            var requestData = $scope.domainInfo;

            appCtrl.executeSearch(baseUrl + '/create', requestData, $scope);
        }

        $rootScope.$on('event:enhancement', function (event, data) {
            $scope.showFormView = true;
            if ($.isEmptyObject(data))
                $scope.domainInfo = {};
            else
                $scope.domainInfo = data;
        });
        $rootScope.$on('event:clear', function () {
            $scope.showFormView = true;
            $scope.domainInfo = {};
        });
        $rootScope.$on('event:viewForm', function () {
            $scope.showFormView = true;
            $scope.domainInfo = {
                'name': appCtrl.user['uid'], 'email': appCtrl.user['email'], 'phone': appCtrl.user['phone'],
                'affiliation': appCtrl.user['affiliation']
            };
        });

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
