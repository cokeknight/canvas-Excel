
// JavaScript Doment
function DataGrid(config)
{
	
	Component.call(this, config);//继承自 组件
	this._charDic = new Array(
			'A','B','C','D','E','F','G','H','I','J','K','L','M',
			'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
		);
	this.config				= 	config;
	
	this._offsetX			= 	config.rowheadwidth || 40;//默认宽度 ColHeaderWidth
	this._offsetY 			= 	config.colheadheight || 20;//默认高度 RowHeaderHeight
	this.width				= 	config.width || 0;
	this.height				= 	config.height || 0;
	
	
	this.colsNum			=	config.totalcol || 8;//总列数
	this.rowsNum			=	config.totalrow || 18;//总行数

	//this._localStorageName  = 	config.localStorageName || 'none';//
	
	this._textHeight 	    = 	config.textHeight ||14;//文字高度
	this._scrollRowNum 	    = 	config.scrollRowNum || 0;//滚动数量
	this._scrollColNum 		= 	config.scrollColNum || 0;//纵向滚动条滚动条滚动数量
	
	if(config.showgrid!== undefined){
			this._showgrid 	= 0;
	}else{
			this._showgrid 	= 1;///表格线showgrid缺省为显示表格线
	}
	if(config.showheader!== undefined){
			this._showheader 	= 0;
	}else{
			this._showheader 	= 1;///表格线_showheader缺省为显示行列头
	}
	
	if(config.Mousecursor!= undefined){
			this._Mousecursor		= 	config.Mousecursor;//
	}else{
			this._Mousecursor		= 	'default';//鼠标样式
	}
	if(config.backimage!= undefined){
			this._backimage			= 	config.backimage;//整个报表的背景图像
	}else{
			this._backimage		='';	
	}
	if(config.tableimage!= undefined){
			this._tableimage			= 	config.tableimage;//在表格上放置图片
	}else{
			this._tableimage		='';	
	}	
	if(config.caneditform!= undefined){
			this._caneditform			= 	config.caneditform;///设置整表保护
	}
	if(config.statscript!= undefined){
			this._statscript			= 	config.statscript;//统计脚本
	}
	if(config.verminor!= undefined){
			this._verminor			= 	config.verminor;//版本号
	}
	if(config.VerMinor!= undefined){
			this._verminor			= 	config.VerMinor;//版本号
	}
	if(config.vermajor!= undefined){
			this._vermajor			= 	config.vermajor;//此版本号
	}
	if(config._pacolor!= undefined){
			this.__pacolor			= 	config._pacolor;//背景颜色
	}
	if(config._maxeditrow!= undefined){
			this.__maxeditrow			= 	config._maxeditrow;//可编辑航
	}
	if(config.maxeditcol!= undefined){
			this._maxeditcol			= 	config.maxeditcol;//可编辑咧
	}
	
	if(config.showformula!= undefined){
			this._maxeditcol			= 	config.showformula;//是否显示公式
	}
	if(config.protecthascursor!= undefined){
			this._protecthascursor			= 	config.protecthascursor;//报表保护时是否出现光标
	}
	if(config.dclicklabelsort!= undefined){
			this._dclicklabelsort			= 	config.dclicklabelsort;//双击报表表头是否排序
	}
	if(config.propertiy!= undefined){
			this._propertiy				= 	config.propertiy;//报表属性值
	}
	if(config.printgrid!= undefined){
			this._printgrid				= 	config.printgrid;//是否打印表格线
	}
	if(config.fixedcols!= undefined){
			this._fixedcols				= 	config.fixedcols;//固定列头数
	}
	if(config.printhcalign!= undefined){
			this._printhcalign			= 	config.printhcalign;//打印是否横向中间对齐
	}
	if(config.printvcalign!= undefined){
			this._printvcalign			= 	config.printvcalign;//打印是否竖向中间对齐
	}
	if(config.designmode!= undefined){
			this._designmode			= 	config.designmode;//是否是设计模式
	}
	if(config.showmenu!= undefined){
			this._showmenu				= 	config.showmenu;//是否显示弹出菜单
	}
	if(config.loadscript!= undefined){
			this._loadscript			= 	config.loadscript;//报表加载时加载的脚本
	}
	if(config.data!= undefined){
			this._data					= 	config.data;//报表计算之前运行的脚本
	}
	if(config.userfuncs!= undefined){
			this._userfuncs				= 	config.userfuncs;//用户自定义函数
	}
	if(config.genscript!= undefined){
			this._genscript				= 	config.genscript;//是否自动生成统计脚本
	}
	if(config.savedb!= undefined){
			this._savedb				= 	config.savedb;//是否是录入报表
	}
	if(config.tagvalue!= undefined){
			this._tagvalue				= 	config.tagvalue;//报表设置属性
	}
	if(config.tagval2!= undefined){
			this._tagval2				= 	config.tagval2;//是否自动生成统计脚本
	}
	if(config.selbkcolor!= undefined){
			this._selbkcolor			= 	config.selbkcolor;//选中区域背景颜色
	}
	if(config.calscript!= undefined){
			this._calscript			= 	config.calscript;//计算之后运行的脚本
	}
	if(config.calscripttype!= undefined){
			this._calscripttype			= 	config.calscripttype;//计算之后运行的脚本类型
	}
	if(config.cursorwidth!= undefined){
			this._cursorwidth		= 	config.cursorwidth;//活动光标宽度
	}
	if(config.sysdbsource!= undefined){
			this._sysdbsource		= 	config.sysdbsource;//系统连接的数据源
	}
	if(config.prefooterrows!= undefined){
			this._prefooterrows		= 	config.prefooterrows;//页前脚行数
	}
	if(config.pfooterrows!= undefined){
			this._pfooterrows		= 	config.pfooterrows;//页脚行数
	}
	if(config.gridcolor!= undefined){
			this._gridcolor		= 	config.gridcolor;//系统表格线颜色
	}
	if(config.gridtype!= undefined){
			this._gridtype		= 	config.gridtype;//系统表格线类型
	}
	if(config.errmsgbox!= undefined){
			this._errmsgbox		= 	config.errmsgbox;//是否显示错误提示
	}
	if(config.pagerows!= undefined){
			this._pagerows		= 	config.pagerows;//主从和普通报表一页打印的行数
	}
	if(config.useado!= undefined){
			this._useado		= 	config.useado;//是否使用ado
	}
	if(config.allowrowresize!= undefined){
			this._allowrowresize		= 	config.allowrowresize;//是否允许行调整
	}
	if(config.allowcolresize!= undefined){
			this._allowcolresize		= 	config.allowcolresize;//是否允许列调整
	}
	if(config.autojump!= undefined){
			this._autojump		= 	config.autojump;//是否允许光标自动跳转
	}
	if(config.sheetname!= undefined){
			this._sheetname	= 	config.sheetname;//报表sheet名字
	}
	if(config.rowautosize!= undefined){
			this._rowautosize		= 	config.rowautosize;//是否自动调整行高
	}
	
	if(config.rowautosize!= undefined){
			this._rowautosize		= 	config.rowautosize;//是否自动调整行高
	}
	if(config.brlist!= undefined){
			this._brlist		= 	config.brlist;//单元背景色对象列表开始
	}
	if(config.ftlist!= undefined){
			this._ftlist		= 	config.ftlist;//单元字体对象列表开始
	}
	if(config.penlist!= undefined){
			this._penlist		= 	config.penlist;//框线的对象类型的
	}
	if(config.defaultcell!= undefined){
			this._defaultcell		= 	config.defaultcell;//表格
	}
	if(config.print!= undefined){
			this._print		= 	config.print;//打印属性
	}
	if(config.swty!= undefined){
			this._swty	= 	config.swty;//默认显示属性
	}
	if(config.hag!= undefined){
			this._hag	= 	config.hag;//默认显示属性
	}
	if(config.vag!= undefined){
			this._vag	= 	config.vag;//默认显示属性
	}
	if(config.imglist!= undefined)
	{
		this._imglist = config.imglist;
	}else{
		this._imglist=[];	
	}
	if(config.chartattribute!==undefined){//图表类型
		this._chartattribute= config.chartattribute;	
	}

	if(config.rows!= undefined)
	{
		this._rows = config.rows;
	}

	else
	{
		var i;
		this._rows = new Array();
		for(i=0;i < this.rowsNum;i++)
		{
			this._rows.push({});
		}
	}
	if(config.cols!= undefined)
	{
		this._cols = config.cols;
	}
	else
	{
		var i;
		this._cols = new Array();
		for(i=0;i < this.colsNum;i++)
		{
			this._cols.push({});
		}
	}
	
	if(config.cells!= undefined)
	{
		
		this._cells = config.cells;
	}
	else
	{
		var i,j;
		this._cells = new Array();
		for(i=0;i < this._rows.length;i++)
		{
			this._cells.push(new Array());
			for(j=0;j < this._cols.length;j++)
			{
				this._cells[i].push({});
			}
		}
	}
	/*用于测试的单元格数据*/
//	this._cells[2][5]={
//			//lexcel:'<data> <eformat>yyyy-m-d</eformat> </data>',
//			//fontFamily:"黑体",
//			cellurl:{newwin: false,
//url: "http://www.chinaexcel.com"},
//			t:'1221',
//			fl: 2048
//		};
//	this._cells[2][6]={
//tag:1
//		};
	/*辅助属性*/
	this._sel_startRow = 0;//默认第一行为1
	this._sel_startCol = 0;
	this._sel_endRow = 0;
	this._sel_endCol = 0;
	this._focusRow = 0;
	this._editRow = 0;
	this._focusCol = 0;
	this._editCol = 0;
	this._handThing = 'none';
	this._resizeRow = -1;
	this._oldRowBottomY = -1;
	this._minRowBottomY = -1;
	this._resizeCol = -1;
	this._oldColRightX = -1;
	this._minColRightX = -1;
	this._selLineAll={"on":false,'color':'#0251ff'};//设置光标整行选中
	
	this._editBox = document.createElement("textarea");
	this._editBox.id="_editBox";
	this._editBox.style.background = "transparent";
	this._editBox.style.borderWidth = "0px";
	this._editBox.style.outline = "none";
	this._editBox.style.overflow = "hidden";
	this._editBox.style.display = "none";
	this._editBox.style.resize = "none";
	this._editBox.style.position = "absolute";
	this._editBox.style.width='none';
	this._editBox.rows = 1;
	this._editBox.owner = this;
	this._editBox.onkeyup = function(e){
		/*
		var myevent = e?e:event;
		var eventobject = new EventObject(myevent);
		if(eventobject.ctrlKey() && eventobject.getKeyCode == 13){
		}
		else if(eventobject.getKeyCode == 13){
			var str = this._value;
			var index = str.indexOf('\n');
			str = str.splice(index);
		}
		*/
	}
	
	this._editBox.onfocus = function(e)
	{
		this.value ='';
		this.owner._editRow = this.owner._focusRow;
		this.owner._editCol = this.owner._focusCol;
		var cell = new DataCell(this.owner._cells[this.owner._focusRow][this.owner._focusCol]);
		this.style.fontSize = cell.getFontSize(this.owner._ftlist)+"px";
		this.style.fontFamily = cell.getFontName(this.owner._ftlist);
		//this.style.lineHeight = (this.style.fontSize + 3) + "px";
		
		this.value = cell.getValue();
	}
	this._editBox.onblur = function(e)
	{	
		if(this.value !== '')this.owner._cells[this.owner._editRow][this.owner._editCol].t = this.value;
/*		if(this.owner._focusCol!=0){
			if(this.value!='')
			{
				this.owner._cells[this.owner._focusRow][this.owner._focusCol-1].textWidth='cutdown';
				this.owner._cells[this.owner._focusRow][this.owner._focusCol-1]._textWidth='cutdown';
			}else{
				this.owner._cells[this.owner._focusRow][this.owner._focusCol-1].textWidth='default';	
			}
		}
*/		this.style.display = "none";
		var cellsize = this.owner.getCellSize(this.owner._editRow,this.owner._editCol);
		if(parseInt(this.style.left,10)+cellsize.width>=_gl_canvas.width){
			
			this.owner._parent._comItems[2].paint();
		}
		if(parseInt(this.style.top,10)+cellsize.height>=_gl_canvas.height){
			var dc = this.owner.getDc();
			this.owner.paintBbname(dc);
			this.owner._parent._comItems[1].paint();
		}
		this.owner.clear();
		this.owner.paint();
		
		
	}
	this._editBox.onkeyup = function(e)
	{
		if(!event.ctrlKey&&window.event.keyCode==13){
			return false;
		}
		if(this.owner._cells[this.owner._focusRow][this.owner._focusCol].controlsItem!==undefined)
		{
			if(this.owner._cells[this.owner._focusRow][this.owner._focusCol].controlsItem.type==='number')
			{	
				return false;	
			}	
		}
		if(event.ctrlKey&&window.event.keyCode==13){//ctrl_enter
			this.value+='\n';	
			this.owner._cells[this.owner._editRow][this.owner._editCol].value = this.value;
			this.owner.setAutoLineFeed(true);
		}
		
	}
	glGetRenderTo().appendChild(this._editBox);
    /*
    继承的属性：
    this._type = "component"
    this._dcFlag
    this._dc
    this._x
    this._y
    this._width
    this._height
    this._visible
    this._parent
    this._comItems

    独有属性：
    this._charDic = new Array(a,b,c,d,e,f);
    this._offsetX
    this._offsetY
    this._textHeight
    this._rows
    this._cols
    this._scrollRowNum
    this._scrollColNum
    this._cells
    this._netChartVisible
    this._resizeThing
    this._sel_startRow
    this._sel_startCol
    this._sel_endRow
    this._sel_endCol
    this._focusRow
    this._focusCol
    
    辅助属性:
	this._resizeThing
    this._sel_startRow
    this._sel_startCol
    this._sel_endRow
    this._sel_endCol
    this._focusRow
    this._focusCol
    this._handThing     row 
    this._resizeRow
    this._oldRowBottomY
    this._minRowBottomY
    this._resizeCol
    this._oldColRightX
    this._minColRightX
    
    函数
    this.getNetChartVisible
    this.setNetChartVisible
    this.setRowHeight
    this.getRowHeight
    this.setRowVisible
    this.getRowVisible
    this.setColWidth
    this.getColWidth
    this.setColVisible
    this.getColVisible
    this.insertRow
    this.deleteRow
    this.insertCol
    this.deleteCol
    this.insertCellTop
    this.deleteCellTopMove
    this.insertCellLeft
    this.deleteCellLeftMove 
    this.getCellSize
    this.getRowColByCoor
    this.getRowToTopByDis
    this.getColToLeftByDis
    this.combineCells
    this.combineSelCells
    this.breakupCell
    this.breakupSelCells
    this.getCellLeftTopCoor
    this.getCellRightTopCoor
    this.getCellRigthBottomCoor
    this.getCellLeftBottomCoor
    this.findCombineCellsAroundSelCells
    this.getScrollTopHeight
    this.getScrollLeftWidth
    this.getFullWidth
    this.getFullHeight
    this.getGridZoneWidth
    this.getGridZoneHeight
    this.getScrollRowNum
    this.setScrollRowNum
    this.getScrollColNum
    this.setScrollColNum
    this.getCellValue
    this.setCellValue
    this.getFocusValue
    this.setFocusValue
    this.setCellValueType
    this.setFocusCellValueType
    this.setCellTextAlign
    this.setFocusCellTextAlign
    this.setCellVerticalAlign
    this.setFocusCellVerticalAlign
    this.setCellTopBorder
    this.setFocusCellTopBorder
    this.setCellRightBorder
    this.setFocusCellTopBorder
    this.setCellBottomBorder
    this.setFocusCellBottomBorder
    this.setCellLeftBorder
    this.setFocusCellLeftBorder
    this.setCellFontFamily
    this.setFocusCellFontFamily
    this.setCellFontSize
    this.setFocusCellFontSize
    this.setCellFontColor
    this.setFocusCellFontColor
    this.setCellBackColor
    this.setFocusCellBackColor
    this.setCellBackImage
    this.setFocusCellBackImage
    
    绘图操作 
    继承的方法
    this.getDc
    this.releaseDc
    独有方法                              
    this.paintHeader                                行头和列头的绘制
    this.paintSelHeader                             绘制选中区域的行头和列头
	this.paintCell									绘制单个的单元格
    this.paintCells                                 绘制所有的单元格
    this.paintSelCells                              绘制选中区域的单元格
    this.paintFocusCell                             绘制焦点单元格
    this.paint                                      整个控件的完整绘制
    this.clear                                      清空整个区域
    
    
    this.click
    this.dblclick
    this.mousedown
    this.mousemove
    this.mouseup
    this.mousewheel
    */
}
DataGrid.prototype.getMousecursor= function()
{
    return this._Mousecursor;
}
DataGrid.prototype.getRowHeaderHeight= function()
{
    return this._RowHeaderHeight;
}
DataGrid.prototype.isShowHeader= function()
{
    if(typeof(this._showheader) == "string")
    {	
        return parseInt(this._showheader,10);
    }
    else if(this._showheader!==undefined)
    {
        return this._showheader;
    }else{
		return 1;	
	}
}

