$(function(){$("#bs-slider-1").slider({formatter:function(e){return"Value: "+e}}),$("#bs-slider-2").slider(),$("#bs-slider-3").slider({reversed:!0}),$("#bs-slider-4").slider({reversed:!0}),$("#bs-slider-5").slider(),$("#bs-slider-6").slider({ticks:[0,100,200,300,400],ticks_labels:["$0","$100","$200","$300","$400"]}),$("#bs-slider-7").slider({ticks:[0,100,200,300,400],ticks_labels:["$0","$100","$200","$300","$400"],reversed:!0}),$(".bs-slider-variant").slider()}),$(function(){var e="rtl"===$("body").attr("dir")||"rtl"===$("html").attr("dir");noUiSlider.create(document.getElementById("nouislider-1"),{start:[80],connect:[!0,!1],direction:e?"rtl":"ltr",range:{min:0,max:100}});var t=document.getElementById("nouislider-2");t.style.height="200px",t.style.margin="0 auto 30px",noUiSlider.create(t,{start:[1450],connect:[!0,!1],orientation:"vertical",direction:"rtl",step:150,range:{min:1300,max:3250}}),noUiSlider.create(document.getElementById("nouislider-3"),{start:[4e3,8e3],step:1e3,connect:!0,direction:e?"rtl":"ltr",range:{min:[2e3],max:[1e4]}}),noUiSlider.create(document.getElementById("nouislider-4"),{start:[1450,2050,2350,3e3],connect:!0,behaviour:"tap-drag",step:150,tooltips:!0,range:{min:1e3,max:3750},pips:{mode:"steps",stepped:!0,density:4},direction:e?"rtl":"ltr"});var i=document.getElementById("nouislider-5");i.style.height="400px",i.style.margin="0 auto 30px",noUiSlider.create(i,{start:[1450,2050,2350,3e3],connect:!0,direction:"rtl",orientation:"vertical",behaviour:"tap-drag",step:150,tooltips:!0,range:{min:1e3,max:3750},pips:{mode:"steps",stepped:!0,density:4}});var r=document.getElementById("nouislider-6"),n=document.getElementById("nouislider-7"),d=document.getElementById("nouislider-8"),l=document.getElementById("nouislider-9"),s=document.getElementById("nouislider-10"),o=document.getElementById("nouislider-11"),a=document.getElementById("nouislider-12"),c={start:[2050,3e3],connect:!0,behaviour:"tap-drag",step:150,tooltips:!0,range:{min:1e3,max:3750},pips:{mode:"steps",stepped:!0,density:4},direction:e?"rtl":"ltr"};noUiSlider.create(r,c),noUiSlider.create(n,c),noUiSlider.create(d,c),noUiSlider.create(l,c),noUiSlider.create(s,c),noUiSlider.create(o,c),noUiSlider.create(a,c)});