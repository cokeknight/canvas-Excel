DataGrid.prototype.getSelStartRow = function() {
    return this._sel_startRow;
}

DataGrid.prototype.getSelStartCol = function() {
    return this._sel_startCol;
}
DataGrid.prototype.paintCellContent = function(dc, cell, x, y, width, height) {
	
    var backFillStyle = cell.getBackColor(this._brlist);;
	if (backFillStyle !== undefined) {
        	dc.fillStyle = backFillStyle;//cell._backColor;
        	//dc.fillRect(x + 1, y + 1, width - 2, height - 2);
    		dc.fillRect(x, y, width, height);
	}
	
	if((cell._flex >> 6) & 0x01){//flex 6 单元是否为特色背景色
		this.paintGradientColor(dc, cell, x, y, width, height);
	}
	if((cell._tag>>5)&0x01){//3Dbox
		this.paintCell3Dshape(dc, cell, x, y, width, height);
	}
	if (cell._cellImage !== 'none' && cell._cellImage.filename !== undefined) {
       		 var _this = this;
        
			var img={};
			var temp =cell._cellImage;
			temp.imagetype = Number(temp.imagetype);
			var imagetypearr =["image/bmp","image/jpeg","image/gif","image/png"];
			img.filename='data:'+imagetypearr[temp.imagetype-1]+';base64,'+temp.filename;
			img.type="cell";
			if((cell._tag >> 4) & 0x01){
				
				img.size="origin";	
			}else if((cell._tag >> 15) & 0x01){
				img.size="imgsize";		
			}else if((cell._tag >> 3) & 0x01){
				img.size="cell";		
			}
			if(cell._imgangle!== undefined){
				img.turn={};
				if((cell._tag >> 16) & 0x01){
					img.turn.direction=	'right';
				}else{
					img.turn.direction=	'left';	
				}
				img.turn.angle = parseInt(cell._imgangle,10);
			}
			img.width =temp.width;
			img.height = temp.height;
			var image = new Image();
			image.src = img.filename;
			//image.onload = function() {
				
				_this.paintCellImage(dc, cell, x, y, width, height, img, image);
				if ((!(cell._fl >> 15 & 0x01) &&!(cell._tag >> 0 & 0x01)) || cell._note!=='none') {
					if(cell._slty ===	undefined){
						 _this.paintCellText(dc, cell, x, y, width, height);
					}
				}
			//}
		
        this.paintCellBorder(dc, cell, x, y, width, height);

    } else {
		
        if ((!(cell._fl >> 15 & 0x01) &&!(cell._tag >> 0 & 0x01)) || cell._note!=='none') {
			if(cell._slty ===	undefined|| Number(cell._slty)===0 ){
				   this.paintCellText(dc, cell, x, y, width, height);
			  }
		}
		
		
	    this.paintCellBorder(dc, cell, x, y, width, height);
    }
    if ((cell._fl >> 12) & 0x01) {//下拉框
       
        this.paintCellControlsItem(dc, cell, "dropdownbox", x, y, width, height);
    }
	
    if ((cell._fl >> 10) & 0x01) {//单选框
        
        this.paintCellControlsItem(dc, cell, "radiobutton", x, y, width, height);
    }
			
    if (cell._cellurl !==undefined) {//按钮
        if((cell._cellurl.tagval >> 1) & 0x01){
			//this.paintCellControlsItem(dc, cell, "button", x, y, width, height);
		}
    }
	if ((cell._fl >> 15) & 0x01) {//财务表览
        
        this.paintCellControlsItem(dc, cell, "financialmain", x, y, width, height);
    }   
	if ((cell._tag >> 0) & 0x01) {//财务表头
       
        this.paintCellControlsItem(dc, cell, "financialhead", x, y, width, height);
    }   
	
	if (cell.getBorderLine() != "none") {
        var borderLines = cell.getBorderLine();
        //this.paintBorderLine(dc,borderLines,x,y,width,height,cell);
    }

    if (cell._slty !=undefined) {
        this.paintCellSlantline(dc, cell, x, y, width, height);
    }
	if((this._designmode===undefined && cell._note!=='none')||cell._tip!=='none'){
		this.paintNoteTag(dc, cell, x, y, width, height);
			
	}
}

