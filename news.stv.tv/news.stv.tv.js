(function(){

	// for: http://news.stv.tv/

	function loadScript( url, callback ) {
		var done = false;
		var script = document.createElement("script");
		script.src = url;
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				callback();
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
		loadScript( 'http://js.pusher.com/1.12/pusher.min.js', pusherLoaded );
	}

	function log( msg ) {
		if( window.console && window.console.log ) {
			console.log( msg );
		}
	}

	var pusher;
	var newsChannel;
	var pendingUpdates = [];
	function pusherLoaded() {
		log( 'pusher-js loaded' );

		Pusher.log = log;

		pusher = new Pusher( 'ea27905cc22a754790ff', { encrypted: true } );
		newsChannel = pusher.subscribe( 'stv-news' );
		newsChannel.bind( 'new-content', newContent );
	}

	var notifictionEl;
	function getNotificationEl() {
		if( !notifictionEl ) {
			notifictionEl = jQuery( '<div class="news-update-notification">' +
																'<span class="pending-count">' +
																'</span>' +
																'<span class="pending-text">' +
																'</span>' +
															'</div>' );

			notifictionEl.bind( 'click', showPendingUpdates );
			var topEl = jQuery( '.article-top-story' );
			topEl.prepend( notifictionEl );
		}
		return notifictionEl;
	}

	function newContent( data ) {
		pendingUpdates.push( data );
		var pendingCount = pendingUpdates.length;

		log( 'new-content. pending count: ' + pendingCount );

		var el = getNotificationEl();
		el.find( '.pending-count' ).text( pendingCount );
		el.find( '.pending-text' ).text( 'New update' + ( pendingCount > 1? 's' : '' ) );
		el.show();
	}

	function showPendingUpdates() {
		var el = getNotificationEl();
		el.hide();

		var data;
		var newsEl;
		while( pendingUpdates.length > 0 ) {		
			data = pendingUpdates.shift();
			newsEl = jQuery( '<article class="hentry clearfix" />' );
			newsEl.html( data.html );
			newsEl.hide();
			el.after( newsEl );
			newsEl.slideDown();
		}
	}

})();