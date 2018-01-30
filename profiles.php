<?php

use Profiles\Shortcodes\Publications;

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://research.utdallas.edu/oris
 * @since             1.0.0
 * @package           Re_mods
 *
 * @wordpress-plugin
 * Plugin Name:       UT Dallas Research Profiles
 * Plugin URI:        https://github.com/utdallasresearch/profiles-wordpress-plugin
 * Description:       Adds configurable research-related features.
 * Version:           1.0.0
 * Author:            UT Dallas Research Information Systems
 * Author URI:        https://research.utdallas.edu/oris
 * License:           MIT
 * License URI:       http://opensource.org/licenses/MIT
 * Text Domain:       profiles
 * Domain Path:       /languages
 */
define('Profiles\VERSION', '1.0.0');

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

// Autoload classes
spl_autoload_register(function ($class_name) {
    $prefix = 'Profiles\\';
    $prefix_length = strlen($prefix);

    if (strncmp($prefix, $class_name, $prefix_length) !== 0) { // Only autoload ReMods classes
        return;
    }

    $relative_class = substr($class_name, $prefix_length);
    $filename = plugin_dir_path(__FILE__) . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($filename)) {
        include_once $filename;
    }
});

// Define WordPress hooks
add_action('init', [(new Profiles\Shortcodes\Publications(Profiles\VERSION)), 'register']);