DataGrid.prototype.paintCellBorder = function(dc, cell, x, y, width, height) {
	var fl=cell._fl;
    var paintdash = function(x, y, x2, y2, style, width, color) {
        if (style === '2') { //点线

            T.canvas.drawDashes(x, y, x2, y2, '1 2 0 2', width, 'dotted', color);

        } else if (style === '1') { //虚线

            T.canvas.drawDashes(x, y, x2, y2, '10 5 0 10', width, 'dashed', color);

        } else if (style === '3') { //点划线

            T.canvas.drawDashes(x, y, x2, y2, '10 4', width, 'butt', color);

        } else if (style === '4') { //点点划线
			
            T.canvas.drawDashes(x, y, x2, y2, '10 4', width, 'bbut', color);
        }
    };

    if ((fl >> 5) & 0x01) {//cell._borderTopWidth > 0
		
		var borderTopColor=T.color.getcolorFromByte(String(this._penlist[cell._tpenid].color));
		var borderTopWidth=this._penlist[cell._tpenid].widx;
		var borderTopStyle=this._penlist[cell._tpenid].style;
		
        dc.strokeStyle =borderTopColor; //cell._borderTopColor;
        dc.lineWidth = borderTopWidth;
        if (borderTopStyle === '0') {
            dc.beginPath();
            dc.moveTo(x, y);
            dc.lineTo(x + width, y);
            dc.stroke();
			dc.closePath();
        } else {
            paintdash(x, y, x + width, y, borderTopStyle, borderTopWidth, borderTopStyle);
        }
    }

    if ((fl >> 6) & 0x01) {//cell._borderRightWidth > 0 && cell._rightNetLine
		var borderRightColor=T.color.getcolorFromByte(String(this._penlist[cell._rpenid].color));
		var borderRightWidth=this._penlist[cell._rpenid].widx;
		var borderRightStyle=this._penlist[cell._rpenid].style;
        
		dc.strokeStyle = borderRightColor;
        dc.lineWidth =		borderRightWidth;
        if (borderRightStyle === '0') {
            dc.beginPath();
            dc.moveTo(x + width, y);
            dc.lineTo(x + width, y + height);
            dc.stroke();
			dc.closePath();
        } else {
            paintdash(x + width, y, x + width, y + height, borderRightStyle, borderRightWidth, borderRightColor);
        }
    }

    if ((fl >> 7) & 0x01) {//cell._borderBottomWidth > 0
	
		var borderBottomColor=T.color.getcolorFromByte(String(this._penlist[cell._bpenid].color));
		var borderBottomWidth=this._penlist[cell._bpenid].widx;
		var borderBottomStyle=this._penlist[cell._bpenid].style;

	    dc.strokeStyle = borderBottomColor;
        dc.lineWidth = borderBottomWidth;
        if (borderBottomStyle === '0') {
            dc.beginPath();
            dc.moveTo(x, y + height);
            dc.lineTo(x + width, y + height);
            dc.stroke();
			dc.closePath();
        } else {
            paintdash(x, y + height, x + width, y + height, borderBottomStyle, borderBottomWidth, borderBottomColor);
        }
    }

    if ((fl >> 4) & 0x01) {//cell._borderLeftWidth > 0 && cell._leftNetLine
	
		var borderLeftColor=T.color.getcolorFromByte(String(this._penlist[cell._lpenid].color));
		var borderLeftWidth=this._penlist[cell._lpenid].widx;
		var borderLeftStyle=this._penlist[cell._lpenid].style;

		dc.strokeStyle = borderLeftColor;
        dc.lineWidth = 	borderLeftWidth;
        if (borderLeftStyle === '0') {
            dc.beginPath();
            dc.moveTo(x, y);
            dc.lineTo(x, y + height);
            dc.stroke();
			dc.closePath();
	        } else {
            paintdash(x, y, x, y + height, borderLeftStyle, borderLeftWidth, borderLeftColor);
        }
    }
}
DataGrid.prototype.getdcfont = function(font) {
    if (font === undefined) {
        return "12px 宋体";
    } else {
        font = this._ftlist[font];
        if (font !== undefined) {
            var fontstr = "";
            if (font.ita !== undefined) {
                fontstr += "italic ";
            }
            if (font.wei !== undefined) {
                fontstr += "bold ";
            }

            if (font.hei !== undefined) {
                fontstr += -parseInt(font.hei, 10) + "px ";
            } else {
                fontstr += "12px ";
            }
            if (font.fname !== undefined) {
                fontstr += font.fname + " ";
            } else {
                fontstr += "宋体 ";
            }

            return fontstr;

        } else {
            return "12px 宋体";
        }
    }
}
DataGrid.prototype.paintCellText = function(dc, cell, x, y, width, height) {
	var ftlist= this._ftlist;
	var cellvalue=cell.getValue(),

		textFormat=cell.getTextFormat(this._swty),
		
		textfont=this.getdcfont(cell.getFtid()),
		
		textAlign=cell._hag || this._hag,
		
		textverAlign=cell._vag || this._vag,
		
		textfontsize= cell.getFontSize(ftlist);
		
		horMargin = cell._lspan || 5,//内左边距
		
		verMargin = cell._tspan || 3
		;
	var i, textx, texty, text, textlength, fontstr = "",oldvalue=cell._t,
    drawtextlist = new Array,
    config = '',textFormat;
	var textwidth;
		
	if(cellvalue===undefined){
		cellvalue='';//return;
	}
	if((cell._flex>>5)& 0x01){//html单元
		this.showhtmlCell(x, y,cell._t);
		return;	
	}
    var is_radiobutton = false,is_dropdownbox=false;
  
	if ((cell._fl >> 10) & 0x01) {//单选框
		
		is_radiobutton = true;
		config = cell._cellcheck;
	}else if((cell._fl >> 12) & 0x01){//下拉框
		is_dropdownbox = true;
		config = cell._clco;
	}
	
	if(is_dropdownbox === true) {
		var oldtext=drawtextlist[i];
		var tmplen=Math.floor((width-30)/dc.measureText(cellvalue).width*cellvalue.length);
		cellvalue=cellvalue.substring(0,tmplen)+'\n'+cellvalue.substring(tmplen,cellvalue.length);
		
	}
	
    dc.font = textfont;
	
	dc.fillStyle = T.color.getcolorFromByte(cell.get("tcor")) || "#000000";
	
	if(cell._swty  !== undefined){
		var swtyArray=[1,2,3,4,6,7,5,8,11,12,13,14,15,16,17,18];
		
		cell._swty = parseInt(cell._swty,10);
		
		if(swtyArray.indexOf(cell._swty)!==-1 || cell._swty>=128){//单元数字格式显示
		
			textFormat={'format':cell._swty,'weishu':cell._dpt===undefined?2:parseInt(cell._dpt,10),'nby':0};	
			if(textFormat.format >= 128){
				if(cellvalue===0){
					cellvalue='';	
				}else{
					textFormat.format=String(parseInt(textFormat.format,10)-128);
					cellvalue = this.turnFormat(textFormat, cellvalue);		
				}
			}else{
				cellvalue = this.turnFormat(textFormat, cellvalue);	
			}
		}
		if(textAlign === '' || textAlign===undefined){textAlign='2';}
	}
	if(cell._swty === 10 && cell._lexcel!==undefined){//单元时间格式显示
			
			var xmldom = null;
			try {
				xmldom = T.xml.parseXml(cell._lexcel);
			} catch(ex) {
				alert(ex.message);
			}
			var format = xmldom.getElementsByTagName("eformat")[0].firstChild.nodeValue;
			var textFormat = {
				'format': format,
				'type': 'lexcel'
			};	
			
			cellvalue = this.turnFormat(textFormat, cellvalue);
			if(textAlign === '' || textAlign===undefined){textAlign='2';}
	}
	
	
	if(/^\d+(\.\d+)?$/.test(cellvalue) && (cell._hag === '' || cell._hag===undefined)){textAlign='2';}//如果是数字则向右对齐
   
   
	if (this._designmode===undefined && cell._note !== 'none' && cell._note !== undefined) {//自定义单元脚本
        var xmldom = null;
		
        try {
            xmldom = T.xml.parseXml(cell._note);
        } catch(ex) {
            alert(ex.message);
        }
		
                var dname	    =	T.xml.gXmlPrototype(xmldom,"dname");
                var fieldname   =	T.xml.gXmlPrototype(xmldom,"fieldname");
				fieldname= fieldname.replace(/%101/g,'&');
                var table       =	T.xml.gXmlPrototype(xmldom,"table");
                var cmd		    =	parseInt(T.xml.gXmlPrototype(xmldom,"cmd"),10);
                var type	    =	parseInt(T.xml.gXmlPrototype(xmldom,"type"),10);
				var showcontent =	T.xml.gXmlPrototype(xmldom,"showcontent");
			  	var sumtype		=	T.xml.gXmlPrototype(xmldom,"sumtype");
				
				var insertflag  =   T.xml.gXmlPrototype(xmldom,"insertflag");
				var vname		=	T.xml.gXmlPrototype(xmldom,"vname");
				vname = vname.replace(/%101/g,'&');
				if(vname==='none')  vname=fieldname;
		
		if(sumtype!=='none' && type !==8){
			if(fieldname ==="纵向求和"){
				cellvalue="纵向[求和]";	
			}else{	
        		cellvalue = "求和[" +vname + "]";
			}
		}else if(type===5||type === 6||type === 7||type === 8){
			if(type === 5){//行头字段定义内容：
				cellvalue="R";	
			}else if(type === 6)//列头字段定义内容：
			{
        		cellvalue="C";
			}else if(type === 7)//交叉字段定义内容：
			{
				cellvalue="RC";	
			}else if(type === 8)//交叉字段定义内容：
			{
				cellvalue="G";	
			}
			cellvalue += "[" + vname + "]";
			
		}else{
			cellvalue = "[" + vname + "]";	
		}
		
	}	
	
	if(cell._tag!==undefined){
		if((cell._tag >> 11) & 0x01){//tag11位上下标
			if(cellvalue.indexOf("&scsup")!==-1)
			cellvalue= cellvalue.replace(/&scsup/g,'');	
			 
			if(cellvalue.indexOf("&scsub")!==-1)
			cellvalue= cellvalue.replace(/&scsub/g,'');	
			 
			cellvalue= cellvalue.replace(/&scend/g,'');	
		}
	}
	if(cell._lscript !==undefined && cell._lscript.indexOf('sf')!==-1){//单元格序号显示规则
		cellvalue=this.setCellRule(cell._lscript,x,y);
	}
	
    textlength = dc.measureText(cellvalue).width;
	var turnstring=function(str){
		var arr=[];
		var i=0;
		while(i<str.length){
			arr.push(str[i]);	
			i++;
		}
		return arr;	
	}
	dc.strokeStyle='#000000';
    if ((cell._fl>> 8) & 0x01) {//fl 8 自动换行
        //width=textlength+cell._horMargin;
		
        var textlist = String(cellvalue).split('\n');
        var i, temptext, textwidth, textheight;
        if (textAlign == "0" || textAlign == "2") {
            textwidth = width - horMargin;
        } else {
            textwidth = width;
        }
        textheight = 0;
        if (textwidth > 0) {

            for (i = 0; i < textlist.length && textheight < height; i++) {
                temptext = textlist[i];
                while (dc.measureText(temptext).width > textwidth && dc.measureText(temptext).width > 7) {
                    text = temptext.substring(0, textwidth / dc.measureText(temptext).width * temptext.length);
                    if (dc.measureText(text).width < 20) {
                        temptext = '';
						drawtextlist=turnstring(textlist[i]);
                        break;
                    }
                    if (text.length < 2) text.length = 2;
                    while ((dc.measureText(text).width + horMargin) > width) {
                        text = text.substring(0, text.length - 1);
                    }
                    textheight += textfontsize * 4 / 3;
                    temptext = temptext.substring(text.length, temptext.length);
                    
					drawtextlist.push(text);
                }
                drawtextlist.push(temptext);
                textheight += textfontsize * 4 / 3;
            }
			
            if (textverAlign == "0") {//居上
                if (textheight > height) {
                    texty = 0;
                } else {
                    texty = 0;//width;
                }
            } else if (textverAlign == "6") {//居中
                if (textheight > height) {
                    texty = 0;
                } else {
                    texty = (height - textheight) / 2;
                }
            } else if (textverAlign == "8") {//居下
                if (textheight + horMargin > height) {
                    texty = 0;
                } else {
                    texty = height - textheight - horMargin;
                }
            } else {
                if (textheight > height) {
                    texty = 0;
                } else {
                    texty = 0;//单列显示的文字竖排(height - textheight) / 2
                }
            }
			
            texty += textfontsize/2+2;
           
		    for (i = 0; i < drawtextlist.length && texty < height; i++) {
                if (textAlign == "0") {//0 居左
                    textx = horMargin;
					if (is_radiobutton === true) {
						config.x = x +textx;
						config.y = y + (height - 12) / 2;
						dc.lineWidth=1;
						dc.strokeRect(x +textx, y + (height - 12) / 2, 12, 12);
						if (config !== cell._controlsItem) this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'controlsItem', config);
						textx += 14;
					}
				} else if (textAlign == "6") {//6居中
                    textx = (width - dc.measureText(drawtextlist[i]).width) / 2;
					
					if (is_radiobutton === true) {
						config.x = x +textx -7;
						config.y = y + (height - 12) / 2;
						dc.lineWidth=1;
						dc.strokeRect(x +textx -7, y + (height - 12) / 2, 12, 12);
						if (config !== cell._controlsItem) this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'controlsItem', config);
						textx += 7;
					}
			    } else if (textAlign == "2") {
                    textx = (width - dc.measureText(drawtextlist[i]).width)- horMargin;
					
					if (is_radiobutton === true) {
						config.x = x +textx -14;
						dc.lineWidth=1;
						dc.strokeRect(x +textx -14, y + (height - 12) / 2, 12, 12);
						if (config !== cell._controlsItem) this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'controlsItem', config);
						//textx += 7;
					}else if(is_dropdownbox === true) {

						textx =  x + width - horMargin - textlength-20;
					}
			    } else {
                    textx = 0;
                }
				if (cell._note !== 'none') {
					/*遮罩区域*/
					dc.save();	
					dc.beginPath();
					dc.strokeStyle = "transparent";
					dc.rect(x,y,width,height);
					dc.clip();
					dc.stroke(); 
					dc.closePath();
					dc.fillText(drawtextlist[i], x + textx, y + texty+horMargin);
		
					dc.restore();
					/*遮罩区域*/	
				}else{
               		 dc.fillText(drawtextlist[i], x + textx, y + texty+horMargin);
				}
				if(cell._ftid!==undefined){
                	if (this._ftlist[cell._ftid].uline!==undefined) {
						dc.beginPath();
						dc.moveTo(x + textx, y + texty + 2);
						dc.lineTo(x + textx + dc.measureText(drawtextlist[i]).width, y + texty + 2);
						dc.stroke();
                	}
				}
                texty += textfontsize * 4 / 3;
            }
        }
    } else {
        var textstrings = 0;

        if (textAlign == "0") {//居左
            textx = x + horMargin;
            width = width - horMargin;
            textstrings = Math.ceil(width / dc.measureText(cellvalue).width * cellvalue.length);

            if (is_radiobutton === true) {
                config.x = textx;
                dc.lineWidth=1;
				dc.strokeRect(textx, y + (height - 12) / 2, 12, 12);
                if (config !== cell._cellcheck) this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'cellcheck', config);
                textx += 14;
            }

        } else if (textAlign == "6") {//居中
            //if (dc.measureText(cellvalue).width > width) {
               // textx = x;
           // } else {
                textx = x + (width - textlength) / 2;
           // }           
			
			textstrings = Math.ceil((1 + width / dc.measureText(cellvalue).width) * cellvalue.length / 2);

			if (is_radiobutton === true) {
				config.x = textx-7;
				config.y=y + (height - 12) / 2;
				
				this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'controlsItem', config);
				dc.lineWidth=0;
				dc.strokeRect(textx-7, y + (height - 12) / 2, 12, 12);

				textx = textx + 7;

			}else if(is_dropdownbox === true) {

				textx = x + (width - textlength) / 2-10;
			}

        } else if (textAlign == "2") {//居右
            //if (dc.measureText(cellvalue).width > width) {
              //  textx = x + width -horMargin- textlength;
            //} else {
                textx = x + width - horMargin - textlength;
            //}
            if (is_radiobutton=== true) {
                if (dc.measureText(cellvalue).width + 12 > width) {
                    textx = x - 12;
                } else {
                    textx = x + width - horMargin - textlength - 12;
                }
                config.x = textx;
                dc.lineWidth=1;
				dc.strokeRect(textx, y + (height - 12) / 2, 12, 12);
                this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'controlsItem', config);

                textx = textx + 14;
            }else if(is_dropdownbox === true) {

				textx =  x + width - horMargin - textlength-20;
			}

            textstrings = cellvalue.length;
        } else {
            textx = x;
            if (is_radiobutton === true) {
                if (dc.measureText(cellvalue).width + 12 > width) {
                    textx = x - 12;
                } else {
                    textx = x + width - horMargin - textlength - 12;
                }
                config.x = textx;
                dc.lineWidth=1;
				dc.strokeRect(textx, y + (height - 12) / 2, 12, 12);
                this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'controlsItem', config);

                textx = textx + 14;
            }
        }
		
        if(textverAlign == "0")//top 
        {
            texty = y + textfontsize+verMargin;   
        }
        else if(textverAlign == "6")//midle
        {
            texty = y + (height + textfontsize)/2;
        }
        else if(textverAlign == "8")//bottom
        {
            texty = y + height-verMargin;
        }
		
		var pos=this.getRowColByCoor(x,y);
		if (textAlign == "2") {//居右
			var nextcell=this._cells[pos.row+1][pos.col];
		}else{
			var nextcell=this._cells[pos.row+1][pos.col+2];
		}
		if( (nextcell!==undefined && !T.isEmptyObject(nextcell)) || cell._rows !== undefined ){
			textwidth= 'cutdown';
		}
		
	    if (textwidth== 'cutdown') {
			/*遮罩区域*/
			dc.save();	
			dc.beginPath();
			dc.strokeStyle = "transparent";
			dc.rect(x,y,width,height);
			dc.clip();
			dc.stroke(); 
			dc.closePath();
			
			dc.fillText(cellvalue, textx, texty);
			dc.restore();
			/*遮罩区域*/	
			//var text = String(cellvalue).substr(0, textstrings);
           
			//dc.fillText(text, textx, texty);
       
	    } else if(is_dropdownbox===true){
				
			/*遮罩区域*/
			dc.save();	
			dc.beginPath();
			dc.strokeStyle = "transparent";
			dc.rect(x,y,width-20,height);
			dc.clip();
			dc.stroke(); 
			dc.closePath();
			dc.fillText( cellvalue, textx, texty);

			dc.restore();
			/*遮罩区域*/	
		}else {
			
			if((cell._tag >> 11) & 0x01){//上下标
				var num=0;
				var cutwidth=dc.measureText("A").width;
            	for(var i=0;i<oldvalue.length;i++){
					
					if(oldvalue.substr(i,6)==='&scsup'){
						dc.save();	
						dc.font="5px sans-serif";
						
						dc.fillText(oldvalue.substr(i+6,1), textx+num*cutwidth, texty-8);
						dc.restore();
						i=i+12;
					}else if(oldvalue.substr(i,6)==='&scsub'){
						dc.save();	
						dc.font="5px sans-serif";
						
						dc.fillText(oldvalue.substr(i+6,1), textx+num*cutwidth, texty);
						dc.restore();
						i=i+12;
					}else{
						dc.fillText(oldvalue[i], textx+num*cutwidth-4, texty);	
					}	
					num++;
				}
			}else{
				if (cell._note !== 'none') {
					/*遮罩区域*/
					dc.save();	
					dc.beginPath();
					dc.strokeStyle = "transparent";
					dc.rect(x,y,width,height);
					dc.clip();
					dc.stroke(); 
					dc.closePath();
					dc.fillStyle="#80";
					dc.fillText(cellvalue, textx, texty);
		
					dc.restore();
					/*遮罩区域*/	
				}else{
					
					dc.fillText(cellvalue, textx, texty);	
				}
			}
        }
        if (cell.getuline(ftlist)) {//下划线
            dc.beginPath();
            dc.moveTo(textx, texty + 2);
            dc.lineTo(textx + dc.measureText(cellvalue).width, texty + 2);
            dc.stroke();
        }

    }
}
DataGrid.prototype.paintCellImage = function(dc, cell, x, y, width, height, img, image) {
    var imgwidth = 0,
    imgheight = 0,
    imgy = 0,
    imgx = 0,
	textAlign=cell._hag || this._hag,
	textverAlign=cell._vag || this._vag;
    if (img.size == 'cell') //单元格大小
    {
        imgwidth = width;
        imgheight = height;
        imgy = y;
        imgx = x;
        dc.drawImage(image, imgx, imgy, imgwidth, imgheight);

    } else if (img.size == "origin") { //原始尺寸
        imgy = y;
        imgx = x;
        imgwidth = width;
        imgheight = height;
        if (imgwidth > img.width) imgwidth = img.width;
        if (imgheight > img.height) {
            imgheight = img.height;
            y = y + (height - imgheight) / 2;
        }

        dc.save();
        if (textAlign == "6") {//居中
            dc.translate((width - imgwidth) / 2, 0);
		}else if (textAlign == "0") {//居左
            dc.translate(1, 0);
        } else if (textAlign == "2") {//居右
            dc.translate(width - imgwidth, 0);
        }
        if(textverAlign == "0")//top 
        {
            dc.translate(0, -(height - imgheight) / 2);
        }
        else if(textverAlign == "6")//midle
        {
            //dc.translate((width - imgwidth) / 2, 0);
        }
        else if(textverAlign == "8")//bottom
        {
            dc.translate(0, (height - imgheight) / 2);
        }

		dc.drawImage(image, 0, 0, imgwidth, imgheight, x, y, imgwidth, imgheight);
        dc.restore(); //取消遮罩		

    } else if (img.size == "imgsize") { //按照图片比例缩放显示
      if (width / height > img.width / img.height) {
            imgwidth = (height / img.height) * img.width;
            imgheight = height;
            if (imgwidth > width) {
                imgwidth = width;
                imgheight = (imgwidth / img.width) * img.height;
            }

            imgy = y;
            imgx = x;

        } else if (width / height == img.width / img.height) {
            imgwidth = width;
            imgheight = height;
            imgy = y;
            imgx = x;
        } else if (width / height < img.width / img.height) {

            imgheight = (width / img.width) * img.height;
            imgwidth = (imgheight / img.height) * img.width;
            imgy = y + (height - imgheight) / 2;
            imgx = x;
            if (imgwidth > width) imgwidth = width;
            if (imgheight > height) imgheight = height;
        }
		dc.save();
        if (textAlign == "6") {//居中
            dc.translate((width - imgwidth) / 2, 0);
		}else if (textAlign == "0") {//居左
            dc.translate(1, 0);
        } else if (textAlign == "2") {//居右
            dc.translate(width - imgwidth, 0);
        }
		
        if(textverAlign == "0")//top 
        {
            dc.translate(0, -(height - imgheight) / 2);
        }
        else if(textverAlign == "6")//midle
        {
            //dc.translate((width - imgwidth) / 2, 0);
        }
        else if(textverAlign == "8")//bottom
        {
            dc.translate(0, (height - imgheight) / 2);
        }
        dc.drawImage(image, imgx, imgy, imgwidth, imgheight);
		dc.restore();		
    }
}

