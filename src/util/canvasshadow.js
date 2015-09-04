define(["base","config","draw","cell","utils"], function(B, C,D,CELL,utils) {
 
    var canvasshadow = new B.Class(D,{
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

                this.selectArea  = {"startcell":null,"endcell":null};

            },
        /**
        * 图表绘制的初始化函数
        */
        init:function(){
            var canvas = document.createElement("canvas");
            canvas.id="canvasshadow";
            canvas.width  =C.width;
            canvas.height =C.height;
            document.getElementById("canvas").appendChild(canvas);
            this.canvas = canvas;

            this.ClientRect = this.canvas.getBoundingClientRect();

            this.draw('init');

            
        },
        setEffectCanvas:function(EffectCanvas){
            this.effectcanvas = EffectCanvas;
        },
        setParent:function(parent){
            this.parent = parent;
        },
        draw:function(flag){
              var canvas = this.canvas;
              if (canvas.getContext) {
                this.ctx = canvas.getContext("2d");
                //var myTime = window.performance.now();
                
                //this.drawColHead();
                //window.performance.mark('mainDrawColHeadBegin');
                //this.drawRowHead();
                //window.performance.mark('mainDrawRowHeadBegin');
                //this.drawRowColCells.call(this,flag);
                //window.performance.mark('mainDrawRowColCellsBegin');
                this.bind();
              }else{
                throw "浏览器不支持canvas";
              }

              // var items = window.performance.getEntriesByType('measure');
              // for (var i = 0; i < items.length; ++i) {
              //     var req = items[i];
              //     console.log('name ' + req.name + ' took ' + req.duration + 'ms');
              // }
        },
        pushCell : function(cell){
            //if(cell instanceof CELL){
                this.cells.push(cell);
           // }
        },
        getCell : function(col,row){
            var index = (row-1)*C.cols + col-1;
            return this.cells[index];
        },
        redraw: function(){
            this.clear();
            this.draw();
        },
        getSelectCell : function(x,y){
            x = x - C.rowHeadWidth;
            y = y - C.colHeadHeight;
            var width =  C.colHeadWidth;
            var height = C.rowHeadHeight;
            var col=0,row=0;
            if(y<0)row=undefined;
            if(x<0)col=undefined;
            for(var i=0;i<C.rows;i++){
                for(var j=0,len = C.cols;j<len;j++){
                    if(x>=j*width && x<=(j+1)*width){
                        col = j+1;
                    }
                    if(y>=i*height && y<=(i+1)*height){
                        row = i+1;
                    }
                    if(col!=0 && row!=0){
                        break;
                    }
                }
            }
            document.getElementById("showmessage").innerHTML="row:"+row+" col:"+col;
           // console.log(90,row,col);
            return {"col":col,"row":row};
        },
        unselectAll : function(){
            this.cells.forEach(function(cell){
                if(cell.needpaint==true){
                    cell.reset();
                }
            });
        },
        setCursor:function(style){
            if(this.cursor!=style){
                this.cursor = style;
                document.body.style.cursor = style;
            }
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
                //this.unselectAll();
            }
            if(this.cursor=='w-resize'){
                this.resize = true;

                this.effectcanvas.ctx.strokeStyle='#a2a2a2';
                var currentCell = this.getSelectCell(this.x,this.y);
                this.resizeCol = currentCell.col;
            }else{
                var myTime = window.performance.now();
                var currentCell = this.getSelectCell(this.x,this.y);//.select();

                this.guaguale = true;
                console.log("mousedown",currentCell);
                this.selectArea.startcell = this.selectArea.endcell = currentCell;
                this.setRenderCtx();
                this.drawSelect(this.selectArea);
                var myTime3 = window.performance.now();
                console.log("鼠标移动时间计算"+(myTime3-myTime));
            }
        },
        _move:function(e){
             e.preventDefault();

                var epageX =  (e.changedTouches ? e.changedTouches[0].pageX: e.pageX) - this.ClientRect.left;
                var epageY =  (e.changedTouches ? e.changedTouches[0].pageY: e.pageY) - this.ClientRect.top;

                var xdis = epageX - this.x;
                var ydis = epageY - this.y;
                //this.clip(this.x,this.y,epageX,epageY);
                this.x = epageX;
                this.y= epageY;
                var myTime = window.performance.now();
                var currentCell = this.getSelectCell(epageX,epageY);//.select();
                //console.log(currentCell);
                if(this.guaguale){
                    this.selectArea.endcell = currentCell;
                    this.drawSelect(this.selectArea);
                    var myTime3 = window.performance.now();
                    document.getElementById("showmovespeed").innerHTML="鼠标移动时间计算"+(myTime3-myTime);
                }else if(this.resize ){
                    
                    this.parent.colsheader[this.resizeCol-1].width+=xdis;
                    //console.log(this.resizeCol,xdis,this.parent.colsheader[this.resizeCol-1]);
                    this.effectcanvas.renderdashLine(epageX);
                    this.parent.redraw();
                }else{
                    this.setCursor('default')
                    if(!currentCell.row || !currentCell.col){
                        var cellXY = this.getCellXY(currentCell);
                        if(Math.abs(cellXY.x-epageX)<=10 || Math.abs(cellXY.x+cellXY.width-epageX)<=10 ){
                            this.setCursor('w-resize');
                        }else{
                            this.setCursor('default')
                        }
                        
                    }
                }

            //console.log("鼠标移动时间计算",myTime3-myTime);
        },
        _end:function(e){
            this.guaguale = false;
            if(this.resize){
                this.resize = false;
                this.effectcanvas.clear();
            }
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
    return canvasshadow;
});
