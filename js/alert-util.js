define(["jquery"], function ($) {

    return {
        showMessage: showMessage,
        removeAll: removeAll
    };

    // <--------------------------------------------------------------------> //

    function removeAll() {
        var $container = getContainerElement(true);
        if ($container)
            $container.remove();
    }

    function showMessage(config) {
        var title = config.title || ""
           ,content = config.content || ""
           ,cssClass = config.cssClass || ""
           ,startCss = config.startCss || { opacity: 0 }
           ,showEndCss = config.showEndCss || { opacity: .9 }
           ,showDuration = config.showDuration || 250
           ,removeEndCss = config.removeEndCss || startCss
           ,removeDuration = config.removeDuration || 250
           ,timeoutSecs = (config.timeoutSecs !== undefined ? config.timeoutSecs : 4)
           ,$container = config.target ? (config.target instanceof $ ? config.target : $(config.target))
                                       : getContainerElement();

        var contentIsHtml = content.indexOf("<") === 0
            ,cssClassToUse = [(!title ? "jnet-alert-notitle" : ""), "jnet-alert", cssClass].join(" ");

        var $alert = newAlertElement();
        $alert.appendTo($container);

        return show();

        // <----------------------------------------------------------------> //

        function newAlertElement() {
            var ret = $(
                '<div>' +
                    '<div class="jnet-alert-icon"><i class="fa fa-exclamation"></i></div>' +
                    '<div class="jnet-alert-body"></div>' +
                '</div>')
            .addClass(cssClassToUse)
            .css(startCss)
            .click(function () {
                remove();
            });

            title && $('<strong>').html(title).appendTo(ret.children('.jnet-alert-body'));
            content && (contentIsHtml ? $(content) : $('<p>').html(content)).appendTo(ret.children('.jnet-alert-body'));

            return ret;
        }

        function show() {
            return $alert.animate(showEndCss, showDuration, function () {
                $alert.removeAttr('style');
                if (timeoutSecs !== -1) {
                    setTimeout(function () { remove(); }, 1000 * timeoutSecs);
                }
            });
        }

        function remove() {
            return $alert.animate(removeEndCss, removeDuration, function () {
                $alert.remove();
            });
        }
    };

    function getContainerElement(getOnly) {
        var $container = $('body').children('.jnet-alert-container');
        return $container.length ? $container
                                 : getOnly ? null
                                           : newContainerElement();
        function newContainerElement() {
            return $('<div>', { 'class': 'jnet-alert-container' }).appendTo('body');
        }
    }
});