DataGrid.prototype.paintNoteTag = function(dc, cell, x, y, width, height)
{
	dc.save();
	dc.fillStyle='#FF0000';
	dc.beginPath();
	dc.moveTo(x+width-8,y);
	dc.lineTo(x+width,y+8);
	dc.lineTo(x+width,y);
    dc.fill();
    dc.closePath();
    dc.restore();
}
DataGrid.prototype.paintCells = function() {
    var x, y;
    var i, j, m;
    var cellsize, compos, cellpos;
    var row, col, cell, temprow, tempcol, tempwidth;
    compos = this.getCanvasXY();
    dc = this.getDc();
    for (i = this._scrollRowNum, y = this._offsetY; y < this.getHeight() && i < this._rows.length; i++) {

        row = new DataRow(this._rows[i]);
        if (row.getVisible()) {
            for (x = this._offsetX, j = this._scrollColNum; j < this._cols.length && x < this.getWidth(); j++) {
                col = new DataCol(this._cols[j]);
                if (col.getVisible()) {
					
                    cell = new DataCell(this._cells[i][j]);
                    cellsize = this.getCellSize(i, j);
					  
                    if (cell.ifPaint()) {
                        width = 0;
                        height = 0;
                        if (cell.getColspan() > 0 && cell.getRowspan() > 0) {//该单元格为合并 或者正常
                        	  if (cellsize.width > 0 && cellsize.height > 0) {
                                if (cell.getCombineStyle() == "combine") { //该单元格为合并
                                    dc.fillStyle = "#fff";
                                    dc.fillRect(x + 1, y + 1, cellsize.width - 2, cellsize.height - 2);
										var nextcell=this._cells[i][j+1];
//										if(nextcell!==undefined &&nextcell.col !== undefined){
//												dc.save();		
//												/*遮罩区域*/
//												dc.beginPath();
//												dc.strokeStyle = "transparent";
//												dc.rect(x,y,cellsize.width, cellsize.height);
//												dc.clip();
//												dc.stroke(); 
//												dc.closePath();
//												/*遮罩区域*/	
//												this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);
//												dc.restore();
//											}else{
//												this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);	
//											}
										//}else{
											
										  if(row.getColor()!==false){
												
												dc.fillStyle =row.getColor();
												dc.fillRect(x,y,cellsize.width, cellsize.height);
										   }
	                                       this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);
										
										//}

                                } else { //改单元格非合并单元格
                                    //
                                  //  if (cell.ifPaint()) { //单元格无内容不描绘,前一个有内容不描绘
                                       // dc.fillStyle = "#fff";
                                       // dc.fillRect(x + 1, y + 1, cellsize.width - 2, cellsize.height - 2);
										//var nextcell=this._cells[i][j+1];
//										if(dc.measureText(cell._value).width>cellsize.width){
//										
//										if(nextcell!==undefined && nextcell.col !== undefined){
//												dc.save();		
//												/*遮罩区域*/
//												//dc.setTransform(1, 0, 0, 1, 0, 0);
//												dc.beginPath();
//												dc.strokeStyle = "transparent";
//												dc.rect(x,y,cellsize.width, cellsize.height);
//												dc.clip();
//												dc.stroke(); 
//												dc.closePath();
//												/*遮罩区域*/	
//												
//												this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);
//												dc.restore();
//											}else{
//												this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);	
//											}
										//}else{
											if(row.getColor()!==false){
												
												dc.fillStyle =row.getColor();
												dc.fillRect(x,y,cellsize.width, cellsize.height);
											}
											
	                                       this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);
										//
										//}

                                   // }
                                }
                           	  }
                        } else {//cell.getColspan() < 0 合并单元格的其他单元格
                            temprow = 0 - cell.getRowspan();
                            tempcol = 0 - cell.getColspan();
                            if (temprow < this._scrollRowNum || tempcol < this._scrollColNum) {
                                if ((i == this._scrollRowNum && j == this._scrollColNum) || (i == this._scrollRowNum && j == tempcol) || (j == this._scrollColNum && i == temprow)) {
                                    cell = new DataCell(this._cells[temprow][tempcol]);
                                    cellpos = this.getCellLeftTopCoor(temprow, tempcol);
                                    cellsize = this.getCellSize(temprow, tempcol);
                                    dc.fillStyle = "#fff";
                                    dc.fillRect(cellpos.x + 1, cellpos.y + 1, cellsize.width - 2, cellsize.height - 2);
                                    this.paintCellContent(dc, cell, cellpos.x, cellpos.y, cellsize.width, cellsize.height);
                                }
                            }
                        }
                    } else {
//                        if (cell.getBorderLine() != "none") {
//                            this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);
//                        } else {
//                           // if (cell._backColor != "" && cell._value != '' && cell._cellImage != 'none') { //单元格无内容不描绘
//                                dc.fillStyle = "#fff";
//                                dc.fillRect(x + 1, y + 1, cellsize.width - 2, cellsize.height - 2);
//								 this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);
//                           // }
//
//                        }
						//dc.fillStyle = "#fff";
						//dc.fillRect(x+1,y+1,cellsize.width-2,cellsize.height-2);

                    }
                    x += col.getWidth();
                }
            }
            y += row.getHeight();
        }
    }
    rightimagedata = null;
    bottomimagedata = null;
    this.releaseDc(dc);
}

