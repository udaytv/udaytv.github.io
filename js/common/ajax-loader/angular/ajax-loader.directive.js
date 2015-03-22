define(['./ajax-loader.module', 'ajax-loader'], function (module, ajaxLoader) {

    module.directive('ajaxLoader', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: false,
            template: ajaxLoader.templates.ajaxLoader
        };
    });

});