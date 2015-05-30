// JavaScript Document
var parseXjc = function(jsonstr) {
    this.json = jsonstr;
    //this._netChartVisible = this.json.netChartVisible;
    this._rows = [];
    this._cols = [];
    this._cells = [];
    this.defaultrowslength = 18;
    this.defaultcolslength = 8;

    this.defaultrowheight = 20;
    this.defaultcolwidth = 70;
    this.defaultCellswty = 0;

    this.defaultCellhag = 0;
    this.defaultCellvag = 6;
    this.defaultFontSize = this.getDafaultFontSize();

    this.datagrid = {};
	this.general={};
		this.print={};
		this.defaultcell={};
    this.gattributes = this.json.f1.general.attributes; //general属性
    
	this.pattributes = this.json.f1.print; //general属性
	this.brlist = this.json.f1.brlist; //general属性
	this.drawobjs = this.json.f1.drawobjs; //general属性
	
	
	this.rattributes = this.json.f1.rowproperty; //row属性
    this.colattributes = this.json.f1.colproperty; //col属性
    this.defattributes = this.json.f1.defaultcell; //default属性
    this.cellattributes = this.json.f1.celllist; //cell属性
    this.parseGattributes(this.gattributes); //解析general属性
   
    this.parsePattributes(this.pattributes); //解析print属性
   
   
  this.parsebrlist(this.brlist); //解析brlist属性
  
  this.parserowproperty(this.rattributes); //解析rowproperty属性
  this.parsecolproperty(this.colattributes); //解析colproperty属性
  
   this.parseftlist(this.json.f1.ftlist); //解析brlist属性
   
   this.parsepenlist(this.json.f1.penlist); //解析brlist属性
    this.parseImgattributes(this.imglist); //解析general属性
	
	this.parseDrawobjattributes(this.drawobjs); //解析drawobjs属性
	
	this.parseRattributes(this.gattributes); //解析row属性
    this.parseColattributes(this.colattributes); //解析row属性
    this.parseDefattributes(this.defattributes); //解析default属性
    this.parseCellattributes(this.cellattributes); //解析cell属性

}
parseXjc.prototype = {
	parserowproperty:function(prototype){
		this.datagrid["_rowproperty"]=[];
		if(prototype!==undefined){
			if(prototype.obj.length === undefined){
				this.datagrid["_rowproperty"].push({});
				for(var p in prototype.obj.attributes){
					this.datagrid["_rowproperty"][0][p]=prototype.obj.attributes[p];	
				}
			}else{
				for(var i=0;i<prototype.obj.length;i++){
					this.datagrid["_rowproperty"].push({});
					for(var p in prototype.obj[i].attributes){
						this.datagrid["_rowproperty"][i][p]=	prototype.obj[i].attributes[p];	
					}	
				}	
			}
		}
	},
	parsecolproperty:function(prototype){
		this.datagrid["_colproperty"]=[];
		if(prototype!==undefined){
			if(prototype.obj.length === undefined){
				this.datagrid["_colproperty"].push({});
				for(var p in prototype.obj.attributes){
					this.datagrid["_colproperty"][0][p]=prototype.obj.attributes[p];	
				}
			}else{
				for(var i=0;i<prototype.obj.length;i++){
					this.datagrid["_colproperty"].push({});
					for(var p in prototype.obj[i].attributes){
						this.datagrid["_colproperty"][i][p]=	prototype.obj[i].attributes[p];	
					}	
				}	
			}
		}
	},
	parseImgattributes:function(prototype){
		if(prototype===undefined)return;
		var obj=prototype.obj;
		var imglist=[];
		if(obj.length!==undefined){
			for(var i=0;i<obj.length;i++){
				imglist.push({
					'width':obj[i].attributes.width,
					'height':obj[i].attributes.height,
					'src':obj[i].attributes.src
					});	
			}	
		}else{
			imglist.push({
					'width':obj.attributes.width,
					'height':obj.attributes.height,
					'src':obj.attributes.src
					});	
		}
		
		this.datagrid['_imglist']=imglist;
	},
	parseDrawobjattributes:function(prototype){
		if(prototype===undefined)return;
		var obj=prototype.obj;
		var list=this.expend(obj);
		
		this.datagrid['_chartattribute']=list;
	},
	expend:function(obj){
		var list={};
		if(obj instanceof Array){
			list=[];
			if(obj.length!==undefined){
				for(var i=0;i<obj.length;i++){
					if(typeof obj[i] === 'object'){
						list.push(this.expend(obj[i]));
					}else{
						list.push(obj[i]);	
					}
				}	
				
			}
		}else{
			for(var p in obj){
				if(p === 'attributes'){
					for(var i in obj[p]){
						list[i]=obj[p][i];
					}
				}else{
					list[p]=this.expend(obj[p]);
					
				}	
			}	
		}
		return list;
	},
	parsepenlist:function(prototype){
		if(prototype===undefined)return;
		var obj=prototype.obj;
		var penlist=[];
		if(obj.length!==undefined){
			for(var i=0;i<obj.length;i++){
				penlist.push({
					'style':obj[i].attributes.style,
					'widx':obj[i].attributes.widx,
					'color':this.getcolor(obj[i].attributes.color)
					});	
			}	
		}else{
			penlist.push({
					'style':obj.attributes.style,
					'widx':obj.attributes.widx,
					'color':this.getcolor(obj.attributes.color)
					});	
		}
		
		this.datagrid['_penlist']=penlist;
	},
	parseftlist:function(prototype){
		if(prototype===undefined)return;
		var obj=prototype.obj;
		var ftlist=[];
		if(obj.length!==undefined){
			for(var i=0;i<obj.length;i++){
				ftlist.push(obj[i].attributes);	
			}	
		}else{
			ftlist.push(obj.attributes);	
		}
		
		this.datagrid['_ftlist']=ftlist;
	},
	parsebrlist:function(prototype){
		if(prototype===undefined)return;
		var obj=prototype.obj;
		var brlist=[];
		if(obj.length!==undefined){
			for(var i=0;i<obj.length;i++){
				if(obj[i].attributes!==undefined){
					brlist.push(this.getcolor(obj[i].attributes.color));
				}else{
					brlist.push('');		
				}	
			}	
		}else{
			brlist.push(this.getcolor(obj.attributes.color||''));	
		}
		
		this.datagrid['_brlist']=brlist;
	},
    getDafaultFontSize: function() {
		if(this.json.f1.ftlist!== undefined){
			if (this.json.f1.ftlist.obj.length !== undefined) {
				if (this.json.f1.ftlist.obj[0].attributes.hei !== undefined) {
					return - parseInt(this.json.f1.ftlist.obj[0].attributes.hei);
				} else {
					return 10;
				}
			} else {
				if (this.json.f1.ftlist.obj.attributes.hei !== undefined) {
					return - parseInt(this.json.f1.ftlist.obj.attributes.hei);
				} else {
					return 10;
				}
			}
		}else{
			return 10;	
		}
    },
    parsePattributes: function(attributes) {
		  for (p in attributes) {
				
				this.print[p] =  attributes[p].attributes;  
		  }
	},
    parseGattributes: function(attributes) {
        for (p in attributes) {
			
			this.datagrid["_"+p] =  attributes[p];
            
			if (p === 'totalrow') {
                this.datagrid['_rowsNum']=this.defaultrowslength = attributes[p]; //默认行数
            }
            if (p === 'totalcol') {
               this.datagrid['_colsNum']= this.defaultcolslength = attributes[p]; //默认列数
            }
            if (p === 'showgrid') {
                this.datagrid._netChartVisible = false;
            }
            if (p === 'showheader') {
                this.datagrid._offsetX = 0;
                this.datagrid._offsetY = 0;
            }
            if (p === 'statscript') {
                this.datagrid._StatisticScript = attributes[p];
            }
            if (p === 'colheadheight') {
				if(attributes[p] !== '0')
                this.datagrid['_offsetX']=this.defaultrowheight = attributes[p]; //默认行高
            }
            if (p === 'rowheadwidth') {
				if(attributes[p] !== '0')
                this.datagrid['_offsetY']=this.defaultcolwidth = attributes[p]; //默认列宽
            }
            if (p === 'tagvalue') {
                if ((attributes[p] >> 16) & 0x01) {
                    if (attributes.selbkcolor !== undefined) {
                        this.datagrid._selLineAll = {
                            "on": true,
                            "color": this.getcolor(attributes.selbkcolor)
                        };
                    } else {
                        this.datagrid._selLineAll = {
                            "on": true,
                            "color": this.getcolor(attributes.selbkcolor)
                        };
                    }
                }else{
					 this.datagrid._selLineAll = {
                            "on": false,
                            "color": this.getcolor(attributes.selbkcolor)
                        };
				}
            }
        }
		if(attributes['showheader']===undefined){
			this.datagrid['_offsetX'] = this.datagrid['_offsetX'] || 40;
			this.datagrid['_offsetY'] = this.datagrid['_offsetY'] || 20;
		}
		
		this.datagrid['_colsNum'] = this.datagrid['_colsNum'] || 8;
        this.datagrid['_rowsNum'] = this.datagrid['_rowsNum'] || 18;
    },
    parseRattributes: function(attributes) {
        for (i = 0; i < this.defaultrowslength; i++) {
            this._rows.push({});
            if (this.json.f1.rowproperty !== undefined) {
                if (this.json.f1.rowproperty.obj.length !== undefined) {
					//默认的行属性 行高
					if (this.defaultrowheight !== '') {
					   
						this._rows[i].height = parseInt(this.defaultrowheight, 10); //默认高度
				   
					}
                    for (var k = 0; k < this.json.f1.rowproperty.obj.length; k++) {
						var temprow = parseInt(this.json.f1.rowproperty.obj[k].attributes.lineval, 10);
                        if (parseInt(this.json.f1.rowproperty.obj[k].attributes.lineval, 10) === (i + 1)) {//设定的 行属性
                            var height = parseInt(this.json.f1.rowproperty.obj[k].attributes.linesize, 10),
								attributes = this.json.f1.rowproperty.obj[k].attributes;
                            if (height !== '' && height!==0) {
                                this._rows[i].height = height;//linsize 不为0这样取消隐藏，可以恢复为原来的行 为0时，则取消隐藏就不能恢复原来的大小了
                           
						    } else if (this.defaultrowheight !== '') {
                               
							    this._rows[i].height = parseInt(this.defaultrowheight, 10); //默认高度
                          
						    }
							//奇偶行变色
							if (k % 2 !== 0 && this.json.f1.rowproperty.obj[k].attributes.evenbkcolor !== undefined) {
								var color = this.json.f1.rowproperty.obj[k].attributes.evenbkcolor;
								color = this.getcolor(color);
								this._rows[i].color = color;
							} else if (k % 2 === 0 && this.json.f1.rowproperty.obj[k].attributes.oddbkcolor !== undefined) {
								var color = this.json.f1.rowproperty.obj[k].attributes.oddbkcolor;
								color = this.getcolor(color);
								this._rows[i].color = color;
							}
						
                            var tagval = parseInt(this.json.f1.rowproperty.obj[k].attributes.tagval, 10);//行的可见性
                            var tag = (tagval >> 9) & 0x01;
                            if (tag) this._rows[i].visible = false;
							for(var p in attributes){
								this._rows[i][p] = attributes[p];	
							}
                        }
					  }
                } else //无length
                {
                    var temprow = parseInt(this.json.f1.rowproperty.obj.attributes.lineval, 10),
						attributes =this.json.f1.rowproperty.obj.attributes ;
                    if (this.json.f1.rowproperty.obj.attributes.evenbkcolor !== undefined) {
                        var color = this.json.f1.rowproperty.obj.attributes.evenbkcolor;
                        color = this.getcolor(color);
                        this._rows[i].color = color;
                    }
                    if (temprow === (i + 1)) {//存在
						var height  = parseInt(this.json.f1.rowproperty.obj.attributes.linesize, 10);
						if (height !== '' && height!==0) {
							this._rows[i].height = height;	
						}else {
                        this._rows[i].height = parseInt(this.defaultrowheight, 10);;
                   	    }
						
                    } else {
                        this._rows[i].height = parseInt(this.defaultrowheight, 10);;
                    }
					for(var p in attributes){
						this._rows[i][p] = attributes[p];	
					}
					

                }
            } else { //无rowproperty
                if (this.defaultrowheight != '') {
                    this._rows[i].height = parseInt(this.defaultrowheight, 10); //默认高度
                }
            }
        }
    },
    parseColattributes: function(attributes) {
        for (i = 0; i < this.defaultcolslength; i++) {
            this._cols.push({});
            if (this.json.f1.colproperty !== undefined) {
                if (this.json.f1.colproperty.obj.length !== undefined) {
					//默认的列属性 列宽
					if (this.defaultcolwidth !== '') {
					   
						this._cols[i].width = parseInt(this.defaultcolwidth, 10); //默认高度
				   
					}
				    for (var k = 0; k < this.json.f1.colproperty.obj.length; k++) {//设定的 列属性
                        if (parseInt(this.json.f1.colproperty.obj[k].attributes.lineval, 10) === (i + 1)) {

							for(var p in this.json.f1.colproperty.obj[k].attributes){
								if(p === 'linesize'){
									
									var width = parseInt(this.json.f1.colproperty.obj[k].attributes.linesize, 10);

									if (width !== '' && width !== 0) {
										this._cols[i].width = width;
									} else if (this.defaultcolwidth !== '') {
										this._cols[i].width = parseInt(this.defaultcolwidth, 10);;
									}
									continue;
								}
								this._cols[i][p]=this.json.f1.colproperty.obj[k].attributes[p];
							}
                            var tagval = parseInt(this.json.f1.colproperty.obj[k].attributes.tagval, 10);//列的可见性
                            var tag = (tagval >> 9) & 0x01;
                            if (tag || this.json.f1.colproperty.obj[k].attributes.linesize==="0") this._cols[i].visible = false;
							

                        }
                    }
                } else //无length
                {
					 var tempcol= parseInt(this.json.f1.colproperty.obj.attributes.lineval, 10);
                    if (tempcol === (i + 1)) {//存在
						for(var p in this.json.f1.colproperty.obj.attributes){
							if(p === 'linesize'){
								this._cols[i].width = parseInt(this.json.f1.colproperty.obj.attributes.linesize, 10); //默认宽度
								continue;
							}
							this._cols[i][p]=this.json.f1.colproperty.obj.attributes[p];
						}
                    } else {
                        this._cols[i].width = parseInt(this.defaultcolwidth, 10);;
                    }
				   
					
                }
            } else {//无colproperty
                if (this.defaultcolwidth != '') {
                    this._cols[i].width = parseInt(this.defaultcolwidth, 10); //默认宽度
                }
            }
        }
    },
    parseDefattributes: function(obj) {
		var attributes=obj.attributes;
	    for (p in attributes) {
			this.datagrid["_"+p] =  attributes[p];  
	    }
    },
    isPrototype: function(prototype, pos) {
        return (prototype >> pos) & 0x01;
    },
    setPrototype: function(someFunction, someArgument) {
        return someFunction(someArgument);
    },
    setfl: function(prototype, cl) {
        var prototype = parseInt(prototype, 10);
        var _borderline = '',
        _frozenCell = true,
        _autoLineFeed = false,
        _controlsItem = '',
		_visible=true;
        if (this.isPrototype(prototype, 0)) {
            _frozenCell = false;
        }
        if (this.isPrototype(prototype, 2)) {
            _visible = false;
        }
        if (this.isPrototype(prototype, 4)) {
            _borderline = "left";
        }
        if (this.isPrototype(prototype, 5)) {
            _borderline = _borderline === '' ? "top": _borderline += "-" + "top";
        }
        if (this.isPrototype(prototype, 6)) {
            _borderline = _borderline === '' ? "right": _borderline += "-" + "right";
        }
        if (this.isPrototype(prototype, 7)) {
            _borderline = _borderline === '' ? "bottom": _borderline += "-" + "bottom";
        }
        if (this.isPrototype(prototype, 8)) {
            _autoLineFeed = true;
        }
        if (this.isPrototype(prototype, 9)) {
            _controlsItem = {
                'type': 'number',
				edit:true
            };
        }
        if (this.isPrototype(prototype, 10)) {
            var editable = this.setnoedit[parseInt(cl.cellcheck.attributes.noedit, 10)];

            var checked = parseInt(cl.cellcheck.attributes.ckd, 10);
            checked === 0 ? checked = false: checked = true;
            _controlsItem = {
                'type': 'radiobutton',
                'edit': editable,
                'status': checked
            };
        }
        if (this.isPrototype(prototype, 11)) {
			var newwin=cl.cellurl.attributes.newwin!==undefined?cl.cellurl.attributes.newwin:'';
            _controlsItem = {
                'type': 'url',
				'newwin':newwin
				//edit:true
            };
        }
        if (this.isPrototype(prototype, 15)) //财务表览
        {
            _controlsItem = {
                'type': 'financialmain',
                'edit': true
            };
        }

        if (this.isPrototype(prototype, 12)) {
            var dropvalue = [];
            if (cl.clco.it1 !== undefined) {
                if (cl.clco.it1.length !== undefined) { //数组
                    for (var i = 0; i < cl.clco.it1.length; i++) {
                        dropvalue.push({
                            'key': cl.clco.it1[i].attributes.val,
                            'value': cl.clco.it2[i].attributes.val
                        });
                    }
                } else {
                    dropvalue.push({
                        'key': cl.clco.it1.attributes.val,
                        'value': cl.clco.it2.attributes.val
                    });
                }
            }
            _controlsItem = {
				'tagval':cl.clco.attributes.tagval,
                'type': 'dropdownbox',
                edit: true,
                'value': dropvalue
            };
        }
        if (this.isPrototype(prototype, 13)) {
            var timestyle = this.setdwstyle[cl.cldt.attributes.dwstyle];
            _controlsItem = {
                'type': 'time',
                edit: false,
                'value': timestyle
            };
        }

        return {
            "borderline": _borderline,
            "frozenCell": _frozenCell,
            "autoLineFeed": _autoLineFeed,
            "controlsItem": _controlsItem,
			"visible":_visible
        };
    },
    settag: function(prototype) {
        var prototype = parseInt(prototype, 10);
        var _cellImage = _controlsItem = _cellTag = '';
        if (this.isPrototype(prototype, 0)) {
            _controlsItem = {
                'type': 'financialhead',
                'edit': true
            };
        }
        if (this.isPrototype(prototype, 3)) {
            _cellImage = {
                "type": "cell"
            };

        }
        if (this.isPrototype(prototype, 4)) {
            _cellImage = {
                "type": "cell",
                "size": "origin"
            };

        }
        if (this.isPrototype(prototype, 5)) {
            _cellImage = {
                "type": "3Dbox",
                "edit": true
            };

        }

        if (this.isPrototype(prototype, 15)) {
            _cellImage = {
                "type": "cell",
                "size": "imgsize"
            };

        }
        if (this.isPrototype(prototype, 11)) {
            _cellTag = {
                "superscript": true,
                "edit": true
            }; //上下标
        }
        return {
            "cellImage": _cellImage,
            "controlsItem": _controlsItem,
            "cellTag": _cellTag
        };

    },

    setslty: function(prototype) {
        var _slantline = '';
        prototype = parseInt(prototype, 10);
        switch (prototype) {
        case 0:
            _slantline = 'none';
            break;
        case 1:
            _slantline = "slantline";
            break;
        case 2:
            //上对角线
            _slantline = "tslantline";
            break;
        case 3:
            _slantline = "bslantline";
            break;
        case 4:
            //横线
            _slantline = "cslantline";
            break;
        case 5:
            //竖线
            _slantline = "vslantline";
            break;
        case 6:
            //动态竖线
            _slantline = "bvslantline";
            break;
        case 7:
            //动态横线
            _slantline = "bcslantline";
            break;
        case 8:
            //反对角线
            _slantline = "aslantline";
            break;
        default:

        }

        return {
            "slantline":
            _slantline
        };
    },

    setftid: function(obj, i, j) {
        if (obj.attributes.hei !== undefined) {
            this._cells[i][j].fontSize = -parseInt(obj.attributes.hei, 10);
        } else {
            this._cells[i][j].fontSize = 10;
        }
        if (obj.attributes.wei !== undefined) {
            this._cells[i][j].fontBold = true;
        }
        if (obj.attributes.fname !== undefined) {
            this._cells[i][j].fontFamily = obj.attributes.fname;
        }
        if (obj.attributes.uline !== undefined) {
            this._cells[i][j].fontUnderline = true;
        }
    },

    setnoedit: {
        "1": false,
        "0": true
    },

    setdwstyle: {
        "0": "longtime",
        "1": "shortdate",
        "2": "time",
        "3": "timedate",
        "4": ""
    },

    sethag: {
        "0": "left",
        "6": "center",
        "2": "right"
    },
    //水平
    setvag: {
        "0": "top",
        "6": "middle",
        "8": "bottom"
    },
    //垂直
    setborderstyle: {
        "0": "default",
        "1": "dashed",
        "2": "dotted",
        "3": "butt",
        "4": "bbut"
    },

    setswty: {
        "0": "default",
        "11": "9",
        "12": "10",
        "13": "11",
        "14": "12",
        "15": "13",
        "16": "14"
    },

    getcolor: function(color) {
        var color = parseInt(color, 10).toString(16);
        if (color.length === 6) {
            return "#" + color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
        } else if(color.length===2){
			color='0000'+color;
			return "#" + color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
	   }else if(color.length===4){
	   		color='00'+color;
			return "#" + color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
	   }else if(color.length===1){
	   		if(color==="0"){
				return "#000000";	
			}
	   }else{
		   return "#" + color;
       }
    },
	getClco:function(obj){
		  var clcos={};
		  for(var p in obj.attributes){
			  clcos[p]=obj.attributes[p];	
		  }
		  if(T.object.getPrototypeNum(obj)>1){
			  clcos['childs']=[];
			  if (obj.it1.length !== undefined) { //数组
				  for (var i = 0; i < obj.it1.length; i++) {
					  clcos['childs'].push({
						  'key': obj.it1[i].attributes.val,
						  'value': obj.it2[i].attributes.val
					  });
				  }
			  } else {
					  clcos['childs'].push({
						  'key': obj.it1.attributes.val,
						  'value': obj.it2.attributes.val
					  });
			  }
		  }
		  return clcos;
	},
    parseCellattributes: function(obj) {
        this._cells = [];

        for (i = 0; i < this.defaultrowslength; i++) {
            this._cells.push(new Array());
            for (j = 0; j < this.defaultcolslength; j++) {
                this._cells[i].push({});
            }
        }
		
        if (obj.row !== undefined) {
			
				for (var k = 0 ,len = obj.row.length||1; k < len; k++) {
					obj.row.length ===undefined ? obj.row[k]= obj.row:null;
					if (obj.row[k].cl !== undefined) {
						if (obj.row[k].cl.length !== undefined) {
							for (var h = 0; h < obj.row[k].cl.length; h++) {
								
	//							if(!obj.row[k].cl[h]){
	//								this._cells[this.json.f1.celllist.row[k].attributes.val - 1][h]={};
	//								continue;	
	//							}
								var attributes = obj.row[k].cl[h].attributes;
								var cl=obj.row[k].cl[h];
								var i = this.json.f1.celllist.row[k].attributes.val - 1,
								j = attributes.col - 1;
								for (var p in attributes) {
									if(p==='imagetype'){
										this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]['cellImage']={'imagetype':attributes['imagetype'],'filename':attributes['imagedata'],
										'width':attributes['imagewidth'],'height':attributes['imageheight'],'length':attributes['imagelen']};	
										continue;
									}
									if(p === 'imagelen' || p==='imagewidth' || p==='imageheight' || p==='imagedata' )continue;
									if(p ==='note' || p === 'lscript'){attributes[p]=attributes[p].replace(/&/g,'%101');}
									this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1][p] = attributes[p];	
									
								}
								if(cl.cellurl!==undefined){
									this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["cellurl"]=this.getClco(cl.cellurl);
									
								}
								if(cl.clco!==undefined){
									this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["clco"]=this.getClco(cl.clco);
									
								}
								if(cl.cellcheck!==undefined){
									this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["cellcheck"]=this.getClco(cl.cellcheck);
								}
								if(cl.cellbutton!==undefined){
									this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["cellbutton"]=this.getClco(cl.cellbutton);
								}
						   }
						} else if (this.json.f1.celllist.row[k].cl.length === undefined) {
							var cl = this.json.f1.celllist.row[k].cl;
							var attributes = this.json.f1.celllist.row[k].cl.attributes;
	
							for (var p in attributes) {
								if(p==='imagetype'){
									this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]['cellImage']={'imagetype':attributes['imagetype'],'filename':attributes['imagedata'],
									'width':attributes['imagewidth'],'height':attributes['imageheight'],'length':attributes['imagelen']};	
										continue;
									}
									if(p === 'imagelen' || p==='imagewidth' || p==='imageheight' || p==='imagedata' )continue;
									if(p ==='note' || p === 'lscript'){attributes[p]=attributes[p].replace(/&/g,'%101');}
								if(p ==='note' || p === 'lscript'){attributes[p]=attributes[p].replace(/&/g,'%101');}
								this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1][p] = attributes[p];
							} //for
							if(cl.cellurl!==undefined){
								this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["cellurl"]=this.getClco(cl.cellurl);
								
							}
							if(cl.clco!==undefined){
								this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["clco"]=this.getClco(cl.clco);
								
							}
							if(cl.cellcheck!==undefined){
								this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["cellcheck"]=this.getClco(cl.cellcheck);
							}
							if(cl.cellbutton!==undefined){
								this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["cellbutton"]=this.getClco(cl.cellbutton);
							}
	
						} //cl.length
				}
			}
		}else{
			
		}
    }

}
var Json=function(json){
	var json = eval('(' + json + ')');
	return {
		getJson:function(){return json},
		findItem:function(obj,json){
			for(k in json){
				if(json[k].name ===obj ){
					return json[k].raw;
				}else{
					return arguments.callee(obj,json[k]['child']);
				}
			}
		}
	}	
}
var exportXml = function(dataGrid) {

var leftbarjson=T.ajax.ajaxGetJson("html/leftbar.js",undefined,false);
if(leftbarjson!==''){
	leftbarjson= Json(leftbarjson);
}
	
var isEdit = leftbarjson.findItem(_gl_filename.slice(0,-4),leftbarjson.getJson());
if(isEdit === 1){alert('模板文件,无法修改');return;}

var General=["caneditform","rowheadwidth","colheadheight","showgrid","showheader","totalcol","totalrow","vermajor","verminor","tableimage","backimage",
			 "pacolor","maxeditrow","maxeditcol","showformula","protecthascursor","dclicklabelsort","propertiy","printgrid","fixedcols",
			 "printhcalign","printvcalign","designmode","showmenu","loadscript","data","userfuncs","genscript","savedb","hiderowdrag",
			 "tagvalue","tagval2","titlerows","selbkcolor","calscript","calscripttype","cursorwidth","sysdbsource","prefooterrows","pfooterrows",
			 "gridcolor","gridtype","statscript","errmsgbox","pagerows","useado","allowrowresize","allowcolresize","autojump","sheetname",
			 "rowautosize"];	
 var Defaultcell=["swty","hag","vag"];  
 
 var Rowproperty=["tagval","tagval2","lineval","linesize","type","text","val","childval","oddbkcolor","evenbkcolor","oddtcolor","eventcolor"];
 var Colprototype=[];
	function xmlToJson(xml) { 
		// Create the return object 
		var obj = {};
		
		if (xml.nodeType == 1) { // element 
			// do attributes 
			if (xml.attributes.length > 0) {
				obj["@attributes"] = {};
				for (var j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
		} else if (xml.nodeType == 3) { // text 
			obj = xml.nodeValue;
		}
		
		// do children 
		if (xml.hasChildNodes()) {
			for (var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = xmlToJson(item);
				} else {
					if (typeof(obj[nodeName].length) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(xmlToJson(item));
				}
			}
		}
		return obj;
	};
	function rscConvert(string){
		var replaces={  "<" :"&lt;",
						">" :"&gt;",
						"\n" : "&#x0D;&#x0A;",
						"&":"&amp;",
						'"':"&quot;",
						"'":'&apos;'};
		var tempstring='';			 
		for(var i=0;i<string.length;i++){
			if(string[i] in  replaces){
				tempstring+=	replaces[string[i]];
			}	else{
				tempstring+=string[i];
			}
		}	
		
		return tempstring;
	}
	function insertCellElm(eml,config){
		var clco=xmldoc.createElement("clco");
			for(p in config){
				if(p === 'childs'){
					for(var i =0;i<config[p].length;i++){
						
						var it1=xmldoc.createElement("it1");
						it1.setAttribute("val",config[p][i]['key']);
						var it2=xmldoc.createElement("it2");
						it2.setAttribute("val",config[p][i]['value']);		
						clco.appendChild(it1);
						clco.appendChild(it2);
						
					}
					continue;	
				}
				clco.setAttribute(p,config[p]);	
			}
		eml.appendChild(clco);
	}
	function insertCellElm1(eml,config,name){
		var clco=xmldoc.createElement(name);
		for(p in config){
			clco.setAttribute(p,config[p]);	
		}
		eml.appendChild(clco);
	}
	function setCellPrototype(elm,config){
		var cellp = ["tag","fl","flex","brid","dpt","ftid","tpenid","bpenid","lpenid","rpenid","hag","vag","swty","spenid","t",'cellImage',
"cellbutton",
					 "tcor","bcor","slty","bname","f","rows","cols","uval","sval","tspan","lspan","lkspan","rspan","bspan","rowspan",
					 "colspan","note","lscript","lexcel","ldata","cmscript","input","tip","barcode","bkeffect","bkgranularity","bkmidcr"
					 ,"bkendcr","cellcheck","cellurl","clcobtn","clco","cldt"];	
		var cellcheckp=["ckd","noedit"];
		var cellurlp=["url","newwin"];
		var clcop=["tagval","itcount","valcount"];
		var cldtp=["dwstyle","year","mon","day","hour","min","sec"];
		for(var i=0;i<cellp.length;i++){
			if(cellp[i] in config){
				
				if(cellp[i] === "cellImage") {
					elm.setAttribute('imagetype',config[cellp[i]].imagetype);
					elm.setAttribute('imagelen',config[cellp[i]].length);	
					elm.setAttribute('imagewidth',config[cellp[i]].width);	
					elm.setAttribute('imageheight',config[cellp[i]].height);	
					elm.setAttribute('imagedata',config[cellp[i]].filename);
					continue;	
				}
				if(cellp[i]==='clco') {insertCellElm(elm,config[cellp[i]]);continue;}
				if(cellp[i]==='cellurl' || cellp[i]==='cellcheck' || cellp[i]==='cldt' || cellp[i] === 'cellbutton'){insertCellElm1(elm,config[cellp[i]],cellp[i]);continue;}

				elm.setAttribute(cellp[i],config[cellp[i]]);	
			}
			
		}
		
	}
	function get16str(color){
		if(typeof color==='number')color=String(color);
		var str=color.substring(1);	
		str=str[4] + str[5] + str[2] + str[3] + str[0] + str[1];
		return parseInt(str,16);
	}
	var xmldoc, xmlnode; 

    xmldoc = document.implementation.createDocument("", "chinaexcel", null);
	var f1 = xmldoc.createElement("f1");
		var general= document.createElement("general");
		for(var i=0;i<General.length;i++){
			if("_"+General[i] in dataGrid){
				//if(General[i] === "userfuncs" || General[i] ==="statscript") {
					//dataGrid["_"+General[i]] = rscConvert(dataGrid["_"+General[i]]);
					//var newCDATA = xmldoc.createCDATASection(dataGrid["_"+General[i]]);
					//newCDATA=(new XMLSerializer()).serializeToString(newCDATA);
					//general.appendChild(newCDATA);
					
					//general.setAttribute(General[i],"<![CDATA["+dataGrid["_"+General[i]]+"]]>");		
				//}else{
				if(General[i] === 'showgrid' && dataGrid["_"+General[i]] === 1 ){
					continue;
				}
				if(General[i] === 'showheader' && dataGrid["_"+General[i]] === 1 ){
					continue;
				}
				general.setAttribute(General[i],dataGrid["_"+General[i]]);	
				//}
			}
		}
		general.setAttribute("totalrow",dataGrid["_rowsNum"]);
		general.setAttribute("totalcol",dataGrid["_colsNum"]);
		
		//general.setAttribute('align','right');
		var print = xmldoc.createElement("print");
		for(var p in dataGrid.print){
			var print_child=xmldoc.createElement(p);
			print_child.InnerXml='';
				for(var i in dataGrid.print[p]){
					print_child.setAttribute(i,dataGrid.print[p][i]);		
				}
			print.appendChild(print_child);
		}
		
		
		var defaultcell=xmldoc.createElement("defaultcell");
		for(var i=0;i<Defaultcell.length;i++){
			if("_"+Defaultcell[i] in dataGrid){
				defaultcell.setAttribute(Defaultcell[i],dataGrid["_"+Defaultcell[i]]);	
			}
		}
		var celllist = xmldoc.createElement("celllist");
		celllist.setAttribute('writebyrow','1');
		for(var i=0;i<dataGrid._cells.length;i++){
			
				var row =  xmldoc.createElement("row");	
				row.setAttribute('val',i+1);
				for(var j=0;j<dataGrid._cells[i].length;j++){
					var cell = new DataCell(dataGrid._cells[i][j]);
					if(!T.isEmptyObject(dataGrid._cells[i][j]) && cell.ifPaint()){
						var cl = 	xmldoc.createElement("cl");	
						cl.setAttribute('col',j+1);
						setCellPrototype(cl,dataGrid._cells[i][j]);
						row.appendChild(cl);
					}else{
						
						continue;	
					}
				}
			
			celllist.appendChild(row);
		}	
		
		if(dataGrid['_ftlist'] !== undefined){
			var ftlist=xmldoc.createElement("ftlist");
			for(var i=0;i<dataGrid['_ftlist'].length;i++){
				var ftlist_obj=xmldoc.createElement("obj");
				for(var p in dataGrid['_ftlist'][i]){
					ftlist_obj.setAttribute(p,dataGrid['_ftlist'][i][p]);
				}
				ftlist.appendChild(ftlist_obj);
			}
		}
		
		var imglist=xmldoc.createElement("imglist");
		for(var i=0;i<dataGrid['_imglist'].length;i++){
			var imglist_obj=xmldoc.createElement("obj");
			for(var p in dataGrid['_imglist'][i]){
		    	imglist_obj.setAttribute(p,dataGrid['_imglist'][i][p]);
			}
			imglist.appendChild(imglist_obj);
		}
		
		if(dataGrid['_brlist'] !== undefined){
			var brlist=xmldoc.createElement("brlist");
			for(var i=0;i<dataGrid['_brlist'].length;i++){
				var brlist_obj=xmldoc.createElement("obj");
				brlist_obj.setAttribute("color",get16str(dataGrid['_brlist'][i]));
				brlist.appendChild(brlist_obj);
			}
		}
		var rendXml =function(data,name){
			var temp = xmldoc.createElement(name);
			for(var p in data){
				if(typeof data[p] !=='object'){
					temp.setAttribute(p,data[p]);
				}else{
					
					temp.appendChild(rendXml(data[p],p));	
				}
			}
			return temp;

		}
		if(dataGrid['_chartattribute'] !== undefined){
			var rule = dataGrid['_chartattribute'];
			var chart=xmldoc.createElement("drawobjs");
			chart.appendChild(rendXml(rule,"obj"));
		}
		
		if(dataGrid['_penlist'] !== undefined){
			var penlist=xmldoc.createElement("penlist");
			for(var i=0;i<dataGrid['_penlist'].length;i++){
				var penlist_obj=xmldoc.createElement("obj");
				for(var p in dataGrid['_penlist'][i]){
					if(p ==='color'){
						penlist_obj.setAttribute(p,get16str(dataGrid['_penlist'][i][p]));
						continue;	
					}
					penlist_obj.setAttribute(p,dataGrid['_penlist'][i][p]);
				}
				penlist.appendChild(penlist_obj);
			}
		}
		
		if(dataGrid['_rows'] !== undefined){
			var rowproperty=xmldoc.createElement("rowproperty");
			for(var i=0;i<dataGrid['_rows'].length;i++){
				if(dataGrid['_rows'][i].linesize!==undefined){
					var rowproperty_obj=xmldoc.createElement("obj");
						rowproperty_obj.setAttribute("tagval",dataGrid['_rows'][i].tagval);
						rowproperty_obj.setAttribute("tagval2",dataGrid['_rows'][i].tagval2);
						rowproperty_obj.setAttribute("lineval",i+1);
						rowproperty_obj.setAttribute("linesize",dataGrid['_rows'][i].height);
						rowproperty_obj.setAttribute("type",dataGrid['_rows'][i].type);
						rowproperty_obj.setAttribute("tagval",dataGrid['_rows'][i].tagval);
						rowproperty_obj.setAttribute("text",dataGrid['_rows'][i].text);
						rowproperty.appendChild(rowproperty_obj);
				}
				
			}
		}
		
		if(dataGrid['_cols'] !== undefined){
			var colproperty=xmldoc.createElement("colproperty");
			for(var i=0;i<dataGrid['_cols'].length;i++){
				if(dataGrid['_cols'][i].linesize!==undefined){
					var colproperty_obj=xmldoc.createElement("obj");
						colproperty_obj.setAttribute("tagval",dataGrid['_cols'][i].tagval || 160);
						colproperty_obj.setAttribute("tagval2",dataGrid['_cols'][i].tagval2);
						colproperty_obj.setAttribute("lineval",i+1);
						colproperty_obj.setAttribute("linesize",dataGrid['_cols'][i].width);
						colproperty_obj.setAttribute("type",dataGrid['_cols'][i].type);
						colproperty_obj.setAttribute("text",dataGrid['_cols'][i].text);
						colproperty.appendChild(colproperty_obj);
				}
				
			}
		}
		
		f1.appendChild(general);
		f1.appendChild(print);
		f1.appendChild(defaultcell);
		f1.appendChild(celllist);
		if(chart !== undefined)f1.appendChild(chart);
		if(ftlist !== undefined)f1.appendChild(ftlist);
		if(brlist !== undefined)f1.appendChild(brlist);
		if(penlist !== undefined)f1.appendChild(penlist);
		if(imglist.childNodes.length !== 0)f1.appendChild(imglist);
		
		if(rowproperty.childNodes.length !== 0)f1.appendChild(rowproperty);
		if(colproperty.childNodes.length !== 0)f1.appendChild(colproperty);

	var json  = xmlToJson(f1);
	json='{"f1":'+JSON.stringify(json).replace(/@attributes/g,'attributes')+'}';
	xmldoc.documentElement.appendChild(f1);

	 
    xmldoc=(new XMLSerializer()).serializeToString(xmldoc);
	var ss =/((.+?)\.xjc)(\.js)?/g.test(_gl_filename);
	var filename = RegExp.$1;
					
	var box = T.html.loading(800,540,228,48,document.getElementById("mainleft"));
	
	T.ajax.ajaxPost("html/lib/saveXmlFile.php?filename="+encodeURIComponent(filename),xmldoc,
			function(){					
					var ss =/((.+?)\.xjc)\.js/g.test(_gl_filename);
					var filename = RegExp.$1;
					if (localStorage.getItem(filename)) {
						localStorage.setItem(filename, json);
					}
					clearCeng('myContextMenu');
					clearCeng(box);
					alert('保存成功');

				}(json),true
	);

}
