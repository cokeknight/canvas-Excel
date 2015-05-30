// JavaScript Document
define([], function(libs) {
	var Window = function(config){
		this.type = "window";
		this.dcFlag = false;
		this.x = config.x || 0;
		this.y = config.y || 0;
		this.width = config.width || 300;
		this.height = config.height || 200;
		this.visible = config.visible || false;
		this.parent = config.parent || null;
		config.comItems ? this.setComItems(config.comItems) : this.comItems=[];
		config.winItems ? this.setWinItems(config.winItems) : this.winItems=[];
		this.click = config.click || null;
	    this.dblclick = config.dblclick|| null;
	    this.mousedown = config.mousedown|| mousedown;
	    this.mousemove = config.mousemove|| mousemove;  
	    this.mouseup = config.mouseup|| mouseup;  
	  	this.mousewheel = config.mousewheel|| mousewheel;  
	    this.paint =config.paint|| paint;  
	}
	Window.prototype={
		constructor : window,
		setComItems : function(comItems){
			this.comItems = [];
		    for(i=0;i<comItems.length;i++)
		    {
		        this.comItems[i].setParent(this);
		    }
		},
		setWinItems : function(winItems){
			this.winItems = [];
		    for(var i=0;i<winItemss.length;i++)
		    {
		        this.winItems[i].setParent(this);
		    }
		},
		getCanvasXY = function(){
		return {x:this.x,y:this.y};
		},
		setParent = function(parentwin){
			if(parentwin.getType() == "window")
			{
				this._parent = parentwin;
			}
			else
			{
				throw("window's parent must be class window, what you send is"+parentwin.getType());
			}
		},
		/*负责界面绘制及更新着一块*/
		
		getDc = function()
		{
			if(!this.dcFlag)
			{
				this.dc = glGetDrawContext();
				this.dc.save();
				this.dc.translate(this.getCanvasXY().x, this.getCanvasXY().y);
				this.dcFlag = true;
				return this.dc;
			}
			else
			{
				return this.dc;
			}
		},
		releaseDc = function(dc){
			dc = null;
			if(this._dcFlag)
			{
				this._dc.restore();
				this._dc = null;
				this._dcFlag = false;
			}
		}
	
	syspaint = function(){
			var dc = this.getDc();
			dc.fillStyle = "#fff";
			dc.fillRect(0,0,this._x,this._y);
			this.releaseDc(dc);
			if(this.paint)
			{
				this.paint();
			}
			var i;
			for(i=0;i<this._comItems.length;i++)
			{
				if(this._comItems[i].getVisible())
				{
					this._comItems[i].syspaint();
				}
			}
			
			for(i=0;i<this._winItems.lenth;i++)
			{
				if(this._winItems[i].getVisible())
				{
					this._winItems[i].syspaint();
				}
			}
		}
	
	
	
	

});

