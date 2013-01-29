<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>News Publishing example</title>
  <meta name="description" content="News Publishing example">
  <meta name="author" content="Phil Leggetter">
  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->

  <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/css/bootstrap-combined.min.css" rel="stylesheet" />
  <!--script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min.js"></script-->

  <link href="css/styles.css" rel="stylesheet" />
</head>
<body>
	<div class="row">
  	<div class="span2"></div>
  	<div class="span6">

  		<h3>Live news publisher</h3>
  		<p class="lead">Enter any HTML in the textarea below and click 'Publish' to instantly publish the news.</p>

  		<form id="news_form" action="publish.php" method="POST">

  			<textarea id="content" name="content" rows="10"></textarea>

  			<div class="form-actions">
				  <button class="btn btn-primary">Publish</button>
				  <button type="button" class="btn">Cancel</button>
				</div>
  			
  		</form>

  	</div>
  	<div class="span4">
  		<h4>Examples</h4>
  		<ul id="example_stories">
  		</ul>
  	</div>
	</div>

	<script id="entry-template" type="text/x-handlebars-template">
<header class="mbs">
	<h1 class="h2 mbn ">
		<a href="{{link}}" rel="bookmark">{{title}}</a>
	</h1>
</header>
<figure class="rel">
	<a href="{{link}}">
		<img src="{{enclosure.url}}" alt="">
	</a>
</figure>
<div class="entry-summary">
	<p>{{description}}</p>
</div>
	</script>

	<script src="http://code.jquery.com/jquery-1.9.0.min.js"></script>
	<script src="http://jsbeautifier.org/beautify-html.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.rc.2/handlebars.min.js"></script>
	<script>
		var stories;
		var ul;
		var storyTemplate;

		function init() {
			ul = jQuery('#example_stories');
			var source   = jQuery("#entry-template").html();
			storyTemplate = Handlebars.compile(source);

			jQuery( '#news_form' ).submit( handleSubmit );

			jQuery.getJSON( 'http://pipes.yahoo.com/pipes/pipe.run?_id=14996b4f9951166153f89bbbf3795515&_render=json', function( data ) {
					stories = data.value.items;

					listStories();
			} );	
		}

		function listStories() {

			jQuery.each( stories, function( i, story ) {
				ul.append( '<li data-index="' + i + '">' + story.title + '</li>' );
			} );

			ul.find( 'li' ).on( 'click', storyClicked );
		}

		function storyClicked() {
			var el = $( this );
			var index = parseInt( el.attr( 'data-index' ), 10 );
			var story = stories[ index ];
			console.log( story );
			var html = storyTemplate( story );
			console.log( html );
			$( '#content' ).val( style_html( html, { indent_size: 2 } ) );
		}

		function handleSubmit() {
			var html = jQuery( '#content' ).val();
			jQuery.ajax( {
				url: 'publish.php',
				type: 'post',
				data: {
					content: html
				}
			} );
			
			return false;
		}

		jQuery( init );
	</script>
</body>
</html>