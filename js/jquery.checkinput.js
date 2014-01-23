/*
* JQuery checking input and validation module
* Required jQuery includes library
* created by Irbis (Daniel)
* */
(function($){
    jQuery.fn.checkinput = function() {
        var pattern = /[^a-zA-Z\u0430-\u044f\u0410-\u042f\u0451\u0401\u0439\u0419Z0-9\-_+\s]/g;
      $(this).keydown(function(){
          $(this).val($(this).val().replace(pattern,''));
      })
    };
})(jQuery);