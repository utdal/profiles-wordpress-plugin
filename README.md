# Profiles WordPress plugin

This is a WordPress plugin designed to pull in data from a profile API and display it via shortcode on a page.

## Installation

### Manual

Copy into the WordPress plugins folder. Activate via WordPress Dashboard > Plugins

### Composer

TBD

## Usage

Just add the shortcode to a page:

`[publications person="user.slug" api="https://url.example/api"]`

`[profile person="user.slug" name="true" image="true" url="true" publications="true" support="true" awards="true" api="https://url.example/api"]`

## Development

### CSS / Sass

- Pull in the compilation dependencies: `yarn install`
- Run the compiler: `gulp`