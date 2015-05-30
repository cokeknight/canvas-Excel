DataGrid.prototype.paintCellSlantline = function(dc, cell, x, y, width, height) {
	var slantline=cell._slty;
//    if (cell._slty != 'none' && slantline != undefined) //对角线 无左右对齐
//    {
//        dc.fillStyle = cell._backColor;
//        dc.fillRect(x + 1, y + 1, width - 2, height - 2); //清除原先的字迹		
//    }
	
    var splitFirstTwoSeparator = function(obj, separator) {
	  var obj =obj ||'';
	
       var result = obj.split(separator, 2);

       if(T.string.glCountInstances(obj,'|')>1){ 
		   result.push(obj.substr(obj.indexOf("|") + 1).replace(result[1] + '|', ''));
	   }

        return result;

    };
    var splitFirstSeparator = function(obj, separator) {
		var obj =obj ||'';
        var result = obj.split(separator, 1);

        obj.indexOf("|")!=-1?result.push(obj.substr(obj.indexOf("|") + 1)):null;

        return result;

    };
	/*遮罩区域*/
	dc.save();	
	dc.beginPath();
	dc.strokeStyle = "transparent";
	dc.rect(x,y,width,height);
	dc.clip();
	dc.stroke(); 
	dc.closePath();

	if(this._penlist === undefined) this._penlist=[{"style":"0","widx":"1","color":"#000000"}];
		var slantColor=this._penlist[cell._spenid].color || '#000';
		var slantWidth=this._penlist[cell._spenid].widx || 1;
        dc.strokeStyle = slantColor;
        dc.lineWidth = slantColor;	
		
	if(cell.getFtid() === undefined){
		var celltext=	{"hei":-12,"fname":"宋体"};
	}else{
		if(this._ftlist === undefined) this._ftlist=[{"hei":-12,"fname":"宋体"}];
		var celltext = this._ftlist[cell.getFtid()] || {"hei":-12,"fname":"宋体"};
	}

	var textfontsize = celltext.hei!==undefined?-parseInt(celltext.hei,10) :12;
	var horMargin = cell._lspan || 5;//内左边距
	if(cell.getFtid()){
		dc.font = this.getdcfont(this._ftlist[cell.getFtid()]);//fontstr +" "+ cell._fontSize + "px " + cell._fontFamily;
	}else{
		dc.font ="12px 宋体";	
	}
	dc.fillStyle = T.color.getcolorFromByte(cell.get("tcor")) || "#000000";

    if (slantline == '1') //对角线 无左右对齐
    {

        dc.beginPath();
        dc.moveTo(x, y);
        dc.lineTo(x + width, y + height);
        dc.stroke();
            var offset = 0;
            var snums = 0;
            var textss = splitFirstSeparator(cell._t, "|");
				
            var i, textx, texty, text, textlength, fontstr = "",
            drawtextlist = new Array;
	
			var textfontsize = celltext.hei!==undefined?-parseInt(celltext.hei,10) :12;
			var horMargin = cell._lspan || 5;//内左边距
			if(cell.getFtid()){
				dc.font = this.getdcfont(this._ftlist[cell.getFtid()]);//fontstr +" "+ cell._fontSize + "px " + cell._fontFamily;
			}else{
				dc.font ="12px 宋体";	
			}
            dc.fillStyle = T.color.getcolorFromByte(cell.get("tcor")) || "#000000";
			
            textlength = dc.measureText(textss[0]).width;
			
            var pos = [[x + width - textlength - horMargin, y + textfontsize], [x + horMargin, y + height -textfontsize/2]];
            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
                dc.fillText(text, pos[i][0], pos[i][1]);
            }
    }

    if (slantline == "8") {//反对角线
        dc.beginPath();
        dc.moveTo(x, y + height);
        dc.lineTo(x + width, y);
        dc.stroke();

        if (cell._t.indexOf("|") != -1) {
            var offset = 0;
            var snums = 0;
            var textss = splitFirstSeparator(cell._t, "|");

            var drawtextlist = [];
            textlength = dc.measureText(textss[1]).width;

            var pos = [[x + horMargin, y + textfontsize], [x + width - textlength - horMargin, y +height -textfontsize/2]];
            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
                dc.fillText(text, pos[i][0], pos[i][1]);
            }
        }
    }

    if (slantline == "2") {//上对角线
        dc.beginPath();
        dc.moveTo(x, y);
        dc.lineTo(x + width, y + height / 2);
        dc.stroke();
        dc.moveTo(x, y);
        dc.lineTo(x + width / 2, y + height);
        dc.stroke();
            var offset = 0;
            var snums = 0;
            var textss = splitFirstTwoSeparator(cell._t, "|");
            var drawtextlist = new Array;

            textlength = dc.measureText(textss[0]).width;

            var pos = [[x + width - textlength - horMargin, y + textfontsize, y + textfontsize],

            [x + (width-textlength)/ 2, y + height / 2 + textfontsize / 2],

            [x + horMargin, y + height-textfontsize/2]];
            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
                dc.fillText(text, pos[i][0], pos[i][1]);
            }
    }

    if (slantline == "3") {//下对角线
        dc.beginPath();
        dc.moveTo(x + width, y + height);
        dc.lineTo(x, y + height / 2);
        dc.stroke();
        dc.moveTo(x + width, y + height);
        dc.lineTo(x + width / 2, y);
        dc.stroke();
            var offset = 0;
            var snums = 0;
            var textss = splitFirstTwoSeparator(cell._t, "|");

            var i, textx, texty, text, textlength, fontstr = "",
            drawtextlist = new Array;
			
            textlength = dc.measureText(textss[0]).width;

            var pos = [[x + width - textlength - horMargin, y + textfontsize],

            [x + (width-textlength)/ 2, y + height / 2 + textfontsize / 2],

            [x + horMargin, y + height - textfontsize / 2]];
            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
                dc.fillText(text, pos[i][0], pos[i][1]);
            }

    }
    if (slantline == "4") //画横线
    {
        dc.beginPath();
        dc.moveTo(x, y + height / 2);
        dc.lineTo(x + width, y + height / 2);
        dc.stroke();
            var offset = 0;
            var snums = 0;
            var textss = splitFirstSeparator(cell._t, "|");

            var i, textx, texty, text, textlength, fontstr = "",
            drawtextlist = new Array;
           
            var pos = [[x + horMargin, y + (height + textfontsize) / 2 - height / 4],

            [x + horMargin, y + (height + textfontsize) / 2 + height / 4]];
            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
                dc.fillText(text, pos[i][0], pos[i][1]);
            }
    }
    if (slantline == "5	") {
        dc.beginPath();
        dc.moveTo(x + width / 2, y);
        dc.lineTo(x + width / 2, y + height);
        dc.stroke();

            var offset = 0;
            var snums = 0;
            var textss = splitFirstSeparator(cell._t, "|");

            var i, textx, texty, text, textlength, fontstr = "",
            drawtextlist = new Array;
           
            textlength1 = dc.measureText(textss[0]).width;
            textlength2 = dc.measureText(textss[1]).width;
            var pos = [[x + (width / 2 - textlength1) / 2, y + (height + textfontsize) / 2],

            [x + (3 * width - 2 * textlength2) / 4, y + (height + textfontsize) / 2]];
            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
                dc.fillText(text, pos[i][0], pos[i][1]);
            }
    }
    if (slantline == "6") {//根据文字分隔符产生对应的竖线
        if(cell._t!==undefined && cell._t.indexOf("|") != -1) {
            //dc.fillStyle = cell._backColor;
           // dc.fillRect(x + 1, y + 1, width - 2, height - 2);

            var count = T.string.glCountInstances(cell._t, "|");
            dc.beginPath();
            for (var i = 1; i <= count; i++) {

                dc.moveTo(x + (width / (count + 1)) * i, y);
                dc.lineTo(x + (width / (count + 1)) * i, y + height);
                dc.stroke();
            }
            var offset = 0;
            var snums = 0;
            var textss = cell._t.split("|");
            var i, textx, texty, text, textlength, fontstr = "",verMargin = cell._tspan || 3;
           
            for (var i = 0; i < textss.length; i++) {
				textx=x,texty=y;
                var text = textss[i];
				var twidth = dc.measureText(text).width;
				if (cell._hag=== "0") {
					textx = textx + (width / (count + 1)) * i;
				} else if (cell._hag === "6") {//居中
					if (twidth > width) {
						textx = textx + (width / (count + 1)) * i;
					} else {
						textx = textx + (width / (count + 1)) * i+((width / (count + 1))-twidth)/2;
					}
					
				} else if (cell._hag === "2") {
					textx =textx + (width / (count + 1)) * (i+1) - horMargin - twidth;
				}
				if (cell._vag== "0") {
					texty = texty + textfontsize+verMargin;
				} else if (cell._vag == "6") {
					
					texty = texty + (height + textfontsize) / 2;
				
				} else if (cell._vag == "8") {
					texty = texty + height - verMargin;
				}
                dc.fillText(text, textx, texty);
            }
        }
    }
    if (slantline == "7") {//根据文字分隔符产生对应的横线
        if (cell._t!==undefined && cell._t.indexOf("|") != -1) {
            //dc.fillStyle = cell._backColor;
            //dc.fillRect(x + 1, y + 1, width - 2, height - 2);

            var count = T.string.glCountInstances(cell._t, "|");
            dc.beginPath();
            for (var i = 1; i <= count; i++) {

                dc.moveTo(x, y + (height / (count + 1)) * i);
                dc.lineTo(x + width, y + (height / (count + 1)) * i);
                dc.stroke();
            }
            var offset = 0;
            var snums = 0;
            var textss = cell._t.split("|");
            var i, textx, texty, text, textlength, fontstr = "",verMargin = cell._tspan || 3;

            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
				
				textx=x,texty=y;
				var twidth = dc.measureText(text).width;
				if (cell._hag=== "0") {
					textx = textx + horMargin;
				} else if (cell._hag === "6") {//居中
					 textx = textx + (width - twidth) / 2;					
				} else if (cell._hag === "2") {
					textx = textx + width - horMargin - twidth;
				}
				if (cell._vag== "0") {
					texty = texty +textfontsize+(height / (count + 1)) * i ;
				} else if (cell._vag == "6") {
					
					texty = texty +(height / (count + 1)) *i+((height / (count + 1)) +textfontsize)/2;
				
				} else if (cell._vag == "8") {
					texty = texty + (height / (count + 1)) * i+(height / (count + 1))- verMargin;
				}
                dc.fillText(text, textx, texty);
            }
        }
    }
	dc.restore();
	/*遮罩区域*/	
}