DataGrid.prototype.getColHeaderWidth= function()
{
    return this._ColHeaderWidth;
}
DataGrid.prototype.getNetChartVisible = function()
{	
    if(typeof(this._showgrid) == "string")
    {	
        return parseInt(this._showgrid,10);
    }
    else if(this._showgrid!==undefined)
    {
        return this._showgrid;
    }else{
		return 1;	
	}
}

DataGrid.prototype.setNetChartVisible = function(visible)
{
    if(typeof(visible) == "boolean")
    {
        if(visible){
			this._showgrid=1;
		}else{
			this._showgrid = 0;
		}
    }
    else
    {
        alert('paramter error:visible should be boolean type');
    }
}

DataGrid.prototype.getRowHeight = function(index)
{
    if(index < this._rows.length)
    {
        var row = new DataRow(this._rows[index]);
        return row.getHeight();
    }
    else
    {
        alert("paramter error:the index you provide is out of this._rows' range");
        return -1;
    }
}

DataGrid.prototype.setRowHeight = function(index,height)
{
    if(index < this._rows.length)
    {
        if(typeof(height) == "number")
        {
            this._rows[index].height = height;
        }
        else
        {
            alert("paramter error:this height you provide is not number type");
        }
    }
    else
    {
        alert("paramter error:the index you provide is out of the._rows' range");
    }
}
DataGrid.prototype.delCellPrototype = function(prototype){
	if(prototype==='financial'){
		var i, j,cell;
		for (i = this._sel_startRow; i <= this._sel_endRow; i++) {
			for (j = this._sel_startCol; j <= this._sel_endCol; j++) {
				cell = this._cells[i][j];
				if((cell.tag>>0)&0x01){//设置财务表头
					
					this._cells[i][j].tag=cell.tag^(1 << 0);//取反 
				
				}else if((cell.fl>>15)&0x01){//设置财务表览
					
					this._cells[i][j].fl=cell.fl^(1 << 15);//fl 15	
				}else if(cell.swty!==undefined){
					delete this._cells[i][j].swty;
					delete this._cells[i][j].dpt;
				}

			}
		}
	}	
}

