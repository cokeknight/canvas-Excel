// JavaScript Document
/*
extand from component
extand property:
            x
            y
            width
            height
            comitems
            parent
*/

function ScrollBar(config)
{
    
    
    this.newMethod = Component;
    this.newMethod(config);
    delete this.newMethod;
	
	if(config.dirType != undefined)
	{
		this._dirType = config.dirType;
	}
	else
	{
		this._dirType = "x";
	}
	if(config.length != undefined)
	{
		this._length = config.length;
	}
	else
	{
		this._length = 400;
	}
	if(config.barWidth != undefined)
	{
		this._barWidth = config.barWidth;
	}
	else
	{
		this._barWidth = 20;
	}
	if(this._dirType == "y")
	{
		this._width = this._barWidth;
		this._height = this._length;
	}
	else
	{
		this._width = this._length;
		this._height = this._barWidth;
	}
	
	if(config.scrollBarLength != undefined)
	{
		this._scrollBarLength = config.scrollBarLength;
	}
	else
	{
		this._scrollBarLength = this._length;
	}
	if(config.scrollLength != undefined)
	{
	    this._scrollLength = config.scrollLength;
	}
	else
	{
	    this._scrollLength = 0;
	}
	
	/*辅助属性*/
	this._mousedown_focus = "";
	this._oldScrollLength;
	this._oldMousePos;
	if(config.leftarrowmousedown)
	{
	    this.leftarrowmousedown = config.leftarrowmousedown;
	}
	if(config.leftarrowmouseup)
	{
	    this.leftarrowmouseup = config.leftarrowmouseup;
	}
	if(config.leftblankmousedown)
	{
	    this.leftblankmousedown = config.leftblankmousedown;
	}
	if(config.leftblankmouseup)
	{
	    this.leftblankmouseup = config.leftblankmouseup;
	}
	if(config.scrollbarmousemove)
	{
	    this.scrollbarmousemove = config.scrollbarmousemove;
	}
	if(config.scrollbarmouseup)
	{
	    this.scrollbarmouseup = config.scrollbarmouseup;
	}
	if(config.rightblankmousedown)
	{
	    this.rightblankmousedown = config.rightblankmousedown;
	}
	if(config.rightblankmouseup)
	{
	    this.rightblankmouseup = config.rightblankmouseup;
	}
	if(config.rightarrowmousedown)
	{
	    this.rightarrowmousedown = config.rightarrowmousedown;
	}
	if(config.rightarrowmouseup)
	{
	    this.rightarrowmouseup = config.rightarrowmouseup;
	}
	
    
    /* extra property:
                direction 
                length
                scrollbarlength
                scrolllength
				
    interface function:
    this.getLength()
    this.setLength()
    this.getScrollbarLength()
    this.setScrollbarLength()
    this.getScrollLength()
    this.setScrollLength()
    
    draw function:

    
    
    user event interface function:
    this.click
    this.dblclick
    this.mousedown
    this.mousemove
    this.mouseup
    this.mousewheel
    
    this.leftArrowClick
    this.leftArrowDblClick
    this.leftArrowMouseDown
    this.leftArrowMouseMove
    this.leftArrowMouseUp
    this.leftArrowMouseWheel
    
    this.leftBlankClick
    this.leftBlankDblClick
    this.leftBlankMouseDown
    this.leftBlankMouseMove
    this.leftBlankMouseUp
    this.leftBlankMouseWheel
    
    this.barClick
    this.barDblClick
    this.barMouseDown
    this.barMouseMove
    this.barMouseUp
    this.barMouseWheel
    
    this.rightBlankClick
    this.rightBlankDblClick
    this.rightBlankMouseDown
    this.rightBlankMouseMove
    this.rightBlankMouseUp
    this.rightBlankMouseWheel
    
    this.rightArrowClick
    this.rightArrowDblClick
    this.rightArrowMouseDown
    this.rightArrowMouseMove
    this.rightArrowMouseUp
    this.rightArrowMouseWheel
	*/
}

ScrollBar.prototype.getLength = function()
{
    return this._length;
}

ScrollBar.prototype.getScrollLength = function()
{
    return this._scrollLength;
}

ScrollBar.prototype.getScrollBarLength = function()
{
    return this._scrollBarLength;
}

