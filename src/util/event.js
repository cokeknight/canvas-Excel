define([], function(libs) {
	var event = function(){
		this.ctx = null;

	}


	event.prototype.setContext = function(ctx){
		this.ctx = ctx;
		return this;
	}

	event.prototype.initialize = function(){

	}

	return new event();
})