DataGrid.prototype.getRowVisible = function(index)
{
    if(index < this._rows.length)
    {
        var row = new DataRow(this._rows[index]);
        return row.getVisible();
    }
    else
    {
        alert("paramter error: the index you provide is out of the this._rows' range'");
        return -1;
    }
}

DataGrid.prototype.setRowVisible = function(index,visible)
{
    if(index < this._rows.length)
    {
        if(typeof(visible) == "boolean")
        {
            this._rows[index].visible = visible;
        }
        else
        {
            alert("paramter error: visible should be boolean type");
        }
    }
    else
    {
        alert("paramter error: the index you provide is out of the this._rows' range");
    }
}

DataGrid.prototype.getColWidth = function(index)
{
    if(index < this._cols.length)
    {
        var col = new DataCol(this._cols[index]);
        return col.getWidth();
    }
    else
    {
        alert("paramter error: the index you provide out of the this._cols' range");
        return -1;
    }
}

DataGrid.prototype.setColWidth = function(index,width)
{
    if(index < this._cols.length)
    {
        if(typeof(width) == "number")
        {
            this._cols[index].width = width;
        }
        else
        {
            alert("paramter error: the width should be number type");
        }
    }
    else
    {
        alert("paramter error: the index you provide is out of the this._cols' range");
    }
}

DataGrid.prototype.getColVisible = function(index)
{
    if(index < this._cols.length)
    {
        var col = new DataCol(this._cols[index]);
        return col.getVisible();
    }
    else
    {
        alert("paramter error: the index you provide is out of the this._cols' range");
        return -1;
    }
}

DataGrid.prototype.setColVisible = function(index,visible)
{
    if(index < this._cols.length)
    {
        if(typeof(visible) == "boolean")
        {
            this._cols[i].visible = visible;
        }
        else
        {
            alert("paramter error:the visible should be boolean");
        }
    }
    else
    {
        alert("paramter error: the index you provide is out of the this._cols' range");
    }
}

DataGrid.prototype.getRowsCount = function()
{
    return this._rows.length;
}

DataGrid.prototype.getColsCount = function()
{
    return this._cols.length;
}

DataGrid.prototype.insertRow = function(index)
{
    var i,j;
    if(this._rows.length > index)
    {
        this._rows.splice(index,0,{});
        this._cells.splice(index,0,new Array());
        for(j=0;j < this._cols.length;j++)
        {
            this._cells[index].push({});
        }
    }
    else
    {
        for(i=this._rows.length;i<=index;i++)
        {
            this._cells.push(new Array());
            this._rows.push({});
            for(j=0;j < this._cols.length;j++)
            {
                this._cells[i].push({});
            }
        }
    }
}

DataGrid.prototype.deleteRow = function(index)
{
    if(index < this._rows.length)
    {
        this._rows.splice(index,1);
        this._cells.splice(index,1);
    }
    else
    {
        alert("paramter error:the index you provide is out of the this._rows' range");
    }
}

DataGrid.prototype.insertCol = function(index)
{
    var i,j;
    if(this._cols.length > index)
    {
        this._cols.splice(index,1,{});
        for(i=0;i < this._rows.length;i++)
        {
            this._cells[i].splice(index,0,{});
        }
    }
    else
    {
        for(j=0;j < this._rows.length;j++)
        {
            for(i=this._cols.length;i<=index;i++)
            {
                if(j==0)
                {
                    this._cols.push({});
                }
                this._cells[j].push({});   
            }
        }
    }
}

