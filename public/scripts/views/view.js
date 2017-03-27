'use strict';

(function (module) {
  const view = {};

  //Added click handler for hamburger menu in here
  view.menuAnimation = function () {
    $('.icon-menu').on('click', function () {
      $('.main-nav ul').slideToggle('fast');
    })
  }

  view.initIndexPage = function () {
    menuAnimation();
  };

  module.view = view;
})(window);