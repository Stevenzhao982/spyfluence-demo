!function(t){var i=function(s){function n(t){if(e[t])return e[t].exports;var i=e[t]={i:t,l:!1,exports:{}};return s[t].call(i.exports,i,i.exports,n),i.l=!0,i.exports}var e={};return n.m=s,n.c=e,n.d=function(t,i,s){n.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(i,t){if(1&t&&(i=n(i)),8&t)return i;if(4&t&&"object"==typeof i&&i&&i.__esModule)return i;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:i}),2&t&&"string"!=typeof i)for(var e in i)n.d(s,e,function(t){return i[t]}.bind(null,e));return s},n.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="",n(n.s=458)}({458:function(t,i,s){s(459),s(460)},459:function(){!function(w){"use strict";var e={slide:0,delay:5e3,loop:!0,preload:!1,preloadImage:!1,preloadVideo:!1,timer:!0,overlay:!1,autoplay:!0,shuffle:!1,cover:!0,color:null,align:"center",valign:"center",firstTransition:null,firstTransitionDuration:null,transition:"fade",transitionDuration:1e3,transitionRegister:[],animation:null,animationDuration:"auto",animationRegister:[],slidesToKeep:1,init:function(){},play:function(){},pause:function(){},walk:function(){},slides:[]},n={},t=function(t,i){this.elmt=t,this.settings=w.extend({},e,w.vegas.defaults,i),this.slide=this.settings.slide,this.total=this.settings.slides.length,this.noshow=this.total<2,this.paused=!this.settings.autoplay||this.noshow,this.ended=!1,this.$elmt=w(t),this.$timer=null,this.$overlay=null,this.$slide=null,this.timeout=null,this.first=!0,this.transitions=["fade","fade2","blur","blur2","flash","flash2","negative","negative2","burn","burn2","slideLeft","slideLeft2","slideRight","slideRight2","slideUp","slideUp2","slideDown","slideDown2","zoomIn","zoomIn2","zoomOut","zoomOut2","swirlLeft","swirlLeft2","swirlRight","swirlRight2"],this.animations=["kenburns","kenburnsLeft","kenburnsRight","kenburnsUp","kenburnsUpLeft","kenburnsUpRight","kenburnsDown","kenburnsDownLeft","kenburnsDownRight"],this.settings.transitionRegister instanceof Array==0&&(this.settings.transitionRegister=[this.settings.transitionRegister]),this.settings.animationRegister instanceof Array==0&&(this.settings.animationRegister=[this.settings.animationRegister]),this.transitions=this.transitions.concat(this.settings.transitionRegister),this.animations=this.animations.concat(this.settings.animationRegister),this.support={objectFit:"objectFit"in document.body.style,transition:"transition"in document.body.style||"WebkitTransition"in document.body.style,video:w.vegas.isVideoCompatible()},!0===this.settings.shuffle&&this.shuffle(),this._init()};t.prototype={_init:function(){var t,i,s,e="BODY"===this.elmt.tagName,n=this.settings.timer,o=this.settings.overlay,r=this;this._preload(),e||(this.$elmt.css("height",this.$elmt.css("height")),t=w('<div class="vegas-wrapper">').css("overflow",this.$elmt.css("overflow")).css("padding",this.$elmt.css("padding")),this.$elmt.css("padding")||t.css("padding-top",this.$elmt.css("padding-top")).css("padding-bottom",this.$elmt.css("padding-bottom")).css("padding-left",this.$elmt.css("padding-left")).css("padding-right",this.$elmt.css("padding-right")),this.$elmt.clone(!0).children().appendTo(t),this.elmt.innerHTML=""),n&&this.support.transition&&(s=w('<div class="vegas-timer"><div class="vegas-timer-progress">'),this.$timer=s,this.$elmt.prepend(s)),o&&(i=w('<div class="vegas-overlay">'),"string"==typeof o&&i.css("background-image","url("+o+")"),this.$overlay=i,this.$elmt.prepend(i)),this.$elmt.addClass("vegas-container"),e||this.$elmt.append(t),setTimeout(function(){r.trigger("init"),r._goto(r.slide),r.settings.autoplay&&r.trigger("play")},1)},_preload:function(){var t;for(t=0;t<this.settings.slides.length;t++)(this.settings.preload||this.settings.preloadImages)&&this.settings.slides[t].src&&((new Image).src=this.settings.slides[t].src),(this.settings.preload||this.settings.preloadVideos)&&this.support.video&&this.settings.slides[t].video&&(this.settings.slides[t].video instanceof Array?this._video(this.settings.slides[t].video):this._video(this.settings.slides[t].video.src))},_random:function(t){return t[Math.floor(Math.random()*t.length)]},_slideShow:function(){var t=this;1<this.total&&!this.ended&&!this.paused&&!this.noshow&&(this.timeout=setTimeout(function(){t.next()},this._options("delay")))},_timer:function(t){var i=this;clearTimeout(this.timeout),this.$timer&&(this.$timer.removeClass("vegas-timer-running").find("div").css("transition-duration","0ms"),this.ended||this.paused||this.noshow||t&&setTimeout(function(){i.$timer.addClass("vegas-timer-running").find("div").css("transition-duration",i._options("delay")-100+"ms")},100))},_video:function(t){var i,s,e=t.toString();return n[e]?n[e]:(t instanceof Array==0&&(t=[t]),(i=document.createElement("video")).preload=!0,t.forEach(function(t){(s=document.createElement("source")).src=t,i.appendChild(s)}),n[e]=i)},_fadeOutSound:function(t,i){var s=this,e=i/10,n=t.volume-.09;0<n?(t.volume=n,setTimeout(function(){s._fadeOutSound(t,i)},e)):t.pause()},_fadeInSound:function(t,i){var s=this,e=i/10,n=t.volume+.09;n<1&&(t.volume=n,setTimeout(function(){s._fadeInSound(t,i)},e))},_options:function(t,i){return void 0===i&&(i=this.slide),void 0!==this.settings.slides[i][t]?this.settings.slides[i][t]:this.settings[t]},_goto:function(t){function i(){p._timer(!0),setTimeout(function(){v&&(p.support.transition?(a.css("transition","all "+y+"ms").addClass("vegas-transition-"+v+"-out"),a.each(function(){var t=a.find("video").get(0);t&&(t.volume=1,p._fadeOutSound(t,y))}),s.css("transition","all "+y+"ms").addClass("vegas-transition-"+v+"-in")):s.fadeIn(y));for(var t=0;t<a.length-p.settings.slidesToKeep;t++)a.eq(t).remove();p.trigger("walk"),p._slideShow()},100)}void 0===this.settings.slides[t]&&(t=0),this.slide=t;var s,e,n,o,r,a=this.$elmt.children(".vegas-slide"),l=this.settings.slides[t].src,h=this.settings.slides[t].video,d=this._options("delay"),u=this._options("align"),c=this._options("valign"),g=this._options("cover"),f=this._options("color")||this.$elmt.css("background-color"),p=this,m=a.length,v=this._options("transition"),y=this._options("transitionDuration"),b=this._options("animation"),_=this._options("animationDuration");this.settings.firstTransition&&this.first&&(v=this.settings.firstTransition||v),this.settings.firstTransitionDuration&&this.first&&(y=this.settings.firstTransitionDuration||y),this.first&&(this.first=!1),"repeat"!==g&&(!0===g?g="cover":!1===g&&(g="contain")),("random"===v||v instanceof Array)&&(v=v instanceof Array?this._random(v):this._random(this.transitions)),("random"===b||b instanceof Array)&&(b=b instanceof Array?this._random(b):this._random(this.animations)),("auto"===y||d<y)&&(y=d),"auto"===_&&(_=d),s=w('<div class="vegas-slide"></div>'),this.support.transition&&v&&s.addClass("vegas-transition-"+v),this.support.video&&h?((o=h instanceof Array?this._video(h):this._video(h.src)).loop=void 0===h.loop||h.loop,o.muted=void 0===h.mute||h.mute,!1===o.muted?(o.volume=0,this._fadeInSound(o,y)):o.pause(),n=w(o).addClass("vegas-video").css("background-color",f),this.support.objectFit?n.css("object-position",u+" "+c).css("object-fit",g).css("width","100%").css("height","100%"):"contain"===g&&n.css("width","100%").css("height","100%"),s.append(n)):(r=new Image,e=w('<div class="vegas-slide-inner"></div>').css("background-image",'url("'+l+'")').css("background-color",f).css("background-position",u+" "+c),"repeat"===g?e.css("background-repeat","repeat"):e.css("background-size",g),this.support.transition&&b&&e.addClass("vegas-animation-"+b).css("animation-duration",_+"ms"),s.append(e)),this.support.transition||s.css("display","none"),m?a.eq(m-1).after(s):this.$elmt.prepend(s),a.css("transition","all 0ms").each(function(){this.className="vegas-slide","VIDEO"===this.tagName&&(this.className+=" vegas-video"),v&&(this.className+=" vegas-transition-"+v,this.className+=" vegas-transition-"+v+"-in")}),p._timer(!1),o?(4===o.readyState&&(o.currentTime=0),o.play(),i()):(r.src=l,r.complete?i():r.onload=i)},_end:function(){this.settings.autoplay?this.ended=!1:this.ended=!0,this._timer(!1),this.trigger("end")},shuffle:function(){for(var t,i,s=this.total-1;0<s;s--)i=Math.floor(Math.random()*(s+1)),t=this.settings.slides[s],this.settings.slides[s]=this.settings.slides[i],this.settings.slides[i]=t},play:function(){this.paused&&(this.paused=!1,this.next(),this.trigger("play"))},pause:function(){this._timer(!1),this.paused=!0,this.trigger("pause")},toggle:function(){this.paused?this.play():this.pause()},playing:function(){return!this.paused&&!this.noshow},current:function(t){return t?{slide:this.slide,data:this.settings.slides[this.slide]}:this.slide},jump:function(t){t<0||t>this.total-1||t===this.slide||(this.slide=t,this._goto(this.slide))},next:function(){if(this.slide++,this.slide>=this.total){if(!this.settings.loop)return this._end();this.slide=0}this._goto(this.slide)},previous:function(){if(this.slide--,this.slide<0){if(!this.settings.loop)return void this.slide++;this.slide=this.total-1}this._goto(this.slide)},trigger:function(t){var i=[];i="init"===t?[this.settings]:[this.slide,this.settings.slides[this.slide]],this.$elmt.trigger("vegas"+t,i),"function"==typeof this.settings[t]&&this.settings[t].apply(this.$elmt,i)},options:function(t,i){var s=this.settings.slides.slice();if("object"==typeof t)this.settings=w.extend({},e,w.vegas.defaults,t);else{if("string"!=typeof t)return this.settings;if(void 0===i)return this.settings[t];this.settings[t]=i}this.settings.slides!==s&&(this.total=this.settings.slides.length,this.noshow=this.total<2,this._preload())},destroy:function(){clearTimeout(this.timeout),this.$elmt.removeClass("vegas-container"),this.$elmt.find("> .vegas-slide").remove(),this.$elmt.find("> .vegas-wrapper").clone(!0).children().appendTo(this.$elmt),this.$elmt.find("> .vegas-wrapper").remove(),this.settings.timer&&this.$timer.remove(),this.settings.overlay&&this.$overlay.remove(),this.elmt._vegas=null}},w.fn.vegas=function(i){var s,e=arguments,n=!1;if(void 0===i||"object"==typeof i)return this.each(function(){this._vegas||(this._vegas=new t(this,i))});if("string"==typeof i){if(this.each(function(){var t=this._vegas;if(!t)throw new Error("No Vegas applied to this element.");"function"==typeof t[i]&&"_"!==i[0]?s=t[i].apply(t,[].slice.call(e,1)):n=!0}),n)throw new Error('No method "'+i+'" in Vegas.');return void 0!==s?s:this}},w.vegas={},w.vegas.defaults=e,w.vegas.isVideoCompatible=function(){return!/(Android|webOS|Phone|iPad|iPod|BlackBerry|Windows Phone)/i.test(navigator.userAgent)}}(window.jQuery||window.Zepto)},460:function(){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=$.fn.vegas;$.fn.vegas=function(){for(var t=arguments.length,i=new Array(t),s=0;s<t;s++)i[s]=arguments[s];var e=o.apply(this,i);return void 0!==i[0]&&"object"!==n(i[0])||this.each(function(){"BODY"!==this.tagName.toUpperCase()&&this._vegas&&$(this).css("height","")}),e}}});if("object"==typeof i){var s=["object"==typeof module&&"object"==typeof module.exports?module.exports:null,"undefined"!=typeof window?window:null,t&&t!==window?t:null];for(var e in i)s[0]&&(s[0][e]=i[e]),s[1]&&"__esModule"!==e&&(s[1][e]=i[e]),s[2]&&(s[2][e]=i[e])}}(this);