DataGrid.prototype.deleteCol = function(index)
{
    if(index < this._cols.length)
    {
        var i;
        this._cols.splice(index,1);
        for(i=0;i < this._rows.length;i++)
        {
            this._cells[i].splice(index,1);
        }
    }
    else
    {
        alert("paramter error:the index you provide is out of the this._rows' range");
    }
}

DataGrid.prototype.insertCellTop = function(rowindex,colindex)//上面插入活动单元下移
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        var i;
        var cell = new DataCell(this._cells[this._rows.length-1][colindex]);
        if(cell.ifSave())
        {
            this.insertRow(this._rows.length);
        }
        for(i=this._rows.length;i>rowindex;i--)
        {
            this._cells[i][colindex] = this._cells[i-1][colindex];
        }
        this._cells[rowindex][colindex] = {};
    }
    else
    {
        alert("paramter error: the rowindex or colindex you provide may out of the range");
    }
}

DataGrid.prototype.deleteCellTopMove = function(rowindex,colindex)//删除单元格活动单元上移
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        var i;
        for(i=rowindex;i < this._rows.length;i++)
        {
            if( i != (this._rows.length -1))
            {
                this._cells[i][colindex] = this._cells[i+1][colindex];
            }
            else
            {
                this._cells[i][colindex] = {};
            }
        }
    }
    else
    {
        alert("paramter error: the rowindex or colindex you provide may out of the range");
    }
}

DataGrid.prototype.insertCellLeft = function(rowindex,colindex)//左边插入活动单元格右移
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        var i;
        var cell = new DataCell(this._cells[rowindex][this._cols.length-1]);
        if(cell.ifSave())
        {
            this.insertCol(this._cols.length);
        }
        for(i=this._cols.length;i>colindex;i--)
        {
            this._cells[rowindex][i] = this._cells[i-1][colindex];
        }
        this._cells[rowindex][colindex] = {};
        
    }
    else
    {
        alert("paramter error: the rowindex or colindex you provide may out of the range");
    }
}

DataGrid.prototype.deleteCellLeftMove = function(rowindex,colindex)//删除单元格活动单元左移
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        var i;
        for(i=colindex;i < this._cols.length;i++)
        {
            if( i != (this._cols.length - 1) )
            {
                this._cells[rowindex][i] = this._cells[rowindex][i+1];
            }
            else
            {
                this._cells[rowindex][i] = {};
            }
        }
    }
    else
    {
        alert("paramter error: the rowindex or colindex you provide may out of the range");
    }
}

DataGrid.prototype.getCellSize = function(rowindex,colindex)
{
    var i;
    var width=0,height=0;
    var row,col;
    var cell = new DataCell(this._cells[rowindex][colindex]);
    for(i=0;i < cell.getColspan();i++)
    {
        col = new DataCol(this._cols[colindex + i]);
        if(col.getVisible())
        {
            width += col.getWidth();
        }
    }
    
    for(i=0;i < cell.getRowspan();i++)
    {
        row = new DataRow(this._rows[rowindex+i]);
        if(row.getVisible())
        {
            height += row.getHeight();
        }
    }
    return {width:width,height:height};
}

DataGrid.prototype.getRectSize = function(srowindex,scolindex,erowindex,ecolindex)
{
    var i;
    var row,col;
    var width=0,height=0;
    for(i=srowindex;i<=erowindex;i++)
    {
        row = new DataRow(this._rows[i]);
        if(row.getVisible())
        {
            height += row.getHeight();
        }
    }
    for(i=scolindex;i<=ecolindex;i++)
    {
        col = new DataCol(this._cols[i]);
        if(col.getVisible())
        {
            width += col.getWidth();
        }
    }
    return {width:width,height:height};
}

DataGrid.prototype.getRowColByCoor = function(x,y)//根据鼠标位置获得对应的行列
{
    var i,j;
    var row,col;
    var tempx = this._offsetX,tempy = this._offsetY;
    for(i=this._scrollColNum;tempx < x && i < this._cols.length;i++)
    {
        col = new DataCol(this._cols[i]);
        if(col.getVisible())
        {
            tempx += col.getWidth();
        }
    }
    
    for(j=this._scrollRowNum; tempy < y && j < this._rows.length ; j++)
    {
        row = new DataRow(this._rows[j]);
        if(row.getVisible())
        {
            tempy += row.getHeight();
        }
    }
    
    if(tempx < x  || tempy < y)
    {
        if(tempx < x)
        {
            col = this._cols.length -1;
        }
        else
        {
			 if(i == 0)
			{
				i = 1;
			}
            col = i - 1;
			
        }
        
        if(tempy < y)
        {
            row = this._rows.length -1;
        }
        else
        {
            row = j - 1;
        }
        return {row:row,col:col};
    }
    else
    {
        if(i == 0)
        {
            i = 1;
        }
        if(j == 0)
        {
            j = 1;
        }
        var cell = new DataCell(this._cells[j-1][i-1]);
        if(cell.getRowspan() < 0 || cell.getColspan() < 0)
        {	
            return {row:(0-cell.getRowspan()),col:(0-cell.getColspan())};
        }else if(cell.getRowspan()===0){
			return 	{row:0,col:(0-cell.getColspan())};
		}
        else
        {	
            return {row:(j-1),col:(i-1)};
        }   
    }
    
}

DataGrid.prototype.getRowByDisToTop = function(y)//根据鼠标位置获得对应的行
{
    var i,row,half;
    var tempy = 0;
    for(i=0 ; tempy <= y && i < this._rows.length;i++)
    {
        row = new DataRow(this._rows[i]);
        if(row.getVisible())
        {
            tempy += row.getHeight();
        }
		
    }
    if(tempy > y)
    {
        if((tempy-y)/row.getHeight() < 0.5)
        {
            half = true;
        }
        else
        {
            half = false;
        }
        return {row:i,half:half};
    }
    else
    {
        return {row:this._rows.length,half:true};
    }
    
}


DataGrid.prototype.getColByDisToLeft = function(x)//根据鼠标位置获得对应的列
{
    var i,col,half;
    var tempx = 0;
    for(i=0;tempx <= x && i < this._cols.length;i++)
    {
        col = new DataCol(this._cols[i]);
        if(col.getVisible())
        {
            tempx += col.getWidth();
        }
    }
    if(tempx > x)
    {
        if((tempx-x)/col.getWidth() < 0.5)
        {
            half = true;
        }
        else
        {
            half = false;
        }
        return {col:i,half:half};
    }
    else
    {
        return {col:this._cols.length,half:true};
    }
}

DataGrid.prototype.combineCells = function(srowindex,scolindex,erowindex,ecolindex)
{
    if(srowindex > erowindex || scolindex > ecolindex)
    {
        alert("paramter error: srowindex < erowindex or scolindex < ecolindex");
    }
    else
    {
        var i,j,a=0,text="";
		
        if(this._rows.length < erowindex)
        {
            this.insertRow(erowindex);
        }
        
        if(this._cols.length < ecolindex)
        {
            this.insertCol(ecolindex);
        }
        for(i=srowindex;i<=erowindex;i++)
        {
            for(j=scolindex;j<=ecolindex;j++)
            {
				
                if(i==srowindex && j == scolindex)
                {
                    this._cells[i][j].rows = erowindex - srowindex;
                    this._cells[i][j].cols = ecolindex - scolindex;
              		
			    }
                else
                {
                    this._cells[i][j].rows = 0-srowindex-1;
                    this._cells[i][j].cols = 0-scolindex-1;
                }
				
            }
        }
    }
}

