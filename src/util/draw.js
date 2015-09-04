define(["base","config","cell"], function(B, C,CELL) {

	var FONTSIZE = 12;
	var TEXTSTYLE = "#222222";
    CanvasRenderingContext2D.prototype.dashedLineTo = function (fromX, fromY, toX, toY, pattern) {  
        // default interval distance -> 5px  
        if (typeof pattern === "undefined") {  
            pattern = 5;  
        }  
      
        // calculate the delta x and delta y  
        var dx = (toX - fromX);  
        var dy = (toY - fromY);  
        var distance = Math.floor(Math.sqrt(dx*dx + dy*dy));  
        var dashlineInteveral = (pattern <= 0) ? distance : (distance/pattern);  
        var deltay = (dy/distance) * pattern;  
        var deltax = (dx/distance) * pattern;  
          
        // draw dash line  
        this.beginPath();  
        for(var dl=0; dl<dashlineInteveral; dl++) {  
            if(dl%2) {  
                this.lineTo(fromX + dl*deltax, fromY + dl*deltay);  
            } else {                      
                this.moveTo(fromX + dl*deltax, fromY + dl*deltay);                    
            }                 
        }  
        this.stroke();  
    };  
    var draw = new B.Class({
        __propertys__: function () {//实例属性
                // this.canvas = canvas;
                //this.ctx = canvas.getContext("2d");

            },
        initCTX:function(){
            this.ctx.textBaseline = 'middle';
            this.ctx.textAlign = 'center';
            this.ctx.font =FONTSIZE+"px Arial, sans-serif";
        },
		drawText:function(x,y,w,h,s,ctx){


            ctx.fillText(s, x+w/2, y+h/2);
        },

        clear : function(){
            //console.log(this.ctx, this.canvas,this.canvas.width, this.canvas.height);
        	this.ctx.clearRect ( 0 , 0 , this.canvas.width, this.canvas.height );

        },
        drawColHead :function(){
            var ctx = this.ctx;
            ctx.fillStyle = "#f5f5f5";
            ctx.strokeStyle = "#CCC";
            ctx.lineWidth = 0.5;
            var startX = 0.5;
            var startY = 0.5;
            startX+=C.rowHeadWidth;

            if(!this.colsheader.length){
                for(var i=0;i<C.cols;i++){
                    ctx.save();
                    this.colsheader.push({x:startX+0.5,width:C.colHeadWidth-1,col:i+1});
                    var s = String.fromCharCode((65+i));
                    //ctx.moveTo(startX, startY);
                    ctx.strokeRect(startX, startY, C.colHeadWidth, C.colHeadHeight);
                    ctx.fillRect (startX+0.5, startY+0.5, C.colHeadWidth-1, C.colHeadHeight-1);
                    ctx.fillStyle = TEXTSTYLE;
                    this.drawText(startX+0.5, startY+0.5,C.colHeadWidth-1,C.colHeadHeight-1,s,ctx);
                    ctx.restore();
                    startX+=C.colHeadWidth;
                    
                }
            }else{
                for(var i=0,length=this.colsheader.length;i<length;i++){
                    var colsheader = this.colsheader[i],width = colsheader.width;
                    ctx.save();
                    var s = String.fromCharCode((65+i));
                    //ctx.moveTo(startX, startY);
                    ctx.strokeRect(startX, startY, width, C.colHeadHeight);
                    ctx.fillRect (startX+0.5, startY+0.5, width-1, C.colHeadHeight-1);
                    ctx.fillStyle = TEXTSTYLE;
                    this.drawText(startX+0.5, startY+0.5,width-1,C.colHeadHeight-1,s,ctx);
                    ctx.restore();
                    startX+=width;
                    
                }
            }
        },
        drawRowHead :function(){
            var ctx = this.ctx;
            ctx.fillStyle = "#f5f5f5";
            ctx.strokeStyle = "#CCC";
            ctx.lineWidth = 0.5;
            var startX = 0.5;
            var startY = 0.5;
            ctx.strokeRect (startX, startY, C.rowHeadWidth, C.colHeadHeight);
            ctx.fillRect (startX+0.5, startY+0.5, C.rowHeadWidth-1, C.colHeadHeight-1);
            startY+=C.colHeadHeight;
            for(var i=1;i<C.rows;i++){
                ctx.save();
                //ctx.moveTo(startX, startY);
                ctx.strokeRect(startX, startY, C.rowHeadWidth, C.rowHeadHeight);
                
                ctx.fillRect (startX+0.5, startY+0.5, C.rowHeadWidth-1, C.rowHeadHeight-1);
                ctx.fillStyle = TEXTSTYLE;
                this.drawText(startX+0.5, startY+0.5,C.rowHeadWidth-1,C.rowHeadHeight-1,i,ctx);
                ctx.restore();
                startY+=C.rowHeadHeight;
                
            }
        },
        drawRowColCells : function(flag){

            this.ctx.fillStyle = TEXTSTYLE;
            for(var i=0;i<C.rows;i++){
                for(var j=0,len = C.cols;j<len;j++){
                    if(flag =='init'){
                        this.pushCell(new CELL(i+1,j+1));
                    }else{
                        var cell = this.getCell(i+1,j+1);
                        if(cell.needpaint){

                            this.drawRowColCell(i,j,String.fromCharCode(65+i)+j,cell);
                            continue;
                        }
                    }
                    this.drawRowColCell(i,j,String.fromCharCode(65+i)+j);
                    
                }
            }
        },

        drawRowColCell : function(row,col,str,cell){
            var ctx = this.ctx;
            var startX = 0.5;
            var startY = 0.5;
            startX += C.rowHeadWidth;
            startY += C.colHeadHeight;

            startX += C.colHeadWidth * col;
            startY += C.rowHeadHeight * row;
            //ctx.moveTo(startX, startY);
            //if(m_canvas){
            //	ctx.drawImage(m_canvas, startX, startY);
            //}else{
                if(cell && cell.isselected){
                    ctx.save();
                    ctx.lineWidth =2;
                    ctx.strokeStyle = '#5292f7'; 
                    ctx.strokeRect(startX-0.5, startY-0.5, C.colHeadWidth+1, C.rowHeadHeight+1);
                    ctx.restore();
                }else{
                    ctx.strokeRect(startX, startY, C.colHeadWidth, C.rowHeadHeight);
                }
            	

            //}

            this.drawText(startX+0.5, startY+0.5,C.colHeadWidth-1,C.rowHeadHeight-1,str,ctx);
        },


        drawYAxis: function(){
            

            var ctx = this.ctx;
            var startX = 0;
            var startY = 0;

            ctx.fillStyle="#F1F1F1";//console.log(ctx,startX+0.5, startY+0.5, C.YAXISWIDTH-1, C.height-1);
            ctx.fillRect(startX, startY, C.YAXISWIDTH, C.height);
            this.drawTAngel();
            this.drawBAngel();
            this.drawYScrollBar();
        },
        drawTAngel: function(){
            var ctx = this.ctx;
            var startX = 0;
            var startY = 0;
            var offest  = 5;
            var ANGELWIDTH = 8;
            ctx.fillStyle="#A3A3A3";console.log(startX+C.YAXISWIDTH/2, startY);
            var x = startX+C.YAXISWIDTH/2;
            var y= startY+offest;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x+ANGELWIDTH/2,y+ANGELWIDTH/2);
            ctx.lineTo(x-ANGELWIDTH/2,y+ANGELWIDTH/2);
            ctx.closePath();
            ctx.fill();

        },
        drawBAngel: function(){
            var ctx = this.ctx;
            var startX = 0;
            var offest  = 5;
            var startY = C.height
            var ANGELWIDTH = 8;
            ctx.fillStyle="#A3A3A3";//console.log(startX+C.YAXISWIDTH/2, startY);
            var x = startX+C.YAXISWIDTH/2;
            var y= startY-offest;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x+ANGELWIDTH/2,y-ANGELWIDTH/2);
            ctx.lineTo(x-ANGELWIDTH/2,y-ANGELWIDTH/2);
            ctx.closePath();
            ctx.fill();

        },
        drawYScrollBar : function(){
            var ctx = this.ctx;
            var offest  = 5;
            var ANGELWIDTH = 8;
            var AngelRegionH =offest*2 + ANGELWIDTH/2;
            var startX = 0;
            var startY = AngelRegionH;
            var YScrollBarRegionH = C.height - (offest*2 + ANGELWIDTH/2)*2;
            
            ctx.fillStyle="#AAAAAB";console.log(ctx,startX, startY, C.YAXISWIDTH-1, C.height-1);
            ctx.fillRect(startX, AngelRegionH, C.YAXISWIDTH, YScrollBarRegionH);

        },
        setRenderCtx:function(){
            this.ctx.strokeStyle="#5292f7";
            this.ctx.lineWidth = 2;
            
            this.ctx.fillStyle="rgba(175, 216, 255, 0.1)";
            
        },
        getCellXY :function(currentCell){
            if(currentCell.col){
                var headcol = this.parent.colsheader[currentCell.col-1];
                return headcol;
            }
           
        },
        getCellStartXY:function(row,col){

            var ctx = this.ctx;
            var startX = 0.5;
            var startY = 0.5;
            startX += C.rowHeadWidth;
            startY += C.colHeadHeight;

            startX += C.colHeadWidth * (col-1);
            startY += C.rowHeadHeight * (row-1);
            return {x:startX,y:startY};
        },
        getCeRowHeaderStartXY:function(row,col){
            var ctx = this.ctx;
            var startX = 0.5;
            var startY = 0.5;
            
            startY += C.colHeadHeight;

            startY += C.rowHeadHeight * (row-1);
            return {x:startX,y:startY};
        },
        renderRowColCell : function(srow,scol,erow,ecol){
            if(!erow){
                erow = 1;
            }
            if(!ecol){
                ecol =1;
            }
            if(!srow){
                srow = 1;
                erow = C.rows;
            }
            if(!scol){
                scol =1;
                ecol = C.cols;
            }
            var srowXY = this.getCellStartXY(srow,scol);
            var erowXY = this.getCellStartXY(erow,ecol);
            var startX = srowXY.x -0.5;
            var startY = srowXY.y-0.5;
            if(erowXY.x<startX)startX = erowXY.x;
            if(erowXY.y<startY)startY = erowXY.y;
            var width = (Math.abs(ecol-scol)+1)*C.colHeadWidth;
            var height = (Math.abs(erow-srow)+1)*C.rowHeadHeight;
           // console.log("clearRowColCell","srow",srow,"scol",scol, "erow",erow,"ecol",ecol, width,height);
            this.ctx.strokeRect(startX,startY, width+1, height+1);
            this.ctx.fillRect(startX,startY, width+1, height+1);
            this.ctx.clearRect(srowXY.x,srowXY.y, C.colHeadWidth, C.rowHeadHeight);

            this.ctx.save();
            this.ctx.fillStyle="rgba(41, 127, 255, 0.3)";
            this.ctx.fillRect(0.5,startY, C.rowHeadWidth, height);
            this.ctx.fillRect(startX,0.5, width, C.colHeadHeight);
            this.ctx.restore();
                

        },

        drawSelect:function(selectArea){
            var startcell = selectArea.startcell;
            var endcell = selectArea.endcell;
            
            if(!endcell){
                endcell = startcell;
            }
            var srow = startcell.row;
            var scol = startcell.col;
            var erow = endcell.row;
            var ecol = endcell.col;
            //console.log(209,srow,scol,erow,ecol,endcell);
            this.clear();
            this.renderRowColCell(srow,scol,erow,ecol);


        }
    });
    return draw;


});