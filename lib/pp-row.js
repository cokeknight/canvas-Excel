// JavaScript Document
function DataRow(config)
{
	/*
	属性:
	this.height
	this.visible
	函数:
	this.getHeight
	this.getVisible
	this.setVisible
	this.ifSave
	*/
	if(config!==undefined){
		if(config.height!= undefined)
		{
			if(typeof(config.height) == "number")
			{
				this._height = config.height;
			}
			else
			{
				alert("config error: height should be number type");
			}
		}
		else
		{
			this._height = 20;//linesize
		}
		if(config.color!= undefined)
		{

			this._color = config.color;
		}
		else
		{
			this._color = "none";
		}
		
		if(config.visible!= undefined)
		{
			if(typeof(config.visible) == "boolean")
			{
				this._visible = config.visible;
			}
			else
			{
				alert("config error: visible should be boolean type");
			}
		}
		else
		{
			this._visible = true;
		}
		if(config.tagval!= undefined)
		{

			this._tagval = config.tagval;
		}
		if(config.tagval2!= undefined)//行属性值
		{

			this._tagval2 = config.tagval2;
		}
		if(config.type!= undefined)
		{

			this._type = config.type;
		}
		if(config.text!= undefined)
		{

			this._text = config.text;
		}
		if(config.val!= undefined)
		{

			this._val = config.val;
		}
		if(config.childval!= undefined)
		{

			this._childval = config.childval;
		}
		if(config.oddbkcolor!= undefined)//有背景奇偶颜色调色器时的偶数背景颜色。
		{

			this._oddbkcolor = config.oddbkcolor;
		}
		if(config.evenbkcolor!= undefined)//有背景奇偶颜色调色器时的奇数背景颜色。
		{

			this._evenbkcolor = config.evenbkcolor;
		}
		if(config.oddtcolor!= undefined)//有文字奇偶颜色调色器时的偶数文字颜色。
		{

			this._oddtcolor = config.oddtcolor;
		}
		if(config.eventcolor!= undefined)//有文字奇偶颜色调色器时的奇数文字颜色。。
		{

			this._eventcolor = config.eventcolor;
		}
	}
}

DataRow.prototype.getHeight = function()
{
    return this._height;
}
DataRow.prototype.getColor=function(){
	if(this._color==='none')
	{
		return false;	
	}else{
		return this._color;
	}	
}
DataRow.prototype.getVisible = function()
{	if(this._tagval !== undefined && (this._tagval>>9)&0x01){
		return false;
	}
    return this._visible;
}

DataRow.prototype.ifSave = function()
{
    if(this._height != 40)
    {
        return true;
    }
    else if(!this._visible)
    {
        return true;
    }
    else
    {
        return false;
    }
}