DataGrid.prototype.paintSelCells = function() {
    dc = this.getDc();
    var compos = this.getCanvasXY();
    var selColor, selAlpha;
    /*绘制选中的遮罩*/
    var startcoor = this.getCellLeftTopCoor(this._sel_startRow, this._sel_startCol);
    var selsize = this.getRectSize(this._sel_startRow, this._sel_startCol, this._sel_endRow, this._sel_endCol);
	dc.save();
    if ((this._tagvalue>> 16) & 0x01) {
        dc.globalAlpha =0.5;
        dc.fillStyle = T.color.getcolorFromByte(this._selbkcolor) || '#D2E0FF';
        dc.fillRect(startcoor.x, startcoor.y, selsize.width, selsize.height);
    } else {
        if (startcoor.x + selsize.width > this._offsetX && startcoor.y + selsize.height > this._offsetY) {
            dc.globalAlpha = 0.2;
            dc.fillStyle = "#00f";
            dc.fillRect(startcoor.x, startcoor.y, selsize.width, selsize.height);
            /*绘制焦点单元格*/
            dc.globalAlpha = selAlpha || 1;
            var focuscoor = this.getCellLeftTopCoor(this._focusRow, this._focusCol);
            var focusize = this.getCellSize(this._focusRow, this._focusCol);
            var cell = new DataCell(this._cells[this._focusRow][this._focusCol]);
			
            if (focuscoor.x + focusize.width > 40 && focuscoor.y + focusize.height > 20) {
                dc.fillStyle = "#fff";

                dc.fillRect(focuscoor.x + 1, focuscoor.y + 1, focusize.width - 2, focusize.height - 2);
                this.paintCellContent(dc, cell, focuscoor.x, focuscoor.y, focusize.width, focusize.height);
            }
            /*绘制线框*/
            dc.strokeStyle = "#000000";
            dc.lineWidth = 3;
            dc.beginPath();
            dc.moveTo(startcoor.x, startcoor.y);
            dc.lineTo(startcoor.x + selsize.width, startcoor.y);
            dc.lineTo(startcoor.x + selsize.width, startcoor.y + selsize.height);
            dc.lineTo(startcoor.x, startcoor.y + selsize.height);
            dc.closePath();
            dc.stroke();
        }
    }
	dc.restore();
    this.releaseDc(dc);
}

