define(["base","config","draw","cell"], function(B, C,D,CELL) {
        //return an object to define the "my/shirt" module.
        var utils = (function () {
        var me = {};
        var _elementStyle = document.createElement('div').style;

        //获得需要兼容CSS3前缀
        var _vendor = (function () {
          var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
          var transform;
          var i = 0;
          var l = vendors.length;

          for (; i < l; i++) {  
            transform = vendors[i] + 'ransform';
            if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
          }
          return false;
        })();

        //获取样式（CSS3兼容）
        function _prefixStyle(style) {
          if (_vendor === false) return falsef;
          if (_vendor === '') return style;
          return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
        }

        me.getTime = Date.now || function getTime() { return new Date().getTime(); };

        me.addEvent = function (el, type, fn, capture) {
          if (el[0]) el = el[0];
          el.addEventListener(type, fn, !!capture);
        };

        me.removeEvent = function (el, type, fn, capture) {
          if (el[0]) el = el[0];
          el.removeEventListener(type, fn, !!capture);
        };
        me.hasTouch = 'ontouchstart' in window;
        return me;
    })();

    
    var canvasList = new B.Class({
            __propertys__: function () {//实例属性
                this.dataStore = []; // initializes an empty array to store list elements
                this.canvasitems = [];//存放canvas图层

            },
            /**
            * {option} 可选，存放用于验证的函数集合{elem:'name',dest:'name2'} 或者func 为验证搜索的函数
            */
            find : function(option){
              return this.dataStore.find(function(ele,index){
                 if(Object.prototype.toString.call(option) === '[object Function]'){
                    return option.call(this,ele);
                 }
                return ele[option.elem]===option.dest;
              }); 
            } ,
            /**
            * obj 必选 增加数据对象 或者修改
            */
            save : function(obj){
                var name = obj.name,findobj = this.find({name:name});
                if(!findobj){
                    this.dataStore.push(obj);
                }else{
                    findobj = obj;
                }
            },
            /**
            *   清除数组
            **/
            clear:function(){
                this.dataStore = [];
            },
            /**
            * 返回数据
            */
            getData:function(){
                return this.dataStore;
            },
            /**
            * 按索引返回数据
            */
            get:function(i){
                return this.dataStore[i];
            },
            /**
            * 返回长度
            */
            len:function(){
                return this.dataStore.length;
            },
            /**
            * obj 必选 增加数据对象 或者修改
            */
            add : function(obj){
                this.dataStore.push(obj);
                return this.dataStore;
            },
            /**
            * obj 必选 初始化传入数据对象 不存在将会被重写为空函数
            */
            initialize : function(obj){
                if(!obj){
                    throw("参数必须是数组");
                    return false;
                }
                if(Object.prototype.toString.call(obj) === '[object Array]'){
                    this.dataStore = obj;
                }
            },
            /**
            * 封装底层对象
            */
            splice:function(){
                var args =   Array.prototype.slice.call(arguments);
                this.dataStore.splice.apply(this.dataStore,args);
            },
            /**
            * func 必选 迭代遍历执行函数
            */
            each:function(func){
                 if(Object.prototype.toString.call(func) === '[object Function]'){
                    for(var i=0,len=this.dataStore.length;i<len;i++){
                        func.call(this,this.dataStore[i],i,this.dataStore);
                    }
                }else{
                    throw("参数必须是函数");
                } 
            }
    });
    var canvasListInstance = new canvasList([]);
    var canvas = new B.Class({
         __propertys__: function () {//实例属性
                this.dataStore = []; // initializes an empty array to store list elements
                this.canvasitems = [];//存放canvas图层
                this.colHeadWidth =C.colHeadWidth;
                this.colHeadHeight =C.colHeadHeight;
                this.rowHeadWidth =C.rowHeadWidth;
                this.rowHeadHeight =C.rowHeadHeight; 
                this.rows = C.rows;
                this.cols = C.cols;
                this.width= C.width;
                this.height =C.height;
                this.cells = [];

            },
        /**
        * 图表绘制的初始化函数
        */
        init:function(){
            var canvas = document.createElement("canvas");
            canvas.id="canvas";
            canvas.width  =C.width;
            canvas.height =C.height;
            document.body.appendChild(canvas);
            this.canvas = canvas;
            this.ClientRect = this.canvas.getBoundingClientRect();
            this.draw('init');
        },
        draw:function(flag){
              var canvas = this.canvas;
              if (canvas.getContext) {
                var ctx = this.ctx = canvas.getContext("2d");
                var myTime = window.performance.now();
                D.setCanvas(canvas);
                D.drawColHead();
                window.performance.mark('drawColHeadBegin');
                D.drawRowHead();
                window.performance.mark('drawRowHeadBegin');
                D.drawRowColCells.call(this,D,flag);
                window.performance.mark('drawRowColCellsBegin');
                this.bind();
              }
              window.performance.measure('drawRowHead', 'drawColHeadBegin', 'drawRowHeadBegin');
              window.performance.measure('drawRowColCells', 'drawRowHeadBegin', 'drawRowColCellsBegin');
              var items = window.performance.getEntriesByType('measure');
              for (var i = 0; i < items.length; ++i) {
                  var req = items[i];
                  console.log('name ' + req.name + ' took ' + req.duration + 'ms');
              }
        },
        pushCell : function(cell){
            //if(cell instanceof CELL){
                this.cells.push(cell);
           // }
        },
        getCell : function(col,row){
            var index = (col-1)*C.cols + row-1;
            return this.cells[index];
        },
        redraw: function(){
            D.clear();
            this.draw();
        },
        getSelectCell : function(x,y){
            x = x - C.rowHeadWidth;
            y = y - C.colHeadHeight;
            var width =  C.colHeadWidth;
            var height = C.rowHeadHeight;
            var col,row;
            for(var i=0;i<C.rows;i++){
                for(var j=0,len = C.cols;j<len;j++){
                    if(x>=i*width && x<=(i+1)*width){
                        col = i+1;
                    }
                    if(y>=j*height && y<=(j+1)*height){
                        row = j+1;
                    }
                }
            }
            document.getElementById("showmessage").innerHTML="row:"+row+" col:"+col;
           // console.log(row,col);
            return this.getCell(col,row);
        },
        unselectAll : function(){
            this.cells.forEach(function(cell){
                if(cell.needpaint==true){
                    cell.reset();
                }
            });
        },
        bind:function(removeFalg){
            var eventType = removeFalg ?utils.removeEvent: utils.addEvent;
            if(utils.hasTouch) {
                eventType(this.canvas, 'touchstart', this);
                eventType(this.canvas, 'touchmove', this);
                eventType(this.canvas, 'touchcancel', this);
                eventType(this.canvas, 'touchend', this);
            }else {

                eventType(this.canvas, 'mousedown', this);
                eventType(this.canvas, 'mousemove', this);
                eventType(this.canvas, 'mousecancel', this);
                eventType(this.canvas, 'mouseup', this);
            }
        },
        //事件具体触发点
        handleEvent: function (e) {
          switch (e.type) {
            case 'touchstart':
            case 'mousedown':
              this._start(e);
              break;
            case 'touchmove':
            case 'mousemove':
              this._move(e);
              break;
            case 'touchend':
            case 'mouseup':
            case 'touchcancel':
            case 'mousecancel':
              this._end(e);
              break;
          }

        },
        _start:function(e){
            e.preventDefault();
            if (e.targetTouches && e.targetTouches.length != 1) return;
            this.x = (e.changedTouches ? e.changedTouches[0].pageX: e.pageX) - this.ClientRect.left;
            this.y = (e.changedTouches ? e.changedTouches[0].pageY: e.pageY) - this.ClientRect.top;
            
            
            if(this.guaguale == false){
                this.unselectAll();
            }
            this.getSelectCell(this.x,this.y).select();
            this.guaguale = true;

            this.redraw();

        },
        _move:function(e){
             e.preventDefault();
            if (!this.guaguale) return;
            var epageX = e.changedTouches ? e.changedTouches[0].pageX: e.pageX;
            var epageY = e.changedTouches ? e.changedTouches[0].pageY: e.pageY;

            var xdis = epageX - this.x;
            var ydis = epageY - this.y;
            //this.clip(this.x,this.y,epageX,epageY);
            this.x = epageX;
            this.y= epageY;
        },
        _end:function(e){
            this.guaguale = false;
        },
        clip:function(startX,startY,endX,endY){
            // Create a circular clipping path
            var ctx = this.ctx;
            ctx.lineWidth=40;
            ctx.lineCap = "round";
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.moveTo(startX,startY);
            ctx.lineTo(endX,endY)
            ctx.stroke();
        }
    });

    var canvasYAxis = new B.Class({
         __propertys__: function () {//实例属性
        },
        /**
        * 图表绘制的初始化函数
        */
        init:function(){
            var canvas = document.createElement("canvas");
            canvas.id="canvasYAxis";
            canvas.width  =C.YAXISWIDTH;
            canvas.height =C.height;
            document.body.appendChild(canvas);
            this.canvas = canvas;
            this.draw();
        },
        draw:function(){
              var canvas = this.canvas;
              if (canvas.getContext) {
                var ctx = this.ctx = canvas.getContext("2d");
                var myTime = window.performance.now();
                
                D.setCanvas(canvas);
                D.drawYAxis();
                
                window.performance.mark('drawColHeadBegin');
                
                this.bind();
              }
              window.performance.measure('drawRowHead', 'drawColHeadBegin', 'drawRowHeadBegin');
              window.performance.measure('drawRowColCells', 'drawRowHeadBegin', 'drawRowColCellsBegin');
              var items = window.performance.getEntriesByType('measure');
              for (var i = 0; i < items.length; ++i) {
                  var req = items[i];
                  console.log('name ' + req.name + ' took ' + req.duration + 'ms');
              }
        },

        redraw: function(){
            D.clear();
            this.draw();
        },
        bind:function(removeFalg){
            var eventType = removeFalg ?utils.removeEvent: utils.addEvent;
            if(utils.hasTouch) {
                eventType(this.canvas, 'touchstart', this);
                eventType(this.canvas, 'touchmove', this);
                eventType(this.canvas, 'touchcancel', this);
                eventType(this.canvas, 'touchend', this);
            }else {
                eventType(this.canvas, 'mousedown', this);
                eventType(this.canvas, 'mousemove', this);
                eventType(this.canvas, 'mousecancel', this);
                eventType(this.canvas, 'mouseup', this);
            }
        },
        //事件具体触发点
        handleEvent: function (e) {
          switch (e.type) {
            case 'touchstart':
            case 'mousedown':
              this._start(e);
              break;
            case 'touchmove':
            case 'mousemove':
              this._move(e);
              break;
            case 'touchend':
            case 'mouseup':
            case 'touchcancel':
            case 'mousecancel':
              this._end(e);
              break;
          }
        },
        _start:function(e){
            e.preventDefault();
            if (e.targetTouches && e.targetTouches.length != 1) return;
            this.x = e.changedTouches ? e.changedTouches[0].pageX: e.pageX;
            this.y = e.changedTouches ? e.changedTouches[0].pageY: e.pageY;
            this.guaguale = true;
        },
        _move:function(e){
             e.preventDefault();
            if (!this.guaguale) return;
            var epageX = e.changedTouches ? e.changedTouches[0].pageX: e.pageX;
            var epageY = e.changedTouches ? e.changedTouches[0].pageY: e.pageY;

            var xdis = epageX - this.x;
            var ydis = epageY - this.y;
            //this.clip(this.x,this.y,epageX,epageY);
            this.x = epageX;
            this.y= epageY;
        },
        _end:function(e){
            this.guaguale = false;
        },
        clip:function(startX,startY,endX,endY){
            // Create a circular clipping path
            var ctx = this.ctx;
            ctx.lineWidth=40;
            ctx.lineCap = "round";
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.moveTo(startX,startY);
            ctx.lineTo(endX,endY)
            ctx.stroke();
        }
    });
    canvasListInstance.add({id:"main",canvas:new canvas()});
    canvasListInstance.add({id:"yaxis",canvas:new canvasYAxis()});
    return canvasListInstance;
});