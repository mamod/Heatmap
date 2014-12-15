/*
* heatmap.js
* MIT Licensed
* @author Mamod Mehyar
* http://twitter.com/mamod
* http://mamod.me
*/

(function(){
    "use strict";
  
    var heatmap = function(options){
        
        var h = this;
        h.element = options.element;
        h.opacity = options.opacity || 0.8;
        h.size = options.size || 50;
        h.onComplete = options.onComplete;
        h.map = {};
        h.layers = [];
        h.maxValue = 1;
        h.colorWheel = [];
        h.queue = options.queue || false;
        h.clone = {};
        h.list = [];
        h.counter = 0;
        
        var SRCmap = {
            classic : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAA'+
                      'AQCAIAAAB2sTYeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZV'+
                      'JlYWR5ccllPAAAAKVJREFUeNrs09EOgyAMheHDat//gYW4jUTTiS'+
                      'hbdrPs/0JITQHF5CT5okkyPedtWKduH9/dYqcbPz7NFimHMUtlLX'+
                      'Kt57UV697Yth+eMDLaD8i9E5LK4wZeb+P1Nv56413LwgIfXtZrxX'+
                      'NOWm2dSvijuzlftQ73jre+99KbgD9GAEAAAAIAEACAAAAEACAAAA'+
                      'EACABAAAACABAAgAAABAD4ZXcBBgAS/IMtyzcXigAAAABJRU5Erk'+
                      'Jggg==',
            
            classic2 : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAA'+
                       'AAYCAIAAACa4rRzAAABzUlEQVR4Xu1TW27jQAzjvJykRdv0Lt3P'+
                       'vf+Z2mRGS824qVHsDUSDIBh5HFuUmP58/B2GYclGGjswRu6dnHp'+
                       'fsFnxA5PzPMkDMMtmxYE6uVmqSA25GrkQm3MlNuc2sS1UnKoL8n'+
                       'nyVnAuaBUto1E3XBrOFZdt8jxPcSqOLTtaQgPqRAZgQJ8YwP2AG'+
                       '0B8wW4YXxOf6FP0Kbx+x1j8EDfYoej6vp+0Pm/NV7jmGynoyP72'+
                       'hJ4xShrFuVNUh9XcyS37z1YoXJM3Z69sru23WPWdaY+d1jEaQOF'+
                       '/SDMoaIPRj+ZstGQxi8uhMkWGUWRatdyiVfPzd+eWVfy5xLdzy7'+
                       '8ffH7rJY68jrHCRx7HHo8f//k4Iur1Jfyq/14pefnBObsml+KoX'+
                       'BsuFVfljMsFT094fsbrK15ecL3ueH/HAitvb7zlK6NLDoR1QAEI'+
                       'O3o17g4oANqD0A4oAKHHr+YVAO1AaAcUgNDjV/MKgHYgtAMKQOj'+
                       'xq3kFQDsQ2gEFIPT41bwCoB0I7YACEHr8al4B0A6EdkABCD1+Na'+
                       '8AaAdCO6AAhB6/mlcAtAOhHVAAQo9fzSsA2oHQDigAocev5hUA7'+
                       'UBoBxSA0ONX8wqAdiC0A/8AiXjlCY2R9IUAAAAASUVORK5CYII=',
            
            fire : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAYC'+
                   'AIAAACa4rRzAAABZElEQVR4Xu2TC27DMAxD5abd/a+SCyajxMbwmm0X'+
                   '0AsMgaYVWz+Ofd8j4jzP1c6twD/Yp3eflb/j4zh+dfjgM6byHIqtsKy'+
                   'XsMlcxWurZT6PfoKHHRZSjEnbLcL4EeEjM2+78HbY7oz9//D0Vb5ZN0'+
                   'zP+US+fjkMB3OFpL7or9A+ZAuMM+q6XAbPiK22As8itRXwdtrXxGe86'+
                   'uhuRX4tf9nB9wvntesTxfg5BSar6LcRI6MUUnBl9Y+2ecti86KoCK5l'+
                   'rOcNZOfKmK4jk2YMPvzN66318vl0hnutR9aVjwq0rQACaNt6Es8KIAD'+
                   'moHUFEEDr9pM8AmAGWlcAAbRuP8kjAGagdQUQQOv2kzwCYAZaVwABtG'+
                   '4/ySMAZqB1BRBA6/aTPAJgBlpXAAG0bj/JIwBmoHUFEEDr9pM8AmAGW'+
                   'lcAAbRuP8kjAGagdQUQQOv2kzwCYAZaVwABtG4/ySMAZqB1Bb4Bp+E0'+
                   'PPOxDdYAAAAASUVORK5CYII=',
            
            fire2 : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKMAAAAP'+
                    'CAIAAAAH0OhCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYW'+
                    'R5ccllPAAAA8VJREFUeNrMmG162yAMgAVdmma7/412kv3bGYytmS8h'+
                    'gcA48dPFSagNCNd+0af5/eevQ+e2LbSr2xaH+/lSenBdtmX17Rra2J'+
                    'mGgogLJ1Ewi+wf2H9raJ0f8tNcEol33EX2TmA96HbBjw3vy/blNt8u'+
                    '29359iu24eTTt6sfomlueyzbZ55DIvelnDzcel8wCOINN/gB8AmpvW'+
                    'lfGlXnjEerObf+BH75sc/+mb+/5Pmj6RmP7suJw+4/3D8mtOHEt7Ez'+
                    'tPvhT3zj23ySRfb5UcRAnok0OYnQgiSS75WGgggWybxkXD5M9C1iuI'+
                    'ytn5hHWVuJAIalUM7JwmkJEJdq5/gSWD//8tHeBLFO7LXaVHtytD4s'+
                    'vet4XUNKbz5R4bSSxJhrerskglKk7KHyP3gqCtf0TGFO6WRcIYsA3w'+
                    'q509JqmF8pqO/6Na5wimu7IeyQqz1DHRSdJjQJkmm4Mh6AuY1Usx73'+
                    'uAZt5ZtIioByL46ZccVGfRt9hWp/CBFugN6Ca315SonN0WhLmuHBbK'+
                    '6ZnpFyh066Zmv6QYM90y1EgN9LF4lPDCOzzE13l6sRjqXZH/+fqyby'+
                    'PNcD0x2sd/KR4jnIcZIdLs6YuCPfE4Y2ROvFhyJGxAGAKlduuqHDFV'+
                    'BwrWyDMN0wzdVcx/UwGlDuZIeMx6OK9TZZsQg6C9AyJhA+NcdUFEhl'+
                    'qRJtIddbwTUJcJEEKt2lNd1QuI7Ud2i6kTmWaa6q8pkXQrbRCqd01x'+
                    '4FZVpExpWPqFf/aeEaeUHtkgkgHX2uWdGRArhiFaTp5sywNd19L865'+
                    'YuUC2BJPcYWXuao6DL3Y2w7B2xknza23dJZIwBuu0GZT8Q8Bh3r3mO'+
                    'IIWBiXIiNuTrxIw9VUBll0iq1AXEF1AVzFB8zMa5H55L5RzMnT8Zed'+
                    '8tMiwwEZN5kuV3LJnpYMtUaJdRudNXuo5SqjM0rAWhWfTayFPr1RYv'+
                    '001+MUS1rvomLAoAiuwVxCdqeZ00zBpAqFsSqYlHsZmC2YwIAr6gWT'+
                    'EtbNRMLfnICdSJ0PE2tVp4UhlfZZcq1qLCATsMOCCXlxYfOrQD26C1'+
                    'EbGSfWSDWvZiv0o7N3K5gcpFhPJNZd610KJuGlK1xRFkygSsD6pruU'+
                    'TQYFExqKASiPuqVZhtpDz0RndWJ9DVdzaWJtriqYDCIySolQ96yI0o'+
                    'tzTthUrCuRTsEkH6b14uOCiZnhOkysL+N6YQJW+2n7cmLd1WnDUiNU'+
                    'CiYlFkdsE2tZMGFPO19jSSIGQPWs5ojridoZzHH9/gTsyaLYbJb1T4'+
                    'ABAFOoeiDXaQ5RAAAAAElFTkSuQmCC',
                    
            gold : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAYC'+
                   'AIAAACa4rRzAAABhElEQVR4Xu1ViQ2EMAyjMNLd/qv1YjsFDokJ7CJV'+
                   'ab42TizG5/vZag1s25wtjG2URsq2Tpyoh+lUUoaSO0OmfKSh8xz7daQ'+
                   'JPrX2kmHCvZBLs3cGHDsPnEuPHZfNMskq59oqyVLSubPB89WkhJ3qyj'+
                   'mUnwnrYX0vrpvHv/8KXzeyEAXyebd3jvbBY8pnPb7kgXW7Dg+uj6mQB'+
                   '9axMxwWpCUsjCKM8hEsJ+yUGVv+EFfv0BTp1RpuDb2a0Sg3cN056lWw'+
                   'fLAD+BYg3/RP63FZ4XYgCu+qKMqKlYmFvmioP50fnn1UHs3iSqvBRay'+
                   'EBQdvygoCvgiEAL69T+X4+QWFIOCMQAjg3P3Unj9AZsAbgfwBvPtvX3'+
                   '0IYD8C3gCEAN79t68+BLAfAW8AQgDv/ttXHwLYj4A3ACGAd//tqw8B7'+
                   'EfAG4AQwLv/9tWHAPYj4A1ACODdf/vqQwD7EfAGIATw7r999SGA/Qh4'+
                   'AxACePffvvoQwH4EvAEIAbz7b199CGA/At4A/ACK5CXSpqpFpgAAAAB'+
                   'JRU5ErkJggg=='
        };
        
        var ClickSRC = {
            large : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAp'+
                    'CAYAAACoYAD2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYW'+
                    'R5ccllPAAAA9xJREFUeNq0mYtu4jAQRW3HNNDSfVT7/5+4q5aShby8'+
                    'RLpTXaYTx4Qu0igJTeqTeVyPjXNf9/Ewp47+K/7xVzw7nafMtXzS/4'+
                    'b0K54V2LuA10D6G8ATvhuVd9MtsH4loBzDzD2JAJMBdxNsvKMYtFkv'+
                    'nmbMqZfIfuKKyg04D+rcAnQIdcJxnAHOejMWhNcTCMNNVhnAPKBADQ'+
                    'Q5KnCGMz0bC7ynQSPgxKKC5DwcCbCHDbhnoJfi0H8CjQVeZK+JbfCs'+
                    'HAWcC0kAe7KOzp2CTaWetIokKDix+mIPsA15VJ4dCKyFVTjKPb0qpF'+
                    'F5N+tJKwc3BLVVJt9X5I0BgOeLnWBVRvaGEk96I9TagzWgdhd7gu1g'+
                    'NYVcQn0C5BHPV2ocLqBA11dFFA0JqIxcjPBUDaBnsj1gtwCRwVoCrO'+
                    'lvSVW8rvLFcFtFw5BbAE1w32E/CFRDNhd7x7OBvCeeZhuVlz8KKS7M'+
                    'IoGq+IHC/Ay4l4v9BOweLxEw6BmAW7yoIynqyKTAguHRcUnMWbR1uP'+
                    'cAmwB/4fgMoIhBJ8g3vKAURktFdIZJ3g/KQVee9BkRZ8HeUMgfFegL'+
                    'PLujARsC7ADWIEePhmx5o0nJ5qSVl5WSnyeAfqPc3JEnH/C85OZBaS'+
                    'tPAEEBjswTQRxmAC05qkjAa9gj5WukGaVVWlqraTVkuqykJSipG9PC'+
                    '/K2hKzW4o+toNCM5h2id/MhJP9P26wY1GTqnpcTTHD2oDog1Ufecbq'+
                    'arv/Kkn+nvktI2lhCp0r8IZcL/HPCdGFdzT9IzFnTpiXPSWjhZcCcM'+
                    'LFXKMtOSTjb42xv0sgFkq9o23Qx/8mbM9HPcsPaqWZBqZaFu6Vrm7e'+
                    'mePwR6xAueyZvDUrceZ3LBalg7Cu07yYi0XA0gRUJkxpkAf1/sFdcS'+
                    '/s4Iu7Vou9LJNAPKgJEskKdPBC6QHTx3AOArzo+Uo50RclfSmTtVLD'+
                    '1CeFb65gimMbogyd8jXuAAawhS52ZSEjRa1a2lZlQNwEn1gj2BiFBL'+
                    'TveUHlxo7MW+ZBUZLV0y2vnOaKMGgmxoLnaZzvxE113Gi9k1TjLWzJ'+
                    '5AnRJzgdzQ7OKMfG6pCeY2rc/kY1rKyZGmsGEmX8VTerXojVSxVou9'+
                    'Woe70sLRc/ioQHVBbWheDlTx1r2DIeAa0Ay5L9w9C6obCgrO2mpJBo'+
                    'y1gzErPUu7ar5gH8gb5y6jEmmmitNaSLfQW5bsqqWFnbXcNuDNu2q5'+
                    'NsoXvLClGK4U8JatP6vynbFPvrTvqL1btD+5ZmPfLxTa0uA3Ad7z64'+
                    'NXIU+FKePX/Apx928sM2uTu38W4c8/AQYAPcsnXZBvcOAAAAAASUVO'+
                    'RK5CYII=',
            
            medium :'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAA'+
                    'lCAYAAADFniADAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJl'+
                    'YWR5ccllPAAAA8ZJREFUeNrMWItS2zAQtGTlQcKkFEo77f//W58pE'+
                    'AJJHNuqzOwxm+PkOAzM1DM7dmLJWu+dVme54vWHG9AmvteDrT7O+C'+
                    '/SuVC/43uQ4nZe/ed6lGGCcah67oT7opCna5d5Rjdwq8i0BkHzCAP'+
                    'CxIp4A9wuEqFWkeOQtn3EwhGFeMASJEr0k7NX5LsBG4Wa7kX0yRJz'+
                    'PaQ8nYXAyEAJiFJCZE+oQKzGPQ7ti3CGIwrJgEJgmjDBWa5HpKKoV'+
                    'AFbwg5t9kTcTPzQo5InQt3gZwmzhDnO5/hvijYywB4EHoEH4BHk9G'+
                    'RwmlzIJLYjQlMM3pFYJHwAFvhvRjnWQqFNwjrhLmGVMCYr4XDtrfy'+
                    'ylOIcGoNUN/hFwlXCJc4fQW6OdkJqB2U6QjcJS7ycngyiVK0M+JmU'+
                    'Uz7kidQMqnRkrhO+AFcgeo7wlsgTIXWj7hU0ETjh9SyMIeNNHLo5F'+
                    'LkCmW8JXxM+k1ITUmGL/Fkg7DJGQzOxUgn/InyWOXLocqSuaeARyb'+
                    '9HTp3R80XBDSX8lnKKQxtDZm0LSqkFcqgj9gm4xL2g+o8oxwqEqiN'+
                    'zj6RfYRJMyCYOZmAg69c5xVZwDrUuAAnbKGMpI/RpoIzMWLGRCc1Y'+
                    'TzPwSW3fs6QEZQniTXMK2bF1VV5IrIN9rSRSB+P7jJML2UD5NSGEg'+
                    'eUO953iOpBKTtlBLAxDcz1m6unNTqnDPBFwhjIvikfdQBdirSpHGq'+
                    'qLhhzcLxp1VlRtn5WKRoXY0sNq+MoOEI+JAwjV1G+n/KnNVaPeWBD'+
                    'Z/mWlF39Zw603eHjfUVO/B/TdkHnWSsUDn+ICnxXak+HJ4nqLqT0l'+
                    'fwpGnV6DyAp9bnF9D5KiWG2E1ZWZWacLuzEwUv7CR0vhWoPI74Qfw'+
                    'M+EPwl/QfARbWtS6+mlyiP1lCc/0TOvpWqyolCtiFBH5DtI/ULFcA'+
                    'vSUvg16qPC9JtI4dviAWMyPFlctwjHDOH0qnSRsuUnsEQKrGnd07P'+
                    '7oJ7irwyHt+fF+Y4UksX1HmviHKQkL6VKkFxaImRLqLhBf64SYk4p'+
                    'JlYQsY3yMakCVrSWjUkpq/KUROeZW1Od3lujRyOEOqwVlLijWioQq'+
                    'Zps5MGo0Vkl66PVVIrj2ygfa0iJiVpcnZGPO7KVyjDP1jLP0LNLEo'+
                    '3loSb/GvLdV9HsrGmFYELtKR+jVo1VKgQqdQpjndQfoNmQDd3gcJm'+
                    'SJreXoI20UatEq5ax4jWkip5aq+ghVBje02a2hd5kf8r11EJD9qX0'+
                    'xtqb7OS5I9fxyPZiPHWQ/2bf858AAwBIQsxINNSncwAAAABJRU5Er'+
                    'kJggg==',
            
            small : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAA'+
                    'jCAYAAAAe2bNZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJl'+
                    'YWR5ccllPAAAA3RJREFUeNq0WIdy00AUlE6S7YTYKYQSCDCh/v/3U'+
                    'IdQAoE4xnEc2yo8zexjNs93WLFAMzvnIt9b7avnKGp/xYSI1rU2Wv'+
                    'f+kPEqsP4zMmzYBdSoyHBp3ldNSMUNXRCBhCLFmtB3FUgocnpd0Rq'+
                    '80oaxkODeGh2gfp3hO1WmJlAIFoIZ1hxQxYKuS1cQ0aevjXcFG4Jb'+
                    'WDfxWYp7SiJxSZgaYkFCfyPj8OQdGO4LdoBtQAk5GKmNTgS/BCPBO'+
                    'TAGsdjjviCZ2BDpQYldwb7gruCe4I5gDwQ3iEytwoXgTHAq+Ab8EA'+
                    'xB9AoqxVYhnzKOYmMLRB4IHgoeCw4FByCzBcIOsTIjMieCYzxMh4y'+
                    'XFF9liIxVZRMuqQ0/ETwXPBM8gkIDEEnIUI4n/wX1dkAmJSKFyToN'+
                    '/iUyCdCFsX0o8ULwSnAEcn0Q9sWgunYLLkyJaK3cnLJOyQWV6WCTA'+
                    'eKjVuUpcAgjbkV9yqBKSkE7gQsnlGHXsisxRPTJtkHkCKq8hHu2Gx'+
                    'Dhh9N6pME9ocyaQZU/1dmZVE4plXfg9wOs/TV7WR8xdp/iSEtCYjP'+
                    'H1hYlM0Am7UKRbM1mnGGvPew1oFhKqNctNT1Vp4sg7OPH3ZZjRg/7'+
                    'DLBvDySvNVvnqTGa2l38qLOihzW5tKX0sG9mVfG5iRVyJGXckkxsu'+
                    'r7zDWQuMBhp/hdNWn/DqzSo7MzjPAOQjgBzqgdFSyJa8LiDF4ZU7E'+
                    'zPKOiHWhPGKPHrXhVI6F7aLLngXVNGPyygyCX6S91pf2IcWLRQZYy'+
                    '9hth3CjsFE3IenyqZeg75ju57ig3LNVQZm33Osf/CVuDEM3Anpt70'+
                    'DLKG2VWCyFfBO8EbwQe8HxKhJTKWEJ8CnKmWGb0PXQu4ozb8VvAa6'+
                    'zEGrQvTKJfINElLPgFEgSy8gMFPgvdQpMZHTH3qptxmaRqoMQv8IK'+
                    'G4yvHZEE3vNtpFhwbyK7jmDIaPQeIzYmZkgnfl2FnS0YLTnkfKLyC'+
                    'jA1SCzaeUOToDnyAjh+SewqPwEhlbgWeelB+uOB1cmpPBCAS54JW+'+
                    'zEwD6eiryjk2HIHEBmWXI/de4b4pTXVzGjeDR924wYmSm2boRBmRg'+
                    'jm1kzmdKEuqK63O2j5izqR/ZY4hhacxRm3INPkXIva4uDRn6/ImRm'+
                    '5yqQpxg/9m/sv/M033aDX3/BZgANWHaI3iKygGAAAAAElFTkSuQmCC'
        };
        
        var colorsSRC =  SRCmap[options.gradient] || options.gradient ||
                          SRCmap.classic;
        var transSRC =  ClickSRC[options.shadow] || options.shadow ||
                         ClickSRC.large;
        
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
                
                if (height > width){
                    width = 10;
                    if (height !== 256 ){
                        height = 256;
                    }
                } else if (width > height){
                    height = 10;
                    if (width !== 256 ){
                        width = 256;
                    }
                }
                
                context.drawImage(this,0,0,width,height);
                var imageData = height > width ?
                                context.getImageData(0, 0, 1, 256) :
                                context.getImageData(0, 0, 256, 1);
                
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
            };
            
            colorsIMG.src = colorsSRC;
        };
        
        this.ini = function(){
            
            var element = h.element instanceof Object ?
                            h.element :
                            document.getElementById(h.element);
            
            //create 2 canvas layers
            //one for setting and calculating gradiant
            //and one for drawing the actual heatmap
            for (var i = 0; i<2;i++){
                
                var canvas = document.createElement("canvas");
                canvas.style.position = "absolute";
                canvas.style.top = "0";
                canvas.style.left = "0";
                canvas.style.zIndex = 9999990-i;
                
                canvas.width = element.style.width.replace(/px/, "") ||
                                h.getWidth(element);
                
                canvas.height =  element.style.height.replace(/px/, "") ||
                                  h.getHeight(element);
                
                element.appendChild(canvas);
                h.layers.push(canvas);
            }
            
            //hide layer 0 where we want to draw transparent images
            h.layers[0].style.visibility = 'hidden';
            h.transIMG = new Image();
            h.transIMG.src = transSRC;
        };
        
        this.getWidth = function(element){
            var width = element.offsetWidth;
            if(element.style.paddingLeft) width+=element.style.paddingLeft;
            if(element.style.paddingRight) width+=element.style.paddingRight;
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
        
        this.add = new HeatmapAdd(h);
        h.createColors();
        h.ini();
    };
    
    
    var HeatmapAdd = function(h) {
        var me = this;
        me.finished = true;
        
        this.Data = function(obj,onComplete,oldMax){
            me.finished = false;
            var dots;
            if (Object.prototype.toString.call( obj ) === '[object Array]' ){
                dots = obj;
            } else {
                dots = obj.data;
            }
            
            //we have max point already set!!! in fact we don't trust this
            // and we actually going to check for max point ourselfs always :)
            if (obj.max && obj.max > h.maxValue){
                h.maxValue = obj.max;    
            }
            
            //this creates data object and on the same time
            //checks for max value
            for (var x = 0; x < dots.length; x++){
                var dot = dots[x];
                me.setMax(dot.x,dot.y,dot.count);
            }
            
            if (oldMax && h.maxValue > oldMax){
                me.setImageData({
                    "redraw" : true,
                    "oldMax" : oldMax,
                    "onComplete" : function(){
                        me.drawHeatMap(onComplete);
                    }
                });
            } else {
                me.drawHeatMap(onComplete);
            }
        };
        
        this.toQueue = function(obj,onComplete){
            ++h.counter;
            var inter = setInterval(function(){
                if (me.finished){
                    h.counter--;
                    clearInterval(inter);
                    h.clone = {};
                    h.add.Data(obj,onComplete,h.maxValue);
                }
            },100);
        };
        
        this.Point = function(x,y,num) {
            var canvas = h.layers[0],
            context = canvas.getContext("2d"),
            oldmax = h.maxValue,
            count = me.setMax(x,y,num);
            
            if (count > oldmax){
                me.setImageData({
                    "redraw" : true,
                    "oldMax" : oldmax,
                    "onComplete" : function(){
                        context.globalAlpha = 1;
                        context.drawImage(h.transIMG, x, y, h.size, h.size);
                        me.setImageData({
                            "left" : x,
                            "top" : y,
                            "width" : h.size,
                            "height" : h.size
                        });
                    }
                });
                
            } else {
                context.globalAlpha = count/h.maxValue;
                context.drawImage(h.transIMG, x, y, h.size, h.size);
                me.setImageData({
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
                h.clone[x] = {};
            } else if (!h.clone[x]){
                h.clone[x] = {};
            }
            
            var num = count ? count : 1;
            h.map[x][y] = h.map[x][y] ? h.map[x][y] + num : num;
            h.clone[x][y] = h.map[x][y];
            if (h.map[x][y] > h.maxValue) {
                h.maxValue = h.map[x][y];
            }
            
            return h.map[x][y];
        };
        
        this.drawHeatMap = function(onComplete){
            var map = h.queue ? h.clone : h.map;
            var canvas = h.layers[0],
            canvas2 = h.layers[1],
            context = canvas.getContext("2d");
            
            canvas2.width = canvas2.width;
            var i = 0;
            var exit = false;
            for( var x in map ){
                if (map.hasOwnProperty(x)) {
                    if (h.queue && exit){
                        me.setImageData();
                        /* jshint ignore:start */
                        setTimeout(function(){
                            me.drawHeatMap();
                        }, h.queue.delay);
                        /* jshint ignore:end */
                        return false;
                    }
                    
                    for( var y in map[x] ){
                        if (map[x].hasOwnProperty(y)) {
                            if (h.queue && i > h.queue.items){
                                exit = true;
                                break;
                            }
                            
                            context.globalAlpha = map[x][y]/h.maxValue;
                            context.drawImage(h.transIMG, parseFloat(x),
                                              parseFloat(y), h.size, h.size);
                            
                            delete map[x][y];
                            i++;
                        }
                    }
                }
            }
            
            return me.setImageData({
                onComplete : function(){
                    me.finished = true;
                    if (typeof onComplete == 'function'){
                        onComplete();
                    }
                }
            });
        };
        
        this.setImageData = function(obj) {
            var colors = h.colorWheel;
            //give some time for colorsWheel to be fully 
            //loaded on next tick
            if ( colors.length < 1 ){
                setTimeout(function(){
                    me.setImageData(obj);
                },25); return;
            }
            
            var canvas = h.layers[0],
            canvas2 = h.layers[1],
            context = canvas.getContext("2d"),
            context2 = canvas2.getContext("2d");
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
                    data[r] = color.r;
                    data[g] = color.g;
                    data[b] = color.b;
                }
            }
            
            if (obj && obj.redraw){
                context.putImageData(imageData, 0 ,0 );
            }
            
            context2.putImageData(imageData, left-(h.size/2), top-(h.size/2));
            onComplete();
            if (typeof h.onComplete === 'function' && h.counter === 0 &&
                (!obj || (!obj.redraw && !obj.left)) ){
                h.onComplete();
            }
        };
    };
    
    window.heatmap = heatmap;
})();
