define(['jquery', 'js/common/alert-util'], function ($, alertUtil) {

    var util = newUtil();

    // --- public api ----------------------------------------------------------------------------------------------- //

    var module = {
        begin: begin,
        end: end,
        error: error,
        templates: {
            ajaxLoader:
                "<div class='ajax-blocker-container'>" +
                    "<div class='ajax-blocker-bg'></div>" +
                    "<div class='ajax-blocker'></div>" +
                "</div>",
            ajaxAlert: function (msg) {
                return '<span class="ajax-alert"><i class="icon-exclamation-sign"></i><span class="ajax-alert-msg">'
                        + msg + '</span></span>';
            }
        }
    };

    return module;

    // --- fn declarations ------------------------------------------------------------------------------------------ //

    function begin(config) {
        var targetEl = $(config.target),
            canceller = config.canceller, // cancels ajax request when resolved
            setTimeoutFn = config.setTimeoutFn || window.setTimeout,
            clearTimeoutFn = config.clearTimeoutFn || window.clearTimeout,
            warningTimeoutSecs = (config.warningTimeoutSecs !== undefined ? config.warningTimeoutSecs : 20) * 1000,
            abortTimeoutSecs = (config.abortTimeoutSecs !== undefined ? config.abortTimeoutSecs : 60) * 1000;

        var warningTimeoutId = setTimeoutFn(warningTimeout, warningTimeoutSecs);
        var abortTimeoutId = setTimeoutFn(abortTimeout, abortTimeoutSecs);

        util.clearTimeouts(targetEl);
        util.clearAjaxBlocker(targetEl);
        util.clearAjaxAlert(targetEl);

        util.setAjaxBlocker(targetEl);
        util.store(targetEl, {
            warningTimeoutId: warningTimeoutId,
            abortTimeoutId: abortTimeoutId,
            clearTimeoutFn: clearTimeoutFn
        });

        // <------------------------> //

        function warningTimeout() {
            var ajaxAlertEl = util.setAjaxAlert(
                    targetEl, 'Your request is taking unusually long...', { style: 'display: none' });

            ajaxAlertEl.fadeIn();
        }

        function abortTimeout() {
            var ajaxAlertEl = util.setAjaxAlert(
                    targetEl, 'Your request has timed out. Please try again.').addClass('ajax-alert-aborted');

            setTimeoutFn(function () {
                ajaxAlertEl.fadeOut(500, function () {
                    $(this).remove();
                    canceller.resolve(); // cancels ajax request
                });
            }, 2000);
        }
    }

    function end(config) {
        var targetEl = config.target ? $(config.target) : document;

        util.clearTimeouts(targetEl);
        util.clearAjaxBlocker(targetEl);
        util.clearAjaxAlert(targetEl);
    }

    function error(config) {
        var data = config.data,
            headers = config.headers,
            status = config.status,
            isHttpRelated = (status >= 100 && status < 600),
            preError = config.preError;

        if (!preError || preError.call(null, data, headers, status)) {
            var alertMsg;

            if (isMessageObject(data, headers)) {
                alertMsg = data;
            } else {
                alertMsg = isHttpRelated
                         ? { title: "Request failed (" + status + ")", content: "Ajax request failed.", timeoutSecs: -1 }
                         : { title: "Request failed", content: "Unable to establish connection with server." };
            }

            alertUtil.showMessage(alertMsg);
        }

        end(config);
    }

    // --- utils ---------------------------------------------------------------------------------------------------- //

    function isMessageObject(data) {
        return (typeof data === 'object' && data && data.title && data.content);
    }

    function newUtil() {
        var DATA_KEY = 'ajaxLoaderData';

        return {

            store: function (el, data) {
                el.data(DATA_KEY, data);
            },

            clearTimeouts: function (el) {
                var data = el.data(DATA_KEY);
                if (data) {
                    var clearTimeoutFn = data.clearTimeoutFn;
                    clearTimeoutFn(data.warningTimeoutId);
                    clearTimeoutFn(data.abortTimeoutId);
                }
            },

            setAjaxBlocker: function (el) {
                if (util.needsAjaxBlocker(el)) {
                    if (el.css('position') === 'static') {
                        el.css('position', 'relative');
                    }
                    el.append(util._newAjaxBlockerEl());
                    el.find(':input:focus').blur();
                }
            },

            clearAjaxBlocker: function (el) {
                el.find('.ajax-blocker-container').remove();
            },

            setAjaxAlert: function (el, msg, attrs) {
                var ajaxAlertEl = util._newAjaxAlertEl(msg, attrs);

                util.clearAjaxAlert(el);
                el.append(ajaxAlertEl);

                return ajaxAlertEl;
            },

            clearAjaxAlert: function (el) {
                el.find('.ajax-alert').remove();
            },

            needsAjaxBlocker: function (target) {
                return !$(target).find('.ajax-blocker-container').length;
            },

            needsAjaxAlert: function (target) {
                return !$(target).find('.ajax-alert').length;
            },

            _newAjaxBlockerEl: function () {
                return $(module.templates.ajaxLoader);
            },

            _newAjaxAlertEl: function (msg, attrs) {
                return $(module.templates.ajaxAlert(msg)).attr(attrs || {});
            }

        };
    }
});