ScrollBar.prototype.getScrollZoneLength = function()
{
    return (this._length -  2*this._barWidth);
}

ScrollBar.prototype.getMouseFocus = function()
{
    return this._mousedown_focus;
}

ScrollBar.prototype.getBarWidth = function()
{
    return this._barWidth;
}

ScrollBar.prototype.setScrollParamter = function(scrolllength,scrollbarlength,length)
{/*滑动条总长度*/
    this._scrollBarLength = (this.getScrollZoneLength())*scrollbarlength/length;
    this._scrollLength = (this.getScrollZoneLength())*scrolllength / length;
	/*滑动条距离左侧*/
}

ScrollBar.prototype.clear = function()
{
    dc = this.getDc();
    dc.clearRect(0,0,this._width,this._height);
}

ScrollBar.prototype.paintLeftArrow = function()
{
    dc = this.getDc();
    if(this._dirType == "x")
    {
        dc.fillStyle ="#C0E4FC"; //"#0f0";
        dc.strokeStyle = "#A4BFE6";//"#000";
        dc.lineWidth = 1.0;
        dc.fillRect(0,0,this._barWidth,this._barWidth);
        dc.strokeRect(0,0,this._barWidth,this._barWidth);
		
        //dc.strokeStyle = "#fff";
		dc.fillStyle = "#4D6185";//"#fff";
		dc.globalAlpha = 1;
        dc.lineWidth = 3.0;
        dc.beginPath();
        dc.moveTo(6,8);
        dc.lineTo(11,4);
        dc.lineTo(11,12);
        dc.fill();
    }
    else
    {
        dc.fillStyle ="#C0E4FC"; //"#0f0";
        dc.strokeStyle = "#A4BFE6";//"#000";
        dc.lineWidth = 1.0;
        dc.fillRect(0,0,this._barWidth,this._barWidth);
        dc.strokeRect(0,0,this._barWidth,this._barWidth);
        //dc.strokeStyle = "#fff";
		dc.fillStyle = "#4D6185";//"#fff";
        dc.lineWidth = 3.0;
        dc.beginPath();
        dc.moveTo(4,11);
        dc.lineTo(8,6);
        dc.lineTo(12,11);
        dc.fill();
    }
    this.releaseDc(dc);
}

ScrollBar.prototype.paintRightArrow = function()
{
    dc = this.getDc();
    if(this._dirType == "x")
    {
        dc.fillStyle ="#C0E4FC"; //"#0f0";
        dc.strokeStyle = "#A4BFE6";//"#000";
        dc.lineWidth = 1.0;
        dc.fillRect(this._length - this._barWidth,0,this._barWidth,this._barWidth);
        dc.strokeRect(this._length - this._barWidth,0,this._barWidth,this._barWidth);
       // dc.strokeStyle = "#fff";
		dc.fillStyle = "#4D6185";//"#fff";
	    dc.lineWidth = 3;
        dc.beginPath();
        dc.moveTo(this._length - 6,8);
        dc.lineTo(this._length - 11,4);
        dc.lineTo(this._length - 11,12);
        dc.fill();
    }
    else
    {	//竖箭头
        dc.fillStyle ="#C0E4FC"; //"#0f0";
        dc.strokeStyle = "#A4BFE6";//"#000";
        dc.lineWidth = 1.0;
        dc.fillRect(0,this._length - this._barWidth,this._barWidth,this._barWidth);
        dc.strokeRect(0,this._length - this._barWidth,this._barWidth,this._barWidth);
        //dc.strokeStyle = "#fff";
		dc.fillStyle = "#4D6185";//"#fff";
        dc.lineWidth = 3;
        dc.beginPath();
        dc.moveTo(4,this._length - 11);
        dc.lineTo(8,this._length - 6);
        dc.lineTo(12,this._length - 11);
        dc.fill();
    }
    this.releaseDc(dc);
}

