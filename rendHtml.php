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
<script type="text/javascript">
function createXHR(){
            if (typeof XMLHttpRequest != "undefined"){
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined"){
                if (typeof arguments.callee.activeXString != "string"){
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                                    "MSXML2.XMLHttp"],
                        i, len;
            
                    for (i=0,len=versions.length; i < len; i++){
                        try {
                            var xhr = new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            return xhr;
                        } catch (ex){
                            //skip
                        }
                    }
                }
            
                return new ActiveXObject(arguments.callee.activeXString);
            } else {
                throw new Error("No XHR object available.");
            }
        }
        

function ajaxGet(file,flag){
		var xhr = createXHR();  
		var returnValue='';      
		xhr.onreadystatechange = function(){
		if (xhr.readyState == 4){
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				returnValue=xhr.responseText;
			} else {
				returnValue="Request was unsuccessful: " + xhr.status;
			}
		}
	}; 
	if(flag === true){
			var now=new Date(); 
			var number = now.getYear().toString()+now.getMonth().toString()+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString();
				file+="?"+number
	}      
	 xhr.open("get",file, false);
	 xhr.send(null);
	return returnValue; 
}
</script>
<body style="width:1032px; margin:0px">

<?
//遍历目录下的文件 
function read_dir_all($dir,$action,$confile,$is_path=true) { 

	$ret = array('dirs'=>array(), 'files'=>array()); 
	#文件类型
	$confile = !empty($confile)?$confile:array('png','jpg','gif');
	#是否是目录
	if(!is_dir( $dir )){echo $dir.'!is_dir';
		return $ret;
	}
	
	if ($handle = opendir($dir)) { 
	
		while (false !== ($file = readdir($handle))) {
		
			if($file != '.' && $file !== '..') { 
			
				$cur_path = $is_path ==true ? $dir .'/'.$file : $file; 
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
					if(!empty($action)){
						if(strstr($cur_path,$action)) { 
					
						$ret['files'][] = $cur_path; 
						} 
					}else{
						$ret['files'][] = $cur_path; 
					}
				}
			} 
		} 
		
		closedir($handle); 
	
	} 
	return $ret; 
}
if(!empty($_GET['file'])){
	echo file_get_contents('lib/htmllib/'.$_GET['file']);
}else{
$arr = read_dir_all('lib/htmllib/','',array('html'),false);
$files = $arr['files'];
?><ul class="RightMenuBox">
<?	
for($i=0;$i<count($files);$i++){
?>
	<li class="ContextMenuSubItem"><a href="?file=<?php echo $files[$i];?>"><?php echo $files[$i];?></a></li>


<?		
}
	?>
    </ul>
    <?php
}?>
</body>
</html>