DataGrid.prototype.combineSelCells = function(srowindex,scolindex,erowindex,ecolindex)
{
    this.combineCells(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol);
}
DataGrid.prototype.IscombineCell = function(srowindex,scolindex,erowindex,ecolindex)
{
  if(srowindex > erowindex || scolindex > ecolindex)
    {
        alert("paramter error: srowindex < erowindex or scolindex < ecolindex");
    }
    else
    {
        var i,j,a=0,text="";
        for(i=srowindex;i<=erowindex;i++)
        {
            for(j=scolindex;j<=ecolindex;j++)
            {
				
			   if(this._cells[i][j].rows===undefined){
					return false;   
				}
            }
        }
    }
	return true;
}

DataGrid.prototype.breakupCells = function(srowindex,scolindex,erowindex,ecolindex)
{
    var i,j;
	//this._cells[srowindex][scolindex].t='';
    for(i=srowindex;i<=erowindex;i++)
    {
        for(j=scolindex;j<=ecolindex;j++)
        {
			if(this._cells[i][j].rows != undefined)
            {
                delete this._cells[i][j].rows;
            }
            if(this._cells[i][j].cols != undefined)
            {
                delete this._cells[i][j].cols;
            }
        }
    }    
}

DataGrid.prototype.breakupSelCells = function()
{
    this.breakupCells(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol);
}

DataGrid.prototype.getCellLeftTopCoor = function(rowindex,colindex)
{
    var x,y,i,row,col;
    x = this._offsetX;
    y = this._offsetY;
    if(rowindex > this._scrollRowNum)
    {
        for(i=this._scrollRowNum;i < rowindex;i++)
        {
            row = new DataRow(this._rows[i]);
            if(row.getVisible())
            {
                y += row.getHeight();
            }
        }
    }
    else if(rowindex < this._scrollRowNum)
    {
        for(i=rowindex;i < this._scrollRowNum;i++)
        {
            row = new DataRow(this._rows[i]);
            if(row.getVisible())
            {
                y -= row.getHeight();
            }
        }
    }
    if(colindex > this._scrollColNum)
    {
        for(i=this._scrollColNum;i < colindex;i++)
        {
            col = new DataCol(this._cols[i]);
            if(col.getVisible())
            {
                x += col.getWidth();
            }
        }
    }
    else if(colindex < this._scrollColNum)
    {
        for(i=colindex;i < this._scrollColNum;i++)
        {
            col = new DataCol(this._cols[i]);
            if(col.getVisible())
            {
                x -= col.getWidth();
            }
        }
    }
    return {x:x,y:y};
}

DataGrid.prototype.getCellRightTopCoor = function(rowindex,colindex)
{
    var leftop = this.getCellLeftTopCoor(rowindex,colindex);
    var cellsize = this.getCellSize(rowindex,colindex);
    return {x:leftop.x+cellsize.width,y:leftop.y};
}

DataGrid.prototype.getCellRightBottomCoor = function(rowindex,colindex)
{
    var leftop = this.getCellLeftTopCoor(rowindex,colindex);
    var cellsize = this.getCellSize(rowindex,colindex);
    return {x:leftop.x+cellsize.width,y:leftop.y+cellsize.height};
}

DataGrid.prototype.getCellLeftBottomCoor = function(rowindex,colindex)
{
    var leftop = this.getCellLeftTopCoor(rowindex,colindex);
    var cellsize = this.getCellSize(rowindex,colindex);
    return {x:leftop.x,y:leftop.y+cellsize.height};
}

DataGrid.prototype.findCombineCellsAroundSelCells = function()//找到合并的单元格
{	
    var i,cell;
    var temp_startrow,temp_startcol,temp_endrow,temp_endcol;
    for(i=this._sel_startRow;i<=this._sel_endRow;i++)
    {	
        cell = new DataCell(this._cells[i][this._sel_startCol]);
        if(cell.getRowspan()<=0 && cell.getColspan() <=0)
        {
            temp_startrow = 0 - cell.getRowspan();
            temp_startcol = 0 - cell.getColspan();
            cell = new DataCell(this._cells[temp_startrow][temp_startcol]);
            temp_endrow = temp_startrow + cell.getRowspan() - 1;
            temp_endcol = temp_startcol + cell.getColspan() - 1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
        else if(cell.getRowspan() > 1 || cell.getColspan() > 1)//mouseDown 触发合并单元格
        {
            temp_startrow = i;
            temp_startcol = this._sel_startCol;
            temp_endrow = temp_startrow + cell.getRowspan() -1;
            temp_endcol = temp_startcol + cell.getColspan() -1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
    }
    
    for(i=this._sel_startRow;i<=this._sel_endRow;i++)
    {
        cell = new DataCell(this._cells[i][this._sel_endCol]);
        if(cell.getRowspan()<=0 && cell.getColspan() <=0)
        {
            temp_startrow = 0 - cell.getRowspan();
            temp_startcol = 0 - cell.getColspan();
            cell = new DataCell(this._cells[temp_startrow][temp_startcol]);
            temp_endrow = temp_startrow + cell.getRowspan() - 1;
            temp_endcol = temp_startcol + cell.getColspan() - 1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
        else if(cell.getRowspan() > 1 || cell.getColspan() > 1)
        {
            temp_startrow = i;
            temp_startcol = this._sel_endCol;
            temp_endrow = temp_startrow + cell.getRowspan() -1;
            temp_endcol = temp_startcol + cell.getColspan() -1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
    }
    
    for(i=this._sel_startCol;i<=this._sel_endCol;i++)
    {
        cell = new DataCell(this._cells[this._sel_startRow][i]);
        if(cell.getRowspan()<=0 && cell.getColspan() <=0)
        {
            temp_startrow = 0 - cell.getRowspan();
            temp_startcol = 0 - cell.getColspan();
            cell = new DataCell(this._cells[temp_startrow][temp_startcol]);
            temp_endrow = temp_startrow + cell.getRowspan() - 1;
            temp_endcol = temp_startcol + cell.getColspan() - 1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
        else if(cell.getRowspan() > 1 || cell.getColspan() > 1)
        {
            temp_startrow = this._sel_startRow;
            temp_startcol = i;
            temp_endrow = temp_startrow + cell.getRowspan() -1;
            temp_endcol = temp_startcol + cell.getColspan() -1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
    }
    
    for(i=this._sel_startCol;i<=this._sel_endCol;i++)
    {
        cell = new DataCell(this._cells[this._sel_endRow][i]);
        if(cell.getRowspan()<=0 && cell.getColspan() <=0)
        {
            temp_startrow = 0 - cell.getRowspan();
            temp_startcol = 0 - cell.getColspan();
            cell = new DataCell(this._cells[temp_startrow][temp_startcol]);
            temp_endrow = temp_startrow + cell.getRowspan() - 1;
            temp_endcol = temp_startcol + cell.getColspan() - 1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
        else if(cell.getRowspan() > 1 || cell.getColspan() > 1)
        {
            temp_startrow = this._sel_endRow;
            temp_startcol = i;
            temp_endrow = temp_startrow + cell.getRowspan() -1;
            temp_endcol = temp_startcol + cell.getColspan() -1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
    }
    return null;
}

DataGrid.prototype.getScrollTop = function()
{
    var i,tempheight,row;
    for(i=0,tempheight=0;i < this._scrollRowNum;i++)
    {
        row = new DataRow(this._rows[i]);
        if(row.getVisible())
        {
            tempheight += row.getHeight();
        }
    }
    return tempheight;
}

DataGrid.prototype.getScrollLeft = function()
{
    var i,tempwidth,col;
    for(i=0,tempwidth=0;i < this._scrollColNum;i++)
    {
        col = new DataCol(this._cols[i]);
        if(col.getVisible())
        {
            tempwidth += col.getWidth();
        }
    }
    return tempwidth;
}

DataGrid.prototype.getFullWidth = function()
{
    var i,col,fullwidth;
    for(i=0,fullwidth=0;i < this._cols.length;i++)
    {
        col = new DataCol(this._cols[i]);
        if(col.getVisible())
        {
            fullwidth += col.getWidth();
        }
    }
	col = new DataCol(this._cols[this._cols.length-1]);
    return fullwidth + this.getGridZoneWidth() - col.getWidth();
}

DataGrid.prototype.getFullHeight = function()
{
    var i,col,fullheight;
    for(i=0,fullheight=0;i < this._rows.length;i++)
    {
        row = new DataRow(this._rows[i]);
        if(row.getVisible())
        {
            fullheight += row.getHeight();
        }
    }
	col = new DataRow(this._rows[this._rows.length-1]);
    return fullheight + this.getGridZoneHeight() - col.getHeight();
}

DataGrid.prototype.getGridZoneWidth = function()
{
    return this._width - this._offsetX;
}

DataGrid.prototype.getGridZoneHeight = function()
{
    return this._height - this._offsetY;
}

DataGrid.prototype.getScrollRowNum = function()
{
    return this._scrollRowNum;
}

DataGrid.prototype.setScrollRowNum = function(num)
{
    if(typeof(num) == "number")
    {
        this._scrollRowNum = num;
    }
    else
    {
        alert("paramter error:scrollrownum should be number type");
    }
}

DataGrid.prototype.getScrollColNum = function()
{
    return this._scrollColNum;
}

DataGrid.prototype.setScrollColNum = function(num)
{
    if(typeof(num) == "number")
    {
        this._scrollColNum = num;
    }
    else
    {
        alert("paramter error:scrollcolnum should be number type");
    }
}

DataGrid.prototype.getSelStartRow = function()
{
	return this._sel_startRow;
}

DataGrid.prototype.getSelStartCol = function()
{
	return this._sel_startCol;
}

DataGrid.prototype.getEndRow = function()
{
	return this._sel_endRow;
}

DataGrid.prototype.getEndCol = function()
{
	return this._sel_endCol;
}

DataGrid.prototype.setFocusRow = function(rowindex)
{
	this._focusRow = rowindex;
}

DataGrid.prototype.setFocusCol = function(colindex)
{
	this._focusCol = colindex;
}

DataGrid.prototype.getCellValue = function(rowindex,colindex)
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        var cell = new DataCell(this._cells[rowindex][colindex]);
        return cell.getValue();
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}

DataGrid.prototype.setCellValue = function(rowindex,colindex,value)
{	
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
		this._cells[rowindex][colindex].t = value;
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}



DataGrid.prototype.setCellProperty = function(rowindex,colindex,property,propertyvalue)
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        for(var i in this._cells[rowindex][colindex])
		{
			if(i===property)
			{
				this._cells[rowindex][colindex][i]=	propertyvalue;
				break;
			}	
		}
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}
DataGrid.prototype.getCellProperty = function(rowindex,colindex,property)
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
		if(this._cells[rowindex][colindex][property]!==undefined){
			return true;
		}
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}
DataGrid.prototype.setCellTextAlign = function(rowindex,colindex,textalign)
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        this._cells[rowindex][colindex].hag = textalign;
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}

DataGrid.prototype.setSelCellTextAlign = function(textalign)
{
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			this.setCellTextAlign(i,j,textalign);
		}
	}
}
DataGrid.prototype.setSelCellVerticalAlign = function(verticalAlign)
{
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			this.setCellVerticalAlign(i,j,verticalAlign);
		}
	}
}

