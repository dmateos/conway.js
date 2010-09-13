(function() {
	/* Draws and updates a conway pool every x seconds, added to jquery as a plugin. */
	jQuery.fn.conway = function(pool, timer, blocksize, colour) {
		var canvas = this[0];
		var context = canvas.getContext('2d');
		canvas.width = pool.xsize * blocksize;
		canvas.height = pool.ysize * blocksize;

		/* Draw the pool to a canvas. */
		draw_update = function() {
			context.clearRect(0,0,canvas.width,canvas.height);
			context.fillStyle = colour;
			for(var x = 0; x < pool.xsize; x++) {
				for(var y  = 0; y < pool.ysize; y++) {
					if(pool.data[x][y] == 1) {
						var xloc = x * blocksize;
						var yloc = y * blocksize;
						context.fillRect(xloc, yloc, blocksize, blocksize);
					}
				}
			}
			/* Update the pool state. */
			pool.comp_pool();
		}

		/* Draw initial pool and set the callback timer. */
		draw_update();
		window.setInterval(draw_update, timer);		
	};
})();
