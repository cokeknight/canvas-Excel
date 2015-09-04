define(["base","config","draw","cell","utils"], function(B, C,D,CELL,utils) {
 
    var canvas = new B.Class(D,{
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
                this.colsheader = [];/**存放每列的X位置，宽度*/
                this.selectArea  = {"startcell":null,"endcell":null};

            },
        /**
        * 图表绘制的初始化函数
        */
        init:function(){
            var canvas = document.createElement("canvas");
            canvas.id="main";
            canvas.width  =C.width;
            canvas.height =C.height;
            document.getElementById("canvas").appendChild(canvas);
            this.canvas = canvas;

            this.ClientRect = this.canvas.getBoundingClientRect();

            this.draw('init');

            
        },
        draw:function(flag){
              var canvas = this.canvas;
              if (canvas.getContext) {
                var ctx = this.ctx = canvas.getContext("2d");
                this.initCTX();
                var myTime = window.performance.now();
                
                this.drawColHead();
                
                this.drawRowHead();
                var myTime3 = window.performance.now();
                this.drawRowColCells.call(this,flag);
                var myTime4 = window.performance.now();
                //this.bind();
              }else{
                throw "浏览器不支持canvas";
              }
              document.getElementById("showfirstspeed").innerHTML="初次载入时间计算"+(myTime4-myTime3);
              //   window.performance.measure('mainDrawRowHead', 'mainDrawColHeadBegin', 'mainDrawRowHeadBegin');
              //   window.performance.measure('mainDrawRowColCells', 'mainDrawRowHeadBegin', 'mainDrawRowColCellsBegin');
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
            this.drawColHead();
            //this.draw('init');
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
        }
    });
    return canvas;
});
