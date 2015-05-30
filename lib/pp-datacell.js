// JavaScript Document
function DataCell(config)
{	
	
	if(config.t !== undefined){//单元文本内容。
		this._t = config.t;	
	}

	if(config.backColor != undefined)
	{
		this._backColor = config.backColor;
	}
	else 
	{
		this._backColor = "#fff";
	}
	if(config.col != undefined)
	{   
	    this._col = config.col;
	}
	
	if(config.fontSize != undefined)
	{   
	    this._fontSize = config.fontSize;
	}
	else
	{
	    this._fontSize = 12;
	}
	if(config.fontFamily != undefined)
	{
		this._fontFamily = config.fontFamily;
	}
	else
	{
		this._fontFamily = "宋体";
	}
	if(config.fontColor!= undefined)
	{
		this._fontColor = config.fontColor;
	}
	else
	{
		this._fontColor = "#000";
	}
	if(config.fontBold != undefined)
	{
		this._fontBold = config.fontBold;
	}
	else
	{
		this._fontBold = false;
	}
	if(config.fontItalic!= undefined)
	{
		this._fontItalic = config.fontItalic;
	}
	else
	{
		this._fontItalic = false;
	}
	if(config.fontUnderline!= undefined)
	{
		this._fontUnderline = config.fontUnderline;
	}
	else
	{
		this._fontUnderline = false;
	}
	if(config.autoLineFeed!= undefined)
	{
		this._autoLineFeed = config.autoLineFeed;
	}
	else
	{
		this._autoLineFeed = false;
	}
	
	if(config.textFormat!= undefined)
	{
		this._textFormat= config.textFormat;
	}
	else
	{
		this._textFormat={'format':'default','weishu':'2','nby':'0'};
	}
	if(config.frozenCell!= undefined)
	{
		this._frozenCell= config.frozenCell;
	}
	else
	{
		this._frozenCell=false;
	}
	if(config.frozenCellAll!= undefined)
	{
		this._frozenCellAll= config.frozenCellAll;
	}
	else
	{
		this._frozenCellAll=false;
	}

	if(config.customizeCell!= undefined)
	{
		this._customizeCell= config.customizeCell;
	}
	else
	{
		this._customizeCell=[];//num,string,name
	}
	if(config.textAlign!= undefined)
	{
		this._textAlign = config.textAlign;
	}
	else
	{
		this._textAlign = "left";
	}
	if(config.horMargin!= undefined)
	{
		this._horMargin = config.horMargin;
	}
	else
	{
		this._horMargin = 5;//文字水平内左边距
	}
	if(config.verAlign!= undefined)
	{
		this._verAlign = config.verAlign;
	}
	else
	{
		this._verAlign = "default";
	}
	if(config.verMargin != undefined)
	{
		this._verMargin = config.verMargin;
	}
	else
	{
		this._verMargin = 5;//文字水平内上边距
	}
	if(config.leftNetLine != undefined)
	{
		this._leftNetLine = config.leftNetLine;
	}
	else
	{
		this._leftNetLine = true;
	}
	if(config.rightNetLine != undefined)
	{
		this._rightNetLine = this.rightNetLine ;
	}
	else
	{
		this._rightNetLine = true;
	}
	
	if(config.borderTopStyle!= undefined)
	{
		this._borderTopStyle = config.borderTopStyle;
	}
	else
	{
		this._borderTopStyle = "default";
	}
	
	if(config.borderTopColor!= undefined)
	{
		this._borderTopColor = config.borderTopColor;
	}
	else
	{
		this._borderTopColor = "#000";
	}
	if(config.borderTopWidth!= undefined)
	{
		this._borderTopWidth = config.borderTopWidth;
	}
	else
	{
		this._borderTopWidth = 0;
	}
	if(config.borderRightStyle!= undefined)
	{
		this._borderRightStyle = config.borderRightStyle;
	}
	else
	{
		this._borderRightStyle = "default";
	}
	if(config.borderRightWidth!= undefined)
	{
		this._borderRightWidth = config.borderRightWidth;
	}
	else
	{
		this._borderRightWidth = 0;
	}
	if(config.borderRightColor!= undefined)
	{
		this._borderRightColor = config.borderRightColor;
	}
	else
	{
		this._borderRightColor = "#000";
	}
	if(config.borderBottomStyle!= undefined)
	{
		this._borderBottomStyle = config.borderBottomStyle;
	}
	else
	{
		this._borderBottomStyle = "default";
	}
	if(config.borderBottomWidth!= undefined)
	{
		this._borderBottomWidth = config.borderBottomWidth;
	}
	else
	{
		this._borderBottomWidth = 0;
	}
	if(config.borderBottomColor!= undefined)
	{
		this._borderBottomColor = config.borderBottomColor;
	}
	else
	{
		this._borderBottomColor = "#000";
	}
	if(config.borderLeftStyle!= undefined)
	{
		this._borderLeftStyle = config.borderLeftStyle;
	}
	else
	{
		this._borderLeftStyle = "default";
	}
	if(config.borderLeftWidth!= undefined)
	{
		this._borderLeftWidth = config.borderLeftWidth;
	}
	else
	{
		this._borderLeftWidth = 0;
	}
	if(config.borderLeftColor!= undefined)
	{
		this._borderLeftColor = config.borderLeftColor;
	}
	else
	{
		this._borderLeftColor = "#000";
	}
	if(config.rowspan!= undefined)
	{
		this._rowspan = config.rowspan;
	}
	else
	{
		this._rowspan = 0;
	}
	if(config.colspan!= undefined)
	{
		this._colspan = config.colspan;
	}
	else
	{
		this._colspan = 0;
	}

	if(config.borderline!= undefined)
	{
		this._borderline = config.borderline;
	}
	else
	{
		this._borderline = 'none';
	}
//	if(config.borderlineStyle!==undefined)
//	{
//		this._borderlineStyle = config.borderlineStyle;
//	}
//	else
//	{
//		this._borderlineStyle = [
//		{color:"#000000",style:"solod","width":1},
//		{color:"#000000",style:"solod","width":1},
//		{color:"#000000",style:"solod","width":1},
//		{color:"#000000",style:"solod","width":1},
//		{color:"#000000",style:"solod","width":1}
//		];
//	}
	if(config.slantLine!= undefined)
	{
		this._slantline = config.slantLine;
	}
	else
	{
		this._slantLine = "none";
	}
	if(config.cellImage!= undefined)
	{
		this._cellImage= config.cellImage;
	}
	else
	{
		this._cellImage = "none";
	}
	if(config.backImage!= undefined)
	{
		this._backImage = config.backImage;
	}
	else
	{
		this._backImage = "";
	}
	if(config.backImageScaleType!= undefined)
	{
		this._backImageScaleType = config.backImageScaleType;
	}
	else
	{
		this._backImageScaleTyoe = "default";
	}
	if(config.textWidth!= undefined)
	{
		this._textwidth = config.textWidth;
	}
	else
	{
		this._textwidth = "default";
	}	
	if(config.controlsItem!= undefined)
	{
		this._controlsItem = config.controlsItem;
	}
	else
	{
		this._controlsItem = "none";
	}
	if(config.customScript!= undefined)
	{
		this._customScript = config.customScript;
	}
	else
	{
		this._customScript = "none";
	}
	if(config.note!==undefined){
		this._note = config.note;
	}else{
		this._note = "none";
	}
	if(config.tip!==undefined){
		this._tip = config.tip;
	}else{
		this._tip= "none";
	}
	if(config.numberOnly!==undefined){
		this._numberOnly = config.numberOnly;
	}else{
		this._numberOnly= false;
	}
	if(config.numberOnly!==undefined){
		this._numberOnly = config.numberOnly;
	}else{
		this._numberOnly= false;
	}
	if(config.cellTag!==undefined){
		this._cellTag = config.cellTag;
	}else{
		this._cellTag= {"superscript":false};
	}
	if(config.visible!==undefined){
		this._visible = config.visible;	
	}else{
		this._visible = true;
	}
	if(config.fl!==undefined){
		this._fl = config.fl;	
	}else{
		this._fl = '';
	}
	if(config.tag!==undefined){
		this._tag = config.tag;	
	}else{
		this._tag = '';
	}
	if(config.flex!==undefined){
		this._flex = config.flex;	
	}else{
		this._flex = '';
	}
	if(config.brid!==undefined){//在单元背景色对象列表的索引号
		this._brid = config.brid;	
	}
	if(config.dpt!==undefined){//表示单元的数字小数位显示为1位，如果此项没有，则表示单元小数位显示为2位
		this._dpt = config.dpt;	
	}
	if(config.ftid!==undefined){//字体索引号
		this._ftid = config.ftid;	
	}
	if(config.tpenid!==undefined){//框线的对象类型的索引号
		this._tpenid = config.tpenid;	
	}
	if(config.bpenid!==undefined){//框线的对象类型的索引号
		this._bpenid = config.bpenid;	
	}
	if(config.lpenid!==undefined){//框线的对象类型的索引号
		this._lpenid = config.lpenid;	
	}
	if(config.rpenid!==undefined){//框线的对象类型的索引号
		this._rpenid = config.rpenid;	
	}
	if(config.hag!==undefined){//6表示单元文本的水平对齐方式是居中齐方式。0表示水平对齐方式是居左，2表示水平对齐方式
		this._hag = config.hag;	
	}
	if(config.vag!==undefined){//0表示单元文本的垂直对齐方式是居左6表示垂直对齐方式是居中，8表示垂直对齐方式是居下。
		this._vag= config.vag;	
	}
	if(config.swty!==undefined){//框线的对象类型的索引号
		this._swty = config.swty;	
	}
	if(config.spenid!==undefined){//斜线的对象类型的索引号
		this._spenid = config.spenid;	
	}
	if(config.tcor!==undefined){//表示单元文本的颜色
		this._tcor = config.tcor;	
	}	
	if(config.bcor!==undefined){//表示单元背景颜色
		this._bcor = config.bcor;	
	}	
	if(config.slty!==undefined){//单元斜线类型
		this._slty = config.slty;	
	}	
	if(config.bname!==undefined){//单元变量名
		this._bname = config.bname;	
	}	
	if(config.f!==undefined){//单元公式。
		this._f= config.f;	
	}	
	if(config.rows!==undefined){//组合单元的行数-1，如果为0，表示组合单元只有一行。
		this._rows = config.rows;	
	}	
	if(config.cols!==undefined){//组合单元的列数-1
		this._cols = config.cols;	
	}	
	if(config.imgid!==undefined){//组合单元的列数-1
		this._imgid = config.imgid;	
	}
	if(config.imgangle!==undefined){//组合单元的列数-1
		this._imgangle = config.imgangle;	
	}	

	if(config.uval!==undefined){//自定义数值，，缺省为0
		this._uval= config.uval;	
	}	
	if(config.sval!==undefined){//自定义字符值
		this._sval = config.sval;	
	}	
	if(config.tspan!==undefined){//单元文字上间距
		this._tspan = config.tspan;	
	}	
	if(config.lspan!==undefined){//单元文字左间距
		this._lspan = config.lspan;	
	}	
	if(config.lkspan!==undefined){//单元文字缩进字符个数
		this._lkspan = config.lkspan;	
	}	
	if(config.rspan!==undefined){//单元文字右间距
		this._rspan = config.rspan;	
	}	
	if(config.bspan!==undefined){//单元文字下边距
		this._bspan = config.bspan;	
	}	
	if(config.rowspan!==undefined){//单元文字行间距
		this._rowspan = config.rowspan;	
	}	
	if(config.colspan!==undefined){//单元文字列间距
		this._colspan = config.colspan;	
	}	
	if(config.note!==undefined){//单元字段定义脚本
		this._note = config.note;	
	}	
	if(config.lscript!==undefined){//数据动态绑定单元文字颜色、背景色定义
		this._lscript = config.lscript;	
	}	
	if(config.lexcel!==undefined){//日期时间格式定义
		this._lexcel = config.lexcel;	
	}	
	if(config.ldata!==undefined){//单元数据定义脚本
		this._ldata = config.ldata;	
	}	
	if(config.cmscript!==undefined){//单元内容修改之后运行的脚本
		this._cmscript = config.cmscript;	
	}	
	if(config.input!==undefined){//单元最大的输入字符个数，缺省为-1，表示不限制个数
		this._input = config.input;	
	}	
	if(config.tip!==undefined){//单元提示
		this._tip = config.tip;	
	}
	if(config.barcode!==undefined){//单元条形码类型
		this._barcode = config.barcode;	
	}	
	if(config.bkeffect!==undefined){//当单元类型是特殊背景颜色时的背景效果
		this._bkeffect = config.bkeffect;	
	}	
	if(config.bkgranularity!==undefined){//当单元类型是特殊背景颜色时的颜色粒度
		this._bkgranularity = config.bkgranularity;	
	}	
	if(config.bkmidcr!==undefined){//当单元类型是特殊背景颜色时的中间背景颜色
		this._bkmidcr = config.bkmidcr;	
	}	
	if(config.bkendcr!==undefined){//当单元类型是特殊背景颜色时的结束背景颜色
		this._bkendcr = config.bkendcr;	
	}	
	if(config.cellcheck!==undefined){
		this._cellcheck = config.cellcheck;	//    ckd CheckBox是否选中 noedit CheckBox中的单元文字是否能编辑，如果1，则表示不能编辑 

	}	
	if(config.cellurl!==undefined){
		this._cellurl = config.cellurl;	
	}	
	if(config.clcobtn!==undefined){//单元类型下拉颜色框说明
		this._clcobtn = config.clcobtn;	
	}	
	if(config.clco!==undefined){//单元类型下拉框说明
		this._clco = config.clco;	
	}	
	if(config.cldt!==undefined){//单元类型日期事件说明
		this._cldt = config.cldt;	
	}	
	if(config.cellbutton!==undefined){//单元类型日期事件说明
		this._cellbutton = config.cellbutton;	
	}
	if(config.imagetype!==undefined){//单元类型日期事件说明
		this._imagetype = config.imagetype;	
	}
	if(config.imagelen!==undefined){//单元类型日期事件说明
		this._imagelen = config.imagelen;	
	}
	if(config.imagewidth!==undefined){//单元类型日期事件说明
		this._imagewidth = config.imagewidth;	
	}
	if(config.imageheight!==undefined){//单元类型日期事件说明
		this._imageheight = config.imageheight;	
	}
	if(config.imagedata!==undefined){//单元类型日期事件说明
		this._imagedata = config.imagedata;	
	}
	/*
     this._value
     this._fontFamily
     this._fontSize
     this._fontColor
     this._fontBold                     //粗体
     this._fontItalic                   //斜体
     this._fontUnderline                //待实现
     this._autoLineFeed                 //自动换行   
     this._textAlign                    //水平方向对齐
     this._horMargin                    //水平防线缩进
     this._verAlign                     //竖直方向对齐
     this._verMargin                    //竖直方向缩进
     this._leftNetLine                  //左边的边框线是否存在
     this._editComponent                //编辑组件
     this._borderTopStyle               //上边框类型
     this._borderTopWidth               
     this._borderTopColor
     this._borderRightStyle
     this._borderRightWidth
     this._borderRightColor
     this._borderBottomStyle
     this._borderBottomWidth
     this._borderBottomColor
     this._borderLeftStyle
     this._borderLeftWidth
     this._borderLeftColor
     this._rowspan
     this._colspan
     this._backColor
     this._backImage
     this._backImageScaleType
     
     
     
     
    
     this.ifPaint
     this.ifSave
     this.getValue   
     this.getRowspan
     this.getColspan
     
     this.clear
     this.paintBorder
     this.paintText
     this.paintContent
     this.paint
	 */
    /*event*/
	/*
     编辑结束前
     修改之后的脚本
     指定单元的结束脚本
     指定单元的统计定义
     光标进入单元格
     光标离开单元格
	 */
}
DataCell.prototype.gettextAlign=function(hag){
 	var  sethag={
        "0": "left",
        "6": "center",
        "2": "right"
    };
	if(this._hag===undefined){
		return sethag[hag];
	}else{
		return sethag[this._hag];	
	}
	
}
DataCell.prototype.gettextverAlign=function(hag){
 	var setvag={
        "0": "top",
        "6": "middle",
        "8": "bottom"
    };
	if(this._vag===undefined){
		return 	setvag[vag];
	}else{
		setvag[this._vag];	
	}
	
}
DataCell.prototype.gettextmark=function(){
		
}
DataCell.prototype.getTextFormat=function(swty){
	var setswty={
        "0": "default",
        "11": "9",
        "12": "10",
        "13": "11",
        "14": "12",
        "15": "13",
        "16": "14"
    };
	var weishu=2,format='';
	if(this._dpt!==undefined){
		weishu=1;	
	}
	if(swty!==undefined){
		format=setswty[swty];
	}else{
		format=setswty[this._swty];	
	}
	
	return {'format': format,
            'weishu': weishu,
            'nby': '0'
		   };		
	
}
DataCell.prototype.getuline=function(obj){
		if(this._ftid!==undefined){
			var ftid=parseInt(this._ftid,10);
			if(obj[ftid]!==undefined){
				if(obj[ftid].uline!==undefined){
					return 1;	
				}else{
					return 0;	
				}	
			}else{
				return 0;	
			}	
		}else{
			return 0;	
		}
}
DataCell.prototype.getbold=function(obj){
		if(this._ftid!==undefined){
			var ftid=parseInt(this._ftid,10);
			if(obj[ftid]!==undefined){
				if(obj[ftid].wei!==undefined){
					return 1;	
				}else{
					return 0;	
				}	
			}else{
				return 0;	
			}	
		}else{
			return 0;	
		}
}

