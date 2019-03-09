<?php

/*
Plugin Name: SBR Discounts
Plugin URI: https://github.com/tomfordweb/SBR-Discounts
Description: Create discount codes in bulk for the SBR Autocross events. Do not Share! This plugin build is unique to SBR.
Author: Tom Ford
Version: 0.9
Author URI: https://tomfordweb.com
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );


add_action('admin_menu', 'test_plugin_setup_menu');

function test_plugin_setup_menu(){
  add_menu_page( 'Bulk Discount Creator', 'SBR Discounts', 'manage_options', 'sbr-discounts', 'test_init' );
}

function test_init(){

  $path = plugin_dir_url(__FILE__) .'build/index.html';

  echo "<iframe style='max-width: 100%; width: 1920px' width='1000' height='1000' src='".$path."'></iframe>";
}
