// JavaScript Document
var drawObjs = function(datagrid,rule) {
    clearCeng('drawobjs');
    clearCeng('drawobj', 'class');

    var left = 224,top = document.getElementById("canvas").offsetTop || 48,width,height,
    maincontent = document.getElementById('maincontent');
    if (rule instanceof Array) {
        var drawobjs = document.createElement('div');
        drawobjs.id = 'drawobjs';
        maincontent.insertBefore(drawobjs, _gl_canvas);
        T.forEach(rule,
        function(item, index, source) {
            if (item.flashchart) {
                width = 400;
                height = 400;
            } else {
                width = 50;
                height = 50;
            }

            var drawobj = T.html.rendBox({
                'id': 'drawobj_' + index,
                'class': 'drawobj',

                'style': 'width=' + width + 'px,height=' + height + 'px,zIndex=1,left=' + left + 'px,top=' + top + 'px',
                'html': {
                    'file': "tangram-dialog",
                    'filter': {
                        "title": '图表显示',
                        "content": '',
                        'tip': '展开显示'
                    }
                },
                'drag': true
            });
			if(chartOnly){
				T.html.css(drawobj,'margin=0');	
			}
            var _gl_chart = T.html.rendBox({
                'type': 'canvas',
                'output': true,
                'id': 'cvs_' + index,
                'style': 'width=' + width + ',height=' + height
            });

            T.html.getElementsByClassName("clath-path-all", drawobj)[0].appendChild(_gl_chart);
            drawobjs.appendChild(drawobj);
            T.html.getElementsByClassName("s_b_settings_icon", drawobj)[0].onclick = this.expend;
            new drawObjs.drawChart(new drawObjs.parseChart(datagrid, item), item, 'cvs_' + index);
        });
    } else {
        var drawobj = T.html.rendBox({
            'id': 'drawobj',
            'rendTo': function(obj) {
                maincontent.insertBefore(obj, _gl_canvas);
            },
            'class': 'drawobj',
            'style': 'width="800px",height="650px",zIndex="1",left=' + left + 'px,top=' + top + 'px',
            'html': {
                'file': "tangram-dialog",
                'filter': {
                    "title": '图表显示',
                    "content": '',
                    'tip': '展开显示'
                }
            },
            'drag': true
        });
		if(chartOnly){
			T.html.css(drawobj,'margin=0');	
		}

        var _gl_chart = T.html.rendBox({
            'type': 'canvas',
            'output': true,
            'id': 'cvs',
            'style': 'width=' + 500 + ',height=' + 600
        });

        T.html.getElementsByClassName("s_b_settings_icon", drawobj)[0].onclick = this.expend;

        T.html.getElementsByClassName("clath-path-all", drawobj)[0].appendChild(_gl_chart);
        try {
            new drawObjs.drawChart(new drawObjs.parseChart(datagrid, rule), rule);
        } catch(e) {
            alert(e);
        }
    }

}
drawObjs.prototype.expend = function(event) {
        var eve = event || window.event,
        meinv = eve.srcElement ? eve.srcElement: eve.target;
        var obj = meinv.parentNode.parentNode;
        if (meinv.title === '并入显示') {

            if (obj.style.position === 'absolute') {
                meinv.title = '展开显示';
                obj.style.position = '';
                maincontent.insertBefore(drawobj, _gl_canvas);
            }
        } else if (meinv.title === '展开显示') {
            meinv.title = '并入显示';
            obj.style.position = 'absolute';
        }
    }

