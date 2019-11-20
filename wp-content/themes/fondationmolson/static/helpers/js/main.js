"use strict";
var lastScroll = 0;

//check for browser os
var isMobile = false;
var isiPhoneiPad = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}

if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    isiPhoneiPad = true;
}

function SetMegamenuPosition() {
    if ($(window).width() > 991) {
        setTimeout(function () {
            var totalHeight = $('nav.navbar').outerHeight();
            $('.mega-menu').css({ top: totalHeight });
            if ($('.navbar-brand-top').length === 0)
                $('.dropdown.simple-dropdown > .dropdown-menu').css({ top: totalHeight });
        }, 200);
    } else {
        $('.mega-menu').css('top', '');
        $('.dropdown.simple-dropdown > .dropdown-menu').css('top', '');
    }
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        return true;
    } else  // If another browser, return 0
    {
        return false;
    }
}

//page title space
function setPageTitleSpace() {
    if ($('.navbar').hasClass('navbar-top') || $('nav').hasClass('navbar-fixed-top')) {
        if ($('.top-space').length > 0) {
            var top_space_height = $('.navbar').outerHeight();
            if ($('.top-header-area').length > 0) {
                top_space_height = top_space_height + $('.top-header-area').outerHeight();
            }
            $('.top-space').css('margin-top', top_space_height + "px");
        }
    }
}

//swiper button position in auto height slider
function setButtonPosition() {
    if ($(window).width() > 767 && $(".swiper-auto-height-container").length > 0) {
        var leftPosition = parseInt($('.swiper-auto-height-container .swiper-slide').css('padding-left'));
        var bottomPosition = parseInt($('.swiper-auto-height-container .swiper-slide').css('padding-bottom'));
        var bannerWidth = parseInt($('.swiper-auto-height-container .slide-banner').outerWidth());
        $('.navigation-area').css({ 'left': bannerWidth + leftPosition + 'px', 'bottom': bottomPosition + 'px' });
    } else if ($(".swiper-auto-height-container").length > 0) {
        $('.navigation-area').css({ 'left': '', 'bottom': '' });
    }
}

$(window).on("scroll", init_scroll_navigate);
function init_scroll_navigate() {
    /*==============================================================
    One Page Main JS - START CODE
    =============================================================*/
    var menu_links = $(".navbar-nav li a");
    var scrollPos = $(document).scrollTop();
    menu_links.each(function () {
        var currLink = $(this);
        if (currLink.attr("href").indexOf("#") > -1 && $(currLink.attr("href")).length > 0) {
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                menu_links.removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        }
    });
    /*==============================================================
    One Page Main JS - END CODE
    =============================================================*/

    /*==============================================================*/
    //background color slider Start
    /*==============================================================*/
    var $window = $(window),
            $body = $('.bg-background-fade'),
            $panel = $('.color-code');
    var scroll = $window.scrollTop() + ($window.height() / 2);
    $panel.each(function () {
        var $this = $(this);
        if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
            $body.removeClass(function (index, css) {
                return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
            });
            $body.addClass('color-' + $(this).data('color'));
        }
    });
    /*==============================================================*/
    //background color slider End
    /*==============================================================*/

    /* ===================================
    sticky nav Start
    ====================================== */
    var headerHeight = $('nav').outerHeight();
    if (!$('header').hasClass('no-sticky')) {
        if ($(document).scrollTop() >= headerHeight) {
            $('header').addClass('sticky');

        } else if ($(document).scrollTop() <= headerHeight) {
            $('header').removeClass('sticky');
            setTimeout(function () {
                setPageTitleSpace();
            }, 500);
        }
        SetMegamenuPosition();
    }

    /* ===================================
    header appear on scroll up
    ====================================== */
    // var st = $(this).scrollTop();
    // if (st > lastScroll) {
    //     $('.sticky').removeClass('header-appear');
    //     // $('.dropdown.on').removeClass('on').removeClass('open').find('.dropdown-menu').fadeOut(100);
    // } else
    //     // $('.sticky').addClass('header-appear');
    // lastScroll = st;
    // if (lastScroll <= headerHeight)
    //     $('header').removeClass('header-appear');
    /* ===================================
    sticky nav End
    ====================================== */
}

