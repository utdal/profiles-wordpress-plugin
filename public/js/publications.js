// Publication Reader Module
var publications_reader = (function($, options, undefined) {

  var person = options.person;
  var api_url = options.api;
  var with_data = options.with_data;

  var $publication_section = $('#' + person + '_publications');

  // Make a list of publications
  var makePublicationList = function(profile) {
    var data = profile.data;
    var $publication_list = $('<ul class="list-group list-group-flush"></ul>');
    for (var i = 0; i < data.length; i++) {
      if (data[i].type === 'publications') {
        $('<li class="list-group-item"></li>').text(data[i].data.name).appendTo($publication_list);
      }
    }

    $publication_list.appendTo($publication_section);
  }

  // Handle the returned API results
  var handleResults = function(results) {
    if (typeof results === 'object' && results.hasOwnProperty('profile')) {
      for (var k = 0; k < results.profile.length; k++) {
        makePublicationList(results.profile[k]);
      }
    }
  };

  // If there was an error retrieving the data, show it
  var showAjaxError = function(jqxhr, textStatus, errorThrown) {
    $publication_section.html(errorThrown);
  }

  // GET the profile data from the API
  var get = function() {
    $.ajax({
      url: api_url,
      type: 'GET',
      data: {
        person: person,
        with_data: with_data,
      },
      dataType: 'json',
      success: handleResults,
      error: showAjaxError,
    });
  };

  return {
    get: get,
  };

})(jQuery, profiles_publications_options);

// On Page Load, get the specified profiles
jQuery(document).ready(function($) {

  publications_reader.get();

});