DataGrid.prototype.keypress = function(e) {
    var keystring = '';
    var currKey = 0,
    CapsLock = 0,
    e = e || window.event;currKey = e.keyCode||e.which ||e.charCode;CapsLock = currKey >= 65 && currKey <= 90;
	switch (currKey){//屏蔽了退格、制表、回车、空格、方向键、删除键
    case 8:
    case 9:
    case 13:
	case 32:
    case 37:
    case 38:
    case 39:
    case 40:
        keyName = "";
        break;
    default:
        keyName = String.fromCharCode(currKey);
        break;
    }  

    keystring += keyName;
	
	var cell = new DataCell(this._cells[this._focusRow][this._focusCol]);
	if((cell._fl >> 15) & 0x01)
	{
			if(!/^\d+$/.test(keystring)||(T.string.glCountInstances(cell._t, ".")>0&&keystring==='.')){preventDefault(e);return false;}
			
	}else if((cell._fl >> 1) & 0x01){//只能输入数字
		
	}else if(cell._fl && ((cell._fl >> 0) & 0x01) === 0){//单元保护
		alert('单元保护');
		return false;
	}else if((cell._fl >> 9) & 0x01){//只能输入数字
		if(!/^\d+$/.test(keystring)){preventDefault(e);return false;}
	}else if((cell._fl >> 13) & 0x01)//日期控件
	{
		preventDefault(e);return false;	
	}else if (cell._cellcheck !== undefined ) {//超级链接
			if(Number(cell._cellcheck.noedit) === 1){//不可编辑
				return false;
			}
		}

    this.showEditbox(keystring);
}
DataGrid.prototype.commandKey = function(e) {
    var keystring = '';
    var currKey = 0,
    CapsLock = 0,
    e = e||window.event;currKey = e.keyCode|| e.which || e.charCode;CapsLock = currKey >= 65 &&currKey <= 90;
    if (currKey == 46) { //del
        if (document.getElementById("_innerDiv") && document.getElementById("_innerDiv").style.display == "block") {
            clearCeng("_outerDiv");
        }

    }
}
DataGrid.prototype.showEditbox = function(string) {
    var cell = new DataCell(this._cells[this._focusRow][this._focusCol]);
    var cellsize = this.getCellSize(this._focusRow, this._focusCol);
	//

	 var cellx = 0,celly = 0,dc = this.getDc(),textwidth = cellsize.width,cellsize, compos, cellpos,
	 row, col, cell, temprow, tempcol, tempwidth;
    
	var cellpos = this.getCellLeftTopCoor(this._focusRow, this._focusCol); //获得单元格在画布里的位置

    var left = (document.body.clientWidth - _gl_canvas.width) / 2 + document.body.scrollLeft;
    dc.fillStyle = "#fff";
    dc.fillRect(cellpos.x, cellpos.y, textwidth, cellsize.height);

   
	compos = this.getCanvasXY();
    var dc = this.getDc();

    //获取选定单元格的位置
    cellx = compos.x + cellpos.x;
    celly = compos.y + cellpos.y;
	
    this._editBox.style.left = cellx + document.getElementById("canvas").offsetLeft + "px";
    this._editBox.style.top = celly + document.getElementById("canvas").offsetTop + "px";
    this._editBox.style.width = cellsize.width + "px";
    this._editBox.style.height = cellsize.height + "px";
    this._editBox.style.display = "";
    this._editBox.focus();
    this.releaseDc(dc);

}
DataGrid.prototype.setBorderLine = function(Shape) {
    this.setBorderLines(Shape, this._sel_startRow, this._sel_startCol, this._sel_endRow, this._sel_endCol);
}
DataGrid.prototype.setBorderStyle=function(i,j,pos){
	
	var setborder=function(i,j,arg)
	{	
		var style="0",widx="1",color="#000000";
		if("undefined" !== typeof borderWidth)
		{
			widx = borderWidth;
		}
		if("undefined" !== typeof borderColor)
		{	
			color= borderColor;
		}
		if("undefined" !== typeof borderStyle)
		{
			style = borderStyle;
		}
		//color=color.substring(1);
		//color=color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
		//color = parseInt(color,16);
		
		if(this._penlist===undefined)this._penlist=[];
		var templist={"style":style,"widx":String(widx),"color":color};
		
		var listid=T.array.InArray(templist,this._penlist);//查询ftid的值 若为false则 插入
		if(listid === false){
			this._penlist.push(templist);
			listid = String(this._penlist.length-1);	
		}
		var fl = this._cells[i][j].fl;
		fl=fl|(1<<0);
		if(arg === 'Top'){
			this._cells[i][j].tpenid=listid;
			this._cells[i][j].fl=fl|(1<<5);//fl^(1 << 5);
		}else if(arg === 'Left'){
			this._cells[i][j].lpenid=listid;
			this._cells[i][j].fl=fl|(1<<4);//fl^(1 << 4);
		}else if(arg === 'Right'){
			this._cells[i][j].rpenid=listid;
			this._cells[i][j].fl=fl|(1<<6);//fl^(1 << 6);
		}else if(arg === 'Bottom'){
			this._cells[i][j].bpenid=listid;
			this._cells[i][j].fl=fl|(1<<7);//fl^(1 << 7);
		}
	};
	var cell = new DataCell(this._cells[i][j]);
	if(arguments[3]!==undefined){//导入json
			if(pos.indexOf("top")!==-1)
			{

				setborder.call(this,i,j,"Top");
			}
			if(pos.indexOf("left")!==-1)
			{
				setborder.call(this,i,j,"Left");	
			}
			if(pos.indexOf("right")!==-1)
			{	
				setborder.call(this,i,j,"Right");
			}
			if(pos.indexOf("bottom")!==-1)
			{
				setborder.call(this,i,j,"Bottom");
			}
	}else{
		if(cell.getCombineStyle() == "combine")//合并单元格
		{	
			var rows=cell.getRowspan();
			var cols=cell.getColspan();
			if(pos.indexOf("top")!==-1)
			{
				setborder.call(this,i,j,"Top");
//				for(var k=j;k<j+cols;k++){
//					if(this._cells[i-1][k]!==undefined&&this._cells[i-1][k].borderBottomWidth!==0)this.clearBorderStyle(i-1,k,"bottom");
//				}
			}
			if(pos.indexOf("left")!==-1)
			{
				setborder.call(this,i,j,"Left");	
				//if(this._cells[i][j-1]!==undefined&&this._cells[i][j-1].borderRightWidth!==0)this.clearBorderStyle(i,j-1,"right");
//				for(var k=i;k<i+rows;k++){
//					if(this._cells[k][j-1]!==undefined&&this._cells[k][j-1].borderRightWidth!==0)this.clearBorderStyle(k,j-1,"right");
//				}
			}
			if(pos.indexOf("right")!==-1)
			{	
				setborder.call(this,i,j,"Right");
				//if(this._cells[i][j+1]!==undefined&&this._cells[i][j+1].borderLeftWidth!==0)this.clearBorderStyle(i,j+1,"left");
				//for(var k=i;k<i+rows;k++){
					//if(this._cells[k][j+cols]!==undefined&&this._cells[k][j+cols].borderLeftWidth!==0)this.clearBorderStyle(k,j+cols,"left");
				//}
			}
			if(pos.indexOf("bottom")!==-1)
			{
				setborder.call(this,i,j,"Bottom");
				//for(var k=j;k<j+cols;k++){
					//if(this._cells[i+rows][k]!==undefined&&this._cells[i+rows][k].borderTopWidth!==0)this.clearBorderStyle(i+rows,k,"top");
				//}
			}
		}else if(cell.getCombineStyle() == "none")
		{
			if(pos.indexOf("top")!==-1)
			{
				setborder.call(this,i,j,"Top");
				//if(this._cells[i-1][j]!==undefined&&this._cells[i-1][j].borderBottomWidth!==0)this.clearBorderStyle(i-1,j,"bottom");
			}
			if(pos.indexOf("left")!==-1)
			{
				setborder.call(this,i,j,"Left");	
				//if(this._cells[i][j-1]!==undefined&&this._cells[i][j-1].borderRightWidth!==0)this.clearBorderStyle(i,j-1,"right");
			}
			if(pos.indexOf("right")!==-1)
			{	
				setborder.call(this,i,j,"Right");
				//if(this._cells[i][j+1]!==undefined&&this._cells[i][j+1].borderLeftWidth!==0)this.clearBorderStyle(i,j+1,"left");
			}
			if(pos.indexOf("bottom")!==-1)
			{
				setborder.call(this,i,j,"Bottom");
				//if(this._cells[i+1][j]!==undefined&&this._cells[i+1][j].borderTopWidth!==0)this.clearBorderStyle(i+1,j,"top");
			}
	
		}
	}
}
DataGrid.prototype.clearBorderStyle=function(i,j,pos){
	var setborder=function(i,j,arg)
	{	
		var fl = this._cells[i][j].fl;
		if(arg === 'Top'){
			if(this._cells[i][j].tpenid!==undefined)delete this._cells[i][j].tpenid;
			fl=fl|(1<<5);
			fl=fl^(1 << 5);
		}else if(arg === 'Left'){
			if(this._cells[i][j].lpenid!==undefined)delete this._cells[i][j].lpenid;
			fl=fl|(1<<4);
			fl=fl^(1 << 4);
		}else if(arg === 'Right'){
			if(this._cells[i][j].rpenid!==undefined)delete this._cells[i][j].rpenid;
			fl=fl|(1<<6);
			fl=fl^(1 << 6);
		}else if(arg === 'Bottom'){
			if(this._cells[i][j].bpenid!==undefined)delete this._cells[i][j].bpenid;
			fl=fl|(1<<7);
			fl=fl^(1 << 7);
		
		}	
		
		if(this._cells[i][j].fl!==undefined)this._cells[i][j].fl=fl;

	};
	
	var cell = new DataCell(this._cells[i][j]);
	if(cell.getCombineStyle() === "combine")//合并单元格
	{	
		var rows=cell.getRowspan();
		var cols=cell.getColspan();
		if(pos.indexOf("top")!==-1)
		{
			setborder.call(this,i,j,"Top");
				for(var k=j;k<j+cols;k++){
					setborder.call(this,i-1,k,"Bottom");
				}
		}
		if(pos.indexOf("left")!==-1)
		{
			setborder.call(this,i,j,"Left");	
			for(var k=i;k<i+rows;k++){
				setborder.call(this,k,j-1,"Right");
			}
		}
		if(pos.indexOf("right")!==-1)
		{	
			setborder.call(this,i,j,"Right");
			
			for(var k=i;k<i+rows;k++){
				setborder.call(this,k,j+cols,"Left");
			}
		}
		if(pos.indexOf("bottom")!==-1)
		{
			setborder.call(this,i,j,"Bottom");
			for(var k=j;k<j+cols;k++){
				
				setborder.call(this,i+rows,k,"Top");
			}
		}
	}else
	{
		if(pos.indexOf("top")!==-1)
		{
			setborder.call(this,i,j,"Top");
			setborder.call(this,i-1,j,"Bottom");
		}
		if(pos.indexOf("left")!==-1)
		{
			setborder.call(this,i,j,"Left");	
			setborder.call(this,i,j-1,"Right");
		}
		if(pos.indexOf("right")!==-1)
		{	
			setborder.call(this,i,j,"Right");
			setborder.call(this,i,j+1,"Left");
		}
		if(pos.indexOf("bottom")!==-1)
		{
			setborder.call(this,i,j,"Bottom");
			setborder.call(this,i+1,j,"Top");
		}

	}
//	if(pos.indexOf("top")!==-1)
//	{
//		setborder.call(this,i,j,"Top");
//	}
//	if(pos.indexOf("left")!==-1)
//	{
//		setborder.call(this,i,j,"Left");	
//	}
//	if(pos.indexOf("right")!==-1)
//	{
//		setborder.call(this,i,j,"Right");
//	}
//	if(pos.indexOf("bottom")!==-1)
//	{
//		setborder.call(this,i,j,"Bottom");
//	}
}
DataGrid.prototype.setBorderLines = function(Shape, srowindex, scolindex, erowindex, ecolindex) {
   
	if (srowindex > erowindex || scolindex > ecolindex) {
        alert("paramter error: srowindex < erowindex or scolindex < ecolindex");
    } else {
        var i, j;
        if (this._rows.length < erowindex) {
            this.insertRow(erowindex);
        }

        if (this._cols.length < ecolindex) {
            this.insertCol(ecolindex);
        }
		var borderlineShape='';
        for(i=srowindex;i<=erowindex;i++)
        {
            for(j=scolindex;j<=ecolindex;j++)
            {
				var initialshape=new Array('left','top','right','bottom');
				var initialbordeline=this._cells[i][j].borderline;
				var cell = new DataCell(this._cells[i][j]);
				
				if(cell.getCombineStyle() == "combine"||(this._cells[i][j].borderline!= undefined&&scolindex===ecolindex&&srowindex===erowindex))
				{
					if(initialshape.indexOf(Shape)!=-1)
					{	
						if(this._cells[i][j].borderline===undefined){
							this._cells[i][j].borderline=Shape;
						}else if(this._cells[i][j].borderline.indexOf(Shape)==-1){
							this._cells[i][j].borderline +='-'+Shape;
						}
						this.setBorderStyle(i,j,Shape);
					}
					else if(Shape=='all'||Shape=='all_out'||Shape=='all_in')
					{
						this._cells[i][j].borderline=initialshape.join('-');
						this.setBorderStyle(i,j,this._cells[i][j].borderline);
					
					}else if(Shape=='all-top'||Shape=='top-bottom')//横框线
					{
						this.setBorderStyle(i,j,'top-bottom');
					}else if(Shape=='all-left'||Shape=='left-right')
					{
						this.setBorderStyle(i,j,'left-right');
					}
				}
				else if(cell.getCombineStyle() == "none")
				{
					if(Shape=='all')
					{	
						this._cells[i][j].borderline=initialshape.join('-');
						this.setBorderStyle(i,j,this._cells[i][j].borderline);
					
					}
					else if(Shape=='all_in' && !(erowindex==srowindex && ecolindex==scolindex))
					{
						if(i!=srowindex && i!=erowindex && j!=scolindex && j!=ecolindex)
						{
							this._cells[i][j].borderline=initialshape.join('-');	
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j==scolindex && j!=ecolindex)
						{
							this._cells[i][j].borderline=['right','bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j==scolindex && j==ecolindex)
						{
							this._cells[i][j].borderline=['bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j!=scolindex&& j!=ecolindex)
						{
							this._cells[i][j].borderline=['right','bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==erowindex &&i!=srowindex&& j!=scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['top'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=erowindex &&i!=srowindex&& j==scolindex&& j!=ecolindex)
						{
							this._cells[i][j].borderline=['top','right','bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=erowindex &&i!=srowindex&& j!=scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['top'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=erowindex &&i!=srowindex&& j==scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==erowindex &&i==srowindex && j!=ecolindex)
						{
							this._cells[i][j].borderline=['right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==erowindex &&i!=srowindex && j!=ecolindex&& j!=scolindex)
						{
							this._cells[i][j].borderline=['top','left','right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==erowindex &&i!=srowindex && j!=ecolindex&& j==scolindex)
						{
							this._cells[i][j].borderline=['right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}						
						else if(i==srowindex &&i==erowindex && j==scolindex )
						{
							this._cells[i][j].borderline=['right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}

					}
					else if(Shape=='all_out')
					{
						if(i==srowindex && i==erowindex && j==scolindex && j==ecolindex)
						{
							this._cells[i][j].borderline=initialshape.join('-');	
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j==scolindex && j!=ecolindex)
						{
							this._cells[i][j].borderline=['left','top'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j==scolindex && j==ecolindex)
						{
							this._cells[i][j].borderline=['left','top','right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j!=scolindex&& j!=ecolindex)
						{
							this._cells[i][j].borderline=['top'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j!=scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['top','right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}						
						else if(i==srowindex &&i==erowindex  && j!=scolindex&&j==ecolindex)
						{
							this._cells[i][j].borderline=['top','right','bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i==erowindex && j==scolindex&&j!==ecolindex )
						{
							this._cells[i][j].borderline=['top','left','bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}else if(i==srowindex &&i==erowindex && j!=scolindex&&j!=ecolindex )
						{
							this._cells[i][j].borderline=['top','bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=srowindex&&i!=erowindex && j==scolindex&& j!=ecolindex)
						{
							this._cells[i][j].borderline=['left'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=srowindex&&i!=erowindex && j!=scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=srowindex&&i!=erowindex && j==scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['left','right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=srowindex && i==erowindex &&j!=scolindex && j!=ecolindex)
						{
							this._cells[i][j].borderline=['bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=srowindex &&i==erowindex && j==scolindex&& j!=ecolindex)
						{
							//this._cells[i][j].borderline=['bottom','left'].join('-');
							this.setBorderStyle(i,j,'bottom-left');
						}						
						else if(i!=srowindex&&i==erowindex && j!=scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['bottom','right'].join('-');
							this.setBorderStyle(i,j,'bottom-right');
						}							
					}					
					else if(Shape=='left')
					{
						if(j==scolindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("left")===-1){
								this._cells[i][j].borderline=['left',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,Shape);
						}
					}
					else if(Shape=='right')
					{
						if(j==ecolindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("right")===-1){
								this._cells[i][j].borderline=['right',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,Shape);
						}
					}
					else if(Shape=='top')//上框线
					{
						if(i==srowindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("top")===-1){
								this._cells[i][j].borderline=['top',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,Shape);
						} 	
					}
					else if(Shape=='bottom')
					{
						if(i==erowindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("bottom")===-1){
								this._cells[i][j].borderline=['bottom',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,Shape);
						}
					}
					else if(Shape=='top-bottom')
					{
						if(i!=srowindex&&i==erowindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("bottom")===-1){
								this._cells[i][j].borderline=['bottom',initialbordeline].join('-');	
								
							}
							this.setBorderStyle(i,j,'bottom');	
							
						}
						if(i==srowindex&&i!=erowindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("top")===-1){
								this._cells[i][j].borderline=['top',initialbordeline].join('-');		
								
							}
							this.setBorderStyle(i,j,'top');	
						}
						if(i==srowindex&&i==erowindex)
						{
							this._cells[i][j].borderline=['top','bottom'].join('-');	
							this.setBorderStyle(i,j,Shape);
						}							

					}
					else if(Shape=='left-right')
					{
						if(j==scolindex&&j!=ecolindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("left")===-1){
								this._cells[i][j].borderline=['left',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,"left");
						}
						if(j==ecolindex&&j!=scolindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("right")===-1){
								this._cells[i][j].borderline=['right',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,'right');
						}
						if(j==scolindex&&j==ecolindex)
						{
							this._cells[i][j].borderline=['left','right'].join('-');	
							this.setBorderStyle(i,j,Shape);
						}
					}
					else if(Shape=='all-top')//横框线
					{
						if(i!=srowindex&&i==erowindex)
						{
							if(initialbordeline===undefined){
								
								this._cells[i][j].borderline=['bottom-top',initialbordeline].join('-');		
							
							}else if((initialbordeline.indexOf("bottom")===-1&&initialbordeline.indexOf("top")===-1)){
								
								this._cells[i][j].borderline=['bottom-top',initialbordeline].join('-');	
							
							}else if(initialbordeline.indexOf("bottom")===-1){
								
								this._cells[i][j].borderline=['bottom',initialbordeline].join('-');		
							
							}else if(initialbordeline.indexOf("top")===-1){
								
								this._cells[i][j].borderline=['top',initialbordeline].join('-');		
							
							}
							this.setBorderStyle(i,j,'bottom-top');
						}
						if(i==srowindex&&i!=erowindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("top")===-1){
								this._cells[i][j].borderline=['top',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,'bottom-top');
						}
						if(i!=srowindex&&i!=erowindex)
						{
							if(initialbordeline===undefined){
								
								this._cells[i][j].borderline=['bottom-top',initialbordeline].join('-');		
							
							}else if((initialbordeline.indexOf("bottom")===-1&&initialbordeline.indexOf("top")===-1)){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');	
							
							}else if(initialbordeline.indexOf("bottom")===-1){
								
								this._cells[i][j].borderline=['bottom',initialbordeline].join('-');		
							
							}else if(initialbordeline.indexOf("top")===-1){
								
								this._cells[i][j].borderline=['top',initialbordeline].join('-');		
							
							}
							this.setBorderStyle(i,j,'bottom-top');
						}
						if(i==srowindex&&i==erowindex)
						{	
							this._cells[i][j].borderline=['top','bottom'].join('-');	
							this.setBorderStyle(i,j,'bottom-top');
						}
					}
					else if(Shape=='all-left')//竖框线
					{
						if(j==scolindex&&j!=ecolindex)
						{
							if(initialbordeline===undefined){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');		
							
							}else if((initialbordeline.indexOf("left")===-1&&initialbordeline.indexOf("right")===-1)){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');	
							
							}else if(initialbordeline.indexOf("left")===-1){
								
								this._cells[i][j].borderline=['left',initialbordeline].join('-');		
							
							}else if(initialbordeline.indexOf("right")===-1){
								
								this._cells[i][j].borderline=['right',initialbordeline].join('-');		
							
							}
							this.setBorderStyle(i,j,'left-right');
						}
						if(j==ecolindex&&j!=scolindex)
						{
							if(initialbordeline===undefined){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');		
							
							}else if((initialbordeline.indexOf("left")===-1&&initialbordeline.indexOf("right")===-1)){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');	
							
							}else if(initialbordeline.indexOf("left")===-1){
								
								this._cells[i][j].borderline=['left',initialbordeline].join('-');		
							
							}else if(initialbordeline.indexOf("right")===-1){
								
								this._cells[i][j].borderline=['right',initialbordeline].join('-');		
							
							}
							this.setBorderStyle(i,j,'left-right');
						}
						if(j!=ecolindex&&j!=scolindex)
						{
							if(initialbordeline===undefined){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');		
							
							}else if((initialbordeline.indexOf("left")===-1&&initialbordeline.indexOf("right")===-1)){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');	
							
							}else if(initialbordeline.indexOf("left")===-1){
								
								this._cells[i][j].borderline=['left',initialbordeline].join('-');		
							
							}else if(initialbordeline.indexOf("right")===-1){
								
								this._cells[i][j].borderline=['right',initialbordeline].join('-');		
							
							}
							this.setBorderStyle(i,j,'left-right');
						}
						if(j==scolindex&&j==ecolindex)
						{
							this._cells[i][j].borderline=['left','right'].join('-');	
							this.setBorderStyle(i,j,'left-right');
						}
					}
					

				}
				if(i==srowindex && j == scolindex)
                {	
				}
                else
                {
                }
				
				
				
            }
        }
    }
	this.clear();
	this.paint();
}
DataGrid.prototype.clearBorderLine= function(Shape) {
    var srowindex=this._sel_startRow, scolindex=this._sel_startCol, erowindex=this._sel_endRow,ecolindex= this._sel_endCol;
	
	if (srowindex > erowindex || scolindex > ecolindex) {
        alert("paramter error: srowindex < erowindex or scolindex < ecolindex");
    } else {
        var i, j,cell;
        if (this._rows.length < erowindex) {
            this.insertRow(erowindex);
        }

        if (this._cols.length < ecolindex) {
            this.insertCol(ecolindex);
        }
		var borderlineShape='';
		var clearborderline = function(Shape,i,j){
	
		}
        for(i=srowindex;i<=erowindex;i++)
        {
            for(j=scolindex;j<=ecolindex;j++)
            {
				cell = new DataCell(this._cells[i][j]);
				var oldborderline=this._cells[i][j].borderline;
				var initialshape=new Array('left','top','right','bottom');

				if (cell.getColspan() > 0 && cell.getRowspan() > 0) {//该单元格为合并 或者正常
					if (cell.getCombineStyle() == "combine") { //该单元格为合并
					if(Shape=='all')
					{
						
						this.clearBorderStyle(i,j,initialshape.join('-'));
					}
					else if(Shape=='all_in')
					{
							this.clearBorderStyle(i,j,'right-bottom');
					}
					else if(Shape=='all_out')//外部框线
					{
						this.clearBorderStyle(i,j,initialshape.join('-'));
					}					
					else if(Shape=='left')//做框线
					{
							this.clearBorderStyle(i,j,'left');
					}
					else if(Shape=='right')
					{
							this.clearBorderStyle(i,j,'right');
					}
					else if(Shape=='top')
					{
							this.clearBorderStyle(i,j,'top');
					}
					else if(Shape=='bottom')//抹下框线
					{
							this.clearBorderStyle(i,j,'bottom');
					}
					else if(Shape=='top-bottom')//抹上下框线
					{
						this.clearBorderStyle(i,j,'top-bottom');
					}
					else if(Shape=='left-right')
					{
							this.clearBorderStyle(i,j,'left-right');
					}
					else if(Shape=='all-top')//横框线
					{
							this.clearBorderStyle(i,j,'top-bottom');
					}
					else if(Shape=='all-left')//竖框线
					{
							this.clearBorderStyle(i,j,'right-left');
					}
					}else { //该单元格非合并单元格
						if(Shape=='all')
						{
							
							this.clearBorderStyle(i,j,initialshape.join('-'));
						}
						else if(Shape=='all_in' && !(erowindex==srowindex && ecolindex==scolindex))
						{
							if(i!==srowindex&&i!==erowindex&&j!==scolindex&&j!==ecolindex)
							{
								this.clearBorderStyle(i,j,initialshape.join('-'));	
							}
							if(i===srowindex&&i!==erowindex&&j!==ecolindex)
							{
								this.clearBorderStyle(i,j,'right-bottom');
							}
							if(i===srowindex&&i!==erowindex&&j===ecolindex)
							{
								this.clearBorderStyle(i,j,'bottom');
							}
							if(i===srowindex&&i!==erowindex&&j!==ecolindex)
							{
								this.clearBorderStyle(i,j,'right');
							}
							if(i===srowindex&&i!==erowindex&&j!==scolindex)
							{
								this.clearBorderStyle(i,j,'left');
							}
							
							if(i!==srowindex&&i===erowindex&&j!==ecolindex)
							{
								this.clearBorderStyle(i,j,'right-top');	
							}
							if(i!==srowindex&&i===erowindex&&j!==scolindex)
							{
								this.clearBorderStyle(i,j,'left-top');		
							}
							
							if(i!==srowindex&&i!==erowindex&&j!==ecolindex&&j===scolindex)
							{
								this.clearBorderStyle(i,j,'top-|bottom|right-');	
							}
							if(i!==srowindex&&i!==erowindex&&j===ecolindex&&j!==scolindex)
							{
								this.clearBorderStyle(i,j,'top-|bottom|left-');
							}
							
							if(j===scolindex&&j!==ecolindex&&i!==erowindex)
							{
								this.clearBorderStyle(i,j,'right-|bottom');
							}
							if(j===scolindex&&j===ecolindex)
							{
								this.clearBorderStyle(i,j,'right');
							}
							
							if(j!==scolindex&&j===ecolindex&&i!==srowindex)
							{
								this.clearBorderStyle(i,j,'top-left-');
							}
						}
						else if(Shape=='all_out')//外部框线
						{
							if(i===srowindex )
							{
								this.clearBorderStyle(i,j,'top');
							}
							if(i===erowindex)
							{
								this.clearBorderStyle(i,j,'bottom');
							}
							if(j===scolindex)
							{
								this.clearBorderStyle(i,j,'left');
							}
							if(j===ecolindex)
							{
								this.clearBorderStyle(i,j,'right');
							}
	
						}					
						else if(Shape=='left')//做框线
						{
							if(j==scolindex)
							{
								this.clearBorderStyle(i,j,'left');
							}
						}
						else if(Shape=='right')
						{
							if(j==ecolindex)
							{
								this.clearBorderStyle(i,j,'right');
							}
						}
						else if(Shape=='top')
						{
							if(i==srowindex)
							{
								this.clearBorderStyle(i,j,'top');
							}
						}
						else if(Shape=='bottom')//抹下框线
						{
							if(i==erowindex)
							{	
								this.clearBorderStyle(i,j,'bottom');
							}
						}
						else if(Shape=='top-bottom')//抹上下框线
						{
							if(i!=srowindex&&i==erowindex)
							{
								this.clearBorderStyle(i,j,'bottom');
							}
							if(i==srowindex&&i!=erowindex)
							{
								this.clearBorderStyle(i,j,'top');
							}
							if(i==srowindex&&i==erowindex)
							{
								this.clearBorderStyle(i,j,'top-bottom');
							}
						}
						else if(Shape=='left-right')
						{
							if(j==scolindex&&j!=ecolindex)
							{
								this.clearBorderStyle(i,j,'left');
							}
							if(j==ecolindex&&j!=scolindex)
							{
								this.clearBorderStyle(i,j,'right');
							}
							if(j==scolindex&&j==ecolindex)
							{
								this.clearBorderStyle(i,j,'top-left');
							}
						}
						else if(Shape=='all-top')//横框线
						{
								this.clearBorderStyle(i,j,'top-bottom');
						}
						else if(Shape=='all-left')//竖框线
						{
								this.clearBorderStyle(i,j,'right-left');
						}
					}
					
				}else{//合并单元格的非主单元格
						
				}

				}
				
        }
    }
	
	//this.clearBorderStyle(oldborderline);
	this.clear();
	this.paint();
}
DataGrid.prototype.paintBorderLine = function(dc, shape, x, y, width, height,cell) {
	
//    if (shape.indexOf('left') !==-1) {
//		var color=cell._borderLeftColor;
//        var width=cell._borderLeftWidth==0?1:cell._borderLeftWidth;
//		dc.lineWidth=width;
//		dc.strokeStyle = color; //this._borderTopColor;
//        dc.beginPath();
//        dc.moveTo(x, y);
//        dc.lineTo(x, y + height);
//        dc.stroke();
//    }
//    if (shape.indexOf('right') !== -1) {
//		var color=cell._borderRightColor;
//        var width=cell._borderRightWidth==0?1:cell._borderRightWidth;
//		dc.lineWidth=width;
//		dc.strokeStyle = color; //this._borderRightColor;
//        dc.beginPath();
//        dc.moveTo(x + width, y);
//        dc.lineTo(x + width, y + height);
//        dc.stroke();
//    }
//
//    if (shape.indexOf('bottom') !== -1) {
//		var color=cell._borderBottomColor;
//        var width=cell._borderBottomWidth==0?1:cell._borderBottomWidth;
//		dc.lineWidth=width;
//		dc.strokeStyle = color; // this._borderBottomColor;
//        dc.beginPath();
//        dc.moveTo(x, y + height);
//        dc.lineTo(x + width, y + height);
//        dc.stroke();
//    }
//
//    if (shape.indexOf('top') !== -1) {
//		var color=cell._borderTopColor;
//        var width=cell._borderTopWidth==0?1:cell._borderTopWidth;
//		dc.lineWidth=width;
//		dc.strokeStyle = color; // this._borderLeftColor;
//        dc.beginPath();
//        dc.moveTo(x, y);
//        //dc.lineTo(x + width, y);
//        dc.stroke();
//    }

}
DataGrid.prototype.usepaintBorderLine = function() {
    this._Mousecursor = "url('image/icon/paintborder.ico'),auto";
    this.clear();
    this.paint();
}
DataGrid.prototype.usepaintBorderLines = function(x, y, focusRow, focusCol) {
    this._cells[focusRow][focusCol].borderline = ['left', 'right', 'top', 'bottom'].join('-');
    //	  var i,cellY;
    //	  for(i = this.getScrollRowNum();i < focusRow && y < this._height;i++)
    //	  {
    //		  row = new DataRow(this._rows[i]);
    //		  if(row.getVisible())
    //		  {
    //			  cellY += row.getHeight();
    //		  }
    //	  }
    this.clear();
    this.paint();
    //
}
DataGrid.prototype.eraserBorderLine = function() {
    this.eraserBorderLines(this._sel_startRow, this._sel_startCol, this._sel_endRow, this._sel_endCol);
}

DataGrid.prototype.eraserBorderLines = function(srowindex, scolindex, erowindex, ecolindex) {
    if (srowindex > erowindex || scolindex > ecolindex) {
        alert("paramter error: srowindex < erowindex or scolindex < ecolindex");
    } else {
        var i, j;
        if (this._rows.length < erowindex) {
            this.insertRow(erowindex);
        }

        if (this._cols.length < ecolindex) {
            this.insertCol(ecolindex);
        }
        for (i = srowindex; i <= erowindex; i++) {
            for (j = scolindex; j <= ecolindex; j++) {
				this._cells[i-1][j].borderline!==undefined?this._cells[i-1][j].borderline=this._cells[i-1][j].borderline.replace('-bottom',''):null;
				
				this._cells[i][j-1].borderline!==undefined?this._cells[i][j-1].borderline=this._cells[i][j-1].borderline.replace('-right',''):null;
				
				this._cells[i+1][j].borderline!==undefined?this._cells[i+1][j].borderline=this._cells[i+1][j].borderline.replace('-top',''):null;
				
				this._cells[i][j+1].borderline!==undefined?this._cells[i][j+1].borderline=this._cells[i][j+1].borderline.replace('-left',''):null;
                
				this._cells[i][j].borderline = 'none';
            }
        }
    }
}
DataGrid.prototype.setSelCellFontColor = function(color) {
	var color=color.substring(1);
	color=color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
	color = parseInt(color,16);
	
    var i, j;
    for (i = this._sel_startRow; i <= this._sel_endRow; i++) {
        for (j = this._sel_startCol; j <= this._sel_endCol; j++) {
            this._cells[i][j].tcor = String(color);
        }
    }
}
DataGrid.prototype.setSelCellbackColor = function(color) {
	//var color=color.substring(1);
	//color=color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
	//color = parseInt(color,16);
	
	var tempftlist=color;//T.color.getcolorFromByte(color);
	var brid=T.array.InArray(tempftlist,this._brlist);//查询ftid的值 若为false则 插入
	if(brid === false){
		if(this._brlist===undefined)this._brlist=[];
		this._brlist.push(tempftlist);
		brid = String(this._brlist.length-1);	
	}
    var i, j;
    for (i = this._sel_startRow; i <= this._sel_endRow; i++) {
        for (j = this._sel_startCol; j <= this._sel_endCol; j++) {
            this._cells[i][j].brid = brid;
        }
    }
}
DataGrid.prototype.setSelCellborderLineColor = function(color) {
    var i, j;
    for (i = this._sel_startRow; i <= this._sel_endRow; i++) {
        for (j = this._sel_startCol; j <= this._sel_endCol; j++) {
            this._cells[i][j].borderlinecolor = color;
        }
    }
}

DataGrid.prototype.getqianfenwen = function(num) {
    num = num + "";
    var re = /(-?\d+)(\d{3})/;
    while (re.test(num)) {
        num = num.replace(re, "$1,$2");
    }
    return num;

}
DataGrid.prototype.Chinese_num = function(num, type) {
    if (type == 'normal' || type == 'dx' || type == 'taoda' ) {
        var AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
        var BB = new Array("", "拾", "佰", "仟", "万", "亿", "元", "");
        var CC = new Array("角", "分", "厘");
    } else if (type == 'xx') {
        var AA = new Array("〇", "一", "二", "三", "四", "五", "六", "七", "八", "九");
        var BB = new Array("", "十", "百", "千", "万", "亿", "圆", "");
        var CC = new Array("角", "分", "厘");
    }
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
    k = 0,
    re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
        case 0:
            re = BB[7] + re;
            break;
        case 4:
            if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0])) re = BB[4] + re;
            break;
        case 8:
            re = BB[5] + re;
            BB[7] = BB[5];
            k = 0;
            break;
        }
        if (k % 4 == 2 && a[0].charAt(i) == "0" && a[0].charAt(i + 2) != "0") re = AA[0] + re;
        if (a[0].charAt(i) != 0) {
            if (i == (a[0].length - 2) && type != 'normal' && a[0].charAt(i) == 1) {
                re = BB[1] + re;
            } else {
                re = AA[a[0].charAt(i)] + BB[k % 4] + re;
            }
        }
        k++;
    }
    if (typeof(a[1]) != 'undefined') {
        if (type == 'dx' || type == 'xx') {
            re += '.';
        } else {
            re += '元';
        }
        for (var i = 0; i < a[1].length; i++) {
            re += AA[a[1].charAt(i)];
            if (type == 'normal' || type === 'taoda') re += CC[i];
            if(a[1].length == 1&&type === 'taoda') re += AA[0]+CC[1];
			if (i == 1)break;
        }
        if (a[1].charAt(0) == "0" && a[1].charAt(1) == "0") {
            re += "元整";
        }
    } else {
        if (type == 'normal') re += "元整";
		if (type === 'taoda') re += "元"+AA[0]+CC[0]+AA[0]+CC[1];
    }
    return re;

}
DataGrid.prototype.numTochart = function(num, type) {
    numto = function(num, type) {
        var floors = num / 26;
        var re = '';
        if (num % 27 != 0 && floors <= 1) {
            if (type == 'xx') {
                re += String.fromCharCode(num - 1 + 65).toLowerCase();
            } else if (type == 'dx') {
                re += String.fromCharCode(num - 1 + 65);
            }
        }
        if (floors > 1) {
            if (/^[0-9]*[1-9][0-9]*$/.test(floors)) floors--;
            var yushu = num % 26 == 0 ? 26 : num % 26;
            re += numto(floors, type) + numto(yushu, type);
        }
        return re;

    }
    num = ("" + num).replace(/(^0*)/g, "");
    var re = numto(num, type);
    return re;
}
DataGrid.prototype.numbyten = function(num, nby, type) {
    num = ("" + num).replace(/(^0*)/g, "");
    return num + '.00';
}
DataGrid.prototype.turnFormat = function(textFormat, textv) {
    if(textv == ''){
		return textv;
	}
    if (!/^\d*(\.\d*)?$/.test(textv)){
		 if(!/^(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2}):(\d{2}))?$/.test(textv)){
		 	return textv;	
		}
	}
    jason = textFormat;

    var textFormat = jason.format;
    var endnum;
    var weishu = jason.weishu;
    var nby = jason.nby;
	var type=jason.type===undefined?'':jason.type;
    if (weishu == 0) {
        endnum = '';
    } else {
        endnum = '.';
        for (var i = 0; i < weishu; i++) {
            endnum += '0';
        }
    }
    if (textFormat === 'default' || textFormat === '0') {
		return textv!==''?parseFloat(textv):textv;

    } else if (/^\d+$/.test(textFormat)) {
        if (textFormat == '1') { //数值
			
            return ("" + textv).replace(/(^0*)/g, "") + endnum;

        } else if (textFormat == '2') { //RMB
			if(textv === '0') return '￥' + ("" + textv)+ endnum;
            return '￥' + ("" + textv).replace(/(^0*)/g, "") + endnum;

        } else if (textFormat == '3') { //美元币
		
            return '$' + ("" + textv).replace(/(^0*)/g, "") + endnum;

        } else if (textFormat == '4') { //百分比
            return ("" + textv).replace(/(^0*)/g, "") * 100 + endnum + '%';

        } else if (textFormat == '5') { //千位分隔式样
            return this.getqianfenwen(("" + textv).replace(/(^0*)/g, ""));

        } else if (textFormat == '6') { //欧元符号
            return '€' + ("" + textv).replace(/(^0*)/g, "") + endnum;

        } else if (textFormat == '7') { //财务大写
            return this.Chinese_num(textv, 'normal');

        } else if (textFormat == '8') { //文本
            return textv + endnum;

        } else if (textFormat == '11') { //套打大写
            return this.Chinese_num(textv,'taoda');

        } else if (textFormat == '12') { //中文数字小写
            return this.Chinese_num(textv, 'xx');

        } else if (textFormat == '13') { //中文数字大写
            return this.Chinese_num(textv, 'dx');

        } else if (textFormat == '14') { //一，二，三序号
            return this.Chinese_num(textv, 'xx');

        } else if (textFormat == '15') { //a,b,c序号
            return this.numTochart(textv, 'xx');

        } else if (textFormat == '16') { //A,B,C序号
            return this.numTochart(textv, 'dx');

        } else if (textFormat == '17') { //以10的n次相乘
            var nbynum = 1;
            if (nby != 0) {
                for (var i = 1; i <= nby; i++) {
                    nbynum *= 10;
                }
            }
			
            return this.turnweishu(String((("" + textv).replace(/(^0*)/g, "")) * nbynum), weishu);

        } else if (textFormat == '18') { //以10的n次相除
            var nbynum = 1;
            if (nby != 0) {
                for (var i = 1; i <= nby; i++) {
                    nbynum /= 10;
                }
            }
            return this.turnweishu(String((("" + textv).replace(/(^0*)/g, "")) * nbynum), weishu);
        }
    } else {
        var dat = new DateFormat(textv, textFormat,type);
        return dat.parseDate();
    }
}

DataGrid.prototype.turnweishu = function(textv, weishu) {
    var obj = textv.split('.');
    if (weishu == 0) {
        endnum = '';
    } else {
        endnum = '.';
        for (var i = 0; i < weishu; i++) {
            endnum += '0';
        }
    }
	
    if (obj.length===1) {
        return textv + endnum;
    } else if (obj.length >= weishu) {
        if (weishu == 0) {
            return obj;
        } else {
            return obj + '.' + String(obj).substring(0, weishu);
        }
    } else if (obj.length < weishu) {
        return obj + '.' + obj + repeat('0', weishu - obj.length);
    }
}
DataGrid.prototype.setTextFormat = function(textf) {
    var i, j;
    for (i = this._sel_startRow; i <= this._sel_endRow; i++) {
        for (j = this._sel_startCol; j <= this._sel_endCol; j++) {
			if(textf.type==='lexcel'){
				this._cells[i][j].swty=10;
				this._cells[i][j].lexcel='<data> <eformat>'+textf.format+'</eformat> </data>';
			}
			if("weishu" in textf){
				this._cells[i][j].swty=textf.format;
				this._cells[i][j].dpt=textf.weishu;
			}
			//this._cells[i][j].textFormat = textf;
        }
    }
    this.clear();
    this.paint();

}
DataGrid.prototype.setAutoLineFeed = function(type) {
	
    if((this._tagvalue>> 16) & 0x01){
		return ;
	}
	var cell = new DataCell(this._cells[this._focusRow][this._focusCol]);
	if(cell._t==='' || cell._t ===undefined)return;
    var dc = this.getDc();
    var cellsize = this.getCellSize(this._focusRow, this._focusCol),ftlist= this._ftlist;
	if((cell._fl >> 8) & 0x01){//自动换行
	
    	this._cells[this._focusRow][this._focusCol].fl &= ~(1 << 8);//清除自动换行
		this.setRowHeight(this._focusRow, 20); //默认高度
	
	}else{
    	//获得单元格内文字自动换行后高度
		
		var textlist = cell._t.split('\n');
		var i, temptext, textwidth, textheight,horMargin = cell._lspan || 5,textfontsize= cell.getFontSize(ftlist);
    	this._cells[this._focusRow][this._focusCol].fl |= 1 << 8;//设置自动换行
        if (cell._hag== "0" || cell._hag == "2") {
            textwidth = cellsize.width - horMargin;
        } else {
            textwidth = cellsize.width;
        }
        textheight = 0;
        for (i = 0; i < textlist.length; i++) {
            temptext = textlist[i];
            while (dc.measureText(temptext).width > textwidth) {
                text = temptext.substring(0, textwidth / dc.measureText(temptext).width * temptext.length);
                textheight += textfontsize * 4 / 3;
                temptext = temptext.substring(text.length, temptext.length);
            }
            textheight += textfontsize * 4 / 3;
        }
		textheight+=2*cell._horMargin;
        this.setRowHeight(this._focusRow, textheight);
	}

    this.clear();
    this.paint();
    this.showEditbox();
}
DataGrid.prototype.setSlantLine = function(linetype) {
	
    for (i = this._sel_startRow; i <= this._sel_endRow; i++) {
        for (j = this._sel_startCol; j <= this._sel_endCol; j++) {
			if(Number(linetype) === 0 ){
				delete this._cells[i][j].slty;
				break;
			}else{
            	this._cells[i][j].slty = linetype;
			}
			var templist={"style":"0","widx":"1","color":"#000000"};
			var listid=T.array.InArray(templist,this._penlist);//查询ftid的值 若为false则 插入
			if(listid === false){
				if(this._penlist===undefined)this._penlist=[];
				this._penlist.push(templist);
				listid = String(this._penlist.length-1);	
			}
			this._cells[i][j].spenid= listid;
			//this._cells[i][j].slty = 0;
        }
    }
    //this._cells[this._focusRow][this._focusCol].autoLineFeed=!;
    this.clear();
    this.paint();
}
DataGrid.prototype.setCustomizeCell = function(type, value,rowindex,colindex) {
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			if (type === 'num') {
					 this.setCellAttribute(i,j,'uval',value);//自定义数值
			}
			if (type === 'string') {
					 this.setCellAttribute(i,j,'sval',value);//自定义字符值
			}
			if (type === 'name') {
					 this.setCellAttribute(i,j,'bname',value);//单元变量名
			}
		} 
	}
    this.clear();
    this.paint();
}
DataGrid.prototype.setCellAttribute=function(rowindex,colindex,key,value){
	
     this._cells[rowindex][colindex][key] = value;//自定义数值
}
DataGrid.prototype.setfrozenCell = function(value1, value2) {
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{ 	
			
			if (value1) {
				this._cells[i][j].fl&= ~(1 << 0); //;//保护状态
			}else {
				this._cells[i][j].fl|= 1 << 0; // 设置第x位为1 可编辑
			}
		}
	}   
    if (value2) {
        for (i = 0; i < this._rows.length; i++) {
            for (j = 0; j < this._cols.length; j++) {
                this._caneditform = "0";
            }
        }
    } else if (!value2 && !value1) {
               delete this._caneditform;
    }

    this.clear();
    this.paint();
}
DataGrid.prototype.putimgToCanvas = function(imgid,type) {
    this._backimage = imgid;
	if(type === 'canvas_origin'){
		this._tagval2|= 1 << 17;//设置为 图片原始大小
	}else if( type === 'canvas_canvas') {
		this._tagval2&= ~(1 << 17);//设置为 图片表格大小
	}
    //this._Backimage={"filename":"cheungmine.jpg","width":200,"height":150,"size":"origin"}
    this.clear();
    this.paint();
}
DataGrid.prototype.delCanvasImage = function() {
	if( this._backimage !== undefined)
    delete this._backimage;

    this.clear();
    this.paint();
}
DataGrid.prototype.setCanvasImage = function(type) {
    if (this._backimage !== undefined) {
        if(type ==='origin'){
			this._tagval2|= 1 << 17;//设置为 图片原始大小	
		}else if( type === 'canvas'){
			this._tagval2&= ~(1 << 17);//设置为 图片表格大小	
		}
    }
    this.clear();
    this.paint();
}
DataGrid.prototype.putimgToCell = function(image) {
	if(arguments[1]==='button'){
		var imagepos = Number(arguments[2]);
		var col = this._focusCol,row = this._focusRow;
		if(imagepos == 1){//下面
			row+=1;	
		}else if(imagepos === 2){//左边
			col-=1;
		}else if(imagepos === 3){//右边
			col+=1;
		}else if(imagepos === 4){//中间
				
		}else if(imagepos === 0){//上面
			row-=1;	
		}
		
		if(this._cells[row][col]!== undefined){
			this._cells[row][col].tag|=1 << 15;//图片按比例缩放显示
			this._cells[row][col].tag|=1 << 3;//表示有图片
			this._cells[row][col].cellImage = {
				"filename": image.imagedata,
				"width": image.imagewidth,
				"height": image.imageheight,
				"type": "cell",
				"size": "imgsize",
				'imagetype':image.imagetype,
				'length':image.imagelen
			};
		}else{
			alert('错误');	
		}
	}else{
		this._cells[this._focusRow][this._focusCol].cellImage = {
			"filename": image.imagedata,
			"width": image.imagewidth,
			"height": image.imageheight,
			"type": "cell",
			"size": "imgsize",
			'imagetype':image.imagetype,
			'length':image.imagelen
		};
		this._cells[this._focusRow][this._focusCol].tag|=1 << 3;//表示有图片
		this._cells[this._focusRow][this._focusCol].tag|=1 << 4;
	}
    this.clear();
    this.paint();
}
DataGrid.prototype.delCellImage = function() {
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			var cell = this._cells[i][j];
			if(cell.imgid !== undefined)
			delete this._cells[i][j].imgid;
			if(cell.imgangle !== undefined)
			delete this._cells[i][j].imgangle;
			
			this._cells[i][j].tag&= ~(1 << 3); 
			this._cells[i][j].tag&= ~(1 << 4); 
			this._cells[i][j].tag&= ~(1 << 15); 
		}
	}	
	
    this.clear();
    this.paint();
}
DataGrid.prototype.setCellImage = function(type) {
	var _this = this;
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			var cell = this._cells[i][j];
			if(cell.cellImage!==undefined){
				if (type.turn != undefined && type.turn) {
					var angle = type.turn.angle;
					if(angle === undefined){
						angle=0;	
					}else{
						angle = parseInt(angle,10);	
					}
					if(type.turn.direction === 'right' && angle === 0){	
						angle = 90;				
					}
					
					var context = _gl_canvas2.getContext('2d');
					var rotate = (angle / 180) * Math.PI;
					_gl_canvas2.width = width;
					_gl_canvas2.height = height;
					var image = new Image();
					var imagetypearr =["image/bmp","image/jpeg","image/gif","image/png"];
					image.src='data:'+imagetypearr[cell.cellImage.imagetype-1]+';base64,'+cell.cellImage.filename;
					var w, h;
					delete this._cells[i][j].cellImage.filename;
					image.onload = function(i,j) {
					
						w =_gl_canvas2.width = image.width;
						h =_gl_canvas2.height = image.height;
						context.translate( w / 2, h / 2);
						context.rotate(rotate);
						context.drawImage(image, -w / 2, -h / 2, w, h);
						var data = _gl_canvas2.toDataURL();                     
						//删除字符串前的提示信息 "data:image/png;base64,"  
						var b64 = data.substring( 22 ); //v = w.substring(w.indexOf("base64,") + 7);
						//v = atob(w);
						_this._cells[i][j].cellImage.filename=b64;
						_this._cells[i][j].cellImage.imagetype =4;
						_this._cells[i][j].cellImage.length =b64.length*3/4;
						_this.paint();
					}(i,j)
					
				} else if (type.size != undefined && type.size) {
					if(type.size === "imgsize")
				  {
						this._cells[i][j].tag&= ~(1 << 3); 
						this._cells[i][j].tag&= ~(1 << 4); 
						this._cells[i][j].tag|=1 << 15;
				  }else if(type.size === "origin")  {//原始尺寸
						this._cells[i][j].tag&= ~(1 << 3); 
						this._cells[i][j].tag&= ~(1 << 15); 
						this._cells[i][j].tag|=1 << 4;
				   }else if(type.size === "cell")  {//单元大小
						this._cells[i][j].tag&= ~(1 << 4); 
						this._cells[i][j].tag&= ~(1 << 15); 
						this._cells[i][j].tag|=1 << 3;
				   }
				}
			}
		}
	}
}
DataGrid.prototype.setTableHead = function(type) {
    if (this._offsetX != 0||type==false) {
		this._showheader = 0;
        this._offsetX = 0;
        this._offsetY = 0;
    } else {
		this._showheader = 1;
        this._offsetX = 40;
        this._offsetY = 20;
    }
	
    this.clear();
    this.paint();
}
DataGrid.prototype.setSelLineAll = function(type) {
    
	if((this._tagvalue>>16)& 0x01){
		this._selLineAll.on= false;
		this._tagvalue&= ~(1 << 16);
	}else{
		this._selLineAll.on=true;
			
		this._tagvalue|=1 << 16; // 设置第x位为1
	}
	
	if(arguments[1]!==undefined)this._selLineAll.color=arguments[1];
    this.clear();
    this.paint();
}
DataGrid.prototype.delCanvasCol = function() {
    
	var startCol = this._sel_startCol,endCol = this._sel_endCol , nums = endCol - startCol +1;
	this._colsNum = Number(this._colsNum) - nums;
    if (this._cols.length !== 0) {
		this._cols.splice(startCol,nums);
    }
	
	for(var i=0;i < this._cells.length;i++)
	{
		this._cells[i].splice(startCol,nums);
	}
	this._focusCol-=1;
	this._sel_startCol-=1;
	this._sel_endCol -=1;
    this.clear();
    this.paint();
}
DataGrid.prototype.delCanvasRow = function() {
	var startRow = this._sel_startRow,endRow = this._sel_endRow , nums = endRow - startRow +1;
    this._rowsNum = Number(this._rowsNum) - nums;
    if (this._rows.length !== 0) {
        this._rows.splice(startRow,nums);
    }
	this._cells.splice(startRow,nums);
	this._focusRow-=1;
	this._sel_endRow=this._sel_startRow=this._sel_endRow-1;
    this.clear();
    this.paint();
}
DataGrid.prototype.insertColBefore = function() //在此列前方插入
{	
	var colMoveMount=this._sel_endCol-this._sel_startCol+1;//获得添加的列的数量
    this._colsNum = Number(this._colsNum) + colMoveMount;
	if(this.IscombineCell(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol)){
		colMoveMount = 1;	
	}
    if (this._cols.length == 0) {
        this._cols.length = 1;
    } else {
        this._cols.length = this._cols.length + colMoveMount;
    }
	for(var i=this._cols.length - 1;i >= this._cols.length-colMoveMount;i--){
		
		this._cols[i] = {};

	}
    var j = column_statr=this._sel_startCol;
	
	var column= this._sel_endCol;
	
	var row=this._sel_startRow;
	var cell='',combineCellStartCoor={};
	
	for (var i = 0; i < this._rows.length; i++) {
        for (var k = this._cols.length - 1; k >= j; k--) {
			
            if (k-j<colMoveMount) {
                this._cells[i][k] = {};
            }else{
				this._cells[i][k] = Object.extend({},this._cells[i][k - colMoveMount]);
				if(this._cells[i][k].cols<0){
					
					this._cells[i][k].cols=this._cells[i][k].cols-colMoveMount;
				}
			}
        }
    }
	this._focusCol=this._sel_endCol=this._sel_startCol=column_statr;//校准合并单元格的起始单元格
   	this._focusRow=this._sel_startRow=this._sel_endRow=row;
	this.clear();
    this.paint();
	
}
DataGrid.prototype.insertFormatCol = function(firstcol,colMoveMount,startcol,endcol) {//插入格式化列
    var startcol=Number(startcol),endcol=Number(endcol);
	var colMoveMount=parseInt(colMoveMount,10);
    this._colsNum = Number(this._colsNum) + colMoveMount;
    if (this._cols.length == 0) {
        this._cols.length = 1;
    } else {
        this._cols.length = this._cols.length + colMoveMount;
    }
	
	for(var i=this._cols.length - 1;i >= this._cols.length-colMoveMount;i--){
		
		this._cols[i] = {};

	}
   
    var j = firstcol-1;
   
    for (i = 0; i < this._rows.length; i++) {
        for (var k = this._cols.length - 1; k > j; k--) {
			
			if(k-j<=colMoveMount) {
				if(endcol-startcol+1>=colMoveMount){
					for(var fr=startcol+colMoveMount-2;fr>=startcol-1;fr--){
						if(k-j===fr-startcol+2){
							this._cells[i][k] = Object.extend({},this._cells[i][fr]);
						}
					}
				}else{
					var tempcol=(k-j)%(endcol-startcol+1)===0?(k-j):(k-j)%(endcol-startcol+1);
					tempcol-=1;
					this._cells[i][k] = Object.extend({},this._cells[i][tempcol]);
				}
            }else{
				this._cells[i][k] = Object.extend({},this._cells[i][k - colMoveMount]);
			}
        }
    }
	
    this.clear();
    this.paint();
}

DataGrid.prototype.insertColAfter = function() {//在此列后方插入
	
	var colMoveMount=this._sel_endCol-this._sel_startCol+1;//获得添加的列的数量
	if(this.IscombineCell(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol)){
		colMoveMount = 1;	
	}
	this._colsNum = Number(this._colsNum) + colMoveMount;
    if (this._cols.length == 0) {
        this._cols.length = 1;
    } else {
        this._cols.length = this._cols.length + colMoveMount;
    }
    
	for(var i=this._cols.length - 1;i >= this._cols.length-colMoveMount;i--){
		
		this._cols[i] = {};

	}
    //this._cols.push({});
    var j = this._sel_endCol || this._focusCol;
    for (i = 0; i < this._rows.length; i++) {
        for (var k = this._cols.length - 1; k > j; k--) {
            if (k-j<colMoveMount+1) {
                this._cells[i][k] = {};
            }else{
            	this._cells[i][k] = Object.extend({},this._cells[i][k - colMoveMount]);
			}
        }
    }
	
    this.clear();
    this.paint();
}
DataGrid.prototype.insertRowAfter = function() {//在此行下方插入行
	var rowMoveMount=this._sel_endRow-this._sel_startRow+1;//获得添加的列的数量
    this._rowsNum = Number(this._rowsNum) + rowMoveMount;
	if(this.IscombineCell(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol)){
		rowMoveMount = 1;	
	}
 if (this._rows.length == 0) {
        this._rows.length = 1;
    } else {
        this._rows.length = this._rows.length + rowMoveMount;
    }

	for(var i=this._rows.length - 1;i >= this._rows.length-rowMoveMount;i--){
	
		this._rows[i] = {};
		this._cells[i] = new Array();

	}
    //this._cols.push({});
    var j = this._sel_endRow || this._focusRow;

   
	
	var column= this._sel_endCol;
	var row=this._sel_endRow;
   
    for (i = 0; i < this._cols.length; i++) {
        for (var k = this._rows.length - 1; k > j; k--) {
			
			if(k-j<=rowMoveMount) {
                this._cells[k][i] = {};
            }else{
				this._cells[k][i] = Object.extend({},this._cells[k - rowMoveMount][i]);
			}
        }
    }
	
    this.clear();
    this.paint();
}
DataGrid.prototype.insertFormatRow = function(firstrow,rowMoveMount,startrow,endrow) {//插入格式化行
    var startrow=Number(startrow),endrow=Number(endrow);
	var rowMoveMount=parseInt(rowMoveMount,10);
    this._rowsNum = Number(this._rowsNum) + rowMoveMount;
    if (this._rows.length == 0) {
        this._rows.length = 1;
    } else {
        this._rows.length = this._rows.length + rowMoveMount;
    }
	
	for(var i=this._rows.length - 1;i >= this._rows.length-rowMoveMount;i--){
	
		this._rows[i] = {};
		this._cells[i] = new Array();

	}

    //this._cols.push({});
    var j = firstrow-1;
   
    for (i = 0; i < this._cols.length; i++) {
        for (var k = this._rows.length - 1; k > j; k--) {
			
			if(k-j<=rowMoveMount) {
				if(endrow-startrow+1>=rowMoveMount){
					for(var fr=startrow+rowMoveMount-2;fr>=startrow-1;fr--){
						if(k-j===fr-startrow+2){
							this._cells[k][i] = Object.extend({},this._cells[fr][i]);
						}
					}
				}else{
					

					var temprow=(k-j)%(endrow-startrow+1)===0?(k-j):(k-j)%(endrow-startrow+1);
					temprow-=1;
							this._cells[k][i] = Object.extend({},this._cells[temprow][i]);
				}
            }else{
				this._cells[k][i] = Object.extend({},this._cells[k - rowMoveMount][i]);
			}
        }
    }
	
    this.clear();
    this.paint();
}
DataGrid.prototype.copyFormatRow = function(copysrow,copyerow,startrow,endrow) {//拷贝格式化行
	var startrow=Number(startrow),copysrow=Number(copysrow);
    if(endrow-startrow !== copyerow-copysrow){
		alert('拷贝行数和要拷贝行数不一致！');
		return false;	
	}
	for (i = 0; i < this._cols.length; i++) {

		for(var fr=copyerow-1;fr>=copysrow-1;fr--){
			this._cells[startrow+fr-copysrow][i] = Object.extend({},this._cells[fr][i]);
		}
	}
    this.clear();
    this.paint();
}

DataGrid.prototype.insertRowBefore = function() {//在此行上方插入行
	var rowMoveMount=this._sel_endRow-this._sel_startRow+1;//获得添加的列的数量
    this._rowsNum = Number(this._rowsNum) + rowMoveMount;
	if(this.IscombineCell(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol)){
		rowMoveMount = 1;	
	}
	if (this._rows.length == 0) {
        this._rows.length = 1;
    } else {
        this._rows.length = this._rows.length + rowMoveMount;
    }
	for(var i=this._rows.length - 1;i >= this._rows.length-rowMoveMount;i--){
	
		this._rows[i] = {};
		this._cells[i] = new Array();

	}
	
	var column= this._sel_startCol;
   
    var j = column_statr=this._sel_startRow;

    for (i = 0; i < this._cols.length; i++) {
        for (var k = this._rows.length - 1; k >= j; k--) {

            if (k-j<rowMoveMount) {
                this._cells[k][i] = {};
            }else{
            	this._cells[k][i] = Object.extend({},this._cells[k - rowMoveMount][i]);
				if(this._cells[k][i].rows<0){
					this._cells[k][i].rows=this._cells[k][i].rows-rowMoveMount;
				}
			}
		}
    }
	this._focusCol=this._sel_endCol=this._sel_startCol=column;//校准合并单元格的起始单元格
   	this._focusRow=this._sel_startRow=this._sel_endRow=column_statr;
   
    this.clear();
    this.paint();
}
DataGrid.prototype.insertCellBefore = function() //活动单元下移
{	
   	var rowMoveMount=rowAddNums=this._sel_endRow-this._sel_startRow+1;//获得添加的列的数量
	var add_new_row=false;
    var j = this._sel_startRow;
    var jend = this._sel_endRow;
	

    var istart =istart_old= this._sel_startCol;
	var iend=this._sel_endCol , rstart = this._sel_startRow , rend = this._sel_endRow , cell;
	
	if(this.IscombineCell(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol)){
		rowMoveMount = 1;	
	}
	for(var ll=istart;ll<=iend;ll++)//判断要追加的行数
	{
		for (var k = this._rows.length - 1; k >this._rows.length - 1-rowMoveMount; k--) {
			if(!T.isEmptyObject(this._cells[k][ll])){//判断对象是否为空
				add_new_row=true;
				rowAddNums=rowAddNums-(this._rows.length-k)+1;
				break;		
			}	
		}
	}
	
	if(add_new_row){ //为true就插入   
		this._rowsNum = Number(this._rowsNum) + 1;
		if (this._rows.length == 0) {
			this._rows.length = 1;
		} else {
			this._rows.length = this._rows.length + rowAddNums;
		}

		for(var q=this._rows.length - 1;q >= this._rows.length-rowAddNums;q--){
		
			this._rows[q] = {};
			this._cells[q] = new Array();
			for(var l=0;l<this._cols.length;l++){
				this._cells[q][l]={};	
			}
	
		}
	} 
	var imun=0;
	for(var i=istart;i<=iend;i++)//替代的列数
	{	
	  for (var k = this._rows.length - 1; k >=j; k--) {//替代的行数
			  if(k-j<rowMoveMount){
				  this._cells[k][i]={};	
			  }else{
				  	if(this._cells[k - rowMoveMount][i].rows!=undefined&&(k - rowMoveMount)>jend){
						  var startxspan=this._cells[k - rowMoveMount][i].rows>0?k - rowMoveMount:this._cells[k - rowMoveMount][i].rows*-1;
						  var startyspan=this._cells[k - rowMoveMount][i].cols>0?i:this._cells[k - rowMoveMount][i].cols*-1;
						 
						  var xspan=this._cells[startxspan][startyspan].rows;
						  var yspan=this._cells[startxspan][startyspan].cols;
						  if(startyspan<istart||(startyspan+yspan-1)>iend){
						   for (var initc = startyspan; initc < startyspan + yspan; initc++) { //合并单元格的时候集体下移
							  for (var initr = startxspan; initr <= startxspan+xspan; initr++) {
								 this._cells[initr][initc].rows=null;
								 this._cells[initr][initc].cols=null;
							 }
							}
						  }
					}
					  this._cells[k][i] = Object.extend({},this._cells[k - rowMoveMount][i]);
	
					  if(this._cells[k][i].rows<0){
						  this._cells[k][i].rows=this._cells[k][i].rows-rowMoveMount;	
					  }
				  }
		  }
	}
    this.clear();
    this.paint();
}
DataGrid.prototype.insertCellAfter = function() //活动单元右移
{	
   	var colMoveMount=this._sel_endCol-this._sel_startCol+1;//获得添加的列的数量

    
    var j = this._sel_startCol;
    var jend = this._sel_endCol;
   
    var istart =istart_old= this._sel_startRow;
	var iend=this._sel_endRow;
	
	if(this.IscombineCell(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol)){
		colMoveMount = 1;	
	}
	
	this._colsNum = Number(this._colsNum) + colMoveMount;
	if (this._cols.length == 0) {
		this._cols.length = 1;
	} else {
		this._cols.length = this._cols.length + colMoveMount;
	}

	for(var i=this._cols.length - 1;i >= this._cols.length-colMoveMount;i--){
		
		this._cols[i] = {};
		for(var kl=0;kl<=this._rows.length - 1;kl++){
			this._cells[kl][i]={};	
		}

	}

    for (var k=istart;k<=iend;k++) {//行区间
        for (var i = this._cols.length - 1; i >= j; i--) {
            if (i-j<colMoveMount) {
                this._cells[k][i] = {};
            }else{
				  	if(this._cells[k][i - colMoveMount].rows!=undefined&&(i - colMoveMount)>jend){
						  var startxspan=this._cells[k][i- colMoveMount].rows>0?k - colMoveMount:this._cells[k][i- colMoveMount].rows*-1;
						  var startyspan=this._cells[k][i- colMoveMount].cols>0?i:this._cells[k][i- colMoveMount].cols*-1;
						 
						  var xspan=this._cells[startxspan][startyspan].rows;
						  var yspan=this._cells[startxspan][startyspan].cols;
						  if(!(startxspan>=istart&&(startxspan+xspan-1)<=iend)){
						   for (var initc = startyspan; initc < startyspan + yspan; initc++) { //合并单元格的时候集体下移
							  for (var initr = startxspan; initr <= startxspan+xspan; initr++) {
								 this._cells[initr][initc].rows=null;
								 this._cells[initr][initc].cols=null;
								  }
							}
						  }
					}
					 this._cells[k][i] = Object.extend({},this._cells[k][i - colMoveMount]);
					  if(this._cells[k][i].cols<0){
						  this._cells[k][i].cols=this._cells[k][i].cols-colMoveMount;	
					  }
			}
        }
    }
    this.clear();
    this.paint();
}
DataGrid.prototype.saveCanvasToLocal = function() {
    var localStorageName = 'canvas_LocalData';
    if (typeof arguments[0] === 'string') {
        localStorageName = 'canvas_' + arguments[0];
    } else {
        localStorageName = this._localStorageName;
    }
	var clearObject=function(obj){
		var array=[];
		for(var i=0;i<obj.length;i++){
			if(!T.isEmptyObject(obj[i]))	array.push(obj[i]);
		}
		return array;
	};
	
    var canvasConfig = Object.extend({},this.config);
    var config = {
        localStorageName: localStorageName,
        textHeight: this._textHeight,
        rows: this._rows,//rowsobj,
        cols: this._cols,//colsobj,
        scrollRowNum: this._scrollRowNum,
        scrollColNum: this._scrollColNum,
        cells: this._cells,//cellsobj,
        netChartVisible: this._netChartVisible,
        Mousecursor: this._Mousecursor,
        Backimage: this._Backimage
    };
    Object.extend(canvasConfig, config);
	
    if(	typeof arguments[1] !== undefined &&arguments[1]==='export')//导出
	{
		exportXml(this);
		
		//submitData('exportCanvasXml.php',JSON.stringify(canvasConfig));
	}else{
		localStorage.setItem(localStorageName, JSON.stringify(canvasConfig));
	}

    this.clear();
    this.paint();
}
DataGrid.prototype.setCellControlsItem = function(config,rowindex,colindex) {//设置单元控件类型
	var i,j,cell;
	var gettime=function(time,type){
			
			switch(type)
			{
				case '1'	:
					return time.Y+'年'+time.M+"月"+time.D+"日";
				break;
				case '2':	
					return time.Y+'-'+time.M+"-"+time.D;
				break;
				case '3':
					return time.h+':'+time.zm+":"+time.s;	
				break;
				case '4':
					return time.Y+'-'+time.M+"-"+time.D+' '+time.h+':'+time.zm+":"+time.s;	
				break;
				case '5':
					return time.Y+'年'+time.M+"月"+time.ZD+"日";
				break;
				case '6':
					return time.Y+'-'+time.ZM+"-"+time.ZD;
				break;
			}
	}
	if(arguments[1]===undefined){
		for(i=this._sel_startRow;i<=this._sel_endRow;i++)
		{
			for(j=this._sel_startCol;j<=this._sel_endCol;j++)
			{
				cell=this._cells[i][j];
				this._cells[i][j].fl|=cell.fl|(1<<0);
				if(config.type==='radiobutton'){
					this._cells[i][j].fl=cell.fl|(1<<10);//fl 10单选框
					var startcoor = this.getCellLeftTopCoor(i,j);
					this._cells[i][j].cellcheck={ckd:false,noedit:config.noedit,x:startcoor.x,y:startcoor.y};
					
				}else if(config.type==='dropdownbox'){
					this._cells[i][j].fl=cell.fl|(1<<12);//fl 10单选框
					this._cells[i][j].clco = {tagval:config.tagval,childs:config.value};
				}else if(config.type==='time'){//日期时间类型
					this._cells[i][j].fl=cell.fl|(1<<13);//fl 13时间控件
					 if(!/^(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2}):(\d{2}))?$/.test(cell.t)){
						var now=new Date(); 
					}else{
						var now=new Date(cell.t);	
					}
					now=DateFormat.parseTime(now);
					this._cells[i][j].t=gettime(now,config.value);
					this._cells[i][j].cldt = {dwstyle:config.value, year:now.Y, mon:now.M,
					 day:now.D, hour:now.h,
					  min:now.m,sec:now.s};
				}else if(config.type==='url'){
					this._cells[i][j].fl=cell.fl|(1<<11);//fl 11超级链接
					this._cells[i][j].cellurl={"url":config.value,"newwin":config.newwin};	
				}else if(config.type === 'number'){
					this._cells[i][j].fl=cell.fl|(1<<9);//fl 9数字
				}else if(config.type === 'financialhead'){//设置财务表头
					this._cells[i][j].tag=cell.tag|(1<<0);//tag 0
				}else if(config.type==='financialmain'){//设置财务表览
					this._cells[i][j].fl=cell.fl|(1<<15);//fl 15	
				}
				
			}
		}
	}else{
		
		cell=this._cells[rowindex][colindex];
		this._cells[i][j].fl|=cell.fl|(1<<0);
		if(config.type==='radiobutton'){
			this._cells[rowindex][colindex].fl=cell.fl|(1<<10);//fl 10单选框
			this._cells[rowindex][colindex].cellcheck={ckd:false,noedit:config.noedit};
			var startcoor = this.getCellLeftTopCoor(rowindex,colindex);
			config.x=startcoor.x;
			config.y=startcoor.y;//+(height-12)/2-4;
		}else if(config.type==='dropdownbox'){
			this._cells[rowindex][colindex].fl=cell.fl|(1<<12);//fl 10单选框
			this._cells[rowindex][colindex].dropdownbox = {tagval:config.tagval,childs:config.value};
		}
	}
	this.clear();
	this.paint();

}
DataGrid.prototype.delCellControlsItem=function(){
	var rowindex,colindex;
	for(rowindex=this._sel_startRow;rowindex<=this._sel_endRow;rowindex++)
	{
		for(colindex=this._sel_startCol;colindex<=this._sel_endCol;colindex++)
		{
			var cell=this._cells[rowindex][colindex];
			if(cell.cellcheck !== undefined){
				delete 	this._cells[rowindex][colindex].cellcheck;
				this._cells[rowindex][colindex].fl&= ~(1 << 10); ;
			}
			if(cell.dropdownbox !== undefined){
				delete 	this._cells[rowindex][colindex].dropdownbox;
				this._cells[rowindex][colindex].fl&= ~(1 << 12); ;
			}
		
			if(cell.cldt !== undefined){
				delete this._cells[rowindex][colindex].cldt;
				this._cells[rowindex][colindex].fl&= ~(1 << 13);
				delete this._cells[i][j].t;
			}
			if(cell.cellurl !== undefined){
				delete 	this._cells[rowindex][colindex].cellurl;
				this._cells[rowindex][colindex].fl&= ~(1 << 11);
			}
			if((cell._fl >> 9) & 0x01) this._cells[rowindex][colindex].fl&= ~(1 << 9);
			
			if((cell._tag >> 0) & 0x01) this._cells[rowindex][colindex].tag&= ~(1 << 0);
			
			if((cell._fl >> 15) & 0x01) this._cells[rowindex][colindex].fl&= ~(1 << 15);
			
			if(cell.cellbutton !== undefined){
				delete 	this._cells[rowindex][colindex].cellurl;
				this._cells[rowindex][colindex].cellurl.tagval&= ~(1 << 1);
			}
		}
	}
}
DataGrid.prototype.paintCellControlsDropdownbox=function(value,x,y,width,focusRow,focusCol)
{
	 
	if(!document.getElementById("showbox")){
			var child=value.childs;
			if(child !== undefined){		
				var _this=this;
				var left = 224;
				var top=document.getElementById("canvas").offsetTop;
				var startcoor = this.getCellLeftTopCoor(this._sel_startRow,this._sel_startCol);
		
			var box = document.createElement("ul");
				box.className='select_abs';

				for(var i=0;i < child.length;i++)
				{	
					var livalue=child[i].key;
					var option=document.createElement('li');
					option['data-name']=child[i].value;
					option.innerHTML=child[i].key;
					option.onclick=function(_this,livalue){
						return function(){
							_this.setCellValue(focusRow,focusCol,livalue);	
							_this.clear();
							_this.paint();
							clearCeng("showbox");
							clearCeng("showbox_wenzi");		
						}
					}(_this,livalue);
					box.appendChild(option);	
				}
				
				box.style.textAlign = 'left';
				box.id = 'showbox';
				box.style.width=width +"px";
				box.style.position = 'absolute';
				box.style.left =left+x +4+ 'px';
				box.style.top =top+y +22+ 'px';
				document.body.appendChild(box);
				preventDefault(event);

			}
	}
}
DataGrid.prototype.paintCellControlsRadiobuttonHook=function(x,y)
{
	 var controlsConfig=this._cells[this._focusRow][this._focusCol].cellcheck;
	 if(controlsConfig!==undefined){
		 if(controlsConfig.ckd==='0'){
			this._cells[this._focusRow][this._focusCol].cellcheck.ckd='1';
		}else{
			this._cells[this._focusRow][this._focusCol].cellcheck.ckd='0';
		}
	  }
}
DataGrid.prototype.paintCellControlsItem=function(dc,cell,config,x,y,width,height)
{	
	if(cell._cellcheck!==undefined){
		 dc.save();
		 if(cell._cellcheck.ckd==='1')
		 {	
		 	 var config = cell._cellcheck;
		 	 var radioy=y+(height-12)/2;
			 dc.lineWidth=2;
			 dc.strokeStyle="#000000";
			 dc.beginPath();
			 dc.moveTo(config.x+1,radioy+4);
			 dc.lineTo(config.x+6,radioy+9);
			 dc.lineTo(config.x+11,radioy+1);
			 dc.stroke();
			 dc.closePath();
		 }
		 dc.restore();
	  }else if(config==='dropdownbox')
	  {	
		 dc.save();
		 dc.lineWidth=1;
		 dc.strokeStyle="#000000";
		 dc.strokeRect(x+width-22,y,20,20);
		 dc.fillStyle="#EFEBDE";
		 dc.fillRect(x+width-21,y+1,18,18);
		// 填充三角形
		 dc.beginPath();
		 dc.fillStyle="#000";
		 dc.moveTo(x+width-16,y+8);
		 dc.lineTo(x+width-12,y+13);
		 dc.lineTo(x+width-8,y+8);
		 dc.fill();
		 dc.closePath();	
		 dc.restore();
	  }else if(config==='url')
	  {	
	  	 
		 
		 //this._cells[this._focusRow][this._focusCol].fontColor='#4888eb';
		// cell.fontColor='#4888eb';
	 }else if(config ==='button'){
		dc.save();
		var button =cell._cellbutton,color=[];
		if(Number(button.seltype)===3 && button.imgid!==undefined){
			
			var temp =this._imglist[button.imgid-1];
			var image = new Image();
				image.src = temp.src;
				
				if(button.buttonimgype==='1'){
					dc.drawImage(image, x, y-height, 20, 20);
				}else if(button.buttonimgype==='2'){//下面
					
					dc.drawImage(image, x, y+height, 20, 20);
				
				}else if(button.buttonimgype==='3'){//左边
					dc.drawImage(image, x-20, y, 20, 20);
				}else if(button.buttonimgype==='4'){//右边
					dc.drawImage(image, x+width, y, 20, 20);
				}else if(button.buttonimgype==='5'){//中间
					var img={};
					img.size='imgsize';
					img.width=temp.width;
					img.height=temp.height;
					this.paintCellImage(dc, cell, x, y, width, height, img, image);
				}
	
		}
		if(button.buttonimgype!=='5'){
			switch (button.selstyle){
				case '1':
					color=['#fff','#B1D1E8','#C6EAFF','#AFD1EA'];
					break;
				case '2':
					color=['#64d9ff','#2daaff','#24b2fe','#0976ae'];
					break;
				case '3':
					color=['#FFA73D','#E97305','#E47309','#FF9B3D'];
					break;
				case '4':
					color=['#E0F1A1','#BFE142','#D7EC85','#BCD265'];//绿黄
					break;
				case '5':
					color=['#F79B6C','#F88245','#EA5505','#CC2B00'];
					break;
			}
			
			var myGradient = dc.createLinearGradient(x+3, y+3, x+3,y+height-6);
				myGradient.addColorStop(0, color[0]);//'#0698E3');
				myGradient.addColorStop(1, color[1]);//'#10AAEA');
			dc.fillStyle = myGradient;
			dc.fillRect(x+3,y+3,width-6,height-6);
			
			// 从白色到黑色的渐变，并指定给边框色
			var gradient = dc.createLinearGradient(x+2, y+2, x+2, y+height-4);
			gradient.addColorStop(0, color[2]);
			gradient.addColorStop(1, color[3]);
			dc.lineWidth=2;
			dc.strokeStyle = gradient;
			dc.strokeRect(x+2, y+2, width-4, height-4);
		}
			dc.restore();	
		if(button.seltype === '3'){
			var ftlist= this._ftlist;
			var textfontsize= cell.getFontSize(ftlist);
			var textlength = dc.measureText('上传图片').width;
			var textx = x + (width - textlength) / 2;
			dc.fillText( '上传图片', textx, y + (height + textfontsize)/2);
		}

	 }else if(config==='financialhead')//设置财务表头
	 {
		var fontSize=cell.getFontSize(this._ftlist);
		dc.fillStyle = cell.getBackColor(this._brlist) || '#fff';
		dc.fillRect(x + 1, y + 1, width - 2, height - 2);
		var financial='亿|千|百|十|万|千|百|十|元|角|分';
		var textss = financial.split("|");
		var textx=x+width,texty= y + (height +fontSize) / 2;;
		
		dc.save();		
		
		/*遮罩区域*/
		dc.beginPath();
		dc.strokeStyle = "transparent";
		dc.rect(x,y,width,height);
		dc.clip();
		dc.stroke(); 
		dc.closePath();
		/*遮罩区域*/	
		dc.font="14px sans-serif";
		dc.fillStyle='#000';
		dc.strokeStyle='#000080';
		for (var i = 0; i < textss.length; i++) {
			var text = textss[textss.length-1-i];		
			var textwidth=20.90;//dc.measureText(text).width;

			dc.fillText(text,textx-textwidth*(i+1)+3.5, texty);
			
			
			if(i===2){
				dc.strokeStyle='#FF0000';
			}else{
			dc.strokeStyle='#000080';
			}
			if(i===5||i===8||i===2){dc.lineWidth=2;
			}else{dc.lineWidth=1;}
			
			if(width-textwidth*i>0&&i>0)
			{
				dc.beginPath();
				dc.moveTo(x+width-textwidth*i, y);
				dc.lineTo(x +width-textwidth*i, y + height);
				dc.stroke();
				dc.closePath();
			}
			
		}
		dc.restore();
	}else if(config==='financialmain')//设置财务表览
	 {	var textss='';
		 var fontSize=cell.getFontSize(this._ftlist);
		//dc.fillStyle = cell._backColor;
		//dc.fillRect(x + 1, y + 1, width - 2, height - 2);
		var textss=cell._t;
		if(cell._t === undefined){textss='';}
		if(cell._t === '@公式'){textss='000';}
		
		textss = String(textss);
		
		
		if(textss.indexOf('.')!==-1){
			var pos=textss.indexOf('.');
			var str=textss.substring(pos);
			if(pos===0)textss='0'+textss;
			if(str.length<3){
				textss=textss+T.string.repeat("0",3-str.length);
			}else if(str.length>3)
			{	
				textss=textss.substring(0,pos+3);
				
			}
			
			textss=textss.replace(".",'');	
		}else if(textss!=='' &&textss!=='000' ){
			textss=textss+T.string.repeat("0",2);	
		}else if(textss===''){
			textss=T.string.repeat("0",3);	
		}
		
		if(cell._note !== 'none' && cell._t==='')textss='';
		
		var textx=x+width,texty= y + (height + fontSize) / 2;;
		
		dc.save();

		/*遮罩区域*/
		dc.beginPath();
		dc.strokeStyle = "transparent";
		dc.rect(x,y,width,height);
		dc.clip();
		dc.stroke(); 
		dc.closePath();
		/*遮罩区域*/	
		dc.fillStyle='#000';
		dc.strokeStyle='#000080';
		var length=textss.length;
		if(length<11)length=11;
		
		var textwidth=20.90;//14;
		for (var i = 0; i < length; i++) {
			
			if(textss!==undefined&&textss!==''){
				var text = textss[textss.length-1-i];
				if(text!==undefined)	{	
				dc.fillText(text,textx-textwidth*(i+1)+3.5, texty);
				}
			}
			
			if(i===2){
				dc.strokeStyle='#FF0000';
			}else{dc.strokeStyle='#000080';}
			if(i===5||i===8||i===2){dc.lineWidth=2;}else{dc.lineWidth=1;}
			
			if(width-i*textwidth>0&&i>0)
			{
				dc.beginPath();
				dc.moveTo(x+width-textwidth*i, y);
				dc.lineTo(x +width-textwidth*i, y + height);
				dc.stroke();
				dc.closePath();
			}
			
		}
		dc.restore();
	}
}
DataGrid.prototype.paintCell3Dshape=function(dc,cell,x,y,width,height)
{	
	dc.save();
	var myGradient = dc.createLinearGradient(x+3, y+3, x+3,y+height-6);
		myGradient.addColorStop(0, '#64d9ff');//'#0698E3');
		myGradient.addColorStop(1, '#2daaff');//'#10AAEA');
	dc.fillStyle = myGradient;
	dc.fillRect(x+3,y+3,width-6,height-6);
	
	// 从白色到黑色的渐变，并指定给边框色
    var gradient = dc.createLinearGradient(x+2, y+2, x+2, y+height-4);
    gradient.addColorStop(0, '#24b2fe');
    gradient.addColorStop(1, '#0976ae');
	dc.lineWidth=2;
    dc.strokeStyle = gradient;
    dc.strokeRect(x+2, y+2, width-4, height-4);
	dc.restore();	
		
}
DataGrid.prototype.paintGradientColor=function(dc,cell,x,y,width,height)
{	
	dc.save();
	var startcolor=T.color.getcolorFromByte(cell._bkmidcr);
	var endcolor=T.color.getcolorFromByte(cell._bkendcr);
	
	var myGradient = dc.createLinearGradient(x+1, y+1, x+1,y+height-1);
		myGradient.addColorStop(0, startcolor);//'#0698E3');
		myGradient.addColorStop(1, endcolor);//'#10AAEA');
	dc.fillStyle = myGradient;
	dc.fillRect(x+1,y+1,width-2,height-2);
	
	dc.restore();	
		
}


DataGrid.prototype.savecellCustomScript=function(value)
{
	 
	this._cells[this._focusRow][this._focusCol].note=value;
	this.clear();
	this.paint();
}
DataGrid.prototype.setSelCellTag=function(value)
{
	var i,j; 
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			if(value.cellnumber!==undefined){
				this._cells[i][j].flex|= 1 << 4; // 设置第x位为1
				
				this._cells[i][j].lscript="<d><col>"+value.pianyil+"</col><row>"
				+value.pianyih+"</row><type>"+value.type+"</type><rule>"
				+value.rule+"</rule><sf>"+value.format+"</sf></d>";
					
			}else{
				this._cells[i][j].cellTag = value;
			}
		}
	}
	this.clear();
	this.paint();

}
DataGrid.prototype.setCellTag=function(rowindex,colindex,value)
{
	this._cells[rowindex][colindex].cellTag = value;
	this.clear();
	this.paint();

}

DataGrid.prototype.saveStatisticscript=function(value)
{
	 
	this._StatisticScript=value;
	this.clear();
	this.paint();
}
DataGrid.prototype.selFocusCellValue=function(value)
{
	this._cells[this._focusRow][this._focusCol].t=value;
	this.clear();
	this.paint();
}
DataGrid.prototype.importxml=function(file){
	
	var box = T.html.loading(800,540,228,48,document.getElementById("mainleft"));
	
	clearCeng('htmlcell');
	clearCeng('showbox');
	clearCeng('drawobjs');
	clearCeng('drawobj','class');
	_gl_canvas.style.display='block';
	delete this._rows;
	delete this._cols;
	this._sel_startRow=this._sel_startCol=this._sel_endRow=this._sel_endCol=this._focusRow=this._focusCol=0;

	var ss=/(html\/)?upload\/((.+)(\.xjc)?(\.js)?)/g.test(file);
	var filename = RegExp.$2;
	
	if(filename.indexOf('.xjc')===-1)filename+='.xjc';
	var _this =this;
	var mainport=function(getjson){
			var _this =this;
			var json=eval('(' + getjson + ')');
			this.openJson(json);
			this.clear();
			this.paint();
			this._parent._comItems[1].paint();
			this._parent._comItems[2].paint();			
			if(this._designmode!==undefined){
				try{
					var _drawobj = new drawObjs(this,this._chartattribute);
				}catch(e){
					alert(e);
				}
			}
	}
		
	if (localStorage.getItem(filename) && localStorage.getItem(filename)!=='undefined') {
		getjson = localStorage.getItem(filename);
		T.glproxy(mainport,this)(getjson);
		clearCeng(box);
	}else{
		var getjson = T.ajax.ajaxGet("html/lib/process_upload.php?type=getjson&filename="+encodeURIComponent(filename),false,true,

			function(getjson){
				mainport.call(_this,getjson);
				localStorage.setItem(filename, getjson);
				clearCeng(box);
			}
		);
		
	}
	_gl_filename = filename;

}
DataGrid.prototype.reDrawChart=function(){
	var left = 224;
	var top=document.getElementById("cvs").offsetTop;
	var box = document.createElement("div");
	
	box.className='loading';
	box.style.width="800px";
	box.style.height="548px";
	box.style.zIndex="100";
	box.style.position = 'absolute';
	box.style.left =left+ 'px';
    box.style.top =top+'px';
	document.body.insertBefore(box, document.getElementById("mainleft"));
	var mainimport = function(){
			
				if(this._designmode!==undefined){
					var _drawobj = new drawObjs(this,this._chartattribute);
				}

		
		clearCeng(box);
	};

	setTimeout(
		T.glproxy(mainimport,this)
	,0);
}
DataGrid.prototype.setCellRule=function(rule,x,y){
		var cellrule=rule;
		var pos=this.getRowColByCoor(x,y);
		//<d><col>0</col><row>3</row><type>2</type><sf>@row</sf></d> 
		
		
		var xmldom = null;
		
        try {
            xmldom = T.xml.parseXml(cellrule);
        } catch(ex) {
            alert(ex.message);
        }
		
		var pianyih = T.xml.gXmlPrototype(xmldom,"row");
		var pianyil = T.xml.gXmlPrototype(xmldom,"col");
		var celltype = T.xml.gXmlPrototype(xmldom,"type");
		var format  =  T.xml.gXmlPrototype(xmldom,"sf");
		if(typeof(celltype) != "number") celltype=parseInt(celltype,10);
		
		var getPrototype=function(type){
			var tempvalue='';
			if(type==='row'){
				tempvalue=pos.row+2-pianyih;
			}else if(type==='col'){
				tempvalue=pos.col+2-pianyil;
			}
			if(celltype===2){//一，二，三...
				
				tempvalue=this.Chinese_num(tempvalue,'xx');
			
			}else if(celltype===3){//a,b,c...
				tempvalue=this.numTochart(tempvalue,'xx');
			
			}else if(celltype===4){//A,B,C...
				tempvalue=this.numTochart(tempvalue,'dx');
			
			}else if(celltype===5){//小写单元名称
				
				tempvalue=this.numTochart(pos.col+2-pianyil,'xx')+tempvalue;
			
			}else if(celltype===6){//大写单元名称
				
				tempvalue=this.numTochart(pos.col+2-pianyil,'dx')+tempvalue;
			}
			return tempvalue;	
		}
		//type===1 1,2,3...
		
		if(format.indexOf("@row")!==-1){
			format=format.replace(/@row/g,getPrototype.call(this,"row"));
		}
		if(format.indexOf("@col")!==-1){
			format=format.replace(/@col/g,getPrototype.call(this,"col"));
		}
		
		return format;
}