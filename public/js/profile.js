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
  var $tags_section = [];
  var $preperation_section = [];
  var $appointment_section = [];
  var $publication_section = [];
  var $support_section = [];
  var $awards_section = [];
  var all_pubs = [];
  var all_tags = [];
  var $filter_container;
  var publications_only = false;
  var publication_limit = 10;

  var init = function(container) {
    $profile_container = $(container);
    $profile_template = $profile_container.find('.profiles-plugin.profile');
    $filter_container = $profile_container.find('#filter-container');
    publications_only = $profile_template.data('publications-only') === 1;
    publication_limit = parseInt($profile_template.data('publication-limit')) || publication_limit;

    if ($profile_template.length > 0) {
      person = $profile_template.data('person');
      persons = person.split(';');
      api_url = $profile_template.data('api-url');
      for(i = 0; i < persons.length; i++){
        $profile_template.clone().attr('id', persons[i]).appendTo($profile_container);
        escaped_person = persons[i].replace('.', '\\.');
        $name_section[persons[i]] = $profile_container.find('#' + escaped_person + ' .profile-name a');
        $image_section[persons[i]] = $profile_container.find('#' + escaped_person + ' .profile-image');
        $url_element[persons[i]] = $profile_container.find('#' + escaped_person + ' .profile-url');
        $info_section[persons[i]] = $profile_container.find('#' + escaped_person + ' .contact-info');
        $tags_section[persons[i]] = $profile_container.find('#' + escaped_person + ' .profile-tags');
        $preperation_section[persons[i]] = $profile_container.find('#' + escaped_person + ' .profile-preparations');
        $appointment_section[persons[i]] = $profile_container.find('#' + escaped_person + ' .profile-appointments');
        $publication_section[persons[i]] = $profile_container.find('#' + escaped_person + ' .profile-publications');
        $support_section[persons[i]] = $profile_container.find('#' + escaped_person + ' .profile-support');
        $awards_section[persons[i]] = $profile_container.find('#' + escaped_person + ' .profile-awards');
      }
      $profile_template.hide()
      this.get(api_url);
    }
  };

  var makeDataList = function (data, type, $target) {
    var $template = $target.find('.item-template');

    if ($template.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].type === type) {
                var data_content = data[i].data;
                if (publications_only && type === "publications"){
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
      makeDataList(profile.information, 'information', $info_section[profile.slug]);
    }
  };

  var setPreparations = function(profile) {
    if (profile.preparation.length > 0 && $preperation_section[profile.slug].length > 0) {
      makeDataList(profile.preparation, 'preparation', $preperation_section[profile.slug]);
    }
  };

  var setAppointments = function(profile) {
    if (profile.appointments.length > 0 && $appointment_section[profile.slug].length > 0) {
      makeDataList(profile.appointments, 'appointments', $appointment_section[profile.slug]);
    }else{
      $appointment_section[profile.slug].parent('.section-container').hide();
    }
  };

  var setPublications = function(profile) {
    if (profile.publications.length > 0 && $publication_section[profile.slug].length > 0) {
      makeDataList(profile.publications.slice(0, publication_limit), 'publications', $publication_section[profile.slug]);
    }else{
      $publication_section[profile.slug].parent('.section-container').hide();
    }
  };

  var setAwards = function(profile) {
    if (profile.awards.length > 0 && $awards_section[profile.slug].length > 0) {
      makeDataList(profile.awards, 'awards', $awards_section[profile.slug]);
    }
  };

  var setSupport = function(profile) {
    if (profile.support && $support_section[profile.slug].length > 0) {
      makeDataList(profile.support, 'support', $support_section[profile.slug]);
    }else{
      $support_section[profile.slug].parent('.section-container').hide();
    }
  };

  var setTags = function(profile){
    if (profile.tags && $tags_section[profile.slug].length > 0){
      // makeDataList(profile.tags, 'tags', $tags_section[profile.slug]);
      var $profile = $tags_section[profile.slug].parents('.profile');
      for (var i = 0; i < profile.tags.length; i++){
        $tags_section[profile.slug].append('<span class="profile-tag ' + profile.tags[i].slug.en + '">' + profile.tags[i].name.en + '</span>');
        $profile.addClass(profile.tags[i].slug.en);
        all_tags[profile.tags[i].slug.en] = profile.tags[i].name.en;
      }
    }
  }

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
            setTags(results.profile[k]);
            setPreparations(results.profile[k]);
            setAwards(results.profile[k]);
            setAppointments(results.profile[k]);
            setSupport(results.profile[k]);
            profile = $profile_container.find('#' + results.profile[k].slug.replace('.', '\\.'));
            profile.appendTo(profile.parent()).show();
        }

      }

      var sorted_tags = {};
      Object.keys(all_tags).sort().forEach(function(key){
          sorted_tags[key] = all_tags[key];
      });
      var tag_selector = $filter_container.find('#filter-selector');
      for (var slug in sorted_tags){
        tag_selector.append('<option value="' + slug + '">' + sorted_tags[slug] + '</select>');
      }

      if(publications_only){
          all_pubs.sort(function(a, b){
              return new Date(b.year) - new Date(a.year)
          });
          $.each(all_pubs.slice(0, publication_limit), function(key, pub){
              if(pub.url){
                  $('#publication-container').append('<p class="profile-publication"><a href="' + pub.url + '" target="_blank">' + pub.title + '</a> [' + pub.year + ']</p>');
              }else{
                  $('#publication-container').append('<p class="profile-publication">' + pub.title + ' [' + pub.year + ']</p>');
              }
          });
      }

      //cleanup template
      $profile_template.remove();
    }
  };

  // If there was an error retrieving the data, show it
  var showAjaxError = function(jqxhr, textStatus, errorThrown) {
    $publication_section.html(errorThrown);
  };

  // GET the profile data from the API
  var get = function(api_url) {
    $.ajax({
      url: api_url,
      type: 'GET',
      data: {
        person: person,
        with_data: '1',
      },
      dataType: 'json',
      async: false,
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

  $('.profiles-plugin.profiles-container').each(function(){
      profile_reader.init(this);
  });

  $('#filter-selector').on('change', function(){
    console.log(this.value);
    $('.profiles-plugin.profile').show();
    if(this.value != ''){
      $('.profiles-plugin.profile:not(.' + this.value + ')').each(function(){
        $(this).hide();
      });
    }
  });

});
