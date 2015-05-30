/*右键菜单*/
function RightMenuItem(event){
    this.menu       = document.createElement("div");
    this.menuBody   = document.createElement("ul");
    /**
     * addItem方法给右键菜单添加功能项。共三个参数
     * itemText :功能项（subItem,下同）的文字
     * styleImg : 功能项的小图标
     * ev       :功能项被点击时响应的函数 
     */
	 /*itemText,styleImg,ev*/
    this.addItem    = function(obj){
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			var menu    = this.menu;
			typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
			
			subItem.style.cssText='font-size:10px';
				/*配合外部样式表，控制样式*/
				
       		var overcss=typeof(obj[i].onmouseoverStyle)!='undefined'?obj[i].onmouseoverStyle:'background-color:#007eff;color:#FFF;font-size:10px';
       		var outcss=typeof(obj[i].onmouseoutStyle)!='undefined'?obj[i].onmouseoutStyle:'background-color:#FFF;color:#000;font-size:10px';
			
			subItem.onmouseover = function(event){
				event = (event)?event:window.event;
				var obj=event.srcElement?event.srcElement:event.target;
				obj.style.cssText=overcss;
			};
			subItem.onmouseout = function(event){
				event = (event)?event:window.event;
				var obj=event.srcElement?event.srcElement:event.target;
				obj.style.cssText=outcss;
			};
//			var DataGrid=new DataGrid();
//			DataGrid.setNetChartVisible(false);
			obj[i].ev?subItem.onclick  = obj[i].ev:subItem.onclick=clearNetLine;
			this.menuBody.appendChild(subItem);

		}


    };
    /**
     * addMenuTo方法将该右键菜单应用到指定的元素。一个参数。
     * obj : 应用该右键菜单的元素
     */
    this.addMenuTo  = function(obj){
        /*设置ul的样式*/
        with(this.menuBody.style){
            /*配合外部样式表，控制样式*/
            className           = "myContextMenuBody";
            listStyle           = "none";
            listStylePosition   = "inside";
            margin              = "0px";
            padding             = "0px";
        }
        /*设置div的样式*/
		this.menu.id='myContextMenu';
        this.menu.className='RightMenuItem';

       var del_a = document.createElement("a");
        del_a.className="searchtag_del";
		with(del_a.style){
			            /*配合外部样式表，控制样式*/
	        left    	  = "10px";
            width  		  = "10px";
            zindex        = "9000";
            cursor        = "pointer";
       }
		del_a.onclick=function(){clearCeng('myContextMenu')};
        this.menu.appendChild(this.menuBody);   
		this.menu.appendChild(del_a);
        document.body.appendChild(this.menu);
        /*由于在事件函数内，this指代的对象不再是本类的对象，
         * 所以为以下函数定义一个全局变量menu
         */
        var menu = this.menu;
//       document.getElementById('myContextMenu').onmouseout = function(){
//			clearCeng('myContextMenu');       
//		}
        obj.oncontextmenu = function(){
            menu.style.left    =ex(event);
            menu.style.top     =ey(event);
            menu.style.display = "block";
            return false;
        }
    }
}
/*左键菜单*/
function ClickMenuItem(event){
	this.menu=document.createElement("div");
    this.menuBody=document.createElement("ul");
    /**
     * addItem方法给右键菜单添加功能项。共三个参数
     * itemText :功能项（subItem,下同）的文字
     * styleImg : 功能项的小图标
     * ev       :功能项被点击时响应的函数 
     */
	 this.createItem  = function(obj,css){
		 var menubody=document.createElement("div");
		 menubody.className=css;
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			var menu    = this.menu;			
			if(obj[i].itemText!=undefined){
				typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
			}
			if(obj[i].itemType=='line') subItem.className="ContextLine";
			
			if(obj[i].child!=undefined){
				var arrow=document.createElement("div");
				arrow.className="edui-arrow";
				subItem.appendChild(arrow);
				subItem.appendChild(this.createItem(obj[i].child,"ContextThirdMenuSubItem"));
			}
			subItem.onclick  = obj[i].ev;
			menubody.appendChild(subItem);
		}
		return menubody;
    };

	 /*itemText,styleImg,ev*/
    this.addItem    = function(obj){
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			var menu    = this.menu;			
			
			
			typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
						subItem.className = "ContextMenuSubItem";
				/*配合外部样式表，控制样式*/
			if(obj[i].css!=undefined){
				subItem.className+= " "+obj[i].css;
				if(obj[i].css ==='select'){
					subItem.innerHTML+='<div class="showflag"></div>';
				}

			}
			
			subItem.onclick  = obj[i].ev;
			if(obj[i].child!=undefined){
				var arrow=document.createElement("div");
				arrow.className="edui-arrow";
				subItem.appendChild(arrow);
				var menubody=this.createItem(obj[i].child,"ContextSecondMenuSubItem");
				subItem.appendChild(menubody);
			}

			
			this.menuBody.appendChild(subItem);
		}
    };
    /**
     * addMenuTo方法将该右键菜单应用到指定的元素。一个参数。
     * obj : 应用该右键菜单的元素
     */
    this.addMenuTo  = function(obj){
        /*设置ul的样式*/
        /*设置div的样式*/
		var left=0,top=0;
		this.menu.id='myContextMenu';
        this.menu.className='RightMenuBox';

        this.menu.appendChild(this.menuBody);   
		this.menu.style.position='absolute';  
		left    =obj.offsetLeft + document.documentElement.scrollLeft+'px';
		top     =obj.offsetTop + document.documentElement.scrollTop+25+'px';
		if(obj.nodeName !== undefined){
			if(obj.nodeName.toUpperCase() === 'EM')
			{
				top=obj.offsetTop + document.documentElement.scrollTop+25 - document.getElementById("left-tablechild").scrollTop+'px';
			}
		}
		if(obj==='rightMouse')
		{
            left    =T.html.ex(event)+'px';
            top     =T.html.ey(event)+'px';
		}  
		this.menu.style.left    =left;
        this.menu.style.top     =top;
        this.menu.style.display = "block";

        document.body.appendChild(this.menu);
        /*由于在事件函数内，this指代的对象不再是本类的对象，
         * 所以为以下函数定义一个全局变量menu
         */
//       document.getElementById('myContextMenu').onmouseout = function(){
//			clearCeng('myContextMenu');       
//		}
    }
}

