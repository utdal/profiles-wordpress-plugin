<?php

namespace Profiles\Shortcodes;

class Profile extends Shortcode
{
    /** @var string Shortcode name. */
    public $name = 'profile';

    /** @var array Default shortcode attributes. */
    public $default_attributes = [
        'person' => 'gnade',
        'show_name' => true,
        'show_image' => true,
        'show_url' => true,
        'show_secondary_url' => false,
        'show_tertiary_url' => false,
        'show_quaternary_url' => false,
        'show_quinary_url' => false,
        'show_title' => true,
        'show_secondary_title' => false,
        'show_tertiary_title' => false,
        'show_location' => true,
        'show_phone' => true,
        'show_preparation' => true,
        'show_awards' => true,
        'show_appointments' => true,
        'show_publications' => true,
        'show_support' => true,
        'show_tags' => true,
        'show_mailto' => false,
        'allowed_tags' => false,
        'show_filter' => false,
        'publications_only' => false,
        'publication_limit' => 10,
        'api' => 'https://profiles.utdallas.edu/api/v1',
    ];

    /** @var array Filters to apply to the shortcode attributes. */
    public $attribute_filters = [
        'person' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
        'show_name' => FILTER_VALIDATE_BOOLEAN,
        'show_image' => FILTER_VALIDATE_BOOLEAN,
        'show_url' => FILTER_VALIDATE_BOOLEAN,
        'show_secondary_url' => FILTER_VALIDATE_BOOLEAN,
        'show_tertiary_url' => FILTER_VALIDATE_BOOLEAN,
        'show_quaternary_url' => FILTER_VALIDATE_BOOLEAN,
        'show_quinary_url' => FILTER_VALIDATE_BOOLEAN,
        'show_title' => FILTER_VALIDATE_BOOLEAN,
        'show_secondary_title' => FILTER_VALIDATE_BOOLEAN,
        'show_tertiary_title' => FILTER_VALIDATE_BOOLEAN,
        'show_location' => FILTER_VALIDATE_BOOLEAN,
        'show_phone' => FILTER_VALIDATE_BOOLEAN,
        'show_preparation' => FILTER_VALIDATE_BOOLEAN,
        'show_awards' => FILTER_VALIDATE_BOOLEAN,
        'show_appointments' => FILTER_VALIDATE_BOOLEAN,
        'show_publications' => FILTER_VALIDATE_BOOLEAN,
        'show_support' => FILTER_VALIDATE_BOOLEAN,
        'show_tags' => FILTER_VALIDATE_BOOLEAN,
        'show_mailto' => FILTER_VALIDATE_BOOLEAN,
        'allowed_tags' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
        'show_filter' => FILTER_VALIDATE_BOOLEAN,
        'publications_only' => FILTER_VALIDATE_BOOLEAN,
        'publication_limit' => FILTER_VALIDATE_INT,
        'api' => FILTER_VALIDATE_URL,
    ];

    /**
     * Renders the shortcode.
     *
     * @return string
     */
    public function render()
    {
        ob_start();

        // If the theme has a template-parts/content-profile.php file, use that to render the profile.
        // Otherwise, use the default view partial included in this plugin.
        if (locate_template('template-parts/content-profile.php')) {
            set_query_var('profile_options', $this->attributes); // pass $this->attributes as $profile_options to the template
            set_query_var('person', $this->person); // pass $this->person as $person to the template
            get_template_part('template-parts/content', 'profile');
        } else {
            $person = $this->person;
            $profile_options = $this->attributes;
            include($this->views_dir . '/content-profile.php');
        }

        return ob_get_clean();
    }

}
