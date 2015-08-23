define(['jquery'], function () {
    
    initInputFocused();
    
    /**
     * .input-focused class is useful for changing position: fixed elements to position: absolute
     * to work around a well-known bug in mobile browsers that locks position: fixed elements in 
     * place when an element is focused (noticeable when scrolling).
     */
    function initInputFocused() {
        
        // excludes button-like input types such as input[type="button"],  input[type="submit"], etc.
        var selector = [
            'textarea',
            'input[type="text"]',
            'input[type="password"]',
            'input[type="datetime"]',
            'input[type="datetime-local"]',
            'input[type="date"]',
            'input[type="month"]',
            'input[type="time"]',
            'input[type="week"]',
            'input[type="number"]',
            'input[type="email"]',
            'input[type="url"]',
            'input[type="search"]',
            'input[type="tel"]',
            'input[type="color"]',
            'select'
        ].join(',');
        
        $(document).on('focus', selector, function () {
            $('html').addClass('input-focused');
        }).on('focusout', selector, function () {
            $('html').removeClass('input-focused');
        });
    }
});