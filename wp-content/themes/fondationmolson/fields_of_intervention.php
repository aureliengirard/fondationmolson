<?php
/**
* Template Name: Fields of Intervention Page Template
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['page'] = $post;

Timber::render('fields_of_intervention.twig', $context);
