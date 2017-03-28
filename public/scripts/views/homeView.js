'use-strict';

// nav script
var sideNav = function() {
  $('#hamburger').on('click', function() {
    var $nav = $('nav');
    $nav.toggle('slow');
    $('#hamburger').toggleClass('rotate');
  });
};
sideNav();