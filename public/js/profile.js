// Profile Reader Module
var profile_reader = (function($, options, undefined) {

  var person = options.person;
  var api_url = options.api;
  var with_data = options.with_data;

  var $profile_section = $('#' + person + '_profile');
  var $name_section = $profile_section.find('.profile-name');
  var $image_section = $profile_section.find('.profile-image');
  var $url_element = $profile_section.find('.profile-url');
  var $publication_section = $profile_section.find('.profile-publications');
  var $support_section = $profile_section.find('.profile-support');

  var makeDataList = function (data, type, $target) {
    var $data_list = $('<ul class="list-group list-group-flush"></ul>');
    var $template = $target.find('.template');

    for (var i = 0; i < data.length; i++) {
      if (data[i].type === type) {
        var $list_item = $('<li class="list-group-item"></li>');
        var data_content = data[i].data;

        if (typeof data_content === "object") {
          // Set the main list item text
          if ($target.data('item-text')) {
            $list_item.text(data_content[$target.data('item-text')]);
          }

          // Set any additional content based on the template
          if ($template.length > 0) {
            var $list_item_template = $template.clone();
            $list_item_template.find('[data-item-text]').each(function() {
              var $template_item = $(this);
              $template_item.text(data_content[$template_item.data('item-text')])
            });
            $list_item_template.appendTo($list_item);
          }
        }

        $list_item.appendTo($data_list);
      }
    }

    $template.css('display', 'none');
    $data_list.appendTo($target);
  }

  var setName = function(profile) {
    if (options.name && profile.name && $name_section.length > 0) {
      $name_section.text(profile.name);
    }
  }

  var setImage = function(profile) {
    if (options.image && profile.image_url && $image_section.length > 0) {
      $('<img src="' + profile.image_url + '" alt="profile image">').appendTo($image_section);
    }
  }

  var setLink = function(profile) {
    if (options.url && profile.url && $url_element.length > 0) {
      $url_element.attr('href', profile.url);
    }
  }
  
  var setPublications = function(profile) {
    makeDataList(profile.data, 'publications', $publication_section);
  }
  
  var setSupport = function(profile) {
    makeDataList(profile.data, 'support', $support_section);
  }

  // Handle the returned API results
  var handleResults = function(results) {
    if (typeof results === 'object' && results.hasOwnProperty('profile')) {
      for (var k = 0; k < results.profile.length; k++) {
        setName(results.profile[k]);
        setImage(results.profile[k]);
        setLink(results.profile[k]);
        setPublications(results.profile[k]);
        setSupport(results.profile[k]);
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

})(jQuery, profiles_profile_options);

// On Page Load, get the specified profiles
jQuery(document).ready(function($) {

  profile_reader.get();

});