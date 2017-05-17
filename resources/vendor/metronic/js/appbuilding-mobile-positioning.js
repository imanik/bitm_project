
function handleMobileOnScroll() {
    var start = 200;
    var end = $(".copyright").position().top - 680;
    if ($(".frame-holder").length && $(".page-content").height() > 680 ) {
        if ($(window).scrollTop() > start && $(window).scrollTop() < end) {
            $(".frame-holder").addClass("page-on-scroll");
            if ($(".frame-holder").hasClass("bottom")) {
                $(".frame-holder").removeClass("bottom");
            }
        } else if ($(window).scrollTop() >= end) {
            if ($(".frame-holder").hasClass("page-on-scroll")) {
                $(".frame-holder").removeClass("page-on-scroll");
            }
            $(".frame-holder").addClass("bottom");
            $(".frame-holder.bottom").css({"top": (end- 200)+"px"});
        } else {
            $(".frame-holder").removeClass("page-on-scroll");
            $(".frame-holder").removeClass("bottom");
            $(".frame-holder").css({"top": "0px"});
        }
    }
}
function mobileScroll(){
    $(window).scroll(function () {
        handleMobileOnScroll();
    });
    jQuery(document).ready(function () {
        handleMobileOnScroll();
    });
}
