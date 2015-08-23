define([
    'jquery',
    'angular',
    'angular-route',
    'angular-touch',
    'angular-sanitize',
    'js/services',
    'js/formctrl',
    'ajax-loader'
], function ($, angular) {
    var app = angular.module('app', [
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ajaxLoader',
        'services',
        'formctrl'
    ]).config(function ($httpProvider) {
        $httpProvider.interceptors.unshift(function ($q) {
            return {
                request: function (config) {
                    config.ajaxLoader = config.ajaxLoader || {
                        target: '#formView'
                    };
                    return config;
                }
            };
        });
    });
    $('#container').attr('ng-cloak', '');
    $('#container').addClass('init');
    angular.bootstrap(document, ['app']);
    return app;
});