/*==============================================================
equalize - START CODE
==============================================================*/
function equalizeHeight() {
    $(document).imagesLoaded(function () {
        if ($(window).width() < 768) {
            $('.equalize').equalize({ equalize: 'outerHeight', reset: true });
            $('.equalize.md-equalize-auto').children().css("height", "");
            $('.equalize.sm-equalize-auto').children().css("height", "");
            $('.equalize.xs-equalize-auto').children().css("height", "");
            return false;
        } else if ($(window).width() < 992) {
            $('.equalize').equalize({ equalize: 'outerHeight', reset: true });
            $('.equalize.md-equalize-auto').children().css("height", "");
            $('.equalize.sm-equalize-auto').children().css("height", "");
            return false;
        } else if ($(window).width() < 1199) {
            $('.equalize').equalize({ equalize: 'outerHeight', reset: true });
            $('.equalize.md-equalize-auto').children().css("height", "");
            return false;
        } else {
            $('.equalize').equalize({ equalize: 'outerHeight', reset: true });
        }
    });
}
/*==============================================================
equalize - END CODE
==============================================================*/

/*==============================================================
dynamic font size START CODE
==============================================================*/
function feature_dynamic_font_line_height() {
    if ($('.dynamic-font-size').length > 0) {
        var site_width = 1100;
        var window_width = $(window).width();
        if (window_width < site_width) {
            var window_site_width_ratio = window_width / site_width;
            $('.dynamic-font-size').each(function () {
                var font_size = $(this).attr('data-fontsize');
                var line_height = $(this).attr('data-lineheight');
                if (font_size != '' && font_size != undefined) {
                    var new_font_size = Math.round(font_size * window_site_width_ratio * 1000) / 1000;
                    $(this).css('font-size', new_font_size + 'px');
                }
                if (line_height !== '' && line_height !== undefined) {
                    var new_line_height = Math.round(line_height * window_site_width_ratio * 1000) / 1000;
                    $(this).css('line-height', new_line_height + 'px');
                }
            });
        } else {
            $('.dynamic-font-size').each(function () {
                var font_size = $(this).attr('data-fontsize');
                var line_height = $(this).attr('data-lineheight');
                if (font_size !== '' && font_size !== undefined) {
                    $(this).css('font-size', font_size + 'px');
                }
                if (line_height !== '' && line_height !== undefined) {
                    $(this).css('line-height', line_height + 'px');
                }
            });
        }
    }
}
/*==============================================================
dynamic font size END CODE
==============================================================*/

/*==============================================================
set parallax
==============================================================*/
function stellarParallax() {
    if ($(window).width() > 1024) {
        $.stellar();
    } else {
        $.stellar('destroy');
        $('.parallax').css('background-position', '');
    }
}

