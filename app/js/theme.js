(function ($) {

  /**
   * Swap out svg files for PNGs on unsupporting devices. Modrnizr determines
   * what an unsupporting device is by adding the .no-svg class to the html
   * tag.
   */
  function svgToPng() {
    $('.no-svg .js__svg-image').each(function() {
      var src = $(this).attr('src');
      src = src.replace("svg", "png");
      $(this).attr('src', src);
    });
  }


  /**
   * Helper function to scroll the page and document to the supplied
   * Point at the supplied speed.
   *
   * @param     offset   :   number
   * @param     duration :   number
   * @param           fn :   λ function
   *
   */
  function scrollDocument(offset, duration, fn) {
    $("html, body").stop().animate({ 
      scrollTop: offset 
    }, duration, fn);
  }


  /**
   * Initializes the slick carousel on the supplied object.
   *
   * @param      $el  : jQuery Object
   */
  function initSlick($el) {
    $el.slick({
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 9,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });
  }


  /**
   * Initializes the bootstrap modals when one is clicked.
   */
  function initModals() {
    $(".modal").click(function() {
      $(".modal").modal();
    });
  }


  /**
   * Stuff to run on resize.
   */
  $(window).resize(function() {
    waitForFinalEvent(function() {
      var width = $(window).width();
      // Place functions here
    }, 500, "");
  });


  /**
   * Stuff to run after page load is mostly complete.
   */
  $(document).ready(function() {
    svgToPng();
    // all teh functions

  });

  
  /**
   * Helper function to delay firing resize events until the user actually
   * stops resizing their browser.
   */
  var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout (timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();


}(jQuery));

