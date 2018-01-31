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
        'show_awards' => true,
        'show_publications' => true,
        'show_support' => true,
        'api' => 'https://ordev.utdallas.edu/profiles/api',
    ];

    /** @var array Filters to apply to the shortcode attributes. */
    public $attribute_filters = [
        'person' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
        'show_name' => FILTER_VALIDATE_BOOLEAN,
        'show_image' => FILTER_VALIDATE_BOOLEAN,
        'show_url' => FILTER_VALIDATE_BOOLEAN,
        'show_awards' => FILTER_VALIDATE_BOOLEAN,
        'show_publications' => FILTER_VALIDATE_BOOLEAN,
        'show_support' => FILTER_VALIDATE_BOOLEAN,
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