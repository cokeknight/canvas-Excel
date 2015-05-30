var dragimg=function(imageDiv,width,height) {
	this.hooks=["Left","Up","Down","Right","RightUp","LeftDown","LeftUp","RightDown"];
	var box=document.createElement('div');
	
	box.id='_outerDiv';
	
	if(/(\d+?)$/.test(imageDiv)){
		var num = RegExp.$1;
		box.id='_outerDiv'+num;
	}
	this.Divid= box.id;		
	
	
	box.style.cssText="z-index:1; position:relative;top:0px; left:0px; width:"+width+"px; height:"+height+"px;";
	
	var innerbox=document.createElement('div');
	innerbox.id='_innerDiv';
	
	innerbox.style.display='none';
	for(var i=0;i < this.hooks.length;i++)
	{
		var tmp=document.createElement('div');
		tmp.id=	this.hooks[i];
		innerbox.appendChild(tmp);
	}	
	this.innerbox=innerbox;
	this.objdiv=box;
	this.imgId=imageDiv;
	this.imageDiv=document.getElementById(imageDiv);
	box.appendChild(innerbox);
	box.appendChild(this.imageDiv);
	document.body.appendChild(box);


	
	this.dragging = false;
	this.scaleing=false;
	this.startTop =0; // top is a Key Word in Chrome and Opera
	this.startLeft = 0;//mouuseDown时记录下的元素初始top,left属性
	
	this.width=0;
	this.height=0;
	
	
	this.dragPosY = 0;
	this.dragPosX = 0;//mouuseDown时记录下的鼠标初始top,left属性，通过mousemove的鼠标坐标相减得到鼠标的偏移
	this._scale = 1;//比例参数
	
	this.MinWidth=50;
	this.MinHeight=50;

	
	this._mxRight=1000;
	var _this=this;
	this._mxDown=50;
	this.Limit=true;
	this.Resize=function(){};
	this.hitInRect=function(hitX, hitY, rcLeft, rcTop, rcWidth, rcHeight) {
	  return (hitX>=rcLeft && hitX<rcLeft+rcWidth && hitY>=rcTop && hitY<rcTop+rcHeight);
	}
	this.trimPX=function(_px) {
	  if(_px==null || _px=="")return 0;
	  return parseInt(_px.substr(0, _px.lastIndexOf("px")));
	}
	
	box.addEventListener("mousedown",function(event){return _this.dragmousedown(event);},false);
	 // document.onmousedown=function(event){_this.dragmousedown(event)};// start moving image
	box.addEventListener("mousemove",function(event){return _this.dragmousemove(event);},false);
	 // document.onmousemove=function(event){_this.dragmousemove(event)};// moving image
	box.addEventListener("mouseup",function(event){return _this.dragmouseup(event);},false);
	 // document.onmouseup=function(event){_this.dragmouseup(event)};// stop moving image

}
dragimg.prototype.dragmousedown=function(event)
{	
	var e=event||window.event;
	var target=glGetTarget(e);
	var _this=this;
	this.startTop = this.trimPX(this.objdiv.style.top);
	this.startLeft = this.trimPX(this.objdiv.style.left);
	this.width=parseInt(this.objdiv.style.width);
	this.height=parseInt(this.objdiv.style.height);
	var mousePos=glGetMousePageXY(e);
	this.dragPosX = mousePos.x;
	this.dragPosY = mousePos.y;	
	this.innerbox.style.display='block';
	  if(target.id=="_outerDiv"||target.id==this.imgId)
	  {
		  this.dragging = true;
		  preventDefault(e); // disable default behavior of browser
	  }else if(T.array.inArray(target.id,this.hooks))
	  { 
	  this.scaleing = true;	
	  var elmid=target.id.toLowerCase();
	    switch (elmid) {
			case "up" :
					this.Resize=this.scaleUp;
				break;
			case "down" :
					this.Resize=this.scaleDown;
				break;
			case "left" :
					this.Resize=this.scaleLeft;
				break;
			case "right" :
					this.Resize=this.scaleRight;
				break;
			case "leftup" :
					this.Resize=this.scaleLeftUp;
				break;
			case "rightup" :
					this.Resize=this.scaleRightUp;
				break;
			case "leftdown" :
					this.Resize=this.scaleLeftDown;
				break;
			case "rightdown" :
				this.Resize=this.scaleRightDown;
				break;
			default :
				_fun = function(e){ if(oThis.Scale){ oThis.scaleRightDown(e); }else{ oThis.SetRight(e); oThis.SetDown(e); } };
				_cursor = "nw-resize";
		}
	  }else
	  {
			  this.innerbox.style.display='none';
  
	  }
	document.addEventListener("mousemove",function(event){return _this.dragmousemove(event);},false);
	document.addEventListener("mouseup",function(event){return _this.dragmouseup(event);},false);
		preventDefault(e);
}
dragimg.prototype.dragmousemove=function(event){
	var e=event||window.event;
	var mousePos=glGetMousePageXY(e);
	var target=glGetTarget(e);
	if (this.dragging){	
		this.objdiv.style.cursor="pointer";
		this.objdiv.style.top = parseInt(this.startTop)+(mousePos.y- this.dragPosY)+ "px";
		this.objdiv.style.left = parseInt(this.startLeft)+(mousePos.x- this.dragPosX)+ "px";
	}else if (this.scaleing)
	{	
		this.Resize(mousePos.x-this.dragPosX,mousePos.y-this.dragPosY);
	}
}
dragimg.prototype.dragmouseup= function (event) {
	  var e=event||window.event;
	  this.dragging = false;
	  this.scaleing = false;
	  this.objdiv.style.cursor="default";          
	  preventDefault(e); // disable default behavior of browser
   
}

