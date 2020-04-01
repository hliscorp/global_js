/**
 * Implements automatic loading of images and videos source urls only when they are in visible area. For everything to work you must insure this code runs:
 * 
 *  $("body").on("load", function() { imageDefer("lazy_loaded"); });
 * 
 * @param className Should be "lazy_loaded"
 */
function imageDefer(className) {
	var observer = new IntersectionObserver(function(entries) {
		for(var j=0; j<entries.length; j++) {
			var element = entries[j].target;
			if(entries[j].isIntersecting===true && element.src=="") {
				element.src = element.getAttribute("data-src");
			}
		}
	}, { threshold: [0] });
	var images = document.getElementsByClassName(className);
	for(var i=0; i<images.length; i++) {
		observer.observe(images[i]);
	}
}