(function($) {

    // FUNCTIONS LIST    


    function winPosTop() {
        $(window).scrollTop(0);
    }

    function reveal() {
        var animOffset = $(window).innerHeight() * 0.2;
        var wow = new WOW({

            boxClass: 'anim', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: animOffset, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true, // act on asynchronously loaded content (default is true)
            callback: function(box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null // optional scroll container selector, otherwise use window
        });
        wow.init();
    }





    function workScrollDown() {
        var workTitle = $('h1.title');
        var navHeight = $('.site-header').innerHeight();

        $('.scroll-down').click(function(event) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $(workTitle).offset().top - navHeight - 20
            }, 600);


        });

        $(window).scroll(function() {
            var winScroll = $(window).scrollTop();
            var workTitle = $('h1.title');
            var navHeight = $('.site-header').innerHeight();
            if (winScroll >= $(workTitle).offset().top - navHeight - 22) {
                $('.scroll-down').addClass('hidden');
            } else {
                $('.scroll-down').removeClass('hidden');
            }
        }).scroll();
    }


    // DOCUMENT READY 
    function smooth() {
        'use strict';
        var settings = {
            prefetch: false,
            cacheLength: 0,
            debug: true,
            loadingClass: 'is-loading',




            onStart: {
                duration: 400, // ms
                render: function($container) {
                    $container.addClass('page-out');
                    // Pace.start();

                }
            },
            onReady: {
                duration: 500,
                render: function($container, $newContent) {
                    $container.removeClass('page-out');
                    $container.html($newContent);

                    winPosTop();
                    workScrollDown();
                    reveal()
                    // ScrollTrigger.init();


                }
            }

        };



        $('#site').smoothState(settings);



    }

    $(document).ready(function() {
        smooth();

        workScrollDown();
        reveal()
        // ScrollTrigger.init();

    });



    // WINDOW LOAD 

    $(window).load(function() {
        // ScrollTrigger.init();


        // headerFill();
        // sliderSize();

    });

    $(window).scroll(function() {

        // headerFill();

    });

    $(window).resize(function() {
        // sliderSize();
    });

})(jQuery);
