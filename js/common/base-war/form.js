define(["jquery", "bootstrap"], function ($) {
    
    $(document).off(".base-form").on("click.base-form", "button[type='reset']", function (e) {
        var $form = $(this).closest("form")
          , $allInputs = $form.find(":input")
          , $inputs = $allInputs.filter("input")
          , $selects = $allInputs.filter("select");

        e.preventDefault();
        
        $form.trigger("clear.jnet");

        $inputs.val("");
        $selects.prop("selectedIndex", 0);
        
        if ($.fn.inputmask) {
            // inputmask plugin bug: setting empty val doesn't remove partially-filled value; this is the workaround.
            $form.find('input[data-inputmask]').inputmask('destroy').val('').inputmask();
        }

        $inputs.first().select();
    });
    
});