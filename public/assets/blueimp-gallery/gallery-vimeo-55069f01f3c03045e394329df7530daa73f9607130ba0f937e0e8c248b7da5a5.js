!function(e){var t=function(i){function o(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return i[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}var n={};return o.m=i,o.c=n,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,function(e){return t[e]}.bind(null,n));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=222)}({1:function(e){e.exports=window.jQuery},222:function(e,t,i){i(223)},223:function(e,t,i){var n,o,r;!function(){"use strict";o=[i(1),i(3)],void 0===(r="function"==typeof(n=function(l,e){if(!window.postMessage)return e;l.extend(e.prototype.options,{vimeoVideoIdProperty:"vimeo",vimeoPlayerUrl:"//player.vimeo.com/video/VIDEO_ID?api=1&player_id=PLAYER_ID",vimeoPlayerIdPrefix:"vimeo-player-",vimeoClickToPlay:!0});var o=e.prototype.textFactory||e.prototype.imageFactory,r=function(e,t,i,n){this.url=e,this.videoId=t,this.playerId=i,this.clickToPlay=n,this.element=document.createElement("div"),this.listeners={}},a=0;return l.extend(r.prototype,{canPlayType:function(){return!0},on:function(e,t){return this.listeners[e]=t,this},loadAPI:function(){function e(){!i&&n.playOnReady&&n.play(),i=!0}for(var t,i,n=this,o="//f.vimeocdn.com/js/froogaloop2.min.js",r=document.getElementsByTagName("script"),a=r.length;a;)if(r[a-=1].src===o){t=r[a];break}t||((t=document.createElement("script")).src=o),l(t).on("load",e),r[0].parentNode.insertBefore(t,r[0]),/loaded|complete/.test(t.readyState)&&e()},onReady:function(){var e=this;this.ready=!0,this.player.addEvent("play",function(){e.hasPlayed=!0,e.onPlaying()}),this.player.addEvent("pause",function(){e.onPause()}),this.player.addEvent("finish",function(){e.onPause()}),this.playOnReady&&this.play()},onPlaying:function(){this.playStatus<2&&(this.listeners.playing(),this.playStatus=2)},onPause:function(){this.listeners.pause(),delete this.playStatus},insertIframe:function(){var e=document.createElement("iframe");e.src=this.url.replace("VIDEO_ID",this.videoId).replace("PLAYER_ID",this.playerId),e.id=this.playerId,this.element.parentNode.replaceChild(e,this.element),this.element=e},play:function(){var e=this;this.playStatus||(this.listeners.play(),this.playStatus=1),this.ready?!this.hasPlayed&&(this.clickToPlay||window.navigator&&/iP(hone|od|ad)/.test(window.navigator.platform))?this.onPlaying():this.player.api("play"):(this.playOnReady=!0,window.$f?this.player||(this.insertIframe(),this.player=$f(this.element),this.player.addEvent("ready",function(){e.onReady()})):this.loadAPI())},pause:function(){this.ready?this.player.api("pause"):this.playStatus&&(delete this.playOnReady,this.listeners.pause(),delete this.playStatus)}}),l.extend(e.prototype,{VimeoPlayer:r,textFactory:function(e,t){var i=this.options,n=this.getItemProperty(e,i.vimeoVideoIdProperty);return n?(void 0===this.getItemProperty(e,i.urlProperty)&&(e[i.urlProperty]="//vimeo.com/"+n),a+=1,this.videoFactory(e,t,new r(i.vimeoPlayerUrl,n,i.vimeoPlayerIdPrefix+a,i.vimeoClickToPlay))):o.call(this,e,t)}}),e})?n.apply(t,o):n)||(e.exports=r)}()},3:function(e){e.exports=window.blueimpGallery}});if("object"==typeof t){var i=["object"==typeof module&&"object"==typeof module.exports?module.exports:null,"undefined"!=typeof window?window:null,e&&e!==window?e:null];for(var n in t)i[0]&&(i[0][n]=t[n]),i[1]&&"__esModule"!==n&&(i[1][n]=t[n]),i[2]&&(i[2][n]=t[n])}}(this);