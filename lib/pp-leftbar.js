// JavaScript Document
var leftbar = function (mainDiv, leftbarjson, dataGrid) {
    var _this = this;
    this.grid = dataGrid;
    this.left_table = mainDiv.getElementsByTagName("ul").item(0);

    this.left_tablechild = mainDiv.getElementsByTagName("div").item(0).getElementsByTagName("div").item(0);

    this.add_sheet = this.left_table.getElementsByTagName("a").item(1);

    this.config = leftbarjson;

    this.inital();

    this.nextsibling = function(elm) {
        var nextelm = elm.nextSibling;
        if (nextelm.nodeName.toUpperCase() === '#TEXT') {
            nextelm = nextelm.nextSibling;
        }
        return nextelm;
    }

    this.add_sheet.addEventListener("click",function(event) {return _this.addnewoptionbox("添加新类", _this,undefined,event)},false); //添加类别 box 弹出框
	var ulelm = this.ulelm = '';
    if (this.left_tablechild.childNodes[1] !== undefined) {
        var ulelm = this.ulelm = this.left_tablechild.childNodes[1].childNodes;
	}
	
    for (var i = 0; i < ulelm.length; i++) {
        if (ulelm[i].className.indexOf('left-table01') !== -1) {
            if (ulelm[i].getElementsByTagName("div").item(0) !== null) ulelm[i].getElementsByTagName("div").item(0).style.display = 'none';
            ulelm[i].onclick = function() {
                var meinv = this;
                if (this.getElementsByTagName("div").item(0) !== null) {
					var img = this.getElementsByTagName("span").item(0),
						imgClass = T.html.getClass(img);
					if(imgClass .indexOf('elbow-minus-nl')!==-1){
						T.html.setClass(this.getElementsByTagName("span").item(0),'elbow-plus-nl');
					}else{
						T.html.setClass(this.getElementsByTagName("span").item(0),'elbow-minus-nl');
					}
					if (this.getElementsByTagName("div").item(0).style.display === 'none') {
                        this.style.background='#fff';
						this.getElementsByTagName("div").item(0).style.display = 'block';
                    } else {
						var childs = this.parentNode.childNodes;
						for(var i=0;i<childs.length;i++){
							childs[i].style.background='#fff';
						}
						this.style.background='#eeeeee';
                        this.getElementsByTagName("div").item(0).style.display = 'none';
                    }
                }
				clearCeng("myContextMenu");
            }
        }
    }
    mainDiv.onclick = function(event) {
        var meinv = event.srcElement ? event.srcElement: event.target;
        if (meinv.nodeName.toUpperCase() === 'A') {
            if (meinv.name === 'parent') {
                var nextelm = meinv.parentNode.parentNode.parentNode.nextSibling;
                if (nextelm.nodeName.toUpperCase() === '#TEXT') nextelm = nextelm.nextSibling;
                if (nextelm.style.display === 'none') {
                    nextelm.style.display = 'block';
					T.html.setClass(meinv.parentNode.parentNode.getElementsByTagName('span').item(0),'icon4');
                } else {
                    nextelm.style.display = 'none';
					T.html.setClass(meinv.parentNode.parentNode.getElementsByTagName('span').item(0),'icon3');
                }
            } else {
				//var now=new Date(); 
				//var number = now.getYear().toString()+now.getMonth().toString()+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString();
                dataGrid.importxml('upload/' + meinv.name + '.xjc');
            }
        } else if (meinv.nodeName.toUpperCase() === 'SPAN') {

        }
    }
    return mainDiv;
}