function clearNetLine(config){
	var dataGrid = new DataGrid({
	    x:0.5,
	    y:0.5,
	    width:$this.getWidth() - 20.5,
	    height:$this.getHeight() - 20.5
	});
		dataGrid.setNetChartVisible(!dataGrid.getNetChartVisible());
		dataGrid.clear();
		dataGrid.paint();

}
RightMenuItem.prototype.setMenuItem=function(){
	return [{'itemText':'显示表格线'},
	{'itemText':'111'},
	{'itemText':'111'},
	{'itemText':'111'}];	
}

function colordialog(event,dataGrid,type,elem,clearColorFunc){
	    event = glGetEvent(event);
	    var target = glGetTarget(event);
	this.colordialogmouseover=function(obj){
		obj.style.borderColor="#0A66EE";
		obj.bgColor="#EEEEEE";
	}
	this.colordialogmouseout=function(obj){
		obj.style.borderColor="";
		obj.bgColor="";
	}
	elem===undefined?this.colordialogmousedown=function(color){
		clearCeng('showbox');
		if(type=='fontcolor'){
			dataGrid.setSelCellFontColor(color);
		}else if(type==='backcolor'){
			dataGrid.setSelCellbackColor(color);
		}else if(type==='borderLineColor')
		{
			//dataGrid.setSelCellborderLineColor(color);
			borderColor=color;
		}
		dataGrid.clear();
		dataGrid.paint();
		ecolorPopup.value=color;
		//document.body.bgColor=color;
	}:this.colordialogmousedown=function(color){
		var tempelm = document.getElementsByName(elem)[0];
		if(tempelm.nodeName === 'SELECT'){
			if(tempelm.value ===''){
				alert('请选中颜色');
				clearCeng('showbox');
				return false;
			}
			tempelm.options[tempelm.value.substring(1)].style.background=color;
			tempelm.style.background=color;
		}else{
			
			tempelm.value=color;
		}
		clearCeng('showbox');
	};
	clearColorFunc===undefined?this.clearColor=function(){
		clearCeng('showbox');
		if(type=='fontcolor'){
			dataGrid.setSelCellFontColor('');
		}else{
			dataGrid.setSelCellbackColor('');
		}
		dataGrid.clear();
		dataGrid.paint();
		//document.body.bgColor=color;
	}:this.clearColor=function(color){
		document.getElementsByName(elem)[0].value='';	
		clearCeng('showbox');
	};
	var abox = document.createElement("div");
	abox.id='showbox';
	abox.style.background='#FFE900';
	abox.style.position='absolute';
	abox.style.left=T.html.getPosition(target).left + document.documentElement.scrollLeft+'px';
	abox.style.top=T.html.getPosition(target).top+ document.documentElement.scrollTop+20+'px';
	document.body.appendChild(abox);
	var ocolorPopup = abox;
	var ecolorPopup=null;

	var e=event.srcElement;
	e.onkeyup=colordialog;
	ecolorPopup=e;
	var ocbody;
	var oPopBody = ocolorPopup;
	var colorlist=new Array(40);
	oPopBody.style.backgroundColor = "#f9f8f7";
	oPopBody.style.border = "solid #999999 1px";
	oPopBody.style.fontSize = "12px";
	 colorlist[0]="#000000"; colorlist[1]="#993300"; colorlist[2]="#333300"; colorlist[3]="#003300";
	  colorlist[4]="#003366"; colorlist[5]="#000080"; colorlist[6]="#333399"; colorlist[7]="#333333";
	 colorlist[8]="#800000"; colorlist[9]="#FF6600"; colorlist[10]="#808000";colorlist[11]="#008000";
	  colorlist[12]="#008080";colorlist[13]="#0000FF";colorlist[14]="#666699";colorlist[15]="#808080";
	 colorlist[16]="#FF0000";colorlist[17]="#FF9900";colorlist[18]="#99CC00";colorlist[19]="#339966";
	  colorlist[20]="#33CCCC";colorlist[21]="#3366FF";colorlist[22]="#800080";colorlist[23]="#999999";
	 colorlist[24]="#FF00FF";colorlist[25]="#FFCC00";colorlist[26]="#FFFF00";colorlist[27]="#00FF00";
	  colorlist[28]="#00FFFF";colorlist[29]="#00CCFF";colorlist[30]="#993366";colorlist[31]="#CCCCCC";
	 colorlist[32]="#FF99CC";colorlist[33]="#FFCC99";colorlist[34]="#FFFF99";colorlist[35]="#CCFFCC";
	  colorlist[36]="#CCFFFF";colorlist[37]="#99CCFF";colorlist[38]="#CC99FF";colorlist[39]="#FFFFFF";
	 ocbody = "";
	  ocbody += "<table CELLPADDING=0 CELLSPACING=3>";
	  ocbody += "<tr height=\"20\" width=\"20\"><td align=\"center\"><table style=\"border:1px solid #808080;\" width=\"12\" height=\"12\" bgcolor=\""+e.value+"\"><tr><td></td></tr></table></td><td bgcolor=\"eeeeee\" colspan=\"3\" style=\"font-size:12px;\" align=\"center\">当前颜色</td><td bgcolor=\"eeeeee\" colspan=\"3\" style=\"font-size:12px;\" align=\"center\"><input onClick=\"parent.clearColor()\" type=button value='清除颜色'></input></td></tr>";
	  for(var i=0;i<colorlist.length;i++){
	  if(i%8==0)
	  ocbody += "<tr>";
	  ocbody += "<td width=\"14\" height=\"16\" style=\"border:1px solid;\" onMouseOut=\"parent.colordialogmouseout(this);\" onMouseOver=\"parent.colordialogmouseover(this);\" onMouseDown=\"parent.colordialogmousedown('"+colorlist[i]+"')\" align=\"center\" valign=\"middle\"><table style=\"border:1px solid #808080;\" width=\"12\" height=\"12\" bgcolor=\""+colorlist[i]+"\"><tr><td></td></tr></table></td>";
	  if(i%8==7)
	  ocbody += "</tr>";
	  }
	  ocbody += "</table>";
	  oPopBody.innerHTML=ocbody;
  }

