(function($) {

    "use strict";


    // Preloder
    $(window).on('load', function() {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({'overflow':'visible'});
    });

    // Bootstrap tab Slider
    $('.my-product-carousel').carousel({
        pause: true,
        interval: false
    });
    if($(window).innerWidth() > 767) {
        var nav = $('.navbar');
        $(window).scroll(function () {
            if ($(this).scrollTop() > 80) {
                nav.addClass("fixed-header");
            } else {
                nav.removeClass("fixed-header");
            }
        });
    }


    // Header Nav
    $(document).ready(function() {
        $('#nav-expander').on('click', function(e) {
            e.preventDefault();
            $('body').toggleClass('nav-expanded');
        });
        $('#nav-close').on('click', function(e) {
            e.preventDefault();
            $('body').removeClass('nav-expanded');
        });
    });

    $(document).ready(function(){
        var dropDown = $('li.dropdown');

        //Show dropdown on hover only for desktop devices
        if($(window).innerWidth() > 767){
            dropDown.on({
                mouseenter: function () {
                    dropDown.clearQueue();
                    $(this).find('.dropdown-menu').addClass('show');
                },
                mouseleave: function () {
                    $(this).find('.dropdown-menu').removeClass('show');
                }
            });
        }
        //Show dropdown on click only for mobile devices
        if($(window).innerWidth() < 768) {
            dropDown.on('click', function(event){
                //$(this).find('.dropdown-menu').slideToggle();
                // Avoid following the href location when clicking
                // event.preventDefault();

                // Avoid having the menu to close when clicking
                event.stopPropagation();

                // close all the siblings
                $(this).siblings().removeClass('show');
                $(this).siblings().find('.dropdown-menu').removeClass('show');

                // close all the submenus of siblings
                $(this).siblings().find('.dropdown-menu').parent().removeClass('show');

                // opening the one you clicked on
                $(this).find('.dropdown-menu').toggleClass('show');
                $(this).siblings('.dropdown-menu').toggleClass('show');
            });
        }
    });



    // Bootstrap Slider Caption Animation
    //Function to animate slider captions 
    function doAnimations( elems ) {
        //Cache the animationend event in a variable
        var animEndEv = 'webkitAnimationEnd animationend';

        elems.each(function () {
            var $this = $(this),
                $animationType = $this.data('animation');
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    }

    //Variables on page load
    var $myCarousel = $('#carousel-example-generic'),
        $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");

    //Initialize carousel
    $myCarousel.carousel({
        interval: 5000
    });

    //Animate captions in first slide on page load
    doAnimations($firstAnimatingElems);

    //Other slides to be animated on carousel slide event
    $myCarousel.on('slide.bs.carousel', function (e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        doAnimations($animatingElems);
    });

    $myCarousel.on('mouseover', function (e) {
        $myCarousel.carousel();
    });


    // Scroll To Top
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 150) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });
    $('.scrollup').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1500);
        return false;
    });


    // CounterUp
    $('.count').counterUp({
        delay: 10, // the delay time in ms
        time: 2000 // the speed time in ms
    });


    // owl-carousel for testimonial 
    if($('.testimonial-carousel').length){
        $('.testimonial-carousel').owlCarousel({
            loop:true,
            nav:false,
            dots:true,
            margin: 50,
            autoplay:true,
            autoplayTimeout:4000,
            autoplayHoverPause:false,
            autoplaySpeed:1000,
            responsive: {
                0: {
                    items:1,
                },
                600:{
                    items:2,
                },
                1000: {
                    items:2,
                },
            }
        })
    }



    // owl-carousel for client
    if($('.client-carousel').length){
        $('.client-carousel').owlCarousel({
            loop:true,
            nav:false,
            dots:false,
            margin: 50,
            autoplay:true,
            autoplayTimeout:4000,
            autoplayHoverPause:false,
            autoplaySpeed:1000,
            responsive: {
                0: {
                    items:2
                },
                600:{
                    items:3
                },
                1000: {
                    items:5
                }
            }
        })
    }




    // Parallax 
    $('.parallax').jarallax({
        // parallax effect speed. 0.0 - 1.0
        speed             : 0.5
    });




    // Magnific-popup
    $('.popup-image').magnificPopup({
        type: 'image',
        removalDelay: 300,
        mainClass: 'mfp-fade',
        // other options
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1]
        }
    });


    // Video popup
    jQuery("a.demo").YouTubePopUp();

    //Setup Filterizr
    if($('.filtr-container').length){
        $('.filtr-container').imagesLoaded(function() {
            var filterizr = $('.filtr-container').filterizr();
        });
    }

    // SkillBar Animation
    $(window).scroll(function(){
      // This is then function used to detect if the element is scrolled into view
      function elementScrolled(elem)
      {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
      }

    
    // This is where we use the function to detect if ".newsletter-section" is scrolled into view, and when it is add the class ".animated" to the <p> child element
            if(elementScrolled('.newsletter-section')) {


            jQuery('.skillbar').each(function(){
                jQuery(this).find('.skillbar-bar').animate({
                    width:jQuery(this).attr('data-percent')
                },2000);
            });

        }
    });


    // ----------- Ajax Contact script -----------//
    $(function() {
        // Get the form.
        var form = $('#ajax-contact');

        // Get the messages div.
        var formMessages = $('#form-messages');

        // Set up an event listener for the contact form.
        $(form).submit(function(event) {
            // Stop the browser from submitting the form.
            event.preventDefault();

            // Serialize the form data.
            var formData = $(form).serialize();
            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
                .done(function(response) {
                    $(formMessages).removeClass('error');
                    $(formMessages).addClass('success');

                    // Set the message text.
                    $(formMessages).text(response);

                    // Clear the form.
                    $('#name').val('');
                    $('#subject').val('');
                    $('#email').val('');
                    $('#message').val('');
                })

                .fail(function(data) {
                    // Make sure that the formMessages div has the 'error' class.
                    $(formMessages).removeClass('success');
                    $(formMessages).addClass('error');

                    // Set the message text.
                    if (data.responseText !== '') {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text('Oops! An error occured and your message could not be sent.');
                    }
                });
        });
    });




})(window.jQuery);