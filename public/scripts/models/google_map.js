'use strict';

const GOOGLE_GEOCODE_API_KEY = 'AIzaSyB3ds8lw9KjCDvLxfBCj5EpU52-5nGUe_Q';
const GOOGLE_PLACES_API_KEY = 'AIzaSyABR5dsVE6XNT0UOAKI_qmSC4_p0jPShQM';

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
//this is how we ping the google geocode API with a shop name and it returns the latLng
function geocodeUrl(title) {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${title}&key=${GOOGLE_GEOCODE_API_KEY}`;
}

function placesUrl(title) {
  return `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${title}&key=${GOOGLE_PLACES_API_KEY}`
}

function placeDetailsUrl(id) {
  return `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${GOOGLE_PLACES_API_KEY}`
}

function initMap() {
  //initialize map and center it
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 45.549863, lng: -122.675790},
    scrollwheel: false
  });
  //loop through locations array and convert title to latLng
  for (let i = 0; i < locations.length; i++) {
    let url = geocodeUrl(locations[i].title);
    //set marker for each shop
    $.get(url).done(function (response) {
      // console.log('Geocode response: ', response);
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
  //re-center map upon window resize
  google.maps.event.addDomListener(window, 'resize', function() {
    const center = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
  });



  //working, now need to incorporate this into the for loop and replace geocoding API
  let place = placesUrl(locations[0].title);

  $.get(`https://crossorigin.me/${place}`).done(function(response) {
    let placeId = response.results[0].place_id;
    let placeIdUrl = placeDetailsUrl(placeId);
    $.get(`https://crossorigin.me/${placeIdUrl}`).done(function(response) {
      console.log('Place Details response: ', response);
    });
  });
}

