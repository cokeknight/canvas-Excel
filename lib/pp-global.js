
// JavaScript Document
var _gl_renderTo;
var _gl_canvas,_gl_canvas2;
var _gl_drawContext;
var _gl_width;
var _gl_height;
var _gl_items = new Array();
var _gl_mouseState = {mousedownstate:false,focuswin:null,focusel:null};
var _moblie = 0;
var screenAvailHeight =window.screen.availHeight; //屏幕可用工作区高度 
var screenAvailWidth =window.screen.availWidth; //屏幕可用工作区宽度
var tempcell={row:0,col:0};
var is_mobile = screenAvailHeight*screenAvailWidth < 930*1280;
var chartOnly = /#onlychart=(.+)/.test(location.hash) && RegExp.$1==='true' ? true:false;
var _gl_cellButton_image=['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',
];
function glGetRenderTo()
{
    return _gl_renderTo;
}

function glGetCanvas()
{
    return _gl_canvas;
}

function glGetWidth()
{
    return _gl_width;
}

function glSetWidth(width)
{
    _gl_width = width;
}

function glGetHeight()
{
    return _gl_height;
}

function glSetHeight(height)
{
    _gl_height = height;
}

function glGetDrawContext()
{
    return _gl_drawContext;
}

function glItemAdd(pwindow)
{
    var i;
    if(pwindow.getType() == "window")
    {
        _gl_items.push(pwindow);
        for(i=0;i<pwindow.getWinItems().length;i++)
        {
            glItemAdd(pwindow.getWinItems()[i]);
        }
    }
    else
    {
        alert("_gl_items is window array ,you shouldn't put other class in it");
    }
}
function inArray(needle,array,bool){//判断是否在数组
	if(typeof needle=="string"||typeof needle=="number"){
	    var len=array.length;
		for(var i=0;i<len;i++){
			if(needle===array[i]){
				if(bool){
					return i;
				}
				return true;
			}
		}
		return false;
	}
}
function glItemRemove(pwindow)
{
    var i;
    _gl_items.remove(pwindow);
    for(i=0;i<pwindow.getWinItems().length;i++)
    {
        glItemRemove(pwindow.getWinItems()[i]);
    }
}

function glItemRemoveAt(index)
{
    var win;
    if(_gl_items.length > index)
    {
        glItemRemove(_gl_items[index]);
    }
    else
    {
        alert('the index which you provide out of the _gl_items');
    }
}

function glGetMouseState()
{
    return _gl_mouseState.mousedownstate;
}

function glSetMouseState(down)
{
    if(typeof(down) == "boolean")
    {
        _gl_mouseState.mousedownstate = down;
    }
    else
    {
        alert("paramter eror:glSetMouseState(down) down should be boolean");
    }
}

function glGetMouseFocusWin()
{
    return _gl_mouseState.focuswin;
}

function glSetMouseFocusWin(pwindow)
{
    if(pwindow)
    {
        if(pwindow.getType() == "window")
        {
            _gl_mouseState.focuswin = pwindow;
        }
        else
        {
            alert("paramter error:pwindow should be window class");
        }
    }
    else
    {
        _gl_mouseState.focuswin = null;
    }
}
function glGetMouseFocusEl()
{
    return _gl_mouseState.focusel;
}

function glSetMouseFocusEl(pcomponent)
{
    if(pcomponent)
    {
        if(pcomponent.getType() == "component")
        {
            _gl_mouseState.focusel = pcomponent;
        }
        else
        {
            alert("111paramter error:pcomponent should be component class");
        }
    }
    else
    {
        _gl_mouseState.focusel = null;
    }
}

function glGetMousePageXY(e)
{
    if(e.touches!==undefined){
		glGetMousePageXY = function(e){
			return {x:e.touches[0].pageX,y:e.touches[0].pageY};	
		}	
	}else{
		glGetMousePageXY=function(e){
			var x = e.pageX?e.pageX:(document.body.scrollLeft+e.clientX);
			var y = e.pageY?e.pageY:(document.body.scrollTop + e.clientY);
			return {x:x,y:y};
		}
	}
	return glGetMousePageXY(e);
}

function glGetMouseClientXY(e)
{
    if(e.touches!==undefined){
		glGetMouseClientXY = function(e){
			return {x:e.touches[0].clientX,y:e.touches[0].clientY};	
		}	
	}else{
		glGetMouseClientXY=function(e){
			var x = e.clientX;
			var y = e.clientY;
			return {x:x,y:y};
		}
	}
	return glGetMouseClientXY(e);
}

