# Profiles WordPress plugin

This is a WordPress plugin designed to pull in data from a profile API and display it via shortcode on a page.

## Installation

### Manual

Copy into the WordPress plugins folder. Activate via WordPress Dashboard > Plugins

### Composer

TBD

## Usage

Just add the shortcode to a page:

`[profile person="user.slug" show_name="true" show_image="true" show_url="true" show_publications="true" show_support="true" show_awards="true" api="https://url.example/api"]`

(The defaults for all of the `show_x` attributes are true.)

If you want to override how the profile is displayed, then copy `Views/content-profile.php` to `<your theme folder>/template-parts/content-profile.php` and modify as desired. Do not change the CSS class names, however, because this is how the JS identifies where to insert the API data.

## Development

Be sure to update `Profiles\VERSION` in `profiles.php`.