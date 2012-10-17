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

- element : ID of the element you want to draw the heatmap within

##### Example


    <!-- heatmap area -->
    <div id="heat"></div>
    
    
    <script>
        var h = new heatmap({
        element : 'heat',
        ....
        });
    </script>


- size : size of heatmap circle default to 50

- gradient : color scale for the heatmap
There are five preset gradient options, classic, classic2, fire, fire2 and gold
You can also set your own color gradient by specifying a full URL for the color
gradient png image


    


