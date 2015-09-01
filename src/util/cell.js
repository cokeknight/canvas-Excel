define([], function(libs) {
	var cell = function(row,col){
		this.row = row;
		this.col = col;

		this.isselected = false;
		this.needpaint = false;
	}
	cell.prototype.active = function(){
		this.needpaint = true;
	}
	cell.prototype.inactive = function(){
		this.needpaint = false;
	}
	cell.prototype.select = function(){
		this.active();
		this.isselected = true;
	}
	cell.prototype.reset = function(){
		this.inactive();
		this.isselected = false;
	}


	return cell;

})