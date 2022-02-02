<?php
/**
* Template Name: Home Page Template
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['page'] = $post;

// Latest Posts
$args = array(
    'post_type' => 'post',
    'orderby' => 'date',
    'order' => 'DESC',
    'posts_per_page' => 3,
);
$context['posts'] = Timber::get_posts( $args );

Timber::render('home.twig', $context);