/*==============================================================
full screen START CODE
==============================================================*/
function fullScreenHeight() {
    var element = $(".full-screen");
    var $minheight = $(window).height();
    element.parents('section').imagesLoaded(function () {
        if ($(".top-space .full-screen").length > 0) {
            var $headerheight = $("header nav.navbar").outerHeight();
            $(".top-space .full-screen").css('min-height', $minheight - $headerheight);
        } else {
            element.css('min-height', $minheight);
        }
    });

    var minwidth = $(window).width();
    $(".full-screen-width").css('min-width', minwidth);
    var sidebarNavHeight = $('.sidebar-nav-style-1').height() - $('.logo-holder').parent().height() - $('.footer-holder').parent().height() - 10;
    $(".sidebar-nav-style-1 .nav").css('height', (sidebarNavHeight));
    var style2NavHeight = parseInt($('.sidebar-part2').height() - parseInt($('.sidebar-part2 .sidebar-middle').css('padding-top')) - parseInt($('.sidebar-part2 .sidebar-middle').css('padding-bottom')) - parseInt($(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css('margin-bottom')));
    $(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css('height', (style2NavHeight));


}
/*==============================================================
full screen END CODE
==============================================================*/
function SetResizeContent() {
    //    all function call
    feature_dynamic_font_line_height();
    SetMegamenuPosition();
    setPageTitleSpace();
    setButtonPosition();
    fullScreenHeight();
    equalizeHeight();
}

/* ===================================
START RESIZE
====================================== */
$(window).resize(function (event) {
    // Bootsnav menu work with eualize height
    $("nav.navbar.bootsnav ul.nav").each(function () {
        $("li.dropdown", this).on("mouseenter", function (e) {
            if ($(window).width() > 991) {
                $(this).find('.equalize').equalize({ equalize: 'outerHeight', reset: true });
                return false;
            }
        });
    });

    setTimeout(function () {
        SetResizeContent();
    }, 500);

    event.preventDefault();
});
/* ===================================
END RESIZE
====================================== */

/* ===================================
START READY
====================================== */
$(document).ready(function () {
    "use strict";
    // Bootsnav menu work with eualize height
    $("nav.navbar.bootsnav ul.nav").each(function () {
        $("li.dropdown", this).on("mouseenter", function () {
            if ($(window).width() > 991) {
                $(this).find('.equalize').equalize({ equalize: 'outerHeight', reset: true });
                return false;
            }
        });
    });
    // Bootsnav tab work with eualize height
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href");
        if ($(window).width() > 991) {
            $(target).find('.equalize').equalize({ equalize: 'outerHeight', reset: true });
            return false;
        }
    });

    // Active class to current menu for only html
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
    var $hash = window.location.hash.substring(1);

    if ($hash) {
        $hash = "#" + $hash;
        pgurl = pgurl.replace($hash, "");
    } else {
        pgurl = pgurl.replace("#", "");
    }

    $(".nav li a").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == pgurl + '.html') {
            $(this).parent().addClass("active");
            $(this).parents('li.dropdown').addClass("active");
        }
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150)
            $('.scroll-top-arrow').fadeIn('slow');
        else
            $('.scroll-top-arrow').fadeOut('slow');
    });
    //Click event to scroll to top
    $(document).on('click', '.scroll-top-arrow', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    /* ===================================
    swiper slider
    ====================================== */
    var swiperClients = new Swiper('.swiper-slider-clients', {
        loop: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 3,
        autoplay: 5000,
        breakpoints: {
            480: {
                slidesPerView: 1
            },
            650: {
                slidesPerView: 3
            },
            850: {
                slidesPerView: 3
            }
        }
    });

    //swiper resize for IE
    if (isIE()) {
        setTimeout(function () {
            $(document).imagesLoaded(function () {
                if ($(".swiper-full-screen").length > 0)
                    swiperFull.onResize()
                if ($(".swiper-auto-fade").length > 0)
                    swiperAutoFade.onResize()
                if ($(".swiper-number-pagination").length > 0)
                    swiperNumber.onResize()
                if ($(".swiper-slider-schedules").length > 0)
                    swiperSchedules.onResize()
                if ($(".swiper-slider-second").length > 0)
                    swiperSecond.onResize()
                if ($(".swiper-slider-third").length > 0)
                    swiperThird.onResize()
                if ($(".swiper-three-slides").length > 0)
                    swiperThreeSlides.onResize()
                if ($(".swiper-four-slides").length > 0)
                    swiperFourSlides.onResize()
                if ($(".swiper-vertical-pagination").length > 0)
                    swiperVerticalPagination.onResize()
                if ($(".swiper-auto-height-container").length > 0)
                    swiperAutoHieght.onResize()
                if ($(".swiper-multy-row-container").length > 0)
                    swiperMultyRow.onResize()
                if ($(".swiper-multy-row-container-nes").length > 0)
                    swiperMultyRowNews.onResize()
                if ($(".swiper-blog").length > 0)
                    swiperBlog.onResize()
                if ($(".swiper-swiperPresentation").length > 0)
                    swiperPresentation.onResize()
                if ($(".swiper-demo-header-style").length > 0)
                    swiperDemoHeaderStyle.onResize()
            });
        }, 300);
    }

    $(window).resize(function () {
        setTimeout(function () {
            if ($(".swiper-full-screen").length > 0)
                swiperFull.onResize()
            if ($(".swiper-auto-fade").length > 0)
                swiperAutoFade.onResize()
            if ($(".swiper-number-pagination").length > 0)
                swiperNumber.onResize()
            if ($(".swiper-slider-schedules").length > 0)
                swiperSchedules.onResize()
            if ($(".swiper-slider-second").length > 0)
                swiperSecond.onResize()
            if ($(".swiper-slider-third").length > 0)
                swiperThird.onResize()
            if ($(".swiper-three-slides").length > 0)
                swiperThreeSlides.onResize()
            if ($(".swiper-four-slides").length > 0)
                swiperFourSlides.onResize()
            if ($(".swiper-vertical-pagination").length > 0)
                swiperVerticalPagination.onResize()
            if ($(".swiper-auto-height-container").length > 0)
                swiperAutoHieght.onResize()
            if ($(".swiper-multy-row-container").length > 0)
                swiperMultyRow.onResize()
            if ($(".swiper-multy-row-container-news").length > 0)
                swiperMultyRowNews.onResize()
            if ($(".swiper-blog").length > 0)
                swiperBlog.onResize()
            if ($(".swiper-swiperPresentation").length > 0)
                swiperPresentation.onResize()
            if ($(".swiper-demo-header-style").length > 0)
                swiperDemoHeaderStyle.onResize()
        }, 500);

        setTimeout(function () {
            //destroy swiper
            var window_width = $(window).width();
            if (window_width < 768) {
                if ($(".swiper-bottom-scrollbar-full").length > 0) {
                    if (swiperMultipurpose) {
                        swiperMultipurpose.detachEvents();
                        swiperMultipurpose.destroy(true, true);
                        swiperMultipurpose = undefined;
                    }

                    swiperMultipurpose = new Swiper('.swiper-bottom-scrollbar-full', {
                        scrollbar: '.swiper-scrollbar',
                        scrollbarHide: false,
                        scrollbarDraggable: true,
                        slidesPerView: 'auto',
                        scrollbarSnapOnRelease: true,
                        grabCursor: true,
                        preventClicks: false,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        mousewheelControl: true,
                        spaceBetween: 30,
                        keyboardControl: true,
                        speed: 1000,
                        breakpoints: {
                            767: {
                                direction: 'vertical',
                                //slidesPerView: 1,
                                scrollbarHide: true,
                                spaceBetween: 0,
                                pagination: false,
                                autoHeight: true
                            }
                        }
                    });
                }
            } else {
                if ($(".swiper-bottom-scrollbar-full").length > 0) {
                    if (swiperMultipurpose) {
                        swiperMultipurpose.detachEvents();
                        swiperMultipurpose.destroy(true, true);
                        swiperMultipurpose = undefined;
                    }
                    swiperMultipurpose = new Swiper('.swiper-bottom-scrollbar-full', {
                        scrollbar: '.swiper-scrollbar',
                        scrollbarHide: false,
                        scrollbarDraggable: true,
                        slidesPerView: 'auto',
                        scrollbarSnapOnRelease: true,
                        grabCursor: true,
                        preventClicks: false,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        mousewheelControl: true,
                        spaceBetween: 30,
                        keyboardControl: true,
                        speed: 1000
                    });
                }
            }
        }, 500);

        if ($(".swiper-auto-width").length > 0 && swiperAutoSlide) {
            swiperAutoSlide.detachEvents();
            swiperAutoSlide.destroy(true);
            swiperAutoSlide = undefined;
            $(".swiper-auto-width .swiper-wrapper").css("transform", "").css("transition-duration", "");
            $(".swiper-auto-width .swiper-slide").css("margin-right", "");

            setTimeout(function () {
                swiperAutoSlide = new Swiper('.swiper-auto-width', {
                    scrollbar: '.swiper-scrollbar',
                    scrollbarHide: false,
                    scrollbarDraggable: true,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 80,
                    preventClicks: false,
                    scrollbarSnapOnRelease: true,
                    nextButton: '.swiper-next-style2',
                    prevButton: '.swiper-prev-style2',
                    mousewheelControl: true,
                    speed: 1000,
                    keyboardControl: true,
                    breakpoints: {
                        1199: {
                            spaceBetween: 60
                        },
                        960: {
                            spaceBetween: 30
                        },
                        767: {
                            spaceBetween: 15
                        }
                    },
                    onSlideChangeEnd: function (swiper) {
                        swiperAutoSlideIndex = swiper.activeIndex;
                    }
                });

                swiperAutoSlide.slideTo(swiperAutoSlideIndex, 1000, false);
            }, 1000);
        }
    });

    /*==============================================================
    smooth scroll
    ==============================================================*/

    var scrollAnimationTime = 1200, scrollAnimation = 'easeInOutExpo';
    $(document).on('click.smoothscroll', 'a.scrollto', function (event) {
        event.preventDefault();
        var target = this.hash;
        if ($(target).length != 0) {
            $('html, body').stop()
                    .animate({
                        'scrollTop': $(target)
                                .offset()
                                .top
                    }, scrollAnimationTime, scrollAnimation, function () {
                        window.location.hash = target;
                    });
        }
    });

    /*==============================================================
    humburger menu one page navigation
    ==============================================================*/

    if ($('.full-width-pull-menu').length > 0) {
        $(document).on('click', '.full-width-pull-menu .inner-link', function (e) {
            //$('body').removeClass('overflow-hidden position-fixed');
            $(".full-width-pull-menu .close-button-menu").trigger("click");
            var _this = $(this);
            setTimeout(function () {
                var target = _this.attr("href");
                if ($(target).length > 0) {
                    $('html, body').stop()
                    .animate({
                        'scrollTop': $(target).offset().top
                    });
                }
            }, 500);
        });
    }

    // Inner links
    if ($('.navbar-top').length > 0 || $('.navbar-scroll-top').length > 0 || $('.nav-top-scroll').length > 0) {
        $('.inner-link').smoothScroll({
            speed: 900,
            offset: 0
        });
    } else {
        $('.inner-link').smoothScroll({
            speed: 900,
            offset: -59
        });
    }

    $('.section-link').smoothScroll({
        speed: 900,
        offset: 1
    });

    /*==============================================================*/
    //PieChart For Onepage - START CODE
    /*==============================================================*/
    if ($('.chart1').length > 0) {
        $('.chart1').appear();
        $('.chart1').easyPieChart({
            barColor: '#929292',
            trackColor: '#d9d9d9',
            scaleColor: false,
            easing: 'easeOutBounce',
            scaleLength: 1,
            lineCap: 'round',
            lineWidth: 3, //12
            size: 150, //110
            animate: {
                duration: 2000,
                enabled: true
            },
            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        $(document.body).on('appear', '.chart1', function (e) {
            // this code is executed for each appeared element
            if (!$(this).hasClass('appear')) {
                $(this).addClass('appear');
                $(this).data('easyPieChart').update(0).update($(this).data('percent'));
            }
        });
    }

    if ($('.chart2').length > 0) {
        $('.chart2').appear();
        $('.chart2').easyPieChart({
            easing: 'easeOutCirc',
            barColor: '#ff214f',
            trackColor: '#c7c7c7',
            scaleColor: false,
            scaleLength: 1,
            lineCap: 'round',
            lineWidth: 2, //12
            size: 120, //110
            animate: {
                duration: 2000,
                enabled: true
            },
            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        $(document.body).on('appear', '.chart2', function (e) {
            // this code is executed for each appeared element
            if (!$(this).hasClass('appear')) {
                $(this).addClass('appear');
                $(this).data('easyPieChart').update(0).update($(this).data('percent'));
            }
        });
    }

    if ($('.chart3').length > 0) {
        $('.chart3').appear();
        $('.chart3').easyPieChart({
            easing: 'easeOutCirc',
            barColor: '#ff214f',
            trackColor: '',
            scaleColor: false,
            scaleLength: 1,
            lineCap: 'round',
            lineWidth: 3, //12
            size: 140, //110
            animate: {
                duration: 2000,
                enabled: true
            },
            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        $(document.body).on('appear', '.chart3', function (e) {
            // this code is executed for each appeared element
            if (!$(this).hasClass('appear')) {
                $(this).addClass('appear');
                $(this).data('easyPieChart').update(0).update($(this).data('percent'));
            }
        });
    }
    /*==============================================================*/
    //PieChart For Onepage - END CODE
    /*==============================================================*/

    /*==============================================================
    portfolio filter
    ==============================================================*/
    var $portfolio_filter = $('.portfolio-grid');
    $portfolio_filter.imagesLoaded(function () {
        $portfolio_filter.isotope({
            layoutMode: 'masonry',
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
        $portfolio_filter.isotope();
    });
    var $grid_selectors = $('.portfolio-filter > li > a');
    $grid_selectors.on('click', function () {
        $grid_selectors.parent().removeClass('active');
        $(this).parent().addClass('active');
        var selector = $(this).attr('data-filter');
        $portfolio_filter.find('.grid-item').removeClass('animated').css("visibility", ""); // avoid problem to filter after sorting
        $portfolio_filter.find('.grid-item').each(function () {
            /* remove perticular element from WOW array when you don't want animation on element after DOM lead */
            wow.removeBox(this);
            $(this).css("-webkit-animation", "none");
            $(this).css("-moz-animation", "none");
            $(this).css("-ms-animation", "none");
            $(this).css("animation", "none");
        });
        $portfolio_filter.isotope({ filter: selector });
        return false;
    });
    $(window).resize(function () {
        if (!isMobile && !isiPhoneiPad) {
            setTimeout(function () {
                $portfolio_filter.find('.grid-item').removeClass('wow').removeClass('animated'); // avoid problem to filter after window resize
                $portfolio_filter.isotope('layout');
            }, 300);
        }
    });
    var $blog_filter = $('.blog-grid');
    $blog_filter.imagesLoaded(function () {
        $blog_filter.isotope({
            layoutMode: 'masonry',
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
    });
    $(window).resize(function () {
        setTimeout(function () {
            $blog_filter.find('.grid-item').removeClass('wow').removeClass('animated'); // avoid problem to filter after window resize
            $blog_filter.isotope('layout');
        }, 300);
    });

    /*==============================================================
    mega menu width
    ===============================================================*/
    $("ul.mega-menu-full").each(function (idx, elm) {
        var megaMenuWidth = 0;
        $(this).children('li').each(function (idx, elm) {
            var LIheight = 0;
            console.log($(this).outerWidth());
            megaMenuWidth += $(this).outerWidth();
        });
        $(this).width(megaMenuWidth + 95);
        megaMenuWidth = 0;
    });

    /* ===================================
    left nav
    ====================================== */
    $(document).on('click', '.right-menu-button', function (e) {
        $('body').toggleClass('left-nav-on');
    });
    /*==============================================================*/
    //    hamburger menu
    /*==============================================================*/
    $(document).on('click', '.btn-hamburger', function () {
        $('.hamburger-menu').toggleClass('show-menu');
        $('body').removeClass('show-menu');
    });
    /*==============================================================*/
    //sidebar nav open
    /*==============================================================*/
    $(document).on('click', '#mobileToggleSidenav', function () {
        $(this).closest('nav').toggleClass('sidemenu-open');
    });


    $('.atr-nav').on("click", function () {
        $(".atr-div").append("<a class='close-cross' href='#'>X</a>");
        $(".atr-div").animate({
            width: "toggle"
        });
    });

    $('.close-cross').on("click", function () {
        $(".atr-div").hide();
    });

    var menuRight = document.getElementById('cbp-spmenu-s2'),
            showRightPush = document.getElementById('showRightPush'),
            body = document.body;
    if (showRightPush) {
        showRightPush.onclick = function () {
            classie.toggle(this, 'active');
            if (menuRight)
                classie.toggle(menuRight, 'cbp-spmenu-open');
        };
    }

    var test = document.getElementById('close-pushmenu');
    if (test) {
        test.onclick = function () {
            classie.toggle(this, 'active');
            if (menuRight)
                classie.toggle(menuRight, 'cbp-spmenu-open');
        };
    }

    /*==============================================================*/
    //big menu open close start
    /*==============================================================*/
    $('.big-menu-open').on("click", function () {
        $('.big-menu-right').addClass("open");
    });
    $('.big-menu-close').on("click", function () {
        $('.big-menu-right').removeClass("open");
    });
    /*==============================================================*/
    //big menu open close end
    /*==============================================================*/

    $(document).on("click", '.navbar .navbar-collapse a.dropdown-toggle, .accordion-style1 .panel-heading a, .accordion-style2 .panel-heading a, .accordion-style3 .panel-heading a, .toggles .panel-heading a, .toggles-style2 .panel-heading a, .toggles-style3 .panel-heading a, a.carousel-control, .nav-tabs a[data-toggle="tab"], a.shopping-cart', function (e) {
        e.preventDefault();
    });

    $('body').on('touchstart click', function (e) {
        if ($(window).width() < 992) {
            if (!$('.navbar-collapse').has(e.target).is('.navbar-collapse') && $('.navbar-collapse').hasClass('in') && !$(e.target).hasClass('navbar-toggle')) {
                $('.navbar-collapse').collapse('hide');
            }
        } else {
            if (!$('.navbar-collapse').has(e.target).is('.navbar-collapse') && $('.navbar-collapse ul').hasClass('in')) {
                console.log(this);
                $('.navbar-collapse').find('a.dropdown-toggle').addClass('collapsed');
                $('.navbar-collapse').find('ul.dropdown-menu').removeClass('in');
                $('.navbar-collapse a.dropdown-toggle').removeClass('active');
            }
        }
    });

    $('.navbar-collapse a.dropdown-toggle').on('touchstart', function (e) {
        $('.navbar-collapse a.dropdown-toggle').not(this).removeClass('active');
        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');
    });

    $('button.navbar-toggle').on("click", function (e) {
        if (isMobile) {
            $(".cart-content").css('opacity', '0');
            $(".cart-content").css('visibility', 'hidden');
        }
    });

    $('a.dropdown-toggle').on("click", function (e) {
        if (isMobile) {
            $(".cart-content").css('opacity', '0');
            $(".cart-content").css('visibility', 'hidden');
        }
    });

    $(document).on('click', '.navbar-collapse [data-toggle="dropdown"]', function (event) {

        var $innerLinkLI = $(this).parents('ul.navbar-nav').find('li.dropdown a.inner-link').parent('li.dropdown');
        if (!$(this).hasClass('inner-link') && $innerLinkLI.hasClass('open')) {
            $innerLinkLI.removeClass('open');
        }
        var target = $(this).attr('target');
        if ($(window).width() <= 991 && $(this).attr('href') && $(this).attr('href').indexOf("#") <= -1 && !$(event.target).is('i')) {
            if (event.ctrlKey || event.metaKey) {
                window.open($(this).attr('href'), "_blank");
                return false;
            } else if (!target)
                window.location = $(this).attr('href');
            else
                window.open($(this).attr('href'), target);

        } else if ($(window).width() > 991 && $(this).attr('href').indexOf("#") <= -1) {
            if (event.ctrlKey || event.metaKey) {
                window.open($(this).attr('href'), "_blank");
                return false;
            } else if (!target)
                window.location = $(this).attr('href');
            else
                window.open($(this).attr('href'), target);

        } else if ($(window).width() <= 991 && $(this).attr('href') && $(this).attr('href').length > 1 && $(this).attr('href').indexOf("#") >= 0 && $(this).hasClass('inner-link')) {
            $(this).parents('ul.navbar-nav').find('li.dropdown').not($(this).parent('.dropdown')).removeClass('open');
            if ($(this).parent('.dropdown').hasClass('open')) {
                $(this).parent('.dropdown').removeClass('open');
            } else {
                $(this).parent('.dropdown').addClass('open');
            }
            $(this).toggleClass('active');
        }
    });

    /* ===================================
    touchstart click
    ====================================== */
    $('body').on('touchstart click', function (e) {
        if ($(window).width() < 992) {
        }
    });
    /*==============================================================*/
    //Set Resize Header Menu - START CODE
    /*==============================================================*/
    $('nav.full-width-pull-menu ul.panel-group li.dropdown a.dropdown-toggle').on("click", function (e) {
        if ($(this).parent('li').find('ul.dropdown-menu').length > 0) {
            if ($(this).parent('li').hasClass('open')) {
                $(this).parent('li').removeClass('open');
            } else {
                $(this).parent('li').addClass('open');
            }
        }
    });
    /*==============================================================*/
    //accordion  - START CODE
    /*==============================================================*/
    $('.accordion-style1 .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="ti-minus"></i>');
    });

    $('.accordion-style1 .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="ti-plus"></i>');
    });

    $('.nav.navbar-nav a.inner-link').on("click", function (e) {
        $(this).parents('ul.navbar-nav').find('a.inner-link').removeClass('active');
        var $this = $(this);
        if ($('.nav-header-container .navbar-toggle').is(':visible'))
            $(this).parents('.navbar-collapse').collapse('hide');
        setTimeout(function () {
            $this.addClass('active');
        }, 1000);

    });

    $('.accordion-style2 .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title').find('i').addClass('fa-angle-up').removeClass('fa-angle-down');
    });

    $('.accordion-style2 .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    });

    $('.accordion-style3 .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title').find('i').addClass('fa-angle-up').removeClass('fa-angle-down');
    });

    $('.accordion-style3 .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    });
    /*==============================================================*/
    //accordion - END CODE
    /*==============================================================*/

    /*==============================================================*/
    //toggles  - START CODE
    /*==============================================================*/
    $('.toggles .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="ti-minus"></i>');
    });

    $('.toggles .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="ti-plus"></i>');
    });

    $('.toggles-style2 .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="fa fa-angle-up"></i>');
    });

    $('.toggles-style2 .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="fa fa-angle-down"></i>');
    });
    /*==============================================================*/
    //toggles  - END CODE
    /*==============================================================*/


    /* ===================================
    blog hover box
    ====================================== */
    $(document).on("mouseenter", ".blog-post-style4 .grid-item", function (e) {
        $(this).find("figcaption .blog-hover-text").slideDown(300);
    });
    $(document).on("mouseleave", ".blog-post-style4 .grid-item", function (e) {
        $(this).find("figcaption .blog-hover-text").slideUp(300);
    });
    /* ===================================
    End blog hover box
    ====================================== */
    SetResizeContent();

    var $allNonRatinaImages = $("img:not([data-at2x])");
    $allNonRatinaImages.attr('data-no-retina', '');

    /*==============================================================*/
    //demo button  - START CODE
    /*==============================================================*/

