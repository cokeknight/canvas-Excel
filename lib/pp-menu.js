function TopMenu(config)
{
	config.height = 24;
	this.newMethod = Component;
	this.newMethod(config);
	delete this.newMethod;
	
	if(config.items)
	{
		this._items = config.items;
	}
	else
	{
		this._items = new Array();
	}
	
	if(config.itemClick)
	{
		this.itemClick = config.itemClick;
	}
}

TopMenu.prototype.paint = function(){
	var i,x,width,height,menuwidth,topmenu;
	width = this.getWidth();
	height = this.getHeight();
	dc = this.getDc();
	dc.strokeStyle = "#000";
	dc.strokeRect(0,0,width,height);
	dc.fillStyle = "#eee";
	dc.fillRect(0,0,width,height);
	dc.font = "16px sans-serif";
	dc.fillStyle = "#000";
	for(i=0,x=0;i<this._items.length;i++)
	{
		topmenu = new TopMenuItem(this._items[i]);
		menuwidth = topmenu.getWidth();
		dc.fillText(topmenu.getText(),x+15,20);
		x+= menuwidth;
	}
	this.releaseDc(dc);
}

TopMenu.prototype.click = function(e){
	var compos = this.getCanvasXY();
	var canpos = glGetMouseCanvasXY(e);
	var ctrx = canpos.x - compos.x;
	var ctry = canpos.y - compos.y;
	var i,x,topmenu;
	for(i=0,x=0;i<this._items.length && x < this.getWidth();i++)
	{
		topmenu = new TopMenuItem(this._items[i]);
		if(ctrx > x && ctrx < x + topmenu.getWidth())
		{
			if(this.itemClick)
			{
				this.itemClick(i,e);
			}
		}
		x += topmenu.getWidth();
	}
}

TopMenu.prototype.getItemWidth = function(index)
{
	var topmenu = new TopMenuItem(this._items[index]);
	return topmenu.getWidth();
}

TopMenu.prototype.getX = function(index)
{
	var topmenu,x,i;
	for(i=0,x=0;i<index-1;i++)
	{
		topmenu = new TopMenuItem(this._items[i]);
		x += topmenu.getWidth();
	}
	return x;
}

TopMenu.prototype.itemAdd = function(itemconfig)
{
	this._items.push(itemconfig);
}

TopMenu.prototype.itemRemove = function(index)
{
	this._items.splice();
}