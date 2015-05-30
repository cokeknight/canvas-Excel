<?php
	//遍历目录下的文件 
function read_dir_all($dir,$action='') { 

	$ret = array('dirs'=>array(), 'files'=>array()); 
	#文件类型
	$confile = array('js');//array('png','jpg','gif');
	#是否是目录
	if(!is_dir( $dir )){
		return $ret;
	}
	
	if ($handle = opendir($dir)) { 
	
		while (false !== ($file = readdir($handle))) {
		
			if($file != '.' && $file !== '..') { 
			
				$cur_path = $dir .'/'.$file; 
				#后缀名必须是jpg，png，gif,
				$file_extre = explode(".", $cur_path);
				$filesort = array_pop($file_extre);
				if(!in_array(strtolower($filesort),$confile)){
					continue;
				}	
					
				if(is_dir($cur_path)) { 
				
					#递归调用
					$ret['dirs'][$cur_path] = read_dir_all($cur_path); 
					
				} else{
				
					$ret['files'][] = $cur_path; 
				} 
			}
		} 
		
		closedir($handle); 
	
	} 
	return $ret; 
}

$filelist = read_dir_all('lib');
$filelist = $filelist['files'];
$tempfile='';
$filelist = array("lib/Tcommon.js",
				  "lib/pp-global.js",
				  "lib/pp-window.js",
				  "lib/pp-component.js",
				  "lib/pp-datagrid.js",
				  "lib/pp-datagrid2.js",
				  "lib/pp-datagrid3.js",
				  "lib/pp-datacell.js",
				  "lib/pp-scroll.js",
				  "lib/pp-column.js",
				  "lib/pp-menuitem.js",
				  "lib/pp-menu.js",
				  "lib/pp-extdatagrid.js",
				  "lib/pp-row.js",
				  "lib/pp-json.js",
				  "lib/pp-leftbar.js",
				  "lib/pp-dragimg.js",
				  "lib/script_calendar.js"	,
				  "lib/chart.js"					);
foreach( $filelist as $key => $value){
	$tempfile.=	file_get_contents($filelist[$key])."\n";
}
if(file_exists('lib/chinaexcel.js')){
	unlink('lib/chinaexcel.js');
}
file_put_contents('lib/chinaexcel.js',$tempfile."\n"."window.onload = function()
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
");
?>