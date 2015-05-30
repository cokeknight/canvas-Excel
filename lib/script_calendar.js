/*
	[Discuz!] (C)2001-2009 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: calendar.js 17449 2008-12-22 08:58:53Z cnteacher $
*/
	
function showTime(event, controlid1, addtime1, startdate1, enddate1,posx,posy,dataFormat,row,col){
	this.doane=function(event) {
		e = event ? event : window.event;
		if(is_ie) {
			e.returnValue = false;
			e.cancelBubble = true;
		} else if(e) {
			e.stopPropagation();
			e.preventDefault();
		}
	}
	var is_ie = (document.all) ? true : false;
	this.controlid = {"value":"2012-12-20 11:00:00"};
	this.currdate = null;
	this.startdate = null;
	this.enddate  = null;
	this.yy = null;
	this.mm = null;
	this.hh = null;
	this.ss	= null;
	this.ii = null;
	
	this.currday = null;
	this.addtime = false;
	this.today = new Date();
	this.lastcheckedyear = false;
	this.lastcheckedmonth = false;
	
	var datagrid;
	
	function getposition(obj) {
		var r = new Array();
		r['x'] = obj.offsetLeft;
		r['y'] = obj.offsetTop;
		while(obj = obj.offsetParent) {
			r['x'] += obj.offsetLeft;
			r['y'] += obj.offsetTop;
		}
		return r;
	}
	this.$=function (id) {
			return document.getElementById(id);
		}
	var out=function(){alert(123);}

	var loadcalendar=function (posx,posy) {	
		s = '';
		s += '<div id="calendar" style="display:none; position:absolute; z-index:100000;" onclick="parent.doane(event)">';
		s += '<div style="width: 210px;"><table cellspacing="0" cellpadding="0" width="100%" style="text-align: center;">';
		s += '<tr align="center" id="calendar_week"><td><a href="###" onclick="parent.refreshcalendar(yy, mm-1)" title="上一月">《</a></td><td colspan="5" style="text-align: center"><a href="###" onclick="parent.showdiv(\'year\');parent.doane(event)" class="dropmenu" title="点击选择年份" id="year"></a>&nbsp; - &nbsp;<a id="month" class="dropmenu" title="点击选择月份" href="###" onclick="parent.showdiv(\'month\');parent.doane(event)"></a></td><td><A href="###" onclick="parent.refreshcalendar(yy, mm+1)" title="下一月">》</A></td></tr>';
		s += '<tr id="calendar_header"><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr>';
		for(var i = 0; i < 6; i++) {
			s += '<tr>';
			for(var j = 1; j <= 7; j++)
				s += "<td id=d" + (i * 7 + j) + " height=\"19\">0</td>";
			s += "</tr>";
		}
		s += '<tr id="hourminute"><td colspan="7" align="center"><input type="text" size="2" value="" id="hour" class="txt"  onKeyUp=\'this.value=this.value > 23 ? 23 : parent.zerofill(this.value);parent.controlid.value=parent.controlid.value.replace(/\\d+(\:\\d+)/ig, this.value+"$1")\'> 点 <input type="text" size="2" value="" id="minute" class="txt" onKeyUp=\'this.value=this.value > 59 ? 59 : parent.zerofill(this.value);controlid.value=parent.controlid.value.replace(/(\\d+\:)\\d+/ig, "$1"+this.value)\'> 分<input type="text" size="2" value="" id="second" class="txt"  onKeyUp=\'this.value=this.value > 59 ? 59 : parent.zerofill(this.value);parent.controlid.value=parent.controlid.value.replace(/(\\d+\:\\d+\:)\\d+/ig, "$1"+this.value)\'> 秒</td></tr>';
		s += '</table></div></div>';
		s += '<div id="calendar_year" onclick="parent.doane(event)" style="display: none;z-index:100001;"><div class="col">';
		for(var k = 2020; k >= 1931; k--) {
			s += k != 2020 && k % 10 == 0 ? '</div><div class="col">' : '';
			s += '<a href="###" onclick="parent.refreshcalendar(' + k + ', parent.mm);$(\'calendar_year\').style.display=\'none\'"><span' + (today.getFullYear() == k ? ' class="calendar_today"' : '') + ' id="calendar_year_' + k + '">' + k + '</span></a><br />';
		}
		s += '</div></div>';
		s += '<div id="calendar_month" onclick="parent.doane(event)" style="display: none;z-index:100001;">';
		for(var k = 1; k <= 12; k++) {
			s += '<a href="###" onclick="parent.refreshcalendar(parent.yy, ' + (k - 1) + ');$(\'calendar_month\').style.display=\'none\'"><span' + (today.getMonth()+1 == k ? ' class="calendar_today"' : '') + ' id="calendar_month_' + k + '">' + k + ( k < 10 ? '&nbsp;' : '') + ' 月</span></a><br />';
		}
		s += '</div>';
		if(is_ie && is_ie < 7) {
			s += '<iframe id="calendariframe" frameborder="0" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
			s += '<iframe id="calendariframe_year" frameborder="0" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
			s += '<iframe id="calendariframe_month" frameborder="0" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
		}
	
		var div = document.createElement('div');
		div.innerHTML = s;
		div.id="time";
		div.style.position="absolute";
		div.style.left=posx+"px";
		div.style.top=posy+"px";
		document.body.appendChild(div);
		document.onclick = function(event) {
			$('calendar').style.display = 'none';
			$('calendar_year').style.display = 'none';
			$('calendar_month').style.display = 'none';
			if(is_ie && is_ie < 7) {
				$('calendariframe').style.display = 'none';
				$('calendariframe_year').style.display = 'none';
				$('calendariframe_month').style.display = 'none';
			}
		}
		$('calendar').onclick = function(event) {
			doane(event);
			$('calendar_year').style.display = 'none';
			$('calendar_month').style.display = 'none';
			if(is_ie && is_ie < 7) {
				$('calendariframe_year').style.display = 'none';
				$('calendariframe_month').style.display = 'none';
			}
		}
	
	}
	
	function parsedate(s) {
		/(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec(s);
		var m1 = (RegExp.$1 && RegExp.$1 > 1899 && RegExp.$1 < 2101) ? parseFloat(RegExp.$1) : today.getFullYear();
		var m2 = (RegExp.$2 && (RegExp.$2 > 0 && RegExp.$2 < 13)) ? parseFloat(RegExp.$2) : today.getMonth() + 1;
		var m3 = (RegExp.$3 && (RegExp.$3 > 0 && RegExp.$3 < 32)) ? parseFloat(RegExp.$3) : today.getDate();
		var m4 = (RegExp.$4 && (RegExp.$4 > -1 && RegExp.$4 < 24)) ? parseFloat(RegExp.$4) : 0;
		var m5 = (RegExp.$5 && (RegExp.$5 > -1 && RegExp.$5 < 60)) ? parseFloat(RegExp.$5) : 0;
		/(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec("0000-00-00 00\:00");
		return new Date(m1, m2 - 1, m3, m4, m5);
	}
	
	this.settime=function(d) {
		$('calendar').style.display = 'none';
		$('calendar_month').style.display = 'none';
		if(is_ie && is_ie < 7) {
			$('calendariframe').style.display = 'none';
		}
		controlid.value = yy + "-" + zerofill(mm + 1) + "-" + zerofill(d) + (addtime ? ' ' + zerofill($('hour').value) + ':' + zerofill($('minute').value) : '');
		if(dataFormat.dwstyle   ==='1')//longdate
		{
			controlid.value = yy + "年" + zerofill(mm + 1) + "月" + zerofill(d) + "日";
		}else if(dataFormat.dwstyle==='2')//shortdate
		{
			controlid.value = yy + "-" + zerofill(mm + 1) + "-" + zerofill(d);
		}else if(dataFormat.dwstyle==='3')//time
		{
			controlid.value =(addtime ? ' ' + zerofill($('hour').value) + ':' + zerofill($('minute').value) : '')+':'+zerofill($('second').value);	
		}else if(dataFormat.dwstyle==='4')//timedate 日期时间类型
		{
			controlid.value =yy + "-" + zerofill(mm + 1) + "-" + zerofill(d)+' '+(addtime ? ' ' + zerofill($('hour').value) + ':' + zerofill($('minute').value) : '')+':'+zerofill($('second').value);	
		}
		
		datagrid.selFocusCellValue(controlid.value);
	}
	
	
	function showcalendar(event, controlid1, addtime1, startdate1, enddate1,posx,posy,dataFormat) {
		loadcalendar(posx,posy);
		datagrid=controlid1;
		addtime = addtime1;
		startdate = startdate1 ? parsedate(startdate1) : false;
		enddate = enddate1 ? parsedate(enddate1) : false;
		currday = controlid.value ? parsedate(controlid.value) : today;
		hh = currday.getHours();
		ii = currday.getMinutes();
		var p = getposition(controlid);
		$('calendar').style.display = 'block';
		$('calendar').style.left = p['x']+'px';
		$('calendar').style.top	= (p['y'] + 20)+'px';
		doane(event);
		refreshcalendar(currday.getFullYear(), currday.getMonth());
		if(lastcheckedyear != false) {
			$('calendar_year_' + lastcheckedyear).className = 'calendar_default';
			$('calendar_year_' + today.getFullYear()).className = 'calendar_today';
		}
		if(lastcheckedmonth != false) {
			$('calendar_month_' + lastcheckedmonth).className = 'calendar_default';
			$('calendar_month_' + (today.getMonth() + 1)).className = 'calendar_today';
		}
		$('calendar_year_' + currday.getFullYear()).className = 'calendar_checked';
		$('calendar_month_' + (currday.getMonth() + 1)).className = 'calendar_checked';
		$('hourminute').style.display = addtime ? '' : 'none';
		lastcheckedyear = currday.getFullYear();
		lastcheckedmonth = currday.getMonth() + 1;
		if(is_ie && is_ie < 7) {
			$('calendariframe').style.top = $('calendar').style.top;
			$('calendariframe').style.left = $('calendar').style.left;
			$('calendariframe').style.width = $('calendar').offsetWidth;
			$('calendariframe').style.height = $('calendar').offsetHeight;
			$('calendariframe').style.display = 'block';
		}
	}
	
	this.refreshcalendar=function(y, m) {
		var x = new Date(y, m, 1);
		var mv = x.getDay();
		var d = x.getDate();
		var dd = null;
		yy = x.getFullYear();
		mm = x.getMonth();
		$("year").innerHTML = yy;
		$("month").innerHTML = mm + 1 > 9  ? (mm + 1) : '0' + (mm + 1);
	
		for(var i = 1; i <= mv; i++) {
			dd = $("d" + i);
			dd.innerHTML = "&nbsp;";
			dd.className = "";
		}
	
		while(x.getMonth() == mm) {
			dd = $("d" + (d + mv));
			dd.innerHTML = '<a href="###" onclick="settime(' + d + ');return false">' + d + '</a>';
			if((enddate && x.getTime() > enddate.getTime()) || (startdate && x.getTime() < startdate.getTime())) {
				dd.className = 'calendar_expire';
			} else {
				dd.className = 'calendar_default';
			}
			if(x.getFullYear() == today.getFullYear() && x.getMonth() == today.getMonth() && x.getDate() == today.getDate()) {
				dd.className = 'calendar_today';
				dd.firstChild.title = '今天';
			}
			if(x.getFullYear() == currday.getFullYear() && x.getMonth() == currday.getMonth() && x.getDate() == currday.getDate()) {
				dd.className = 'calendar_checked';
			}
			x.setDate(++d);
		}
	
		while(d + mv <= 42) {
			dd = $("d" + (d + mv));
			dd.innerHTML = "&nbsp;";
			d++;
		}
	
		if(addtime) {
			$('hour').value = zerofill(hh);
			$('minute').value = zerofill(ii);
		}
	}
	
	this.showdiv=function(id) {
		var p = getposition($(id));
		$('calendar_' + id).style.left =110+'px';
		$('calendar_' + id).style.top =25+'px';
		$('calendar_' + id).style.display = 'block';
		if(is_ie && is_ie < 7) {
			$('calendariframe_' + id).style.top = $('calendar_' + id).style.top;
			$('calendariframe_' + id).style.left = $('calendar_' + id).style.left;
			$('calendariframe_' + id).style.width = $('calendar_' + id).offsetWidth;
			$('calendariframe_' + id ).style.height = $('calendar_' + id).offsetHeight;
			$('calendariframe_' + id).style.display = 'block';
		}
	}
	
	this.zerofill=function(s) {
		var s = parseFloat(s.toString().replace(/(^[\s0]+)|(\s+$)/g, ''));
		s = isNaN(s) ? 0 : s;
		return (s < 10 ? '0' : '') + s.toString();
	}
	
	/*  加载样式  */
	
showcalendar(event, controlid1, addtime1, startdate1, enddate1,posx,posy,dataFormat);
}