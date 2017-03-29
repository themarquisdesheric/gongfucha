'use strict';

(function(module) {
    const homeController = {}
    homeController.render = function() {
        $('.tab-content').show();
    }
    module.homeController = homeController;
})(window);

(function(module) {
    const aboutController = {}
    aboutController.render = function() {
        $('.tab-content').hide();
        $('#about').fadeIn();
    }
    module.aboutController = aboutController;
})(window);

(function(module) {
    const placesController = {}
    placesController.render = function() {
        $('.tab-content').hide();
        $('#places').fadeIn();
    }
    module.placesController = placesController;
})(window);

(function(module) {
    const submitController = {}
    submitController.render = function() {
        $('.tab-content').hide();
        $('#submit').fadeIn();

        //below functions should read from the form
        //look in view.js for create form and ajax call to DB
        $('#new-tea-location').on('submit', 'input, textarea', view.create);
    }
    module.submitController = submitController;
})(window);

// Initialize all routes
page('/', homeController.render);
page('/about', aboutController.render);
page('/places', placesController.render);
page('/submit', submitController.render);

// Activate page.js
page();