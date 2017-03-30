// (function (module) {
//   const TeaLocation = {};

//   module.TeaLocation = TeaLocation;
// })(window);

/*------------------------------
Populating Database & Tea Location List
------------------------------*/
function TeaLocation(data) {
  Object.keys(data).forEach(ele => (this[ele] = data[ele]));
}

//Declare array for sorted tea locations (default sorting)
TeaLocation.all = [];

// Function sorts and populates TeaLocation.all array
TeaLocation.loadAll = rawData => {
  TeaLocation.all = rawData.map(ele => new TeaLocation(ele));
};

// Fetches initial database contents from postgres and populates index.html
TeaLocation.fetchAll = callback => {
  $.get('/tea')
    .then(
    results => {
      console.log('results are: ', results)
      TeaLocation.loadAll(results);
      callback();
    }
    ).catch(console.error);
}

TeaLocation.prototype.toHtml = function () {
  var source = $('#tealocation-template').html();
  var template = Handlebars.compile(source);
  return template(this);
};
