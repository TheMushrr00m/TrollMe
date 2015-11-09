$(document).ready(function(){
    $("section[data-type='parallax_section']").each(function(){
        var $bgobj = $(this);
        $(window).scroll(function(){
            $window = $(window);
            var yPos = -($windows.scrollTop() / $bgobj.data('speed'));
            var coords = '50% ' + yPos + 'px';
            $bgobj.css({
                backgroundPosition: coords
            });
        });
    });
});