function glGetMouseCanvasXY(e)
{
    if(e.touches!==undefined){
		glGetMouseCanvasXY = function(e){
			return {x:e.touches[0].pageX,y:e.touches[0].pageY};	
		}	
	}else{
		glGetMouseCanvasXY=function(e){
			var x = e.offsetX?e.offsetX:e.layerX;
    		var y = e.offsetY?e.offsetY:e.layerY;
			return {x:x,y:y};	
		}
	}
	return glGetMouseCanvasXY(e);
}

function glGetMouseScreenXY(e)
{
    if(e.touches!==undefined){
		glGetMouseScreenXY = function(e){
			return {x:e.touches[0].screenX,y:e.touches[0].screenY};	
		}	
	}else{
		glGetMouseScreenXY=function(e){
			var x = e.screenX;
			var y = e.screenY;
			return {x:x,y:y};
		}
	}
    return glGetMouseScreenXY(e);
}

function glGetEvent(event)
{
        return event ? event : window.event;
}
function glGetTarget(event){
        return event.target || event.srcElement;
}
function glGetElementTop(element) {
    var actualTop = element.offsetTop;var current = element.offsetParent;while (current !== null) {actualTop += current.offsetTop;current = current.offsetParent;}if (document.compatMode == "BackCompat") {var elementScrollTop = document.body.scrollTop;} else {var elementScrollTop = document.documentElement.scrollTop;}return actualTop - elementScrollTop;}
	function addHandler(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
}
function sysclick(e)
{   
    var myevent = e?e:event;
	var i,winpos,mousepos; 
	for(i=(_gl_items.length -1);i>=0;i--)
	{
	    mousepos = glGetMouseCanvasXY(e);
	    winpos =  _gl_items[i].getCanvasXY();
	    if(mousepos.x > winpos.x
	        && mousepos.x < winpos.x + _gl_items[i].getWidth()
	        && mousepos.y > winpos.y
	        && mousepos.y < winpos.y + _gl_items[i].getHeight()
	        )
		{
		    if(_gl_items[i].getVisible())
		    {
			    _gl_items[i].sysclick(e);
			    break;
			}
		}
	}
}

function sysdblclick(e)
{
    var myevent = e?e:event;
	var i,winpos,mousepos;
	for(i=(_gl_items.length -1);i>=0;i--)
	{
	    mousepos = glGetMouseCanvasXY(e);
	    winpos =  _gl_items[i].getCanvasXY();
	    if(mousepos.x > winpos.x
	        && mousepos.x < winpos.x + _gl_items[i].getWidth()
	        && mousepos.y > winpos.y
	        && mousepos.y < winpos.y + _gl_items[i].getHeight()
	        )
		{
		    if(_gl_items[i].getVisible())
		    {
			    _gl_items[i].sysdblclick(myevent);
			    break;
			}
		}
	}
}

function sysmousedown(e)
{
    glSetMouseState(true);
    var myevent = e?e:event;
	var i,winpos,mousepos;
	for(i=(_gl_items.length -1);i>=0;i--)
	{
	    mousepos = glGetMouseCanvasXY(e);
	    winpos =  _gl_items[i].getCanvasXY();
	    if(mousepos.x > winpos.x
	        && mousepos.x < winpos.x + _gl_items[i].getWidth()
	        && mousepos.y > winpos.y
	        && mousepos.y < winpos.y + _gl_items[i].getHeight()
	        )
		{
		    if(_gl_items[i].getVisible())
		    {
			    _gl_items[i].sysmousedown(myevent);
			    break;
			}
		}
	}
}

function sysmousemove(e)
{
    var myevent = e?e:event;
    var i,mousepos,winpos;
    if(glGetMouseState())
    {
        if(glGetMouseFocusWin() != null)
        {
            glGetMouseFocusWin().sysmousemove(e);
        }
        else
        {
            glSetMouseFocusEl(null);
        }
    }
    else
    {
		for(i=(_gl_items.length -1);i>=0;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			winpos =  _gl_items[i].getCanvasXY();
			if(mousepos.x > winpos.x
				&& mousepos.x < winpos.x + _gl_items[i].getWidth()
				&& mousepos.y > winpos.y
				&& mousepos.y < winpos.y + _gl_items[i].getHeight()
				)
			{
				if(_gl_items[i].getVisible())
				{
					_gl_items[i].sysmousemove(myevent);
					break;
				}
			}
		}
    }
}

