<?php
/**
* Template Name: Partners Page Template
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['page'] = $post;

Timber::render('partners.twig', $context);