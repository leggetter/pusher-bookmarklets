<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require 'vendor/autoload.php';
require 'config.php';

$pusher = new Pusher( PUSHER_APP_KEY, PUSHER_APP_SECRET, PUSHER_APP_ID );

$data = array(
	'html' => $_POST[ 'content' ]
);
$pusher->trigger( 'stv-news', 'new-content', $data );