ScrollBar.prototype.paintScrollbar = function()//移动滑条
{
    dc = this.getDc();
    if(this._dirType == "x")
    {
        dc.fillStyle = "#fff";
        dc.fillRect(this._barWidth,0,this._length-2*this._barWidth,this._barWidth);
        dc.fillStyle = "#DEE6F1";//"#0f0";
        dc.strokeStyle = "#ececec";
        dc.lineWidth = 1.0;
        dc.strokeRect(this._barWidth,0,this._length-2*this._barWidth,this._barWidth);
        if(this._scrollBarLength < (this._length - 2*this._barWidth))
        {
            dc.fillRect(this._scrollLength + this._barWidth,0,this._scrollBarLength,this._barWidth);
			dc.strokeRect(this._scrollLength + this._barWidth,0,this._scrollBarLength,this._barWidth);
        }
        else
        {
            this._scrollLength = 0;
        }
    }
    else//上下以动滑条
    {
        dc.fillStyle = "#fff";
        dc.fillRect(0,this._barWidth,this._barWidth,this._length-2*this._barWidth);
        dc.fillStyle = "#DEE6F1";//"#0f0";
		dc.strokeStyle = "#ececec";
		dc.lineWidth = 1.0;
		dc.strokeRect(0,this._barWidth,this._barWidth,this._length - 2 * this._barWidth);
		if(this._scrollBarLength < (this._length - 2*this._barWidth))
		{
			dc.fillRect(0, this._barWidth + this._scrollLength ,this._barWidth, this._scrollBarLength);
			dc.strokeRect(0, this._barWidth + this._scrollLength ,this._barWidth, this._scrollBarLength);
		}
    }
    this.releaseDc(dc);
}

ScrollBar.prototype.paint = function()
{
    this.paintLeftArrow();
    this.paintRightArrow();
    this.paintScrollbar();
}



ScrollBar.prototype.mousedown = function(e)
{	if(_gl_filename === undefined){return ;}
    var compos = this.getCanvasXY();
    var scrpos = glGetMouseCanvasXY(e);
    var ctrx = scrpos.x - compos.x;
    var ctry = scrpos.y - compos.y;
    if(this._dirType == "x")
    {
        if(ctrx > 0 && ctrx < this._barWidth && ctry>0 && ctry < this._barWidth)
        {
            this._mousedown_focus = "leftarrow";
            if(this.leftarrowmousedown)
            {
                this.leftarrowmousedown(e);
            }
        }
        else if(ctrx > this._barWidth && ctrx < (this._barWidth + this._scrollLength)
            &&ctry > 0 && ctry < this._barWidth)
        {
            this._mousedown_focus = "leftblank";
            if(this.leftblankmousedown)
            {
                this.leftblankmousedown(e);
            }
        }
        else if(ctrx > (this._scrollLength + this._barWidth) && ctrx < (this._scrollLength + this._scrollBarLength + this._barWidth)
            && ctry > 0 && ctry < this._barWidth)
        {
            this._mousedown_focus = "scrollbar";
            this._oldScrollLength = this._scrollLength;
            this._oldMousePos = ctrx;
            if(this.scrollbarmousedown)
            {
                this.scrollbarmousedown(e);
            }
        }
        else if(ctrx > (this._barWidth+this._scrollLength + this._scrollBarLength) && ctrx < (this._length - this._barWidth)
            && ctry > 0 && ctry < this._barWidth)
        {
            this._mousedown_focus = "rightblank";
            if(this.rightblankmousedown)
            {
                this.rightblankmousedown(e);
            }
        }
        else if(ctrx> (this._length - this._barWidth) && ctrx < this._length 
			&& ctry > 0 && ctry < this._barWidth)
        {
            this._mousedown_focus = "rightarrow";
            if(this.rightarrowmousedown)
            {
                this.rightarrowmousedown();
            }
        }
    }
    else
    {
        if(ctry > 0 && ctry < this._barWidth && ctrx > 0 && ctrx < this._barWidth)
		{
			this._mousedown_focus = "leftarrow";
			if(this.leftarrowmousedown)
			{
				this.leftarrowmousedown(e);
			}
		}
		else if(ctry > this._barWidth && ctry <(this._barWidth + this._scrollLength) 
		    && ctrx > 0 && ctrx < this._barWidth)
		{
			this._mousedown_focus = "leftblank";
			if(this.leftblankmousedown)
			{
				this.leftblankmousedown(e);
			}
		}
		else if(ctry > (this._barWidth + this._scrollLength) && ctry < (this._barWidth + this._scrollLength + this._scrollBarLength) 
			&& ctrx > 0 && ctrx < this._barWidth)
		{
			this._mousedown_focus = "scrollbar";
			this._oldScrollLength = this._scrollLength;
			this._oldMousePos = ctry;
			if(this.scrollbarmousedown)
			{
				this.scrollbarmousedown(e);
			}
		}
		else if(ctry > (this._barWidth + this._scrollLength + this._scrollBarLength) && ctry < (this._length - this._barWidth) 
			&& ctrx > 0 && ctrx < this._barWidth )
		{
			this._mousedown_focus = "rightblank";
			if(this.rightblankmousedown)
			{
				this.rightblankmousedown(e);
			}
		}
		else if(ctry > (this._length - this._barWidth) && ctry < this._length 
			&& ctrx > 0 && ctrx < this._barWidth)
		{
			this._mousedown_focus = "rightarrow";
			if(this.rightarrowmousedown)
			{
				this.rightarrowmousedown(e);
			}
		}
    }
}

