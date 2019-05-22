'use strict'

$(document).ready(function() {

    $('.jumbotron').css('width', $(window).width());

  // Get started!

    var l = Ladda.create(document.querySelector('button.request-callback'));

    $("nav a[href^='#']").on('click', function(e) {

        // prevent default anchor click behavior
        e.preventDefault();
        e.stopPropagation();

        // animate
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 50
        }, 100, function(){

            $('.header-links .active').removeClass('active');
            setTimeout(function () {
                $(e.currentTarget).addClass('active');
            }, 100);

            // when done, add hash to url
            // (default click behaviour)
            //window.location.hash = this.hash;
        });

    });

    function clearAnchorActiveState() {
        $('.header-links a').each(function (i, anchor) {
            if($(anchor).hasClass('active')){
                $(anchor).removeClass('active');
            }
        })
    }

    $(document.body).on('touchmove', clearAnchorActiveState); // for mobile
    $(document.body).on('scroll', clearAnchorActiveState);

        //$(window).on('scroll', clearAnchorActiveState);

    $('.logo-box a[href^=\'#\']').on('click', function(e) {

        // prevent default anchor click behavior
        e.preventDefault();

        $('.header-links a').removeClass('active');

        // animate
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 50
        }, 300, function(){

            // when done, add hash to url
            // (default click behaviour)
            //window.location.hash = this.hash;
        });

    });

    $('#recipient-name').on('keydown', function () {
        $('.name-error').text('');
    });
    $('#mobile-number').on('keydown', function () {
        $('.number-error').text('');
    });
    
    $('button.request-callback').on('click', function (e) {

        clearAnchorActiveState();

        $('.header-links a').removeClass('active');

        var name = $('#recipient-name').val();
        var mobile = $('#mobile-number').val();

        var isFormValid = true;

        if(name.length === 0){
            $('.name-error').text('Please enter your name');
            isFormValid = false;
            return false;
        }
        if(mobile.length === 0){
            $('.number-error').text('Please enter your mobile number');
            isFormValid = false;
            return false;
        }
        var isValidNumber = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(mobile);
        if(!isValidNumber){
            $('.number-error').text('Please enter a valid mobile number');
            isFormValid = false;
            return false;
        }

        if(isFormValid){
            l.start();
            $.post('http://api.quickdigital.in/core/api/v1/request-callback', {
                name: name,
                mobile: mobile
            })
                .done(function (res) {
                    swal("Thank you!", "Dear " + name + ', one of our representatives will get in touch with you in 24 hours.', "success");
                })
                .fail(function() {
                    swal("Oops", "Your request did not get through, please re-try.", "error");
                })
                .always(function() {
                    l.stop();
                    $('#recipient-name').val('');
                    $('#mobile-number').val('');
                    $('#requestCallBackModal').modal('hide');
                });
        }
    })

});
