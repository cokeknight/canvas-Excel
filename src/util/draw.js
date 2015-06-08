define(["base","config","cell"], function(B, C,CELL) {

	var FONTSIZE = 12;
	var TEXTSTYLE = "#222222";
	return {
		setCanvas : function(canvas){
			this.canvas = canvas;
			this.ctx = canvas.getContext("2d");
			return this;
		},
		drawText:function(x,y,w,h,s,ctx){

            ctx.fillStyle = TEXTSTYLE;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.font =FONTSIZE+"px Arial, sans-serif";
            ctx.fillText(s, x+w/2, y+h/2);
        },
        clear : function(){
        	this.ctx.clearRect ( 0 , 0 , this.canvas.width, this.canvas.height );

        },
        drawColHead :function(){
            var ctx = this.ctx;
            ctx.fillStyle = "#eeeeee";
            ctx.strokeStyle = "#CCC";
            ctx.lineWidth = 0.5;
            var startX = 0.5;
            var startY = 0.5;
            startX+=C.rowHeadWidth;

            for(var i=0;i<C.rows;i++){
                ctx.save();
                
                var s = String.fromCharCode((65+i));
                //ctx.moveTo(startX, startY);
                ctx.strokeRect(startX, startY, C.colHeadWidth, C.colHeadHeight);
                ctx.fillRect (startX+0.5, startY+0.5, C.colHeadWidth-1, C.colHeadHeight-1);
                this.drawText(startX+0.5, startY+0.5,C.colHeadWidth-1,C.colHeadHeight-1,s,ctx);
                ctx.restore();
                startX+=C.colHeadWidth;
                
            }
        },
        drawRowHead :function(){
            var ctx = this.ctx;
            ctx.fillStyle = "#eeeeee";
            ctx.strokeStyle = "#CCC";
            ctx.lineWidth = 0.5;
            var startX = 0.5;
            var startY = 0.5;
            ctx.strokeRect (startX, startY, C.rowHeadWidth, C.colHeadHeight);
            ctx.fillRect (startX+0.5, startY+0.5, C.rowHeadWidth-1, C.colHeadHeight-1);
            startY+=C.colHeadHeight;
            for(var i=1;i<C.cols;i++){
                ctx.save();
                //ctx.moveTo(startX, startY);
                ctx.strokeRect(startX, startY, C.rowHeadWidth, C.rowHeadHeight);
                ctx.fillRect (startX+0.5, startY+0.5, C.rowHeadWidth-1, C.rowHeadHeight-1);
                this.drawText(startX+0.5, startY+0.5,C.rowHeadWidth-1,C.rowHeadHeight-1,i,ctx);
                ctx.restore();
                startY+=C.rowHeadHeight;
                
            }
        },
        drawRowColCells : function(D,flag){
        	var m_canvas = document.createElement('canvas');
			m_canvas.width = C.colHeadWidth;
			m_canvas.height = C.rowHeadHeight;
			var m_context = m_canvas.getContext('2d');
			m_context.strokeRect(0, 0, C.colHeadWidth, C.rowHeadHeight);
            for(var i=0;i<C.rows;i++){
                for(var j=0,len = C.cols;j<len;j++){
                    if(flag =='init'){
                        this.pushCell(new CELL(i+1,j+1));
                    }else{
                        var cell = this.getCell(i+1,j+1);
                        if(cell.needpaint){
                            D.drawRowColCell(i,j,String.fromCharCode(65+i)+j,cell);
                            continue;
                        }
                    }
                    D.drawRowColCell(i,j,String.fromCharCode(65+i)+j);
                    
                }
            }
        },

        drawRowColCell : function(row,col,str,cell){
            var ctx = this.ctx;
            var startX = 0.5;
            var startY = 0.5;
            startX += C.rowHeadWidth;
            startY += C.colHeadHeight;

            startX += C.colHeadWidth * row;
            startY += C.rowHeadHeight * col;
            //ctx.moveTo(startX, startY);
            //if(m_canvas){
            //	ctx.drawImage(m_canvas, startX, startY);
            //}else{
                if(cell && cell.isselected){
                    ctx.save();
                    ctx.lineWidth =2;
                    ctx.strokeStyle = '#5292f7';  console.log(105,startX,startY);
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

        }
    }


});