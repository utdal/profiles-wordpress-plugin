// Profile Reader Module
var profile_reader = (function($, undefined) {

  var person;
  var persons = [];
  var api_url;
  var $profile_template;
  var $name_section = [];
  var $image_section = [];
  var $url_element = [];
  var $info_section = []
  var $preperation_section = [];
  var $appointment_section = [];
  var $publication_section = [];
  var $support_section = [];
  var $awards_section = [];
  var all_pubs = [];
  var publications_only = false;
  var publication_limit = 10;

  var init = function() {
    $profile_template = $('.profiles-plugin.profile');
    $profile_container = $('.profiles-plugin.container');
    publications_only = $profile_template.data('publications-only') === 1;
    publication_limit = parseInt($profile_template.data('publication-limit')) || publication_limit;

    if ($profile_template.length > 0) {
      person = $profile_template.data('person');
      persons = person.split(';');
      api_url = $profile_template.data('api-url');
      for(i = 0; i < persons.length; i++){
        $profile_template.clone().attr('id', persons[i]).appendTo($profile_container);
        escaped_person = persons[i].replace('.', '\\.');
        $name_section[persons[i]] = $profile_container.find('#' + escaped_person).find('.profile-name a');
        $image_section[persons[i]] = $profile_container.find('#' + escaped_person).find('.profile-image');
        $url_element[persons[i]] = $profile_container.find('#' + escaped_person).find('.profile-url');
        $info_section[persons[i]] = $profile_container.find('#' + escaped_person).find('.contact-info');
        $preperation_section[persons[i]] = $profile_container.find('#' + escaped_person).find('.profile-preparations');
        $appointment_section[persons[i]] = $profile_container.find('#' + escaped_person).find('.profile-appointments');
        $publication_section[persons[i]] = $profile_container.find('#' + escaped_person).find('.profile-publications');
        $support_section[persons[i]] = $profile_container.find('#' + escaped_person).find('.profile-support');
        $awards_section[persons[i]] = $profile_container.find('#' + escaped_person).find('.profile-awards');
      }
      $profile_template.hide()
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
          if (type === "publications" && publications_only){
            all_pubs.push(data_content);
            continue;
          }
          if (typeof data_content === "object") {
            var $list_item_template = $template.clone().removeClass('item-template');
            $list_item_template.find('[data-item-text]').each(function() {
              var $template_item = $(this);
              $template_item.text(data_content[$template_item.data('item-text')] ? data_content[$template_item.data('item-text')] : "");
            });
            $list_item_template.appendTo($target);
          }

        }
      }
    }

    $template.css('display', 'none');
  };

  var setName = function(profile) {
    if (profile.name && $name_section[profile.slug].length > 0) {
      $name_section[profile.slug].text(profile.name);
    }
  };

  var setImage = function(profile) {
    if (profile.image_url && $image_section[profile.slug].length > 0) {
      $('<img src="' + profile.image_url + '" alt="profile image">').appendTo($image_section[profile.slug]);
    }
  };

  var setLink = function(profile) {
    if (profile.url && $url_element[profile.slug].length > 0) {
      $url_element[profile.slug].attr('href', profile.url);
    }
  };

  var setInfo = function(profile) {
    if (profile.url && $url_element[profile.slug].length > 0) {
      makeDataList(profile.data, 'information', $info_section[profile.slug]);
    }
  };

  var setPreparations = function(profile) {
    if (profile.data && $preperation_section[profile.slug].length > 0) {
      makeDataList(profile.data, 'preparation', $preperation_section[profile.slug]);
    }
  };

  var setAppointments = function(profile) {
    if (profile.data && $appointment_section[profile.slug].length > 0) {
      makeDataList(profile.data, 'appointments', $appointment_section[profile.slug]);
    }
  };

  var setPublications = function(profile) {
    if (profile.data && $publication_section[profile.slug].length > 0) {
      makeDataList(profile.data, 'publications', $publication_section[profile.slug]);
    }
  };

  var setAwards = function(profile) {
    if (profile.data && $awards_section[profile.slug].length > 0) {
      makeDataList(profile.data, 'awards', $awards_section[profile.slug]);
    }
  };

  var setSupport = function(profile) {
    if (profile.data && $support_section[profile.slug].length > 0) {
      makeDataList(profile.data, 'support', $support_section[profile.slug]);
    }
  };

  // Handle the returned API results
  var handleResults = function(results) {
    if (typeof results === 'object' && results.hasOwnProperty('profile')) {
      for (var k = 0; k < results.profile.length; k++) {

        setPublications(results.profile[k]);

        if(!publications_only){
            setName(results.profile[k]);
            setImage(results.profile[k]);
            setLink(results.profile[k]);
            setInfo(results.profile[k]);
            setPreparations(results.profile[k]);
            setAwards(results.profile[k]);
            setAppointments(results.profile[k]);
            setSupport(results.profile[k]);
            $('#' + results.profile[k].slug.replace('.', '\\.')).appendTo($profile_container).show();
        }

      }

      if(publications_only){
          all_pubs.sort(function(a, b){
              return new Date(b.year) - new Date(a.year)
          });
          $.each(all_pubs.slice(0, publication_limit), function(key, pub){
              if(pub.url){
                  $('#publication-container').append('<a href="' + pub.url + '" target="_blank">' + pub.name + '</a> [' + pub.year + ']<br>');
              }else{
                  $('#publication-container').append( pub.name + ' [' + pub.year + ']<br>');
              }
          });
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
