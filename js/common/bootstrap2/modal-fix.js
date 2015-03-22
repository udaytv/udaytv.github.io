/**
 * Causes bootstrap2 modals to fill the browser window on small screens.
 * 
 * Fixes iOS7 Safari issue with navigation bar causing buttons to get cropped:
 * http://stackoverflow.com/questions/18793072/impossible-to-hide-navigation-bars-in-safari-ios-7-for-iphone-ipod-touch
 */

define(['jquery'], function($) {

    var updateInterval;

    $(document).on('show', '.modal', function() {
        $('body').addClass('modal-active');
        $('body')[isViewportSmall() ? 'addClass' : 'removeClass']('modals-fill-viewport');
    });

    $(document).on('shown', '.modal', function() {
        var $modal = $(this);

        if (isViewportSmall()) {
            fixModalBodyHeight($modal);
            updateInterval = setInterval(function () {
                // polling is necessary cause the iOS7 nav bar is unpredictably on or off and will cause
                // buttons to be cut off.  polling was the simplest workaround.
                fixModalBodyHeight($modal);
            }, 1000);
        }
    });

    $(document).on('hidden', '.modal', function() {
        var $modal = $(this);

        clearInterval(updateInterval);
        unfixModalBodyHeight($modal);
        $('body').removeClass('modal-active');
    });

    // <-----------------------------------------------------------------------------------------------------> //

    function isViewportSmall() {
        return $(window).height() < 600 || $(window).width() < 480;
    }

    function fixModalBodyHeight($modal) {
        var $modalBody = $modal.find('.modal-body');
        var $modalHeader = $modal.find('.modal-header');
        var $modalFooter = $modal.find('.modal-footer');

        var paddingAndBorder = $modalBody.outerHeight() - $modalBody.height();
        var modalBodyHeight = $modal.height() - $modalHeader.outerHeight() - $modalFooter.outerHeight() - paddingAndBorder;

        $modalBody.css('height', modalBodyHeight);
    }

    function unfixModalBodyHeight($modal) {
        $modal.find('.modal-body').removeAttr('style');
    }

});