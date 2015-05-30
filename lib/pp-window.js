// JavaScript Document
function Window(config)
{
	/*
	property:
	this._x
	this._y
	this._width
	this._height
	this._parent
	this._comItems
	this._winItems
	this._visible
	this._dcFlag
	
	function:
	this.getX
	this.setX
	this.getY
	this.setY
	this.getWidth
	this.setWidth
	this.getHeight
	this.setHeight
	this.getCanvasXY
	this.getParent
	this.setParent
	this.getVisible
	this.setVisible
	this.comItemAdd
	this.getComItems
	this.comItemRemove
	this.comItemRemoveAt
	this.winItemAdd
	this.getWinItems
	this.winItemRemove
	this.winItemRemoveAt
	this.sysclick
	this.sysdblclick
	this.sysmousedown
	this.sysmousemove
	this.sysmouseup
	this.sysmousewheel
	this.syskeydown
	
	
	event:
	this.click
	this.dblclick
	this.mousedown
	this.mousemove
	this.mouseup
	this.mousewheel
	*/
	this._type = "window";
	this._dcFlag = false;
	if(config.x!= undefined)
	{
	    this._x = config.x;
	}
	else
	{
	    this._x = 0;
	}
	
	if(config.y!= undefined)
	{
	    this._y = config.y;
	}
	else
	{
	    this._y = 0;
	}
	
	if(config.width!= undefined)
	{
	    this._width = config.width;
	}
	else
	{
	    this._width = 300;
	}
	
	if(config.height!= undefined)
	{
	    this._height = config.height;
	}
	else
	{
	    this._height = 200;
	}
	
	if(config.visible!= undefined)
	{
	    if(typeof(config.visible) == "boolean")
	    {
	        this._visible = config.visible;
	    }
	    else
	    {
	        alert("config error:visible should be boolean");
	    }
	}
	else
	{
	    this._visible = false;
	}
	
	if(this.parent!= undefined)
	{
	    this._parent = config.parent;
	}
	else
	{
	    this._parent = null;
	}
	
	if(config.comItems!= undefined)
	{
	    this._comItems = config.comItems;
	    var i;
	    for(i=0;i<this._comItems.length;i++)
	    {
	        this._comItems[i].setParent(this);
	    }
		
	}
	else
	{
	    this._comItems = new Array();
	}
	
	if(config.winItems!= undefined)
	{
	    this._winItems = config.comItems;
	    var i;
	    for(i=0;i<this._winItems.length;i++)
	    {
	        this._winItems[i].setParent(this);
	    }
	}
	else
	{
	    this._winItems = new Array();
	}
	
	if(config.click)
	{
	    this.click = config.click;
	}
	
	if(config.dblclick)
	{
	    this.click = config.dblclick;
	}
	
	if(config.mousedown)
	{
	    this.mousedown = config.mousedown;
	}
	
	if(config.mousemove)
	{
	    this.mousemove = config.mousemove;   
	}
	
	if(config.mouseup)
	{
	    this.mouseup = config.mouseup;
	}
	
	if(config.mousewheel)
	{
	    this.mousewheel = config.mousewheel;
	}
	if(config.paint)
	{
	    this.paint =config.paint;
	}
	/*一般的函数*/
	this.getType = function()
	{
		return this._type;
	}
	
	this.getX = function()
	{
		return this._x;
	}
	
	this.setX = function(x)
	{
		this._x = x;
	}
	
	this.getY = function()
	{
		return this._y
	}
	
	this.setY = function(y)
	{
		this._y = y;
	}
	
	this.getWidth = function()
	{
		return this._width;
	}
	
	this.setWidth = function(width)
	{
		this._width = width;
	}
	
	this.getHeight = function()
	{
		return this._height;
	}
	
	this.setHeight = function(height)
	{
		this._height = height;
	}
	
	this.getCanvasXY = function()
	{
		return {x:this._x,y:this._y};
	}
	
	this.getParent = function()
	{
		return this._parent;
	}
	
	this.setParent = function(parentwin)
	{
		if(parentwin.getType() == "window")
		{
			this._parent = parentwin;
		}
		else
		{
			alert("window's parent must be class window, what you send is"+parentwin.getType());
		}
		
	}
	
	this.getVisible = function()
	{
		return this._visible;
	}
	
	this.setVisible = function(visible)
	{
		if(typeof(visible) == "boolean")
		{
			this._visible = visible;
		}
		else
		{
			alert('visible should be boolean');
		}
	}
	
	this.comItemAdd = function(component)
	{
		if(component.getType() == "component")
		{
			component.setParent(this);
			this._comItems.push(component);
		}
		else
		{
			alert("paremter error:component should be component class");
		}
	}
	
	this.getComItems = function()
	{
		return this._comItems;
	}
	
	this.comItemRemove = function(component)
	{
		this._comItems.remove(component);
	}
	
	this.comItemRemoveAt = function(index)
	{
		this._comItems.removeAt(index);
	}
	
	this.getWinItems = function()
	{
		return this._winItems;
	}
	
	this.winItemAdd = function(pwindow)
	{
		if(component.getType() == "window")
		{
			pwindow.setParent(this);
			this._winItems.push(pwindow);
		}
		else
		{
			alert("paramter error:pwindow should be window class");
		}
	}
	
	this.winItemRemove = function(pwindow)
	{
		this._winItems.push(pwindow);
	}
	
	this.winItemRemoveAt = function(index)
	{
		this._winItems.removeAt(index);
	}
	/*负责界面绘制及更新着一块*/
	
	this.getDc = function()
	{
		if(!this._dcFlag)
		{
			this._dc = glGetDrawContext();
			this._dc.save();
			this._dc.translate(this.getCanvasXY().x, this.getCanvasXY().y);
			this._dcFlag = true;
			return this._dc;
		}
		else
		{
			return this._dc;
		}
	}
	this.releaseDc = function(dc)
	{
		dc = null;
		if(this._dcFlag)
		{
			this._dc.restore();
			this._dc = null;
			this._dcFlag = false;
		}
	}
	
	this.syspaint = function()
	{
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
	
	/*负责消息传递*/
	
	this.sysclick = function(e)//windows组件ExtDataGrid 继承自component
	{
		var i,compos,mousepos; 
		for(i = (this.getComItems().length -1);i>=0;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this.getComItems()[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this.getComItems()[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this.getComItems()[i].getHeight())
			{
				if(this.getComItems()[i].getVisible())
				{
					if(this.getComItems()[i].sysclick)
					{
						this.getComItems()[i].sysclick(e);
					}
					break;
				}
			}
		}
		
		if(i<0)
		{
			if(this.click)
			{
				this.click(e);
			}
		}
	}
	
	
	
	
	this.sysdblclick = function(e)
	{
		var i,compos,mousepos;
		for(i = (this.getComItems().length -1);i>=0;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this.getComItems()[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this.getComItems()[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this.getComItems()[i].getHeight())
			{
				if(this.getComItems()[i].getVisible())
				{
					if(this.getComItems()[i].sysdblclick)
					{
						this.getComItems()[i].sysdblclick(e);
					}
					break;
				}
			}
		}
		
		if(i<0)
		{
			if(this.dblclick)
			{
				this.dblclick(e);
			}
		}
	}
	
	this.sysmousedown = function(e)
	{
		glSetMouseFocusWin(this);
		var i,compos,mousepos;
		for(i = (this.getComItems().length -1);i>=0;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this.getComItems()[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this.getComItems()[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this.getComItems()[i].getHeight())
			{
				if(this.getComItems()[i].getVisible())
				{
					if(this.getComItems()[i].sysmousedown)
					{
						this.getComItems()[i].sysmousedown(e);
					}
					break;
				}
			}
		}
		
		if(i<0)
		{
			if(this.mousedown)
			{
				this.mousedown(e);
			}
		}
	}
	
	this.sysmousemove = function(e)
	{
		var i,compos,mousepos;
		if(glGetMouseState())
		{
			if(glGetMouseFocusEl() != null)
			{
				if(glGetMouseFocusEl().sysmousemove)
				{
					glGetMouseFocusEl().sysmousemove(e);
				}
			}
			else
			{
				if(this.mousemove)
				{
					this.mousemove(e);
				}
			}
		}
		else
		{
			for(i = (this.getComItems().length -1);i>=0;i--)
			{
				mousepos = glGetMouseCanvasXY(e);
				compos = this.getComItems()[i].getCanvasXY();
				if(mousepos.x > compos.x
					&& mousepos.x < compos.x + this.getComItems()[i].getWidth()
					&& mousepos.y > compos.y
					&& mousepos.y < compos.y + this.getComItems()[i].getHeight())
				{
					if(this.getComItems()[i].getVisible())
					{
						if(this.getComItems()[i].sysmousemove)
						{
							this.getComItems()[i].sysmousemove(e);
						}
						break;
					}
				}
			}
			
			if(i<0)
			{
				if(this.mousemove)
				{
					this.mousemove(e);
				}
			}
		}
	}
	
	this.sysmouseup = function(e)
	{
		glSetMouseFocusWin(null);
		if(glGetMouseFocusEl() != null)
		{
			glGetMouseFocusEl().sysmouseup(e);
		}
		else
		{
			if(this.mouseup)
			{
				this.mosueup(e);
			}
		}
	}
	
	this.sysmousewheel = function(e)
	{
		var i,compos,mousepos;
		for(i = (this.getComItems().length -1);i>=0;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this.getComItems()[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this.getComItems()[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this.getComItems()[i].getHeight())
			{
				if(this.getComItems()[i].getVisible())
				{
					if(this.getComItems()[i].sysmousewheel)
					{
						this.getComItems()[i].sysmousewheel(e);
					}
					break;
				}
			}
		}
		
		if(i<0)
		{
			if(this.mousewheel)
			{
				this.mousewheel(e);
			}
		}
	}
	
}

