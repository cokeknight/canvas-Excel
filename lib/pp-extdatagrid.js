
Object.extend = function(destination, source) {
    for (property in source) {
        destination[property] = source[property];
    }
    return destination;
}

Array.prototype.indexOf = function(Object) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == Object) {
            return i;
        }
    }
    return - 1;
}

// JavaScript Document
function ExtDataGrid(config) {
    /*property
	        datagrid
	        scrollX
	        scrollY
	*/
    Component.call(this, config);

    $this = this;
    //继承Component

    var data = {
        x: 0.5,
        y: 0.5,
        width: $this.getWidth() - 20.5,
        height: $this.getHeight() - 20.5
    };
    if ($this.localStorageName !== undefined) {
        if (localStorage.getItem($this.localStorageName)) {
            data = JSON.parse(localStorage.getItem($this.localStorageName));
        }
    }
	

    var dataGrid = new DataGrid(data);
    document.body.onkeypress = function(event) {
        if (event.target.nodeName.toUpperCase() !== 'INPUT') dataGrid.keypress(event);
    };
    document.body.onkeydown = function(event) {
        if (event.target.nodeName.toUpperCase() !== 'INPUT') dataGrid.commandKey(event);
    };

    var scrollX = new ScrollBar({
        x: ($this.getWidth() - 21) / 2,
        y: ($this.getHeight() - 20.5),
        length: ($this.getWidth() - 21) / 2,
        dirType: 'x',
		barWidth: 16,
        leftarrowmousedown: scrollxleftarrowmousedown,
        leftblankmousedown: scrollxleftblankmousedown,
        leftblankmouseup: scrollxleftblankmouseup,
        scrollbarmousemove: scrollxbarmousemove,
        scrollbarmouseup: scrollxbarmouseup,
        rightblankmousedown: scrollxrightblankmousedown,
        rightblankmouseup: scrollxrightblankmouseup,
        rightarrowmousedown: scrollxrightarrowmousedown
        //leftblank

    });
    function scrollxleftarrowmousedown() //scroll bar 左侧点击的代码
    {
        if (dataGrid.getScrollColNum() > 0 && scrollX.getMouseFocus() == "leftarrow") {
            dataGrid.setScrollColNum(dataGrid.getScrollColNum() - 1); //设置显示的列数少一
            scrollX.setScrollParamter(dataGrid.getScrollLeft(), dataGrid.getGridZoneWidth(), dataGrid.getFullWidth()); //设置scrllbar的位置
            dataGrid.clear();
            dataGrid.paint();
            scrollX.clear();
            scrollX.paint();
            setTimeout(scrollxleftarrowmousedown, 100);
        }
    }

    function _scrollxleftblankmousedown(e) {
        return function() {
            scrollxleftblankmousedown(e);
        }
    }

    function scrollxleftblankmousedown(e) //scrollbar 点击白板
    {
        var canpos = glGetMouseCanvasXY(e);
        var compos = scrollX.getCanvasXY();
        var ctrx = canpos.x - compos.x;
        var ctry = canpos.y - compos.y;
        if ((scrollX.getScrollLength() > ctrx - scrollX.getBarWidth()) && scrollX.getMouseFocus() == "leftblank") {
            if (scrollX.getScrollLength() - scrollX.getScrollBarLength() >= 0) {
                scrollX.setScrollParamter(scrollX.getScrollLength() - scrollX.getScrollBarLength(), scrollX.getScrollBarLength(), scrollX.getScrollZoneLength());
            } else {
                scrollX.setScrollParamter(0, scrollX.getScrollBarLength(), scrollX.getScrollZoneLength());
            }
            var scrolllength = scrollX.getScrollLength();
            var scrollbarlength = scrollX.getScrollBarLength();
            var scrollzonelength = scrollX.getScrollZoneLength();
            var gridscrolllength = dataGrid.getGridZoneWidth() * scrolllength / scrollbarlength;
            var arrrow = dataGrid.getColByDisToLeft(gridscrolllength);
            if (arrrow.half) {
                dataGrid.setScrollColNum(arrrow.col);
            } else {
                dataGrid.setScrollColNum(arrrow.col - 1);
            }
            dataGrid.clear();
            dataGrid.paint();
            scrollX.clear();
            scrollX.paint();
            window.setTimeout(_scrollxleftblankmousedown(e), 100);
        }
    }

    function scrollxleftblankmouseup() {
        scrollX.setScrollParamter(dataGrid.getScrollLeft(), dataGrid.getGridZoneWidth(), dataGrid.getFullWidth());
        scrollX.paint();
    }

    function scrollxbarmousemove() {
        var scrolllength = scrollX.getScrollLength();
        var scrollbarlength = scrollX.getScrollBarLength();
        var scrollzonelength = scrollX.getScrollZoneLength();
        var gridscrolllength = dataGrid.getGridZoneWidth() * scrolllength / scrollbarlength;
        var arrrow = dataGrid.getColByDisToLeft(gridscrolllength);
        if (arrrow.half) {
            dataGrid.setScrollColNum(arrrow.col);
        } else {
            dataGrid.setScrollColNum(arrrow.col - 1);
        }
        dataGrid.clear();
        dataGrid.paint();
    }

    function scrollxbarmouseup() {
        scrollX.setScrollParamter(dataGrid.getScrollLeft(), dataGrid.getGridZoneWidth(), dataGrid.getFullWidth());
        scrollX.paint();
    }

    function _scrollxrightblankmousedown(e) {
        return function() {
            scrollxrightblankmousedown(e);
        }
    }

    function scrollxrightblankmousedown(e) {
        var canpos = glGetMouseCanvasXY(e);
        var compos = scrollX.getCanvasXY();
        var ctrx = canpos.x - compos.x;
        var ctry = canpos.y - compos.y;
        if (scrollX.getMouseFocus() == "rightblank" && (scrollX.getScrollLength() + scrollX.getScrollBarLength() < ctrx - scrollX.getBarWidth())) {
            if (scrollX.getScrollLength() + 2 * scrollX.getScrollBarLength() < scrollX.getScrollZoneLength()) {
                scrollX.setScrollParamter(scrollX.getScrollLength() + scrollX.getScrollBarLength(), scrollX.getScrollBarLength(), scrollX.getScrollZoneLength());
            } else {
                scrollX.setScrollParamter(scrollX.getScrollZoneLength() - scrollX.getScrollBarLength(), scrollX.getScrollBarLength(), scrollX.getScrollZoneLength());
            }
            var scrolllength = scrollX.getScrollLength();
            var scrollbarlength = scrollX.getScrollBarLength();
            var scrollzonelength = scrollX.getScrollZoneLength();
            var gridscrolllength = dataGrid.getGridZoneWidth() * scrolllength / scrollbarlength;
            var arrrow = dataGrid.getColByDisToLeft(gridscrolllength);
            if (arrrow.half) {
                dataGrid.setScrollColNum(arrrow.col);
            } else {
                dataGrid.setScrollColNum(arrrow.col - 1);
            }
            dataGrid.clear();
            dataGrid.paint();
            scrollX.clear();
            scrollX.paint();
            window.setTimeout(_scrollxrightblankmousedown(e), 100);
        }
    }

    function scrollxrightblankmouseup() {
        scrollX.setScrollParamter(dataGrid.getScrollLeft(), dataGrid.getGridZoneWidth(), dataGrid.getFullWidth());
        scrollX.paint();
    }

    function scrollxrightarrowmousedown() {
        if (scrollX.getMouseFocus() == "rightarrow" && dataGrid.getScrollColNum() < dataGrid.getColsCount() - 1) {
            dataGrid.setScrollColNum(dataGrid.getScrollColNum() + 1);
            scrollX.setScrollParamter(dataGrid.getScrollLeft(), dataGrid.getGridZoneWidth(), dataGrid.getFullWidth());
            dataGrid.clear();
            dataGrid.paint();
            scrollX.clear();
            scrollX.paint();
            window.setTimeout(scrollxrightarrowmousedown, 100);
        }
    }

    var scrollY = new ScrollBar({
        x: $this.getWidth() - 20.5,
        y: 0.5,
        length: $this.getHeight()-5,
        dirType: 'y',
		barWidth:16,
        leftarrowmousedown: scrollyleftarrowmousedown,
        leftblankmousedown: scrollyleftblankmousedown,
        leftblankmouseup: scrollyleftblankmouseup,
        scrollbarmousemove: scrollyscrollbarmousemove,
        scrollbarmouseup: scrollyscrollbarmouseup,
        rightblankmousedown: scrollyrightblankmousedown,
        rightblankmouseup: scrollyrightblankmouseup,
        rightarrowmousedown: scrollyrightarrowmousedown
    });

    function scrollyleftarrowmousedown() {
        if (dataGrid.getScrollRowNum() > 0 && scrollY.getMouseFocus() == "leftarrow") {
            dataGrid.setScrollRowNum(dataGrid.getScrollRowNum() - 1);
            scrollY.setScrollParamter(dataGrid.getScrollTop(), dataGrid.getGridZoneHeight(), dataGrid.getFullHeight());
            dataGrid.clear();
            dataGrid.paint();
            scrollY.clear();
            scrollY.paint();
            window.setTimeout(scrollyleftarrowmousedown, 100);
        }
    }

    function _scrollyleftblankmousedown(e) {
        return function() {
            scrollyleftblankmousedown(e);
        };
    }

    function scrollyleftblankmousedown(e) {
        var compos = scrollY.getCanvasXY();
        var canpos = glGetMouseCanvasXY(e);
        var ctrx = canpos.x - compos.x;
        var ctry = canpos.y - compos.y;
        if (scrollY.getScrollLength() > ctry - scrollY.getBarWidth() && scrollY.getMouseFocus() == "leftblank") {
            if (scrollY.getScrollLength() - scrollY.getScrollBarLength() >= 0) {
                scrollY.setScrollParamter(scrollY.getScrollLength() - scrollY.getScrollBarLength(), scrollY.getScrollBarLength(), scrollY.getScrollZoneLength());
            } else {
                scrollY.setScrollParamter(0, scrollY.getScrollBarLength(), scrollY.getScrollZoneLength());
            }
            var scrolllength = scrollY.getScrollLength();
            var scrollbarlength = scrollY.getScrollBarLength();
            var scrollzonelength = scrollY.getScrollZoneLength();
            var gridscrolllength = dataGrid.getGridZoneHeight() * scrolllength / scrollbarlength;
            var arrrow = dataGrid.getRowByDisToTop(gridscrolllength);
            if (arrrow.half) {
                dataGrid.setScrollRowNum(arrrow.row);
            } else {
                dataGrid.setScrollRowNum(arrrow.row - 1);
            }
            dataGrid.clear();
            dataGrid.paint();
            scrollY.clear();
            scrollY.paint();
            window.setTimeout(_scrollyleftblankmousedown(e), 100);
        }
    }

    function scrollyleftblankmouseup() {
        scrollY.setScrollParamter(dataGrid.getScrollTop(), dataGrid.getGridZoneHeight(), dataGrid.getFullHeight());
        scrollY.clear();
        scrollY.paint();
    }

    function scrollyscrollbarmousemove() {
        var scrolllength = scrollY.getScrollLength();
        var scrollbarlength = scrollY.getScrollBarLength();
        var scrollzonelength = scrollY.getScrollZoneLength();
        var gridscrolllength = dataGrid.getGridZoneHeight() * scrolllength / scrollbarlength;
        var arrrow = dataGrid.getRowByDisToTop(gridscrolllength);
        if (arrrow.half) {
            dataGrid.setScrollRowNum(arrrow.row);
        } else {
            dataGrid.setScrollRowNum(arrrow.row - 1);
        }
        dataGrid.clear();
        dataGrid.paint();
    }

    function scrollyscrollbarmouseup() {
        scrollY.setScrollParamter(dataGrid.getScrollTop(), dataGrid.getGridZoneHeight(), dataGrid.getFullHeight());
        scrollY.paint();
    }

    function _scrollyrightblankmousedown(e) {
        return function() {
            scrollyrightblankmousedown(e);
        }
    }

    function scrollyrightblankmousedown(e) {
        var compos = scrollY.getCanvasXY();
        var canpos = glGetMouseCanvasXY(e);
        var ctrx = canpos.x - compos.x;
        var ctry = canpos.y - compos.y;
        if (scrollY.getMouseFocus() == "rightblank" && scrollY.getScrollLength() + scrollY.getScrollBarLength() < ctry - scrollY.getBarWidth()) {
            if (scrollY.getScrollLength() + 2 * scrollY.getScrollBarLength() < scrollY.getScrollZoneLength()) {
                scrollY.setScrollParamter(scrollY.getScrollLength() + scrollY.getScrollBarLength(), scrollY.getScrollBarLength(), scrollY.getScrollZoneLength());
            } else {
                scrollY.setScrollParamter(scrollY.getScrollZoneLength() - scrollY.getScrollBarLength(), scrollY.getScrollBarLength(), scrollY.getScrollZoneLength());
            }
            var scrolllength = scrollY.getScrollLength();
            var scrollbarlength = scrollY.getScrollBarLength();
            var scrollzonelength = scrollY.getScrollZoneLength();
            var gridscrolllength = dataGrid.getGridZoneHeight() * scrolllength / scrollbarlength;
            var arrrow = dataGrid.getRowByDisToTop(gridscrolllength);
            if (arrrow.half) {
                dataGrid.setScrollRowNum(arrrow.row);
            } else {
                dataGrid.setScrollRowNum(arrrow.row - 1);
            }
            dataGrid.clear();
            dataGrid.paint();
            window.setTimeout(_scrollyrightblankmousedown(e), 100);
        }
    }

    function scrollyrightblankmouseup() {
        scrollY.setScrollParamter(dataGrid.getScrollTop(), dataGrid.getGridZoneHeight(), dataGrid.getFullHeight());
        scrollY.paint();
    }

    function scrollyrightarrowmousedown() {
        if (scrollY.getMouseFocus() == "rightarrow" && dataGrid.getScrollRowNum() < dataGrid.getRowsCount() - 1) {
            dataGrid.setScrollRowNum(dataGrid.getScrollRowNum() + 1);
            scrollY.setScrollParamter(dataGrid.getScrollTop(), dataGrid.getGridZoneHeight(), dataGrid.getFullHeight());
            dataGrid.clear();
            dataGrid.paint();
            scrollY.clear();
            scrollY.paint();
            setTimeout(scrollyrightarrowmousedown, 100);
        }
    }
    scrollX.setScrollParamter(dataGrid.getScrollLeft(), dataGrid.getGridZoneWidth(), dataGrid.getFullWidth());
    scrollY.setScrollParamter(dataGrid.getScrollTop(), dataGrid.getGridZoneHeight(), dataGrid.getFullHeight());

    function numdisplay() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menu = new clickbox(dataGrid);
        var menuItem = [{
            'itemText': '常规',
            'itemsm': '常规单元格式没有指定数字格式',
			'index':1
        },

        {
            'itemText': '数值',
            'itemsm': '普通数值格式(如3.12,12)',
			'index':1
        },

        {
            'itemText': '人民币',
            'itemsm': '人民币格式(如￥3.12),选择相应的小数位',
			'index':2
        },

        {
            'itemText': '美元币',
            'itemsm': '美元币格式(如$3.12)，选择相应的小数位',
			'index':3
        },

        {
            'itemText': '百分比',
            'itemsm': '百分比格式(如31.2%)，选择相应的小数位',
			'index':4
        },

        {
            'itemText': '千位分隔式样',
            'itemsm': '千位分隔式样格式(如3,120)，选择相应的小数位',
			'index':5
        },

        {
            'itemText': '欧元符号',
            'itemsm': '欧元格式(如€3.12)，选择相应的小数位',
			'index':6
        },

        {
            'itemText': '财务大写',
            'itemsm': '设置为财务大写格式，如123，显示为壹佰贰拾叁元整',
			'index':7
        },

        {
            'itemText': '文本',
            'itemsm': '设置为文本格式，数字也按文本显示',
			'index':8
        },

        {
            'itemText': '套打大写',
            'itemsm': '',
			'index':11
        },

        {
            'itemText': '中文数字小写',
            'itemsm': '设置为中文数字小写格式。如123，显示为一百二十三',
			'index':12
        },

        {
            'itemText': '中文数字大写',
            'itemsm': '设置为中文数字大写格式。如123，显示为壹佰贰拾叁元',
			'index':13
        },

        {
            'itemText': '一，二，三序号',
            'itemsm': '设置为一，二，三序号格式',
			'index':14
        },

        {
            'itemText': 'a,b,c序号',
            'itemsm': '设置为a,b,c序号格式',
			'index':15
        },

        {
            'itemText': 'A,B,C序号',
            'itemsm': '设置为A,B,C序号格式',
			'index':16
        },

        {
            'itemText': '以10的n次相乘',
            'itemsm': '以10的n次相乘',
			'index':17
        },

        {
            'itemText': '以10的n次相除',
            'itemsm': '以10的n次相除',
			'index':18
        },
        ];
        menu.addItem(menuItem);
        menu.rendhtml(cell._textFormat);

    }
	function cellorder(){
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menuItem = {
            'itemText': '设置用户自定义字符值',
            'itemsm': 'orderrule',
            'itermtype': 'textarea'
        };
        var menu = new setcellorder(menuItem, dataGrid);
        menu.rendhtml(cell._cellTag);
	}
    function celldisplay() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menu = new clickboxCellDate({
            "width": 360,
            "height": 300
        },
        dataGrid);
        var menuItem = [{
            'itemText': '日期',
            'tag': 'date',
            'child': [{
                'itemText': '2004-6-16',
                'itemsm': 'yyyy-m-d'
            },

            {
                'itemText': '2004年6月16日',
                'itemsm': 'yyyy年m月d日;@'
            },

            {
                'itemText': '2004年6月',
                'itemsm': 'yyyy年m月;@'
            },

            {
                'itemText': '6月16日',
                'itemsm': 'm月d日;@'
            },

            {
                'itemText': '2004-6-16 1:30 PM',
                'itemsm': 'yyyy-m-d h:mm AM/PM;@'
            },

            {
                'itemText': '2004-6-16 1:30',
                'itemsm': 'yyyy-m-d h:mm;@'
            },

            {
                'itemText': '6-16',
                'itemsm': 'm-d;@'
            },

            {
                'itemText': '6-16-04',
                'itemsm': 'm-d-yy;@'
            },

            {
                'itemText': '06-16-04',
                'itemsm': 'mm-dd-yy;@'
            },

            {
                'itemText': '04-6-16',
                'itemsm': 'yy-m-d;@'
            },

            {
                'itemText': '16-June',
                'itemsm': 'd-mmm;@'
            },

            {
                'itemText': '16-June-04',
                'itemsm': 'd-mmm-yy;@'
            },

            {
                'itemText': '06-June-04',
                'itemsm': 'dd-mmm-yy;@'
            },

            {
                'itemText': 'June-04',
                'itemsm': 'mmm-yy;@'
            },

            {
                'itemText': 'March-04',
                'itemsm': 'mmmm-yy;@'
            },

            {
                'itemText': '星期三',
                'itemsm': 'aaaa;@'
            }]
        },
        {
            'itemText': '时间',
            'tag': 'time',
            'child': [{
                'itemText': '3:56:16',
                'itemsm': 'h:mm:ss;@'
            },

            {
                'itemText': '3:56',
                'itemsm': 'h:mm;@'
            },

            {
                'itemText': '3:56 PM',
                'itemsm': 'h:mm AM/PM;@'
            },

            {
                'itemText': '3:56:16 PM',
                'itemsm': 'h:mm:ss AM/PM;@'
            },

            {
                'itemText': '3时56分',
                'itemsm': 'h"时"mm"分";@'
            },
            ]

        },
        {
            'itemText': '全部',
            'tag': 'all'
        },
        ];
        menu.addItem(menuItem);
        menu.rendhtml(cell._textFormat);

    }

    function slantline() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menu = new clickboxslantline(dataGrid);
        var menuItem = [{
            'itemText': '无',
            'itemsm': 'none'
        },
        {
            'itemText': '对角线',
            'itemsm': 'slantline'
        },       
		{
            'itemText': '上对角线',
            'itemsm': 'tslantline'
        },      
		  {
            'itemText': '下对角线',
            'itemsm': 'bslantline'
        },
        {
            'itemText': '横线',
            'itemsm': 'cslantline'
        },

        {
            'itemText': '竖线',
            'itemsm': 'vslantline'
        },

        {
            'itemText': '根据文字分隔符产生对应的竖线',
            'itemsm': 'bvslantline'
        },

        {
            'itemText': '根据文字分隔符产生对应的横线',
            'itemsm': 'bcslantline'
        },       
		{
            'itemText': '反对角线',
            'itemsm': 'aslantline'
        },

        ];
        menu.addItem(menuItem);
        menu.rendhtml(cell._textFormat);
    }
    function customizenum() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menuItem = {
            'itemText': '设置用户自定义数值',
            'itemsm': 'num',
            'itermtype': 'input',
            'boxheight': '120px'
        };
        var menu = new customizeCell(menuItem, dataGrid);
        menu.rendhtml(cell._uval);
    }
    function customizestring() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menuItem = {
            'itemText': '设置用户自定义字符值',
            'itemsm': 'string',
            'itermtype': 'textarea'
        };
        var menu = new customizeCell(menuItem, dataGrid);
        menu.rendhtml(cell._sval);
    }
    function customizename() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menuItem = {
            'itemText': '设置当前单元变量名称',
            'itemsm': 'name',
            'itermtype': 'input',
            'iteminstruction': '注意：只对当前选中区域中的一个单元操作。单元变量名必须以V_或P_开头，并且不能重复，其中以V_开头表示当前单元，以P_开头表示当前单元的上一个单元，变量名只能以字母，数字，中文等组合而成，中间不能有空格'
        };
        var menu = new customizeCell(menuItem, dataGrid);
        menu.rendhtml(cell._bname);
    }
    function editfrozenCell() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menuItem = {
            'itemText': '设置单元是否可编辑',
            'itemsm': 'name',
            'itermtype': 'input',
            'iteminstruction': '注意：只对当前选中区域中的一个单元操作。单元变量名必须以V_或P_开头，并且不能重复，其中以V_开头表示当前单元，以P_开头表示当前单元的上一个单元，变量名只能以字母，数字，中文等组合而成，中间不能有空格'
        };
        var menu = new frozenCell(menuItem, dataGrid);
        menu.rendhtml(cell._fl, dataGrid._caneditform);

    }
    function uploadimgToCanavs(type) {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');

        var menuItem = {
            'itemText': '设置当前单元变量名称',
            'itemsm': 'name',
            'itermtype': 'input',
            'iteminstruction': '注意：只对当前选中区域中的一个单元操作。单元变量名必须以V_或P_开头，并且不能重复，其中以V_开头表示当前单元，以P_开头表示当前单元的上一个单元，变量名只能以字母，数字，中文等组合而成，中间不能有空格'
        };

        var menu = new uploadImg(menuItem, dataGrid, type);

        menu.rendhtml(cell._frozenCell, cell._frozenCellAll);
    }
    function customTurnAngle() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '设置旋转角度',
            'itemsm': 'name',
            'itermtype': 'input',
            'iteminstruction': '',
            'boxheight': '120px'
        };
        var menu = new customizeAngle(menuItem, dataGrid);
        menu.rendhtml(cell._customizeCell);
    }
    function saveAsCanvasToLocal() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '设置另存为名称',
            'itemsm': 'name',
            'itermtype': 'input',
            'iteminstruction': '',
            'boxheight': '120px'
        };
        var menu = new saveAsCanvas(menuItem, dataGrid);
        menu.rendhtml(cell._customizeCell);
    }
    function exportCanvasToLocal() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '设置导出为名称',
            'itemsm': 'name',
            'itermtype': 'input',
            'iteminstruction': '',
            'boxheight': '120px'
        };
        var menu = new exportAsCanvas(menuItem, dataGrid);
        menu.rendhtml(cell._customizeCell);
    }
    function cellCustomScript() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '单元字段定义脚本',
            'itemsm': 'script',
            'itermtype': 'textarea',
            'iteminstruction': '',
            'boxheight': '240px'
        };
        var menu = new editcellCustomScript(menuItem, dataGrid);
        menu.rendhtml(['',cell._note]);
    }
    function canvasStatisticscript() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '报表统计脚本',
            'itemsm': 'script',
            'itermtype': 'textarea',
            'iteminstruction': '',
            'boxheight': '240px'
        };
        var menu = new editStatisticscript(menuItem, dataGrid);
        menu.rendhtml(['', dataGrid._StatisticScript]);
    }
    function celldropdownbox() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '下拉框',
            'itemsm': 'script',
            'itermtype': 'textarea',
            'iteminstruction': '',
            'boxheight': '250px'
        };
        var menu = new editcelldropdownbox(menuItem, dataGrid);
        menu.rendhtml(cell._clco);
    }
    function editCellTimeControls() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '日期时间控件',
            'itemsm': 'script',
            'itermtype': 'textarea',
            'iteminstruction': '',
            'boxheight': '240px'
        };
        var menu = new editcellTimeControls(menuItem, dataGrid);
        menu.rendhtml(cell._controlsItem);
    }
    function editCellUrl() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '设置超级链接',
			'list':[
				{ 'itemsm': 'url',
            	  'itermtype': 'text',
           	      'itemtitle': '输入url'
				},
				{ 'itemsm': 'newwin',
            	  'itermtype': 'checkbox',
           	      'itemtitle': '在新窗口中打开链接'
				}
			],
            'boxheight': '260px',
            'boxwidth': '400px',
            'iteminstruction': '<p>如果是网站地址则以http://开头,如http://www.chinaexcel.com</p><p>如果是邮件地址,则以mailto:开头,如mailto:chinaexcel@sohu.com</p><p>如果是访问文件,则以file://开头,如file://C:dbcconf.log</p><p>如果是ftp地址,则以ftp://开头,如ftp://ftp.soft198.com'
        };
        var menu = new editCellUrlbox(menuItem, dataGrid);
        menu.rendhtml(cell._cellurl);
    }
    function uploadxml() {
        clearCeng('myContextMenu');

        var menuItem = {
            'itemText': '导入chinaexcel xjc文件',
        };

        var menu = new uploadImg(menuItem, dataGrid, 'xml');

        menu.rendhtml();
    }

    /*菜单*/
    /*
	var menu  =  document.createElement("div");
	menu.style.width = ($this.getWidth()-2)+"px";
	menu.style.backgroundImage = "url(image/back.jpg)";
	menu.style.backgroundRepeat = "repeat";
	menu.style.height = "24px";
	menu.style.borderWidth = "1px";
	menu.style.borderStyle = "solid";
	menu.style.borderColor = "#00f";
	menu.style.lineHeight = "24px";
	menu.style.fontSize = "12px";
	menu.style.textAlign = "left";
	menu.style.listStyle = "none";
	menu.style.margin = "auto";
	glGetRenderTo().insertBefore(menu,glGetCanvas());
	
	var fileitem = document.createElement("li");
	fileitem.innerHTML = "file";
	fileitem.onmouseover = function(){};
	menu.appendChild(fileitem);
	*/
    /*快捷工具栏*/
	if(!chartOnly){
	var now=new Date(); 
	var number = now.getYear().toString()+now.getMonth().toString()+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString();
	var leftBar = document.createElement("div");
    leftBar.id = "mainleft";
    leftBar.innerHTML = T.ajax.ajaxGet('lib/htmllib/leftbar.html',false,false);//使用缓存，同步加载

	var leftbarjson=T.ajax.ajaxGetJson("html/leftbar.js?"+number,function(responseText){
				if(responseText!==''){
					responseText= eval('(' + responseText + ')');
				}	
				
				new leftbar(leftBar,responseText,dataGrid);
		},true);

	glGetRenderTo().insertBefore(leftBar, document.getElementById("_editBox"));
	}
	var mainDiv = document.createElement("div");
    mainDiv.id = "maincontent";
	glGetRenderTo().insertBefore(mainDiv, document.getElementById("_editBox"));

    var tbarframe = document.createElement("div");

    pickerFaceColor = 'ThreeDFace'; // CSS color
    pickerBorder = 1; // px
    pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight'; // CSS color

    //	tbarframe.style.border = pickerBorder + 'px solid';
    //    tbarframe.style.borderColor = pickerBorderColor;
    //    tbarframe.style.background = pickerFaceColor;
    tbarframe.className = "toolbar";
    tbarframe.id = "tbarframe";
    //tbarframe.style.backgroundRepeat = "repeat";
    tbarframe.style.width = ($this.getWidth() - 2) + "px";
    tbarframe.style.margin = "auto";
    tbarframe.style.textAlign = "left";
    
    var systemframe = document.createElement("div");
    systemframe.id = "tbar1";
    systemframe.className = "toolbar";
    //    systemframe.style.borderColor = pickerBorderColor;
    //    systemframe.style.background = pickerFaceColor;
    systemframe.style.width = ($this.getWidth() - 2) + "px";
    systemframe.style.margin = "auto";
    systemframe.style.height = "20px";
    systemframe.style.textAlign = "left";
    mainDiv.appendChild(systemframe);
	mainDiv.appendChild(tbarframe);
	mainDiv.appendChild(_gl_canvas);

    var sytbar1 = document.createElement("div");
    systemframe.appendChild(sytbar1);

    var sytbar1_file = document.createElement("span");
    sytbar1_file.innerHTML = "文件";
    sytbar1_file.title = "文件";
    sytbar1_file.style.marginLeft = "10px";
    sytbar1_file.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_file);
    var storage = localStorage;
    var filename = [];
    for (var i = 0; i < storage.length; i++) {
        var storageName = storage.key(i);
        if (storageName.indexOf('LocalData') == -1) {

            filename.push({
                'itemText': storageName,
                'ev': function(storageName) {
                    return function() {
                        document.body.innerHTML = '';
                        window.onload(storageName);

                    }
                } (storageName)
            });
        }
    }
    sytbar1_file.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [/*{
            'itemText': '打开',
            'child': filename
        },*/
        {
            'itemText': '保存',
            'ev': function() {
				if(_gl_filename!==undefined){
					exportXml(dataGrid);//导出xjc文件
				}else{
					alert('当前不存在工作表！');	
				}
            }
        }/*,
        {
            'itemText': '另存为',
            'ev': function() {
                saveAsCanvasToLocal();
            }
        }*/,
        {
            'itemText': '重新加载数据',
            'ev': function() {
               // if (confirm("确定要清空所有数据?")) {
					if(_gl_filename!==undefined){
                    	localStorage.removeItem(_gl_filename);
						dataGrid.importxml('html/upload/' + _gl_filename,true);
					}else{
						alert('当前不存在工作表！');	
					}
               // }
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '导出',
            'ev': function() {
				if(_gl_filename!==undefined){
					exportXml(dataGrid);//导出xjc文件
					window.open('html/lib/savefie.php?filename='+encodeURIComponent(_gl_filename));
				}else{
					alert('当前不存在工作表！');	
				}
				clearCeng('myContextMenu');
            }
        },
        /*{
            'itemText': '导入',
            'ev': function() {
                uploadxml();
                //dataGrid.importxml();
            }
        },*/
        {
            'itemText': '设为工作表',
            'ev': function() {
				if(_gl_filename!==undefined){
					window.location='?filename='+encodeURIComponent(_gl_filename);
				}else{
					alert('当前不存在工作表！');	
				}
				
            }
        }
		];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    }
    var sytbar1_geshi = document.createElement("span");
    sytbar1_geshi.style.marginLeft = '10px';
    sytbar1_geshi.innerHTML = "编辑";
    sytbar1_geshi.title = "编辑";
    sytbar1_geshi.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_geshi);
    sytbar1_geshi.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '插入行',
             'child': [{
                    'itemText': '前插行',
                    'ev': function() {
						dataGrid.insertRowBefore();
						clearCeng('myContextMenu');
                    }
                },{
                    'itemText': '后插行',
                    'ev': function() {
						dataGrid.insertRowAfter();
						clearCeng('myContextMenu');
                    }
                },
            {
                'itemType': 'line'
            },{
                    'itemText': '插入格式行',
                    'ev': function() {
                            var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
							var menuItem = {
								'boxheight': '160px',
								'boxwidth': '400px'
							};
							
							var menu = new customizeBox(menuItem,dataGrid,function(){
									var form = document.selbutton;
										dataGrid.insertFormatRow(form.firstrow.value,form.rownums.value,form.startrow.value,form.endrow.value );
										clearCeng('myContextMenu');
										dataGrid.clear();
										dataGrid.paint();
								});
							menu.rendhtml(T.ajax.ajaxGet('lib/htmllib/inserFormatLine.html'),function(){
																					var form = document.selbutton;
																						form.firstrow.value   =dataGrid._focusRow+1;
																						
																						form.startrow.value    =dataGrid._focusRow+1;
																						form.endrow.value 		=dataGrid._focusRow+1;
																					});

                  clearCeng('myContextMenu');
                    }
                },{
                    'itemText': '拷贝格式行',
                    'ev': function() {
                            var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
							var menuItem = {
								'boxheight': '160px',
								'boxwidth': '400px'
							};
							var menu = new customizeBox(menuItem,dataGrid,function(){
									var form = document.selbutton;
										dataGrid.copyFormatRow(form.copysrow.value,form.copyerow.value,form.startrow.value,form.endrow.value );
										clearCeng('myContextMenu');
										dataGrid.clear();
										dataGrid.paint();
								});
							menu.rendhtml(T.ajax.ajaxGet('lib/htmllib/copyFormatLine.html'),function(){
																					var form = document.selbutton;
																						form.copysrow.value   =dataGrid._focusRow+1;
																						form.copyerow.value   =dataGrid._focusRow+1;
																						form.startrow.value    =dataGrid._focusRow+2;
																						form.endrow.value 		=dataGrid._focusRow+2;
																					});

                    clearCeng('myContextMenu');
                    }
                }]
        },{
            'itemText': '插入列',
             'child': [{
                    'itemText': '前插列',
                    'ev': function() {
						dataGrid.insertColBefore();
						clearCeng('myContextMenu');
                    }
                },{
                    'itemText': '后插列',
                    'ev': function() {
						dataGrid.insertColAfter();
						clearCeng('myContextMenu');
                    }
                },
            {
                'itemType': 'line'
            },{
                    'itemText': '插入格式列',
                    'ev': function() {
                            var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
							var menuItem = {
								'boxheight': '160px',
								'boxwidth': '400px'
							};
							var menu = new customizeBox(menuItem,dataGrid,function(){
									var form = document.selbutton;
										dataGrid.insertFormatCol(form.firstrow.value,form.rownums.value,form.startrow.value,form.endrow.value );
										clearCeng('myContextMenu');
										dataGrid.clear();
										dataGrid.paint();
								});
							menu.rendhtml(T.ajax.ajaxGet('lib/htmllib/inserFormatCol.html'),function(){
																					var form = document.selbutton;
																						form.firstrow.value   =dataGrid._focusCol+1;
																						
																						form.startrow.value    =dataGrid._focusCol+1;
																						form.endrow.value 		=dataGrid._focusCol+1;
																					});

                    clearCeng('myContextMenu');
                    }
                },{
                    'itemText': '拷贝格式列',
                    'ev': function() {
                        var ControlsItem = {};
                        ControlsItem.type = "radiobutton";
                        ControlsItem.noedit = 0;

                        dataGrid.setCellControlsItem(ControlsItem);
                        clearCeng('myContextMenu');
                        dataGrid.clear();
                        dataGrid.paint();
                    }
                }]
        },{
            'itemText': '删除行',
            'ev': function() {
                dataGrid.delCanvasRow();
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '删除列',
            'ev': function() {
                dataGrid.delCanvasCol();
				clearCeng('myContextMenu');
            }
        }

        ];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    }


    var sytbar1_geshi = document.createElement("span");
    sytbar1_geshi.style.marginLeft = '10px';
    sytbar1_geshi.innerHTML = "格式";
    sytbar1_geshi.title = "格式";
    sytbar1_geshi.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_geshi);
    sytbar1_geshi.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '文字自动换行',
            'ev': function() {
                dataGrid.setAutoLineFeed();
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '单元显示格式',
            'ev': function() {
                celldisplay();
            }
        },
        {
            'itemText': '单元数字显示格式',
            'ev': function() {
                numdisplay();
            }
        },
        {
            'itemText': '设置单元显示序号',
            'ev': function() {
                cellorder();
            }
        }, {
            'itemText': '单元控件类型',
            'child': [{
                'itemText': '单选框',
                'child': [{
                    'itemText': '单元内文字可编辑的单选框',
                    'ev': function() {
                        var ControlsItem = {};
                        ControlsItem.type = "radiobutton";
                        ControlsItem.noedit = 0;

                        dataGrid.setCellControlsItem(ControlsItem);
                        clearCeng('myContextMenu');
                        dataGrid.clear();
                        dataGrid.paint();
                    }
                },
                {
                    'itemText': '单元内文字不可编辑的单选框',
                    'ev': function() {
                        dataGrid.setCellControlsItem({
                            type: "radiobutton",
                            noedit: 1
                        });
                        clearCeng('myContextMenu');
                        dataGrid.clear();
                        dataGrid.paint();
                    }
                }]
            },
            {
                'itemText': '下拉框',
                'ev': function() {
                    celldropdownbox();
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '日期时间',
                'ev': function() {
                    editCellTimeControls();
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '超级链接',
                'ev': function() {
                    editCellUrl();
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '数字输入',
                'ev': function() {
                    dataGrid.setCellControlsItem({
                        type: "number",
						edit:	true
                    });
                    clearCeng('myContextMenu');
                    dataGrid.clear();
                    dataGrid.paint();
                }
            },
            {
                'itemText': '按钮',
                'ev': function() {
                            var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
							var menuItem = {
								'boxheight': '320px',
								'boxwidth': '400px'
							};
							var menu = new customizeBox(menuItem,dataGrid,function(){
									var table = document.getElementById("myContextMenu");
									var cellurl=cell._cellurl===undefined?{}:cell._cellurl;
									
									var cellbuttonimage = Number(table.getElementsByTagName('select').item(0).value);//按钮图片
									
									if(cellbuttonimage === 1){//浅蓝
										dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol].cellImage={'imagetype':3,'filename':_gl_cellButton_image[0],'width':140,'height':22,'length':1202};	
									}else if(cellbuttonimage === 2){//深蓝
										dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]['cellImage']={'imagetype':3,'filename':_gl_cellButton_image[1],'width':140,'height':22,'length':1976};	
									}else if(cellbuttonimage === 3){//橘黄
										dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]['cellImage']={'imagetype':3,'filename':_gl_cellButton_image[2],'width':140,'height':22,'length':2521};	
									}else if(cellbuttonimage === 4){
										dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]['cellImage']={'imagetype':3,'filename':_gl_cellButton_image[3],'width':140,'height':22,'length':2550};	
									}else if(cellbuttonimage === 5){
										dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]['cellImage']={'imagetype':3,'filename':_gl_cellButton_image[4],'width':140,'height':22,'length':2659};	
									}else if(cellbuttonimage === 6){
										dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]['cellImage']={'imagetype':3,'filename':_gl_cellButton_image[5],'width':70,'height':22,'length':2659};	
									}
									cellurl.imagetype=table.getElementsByTagName('select').item(0).value;
									cellurl.style=table.getElementsByTagName('select').item(1).value;
									if(table.getElementsByTagName('select').item(2).style.display !=='none'){
										
										cellurl.imagepos=Number(table.getElementsByTagName('select').item(2).value)-1;
									}
									cellurl.scripttype=table.getElementsByTagName('select').item(3).value;
									cellurl.fun=table.getElementsByTagName('textarea').item(0).value;
									dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol].cellurl=cellurl;
									dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol].cellurl.tagval|=1 << 1;//单元控件类型 按钮
									dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol].fl|=1 << 0;//单元控件类型 按钮
									dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol].tag|=1<<3;
									clearCeng('myContextMenu');
									dataGrid.clear();
									dataGrid.paint();
								});
							menu.rendhtml(T.ajax.ajaxGet('lib/htmllib/setbutton.html'),function(){
																						if(cell._cellurl!==undefined){
																							var form = document.selbutton;
																								form.selstyle.value   =cell._cellurl.imagetype;
																								form.seltype.value    =cell._cellurl.style;
																								form.buttonimgype.value    =cell._cellurl.imagepos;
																								form.scripttype.value =cell._cellurl.scripttype;
																								form.script.value     =cell._cellurl.fun!==undefined?cell._cellurl.fun:'';
																								if(cell._cellurl.style === '3'){
																									form.buttonimgype.style.display='inline';
																									form.buttonimgype.value=Number(cell._cellurl.imagepos)+1;
																								}
																						}
																					});

                    clearCeng('myContextMenu');
                }
            },
            {
                'itemType': 'line'
            },
            {
                'itemText': '删除控件类型',
                'ev': function() {
                    dataGrid.delCellControlsItem();
                    clearCeng('myContextMenu');
					dataGrid.clear();
					dataGrid.paint();
                }
            }]
        },
        {
            'itemText': '财务格式类型',
            'ev': function() {},
            'child': [{
                'itemText': '设置财务表头',
                'ev': function() {
                    dataGrid.setCellControlsItem({
                        type: "financialhead",
                        edit: true
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '设置财务表览',
                'ev': function() {
                    dataGrid.setCellControlsItem({
                        type: "financialmain",
                        edit: true
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '设置财务大写',
                'ev': function() {
//                    dataGrid.setCellControlsItem({
//                        type: "financialHead",
//                        edit: false
//                    });
					dataGrid.setTextFormat({'format':7,'weishu':0,'nby':0});
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '设置财务套打大写',
                'ev': function() {
					dataGrid.setTextFormat({'format':11,'weishu':0,'nby':0});
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemType': 'line'
            },
            {
                'itemText': '删除财务类型',
                'ev': function() {
                    dataGrid.delCellPrototype('financial');
                    clearCeng('myContextMenu');
					dataGrid.clear();
					dataGrid.paint();
                }
            }]
        },

        {
            'itemText': '单元斜线设置',
            'ev': function() {
                slantline();
            }
        },
        {
            'itemText': '显示行列头',
			'css': dataGrid._showheader===1||dataGrid._showheader===undefined ? 'select': '',
            'ev': function() {
                dataGrid.setTableHead();
				clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '显示表格线',
			'css': dataGrid._showgrid===1 ||dataGrid._showgrid===undefined? 'select': '',
            'ev': function() {
                dataGrid.setNetChartVisible(!dataGrid.getNetChartVisible());
                dataGrid.clear();
                dataGrid.paint();
				clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '设置光标整行选中',
            'css': (dataGrid._tagvalue>>16)& 0x01 ? 'select': '',
            'ev': function() {
                dataGrid.setSelLineAll();
                clearCeng('myContextMenu');
            }
        },
        ];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    };
    var sytbar1_shezhi = document.createElement("span");
    sytbar1_shezhi.style.marginLeft = '10px';
    sytbar1_shezhi.innerHTML = "设置";
    sytbar1_shezhi.title = "设置";
    sytbar1_shezhi.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_shezhi);
    sytbar1_shezhi.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '设置用户自定义数值',
            'ev': function() {
                customizenum();
            }
        },
        {
            'itemText': '设置用户自定义字符值',
            'ev': function() {
                customizestring();
            }
        },
        {
            'itemText': '设置当前单元变量名称',
            'ev': function() {
                customizename();
            }
        },
        {
            'itemText': '设置单元是否可编辑',
            'ev': function() {
                editfrozenCell();
            }
        },
        ];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    };

    var sytbar1_image = document.createElement("span");
    sytbar1_image.style.marginLeft = '10px';
    sytbar1_image.innerHTML = "图片";
    sytbar1_image.title = "图片";
    sytbar1_image.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_image);
    sytbar1_image.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '在表格上放置图片',
            'ev': function() {
                uploadimgToCanavs('table');
            }
        },
        {
            'itemText': '在单元中插入图片',
            'ev': function() {
                uploadimgToCanavs('cell');
            }
        },
        {
            'itemText': '设置单元中图片的大小',
            'ev': function(event) {},
            'child': [{
                'itemText': '按图片比例缩放显示',
                'ev': function() {
                    dataGrid.setCellImage({
                        size: "imgsize"
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '原始尺寸',
                'ev': function() {
                    dataGrid.setCellImage({
                        size: "origin"
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '单元大小',
                'ev': function() {
                    dataGrid.setCellImage({
                        size: "cell"
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '图片左转',
                'ev': function() {
                    dataGrid.setCellImage({
                        "turn": {
                            "direction": "right",
                            "angle": -90
                        }
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '图片右转',
                'ev': function() {
                    dataGrid.setCellImage({
                        "turn": {
                            "direction": "right",
                            "angle": 90
                        }
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '图片旋转',
                'ev': function() {
                    customTurnAngle();
                    clearCeng('myContextMenu');
                }
            }]
        },
        {
            'itemText': '删除单元中的图片',
            'ev': function() {
                dataGrid.delCellImage();
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '插入背景图片',
            'ev': function() {},
            'child': [{
                'itemText': '图片原始大小',
                'ev': function() {
                    uploadimgToCanavs('canvas_origin');
                }
            },
            {
                'itemText': '表格大小',
                'ev': function() {
                    uploadimgToCanavs('canvas_canvas');
                }
            },
            ]

        },
        {
            'itemText': '设置背景图片',
            'ev': function() {},
            'child': [{
                'itemText': '图片原始大小',
                'ev': function() {
                    dataGrid.setCanvasImage('origin');
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '表格大小',
                'ev': function() {
                    dataGrid.setCanvasImage('canvas');
                    clearCeng('myContextMenu');
                }
            },
            ]

        },
        {
            'itemText': '删除背景图片',
            'ev': function() {
                dataGrid.delCanvasImage();
                clearCeng('myContextMenu');
            }
        },
        ];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    };
    var sytbar1_data = document.createElement("span");
    sytbar1_data.style.marginLeft = '10px';
    sytbar1_data.innerHTML = "数据统计";
    sytbar1_data.title = "数据统计";
    sytbar1_data.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_data);
    sytbar1_data.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '报表统计脚本',
            'ev': function() {
                canvasStatisticscript();
                clearCeng("myContextMenu");
            }
        },
        {
            'itemText': '单元字段定义脚本',
            'ev': function() {
                cellCustomScript();
                clearCeng("myContextMenu");
            }
        }
        ] ;
		menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    };
	
    var sytbar1_entry = document.createElement("span");
    sytbar1_entry.style.marginLeft = '10px';
    sytbar1_entry.innerHTML = "数据录入";
    sytbar1_entry.title = "数据录入";
    sytbar1_entry.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_entry);
    sytbar1_entry.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '开启数据录入功能',
			'css': Number(dataGrid._savedb)===1||dataGrid._savedb===undefined ? 'select': '',
            'ev': function() {
                dataGrid.setTableHead();
				clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '查看新增或修改数据记录',
            'ev': function() {
                cellCustomScript();
                clearCeng("myContextMenu");
            }
        }
        ] ;
		menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    };

    var sytbar1_chart= document.createElement("span");
    sytbar1_chart.style.marginLeft = '10px';
    sytbar1_chart.innerHTML = "图形图表";
    sytbar1_chart.title = "图形图表";
    sytbar1_chart.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_chart);
    sytbar1_chart.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '图表向导',
            'ev': function() {
                            var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
							var menuItem = {
								'boxwidth': '400px'
							};
							var menu = new customizeBox(menuItem,dataGrid,function(){
								var json = T.form.serialize(document.selbutton);
									var chartType={
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
								
								var chartset=0;
								if(json.XYAXIS==='YYAXIS'){
									chartset+=0x01<<0;	
								}
								if(json.numflag===1){
									chartset+=0x01<<1;	
								}
								
								if(json.SHOW_NAME===1){
									chartset+=0x01<<2;	
								}
								if(json.SHOW_XAXIS_DIV_LINE===1){
									chartset+=0x01<<3;	
								}
								if(json.SHOW_YAXIS_DIV_LINE===1){
									chartset+=0x01<<4;	
								}
								if(json.OPEN_NEW_WINDOW===1){
									chartset+=0x01<<5;	
								}
								if(json.USE_LINKS===1){
									chartset+=0x01<<6;	
								}
								delete json.XYAXIS;
								delete json.numflag;
								delete json.SHOW_NAME;
								delete json.SHOW_XAXIS_DIV_LINE;
								delete json.SHOW_YAXIS_DIV_LINE;
								delete json.OPEN_NEW_WINDOW;
								delete json.USE_LINKS;
								json.chartset = chartset;
								json.type = chartType[json.type];
								json.serialcolor = function(sel){
									var colors = {};
									for(var i=1,len = sel.length;i<len;i++){
										colors[sel[i].value]=T.RGBToHex(sel.options[i].style.background).substring(1);	
									}
									colors['nums']=sel.length-1;
										return colors;
									}(document.selbutton.serialcolor);
								dataGrid._chartattribute.flashchart='';
								dataGrid._chartattribute.flashchart=json;
								
								 dataGrid.reDrawChart();
								 clearCeng("myContextMenu");
								}
							);
							menu.rendhtml(T.ajax.ajaxGet('lib/htmllib/chartSite.html'),function(){
																	var json=dataGrid._chartattribute;	
                                                                    // if(null==json){
                                                                    //     dataGrid._chartattribute={};
                                                                    //     return;
                                                                    // }
																	json = json.flashchart,
																	charste = json.chartset;
																	var form = document.selbutton;
																	
																	if((charste>> 0) & 0x01){
																		form['XYAXIS'][1].checked = true;	
																	}else{
																		form['XYAXIS'][0].checked = true;	
																	}
																	if((charste>> 1) & 0x01){//是否在图注上显示数值
																		form['numflag'].checked = true;		
																	}
																	if((charste>> 2) & 0x01){//显示分类X轴名称
																		form['SHOW_NAME'].checked = true;		
																	}
																	if((charste>> 3) & 0x01){//	x轴网格线
																		form['SHOW_XAXIS_DIV_LINE'].checked = true;		
																	}
																	if((charste>> 4) & 0x01){//y轴网格线
																	
																		form['SHOW_YAXIS_DIV_LINE'].checked = true;		
																	}
																	if((charste>> 5) & 0x01){//新窗口打开外链
																		form['OPEN_NEW_WINDOW'].checked = true;		
																	}
																	if((charste>> 6) & 0x01){//使用外链
																		form['USE_LINKS'].checked = true;		
																	}
																		
																	for(p in json){
																		if(form[p]!==undefined)
																		switch(form[p].type){
																			
																			case('text'):
																				try{
																				form[p].value=decodeURIComponent(json[p]);
																				}catch(e){
																					form[p].value=	json[p];
																				}
																				break;
																			case "select-one":
                 															case "select-multiple":
																				T.forEach(form[p],function(name,key ,source){
																					
																					if(T.Trim(source[key].innerHTML)==json[p]){
																					
																						form[p].value=source[key].value;
																						return;
																					}
																				}
																				);
																				break;
																			case('checkbox'):
																				form[p].checked = true;
																		}
																		
																	}	
																	var serialcolor=json.serialcolor;
																		
																	if(serialcolor!==''){
																		var option='';
																		for(var p in serialcolor){
																			if(p !== 'nums')
																			option+='<option value='+p+' style=" background: #'+serialcolor[p]+'">&nbsp;&nbsp;</option>';
																			
																		}
																		form["serialcolor"].innerHTML+=option;
																	}					
																	});

                    clearCeng('myContextMenu');
            }
        },
			{
				'itemText': '重绘图表',
				'ev': function() {
					clearCeng("myContextMenu");
					dataGrid.reDrawChart();
				}
			}
        ] ;
		menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    };

    var tbar1 = document.createElement("div");
    tbarframe.appendChild(tbar1);
    tbarframe.id = "tbar2";
    var tbar1_font = document.createElement("select");
    tbar1_font.title = "字体";
    tbar1_font.style.marginLeft = "10px";
    tbar1_font.id = "font_family";
    var tbar1_font_item = document.createElement("option");
    tbar1_font_item.value = "宋体";
    tbar1_font_item.innerHTML = "宋体";
    tbar1_font.appendChild(tbar1_font_item);
    tbar1.appendChild(tbar1_font);
    tbar1_font_item = document.createElement("option");
    tbar1_font_item.value = "黑体";
    tbar1_font_item.innerHTML = "黑体";
    tbar1_font.appendChild(tbar1_font_item);
    tbar1.appendChild(tbar1_font);
    tbar1_font.onchange = function() {
        //alert(tbar1_font.options[tbar1_font.selectedIndex].text);
        dataGrid.setSelCellFontFamily(tbar1_font.options[tbar1_font.selectedIndex].text);
        dataGrid.clear();
        dataGrid.paint();
    };

    var tbar1_fontsize = document.createElement("select");
    tbar1_fontsize.id = "fontsize";
    tbar1_fontsize.title = "字体大小";
    tbar1_fontsize.style.marginLeft = "10px";
    tbar1_fontsize.innerHTML = "<option value='12'>12</option><option value='14'>14</option><option value='16'>16</option><option value='24'>24</option>";
    tbar1.appendChild(tbar1_fontsize);
    tbar1_fontsize.onchange = function() {
        //alert(tbar1_fontsize.options[tbar1_fontsize.selectedIndex].text);
        dataGrid.setSelCellFontSize(tbar1_fontsize.options[tbar1_fontsize.selectedIndex].text);
        dataGrid.clear();
        dataGrid.paint();
    };

    var tbar1_bold = document.createElement("input");
    tbar1_bold.type = "button";
    tbar1_bold.title = "加粗";
    T.html.setClass(tbar1_bold, "bold buttonMouse");
    tbar1_bold.style.verticalAlign = "top";
    //tbar1_bold.style.marginTop = "1px";
    tbar1.appendChild(tbar1_bold);
    tbar1_bold.onclick = function() {
        dataGrid.setSelCellFontBold();
        dataGrid.clear();
        dataGrid.paint();
    };

    var tbar1_italic = document.createElement("input");
    tbar1_italic.type = "button";
    tbar1_italic.title = "斜体";
    T.html.setClass(tbar1_italic, "italic buttonMouse");
    tbar1_italic.style.verticalAlign = "top";
    //tbar1_italic.style.marginTop = "1px";
    tbar1.appendChild(tbar1_italic);
    tbar1_italic.onclick = function() {
        dataGrid.setSelCellFontItalic();
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_underline = document.createElement("input");
    tbar1_underline.type = "button";
    tbar1_underline.title = "下划线";
    T.html.setClass(tbar1_underline, "underline buttonMouse");
    tbar1_underline.style.verticalAlign = "top";
    //tbar1_underline.style.marginTop = "1px";
    tbar1.appendChild(tbar1_underline);
    tbar1_underline.onclick = function() {
        dataGrid.setSelCellUnderline();
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_alignleft = document.createElement("input");
    tbar1_alignleft.type = "button";
    tbar1_alignleft.className = 'inputmouuse';
    tbar1_alignleft.title = "左对齐";
    T.html.setClass(tbar1_alignleft, "alignleft buttonMouse");
    tbar1_alignleft.style.verticalAlign = "top";
    //tbar1_alignleft.style.marginTop = "1px";
    tbar1.appendChild(tbar1_alignleft);
    tbar1_alignleft.onclick = function() {
        dataGrid.setSelCellTextAlign('0');
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_aligncenter = document.createElement("input");
    tbar1_aligncenter.type = "button";
    tbar1_aligncenter.title = "中间对齐";
    T.html.setClass(tbar1_aligncenter, "aligncenter buttonMouse");
    tbar1_aligncenter.style.verticalAlign = "top";
    //tbar1_aligncenter.style.marginTop = "1px";
    tbar1.appendChild(tbar1_aligncenter);
    tbar1_aligncenter.onclick = function() {
        dataGrid.setSelCellTextAlign('6');
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_alignright = document.createElement("input");
    tbar1_alignright.type = "button";
    tbar1_alignright.title = "右对齐";
    T.html.setClass(tbar1_alignright, "alignright buttonMouse");
    tbar1_alignright.style.verticalAlign = "top";
    //tbar1_alignright.style.marginTop = "1px";
    tbar1.appendChild(tbar1_alignright);
    tbar1_alignright.onclick = function() {
        dataGrid.setSelCellTextAlign('2');
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_aligntop = document.createElement("input");
    tbar1_aligntop.type = "button";
    tbar1_aligntop.title = "上对齐";
    T.html.setClass(tbar1_aligntop, "aligntop buttonMouse");
    tbar1_aligntop.style.verticalAlign = "middle";
    //tbar1_alignleft.style.marginTop = "1px";
    tbar1.appendChild(tbar1_aligntop);
    tbar1_aligntop.onclick = function() {
        dataGrid.setSelCellVerticalAlign('0');
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_alignmiddle = document.createElement("input");
    tbar1_alignmiddle.type = "button";
    tbar1_alignmiddle.title = "垂直对齐";
    T.html.setClass(tbar1_alignmiddle, "alignmiddle buttonMouse");
    tbar1_alignmiddle.style.verticalAlign = "middle";
    //tbar1_aligncenter.style.marginTop = "1px";
    tbar1.appendChild(tbar1_alignmiddle);
    tbar1_alignmiddle.onclick = function() {
        dataGrid.setSelCellVerticalAlign('6');
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_alignbottom = document.createElement("input");
    tbar1_alignbottom.type = "button";
    tbar1_alignbottom.title = "下对齐";
    T.html.setClass(tbar1_alignbottom, "alignbottom buttonMouse");
    tbar1_alignbottom.style.verticalAlign = "middle";
    //tbar1_alignright.style.marginTop = "1px";
    tbar1.appendChild(tbar1_alignbottom);
    tbar1_alignbottom.onclick = function() {
        dataGrid.setSelCellVerticalAlign('8');
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_combinecell = document.createElement("input");
    tbar1_combinecell.type = "button";
    tbar1_combinecell.title = "合并单元格";
    T.html.setClass(tbar1_combinecell, "mergecell buttonMouse");
    tbar1_combinecell.style.verticalAlign = "top";
    //tbar1_combinecell.style.marginTop = "1px";
    tbar1.appendChild(tbar1_combinecell);
    tbar1_combinecell.onclick = function() {
        dataGrid.combineSelCells();
        dataGrid.setFocusRow(dataGrid.getSelStartRow());
        dataGrid.setFocusCol(dataGrid.getSelStartCol());
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_breakcell = document.createElement("input");
    tbar1_breakcell.type = "button";
    tbar1_breakcell.title = "拆分单元格";
    T.html.setClass(tbar1_breakcell, "unmergecell buttonMouse");
    tbar1_breakcell.style.verticalAlign = "top";
    //tbar1_breakcell.style.marginTop = "1px";
    tbar1.appendChild(tbar1_breakcell);
    tbar1_breakcell.onclick = function() {
        dataGrid.breakupSelCells();
        dataGrid.clear();
        dataGrid.paint();
    }
    var tbar1_borderw = document.createElement("select");
    tbar1_borderw.title = "边框设置";
    tbar1_borderw.id = "font_family";
    var bwoptions = [{
        "name": "细线",
        "type": "0",
        "width": 1
    },
    {
        "name": "中线",
        "type": "0",
        "width": 2
    },
    {
        "name": "粗线",
        "type": "0",
        "width": 3
    },
    {
        "name": "点线",
        "type": "2",
        "width": 1
    },
    {
        "name": "虚线",
        "type": "1",
        "width": 1
    },
    {
        "name": "点划线",
        "type": "3",
        "width": 1
    },
    {
        "name": "点点划线",
        "type": "4",
        "width": 1
    },
    ];
    for (var i = 0; i < bwoptions.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("data-value", bwoptions[i].width);
        option.setAttribute("data-type", bwoptions[i].type);
        option.innerHTML = bwoptions[i].name;
        tbar1_borderw.appendChild(option);
    }
	tbar1_borderw.onclick = function(){clearCeng("showbox");clearCeng("showbox_wenzi");	};
    tbar1.appendChild(tbar1_borderw);
    tbar1_borderw.onchange = function(event) {
        var sel = tbar1_borderw.options[tbar1_borderw.selectedIndex];
        borderWidth = sel.dataset["value"];
        borderStyle = sel.dataset["type"];
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_border = document.createElement("input");
    tbar1_border.type = "button";
    tbar1_border.title = "边框";
    T.html.setClass(tbar1_border, "border buttonMouse");
    tbar1_border.style.verticalAlign = "top";
    //tbar1_border.style.marginTop = "1px";
    tbar1.appendChild(tbar1_border);
    tbar1_border.onclick = function(event) {
        colordialog(event, dataGrid, 'borderLineColor');
    }

    var tbar1_borderOptions = document.createElement("input");
    tbar1_borderOptions.type = "button";
    tbar1_borderOptions.title = "边框选项";
    tbar1_borderOptions.style.verticalAlign = "top";
    T.html.setClass(tbar1_borderOptions, "borderoption buttonMouse");
    tbar1.appendChild(tbar1_borderOptions);
    tbar1_borderOptions.onclick = function(event) {
        clearCeng('myContextMenu');
		clearCeng("showbox");
		clearCeng("showbox_wenzi");	
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '全部框线',
            'ev': function() {
                dataGrid.setBorderLine('all');

                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '外部框线',
            'ev': function() {
                dataGrid.setBorderLine('all_out');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '内部框线',
            'ev': function() {
                dataGrid.setBorderLine('all_in');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '左框线',
            'ev': function() {
                dataGrid.setBorderLine('left');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '右框线',
            'ev': function() {
                dataGrid.setBorderLine('right');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '上框线',
            'ev': function() {
                dataGrid.setBorderLine('top');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '下框线',
            'ev': function() {
                dataGrid.setBorderLine('bottom');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '上下框线',
            'ev': function() {
                dataGrid.setBorderLine('top-bottom');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '左右框线',
            'ev': function() {
                dataGrid.setBorderLine('left-right');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '横框线',
            'ev': function() {
                dataGrid.setBorderLine('all-top');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '竖框线',
            'ev': function() {
                dataGrid.setBorderLine('all-left');
                clearCeng('myContextMenu');
            }
        }/*,
        {
            'itemText': '绘图',
            'ev': function() {
                clearCeng('myContextMenu');
                dataGrid.usepaintBorderLine();
            }
        }*/];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    }

    var tbar1_bordereraser = document.createElement("input");
    tbar1_bordereraser.type = "button";
    tbar1_bordereraser.title = "擦除边框";
    T.html.setClass(tbar1_bordereraser, "eraser buttonMouse");
    tbar1_bordereraser.style.cssText = 'width:20px;height:20px';
    tbar1_bordereraser.style.verticalAlign = "top";
    //tbar1_border.style.marginTop = "1px";
    tbar1.appendChild(tbar1_bordereraser);
    tbar1_bordereraser.onclick = function() {

        dataGrid.eraserBorderLine();
        //dataGrid.setFocusRow(dataGrid.getSelStartRow());
        //dataGrid.setFocusCol(dataGrid.getSelStartCol());
        dataGrid.clear();
        dataGrid.paint();
    }
    var tbar1_bordereraserOptions = document.createElement("input");
    tbar1_bordereraserOptions.type = "button";
    tbar1_bordereraserOptions.alt = "边框选项";
    tbar1_bordereraserOptions.style.verticalAlign = "top";
    T.html.setClass(tbar1_bordereraserOptions, "borderoption buttonMouse");
    tbar1.appendChild(tbar1_bordereraserOptions);
    tbar1_bordereraserOptions.onclick = function(event) {
        clearCeng('myContextMenu');

        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '抹全部框线',
            'ev': function() {
                dataGrid.clearBorderLine('all');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹外部框线',
            'ev': function() {
                dataGrid.clearBorderLine('all_out');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹内部框线',
            'ev': function() {
                dataGrid.clearBorderLine('all_in');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹左框线',
            'ev': function() {
                dataGrid.clearBorderLine('left');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹右框线',
            'ev': function() {
                dataGrid.clearBorderLine('right');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹上框线',
            'ev': function() {
                dataGrid.clearBorderLine('top');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹下框线',
            'ev': function() {
                dataGrid.clearBorderLine('bottom');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹上下框线',
            'ev': function() {
                dataGrid.clearBorderLine('top-bottom');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹左右框线',
            'ev': function() {
                dataGrid.clearBorderLine('left-right');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹横框线',
            'ev': function() {
                dataGrid.clearBorderLine('all-top');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹竖框线',
            'ev': function() {
                dataGrid.clearBorderLine('all-left');
                clearCeng('myContextMenu');
            }
        }];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    }

    var tbar1_backcolor = document.createElement("input");
    tbar1_backcolor.type = "button";
    tbar1_backcolor.title = "背景色";
    T.html.setClass(tbar1_backcolor, "backcolor buttonMouse");
    tbar1_backcolor.style.verticalAlign = "top";
    //tbar1_backcolor.style.marginTop = "1px";
    tbar1.appendChild(tbar1_backcolor);
    tbar1_backcolor.onclick = function() {
		clearCeng("showbox");
		clearCeng("showbox_wenzi");	
        colordialog(event, dataGrid, 'backcolor');

    }

    var tbar1_textcolor = document.createElement("input");
    tbar1_textcolor.type = "button";
    tbar1_textcolor.title = "文字颜色";
    T.html.setClass(tbar1_textcolor, "forecolor buttonMouse");
    tbar1_textcolor.style.verticalAlign = "top";
    //tbar1_textcolor.style.marginTop = "1px";
    tbar1.appendChild(tbar1_textcolor);
    tbar1_textcolor.onclick = function() {
		clearCeng("showbox");
		clearCeng("showbox_wenzi");	
        colordialog(event, dataGrid, 'fontcolor');

    }

    var tbar1_delCol = document.createElement("input");
    tbar1_delCol.className = 'delCol buttonMouse';
    tbar1_delCol.title = "删除列";
    T.html.setClass(tbar1_delCol, "deletecol buttonMouse");
    tbar1_delCol.style.verticalAlign = "top";
    //tbar1_alignleft.style.marginTop = "1px";
    tbar1.appendChild(tbar1_delCol);
    tbar1_delCol.onclick = function() {
        dataGrid.delCanvasCol();
    }
    var tbar1_delNum = document.createElement("input");
    tbar1_delNum.title = "删除行";
    tbar1_delNum.src = "image/icon/alignleft.png";
    T.html.setClass(tbar1_delNum, "deleterow buttonMouse");
    tbar1_delNum.style.verticalAlign = "top";
    //tbar1_alignleft.style.marginTop = "1px";
    tbar1.appendChild(tbar1_delNum);
    tbar1_delNum.onclick = function() {
        dataGrid.delCanvasRow();
    }
	
    var tbar1_calculate = document.createElement("input");
	tbar1_calculate.type='button';
    tbar1_calculate.className = 'ui-state-default';
    tbar1_calculate.value = "计算模式";
    tbar1_calculate.style.verticalAlign = "top";
    //tbar1_alignleft.style.marginTop = "1px";
    tbar1.appendChild(tbar1_calculate);
    tbar1_calculate.onclick = function() {
		if(this.className==='ui-state-default'){
			this.className='ui-state-active';
			dataGrid._designmode=true;
		}else{
			this.className='ui-state-default';
			dataGrid._designmode=false;
		}
		dataGrid.clear();
		dataGrid.paint();
       
    }
	if(chartOnly){
	tbar1.style.display='none';	
	systemframe.style.display='none';
	mainDiv.style.marginLeft=0;
			
	}
    this.comItemAdd(dataGrid);
    this.comItemAdd(scrollX);
    this.comItemAdd(scrollY);
}