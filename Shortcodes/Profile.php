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
        'name' => true,
        'image' => true,
        'url' => true,
        'awards' => true,
        'publications' => true,
        'support' => true,
        'api' => 'https://ordev.utdallas.edu/profiles/api',
    ];

    /** @var array Filters to apply to the shortcode attributes. */
    public $attribute_filters = [
        'person' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
        'with_data' => FILTER_VALIDATE_INT,
        'name' => FILTER_VALIDATE_BOOLEAN,
        'image' => FILTER_VALIDATE_BOOLEAN,
        'url' => FILTER_VALIDATE_BOOLEAN,
        'publications' => FILTER_VALIDATE_BOOLEAN,
        'support' => FILTER_VALIDATE_BOOLEAN,
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

        $person = $this->person;

        ob_start();

        include($this->views_dir . '/profiles-profile.php');

        return ob_get_clean();
    }

}