DataGrid.prototype.paintBackimage = function(dc, img, image) {
    var compos = this.getCanvasXY();
    var x = this._offsetX;
    var y = this._offsetY;
    var posx = 0,
    posy = 0,
    sx = 0,
    sy = 0,
    sw = 0,
    sh = 0,
    dw = 0,
    dh = 0;
	
    if (img.size && img.size === "origin") {
        sw = img.width;
        sh = img.height;
        dw = img.width;
        dh = img.height;

        if (this._scrollColNum !== 0) {

            posx = this.getScrollLeft();

            sx = posx;

            sw = img.width - posx;

            dw = img.width - posx;

        }
        if (this._scrollRowNum !== 0) {

            posy = this.getScrollTop();

            sy = posy;

            sh = img.height - posy;

            dh = img.height - posy;

        }
        if (this._scrollColNum === 0 && this._scrollRowNum === 0) {
            //image.onload = function()
            //{		
            dc.drawImage(image, x, y, img.width, img.height);

            //}
        } else {
            dc.drawImage(image, sx, sy, sw, sh, x, y, dw, dh);
        }
    } else if (img.size && img.size === "canvas") {
		var size = this.getRectSize(0,0,this._rows.length,this._cols.length);
        sw = img.width;
        sh = img.height;
        dw = size.width;
        dh = size.height;

        if (this._scrollColNum !== 0) {

            posx = this.getScrollLeft();

            sx = img.width * (posx / dw);

            sw = img.width - img.width * (posx / dw);

            dw = dw - posx;

        }
        if (this._scrollRowNum !== 0) {

            posy = this.getScrollTop();

            sy = img.height * (posy /dh);

            sh = img.height - img.height * (posy / dh);

            dh = dh - posy;

        }

        if (this._scrollColNum === 0 && this._scrollRowNum === 0) {
			
            dc.drawImage(image, x, y, dw, dh);
        } else {
            dc.drawImage(image, sx, sy, sw, sh, x, y, dw, dh);
        }

    }
}
DataGrid.prototype.paint = function() {
    var compos = this.getCanvasXY();
    var dc = this.getDc();
    var imageRight = dc.getImageData(compos.x + this.getWidth(), 0, glGetWidth() - compos.x - this.getWidth(), glGetHeight());
    var imageBottom = dc.getImageData(0, compos.y + this.getHeight(), glGetWidth(), glGetHeight() - compos.y - this.getHeight());
    this.releaseDc(dc);

	//this.paintRowColor();//背景奇偶颜色调色器
    this.paintNetLine();
	
    dc = this.getDc();
    var imageLeft = dc.getImageData(0, 0, compos.x + this._offsetX, glGetHeight());
    var imageTop = dc.getImageData(0, 0, glGetWidth(), compos.y + this._offsetY);
    this.releaseDc(dc);
    this.paintCells();
    if (this.getMousecursor().indexOf('paintborder') == -1 && this._cols.length !== 0) {
		
		this.paintSelCells();
	}
    /*绘制选中框*/

    dc = this.getDc();
    dc.putImageData(imageLeft, 0, 0);
    dc.putImageData(imageTop, 0, 0);
    this.releaseDc(dc);
    if (this.isShowHeader()) this.paintHeader();
    dc = this.getDc();
    dc.putImageData(imageRight, compos.x + this.getWidth(), 0);
    dc.putImageData(imageBottom, 0, compos.y + this.getHeight());
	this.releaseDc(dc);
	this.paintBbname(dc);    
}
DataGrid.prototype.paintBbname = function(dc) {
	dc.font = "12px 宋体";
    dc.fillStyle = "#000";
	//dc.fillRect(0,_gl_canvas.height-20,_gl_canvas.width-21,100);
    dc.strokeRect(0, 0, Math.floor(this.getWidth()), Math.floor(this.getHeight()));
	dc.clearRect(10,_gl_canvas.height-20,_gl_canvas.width-421,20);
	
	dc.fillText('当前工作报表：'+(_gl_filename || ''), 10, 547);
		
}
DataGrid.prototype.clear = function() {
    dc = this.getDc();
    var compos = this.getCanvasXY();
    dc.fillStyle = "#fff";
    dc.fillRect(0, 0, this.getWidth(), this.getHeight());
    this.releaseDc(dc);
}
DataGrid.prototype.getCellvaluewidth = function(cell) { //获得单元格内一串字符串的长度
    var fontstr = '';
    if (cell._fontItalic) {
        fontstr += "italic ";
    }
    if (cell._fontBold) {
        fontstr += "bold ";
    }
    dc.font =fontstr + cell._fontSize + "px " + cell._fontFamily;// this.getdcfont(cell.getFtid());
    dc.fillStyle ="#000";
   
   // cell._value = this.turnFormat(cell._textFormat, cell._value);
    return dc.measureText(cell.getValue()).width;

}
DataGrid.prototype.dblclick = function(e) {
	if(_gl_filename === undefined){
		return ;
	}
	if(this._designmode===undefined){//计算模式
		if(!!this.getCellProperty(this._focusRow, this._focusCol, 'note')){
			return;	
		}
	}
	clearCeng('showbox');
    var pagepos = glGetMousePageXY(e);
    var canpos = glGetMouseCanvasXY(e);
    var compos = this.getCanvasXY();
    var ctrx = canpos.x - compos.x;
    var ctry = canpos.y - compos.y;
    var dc = this.getDc();
    var cell = new DataCell(this._cells[this._focusRow][this._focusCol]);
    var cellpos = this.getCellLeftTopCoor(this._focusRow, this._focusCol);
    var cellsize = this.getCellSize(this._focusRow, this._focusCol);
    this._dblclick = true;
   // textlength = this.getCellvaluewidth(cell);
 	if(cell._fl && ((cell._fl >> 0) & 0x01) === 0){//单元保护
		alert('单元保护');
		return false;
	}

   
    var textAlign=cell._hag || this._hag,horMargin = cell._lspan || 5;//内左边距;
    var textlength = Math.ceil(dc.measureText(cell._t).width);
	textlength = this.getCellvaluewidth(cell);
    if (textAlign == "0") {
        textx = textlength + horMargin;
    } else if (textAlign== "6") {
        if (dc.measureText(cell._t).width > width) {
            textx = textlength;
        } else {
            textx = textlength + (width - textlength) / 2;
        }
    } else if (textAlign == "2") {
        if (dc.measureText(cell._t).width > width) {
            textx = textlength;
        } else {
            textx = textlength + width - horMargin - textlength;
        }
    } else {
        textx = textlength;
    }

    if (textx < cellsize.width) {
        textx = cellsize.width;
    }

			dc.fillStyle = "#fff";
			dc.fillRect(cellpos.x, cellpos.y, textx, cellsize.height);
			dc.fillStyle = "#000";
			dc.strokeRect(cellpos.x, cellpos.y, textx, cellsize.height);
			/*绘制线框*/
			this._editBox.style.left = pagepos.x - (ctrx - cellpos.x) + "px";
			this._editBox.style.top = pagepos.y - (ctry - cellpos.y) + "px";
			this._editBox.style.width = textx +"px"; //cellsize.width + "px";
			this._editBox.style.fontsize = "12px";
			//this._editBox.width = 1000 +"px"; //cellsize.width + "px";
			this._editBox.style.display = "block";
			this._editBox.focus();
			this.releaseDc(dc);
}
DataGrid.prototype.showhtmlCell=function(ctrx,ctry,html){
	  clearCeng("htmlcell");
	  if(!html)return false;
	  var html=html.replace(/size="?10pt"?/g,'');
	  var left = (document.body.clientWidth - _gl_canvas.width) / 2 + document.body.scrollLeft;
	  var top=document.getElementById("canvas").offsetTop;
	  var startcoor = this.getCellLeftTopCoor(this._sel_startRow,this._sel_startCol);
	  var box = document.createElement("div");
	  
	  box.className='hint';
	  box.style.border='0px';
	  box.id = 'htmlcell';
	  box.style.width="240px";
	  box.style.zIndex="80";
	  box.style.position = 'absolute';
	  box.style.backgroundColor="transparent";
	  box.style.left =left+ctrx + 'px';
	  box.innerHTML =html;
	  document.body.insertBefore(box, document.getElementById("mainleft"));
	  var boxheight=document.getElementById("htmlcell").offsetHeight;
	  box.style.top =top+ctry+ 'px';
}
DataGrid.prototype.showTip=function(ctrx,ctry,html,upu){
	if (!document.getElementById("showbox")) {
		  this._editBox.style.display='none';
		  var left = (document.body.clientWidth - _gl_canvas.width) / 2 + document.body.scrollLeft;
		  var top=document.getElementById("canvas").offsetTop;
		  var startcoor = this.getCellLeftTopCoor(this._sel_startRow,this._sel_startCol);
		  var cellsize = this.getCellSize(this._sel_startRow,this._sel_startCol);
		  var box = document.createElement("div");
		  
		  box.className='hint boxopacity';
		  box.id = 'showbox';
		  box.style.width="240px";
		  box.style.zIndex="80";
		  box.style.position = 'absolute';
		  box.style.backgroundColor="#FFC";
		  box.style.left =T.html.ex()+ 'px';
		 
		  var box_wenzi = document.createElement("div");
		  box_wenzi.id="showbox_wenzi";
		  box_wenzi.style.position = 'absolute';
		  box_wenzi.style.left =T.html.ex()+ 'px';
		  box_wenzi.innerHTML ="<span>"+html+"</span><br><span class=\"hint-pointer\"></span>";
		  box_wenzi.style.width="240px";
		  box_wenzi.style.zIndex="81";
		  document.body.insertBefore(box, document.getElementById("mainleft"));
		  document.body.insertBefore(box_wenzi, document.getElementById("mainleft"));
		  //box.onmouseout=function(){clearCeng("showbox");}
		  var boxheight=document.getElementById("showbox").offsetHeight;
		  var boxwenziheight=document.getElementById("showbox_wenzi").offsetHeight;
		  
		  box.style.top =startcoor.y+top+ cellsize.height+'px';
		  box_wenzi.style.top =startcoor.y+top+ cellsize.height+'px';console.log(boxwenziheight);
		  box.style.height=boxwenziheight+"px";
		 // _gl_mouseState.mousedownstate=false;
	}
}
DataGrid.prototype.mousedown = function(e) {
    clearCeng('myContextMenu');
    clearCeng('showbox');
    clearCeng('showbox_wenzi');
	if(_gl_filename === undefined){
		return ;
	}
    var eve = e ? e: event;
    if (this._cols.length === 0 || this._rows.length === 0) return false;
	
    if (eve.button == 0 || eve.button == 1) {//ie 下左键为1
        var i, row, col;
        var x = this._offsetX,
        y = this._offsetY;
        var ctrpos = glGetMouseCanvasXY(e); //鼠标位置
        var compos = this.getCanvasXY();
        var ctrx = ctrpos.x - compos.x;
        var ctry = ctrpos.y - compos.y;
        if (ctrx < this._offsetX && ctry > this._offsetY) {
            for (i = this.getScrollRowNum(); i < this._rows.length && y < this._height; i++) {
                row = new DataRow(this._rows[i]);
                if (row.getVisible()) {
                    y += row.getHeight();
                }

                if (ctry > y - 3 && ctry < y + 1) {
                    this._handThing = "row";
                    this._resizeRow = i;
                    this._oldRowBottomY = y;
                    this._minRowBottomY = y - row.getHeight();
                    break;
                }else if(ctry >= y + 1 && ctry < y + 3){
					if(!row.getVisible()){
						this._handThing = "row";
						this._resizeRow = i;
						this._oldRowBottomY = y;
						this._minRowBottomY = y - row.getHeight();
						break;
					}	
				} else if (ctry >= (y - row.getHeight() + 3) && ctry <= (y - 3)) {
                    this._handThing = "rowcel";
                    this._sel_startRow = i;
                    this._sel_startCol = 0;
                    this._sel_endRow = i;
                    this._sel_endCol = this._cols.length - 1;
                    this._focusRow = i;
                    this._focusCol = this.getScrollColNum();
                    this.clear();
                    this.paint();
                    break;
                }
            }
        } else if (ctrx > this._offsetX && ctry < this._offsetY && this._selLineAll.on===false) {
            for (i = this.getScrollColNum(); i < this._cols.length && x < this._width; i++) {
                col = new DataCol(this._cols[i]);
                if (col.getVisible()) {
                    x += col.getWidth();
                }
                if (ctrx < x + 1 && ctrx > x - 3) {
                    this._handThing = "col";
                    this._resizeCol = i;
                    this._oldColRightX = x;
					this._oldColX = x;
                    this._minColRightX = x - col.getWidth();
                    break;
                }else if(ctrx >= x + 1 && ctrx < x + 3){
					if(!col.getVisible()){
						this._handThing = "col";
						this._resizeCol = i;
						this._oldColRightX = x;
						this._oldColX = x;
						this._minColRightX = x - col.getWidth();
					}	
				} else if (ctrx >= (x - col.getWidth() + 3) && ctrx <= (x - 3)) {
                    this._handThing = "colcel";
                    this._sel_startRow = 0;
                    this._sel_startCol = i;
                    this._sel_endRow = this._rows.length - 1;
                    this._sel_endCol = i;
                    this._focusRow = this.getScrollRowNum();
                    this._focusCol = i;
                    this.clear();
                    this.paint();
                    break;
                }
            }
        } else if (ctrx < this._offsetX && ctry < this._offsetY) {
            this._handThing = "allcel";
            this._sel_startRow = 0;
            this._sel_startCol = 0;
            this._sel_endRow = this._rows.length - 1;
            this._sel_endCol = this._cols.length - 1;
            this._focusRow = this.getScrollRowNum();
            this._focusCol = this.getScrollColNum();
            this.clear();
            this.paint();
        } else if (ctrx > this._offsetX && ctry > this._offsetY) {
			
            this._handThing = "cel";
            var focuscell = this.getRowColByCoor(ctrx, ctry);
            this._sel_startRow = focuscell.row;
            this._sel_startCol = focuscell.col;
            this._sel_endRow = focuscell.row;
            this._sel_endCol = focuscell.col;
            this._focusRow = focuscell.row;
            this._focusCol = focuscell.col;

            var cell;
            cell = this.findCombineCellsAroundSelCells();
            if (cell != null) {
                if (cell.startrow < this._sel_startRow) {
                    this._sel_startRow = cell.startrow;
                }
                if (cell.startcol < this._sel_startCol) {
                    this._sel_startCol = cell.startcol;
                }
                if (cell.endrow > this._sel_endRow) {
                    this._sel_endRow = cell.endrow;
                }
                if (cell.endcol > this._sel_endCol) {
                    this._sel_endCol = cell.endcol;
                }
            }
			
            var selCell = this._cells[this._focusRow][this._focusCol];
            if (selCell.fontSize !== undefined) {
                var options = document.getElementById("fontsize").options;
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value == selCell.fontSize) {
                        document.getElementById("fontsize").options[i].selected = true;
                        break;
                    }
                }
            } else {
				try{
                	document.getElementById("fontsize").options[0].selected = true;
				}catch(err){
				}
				
            }
			
            if (selCell.fontFamily !== undefined) {
                var options = document.getElementById("font_family").options;
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value == selCell.fontFamily) {
                        document.getElementById("font_family").options[i].selected = true;
                        break;
                    }
                }
            } else {
                document.getElementById("font_family").options[0].selected = true;
            }
			
			var startcoor = this.getCellLeftTopCoor(this._focusRow, this._focusCol);
			if ((selCell.fl >> 11) & 0x01) {//超级链接
				
				var url = selCell.cellurl.url;
				if (/^((.+):\/\/)[a-z0-9A-Z]{3}\.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc(:s[0-9]{1-4})?/.test(url)) {
					if (/(https|http|ftp|file)/.test(RegExp.$2)) {
						if(selCell.cellurl.newwin===true){
							
							window.location.href= url;
						}else{
							window.open(url, "_blank");	
						}
					}
				} else if (/^(mailto)/.test(url)) {
					location.href = 'mailTo:123u@163.com';
				}
			
			} 
			if (this.getCellProperty(this._focusRow, this._focusCol, 'cellcheck')) {
				var dropdownbox=selCell.cellcheck;
                
                if (selCell.cellcheck.x !== undefined) {//radiobutton单选框
                    var dropx = dropdownbox.x,
                    dropy = dropdownbox.y;
					
					
                    var cellsize = this.getCellSize(this._focusRow, this._focusCol);
					var cellCoor = this.getCellLeftTopCoor(this._focusRow, this._focusCol);
					var textAlign=selCell.hag || this._hag;
					if (textAlign == "0") {//居左
						if (ctrx < cellCoor.x+17 && ctrx > cellCoor.x+5 && ctry < cellCoor.y+cellsize.height/2+18 && ctry >cellCoor.y+ (cellsize.height-12)/2) 
						{
							this.paintCellControlsRadiobuttonHook(dropx, dropy);
							
						}
					} else if (textAlign == "6") {//居中
						if (ctrx < cellCoor.x+12+(cellsize.width-12)/2  && ctrx > cellCoor.x+(cellsize.width-12)/2 && ctry < cellCoor.y+cellsize.height/2+18 && ctry >cellCoor.y+ (cellsize.height-12)/2) 
						{
							this.paintCellControlsRadiobuttonHook(dropx, dropy);
							
						}
					} else if (textAlign == "2") {//居右
						if (ctrx < cellCoor.x+cellsize.width-5  && ctrx > cellsize.width-17 && ctry < cellCoor.y+cellsize.height/2+18 && ctry >cellCoor.y+ (cellsize.height-12)/2) 
						{
							this.paintCellControlsRadiobuttonHook(dropx, dropy);
							
						}
					}
					

                }
			}
			
			if ((selCell.fl >> 12) & 0x01) { //下拉框

                    var cellsize = this.getCellSize(this._focusRow, this._focusCol);
					if(parseInt(selCell.cols,10)<0){//合并单元格的次要单元格
						cellsize = this.getCellSize(this._focusRow, -parseInt(selCell.cols,10)-1);	
						startcoor = this.getCellLeftTopCoor(this._focusRow, -parseInt(selCell.cols,10)-1);
						this._focusCol=-parseInt(selCell.cols,10)-1;
					}
                    if (ctrx < startcoor.x + cellsize.width - 2 & ctrx > startcoor.x + cellsize.width - 22 && ctry < startcoor.y + cellsize.height && ctry > startcoor.y) {
                       if (!document.getElementById("showbox")) {
                            this.paintCellControlsDropdownbox(selCell.clco, startcoor.x, startcoor.y, cellsize.width,this._focusRow,this._focusCol);
                        } else {
                            clearCeng("showbox");
                            clearCeng("showbox_wenzi");
                        }
                    }

             }
			
            if (this._designmode===undefined && this.getCellProperty(this._focusRow, this._focusCol, 'note')) {//自定义脚本
			    var xmldom = null;
                try {
                    xmldom = T.xml.parseXml(selCell.note);
                } catch(ex) {
                    alert(ex.message);
                }
				
                var dname	    =	T.xml.gXmlPrototype(xmldom,"dname");
                var fieldname   =	T.xml.gXmlPrototype(xmldom,"fieldname");
				fieldname = fieldname.replace(/%101/g,'&');
                var table       =	T.xml.gXmlPrototype(xmldom,"table");
                var cmd		    =	parseInt(T.xml.gXmlPrototype(xmldom,"cmd"),10);
                var type	    =	parseInt(T.xml.gXmlPrototype(xmldom,"type"),10);
				var showcontent =	T.xml.gXmlPrototype(xmldom,"showcontent");
			  	var sumtype		=	T.xml.gXmlPrototype(xmldom,"sumtype");
				var vname		=	T.xml.gXmlPrototype(xmldom,"vname");
				vname=vname.replace(/%101/g,'&');
				var insertflag  =   T.xml.gXmlPrototype(xmldom,"insertflag");
				
				
				var zdshuoming  =	"从表字段名称";
				
				if(vname==='none')vname=fieldname;
				var fztype=["细节","小计中","小计","总计中"];
			    if(cmd === 2 ){
					if(type === 1){
						zdshuoming="主表字段名称";		
					}else if(type === 1){
						zdshuoming="从表字段名称";	
					}
				}else if( cmd ===0 ){
					if(type === 2 ){
						zdshuoming="分组细节字段名称";
							
					}else if(  type === 3){
						
						zdshuoming="分组小计字段名称";
							
					}else if(  type === 4){
						
						zdshuoming="分组合计字段名称";
							
					}else if( type === 1){
						
						zdshuoming="分组头字段名称";
						
					}
				}else if( cmd ===5 ){
					if(type === 5 ){
						zdshuoming="行头字段";
							
					}else if(type === 6){
						
						zdshuoming="列头字段";	
					}else if(type === 7){
						
						zdshuoming="交叉区域字段";
							
					}else if( type === 3 && fieldname==="纵向求和"){
						zdshuoming="纵向求和字段名称";
					}else if(type=== 3 &&  fieldname==="横向求和"){
						zdshuoming="横向求和字段名称";
					}
				}else if(cmd === 4){
					if(type === 1){
						zdshuoming="分组头字段名称";	
					}else if(type === 5){
						zdshuoming="行头字段";	
					}else if(type===6){
						zdshuoming="列头字段";	
					}else if(type ===7){
						zdshuoming="交叉区域字段";	
					}else if(type === 3&& fieldname==="纵向求和" ){
						zdshuoming="纵向求和字段定义";	
					}else if(type === 3&& fieldname==="横向求和" ){
						zdshuoming="横向求和字段定义";	
					}
				}
				
				var li3=zdshuoming +"：" + vname;
				
				if(sumtype!=='none' && fieldname!=="纵向求和" && fieldname!=="横向求和"){
					li3=	fztype[type-1]+"对字段["+vname+"]求和";
				}else if(fieldname==="纵向求和" ){
					li3= 	"对字段纵向[求和]";	
				}else if( fieldname==="横向求和"){
					li3=	"对字段["+vname+"]横向求和";	
				}
				if(sumtype!=='none' && type===8){
					li3=	"按字段["+vname+"]分组小计求和";	
				}
				
				var setcmd = {
                    "2": "主从报表",
                    "6": "普通报表",
                    "5": "交叉报表",
                    "0": "分组报表",
                    "4": "分组交叉报表"
                };
				var html="<li>报表字段定义1</li><li class=\"ContextLine\"></li><li>报表类型:" + setcmd[cmd] + "</li>";
				html+=dname!=='none'?"<li>数据源名：" + dname + "</li>":'';
				html+="<li>"+ li3 +"</li>";
				html+=table!=="none"?"<li>表名：" + table+"</li>":'';
				this._cells[this._focusRow][this._focusCol].showTipFlag=true;
				this.showTip(ctrx,ctry,html,156);
				
            }else if (this.getCellProperty(this._focusRow, this._focusCol, 'tip')) {
				this._cells[this._focusRow][this._focusCol].showTipFlag=true;
				this.showTip(ctrx,ctry,selCell.tip,180);
				preventDefault(eve);
            }

            if ((this._tagvalue>>16)& 0x01) //设置光标整行选中
            {
                this._sel_startCol = 0;
                this._sel_endCol = this._cols.length - 1;
            }
            this.clear();
            this.paint();
			if(is_mobile){//为手机
				_moblie+=1;
				if(_moblie === 2 && tempcell.row ===this._focusRow && tempcell.col===this._focusCol ){
					preventDefault(event);
					this.dblclick(eve);
					_moblie=0;
				}else if(_moblie === 2){
					_moblie=1;
					tempcell={row:this._focusRow,col:this._focusCol};
				}else{
					tempcell={row:this._focusRow,col:this._focusCol};	
				}
			}
        }
    }
    if (eve.button == 2) {
        var meinv = eve.srcElement ? eve.srcElement: eve.target;
        var menu = new ClickMenuItem(eve);
        var _this = this,focusRow = this._focusRow,focusCol = this._focusCol;
        this._handThing = 'none'; //右键时阻止框选单元格，在鼠标左键按下时触发
        var menuItem = [{
            'itemText': '显示表格线',
			'css':_this._showgrid===1 ||_this._showgrid===undefined? 'select': '',
            'ev': function() {
                _this.setNetChartVisible(!_this.getNetChartVisible());
                _this.clear();
                _this.paint();
				clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '显示行列头',
			'css':  _this._showheader===1||_this._showheader===undefined ? 'select': '',
            'ev': function() {
                _this.setTableHead();
				clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '插入',
            'ev': function(event) {},
            'child': [{
                'itemText': '活动单元下移',
                'ev': function() {
                    _this.insertCellBefore();

                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '活动单元右移',
                'ev': function() {
                    _this.insertCellAfter();
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemType': 'line'
            },
            {
                'itemText': '在此列前方插入',
                'ev': function() {
                    //_this.insertCol(focusCol);
                    _this.insertColBefore();
                    clearCeng('myContextMenu');

                }
            },
            {
                'itemText': '在此列后方插入',
                'ev': function() {
                    _this.insertColAfter();
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemType': 'line'
            },
            {
                'itemText': '在此行上方插入行',
                'ev': function() {
                    _this.insertRowBefore();
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '在此行下方插入行',
                'ev': function() {
                    _this.insertRowAfter();
                    clearCeng('myContextMenu');
                }
            }]
        }];
        menu.addItem(menuItem);
        menu.addMenuTo('rightMouse');
        document.oncontextmenu = function(eve) {
            return false;
        }
    }
    if (this.getMousecursor().indexOf('paintborder') != -1) {
        this.usepaintBorderLines(ctrpos.x, ctrpos.y, this._focusRow, this._focusCol);
        //alert(this._sel_startCol);
        //this.
    }
}

DataGrid.prototype.mousemove = function(e) {
    var eve = e ? e: event;
    if (eve.button == 0 && !((this._tagvalue>>16)& 0x01)) {
        var i, x = this._offsetX,
        y = this._offsetY;
        var ctrpos = glGetMouseCanvasXY(e);
        var compos = this.getCanvasXY();
        var ctrx = ctrpos.x - compos.x;
        var ctry = ctrpos.y - compos.y;
        var row, col;
		var cellrowcol = this.getRowColByCoor(ctrx, ctry);
			
		//if(document.getElementById("showbox")){
			//if(this._cells[cellrowcol.row][cellrowcol.col].showTipFlag=== undefined){
				//clearCeng("showbox");	
			//}	
		//}		
				
        if (glGetMouseState()) { 
            if (this._handThing == "row") { //拉行高
           	   row = new DataRow(this._rows[this._resizeRow]);
                if (row.getHeight() + Math.floor(ctry) - this._oldRowBottomY > 0) {
					this._rows[this._resizeRow].tagval&= ~(1 << 9); // 置第x位为0
                    this._rows[this._resizeRow].height = row.getHeight() + Math.floor(ctry) - this._oldRowBottomY;
                    this._oldRowBottomY = Math.floor(ctry);
                } else {
                    this._rows[this._resizeRow].tagval  |= 1 << 9; // 设置第x位为1
                    this._rows[this._resizeRow].tagval  |= 1 << 8; // 设置第x位为1
                    this._rows[this._resizeRow].height = 0;
                    this._oldRowBottomY = this._minRowBottomY;
                }
                this.clear();
                this.paint();
                if (this.resizeRow) {
                    //this.resizeRow(e, this._resizeRow);
                }
            } else if (this._handThing == "col") {
                col = new DataCol(this._cols[this._resizeCol]);
                if (col.getWidth() + Math.floor(ctrx) - this._oldColRightX > 0) {
					this._cols[this._resizeCol].tagval&= ~(1 << 9); // 置第x位为0
                    this._cols[this._resizeCol].width = col.getWidth() + Math.floor(ctrx) - this._oldColRightX;
                    this._oldColRightX = Math.floor(ctrx);
                } else {//col.getWidth() === 0 
				
                    this._cols[this._resizeCol].tagval  |= 1 << 9; // 设置第x位为1
                    this._cols[this._resizeCol].tagval  |= 1 << 8; // 设置第x位为1
                    this._cols[this._resizeCol].width = 0;
					this._oldColRightX = this._minColRightX;
                }
                this.clear();
                this.paint();
                if (this.resizeCol) {
                    this.resizeCol(e, this._resizeCol);
                }
            } else if (this._handThing == "allcel") {} else if (this._handThing == "rowcel") {} else if (this._handThing == "colcel") {} else if (this._handThing == "cel") {
	var cellrowcol = this.getRowColByCoor(ctrx, ctry);

                if (cellrowcol.row > this._focusRow) {
                    this._sel_startRow = this._focusRow;
                    this._sel_endRow = cellrowcol.row;
                } else if (cellrowcol.row < this._focusRow) {
                    this._sel_startRow = cellrowcol.row;
                    this._sel_endRow = this._focusRow;
                } else {
                    this._sel_startRow = this._focusRow;
                    this._sel_endRow = this._focusRow;
                }
                if (cellrowcol.col > this._focusCol) {
                    this._sel_startCol = this._focusCol;
                    this._sel_endCol = cellrowcol.col;
                } else if (cellrowcol.col < this._focusCol) {
                    this._sel_startCol = cellrowcol.col;
                    this._sel_endCol = this._focusCol;
                } else {
                    this._sel_startCol = this._focusCol;
                    this._sel_endCol = this._focusCol;
                }
                var cell = this.findCombineCellsAroundSelCells();
                while (cell != null) {
                    if (cell.startrow < this._sel_startRow) {
                        this._sel_startRow = cell.startrow;
                    }
                    if (cell.startcol < this._sel_startCol) {
                        this._sel_startCol = cell.startcol;
                    }
                    if (cell.endrow > this._sel_endRow) {
                        this._sel_endRow = cell.endrow;
                    }
                    if (cell.endcol > this._sel_endCol) {
                        this._sel_endCol = cell.endcol;
                    }
                    cell = this.findCombineCellsAroundSelCells();
                }
                this.clear();
                this.paint();
            }
        } else {
            if (ctrx < this._offsetX && ctry > this._offsetY) {
                for (i = this.getScrollRowNum(); y < this._height && i < this._rows.length; i++) {
                    row = new DataRow(this._rows[i]);
                    if (row.getVisible()) {
                        y += row.getHeight();
                    }
                    if (ctry > y - 3 && ctry < y + 1) {
                        glGetCanvas().style.cursor = "n-resize";//拉行高
                        break;
                    } else if(ctry >= y + 1 && ctry < y + 3){
						if (!row.getVisible()) {
							glGetCanvas().style.cursor = "url('image/icon/H_split.png'),auto";
							//glGetCanvas().style.cursor = "e-split";//拉列
							break;
						}
					} else {
                        glGetCanvas().style.cursor = "default";
                    }
                }
            } else if (ctrx > this._offsetX && ctry < this._offsetY) {
                for (i = this.getScrollColNum(); y < this._width && i < this._cols.length; i++) {
                    col = new DataCol(this._cols[i]);
                    if (col.getVisible()) {
                        x += col.getWidth();
					}	
					if (ctrx < x + 1 && ctrx > x - 3) {
						glGetCanvas().style.cursor = "e-resize";//拉列
						break;
					} else if(ctrx >= x + 1 && ctrx < x + 3){
						if (!col.getVisible()) {
						glGetCanvas().style.cursor = "url('image/icon/split.png'),auto";
						//glGetCanvas().style.cursor = "e-split";//拉列
						break;
						}
					}else{
						glGetCanvas().style.cursor = "default";
					}

					
                }
            } else {
                glGetCanvas().style.cursor = this.getMousecursor();
            }
        }
    }
}

DataGrid.prototype.mouseup = function(e) {

}

DataGrid.prototype.mousewheel = function(e) {

}