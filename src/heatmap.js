(function(){
    
    var heatmap = function(options){
        
        var h = this;
        
        h.element = options.element;
        h.opacity = options.opacity || .8;
        h.size = options.size || 50;
        h.map = {};
        h.layers = [];
        h.maxValue = 1;
        h.colorWheel = [];
        
        var SRCmap = {
            classic : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAYCAIAAACa4rRzAAABzUlEQVR4Xu1TW27jQAzjvJykRdv0Lt3Pvf+Z2mRGS824qVHsDUSDIBh5HFuUmP58/B2GYclGGjswRu6dnHpfsFnxA5PzPMkDMMtmxYE6uVmqSA25GrkQm3MlNuc2sS1UnKoL8nnyVnAuaBUto1E3XBrOFZdt8jxPcSqOLTtaQgPqRAZgQJ8YwP2AG0B8wW4YXxOf6FP0Kbx+x1j8EDfYoej6vp+0Pm/NV7jmGynoyP72hJ4xShrFuVNUh9XcyS37z1YoXJM3Z69sru23WPWdaY+d1jEaQOF/SDMoaIPRj+ZstGQxi8uhMkWGUWRatdyiVfPzd+eWVfy5xLdzy78ffH7rJY68jrHCRx7HHo8f//k4Iur1Jfyq/14pefnBObsml+KoXBsuFVfljMsFT094fsbrK15ecL3ueH/HAitvb7zlK6NLDoR1QAEIO3o17g4oANqD0A4oAKHHr+YVAO1AaAcUgNDjV/MKgHYgtAMKQOjxq3kFQDsQ2gEFIPT41bwCoB0I7YACEHr8al4B0A6EdkABCD1+Na8AaAdCO6AAhB6/mlcAtAOhHVAAQo9fzSsA2oHQDigAocev5hUA7UBoBxSA0ONX8wqAdiC0A/8AiXjlCY2R9IUAAAAASUVORK5CYII=',
            fire : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAYCAIAAACa4rRzAAABZElEQVR4Xu2TC27DMAxD5abd/a+SCyajxMbwmm0X0AsMgaYVWz+Ofd8j4jzP1c6twD/Yp3eflb/j4zh+dfjgM6byHIqtsKyXsMlcxWurZT6PfoKHHRZSjEnbLcL4EeEjM2+78HbY7oz9//D0Vb5ZN0zP+US+fjkMB3OFpL7or9A+ZAuMM+q6XAbPiK22As8itRXwdtrXxGe86uhuRX4tf9nB9wvntesTxfg5BSar6LcRI6MUUnBl9Y+2ecti86KoCK5lrOcNZOfKmK4jk2YMPvzN66318vl0hnutR9aVjwq0rQACaNt6Es8KIADmoHUFEEDr9pM8AmAGWlcAAbRuP8kjAGagdQUQQOv2kzwCYAZaVwABtG4/ySMAZqB1BRBA6/aTPAJgBlpXAAG0bj/JIwBmoHUFEEDr9pM8AmAGWlcAAbRuP8kjAGagdQUQQOv2kzwCYAZaVwABtG4/ySMAZqB1Bb4Bp+E0PPOxDdYAAAAASUVORK5CYII='
        }
        
        var SRC =  SRCmap[options.gradiant] || options.gradiant || SRCmap.classic;
        
        //create colors graiant
        this.createColors = function(){
            
            //set color gradiant
            var colorsIMG = new Image();
            var canvas = document.createElement("canvas");
            canvas.style.position = "absolute";
            canvas.style.top = "0";
            canvas.style.left = "0";
            canvas.style.zIndex = 9999999;
            var context = canvas.getContext("2d");
            
            canvas.width = 256;
            canvas.height = 256;
            
            colorsIMG.onload = function() {
                
                var width = colorsIMG.width;
                var height = colorsIMG.height;
                var x,y;
                
                if (height > width){
                    width = 10;
                    if (height !== 256 ){
                        height = 256;
                    }
                    
                } else if (width > height){
                    height = 10;
                    if (width != 256 ){
                        width = 256;
                    }
                }
                
                context.drawImage(this,0,0,width,height);
                
                var imageData = height > width ? context.getImageData(0, 0, 1, 256)
                : context.getImageData(0, 0, 256, 1);
                
                var data = imageData.data;
                
                for(var i = 0, n = data.length; i < n; i += 4) {
                    var r = i, g = i+1, b = i+2, a = i+3;
                    h.colorWheel.push({
                        "r" : data[r],
                        "g" : data[g],
                        "b" : data[b],
                        "a" : data[a]
                    });
                }
                
            }
            
            colorsIMG.src = SRC;
        }
        
        
        
        this.ini = function(){
            
            var element = h.element instanceof Object ? h.element : document.getElementById(h.element);
            
            //create canvas layers
            for (var i = 0; i<3;i++){
                
                var canvas = document.createElement("canvas");
                canvas.style.position = "absolute";
                canvas.style.top = "0";
                canvas.style.left = "0";
                canvas.style.zIndex = 9999990+i;
                
                canvas.width = element.style.width.replace(/px/, "") || h.getWidth(element);
                canvas.height =  element.style.height.replace(/px/, "") || h.getHeight(element);
                element.appendChild(canvas);
                h.layers.push(canvas);
            }
            
            //hide layer 0 where we want to draw transparent images
            h.layers[0].style.visibility = 'hidden';
            h.transIMG = new Image();
            h.transIMG.src = 'data:image/png;base64,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';
            
        };
        
        this.getWidth = function(element){
            var width = element.offsetWidth;
            if(element.style.paddingLeft)
                width+=element.style.paddingLeft;
            if(element.style.paddingRight)
                width+=element.style.paddingRight;
            
            return width;
        };
        
        this.getHeight = function(element){
            var height = element.offsetHeight;
            if(element.style.paddingTop)
                height+=element.style.paddingTop;
            if(element.style.paddingBottom)
                height+=element.style.paddingBottom;
            
            return height;
        };
        
        this.add = new heatmapAdd(h);
        
        h.createColors();
        h.ini();
        
    };
    
    
    var heatmapAdd = function(h) {
        
        var me = this;
        
        this.Data = function(obj){
            
            var dots;
            if (Object.prototype.toString.call( obj ) === '[object Array]' ){
                dots = obj;
            } else {
                dots = obj.data;
            }
            
            //we get max points
            if (obj.max && obj.max > h.maxValue){
                h.maxValue = obj.max;    
            }
            
            for (var x = 0; x < dots.length; x++){
                var dot = dots[x];
                me.setMax(dot.x,dot.y,dot.count);
            }
            
            me.drawHeatMap();
        };
        
        this.Point = function(x,y,num) {
            
            var canvas = h.layers[0];
            var context = canvas.getContext("2d");
            var canvas2 = h.layers[1];
            var context2 = canvas2.getContext("2d");
            
            var oldmax = h.maxValue;
            var count = me.setMax(x,y,num);
            
            var decrease = count > oldmax == 1 ? true : false;
            console.log(count);
            if (decrease){    
                me.setImageData(canvas,context,context2,{
                    redraw : true,
                    oldMax : oldmax,
                    onComplete : function(){
                        //context.width = context.width;
                        //context.globalAlpha = 1;
                        context.drawImage(h.transIMG, x, y, h.size, h.size);
                        me.setImageData(canvas,context,context2,{
                            left : x,
                            top : y,
                            width : h.size,
                            height : h.size
                        });
                    }
                });
                
                console.log(h.maxValue);
                
            } else {
                context.globalAlpha = count/h.maxValue;
                context.drawImage(h.transIMG, x, y, h.size, h.size);
                me.setImageData(canvas,context,context2,{
                    left : x,
                    top : y,
                    width : h.size,
                    height : h.size
                });
            }
        };
        
        this.setMax = function(x,y,count){
            
            if (!h.map[x]){
                h.map[x] = {};
            }
            
            var num = count ? count : 1;
            
            h.map[x][y] = h.map[x][y] ? h.map[x][y]+num : num;
            
            if (h.map[x][y] > h.maxValue) {
                h.maxValue = h.map[x][y];
            }
            
            return h.map[x][y];
        };
        
        this.drawHeatMap = function(){
            
            var canvas = h.layers[0];
            var context = canvas.getContext("2d");
            var canvas2 = h.layers[1];
            var context2 = canvas2.getContext("2d");
            
            //reset transparent canvas
            canvas.width = canvas.width;
            
            var map = h.map;
            for( var x in map ){
                for( var y in map[x] ){    
                    context.globalAlpha = map[x][y]/h.maxValue;
                    context.drawImage(h.transIMG, x, y, h.size, h.size);
                }
            }
            
            
            me.setImageData(canvas,context,context2);
        };
        
        this.setImageData = function(canvas,context,context2,obj) {
            
            context.globalAlpha = 1;
            var colors = h.colorWheel;
            //give some time for colorsWheel to be fully loaded
            if ( colors.length < 255 ){
                setTimeout(function(){
                    me.setImageData(canvas,context,context2,obj);
                },20); return;
            }
            
            var width = canvas.width,
            height = canvas.height,
            left = 0, top = 0,
            onComplete = function(){};
            
            var redraw = false;
            if (obj){
                redraw = obj.redraw;
                left = obj.left || left;
                top = obj.top || top;
                width = obj.width || width;
                height = obj.height || height;
                onComplete = obj.onComplete || onComplete;
            }
            
            var imageData = context.getImageData(left, top, width, height);
            var data = imageData.data;
            
            for(var i = 0, n = data.length; i < n; i += 4) {
                
                var r = i, g = i+1, b = i+2, a = i+3;
                var alpha = data[a];
                
                if (alpha > 0){
                    
                    if (redraw){
                        alpha = parseInt((alpha * obj.oldMax) / h.maxValue);
                        if (alpha < 1){
                            alpha = 1;
                        } else if (alpha > 255){
                            alpha = 255;
                        }
                    }
                    
                    var color = colors[alpha];
                    data[a] = (alpha*h.opacity);
                    data[r] = color['r'];
                    data[g] = color['g'];
                    data[b] = color['b'];
                }
            }
            
            if (obj && obj.redraw){
                context.putImageData(imageData, 0,0,left,top);
            }
            
            context2.putImageData(imageData, left-(h.size/2), top-(h.size/2));
            
            onComplete();
            
        };
    }
    
    window.heatmap = heatmap;
    
})();