drawObjs.parseChart = function(datagrid, rule) {
    this.datagrid = datagrid;
    var cells = this.cells = datagrid._cells,
    sql;
    if (T.isJson(rule)) {
        if (rule.flashchart === undefined) return {};
        var rule = rule.flashchart;
    } else {
        var rule = eval('(' + rule + ')');
    }

    T.forEach(rule,
    function(item, index, source) {
        if (typeof item !== 'object') rule[index] = decodeURIComponent(item);
    });

    if (this.isDataResourse(rule.data)) {
        document.getElementById('canvas').style.display = 'none';
        sql = T.xml.gXmlPrototype(datagrid['_statscript'], "sql");
        cells = T.ajax.ajaxGet('html/lib/getmyData.php?sql=' + encodeURIComponent(sql));
        cells = eval('(' + cells + ')');
        //this.tooltips =
        this.table = this.fliter(cells, rule.data);

        this.chartX = this.fliter(cells, rule.xlabeldata);
        this.title = rule['title'].charAt(0) === '=' ? this.parseSjyTtile(cells, rule['title']) : rule['title'];
        this.toolkey = rule.legenddata === undefined ? '': this.getKey(cells, rule.legenddata); //提示数据区域
    } else {
console.log(rule);
        this.title = rule.title === undefined ? '': this.getTitle(rule.title); //图表标题

        this.jsh = this.parseksh(datagrid._rows, '结束行');
        this.tooltips = rule.hovertextdata === undefined ? '': this.getTooltips(cells, rule.hovertextdata); //图表浮动提示数据区域
        this.table = rule.data === undefined ? '': this.getTooltips(cells, rule.data); //数据区域
        this.chartX = rule.xlabeldata === undefined ? '': this.getTooltips(cells, rule.xlabeldata); //数据区域
        this.toolkey = rule.legenddata === undefined ? '': this.getKey(cells, rule.legenddata); //提示数据区域

    }
}
drawObjs.parseChart.prototype = {
    parseSjyTtile: function(cells, str) {

        var str = str.replace(/(@[a-zA-Z\u4e00-\u9fa5]+)/g,
        function(word) {
            return cells[word.substring(1)][0];
        });
        str = str.replace(/&"([a-zA-Z\u4e00-\u9fa5]+)"&?/g, "$1");

        return str.substring(1);
    },
    fliter: function(cells, str) {
        if (str.charAt(0) === '@') {
            var sts = str.split(/\s+/);
            if (sts.length === 1) {
                return cells[sts[0].substring(1)];
            } else {
                var temparr = [],
                datas = cells[sts[0].substring(1)];
                for (var i = 0,
                len = datas.length; i < len; i++) {
                    var childarr = [];
                    for (var j = 0,
                    jlen = sts.length; j < jlen; j++) {
                        var data = cells[sts[j].substring(1)];
                        childarr.push(data[i]);
                    }
                    temparr.push(childarr);
                }
                return temparr;
            }
            return cells[str.substring(1)];
        } else if (/([a-zA-Z]+)\("@([a-zA-Z]+)",(\d+)\)\s?/g.test(str)) {
            var pre = RegExp.$1;
            return cells[RegExp.$2].slice(0, pre === 'left' ? RegExp.$3: -RegExp.$3);
        } else if (/"?@([a-zA-Z\u4e00-\u9fa5]+)"?\s?/g.test(str)) {
            var patt = /"(?:(.+?))"/g,
            temparr = [],
            resultarr = [],
            length = null,
            tempstr = '',
            j = 0;
            while ((result = patt.exec(str)) != null) {
                temparr.push(result[1]);
            }

            for (var i = 0,
            len = temparr.length; i < len; i++) {
                if (/(@[a-zA-Z\u4e00-\u9fa5]+)/.test(temparr[i])) {
                    var data = cells[RegExp.$1.substring(1)];
                    var length = data.length;

                    break;
                }
            }
            if (length) {
                while (j < length) {
                    tempstr = '';
                    for (var i = 0,
                    len = temparr.length; i < len; i++) {
                        if (/(@[a-zA-Z\u4e00-\u9fa5]+)/.test(temparr[i])) {
                            var data = cells[RegExp.$1.substring(1)];
                            tempstr += String(data[j]);
                        }

                        if (/(^[a-zA-Z\u4e00-\u9fa5]+)/.test(temparr[i])) {
                            tempstr += RegExp.$1;
                        }
                    }
                    resultarr.push(tempstr);
                    j++;
                }
            }

            return resultarr;

        }
    },
    isDataResourse: function(key) {
        var key = decodeURIComponent(key);
        return (/(@[a-zA-Z\u4e00-\u9fa5]+\s?)+/g.test(key));
    },
    getKey: function(cells, key) { //A1:B4

        var key = decodeURIComponent(key);
        var r;
        if (r = /="([A-Z]\d+)(?::[A-Z]"&Row\("结束行",0,-(\d+)\))?/g.exec(key)) {
            cells = this.cells;
            r.splice(0, 1);
            var temp = /([A-Z])(\d+)/.test(r[0]);
            var temparr = [];
            for (var k = RegExp.$2 - 1; k < this.jsh; k++) {
                temparr.push(cells[k][RegExp.$1.charCodeAt(0) - 65]['t']);
            }

            return temparr;

        } else if (r = /([A-Z]\d+):([A-Z]\d+)?/g.exec(key)) {
            cells = this.cells;
            r.splice(0, 1);
            var res = [];
            for (var k = 0; k < r.length; k++) {
                var temp = /([A-Za-z]+)(\d+)/.test(r[k]);
                res[k] = {
                    'col': RegExp.$1.toUpperCase().charCodeAt(0) - 65,
                    'row': RegExp.$2 - 1
                };
            }
            var temparr = [];
            for (var i = res[0].row, len = res[1].row + 1; i < len; i++) {
                for (var j = res[0].col, jlen = res[1].col; j <= jlen; j++) {
                    temparr.push(cells[i][j]['t']);
                }
            }

            return temparr;
        } else if (/([A-Z]\d+)/g.test(key)) {
            var arrs = key.split(/\s+/),
            temparr = [];
            for (var i = 0,
            len = arrs.length; i < len; i++) {
                var temp = /([A-Z])(\d+)/.test(arrs[i]);
                temparr.push(cells[RegExp.$2 - 1][RegExp.$1.charCodeAt(0) - 65]['t']);

            }

            return temparr;
        }
    },
    getTooltips: function(cells, key) { //="C5:C"&Row("结束行",0,-1)
        if (key === '') return '';

        var key = decodeURIComponent(key);
        var result, arr = [];
        var patt = /([A-Z]\d+)(?::[A-Z]"&Row\("([a-zA-Z\u4e00-\u9fa5]+)",0,-(\d+)\))?/g;

        while ((result = patt.exec(key)) != null) {
            arr.push(result.slice(1, result.length));
        }

        if (arr[1] === undefined) {

            if (arr[0][1] !== '结束行') this.jsh = this.parseksh(this.datagrid._rows, arr[0][1]);
            var temp = /([A-Z])(\d+)/.test(arr[0][0]),
            matches1 = RegExp.$1;
            var temparr = [],
            t;
            for (var k = RegExp.$2 - 1; k < this.jsh; k++) {
                t = cells[k][matches1.toUpperCase().charCodeAt(0) - 65];
                if (Number(t.swty) === 10 && t.lexcel !== undefined) {
                    var xmldom = null;
                    try {
                        xmldom = T.xml.parseXml(t.lexcel);
                    } catch(ex) {
                        alert(ex.message);
                    }
                    var format = xmldom.getElementsByTagName("eformat")[0].firstChild.nodeValue;
                    var textFormat = {
                        'format': format,
                        'type': 'lexcel'
                    };

                    var cellvalue = DataGrid.prototype.turnFormat(textFormat, t['t']);
                    temparr.push(cellvalue);
                } else {
                    temparr.push(t['t']);
                }
            }
        } else {
            if (arr[0][1] !== '结束行') this.jsh = this.parseksh(this.datagrid._rows, arr[0][1]);

            var temparr = [];
            for (var i = 0; i < arr.length; i++) {
                var temp = /([A-Z])(\d+)/.test(arr[i][0]);
                var temparry = [];
                for (var k = RegExp.$2 - 1; k < this.jsh; k++) {
                    temparry.push(cells[k][RegExp.$1.charCodeAt(0) - 65]['t'] || '');
                }
                temparr.push(temparry);
            }

            var clonearr = temparr.slice(0, 1)[0];
            for (var i = 0; i < clonearr.length; i++) {
                var temp = [];
                for (var j = 0; j < temparr.length; j++) {
                    temp.push(temparr[j][i]);
                }
                clonearr[i] = temp;
            }
            temparr = clonearr;

        }

        return temparr;
    },
    getTitle: function(key) {
        var cells = this.cells || arguments[1],
        key = decodeURIComponent(key),
        r,
        result = '';

        if (/^=(.+)/g.exec(key)) { //公式
            r = key.substring(1);

            var rs = r.split('&');
            for (var i = 0,
            len = rs.length; i < len; i++) {
                if (/([a-zA-Z]+)(\d+)/.test(rs[i])) {

                    result += cells[RegExp.$2 - 1][RegExp.$1.toUpperCase().charCodeAt(0) - 65]['t'];
                }
                if (/"([^"]+)"?/.test(rs[i])) {
                    result += RegExp.$1;
                }
            }
            return result;
            //if(r=/=([A-Z]\d+)(?:&"([^""])?("&([A-Z]\d+)&")?([^""])")?/g.exec(key)){
            //				//r.splice(0,1);
            //			}
            //			
            //			var r=r.map(function(item , index , array){
            //				if(/([A-Z])(\d+)/.test(item)){
            //					return 	cells[RegExp.$2-1][RegExp.$1.charCodeAt(0)-65]['t'];
            //				}else{
            //					return 	item;
            //				}	
            //			});
            //		

        } else {
            return key;
        }
    },
    parseCellattributes: function(obj, ksh, jsh) {

        if (obj.row !== undefined) {
            for (var k = ksh - 1; k < jsh; k++) {
                this._cells[k] = [];
                for (var h = 0; h < obj.row[k].cl.length; h++) {

                    var attributes = obj.row[k].cl[h].attributes;

                    this._cells[k][h] = attributes['t'];

                } //cl.length
            }
        }
        this._cells.splice(0, 4);
    },
    parseksh: function(obj, tag) {
        for (var k = 0; k < obj.length; k++) {

            if (obj[k]['text'] === tag) {
                return k;
            }
        }
        return false;

    },

    parserowproperty: function(attributes) {
        for (i = 0; i < attributes.obj.length; i++) {
            if (attributes.obj[i].attributes.text === '结束行') { //设定的 行属性
                return attributes.obj[i].attributes.lineval;
            }
        }
    }
}
 