function clickbox(dataGrid){
	
    this.menuBody   = document.createElement("ul");
    /**
     * addItem方法给右键菜单添加功能项。共三个参数
     * itemText :功能项（subItem,下同）的文字
     * styleImg : 功能项的小图标
     * ev       :功能项被点击时响应的函数 
     */
	 /*itemText,styleImg,ev*/
    this.addItem    = function(obj){
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			var menu    = this.menu;
			typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
			
			subItem.className = "ContextMenuSubItem";
			subItem.alt=obj[i].itemsm;
			subItem.value=obj[i].index || '';
				/*配合外部样式表，控制样式*/
				
			
//			var DataGrid=new DataGrid();
//			DataGrid.setNetChartVisible(false);
			var _this=this;
			subItem.onclick=function(){_this.lionclick(this);}
			this.menuBody.appendChild(subItem);

		}


    };
	this.lionclick=function(obj){
			for(var i=0;i<obj.parentNode.childNodes.length;i++){
					if(obj.parentNode.childNodes[i]==obj)continue;
					obj.parentNode.childNodes[i].style.cssText='background-color:#fff';
			}
			if(obj.alt=='以10的n次相乘'||obj.alt=='以10的n次相除')
			{
				document.getElementById('nby').style.display='block';
			}else
			{
				document.getElementById('nby').style.display='none';
			}
			
			if(obj.innerHTML=='常规'||obj.innerHTML=='财务大写'||obj.innerHTML=='文本'||obj.innerHTML=='套打大写'||obj.innerHTML=='中文数字小写'||obj.innerHTML=='中文数字大写'||obj.innerHTML=='一，二，三序号'||obj.innerHTML=='a,b,c序号'||obj.innerHTML=='A,B,C序号')
			{
				document.getElementById('select').style.display='none';
			}else
			{
				document.getElementById('select').style.display='block';
			}
			obj.style.cssText='background-color:#007eff;color:#FFF;cursor:default';
			document.getElementById('boxlog').innerHTML=obj.alt;
			

	}
	this.check=function(){
			var elm=document.getElementById("myContextMenu").getElementsByTagName('li');	
			for(var i=0;i<elm.length;i++){
				if(elm[i].style.cssText.indexOf('126')!=-1){
					var weishu=document.getElementById('xsd').value;
					var nby=document.getElementById('nby').style.display==='block'?document.getElementById('nbynum').value:'';
					
					
					dataGrid.setTextFormat({'format':elm[i].value || i,'weishu':weishu,'nby':nby});
					clearCeng("myContextMenu");
					break;	
				}	
			}

	}
	this.rendhtml=function(textFormat){
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.border ='8 px solid';
		box.style.borderColor ='#CCCCCC';
		box.style.background ='#eeeeee';
		box.style.width='300px';
		box.style.height='200px';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		
		var _this=this;
		box.innerHTML='<h1>设置单元格数字格式</h1><a class="float_del" onclick="clearCeng(\'myContextMenu\')" href="javascript:;">删除</a><div id="scrollbar" class="scrollbar"></div>';
		box.innerHTML+='<div id="boxbutton"><input id="check" class="ui-button-state" type="button" value="确认" ><br><input class="ui-button-state" type="button" value="取消"  onclick="clearCeng(\'myContextMenu\')" 	></div><div id="boxlog"></div>';
		box.innerHTML+='<div id="select">小数点位数：<select id="xsd" name="xsd"></select></div><div id="nby">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;n次方：<input id="nbynum" value="0" type="text" width="80"></div>';
		var config=eval(textFormat);
		for(var i=0;i<=30;i++){
			
			var newOption=new Option(i,i);
			if(i==config.weishu)newOption.selected=true;
			document.getElementById('xsd').add(newOption);	
		}
		document.getElementById('nbynum').value=config.nby;
		
		document.getElementById('scrollbar').appendChild(this.menuBody);
		document.getElementById("check").onclick=function(){_this.check();}
		new dragbox(box,box.getElementsByTagName('h1').item(0));
	}
}
function clickboxslantline(dataGrid){
	
    this.menuBody   = document.createElement("ul");
    /**
     * addItem方法给右键菜单添加功能项。共三个参数
     * itemText :功能项（subItem,下同）的文字
     * styleImg : 功能项的小图标
     * ev       :功能项被点击时响应的函数 
     */
	 /*itemText,styleImg,ev*/
    this.addItem    = function(obj){
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			var menu    = this.menu;
			typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
			
			subItem.className = "ContextMenuSubItem";
			subItem.alt=obj[i].itemsm;
				/*配合外部样式表，控制样式*/
				
			
//			var DataGrid=new DataGrid();
//			DataGrid.setNetChartVisible(false);
			var _this=this;
			subItem.onclick=function(){_this.lionclick(this);}
			this.menuBody.appendChild(subItem);

		}


    };
	this.lionclick=function(obj){
			for(var i=0;i<obj.parentNode.childNodes.length;i++){
					if(obj.parentNode.childNodes[i]==obj)continue;
					obj.parentNode.childNodes[i].style.cssText='background-color:#fff';
			}
			obj.style.cssText='background-color:#007eff;color:#FFF;cursor:default';
	}
	this.check=function(){
			var elm=document.getElementsByTagName('li');	
			for(var i=0;i<elm.length;i++){
				if(elm[i].style.cssText.indexOf('126')!=-1){
					dataGrid.setSlantLine(i-1);
					break;	
				}	
			}
			clearCeng("myContextMenu");

	}
	this.rendhtml=function(textFormat){
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.border ='8 px solid';
		box.style.borderColor ='#CCCCCC';
		box.style.background ='#eeeeee';
		box.style.width='300px';
		box.style.height='200px';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		
		var _this=this;
		box.innerHTML='<h1>设置单元格斜线格式</h1><a class="float_del" onclick="clearCeng(\'myContextMenu\')" href="javascript:;">删除</a><div id="scrollbar" class="scrollbar scrollbarlong"></div>';
		box.innerHTML+='<div id="boxbutton"><input id="check" class="ui-button-state" type="button" value="确认" ><br><input class="ui-button-state" type="button" value="取消"  onclick="clearCeng(\'myContextMenu\')" ></div>';
		var config=eval(textFormat);
		document.getElementById('scrollbar').appendChild(this.menuBody);
		document.getElementById("check").onclick=function(){_this.check();};
		new dragbox(box,box.getElementsByTagName('h1').item(0));
	}
}
function customizeCell(config,dataGrid,checkfuc){
	this.title=config.itemText;
	this.type=config.itermtype;
	this.boxheight=config.boxheight!=undefined?config.boxheight:'200px';
	this.itemsm=config.itemsm;
	this.iteminstruction=config.iteminstruction;
	if(checkfuc  ===  undefined){
		this.check=function(){
				var value=document.getElementById(this.itemsm).value;
				if(!/^\d+$/.test(value)&&this.itemsm=='num')
				{
					alert('请输入数字');
					return false;	
				}
				if(!/(V_|P_)[^\s]+$/.test(value)&&this.itemsm=='name')
				{
					alert('请注意格式');
					return false;	
				}
				dataGrid.setCustomizeCell(this.itemsm,value);
				clearCeng("myContextMenu");
	
		}
	}else{
		this.check=checkfuc;	
	}
	this.rendhtml=function(customizeCell){
		var html='';
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.border ='8px solid';
		box.style.borderColor ='#CCCCCC';
		box.style.background ='#eeeeee';
		box.style.width='300px';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		
		var _this=this;
		html='<h1>'+this.title+'</h1><a class="float_del" onclick="clearCeng(\'myContextMenu\')" href="javascript:;">删除</a>';
		var inputvalue='';
		if(customizeCell!=undefined)inputvalue=customizeCell;
		
		if(this.type==='input'){
			
			html+='<input type="text" class="input" id="'+this.itemsm+'" value="'+inputvalue+'">';
			if(this.iteminstruction!=''&&this.iteminstruction!=undefined)html+='<div class="duanluo">'+this.iteminstruction+'</div>';	
		}else if(this.type==='textarea')
		{
			html+='<textarea class="textarea" id='+this.itemsm+'>'+inputvalue+'</textarea>';	
		}
		html+='<div class="bottom_boxbutton"><input id="check" class="ui-button-state" type="button" value="确认" ><input class="ui-button-state" type="button" value="取消"  onclick="clearCeng(\'myContextMenu\')" ></div>';
		
		box.innerHTML=html;	
		
		box.getElementsByTagName("input").item(0).focus();
		
		document.getElementById("check").onclick=function(){_this.check();};
		new dragbox(box,box.getElementsByTagName('h1').item(0));
	}
}
function customizeAngle(config,dataGrid,checkfuc){
	var config = config;
	this.title=config.itemText;
	this.type=config.itermtype;
	
	this.boxheight=config.boxheight!=undefined?config.boxheight:'200px';
	this.boxwidth=config.boxwidth!=undefined?config.boxwidth:'300px';
	this.itemsm=config.itemsm;
	this.iteminstruction=config.iteminstruction;
	this.check=function(){
			var value=document.getElementById(this.itemsm).value;
			dataGrid.setCellImage({"turn":{"direction":"right","angle":value}});
			clearCeng("myContextMenu");
	}
	this.rendhtml=function(customizeCell){
		var html='';
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.border ='8px solid';
		box.style.borderColor ='#CCCCCC';
		box.style.background ='#eeeeee';
		box.style.zIndex ='100';
		box.style.width=this.boxwidth;
		box.style.height=this.boxheight;
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		
		var _this=this;
		var inputvalue='';
		html='<h1>'+this.title+'</h1><a class="float_del" onclick="clearCeng(\'myContextMenu\')" href="javascript:;">删除</a>';
		if(config.list !== undefined){//循环列出input列
			html+='<ul class="lilist">';
			for(var i=0;i<config.list.length;i++){
				if(config.list[i].itermtype ==='checkbox'){
					html+='<li  style="margin-right:65px;"><input type='+config.list[i].itermtype+' id='+config.list[i].itemsm+'><label for='+config.list[i].itemsm+'>'+config.list[i].itemtitle+'</label></li>';		
		
				}else if(config.list[i].itermtype ==='text'){
					if(customizeCell !== undefined){
						inputvalue=	customizeCell[config.list[i].itemsm];
					}
					html+='<li><span>'+config.list[i].itemtitle+'</span><input type='+config.list[i].itermtype+' class="input" id='+config.list[i].itemsm+' value='+inputvalue+'>';		
				}
			}
			html+='</ul>';
		}
		
		if(this.type==='input'){
			
				if(this.itemsm=='num'&&customizeCell[0]!=undefined)inputvalue=customizeCell[0];
				if(this.itemsm=='name'&&customizeCell[2]!=undefined)inputvalue=customizeCell[2];
			html+='<input type=text class="input" id='+this.itemsm+' value='+inputvalue+'>';
			
		}else if(this.type==='textarea')
		{
			var inputvalue='';
			if(customizeCell!=undefined&&customizeCell[1]!=undefined)inputvalue=customizeCell[1];
			html+='<textarea class="textarea" id='+this.itemsm+'>'+inputvalue+'</textarea>';	
		}
		if(this.iteminstruction!=''&&this.iteminstruction!=undefined)html+='<div class="duanluo">'+this.iteminstruction+'</div>';	
		html+='<div class="boxbutton2 "><input id="check" class="ui-button-state" type="button" value="确认" ><input class="ui-button-state" type="button" value="取消"  onclick="clearCeng(\'myContextMenu\')" ></div>';
		
		box.innerHTML=html;
		box.getElementsByTagName("input").item(0).focus();
		document.getElementById("check").onclick=function(){_this.check();};
		new dragbox(box,box.getElementsByTagName('h1').item(0));
	}
}
function saveAsCanvas(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
//	this.rendhtml=function(initial){
//		var html='';
//		var box=document.createElement('div');
//		box.id='myContextMenu';
//		box.style.width=500+"px";
//		box.style.height=this.boxheight;
//		document.body.appendChild(box);
//		box.style.position='absolute';
//		box.className = 'popupmenu_centerbox';
//		box.style.left= T.html.divCenterx(box);
//		box.style.top=divCentery(box);
		//box.innerHTML=T.ajax.ajaxGet('lib/htmllib/leftbar2.html');
		
//		var now=new Date(); 
//		var number = now.getYear().toString()+now.getMonth().toString()+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString();;
//		
//		var leftbarjson=ajaxInclude("leftbar.js?"+number);
//		if(leftbarjson!==''){
//			leftbarjson= eval('(' + leftbarjson + ')');
//		}	
//		new listFile(box,leftbarjson,dataGrid);
		//box.getElementsByTagName("input").item(0).focus();
		//document.getElementById("check").onclick=T.glproxy(this.check,this);
		
	//}
	this.check=function(){
			var value=document.getElementById(this.itemsm).value;
			if(value==''){alert('请填写');return false;}
			dataGrid.saveCanvasToLocal(value);
			clearCeng("myContextMenu");
	}
}
function setcellorder(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.rendhtml=function(initial){
		var html='';
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		box.innerHTML=T.ajax.ajaxGet('lib/htmllib/setCellOrder.html');
		box.getElementsByTagName("input").item(0).focus();
		if(initial.cellnumber!==undefined){
			document.getElementById("item1").value=initial.pianyih;
			document.getElementById("item2").value=initial.pianyil;
			document.getElementById("seltype").getElementsByTagName('option').item(initial.type-1).selected=true;
			document.getElementById("orderrule").value=initial.format;
			var rule =document.getElementsByName("rule");
			for(var i=0;i<rule.length;i++){
				if(rule[i].value===initial.rule){;
					rule[i].checked=true;
					break;	
				}	
			}
		}
		document.getElementById("check").onclick=T.glproxy(this.check,this);
		new dragbox(box,box.getElementsByTagName('h1').item(0));
	}
	this.check=function(){
			var value=document.getElementById(this.itemsm).value;
			if(value==''){alert('请填写');return false;}
			var pianyih=document.getElementById("item1").value;
			var pianyil=document.getElementById("item2").value;
			var rule =document.getElementsByName("rule");
			for(var i=0;i<rule.length;i++){
				if(rule[i].checked===true){;
					rule=rule[i].value;
					break;	
				}	
			}
			var type=document.getElementById("seltype").value;
			var format=document.getElementById("orderrule").value;
			
			dataGrid.setSelCellTag({"cellnumber": true,"rule":rule,"type":type,"format":format,"pianyih":pianyih,"pianyil":pianyil});
			clearCeng("myContextMenu");
	}
}
function exportAsCanvas(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.check=function(){
			var value=document.getElementById(this.itemsm).value;
			if(value==''){alert('请填写');return false;}
			dataGrid.saveCanvasToLocal(value,'export');
			clearCeng("myContextMenu");
	}
}
function editCellUrlbox(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.check=function(){
			var url=document.getElementById('url').value;
			var newwin=document.getElementById('newwin').checked;
			if(url==''){alert('请填写');return false;}
			dataGrid.setCellControlsItem({
				type: "url",
				value:url,
				newwin:newwin
			});
			dataGrid.setSelCellFontColor("#4888eb");
			clearCeng("myContextMenu");
			dataGrid.clear();
			dataGrid.paint();

	}
}


