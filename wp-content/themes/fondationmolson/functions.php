<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});

	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});

	return;
}

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_local_scripts' ) );
		parent::__construct();
	}

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	function register_local_scripts() {
		// If not in admin, load newer version of jquery
//		if (!is_admin()) {
//			wp_deregister_script('jquery');
//			wp_register_script('jquery', get_template_directory_uri() . '/static/js/jquery-3.2.1.min.js', array(), '3.2.1');
//			wp_enqueue_script('jquery');
//			wp_register_script('jquery-ui', get_template_directory_uri() . '/static/js/jquery-ui.js', ['jquery']);
//			wp_enqueue_script('jquery-ui');
//		}

//		wp_register_script('popper', get_template_directory_uri() . '/static/js/popper.js', ['jquery']);
//		wp_enqueue_script('popper');
//		wp_register_script('bootstrap', get_template_directory_uri() . '/static/js/bootstrap.min.js', ['jquery']);
//		wp_enqueue_script('bootstrap');
//		wp_register_script('fontawesome', get_template_directory_uri() . '/static/js/fontawesome-all.min.js', ['jquery']);
//		wp_enqueue_script('fontawesome');

//		wp_enqueue_style('bootstrap-css', get_stylesheet_directory_uri() . '/static/css/bootstrap.css');
//		wp_enqueue_style('fontawesome-css', get_stylesheet_directory_uri() . '/static/css/fa-svg-with-js.css');

		// wp_enqueue_style('base-css', get_stylesheet_directory_uri() . '/static/css/base.css');
//		wp_enqueue_style('main-css', get_stylesheet_directory_uri() . '/static/css/main.css');

//		wp_enqueue_style( 'wpb-google-fonts', 'https://fonts.googleapis.com/css?family=Playfair+Display:400,700,700i|Work+Sans:400,600', false );
	}

	function add_to_context( $context ) {
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
		return $context;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		return $twig;
	}

}

new StarterSite();

// Create ACF Options page
// if(function_exists('acf_add_options_page')) {
// 	acf_add_options_page();
// }
