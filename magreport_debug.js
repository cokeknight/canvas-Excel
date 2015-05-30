var g_bProcessing = false;
function treeup(pnode,checked){
    var tempnode = pnode;
    if(!checked){
        while(tempnode.parentNode){ 
            tempnode.parentNode.attributes.checked = checked;
            tempnode.parentNode.ui.toggleCheck(checked);
            tempnode = tempnode.parentNode;
        }
    }else{
        while(tempnode.parentNode){
			tempnode = tempnode.parentNode;
			for(var i=0;i<tempnode.childNodes.length;i++){
				if(!tempnode.childNodes[i].attributes.checked)
				{
					break;
				}
			}
			if(i<tempnode.childNodes.length){
				if(tempnode.attributes.checked){
					tempnode.attributes.checked = false;
					tempnode.ui.toggleCheck(false);
				}
			}else{
				if(!tempnode.attributes.checked){
					tempnode.attributes.checked = true;
					tempnode.ui.toggleCheck(true);
				}
			}
		}
    }
}
function treedown(pnode,checked){
    var tempnode = pnode;
    for(var i=0;i<tempnode.childNodes.length;i++){
        if(tempnode.childNodes[i].attributes.checked != checked){
            tempnode.childNodes[i].attributes.checked = checked;
            tempnode.childNodes[i].ui.toggleCheck(checked);
            treedown(tempnode.childNodes[i],checked);
        }
    }
}
function checkchange(pnode,checked){
    g_bProcessing = true;
    treedown(pnode,checked);
    treeup(pnode,checked);
    g_bProcessing = false;
}
Ext.onReady(function(){
	var opt={
		type:'',
		id:'',
		nodeid:'',
		nodetext:'',
		nodeoutid:'',
		nodeouttext:'',
		nodesortid:'',
		othertext:''
	};
	var reportcomloader=new Ext.tree.TreeLoader({
		dataUrl:'reporttree.aspx?mtype=company&flag=false'
	});
	var reportcomasync = new Ext.tree.AsyncTreeNode({
		loader:reportcomloader
	});
	var reportcom = new Ext.tree.TreePanel({
		rootVisible: false,
		height:400,
		autoScroll:true,
		root:reportcomasync
	});
	reportcom.on('checkchange', function(n,checked){
		if(!g_bProcessing){
			checkchange(n,checked);	
		}
	});
	var reportcomform = new Ext.form.FormPanel({
		bodyStyle:'padding:5px',
		items: [reportcom],
		buttons: [{xtype:'button',text:'提交',id:'btnoutcompostreport',listeners:{click:function(btn,e){btnclick(btn,e);}}}]
	});
	var reportcomwin = new Ext.Window({
		closeAction:'hide',
		modal:true,
		width:500,
		autoHeight:true,
		autoScroll:true,
		defaults: {
			anchor:'0',
			labelWidth:70
		},
		items:[reportcomform]
	});
	
	var reportloader=new Ext.tree.TreeLoader({
		dataUrl:'reporttree.aspx?mtype=report&flag=false'
	});
	var reportasync = new Ext.tree.AsyncTreeNode({
		loader:reportloader
	});
	var reporttree = new Ext.tree.TreePanel({
		rootVisible: false,
		root:reportasync
		
	});
	reporttree.on('checkchange', function(n,checked){
		if(!g_bProcessing){
			checkchange(n,checked);	
		}
	});
	var reporttreeform = new Ext.form.FormPanel({
		bodyStyle:'padding:5px',
		items: [reporttree],
		buttons: [{xtype:'button',text:'提交',id:'btnoutpostreport',listeners:{click:function(btn,e){btnclick(btn,e);}}}]
	});
	var reporttreewin = new Ext.Window({
		closeAction:'hide',
		modal:true,
		width:300,
		autoHeight:true,
		autoScroll:true,
		defaults: {
			anchor:'0',
			labelWidth:70
		},
		items:[reporttreeform]
	});
	var tabrtypefield={
		width:300,
		xtype:'combo',
		mode:'local',
		value:'请选择...',
		triggerAction:'all',
		forceSelection:true,
		editable:false,
		msgTarget: 'side',
		fieldLabel:'报表分类',
		id:'tabeditrtype',
		name:'tabeditrtype',
		displayField:'name',
		valueField:'value',
		store:new Ext.data.JsonStore({
			fields : ['name', 'value'],
			data   : [
				{name:'录入报表',value:'1'},
				{name:'统计报表',value:'2'}
			]
		}),
		listeners:{
			select:function(c,r,i){
				if(c.getValue()=="1"){
					Ext.getCmp('tabeditstype').setVisible(true);
				}else if(c.getValue()=="2"){
					Ext.getCmp('tabeditstype').setVisible(false);	
				}
			}
		}
	};
	var tabstypefield={
		width:300,
		xtype:'combo',
		mode:'local',
		value:'请选择...',
		triggerAction:'all',
		forceSelection:true,
		editable:false,
		msgTarget: 'side',
		fieldLabel:'报表类型',
		id:'tabeditstype',
		name:'tabeditstype',
		displayField:'name',
		valueField:'value',
		store:new Ext.data.JsonStore({autoLoad:true,url:'../system/sysreporttimeset.aspx?op=getreportstype',fields:['name','value','type']})
	};
	var tabnamefield={xtype:'textfield',id:'tabeditname',name:'tabeditname',fieldLabel:'报表名称',msgTarget:'side',allowBlank:false,width:300};
	var tabsortfield={xtype:'numberfield',id:'tabeditsort',name:'tabeditsort',fieldLabel:'排序ID',minValue:0,width:300,emptyText:'数字越大排名越前,默认0'};
	var tabmodifyfield={xtype:'checkbox',id:'tabeditflag',name:'tabeditflag',boxLabel:'同步修改报表类型',checked:true};
	
	var tabeditform = new Ext.form.FormPanel({
		bodyStyle:'padding:5px',
		items: [tabrtypefield,tabstypefield,tabnamefield,tabsortfield,tabmodifyfield],
		buttons: [{xtype:'button',text:'提交',id:'btneditpostreport',listeners:{click:function(btn,e){btnclick(btn,e);}}}]
	});
	var tabeditwin = new Ext.Window({
		closeAction:'hide',
		modal:true,
		width:450,
		autoHeight:true,
		autoScroll:true,
		defaults: {
			anchor:'0',
			labelWidth:70
		},
		items:[tabeditform]
	});
	var tabaddfield={
		xtype: 'fieldset',
		autoHeight: true,
		layout: 'form',
		items: [
			//{xtype:'radiogroup',fieldLabel:'报表分类',items:[{boxLabel:'录入报表',id:'tabrtype',inputValue:1,checked:true},{boxLabel:'统计报表',id:'tabrtype',inputValue:2}]},
			//{xtype:'radiogroup',fieldLabel:'报表类型',items:[{boxLabel:'月报',id:'tabstype',inputValue:1,checked:true},{boxLabel:'季报',id:'tabstype',inputValue:2},{boxLabel:'半年报',id:'tabstype',inputValue:3},{boxLabel:'年报',id:'tabstype',inputValue:4}]},
			{
				width:300,
				xtype:'combo',
				mode:'local',
				value:'请选择...',
				triggerAction:'all',
				forceSelection:true,
				editable:false,
				msgTarget: 'side',
				fieldLabel:'报表分类',
				id:'tabrtype',
				name:'tabrtype',
				displayField:'name',
				valueField:'value',
				store:new Ext.data.JsonStore({fields:['name','value'],data:[{name:'录入报表',value:'1'},{name:'统计报表',value:'2'}]}),
//				listeners:{
//					select:function(c,r,i){
//						if(c.getValue()=="1"){
//							Ext.getCmp('tabstype').setVisible(true);
//						}else if(c.getValue()=="2"){
//							Ext.getCmp('tabstype').setVisible(false);	
//						}
//					}
//				}
			},
			//{
//				width:300,
//				xtype:'combo',
//				mode:'local',
//				value:'请选择...',
//				triggerAction:'all',
//				forceSelection:true,
//				editable:false,
//				msgTarget: 'side',
//				fieldLabel:'报表类型',
//				id:'tabstype',
//				name:'tabstype',
//				displayField:'name',
//				valueField:'value',
//				store:new Ext.data.JsonStore({autoLoad:true,url:'../system/sysreporttimeset.aspx?op=getreportstype',fields:['name','value','type']})
//			},
			{xtype:'textfield',id:'tabaddname',name:'tabaddname',fieldLabel:'报表名称',msgTarget:'side',allowBlank:false,width:300},
			{xtype:'numberfield',id:'tabaddsort',name:'tabaddsort',fieldLabel:'排序ID',minValue:0,width:300,emptyText:'数字越大排名越前,默认0'}
		]
	};
	var tabaddform = new Ext.form.FormPanel({
		bodyStyle:'padding:5px',
		items:[tabaddfield],
		buttons:[{xtype:'button',text:'提交',id:'btnaddpostreport',listeners:{click:function(btn,e){btnclick(btn,e);}}}]
	});
	var tabaddwin = new Ext.Window({
		closeAction:'hide',
		modal:true,
		width:450,
		autoHeight:true,
		autoScroll:true,
		defaults: {
			anchor:'0',
			labelWidth:70
		},
		items:[tabaddform]
	});
	var tabloader=new Ext.tree.TreeLoader({
		dataUrl:'reporttree.aspx?mtype=model&flag=false'
	})
	var tabasync = new Ext.tree.AsyncTreeNode({
		loader:tabloader
	});
	var tabtree = new Ext.tree.TreePanel({
		renderTo:'maindiv',
		title: '报表列表',
		autoHeight:false,
		width: 500,
		height:600,
		useArrows:true,
		autoScroll:true,
		animate:true,
		enableDD:false,
		containerScroll:true,
		rootVisible: false,
		frame:false,
		root:tabasync,
		tbar:[
			{xtype:'button',text:'删除报表',id:'btndeltree',listeners:{click:function(btn,e){btnclick(btn,e);}}},
			{xtype:'button',text:'添加报表',id:'btnaddtree',listeners:{click:function(btn,e){btnclick(btn,e);}}},
			{xtype:'button',text:'修改报表',id:'btnedittree',listeners:{click:function(btn,e){btnclick(btn,e);}}},
			{xtype:'button',text:'设计报表',id:'btneditreport',listeners:{click:function(btn,e){btnclick(btn,e);}}},
			{xtype:'button',text:'分发报表目录',id:'btnoutreport',listeners:{click:function(btn,e){btnclick(btn,e);}}},
			{xtype:'button',text:'分发报表公司',id:'btnoutcomreport',listeners:{click:function(btn,e){btnclick(btn,e);}}}
		],
		listeners: {
			'checkchange': function(node, checked){
				if(checked){
					node.getUI().addClass('complete');
				}else{
					node.getUI().removeClass('complete');
				}
			}
		},
		buttons: [{
			text: '刷新列表',
			handler:function(){reloadtabtree(true);}
		}]
	});
	function reloadtabtree(blexp){
		tabasync.reload();
		if(blexp==true){
			tabtree.getRootNode().expand(true);
		}
		tabtree.getSelectionModel().clearSelections();
	}
	function showbox(msgtext){
		Ext.Msg.show({
			title:'提示',
			msg:msgtext,
			buttons:Ext.Msg.OK,
			icon:Ext.MessageBox.INFO
		});
	}
	function showynbox(msgtext){
		Ext.Msg.show({
			title:'提示',
			msg:msgtext,
			//buttons:Ext.Msg.YESNOCANCEL,
			buttons:{yes:'确认',no:'取消'},
			fn:showboxret,
			icon:Ext.MessageBox.QUESTION
		});
	}
	function showboxret(btn){
		if(btn=='yes'){
			switch(opt.id){
				case 'btndeltree':
					break;
				case 'btnedittree':
					break;
				case 'btnaddtree':
					break;
				case 'btneditreport':
					break;
				case 'btnoutreport':
					break;
				case 'btnoutcomreport':
					break;
				case 'btndelposttree':
				case 'btnaddpostreport':
				case 'btnoutpostreport':
				case 'btnoutcompostreport':
				case 'btneditpostreport':
					var myMask = new Ext.LoadMask(Ext.getBody(),{msg:"加载中,请稍候..."});
					myMask.show();
					Ext.Ajax.request({
						url: 'magreport.aspx?opt=req',
						method: 'POST',
						params:{
							opttype:opt.type,
							optid:opt.nodeid,
							optoutid:opt.nodeoutid,
							optoutstr:opt.nodeouttext,
							optsortid:opt.nodesortid,
							optotherstr:opt.othertext
						},
						success: function(response, result){
							myMask.hide();
							if(response.responseText == 'true'){
								if(reporttreewin.isVisible()==true){
									reporttreewin.setVisible(false);
								}else if(tabaddwin.isVisible()==true){
									tabaddwin.setVisible(false);
								}else if(tabeditwin.isVisible()==true){
									tabeditwin.setVisible(false);
									tabstypefield.store.load();
								}else if(reportcomwin.isVisible()==true){
									reportcomwin.setVisible(false);
								}
								showbox('操作成功了。');
								reloadtabtree(true);
							}else{
								showbox('提交出错了。。'+response.responseText);
							}
						},
						failure:function(){
							myMask.hide();
							showbox('服务器响应超时...');
						}
					});
					break;
			}
		}
	}
	function btnclick(btn,e){
		var selectmodel=tabtree.getSelectionModel();
		var selectnode=selectmodel.getSelectedNode();
		switch(btn.id){
			case 'btndeltree':
				var nodeid='';
				var nodeidstr = '';
				var nodetext ='';
				var selNodes = tabtree.getChecked();
				Ext.each(selNodes, function(node){
					if(nodeidstr.length > 0){
						nodeidstr += ',';
					}
					if(nodetext.length > 0){
						nodetext += ',';
					}
					nodeid=node.attributes.customsid;
					nodeidstr += nodeid;
					nodetext += node.text;
				});
				if(selNodes!=null && nodeidstr!=""){
					opt.type="deltab";
					opt.id="btndelposttree";
					opt.nodeid=nodeidstr;
					opt.nodetext=nodetext;
					opt.nodesortid="";
					opt.othertext="";
					showynbox('确认要删除报表：'+nodetext+'吗？');
				}else{
					showbox('请钩选一个或多个要删除的报表');
				}
				break;
			case 'btnedittree':
				if(selectnode!=null){
					var stext=selectnode.attributes.text;
					var sid=selectnode.attributes.id;
					var rtype=selectnode.attributes.customrtype;
					var stype=selectnode.attributes.customstype;
					var sortid=selectnode.attributes.customsortid;
					if(sid.indexOf("card-tabs-")!=-1){
						var nodeid=selectnode.attributes.customsid;
						opt.type="edittab0";
						opt.id=btn.id;
						opt.nodeid=nodeid;
						opt.nodetext=stext;
						opt.nodeoutid=rtype+","+stype;
						opt.nodeouttext="";
						opt.nodesortid=sortid;
						opt.othertext="";
						tabeditform.form.reset();
						tabstypefield.store.load();
						/*
						tabnamefield.value=stext;
						tabeditform.remove('tabeditrtype');
						tabeditform.remove('tabeditstype');
						tabeditform.remove('tabeditname');
						tabeditform.add(tabrtypefield);
						tabeditform.add(tabstypefield);
						tabeditform.add(tabnamefield);
						*/
						var myRecord = Ext.data.Record.create([
						   {name:'tabeditrtype',type:'string'},
						   {name:'tabeditstype',type:'string'},
						   {name:'tabeditname',type:'string'},
						   {name:'tabeditsort',type:'string'}
						]);
						tabeditform.form.loadRecord(new myRecord({
							'tabeditrtype':rtype,
							'tabeditstype':stype,
							'tabeditname':stext,
							'tabeditsort':sortid
						}));
						if(rtype=="1"){
							Ext.getCmp('tabeditstype').setVisible(true);
							Ext.getCmp('tabeditflag').setVisible(true);
						}else if(rtype=="2"){
							Ext.getCmp('tabeditstype').setVisible(false);
							Ext.getCmp('tabeditflag').setVisible(false);
						}
						Ext.getCmp('tabeditflag').setValue(true);
						tabeditwin.setTitle("请输入报表新的名称及参数");
						tabeditwin.show();
					}else{
						showbox('请选择一张报表');
					}
				}else{
					showbox('请选择一个要'+btn.text+'的报表');
				}
				break;
			case 'btnaddtree':
				if(tabtree.root.childNodes.length==0 || tabtree.root.childNodes[0].id.indexOf("reportsys")==-1){
					showbox('没有权限添加报表'); 
				}else{
					opt.type="";
					opt.id="";
					opt.nodetext="";
					opt.nodesortid="";
					opt.othertext="";
					tabaddform.form.reset();
					//Ext.getCmp('tabstype').store.load();
					//Ext.getCmp('tabstype').setVisible(true);
					tabaddwin.setTitle("添加报表");
					tabaddwin.show();
				}
				break;
			case 'btneditreport':
				if(selectnode!=null){
					var stext=selectnode.attributes.text;
					var sid=selectnode.attributes.id;
					if(sid.indexOf("card-tabs-")!=-1){
						var nodeid=selectnode.attributes.customsid;
						if(nodeid!=""){
							var nhref="report/DesignWeb.aspx?nodeid="+nodeid;
							var n=new Ext.tree.TreeNode({
								id:"card-tabs-design"+nodeid,
								text:"编辑["+stext+"]",
								href:nhref,
								attributes:{href:nhref}
							});
							window.parent.g_treePanelclick(n,e,1);
						}else{
							showbox('选择的不是报表');
						}
					}else{
						showbox('请选择一个要'+btn.text+'的节点');
					}
				}else{
					showbox('请选择一张报表');
				}
				break;
			case 'btnaddpostreport':
				if(tabaddform.getForm().isValid()){
					var tabrtype=Ext.getCmp('tabrtype').getValue();
					//var tabstype=Ext.getCmp('tabstype').getValue();
					if(tabrtype=='请选择...' || tabrtype==""){
						Ext.getCmp('tabrtype').markInvalid('没有选择');
						return false;
					}
//					if(tabrtype=="1"){
//						Ext.getCmp('tabstype').markInvalid('没有选择');
//						return false;
//					}
//					if(tabrtype=="2"){
//						tabstype="1";
//					}
					var tabaddname=Ext.getCmp('tabaddname').getValue();
					var tabaddsort=Ext.getCmp('tabaddsort').getValue();
					if(tabaddsort=""){
						tabaddsort=0;
					}
					opt.type="addtab";
					opt.id=btn.id;
					opt.nodeid=tabrtype;
					opt.nodetext="";
					opt.nodeoutid="1";
					opt.nodeouttext=tabaddname;
					opt.nodesortid=tabaddsort;
					opt.othertext="";
					showboxret("yes");
					tabaddwin.hide();
				}
				break;
			case 'btneditpostreport':
				if(tabeditform.get('tabeditname')){
					var tabeditname=tabeditform.get('tabeditname').getValue();
					var tabeditrtype=tabeditform.get('tabeditrtype').getValue();
					var tabeditstype=tabeditform.get('tabeditstype').getValue();
					var tabeditsort=tabeditform.get('tabeditsort').getValue();
					var tabeditflag=tabeditform.get('tabeditflag').getValue();
					
					if(tabeditrtype=="请选择..." || tabeditrtype==""){
						tabeditform.get('tabeditrtype').markInvalid('没有选择');
						return false;
					}
					if(tabeditrtype=="1" && (tabeditstype=="请选择..." || tabeditstype=="")){
						tabeditform.get('tabeditstype').markInvalid('没有选择');
						return false;
					}
					if(tabeditrtype=="2"){
						tabeditstype="1";
					}
					if(tabeditsort==""){
						tabeditsort=0;	
					}
					if(tabeditflag==false){
						tabeditflag="0";
					}else{
						tabeditflag="1";
					}
					var ssoutid=tabeditrtype+","+tabeditstype;
					if((tabeditname!=opt.nodetext && opt.nodetext!="") || (tabeditrtype!="" && tabeditstype!="" && opt.nodeoutid!=ssoutid) || tabeditsort!=opt.nodesortid){
						opt.type="edittab";
						opt.id=btn.id;
						opt.nodeid=opt.nodeid;
						opt.nodeoutid=ssoutid;
						opt.nodeouttext=tabeditname;
						opt.nodesortid=tabeditsort;
						opt.othertext=tabeditflag;
						showynbox('确认要修改报表['+opt.nodetext+']的信息吗？');
					}else{
						tabeditwin.hide();
					}
				}
				break;
			case 'btnoutreport':
				if(selectnode!=null){
					var stext=selectnode.attributes.text;
					var sid=selectnode.attributes.id;
					if(sid.indexOf("card-tabs-")!=-1){
						var nodeid=selectnode.attributes.customsid;
						if(nodeid!=""){
							opt.type="out0";
							opt.id=btn.id;
							opt.nodeid=nodeid;
							opt.nodetext=stext;
							opt.nodeoutid="";
							opt.nodeouttext="";
							opt.nodesortid="";
							opt.othertext="";
							reportloader.dataUrl='reporttree.aspx?mtype=report&flag='+opt.nodeid;
							reportasync.reload();
							reporttreewin.setTitle("请选择要分发["+stext+"]的目录");
							reporttreewin.setPosition(200,100);
							reporttreewin.show();
							reporttreewin.doLayout();
							reporttree.getRootNode().expand(true);
						}else{
							showbox('选择的不是报表');
						}
					}else{
						showbox('请选择一张报表');
					}
				}else{
					showbox('请选择一张报表');
				}
				break;
			case 'btnoutpostreport':
				var nodeid='';
				var nodeidstr = '';
				var nodetext ='';
				var selNodes = reporttree.getChecked();
				Ext.each(selNodes, function(node){
					if(node.id.indexOf("card-tabs-")!=-1){
						if(nodeidstr.length > 0){
							nodeidstr+=',';
						}
						if(nodetext.length > 0){
							nodetext+=',';
						}
						nodeid=node.id.replace("card-tabs-","");
						nodeidstr+=nodeid;
						nodetext+=node.text;
					}
				});
				if(selNodes!=null && nodeidstr!="" && opt.nodeid!=""){
					opt.type="outtabadd";
					opt.id=btn.id;
					opt.nodeoutid=nodeidstr;
					opt.nodeouttext=nodetext;
					opt.nodesortid="";
					opt.othertext="";
					showynbox('确认要分发报表['+opt.nodetext+']到['+opt.nodeouttext+']中吗？');
				}else{
					if(opt.nodeid==""){
						showbox('请返回选择要分发的报表');
					}else{
						opt.type="outtabdel";
						opt.id=btn.id;
						opt.nodeoutid="";
						opt.nodeouttext="";
						opt.nodesortid="";
						opt.othertext="";
						showynbox('确认要删除报表['+opt.nodetext+']的所有分发目录吗？');
					}
				}
				break;
			case 'btnoutcomreport':
				if(selectnode!=null){
					var stext=selectnode.attributes.text;
					var sid=selectnode.attributes.id;
					if(sid.indexOf("card-tabs-")!=-1){
						var nodeid=selectnode.attributes.customsid;
						if(nodeid!=""){
							opt.type="out0";
							opt.id=btn.id;
							opt.nodeid=nodeid;
							opt.nodetext=stext;
							opt.nodeoutid="";
							opt.nodeouttext="";
							opt.nodesortid="";
							opt.othertext="";
							reportcomloader.dataUrl='reporttree.aspx?mtype=company&flag='+opt.nodeid;
							reportcomasync.reload();
							reportcomwin.setTitle("请选择要分发["+stext+"]的公司");
							reportcomwin.setPosition(200,100);
							reportcomwin.show();
							reportcomwin.doLayout();
							reportcom.getRootNode().expand(true);
						}else{
							showbox('选择的不是报表');
						}
					}else{
						showbox('请选择一张报表');
					}
				}else{
					showbox('请选择一张报表');
				}
				break;
			case 'btnoutcompostreport':
				var nodeid='';
				var nodeidstr = '';
				var nodetext ='';
				var selNodes = reportcom.getChecked();
				Ext.each(selNodes, function(node){
					if(node.id.indexOf("card-tabs-")!=-1){
						if(nodeidstr.length > 0){
							nodeidstr+=',';
						}
						if(nodetext.length > 0){
							nodetext+=',';
						}
						nodeid=node.id.replace("card-tabs-","");
						nodeidstr+=nodeid;
						nodetext+=node.text;
					}
				});
				if(selNodes!=null && nodeidstr!="" && opt.nodeid!=""){
					opt.type="outtabcomadd";
					opt.id=btn.id;
					opt.nodeoutid=nodeidstr;
					opt.nodeouttext=nodetext;
					opt.nodesortid="";
					opt.othertext="";
					showynbox('确认要分发报表['+opt.nodetext+']到['+opt.nodeouttext+']中吗？');
				}else{
					if(opt.nodeid==""){
						showbox('请返回选择要分发的报表');
					}else{
						opt.type="outtabcomdel";
						opt.id=btn.id;
						opt.nodeoutid="";
						opt.nodeouttext="";
						opt.nodesortid="";
						opt.othertext="";
						showynbox('确认要删除报表['+opt.nodetext+']的所有分发公司吗？');
					}
				}
				break;
		}
	}
	reloadtabtree(true);
});
