require.config({
    "paths": {
          "alert-util": "js/common/alert-util",
          "ajax-loader": "js/common/ajax-loader/ajax-loader",
          "angular": "dist/angular/angular",
          "angular-animate": "dist/angular-animate/angular-animate",
          "angular-mocks": "dist/angular-mocks/angular-mocks",
          "angular-route": "dist/angular-route/angular-route",
          "angular-touch": "dist/angular-touch/angular-touch",
          "angular-scenario": "dist/angular-scenario/angular-scenario",
          "angular-sanitize": "dist/angular-sanitize/angular-sanitize",
          "angular-ui-bootstrap": "dist/angular-ui-bootstrap/dist/ui-bootstrap-tpls-1.0.0",
          "bootstrap": [
            "dist/bootstrap/js/bootstrap",
            "dist/bootstrap/css/bootstrap.css"
          ],
          "es5-shim": "dist/es5-shim/es5-shim",
          "fastclick": "dist/fastclick/lib/fastclick",
          "jquery-touchswipe": "dist/jquery-touchswipe/jquery.touchSwipe",
          "jquery.inputmask": "dist/jquery.inputmask/jquery.inputmask.bundle",
          "jquery": "dist/jquery/jquery",
          "json3": "dist/json3/lib/json3",
          "lodash": "dist/lodash/lodash.compat",
          "modernizr": "dist/modernizr",
          "requirejs": "dist/requirejs/require",
          "respond": "dist/respond"
    },
    "shim": {
        "angular-ui-bootstrap": {
            "deps": ['angular'],
            "exports": 'angular'
        },
        "uiUtils": {
            "deps": ['angular'],
            "exports": 'angular'
        },
        "angular-touch": {
            "deps": ['angular'],
            "exports": 'angular'
        },
        "angular-route": {
            "deps": ['angular'],
            "exports": 'angular'
        },
        "angular-animate": {
            "deps": ['angular'],
            "exports": 'angular'
        },
        "angular-sanitize": {
            "deps": ['angular'],
            "exports": 'angular'
        },
        "angular": {
            "deps": ['jquery'],
            "exports": 'angular'
        },
        "bootstrap": {
            "deps": ["jquery"]
        },
        "inputmask": {
            "deps": ["jquery"]
        },
        "jquery-ui": {
            "deps": ["jquery", "css!../dist/jquery-ui-1.10.3.custom/css/ui-lightness/jquery-ui-1.10.3.custom.min"]
        }
    },
    "map": {
        "*": {
            "css": "require-css"
        }
    }
});

// second require.config call needed because r.js processes only the first require.config call,
// and it will die if it sees an undeclared var like 'contextPath'.
require.config({
    "baseUrl": "./"
});