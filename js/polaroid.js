(function($) {
	
	'use strict';
	
	$.fn.polaroid = function(param) {
		
		if(this.length > 1) {
			this.forEach(function() {
				$(this).polaroid(param);
			});
			return;
		}
		
		var self = $(this),
			items = self.children(),
			rotate = 0,
			options = $.extend({
				click: function() {}
			}, param),
			rand = function(offset, range) {
				
				offset = offset || 10;
				range = range || 80;
				
				return Math.floor((Math.random() * range) + offset);
			};
		
		
		/**
		 * Init polaroid 
		 */
		var init = function() {
			
			if(!self.length) {
				console.log('error: empty object');
				return;
			}
			
			if(!items.length) {
				console.log('error: empty items');
				return;
			}
			
			initPosition();
			randomPosition(items, false);
			click();
		};
		
		
		/**
		 * Set random position
		 * @param jQuery itemList
		 * @param boolean hide
		 */
		var randomPosition = function(itemList, hide) {
			
			itemList.each(function(i, item) {
				
				rotate = rand(10, 30) * (rand() > 50 ? 1 : -1);
				
				if(hide) {
					$(item).removeClass('active').addClass('hide');
				}
				
				$(item).css({
					left: rand() + '%',
					top: rand() + '%',
					transform: 'scale(1) rotate(' + rotate + 'deg) translate(-50%, -50%)'
				});
			});
		};
		
		
		/**
		 * Click event 
		 */
		var click = function() {
			
			items.click(function(e) {
				e.stopPropagation();
				
				randomPosition(items.not(this), true);
				
				$(this)
					.removeAttr('style')
					.removeClass('hide')
					.addClass('active');
					
				if(typeof options.click === 'function') {
					options.click($(this));
				}
			});
			
			self.click(function() {
				items.removeClass('hide active');
				randomPosition(items, false);
			});
		};
		
		
		/**
		 * Set initial position images 
		 */
		var initPosition = function() {
			
			items.each(function(i, item) {
				$(item).css({
					left: rand() + '%',
					top: rand() + '%'
				});
			});
		};
		
		init();
	};
	
})(jQuery);
