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
  var $awards_section = $profile_section.find('.profile-awards');

  var makeDataList = function (data, type, $target) {
    var $template = $target.find('.item-template');

    if ($template.length > 0) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].type === type) {
          var data_content = data[i].data;

          if (typeof data_content === "object") {
            var $list_item_template = $template.clone().removeClass('item-template');
            $list_item_template.find('[data-item-text]').each(function() {
              var $template_item = $(this);
              $template_item.text(data_content[$template_item.data('item-text')])
            });
            $list_item_template.appendTo($target);
          }

        }
      }
    }

    $template.css('display', 'none');
  }

  var setName = function(profile) {
    if (profile.name && $name_section.length > 0) {
      $name_section.text(profile.name);
    }
  }

  var setImage = function(profile) {
    if (profile.image_url && $image_section.length > 0) {
      $('<img src="' + profile.image_url + '" alt="profile image">').appendTo($image_section);
    }
  }

  var setLink = function(profile) {
    if (profile.url && $url_element.length > 0) {
      $url_element.attr('href', profile.url);
    }
  }

  var setPublications = function(profile) {
    if (profile.data && $publication_section.length > 0) {
      makeDataList(profile.data, 'publications', $publication_section);
    }
  }

  var setAwards = function(profile) {
    if (profile.data && $awards_section.length > 0) {
      makeDataList(profile.data, 'awards', $awards_section);
    }
  }

  var setSupport = function(profile) {
    if (profile.data && $support_section.length > 0) {
      makeDataList(profile.data, 'support', $support_section);
    }
  }

  // Handle the returned API results
  var handleResults = function(results) {
    if (typeof results === 'object' && results.hasOwnProperty('profile')) {
      for (var k = 0; k < results.profile.length; k++) {
        setName(results.profile[k]);
        setImage(results.profile[k]);
        setLink(results.profile[k]);
        setAwards(results.profile[k]);
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