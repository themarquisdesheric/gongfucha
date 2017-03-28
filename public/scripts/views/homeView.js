'use-strict';

// nav script
var hamburgerMenu = function() {
  $('#hamburger').on('click', function() {
    var $nav = $('nav');
    $nav.toggle('slow');
    $('#hamburger').toggleClass('rotate');
  });
};


hamburgerMenu();