DataGrid.prototype.setCellVerticalAlign = function(rowindex,colindex,verticalAlign)
{
    
	if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        this._cells[rowindex][colindex].vag  = verticalAlign;
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}

DataGrid.prototype.setFontFamily = function(rowindex,colindex,family)
{
	this._cells[rowindex][colindex].fontFamily = family;
}

DataGrid.prototype.setSelCellFontFamily = function(family)
{
	var i,j;
	
	if(this._ftlist===undefined)this._ftlist=[];
	var templist=Object.extend({},this._ftlist[this._cells[this._focusRow][this._focusCol].ftid]) || {};
	if(!T.isEmptyObject(templist)){
		templist.fname=family;	
	}else{
		templist={"hei":"-12","cset":"134","fname":family};	
	}
	
	var listid=T.array.InArray(templist,this._ftlist);//查询ftid的值 若为false则 插入
	if(listid === false){
		this._ftlist.push(templist);
		listid = String(this._ftlist.length-1);	
	}

	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			this._cells[i][j].ftid = listid;
		}
	}
}
DataGrid.prototype.setCellNumberOnly=function(rowindex,colindex){
	this._cells[rowindex][colindex].numberOnly = !this._cells[rowindex][colindex].numberOnly;
}

DataGrid.prototype.setSelCellNumberOnly=function(){
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			this._cells[i][j].numberOnly = !this._cells[i][j].numberOnly;
		}
	}
}

DataGrid.prototype.setFontSize = function(rowindex,colindex,size)
{
	if(typeof(size)!="number"){
		this._cells[rowindex][colindex].fontSize = parseInt(size);
	}else{
		this._cells[rowindex][colindex].fontSize = size;
	}
	
}

DataGrid.prototype.setSelCellFontSize = function(size)
{
	var i,j,size,tempfontsize,tempsize,ftlist=this._ftlist,listid;
	size=arguments[0];
	if(typeof(size)!="number"){
		size = parseInt(size);
	}	
	
	if(ftlist===undefined)this._ftlist=[];
	var templist=Object.extend({},ftlist[this._cells[this._focusRow][this._focusCol].ftid]) || {};
	var tempfontsize=-parseInt(templist.hei,10) || 14;
	tempsize=-size;
	if(!T.isEmptyObject(templist)){//引用
		
		
		templist.hei=String(tempsize);	
	}else{
		templist={"hei":String(tempsize),"cset":"134"};	
	}

	listid=T.array.InArray(templist,ftlist);//查询ftid的值 若为false则 插入
	if(listid === false){
		this._ftlist.push(templist);
		listid = String(this._ftlist.length-1);	
	}

	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		var textheight=this.getRowHeight(i);
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			
			
			if(tempfontsize>size){
					
					textheight-=tempfontsize-	size;
			
			}else if(tempfontsize<size){
				
				textheight+=size-tempfontsize;
			}

			this._cells[i][j].ftid=listid;
		}
		this.setRowHeight(i, textheight);
	}
	
	

}

DataGrid.prototype.setFontBold = function(rowindex,colindex,Bold)
{
	this._cells[rowindex][colindex].fontBold = Bold;
}

DataGrid.prototype.setSelCellFontBold = function()
{
	
	var i,j,Bold;
	
	if(this._ftlist===undefined)this._ftlist=[];
	var templist=Object.extend({},this._ftlist[this._cells[this._focusRow][this._focusCol].ftid]) || {};
	if(!T.isEmptyObject(templist)){
		if(!("wei" in templist)){
			templist.wei="700";	
		}else{
			delete templist.wei;	
		}
			
	}else{
		templist={"hei":"-12","cset":"134","wei":"700"};	
	}
	
	var listid=T.array.InArray(templist,this._ftlist);//查询ftid的值 若为false则 插入
	if(listid === false){
		this._ftlist.push(templist);
		listid = String(this._ftlist.length-1);	
	}
	
	for(i=this._sel_startRow;i <= this._sel_endRow; i++)
	{
		for(j=this._sel_startCol;j <= this._sel_endCol ; j++)
		{
			this._cells[i][j].ftid = listid;
		}
	}
}