leftbar.prototype = {
	
	removeClass : function(obj){
			var ullist =obj.getElementsByTagName("div").item(0).childNodes;

			for(var i=0;i<ullist.length;i++){
				if(ullist[i].getElementsByTagName("div").item(0)==null){
					ullist[i].className = ullist[i].className.replace(/ bt_select/,'');	
				}else{
					if(ullist[i].getElementsByTagName("div").item(0).style.display==='block'){
						var childs = ullist[i].getElementsByTagName("div").item(0).childNodes;
						for(var j=0;j<childs.length;j++){
							if(childs[j]['data-type'] === 'parent'){
								arguments.callee(childs[j]);	
							}else{
								childs[j].className = childs[j].className.replace(/ bt_select/,'');	
							}
						}
					}
				}
			} 
		},

    inital: function() {
        var listoption = function(_this, option) {
            var _this = _this;
            var elm = document.createElement("div");
            
            if (T.isEmptyObject(option) === false && option !== '') {
                for (var i = 0; i < option.length; i++) {
                    var tempul = document.createElement("ul");
                    tempul.className = 'left-table01';

                    tempul.style = 'display:block';
					
                    if (option[i].type !== undefined) {

                        if (option[i].type === 'parent') {

                            tempul.innerHTML = '<span class ="elbow-plus-nl"></span><span class ="folder"></span>';

                            tempul.className = 'left-table02 parent';
							tempul['data-type']='parent';
                            tempul.style.marginLeft = 5 + "px";
                            tempul.onclick = function(event) {
                                if (this.getElementsByTagName("div").item(0) !== null) {
									var img = this.getElementsByTagName("span").item(0),
										imgClass = T.html.getClass(img);
									if(imgClass .indexOf('elbow-minus-nl')!==-1){
										T.html.setClass(this.getElementsByTagName("span").item(0),'elbow-plus-nl');
									}else{
										T.html.setClass(this.getElementsByTagName("span").item(0),'elbow-minus-nl');
									}
                                    if (this.getElementsByTagName("div").item(0).style.display === 'none') {
                                        this.getElementsByTagName("div").item(0).style.display = 'block';
                                    } else {
                                        this.getElementsByTagName("div").item(0).style.display = 'none';
                                    }
                                }
								clearCeng("myContextMenu");
                                preventDefault(event);
                            }
							
							if(!T.isEmptyObject(option[i].child)){
								listoption(_this, option[i].child);	
							}
                        } else if (option[i].type === 'child') {
							
							if(_gl_filename !== option[i].name+'.xjc'){
								elm.style.display = 'none';
							}else{
							
								elm.style.display = 'block';
								
							}
                            
                            tempul.innerHTML = '<span class="leaf"></span>';
                            tempul.className = 'left-table02 child';
							tempul['data-type']='child';
                            tempul.name = option[i].name;
                            tempul.style.marginLeft = 5 + "px";
                            tempul.onclick = function(event) {
								_this.removeClass(_this.left_tablechild,this);
								if(this.className.indexOf('bt_select')===-1){//存在
									this.className+=' bt_select';
									var meinv = event.srcElement ? event.srcElement: event.target;
									
									_this.grid._editBox.style.display = "none";
									_this.grid.importxml('html/upload/' + this.name + '.xjc');
								}
								preventDefault(event);
								clearCeng("myContextMenu");
                            }
                            tempul.onmousedown = function(event) {
                                preventDefault(event);
                            }
                        }
                    } else {
                        tempul.innerHTML = '<span class ="elbow-plus-nl"></span><span class ="folder"></span>';
                        tempul.className = 'left-table01 parent';

                    }
                    var tempspan = document.createElement("span");
                    if (option[i].type === 'child') {
						
                        tempspan.innerHTML = "<a name=" + option[i].name + ">" + option[i].name + "</a>";
                    } else {
                        tempspan.innerHTML = option[i].name;
                    }
				 	var tempeditoption = document.createElement("span");
					
					if(option[i].type === 'child'){
						if(option[i].raw !== 1){
							
							tempeditoption.innerHTML='<em class="s_b_del_icon"> </em>';
							tempeditoption.title='删除';
							tempeditoption.addEventListener("click",function(event) {return _this.ulelmdel(_this,event)},false);
						}else{
							tempul.setAttribute("raw",1); // 设置  	
						}
					}else{
						tempeditoption.innerHTML='<em id="s_b_settings_icon"> </em>';
						tempeditoption.addEventListener("click",function(event) {return _this.ulelmClick(_this,event)},false);
					} 
            		tempspan.appendChild(tempeditoption);

                    tempul.appendChild(tempspan);

                    if (option[i].child !== undefined) {
                        tempul.appendChild(listoption(_this, option[i].child));
                    }

                    if (tempul.className !== 'left-table02 child') {
                    }
                    elm.appendChild(tempul);

                } //for
            } //if
            return elm;
        };
        if (T.isEmptyObject(this.config) === false && this.config !== '') {
            var _this = this;

            this.left_tablechild.appendChild(listoption(_this, this.config));
        }

    },
    add_option: function(html,node,type){
        var _this = this;
		var node= String(node);
        var getNewelm=function(html,type){
			var filename =html;
			var tempul = document.createElement("ul");
			
			if (type === 'parent') { //文件夹类型
				tempul.innerHTML = '<span class ="elbow-plus-nl"></span><span class ="folder"></span>';
				tempul.className = 'left-table01 parent';
				if(node !== '-1')tempul.style.marginLeft = 5 + "px";
			
			} else if (type === 'child') {
				
				tempul.style.marginLeft = 5 + "px";
				tempul.innerHTML = '<span class="leaf"></span>';
				tempul.className = 'left-table02 child';
			}
		    tempul.style = 'display:block';

			var tempspan = document.createElement("span");
			if (type === 'child') {
				tempspan.innerHTML = "<a name=" + html + ">" + html + "</a>";
			} else {

				tempspan.innerHTML = html;
			}
			var tempeditoption = document.createElement("span");
			
			if(type === 'child'){
				tempeditoption.innerHTML='<em class="s_b_del_icon"> </em>';
				tempeditoption.title='删除';
				tempeditoption.addEventListener("click",function(event) {return _this.ulelmdel(_this,event)},false);
			}else{
				tempeditoption.innerHTML='<em id="s_b_settings_icon"> </em>';
				tempeditoption.addEventListener("click",function(event) {return _this.ulelmClick(_this,event)},false);
			} 
				
			tempspan.appendChild(tempeditoption);
			
			tempul.appendChild(tempspan);
			
			tempul.onclick = function() {
				return function(){
					if(type === 'parent'){
						if (this.getElementsByTagName("div").item(0) !== null) {
							var img = this.getElementsByTagName("span").item(0),
								imgClass = T.html.getClass(img);
							if(imgClass .indexOf('elbow-minus-nl')!==-1){
								T.html.setClass(this.getElementsByTagName("span").item(0),'elbow-plus-nl');
							}else{
								T.html.setClass(this.getElementsByTagName("span").item(0),'elbow-minus-nl');
							}
							if (this.getElementsByTagName("div").item(0).style.display === 'none') {
								this.getElementsByTagName("div").item(0).style.display = 'block';
							} else {
								this.getElementsByTagName("div").item(0).style.display = 'none';
							}
						}
						clearCeng("myContextMenu");
						preventDefault(event);
					}else if(type === 'child'){
						_this.removeClass(_this.left_tablechild,this);

						if(this.className.indexOf('bt_select')===-1){//存在
							this.className+=' bt_select';
							var meinv = event.srcElement ? event.srcElement: event.target;
							_this.grid._editBox.style.display = "none";
							_this.grid.importxml('html/upload/' + html + '.xjc');
						}
						preventDefault(event);
						clearCeng("myContextMenu");
					}
				}
			}(filename);
			tempul.onmousedown = function(event) {

				preventDefault(event);
			}
			
		    return tempul;
		};
		
		if( node === '-1'){
			
			this.left_tablechild.getElementsByTagName("div").item(0).appendChild(getNewelm(html,type));	
		}else if(node.indexOf('-')===-1){
			var child = this.left_tablechild.getElementsByTagName("div").item(0);
			if(child.childNodes[node].getElementsByTagName("div").item(0)===null){
				child.childNodes[node].appendChild(document.createElement("div"));	
			}
			child.childNodes[node].getElementsByTagName("div").item(0).appendChild(getNewelm(html,type));
		}else if(node.indexOf('-')!==-1){
			
			var nodes = node.split('-');
			var i=0,elm=this.left_tablechild.getElementsByTagName("div").item(0);
			
			var getelm=function(elm , nodes){
				while(nodes[i]!==undefined){
					if(elm.childNodes[nodes[i]].getElementsByTagName("div").item(0)!==null){
						elm = elm.childNodes[nodes[i]].getElementsByTagName("div").item(0);
					}else{
						elm=elm.childNodes[nodes[i]].appendChild(document.createElement("div"));	
					}
					i++;	
				}
				return elm;
			};
			
			elm = getelm(elm , nodes);
			elm!==null?elm.style.display='block':null;
			elm.appendChild(getNewelm(html,type));
		}
    },
	deleteOption:function(node){
		if(String(node).indexOf('-')===-1){
			var childs=this.left_tablechild.getElementsByTagName("div").item(0);
			
			this.left_tablechild.getElementsByTagName("div").item(0).removeChild(childs.childNodes[node]);			
		}else if(String(node).indexOf('-')!==-1){
			var nodes = node.split('-');
			var i=0,elm=this.left_tablechild.getElementsByTagName("div").item(0);
			var getelm=function(elm , nodes){
				while(nodes[i]!==undefined){
					if(i === nodes.length-1){
						elm = elm.childNodes[nodes[i]];
						break;	
					}
					elm = elm.childNodes[nodes[i]].getElementsByTagName("div").item(0) === null?elm.childNodes[nodes[i]]:elm.childNodes[nodes[i]].getElementsByTagName("div").item(0);
					i++;
				}
				return elm;
			};
			
			elm = getelm(elm , nodes);
			
			elm.parentNode.removeChild(elm);
	
	    }
	},
    left_tablechildclick: function(event) {
        var meinv = this.left_table;
        if (this.nextsibling(meinv).style.display == 'none') {
			T.html.setClass(meinv.getElementsByTagName('span').item(0),'icon3');
            this.nextsibling(meinv).style.display = 'block';

        } else if (this.nextsibling(meinv).style.display == 'block') {
			T.html.setClass(meinv.getElementsByTagName('span').item(0),'icon4');
            this.nextsibling(meinv).style.display = 'none';
        }
    },
    getNode: function(ulelm, meinv) {
        var getfirstchild = function(elm, node) {
            var childs = elm.childNodes;
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].nodeName.toUpperCase() !== node) {
                    childs.removeChild(childs[i]);
                }
            }
            return childs;
        }
        for (var k = 0; k < ulelm.length; k++) {
            var node = '';
            if (ulelm[k] === meinv) {
                node = k;
                return node;
            } else {
                node += k + '-';
                var divs = ulelm[k].getElementsByTagName("div");
                for (var j = 0; j < divs.length; j++) {
                    var tempk = this.getNode(getfirstchild(divs[j], "UL"), meinv);
                    if (tempk !== '' && tempk !== undefined) {
                        node += tempk;
                        return node;
                    }

                }

            }

        }
    },
    ulelmClick: function(handle,event) {
			var _this = handle;
			clearCeng('myContextMenu');
			var eve = event || window.event;
            var meinv = eve.srcElement ? eve.srcElement: eve.target;
            var menu = new ClickMenuItem(eve);
            var menuItem = [{
                'itemText': '导入',
                'ev': function() {
                    var parent = meinv,
                    type = '';
                    if (meinv.nodeName.toUpperCase() === 'SPAN') {
                        meinv = parent = parent.parentNode
                    }else{
						meinv = parent = parent.parentNode.parentNode.parentNode;	
					}
                    var value = parent.getElementsByTagName("span").item(1).innerHTML;

                    var ulelm = _this.ulelm;

                    var node = _this.getNode(ulelm, meinv);

                    clearCeng('myContextMenu');

                    var menuItem = {
                        'itemText': '导入chinaexcel xjc文件',
                    };
					
                    var menu = new uploadImg(menuItem, _this.grid, node,function(html){
																			if(html.indexOf('.xjc')===-1){
																				html+='.xjc';	
																			}
																			_gl_filename=html;
																			html=html.replace('.xjc','');
																			_this.add_option(html,node,'child');
																			
																		});
					
                    menu.rendhtml();

                }
            },
            {
                'itemText': '删除',
                'ev': function() {
					
					
                    var parent = meinv,
                    type = '';
					
					
                    if (meinv.nodeName.toUpperCase() === 'SPAN') {
                        meinv = parent = parent.parentNode
                    }else{
						meinv = parent = parent.parentNode.parentNode.parentNode;	
					}
					
					var ullist = meinv.getElementsByTagName("ul");
					
					if(_this.getRaw(ullist)){
						alert("不允许删除该类别");
						return false;	
					}
                    var value = parent.getElementsByTagName("span").item(1);
					
                    var ulelm = _this.ulelm,filename='';
                    var node = _this.getNode(ulelm, meinv);
					if(meinv.className.indexOf('child')!==-1){
						type= 'child';	
						filename=value.getElementsByTagName("a").item(0).innerHTML;
					}else if(meinv.className.indexOf('parent')!==-1){
						type= 'parent';	
					}
					
					
                    var url = 'html/lib/leftbar.php?node=' + node + '&op=delete&type='+type+'&filename='+encodeURIComponent(filename);
                    var response = T.ajax.ajaxGet(url);
                    if (response === 'SUCCESS') {
                       _this.deleteOption(node);
                    	localStorage.removeItem(filename);
                    } else {
                        alert(response);
                    }

                    clearCeng('myContextMenu');

                }
            },
            {
                'itemText': '添加新类',
                'ev': function() {
                    var parent = meinv,
                    type = '';
                    if (meinv.nodeName.toUpperCase() === 'SPAN') {
                        meinv = parent = parent.parentNode
                    }else{
						meinv = parent = parent.parentNode.parentNode.parentNode;	
					}
                    var value = parent.getElementsByTagName("span").item(1).innerHTML;

                    var ulelm = _this.ulelm;
				
                    var node = _this.getNode(ulelm, meinv);
                    _this.addnewoptionbox("添加新工作表类别", _this, "html/lib/leftbar.php?type=parent&op=add&node=" + node,event);
                } //parent 类 
            },
            {
                'itemText': '添加新表',
                'ev': function() {
                    var parent = meinv,
                    type = '';
                    if (meinv.nodeName.toUpperCase() === 'SPAN') {
                        meinv = parent = parent.parentNode
                    }else{
						meinv = parent = parent.parentNode.parentNode.parentNode;	
					}
                    var value = parent.getElementsByTagName("span").item(1).innerHTML;

                    var ulelm = _this.ulelm;
					
                    var node = _this.getNode(ulelm, meinv);
                    _this.addnewoptionbox("工作表名称", _this, "html/lib/leftbar.php?type=child&op=add&node=" + node);
                } //parent 类 
            }];
            menu.addItem(menuItem);
            menu.addMenuTo(meinv);
			preventDefault(event);
    },
	getRaw:function(list){
		var lists = convertToArray(list);
		for(var i=0,len=lists.length;i<len;i++){
			if(lists[i].attributes["raw"] && lists[i].attributes["raw"].nodeValue == 1){
				return true;	
			}	
		}	
		return false;
	},
	ulelmdel:function(handle,event){
        var _this = handle;
        clearCeng('myContextMenu');
        var eve = event ? event: window.event;
        var meinv = eve.srcElement ? eve.srcElement: eve.target;
			var parent = meinv,
			type = '';
			if (meinv.nodeName.toUpperCase() === 'SPAN') {
				meinv = parent = parent.parentNode
			}else{
				meinv = parent = parent.parentNode.parentNode.parentNode;	
			}
			var value = parent.getElementsByTagName("span").item(1);

			var ulelm = _this.ulelm,filename='';
			var node = _this.getNode(ulelm, meinv);
			if(meinv.className.indexOf('child')!==-1){
				type= 'child';	
				filename=value.getElementsByTagName("a").item(0).innerHTML;
			}else if(meinv.className.indexOf('parent')!==-1){
				type= 'parent';	
			}
			var url = 'html/lib/leftbar.php?node=' + node + '&op=delete&type='+type+'&filename='+encodeURIComponent(filename);
			var response = T.ajax.ajaxGet(url);
			if (response === 'SUCCESS') {
			   _this.deleteOption(node);
			} else {
				alert(response);
			}
			preventDefault(event);
			clearCeng('myContextMenu');
	},
	getUrlParameter:function(url,parameter){
			if(url.indexOf(parameter+'=')){
				var parameter = parameter+'=';
				var parameterStartAt=	url.indexOf(parameter);
				var parameterEndsAt =   url.indexOf("&", parameterStartAt+1)!==-1? url.indexOf("&", parameterStartAt+1) : url.length;
				
				return url.substring(parameterStartAt+parameter.length,parameterEndsAt);
			}	
	},
	resetList:function(){
		        document.getElementById("maincontent").innerHTML = T.ajax.ajaxGet('../lib/htmllib/leftbar.html');
                var now = new Date();
                var number = now.getYear().toString() + now.getMonth().toString() + now.getDate().toString() + now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();;

                var leftbarjson = T.ajax.ajaxGetJson("html/leftbar.js?" + number);
                if (leftbarjson !== '') {
                    leftbarjson = eval('(' + leftbarjson + ')');
                }
                new leftbar(document.getElementById("maincontent"), leftbarjson);
	},
    addnewoptionbox: function(title, handle, url,event) {
        var _this = handle,eve = event ? event: window.event;
        var url = url;
        clearCeng('myContextMenu');
        var menuItem = {
            'itemText': title,
            'itemsm': 'string',
            'itermtype': 'input',
            'boxheight': '120px'
        };
        var menu = new customizeCell(menuItem, '',
        function() {
            var value = document.getElementById(this.itemsm).value;
            if (url !== undefined) {
                url = url + '&value=' + value;
            } else {
                url = 'html/lib/leftbar.php?type=parent&op=add&node=' + -1 + '&value=' + value;
            }
			var type=_this.getUrlParameter(url,'type');
			var node=_this.getUrlParameter(url,'node');
			var html=_this.getUrlParameter(url,'value');
            var response = T.ajax.ajaxGet(url);
            if (response === 'SUCCESS') {
                _this.add_option(html,node,type);


            } else {
                alert(response);
            }
            clearCeng('myContextMenu');
        });
        menu.rendhtml();

        preventDefault(eve);

    }

};
