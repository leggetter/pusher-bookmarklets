( function() {

	Pusher.log = log;

	// store pending updates to be shown
	var pendingUpdates = [];

	// connect to Pusher
	var pusher = new Pusher( 'ea27905cc22a754790ff', { encrypted: true } );

	// subscribe to the channel that news events will be received on
	var newsChannel = pusher.subscribe( 'stv-news' );

	// bind to event triggered when news is published
	newsChannel.bind( 'new-content', newContent );

	// handle the new incoming content by showing a notifications
	function newContent( data ) {
		pendingUpdates.push( data );
		var pendingCount = pendingUpdates.length;
		var el = getNotificationEl();
		el.find( '.pending-count' ).text( pendingCount );
		el.find( '.pending-text' ).text( 'New update' + ( pendingCount > 1? 's' : '' ) );
		el.show();
	}

	// show any pending update content
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

	// helper to access the notification element at the top of the page
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

	function log( msg ) {
		if( window.console && window.console.log ) {
			console.log( msg );
		}
	}

})();