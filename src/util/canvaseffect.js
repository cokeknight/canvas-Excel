define(["base","config","draw","cell","utils"], function(B, C,D,CELL,utils) {
 
    var canvasshadow = new B.Class(D,{
         __propertys__: function () {//实例属性


            },
        /**
        * 图表绘制的初始化函数
        */
        init:function(){
            var canvas = document.createElement("canvas");
            canvas.id="canvaseffect";
            canvas.width  =C.width;
            canvas.height =C.height;
            document.getElementById("canvas").appendChild(canvas);
            this.canvas = canvas;

            this.ClientRect = this.canvas.getBoundingClientRect();
            if (canvas.getContext) {
                this.ctx = canvas.getContext("2d");
            }else{
                throw "浏览器不支持canvas";
            }

        },
        setParent:function(parent){
            this.parent = parent;
        },
        renderdashLine:function(x){
            this.clear();
            this.ctx.dashedLineTo(x, 0,x,C.height, 1);
        },
        clear:function(){
            this.ctx.clearRect(0,0,C.width,C.height);
        }

    });
    return canvasshadow;
});
