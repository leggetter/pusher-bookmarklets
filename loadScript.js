(function(){

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
	
	var url = prompt( "URL of script?" );
	loadScript( url );

})();