DataGrid.prototype.setFontItalic = function(rowindex,colindex,italic)
{
	this._cells[rowindex][colindex].fontItalic = italic;
}
DataGrid.prototype.setCellNote = function(rowindex,colindex,note)
{
	this._cells[rowindex][colindex].note = note;
}
DataGrid.prototype.setCellTip = function(rowindex,colindex,tip)
{
	this._cells[rowindex][colindex].tip = tip;
}
DataGrid.prototype.setSelCellFontItalic = function()
{
	var i,j,italic;
	
	if(this._ftlist===undefined)this._ftlist=[];
	var templist=Object.extend({},this._ftlist[this._cells[this._focusRow][this._focusCol].ftid]) || {};
	if(!T.isEmptyObject(templist)){
		if(!("ita" in templist)){
			templist.ita="1";	
		}else{
			delete templist.ita;	
		}
			
	}else{
		templist={"hei":"-12","cset":"134","ita":"1"};	
	}
	
	var listid=T.array.InArray(templist,this._ftlist);//查询ftid的值 若为false则 插入
	if(listid === false){
		this._ftlist.push(templist);
		listid = String(this._ftlist.length-1);	
	}

	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			this._cells[i][j].ftid = listid;
		}
	}
}

DataGrid.prototype.setCellUnderline = function(rowindex,colindex,flag)
{
	this._cells[rowindex][colindex].fontUnderline = flag;
}

DataGrid.prototype.setSelCellUnderline = function()
{
	var i,j,flag;
	
	if(this._ftlist===undefined)this._ftlist=[];
	var templist=Object.extend({},this._ftlist[this._cells[this._focusRow][this._focusCol].ftid]) || {};
	if(!T.isEmptyObject(templist)){
		if(!("uline" in templist)){
			templist.uline="1";	
		}else{
			delete templist.uline;	
		}
			
	}else{
		templist={"hei":"-12","cset":"134","uline":"1"};	
	}
	
	var listid=T.array.InArray(templist,this._ftlist);//查询ftid的值 若为false则 插入
	if(listid === false){
		this._ftlist.push(templist);
		listid = String(this._ftlist.length-1);	
	}

	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			this._cells[i][j].ftid = listid;
		}
	}
}

DataGrid.prototype.setCellTopBorder = function(rowindex,colindex,border)
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}



DataGrid.prototype.setCellRightBorder = function()
{
    
}

DataGrid.prototype.setCellBottomBorder = function()
{
    
}

DataGrid.prototype.setCellLeftBorder  = function()
{
    
}

DataGrid.prototype.setCellFontFamily = function()
{
    
}

DataGrid.prototype.setCellFontSize = function()
{
    
}

DataGrid.prototype.setCellFontColor  = function(rowindex,colindex,color)
{
	this._cells[rowindex][colindex].fontColor = color;

}

DataGrid.prototype.setCellBackColor = function(rowindex,colindex,color)
{
	this._cells[rowindex][colindex].backColor = color;

}

DataGrid.prototype.setCellBackImage = function()
{
    
}

DataGrid.prototype.getSaveJson = function()
{
	var str = "";
	var i,j,row,col,cell,flag;
	if(this._netChartVisible)
	{
		str += "{netChartVisible:true,";
	}
	else
	{
		str += "netChartVisible:false,";
	}
	str += ("rowsNum:" + this._rows.length + ",");
	str += ("colsNum:" + this._cols.length + ",");
	str += "rows:[";
	for(i=0,flag=0;i < this._rows.length;i++)
	{
		row = new DataRow(this._rows[i]);
		if(row.ifSave())
		{
			if(flag != 0)
			{
				str += ",";
			}
			str += "{row:"+i+",data:"+toJson(this._rows[i])+"}";
			flag++;
		}
	}
	str += "],";
	str += "cols:[";
	for(i=0,flag=0;i < this._cols.length;i++)
	{
		col = new DataCol(this._cols[i]);
		if(col.ifSave())
		{
			if(flag !=0 )
			{
				str += ",";
			}
			str += "{col:"+i+",data:"+toJson(this._cols[i])+"}";
			flag++;
		}
	}
	str += "],";
	str += "cells:[";
	for(i=0,flag=0;i < this._rows.length;i++)
	{
		for(j=0;j < this._cols.length;j++)
		{
			cell = new DataCell(this._cells[i][j]);
			if(cell.ifSave())
			{
				if(flag != 0)
				{
					str += ",";
				}
				str += "{row:"+i+",col:"+j+",data:"+toJson(this._cells[i][j])+"}";
				flag ++;
			}
		}
	}
	str += "]}";
	return str;
}


/*绘图相关*/
DataGrid.prototype.paintNetLine = function()
{
	var dc = this.getDc();
	var paintNetLines=function(){
			
			var i,row,col,x,y,offsety=this._offsetY,offsetx=this._offsetX;
			
			dc.lineWidth = 1;
			dc.strokeStyle = '#BBBBBB';
			
			y = 0;
			dc.lineWidth = 1;
			dc.beginPath();
			dc.moveTo(0,y);
			dc.lineTo(this.getWidth(),y);
			y+=this._offsetY;
			dc.moveTo(0,y);
			dc.lineTo(this.getWidth(),y);
			dc.stroke();
			dc.closePath();					
			
			x = 0;
			dc.strokeStyle = '#BBBBBB';
			dc.beginPath();
			dc.moveTo(x,0);
			dc.lineTo(x,this.getHeight());
			x += this._offsetX;
			dc.moveTo(x,0);
			dc.lineTo(x,this.getHeight());
			dc.stroke();
			dc.closePath();
			
			if(this.getNetChartVisible())//是否显示表格线
			{
				var rectSize = this.getRectSize(this._scrollRowNum,this._scrollColNum,this._rows.length,this._cols.length);
				var width = Number(this._showheader)===0?rectSize.width:this.getWidth();
				var height = Number(this._showheader)===0?rectSize.height:this.getHeight();
				
				for(i = this._scrollRowNum;y<=this.getHeight() && i < this._rows.length; i ++)
				{
					row = new DataRow(this._rows[i]);
					if(row.getVisible())
					{	
						dc.beginPath();
						y += row.getHeight();
						dc.moveTo(offsetx,y);
						dc.lineTo(width,y);
						dc.stroke();
						dc.closePath();
					}
				}

				for(i=this._scrollColNum;x<=this.getWidth() && i < this._cols.length;i++)
				{
					col = new DataCol(this._cols[i]);
					if(col.getVisible())
					{	
						dc.beginPath();
						x += col.getWidth();
						dc.moveTo(x,offsety);
						dc.lineTo(x,height);
						dc.stroke();
						dc.closePath();
					}
				}
			this.releaseDc(dc);
		}
	};

	var _this=this;
	if(this.getProperty('backimage'))
	{
		var img={};
		var temp =this._imglist[this._backimage-1];
		if((this._tagval2 >> 17) & 0x01){
			img.size='origin';	
		}else{
			img.size='canvas';	
		}	
		
		img.width=temp.width;
		img.height=temp.height;
		var image = new Image();
		image.src = temp.src;
			_this.paintBackimage(dc,img,image);
			paintNetLines.apply(_this);
	}else
	{
		paintNetLines.apply(this);//在当前作用域中执行paintNetLines函数，不然是window对象
	}
}
DataGrid.prototype.getProperty=function(p){
	if(this['_'+p]!==undefined){
		if(this['_'+p]!=='none'&&this['_'+p]!==''){
			return this['_'+p];	
		}else{
			return false;	
		}	
	}else{
		return false;	
	}
}
DataGrid.prototype.paintRowColor = function()
{
	var dc = this.getDc();
	var i,row,col,x=0,y=0,offsety=this._offsetY,offsetx=this._offsetX,width=0;
	
	dc.lineWidth = 1;
	dc.strokeStyle = '#BBBBBB';
	for(var j=this._scrollColNum;j < this._cols.length;j++)
	{
		col = new DataCol(this._cols[j]);
		
		if(col.getVisible())
		{	
			
			width += col.getWidth();
			
		}
	}
	for(i = 0; i < this._rows.length; i ++)
	{
		row = new DataRow(this._rows[i]);
		
		if(row.getVisible())
		{	
			if(row.getColor()!==false){

				//dc.fillStyle =row.getColor();;
				//dc.fillRect(x,y,width,row.getHeight());
			}
		}
		y += row.getHeight();
	}
	this.releaseDc(dc);

}

