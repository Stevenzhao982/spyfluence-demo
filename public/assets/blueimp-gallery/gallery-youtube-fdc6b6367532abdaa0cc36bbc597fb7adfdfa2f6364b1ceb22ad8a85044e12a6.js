!function(e){var t=function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var o={};return t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)t.d(n,r,function(t){return e[t]}.bind(null,r));return n},t.n=function(e){var o=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=224)}({1:function(e){e.exports=window.jQuery},224:function(e,t,o){o(225)},225:function(e,t,o){var n,r,i;!function(){"use strict";r=[o(1),o(3)],void 0===(i="function"==typeof(n=function(e,t){if(!window.postMessage)return t;e.extend(t.prototype.options,{youTubeVideoIdProperty:"youtube",youTubePlayerVars:{wmode:"transparent"},youTubeClickToPlay:!0});var o=t.prototype.textFactory||t.prototype.imageFactory,n=function(e,t,o){this.videoId=e,this.playerVars=t,this.clickToPlay=o,this.element=document.createElement("div"),this.listeners={}};return e.extend(n.prototype,{canPlayType:function(){return!0},on:function(e,t){return this.listeners[e]=t,this},loadAPI:function(){var e,t=this,o=window.onYouTubeIframeAPIReady,n="//www.youtube.com/iframe_api",r=document.getElementsByTagName("script"),i=r.length;for(window.onYouTubeIframeAPIReady=function(){o&&o.apply(this),t.playOnReady&&t.play()};i;)if(r[i-=1].src===n)return;(e=document.createElement("script")).src=n,r[0].parentNode.insertBefore(e,r[0])},onReady:function(){this.ready=!0,this.playOnReady&&this.play()},onPlaying:function(){this.playStatus<2&&(this.listeners.playing(),this.playStatus=2)},onPause:function(){t.prototype.setTimeout.call(this,this.checkSeek,null,2e3)},checkSeek:function(){this.stateChange!==YT.PlayerState.PAUSED&&this.stateChange!==YT.PlayerState.ENDED||(this.listeners.pause(),delete this.playStatus)},onStateChange:function(e){switch(e.data){case YT.PlayerState.PLAYING:this.hasPlayed=!0,this.onPlaying();break;case YT.PlayerState.PAUSED:case YT.PlayerState.ENDED:this.onPause()}this.stateChange=e.data},onError:function(e){this.listeners.error(e)},play:function(){var e=this;this.playStatus||(this.listeners.play(),this.playStatus=1),this.ready?!this.hasPlayed&&(this.clickToPlay||window.navigator&&/iP(hone|od|ad)/.test(window.navigator.platform))?this.onPlaying():this.player.playVideo():(this.playOnReady=!0,window.YT&&YT.Player?this.player||(this.player=new YT.Player(this.element,{videoId:this.videoId,playerVars:this.playerVars,events:{onReady:function(){e.onReady()},onStateChange:function(t){e.onStateChange(t)},onError:function(t){e.onError(t)}}})):this.loadAPI())},pause:function(){this.ready?this.player.pauseVideo():this.playStatus&&(delete this.playOnReady,this.listeners.pause(),delete this.playStatus)}}),e.extend(t.prototype,{YouTubePlayer:n,textFactory:function(e,t){var r=this.options,i=this.getItemProperty(e,r.youTubeVideoIdProperty);return i?(void 0===this.getItemProperty(e,r.urlProperty)&&(e[r.urlProperty]="//www.youtube.com/watch?v="+i),void 0===this.getItemProperty(e,r.videoPosterProperty)&&(e[r.videoPosterProperty]="//img.youtube.com/vi/"+i+"/maxresdefault.jpg"),this.videoFactory(e,t,new n(i,r.youTubePlayerVars,r.youTubeClickToPlay))):o.call(this,e,t)}}),t})?n.apply(t,r):n)||(e.exports=i)}()},3:function(e){e.exports=window.blueimpGallery}});if("object"==typeof t){var o=["object"==typeof module&&"object"==typeof module.exports?module.exports:null,"undefined"!=typeof window?window:null,e&&e!==window?e:null];for(var n in t)o[0]&&(o[0][n]=t[n]),o[1]&&"__esModule"!==n&&(o[1][n]=t[n]),o[2]&&(o[2][n]=t[n])}}(this);