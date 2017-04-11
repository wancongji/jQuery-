;(function ($, window, document, undefined) {	
	var Carousel = function(option) {
		this.defaults = {
			moveTime : 'slow',
			waitTime : 'slow',
			direction : 'left'
		}
		this.options = $.extend({}, this.defaults, option)
	}


	carousel.move = {

	}

	$.fn.myPlugin = function(option) {
		var Carousel = new carousel(option)
		return Carousel.move()
	}
})(jQuery, window, document)