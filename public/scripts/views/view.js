'use strict';

(function (module) {
  const view = {};

  module.view = view;
})(window);

// Nav script
var hamburgerMenu = function() {
  $('#hamburger').on('click', function() {
    var $nav = $('nav');
    $nav.toggle('slow');
    $('#hamburger').toggleClass('rotate');
  });
};

//Search animation
var searchAnimation = function() {
  $('#search-settings-nav').on('click', function() {
    $('#search-settings').slideToggle('fast');
  })
};

/*------------------------------
Filters (Tea Locations)
------------------------------*/
//This function grabs the data attributes from our tea list and populates the search filters.
view.populateFilters = function () {
  $('article').each(function () {
    if (!$(this).hasClass('template')) {
      var val = $(this).attr('data-category');
      var optionBox = `<div class="select-box" id="${val}">${val}</div>`;
      if ($('#category-filter:not(:contains('+`<div class="select-box" id="${val}">${val}</div>`+'))')) {
        $('#category-filter').append(optionBox);
      }
      val = $(this).attr('data-city');
      var optionBox = `<div class="select-box" id="${val}">${val}</div>`;
      if ($('#city-filter:not(:contains('+`<div class="select-box" id="${val}">${val}</div>`+'))')) {
        $('#city-filter').append(optionBox);
      }
    }
  })
};

//Event listener and handler for Category
view.tags = ['init'];

view.toggleButton = function () {
  $('.filter').on('click', "div", function (e) {
    // $(e.target).toggleClass(".clicked");
    console.log(e);
    var idx = view.tags.indexOf(e.target.textContent);
      if (idx === -1) {
        view.tags.push(e.target.textContent);
        console.log("Filtered array:", view.tags);
        view.handleCategoryFilter();
      } else {
        view.tags.splice(idx, 1);
        view.handleCategoryFilter();
      }
  });
};

view.handleCategoryFilter = function() {
    $('article').hide();
    if (view.tags) {
      view.tags.map(function(i) {
        $(`article[data-category="${(i)}"]`).fadeIn();
        $(`article[data-city="${(i)}"]`).fadeIn();
        console.log(`article[data-category="${(i)}"]`);
      })
    } else {
      $('article').fadeIn();
      $('article.template').hide();
  };
};

/*------------------------------
Taking information from new form
------------------------------*/
// Pull from object and JSON.
view.create = function() {
  let teaLocation;
  $('#tealocation').empty();

  teaLocation = new TeaLocation({
    shopName: $('#shop-name').val(),
    shopUrl: $('#shop-url').val(),
    description: $('#shop-description').val(),
    street: $('#shop-street').val(),
    city: $('#shop-city').val(),
    state: $('#shop-state').val(),
    zip: $('#shop-zip').val(),
    country: $('#shop-country').val(),
    category: $('#shop-category:checked').val(),
  });

  //append new TeaLocation to database
  //populate new TeaLocation to sidebar and categories
};

hamburgerMenu();
searchAnimation();
view.initIndexPage = function () {
  TeaLocation.all.forEach(a => $('#tea-sidebar').append(a.toHtml()));
  //solves timing issue for Maps API
  var initUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCS7efQ1L1Es_cFLNYRgXoOZ65bxGf3j2A&callback=initMap';
  var body = document.getElementsByTagName('body')[0];
  var js = document.createElement('script');
  js.type = 'text/javascript';
  js.src = initUrl;
  body.appendChild(js);
  //End code needed for Maps API

  view.populateFilters();
  view.toggleButton();
};

TeaLocation.fetchAll(view.initIndexPage);