DataGrid.prototype.paintHeader = function()
{
    var dc = this.getDc();
    var i,y,x,text,textx,texty,textlength,temp;
    var row,col;
    var compos = this.getCanvasXY();
    /*paint the row header*/
    dc.lineWidth = 0.2;
    dc.strokeStyle = "#000";
    dc.font = this._textHeight + "px 宋体";
	var selColor;
	if(this.getMousecursor()=='default'){
		selColor="#FFF69A";//'#ff1800';	
	}
	else
	{
		selColor='#FFF69A';
	}
	
    for(i=this._scrollRowNum,y=this._offsetY;y <= this.getHeight() && i<  this._rows.length;i++)
    {
        row = new DataRow(this._rows[i]);
        if(row.getVisible())
        {
            y += row.getHeight();
            text = i+1;
            textlength = dc.measureText(text).width;
            textx = (this._offsetX - textlength)/2;
            texty = y-(row.getHeight() - this._textHeight)/2;
            if(i<this._sel_startRow || i>this._sel_endRow)
            {
                dc.fillStyle = "#DEE6F1";//"#0f0";//左侧单元格
                dc.fillRect(1,y+1-row.getHeight(),this._offsetX-2,row.getHeight()-2);
            }
            else
            {
                dc.fillStyle = selColor;
				dc.fillRect(1,y+1-row.getHeight(),this._offsetX-2,row.getHeight()-2);
            }				
			
			dc.fillStyle = "#7F97B9";//"#716F64";
			dc.fillRect(1,y,this._offsetX-2,1);

            dc.fillStyle = "#000";
            dc.fillText(text,textx,texty);
        }
    }
    dc.lineWidth = 0.2;
    dc.strokeStyle = "#000";
    dc.font = this._textHeight + "px 宋体";
	/*左上角*/
	dc.fillStyle ="#DEE6F1"; //"#0f0";
	dc.fillRect(0,0,this._offsetX,this._offsetY);
	
    for(i=this._scrollColNum,x=this._offsetX; x <= this.getWidth() && i < this._cols.length;i++)
    {
        col = new DataCol(this._cols[i]);
        if(col.getVisible())
        {
            x += col.getWidth();
            text = "";
            temp = i;
            while(Math.floor(temp/26) != 0)
            {   
                text = this._charDic[temp%26] + text;
                temp = Math.floor(temp/26);
            }
            if(text != "")
            {
                text = this._charDic[temp-1] + text;
            }
            else
            {
                text = this._charDic[temp];
            }
            textlength = dc.measureText(text).width;
            if(textlength > col.getWidth())
            {
                textx = x - col.getWidth();
            }
            else
            {
                textx = x-(col.getWidth()+textlength)/2;
            }
            texty = (this._offsetY + this._textHeight)/2;
            if(i<this._sel_startCol || i>this._sel_endCol)//列
            {
                dc.fillStyle ="#DEE6F1"; //"#0f0";
                dc.fillRect((x-col.getWidth()+1),1,col.getWidth()-2,this._offsetY-2);
		    }
            else
            {
                dc.fillStyle = selColor;
                dc.fillRect((x-col.getWidth()+1),1,col.getWidth()-2,this._offsetY-2);
            }				
			
			dc.fillStyle ="#7F97B9";//"#716F64";
			dc.fillRect(x,1,1,this._offsetY-2);

            dc.fillStyle = "#000";//字体颜色
            dc.fillText(text,textx,texty);
        }
    }
    dc.fillStyle = "#fff";
    if(y < this.getHeight() )
    {
	    dc.fillRect(0,y,this.getWidth(),this.getHeight()-y);
	}
	if(x < this.getWidth())
	{
	    dc.fillRect(x,0,this.getWidth()-x,this.getHeight());
	}
    this.releaseDc(dc);
}

DataGrid.prototype.openJson = function(jsonstr)
{	
	
	var DATA=new parseXjc(jsonstr);
	this._rows = new Array();
	this._cols=[];
	this._rows=DATA._rows;
	this._cols=DATA._cols;
	this._xjc=DATA.xjc;
	this._cells = new Array();
	var General=["caneditform","rowheadwidth","colheadheight","showgrid","showheader","totalcol","totalrow","vermajor","verminor","tableimage","backimage",
				 "pacolor","maxeditrow","maxeditcol","showformula","protecthascursor","dclicklabelsort","propertiy","printgrid","fixedcols",
				 "printhcalign","printvcalign","designmode","showmenu","loadscript","data","userfuncs","genscript","savedb","hiderowdrag",
				 "tagvalue","tagval2","titlerows","selbkcolor","calscript","calscripttype","cursorwidth","sysdbsource","prefooterrows","pfooterrows",
				 "gridcolor","gridtype","statscript","errmsgbox","pagerows","useado","allowrowresize","allowcolresize","autojump","sheetname",
				 "rowautosize" ];
	for(var i=0;i<General.length;i++){
		  if(General[i] in this){
			delete  this[General[i]]; 
		  }
		  if('_'+General[i] in this){
			delete  this['_'+General[i]]; 
		  }
	}
	
	for( p in DATA.datagrid){
		if(p ==='_VerMinor'){
			this['_verminor']=DATA.datagrid[p];	
		}else{
			this[p]=DATA.datagrid[p];	
		}
	}
	this['print']=DATA['print'];
	for(i=0;i < this._rows.length;i++)
	{
		this._cells.push(new Array());
		for(j=0;j < this._cols.length;j++)
		{
			this._cells[i].push({});
		}
	}
	//
	
	for(var i=0;i < this._rows.length;i++){
		
		for(var j=0;j < this._cols.length;j++){
			
			
			for( p in DATA._cells[i][j]){
				
				if(DATA._cells[i][j].cellcheck !== undefined){
					var startcoor = this.getCellLeftTopCoor(i,j);
					this._cells[i][j][p]=DATA._cells[i][j][p];
					this._cells[i][j][p].x=startcoor.x;
					this._cells[i][j][p].y=startcoor.y;
				}else{
					this._cells[i][j][p]=DATA._cells[i][j][p];
				}
			}		
		}	
	}
	if(this._tableimage !== undefined){
		var tableimglist = this._tableimage.split(',');
		var bb=[];
		for(var i=0;i<tableimglist.length;i++){
		  if(tableimglist[i]!=='' && i==0){		
		    var img=new Image();
		   
			img.src =this._imglist[tableimglist[i]-1]['src'];
			img.id="uploadimgToCanavs"+i;
				
				bb.push("aa"+i);
				 	

				document.body.appendChild(img);
				bb[i]= new dragimg(img.id,img.width,img.height);	
		   }
		}
		
	}
	
	//exportXml(this);
	//=DATA._cells;

}