DataCell.prototype.getFontSize=function(obj){
		if(this._ftid!==undefined){
			var ftid=parseInt(this._ftid,10);
			if(obj[ftid]!==undefined){
				if(obj[ftid].hei!==undefined){
					return -parseInt(obj[ftid].hei,10);	
				}else{
					return 12;	
				}	
			}else{
				return 12;	
			}	
		}else{
			return 12;	
		}
}
DataCell.prototype.getFontName=function(obj){
		if(this._ftid!==undefined){
			var ftid=parseInt(this._ftid,10);
			if(obj[ftid]!==undefined){
				if(obj[ftid].fname!==undefined){
					return obj[ftid].fname;	
				}else{
					return "宋体";	
				}	
			}else{
				return "宋体";	
			}	
		}else{
			return "宋体";	
		}
}

DataCell.prototype.getValue=function(){
	return this._t || '';	
}
DataCell.prototype.get=function(obj){
	if("_"+obj in this){
		return this["_"+obj];
	}else{
		return undefined;	
	}
}
DataCell.prototype.getFtid=function(){
	return this._ftid;	
}
DataCell.prototype.getBackColor=function(obj){
	if(this._brid !== undefined){
		return String(obj[this._brid]);//T.color.getcolorFromByte(String(obj[this._brid].color));//cell._backColor;
	}	
}
DataCell.prototype.getCombineStyle = function()
{
	if(this.getRowspan() == 1 && this.getColspan() == 1)
	{
		return "none";
	}
	else if(this.getRowspan() <= 0 && this.getColspan() <=0) 
	{
		return "combined";
	}
	else
	{
		return "combine";
	}
}
DataCell.prototype.getFrozenCell = function()
{
    return this._frozenCell;
}
DataCell.prototype.getBorderLine = function()
{
	if(this.getborderline() == 'none')
	{
		return "none";
	}
	else
	{
		return this.getborderline();
	}
}
DataCell.prototype.ifPaint = function()
{
	if(this._visible === false && this._note === 'none'){
		return false;
	}else if(this._t!= "" && this._t!=undefined)
	{
		return true;
	}
	else if(this._tpenid!=undefined)
	{
		return true;
	}
	else if(this._lpenid!=undefined)
	{
		return true;
	}
	else if(this._rpenid!=undefined)
	{
		return true;
	}
	else if(this._bpenid!=undefined)
	{
		return true;
	}
	//else if(this._backColor != "")
	//{
		//return true;
	//}/
	else if(this._brid != undefined)
	{
		return true;
	}
	else if(this._rows != 0 && this._rows != undefined)
	{
		return true;
	}
	else if(this._cols != 0 && this._cols != undefined)
	{
		return true;
	}
	else if(this._slantLine!='none') 
	{
		return true;
	}
	else if(this._bcor!=undefined) 
	{
		return true;
	}
	else if(this._cellImage!='none') 
	{
		return true;
	}else if(this._imgid != undefined)
	{
		return true;
	}else if(this._controlsItem != 'none')
	{
		return true;
	}else if((this._fl >> 12) & 0x01 || (this._fl >> 10) & 0x01 
	|| (this._fl >> 5) & 0x01 || (this._fl >> 15) & 0x01
	 || (this._tag >> 0) & 0x01 || (this._tag >> 3) & 0x01 || (this._tag >> 4) & 0x01 || (this._tag >> 5) & 0x01
	  || (this._fl >> 12) & 0x01)
	{
		return true;
	}else if(this._slty != undefined){
		return true;
	}
	else if(this._note != 'none')
	{
		return true;
	}
	else 
	{
		return false;
	}
}

