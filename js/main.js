(function (kala, $, console, undefined) {

  var masonrySelectors = [
    ["#inspiration-thumbs", ".thumbnails"]
  ];

  kala = function () {
    //console.log("kala");
  };

  kala.owl = {
    profiles: {
      fullpage: {
        controls: false,
        pagination: true,
        singleItem: true,
        responsive: true
      }
    }
  };

  // Function to convert hex format to a rgb color
  // Static function
  kala.math = {
    hexDigits: new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"),
    toHex: function (x) {
      return isNaN(x) ? "00" : kala.math.hexDigits[(x - x % 16) / 16] + kala.math.hexDigits[x % 16];
    },
    rgbToHex: function (rgb) {
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      return "#" + kala.math.toHex(rgb[1]) + kala.math.toHex(rgb[2]) + kala.math.toHex(rgb[3]);
    }
  };

  kala.copyToClipboard = function (aString) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", aString);
  };

  kala.initializeCarousels = function () {
    $(".carousel").each(function () {
      var car, opts;
      car = $(this);
      opts = kala.owl.profiles[car.data("owl-profile")];
      car.owlCarousel(opts);
    });
  };

  var makeColorsCopyToClipBoard = function () {
    $(".color-guide li").each(function () {
      var colorElement, color;
      colorElement = $(this);
      color = colorElement.css("background-color");
      colorElement.on("click", function () {
        kala.copyToClipboard(kala.math.rgbToHex(color));
      });
    });
  };

  var spyScroll = function () {
  // $("body").scrollspy({ target: $(".accent:first-child") });
  // $("body").on("activate.bs.scrollspy", function () {
  // console.log("A");
  // });
  // $("body").on("activate.bs.scrollspy", function () {
  // console.log("B");
  // });
  };

  var initMasonry = function () {
    //console.log(masonrySelectors);
    $(masonrySelectors).each(function () {
      var el = $(this[0]);
      var selector = this[1];
      el.masonry({
        itemSelector: selector
      });
    });
  };

  kala.resizePages = function () {
   //console.log($(window).height());
    $(".page").css("height", $(document.body).height() - $("#header .navbar-fixed-top").height());
  };

  document.addEventListener("DOMContentLoaded", function () {
    makeColorsCopyToClipBoard();
    spyScroll();
    initMasonry();
    kala.resizePages();
    $(window).resize(function () {
      kala.resizePages();
    });
    kala.initializeCarousels();
  });

})(window.kala = window.kala || {}, jQuery, window.console = window.console || {} );
