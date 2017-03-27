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
    center: {lat: 45.549863, lng: -122.675790}
  });
  //loop through locations array and convert title to latLng
  for (let i = 0; i < locations.length; i++) {
    let url = geocodeUrl(locations[i].title);
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
        content: `<b>${locations[i].title}</b>
                  <p>${response.results[0].address_components[0].short_name} ${response.results[0].address_components[1].short_name}</p>
                  <p>${response.results[0].address_components[3].short_name}</p>
                 `
      });

      infoWindow.open(map, marker);
    });
  }
}