function editcellCustomScript(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.check=function(){
			var value=document.getElementById(this.itemsm).value;
			if(value==''){alert('请填写');return false;}
			dataGrid.savecellCustomScript(value);
			clearCeng("myContextMenu");
	}
}
function editStatisticscript(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.check=function(){
			var value=document.getElementById(this.itemsm).value;
			if(value==''){alert('请填写');return false;}
			dataGrid.saveStatisticscript(value);
			clearCeng("myContextMenu");
	}
}
function editcelldropdownbox(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.check=function(){
		var table=document.getElementById("table");
		var tr=table.getElementsByTagName("tr");
		var items=[];
		for(var i=0;i < tr.length;i++)
		{
				var td1=tr[i].getElementsByTagName("td").item(0).innerHTML;
				var td2=tr[i].getElementsByTagName("td").item(1).innerHTML;
				items.push({"key":td1,"value":td2});
		}
		var tagval=0;
		tagval=document.getElementById("item3").checked?tagval|(1<<1):tagval|(0<<1);
		dataGrid.setCellControlsItem({
			type: "dropdownbox",
			tagval:tagval,
			value:items
		});
		clearCeng("myContextMenu");
		dataGrid.clear();
		dataGrid.paint();

	}
	this.plus=function(){
		var item1=document.getElementById("item1").value;
		var item2=document.getElementById("item2").value;
		if(item1!=''&&item2!=''){
			var li=document.createElement("tr");
			li.innerHTML='<td>'+item1+'</td><td>'+item2+'</td>';
			document.getElementById("table").appendChild(li);	
		}else{
			alert('请填写');return false;
		}
	}
	this.del=function(){
		var item1=document.getElementById("item1").value;
		var item2=document.getElementById("item2").value;
		if(item1!=''&&item2!=''){
			var table=document.getElementById("table");
			var tr=table.getElementsByTagName("tr");
			for(var i=0;i < tr.length;i++){
				if(tr[i].style.cssText.indexOf('255')!=-1)
				{
					table.removeChild(tr[i]);	
				}	
			}
		}else{
			alert('请填写');return false;
		}
	}
	this.insert=function(){
		var item1=document.getElementById("item1").value;
		var item2=document.getElementById("item2").value;
		if(item1!=''&&item2!=''){
			var table=document.getElementById("table");
			var tr=table.getElementsByTagName("tr");
			var seltr=false;
			for(var i=0;i<tr.length;i++){
				if(tr[i].style.cssText.indexOf('255')!=-1)
				{
					var x=table.insertRow(i);
					var y=x.insertCell(0);
					var z=x.insertCell(1);
					y.innerHTML=item1;
					z.innerHTML=item2;
					seltr=true;
					break;
				}
			}
			if(!seltr){alert('请选中行');return false;}
		}else{
			alert('请填写');return false;
		}
	}
	this.edit=function(){
		var item1=document.getElementById("item1").value;
		var item2=document.getElementById("item2").value;
		if(item1!=''&&item2!=''){
			var table=document.getElementById("table");
			var tr=table.getElementsByTagName("tr");
			var seltr=false;
			for(var i=0;i < tr.length;i++){
				if(tr[i].style.cssText.indexOf('255')!=-1)
				{
					tr[i].getElementsByTagName("td").item(0).innerHTML=item1;
					tr[i].getElementsByTagName("td").item(1).innerHTML=item2;
					seltr=true;
					break;
				}
			}
			if(!seltr){alert('请选中行');return false;}
		}else{
			alert('请填写');return false;
		}
	}

	this.rendhtml=function(customizeCell){
		var html='';
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		box.innerHTML=T.ajax.ajaxGet('lib/htmllib/editdropdownbox.html');
		box.getElementsByTagName("input").item(0).focus();
		if(customizeCell!==undefined){
			if((customizeCell.tagval >> 1) & 0x01){
				document.getElementById("item3").checked=true;	
			}
			if(customizeCell.childs!==undefined){
				var tempvalue = customizeCell.childs;				
				
				var table=document.getElementById("table");
				
	
				for(var i = 0;i < tempvalue.length; i++){
						table.insertRow(i);
						table.rows[i].insertCell(0);
						table.rows[i].cells[0].appendChild(document.createTextNode(i));
						table.rows[i].insertCell(1);
						table.rows[i].cells[1].appendChild(document.createTextNode(tempvalue[i].value));
				}
			}
		}
		document.getElementById("plus").onclick=T.glproxy(this.plus,this);
		document.getElementById("del").onclick=T.glproxy(this.del,this);
		document.getElementById("insert").onclick=T.glproxy(this.insert,this);
		document.getElementById("edit").onclick=T.glproxy(this.edit,this);
		
		
		document.getElementById("table").onclick=function(event){
			var elm=event.target;
			var tr=this.getElementsByTagName("tr");
			for(var i=0;i<tr.length;i++){
				tr[i].style.backgroundColor='#CBD8AC';	
			}
			if(elm.parentNode.nodeName.toUpperCase()==='TR'){
				elm.parentNode.style.backgroundColor='#fff';	
			}	
		}
		document.getElementById("check").onclick=T.glproxy(this.check,this);
		new dragbox(box,box.getElementsByClassName('tangram-dialog-title').item(0));
	}
}
function editcellTimeControls(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.check=function(){
		var input=document.getElementById("myContextMenu").getElementsByTagName("input");
		var sel=false;
		for(var i=0;i < input.length;i++){
			if(input[i].checked)
			{
				dataGrid.setCellControlsItem({
					type: "time",
					value:String(i+1),
					edit:false
				});
				sel=true;
				break;	
			}	
		}
		if(!sel){alert('请填写');return false;}
		clearCeng("myContextMenu");
		dataGrid.clear();
		dataGrid.paint();

	}
	this.rendhtml=function(customizeCell){
		var html='';
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		box.innerHTML=T.ajax.ajaxGet('lib/htmllib/editTimeControls.html');;
		box.getElementsByTagName("input").item(0).focus();
		
		document.getElementById("check").onclick=T.glproxy(this.check,this);
		new dragbox(box,box.getElementsByTagName('h1').item(0));
	}
}
function frozenCell(config,dataGrid){
	this.title=config.itemText;
	this.type=config.itermtype;
	this.boxheight=config.boxheight!=undefined?config.boxheight:'200px';
	this.itemsm=config.itemsm;
	this.iteminstruction=config.iteminstruction;
	this.check=function(){
			var check2=document.getElementById("check2").checked==true?document.getElementById("check2").value:false;
			var check4=document.getElementById("check4").checked==true?document.getElementById("check4").value:false;
			dataGrid.setfrozenCell(check2,check4);
			clearCeng("myContextMenu");

	}
	this.rendhtml=function(frozenCell,frozenCellAll){
		var html='';
		var box=document.createElement('div');
		box.style.position='absolute';
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		var _this=this;
		
		box.innerHTML=T.ajax.ajaxGet('lib/htmllib/cellEditStatus.html');	
		if(!(frozenCell >> 0) & 0x01)document.getElementById("check2").checked=true;
		if(frozenCellAll)document.getElementById("check4").checked=true;
		document.getElementById("check").onclick=function(){_this.check();};
		document.getElementById("checkfalse").onclick=function(){clearCeng("myContextMenu");};
		new dragbox(box,box.getElementsByClassName('tangram-dialog-title').item(0));
	}
}
function uploadImg(config,dataGrid,type,func){
	var dataGrid=dataGrid;
	var config = config;
	this.title=config.itemText;
	this.type=type;
	this.boxheight=config.boxheight!=undefined?config.boxheight:'200px';
	this.itemsm=config.itemsm;
	this.iteminstruction=config.iteminstruction;
	var func=func;
	
	this.check=function(){
			var check2=document.getElementById("check2").checked==true?document.getElementById("check2").value:false;
			var check4=document.getElementById("check4").checked==true?document.getElementById("check4").value:false;
			dataGrid.setfrozenCell(check2,check4);
			clearCeng("myContextMenu");

	}
	this.rendhtml=function(frozenCell,frozenCellAll){
		var html='';
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.style.width='500px';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		
		var _this=this;
		
		box.innerHTML=T.ajax.ajaxGet('lib/htmllib/imageUpload.html');
		box.getElementsByTagName("input").item(2).value=this.type;
		box.getElementsByTagName("span").item(0).innerHTML=this.title;
		
		new dragbox(box,box.getElementsByClassName('tangram-dialog-title').item(0));
	}
	putImage=function (image){
		if(image.type==='table')
		{
		    var img=new Image();
			var listid=T.array.InArray({"src":arguments[2],'width':image.width,'height':image.height},dataGrid._imglist);//查询ftid的值 若为false则 插入
			if(listid === false){
				 dataGrid._imglist.push({"src":arguments[2],'width':image.width,'height':image.height});
				 listid=dataGrid._imglist.length;
			}
			img.src =arguments[2];
			img.id="uploadimgToCanavs";

			dataGrid._tableimage+=listid+',';
			img.onload=function()
			{	
				document.body.appendChild(img);
				var uploadimgToCanavs=new dragimg(img.id,img.width,img.height);	
			}
		}else if(image.type==='cell')
		{	
			
			dataGrid.putimgToCell(image);
			
		
		}else if(image.type==='cellbutton'){
			dataGrid.putimgToCell(image,'button',config.imagepos);
		
		}else if(image.type!==undefined&&image.type.indexOf('canvas')!=-1)
		{
			var listid=T.array.InArray({'height':String(image.height),"src":arguments[2],'width':String(image.width)},dataGrid._imglist);//查询ftid的值 若为false则 插入
			
			
			if(listid === false){
				 dataGrid._imglist.push({"src":arguments[2],'width':image.width,'height':image.height});
				 listid=dataGrid._imglist.length;
			}
			dataGrid.putimgToCanvas(listid,this.type.value);
		}else
		{	
			func(arguments[0]);
			dataGrid.importxml('html/upload/'+arguments[0]);//导入xjc文件			
			

		}	

		
	}

}
function measure(orignPos){
	document.onmousemove=function(event){
		var e=event||window.event;
		var glGetMousePageXY=function(e)
		{
			var x = e.pageX?e.pageX:(document.body.scrollLeft+e.clientX);
			var y = e.pageY?e.pageY:(document.body.scrollTop + e.clientY);
			return {x:x,y:y};
		}
		var pos=glGetMousePageXY(e);
		if(document.getElementById("measure"))document.body.removeChild(document.getElementById("measure"));
		var div=document.createElement("div");
		div.id="measure";
		div.style.cssText="position:absolute;width:100px;height:20px;left:"+0+";top:"+0;
		div.innerHTML="x:"+(pos.x-orignPos.x)+"&nbsp;y:"+(pos.y-orignPos.y);
		document.body.appendChild(div);
	  
	};
}
var menuItem=function()
{
	this.menuBody   = document.createElement("ul");
	
    this.menuChild = document.createElement("ul");
	
    this.addItem=function(obj){
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			var menu    = this.menu;
			typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
			
			subItem.className = "ContextMenuSubItem";
			subItem.alt=obj[i].itemsm;
			subItem.data_name=obj[i].tag;

				/*配合外部样式表，控制样式*/
			if(obj[i].child!=undefined){
				var menuChilds=this.createItem(obj[i].tag,obj[i].child,"childscrollbar");
				this.menuChild.appendChild(menuChilds);
			}
			
			var _this=this;
			subItem.onclick=function(){_this.lionclick(this);};
			this.menuBody.appendChild(subItem);

		}

    }
	this.createItem= function(parent,obj,css){
		 var menubody=document.createElement("div");
		 menubody.className=css;
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			
			var menu    = this.menu;			
			typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
			subItem.data_name="child_"+parent;
			subItem.data_sm=obj[i].itemsm;//类型说明
			
				/*配合外部样式表，控制样式*/
			var _this=this;
			subItem.onclick =function(){_this.lionclick(this);};
			
			
			menubody.appendChild(subItem);
		}
		return menubody;
    }
}
	
