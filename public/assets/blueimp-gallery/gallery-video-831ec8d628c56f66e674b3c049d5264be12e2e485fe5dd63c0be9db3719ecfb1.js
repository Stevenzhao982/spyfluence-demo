!function(e){var t=function(o){function r(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return o[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}var n={};return r.m=o,r.c=n,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(o,n,function(e){return t[e]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=220)}({1:function(e){e.exports=window.jQuery},220:function(e,t,o){o(221)},221:function(e,t,o){var n,r,i;!function(){"use strict";r=[o(1),o(3)],void 0===(i="function"==typeof(n=function(C,e){C.extend(e.prototype.options,{videoContentClass:"video-content",videoLoadingClass:"video-loading",videoPlayingClass:"video-playing",videoPosterProperty:"poster",videoSourcesProperty:"sources"});var t=e.prototype.handleSlide;return C.extend(e.prototype,{handleSlide:function(e){t.call(this,e),this.playingVideo&&this.playingVideo.pause()},videoFactory:function(e,t,o){var n,r,i,s,l,a=this,p=this.options,d=this.elementPrototype.cloneNode(!1),u=C(d),c=[{type:"error",target:d}],y=o||document.createElement("video"),f=this.getItemProperty(e,p.urlProperty),v=this.getItemProperty(e,p.typeProperty),g=this.getItemProperty(e,p.titleProperty),m=this.getItemProperty(e,this.options.altTextProperty)||g,P=this.getItemProperty(e,p.videoPosterProperty),h=this.getItemProperty(e,p.videoSourcesProperty);if(u.addClass(p.videoContentClass),g&&(d.title=g),y.canPlayType)if(f&&v&&y.canPlayType(v))y.src=f;else if(h)for(;h.length;)if(r=h.shift(),f=this.getItemProperty(r,p.urlProperty),v=this.getItemProperty(r,p.typeProperty),f&&v&&y.canPlayType(v)){y.src=f;break}return P&&(y.poster=P,n=this.imagePrototype.cloneNode(!1),C(n).addClass(p.toggleClass),n.src=P,n.draggable=!1,n.alt=m,d.appendChild(n)),(i=document.createElement("a")).setAttribute("target","_blank"),o||i.setAttribute("download",g),i.href=f,y.src&&(y.controls=!0,(o||C(y)).on("error",function(){a.setTimeout(t,c)}).on("pause",function(){y.seeking||(s=!1,u.removeClass(a.options.videoLoadingClass).removeClass(a.options.videoPlayingClass),l&&a.container.addClass(a.options.controlsClass),delete a.playingVideo,a.interval&&a.play())}).on("playing",function(){s=!1,u.removeClass(a.options.videoLoadingClass).addClass(a.options.videoPlayingClass),a.container.hasClass(a.options.controlsClass)?(l=!0,a.container.removeClass(a.options.controlsClass)):l=!1}).on("play",function(){window.clearTimeout(a.timeout),s=!0,u.addClass(a.options.videoLoadingClass),a.playingVideo=y}),C(i).on("click",function(e){a.preventDefault(e),s?y.pause():y.play()}),d.appendChild(o&&o.element||y)),d.appendChild(i),this.setTimeout(t,[{type:"load",target:d}]),d}}),e})?n.apply(t,r):n)||(e.exports=i)}()},3:function(e){e.exports=window.blueimpGallery}});if("object"==typeof t){var o=["object"==typeof module&&"object"==typeof module.exports?module.exports:null,"undefined"!=typeof window?window:null,e&&e!==window?e:null];for(var n in t)o[0]&&(o[0][n]=t[n]),o[1]&&"__esModule"!==n&&(o[1][n]=t[n]),o[2]&&(o[2][n]=t[n])}}(this);