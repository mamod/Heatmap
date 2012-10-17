Heatmap
=======

Yet another heatmap javascript HTML5 canvas library

Description
===========






USAGE
=====
    
    
    var obj = [
        {x:66,y:50},
        {x:75,y:65},
        {x:75,y:65},
        {x:66,y:50}
    ];
    
    window.onload = function(){
        
        var h = new heatmap({
            element : '',
            size : 50, //size of the heatmap cicle
            opacity: .9,
            gradient : 'fire', //classic || classic2 || fire || fire2 || gold
            shadow : 'large', //lareg || medium || small
            queue : {
                items : 10000,
                delay : 250
            },
            onComplete : function(){
                //queue finished
            }
        });
        
        h.add.Data(obj);
        
        
    };
    


OPTIONS
=======

- element

ID of the element you want to draw the heatmap within

#### Example


    <!-- html document -->
    <div id="heat"></div>
    
    
    //javascript
    var h = new heatmap({
    element : 'heat',
    ....
    });


    


