var Pool = function(size) {
	/* Setup the 2d data pool. */
	this.data = new Array(size);
	for(var x = 0; x < size; x++) {
		this.data[x] = new Array(size);
		for(var y = 0; y < size; y++) {
			this.data[x][y] = 0;
		}
	}

	/* Size of the pool and blocksize of each cell. */
	this.size = size;
};

/* Inits a pool with a randomish set of cells. */
Pool.prototype.init_pool_rand = function() {
	for(var x = 0; x < this.size; x++) {
		for(var y = 0; y < this.size; y++) {
			this.data[x][y] = !Math.round(Math.random());
		}
	}
};

/* Copies a pools state into a new object. */
Pool.prototype.copy_pool = function() {
	var copy = new Array(this.size);

	for(var x = 0; x < this.size; x++) {
		copy[x] = new Array(this.size);
		for(var y = 0; y < this.size; y++) {
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
	if((x+1 < this.size) && data[x+1][y] == 1) 
		ncount++;
	/* UP */
	if((y-1 >= 0) && data[x][y-1] == 1)
		ncount++;
	/* DOWN */
	if((y+1 < this.size) && data[x][y+1] == 1)
		ncount++;
	/* UP LEFT */
	if((x-1 >= 0) && (y-1 >= 0) && data[x-1][y-1] == 1)
		ncount++;
	/* UP RIGHT. */
	if((x+1 < this.size) && (y-1 >= 0) && data[x+1][y-1] == 1)
		ncount++;
	/* DOWN LEFT */
	if((x-1 >= 0) && (y+1 < this.size) && data[x-1][y+1] == 1)
		ncount++;
	/* DOWN RIGHT */ 
	if((x+1 < this.size) && (y+1 < this.size) && data[x+1][y+1] == 1) 
		ncount++;
	
	return ncount;
};

/* Computes the cell pool as per the rules specified in conways game of life. */
Pool.prototype.comp_pool = function() {
	var poolstate = this.copy_pool();

	for(var x = 0; x < this.size; x++) {
		for(var y = 0; y < this.size; y++) {
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
};
