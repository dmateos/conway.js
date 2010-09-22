/**
 Copyright (c) 2010 Daniel Mateos

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
*/

(function() {
	/* Draws and updates a conway pool every x seconds, added to jquery as a plugin. */
	jQuery.fn.conway = function(pool, timer, colour) {
		var canvas = this[0];
		var context = canvas.getContext('2d');
		var xblocksize = (canvas.width / pool.xsize);
		var yblocksize = (canvas.height / pool.ysize);
		var interval;

		/* Draws the pool to a canvas. */
		draw_update = function() {
			context.clearRect(0,0,canvas.width,canvas.height);
			context.fillStyle = colour;
			for(var x = 0; x < pool.xsize; x++) {
				for(var y  = 0; y < pool.ysize; y++) {
					if(pool.data[x][y] == 1) {
						context.fillRect(x*xblocksize, y*yblocksize, xblocksize, yblocksize);
					}
				}
			}
			/* Update the pool state. */
			pool.comp_pool();
		}

		/* Draw new cells on mouse click. */
		$(canvas).mousedown(function(e) {
			var xmouse = Math.round(((e.pageX-$(canvas).offset().left)/xblocksize))-1;
			var ymouse = Math.round(((e.pageY-$(canvas).offset().top)/yblocksize))-1;
			pool.data[xmouse][ymouse] = 1;
		});

		/* Draw initial pool and set the callback timer. */
		draw_update();
		interval = window.setInterval(draw_update, timer);	
	};
})();
