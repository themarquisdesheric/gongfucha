'use strict';

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: locations[0].address
  });

  var marker = new google.maps.Marker({
    position: locations[0].address,
    map: map,
  });
}

const locations = [
  {
    title: 'Fly Awake Tea',
    address: {lat: 45.549863, lng: -122.675790}
  }
];