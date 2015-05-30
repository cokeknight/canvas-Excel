// JavaScript Document
function Component(config)
{
    /*
    this._type = "component";
    this._x
    this._y
    this._width
    this._height
    this._visible
    this._parent
    this._comItems

    
    this.getX
    this.setX
    this.getY
    this.setY
    this.getCanvasXY
    this.getWidth
    this.setWidth
    this.getHeight
    this.setHeight
    this.getParent
    this.setParent
    this.getVisible
    this.setVisible
    this.comItemAdd
    this.getComItems
    this.comItemRemove
    this.comItemRemoveAt
    this.sysclick
    this.sysdblclick
    this.sysmousedown
    this.sysmousemove
    this.sysmouseup
    this.sysmousewheel
    
    this.click;
    this.dblclick;
    this.mousedown;
    this.mousemove;
    this.mouseup;
    this.mousewheel;
    */
	
    this._type = "component";
    this._dcFlag = false;
    if(config.x != undefined)
    {
        this._x = config.x;
    }
    else
    {
        this._x =0;
    }
    
    if(config.y != undefined)
    {
        this._y = config.y;
    }
    else
    {
        this._y = 0;
    }
    
    if(config.width != undefined)
    {
        this._width = config.width;
    }
    else
    {
        this._width = 50;
    }
    
    if(config.height != undefined)
    {
        this._height = config.height;
    }
    else
    {
        this._height = 30;
    }
    
    if(config.visible != undefined)
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
        this._visible = true;
    }
    
    if(config.parent != undefined)
    {
        
        this._parent = config.parent;
    }
    else
    {
        this._parent = null;
    }
    
    if(config.comItems != undefined)
    {
        this._comItems = config.comItems;
        var i;
        for(i=0;i<this._comItems;i++)
        {
            if(this._comItems[i].getType() == "component")
            {
                this._comItems[i].setParent(this);
            }
            else
            {
                alert("config error:comItems's element should be component class");
                break;
            }
        }
    }
    else
    {
        this._comItems = new Array();
    }
    if(config.localStorageName)
	{
		this.localStorageName=config.localStorageName;
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
	    this.paint = config.paint;
	}
	
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
		return this._y;   
	}
	
	this.setY = function(y)
	{
		this._y = y;
	}
	
	this.getCanvasXY = function()
	{
		var x=this.getX(),y=this.getY();
		var parent = this;
		while(parent.getType() != "window")
		{
			parent = parent.getParent();
			x += parent.getX();
			y += parent.getY();
		}
		return {x:x,y:y};
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
	
	this.getParent = function()
	{
		return this._parent;
	}
	
	this.setParent = function(winorcom)
	{
		this._parent = winorcom;
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
			alert('visible property should be boolean type');
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
			alert("paramter error:component should be component class");
		}
	}
	
	this.comItemRemove = function(component)
	{
		this._comItems.remove(component);
	}
	
	this.comItemRemoveAt = function(index)
	{
		this._comItems.removeAt(index);
	}
	
	this.getComItems = function()
	{
		return this._comItems;
	}
	
	
	this.getDc = function()
	{
		if(this._dcFlag)
		{
			return this._dc
		}
		else
		{
			this._dc = glGetDrawContext();
			this._dc.save();
			this._dc.translate(this.getCanvasXY().x,this.getCanvasXY().y);
			this._dcFlag = true;
			return this._dc
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
		dc.fillRect(0,0,this._width,this._height);
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
				
				
					if(_gl_filename !== undefined){
						if(i==0){
						//var now=new Date(); 
						//var number = now.getYear().toString()+now.getMonth().toString()+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString();
	
						this._comItems[i].importxml('html/upload/'+_gl_filename);
						continue;
					}else{
						this._comItems[i].syspaint();		
					}
				}else{
					dc.font="20px sans-serif";
					dc.fillText('请选择左侧数据表或者新建一张使用',this._width/4,this._height/2);
				}

				
			}
		}
	}
	
	
	this.sysclick = function(e)
	{
		var i,mousepos,compos;
		for(i = (this._comItems.length-1); i>=0 ;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this._comItems[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this._comItems[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this._comItems[i].getHeight())
			{
				if(this._comItems[i].getVisible())
				{
					if(this._comItems[i].sysclick)
					{
						this._comItems[i].sysclick(e);
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
		var i,mousepos,compos;
		for(i = (this._comItems.length-1); i>=0 ;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this._comItems[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this._comItems[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this._comItems[i].getHeight())
			{
				if(this._comItems[i].getVisible())
				{
					if(this._comItems[i].sysdblclick)
					{
						this._comItems[i].sysdblclick(e);
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
		var i,mousepos,compos;
		for(i = (this._comItems.length-1); i>=0 ;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this._comItems[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this._comItems[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this._comItems[i].getHeight())
			{
				if(this._comItems[i].getVisible())
				{
					if(this._comItems[i].sysmousedown)
					{
						this._comItems[i].sysmousedown(e);
					}
					break;
				}
			}
		}
		if(i<0)
		{
			glSetMouseFocusEl(this);
			if(this.mousedown)
			{
				this.mousedown(e);
			}
		}
	}
	
	this.sysmousemove = function(e)
	{
		if(glGetMouseState())
		{
			if(this.mousemove)
			{
				this.mousemove(e);
			}
		}
		else
		{
			var i,mousepos,compos;
			for(i = (this._comItems.length-1); i>=0 ;i--)
			{
				mousepos = glGetMouseCanvasXY(e);
				compos = this._comItems[i].getCanvasXY();
				if(mousepos.x > compos.x
					&& mousepos.x < compos.x + this._comItems[i].getWidth()
					&& mousepos.y > compos.y
					&& mousepos.y < compos.y + this._comItems[i].getHeight())
				{
					if(this._comItems[i].getVisible())
					{
						if(this._comItems[i].sysmousemove)
						{
							this._comItems[i].sysmousemove(e);
						}
						break;
					}
				}
			}
			if(i<0)
			{
				glSetMouseFocusEl(this);
				if(this.mousemove)
				{
					this.mousemove(e);
				}
			}
		}
	}
	
	this.sysmouseup = function(e)
	{
	    if(this.mouseup)
		{
			this.mouseup(e);
		}
	}
	
	this.sysmousewheel = function(e)
	{
		var i,mousepos,compos;
		for(i = (this._comItems.length-1); i>=0 ;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this._comItems[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this._comItems[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this._comItems[i].getHeight())
			{
				if(this._comItems[i].getVisible())
				{
					if(this._comItems[i].sysmousedown)
					{
						this._comItems[i].sysmousewheel(e);
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
