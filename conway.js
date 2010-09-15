/*
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

var Pool = function(xsize, ysize) {
	/* Setup the 2d data pool. */
	this.data = new Array(xsize);
	for(var x = 0; x < xsize; x++) {
		this.data[x] = new Array(ysize);
		for(var y = 0; y < ysize; y++) {
			this.data[x][y] = 0;
		}
	}

	/* Size of the pool and blocksize of each cell. */
	this.xsize = xsize;
	this.ysize = ysize;
	this.locked = false; /* Lock the pool from updates. */
	this.generations = 0;
	this.CompDone;
};

/* Inits a pool with a randomish set of cells. */
Pool.prototype.init_pool_rand = function() {
	for(var x = 0; x < this.xsize; x++) {
		for(var y = 0; y < this.ysize; y++) {
			this.data[x][y] = !Math.round(Math.random());
		}
	}
	this.generations = 0;
};

/* Inits the pool with a fresh state. */
Pool.prototype.init_pool_clear = function() {
	for(var x = 0; x < this.xsize; x++) {
		for(var y = 0; y < this.ysize; y++) {
			this.data[x][y] = 0;
		}
	}
	this.generations = 0;
};

/* Copies a pools state into a new object. */
Pool.prototype.copy_pool = function() {
	var copy = new Array(this.xsize);
	for(var x = 0; x < this.xsize; x++) {
		copy[x] = new Array(this.ysize);
		for(var y = 0; y < this.ysize; y++) {
			copy[x][y] = this.data[x][y];
		}
	}
	return copy;
};

/* Calculates cells adjacent to the one specified. */
Pool.prototype.neighbour_count = function(data, x, y) {
	var ncount = 0;
	/* LEFT */
	if((x-1 >= 0) && data[x-1][y] == 1)
		ncount++;
	/* RIGHT */
	if((x+1 < this.xsize) && data[x+1][y] == 1) 
		ncount++;
	/* UP */
	if((y-1 >= 0) && data[x][y-1] == 1)
		ncount++;
	/* DOWN */
	if((y+1 < this.ysize) && data[x][y+1] == 1)
		ncount++;
	/* UP LEFT */
	if((x-1 >= 0) && (y-1 >= 0) && data[x-1][y-1] == 1)
		ncount++;
	/* UP RIGHT. */
	if((x+1 < this.xsize) && (y-1 >= 0) && data[x+1][y-1] == 1)
		ncount++;
	/* DOWN LEFT */
	if((x-1 >= 0) && (y+1 < this.ysize) && data[x-1][y+1] == 1)
		ncount++;
	/* DOWN RIGHT */ 
	if((x+1 < this.xsize) && (y+1 < this.ysize) && data[x+1][y+1] == 1) 
		ncount++;
	
	return ncount;
};

/* Computes the cell pool as per the rules specified in conways game of life. */
Pool.prototype.comp_pool = function() {
	var poolstate = this.copy_pool();

	/* If the pool is locked, cant do shit. */
	if(this.locked) 
		return;

	for(var x = 0; x < this.xsize; x++) {
		for(var y = 0; y < this.ysize; y++) {
			var ncount = this.neighbour_count(poolstate, x, y);
			var state = this.data[x][y];

			switch(ncount) {
				case 0:
				case 1:
					if(state == 1)
						this.data[x][y] = 0;
					break;
				case 2:
					break;
				case 3:
					if(state == 0)
						this.data[x][y] = 1;
					break;
				default:
					if(state == 1)
						this.data[x][y] = 0;
					break;
			}	
		}
	}
	this.generations++;
	if(this.CompDone);
		this.CompDone();
};
