<?php

namespace Profiles\Shortcodes;

class Publications extends Shortcode
{
    /** @var string Shortcode name. */
    public $name = 'publications';

    /** @var array Default shortcode attributes. */
    public $default_attributes = [
        'person' => 'gnade',
        'with_data' => 1,
        'api' => 'https://ordev.utdallas.edu/profiles/api',
    ];

    /** @var array Filters to apply to the shortcode attributes. */
    public $attribute_filters = [
        'person' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
        'with_data' => FILTER_VALIDATE_INT,
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
        wp_enqueue_style('profiles_publications_css', $this->public_url . '/css/profiles-publications.css', [], $this->version);

        // JS
        wp_register_script('profiles_publications_js', $this->public_url . '/js/publications.js', ['jquery'], $this->version);
        wp_localize_script('profiles_publications_js', 'profiles_publications_options', $this->attributes);
        wp_enqueue_script('profiles_publications_js');

        $person = $this->person;

        ob_start();

        include($this->views_dir . '/profiles-publications.php');

        return ob_get_clean();
    }

}