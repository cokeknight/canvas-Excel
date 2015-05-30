<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
<!--apple-->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!--apple-->
<title>ChinaExcel HTML5 版</title>
<meta name="Description" content="采用HTML5技术来展现ChinaExcelWeb控件的所有功能，从而实现报表的跨平台应用，包括手机，平板电脑以及IPAD等移动终端上的业务需求。"/>
<link href="css/css.css" rel="stylesheet" />
<?php

$filename=!empty($_GET['filename'])?$_GET['filename']:'';
if(!empty($filename)){
	?>	
	<script type="text/javascript">
    var _gl_filename="<?php echo $filename;?>";
    </script>
	<?php
}else{
	?>	
	<script type="text/javascript">
    var _gl_filename;
    </script>
    <?php
}
?>

</head>

<body style="width:1032px; margin:0px">
</body>
</html>
<script type="text/javascript" src="lib/Tcommon.js"></script>
<script type="text/javascript" src="lib/pp-global.js"></script>
<script type="text/javascript" src="lib/pp-window.js"></script>
<script type="text/javascript" src="lib/pp-component.js"></script>
<script type="text/javascript" src="lib/pp-datagrid.js"></script>
<script type="text/javascript" src="lib/pp-datagrid2.js"></script>
<script type="text/javascript" src="lib/pp-datagrid3.js"></script>
<script type="text/javascript" src="lib/pp-datacell.js"></script>
<script type="text/javascript" src="lib/pp-scroll.js"></script>
<script type="text/javascript" src="lib/pp-column.js"></script>
<script type="text/javascript" src="lib/pp-menuitem.js"></script>
<script type="text/javascript" src="lib/pp-menu.js"></script>
<script type="text/javascript" src="lib/pp-extdatagrid.js"></script>
<script type="text/javascript" src="lib/pp-row.js"></script>
<script type="text/javascript" src="lib/pp-json.js"></script>
<script type="text/javascript" src="lib/pp-leftbar.js"></script>

<script type="text/javascript" src="lib/pp-dragimg.js" defer="defer"></script>
<script type="text/javascript" src="lib/script_calendar.js" defer="defer"></script>

<script type="text/javascript" src="lib/chart.js" defer="defer"></script>
<script type="text/javascript" src="lib/RGraph.common.core.js" ></script>
<script type="text/javascript" src="lib/RGraph.common.tooltips.js" ></script>
<script type="text/javascript" src="lib/RGraph.common.dynamic.js" ></script>
<script type="text/javascript" src="lib/RGraph.pie.js" ></script>
<script type="text/javascript" src="lib/RGraph.bar.js" ></script>
<script type="text/javascript" src="lib/RGraph.line.js" ></script>
<script type="text/javascript" src="lib/RGraph.drawing.yaxis.js" ></script>
<script type="text/javascript" src="lib/RGraph.common.key.js" ></script>
<script type="text/javascript" src="lib/RGraph.hbar.js" ></script>
<script type="text/javascript" src="lib/RGraph.funnel.js" ></script>
<script type="text/javascript" src="lib/RGraph.vprogress.js" ></script><script type="text/javascript">
window.onload = function()
{
	
	
	borderWidth=1;	
	var data={};
	if(typeof arguments[0]==='string'){
		data={width:800,height:550,x:0,y:0,localStorageName:arguments[0]};	
	}else
	{
		data={width:800,height:550,x:0,y:0};	
	}
	glInit({width:800,height:550});
	var datagrid = new ExtDataGrid(data);
	//var scrolldemo = new ScrollBar({x:0,y:0,dirType:'y',length:400,scrollBarLength:50});
	var app = new Window({width:800,height:550,comItems:[datagrid]});
	app.setVisible(true);
	glRun(app);
	

}
</script>
