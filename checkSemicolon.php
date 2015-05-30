<?php
header( 'Content-Type:text/html;charset=utf-8 ');
$file = fopen("lib/pp-datagrid3.js","r");
$i=1;
while(! feof($file))
  {
	  echo $i.'&nbsp;&nbsp;'; 
	  $line = fgets($file);
	  $line=trim($line);
	  if(strstr($line,'//')){
		$temppos = strrpos($line,"//");
		 $line=substr($line,0,$temppos-0); 
	  }
	  $compressline=$line;//compress_php_src($line);
	  $lastelem = substr($compressline,strlen($compressline)-1,1);
	  if($lastelem!=';' && $lastelem !=='{'){
		  echo '<font color="#FF0000">'.htmlentities($compressline).'</font>'. "<br />";
	  }else{
		  echo htmlentities($line). "<br />";
	  }
	  $i++;
  }

fclose($file);

?>