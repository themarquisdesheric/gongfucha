'use-strict';

// nav script
var sideNav = function() {
  $('#hamburger').on('click', function() {
    $('nav').toggle('slow');
  });
};
sideNav();