//    var $buythemediv = '<div class="buy-theme alt-font sm-display-none"><a href="https://themeforest.net/item/pofo-creative-agency-corporate-and-portfolio-multipurpose-template/20645944?ref=themezaa" target="_blank"><i class="ti-shopping-cart"></i><span>Buy Theme</span></a></div><div class="all-demo alt-font sm-display-none"><a href="mailto:info@themezaa.com?subject=POFO – Creative Agency, Corporate and Portfolio Multi-purpose Template - Quick Question"><i class="ti-email"></i><span>Quick Question?</span></a></div>';
//    $('body').append($buythemediv);

    /*==============================================================*/
    //demo button  - END CODE
    /*==============================================================*/

});
/* ===================================
END READY
====================================== */


/* ===================================
START Page Load
====================================== */
$(window).load(function () {
    var hash = window.location.hash.substr(1);
    if (hash != "") {
        setTimeout(function () {
            $(window).imagesLoaded(function () {
                var scrollAnimationTime = 1200,
                        scrollAnimation = 'easeInOutExpo';
                var target = '#' + hash;
                if ($(target).length > 0) {

                    $('html, body').stop()
                            .animate({
                                'scrollTop': $(target).offset().top
                            }, scrollAnimationTime, scrollAnimation, function () {
                                window.location.hash = target;
                            });
                }
            });
        }, 500);
    }
});
/* ===================================
END Page Load
====================================== */
