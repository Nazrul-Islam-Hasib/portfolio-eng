/* Template	:	Resume */
(function ($) {
  'use strict';
  var $win = $(window),
    $body_m = $('body');

  // Get Window Width
  function winwidth() {
    return $win.width();
  }
  var wwCurrent = winwidth();
  $win.on('resize', function () {
    wwCurrent = winwidth();
  });

  // Sticky
  var $is_sticky = $('.is-sticky');
  if ($is_sticky.length > 0) {
    var $navm = $('#mainnav').offset();
    $win.scroll(function () {
      var $scroll = $win.scrollTop();
      if ($win.width() > 991) {
        if ($scroll > $navm.top) {
          if (!$is_sticky.hasClass('has-fixed')) {
            $is_sticky.addClass('has-fixed');
          }
        } else {
          if ($is_sticky.hasClass('has-fixed')) {
            $is_sticky.removeClass('has-fixed');
          }
        }
      } else {
        if ($is_sticky.hasClass('has-fixed')) {
          $is_sticky.removeClass('has-fixed');
        }
      }
    });
  }

  // Bootstrap Dropdown
  var $dropdown_menu = $('.dropdown'),
    $dropdown_toggle = $('.dropdown-toggle');
  if ($dropdown_menu.length > 0) {
    $dropdown_menu.on('mouseover', function () {
      if ($win.width() > 991) {
        $(this).children('.dropdown-menu').stop().fadeIn(400);
        $(this).addClass('open');
      }
    });
    $dropdown_menu.on('mouseleave', function () {
      if ($win.width() > 991) {
        $(this).children('.dropdown-menu').stop().fadeOut(400);
        $(this).removeClass('open');
      }
    });
    $dropdown_toggle.on('click', function () {
      if ($win.width() < 991) {
        $(this).parent().children('.dropdown-menu').fadeToggle(400);
        $(this).parent().toggleClass('open');
        return false;
      }
    });
  }

  // remove ani
  var $navtoggler = $('.navbar-toggler'),
    $trannav = $('.is-transparent');
  if ($navtoggler.length > 0) {
    $navtoggler.on('click', function () {
      $('.remove-animation').removeClass('animated');
      if (!$trannav.hasClass('active')) {
        $trannav.addClass('active');
      } else {
        $trannav.removeClass('active');
      }
    });
  }

  // Nav collapse
  var $trannav = $('.is-transparent');
  $('.menu-link').on('click', function () {
    $('.navbar-collapse').collapse('hide');
    $trannav.removeClass('active');
  });

  $(document).on('mouseup', function (e) {
    if (!$trannav.is(e.target) && $trannav.has(e.target).length === 0) {
      $('.navbar-collapse').collapse('hide');
      $trannav.removeClass('active');
    }
  });

  //Active page menu when click
  var CurURL = window.location.href,
    urlSplit = CurURL.split('#');
  var $nav_link = $('.scroll-nav li a');
  if ($nav_link.length > 0) {
    $nav_link.each(function () {
      if (CurURL === this.href && urlSplit[1] !== '') {
        $(this)
          .closest('li')
          .addClass('active')
          .parent()
          .closest('li')
          .addClass('active');
      }
    });
  }

  //OnePage Scrolling
  $('a.menu-link[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .on('click', function (event) {
      if (
        location.pathname.replace(/^\//, '') ===
          this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              var $target = $(target);
              $target.focus();
              if ($target.is(':focus')) {
                return false;
              } else {
                $target.attr('tabindex', '-1');
                $target.focus();
              }
            }
          );
        }
      }
    });

  // Ajax Form Submission
  var contactForm = $('#contact-form');
  if (contactForm.length > 0 || subscribeForm.length > 0) {
    if (!$().validate || !$().ajaxSubmit) {
      console.log('contactForm: jQuery Form or Form Validate not Defined.');
      return true;
    }
    // ContactForm
    if (contactForm.length > 0) {
      var selectRec = contactForm.find('select.required'),
        qf_results = contactForm.find('.form-results');
      contactForm.validate({
        invalidHandler: function () {
          qf_results.slideUp(400);
        },
        submitHandler: function (form) {
          qf_results.slideUp(400);
          $(form).ajaxSubmit({
            target: qf_results,
            dataType: 'json',
            success: function (data) {
              var type =
                data.result === 'error' ? 'alert-danger' : 'alert-success';
              qf_results
                .removeClass('alert-danger alert-success')
                .addClass('alert ' + type)
                .html(data.message)
                .slideDown(400);
              if (data.result !== 'error') {
                $(form)
                  .clearForm()
                  .find('.input-field')
                  .removeClass('input-focused');
              }
            },
          });
        },
      });
      selectRec.on('change', function () {
        $(this).valid();
      });
    }
  }

  //skills
  function progressShow() {
    jQuery('.pi1').animate({ width: '90%' }, 2000);
    jQuery('.pi2').animate({ width: '80%' }, 2000);
    jQuery('.pi3').animate({ width: '70%' }, 2000);
    jQuery('.pi4').animate({ width: '60%' }, 2000);
    jQuery('.pi5').animate({ width: '70%' }, 2000);
  }
  jQuery('.skills').click(function () {
    progressShow();
    jQuery('.progress-inner p').show();
  });
})(jQuery);
