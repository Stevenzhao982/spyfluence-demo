!function(e){var t=function(e){function t(o){if(n[o])return n[o].exports;var a=n[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)t.d(o,a,function(t){return e[t]}.bind(null,a));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=241)}({241:function(e,t,n){n(242)},242:function(){!function(e){"use strict";e.event.special.destroyed||(e.event.special.destroyed={remove:function(e){e.handler&&e.handler()}}),e.fn.extend({maxlength:function(t,n){function o(e){var n=e.val();return n=t.twoCharLinebreak?n.replace(/\r(?!\n)|\n(?!\r)/g,"\r\n"):n.replace(new RegExp("\r?\n","g"),"\n"),t.utf8?function(e){for(var t=0,n=0;n<e.length;n++){var o=e.charCodeAt(n);o<128?t++:t+=o>127&&o<2048?2:3}return t}(n):n.length}function a(e,t){return t-o(e)}function r(e,t){t.css({display:"block"}),e.trigger("maxlength.shown")}function s(e,n,o){var a="";return t.message?a="function"==typeof t.message?t.message(e,n):t.message.replace("%charsTyped%",o).replace("%charsRemaining%",n-o).replace("%charsTotal%",n):(t.preText&&(a+=t.preText),t.showCharsTyped?a+=o:a+=n-o,t.showMaxLength&&(a+=t.separator+n),t.postText&&(a+=t.postText)),a}function i(e,n,a,i){i&&(i.html(s(n.val(),a,a-e)),e>0?function(e,n,a){var r=!0;return!t.alwaysShow&&a-o(e)>n&&(r=!1),r}(n,t.threshold,a)?r(n,i.removeClass(t.limitReachedClass).addClass(t.warningClass)):function(e){i.css({display:"none"}),e.trigger("maxlength.hidden")}(n):r(n,i.removeClass(t.warningClass).addClass(t.limitReachedClass))),t.allowOverMax&&(e<0?n.addClass("overmax"):n.removeClass("overmax"))}function l(n,o){var a=function(t){var n=t[0];return e.extend({},"function"==typeof n.getBoundingClientRect?n.getBoundingClientRect():{width:n.offsetWidth,height:n.offsetHeight},t.offset())}(n);if("function"!==e.type(t.placement))if(e.isPlainObject(t.placement))!function(n,o){if(n&&o){var a={};e.each(["top","bottom","left","right","position"],function(e,n){var o=t.placement[n];void 0!==o&&(a[n]=o)}),o.css(a)}}(t.placement,o);else{var r=n.outerWidth(),s=o.outerWidth(),i=o.width(),l=o.height();switch(t.appendToParent&&(a.top-=n.parent().offset().top,a.left-=n.parent().offset().left),t.placement){case"bottom":o.css({top:a.top+a.height,left:a.left+a.width/2-i/2});break;case"top":o.css({top:a.top-l,left:a.left+a.width/2-i/2});break;case"left":o.css({top:a.top+a.height/2-l/2,left:a.left-i});break;case"right":o.css({top:a.top+a.height/2-l/2,left:a.left+a.width});break;case"bottom-right":o.css({top:a.top+a.height,left:a.left+a.width});break;case"top-right":o.css({top:a.top-l,left:a.left+r});break;case"top-left":o.css({top:a.top-l,left:a.left-s});break;case"bottom-left":o.css({top:a.top+n.outerHeight(),left:a.left-s});break;case"centered-right":o.css({top:a.top+l/2,left:a.left+r-s-3});break;case"bottom-right-inside":o.css({top:a.top+a.height,left:a.left+a.width-s});break;case"top-right-inside":o.css({top:a.top-l,left:a.left+r-s});break;case"top-left-inside":o.css({top:a.top-l,left:a.left});break;case"bottom-left-inside":o.css({top:a.top+n.outerHeight(),left:a.left})}}else t.placement(n,o,a)}function c(e){var n="maxlength";return t.allowOverMax&&(n="data-bs-mxl"),e.attr(n)||e.attr("size")}var f=e("body");return e.isFunction(t)&&!n&&(n=t,t={}),t=e.extend({showOnReady:!1,alwaysShow:!1,threshold:10,warningClass:"label label-success",limitReachedClass:"label label-important label-danger",separator:" / ",preText:"",postText:"",showMaxLength:!0,placement:"bottom",message:null,showCharsTyped:!0,validate:!1,utf8:!1,appendToParent:!1,twoCharLinebreak:!0,allowOverMax:!1},t),this.each(function(){function n(){var n=s(p.val(),o,"0");o=c(p),r||(r=e('<span class="bootstrap-maxlength"></span>').css({display:"none",position:"absolute",whiteSpace:"nowrap",zIndex:1099}).html(n)),p.is("textarea")&&(p.data("maxlenghtsizex",p.outerWidth()),p.data("maxlenghtsizey",p.outerHeight()),p.mouseup(function(){p.outerWidth()===p.data("maxlenghtsizex")&&p.outerHeight()===p.data("maxlenghtsizey")||l(p,r),p.data("maxlenghtsizex",p.outerWidth()),p.data("maxlenghtsizey",p.outerHeight())})),t.appendToParent?(p.parent().append(r),p.parent().css("position","relative")):f.append(r),i(a(p,c(p)),p,o,r),l(p,r)}var o,r,p=e(this);e(window).resize(function(){r&&l(p,r)}),t.allowOverMax&&(e(this).attr("data-bs-mxl",e(this).attr("maxlength")),e(this).removeAttr("maxlength")),t.showOnReady?p.ready(function(){n()}):p.focus(function(){n()}),p.on("maxlength.reposition",function(){l(p,r)}),p.on("destroyed",function(){r&&r.remove()}),p.on("blur",function(){r&&!t.showOnReady&&r.remove()}),p.on("input",function(){var e=c(p),n=a(p,e),s=!0;return t.validate&&n<0?(function(e,n){var o=e.val(),a=0;t.twoCharLinebreak&&"\n"===(o=o.replace(/\r(?!\n)|\n(?!\r)/g,"\r\n")).substr(o.length-1)&&o.length%2==1&&(a=1),e.val(o.substr(0,n-a))}(p,e),s=!1):i(n,p,o,r),"bottom-right-inside"!==t.placement&&"top-right-inside"!==t.placement||l(p,r),s})})}})}(jQuery)}});if("object"==typeof t){var n=["object"==typeof module&&"object"==typeof module.exports?module.exports:null,"undefined"!=typeof window?window:null,e&&e!==window?e:null];for(var o in t)n[0]&&(n[0][o]=t[o]),n[1]&&"__esModule"!==o&&(n[1][o]=t[o]),n[2]&&(n[2][o]=t[o])}}(this);