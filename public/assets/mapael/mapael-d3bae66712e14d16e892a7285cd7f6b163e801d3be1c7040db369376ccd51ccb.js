!function(t){var e=function(o){function n(t){if(i[t])return i[t].exports;var e=i[t]={i:t,l:!1,exports:{}};return o[t].call(e.exports,e,e.exports,n),e.l=!0,e.exports}var i={};return n.m=o,n.c=i,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=391)}({1:function(t){t.exports=window.jQuery},391:function(t,e,o){"use strict";o.r(e);var i=o(51);o.n(i),o.d(e,"Mapael",function(){return i})},392:function(t){t.exports=window.Raphael},393:function(t,e,o){var i,n,a;n=[o(1)],void 0===(a="function"==typeof(i=function(d){function e(t){var e=t||window.event,o=w.call(arguments,1),i=0,n=0,a=0,s=0,r=0,l=0;if((t=d.event.fix(e)).type="mousewheel","detail"in e&&(a=-1*e.detail),"wheelDelta"in e&&(a=e.wheelDelta),"wheelDeltaY"in e&&(a=e.wheelDeltaY),"wheelDeltaX"in e&&(n=-1*e.wheelDeltaX),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(n=-1*a,a=0),i=0===a?n:a,"deltaY"in e&&(i=a=-1*e.deltaY),"deltaX"in e&&(n=e.deltaX,0===a&&(i=-1*n)),0!==a||0!==n){if(1===e.deltaMode){var p=d.data(this,"mousewheel-line-height");i*=p,a*=p,n*=p}else if(2===e.deltaMode){var m=d.data(this,"mousewheel-page-height");i*=m,a*=m,n*=m}if(s=Math.max(Math.abs(a),Math.abs(n)),(!g||s<g)&&(u(e,g=s)&&(g/=40)),u(e,s)&&(i/=40,n/=40,a/=40),i=Math[1<=i?"floor":"ceil"](i/g),n=Math[1<=n?"floor":"ceil"](n/g),a=Math[1<=a?"floor":"ceil"](a/g),v.settings.normalizeOffset&&this.getBoundingClientRect){var h=this.getBoundingClientRect();r=t.clientX-h.left,l=t.clientY-h.top}return t.deltaX=n,t.deltaY=a,t.deltaFactor=g,t.offsetX=r,t.offsetY=l,t.deltaMode=0,o.unshift(t,i,n,a),f&&clearTimeout(f),f=setTimeout(c,200),(d.event.dispatch||d.event.handle).apply(this,o)}}function c(){g=null}function u(t,e){return v.settings.adjustOldDeltas&&"mousewheel"===t.type&&e%120==0}var f,g,t=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],o="onwheel"in document||9<=document.documentMode?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],w=Array.prototype.slice;if(d.event.fixHooks)for(var i=t.length;i;)d.event.fixHooks[t[--i]]=d.event.mouseHooks;var v=d.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var t=o.length;t;)this.addEventListener(o[--t],e,!1);else this.onmousewheel=e;d.data(this,"mousewheel-line-height",v.getLineHeight(this)),d.data(this,"mousewheel-page-height",v.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var t=o.length;t;)this.removeEventListener(o[--t],e,!1);else this.onmousewheel=null;d.removeData(this,"mousewheel-line-height"),d.removeData(this,"mousewheel-page-height")},getLineHeight:function(t){var e=d(t),o=e["offsetParent"in d.fn?"offsetParent":"parent"]();return o.length||(o=d("body")),parseInt(o.css("fontSize"),10)||parseInt(e.css("fontSize"),10)||16},getPageHeight:function(t){return d(t).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};d.fn.extend({mousewheel:function(t){return t?this.bind("mousewheel",t):this.trigger("mousewheel")},unmousewheel:function(t){return this.unbind("mousewheel",t)}})})?i.apply(e,n):i)||(t.exports=a)},51:function(t,e,o){t.exports=function(C,L,t,O){"use strict";var o,i,n=function(t,e){this.container=t,this.$container=C(t),this.options=this.extendDefaultOptions(e),this.zoomTO=0,this.zoomCenterX=0,this.zoomCenterY=0,this.previousPinchDist=0,this.zoomData={zoomLevel:0,zoomX:0,zoomY:0,panX:0,panY:0},this.currentViewBox={x:0,y:0,w:0,h:0},this.panning=!1,this.zoomAnimID=null,this.zoomAnimStartTime=null,this.zoomAnimCVBTarget=null,this.$map=C("."+this.options.map.cssClass,this.container),this.initialMapHTMLContent=this.$map.html(),this.$tooltip={},this.paper={},this.areas={},this.plots={},this.links={},this.legends={},this.mapConf={},this.customEventHandlers={},this.init()};return n.prototype={MouseOverFilteringTO:120,panningFilteringTO:150,panningEndFilteringTO:50,zoomFilteringTO:150,resizeFilteringTO:150,init:function(){var o=this;if(""===o.options.map.cssClass||0===C("."+o.options.map.cssClass,o.container).length)throw new Error("The map class `"+o.options.map.cssClass+"` doesn't exists");if(o.$tooltip=C("<div>").addClass(o.options.map.tooltip.cssClass).css("display","none"),o.$map.empty().append(o.$tooltip),C.mapael&&C.mapael.maps&&C.mapael.maps[o.options.map.name])o.mapConf=C.mapael.maps[o.options.map.name];else{if(!(C.fn.mapael&&C.fn.mapael.maps&&C.fn.mapael.maps[o.options.map.name]))throw new Error("Unknown map '"+o.options.map.name+"'");o.mapConf=C.fn.mapael.maps[o.options.map.name],window.console&&window.console.warn&&window.console.warn("Extending $.fn.mapael is deprecated (map '"+o.options.map.name+"')")}if(o.paper=new L(o.$map[0],o.mapConf.width,o.mapConf.height),!0===o.isRaphaelBBoxBugPresent())throw o.destroy(),new Error("Can't get boundary box for text (is your container hidden? See #135)");o.$container.addClass("mapael"),o.options.map.tooltip.css&&o.$tooltip.css(o.options.map.tooltip.css),o.setViewBox(0,0,o.mapConf.width,o.mapConf.height),o.options.map.width?o.paper.setSize(o.options.map.width,o.mapConf.height*(o.options.map.width/o.mapConf.width)):o.initResponsiveSize(),C.each(o.mapConf.elems,function(t){o.areas[t]={},o.areas[t].options=o.getElemOptions(o.options.map.defaultArea,o.options.areas[t]?o.options.areas[t]:{},o.options.legend.area),o.areas[t].mapElem=o.paper.path(o.mapConf.elems[t])}),o.options.map.beforeInit&&o.options.map.beforeInit(o.$container,o.paper,o.options),C.each(o.mapConf.elems,function(t){o.initElem(t,"area",o.areas[t])}),o.links=o.drawLinksCollection(o.options.links),C.each(o.options.plots,function(t){o.plots[t]=o.drawPlot(t)}),o.$container.on("zoom.mapael",function(t,e){o.onZoomEvent(t,e)}),o.options.map.zoom.enabled&&o.initZoom(o.mapConf.width,o.mapConf.height,o.options.map.zoom),o.options.map.zoom.init!==O&&(o.options.map.zoom.init.animDuration===O&&(o.options.map.zoom.init.animDuration=0),o.$container.trigger("zoom",o.options.map.zoom.init)),o.createLegends("area",o.areas,1),o.createLegends("plot",o.plots,o.paper.width/o.mapConf.width),o.$container.on("update.mapael",function(t,e){o.onUpdateEvent(t,e)}),o.$container.on("showElementsInRange.mapael",function(t,e){o.onShowElementsInRange(t,e)}),o.initDelegatedMapEvents(),o.initDelegatedCustomEvents(),o.options.map.afterInit&&o.options.map.afterInit(o.$container,o.paper,o.areas,o.plots,o.options),C(o.paper.desc).append(" and Mapael "+o.version+" (https://www.vincentbroute.fr/mapael/)")},destroy:function(){var i=this;i.$container.off(".mapael"),i.$map.off(".mapael"),i.onResizeEvent&&C(window).off("resize.mapael",i.onResizeEvent),i.$map.empty(),i.$map.html(i.initialMapHTMLContent),C.each(i.legends,function(o){C.each(i.legends[o],function(t){var e=i.legends[o][t];e.container.empty(),e.container.html(e.initialHTMLContent)})}),i.$container.removeClass("mapael"),i.$container.removeData("mapael"),i.container=O,i.$container=O,i.options=O,i.paper=O,i.$map=O,i.$tooltip=O,i.mapConf=O,i.areas=O,i.plots=O,i.links=O,i.customEventHandlers=O},initResponsiveSize:function(){var i=this,t=null,e=function(t){var e=i.$map.width();if(i.paper.width!==e){var o=e/i.mapConf.width;i.paper.setSize(e,i.mapConf.height*o),!0!==t&&i.options.legend.redrawOnResize&&i.createLegends("plot",i.plots,o)}};i.onResizeEvent=function(){clearTimeout(t),t=setTimeout(function(){e()},i.resizeFilteringTO)},C(window).on("resize.mapael",i.onResizeEvent),e(!0)},extendDefaultOptions:function(i){return i=C.extend(!0,{},n.prototype.defaultOptions,i),C.each(["area","plot"],function(t,e){if(C.isArray(i.legend[e]))for(var o=0;o<i.legend[e].length;++o)i.legend[e][o]=C.extend(!0,{},n.prototype.legendDefaultOptions[e],i.legend[e][o]);else i.legend[e]=C.extend(!0,{},n.prototype.legendDefaultOptions[e],i.legend[e])}),i},initDelegatedMapEvents:function(){var s,a,r=this,l={area:r.areas,"area-text":r.areas,plot:r.plots,"plot-text":r.plots,link:r.links,"link-text":r.links};r.$container.on("mouseover.mapael","[data-id]",function(){var a=this;clearTimeout(s),s=setTimeout(function(){var t=C(a),e=t.attr("data-id"),o=t.attr("data-type");if(l[o]!==O)r.elemEnter(l[o][e]);else if("legend-elem"===o||"legend-label"===o){var i=t.attr("data-legend-id"),n=t.attr("data-legend-type");r.elemEnter(r.legends[n][i].elems[e])}},r.MouseOverFilteringTO)}),r.$container.on("mousemove.mapael","[data-id]",function(i){var n=this;clearTimeout(a),a=setTimeout(function(){var t=C(n),e=t.attr("data-id"),o=t.attr("data-type");l[o]!==O&&r.elemHover(l[o][e],i)},0)}),r.$container.on("mouseout.mapael","[data-id]",function(){clearTimeout(s),clearTimeout(a);var t=C(this),e=t.attr("data-id"),o=t.attr("data-type");if(l[o]!==O)r.elemOut(l[o][e]);else if("legend-elem"===o||"legend-label"===o){var i=t.attr("data-legend-id"),n=t.attr("data-legend-type");r.elemOut(r.legends[n][i].elems[e])}}),r.$container.on("click.mapael","[data-id]",function(t,e){var o=C(this),i=o.attr("data-id"),n=o.attr("data-type");if(l[n]!==O)r.elemClick(l[n][i]);else if("legend-elem"===n||"legend-label"===n){var a=o.attr("data-legend-id"),s=o.attr("data-legend-type");r.handleClickOnLegendElem(r.legends[s][a].elems[i],i,a,s,e)}})},initDelegatedCustomEvents:function(){var s=this;C.each(s.customEventHandlers,function(a){var t=a+".mapael.custom";s.$container.off(t).on(t,"[data-id]",function(t){var e=C(this),o=e.attr("data-id"),i=e.attr("data-type").replace("-text","");if(!s.panning&&s.customEventHandlers[a][i]!==O&&s.customEventHandlers[a][i][o]!==O){var n=s.customEventHandlers[a][i][o];n.options.eventHandlers[a](t,o,n.mapElem,n.textElem,n.options)}})})},initElem:function(t,e,o){var i=C(o.mapElem.node);if(o.options.href&&(o.options.attrs.cursor="pointer",o.options.text&&(o.options.text.attrs.cursor="pointer")),o.mapElem.attr(o.options.attrs),i.attr({"data-id":t,"data-type":e}),o.options.cssClass!==O&&i.addClass(o.options.cssClass),o.options.text&&o.options.text.content!==O){var n=this.getTextPosition(o.mapElem.getBBox(),o.options.text.position,o.options.text.margin);o.options.text.attrs.text=o.options.text.content,o.options.text.attrs.x=n.x,o.options.text.attrs.y=n.y,o.options.text.attrs["text-anchor"]=n.textAnchor,o.textElem=this.paper.text(n.x,n.y,o.options.text.content),o.textElem.attr(o.options.text.attrs),C(o.textElem.node).attr({"data-id":t,"data-type":e+"-text"})}o.options.eventHandlers&&this.setEventHandlers(t,e,o),this.setHoverOptions(o.mapElem,o.options.attrs,o.options.attrsHover),o.textElem&&this.setHoverOptions(o.textElem,o.options.text.attrs,o.options.text.attrsHover)},initZoom:function(l,p,m){var h=this,d=!1,c=0,u=0,i={reset:function(){h.$container.trigger("zoom",{level:0})},"in":function(){h.$container.trigger("zoom",{level:"+1"})},out:function(){h.$container.trigger("zoom",{level:-1})}};C.extend(h.zoomData,{zoomLevel:0,panX:0,panY:0}),C.each(m.buttons,function(t,e){if(i[t]===O)throw new Error("Unknown zoom button '"+t+"'");var o=C("<div>").addClass(e.cssClass).html(e.content).attr("title",e.title);o.on("click.mapael",i[t]),h.$map.append(o)}),h.options.map.zoom.mousewheel&&h.$map.on("mousewheel.mapael",function(t){var e=0<t.deltaY?1:-1,o=h.mapPagePositionToXY(t.pageX,t.pageY);h.$container.trigger("zoom",{fixedCenter:!0,level:h.zoomData.zoomLevel+e,x:o.x,y:o.y}),t.preventDefault()}),h.options.map.zoom.touch&&(h.$map.on("touchstart.mapael",function(t){2===t.originalEvent.touches.length&&(h.zoomCenterX=(t.originalEvent.touches[0].pageX+t.originalEvent.touches[1].pageX)/2,h.zoomCenterY=(t.originalEvent.touches[0].pageY+t.originalEvent.touches[1].pageY)/2,h.previousPinchDist=Math.sqrt(Math.pow(t.originalEvent.touches[1].pageX-t.originalEvent.touches[0].pageX,2)+Math.pow(t.originalEvent.touches[1].pageY-t.originalEvent.touches[0].pageY,2)))}),h.$map.on("touchmove.mapael",function(t){var e=0,o=0;if(2===t.originalEvent.touches.length){if(e=Math.sqrt(Math.pow(t.originalEvent.touches[1].pageX-t.originalEvent.touches[0].pageX,2)+Math.pow(t.originalEvent.touches[1].pageY-t.originalEvent.touches[0].pageY,2)),15<Math.abs(e-h.previousPinchDist)){var i=h.mapPagePositionToXY(h.zoomCenterX,h.zoomCenterY);o=(e-h.previousPinchDist)/Math.abs(e-h.previousPinchDist),h.$container.trigger("zoom",{fixedCenter:!0,level:h.zoomData.zoomLevel+o,x:i.x,y:i.y}),h.previousPinchDist=e}return!1}})),h.$map.on("dragstart",function(){return!1});var f=null,g=null;C("body").on("mouseup.mapael"+(m.touch?" touchend.mapael":""),function(){d=!1,clearTimeout(f),clearTimeout(g),f=setTimeout(function(){h.panning=!1},h.panningEndFilteringTO)}),h.$map.on("mousedown.mapael"+(m.touch?" touchstart.mapael":""),function(t){clearTimeout(f),clearTimeout(g),t.pageX!==O?(d=!0,c=t.pageX,u=t.pageY):1===t.originalEvent.touches.length&&(d=!0,c=t.originalEvent.touches[0].pageX,u=t.originalEvent.touches[0].pageY)}).on("mousemove.mapael"+(m.touch?" touchmove.mapael":""),function(t){var e=h.zoomData.zoomLevel,o=0,i=0;if(clearTimeout(f),clearTimeout(g),t.pageX!==O?(o=t.pageX,i=t.pageY):1===t.originalEvent.touches.length?(o=t.originalEvent.touches[0].pageX,i=t.originalEvent.touches[0].pageY):d=!1,d&&0!==e){var n=(c-o)/(1+e*m.step)*(l/h.paper.width),a=(u-i)/(1+e*m.step)*(p/h.paper.height),s=Math.min(Math.max(0,h.currentViewBox.x+n),l-h.currentViewBox.w),r=Math.min(Math.max(0,h.currentViewBox.y+a),p-h.currentViewBox.h);return(5<Math.abs(n)||5<Math.abs(a))&&(C.extend(h.zoomData,{panX:s,panY:r,zoomX:s+h.currentViewBox.w/2,zoomY:r+h.currentViewBox.h/2}),h.setViewBox(s,r,h.currentViewBox.w,h.currentViewBox.h),g=setTimeout(function(){h.$map.trigger("afterPanning",{x1:s,y1:r,x2:s+h.currentViewBox.w,y2:r+h.currentViewBox.h})},h.panningFilteringTO),c=o,u=i,h.panning=!0),!1}})},mapPagePositionToXY:function(t,e){var o=this.$map.offset(),i=this.options.map.width?this.mapConf.width/this.options.map.width:this.mapConf.width/this.$map.width(),n=1/(1+this.zoomData.zoomLevel*this.options.map.zoom.step);return{x:n*i*(t-o.left)+this.zoomData.panX,y:n*i*(e-o.top)+this.zoomData.panY}},onZoomEvent:function(t,e){var o,i,n,a,s,r=this,l=r.zoomData.zoomLevel,p=1+r.zoomData.zoomLevel*r.options.map.zoom.step,m=e.animDuration!==O?e.animDuration:r.options.map.zoom.animDuration;if(e.area!==O){if(r.areas[e.area]===O)throw new Error("Unknown area '"+e.area+"'");var h=e.areaMargin!==O?e.areaMargin:10,d=r.areas[e.area].mapElem.getBBox(),c=d.width+2*h,u=d.height+2*h;e.x=d.cx,e.y=d.cy,l=Math.min(Math.floor((r.mapConf.width/c-1)/r.options.map.zoom.step),Math.floor((r.mapConf.height/u-1)/r.options.map.zoom.step))}else if(e.level!==O&&(l="string"==typeof e.level?"+"===e.level.slice(0,1)||"-"===e.level.slice(0,1)?r.zoomData.zoomLevel+parseInt(e.level,10):parseInt(e.level,10):e.level<0?r.zoomData.zoomLevel+e.level:e.level),e.plot!==O){if(r.plots[e.plot]===O)throw new Error("Unknown plot '"+e.plot+"'");e.x=r.plots[e.plot].coords.x,e.y=r.plots[e.plot].coords.y}else{if(e.latitude!==O&&e.longitude!==O){var f=r.mapConf.getCoords(e.latitude,e.longitude);e.x=f.x,e.y=f.y}e.x===O&&(e.x=r.currentViewBox.x+r.currentViewBox.w/2),e.y===O&&(e.y=r.currentViewBox.y+r.currentViewBox.h/2)}s=1+(l=Math.min(Math.max(l,r.options.map.zoom.minLevel),r.options.map.zoom.maxLevel))*r.options.map.zoom.step,n=r.mapConf.width/s,a=r.mapConf.height/s,0===l?i=o=0:(e.fixedCenter!==O&&!0===e.fixedCenter?(o=r.zoomData.panX+(e.x-r.zoomData.panX)*(s-p)/s,i=r.zoomData.panY+(e.y-r.zoomData.panY)*(s-p)/s):(o=e.x-n/2,i=e.y-a/2),o=Math.min(Math.max(0,o),r.mapConf.width-n),i=Math.min(Math.max(0,i),r.mapConf.height-a)),s===p&&o===r.zoomData.panX&&i===r.zoomData.panY||(0<m?r.animateViewBox(o,i,n,a,m,r.options.map.zoom.animEasing):(r.setViewBox(o,i,n,a),clearTimeout(r.zoomTO),r.zoomTO=setTimeout(function(){r.$map.trigger("afterZoom",{x1:o,y1:i,x2:o+n,y2:i+a})},r.zoomFilteringTO)),C.extend(r.zoomData,{zoomLevel:l,panX:o,panY:i,zoomX:o+n/2,zoomY:i+a/2}))},onShowElementsInRange:function(t,e){e.animDuration===O&&(e.animDuration=0),e.hiddenOpacity===O&&(e.hiddenOpacity=.3),e.ranges&&e.ranges.area&&this.showElemByRange(e.ranges.area,this.areas,e.hiddenOpacity,e.animDuration),e.ranges&&e.ranges.plot&&this.showElemByRange(e.ranges.plot,this.plots,e.hiddenOpacity,e.animDuration),e.ranges&&e.ranges.link&&this.showElemByRange(e.ranges.link,this.links,e.hiddenOpacity,e.animDuration),e.afterShowRange&&e.afterShowRange()},showElemByRange:function(t,n,a,e){var o=this,s={};t.min===O&&t.max===O||(t={0:t}),C.each(t,function(o){var i=t[o];if(i.min===O&&i.max===O)return!0;C.each(n,function(t){var e=n[t].options.value;if("object"!=typeof e&&(e=[e]),e[o]===O)return!0;i.min!==O&&e[o]<i.min||i.max!==O&&e[o]>i.max?s[t]=a:s[t]=1})}),C.each(s,function(t){o.setElementOpacity(n[t],s[t],e)})},setElementOpacity:function(t,e,o){0<e&&(t.mapElem.show(),t.textElem&&t.textElem.show()),this.animate(t.mapElem,{opacity:e},o,function(){0===e&&t.mapElem.hide()}),this.animate(t.textElem,{opacity:e},o,function(){0===e&&t.textElem.hide()})},onUpdateEvent:function(t,e){var i=this;if("object"==typeof e){var o=0,n=e.animDuration?e.animDuration:0,a=function(t){i.animate(t.mapElem,{opacity:0},n,function(){t.mapElem.remove()}),i.animate(t.textElem,{opacity:0},n,function(){t.textElem.remove()})},s=function(t){t.mapElem.attr({opacity:0}),t.textElem&&t.textElem.attr({opacity:0}),i.setElementOpacity(t,t.mapElem.originalAttrs.opacity!==O?t.mapElem.originalAttrs.opacity:1,n)};if("object"==typeof e.mapOptions&&(!0===e.replaceOptions?i.options=i.extendDefaultOptions(e.mapOptions):C.extend(!0,i.options,e.mapOptions),e.mapOptions.areas===O&&e.mapOptions.plots===O&&e.mapOptions.legend===O||C("[data-type='legend-elem']",i.$container).each(function(t,e){"1"===C(e).attr("data-hidden")&&C(e).trigger("click",{hideOtherElems:!1,animDuration:n})})),"object"==typeof e.deletePlotKeys)for(;o<e.deletePlotKeys.length;o++)i.plots[e.deletePlotKeys[o]]!==O&&(a(i.plots[e.deletePlotKeys[o]]),delete i.plots[e.deletePlotKeys[o]]);else"all"===e.deletePlotKeys&&(C.each(i.plots,function(t,e){a(e)}),i.plots={});if("object"==typeof e.deleteLinkKeys)for(o=0;o<e.deleteLinkKeys.length;o++)i.links[e.deleteLinkKeys[o]]!==O&&(a(i.links[e.deleteLinkKeys[o]]),delete i.links[e.deleteLinkKeys[o]]);else"all"===e.deleteLinkKeys&&(C.each(i.links,function(t,e){a(e)}),i.links={});if("object"==typeof e.newPlots&&C.each(e.newPlots,function(t){i.plots[t]===O&&(i.options.plots[t]=e.newPlots[t],i.plots[t]=i.drawPlot(t),0<n&&s(i.plots[t]))}),"object"==typeof e.newLinks){var r=i.drawLinksCollection(e.newLinks);C.extend(i.links,r),C.extend(i.options.links,e.newLinks),0<n&&C.each(r,function(t){s(r[t])})}if(C.each(i.areas,function(t){("object"==typeof e.mapOptions&&("object"==typeof e.mapOptions.map&&"object"==typeof e.mapOptions.map.defaultArea||"object"==typeof e.mapOptions.areas&&"object"==typeof e.mapOptions.areas[t]||"object"==typeof e.mapOptions.legend&&"object"==typeof e.mapOptions.legend.area)||!0===e.replaceOptions)&&(i.areas[t].options=i.getElemOptions(i.options.map.defaultArea,i.options.areas[t]?i.options.areas[t]:{},i.options.legend.area),i.updateElem(i.areas[t],n))}),C.each(i.plots,function(t){("object"==typeof e.mapOptions&&("object"==typeof e.mapOptions.map&&"object"==typeof e.mapOptions.map.defaultPlot||"object"==typeof e.mapOptions.plots&&"object"==typeof e.mapOptions.plots[t]||"object"==typeof e.mapOptions.legend&&"object"==typeof e.mapOptions.legend.plot)||!0===e.replaceOptions)&&(i.plots[t].options=i.getElemOptions(i.options.map.defaultPlot,i.options.plots[t]?i.options.plots[t]:{},i.options.legend.plot),i.setPlotCoords(i.plots[t]),i.setPlotAttributes(i.plots[t]),i.updateElem(i.plots[t],n))}),C.each(i.links,function(t){("object"==typeof e.mapOptions&&("object"==typeof e.mapOptions.map&&"object"==typeof e.mapOptions.map.defaultLink||"object"==typeof e.mapOptions.links&&"object"==typeof e.mapOptions.links[t])||!0===e.replaceOptions)&&(i.links[t].options=i.getElemOptions(i.options.map.defaultLink,i.options.links[t]?i.options.links[t]:{},{}),i.updateElem(i.links[t],n))}),e.mapOptions&&("object"==typeof e.mapOptions.legend||"object"==typeof e.mapOptions.map&&"object"==typeof e.mapOptions.map.defaultArea||"object"==typeof e.mapOptions.map&&"object"==typeof e.mapOptions.map.defaultPlot)&&(C("[data-type='legend-elem']",i.$container).each(function(t,e){"1"===C(e).attr("data-hidden")&&C(e).trigger("click",{hideOtherElems:!1,animDuration:n})}),i.createLegends("area",i.areas,1),i.options.map.width?i.createLegends("plot",i.plots,i.options.map.width/i.mapConf.width):i.createLegends("plot",i.plots,i.$map.width()/i.mapConf.width)),"object"==typeof e.setLegendElemsState)C.each(e.setLegendElemsState,function(t,o){var e=i.$container.find("."+t)[0];e!==O&&C("[data-type='legend-elem']",e).each(function(t,e){("0"===C(e).attr("data-hidden")&&"hide"===o||"1"===C(e).attr("data-hidden")&&"show"===o)&&C(e).trigger("click",{hideOtherElems:!1,animDuration:n})})});else{var l="hide"===e.setLegendElemsState?"hide":"show";C("[data-type='legend-elem']",i.$container).each(function(t,e){("0"===C(e).attr("data-hidden")&&"hide"===l||"1"===C(e).attr("data-hidden")&&"show"===l)&&C(e).trigger("click",{hideOtherElems:!1,animDuration:n})})}i.initDelegatedCustomEvents(),e.afterUpdate&&e.afterUpdate(i.$container,i.paper,i.areas,i.plots,i.options,i.links)}},setPlotCoords:function(t){if(t.options.x!==O&&t.options.y!==O)t.coords={x:t.options.x,y:t.options.y};else if(t.options.plotsOn!==O&&this.areas[t.options.plotsOn]!==O){var e=this.areas[t.options.plotsOn].mapElem.getBBox();t.coords={x:e.cx,y:e.cy}}else t.coords=this.mapConf.getCoords(t.options.latitude,t.options.longitude)},setPlotAttributes:function(t){"square"===t.options.type?(t.options.attrs.width=t.options.size,t.options.attrs.height=t.options.size,t.options.attrs.x=t.coords.x-t.options.size/2,t.options.attrs.y=t.coords.y-t.options.size/2):"image"===t.options.type?(t.options.attrs.src=t.options.url,t.options.attrs.width=t.options.width,t.options.attrs.height=t.options.height,t.options.attrs.x=t.coords.x-t.options.width/2,t.options.attrs.y=t.coords.y-t.options.height/2):"svg"===t.options.type?(t.options.attrs.path=t.options.path,t.options.attrs.transform===O&&(t.options.attrs.transform=""),t.mapElem.originalBBox===O&&(t.mapElem.originalBBox=t.mapElem.getBBox()),t.mapElem.baseTransform="m"+t.options.width/t.mapElem.originalBBox.width+",0,0,"+t.options.height/t.mapElem.originalBBox.height+","+(t.coords.x-t.options.width/2)+","+(t.coords.y-t.options.height/2),t.options.attrs.transform=t.mapElem.baseTransform+t.options.attrs.transform):(t.options.attrs.x=t.coords.x,t.options.attrs.y=t.coords.y,t.options.attrs.r=t.options.size/2)},drawLinksCollection:function(n){var a=this,s={},r={},l={},p={},m={};return C.each(n,function(t){var e=a.getElemOptions(a.options.map.defaultLink,n[t],{});if(s="string"==typeof n[t].between[0]?a.options.plots[n[t].between[0]]:n[t].between[0],r="string"==typeof n[t].between[1]?a.options.plots[n[t].between[1]]:n[t].between[1],s.plotsOn!==O&&a.areas[s.plotsOn]!==O){var o=a.areas[s.plotsOn].mapElem.getBBox();l={x:o.cx,y:o.cy}}else s.latitude!==O&&s.longitude!==O?l=a.mapConf.getCoords(s.latitude,s.longitude):(l.x=s.x,l.y=s.y);if(r.plotsOn!==O&&a.areas[r.plotsOn]!==O){var i=a.areas[r.plotsOn].mapElem.getBBox();p={x:i.cx,y:i.cy}}else r.latitude!==O&&r.longitude!==O?p=a.mapConf.getCoords(r.latitude,r.longitude):(p.x=r.x,p.y=r.y);m[t]=a.drawLink(t,l.x,l.y,p.x,p.y,e)}),m},drawLink:function(t,e,o,i,n,a){var s={options:a},r=(e+i)/2,l=(o+n)/2,p=-1/((n-o)/(i-e)),m=l-p*r,h=Math.sqrt((i-e)*(i-e)+(n-o)*(n-o)),d=1+p*p,c=-2*r+2*p*m-2*p*l,u=c*c-4*d*(r*r+m*m-m*l-l*m+l*l-a.factor*h*(a.factor*h)),f=0,g=0;return g=0<a.factor?p*(f=(-c+Math.sqrt(u))/(2*d))+m:p*(f=(-c-Math.sqrt(u))/(2*d))+m,s.mapElem=this.paper.path("m "+e+","+o+" C "+f+","+g+" "+i+","+n+" "+i+","+n),this.initElem(t,"link",s),s},isAttrsChanged:function(t,e){for(var o in e)if(e.hasOwnProperty(o)&&void 0===t[o]||e[o]!==t[o])return!0;return!1},updateElem:function(t,e){var o,i,n;if(!0===t.options.toFront&&t.mapElem.toFront(),t.options.href!==O?(t.options.attrs.cursor="pointer",t.options.text&&(t.options.text.attrs.cursor="pointer")):"pointer"===t.mapElem.attrs.cursor&&(t.options.attrs.cursor="auto",t.options.text&&(t.options.text.attrs.cursor="auto")),t.textElem){t.options.text.attrs.text=t.options.text.content,o=t.mapElem.getBBox(),(t.options.size||t.options.width&&t.options.height)&&("image"===t.options.type||"svg"===t.options.type?(i=(t.options.width-o.width)/2,n=(t.options.height-o.height)/2):(i=(t.options.size-o.width)/2,n=(t.options.size-o.height)/2),o.x-=i,o.x2+=i,o.y-=n,o.y2+=n);var a=this.getTextPosition(o,t.options.text.position,t.options.text.margin);t.options.text.attrs.x=a.x,t.options.text.attrs.y=a.y,t.options.text.attrs["text-anchor"]=a.textAnchor,this.setHoverOptions(t.textElem,t.options.text.attrs,t.options.text.attrsHover),this.isAttrsChanged(t.textElem.attrs,t.options.text.attrs)&&this.animate(t.textElem,t.options.text.attrs,e)}this.setHoverOptions(t.mapElem,t.options.attrs,t.options.attrsHover),this.isAttrsChanged(t.mapElem.attrs,t.options.attrs)&&this.animate(t.mapElem,t.options.attrs,e),t.options.cssClass!==O&&C(t.mapElem.node).removeClass().addClass(t.options.cssClass)},drawPlot:function(t){var e={};return e.options=this.getElemOptions(this.options.map.defaultPlot,this.options.plots[t]?this.options.plots[t]:{},this.options.legend.plot),this.setPlotCoords(e),"svg"===e.options.type&&(e.mapElem=this.paper.path(e.options.path)),this.setPlotAttributes(e),"square"===e.options.type?e.mapElem=this.paper.rect(e.options.attrs.x,e.options.attrs.y,e.options.attrs.width,e.options.attrs.height):"image"===e.options.type?e.mapElem=this.paper.image(e.options.attrs.src,e.options.attrs.x,e.options.attrs.y,e.options.attrs.width,e.options.attrs.height):"svg"===e.options.type||(e.mapElem=this.paper.circle(e.options.attrs.x,e.options.attrs.y,e.options.attrs.r)),this.initElem(t,"plot",e),e},setEventHandlers:function(e,o,i){var n=this;C.each(i.options.eventHandlers,function(t){n.customEventHandlers[t]===O&&(n.customEventHandlers[t]={}),n.customEventHandlers[t][o]===O&&(n.customEventHandlers[t][o]={}),n.customEventHandlers[t][o][e]=i})},drawLegend:function(t,e,o,i,n){var a={},s={},r=0,l=0,p=null,m=null,h={},d=0,c=0,u=0,f=0,g=[],w=(a=C("."+t.cssClass,this.$container)).html();for(a.empty(),s=new L(a.get(0)),C(s.canvas).attr({"data-legend-type":e,"data-legend-id":n}),l=r=0,t.title&&""!==t.title&&(m=(p=s.text(t.marginLeftTitle,0,t.title).attr(t.titleAttrs)).getBBox(),p.attr({y:.5*m.height}),r=t.marginLeftTitle+m.width,l+=t.marginBottomTitle+m.height),d=0;d<t.slices.length;++d){var v=0;g[d]=C.extend(!0,{},"plot"===e?this.options.map.defaultPlot:this.options.map.defaultArea,t.slices[d]),t.slices[d].legendSpecificAttrs===O&&(t.slices[d].legendSpecificAttrs={}),C.extend(!0,g[d].attrs,t.slices[d].legendSpecificAttrs),"area"===e?(g[d].attrs.width===O&&(g[d].attrs.width=30),g[d].attrs.height===O&&(g[d].attrs.height=20)):"square"===g[d].type?(g[d].attrs.width===O&&(g[d].attrs.width=g[d].size),g[d].attrs.height===O&&(g[d].attrs.height=g[d].size)):"image"===g[d].type||"svg"===g[d].type?(g[d].attrs.width===O&&(g[d].attrs.width=g[d].width),g[d].attrs.height===O&&(g[d].attrs.height=g[d].height)):g[d].attrs.r===O&&(g[d].attrs.r=g[d].size/2),v=t.marginBottomTitle,p&&(v+=m.height),"plot"!==e||g[d].type!==O&&"circle"!==g[d].type?v+=i*g[d].attrs.height/2:v+=i*g[d].attrs.r,f=Math.max(f,v)}for("horizontal"===t.mode&&(r=t.marginLeft),d=0;d<g.length;++d){var x={},y={},E={};if(g[d].display===O||!0===g[d].display){if("area"===e?("horizontal"===t.mode?(c=r+t.marginLeft,u=f-.5*i*g[d].attrs.height):(c=t.marginLeft,u=l),x=s.rect(c,u,i*g[d].attrs.width,i*g[d].attrs.height)):"square"===g[d].type?("horizontal"===t.mode?(c=r+t.marginLeft,u=f-.5*i*g[d].attrs.height):(c=t.marginLeft,u=l),x=s.rect(c,u,i*g[d].attrs.width,i*g[d].attrs.height)):"image"===g[d].type||"svg"===g[d].type?("horizontal"===t.mode?(c=r+t.marginLeft,u=f-.5*i*g[d].attrs.height):(c=t.marginLeft,u=l),"image"===g[d].type?x=s.image(g[d].url,c,u,i*g[d].attrs.width,i*g[d].attrs.height):(x=s.path(g[d].path),g[d].attrs.transform===O&&(g[d].attrs.transform=""),y=x.getBBox(),g[d].attrs.transform="m"+i*g[d].width/y.width+",0,0,"+i*g[d].height/y.height+","+c+","+u+g[d].attrs.transform)):("horizontal"===t.mode?(c=r+t.marginLeft+i*g[d].attrs.r,u=f):(c=t.marginLeft+i*g[d].attrs.r,u=l+i*g[d].attrs.r),x=s.circle(c,u,i*g[d].attrs.r)),delete g[d].attrs.width,delete g[d].attrs.height,delete g[d].attrs.r,x.attr(g[d].attrs),y=x.getBBox(),"horizontal"===t.mode?(c=r+t.marginLeft+y.width+t.marginLeftLabel,u=f):(c=t.marginLeft+y.width+t.marginLeftLabel,u=l+y.height/2),E=s.text(c,u,g[d].label).attr(t.labelAttrs),"horizontal"===t.mode){var z=t.marginBottom+y.height;r+=t.marginLeft+y.width+t.marginLeftLabel+E.getBBox().width,"image"!==g[d].type&&"area"!==e&&(z+=t.marginBottomTitle),p&&(z+=m.height),l=Math.max(l,z)}else r=Math.max(r,t.marginLeft+y.width+t.marginLeftLabel+E.getBBox().width),l+=t.marginBottom+y.height;C(x.node).attr({"data-legend-id":n,"data-legend-type":e,"data-type":"legend-elem","data-id":d,"data-hidden":0}),C(E.node).attr({"data-legend-id":n,"data-legend-type":e,"data-type":"legend-label","data-id":d,"data-hidden":0}),h[d]={mapElem:x,textElem:E},t.hideElemsOnClick.enabled&&(E.attr({cursor:"pointer"}),x.attr({cursor:"pointer"}),this.setHoverOptions(x,g[d].attrs,g[d].attrs),this.setHoverOptions(E,t.labelAttrs,t.labelAttrsHover),g[d].clicked!==O&&!0===g[d].clicked&&this.handleClickOnLegendElem(h[d],d,n,e,{hideOtherElems:!1}))}}return"SVG"!==L.type&&t.VMLWidth&&(r=t.VMLWidth),s.setSize(r,l),{container:a,initialHTMLContent:w,elems:h}},handleClickOnLegendElem:function(t,e,i,o,n){var a,s=this;n=n||{},a=C.isArray(s.options.legend[o])?s.options.legend[o][i]:s.options.legend[o];var r=t.mapElem,l=t.textElem,p=C(r.node),m=C(l.node),h=a.slices[e],d="area"===o?s.areas:s.plots,c=n.animDuration!==O?n.animDuration:a.hideElemsOnClick.animDuration,u=p.attr("data-hidden"),f="0"===u?{"data-hidden":"1"}:{"data-hidden":"0"};"0"===u?s.animate(l,{opacity:.5},c):s.animate(l,{opacity:1},c),C.each(d,function(t){var e,o=d[t].mapElem.data("hidden-by");o===O&&(o={}),e=C.isArray(d[t].options.value)?d[t].options.value[i]:d[t].options.value,s.getLegendSlice(e,a)===h&&("0"===u?(o[i]=!0,s.setElementOpacity(d[t],a.hideElemsOnClick.opacity,c)):(delete o[i],C.isEmptyObject(o)&&s.setElementOpacity(d[t],d[t].mapElem.originalAttrs.opacity!==O?d[t].mapElem.originalAttrs.opacity:1,c)),d[t].mapElem.data("hidden-by",o))}),p.attr(f),m.attr(f),n.hideOtherElems!==O&&!0!==n.hideOtherElems||!0!==a.exclusive||C("[data-type='legend-elem'][data-hidden=0]",s.$container).each(function(){var t=C(this);t.attr("data-id")!==e&&t.trigger("click",{hideOtherElems:!1})})},createLegends:function(t,e,o){var i=this.options.legend[t];C.isArray(this.options.legend[t])||(i=[this.options.legend[t]]),this.legends[t]={};for(var n=0;n<i.length;++n)!0===i[n].display&&C.isArray(i[n].slices)&&0<i[n].slices.length&&""!==i[n].cssClass&&0!==C("."+i[n].cssClass,this.$container).length&&(this.legends[t][n]=this.drawLegend(i[n],t,e,o,n))},setHoverOptions:function(t,e,o){"SVG"!==L.type&&delete o.transform,t.attrsHover=o,t.attrsHover.transform?t.originalAttrs=C.extend({transform:"s1"},e):t.originalAttrs=e},elemEnter:function(t){if(t!==O){if(t.mapElem!==O&&this.animate(t.mapElem,t.mapElem.attrsHover,t.mapElem.attrsHover.animDuration),t.textElem!==O&&this.animate(t.textElem,t.textElem.attrsHover,t.textElem.attrsHover.animDuration),t.options&&t.options.tooltip!==O){var e="";this.$tooltip.removeClass().addClass(this.options.map.tooltip.cssClass),t.options.tooltip.content!==O&&(e="function"==typeof t.options.tooltip.content?t.options.tooltip.content(t.mapElem):t.options.tooltip.content),t.options.tooltip.cssClass!==O&&this.$tooltip.addClass(t.options.tooltip.cssClass),this.$tooltip.html(e).css("display","block")}t.mapElem===O&&t.textElem===O||this.paper.safari&&this.paper.safari()}},elemHover:function(t,e){if(t!==O&&t.options.tooltip!==O){var o=e.pageX,i=e.pageY,n=10,a=20;"object"==typeof t.options.tooltip.offset&&(void 0!==t.options.tooltip.offset.left&&(n=t.options.tooltip.offset.left),void 0!==t.options.tooltip.offset.top&&(a=t.options.tooltip.offset.top));var s={left:Math.min(this.$map.width()-this.$tooltip.outerWidth()-5,o-this.$map.offset().left+n),
top:Math.min(this.$map.height()-this.$tooltip.outerHeight()-5,i-this.$map.offset().top+a)};"object"==typeof t.options.tooltip.overflow&&(!0===t.options.tooltip.overflow.right&&(s.left=o-this.$map.offset().left+10),!0===t.options.tooltip.overflow.bottom&&(s.top=i-this.$map.offset().top+20)),this.$tooltip.css(s)}},elemOut:function(t){t!==O&&(t.mapElem!==O&&this.animate(t.mapElem,t.mapElem.originalAttrs,t.mapElem.attrsHover.animDuration),t.textElem!==O&&this.animate(t.textElem,t.textElem.originalAttrs,t.textElem.attrsHover.animDuration),t.options&&t.options.tooltip!==O&&this.$tooltip.css({display:"none",top:-1e3,left:-1e3}),t.mapElem===O&&t.textElem===O||this.paper.safari&&this.paper.safari())},elemClick:function(t){t!==O&&(this.panning||t.options.href===O||window.open(t.options.href,t.options.target))},getElemOptions:function(t,e,o){var i=C.extend(!0,{},t,e);if(i.value!==O)if(C.isArray(o))for(var n=0;n<o.length;++n)i=C.extend(!0,{},i,this.getLegendSlice(i.value[n],o[n]));else i=C.extend(!0,{},i,this.getLegendSlice(i.value,o));return i},getTextPosition:function(t,e,o){var i=0,n=0,a="";switch("number"==typeof o&&(o="bottom"===e||"top"===e?{x:0,y:o}:"right"===e||"left"===e?{x:o,y:0}:{x:0,y:0}),e){case"bottom":i=(t.x+t.x2)/2+o.x,n=t.y2+o.y,a="middle";break;case"top":i=(t.x+t.x2)/2+o.x,n=t.y-o.y,a="middle";break;case"left":i=t.x-o.x,n=(t.y+t.y2)/2+o.y,a="end";break;case"right":i=t.x2+o.x,n=(t.y+t.y2)/2+o.y,a="start";break;default:i=(t.x+t.x2)/2+o.x,n=(t.y+t.y2)/2+o.y,a="middle"}return{x:i,y:n,textAnchor:a}},getLegendSlice:function(t,e){for(var o=0;o<e.slices.length;++o)if(e.slices[o].sliceValue!==O&&t===e.slices[o].sliceValue||e.slices[o].sliceValue===O&&(e.slices[o].min===O||t>=e.slices[o].min)&&(e.slices[o].max===O||t<=e.slices[o].max))return e.slices[o];return{}},animateViewBox:function(l,p,m,h,d,t){var c=this,u=c.currentViewBox.x,f=l-u,g=c.currentViewBox.y,w=p-g,v=c.currentViewBox.w,x=m-v,y=c.currentViewBox.h,E=h-y;c.zoomAnimCVBTarget||(c.zoomAnimCVBTarget={x:l,y:p,w:m,h:h});var z=m<v?"in":"out",C=L.easing_formulas[t||"linear"],O=d-2*d/100,b=c.zoomAnimStartTime;c.zoomAnimStartTime=(new Date).getTime();var B=function(){c.cancelAnimationFrame(c.zoomAnimID);var t=(new Date).getTime()-c.zoomAnimStartTime;if(t<O){var e,o,i,n;if(b&&c.zoomAnimCVBTarget&&c.zoomAnimCVBTarget.w!==m){var a=(new Date).getTime()-b,s=C(a/d);e=u+(c.zoomAnimCVBTarget.x-u)*s,o=g+(c.zoomAnimCVBTarget.y-g)*s,i=v+(c.zoomAnimCVBTarget.w-v)*s,n=y+(c.zoomAnimCVBTarget.h-y)*s,f=l-(u=e),w=p-(g=o),x=m-(v=i),E=h-(y=n),c.zoomAnimCVBTarget={x:l,y:p,w:m,h:h}}else{var r=C(t/d);e=u+f*r,o=g+w*r,i=v+x*r,n=y+E*r}"in"===z&&(i>c.currentViewBox.w||i<m)||"out"===z&&(i<c.currentViewBox.w||m<i)||c.setViewBox(e,o,i,n),c.zoomAnimID=c.requestAnimationFrame(B)}else c.zoomAnimStartTime=null,c.zoomAnimCVBTarget=null,c.currentViewBox.w!==m&&c.setViewBox(l,p,m,h),c.$map.trigger("afterZoom",{x1:l,y1:p,x2:l+m,y2:p+h})};B()},requestAnimationFrame:function(t){return this._requestAnimationFrameFn.call(window,t)},cancelAnimationFrame:function(t){this._cancelAnimationFrameFn.call(window,t)},_requestAnimationFrameFn:(o=(new Date).getTime(),i=function(t){var e=(new Date).getTime();if(!(16<e-o))return setTimeout(function(){i(t)},0);t(o=e)},window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||i),_cancelAnimationFrameFn:window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelAnimationFrame||window.mozCancelRequestAnimationFrame||window.msCancelAnimationFrame||window.msCancelRequestAnimationFrame||window.oCancelAnimationFrame||window.oCancelRequestAnimationFrame||clearTimeout,setViewBox:function(t,e,o,i){this.currentViewBox.x=t,this.currentViewBox.y=e,this.currentViewBox.w=o,this.currentViewBox.h=i,this.paper.setViewBox(t,e,o,i,!1)},_nonAnimatedAttrs:["arrow-end","arrow-start","gradient","class","cursor","text-anchor","font","font-family","font-style","font-weight","letter-spacing","src","href","target","title","stroke-dasharray","stroke-linecap","stroke-linejoin","stroke-miterlimit"],animate:function(t,e,o,i){if(t)if(0<o){for(var n={},a=0;a<this._nonAnimatedAttrs.length;a++){var s=this._nonAnimatedAttrs[a];e[s]!==O&&(n[s]=e[s])}t.attr(n),t.animate(e,o,"linear",function(){i&&i()})}else t.attr(e),i&&i()},isRaphaelBBoxBugPresent:function(){var t=this.paper.text(-50,-50,"TEST"),e=t.getBBox();return t.remove(),0===e.width&&0===e.height},defaultOptions:{map:{cssClass:"map",tooltip:{cssClass:"mapTooltip"},defaultArea:{attrs:{fill:"#343434",stroke:"#5d5d5d","stroke-width":1,"stroke-linejoin":"round"},attrsHover:{fill:"#f38a03",animDuration:300},text:{position:"inner",margin:10,attrs:{"font-size":15,fill:"#c7c7c7"},attrsHover:{fill:"#eaeaea",animDuration:300}},target:"_self",cssClass:"area"},defaultPlot:{type:"circle",size:15,attrs:{fill:"#0088db",stroke:"#fff","stroke-width":0,"stroke-linejoin":"round"},attrsHover:{"stroke-width":3,animDuration:300},text:{position:"right",margin:10,attrs:{"font-size":15,fill:"#c7c7c7"},attrsHover:{fill:"#eaeaea",animDuration:300}},target:"_self",cssClass:"plot"},defaultLink:{factor:.5,attrs:{stroke:"#0088db","stroke-width":2},attrsHover:{animDuration:300},text:{position:"inner",margin:10,attrs:{"font-size":15,fill:"#c7c7c7"},attrsHover:{fill:"#eaeaea",animDuration:300}},target:"_self",cssClass:"link"},zoom:{enabled:!1,minLevel:0,maxLevel:10,step:.25,mousewheel:!0,touch:!0,animDuration:200,animEasing:"linear",buttons:{reset:{cssClass:"zoomButton zoomReset",content:"&#8226;",title:"Reset zoom"},"in":{cssClass:"zoomButton zoomIn",content:"+",title:"Zoom in"},out:{cssClass:"zoomButton zoomOut",content:"&#8722;",title:"Zoom out"}}}},legend:{redrawOnResize:!0,area:[],plot:[]},areas:{},plots:{},links:{}},legendDefaultOptions:{area:{cssClass:"areaLegend",display:!0,marginLeft:10,marginLeftTitle:5,marginBottomTitle:10,marginLeftLabel:10,marginBottom:10,titleAttrs:{"font-size":16,fill:"#343434","text-anchor":"start"},labelAttrs:{"font-size":12,fill:"#343434","text-anchor":"start"},labelAttrsHover:{fill:"#787878",animDuration:300},hideElemsOnClick:{enabled:!0,opacity:.2,animDuration:300},slices:[],mode:"vertical"},plot:{cssClass:"plotLegend",display:!0,marginLeft:10,marginLeftTitle:5,marginBottomTitle:10,marginLeftLabel:10,marginBottom:10,titleAttrs:{"font-size":16,fill:"#343434","text-anchor":"start"},labelAttrs:{"font-size":12,fill:"#343434","text-anchor":"start"},labelAttrsHover:{fill:"#787878",animDuration:300},hideElemsOnClick:{enabled:!0,opacity:.2,animDuration:300},slices:[],mode:"vertical"}}},n.version="2.2.0",C.mapael===O&&(C.mapael=n),C.fn.mapael=function(t){return this.each(function(){C.data(this,"mapael")&&C.data(this,"mapael").destroy(),C.data(this,"mapael",new n(this,t))})},n}(o(1),o(392),o(393))}});if("object"==typeof e){var o=["object"==typeof module&&"object"==typeof module.exports?module.exports:null,"undefined"!=typeof window?window:null,t&&t!==window?t:null];for(var i in e)o[0]&&(o[0][i]=e[i]),o[1]&&"__esModule"!==i&&(o[1][i]=e[i]),o[2]&&(o[2][i]=e[i])}}(this);