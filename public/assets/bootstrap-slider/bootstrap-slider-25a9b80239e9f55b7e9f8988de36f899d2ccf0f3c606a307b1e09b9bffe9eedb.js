!function(t,e){var i=function(t){var e={};function i(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(s,o,function(e){return t[e]}.bind(null,o));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=283)}({1:function(t,e){t.exports=window.jQuery},283:function(t,e,i){i(284)},284:function(t,e,i){var s,o,n;function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}
/*! =========================================================
 * bootstrap-slider.js
 *
 * Maintainers:
 *		Kyle Kemp
 *			- Twitter: @seiyria
 *			- Github:  seiyria
 *		Rohit Kalkur
 *			- Twitter: @Rovolutionary
 *			- Github:  rovolution
 *
 * =========================================================
 *
 * bootstrap-slider is released under the MIT License
 * Copyright (c) 2017 Kyle Kemp, Rohit Kalkur, and contributors
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * ========================================================= */var h="object"===("undefined"==typeof window?"undefined":a(window));o=[i(1)],void 0===(n="function"==typeof(s=function(t){var e;return h&&!window.console&&(window.console={}),h&&!window.console.log&&(window.console.log=function(){}),h&&!window.console.warn&&(window.console.warn=function(){}),function(t){"use strict";var e=Array.prototype.slice;function i(){}!function(t){if(t){var s="undefined"==typeof console?i:function(t){console.error(t)};t.bridget=function(i,o){!function(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}(o),function(i,o){t.fn[i]=function(n){if("string"==typeof n){for(var a=e.call(arguments,1),h=0,l=this.length;h<l;h++){var r=this[h],p=t.data(r,i);if(p)if(t.isFunction(p[n])&&"_"!==n.charAt(0)){var d=p[n].apply(p,a);if(void 0!==d&&d!==p)return d}else s("no such method '"+n+"' for "+i+" instance");else s("cannot call methods on "+i+" prior to initialization; attempted to call '"+n+"'")}return this}var c=this.map(function(){var e=t.data(this,i);return e?(e.option(n),e._init()):(e=new o(this,n),t.data(this,i,e)),t(this)});return!c||c.length>1?c:c[0]}}(i,o)},t.bridget}}(t)}(t),function(t){var i,s=function(t){return"Invalid input value '"+t+"' passed in"},o={linear:{toValue:function(t){var e=t/100*(this.options.max-this.options.min),i=!0;if(this.options.ticks_positions.length>0){for(var s,o,n,a=0,h=1;h<this.options.ticks_positions.length;h++)if(t<=this.options.ticks_positions[h]){s=this.options.ticks[h-1],n=this.options.ticks_positions[h-1],o=this.options.ticks[h],a=this.options.ticks_positions[h];break}e=s+(t-n)/(a-n)*(o-s),i=!1}var l=(i?this.options.min:0)+Math.round(e/this.options.step)*this.options.step;return l<this.options.min?this.options.min:l>this.options.max?this.options.max:l},toPercentage:function(t){if(this.options.max===this.options.min)return 0;if(this.options.ticks_positions.length>0){for(var e,i,s,o=0,n=0;n<this.options.ticks.length;n++)if(t<=this.options.ticks[n]){e=n>0?this.options.ticks[n-1]:0,s=n>0?this.options.ticks_positions[n-1]:0,i=this.options.ticks[n],o=this.options.ticks_positions[n];break}if(n>0)return s+(t-e)/(i-e)*(o-s)}return 100*(t-this.options.min)/(this.options.max-this.options.min)}},logarithmic:{toValue:function(t){var e=1-this.options.min,i=Math.log(this.options.min+e),s=Math.log(this.options.max+e),o=Math.exp(i+(s-i)*t/100)-e;return Math.round(o)===s?s:(o=this.options.min+Math.round((o-this.options.min)/this.options.step)*this.options.step)<this.options.min?this.options.min:o>this.options.max?this.options.max:o},toPercentage:function(t){if(this.options.max===this.options.min)return 0;var e=1-this.options.min,i=Math.log(this.options.max+e),s=Math.log(this.options.min+e);return 100*(Math.log(t+e)-s)/(i-s)}}};function n(e,i){this._state={value:null,enabled:null,offset:null,size:null,percentage:null,inDrag:!1,over:!1},this.ticksCallbackMap={},this.handleCallbackMap={},"string"==typeof e?this.element=document.querySelector(e):e instanceof HTMLElement&&(this.element=e),i=i||{};for(var s=Object.keys(this.defaultOptions),n=0;n<s.length;n++){var a=s[n],h=i[a];h=null!==(h=void 0!==h?h:l(this.element,a))?h:this.defaultOptions[a],this.options||(this.options={}),this.options[a]=h}function l(t,e){var i="data-slider-"+e.replace(/_/g,"-"),s=t.getAttribute(i);try{return JSON.parse(s)}catch(t){return s}}"auto"===this.options.rtl&&(this.options.rtl="rtl"===window.getComputedStyle(this.element).direction),"vertical"!==this.options.orientation||"top"!==this.options.tooltip_position&&"bottom"!==this.options.tooltip_position?"horizontal"!==this.options.orientation||"left"!==this.options.tooltip_position&&"right"!==this.options.tooltip_position||(this.options.tooltip_position="top"):this.options.rtl?this.options.tooltip_position="left":this.options.tooltip_position="right";var r,p,d,c,u,m=this.element.style.width,v=!1,_=this.element.parentNode;if(this.sliderElem)v=!0;else{this.sliderElem=document.createElement("div"),this.sliderElem.className="slider";var f=document.createElement("div");f.className="slider-track",(p=document.createElement("div")).className="slider-track-low",(r=document.createElement("div")).className="slider-selection",(d=document.createElement("div")).className="slider-track-high",(c=document.createElement("div")).className="slider-handle min-slider-handle",c.setAttribute("role","slider"),c.setAttribute("aria-valuemin",this.options.min),c.setAttribute("aria-valuemax",this.options.max),(u=document.createElement("div")).className="slider-handle max-slider-handle",u.setAttribute("role","slider"),u.setAttribute("aria-valuemin",this.options.min),u.setAttribute("aria-valuemax",this.options.max),f.appendChild(p),f.appendChild(r),f.appendChild(d),this.rangeHighlightElements=[];var g=this.options.rangeHighlights;if(Array.isArray(g)&&g.length>0)for(var y=0;y<g.length;y++){var b=document.createElement("div"),k=g[y].class||"";b.className="slider-rangeHighlight slider-selection ".concat(k),this.rangeHighlightElements.push(b),f.appendChild(b)}var E=Array.isArray(this.options.labelledby);if(E&&this.options.labelledby[0]&&c.setAttribute("aria-labelledby",this.options.labelledby[0]),E&&this.options.labelledby[1]&&u.setAttribute("aria-labelledby",this.options.labelledby[1]),!E&&this.options.labelledby&&(c.setAttribute("aria-labelledby",this.options.labelledby),u.setAttribute("aria-labelledby",this.options.labelledby)),this.ticks=[],Array.isArray(this.options.ticks)&&this.options.ticks.length>0){for(this.ticksContainer=document.createElement("div"),this.ticksContainer.className="slider-tick-container",n=0;n<this.options.ticks.length;n++){var C=document.createElement("div");if(C.className="slider-tick",this.options.ticks_tooltip){var w=this._addTickListener(),x=w.addMouseEnter(this,C,n),L=w.addMouseLeave(this,C);this.ticksCallbackMap[n]={mouseEnter:x,mouseLeave:L}}this.ticks.push(C),this.ticksContainer.appendChild(C)}r.className+=" tick-slider-selection"}if(this.tickLabels=[],Array.isArray(this.options.ticks_labels)&&this.options.ticks_labels.length>0)for(this.tickLabelContainer=document.createElement("div"),this.tickLabelContainer.className="slider-tick-label-container",n=0;n<this.options.ticks_labels.length;n++){var P=document.createElement("div"),M=0===this.options.ticks_positions.length,T=this.options.reversed&&M?this.options.ticks_labels.length-(n+1):n;P.className="slider-tick-label",P.innerHTML=this.options.ticks_labels[T],this.tickLabels.push(P),this.tickLabelContainer.appendChild(P)}var A=function(t){var e=document.createElement("div");e.className="tooltip-arrow";var i=document.createElement("div");i.className="tooltip-inner",t.appendChild(e),t.appendChild(i)},H=document.createElement("div");H.className="tooltip tooltip-main",H.setAttribute("role","presentation"),A(H);var N=document.createElement("div");N.className="tooltip tooltip-min",N.setAttribute("role","presentation"),A(N);var S=document.createElement("div");S.className="tooltip tooltip-max",S.setAttribute("role","presentation"),A(S),this.sliderElem.appendChild(f),this.sliderElem.appendChild(H),this.sliderElem.appendChild(N),this.sliderElem.appendChild(S),this.tickLabelContainer&&this.sliderElem.appendChild(this.tickLabelContainer),this.ticksContainer&&this.sliderElem.appendChild(this.ticksContainer),this.sliderElem.appendChild(c),this.sliderElem.appendChild(u),_.insertBefore(this.sliderElem,this.element),this.element.style.display="none"}if(t&&(this.$element=t(this.element),this.$sliderElem=t(this.sliderElem)),this.eventToCallbackMap={},this.sliderElem.id=this.options.id,this.touchCapable="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,this.touchX=0,this.touchY=0,this.tooltip=this.sliderElem.querySelector(".tooltip-main"),this.tooltipInner=this.tooltip.querySelector(".tooltip-inner"),this.tooltip_min=this.sliderElem.querySelector(".tooltip-min"),this.tooltipInner_min=this.tooltip_min.querySelector(".tooltip-inner"),this.tooltip_max=this.sliderElem.querySelector(".tooltip-max"),this.tooltipInner_max=this.tooltip_max.querySelector(".tooltip-inner"),o[this.options.scale]&&(this.options.scale=o[this.options.scale]),!0===v&&(this._removeClass(this.sliderElem,"slider-horizontal"),this._removeClass(this.sliderElem,"slider-vertical"),this._removeClass(this.sliderElem,"slider-rtl"),this._removeClass(this.tooltip,"hide"),this._removeClass(this.tooltip_min,"hide"),this._removeClass(this.tooltip_max,"hide"),["left","right","top","width","height"].forEach(function(t){this._removeProperty(this.trackLow,t),this._removeProperty(this.trackSelection,t),this._removeProperty(this.trackHigh,t)},this),[this.handle1,this.handle2].forEach(function(t){this._removeProperty(t,"left"),this._removeProperty(t,"right"),this._removeProperty(t,"top")},this),[this.tooltip,this.tooltip_min,this.tooltip_max].forEach(function(t){this._removeProperty(t,"left"),this._removeProperty(t,"right"),this._removeProperty(t,"top"),this._removeClass(t,"right"),this._removeClass(t,"left"),this._removeClass(t,"top")},this)),"vertical"===this.options.orientation?(this._addClass(this.sliderElem,"slider-vertical"),this.stylePos="top",this.mousePos="pageY",this.sizePos="offsetHeight"):(this._addClass(this.sliderElem,"slider-horizontal"),this.sliderElem.style.width=m,this.options.orientation="horizontal",this.options.rtl?this.stylePos="right":this.stylePos="left",this.mousePos="clientX",this.sizePos="offsetWidth"),this.options.rtl&&this._addClass(this.sliderElem,"slider-rtl"),this._setTooltipPosition(),Array.isArray(this.options.ticks)&&this.options.ticks.length>0&&(this.options.max=Math.max.apply(Math,this.options.ticks),this.options.min=Math.min.apply(Math,this.options.ticks)),Array.isArray(this.options.value)?(this.options.range=!0,this._state.value=this.options.value):this.options.range?this._state.value=[this.options.value,this.options.max]:this._state.value=this.options.value,this.trackLow=p||this.trackLow,this.trackSelection=r||this.trackSelection,this.trackHigh=d||this.trackHigh,"none"===this.options.selection?(this._addClass(this.trackLow,"hide"),this._addClass(this.trackSelection,"hide"),this._addClass(this.trackHigh,"hide")):"after"!==this.options.selection&&"before"!==this.options.selection||(this._removeClass(this.trackLow,"hide"),this._removeClass(this.trackSelection,"hide"),this._removeClass(this.trackHigh,"hide")),this.handle1=c||this.handle1,this.handle2=u||this.handle2,!0===v)for(this._removeClass(this.handle1,"round triangle"),this._removeClass(this.handle2,"round triangle hide"),n=0;n<this.ticks.length;n++)this._removeClass(this.ticks[n],"round triangle hide");if(-1!==["round","triangle","custom"].indexOf(this.options.handle))for(this._addClass(this.handle1,this.options.handle),this._addClass(this.handle2,this.options.handle),n=0;n<this.ticks.length;n++)this._addClass(this.ticks[n],this.options.handle);if(this._state.offset=this._offset(this.sliderElem),this._state.size=this.sliderElem[this.sizePos],this.setValue(this._state.value),this.handle1Keydown=this._keydown.bind(this,0),this.handle1.addEventListener("keydown",this.handle1Keydown,!1),this.handle2Keydown=this._keydown.bind(this,1),this.handle2.addEventListener("keydown",this.handle2Keydown,!1),this.mousedown=this._mousedown.bind(this),this.touchstart=this._touchstart.bind(this),this.touchmove=this._touchmove.bind(this),this.touchCapable){var z=!1;try{var V=Object.defineProperty({},"passive",{get:function(){z=!0}});window.addEventListener("test",null,V)}catch(t){}var D=!!z&&{passive:!0};this.sliderElem.addEventListener("touchstart",this.touchstart,D),this.sliderElem.addEventListener("touchmove",this.touchmove,D)}if(this.sliderElem.addEventListener("mousedown",this.mousedown,!1),this.resize=this._resize.bind(this),window.addEventListener("resize",this.resize,!1),"hide"===this.options.tooltip)this._addClass(this.tooltip,"hide"),this._addClass(this.tooltip_min,"hide"),this._addClass(this.tooltip_max,"hide");else if("always"===this.options.tooltip)this._showTooltip(),this._alwaysShowTooltip=!0;else{if(this.showTooltip=this._showTooltip.bind(this),this.hideTooltip=this._hideTooltip.bind(this),this.options.ticks_tooltip){var O=this._addTickListener(),j=O.addMouseEnter(this,this.handle1),F=O.addMouseLeave(this,this.handle1);this.handleCallbackMap.handle1={mouseEnter:j,mouseLeave:F},j=O.addMouseEnter(this,this.handle2),F=O.addMouseLeave(this,this.handle2),this.handleCallbackMap.handle2={mouseEnter:j,mouseLeave:F}}else this.sliderElem.addEventListener("mouseenter",this.showTooltip,!1),this.sliderElem.addEventListener("mouseleave",this.hideTooltip,!1);this.handle1.addEventListener("focus",this.showTooltip,!1),this.handle1.addEventListener("blur",this.hideTooltip,!1),this.handle2.addEventListener("focus",this.showTooltip,!1),this.handle2.addEventListener("blur",this.hideTooltip,!1)}this.options.enabled?this.enable():this.disable()}(e=function(t,e){return n.call(this,t,e),this}).prototype={_init:function(){},constructor:e,defaultOptions:{id:"",min:0,max:10,step:1,precision:0,orientation:"horizontal",value:5,range:!1,selection:"before",tooltip:"show",tooltip_split:!1,handle:"round",reversed:!1,rtl:"auto",enabled:!0,formatter:function(t){return Array.isArray(t)?t[0]+" : "+t[1]:t},natural_arrow_keys:!1,ticks:[],ticks_positions:[],ticks_labels:[],ticks_snap_bounds:0,ticks_tooltip:!1,scale:"linear",focus:!1,tooltip_position:null,labelledby:null,rangeHighlights:[]},getElement:function(){return this.sliderElem},getValue:function(){return this.options.range?this._state.value:this._state.value[0]},setValue:function(t,e,i){t||(t=0);var s=this.getValue();this._state.value=this._validateInputValue(t);var o=this._applyPrecision.bind(this);this.options.range?(this._state.value[0]=o(this._state.value[0]),this._state.value[1]=o(this._state.value[1]),this._state.value[0]=Math.max(this.options.min,Math.min(this.options.max,this._state.value[0])),this._state.value[1]=Math.max(this.options.min,Math.min(this.options.max,this._state.value[1]))):(this._state.value=o(this._state.value),this._state.value=[Math.max(this.options.min,Math.min(this.options.max,this._state.value))],this._addClass(this.handle2,"hide"),"after"===this.options.selection?this._state.value[1]=this.options.max:this._state.value[1]=this.options.min),this.options.max>this.options.min?this._state.percentage=[this._toPercentage(this._state.value[0]),this._toPercentage(this._state.value[1]),100*this.options.step/(this.options.max-this.options.min)]:this._state.percentage=[0,0,100],this._layout();var n=this.options.range?this._state.value:this._state.value[0];return this._setDataVal(n),!0===e&&this._trigger("slide",n),s!==n&&!0===i&&this._trigger("change",{oldValue:s,newValue:n}),this},destroy:function(){this._removeSliderEventHandlers(),this.sliderElem.parentNode.removeChild(this.sliderElem),this.element.style.display="",this._cleanUpEventCallbacksMap(),this.element.removeAttribute("data"),t&&(this._unbindJQueryEventHandlers(),this.$element.removeData("slider"))},disable:function(){return this._state.enabled=!1,this.handle1.removeAttribute("tabindex"),this.handle2.removeAttribute("tabindex"),this._addClass(this.sliderElem,"slider-disabled"),this._trigger("slideDisabled"),this},enable:function(){return this._state.enabled=!0,this.handle1.setAttribute("tabindex",0),this.handle2.setAttribute("tabindex",0),this._removeClass(this.sliderElem,"slider-disabled"),this._trigger("slideEnabled"),this},toggle:function(){return this._state.enabled?this.disable():this.enable(),this},isEnabled:function(){return this._state.enabled},on:function(t,e){return this._bindNonQueryEventHandler(t,e),this},off:function(e,i){t?(this.$element.off(e,i),this.$sliderElem.off(e,i)):this._unbindNonQueryEventHandler(e,i)},getAttribute:function(t){return t?this.options[t]:this.options},setAttribute:function(t,e){return this.options[t]=e,this},refresh:function(){return this._removeSliderEventHandlers(),n.call(this,this.element,this.options),t&&t.data(this.element,"slider",this),this},relayout:function(){return this._resize(),this},_removeSliderEventHandlers:function(){if(this.handle1.removeEventListener("keydown",this.handle1Keydown,!1),this.handle2.removeEventListener("keydown",this.handle2Keydown,!1),this.options.ticks_tooltip){for(var t=this.ticksContainer.getElementsByClassName("slider-tick"),e=0;e<t.length;e++)t[e].removeEventListener("mouseenter",this.ticksCallbackMap[e].mouseEnter,!1),t[e].removeEventListener("mouseleave",this.ticksCallbackMap[e].mouseLeave,!1);this.handle1.removeEventListener("mouseenter",this.handleCallbackMap.handle1.mouseEnter,!1),this.handle2.removeEventListener("mouseenter",this.handleCallbackMap.handle2.mouseEnter,!1),this.handle1.removeEventListener("mouseleave",this.handleCallbackMap.handle1.mouseLeave,!1),this.handle2.removeEventListener("mouseleave",this.handleCallbackMap.handle2.mouseLeave,!1)}this.handleCallbackMap=null,this.ticksCallbackMap=null,this.showTooltip&&(this.handle1.removeEventListener("focus",this.showTooltip,!1),this.handle2.removeEventListener("focus",this.showTooltip,!1)),this.hideTooltip&&(this.handle1.removeEventListener("blur",this.hideTooltip,!1),this.handle2.removeEventListener("blur",this.hideTooltip,!1)),this.showTooltip&&this.sliderElem.removeEventListener("mouseenter",this.showTooltip,!1),this.hideTooltip&&this.sliderElem.removeEventListener("mouseleave",this.hideTooltip,!1),this.sliderElem.removeEventListener("touchstart",this.touchstart,!1),this.sliderElem.removeEventListener("touchmove",this.touchmove,!1),this.sliderElem.removeEventListener("mousedown",this.mousedown,!1),window.removeEventListener("resize",this.resize,!1)},_bindNonQueryEventHandler:function(t,e){void 0===this.eventToCallbackMap[t]&&(this.eventToCallbackMap[t]=[]),this.eventToCallbackMap[t].push(e)},_unbindNonQueryEventHandler:function(t,e){var i=this.eventToCallbackMap[t];if(void 0!==i)for(var s=0;s<i.length;s++)if(i[s]===e){i.splice(s,1);break}},_cleanUpEventCallbacksMap:function(){for(var t=Object.keys(this.eventToCallbackMap),e=0;e<t.length;e++){var i=t[e];delete this.eventToCallbackMap[i]}},_showTooltip:function(){!1===this.options.tooltip_split?(this._addClass(this.tooltip,"in"),this.tooltip_min.style.display="none",this.tooltip_max.style.display="none"):(this._addClass(this.tooltip_min,"in"),this._addClass(this.tooltip_max,"in"),this.tooltip.style.display="none"),this._state.over=!0},_hideTooltip:function(){!1===this._state.inDrag&&!0!==this.alwaysShowTooltip&&(this._removeClass(this.tooltip,"in"),this._removeClass(this.tooltip_min,"in"),this._removeClass(this.tooltip_max,"in")),this._state.over=!1},_setToolTipOnMouseOver:function(t){var e=this.options.formatter(t?t.value[0]:this._state.value[0]),i=s(t||this._state,this.options.reversed);function s(t,e){return e?[100-t.percentage[0],this.options.range?100-t.percentage[1]:t.percentage[1]]:[t.percentage[0],t.percentage[1]]}this._setText(this.tooltipInner,e),this.tooltip.style[this.stylePos]="".concat(i[0],"%")},_addTickListener:function(){return{addMouseEnter:function(t,e,i){var s=function(){var e=t._state,s=i>=0?i:this.attributes["aria-valuenow"].value,o=parseInt(s,10);e.value[0]=o,e.percentage[0]=t.options.ticks_positions[o],t._setToolTipOnMouseOver(e),t._showTooltip()};return e.addEventListener("mouseenter",s,!1),s},addMouseLeave:function(t,e){var i=function(){t._hideTooltip()};return e.addEventListener("mouseleave",i,!1),i}}},_layout:function(){var t,e;if(t=this.options.reversed?[100-this._state.percentage[0],this.options.range?100-this._state.percentage[1]:this._state.percentage[1]]:[this._state.percentage[0],this._state.percentage[1]],this.handle1.style[this.stylePos]="".concat(t[0],"%"),this.handle1.setAttribute("aria-valuenow",this._state.value[0]),isNaN(this.options.formatter(this._state.value[0]))&&this.handle1.setAttribute("aria-valuetext",this.options.formatter(this._state.value[0])),this.handle2.style[this.stylePos]="".concat(t[1],"%"),this.handle2.setAttribute("aria-valuenow",this._state.value[1]),isNaN(this.options.formatter(this._state.value[1]))&&this.handle2.setAttribute("aria-valuetext",this.options.formatter(this._state.value[1])),this.rangeHighlightElements.length>0&&Array.isArray(this.options.rangeHighlights)&&this.options.rangeHighlights.length>0)for(var i=0;i<this.options.rangeHighlights.length;i++){var s=this._toPercentage(this.options.rangeHighlights[i].start),o=this._toPercentage(this.options.rangeHighlights[i].end);if(this.options.reversed){var n=100-o;o=100-s,s=n}var a=this._createHighlightRange(s,o);a?"vertical"===this.options.orientation?(this.rangeHighlightElements[i].style.top="".concat(a.start,"%"),this.rangeHighlightElements[i].style.height="".concat(a.size,"%")):(this.options.rtl?this.rangeHighlightElements[i].style.right="".concat(a.start,"%"):this.rangeHighlightElements[i].style.left="".concat(a.start,"%"),this.rangeHighlightElements[i].style.width="".concat(a.size,"%")):this.rangeHighlightElements[i].style.display="none"}if(Array.isArray(this.options.ticks)&&this.options.ticks.length>0){var h,l="vertical"===this.options.orientation?"height":"width";h="vertical"===this.options.orientation?"marginTop":this.options.rtl?"marginRight":"marginLeft";var r=this._state.size/(this.options.ticks.length-1);if(this.tickLabelContainer){var p=0;if(0===this.options.ticks_positions.length)"vertical"!==this.options.orientation&&(this.tickLabelContainer.style[h]="".concat(-r/2,"px")),p=this.tickLabelContainer.offsetHeight;else for(d=0;d<this.tickLabelContainer.childNodes.length;d++)this.tickLabelContainer.childNodes[d].offsetHeight>p&&(p=this.tickLabelContainer.childNodes[d].offsetHeight);"horizontal"===this.options.orientation&&(this.sliderElem.style.marginBottom="".concat(p,"px"))}for(var d=0;d<this.options.ticks.length;d++){var c=this.options.ticks_positions[d]||this._toPercentage(this.options.ticks[d]);this.options.reversed&&(c=100-c),this.ticks[d].style[this.stylePos]="".concat(c,"%"),this._removeClass(this.ticks[d],"in-selection"),this.options.range?c>=t[0]&&c<=t[1]&&this._addClass(this.ticks[d],"in-selection"):"after"===this.options.selection&&c>=t[0]?this._addClass(this.ticks[d],"in-selection"):"before"===this.options.selection&&c<=t[0]&&this._addClass(this.ticks[d],"in-selection"),this.tickLabels[d]&&(this.tickLabels[d].style[l]="".concat(r,"px"),"vertical"!==this.options.orientation&&void 0!==this.options.ticks_positions[d]?(this.tickLabels[d].style.position="absolute",this.tickLabels[d].style[this.stylePos]="".concat(c,"%"),this.tickLabels[d].style[h]=-r/2+"px"):"vertical"===this.options.orientation&&(this.options.rtl?this.tickLabels[d].style.marginRight="".concat(this.sliderElem.offsetWidth,"px"):this.tickLabels[d].style.marginLeft="".concat(this.sliderElem.offsetWidth,"px"),this.tickLabelContainer.style[h]=this.sliderElem.offsetWidth/2*-1+"px"))}}if(this.options.range){e=this.options.formatter(this._state.value),this._setText(this.tooltipInner,e),this.tooltip.style[this.stylePos]="".concat((t[1]+t[0])/2,"%");var u=this.options.formatter(this._state.value[0]);this._setText(this.tooltipInner_min,u);var m=this.options.formatter(this._state.value[1]);this._setText(this.tooltipInner_max,m),this.tooltip_min.style[this.stylePos]="".concat(t[0],"%"),this.tooltip_max.style[this.stylePos]="".concat(t[1],"%")}else e=this.options.formatter(this._state.value[0]),this._setText(this.tooltipInner,e),this.tooltip.style[this.stylePos]="".concat(t[0],"%");if("vertical"===this.options.orientation)this.trackLow.style.top="0",this.trackLow.style.height=Math.min(t[0],t[1])+"%",this.trackSelection.style.top=Math.min(t[0],t[1])+"%",this.trackSelection.style.height=Math.abs(t[0]-t[1])+"%",this.trackHigh.style.bottom="0",this.trackHigh.style.height=100-Math.min(t[0],t[1])-Math.abs(t[0]-t[1])+"%";else{"right"===this.stylePos?this.trackLow.style.right="0":this.trackLow.style.left="0",this.trackLow.style.width=Math.min(t[0],t[1])+"%","right"===this.stylePos?this.trackSelection.style.right=Math.min(t[0],t[1])+"%":this.trackSelection.style.left=Math.min(t[0],t[1])+"%",this.trackSelection.style.width=Math.abs(t[0]-t[1])+"%","right"===this.stylePos?this.trackHigh.style.left="0":this.trackHigh.style.right="0",this.trackHigh.style.width=100-Math.min(t[0],t[1])-Math.abs(t[0]-t[1])+"%";var v=this.tooltip_min.getBoundingClientRect(),_=this.tooltip_max.getBoundingClientRect();"bottom"===this.options.tooltip_position?v.right>_.left?(this._removeClass(this.tooltip_max,"bottom"),this._addClass(this.tooltip_max,"top"),this.tooltip_max.style.top="",this.tooltip_max.style.bottom="22px"):(this._removeClass(this.tooltip_max,"top"),this._addClass(this.tooltip_max,"bottom"),this.tooltip_max.style.top=this.tooltip_min.style.top,this.tooltip_max.style.bottom=""):v.right>_.left?(this._removeClass(this.tooltip_max,"top"),this._addClass(this.tooltip_max,"bottom"),this.tooltip_max.style.top="18px"):(this._removeClass(this.tooltip_max,"bottom"),this._addClass(this.tooltip_max,"top"),this.tooltip_max.style.top=this.tooltip_min.style.top)}},_createHighlightRange:function(t,e){return this._isHighlightRange(t,e)?t>e?{start:e,size:t-e}:{start:t,size:e-t}:null},_isHighlightRange:function(t,e){return 0<=t&&t<=100&&0<=e&&e<=100},_resize:function(t){this._state.offset=this._offset(this.sliderElem),this._state.size=this.sliderElem[this.sizePos],this._layout()},_removeProperty:function(t,e){t.style.removeProperty?t.style.removeProperty(e):t.style.removeAttribute(e)},_mousedown:function(t){if(!this._state.enabled)return!1;t.preventDefault&&t.preventDefault(),this._state.offset=this._offset(this.sliderElem),this._state.size=this.sliderElem[this.sizePos];var e=this._getPercentage(t);if(this.options.range){var i=Math.abs(this._state.percentage[0]-e),s=Math.abs(this._state.percentage[1]-e);this._state.dragged=i<s?0:1,this._adjustPercentageForRangeSliders(e)}else this._state.dragged=0;this._state.percentage[this._state.dragged]=e,this._layout(),this.touchCapable&&(document.removeEventListener("touchmove",this.mousemove,!1),document.removeEventListener("touchend",this.mouseup,!1)),this.mousemove&&document.removeEventListener("mousemove",this.mousemove,!1),this.mouseup&&document.removeEventListener("mouseup",this.mouseup,!1),this.mousemove=this._mousemove.bind(this),this.mouseup=this._mouseup.bind(this),this.touchCapable&&(document.addEventListener("touchmove",this.mousemove,!1),document.addEventListener("touchend",this.mouseup,!1)),document.addEventListener("mousemove",this.mousemove,!1),document.addEventListener("mouseup",this.mouseup,!1),this._state.inDrag=!0;var o=this._calculateValue();return this._trigger("slideStart",o),this._setDataVal(o),this.setValue(o,!1,!0),t.returnValue=!1,this.options.focus&&this._triggerFocusOnHandle(this._state.dragged),!0},_touchstart:function(t){if(void 0!==t.changedTouches){var e=t.changedTouches[0];this.touchX=e.pageX,this.touchY=e.pageY}else this._mousedown(t)},_triggerFocusOnHandle:function(t){0===t&&this.handle1.focus(),1===t&&this.handle2.focus()},_keydown:function(t,e){if(!this._state.enabled)return!1;var i;switch(e.keyCode){case 37:case 40:i=-1;break;case 39:case 38:i=1}if(i){if(this.options.natural_arrow_keys){var s="vertical"===this.options.orientation&&!this.options.reversed,o="horizontal"===this.options.orientation&&this.options.reversed;(s||o)&&(i=-i)}var n=this._state.value[t]+i*this.options.step,a=n/this.options.max*100;return this._state.keyCtrl=t,this.options.range&&(this._adjustPercentageForRangeSliders(a),n=[this._state.keyCtrl?this._state.value[0]:n,this._state.keyCtrl?n:this._state.value[1]]),this._trigger("slideStart",n),this._setDataVal(n),this.setValue(n,!0,!0),this._setDataVal(n),this._trigger("slideStop",n),this._layout(),this._pauseEvent(e),delete this._state.keyCtrl,!1}},_pauseEvent:function(t){t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault(),t.cancelBubble=!0,t.returnValue=!1},_mousemove:function(t){if(!this._state.enabled)return!1;var e=this._getPercentage(t);this._adjustPercentageForRangeSliders(e),this._state.percentage[this._state.dragged]=e,this._layout();var i=this._calculateValue(!0);return this.setValue(i,!0,!0),!1},_touchmove:function(t){if(void 0!==t.changedTouches){var e=t.changedTouches[0],i=e.pageX-this.touchX,s=e.pageY-this.touchY;this._state.inDrag||("vertical"===this.options.orientation&&i<=5&&i>=-5&&(s>=15||s<=-15)?this._mousedown(t):s<=5&&s>=-5&&(i>=15||i<=-15)&&this._mousedown(t))}},_adjustPercentageForRangeSliders:function(t){if(this.options.range){var e=this._getNumDigitsAfterDecimalPlace(t);e=e?e-1:0;var i=this._applyToFixedAndParseFloat(t,e);0===this._state.dragged&&this._applyToFixedAndParseFloat(this._state.percentage[1],e)<i?(this._state.percentage[0]=this._state.percentage[1],this._state.dragged=1):1===this._state.dragged&&this._applyToFixedAndParseFloat(this._state.percentage[0],e)>i?(this._state.percentage[1]=this._state.percentage[0],this._state.dragged=0):0===this._state.keyCtrl&&this._state.value[1]/this.options.max*100<t?(this._state.percentage[0]=this._state.percentage[1],this._state.keyCtrl=1,this.handle2.focus()):1===this._state.keyCtrl&&this._state.value[0]/this.options.max*100>t&&(this._state.percentage[1]=this._state.percentage[0],this._state.keyCtrl=0,this.handle1.focus())}},_mouseup:function(){if(!this._state.enabled)return!1;this.touchCapable&&(document.removeEventListener("touchmove",this.mousemove,!1),document.removeEventListener("touchend",this.mouseup,!1)),document.removeEventListener("mousemove",this.mousemove,!1),document.removeEventListener("mouseup",this.mouseup,!1),this._state.inDrag=!1,!1===this._state.over&&this._hideTooltip();var t=this._calculateValue(!0);return this._layout(),this._setDataVal(t),this._trigger("slideStop",t),this._state.dragged=null,!1},_calculateValue:function(t){var e;if(this.options.range?(e=[this.options.min,this.options.max],0!==this._state.percentage[0]&&(e[0]=this._toValue(this._state.percentage[0]),e[0]=this._applyPrecision(e[0])),100!==this._state.percentage[1]&&(e[1]=this._toValue(this._state.percentage[1]),e[1]=this._applyPrecision(e[1]))):(e=this._toValue(this._state.percentage[0]),e=parseFloat(e),e=this._applyPrecision(e)),t){for(var i=[e,1/0],s=0;s<this.options.ticks.length;s++){var o=Math.abs(this.options.ticks[s]-e);o<=i[1]&&(i=[this.options.ticks[s],o])}if(i[1]<=this.options.ticks_snap_bounds)return i[0]}return e},_applyPrecision:function(t){var e=this.options.precision||this._getNumDigitsAfterDecimalPlace(this.options.step);return this._applyToFixedAndParseFloat(t,e)},_getNumDigitsAfterDecimalPlace:function(t){var e=(""+t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return e?Math.max(0,(e[1]?e[1].length:0)-(e[2]?+e[2]:0)):0},_applyToFixedAndParseFloat:function(t,e){var i=t.toFixed(e);return parseFloat(i)},_getPercentage:function(t){!this.touchCapable||"touchstart"!==t.type&&"touchmove"!==t.type||(t=t.touches[0]);var e=t[this.mousePos]-this._state.offset[this.stylePos];"right"===this.stylePos&&(e=-e);var i=e/this._state.size*100;return i=Math.round(i/this._state.percentage[2])*this._state.percentage[2],this.options.reversed&&(i=100-i),Math.max(0,Math.min(100,i))},_validateInputValue:function(t){if(isNaN(+t)){if(Array.isArray(t))return this._validateArray(t),t;throw new Error(s(t))}return+t},_validateArray:function(t){for(var e=0;e<t.length;e++){var i=t[e];if("number"!=typeof i)throw new Error(s(i))}},_setDataVal:function(t){this.element.setAttribute("data-value",t),this.element.setAttribute("value",t),this.element.value=t},_trigger:function(e,i){i=i||0===i?i:void 0;var s=this.eventToCallbackMap[e];if(s&&s.length)for(var o=0;o<s.length;o++)(0,s[o])(i);t&&this._triggerJQueryEvent(e,i)},_triggerJQueryEvent:function(t,e){var i={type:t,value:e};this.$element.trigger(i),this.$sliderElem.trigger(i)},_unbindJQueryEventHandlers:function(){this.$element.off(),this.$sliderElem.off()},_setText:function(t,e){void 0!==t.textContent?t.textContent=e:void 0!==t.innerText&&(t.innerText=e)},_removeClass:function(t,e){for(var i=e.split(" "),s=t.className,o=0;o<i.length;o++){var n=i[o],a=new RegExp("(?:\\s|^)"+n+"(?:\\s|$)");s=s.replace(a," ")}t.className=s.trim()},_addClass:function(t,e){for(var i=e.split(" "),s=t.className,o=0;o<i.length;o++){var n=i[o];new RegExp("(?:\\s|^)"+n+"(?:\\s|$)").test(s)||(s+=" "+n)}t.className=s.trim()},_offsetLeft:function(t){return t.getBoundingClientRect().left},_offsetRight:function(t){return t.getBoundingClientRect().right},_offsetTop:function(t){for(var e=t.offsetTop;(t=t.offsetParent)&&!isNaN(t.offsetTop);)e+=t.offsetTop,"BODY"!==t.tagName&&(e-=t.scrollTop);return e},_offset:function(t){return{left:this._offsetLeft(t),right:this._offsetRight(t),top:this._offsetTop(t)}},_css:function(e,i,s){if(t)t.style(e,i,s);else{var o=i.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(t,e){return e.toUpperCase()});e.style[o]=s}},_toValue:function(t){return this.options.scale.toValue.apply(this,[t])},_toPercentage:function(t){return this.options.scale.toPercentage.apply(this,[t])},_setTooltipPosition:function(){var t=[this.tooltip,this.tooltip_min,this.tooltip_max];if("vertical"===this.options.orientation){var e,i="left"===(e=this.options.tooltip_position?this.options.tooltip_position:this.options.rtl?"left":"right")?"right":"left";t.forEach(function(t){this._addClass(t,e),t.style[i]="100%"}.bind(this))}else"bottom"===this.options.tooltip_position?t.forEach(function(t){this._addClass(t,"bottom"),t.style.top="22px"}.bind(this)):t.forEach(function(t){this._addClass(t,"top"),t.style.top=-this.tooltip.outerHeight-14+"px"}.bind(this))}},t&&t.fn&&(t.fn.slider?(h&&window.console.warn("bootstrap-slider.js - WARNING: $.fn.slider namespace is already bound. Use the $.fn.bootstrapSlider namespace instead."),i="bootstrapSlider"):(t.bridget("slider",e),i="slider"),t.bridget("bootstrapSlider",e),t(function(){t("input[data-provide=slider]")[i]()}))}(t),e})?s.apply(e,o):s)||(t.exports=n)}});if("object"==typeof i){var s=["object"==typeof module&&"object"==typeof module.exports?module.exports:null,"undefined"!=typeof window?window:null,t&&t!==window?t:null];for(var o in i)s[0]&&(s[0][o]=i[o]),s[1]&&"__esModule"!==o&&(s[1][o]=i[o]),s[2]&&(s[2][o]=i[o])}}(this);
