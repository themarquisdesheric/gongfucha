'use strict';

const locations = [
  {
    title: 'Fly Awake Tea'
  },
  {
    title: 'Tao of Tea'
  },
  {
    title: 'Heavens Tea, School of Tea Arts'
  },
  {
    title: 'Song Tea & Ceramics',
  },
  {
    title: 'Songfang Tea House',
  },
  {
    title: 'Dayi Pu\'er Tea Franchise Store',
  },
  {
    title: 'LockCha Tea House',
  },
  {
    title: 'Wisteria Tea House',
  },
  {
    title: 'Lin Ceramic\'s Studio',
  }
];

const markers = [];

function removeMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

//format the URL for the call to Places API
function placesUrl(title) {
  return `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${title}&key=${PLACES_KEY}`
}
//format the URL for the call to Places Details API
function placeDetailsUrl(id) {
  return `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${PLACES_KEY}`
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

      console.log(response);

      let placeId = response.results[0].place_id;
      let placeIdUrl = placeDetailsUrl(placeId);
      let open = '';
      //check if shop has its hours listed
      if (response.results[0].hasOwnProperty('opening_hours')) {
        //if hours are listed, set the info box as being OPEN NOW or CLOSED NOW
        if (response.results[0].opening_hours.open_now) {
          open = '<p style="color:#0f0;">Open now</p>';
        } else {
          open = '<p style="color:#f00;">Closed now</p>';
        }
      }

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
          content: `<p style="font-weight:bold;">${locations[i].title}</p>
                    <p>${response.result.formatted_address}</p>
                    ${open}
                    <p>${response.result.formatted_phone_number}</p>
                    <p><a href="${response.result.website}">${response.result.website}</a></p>`,
          maxWidth: 120
        });
        //click handler to open info windows
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });
        markers.push(marker);
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
