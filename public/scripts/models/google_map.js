'use strict';

const GOOGLE_GEOCODE_API_KEY = 'AIzaSyB3ds8lw9KjCDvLxfBCj5EpU52-5nGUe_Q';

const locations = [
  {
    title: 'Fly Awake Tea'
  },
  {
    title: 'Tao of Tea'
  },
  {
    title: 'Heavens Tea, School of Tea Arts'
  }
];

function geocodeUrl(title) {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${title}&key=${GOOGLE_GEOCODE_API_KEY}`;
}

function initMap() {
  //initialize map and center it
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 45.549863, lng: -122.675790},
    scrollwheel: false
  });
  //loop through locations array and convert title to latLng
  for (let i = 0; i < locations.length; i++) {
    let url = geocodeUrl(locations[i].title, locations[i].city);
    //set marker for each shop
    $.get(url).done(function (response) {
      console.log(response);
      //create marker for shop
      let marker = new google.maps.Marker({
        position: response.results[0].geometry.location,
        map: map,
      });
      //create info window for marker
      let infoWindow = new google.maps.InfoWindow({
        content: `<p>${locations[i].title}</p>
                  <p>${response.results[0].formatted_address}</p>`,
        maxWidth: 120
      });
      //click handler to open info windows
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
    });
  }
}

