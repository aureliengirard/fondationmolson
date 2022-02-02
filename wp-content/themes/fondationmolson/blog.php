<?php
/**
* Template Name: Blog Page Template
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['page'] = $post;

// Get Blog posts
$posts_per_page = get_option('posts_per_page', 10);
global $paged;
if (!isset($paged) || !$paged) {
    $paged = 1;
}

$args = array(
    'post_type' => 'post',
    'posts_per_page' => $posts_per_page,
    'paged' => $paged,
);
$context['posts'] = new Timber\PostQuery($args);

Timber::render('blog.twig', $context );
