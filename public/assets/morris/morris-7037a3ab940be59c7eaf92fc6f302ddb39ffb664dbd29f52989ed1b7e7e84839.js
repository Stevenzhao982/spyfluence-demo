!function(t){var i=function(e){function n(t){if(o[t])return o[t].exports;var i=o[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,n),i.l=!0,i.exports}var o={};return n.m=e,n.c=o,n.d=function(t,i,e){n.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(i,t){if(1&t&&(i=n(i)),8&t)return i;if(4&t&&"object"==typeof i&&i&&i.__esModule)return i;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:i}),2&t&&"string"!=typeof i)for(var o in i)n.d(e,o,function(t){return i[t]}.bind(null,o));return e},n.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="",n(n.s=414)}({414:function(t,i,e){e(415)},415:function(){(function(){var m,M,t,i,a=[].slice,p=function(t,i){return function(){return t.apply(i,arguments)}},n={}.hasOwnProperty,s=function(t,i){function e(){this.constructor=t}for(var o in i)n.call(i,o)&&(t[o]=i[o]);return e.prototype=i.prototype,t.prototype=new e,t.__super__=i.prototype,t},l=[].indexOf||function(t){for(var i=0,e=this.length;i<e;i++)if(i in this&&this[i]===t)return i;return-1};M=window.Morris={},m=jQuery,M.EventEmitter=function(){function t(){}return t.prototype.on=function(t,i){return null==this.handlers&&(this.handlers={}),null==this.handlers[t]&&(this.handlers[t]=[]),this.handlers[t].push(i),this},t.prototype.fire=function(t){var i,e,o,n,s,r,h;if(o=t,i=2<=arguments.length?a.call(arguments,1):[],null!=this.handlers&&null!=this.handlers[o]){for(h=[],n=0,s=(r=this.handlers[o]).length;n<s;n++)e=r[n],h.push(e.apply(null,i));return h}},t}(),M.commas=function(t){var i,e,o,n;return null!=t?(o=t<0?"-":"",i=Math.abs(t),o+=(e=Math.floor(i).toFixed(0)).replace(/(?=(?:\d{3})+$)(?!^)/g,","),(n=i.toString()).length>e.length&&(o+=n.slice(e.length)),o):"-"},M.pad2=function(t){return(t<10?"0":"")+t},M.Grid=function(t){function i(t){this.resizeHandler=p(this.resizeHandler,this);var s=this;if("string"==typeof t.element?this.el=m(document.getElementById(t.element)):this.el=m(t.element),null==this.el||0===this.el.length)throw new Error("Graph container element not found");"static"===this.el.css("position")&&this.el.css("position","relative"),this.options=m.extend({},this.gridDefaults,this.defaults||{},t),"string"==typeof this.options.units&&(this.options.postUnits=t.units),this.raphael=new Raphael(this.el[0]),this.elementWidth=null,this.elementHeight=null,this.dirty=!1,this.selectFrom=null,this.init&&this.init(),this.setData(this.options.data),this.el.bind("mousemove",function(t){var i,e,o,n;return e=s.el.offset(),n=t.pageX-e.left,s.selectFrom?(i=s.data[s.hitTest(Math.min(n,s.selectFrom))]._x,o=s.data[s.hitTest(Math.max(n,s.selectFrom))]._x-i,s.selectionRect.attr({x:i,width:o})):s.fire("hovermove",n,t.pageY-e.top)}),this.el.bind("mouseleave",function(){return s.selectFrom&&(s.selectionRect.hide(),s.selectFrom=null),s.fire("hoverout")}),this.el.bind("touchstart touchmove touchend",function(t){var i,e;return e=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],i=s.el.offset(),s.fire("hovermove",e.pageX-i.left,e.pageY-i.top)}),this.el.bind("click",function(t){var i;return i=s.el.offset(),s.fire("gridclick",t.pageX-i.left,t.pageY-i.top)}),this.options.rangeSelect&&(this.selectionRect=this.raphael.rect(0,0,0,this.el.innerHeight()).attr({fill:this.options.rangeSelectColor,stroke:!1}).toBack().hide(),this.el.bind("mousedown",function(t){var i;return i=s.el.offset(),s.startRange(t.pageX-i.left)}),this.el.bind("mouseup",function(t){var i;return i=s.el.offset(),s.endRange(t.pageX-i.left),s.fire("hovermove",t.pageX-i.left,t.pageY-i.top)})),this.options.resize&&m(window).bind("resize",function(){return null!=s.timeoutId&&window.clearTimeout(s.timeoutId),s.timeoutId=window.setTimeout(s.resizeHandler,100)}),this.el.css("-webkit-tap-highlight-color","rgba(0,0,0,0)"),this.postInit&&this.postInit()}return s(i,t),i.prototype.gridDefaults={dateFormat:null,axes:!0,grid:!0,gridLineColor:"#aaa",gridStrokeWidth:.5,gridTextColor:"#888",gridTextSize:12,gridTextFamily:"sans-serif",gridTextWeight:"normal",hideHover:!1,yLabelFormat:null,xLabelAngle:0,numLines:5,padding:25,parseTime:!0,postUnits:"",preUnits:"",ymax:"auto",ymin:"auto 0",goals:[],goalStrokeWidth:1,goalLineColors:["#666633","#999966","#cc6666","#663333"],events:[],eventStrokeWidth:1,eventLineColors:["#005a04","#ccffbb","#3a5f0b","#005502"],rangeSelect:null,rangeSelectColor:"#eef",resize:!1},i.prototype.setData=function(o,t){var n,s,r,i,e,h,a,l,p,u,c,d,f,g,m;return null==t&&(t=!0),null==(this.options.data=o)||0===o.length?(this.data=[],this.raphael.clear(),void(null!=this.hover&&this.hover.hide())):(d=this.cumulative?0:null,f=this.cumulative?0:null,0<this.options.goals.length&&(e=Math.min.apply(Math,this.options.goals),i=Math.max.apply(Math,this.options.goals),f=null!=f?Math.min(f,e):e,d=null!=d?Math.max(d,i):i),this.data=function(){var t,i,e;for(e=[],r=t=0,i=o.length;t<i;r=++t)a=o[r],(h={src:a}).label=a[this.options.xkey],this.options.parseTime?(h.x=M.parseDate(h.label),this.options.dateFormat?h.label=this.options.dateFormat(h.x):"number"==typeof h.label&&(h.label=new Date(h.label).toString())):(h.x=r,this.options.xLabelFormat&&(h.label=this.options.xLabelFormat(h))),p=0,h.y=function(){var t,i,e,o;for(e=this.options.ykeys,o=[],s=t=0,i=e.length;t<i;s=++t)c=e[s],"string"==typeof(g=a[c])&&(g=parseFloat(g)),null!=g&&"number"!=typeof g&&(g=null),null!=g&&(this.cumulative?p+=g:null!=d?(d=Math.max(g,d),f=Math.min(g,f)):d=f=g),this.cumulative&&null!=p&&(d=Math.max(p,d),f=Math.min(p,f)),o.push(g);return o}.call(this),e.push(h);return e}.call(this),this.options.parseTime&&(this.data=this.data.sort(function(t,i){return(t.x>i.x)-(i.x>t.x)})),this.xmin=this.data[0].x,this.xmax=this.data[this.data.length-1].x,this.events=[],0<this.options.events.length&&(this.options.parseTime?this.events=function(){var t,i,e,o;for(o=[],t=0,i=(e=this.options.events).length;t<i;t++)n=e[t],o.push(M.parseDate(n));return o}.call(this):this.events=this.options.events,this.xmax=Math.max(this.xmax,Math.max.apply(Math,this.events)),this.xmin=Math.min(this.xmin,Math.min.apply(Math,this.events))),this.xmin===this.xmax&&(this.xmin-=1,this.xmax+=1),this.ymin=this.yboundary("min",f),this.ymax=this.yboundary("max",d),this.ymin===this.ymax&&(f&&(this.ymin-=1),this.ymax+=1),!0!==(m=this.options.axes)&&"both"!==m&&"y"!==m&&!0!==this.options.grid||(this.options.ymax===this.gridDefaults.ymax&&this.options.ymin===this.gridDefaults.ymin?(this.grid=this.autoGridLines(this.ymin,this.ymax,this.options.numLines),this.ymin=Math.min(this.ymin,this.grid[0]),this.ymax=Math.max(this.ymax,this.grid[this.grid.length-1])):(l=(this.ymax-this.ymin)/(this.options.numLines-1),this.grid=function(){var t,i,e;for(e=[],u=t=this.ymin,i=this.ymax;0<l?t<=i:i<=t;u=t+=l)e.push(u);return e}.call(this))),this.dirty=!0,t?this.redraw():void 0)},i.prototype.yboundary=function(t,i){var e,o;return"string"==typeof(e=this.options["y"+t])?"auto"===e.slice(0,4)?5<e.length?(o=parseInt(e.slice(5),10),null==i?o:Math[t](i,o)):null!=i?i:0:parseInt(e,10):e},i.prototype.autoGridLines=function(t,i,e){var o,n,s,r,h,a,l,p,u;return h=i-t,u=Math.floor(Math.log(h)/Math.log(10)),l=Math.pow(10,u),n=Math.floor(t/l)*l,o=Math.ceil(i/l)*l,a=(o-n)/(e-1),1===l&&1<a&&Math.ceil(a)!==a&&(a=Math.ceil(a),o=n+a*(e-1)),n<0&&0<o&&(n=Math.floor(t/a)*a,o=Math.ceil(i/a)*a),a<1?(r=Math.floor(Math.log(a)/Math.log(10)),s=function(){var t,i;for(i=[],p=t=n;0<a?t<=o:o<=t;p=t+=a)i.push(parseFloat(p.toFixed(1-r)));return i}()):s=function(){var t,i;for(i=[],p=t=n;0<a?t<=o:o<=t;p=t+=a)i.push(p);return i}(),s},i.prototype._calc=function(){var t,n,i,o,e,s,r,h;if(e=this.el.width(),i=this.el.height(),(this.elementWidth!==e||this.elementHeight!==i||this.dirty)&&(this.elementWidth=e,this.elementHeight=i,this.dirty=!1,this.left=this.options.padding,this.right=this.elementWidth-this.options.padding,this.top=this.options.padding,this.bottom=this.elementHeight-this.options.padding,!0!==(r=this.options.axes)&&"both"!==r&&"y"!==r||(s=function(){var t,i,e,o;for(o=[],t=0,i=(e=this.grid).length;t<i;t++)n=e[t],o.push(this.measureText(this.yAxisFormat(n)).width);return o}.call(this),this.left+=Math.max.apply(Math,s)),!0!==(h=this.options.axes)&&"both"!==h&&"x"!==h||(t=function(){var t,i,e;for(e=[],o=t=0,i=this.data.length;0<=i?t<i:i<t;o=0<=i?++t:--t)e.push(this.measureText(this.data[o].text,-this.options.xLabelAngle).height);return e}.call(this),this.bottom-=Math.max.apply(Math,t)),this.width=Math.max(1,this.right-this.left),this.height=Math.max(1,this.bottom-this.top),this.dx=this.width/(this.xmax-this.xmin),this.dy=this.height/(this.ymax-this.ymin),this.calc))return this.calc()},i.prototype.transY=function(t){return this.bottom-(t-this.ymin)*this.dy},i.prototype.transX=function(t){return 1===this.data.length?(this.left+this.right)/2:this.left+(t-this.xmin)*this.dx},i.prototype.redraw=function(){if(this.raphael.clear(),this._calc(),this.drawGrid(),this.drawGoals(),this.drawEvents(),this.draw)return this.draw()},i.prototype.measureText=function(t,i){var e,o;return null==i&&(i=0),e=(o=this.raphael.text(100,100,t).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).rotate(i)).getBBox(),o.remove(),e},i.prototype.yAxisFormat=function(t){return this.yLabelFormat(t)},i.prototype.yLabelFormat=function(t){return"function"==typeof this.options.yLabelFormat?this.options.yLabelFormat(t):""+this.options.preUnits+M.commas(t)+this.options.postUnits},i.prototype.drawGrid=function(){var t,i,e,o,n,s,r,h;if(!1!==this.options.grid||!0===(n=this.options.axes)||"both"===n||"y"===n){for(h=[],e=0,o=(s=this.grid).length;e<o;e++)t=s[e],i=this.transY(t),!0!==(r=this.options.axes)&&"both"!==r&&"y"!==r||this.drawYAxisLabel(this.left-this.options.padding/2,i,this.yAxisFormat(t)),this.options.grid?h.push(this.drawGridLine("M"+this.left+","+i+"H"+(this.left+this.width))):h.push(void 0);return h}},i.prototype.drawGoals=function(){var t,i,e,o,n,s,r;for(r=[],e=o=0,n=(s=this.options.goals).length;o<n;e=++o)i=s[e],t=this.options.goalLineColors[e%this.options.goalLineColors.length],r.push(this.drawGoal(i,t));return r},i.prototype.drawEvents=function(){var t,i,e,o,n,s,r;for(r=[],e=o=0,n=(s=this.events).length;o<n;e=++o)i=s[e],t=this.options.eventLineColors[e%this.options.eventLineColors.length],r.push(this.drawEvent(i,t));return r},i.prototype.drawGoal=function(t,i){return this.raphael.path("M"+this.left+","+this.transY(t)+"H"+this.right).attr("stroke",i).attr("stroke-width",this.options.goalStrokeWidth)},i.prototype.drawEvent=function(t,i){return this.raphael.path("M"+this.transX(t)+","+this.bottom+"V"+this.top).attr("stroke",i).attr("stroke-width",this.options.eventStrokeWidth)},i.prototype.drawYAxisLabel=function(t,i,e){return this.raphael.text(t,i,e).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor).attr("text-anchor","end")},i.prototype.drawGridLine=function(t){return this.raphael.path(t).attr("stroke",this.options.gridLineColor).attr("stroke-width",this.options.gridStrokeWidth)},i.prototype.startRange=function(t){return this.hover.hide(),this.selectFrom=t,this.selectionRect.attr({x:t,width:0}).show()},i.prototype.endRange=function(t){var i,e;if(this.selectFrom)return e=Math.min(this.selectFrom,t),i=Math.max(this.selectFrom,t),this.options.rangeSelect.call(this.el,{start:this.data[this.hitTest(e)].x,end:this.data[this.hitTest(i)].x}),this.selectFrom=null},i.prototype.resizeHandler=function(){return this.timeoutId=null,this.raphael.setSize(this.el.width(),this.el.height()),this.redraw()},i}(M.EventEmitter),M.parseDate=function(t){var i,e,o,n,s,r,h,a,l,p,u;return"number"==typeof t?t:(e=t.match(/^(\d+) Q(\d)$/),n=t.match(/^(\d+)-(\d+)$/),s=t.match(/^(\d+)-(\d+)-(\d+)$/),h=t.match(/^(\d+) W(\d+)$/),a=t.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)(Z|([+-])(\d\d):?(\d\d))?$/),l=t.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)(Z|([+-])(\d\d):?(\d\d))?$/),e?new Date(parseInt(e[1],10),3*parseInt(e[2],10)-1,1).getTime():n?new Date(parseInt(n[1],10),parseInt(n[2],10)-1,1).getTime():s?new Date(parseInt(s[1],10),parseInt(s[2],10)-1,parseInt(s[3],10)).getTime():h?(4!==(p=new Date(parseInt(h[1],10),0,1)).getDay()&&p.setMonth(0,1+(4-p.getDay()+7)%7),p.getTime()+6048e5*parseInt(h[2],10)):a?a[6]?(r=0,"Z"!==a[6]&&(r=60*parseInt(a[8],10)+parseInt(a[9],10),"+"===a[7]&&(r=0-r)),Date.UTC(parseInt(a[1],10),parseInt(a[2],10)-1,parseInt(a[3],10),parseInt(a[4],10),parseInt(a[5],10)+r)):new Date(parseInt(a[1],10),parseInt(a[2],10)-1,parseInt(a[3],10),parseInt(a[4],10),parseInt(a[5],10)).getTime():l?(u=parseFloat(l[6]),i=Math.floor(u),o=Math.round(1e3*(u-i)),l[8]?(r=0,"Z"!==l[8]&&(r=60*parseInt(l[10],10)+parseInt(l[11],10),"+"===l[9]&&(r=0-r)),Date.UTC(parseInt(l[1],10),parseInt(l[2],10)-1,parseInt(l[3],10),parseInt(l[4],10),parseInt(l[5],10)+r,i,o)):new Date(parseInt(l[1],10),parseInt(l[2],10)-1,parseInt(l[3],10),parseInt(l[4],10),parseInt(l[5],10),i,o).getTime()):new Date(parseInt(t,10),0,1).getTime())},M.Hover=function(){function t(t){null==t&&(t={}),this.options=m.extend({},M.Hover.defaults,t),this.el=m("<div class='"+this.options["class"]+"'></div>"),this.el.hide(),this.options.parent.append(this.el)}return t.defaults={"class":"morris-hover morris-default-style"},t.prototype.update=function(t,i,e){return t?(this.html(t),this.show(),this.moveTo(i,e)):this.hide()},t.prototype.html=function(t){return this.el.html(t)},t.prototype.moveTo=function(t,i){var e,o,n,s,r,h;return r=this.options.parent.innerWidth(),s=this.options.parent.innerHeight(),o=this.el.outerWidth(),e=this.el.outerHeight(),n=Math.min(Math.max(0,t-o/2),r-o),null!=i?(h=i-e-10)<0&&(h=i+10)+e>s&&(h=s/2-e/2):h=s/2-e/2,this.el.css({left:n+"px",top:parseInt(h)+"px"})},t.prototype.show=function(){return this.el.show()},t.prototype.hide=function(){return this.el.hide()},t}(),M.Line=function(t){function i(t){if(this.hilight=p(this.hilight,this),this.onHoverOut=p(this.onHoverOut,this),this.onHoverMove=p(this.onHoverMove,this),this.onGridClick=p(this.onGridClick,this),!(this instanceof M.Line))return new M.Line(t);i.__super__.constructor.call(this,t)}return s(i,t),i.prototype.init=function(){if("always"!==this.options.hideHover)return this.hover=new M.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)},i.prototype.defaults={lineWidth:3,pointSize:4,lineColors:["#0b62a4","#7A92A3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],pointStrokeWidths:[1],pointStrokeColors:["#ffffff"],pointFillColors:[],smooth:!0,xLabels:"auto",xLabelFormat:null,xLabelMargin:24,hideHover:!1},i.prototype.calc=function(){return this.calcPoints(),this.generatePaths()},i.prototype.calcPoints=function(){var n,s,t,i,e,o;for(o=[],t=0,i=(e=this.data).length;t<i;t++)(n=e[t])._x=this.transX(n.x),n._y=function(){var t,i,e,o;for(o=[],t=0,i=(e=n.y).length;t<i;t++)null!=(s=e[t])?o.push(this.transY(s)):o.push(s);return o}.call(this),o.push(n._ymax=Math.min.apply(Math,[this.bottom].concat(function(){var t,i,e,o;for(o=[],t=0,i=(e=n._y).length;t<i;t++)null!=(s=e[t])&&o.push(s);return o}())));return o},i.prototype.hitTest=function(t){var i,e,o,n;if(0===this.data.length)return null;for(i=e=0,o=(n=this.data.slice(1)).length;e<o&&!(t<(n[i]._x+this.data[i]._x)/2);i=++e);return i},i.prototype.onGridClick=function(t,i){var e;return e=this.hitTest(t),this.fire("click",e,this.data[e].src,t,i)},i.prototype.onHoverMove=function(t){var i;return i=this.hitTest(t),this.displayHoverForRow(i)},i.prototype.onHoverOut=function(){if(!1!==this.options.hideHover)return this.displayHoverForRow(null)},i.prototype.displayHoverForRow=function(t){var i;return null!=t?((i=this.hover).update.apply(i,this.hoverContentForRow(t)),this.hilight(t)):(this.hover.hide(),this.hilight())},i.prototype.hoverContentForRow=function(t){var i,e,o,n,s,r,h;for(i="<div class='morris-hover-row-label'>"+(o=this.data[t]).label+"</div>",e=s=0,r=(h=o.y).length;s<r;e=++s)n=h[e],i+="<div class='morris-hover-point' style='color: "+this.colorFor(o,e,"label")+"'>\n  "+this.options.labels[e]+":\n  "+this.yLabelFormat(n)+"\n</div>";return"function"==typeof this.options.hoverCallback&&(i=this.options.hoverCallback(t,this.options,i,o.src)),[i,o._x,o._ymax]},i.prototype.generatePaths=function(){var n,s,r,h;return this.paths=function(){var t,i,e,o;for(o=[],s=t=0,i=this.options.ykeys.length;0<=i?t<i:i<t;s=0<=i?++t:--t)h="boolean"==typeof this.options.smooth?this.options.smooth:(e=this.options.ykeys[s],0<=l.call(this.options.smooth,e)),1<(n=function(){var t,i,e,o;for(o=[],t=0,i=(e=this.data).length;t<i;t++)void 0!==(r=e[t])._y[s]&&o.push({x:r._x,y:r._y[s]});return o}.call(this)).length?o.push(M.Line.createPath(n,h,this.bottom)):o.push(null);return o}.call(this)},i.prototype.draw=function(){var t;if(!0!==(t=this.options.axes)&&"both"!==t&&"x"!==t||this.drawXAxis(),this.drawSeries(),!1===this.options.hideHover)return this.displayHoverForRow(this.data.length-1)},i.prototype.drawXAxis=function(){var t,i,e,h,a,n,l,o,s,r,p=this;for(l=this.bottom+this.options.padding/2,h=a=null,t=function(t,i){var e,o,n,s,r;return r=(e=p.drawXAxisLabel(p.transX(i),l,t)).getBBox(),e.transform("r"+-p.options.xLabelAngle),o=e.getBBox(),e.transform("t0,"+o.height/2+"..."),0!==p.options.xLabelAngle&&(s=-.5*r.width*Math.cos(p.options.xLabelAngle*Math.PI/180),e.transform("t"+s+",0...")),o=e.getBBox(),(null==a||a>=o.x+o.width||null!=h&&h>=o.x)&&0<=o.x&&o.x+o.width<p.el.width()?(0!==p.options.xLabelAngle&&(n=1.25*p.options.gridTextSize/Math.sin(p.options.xLabelAngle*Math.PI/180),h=o.x-n),a=o.x-p.options.xLabelMargin):e.remove()},(e=this.options.parseTime?1===this.data.length&&"auto"===this.options.xLabels?[[this.data[0].label,this.data[0].x]]:M.labelSeries(this.xmin,this.xmax,this.width,this.options.xLabels,this.options.xLabelFormat):function(){var t,i,e,o;for(o=[],t=0,i=(e=this.data).length;t<i;t++)n=e[t],o.push([n.label,n.x]);return o}.call(this)).reverse(),r=[],o=0,s=e.length;o<s;o++)i=e[o],r.push(t(i[0],i[1]));return r},i.prototype.drawSeries=function(){var t,i,e,o,n,s;for(this.seriesPoints=[],t=i=o=this.options.ykeys.length-1;o<=0?i<=0:0<=i;t=o<=0?++i:--i)this._drawLineFor(t);for(s=[],t=e=n=this.options.ykeys.length-1;n<=0?e<=0:0<=e;t=n<=0?++e:--e)s.push(this._drawPointFor(t));return s},i.prototype._drawPointFor=function(t){var i,e,o,n,s,r;for(this.seriesPoints[t]=[],r=[],o=0,n=(s=this.data).length;o<n;o++)(i=null)!=(e=s[o])._y[t]&&(i=this.drawLinePoint(e._x,e._y[t],this.colorFor(e,t,"point"),t)),r.push(this.seriesPoints[t].push(i));return r},i.prototype._drawLineFor=function(t){var i;if(null!==(i=this.paths[t]))return this.drawLinePath(i,this.colorFor(null,t,"line"),t)},i.createPath=function(t,i,e){var o,n,s,r,h,a,l,p,u,c;for(l="",i&&(s=M.Line.gradients(t)),p={y:null},r=u=0,c=t.length;u<c;r=++u)null!=(o=t[r]).y&&(null!=p.y?i?(n=s[r],a=s[r-1],h=(o.x-p.x)/4,l+="C"+(p.x+h)+","+Math.min(e,p.y+h*a)+","+(o.x-h)+","+Math.min(e,o.y-h*n)+","+o.x+","+o.y):l+="L"+o.x+","+o.y:i&&null==s[r]||(l+="M"+o.x+","+o.y)),p=o;return l},i.gradients=function(t){var i,e,o,n,s,r,h,a;for(e=function(t,i){return(t.y-i.y)/(t.x-i.x)},a=[],o=r=0,h=t.length;r<h;o=++r)null!=(i=t[o]).y?(n=t[o+1]||{y:null},null!=(s=t[o-1]||{y:null}).y&&null!=n.y?a.push(e(s,n)):null!=s.y?a.push(e(s,i)):null!=n.y?a.push(e(i,n)):a.push(null)):a.push(null);return a},i.prototype.hilight=function(t){var i,e,o,n,s;if(null!==this.prevHilight&&this.prevHilight!==t)for(i=e=0,n=this.seriesPoints.length-1;0<=n?e<=n:n<=e;i=0<=n?++e:--e)this.seriesPoints[i][this.prevHilight]&&this.seriesPoints[i][this.prevHilight].animate(this.pointShrinkSeries(i));if(null!==t&&this.prevHilight!==t)for(i=o=0,s=this.seriesPoints.length-1;0<=s?o<=s:s<=o;i=0<=s?++o:--o)this.seriesPoints[i][t]&&this.seriesPoints[i][t].animate(this.pointGrowSeries(i));return this.prevHilight=t},i.prototype.colorFor=function(t,i,e){return"function"==typeof this.options.lineColors?this.options.lineColors.call(this,t,i,e):"point"===e&&this.options.pointFillColors[i%this.options.pointFillColors.length]||this.options.lineColors[i%this.options.lineColors.length]},i.prototype.drawXAxisLabel=function(t,i,e){return this.raphael.text(t,i,e).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)},i.prototype.drawLinePath=function(t,i,e){return this.raphael.path(t).attr("stroke",i).attr("stroke-width",this.lineWidthForSeries(e))},i.prototype.drawLinePoint=function(t,i,e,o){return this.raphael.circle(t,i,this.pointSizeForSeries(o)).attr("fill",e).attr("stroke-width",this.pointStrokeWidthForSeries(o)).attr("stroke",this.pointStrokeColorForSeries(o))},i.prototype.pointStrokeWidthForSeries=function(t){return this.options.pointStrokeWidths[t%this.options.pointStrokeWidths.length]},i.prototype.pointStrokeColorForSeries=function(t){return this.options.pointStrokeColors[t%this.options.pointStrokeColors.length]},i.prototype.lineWidthForSeries=function(t){return this.options.lineWidth instanceof Array?this.options.lineWidth[t%this.options.lineWidth.length]:this.options.lineWidth},i.prototype.pointSizeForSeries=function(t){return this.options.pointSize instanceof Array?this.options.pointSize[t%this.options.pointSize.length]:this.options.pointSize},i.prototype.pointGrowSeries=function(t){return Raphael.animation({r:this.pointSizeForSeries(t)+3},25,"linear")},i.prototype.pointShrinkSeries=function(t){return Raphael.animation({r:this.pointSizeForSeries(t)},25,"linear")},i}(M.Grid),M.labelSeries=function(t,i,e,o,n){var s,r,h,a,l,p,u,c,d,f,g;if(h=200*(i-t)/e,r=new Date(t),void 0===(u=M.LABEL_SPECS[o]))for(d=0,f=(g=M.AUTO_LABEL_ORDER).length;d<f;d++)if(a=g[d],h>=(p=M.LABEL_SPECS[a]).span){u=p;break}for(void 0===u&&(u=M.LABEL_SPECS.second),n&&(u=m.extend({},u,{fmt:n})),s=u.start(r),l=[];(c=s.getTime())<=i;)t<=c&&l.push([u.fmt(s),c]),u.incr(s);return l},t=function(i){return{span:60*i*1e3,start:function(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours())},fmt:function(t){return M.pad2(t.getHours())+":"+M.pad2(t.getMinutes())},incr:function(t){return t.setUTCMinutes(t.getUTCMinutes()+i)}}},i=function(i){return{span:1e3*i,start:function(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes())},fmt:function(t){return M.pad2(t.getHours())+":"+M.pad2(t.getMinutes())+":"+M.pad2(t.getSeconds())},incr:function(t){return t.setUTCSeconds(t.getUTCSeconds()+i)}}},M.LABEL_SPECS={decade:{span:1728e8,start:function(t){return new Date(t.getFullYear()-t.getFullYear()%10,0,1)},fmt:function(t){return""+t.getFullYear()},incr:function(t){return t.setFullYear(t.getFullYear()+10)}},year:{span:1728e7,start:function(t){return new Date(t.getFullYear(),0,1)},fmt:function(t){return""+t.getFullYear()},incr:function(t){return t.setFullYear(t.getFullYear()+1)}},month:{span:24192e5,start:function(t){return new Date(t.getFullYear(),t.getMonth(),1)},fmt:function(t){return t.getFullYear()+"-"+M.pad2(t.getMonth()+1)},incr:function(t){return t.setMonth(t.getMonth()+1)}},week:{span:6048e5,start:function(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate())},fmt:function(t){return t.getFullYear()+"-"+M.pad2(t.getMonth()+1)+"-"+M.pad2(t.getDate())},incr:function(t){return t.setDate(t.getDate()+7)}},day:{span:864e5,start:function(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate())},fmt:function(t){return t.getFullYear()+"-"+M.pad2(t.getMonth()+1)+"-"+M.pad2(t.getDate())},incr:function(t){return t.setDate(t.getDate()+1)}},hour:t(60),"30min":t(30),"15min":t(15),"10min":t(10),"5min":t(5),minute:t(1),"30sec":i(30),"15sec":i(15),"10sec":i(10),"5sec":i(5),second:i(1)},M.AUTO_LABEL_ORDER=["decade","year","month","week","day","hour","30min","15min","10min","5min","minute","30sec","15sec","10sec","5sec","second"],M.Area=function(t){function e(t){var i;if(!(this instanceof M.Area))return new M.Area(t);i=m.extend({},o,t),this.cumulative=!i.behaveLikeLine,"auto"===i.fillOpacity&&(i.fillOpacity=i.behaveLikeLine?.8:1),e.__super__.constructor.call(this,i)}var o;return s(e,t),o={fillOpacity:"auto",behaveLikeLine:!1},e.prototype.calcPoints=function(){var n,s,r,t,i,e,o;for(o=[],t=0,i=(e=this.data).length;t<i;t++)(n=e[t])._x=this.transX(n.x),s=0,n._y=function(){var t,i,e,o;for(o=[],t=0,i=(e=n.y).length;t<i;t++)r=e[t],this.options.behaveLikeLine?o.push(this.transY(r)):(s+=r||0,o.push(this.transY(s)));return o}.call(this),o.push(n._ymax=Math.max.apply(Math,n._y));return o},e.prototype.drawSeries=function(){var t,i,e,o,n,s,r,h;for(this.seriesPoints=[],h=[],e=0,o=(i=this.options.behaveLikeLine?function(){s=[];for(var t=0,i=this.options.ykeys.length-1;0<=i?t<=i:i<=t;0<=i?t++:t--)s.push(t);return s}.apply(this):function(){r=[];for(var t=n=this.options.ykeys.length-1;n<=0?t<=0:0<=t;n<=0?t++:t--)r.push(t);return r}.apply(this)).length;e<o;e++)t=i[e],this._drawFillFor(t),this._drawLineFor(t),h.push(this._drawPointFor(t));return h},e.prototype._drawFillFor=function(t){var i;if(null!==(i=this.paths[t]))return i=i+"L"+this.transX(this.xmax)+","+this.bottom+"L"+this.transX(this.xmin)+","+this.bottom+"Z",this.drawFilledPath(i,this.fillForSeries(t))},e.prototype.fillForSeries=function(t){var i;return i=Raphael.rgb2hsl(this.colorFor(this.data[t],t,"line")),Raphael.hsl(i.h,this.options.behaveLikeLine?.9*i.s:.75*i.s,Math.min(.98,this.options.behaveLikeLine?1.2*i.l:1.25*i.l))},e.prototype.drawFilledPath=function(t,i){return this.raphael.path(t).attr("fill",i).attr("fill-opacity",this.options.fillOpacity).attr("stroke","none")},e}(M.Line),M.Bar=function(t){function i(t){if(this.onHoverOut=p(this.onHoverOut,this),this.onHoverMove=p(this.onHoverMove,this),this.onGridClick=p(this.onGridClick,this),!(this instanceof M.Bar))return new M.Bar(t);i.__super__.constructor.call(this,m.extend({},t,{parseTime:!1}))}return s(i,t),i.prototype.init=function(){if(this.cumulative=this.options.stacked,"always"!==this.options.hideHover)return this.hover=new M.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)},i.prototype.defaults={barSizeRatio:.75,barGap:3,barColors:["#0b62a4","#7a92a3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],barOpacity:1,barRadius:[0,0,0,0],xLabelMargin:50},i.prototype.calc=function(){var t;if(this.calcBars(),!1===this.options.hideHover)return(t=this.hover).update.apply(t,this.hoverContentForRow(this.data.length-1))},i.prototype.calcBars=function(){var t,n,s,i,e,o,r;for(r=[],t=i=0,e=(o=this.data).length;i<e;t=++i)(n=o[t])._x=this.left+this.width*(t+.5)/this.data.length,r.push(n._y=function(){var t,i,e,o;for(o=[],t=0,i=(e=n.y).length;t<i;t++)null!=(s=e[t])?o.push(this.transY(s)):o.push(null);return o}.call(this));return r},i.prototype.draw=function(){var t;return!0!==(t=this.options.axes)&&"both"!==t&&"x"!==t||this.drawXAxis(),this.drawSeries()},i.prototype.drawXAxis=function(){var t,i,e,o,n,s,r,h,a,l,p,u,c;for(l=this.bottom+(this.options.xAxisLabelTopPadding||this.options.padding/2),s=r=null,c=[],t=p=0,u=this.data.length;0<=u?p<u:u<p;t=0<=u?++p:--p)h=this.data[this.data.length-1-t],a=(i=this.drawXAxisLabel(h._x,l,h.label)).getBBox(),i.transform("r"+-this.options.xLabelAngle),e=i.getBBox(),i.transform("t0,"+e.height/2+"..."),0!==this.options.xLabelAngle&&(n=-.5*a.width*Math.cos(this.options.xLabelAngle*Math.PI/180),i.transform("t"+n+",0...")),(null==r||r>=e.x+e.width||null!=s&&s>=e.x)&&0<=e.x&&e.x+e.width<this.el.width()?(0!==this.options.xLabelAngle&&(o=1.25*this.options.gridTextSize/Math.sin(this.options.xLabelAngle*Math.PI/180),s=e.x-o),c.push(r=e.x-this.options.xLabelMargin)):c.push(i.remove());return c},i.prototype.drawSeries=function(){var n,s,r,h,a,l,p,t,u,c,d,i,f,g,m;return r=this.width/this.options.data.length,t=this.options.stacked?1:this.options.ykeys.length,n=(r*this.options.barSizeRatio-this.options.barGap*(t-1))/t,this.options.barSize&&(n=Math.min(n,this.options.barSize)),i=r-n*t-this.options.barGap*(t-1),p=i/2,m=this.ymin<=0&&0<=this.ymax?this.transY(0):null,this.bars=function(){var t,i,e,o;for(e=this.data,o=[],h=t=0,i=e.length;t<i;h=++t)u=e[h],a=0,o.push(function(){var t,i,e,o;for(e=u._y,o=[],c=t=0,i=e.length;t<i;c=++t)null!==(g=e[c])?(m?(f=Math.min(g,m),s=Math.max(g,m)):(f=g,s=this.bottom),l=this.left+h*r+p,this.options.stacked||(l+=c*(n+this.options.barGap)),d=s-f,this.options.verticalGridCondition&&this.options.verticalGridCondition(u.x)&&this.drawBar(this.left+h*r,this.top,r,Math.abs(this.top-this.bottom),this.options.verticalGridColor,this.options.verticalGridOpacity,this.options.barRadius),this.options.stacked&&(f-=a),this.drawBar(l,f,n,d,this.colorFor(u,c,"bar"),this.options.barOpacity,this.options.barRadius),o.push(a+=d)):o.push(null);return o}.call(this));return o}.call(this)},i.prototype.colorFor=function(t,i,e){var o,n;return"function"==typeof this.options.barColors?(o={x:t.x,y:t.y[i],label:t.label},n={index:i,key:this.options.ykeys[i],label:this.options.labels[i]},this.options.barColors.call(this,o,n,e)):this.options.barColors[i%this.options.barColors.length]},i.prototype.hitTest=function(t){return 0===this.data.length?null:(t=Math.max(Math.min(t,this.right),this.left),Math.min(this.data.length-1,Math.floor((t-this.left)/(this.width/this.data.length))))},i.prototype.onGridClick=function(t,i){var e;return e=this.hitTest(t),this.fire("click",e,this.data[e].src,t,i)},i.prototype.onHoverMove=function(t){var i,e;return i=this.hitTest(t),(e=this.hover).update.apply(e,this.hoverContentForRow(i))},i.prototype.onHoverOut=function(){if(!1!==this.options.hideHover)return this.hover.hide()},i.prototype.hoverContentForRow=function(t){var i,e,o,n,s,r,h;for(i="<div class='morris-hover-row-label'>"+(o=this.data[t]).label+"</div>",e=s=0,r=(h=o.y).length;s<r;e=++s)n=h[e],i+="<div class='morris-hover-point' style='color: "+this.colorFor(o,e,"label")+"'>\n  "+this.options.labels[e]+":\n  "+this.yLabelFormat(n)+"\n</div>";return"function"==typeof this.options.hoverCallback&&(i=this.options.hoverCallback(t,this.options,i,o.src)),[i,this.left+(t+.5)*this.width/this.data.length]},i.prototype.drawXAxisLabel=function(t,i,e){return this.raphael.text(t,i,e).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)},i.prototype.drawBar=function(t,i,e,o,n,s,r){var h;return(0===(h=Math.max.apply(Math,r))||o<h?this.raphael.rect(t,i,e,o):this.raphael.path(this.roundedRect(t,i,e,o,r))).attr("fill",n).attr("fill-opacity",s).attr("stroke","none")},i.prototype.roundedRect=function(t,i,e,o,n){return null==n&&(n=[0,0,0,0]),["M",t,n[0]+i,"Q",t,i,t+n[0],i,"L",t+e-n[1],i,"Q",t+e,i,t+e,i+n[1],"L",t+e,i+o-n[2],"Q",t+e,i+o,t+e-n[2],i+o,"L",t+n[3],i+o,"Q",t,i+o,t,i+o-n[3],"Z"]},i}(M.Grid),M.Donut=function(t){function i(t){this.resizeHandler=p(this.resizeHandler,this),this.select=p(this.select,this),this.click=p(this.click,this);var i=this;if(!(this instanceof M.Donut))return new M.Donut(t);if(this.options=m.extend({},this.defaults,t),"string"==typeof t.element?this.el=m(document.getElementById(t.element)):this.el=m(t.element),null===this.el||0===this.el.length)throw new Error("Graph placeholder not found.");void 0!==t.data&&0!==t.data.length&&(this.raphael=new Raphael(this.el[0]),this.options.resize&&m(window).bind("resize",function(){return null!=i.timeoutId&&window.clearTimeout(i.timeoutId),i.timeoutId=window.setTimeout(i.resizeHandler,100)}),this.setData(t.data))}return s(i,t),i.prototype.defaults={colors:["#0B62A4","#3980B5","#679DC6","#95BBD7","#B0CCE1","#095791","#095085","#083E67","#052C48","#042135"],backgroundColor:"#FFFFFF",labelColor:"#000000",formatter:M.commas,resize:!1},i.prototype.redraw=function(){var t,i,e,o,n,s,r,h,a,l,p,u,c,d,f,g,m,y,v,x,w,b;for(this.raphael.clear(),i=this.el.width()/2,e=this.el.height()/2,u=(Math.min(i,e)-10)/3,c=p=0,g=(v=this.values).length;c<g;c++)p+=v[c];for(h=5/(2*u),t=1.9999*Math.PI-h*this.data.length,n=s=0,this.segments=[],o=d=0,m=(x=this.values).length;d<m;o=++d)a=s+h+t*(x[o]/p),(l=new M.DonutSegment(i,e,2*u,u,s,a,this.data[o].color||this.options.colors[n%this.options.colors.length],this.options.backgroundColor,n,this.raphael)).render(),this.segments.push(l),l.on("hover",this.select),l.on("click",this.click),s=a,n+=1
;for(this.text1=this.drawEmptyDonutLabel(i,e-10,this.options.labelColor,15,800),this.text2=this.drawEmptyDonutLabel(i,e+10,this.options.labelColor,14),r=Math.max.apply(Math,this.values),b=[],f=n=0,y=(w=this.values).length;f<y;f++){if(w[f]===r){this.select(n);break}b.push(n+=1)}return b},i.prototype.setData=function(t){var n;return this.data=t,this.values=function(){var t,i,e,o;for(o=[],t=0,i=(e=this.data).length;t<i;t++)n=e[t],o.push(parseFloat(n.value));return o}.call(this),this.redraw()},i.prototype.click=function(t){return this.fire("click",t,this.data[t])},i.prototype.select=function(t){var i,e,o,n;for(e=0,o=(n=this.segments).length;e<o;e++)n[e].deselect();return this.segments[t].select(),i=this.data[t],this.setLabels(i.label,this.options.formatter(i.value,i))},i.prototype.setLabels=function(t,i){var e,o,n,s,r,h,a,l;return s=1.8*(e=2*(Math.min(this.el.width()/2,this.el.height()/2)-10)/3),n=e/2,o=e/3,this.text1.attr({text:t,transform:""}),r=this.text1.getBBox(),h=Math.min(s/r.width,n/r.height),this.text1.attr({transform:"S"+h+","+h+","+(r.x+r.width/2)+","+(r.y+r.height)}),this.text2.attr({text:i,transform:""}),a=this.text2.getBBox(),l=Math.min(s/a.width,o/a.height),this.text2.attr({transform:"S"+l+","+l+","+(a.x+a.width/2)+","+a.y})},i.prototype.drawEmptyDonutLabel=function(t,i,e,o,n){var s;return s=this.raphael.text(t,i,"").attr("font-size",o).attr("fill",e),null!=n&&s.attr("font-weight",n),s},i.prototype.resizeHandler=function(){return this.timeoutId=null,this.raphael.setSize(this.el.width(),this.el.height()),this.redraw()},i}(M.EventEmitter),M.DonutSegment=function(t){function i(t,i,e,o,n,s,r,h,a,l){this.cx=t,this.cy=i,this.inner=e,this.outer=o,this.color=r,this.backgroundColor=h,this.index=a,this.raphael=l,this.deselect=p(this.deselect,this),this.select=p(this.select,this),this.sin_p0=Math.sin(n),this.cos_p0=Math.cos(n),this.sin_p1=Math.sin(s),this.cos_p1=Math.cos(s),this.is_long=s-n>Math.PI?1:0,this.path=this.calcSegment(this.inner+3,this.inner+this.outer-5),this.selectedPath=this.calcSegment(this.inner+3,this.inner+this.outer),this.hilight=this.calcArc(this.inner)}return s(i,t),i.prototype.calcArcPoints=function(t){return[this.cx+t*this.sin_p0,this.cy+t*this.cos_p0,this.cx+t*this.sin_p1,this.cy+t*this.cos_p1]},i.prototype.calcSegment=function(t,i){var e,o,n,s,r,h,a,l,p,u;return e=(p=this.calcArcPoints(t))[0],n=p[1],o=p[2],s=p[3],r=(u=this.calcArcPoints(i))[0],a=u[1],h=u[2],l=u[3],"M"+e+","+n+"A"+t+","+t+",0,"+this.is_long+",0,"+o+","+s+"L"+h+","+l+"A"+i+","+i+",0,"+this.is_long+",1,"+r+","+a+"Z"},i.prototype.calcArc=function(t){var i,e,o,n,s;return i=(s=this.calcArcPoints(t))[0],o=s[1],e=s[2],n=s[3],"M"+i+","+o+"A"+t+","+t+",0,"+this.is_long+",0,"+e+","+n},i.prototype.render=function(){var t=this;return this.arc=this.drawDonutArc(this.hilight,this.color),this.seg=this.drawDonutSegment(this.path,this.color,this.backgroundColor,function(){return t.fire("hover",t.index)},function(){return t.fire("click",t.index)})},i.prototype.drawDonutArc=function(t,i){return this.raphael.path(t).attr({stroke:i,"stroke-width":2,opacity:0})},i.prototype.drawDonutSegment=function(t,i,e,o,n){return this.raphael.path(t).attr({fill:i,stroke:e,"stroke-width":3}).hover(o).click(n)},i.prototype.select=function(){if(!this.selected)return this.seg.animate({path:this.selectedPath},150,"<>"),this.arc.animate({opacity:1},150,"<>"),this.selected=!0},i.prototype.deselect=function(){if(this.selected)return this.seg.animate({path:this.path},150,"<>"),this.arc.animate({opacity:0},150,"<>"),this.selected=!1},i}(M.EventEmitter)}).call(this)}});if("object"==typeof i){var e=["object"==typeof module&&"object"==typeof module.exports?module.exports:null,"undefined"!=typeof window?window:null,t&&t!==window?t:null];for(var o in i)e[0]&&(e[0][o]=i[o]),e[1]&&"__esModule"!==o&&(e[1][o]=i[o]),e[2]&&(e[2][o]=i[o])}}(this);