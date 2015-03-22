define(["jquery", "lodash", "tap", "touchswipe"], function ($, _/*, Modernizr*/) {
    
    var TRANSITIONEND_EVENT = (function () {
        var transitionendEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd',
            'MozTransition'    : 'transitionend',
            'OTransition'      : 'oTransitionEnd otransitionend',
            'msTransition'     : 'MSTransitionEnd',
            'transition'       : 'transitionend'
        };
        
        return Modernizr.csstransitions && transitionendEventNames[ Modernizr.prefixed('transition') ] || null;
    })();

    initSwipe();
    initEvents();

    ////////////////////////////////////////////////////////////////////////////
    
    function initEvents() {
        $("#nav-threedash").on(Modernizr.touchevents ? "tap" : "click", function () {
            sidenavActive() ? hideSidenav() : showSidenav();
        });
        
        $("#sidenav a").on(Modernizr.touchevents ? "tap" : "click", hideSidenav);
        
        $(document).scroll(function () {
            if ($("#nav").css("position") === "fixed") {
                $("#sidenav").css("top", 48);
            } else {
                var scrollTop = $(document.body).scrollTop();
                $("#sidenav").css("top", Math.max(0, 48 - scrollTop));
            }
        });
        
        $(window).resize(hideSidenav);
        
        if (TRANSITIONEND_EVENT) {
            $("#container").on(TRANSITIONEND_EVENT + ".sidenav", function () {
                setTimeout(function () {
                    if (!$("html").hasClass("sidenav-active")) {
                        $("#sidenav").hide();
                    }
                }, 100);
            });
        }
    }
    
    function showSidenav() {
        if (sidenavEnabled()) {
            $("#sidenav").show();
            
            if ($("html").is(".lt-ie9")) {
                // IE8 with Respond.js won't add "sidenav-active" class 
                $("html").attr("sidenav-active", true);
            } else {
                $("html").addClass("sidenav-active");
            }
        }
    }
    
    function hideSidenav() {
        if (sidenavActive()) {
            if ($("html").is(".lt-ie9")) {
                // IE8 with Respond.js won't add "sidenav-active" class 
                $("html").removeAttr("sidenav-active");
            } else {
                $("html").removeClass("sidenav-active");
            }
            
            if (!TRANSITIONEND_EVENT) {
                $("#sidenav").hide();
            }
        }
    }
    
    function sidenavEnabled() {
        return $("#nav-threedash").is(":visible") && !$(".modal-backdrop,.block-ui").length;
    }
    
    function sidenavActive() {
        var $html = $("html");
        
        return $html.is(".sidenav-active") || $html.attr("sidenav-active");
    }
    
    function initSwipe() {
        var lastTouchPageX;
        
        $(document).on('touchstart', function (e) {
            var touchEvent = e.originalEvent
              , touches = touchEvent.changedTouches;
              
            lastTouchPageX = (touches.length > 1 ? null : touches[0].pageX);
        });

        $(document).on('touchend', function (e) {
            var touchEvent = e.originalEvent
              , touches = touchEvent.changedTouches;
            
            if (touches.length > 1 || lastTouchPageX === null) {
                return;
            }
            
            var delta = lastTouchPageX - touches[0].pageX;
            
            if (delta > 100) {
                showSidenav();
            } else if (delta < -100) {
                hideSidenav();
            }
        });
    }
    
});