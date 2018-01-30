<?php

namespace Profiles\Shortcodes;

class Profile extends Shortcode
{
    /** @var string Shortcode name. */
    public $name = 'profile';

    /** @var array Default shortcode attributes. */
    public $default_attributes = [
        'person' => 'gnade',
        'with_data' => 1,
        'show_name' => true,
        'show_image' => true,
        'show_url' => true,
        'show_awards' => true,
        'show_publications' => true,
        'show_support' => true,
        'api' => 'https://ordev.utdallas.edu/profiles/api',
    ];

    /** @var array Filters to apply to the shortcode attributes. */
    public $attribute_filters = [
        'person' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
        'with_data' => FILTER_VALIDATE_INT,
        'show_name' => FILTER_VALIDATE_BOOLEAN,
        'show_image' => FILTER_VALIDATE_BOOLEAN,
        'show_url' => FILTER_VALIDATE_BOOLEAN,
        'show_awards' => FILTER_VALIDATE_BOOLEAN,
        'show_publications' => FILTER_VALIDATE_BOOLEAN,
        'show_support' => FILTER_VALIDATE_BOOLEAN,
        'api' => FILTER_VALIDATE_URL,
    ];

    /**
     * Renders the org chart shortcode.
     * 
     * @return string
     */
    public function render()
    {
        // CSS
        // wp_enqueue_style('profiles_publications_css', $this->public_url . '/css/profiles-profile.css', [], $this->version);

        // JS
        wp_register_script('profiles_profile_js', $this->public_url . '/js/profile.js', ['jquery'], $this->version);
        wp_localize_script('profiles_profile_js', 'profiles_profile_options', $this->attributes);
        wp_enqueue_script('profiles_profile_js');

        ob_start();

        // If the theme has a template-parts/content-profile.php file, use that to render the Person.
        // Otherwise, use the default view partial included in this theme.
        if (locate_template('template-parts/content-profile.php')) {
            set_query_var('profile_options', $this->attributes); // pass $this->attributes as $person_options to the template
            set_query_var('person', $this->person); // pass $this->attributes as $person_options to the template
            get_template_part('template-parts/content', 'profile');
        } else {
            $person = $this->person;
            $profile_options = $this->attributes;
            include($this->views_dir . '/content-profile.php');
        }

        return ob_get_clean();
    }

}