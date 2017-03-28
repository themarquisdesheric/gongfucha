'use strict';

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

//format the URL for the call to Places API
function placesUrl(title) {
  return `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${title}&key=${GOOGLE_PLACES_API_KEY}`
}
//format the URL for the call to Places Details API
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

  //loop through locations array and populate map with markers
  for (let i = 0; i < locations.length; i++) {
    let url = placesUrl(locations[i].title);
    //send GET request to Places API to obtain place ID
    $.get(`https://crossorigin.me/${url}`).done(function (response) {
      let placeId = response.results[0].place_id;
      let placeIdUrl = placeDetailsUrl(placeId);
      //send GET request to Places Details API for shop info
      $.get(`https://crossorigin.me/${placeIdUrl}`).done(function(response) {
        console.log('Place Details response: ', response);

        //create marker for shop
        let marker = new google.maps.Marker({
          position: response.result.geometry.location,
          map: map,
        });
        //create info window for marker
        let infoWindow = new google.maps.InfoWindow({
          content: `<p>${locations[i].title}</p>
                    <p>${response.result.formatted_address}</p>
                    <p>${response.result.formatted_phone_number}</p>
                    <p><a href="${response.result.website}">${response.result.website}</a></p>`,
          maxWidth: 120
        });
        //click handler to open info windows
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });
      });
    });
  }
  //re-center map upon window resize
  google.maps.event.addDomListener(window, 'resize', function() {
    const center = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
  });
}

