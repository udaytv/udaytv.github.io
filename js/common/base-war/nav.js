define(["jquery", "lodash"], function ($, _) {
    
    $(document).ready(function () {
        initEnhancementSuggestions();
    });
    
    ////////////////////////////////////////////////////////////////////////////
    
    function initEnhancementSuggestions() {
        $(".feedback-link").click(function () {
            window.open(
                "/applications/enhancements/submit.aspx",
                "_blank",
                "left=0,top=0,status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=1,scrollbars=1,height=575,width=800"
            );
        });
    }

});