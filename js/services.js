define(['angular', 'ajax-loader'], function (angular, ajaxLoader) {
    var module = angular.module('services', []);

    module.service('services', ['$http', '$q', '$timeout', '$log', function ($http, $q, $timeout, $log) {
        var status, method, manager, lead, contact, benefit, affiliation, apps, count, enhancements;
       var preUrl = "http://madhu.noip.me:8080/services/api";
 //       var preUrl = "/services/api";
        var animate = function() {
            $("ul.loader", "#wrapper").addClass("loading");
            setTimeout(function() {
                $("ul.loader", "#wrapper").removeClass("loading");
            }, 500)};

        var viewEntries = function (path, promise) {
            var empty = {"count": "0", "message": "fail", "contacts": [], "entries": []};
            var defer = $q.defer();
            $http.get(path, {
                ajaxLoader: {
                    target: '#ormView'
                }
            }).then(function(r) {
                    defer.resolve(r.data);
                }, function(error) {
                    $log.log(error);
                    defer.reject(empty);
                });
            return defer.promise;
        };

        return {
            sayHello: function () {
                return viewEntries(preUrl + '/hello', status);
            },
            getLists: function () {
                return viewEntries(preUrl + '/lists', status);
            },
            getStatus: function () {
                return viewEntries(preUrl + '/list/status', status);
            },
            getMethod: function () {
                return viewEntries(preUrl + '/list/method', method);
            },
            getManager: function () {
                return viewEntries(preUrl + '/list/manager', manager);
            },
            getLead: function () {
                return viewEntries(preUrl + '/list/lead', lead);
            },
            getContact: function () {
                return viewEntries(preUrl + '/list/contact', contact);
            },
            getBenefit: function () {
                return viewEntries(preUrl + '/list/benefit', benefit);
            },
            getAffiliation: function () {
                return viewEntries(preUrl + '/list/affiliation', affiliation);
            },
            getApp: function () {
                return viewEntries(preUrl + '/list/apps', apps);
            },
            getCount: function () {
                return viewEntries(preUrl + '/count', count);
            },
            update: function (domain, text) {
                return viewEntries(preUrl + '/update/' + domain + '?text='+ text);
            },
            ldap: function (text) {
                return viewEntries(preUrl + '/ldap/' + '?name='+ text);
            },
            getEnhancements: function (start, size, sort, status) {
                var defer = $q.defer(), path = preUrl +
                    '/enhancements?sort='+sort+'&start='+start+'&size='+size+'&status='+status;
                animate();
                $http.get(path).then(function(r) {
                    defer.resolve(r.data);
                }, function(error) {
                    $log.log(error);
                    defer.reject({});
                });
                return defer.promise;
            }
        }
    }
    ]);

});