drawObjs.drawChart = function(data, rule) {
    if (T.isEmptyObject(data)) return;
    this.cvs = arguments[2] ? arguments[2] : 'cvs';
    clearCeng('RGraph_tooltip', 'class');
    RGraph.Reset(document.getElementById(this.cvs));
    var rule = rule.flashchart || rule;
    var chartType = {
        "1": "柱状图",
        "2": "堆积柱状图",
        "3": "3D柱状图",
        "4": "3D堆积柱状图",
        "5": "条形图",
        "6": "堆积条形图",
        "7": "线型图",
        "8": "圆饼图",
        "9": "3D圆饼图",
        "10": "面积图",
        "11": "堆积面积图",
        "12": "K线图",
        "13": "圈饼图",
        "14": "漏斗图",
        "15": "甘特图",
        "16": "柱状线型双坐标图",
        "17": "3D柱状线型双坐标图"
    };

    var type = Number(T.varsearch(chartType, rule.type));
    var is_multi = typeof data.table[0] === 'object';

    data.colorange = function(obj) {
        var arr = [];
        for (var p in obj) {
            if (p !== 'nums') arr.push('#' + obj[p]);
        }
        return arr;
    } (rule.serialcolor);

    this.draw({
        'type': type,
        'is_multi': is_multi,
        'rule': rule,
        'data': data
    });
}

