!function(t,i){var e=function(t){var i={};function e(s){if(i[s])return i[s].exports;var o=i[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var o in t)e.d(s,o,function(i){return t[i]}.bind(null,o));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=226)}({1:function(t,i){t.exports=window.jQuery},226:function(t,i,e){"use strict";e.r(i);var s=e(6);if(e.n(s),e.d(i,"blueimpGallery",function(){return s}),"rtl"===$("html").attr("dir")||"rtl"===$("body").attr("dir")){var o=s.prototype.translateX;s.prototype.translateX=function(t,i,e){i=this.touchStart&&this.touchStart.x?i:-1*i,o.call(this,t,i,0,e)},s.prototype.positionSlide=function(t){var i=this.slides[t];i.style.width=this.slideWidth+"px",this.support.transform&&(i.style.right=t*-this.slideWidth+"px",this.move(t,this.index>t?-this.slideWidth:this.index<t?this.slideWidth:0,0))},s.prototype.ontouchstart=function(){},s.prototype.ontouchmove=function(){},s.prototype.ontouchend=function(){},s.prototype.ontouchcancel=function(){}}},6:function(t,i,e){var s,o,n;!function(l){"use strict";o=[e(1)],void 0===(n="function"==typeof(s=function(t){function i(t,e){return void 0===document.body.style.maxHeight?null:this&&this.options===i.prototype.options?void(t&&t.length?(this.list=t,this.num=t.length,this.initOptions(e),this.initialize()):this.console.log("blueimp Gallery: No or empty list provided as first argument.",t)):new i(t,e)}return t.extend(i.prototype,{options:{container:"#blueimp-gallery",slidesContainer:"div",titleElement:"h3",displayClass:"blueimp-gallery-display",controlsClass:"blueimp-gallery-controls",singleClass:"blueimp-gallery-single",leftEdgeClass:"blueimp-gallery-left",rightEdgeClass:"blueimp-gallery-right",playingClass:"blueimp-gallery-playing",slideClass:"slide",slideLoadingClass:"slide-loading",slideErrorClass:"slide-error",slideContentClass:"slide-content",toggleClass:"toggle",prevClass:"prev",nextClass:"next",closeClass:"close",playPauseClass:"play-pause",typeProperty:"type",titleProperty:"title",altTextProperty:"alt",urlProperty:"href",srcsetProperty:"urlset",displayTransition:!0,clearSlides:!0,stretchImages:!1,toggleControlsOnReturn:!0,toggleControlsOnSlideClick:!0,toggleSlideshowOnSpace:!0,enableKeyboardNavigation:!0,closeOnEscape:!0,closeOnSlideClick:!0,closeOnSwipeUpOrDown:!0,emulateTouchEvents:!0,stopTouchEventsPropagation:!1,hidePageScrollbars:!0,disableScroll:!0,carousel:!1,continuous:!0,unloadElements:!0,startSlideshow:!1,slideshowInterval:5e3,index:0,preloadRange:2,transitionSpeed:400,slideshowTransitionSpeed:void 0,event:void 0,onopen:void 0,onopened:void 0,onslide:void 0,onslideend:void 0,onslidecomplete:void 0,onclose:void 0,onclosed:void 0},carouselOptions:{hidePageScrollbars:!1,toggleControlsOnReturn:!1,toggleSlideshowOnSpace:!1,enableKeyboardNavigation:!1,closeOnEscape:!1,closeOnSlideClick:!1,closeOnSwipeUpOrDown:!1,disableScroll:!1,startSlideshow:!0},console:window.console&&"function"==typeof window.console.log?window.console:{log:function(){}},support:function(i){var e,s={touch:void 0!==window.ontouchstart||window.DocumentTouch&&document instanceof DocumentTouch},o={webkitTransition:{end:"webkitTransitionEnd",prefix:"-webkit-"},MozTransition:{end:"transitionend",prefix:"-moz-"},OTransition:{end:"otransitionend",prefix:"-o-"},transition:{end:"transitionend",prefix:""}};for(e in o)if(o.hasOwnProperty(e)&&void 0!==i.style[e]){s.transition=o[e],s.transition.name=e;break}function n(){var t,e,o=s.transition;document.body.appendChild(i),o&&(t=o.name.slice(0,-9)+"ransform",void 0!==i.style[t]&&(i.style[t]="translateZ(0)",e=window.getComputedStyle(i).getPropertyValue(o.prefix+"transform"),s.transform={prefix:o.prefix,name:t,translate:!0,translateZ:!!e&&"none"!==e})),void 0!==i.style.backgroundSize&&(s.backgroundSize={},i.style.backgroundSize="contain",s.backgroundSize.contain="contain"===window.getComputedStyle(i).getPropertyValue("background-size"),i.style.backgroundSize="cover",s.backgroundSize.cover="cover"===window.getComputedStyle(i).getPropertyValue("background-size")),document.body.removeChild(i)}return document.body?n():t(document).on("DOMContentLoaded",n),s}(document.createElement("div")),requestAnimationFrame:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,cancelAnimationFrame:window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame,initialize:function(){if(this.initStartIndex(),!1===this.initWidget())return!1;this.initEventListeners(),this.onslide(this.index),this.ontransitionend(),this.options.startSlideshow&&this.play()},slide:function(t,i){window.clearTimeout(this.timeout);var e,s,o,n=this.index;if(n!==t&&1!==this.num){if(i||(i=this.options.transitionSpeed),this.support.transform){for(this.options.continuous||(t=this.circle(t)),e=Math.abs(n-t)/(n-t),this.options.continuous&&(s=e,(e=-this.positions[this.circle(t)]/this.slideWidth)!==s&&(t=-e*this.num+t)),o=Math.abs(n-t)-1;o;)o-=1,this.move(this.circle((t>n?t:n)-o-1),this.slideWidth*e,0);t=this.circle(t),this.move(n,this.slideWidth*e,i),this.move(t,0,i),this.options.continuous&&this.move(this.circle(t-e),-this.slideWidth*e,0)}else t=this.circle(t),this.animate(n*-this.slideWidth,t*-this.slideWidth,i);this.onslide(t)}},getIndex:function(){return this.index},getNumber:function(){return this.num},prev:function(){(this.options.continuous||this.index)&&this.slide(this.index-1)},next:function(){(this.options.continuous||this.index<this.num-1)&&this.slide(this.index+1)},play:function(t){var i=this;window.clearTimeout(this.timeout),this.interval=t||this.options.slideshowInterval,this.elements[this.index]>1&&(this.timeout=this.setTimeout(!this.requestAnimationFrame&&this.slide||function(t,e){i.animationFrameId=i.requestAnimationFrame.call(window,function(){i.slide(t,e)})},[this.index+1,this.options.slideshowTransitionSpeed],this.interval)),this.container.addClass(this.options.playingClass)},pause:function(){window.clearTimeout(this.timeout),this.interval=null,this.cancelAnimationFrame&&(this.cancelAnimationFrame.call(window,this.animationFrameId),this.animationFrameId=null),this.container.removeClass(this.options.playingClass)},add:function(t){var i;for(t.concat||(t=Array.prototype.slice.call(t)),this.list.concat||(this.list=Array.prototype.slice.call(this.list)),this.list=this.list.concat(t),this.num=this.list.length,this.num>2&&null===this.options.continuous&&(this.options.continuous=!0,this.container.removeClass(this.options.leftEdgeClass)),this.container.removeClass(this.options.rightEdgeClass).removeClass(this.options.singleClass),i=this.num-t.length;i<this.num;i+=1)this.addSlide(i),this.positionSlide(i);this.positions.length=this.num,this.initSlides(!0)},resetSlides:function(){this.slidesContainer.empty(),this.unloadAllSlides(),this.slides=[]},handleClose:function(){var t=this.options;this.destroyEventListeners(),this.pause(),this.container[0].style.display="none",this.container.removeClass(t.displayClass).removeClass(t.singleClass).removeClass(t.leftEdgeClass).removeClass(t.rightEdgeClass),t.hidePageScrollbars&&(document.body.style.overflow=this.bodyOverflowStyle),this.options.clearSlides&&this.resetSlides(),this.options.onclosed&&this.options.onclosed.call(this)},close:function(){var t=this;this.options.onclose&&this.options.onclose.call(this),this.support.transition&&this.options.displayTransition?(this.container.on(this.support.transition.end,function i(e){e.target===t.container[0]&&(t.container.off(t.support.transition.end,i),t.handleClose())}),this.container.removeClass(this.options.displayClass)):this.handleClose()},circle:function(t){return(this.num+t%this.num)%this.num},move:function(t,i,e){this.translateX(t,i,e),this.positions[t]=i},translate:function(t,i,e,s){var o=this.slides[t].style,n=this.support.transition,l=this.support.transform;o[n.name+"Duration"]=s+"ms",o[l.name]="translate("+i+"px, "+e+"px)"+(l.translateZ?" translateZ(0)":"")},translateX:function(t,i,e){this.translate(t,i,0,e)},translateY:function(t,i,e){this.translate(t,0,i,e)},animate:function(t,i,e){if(e)var s=this,o=(new Date).getTime(),n=window.setInterval(function(){var l=(new Date).getTime()-o;if(l>e)return s.slidesContainer[0].style.left=i+"px",s.ontransitionend(),void window.clearInterval(n);s.slidesContainer[0].style.left=(i-t)*(Math.floor(l/e*100)/100)+t+"px"},4);else this.slidesContainer[0].style.left=i+"px"},preventDefault:function(t){t.preventDefault?t.preventDefault():t.returnValue=!1},stopPropagation:function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0},onresize:function(){this.initSlides(!0)},onmousedown:function(t){t.which&&1===t.which&&"VIDEO"!==t.target.nodeName&&"AUDIO"!==t.target.nodeName&&(t.preventDefault(),(t.originalEvent||t).touches=[{pageX:t.pageX,pageY:t.pageY}],this.ontouchstart(t))},onmousemove:function(t){this.touchStart&&((t.originalEvent||t).touches=[{pageX:t.pageX,pageY:t.pageY}],this.ontouchmove(t))},onmouseup:function(t){this.touchStart&&(this.ontouchend(t),delete this.touchStart)},onmouseout:function(i){if(this.touchStart){var e=i.target,s=i.relatedTarget;s&&(s===e||t.contains(e,s))||this.onmouseup(i)}},ontouchstart:function(t){this.options.stopTouchEventsPropagation&&this.stopPropagation(t);var i=(t.originalEvent||t).touches[0];this.touchStart={x:i.pageX,y:i.pageY,time:Date.now()},this.isScrolling=void 0,this.touchDelta={}},ontouchmove:function(t){this.options.stopTouchEventsPropagation&&this.stopPropagation(t);var i,e,s=(t.originalEvent||t).touches[0],o=(t.originalEvent||t).scale,n=this.index;if(!(s.length>1||o&&1!==o))if(this.options.disableScroll&&t.preventDefault(),this.touchDelta={x:s.pageX-this.touchStart.x,y:s.pageY-this.touchStart.y},i=this.touchDelta.x,void 0===this.isScrolling&&(this.isScrolling=this.isScrolling||Math.abs(i)<Math.abs(this.touchDelta.y)),this.isScrolling)this.translateY(n,this.touchDelta.y+this.positions[n],0);else for(t.preventDefault(),window.clearTimeout(this.timeout),this.options.continuous?e=[this.circle(n+1),n,this.circle(n-1)]:(this.touchDelta.x=i/=!n&&i>0||n===this.num-1&&i<0?Math.abs(i)/this.slideWidth+1:1,e=[n],n&&e.push(n-1),n<this.num-1&&e.unshift(n+1));e.length;)n=e.pop(),this.translateX(n,i+this.positions[n],0)},ontouchend:function(t){this.options.stopTouchEventsPropagation&&this.stopPropagation(t);var i,e,s,o,n,l=this.index,r=this.options.transitionSpeed,a=this.slideWidth,h=Number(Date.now()-this.touchStart.time)<250,d=h&&Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.x)>a/2,c=!l&&this.touchDelta.x>0||l===this.num-1&&this.touchDelta.x<0,u=!d&&this.options.closeOnSwipeUpOrDown&&(h&&Math.abs(this.touchDelta.y)>20||Math.abs(this.touchDelta.y)>this.slideHeight/2);this.options.continuous&&(c=!1),i=this.touchDelta.x<0?-1:1,this.isScrolling?u?this.close():this.translateY(l,0,r):d&&!c?(e=l+i,s=l-i,o=a*i,n=-a*i,this.options.continuous?(this.move(this.circle(e),o,0),this.move(this.circle(l-2*i),n,0)):e>=0&&e<this.num&&this.move(e,o,0),this.move(l,this.positions[l]+o,r),this.move(this.circle(s),this.positions[this.circle(s)]+o,r),l=this.circle(s),this.onslide(l)):this.options.continuous?(this.move(this.circle(l-1),-a,r),this.move(l,0,r),this.move(this.circle(l+1),a,r)):(l&&this.move(l-1,-a,r),this.move(l,0,r),l<this.num-1&&this.move(l+1,a,r))},ontouchcancel:function(t){this.touchStart&&(this.ontouchend(t),delete this.touchStart)},ontransitionend:function(t){var i=this.slides[this.index];t&&i!==t.target||(this.interval&&this.play(),this.setTimeout(this.options.onslideend,[this.index,i]))},oncomplete:function(i){var e,s=i.target||i.srcElement,o=s&&s.parentNode;s&&o&&(e=this.getNodeIndex(o),t(o).removeClass(this.options.slideLoadingClass),"error"===i.type?(t(o).addClass(this.options.slideErrorClass),this.elements[e]=3):this.elements[e]=2,s.clientHeight>this.container[0].clientHeight&&(s.style.maxHeight=this.container[0].clientHeight),this.interval&&this.slides[this.index]===o&&this.play(),this.setTimeout(this.options.onslidecomplete,[e,o]))},onload:function(t){this.oncomplete(t)},onerror:function(t){this.oncomplete(t)},onkeydown:function(t){switch(t.which||t.keyCode){case 13:this.options.toggleControlsOnReturn&&(this.preventDefault(t),this.toggleControls());break;case 27:this.options.closeOnEscape&&(this.close(),t.stopImmediatePropagation());break;case 32:this.options.toggleSlideshowOnSpace&&(this.preventDefault(t),this.toggleSlideshow());break;case 37:this.options.enableKeyboardNavigation&&(this.preventDefault(t),this.prev());break;case 39:this.options.enableKeyboardNavigation&&(this.preventDefault(t),this.next())}},handleClick:function(i){var e=this.options,s=i.target||i.srcElement,o=s.parentNode;function n(i){return t(s).hasClass(i)||t(o).hasClass(i)}n(e.toggleClass)?(this.preventDefault(i),this.toggleControls()):n(e.prevClass)?(this.preventDefault(i),this.prev()):n(e.nextClass)?(this.preventDefault(i),this.next()):n(e.closeClass)?(this.preventDefault(i),this.close()):n(e.playPauseClass)?(this.preventDefault(i),this.toggleSlideshow()):o===this.slidesContainer[0]?e.closeOnSlideClick?(this.preventDefault(i),this.close()):e.toggleControlsOnSlideClick&&(this.preventDefault(i),this.toggleControls()):o.parentNode&&o.parentNode===this.slidesContainer[0]&&e.toggleControlsOnSlideClick&&(this.preventDefault(i),this.toggleControls())},onclick:function(t){if(!(this.options.emulateTouchEvents&&this.touchDelta&&(Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.y)>20)))return this.handleClick(t);delete this.touchDelta},updateEdgeClasses:function(t){t?this.container.removeClass(this.options.leftEdgeClass):this.container.addClass(this.options.leftEdgeClass),t===this.num-1?this.container.addClass(this.options.rightEdgeClass):this.container.removeClass(this.options.rightEdgeClass)},handleSlide:function(t){this.options.continuous||this.updateEdgeClasses(t),this.loadElements(t),this.options.unloadElements&&this.unloadElements(t),this.setTitle(t)},onslide:function(t){this.index=t,this.handleSlide(t),this.setTimeout(this.options.onslide,[t,this.slides[t]])},setTitle:function(t){var i=this.slides[t].firstChild,e=i.title||i.alt,s=this.titleElement;s.length&&(this.titleElement.empty(),e&&s[0].appendChild(document.createTextNode(e)))},setTimeout:function(t,i,e){var s=this;return t&&window.setTimeout(function(){t.apply(s,i||[])},e||0)},imageFactory:function(i,e){var s,o,n,l,r=this,a=this.imagePrototype.cloneNode(!1),h=i,d=this.options.stretchImages;return"string"!=typeof h&&(h=this.getItemProperty(i,this.options.urlProperty),n=this.getItemProperty(i,this.options.titleProperty),l=this.getItemProperty(i,this.options.altTextProperty)||n),!0===d&&(d="contain"),(d=this.support.backgroundSize&&this.support.backgroundSize[d]&&d)?o=this.elementPrototype.cloneNode(!1):(o=a,a.draggable=!1),n&&(o.title=n),l&&(o.alt=l),t(a).on("load error",function i(n){if(!s){if(n={type:n.type,target:o},!o.parentNode)return r.setTimeout(i,[n]);s=!0,t(a).off("load error",i),d&&"load"===n.type&&(o.style.background='url("'+h+'") center no-repeat',o.style.backgroundSize=d),e(n)}}),a.src=h,o},createElement:function(i,e){var s=i&&this.getItemProperty(i,this.options.typeProperty),o=s&&this[s.split("/")[0]+"Factory"]||this.imageFactory,n=i&&o.call(this,i,e),l=this.getItemProperty(i,this.options.srcsetProperty);return n||(n=this.elementPrototype.cloneNode(!1),this.setTimeout(e,[{type:"error",target:n}])),l&&n.setAttribute("srcset",l),t(n).addClass(this.options.slideContentClass),n},loadElement:function(i){this.elements[i]||(this.slides[i].firstChild?this.elements[i]=t(this.slides[i]).hasClass(this.options.slideErrorClass)?3:2:(this.elements[i]=1,t(this.slides[i]).addClass(this.options.slideLoadingClass),this.slides[i].appendChild(this.createElement(this.list[i],this.proxyListener))))},loadElements:function(t){var i,e=Math.min(this.num,2*this.options.preloadRange+1),s=t;for(i=0;i<e;i+=1)s+=i*(i%2==0?-1:1),s=this.circle(s),this.loadElement(s)},unloadElements:function(t){var i,e;for(i in this.elements)this.elements.hasOwnProperty(i)&&(e=Math.abs(t-i))>this.options.preloadRange&&e+this.options.preloadRange<this.num&&(this.unloadSlide(i),delete this.elements[i])},addSlide:function(t){var i=this.slidePrototype.cloneNode(!1);i.setAttribute("data-index",t),this.slidesContainer[0].appendChild(i),this.slides.push(i)},positionSlide:function(t){var i=this.slides[t];i.style.width=this.slideWidth+"px",this.support.transform&&(i.style.left=t*-this.slideWidth+"px",this.move(t,this.index>t?-this.slideWidth:this.index<t?this.slideWidth:0,0))},initSlides:function(i){var e,s;for(i||(this.positions=[],this.positions.length=this.num,this.elements={},this.imagePrototype=document.createElement("img"),this.elementPrototype=document.createElement("div"),this.slidePrototype=document.createElement("div"),t(this.slidePrototype).addClass(this.options.slideClass),this.slides=this.slidesContainer[0].children,e=this.options.clearSlides||this.slides.length!==this.num),this.slideWidth=this.container[0].clientWidth,this.slideHeight=this.container[0].clientHeight,this.slidesContainer[0].style.width=this.num*this.slideWidth+"px",e&&this.resetSlides(),s=0;s<this.num;s+=1)e&&this.addSlide(s),this.positionSlide(s);this.options.continuous&&this.support.transform&&(this.move(this.circle(this.index-1),-this.slideWidth,0),this.move(this.circle(this.index+1),this.slideWidth,0)),this.support.transform||(this.slidesContainer[0].style.left=this.index*-this.slideWidth+"px")},unloadSlide:function(t){var i,e;null!==(e=(i=this.slides[t]).firstChild)&&i.removeChild(e)},unloadAllSlides:function(){var t,i;for(t=0,i=this.slides.length;t<i;t++)this.unloadSlide(t)},toggleControls:function(){var t=this.options.controlsClass;this.container.hasClass(t)?this.container.removeClass(t):this.container.addClass(t)},toggleSlideshow:function(){this.interval?this.pause():this.play()},getNodeIndex:function(t){return parseInt(t.getAttribute("data-index"),10)},getNestedProperty:function(t,i){return i.replace(/\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,function(i,e,s,o,n){var l=n||e||s||o&&parseInt(o,10);i&&t&&(t=t[l])}),t},getDataProperty:function(i,e){var s,o;if(i.dataset?(s=e.replace(/-([a-z])/g,function(t,i){return i.toUpperCase()}),o=i.dataset[s]):i.getAttribute&&(o=i.getAttribute("data-"+e.replace(/([A-Z])/g,"-$1").toLowerCase())),"string"==typeof o){if(/^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/.test(o))try{return t.parseJSON(o)}catch(t){}return o}},getItemProperty:function(t,i){var e=this.getDataProperty(t,i);return void 0===e&&(e=t[i]),void 0===e&&(e=this.getNestedProperty(t,i)),e},initStartIndex:function(){var t,i=this.options.index,e=this.options.urlProperty;if(i&&"number"!=typeof i)for(t=0;t<this.num;t+=1)if(this.list[t]===i||this.getItemProperty(this.list[t],e)===this.getItemProperty(i,e)){i=t;break}this.index=this.circle(parseInt(i,10)||0)},initEventListeners:function(){var i=this,e=this.slidesContainer;function s(t){var e=i.support.transition&&i.support.transition.end===t.type?"transitionend":t.type;i["on"+e](t)}t(window).on("resize",s),t(document.body).on("keydown",s),this.container.on("click",s),this.support.touch?e.on("touchstart touchmove touchend touchcancel",s):this.options.emulateTouchEvents&&this.support.transition&&e.on("mousedown mousemove mouseup mouseout",s),this.support.transition&&e.on(this.support.transition.end,s),this.proxyListener=s},destroyEventListeners:function(){var i=this.slidesContainer,e=this.proxyListener;t(window).off("resize",e),t(document.body).off("keydown",e),this.container.off("click",e),this.support.touch?i.off("touchstart touchmove touchend touchcancel",e):this.options.emulateTouchEvents&&this.support.transition&&i.off("mousedown mousemove mouseup mouseout",e),this.support.transition&&i.off(this.support.transition.end,e)},handleOpen:function(){this.options.onopened&&this.options.onopened.call(this)},initWidget:function(){var i=this;return this.container=t(this.options.container),this.container.length?(this.slidesContainer=this.container.find(this.options.slidesContainer).first(),this.slidesContainer.length?(this.titleElement=this.container.find(this.options.titleElement).first(),1===this.num&&this.container.addClass(this.options.singleClass),this.options.onopen&&this.options.onopen.call(this),this.support.transition&&this.options.displayTransition?this.container.on(this.support.transition.end,function t(e){e.target===i.container[0]&&(i.container.off(i.support.transition.end,t),i.handleOpen())}):this.handleOpen(),this.options.hidePageScrollbars&&(this.bodyOverflowStyle=document.body.style.overflow,document.body.style.overflow="hidden"),this.container[0].style.display="block",this.initSlides(),void this.container.addClass(this.options.displayClass)):(this.console.log("blueimp Gallery: Slides container not found.",this.options.slidesContainer),!1)):(this.console.log("blueimp Gallery: Widget container not found.",this.options.container),!1)},initOptions:function(i){this.options=t.extend({},this.options),(i&&i.carousel||this.options.carousel&&(!i||!1!==i.carousel))&&t.extend(this.options,this.carouselOptions),t.extend(this.options,i),this.num<3&&(this.options.continuous=!!this.options.continuous&&null),this.support.transition||(this.options.emulateTouchEvents=!1),this.options.event&&this.preventDefault(this.options.event)}}),i})?s.apply(i,o):s)||(t.exports=n)}()}});if("object"==typeof e){var s=["object"==typeof module&&"object"==typeof module.exports?module.exports:null,"undefined"!=typeof window?window:null,t&&t!==window?t:null];for(var o in e)s[0]&&(s[0][o]=e[o]),s[1]&&"__esModule"!==o&&(s[1][o]=e[o]),s[2]&&(s[2][o]=e[o])}}(this);