DataCell.prototype.ifSave = function()
{
	if(this._value != "")
	{
		return true;
	}
	else if(this._tpenid!=undefined)
	{
		return true;
	}
	else if(this._lpenid!=undefined)
	{
		return true;
	}
	else if(this._rpenid!=undefined)
	{
		return true;
	}
	else if(this._bpenid!=undefined)
	{
		return true;
	}
	else if(this._backColor != "")
	{
		return true;
	}
	else if(this._backImage != "")
	{
		return true;
	}
	else if(this._rowspan != 1)
	{
		return true;
	}
	else if(this._colspan != 1)
	{
		return true;
	}
	else 
	{
		return false;
	}
}

DataCell.prototype.setTextwidth = function(value)
{
   this._textwidth=value;
}
DataCell.prototype.getRowspan = function()
{//
	
	if(this._rows===undefined){
		
		return 1;	
	}else{
		var rows=parseInt(this._rows,10);
		if(rows<0){
			if(rows === -1)return 0;
			return -( - rows - 1)	
		}else if(rows>=0){
			return 	rows+1;
		}
	}
	
   //this._rowspan;
}

DataCell.prototype.getColspan = function()
{	
	
	if(this._cols===undefined){
		return 1;	
	}else{
		var cols=parseInt(this._cols,10);
		if(cols<0){
			//if(cols === -1)return -1;
			return -( - cols - 1);
		}else if(cols>=0){
			return 	cols+1;
		}
	}
	//this._colspan
}

DataCell.prototype.getborderline = function()
{
    return this._borderline;
}

