<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require 'vendor/autoload.php';
require 'config.php';

class MyLogger {
  public function log( $msg ) {
    print_r( $msg . "<br />" );
  }
}

$pusher = new Pusher( PUSHER_APP_KEY, PUSHER_APP_SECRET, PUSHER_APP_ID );

$pusher->set_logger( new MyLogger() );

$html = <<<EOT
	<header class="mbs">
		<h1 class="h2 mbn ">
			<a href="http://local.stv.tv/edinburgh/211483-man-64-dies-after-being-hit-by-black-taxi-cab-in-edinburgh/" rel="bookmark">
											Man, 64, dies after being hit by black taxi cab in Edinburgh								</a>
		</h1>
	</header>

	<figure class="rel">
		<a href="http://local.stv.tv/edinburgh/211483-man-64-dies-after-being-hit-by-black-taxi-cab-in-edinburgh/">
			<img src="http://nfs.stvfiles.com/imagebase/7/410x230/7503-taxis-struggle-in-coatbridge.jpg" alt="">
		</a>
	</figure>
		
	<div class="entry-summary"><p>Police are appealing for anyone who witnessed the collision on Marchmont Road.</p></div>
EOT;

$data = array(
	'html' => $html
);
$pusher->trigger( 'stv-news', 'new-content', $data );