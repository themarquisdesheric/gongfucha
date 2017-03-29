'use strict';

(function (module) {
  const view = {};

  module.view = view;
})(window);

view.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).attr('data-category');
      var optionTag = `<option value="${val}">${val}</option>`;
      if (!$(`#category-filter option[value="${val}"]`).length && val) {
        $('#category-filter').append(optionTag);
      }

      val = $(this).attr('data-city');
      optionTag = `<option value="${val}">${val}</option>`;
      if (!$(`#city-filter option[value="${val}"]`).length && val) {
        $('#city-filter').append(optionTag);
      }
    }
  });
};

//Event listener and handler for Category
view.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#city-filter').val('');
  });
};

//Event listener and handler for Author
view.handleCityFilter = function() {
  $('#city-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-city="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
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

view.initIndexPage = function () {
  TeaLocation.all.forEach(a => $('#tea-sidebar').append(a.toHtml()));
  view.populateFilters();
  view.handleCategoryFilter();
  view.handleCityFilter();
};

TeaLocation.fetchAll(view.initIndexPage);