ScrollBar.prototype.mousemove = function(e)
{
    if(glGetMouseState())
    {
        var compos = this.getCanvasXY();
        var scrpos = glGetMouseCanvasXY(e);
        var ctrx = scrpos.x - compos.x;
        var ctry = scrpos.y - compos.y;
        if(this._mousedown_focus == "scrollbar")
        {
            if(this._scrollBarLength > this.getScrollZoneLength())
            {
                this._scrollLength = 0;
            }
            else
            {
                if(this._dirType == "x")
                {
                    this._scrollLength = this._oldScrollLength + ctrx - this._oldMousePos;
                    if(this._scrollLength < 0)
                    {
                        this._scrollLength = 0;
                        this._oldMousePos = this._oldMousePos + this._scrollLength - this._oldScrollLength;
                        this._oldScrollLength = 0;
                    }
                    else if(this._scrollLength > (this.getScrollZoneLength() - this._scrollBarLength))
                    {
                        this._scrollLength = this.getScrollZoneLength() - this._scrollBarLength;
                        this._oldMousePos = this._oldMousePos + this._scrollLength - this._oldScrollLength;
                        this._oldScrollLength = this._scrollLength;
                    }
                    else
                    {
                        this._oldMousePos = ctrx;
                        this._oldScrollLength = this._scrollLength;
                    }
                    this.paintScrollbar();
                    if(this.scrollbarmousemove)
                    {
                        this.scrollbarmousemove(e);
                    }
                }
                else
                {
                    this._scrollLength = this._oldScrollLength + ctry - this._oldMousePos;
                    if(this._scrollLength < 0)
                    {
                        this._scrollLength = 0;
                        this._oldMousePos = this._oldMousePos + this._scrollLength - this._oldScrollLength;
                        this._oldScrollLength = 0;
                    }
                    else if(this._scrollLength > (this.getScrollZoneLength() - this._scrollBarLength))
                    {
                        this._scrollLength = this.getScrollZoneLength() - this._scrollBarLength;
                        this._oldMousePos = this._oldMousePos + this._scrollLength - this._oldScrollLength;
                        this._oldScrollLength = this._scrollLength;
                    }
                    else
                    {
                        this._oldMousePos = ctry;
                        this._oldScrollLength = this._scrollLength;
                    }
                    this.paintScrollbar();
                    if(this.scrollbarmousemove)
                    {
                        this.scrollbarmousemove(e);
                    }
                }
            }
        }
    }
}

ScrollBar.prototype.mouseup = function(e)
{
    if(this._mousedown_focus == "leftarrow")
    {
        this._mousedown_focus = 'none';
        if(this.leftarrowmouseup)
        {
            this.leftarrowmouseup(e);
        }
    }
    else if(this._mousedown_focus == "leftblank")
    {
        this._mousedown_focus = 'none';
        if(this.leftblankmouseup)
        {
            this.leftblankmouseup(e);
        }
    }
    else if(this._mousedown_focus == "scrollbar")
    {
        this._mousedown_focus = 'none';
        if(this.scrollbarmouseup)
        {
            this.scrollbarmouseup(e);
        }
    }
    else if(this._mousedown_focus == "rightblank")
    {
        this._mousedown_focus = 'none';
        if(this.rightblankmouseup)
        {
            this.rightblankmouseup(e);
        }
    }
    else if(this._mousedown_focus == "rightarrow")
    {
        this._mousedown_focus = 'none';
        if(this.rightarrowmouseup)
        {
            this.rightarrowmouseup(e);
        }
    }
}