function clickboxCellDate(config,dataGrid)//单元显示格式
{
	menuItem.call(this);
	this.width=config?config.width:300;
    this.height=config?config.height:200;
	/**
     * addItem方法给右键菜单添加功能项。共三个参数
     * itemText :功能项（subItem,下同）的文字
     * styleImg : 功能项的小图标
     * ev       :功能项被点击时响应的函数 
     */
	 /*itemText,styleImg,ev*/

	this.lionclick=function(obj){
		  for(var i=0;i<obj.parentNode.childNodes.length;i++){
				  if(obj.parentNode.childNodes[i]==obj)continue;
				  obj.parentNode.childNodes[i].style.cssText='background-color:#fff';
			  
		  }
		  obj.style.cssText='background-color:#007eff;color:#FFF;cursor:default';	
		 if(obj.data_name.indexOf("child")==-1)
		  {
			var child=document.getElementById('childscrollbar').getElementsByTagName("li");
			for(var i=0;i < child.length;i++)
			{
				if(obj.data_name=="all")
				{
					child[i].style.display="block";	
				}else
				{
					child[i].style.display="none";
					if(child[i].data_name=="child_"+obj.data_name)
					{
						child[i].style.display="block";	
					}
				}
			}
		  }

	}
	this.check=function(){
		var elm=document.getElementById("childscrollbar").getElementsByTagName('li');
		for(var i=0;i<elm.length;i++){
			if(elm[i].style.cursor==='default'){
				dataGrid.setTextFormat({'format':elm[i].data_sm,'type':'lexcel'});
				clearCeng("myContextMenu");
				break;
			}
		}
	}
	
	this.rendhtml=function(textFormat){
		var bd=document;
		var box=bd.createElement('div');
		var _this=this;
		box.id='myContextMenu';
		bd.body.appendChild(box);
		box.className = 'popupmenu_centerbox';
		box.style.width=this.width+"px";
		box.style.height=this.height+"px";
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		
		box.innerHTML='<h1>设置单元格数字格式</h1><a class="float_del" onclick="clearCeng(\'myContextMenu\')" href="javascript:;">删除</a><div id="scrollbar" class="scrollbar"></div>';
		box.innerHTML+='<div id="boxbutton"><input id="check" class="ui-button-state" type="button" value="确认" ><br><input class="ui-button-state" type="button" value="取消"  onclick="clearCeng(\'myContextMenu\')" ></div>';
		box.innerHTML+='<div id="childscrollbar" class="childscrollbar"></div>';
		
		var config=eval(textFormat);
		bd.getElementById('scrollbar').style.height=bd.getElementById('childscrollbar').style.height="240px";
		
		bd.getElementById('scrollbar').appendChild(this.menuBody);
		

		bd.getElementById('childscrollbar').appendChild(this.menuChild);
		
		bd.getElementById('check').onclick=T.glproxy(this.check,this);
		
		new dragbox(box,box.getElementsByTagName('h1').item(0));

	}
}
function customizeBox(config,dataGrid,checkfuc){
	var config = config;
	this.title=config.itemText;
	this.type=config.itermtype;
	
	this.boxheight=config.boxheight!=undefined?config.boxheight:'200px';
	this.boxwidth=config.boxwidth!=undefined?config.boxwidth:'300px';
	this.itemsm=config.itemsm;
	this.iteminstruction=config.iteminstruction;
	this.check = checkfuc;
}
customizeBox.prototype.rendhtml=function(html,config){
	var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		
		box.style.position='absolute';
	box.style.width=this.boxwidth;
	box.style.height=this.boxheight;
	box.style.left= T.html.divCenterx(box);
	box.style.top=T.html.divCentery(box);
	var _this=this;
	box.innerHTML=html;
	if(config !== undefined )config();
	box.getElementsByTagName("input").item(0).focus();
	document.getElementById("check").onclick=function(){_this.check();};
	if(box.getElementsByClassName('tangram-dialog-title').item(0)!==null){
		new dragbox(box,box.getElementsByClassName('tangram-dialog-title').item(0));
	}else{
		new dragbox(box,box.getElementsByTagName('h1').item(0));	
	}
}

