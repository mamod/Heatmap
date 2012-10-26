Heatmap
=======

Yet another heatmap javascript HTML5 canvas library

Description
===========

This heatmap inspired by [pa7 heatmap](https://github.com/pa7/heatmap.js "") with a complete rewrite
and some twists like 

- Multi Gradient options "color scheme"
- Ability to queue data points : this feature is useful for large data set = thousands of points to draw
- No need to set Max point or point count as the script will calculate these


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

- **element** : ID of the element you want to draw the heatmap within

##### Example


    <!-- heatmap area -->
    <div id="heat"></div>
    
    
    <script>
        var h = new heatmap({
        element : 'heat',
        ....
        });
    </script>


- **size (int)** : size of heatmap circle default to 50

- **gradient (string)** : color scale for the heatmap, there are five preset gradient options
 - classic
 - classic2
 - fire
 - fire2
 - gold
 - URL for a custom gradient png file



- **shadow (string)** : shadow area of the heatmap point, this defines the attach points with close points
 - large
 - medium
 - small



- **queue (object)** : define queue options
 - items : how many point to inject at once
 - delay : how many milliseconds to wait for the next injection



- **onComplete (function)** : a function to be called once the heatmap finish draing all points

DATA
====

Data Array of points to draw

    var obj = [{x:10,y:100,count:230}, .... ];

- **x (required)** : x position of the point within heatmap area
- **y (required)** : y position of the point within heatmap area
- **count (optional)** : number of points at that position

Once your data object constructed, inject it with one of the following functions
    
    var h = new heatmap({
        //options
    });
    
    h.add.Data(obj,funtion(){
        //this is optional function and will be called when
        
    });
    
    //or queued injection
    
    h.add.toQueue(data);
    
    //you can add many objects
    h.add.Data(obj);
    h.add.Data(obj2);
    h.add.toQueue(data3);
    ....

    
    //to add a single point
    h.add.Point(x,y,count);



HELP?
=====

If you need any help or have any question just let me know 

[mamod.mehyar@gmail.com](mailto:mamod.mehyar@gmail.com "heatmap.js")


LICENSE (MIT)
=============
    
    Copyright (c) 2012 Mamod Mehyar

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    



    