function sysmouseup(e)
{
    glSetMouseState(false);
    var myevent = e?e:event;
	var i,winpos,mousepos;
	if(glGetMouseState())
    {
        if(glGetMouseFocusWin() != null)
        {
            glGetMouseFocusWin().sysmousemove(e);
        }
        else
        {
            glSetMouseFocusEl(null);
        }
    }
    else
    {
        for(i=(_gl_items.length -1);i>=0;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			winpos =  _gl_items[i].getCanvasXY();
			if(mousepos.x > winpos.x
				&& mousepos.x < winpos.x + _gl_items[i].getWidth()
				&& mousepos.y > winpos.y
				&& mousepos.y < winpos.y + _gl_items[i].getHeight()
				)
			{
				if(_gl_items[i].getVisible())
				{
					_gl_items[i].sysmouseup(myevent);
					break;
				}
			}
		}
    }
}

function sysmousewheel(e)
{
    var myevent = e?e:event;
    var i,winpos,mousepos;
	for(i=(_gl_items.length -1);i>=0;i--)
	{
	    mousepos = glGetMouseCanvasXY(e);
	    winpos =  _gl_items[i].getCanvasXY();
	    if(mousepos.x > winpos.x
	        && mousepos.x < winpos.x + _gl_items[i].getWidth()
	        && mousepos.y > winpos.y
	        && mousepos.y < winpos.y + _gl_items[i].getHeight()
	        )
		{
		    if(_gl_items[i].getVisible())
		    {
			    _gl_items[i].sysmousewheel(myevent);
			    break;
			}
		}
	}
}
function glInit(config)/*初始化函数*/
{
     _gl_renderTo = config.renderTo||document.body;
    
	 _gl_width = config.width || 550;
    
     _gl_height = config.height || 400;


    _gl_canvas = document.createElement("canvas");
	_gl_canvas.id='canvas';
	_gl_canvas.width = _gl_width;
	_gl_canvas.height = _gl_height;
	_gl_canvas.style.position = "relative";
	_gl_canvas.style.backgroundColor = "#fff";
	//_gl_canvas.style.border="1px solid #ff0000";
	_gl_canvas.style.margin = "auto";
	_gl_canvas.innerHTML = "您的浏览器不支持canvas标签";
	_gl_renderTo.appendChild(_gl_canvas);
	_gl_drawContext = _gl_canvas.getContext('2d');
	
	_gl_canvas2 = document.createElement("canvas");
	_gl_canvas2.id='canvas2';
	_gl_canvas2.width = _gl_width;
	_gl_canvas2.height = _gl_height;
	_gl_canvas2.style.display = "none";
	

	if(_gl_canvas.addEventListener)
	{
		//_gl_canvas.addEventListener("touchstart",function(){alert(11);},false);
		//_gl_canvas.addEventListener("touchmove",sysmousemove,false);
		//_gl_canvas.addEventListener("click",sysclick,false);
		_gl_canvas.addEventListener("dblclick",sysdblclick,false);
		//_gl_canvas.addEventListener("mousedown",sysmousedown,false);
	if(is_mobile){//为手机
		_gl_canvas.addEventListener("mousedown",function(event){
				sysmousedown(event);	
		},false);
	}else{
		_gl_canvas.addEventListener("mousedown",function(event){

				sysmousedown(event);	

		},false);	
	}	
		_gl_canvas.addEventListener("mousemove",sysmousemove,false);
		_gl_canvas.addEventListener("mouseup",sysmouseup,false);
		_gl_canvas.addEventListener("mousewheel",sysmousewheel,false);
		_gl_canvas.addEventListener("DOMMouseScroll",sysmousewheel,false);

	}
	else
	{
		//_gl_canvas.attachEvent("onclick",sysclick);
		_gl_canvas.attachEvent("ondblclick",sysdblclick);
		_gl_canvas.attachEvent("onmousedown",sysmousedown);
		_gl_canvas.attachEvent("onmousemove",sysmousemove);
		_gl_canvas.attachEvent("onmouseup",sysmouseup);
		_gl_canvas.attachEvent("onmousewheel",sysmousewheel);
	
	}
}

function glRun(pwindow)
{
	glItemAdd(pwindow);
	if(pwindow.getVisible())
	{
	    pwindow.syspaint();
	}
}
