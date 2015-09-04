define(["base","config","draw","cell","canvas","utils","canvasshadow","canvaseffect"], function(B, C,D,CELL,canvasCompnent,utils,canvasshadow,canvaseffect) {
        //return an object to define the "my/shirt" module.
       

    
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
    
    var canvasYAxis = new B.Class(D,{
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
                this.drawYAxis();
            
                this.bind();
              }else{
                throw "浏览器不支持canvas";
              }

        },

        redraw: function(){
            this.clear();
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
    var maincanvas = new canvasCompnent();
    var maincanvasshadow = new canvasshadow();
    maincanvasshadow.setParent(maincanvas);
    var canvaseffect = new canvaseffect();
    maincanvasshadow.setEffectCanvas(canvaseffect);
    var YAxiscanvas = new canvasYAxis();
    canvasListInstance.add({id:"main",canvas:maincanvas});
    canvasListInstance.add({id:"effect",canvas:canvaseffect});
    canvasListInstance.add({id:"shadow",canvas:maincanvasshadow});
    canvasListInstance.add({id:"yaxis",canvas:YAxiscanvas});
    return canvasListInstance;
});