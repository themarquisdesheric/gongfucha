'use strict';

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: locations[0].address
  });

  for (var i = 0; i < locations.length; i++) {
    let url = geocodeUrl(locations[i].title);
    $.get(url).done(function (response) {
      new google.maps.Marker({
        position: response.results[0].geometry.location,
        map: map,
      });
    });
  }
}

var locations = [
  {
    title: 'Fly Awake Tea',
    address: {lat: 45.549863, lng: -122.675790}
  },
  {
    title: 'Tao of Tea',
  },
  {
    title: 'Heavens Tea, School of Tea Arts',
  }
];

const GOOGLE_GEOCODE_API_KEY = 'AIzaSyB3ds8lw9KjCDvLxfBCj5EpU52-5nGUe_Q';

function geocodeUrl(title) {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${title}&key=${GOOGLE_GEOCODE_API_KEY}`;
}