var DateFormat = function(DaysToAdd, strFormat,type) {
    this.strFormat = strFormat.replace(/;@/,'');
	if(type==='lexcel'){
		if(/^(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2}):(\d{2}))?$/.test(DaysToAdd)){
			this.curDate = new Date(DaysToAdd);		
		}else{
			if(DaysToAdd > 14245){
				DaysToAdd = (DaysToAdd-14245) % 36525;
				if (DaysToAdd == 0) DaysToAdd = 36525;
				this.curDate = new Date(1939, 0, 1, 0, 0, 0);		
			}else{
				this.curDate = new Date(2000, 0, 1, 0, 0, 0);
			}
		
			if (DaysToAdd == 0) DaysToAdd = "1";
		
			var days = DaysToAdd;
		
			var s = 0;
			DaysToAdd=String(DaysToAdd);
			if (isNaN(DaysToAdd)) {
				DaysToAdd = DaysToAdd.toString();
			}
		
			if (T.string.glCountInstances(DaysToAdd, '.') > 1) {
				return DaysToAdd;
		
			} else if (DaysToAdd.indexOf('.') != -1) {
				var DaysString = DaysToAdd.split(".");
		
				DaysToAdd = parseInt(DaysString[0], 10);
				s = (days - DaysToAdd) * 100000;
		
			}
			DaysToAdd--;
			
			this.curDate = this.curDate.getTime() + (DaysToAdd * 24 * 60) * 1000 * 60 + s * 1000;
		}
	}else{
		 this.curDate = new Date(DaysToAdd);	
	}
	this.curDate=new Date(this.curDate);
}
DateFormat.parseTime=function(time){
	
        var date = new Date(time);
        return {
			'Y': date.getFullYear(),
            'M': date.getMonth() + 1,
			'ZM': (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):(date.getMonth() + 1),
            'D': date.getDate(),
			'ZD':date.getDate()<10?'0'+date.getDate():date.getDate(),
            'h': date.getHours(),
            'm': date.getMinutes(),
			'zm': date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes(),
            's': date.getSeconds()
        };
}
DateFormat.prototype = {
    Weeks_abbr: {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    },

    Months_abbr: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //定义一些常用的日期格式的常量   

    parseDate: function() {
        var strDate = this.getDateObject();
        var tempFormat = this.strFormat;
        if (/(y+)/.test(tempFormat)) { //匹配年份
            var fullYear = this.curDate.getFullYear() + '';
            var year = RegExp.$1.length == 4 ? fullYear: fullYear.substr(4 - RegExp.$1.length);
            tempFormat = tempFormat.replace(RegExp.$1, year);
        }
		
        if (/[^:m]?(m+)/g.test(tempFormat)) { //匹配m
          var tmpmonth = strDate.M + '';
            if (RegExp.$1.length === 1) {
                month = strDate.M;
            } else if (RegExp.$1.length === 2 ) {//mm月份
			    month = strDate.M.toString().length == 1 ? '0' + strDate.M: strDate.M;
           
		    } else if (RegExp.$1.length == 3) {//mmm
               
			    month = strDate.amonthEng;//strDate.m.length == 1 ? '0' + strDate.m: strDate.m;
           
		    } else if (RegExp.$1.length == 4) {
                month = strDate.monthEng;
            }
            tempFormat = tempFormat.replace(RegExp.$1, month);
			
			if(/(mm)-{0}/g.test(tempFormat)){
           	 	tempFormat = tempFormat.replace(RegExp.$1, strDate.m.toString().length == 1 ? '0' + strDate.m: strDate.m);
			}
        }
		if(/(:(m+))/g.test(tempFormat) || /(mm"分)/g.test(tempFormat)) { //匹配分
			var tmpminutes= strDate.m + '',minutes='';
			if(RegExp.$1.length === 3){
				minutes=tmpminutes.toString().length == 1 ? '0' + strDate.m: strDate.m;
			}else if(RegExp.$1.length === 4){
				minutes = tmpminutes.toString().length == 1 ? '0' + strDate.m: strDate.m+"分";	
			}
			tempFormat = tempFormat.replace(RegExp.$1, ':'+minutes);
		}
        if (/(d+)/.test(tempFormat)) { //匹配D
            var fullDay = this.curDate.getDate() + '';
            var Day = RegExp.$1.length == 1 ? fullDay: '0' + fullDay;
            tempFormat = tempFormat.replace(RegExp.$1, Day);
        }

        if (/(h+)/.test(tempFormat)) { //匹配h
            if (RegExp.$1.length === 1) {
                tempFormat = tempFormat.replace(RegExp.$1, strDate.H);
            }
        }

        if (/(AM\/PM)/.test(tempFormat)) { //匹配h
           if (RegExp.$1.length === 5) { 
                tempFormat = tempFormat.replace(RegExp.$1, strDate.tt);
            }
        }
        if (/(aaaa)/.test(tempFormat)) { //匹配h
            if (RegExp.$1.length ===4) {
                tempFormat = tempFormat.replace(RegExp.$1, "\u661f\u671f" + this.Weeks_abbr[strDate.weekday]);
            }
        }
        if (/(ss)/.test(tempFormat)) { //匹配ss
            if (RegExp.$1.length ===2) {
                tempFormat = tempFormat.replace(RegExp.$1, strDate.s.toString().length == 1 ? '0' + strDate.s: strDate.s);
            }
        }
        return tempFormat;

    },

    getDateObject: function() {
        date = this.curDate;
        return {
			'Y': date.getFullYear(),
            'M': date.getMonth() + 1,
            'd': date.getDate(),
            'H': date.getHours(),
            'm': date.getMinutes(),
            's': date.getSeconds(),
            'monthEng': this.Months_abbr[date.getMonth()],
            'amonthEng': this.Months_abbr[date.getMonth()],// + 1],
            'tt': date.getHours() < 12 ? 'AM': 'PM',
            'weekday': (date.getUTCDay() + 2) > 6 ? date.getUTCDay() + 2 - 6 : date.getUTCDay() + 2
        };
    },
}
