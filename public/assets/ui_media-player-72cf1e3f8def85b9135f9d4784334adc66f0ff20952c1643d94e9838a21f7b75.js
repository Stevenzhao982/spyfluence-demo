$(function(){function t(e,t){var r=e.getDuration(),o=e.getContainer();if(y.tooltips.seek&&0!==r&&o){var n=o.querySelector(".plyr__progress").getBoundingClientRect(),l=100-100/n.width*(t.pageX-n.left),s=r/100*(l=l<0?0:100<l?100:l),p=("0"+parseInt(s%60)).slice(-2),i=("0"+parseInt(s/60%60)).slice(-2),u=parseInt(s/60/60%60),a=0<parseInt(r/60/60%60);o.querySelector(".plyr__progress .plyr__tooltip").innerHTML=(a?u+":":"")+i+":"+p}}var y={tooltips:{controls:!1,seek:!0}},r=plyr.setup(document.getElementById("plyr-video-player"),y)[0],o=plyr.setup(document.getElementById("plyr-audio-player"),y)[0];"rtl"!==$("body").attr("dir")&&"rtl"!==$("html").attr("dir")||(r.on("mouseenter mouseleave mousemove",function(e){t(r,e)}),o.on("mouseenter mouseleave mousemove",function(e){t(o,e)}))});