dragimg.prototype.scaleRight= function (iwidth) {
		var iwidth=this.width+iwidth;
		if(iwidth<this.MinWidth)iwidth=this.MinWidth;
		
		this.imageDiv.width=iwidth;
		this.objdiv.style.width =iwidth +"px";
		
		this.imageDiv.height=this.imageDiv.height;
}  
dragimg.prototype.scaleLeft= function (iwidth) {
		var style_left=iwidth;
		var iwidth=this.width-iwidth;
		if(iwidth < this.MinWidth)
		{
			iwidth=this.MinWidth;
			style_left=this.width-this.MinWidth;;
			
		}		
		this.objdiv.style.left=this.startLeft+style_left+"px";

		this.objdiv.style.width = iwidth +"px";
		this.imageDiv.width=iwidth;
		
		this.imageDiv.height=this.imageDiv.height;
} 
dragimg.prototype.scaleUp= function (iwidth,iheight) {
		var style_top=iheight;
		var iheight=this.height-iheight;
		if(iheight < this.MinHeight){
			iheight=this.MinHeight;
			style_top=this.height-this.MinHeight;
		}		
		this.objdiv.style.top=this.startTop+style_top+"px";

		this.objdiv.style.height = iheight+"px";
		this.imageDiv.height=iheight;
		
		this.imageDiv.width=this.imageDiv.width;
} 
dragimg.prototype.scaleDown= function (iwidth,iheight) {
		var iheight=this.height+iheight;
		if(iheight<this.MinHeight)iheight=this.MinHeight;
		this.objdiv.style.height = iheight +"px";
		this.imageDiv.height=iheight;
		this.imageDiv.width=this.imageDiv.width;
} 
dragimg.prototype.scaleLeftUp= function (iwidth,iheight) {
		this.scaleLeft(iwidth);
		this.scaleUp(iwidth,iheight);
} 
dragimg.prototype.scaleLeftDown= function (iwidth,iheight) {
		this.scaleLeft(iwidth);
		this.scaleDown(iwidth,iheight);
} 
dragimg.prototype.scaleRightUp= function (iwidth,iheight) {
		this.scaleRight(iwidth);
		this.scaleUp(iwidth,iheight);
} 
dragimg.prototype.scaleRightDown= function (iwidth,iheight) {
		this.scaleRight(iwidth);
		this.scaleDown(iwidth,iheight);
} 


var dragbox=function(div,mousediv) {
	var box = this.box=this.objdiv=typeof div==='String'?document.getElementById(div):div;
	var mousediv =this.mousediv= mousediv||box;
	this.dragging = false;
	this.dragPosY = 0;
	this.dragPosX = 0;//mouuseDown时记录下的鼠标初始top,left属性，通过mousemove的鼠标坐标相减得到鼠标的偏移
	this._scale = 1;//比例参数

	this._mxRight=1000;
	var _this=this;
	this._mxDown=50;
	this.Limit=true;
	this.Resize=function(){};
	this.hitInRect=function(hitX, hitY, rcLeft, rcTop, rcWidth, rcHeight) {
	  return (hitX>=rcLeft && hitX<rcLeft+rcWidth && hitY>=rcTop && hitY<rcTop+rcHeight);
	}
	this.trimPX=function(_px) {
	  if(_px==null || _px=="")return 0;
	  return parseInt(_px.substr(0, _px.lastIndexOf("px")));
	}
	
mousediv.addEventListener("mousedown",function(event){return _this.dragmousedown(event);},false);
 // document.onmousedown=function(event){_this.dragmousedown(event)};// start moving image
mousediv.addEventListener("mousemove",function(event){return _this.dragmousemove(event);},false);
 // document.onmousemove=function(event){_this.dragmousemove(event)};// moving image
mousediv.addEventListener("mouseup",function(event){return _this.dragmouseup(event);},false);
 // document.onmouseup=function(event){_this.dragmouseup(event)};// stop moving image
mousediv.addEventListener("mouseout",function(event){return _this.dragmouseout(event);},false);


}
dragbox.prototype.dragmousedown=function(event)
{	
	var e=event||window.event;
	var target=glGetTarget(e);
	var _this=this;
	this.startTop = this.trimPX(this.objdiv.style.top);
	this.startLeft = this.trimPX(this.objdiv.style.left);
	this.width=parseInt(this.objdiv.style.width);
	this.height=parseInt(this.objdiv.style.height);
	var mousePos=glGetMousePageXY(e);
	this.dragPosX = mousePos.x;
	this.dragPosY = mousePos.y;	
	this.dragging = true;
	document.addEventListener("mousemove",function(event){return _this.dragmousemove(event);},false);
	document.addEventListener("mouseup",function(event){return _this.dragmouseup(event);},false);
	preventDefault(e);
}
dragbox.prototype.dragmousemove=function(event){
	var e=event||window.event;
	this.mousediv.style.cursor="Move";
	var mousePos=glGetMousePageXY(e);
	var target=glGetTarget(e);
	if (this.dragging){	
		this.mousediv.style.cursor="Move";
		this.objdiv.style.top = parseInt(this.startTop)+(mousePos.y- this.dragPosY)+ "px";
		this.objdiv.style.left = parseInt(this.startLeft)+(mousePos.x- this.dragPosX)+ "px";
	}
}
dragbox.prototype.dragmouseup= function (event) {
	  var e=event||window.event;
	  this.dragging = false;
	  this.scaleing = false;
	  this.mousediv.style.cursor="default";          
	  preventDefault(e); // disable default behavior of browser
   
}
dragbox.prototype.dragmouseout= function (event) {
	this.objdiv.style.cursor="default";   
}