drawObjs.drawChart.prototype.sortNumber = function(a, b) {
    return a - b
}
drawObjs.drawChart.prototype.myTick = function(obj, data, value, index, x, y, color, prevX, prevY) {
    var ctx = obj.canvas.getContext("2d");
    ctx.fillStyle = "white";

    if (index == 3 || index == 4 || (index >= 13 && index <= 16) || index == 20) {
        ctx.fillStyle = "#4C2288";
    }

    // Draw your custom tick here
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
drawObjs.drawChart.prototype.arrryCpoy = function(arr) {
    var temparr = RGraph.array_clone(arr);
    for (var i = 0; i < arr.length * 2; i = i + 2) {
        temparr.splice(i, 0, arr[i / 2]);

    }
    return temparr;
}

drawObjs.drawChart.prototype.arrayToNumber = function(arr) {
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'string') {
            temp.push(Number(arr[i]));
        } else if (typeof arr[i] === 'object') {
            temp.push(arguments.callee(arr[i]));
        } else if (typeof arr[i] === 'number') {
            temp.push(arr[i]);
        }
    }
    return temp;
}
drawObjs.drawChart.prototype.conmmonSet = function(chart, config) {
    var key = config.key !== false ? true: false,
    rule = config.rule,
    data = config.data;

    if (rule.numprefix !== '') {
        chart.Set('chart.units.pre', rule.numprefix);
    }
    if (rule.numsuffix !== '') {
        chart.Set('chart.units.post', rule.numsuffix);
    }
    if (rule.yaxismaxval !== undefined && rule.yaxismaxval !== '') {
        var ymax = rule.yaxismaxval;
        if (typeof ymax !== 'Number') {
            ymax = data.getTitle(ymax);
        }
        if (rule.type === '条形图') {
            chart.Set('xmax', ymax);
        } else {
            chart.Set('ymax', ymax);
        }
    }
    if (rule.legenddata !== '' && rule.legenddata !== undefined && key) {
        chart.Set('key', data.toolkey);
        chart.Set('key.background', 'rgba(255,255,255,0.8)');
        chart.Set('key.rounded', true);
        chart.Set('chart.key.position', 'gutter');
        chart.Set('chart.key.position.gutter.boxed', false);
        chart.Set('chart.key.position.y', 550);
    }

    if (! ((rule.chartset >> 4) & 0x01)) { //y轴网格线
        chart.Set('chart.background.grid.hlines', false);
    }
    if (! ((rule.chartset >> 3) & 0x01)) {
        chart.Set('chart.background.grid.vlines', false);
    }

    if (rule.divlinecolor !== '') {
        chart.Set('chart.background.grid.color', T.color.getcolorFromByte(rule.divlinecolor));
    }
    if ((rule.chartset >> 1) & 0x01) { //是否在图注上显示数值
        chart.Set('labels.above', true);
    }

	

}
drawObjs.drawChart.prototype.getData = function(datas, rule, toolkey, tooltips, i, is_multi, data) {
    var tempdata = '',
	
    index = is_multi !== false ? datas[Math.floor(i / 2)][i % 2 == 0 ? 1 : 0] : datas[i];
	

	if (toolkey) {
        tempdata += toolkey[i % 2] ? (toolkey[i % 2] + ', ') : (toolkey[0] + ', ');
    }
    if (tooltips === undefined && data.chartX !== undefined) {
        tempdata += data.chartX[i] + ', ';
    } else if (tooltips !== undefined) {   
        tempdata += tooltips[i] + ', ';
    }
	if (rule.numprefix && rule.numprefix !== '') {
		tempdata += rule.numprefix;
	}
	
    var tempdata2 = index;

    if (rule.numdigit !== '0' && rule.numdigit !== undefined) {
        tempdata2 = T.string.turnweishu(String(index), Number(rule.numdigit));
    }
	if (rule.numsuffix && rule.numprefix !== '') {
		tempdata2 = tempdata2 + rule.numsuffix;
	}

    return tempdata + tempdata2;
}

