(function(){

	// bookmarklet for: http://news.stv.tv/

	function loadScript( url, callback ) {
		var done = false;
		var script = document.createElement("script");
		script.src = url;
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				if( callback ) {
					callback();
				}
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	function loadCss( url ) {
		var link = document.createElement( 'link' );
		link.rel = 'stylesheet';
		link.href = url;
		document.getElementsByTagName("head")[0].appendChild(link);
	}

	var v = "1.9.0";

	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		loadScript( "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.js", init );
	}
	else {
		init();
	}
	
	function init() {
		loadCss( 'http://localhost/pusher-dev/git/pusher-bookmarklets/news.stv.tv/news.stv.tv.css' );
		loadScript( 'http://js.pusher.com/1.12/pusher.min.js', function() {
			loadScript( 'http://localhost/pusher-dev/git/pusher-bookmarklets/news.stv.tv/news.stv.tv.pusher.js' );
		} );
	}

})();