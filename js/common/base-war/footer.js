define(["jquery", "lodash", "tap", "touchswipe"], function ($, _) {
    
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

    function expandFooter() {
        $(":input:focus").blur();
        $("#footer").css("height", $("#footer").height());

        var defaultHeight = $(".footer-default", "#footer").height();
        var expandedHeight = $(".footer-expanded", "#footer").height();
        
        if (Modernizr.csstransitions && TRANSITIONEND_EVENT) {
            transitionsImpl();
        } else {
            fallbackImpl();
        }
        
        //------------------------------->
        
        function transitionsImpl() {
            var afterExpanded = function () {
                setTimeout(function () {
                    $(".footer-inner", "#footer").css("opacity", 1);
                }, 100);
            };
            
            var afterFadeOut = function () {
                $("#footer").addClass("expand");
                
                $("#container").css({
                    "overflow": "hidden",
                    "height": $("#container").height()
                });
                
                $("#footer").one(TRANSITIONEND_EVENT, afterExpanded).css({
                    "height": expandedHeight,
                    "bottom": -(expandedHeight - defaultHeight),
                    "transform": "translateY(" + -(expandedHeight - defaultHeight) + "px)"
                });
            };
            
            $(".footer-inner", "#footer").one(TRANSITIONEND_EVENT, afterFadeOut).css("opacity", 0);
        }
        
        function fallbackImpl() {
            $(".footer-inner", "#footer").fadeOut(150, function () {
                $("#footer").addClass("expand");

                $("#footer").animate({ height: expandedHeight }, 300, function () {
                    $(".footer-inner", "#footer").fadeIn(150);
                });
            });
        };
    }

    function shrinkFooter() {
        $(":input:focus").blur();
        $("#footer").css("height", $("#footer").height());
        
        if (Modernizr.csstransitions && TRANSITIONEND_EVENT) {
            transitionsImpl();
        } else {
            fallbackImpl();
        }
        
        //------------------------------->
        
        function transitionsImpl() {
            var afterShrunk = function () {
                setTimeout(function () {
                    $(".footer-inner", "#footer").css("opacity", 1);
                }, 100);
            };
            
            var afterFadeOut = function () {
                $("#footer").removeClass("expand");
                
                $("#container").css({
                    "overflow": "initial",
                    "height": "auto"
                });
                
                $("#footer").one(TRANSITIONEND_EVENT, afterShrunk).removeAttr("style");
            };
            
            $(".footer-inner", "#footer").one(TRANSITIONEND_EVENT, afterFadeOut).css("opacity", 0);
        }
        
        function fallbackImpl() {
            $(".footer-inner", "#footer").fadeOut(150, function () {
                $("#footer").removeClass("expand");

                $("#footer").animate({ height: "50px" }, 300, function () {
                    $(".footer-inner", "#footer").fadeIn(150);
                });
            });
        }
    }
    
    $(document).on(Modernizr.touchevents ? "tap" : "click", "#expandFooterLink, .footer-expanded .close", function () {
        if ($("#footer").is(".expand")) {
            shrinkFooter();
        } else {
            expandFooter();
        }
        
        return false;
    });

    $(document).ready(function () {
        
        $(window).resize(function () {
            var footerHeight = $("#footer .footer-default").outerHeight() + 61
              , $container = $("#container")
              , offsetTopWithPadding = $container.offset().top + parseFloat($container.css("padding-top"));
            
            $container.css({
                "min-height": 
                        $("#container").css("margin-top") === "20px"
                        ? "initial"
                        : $("html").outerHeight() - offsetTopWithPadding - footerHeight - parseFloat($container.css("margin-top")),
                "padding-bottom": footerHeight
            });
        }).resize();
       
        $(".footer-default").swipe({
            swipeUp: expandFooter,
            threshold: 4
        });
        
        $(".footer-expanded").swipe({
            swipeDown: shrinkFooter,
            threshold: 4
        });
    });
    
});