drawObjs.drawChart.prototype.multiTooltipSet = function(datas, chart, config) {
    var is_multi = config.is_multi,
    rule = config.rule,
    data = config.data,
    type = config.type,
    datatable;

    for (var i = 0,
    dlen = datas.length,
    len = datas.length * datas[0].length, blen = datas[0].length; i < len; i++) {

        var tempdata = datas[Math.floor(i / blen)][i % blen],
        temptooltips,
        toolkey;
		
        if (data.tooltips !== undefined && data.tooltips !== "") {
            temptooltips = data.tooltips[i] + ', ';
            if (type == 7) {
                temptooltips = data.tooltips[i % dlen] + ', ';
            } else {
                temptooltips = data.tooltips[Math.floor(i / blen)] + ', ';
            }

        } else {
            temptooltips = data.chartX[Math.floor(i / data.toolkey.length)] + ', ';
            if (type == 7) {
                temptooltips = data.chartX[i % dlen] + ', ';
            }

        }
        if (data.toolkey !== undefined && data.toolkey !== '' && !T.isEmptyObject(data.toolkey)) {
            if (type !== 7) {
                toolkey = data.toolkey[i % data.toolkey.length] + ', ';
            } else if (type == 7) {
                if (is_multi) {
                    toolkey = data.toolkey[Math.floor(i / dlen)] + ', ';
                } else {
                    toolkey = data.toolkey[i % data.toolkey.length] + ', ';
                }
            }
        }
        if (type !== 7) {
            datatable = datas[Math.floor(i / blen)][i % blen];
        } else {

            datatable = datas[i % dlen][Math.floor(i / dlen)];
        }
        if (rule.numprefix && rule.numprefix !== '') {
            datatable = rule.numprefix + datatable;
        }
		if (rule.numsuffix && rule.numprefix !== '') {
            datatable = datatable + rule.numsuffix;
        }

        chart.Get('chart.tooltips')[i] = (toolkey || '') + temptooltips + datatable;
    }

}
drawObjs.drawChart.prototype.arrayToMergeLine = function(arr) {

    var temparr = [];
    for (var i = 0,
    len = arr[0].length; i < len; i++) {
        var childarr = [];
        for (var j = 0,
        jlen = arr.length; j < jlen; j++) {

            childarr.push(arr[j][i]);
        }
        temparr.push(childarr);
    }
    return temparr;

}
drawObjs.drawChart.prototype.draw = function(config) {
    var config = config,
    type = config.type,
    output = config.output || false,
    is_multi = config.is_multi,
    rule = config.rule,
    data = config.data,
    colorange = data.colorange,
    marginLeft = 40,
    dataLength = data.tooltips !== undefined ? data.tooltips.length: 0,
    arrayToNumber = this.arrayToNumber,
    arrryCpoy = this.arrryCpoy,
    conmmonSet = this.conmmonSet,
    multiTooltipSet = this.multiTooltipSet,
    myTick = this.myTick,
    arrayToMergeLine = this.arrayToMergeLine,
    getData = this.getData;

    if (type === 1) { //柱状图

        var datas = arrayToNumber(data.table),
        color;
        if (is_multi) { //多系列
            tooltips = arrryCpoy(data.tooltips || data.table);
        } else { //单系列
            tooltips = data.tooltips || data.table;
        }

        var chart = new RGraph.Bar(this.cvs, datas);

        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.bottom', 80);
        if (config.chartX !== false) chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);

        conmmonSet(chart, config);

        chart.Set('chart.strokestyle', 'transparent');
        var yidong = (rule.numprefix || '') + (rule.numsuffix || '');
        yidong = yidong.length * 10;
        if (rule.numdigit !== '0' && rule.numdigit !== undefined) {

            chart.Set('chart.units.post', '.' + T.string.repeat('0', rule.numdigit));

            yidong += Number(rule.numdigit) * 10;

        }
        marginLeft += yidong;
        chart.Set('gutter.left', marginLeft + 5);
        chart.Set('gutter.right', marginLeft + 20);

        if (is_multi) { //多系列
            multiTooltipSet(datas, chart, config);
        } else { //单系列

            chart.Set('colors.sequential', true);
            for (var i = 0; i < datas.length; ++i) {
                chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
            }

        }
        if (output) return chart;
        chart.Draw();
    } else if (type === 2) { //多系列堆积柱状图

        var datas = arrayToNumber(data.table);
        var tooltips = arrryCpoy(data.tooltips || data.table);

        var chart = new RGraph.Bar(this.cvs, datas);
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('gutter.bottom', 80);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        chart.Set('grouping', 'stacked'); //堆积

        conmmonSet(chart, config);

        if (is_multi) {
            multiTooltipSet(datas, chart, config);
        } else { //单系列
            for (var i = 0; i < datas.length; ++i) {
                chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
            }

        }
        chart.Draw();
        //RGraph.Effects.Bar.Grow(chart);
    } else if (type === 3) { //单系列3D柱状图

        var datas = arrayToNumber(data.table);
        var tooltips = data.tooltips || data.table;

        var chart = new RGraph.Bar(this.cvs, datas);
        chart.Set('variant', '3d');
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('gutter.bottom', 80);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        //chart.Set('grouping', 'stacked');//堆积
        chart.Set('gutter.right', 60);

        conmmonSet(chart, config);

        if (is_multi) {
			
            multiTooltipSet(datas, chart, config);
        } else { //单系列
		chart.Set('colors.sequential', true);
            for (var i = 0; i < datas.length; ++i) {
                chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
            }

        }
        if (output) return chart;
        chart.Draw();
        //RGraph.Effects.Bar.Grow(chart);
    } else if (type === 4) { //多系列3D堆积柱状图

        var datas = arrayToNumber(data.table);
        var tooltips = data.tooltips || data.table;

        var chart = new RGraph.Bar(this.cvs, datas);
        chart.Set('variant', '3d');
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('gutter.bottom', 80);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        chart.Set('grouping', 'stacked'); //堆积

        conmmonSet(chart, config);

        if (is_multi) {
            multiTooltipSet(datas, chart, config);
        } else { //单系列
            for (var i = 0; i < datas.length; ++i) {
                chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
            }

        }
        chart.Draw();
        //RGraph.Effects.Bar.Grow(chart);
    } else if (type === 5) { //多系列条形图

        var datas = arrayToNumber(data.table);
        var tooltips = arrryCpoy(data.tooltips || data.table);

        var chart = new RGraph.HBar(this.cvs, datas);
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('gutter.bottom', 80);
        chart.Set('chart.xmax', 11000);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        

        conmmonSet(chart, config);
        if (is_multi) {
            multiTooltipSet(datas, chart, config);
        } else { //单系列
		chart.Set('chart.colors.sequential', true);
            for (var i = 0; i < datas.length; ++i) {
                chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
            }

        }

        chart.Draw();
        //RGraph.Effects.Bar.Grow(chart);
    } else if (type === 6) { //多系列堆积条形图

        var datas = arrayToNumber(data.table);
        var tooltips = arrryCpoy(data.tooltips || data.table);

        var chart = new RGraph.HBar(this.cvs, datas);
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('gutter.bottom', 80);
        chart.Set('ymax', 19000);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        chart.Set('grouping', 'stacked'); //堆积

        conmmonSet(chart, config);

        multiTooltipSet(datas, chart, config);
        chart.Draw();
        //RGraph.Effects.Bar.Grow(chart);
    } else if (type === 7) { //多系列线形图
        var datas = arrayToNumber(data.table);
        tooltips = data.tooltips || data.table;
        if (is_multi) { //多系列
            tooltips = tooltips.concat(tooltips);
            //colorange=['#FF8040','#0080FF'];	
        } else { //单系列
            tooltips = tooltips;
            //colorange=['#EC0033','#A0D300','#FFCD00','#00B869','#999999','#FF7300','#004CB0','#FD84FD','#B4AC0B','#FD8447'];	
        }
        if (datas[0] instanceof Array) {
            var arrs = [];
            var childLen = datas[0].length;
            for (var i = 0; i < childLen; i++) {
                var arr = [];
                for (var j = 0; j < datas.length; j++) {
                    arr.push(datas[j][i]);
                }
                arrs.push(arr);

            }
        } else {
            var arrs = datas;
        }

        var chart = new RGraph.Line(this.cvs, arrs);
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('gutter.bottom', 80);
        if (config.chartX !== false) chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        chart.Set('chart.colors.alternate', true);
        chart.Set('tickmarks', myTick);

        conmmonSet(chart, config);

        if (is_multi) {
            multiTooltipSet(datas, chart, config);
        } else { //单系列
            for (var i = 0; i < datas.length; ++i) {
                chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
            }

        }

        if (output) return chart;
        chart.Draw();
    } else if (type === 8) { //圆饼图
        var sum = data.table.reduce(function(prev, cur, index, array) {
            return Number(prev) + Number(cur);
        });

        var datas = data.table.map(function(item, index, array) {
            return Math.round(Number(item) / sum * 100);
        });
        var tooltips = data.tooltips || data.table;

        var chart = new RGraph.Pie(this.cvs, datas);
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('chart.colors', ['#EC0033', '#A0D300', '#FFCD00', '#00B869', '#999999', '#FF7300', '#004CB0', '#FD84FD', '#B4AC0B', '#FD8447']);
        chart.Set('gutter.top', 50);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.shadow', true);
        chart.Set('chart.shadow.offsetx', 2);
        chart.Set('chart.shadow.offsety', 2);
        chart.Set('chart.shadow.blur', 3);
        chart.Set('chart.strokestyle', 'white');
        chart.Set('chart.exploded', [25]);

        conmmonSet(chart, config);

        for (var i = 0; i < datas.length; ++i) {
            var temdata = '';
            if (data.tooltips === undefined) {
                temdata = data.chartX[i];
            } else {
                temdata = data.tooltips[i];
            }
            chart.Get('chart.tooltips')[i] = temdata + ', ' + datas[i] + '%';
        }

        chart.Draw();

    } else if (type === 9) { //3D圆饼图
        var sum = data.table.reduce(function(prev, cur, index, array) {
            return Number(prev) + Number(cur);
        });

        var datas = data.table.map(function(item, index, array) {
            return Math.round(Number(item) / sum * 100);
        });

        var chart = new RGraph.Pie(this.cvs, datas);
        chart.Set('chart.tooltips', data.tooltips);
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('chart.colors', ['#EC0033', '#A0D300', '#FFCD00', '#00B869', '#999999', '#FF7300', '#004CB0', '#FD84FD', '#B4AC0B', '#FD8447']);
        chart.Set('gutter.top', 50);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.shadow', true);
        chart.Set('chart.shadow.offsetx', 2);
        chart.Set('chart.shadow.offsety', 2);
        chart.Set('chart.shadow.blur', 3);
        chart.Set('chart.strokestyle', 'white');
        chart.Set('chart.exploded', [25]);

        // This is the factor that the canvas is scaled by
        var factor = 1.5;

        // Set the transformation of the canvas - a scale up by the factor (which is 1.5 and a simultaneous translate
        // so that the Pie appears in the center of the canvas
        // chart.context.setTransform(factor,0,0,1,((chart.canvas.width * factor) - chart.canvas.width) * -0.5,0);
        
	    conmmonSet(chart, config);
        for (var i = 0; i < datas.length; ++i) {
            var temdata = '';
            if (data.tooltips === undefined) {
                temdata = data.chartX[i];
            } else {
                temdata = data.tooltips[i];
            }
            chart.Get('chart.tooltips')[i] = temdata + ', ' + datas[i] + '%';
        }

        chart.Draw();
        //RGraph.Effects.Pie.RoundRobin(chart, {frames:30});

    } else if (type === 10) { //面积图
        var datas = data.table.map(function(item, index, array) {
            return Number(item);
        });
        var tooltips = arrryCpoy(data.tooltips || data.table);
        var chart = new RGraph.Line(this.cvs, datas);
        chart.Set('chart.tooltips', tooltips);
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', ['red']);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('ymax', 11000);
        chart.Set('chart.filled', true);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');

        chart.Set('chart.fillstyle', ['#EC0033', '#A0D300', '#FFCD00', '#00B869', '#999999', '#FF7300', '#004CB0', '#FD84FD', '#B4AC0B', '#FD8447']);

        conmmonSet(chart, config);

        for (var i = 0; i < datas.length; i++) {
            chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
        }

        chart.Draw();
    } else if (type === 13) { //圈饼图
        var sum = data.table.reduce(function(prev, cur, index, array) {
            return Number(prev) + Number(cur);
        });

        var datas = data.table.map(function(item, index, array) {
            return Math.round(Number(item) / sum * 100);
        });
        var tooltips = data.tooltips || data.table;
        var chart = new RGraph.Pie(this.cvs, datas);
        chart.Set('chart.variant', 'donut');
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('chart.colors', ['#EC0033', '#A0D300', '#FFCD00', '#00B869', '#999999', '#FF7300', '#004CB0', '#FD84FD', '#B4AC0B', '#FD8447']);
        chart.Set('gutter.top', 50);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        chart.Set('chart.exploded', 3);

        conmmonSet(chart, config);

        for (var i = 0; i < datas.length; ++i) {
            var temdata = '';
            if (data.tooltips === undefined) {
                temdata = data.chartX[i];
            } else {
                temdata = data.tooltips[i];
            }
            chart.Get('chart.tooltips')[i] = temdata + ', ' + datas[i] + '%';
        }

        chart.Draw();

    } else if (type === 14) { //漏斗图
        var datas = data.table.map(function(item, index, array) {
            return Number(item);
        });
        function swap(array, i, j) {
            var d = array[j];
            array[j] = array[i];
            array[i] = d;
        }

        var i = 0,
        len = datas.length,
        j, d;
        for (; i < len; i++) {　　
            for (j = 0; j < len; j++) {　　
                if (datas[i] < datas[j]) {　d = datas[j];
                    datas[j] = datas[i];
                    datas[i] = d;

                    if (data.tooltips) swap(data.tooltips, i, j);
                    swap(data.chartX, i, j);　　　　
                }　　
            }　　
        }　　

        var chart = new RGraph.Funnel(this.cvs, datas);
        chart.Set('chart.tooltips', data.tooltips || data.table);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('chart.gutter.left', 240);
        chart.Set('chart.labels.sticks', true);
        chart.Set('chart.strokestyle', 'rgba(0,0,0,0)');
        chart.Set('chart.text.boxed', false);
        chart.Set('chart.labels.x', 10);
        chart.Set('chart.shadow', true);
        chart.Set('chart.shadow.offsetx', 0);
        chart.Set('chart.shadow.offsety', 0);
        chart.Set('chart.shadow.blur', 15);
        chart.Set('chart.shadow.color', 'gray');

        conmmonSet(chart, config);
        chart.Set('chart.key.position.x', 150);

        for (var i = 0; i < datas.length; ++i) {
            chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
        }

        chart.Draw();
    } else if (type === 16 || type === 17) { //	柱状线型双坐标图

        var datas = arrayToNumber(data.table, rule.numdigit),

        color,
        len = datas[0].length,
        rightyaxisseialnums = Number(rule.rightyaxisseialnums),
        separate1 = function(array) {
            var temp = [];
            for (var i = 0,
            l = array.length; i < l; i++) {
                temp.push(array[i].slice(0, len - rightyaxisseialnums));
            }
            return temp;
        } (datas, len, rightyaxisseialnums),
        separate2 = function(array) {
            var temp = [];
            for (var i = 0,
            l = array.length; i < l; i++) {
                temp.push(array[i].slice(rightyaxisseialnums));
            }
            return temp;
        } (datas, len, rightyaxisseialnums),
        arraymax = T.array.arrayMax(datas);

        data.table = separate1;
        delete data.cells;
        delete data.datagrid;
        var data1 = T.cloneDeep(data);
        delete data1.title;
        data1.toolkey = data1.toolkey.slice(0, len - rightyaxisseialnums);
        data.table = separate2;
        var data2 = T.cloneDeep(data);
        data2.toolkey = data2.toolkey.slice(rightyaxisseialnums);

        var chart = this.draw({
            'output': true,
            'key': false,
            'chartX': false,
            'type': (type === 16 ? 1 : 3),
            'is_multi': is_multi,
            'rule': rule,
            'data': data1
        });
        var line = this.draw({
            'output': true,
            'type': 7,
            'chartX': false,
            'key': false,
            'is_multi': is_multi,
            'rule': rule,
            'data': data2
        });

        var combo = new RGraph.CombinedChart(chart, line);     
		   if (rule.legenddata !== '' && rule.legenddata !== undefined) {
            line.Set('key', data.toolkey);
            line.Set('key.background', 'rgba(255,255,255,0.8)');
            line.Set('key.rounded', true);
            line.Set('chart.key.position', 'gutter');
            line.Set('chart.key.position.gutter.boxed', false);
            line.Set('chart.key.position.y', 550);
        }

        combo.Draw();

        chart.Set('chart.labels', data.chartX);

        var yidong = (rule.numprefix || '') + (rule.numsuffix || '');
        yidong = yidong.length * 10;
        if (rule.numdigit !== '0' && rule.numdigit !== undefined) {

            chart.Set('chart.units.post', '.' + T.string.repeat('0', rule.numdigit));

            yidong += Number(rule.numdigit) * 10;

        }
        marginLeft += yidong;
        yaxis1 = new RGraph.Drawing.YAxis(this.cvs, 750 - yidong || 0);
        yaxis1.Set('chart.align', 'right');
        yaxis1.Set('noaxes', true);
        yaxis1.Set('hmargin', 5);
        yaxis1.Set('gutter.bottom', 80);
        if (rule.numdigit !== 0 && rule.numdigit !== undefined) {

            yaxis1.Set('chart.units.post', '.' + T.string.repeat('0', rule.numdigit));
            //marginLeft+=Number(rule.numdigit)*10;
        }

        yaxis1.Set('chart.colors', ['black']);
        yaxis1.Set('chart.text.color', 'black');
        yaxis1.Set('chart.max', arraymax);
        yaxis1.Draw();

    }
}