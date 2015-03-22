define(['./ajax-loader.module', 'ajax-loader', 'alert-util', 'lodash'],
        function (module, ajaxLoader, alertUtil, _) {

    var noop = function () {};

    function newInterceptor($q) {
        return function (impl) {
            return {
                request: function (config) {
                    (impl.doRequest || noop).apply(this, arguments);
                    return config;
                },
                requestError: function (rejection) {
                    (impl.doRequestError || noop).apply(this, arguments);
                    return $q.reject(rejection);
                },
                response: function (response) {
                    (impl.doResponse|| noop).apply(this, arguments);
                    return response;
                },
                responseError: function (rejection) {
                    (impl.doResponseError|| noop).apply(this, arguments);
                    return $q.reject(rejection);
                }
            };
        };
    }

    var ajaxSpinnerInterceptor = ['$q', '$timeout', function ($q, $timeout) {
        var handler = {
            onRequest: function (ajaxLoaderConfig, deferred) {
                ajaxLoader.begin(_.extend({
                    canceller: deferred,
                    setTimeoutFn: function (callback, delay) {
                        return $timeout(callback, delay, false);
                    },
                    clearTimeoutFn: function (timeoutId) {
                        $timeout.cancel(timeoutId);
                    }
                }, ajaxLoaderConfig));
            },
            onRequestError: function (ajaxLoaderConfig, response) {
                ajaxLoader.error(_.extend(ajaxLoaderConfig, {
                    data: response.data,
                    headers: response.headers(),
                    status: response.status
                }));
            },
            onResponse: function (ajaxLoaderConfig, response) {
                ajaxLoader.end(_.extend(ajaxLoaderConfig, {
                    data: response.data,
                    headers: response.headers(),
                    status: response.status
                }));
            },
            onResponseError: function (ajaxLoaderConfig, isCancelled, response) {
                if (isCancelled) {
                    ajaxLoader.end(ajaxLoaderConfig);
                } else {
                    ajaxLoader.error(_.extend(ajaxLoaderConfig, {
                        data: response.data,
                        headers: response.headers(),
                        status: response.status
                    }));
                }
            }
        };

        return newInterceptor($q)({
            doRequest: function (config) {
                if (config.ajaxLoader) {
                    var deferred = $q.defer();
                    config.timeout = deferred.promise; // times out request if this promise is rejected
                    deferred.promise.then(function () {
                        config._cancelled = true;
                    });
                    handler.onRequest(config.ajaxLoader, deferred, config);
                };
            },
            doRequestError: function (response) {
                var config = response.config || {};
                config.ajaxLoader && handler.onRequestError(config.ajaxLoader, response);
            },
            doResponse: function (response) {
                var config = response.config || {};
                config.ajaxLoader && handler.onResponse(config.ajaxLoader, response);
            },
            doResponseError: function (response) {
                var config = response.config || {};
                var isCancelled = config._cancelled;
                config.ajaxLoader && handler.onResponseError(config.ajaxLoader, isCancelled, response);
            }
        });
    }];

    var namSessionExpiredInterceptor = ['$q', function ($q) {
        function isNamSessionExpired(response) {
            function isResponseFromNam() {
                // var namHeaderHint = response.headers('JNET-Request-Source') !== 'APPLICATION';
                var namHeaderHint = false;
                // assumes NAM response status will never == 204
                // http://www.rajeshsegu.com/2012/10/ie-http-204-status-weirdness/
                var namStatusHint = !(response.status === 204 || response.status === 1223);

                // catches simulated ajax requests when using angular template scripts:
                // https://docs.angularjs.org/api/ng/directive/script
                var isSimulatedAjaxRequest = response.headers('Content-Length') === null;

                return namHeaderHint && namStatusHint && !isSimulatedAjaxRequest;
            }

            return isResponseFromNam();
        }

        return newInterceptor($q)({
            doResponse: function (response) {
                if (isNamSessionExpired(response)) {
                    alertUtil.showMessage({
                        title: 'Logged out due to inactivity',
                        content: 'Your session has expired; redirecting to the login page...'
                    });
                    setTimeout(function () {
                        location.reload(true);
                    }, 3000);
                }
            }
        });
    }];

    // <--------------------------------------------------------------------> //

    return module.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(ajaxSpinnerInterceptor);
        $httpProvider.interceptors.push(namSessionExpiredInterceptor);
    }]);

});