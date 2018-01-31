// Profile Reader Module
var profile_reader = (function($, undefined) {

  var person;
  var api_url;
  var $profile_section;
  var $name_section;
  var $image_section;
  var $url_element;
  var $publication_section;
  var $support_section;
  var $awards_section;

  var init = function() {
    $profile_section = $('.profiles-plugin.profile');

    if ($profile_section.length > 0) {
      person = $profile_section.data('person');
      api_url = $profile_section.data('api-url');
      $name_section = $profile_section.find('.profile-name');
      $image_section = $profile_section.find('.profile-image');
      $url_element = $profile_section.find('.profile-url');
      $publication_section = $profile_section.find('.profile-publications');
      $support_section = $profile_section.find('.profile-support');
      $awards_section = $profile_section.find('.profile-awards');
      return true;
    }

    return false;
  };

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
  };

  var setName = function(profile) {
    if (profile.name && $name_section.length > 0) {
      $name_section.text(profile.name);
    }
  };

  var setImage = function(profile) {
    if (profile.image_url && $image_section.length > 0) {
      $('<img src="' + profile.image_url + '" alt="profile image">').appendTo($image_section);
    }
  };

  var setLink = function(profile) {
    if (profile.url && $url_element.length > 0) {
      $url_element.attr('href', profile.url);
    }
  };

  var setPublications = function(profile) {
    if (profile.data && $publication_section.length > 0) {
      makeDataList(profile.data, 'publications', $publication_section);
    }
  };

  var setAwards = function(profile) {
    if (profile.data && $awards_section.length > 0) {
      makeDataList(profile.data, 'awards', $awards_section);
    }
  };

  var setSupport = function(profile) {
    if (profile.data && $support_section.length > 0) {
      makeDataList(profile.data, 'support', $support_section);
    }
  };

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
  };

  // GET the profile data from the API
  var get = function() {
    $.ajax({
      url: api_url,
      type: 'GET',
      data: {
        person: person,
        with_data: '1',
      },
      dataType: 'json',
      success: handleResults,
      error: showAjaxError,
    });
  };

  return {
    init: init,
    get: get,
  };

})(jQuery);

// On Page Load, get the specified profiles
jQuery(document).ready(function($) {

  if (profile_reader.init()) {
    profile_reader.get();
  }

});