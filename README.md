# Profiles WordPress plugin

This is a WordPress plugin designed to pull in data from a profile API and display it via shortcode on a page.

## Installation

This plugin can be installed normally just like any other WordPress plugin. Alternatively, you can also install it with Composer.

### Regular Install

- Download the repository as a zip archive, and place it in your WordPress plugins folder.
- Activate the plugin in the admin panel

### Composer Install

If you're managing your plugins with [Composer](https://getcomposer.org), this plugin can be installed with something like the following in your `composer.json` file:

```json
{
  "repositories": [
    {
      "url": "git@github.com:utdal/profiles-wordpress-plugin.git",
      "type": "git"
    }
  ],
  "config": {
    "allow-plugins": {
      "composer/installers": true
    }
  },
  "require": {
    "composer/installers": "^1.3.0",
    "utdallasresearch/profiles-wordpress-plugin": "dev-master"
  },
  "extra": {
    "installer­paths" : {
      "wp-content/plugins/{$name}/" : ["type:wordpress­-plugin"]
    }
  }
}

```

## Shortcode Usage

Just add the shortcode to a page:

`[profile person="person1;person2;person3"]`

Additional Shortcode Attributes:

| Option        | Default  | Description |
| ------------- | -------- | ----------- |
| person=             | ""      | semicolon-delimited list of profile slugs to display |
| show_name=          | "true"  | show the profile name |
| show_image=         | "true"  | show the profile image |
| show_title=           | "true"  | show the profile primary title |
| show_secondary_title= | "false" | show the profile secondary title |
| show_tertiary_title=  | "false" | show the profile tertiary title |
| show_location=        | "true"  | show the profile location |
| show_phone=           | "true"  | show the profile phone |
| show_url=             | "true"  | show the profile primary url |
| show_secondary_url=   | "false" | show the profile secondary url |
| show_tertiary_url=    | "false" | show the profile tertiary url |
| show_quaternary_url=  | "false" | show the profile quaternary url |
| show_quinary_url=     | "false" | show the profile quinary url |
| show_summary=       | "false" | show the profile summary |
| show_tags=          | "true"  | show the profile tags |
| show_mailto=        | "false" | show the email address as a mailto link |
| show_preparation=   | "true"  | show the profile preparation section |
| show_awards=        | "true"  | show the profile awards section |
| show_appointments=  | "true"  | show the profile appointments section |
| show_publications=  | "true"  | show the profile publications section |
| show_support=       | "true"  | show the profile support section |
| show_filter=        | "false" | show the dropdown tag filter |
| allowed_tags=       | ""      | semicolon-delimited list of whitelisted tags to show |
| publications_only=  | "false" | instead of profile info, only show publications |
| publication_limit=  | "10"    | limit the number of publications per profile to display |
| api=                | ""      | the API URL from which to fetch profile data, e.g. (https://example.com/api/v1) |

## Customizing Display

If you want to override how the profile DOM is displayed, then copy `Views/content-profile.php` to `<your theme folder>/template-parts/content-profile.php` and modify as desired. Do not change the CSS class names or data-attributes, however, because this is how the JS identifies where to insert the API data.

In addition, you can use theme CSS or the WordPress customizer 'Custom CSS' on a given site.

## JavaScript events

This plugin dispatches the following JavaScript events on the `.profiles-container` element. jQuery examples of usage are shown:

- **"profiles:fetching"** - Dispatched immediately before attempting to fetch the profile data from the API.

```javascript
$('.profiles-container').on('profiles:fetching', (e) => {
  $(e.target).prepend('<p class="loading">Loading...</p>');
});
```
- **"profiles:fetched"** - Dispatched after profile data is successfully fetched from the API, but before the data is displayed. The results object is exposed so that it can be used or modified.

```javascript
$('.profiles-container').on('profiles:fetched', (e, results) => {
  $(e.target).find('.loading').remove();
  let p = results.profile.find(profile => profile.name === 'Rick Astley');
  if (p) {
    p.url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    p.information[0].data.title = 'Cool Dude';
  };
});
```

- **"profiles:filtering"** - Dispatched immediately before filtering the displayed profiles (using the dropdown menu). The filter tag slug string is exposed so that it can be used or modified.

```javascript
$('.profiles-container').on('profiles:filtering', (e, tag) => {
  console.log(`Filtering by ${tag}`);
});
```

- **"profiles:filtered"** - Dispatched immediately after filtering the displayed profiles (using the dropdown menu). The filter tag slug string is exposed so that it can be used.

```javascript
$('.profiles-container').on('profiles:filtered', (e, tag) => {
  console.log(`Filtered by ${tag}`);
});
```

## Development

Be sure to update `Profiles\VERSION` in `profiles.php`.