!function(e){var t=function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)t.d(i,s,function(t){return e[t]}.bind(null,s));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=234)}({234:function(e,t,n){n(235)},235:function(){!function(e){function t(t,n){this.element=e(t),this.settings=e.extend({},p,n),this._defaults=p,this._name=v,this.init()}function n(e){e.element.trigger("change")}function i(t){t.element.find("option").each(function(n,i){var s=e(i);void 0===s.data("original-index")&&s.data("original-index",t.elementCount++),void 0===s.data("_selected")&&s.data("_selected",!1)})}function s(t,n,i){t.element.find("option").each(function(s,l){var o=e(l);o.data("original-index")===n&&(o.prop("selected",i),i?(o.attr("data-sortindex",t.sortIndex),t.sortIndex++):o.removeAttr("data-sortindex"))})}function l(e,t){return e.replace(/\{(\d+)\}/g,function(e,n){return void 0!==t[n]?t[n]:e})}function o(e){if(e.settings.infoText){var t=e.elements.select1.find("option").length,n=e.elements.select2.find("option").length,i=e.element.find("option").length-e.selectedElements,s=e.selectedElements,o="";o=0===i?e.settings.infoTextEmpty:l(t===i?e.settings.infoText:e.settings.infoTextFiltered,[t,i]),e.elements.info1.html(o),e.elements.box1.toggleClass("filtered",!(t===i||0===i)),o=0===s?e.settings.infoTextEmpty:l(n===s?e.settings.infoText:e.settings.infoTextFiltered,[n,s]),e.elements.info2.html(o),e.elements.box2.toggleClass("filtered",!(n===s||0===s))}}function r(t){t.selectedElements=0,t.elements.select1.empty(),t.elements.select2.empty(),t.element.find("option").each(function(n,i){var s=e(i);s.prop("selected")?(t.selectedElements++,t.elements.select2.append(s.clone(!0).prop("selected",s.data("_selected")))):t.elements.select1.append(s.clone(!0).prop("selected",s.data("_selected")))}),t.settings.showFilterInputs&&(a(t,1),a(t,2)),o(t)}function a(t,n){if(t.settings.showFilterInputs){c(t,n),t.elements["select"+n].empty().scrollTop(0);var i=new RegExp(e.trim(t.elements["filterInput"+n].val()),"gi"),s=t.element.find("option"),l=t.element;(l=1===n?s.not(":selected"):l.find("option:selected")).each(function(l,o){var r=e(o),a=!0;(o.text.match(i)||t.settings.filterOnValues&&r.attr("value").match(i))&&(a=!1,t.elements["select"+n].append(r.clone(!0).prop("selected",r.data("_selected")))),s.eq(r.data("original-index")).data("filtered"+n,a)}),o(t)}}function c(t,n){var i=t.element.find("option");t.elements["select"+n].find("option").each(function(t,n){var s=e(n);i.eq(s.data("original-index")).data("_selected",s.prop("selected"))})}function h(e){var t=e.children("option");t.sort(function(e,t){var n=parseInt(e.getAttribute("data-sortindex")),i=parseInt(t.getAttribute("data-sortindex"));return n>i?1:n<i?-1:0}),t.detach().appendTo(e)}function d(t){t.find("option").sort(function(t,n){return e(t).data("original-index")>e(n).data("original-index")?1:-1}).appendTo(t)}function m(t){"all"!==t.settings.preserveSelectionOnMove||t.settings.moveOnSelect?"moved"!==t.settings.preserveSelectionOnMove||t.settings.moveOnSelect||c(t,1):(c(t,1),c(t,2)),t.elements.select1.find("option:selected").each(function(n,i){var l=e(i);l.data("filtered1")||s(t,l.data("original-index"),!0)}),r(t),n(t),t.settings.sortByInputOrder?h(t.elements.select2):d(t.elements.select2)}function u(t){"all"!==t.settings.preserveSelectionOnMove||t.settings.moveOnSelect?"moved"!==t.settings.preserveSelectionOnMove||t.settings.moveOnSelect||c(t,2):(c(t,1),c(t,2)),t.elements.select2.find("option:selected").each(function(n,i){var l=e(i);l.data("filtered2")||s(t,l.data("original-index"),!1)}),r(t),n(t),d(t.elements.select1),t.settings.sortByInputOrder&&h(t.elements.select2)}function f(t){t.elements.form.submit(function(e){t.elements.filterInput1.is(":focus")?(e.preventDefault(),t.elements.filterInput1.focusout()):t.elements.filterInput2.is(":focus")&&(e.preventDefault(),t.elements.filterInput2.focusout())}),t.element.on("bootstrapDualListbox.refresh",function(e,n){t.refresh(n)}),t.elements.filterClear1.on("click",function(){t.setNonSelectedFilter("",!0)}),t.elements.filterClear2.on("click",function(){t.setSelectedFilter("",!0)}),!1===t.settings.eventMoveOverride&&t.elements.moveButton.on("click",function(){m(t)}),!1===t.settings.eventMoveAllOverride&&t.elements.moveAllButton.on("click",function(){!function(t){"all"!==t.settings.preserveSelectionOnMove||t.settings.moveOnSelect?"moved"!==t.settings.preserveSelectionOnMove||t.settings.moveOnSelect||c(t,1):(c(t,1),c(t,2)),t.element.find("option").each(function(n,i){var s=e(i);s.data("filtered1")||(s.prop("selected",!0),s.attr("data-sortindex",t.sortIndex),t.sortIndex++)}),r(t),n(t)}(t)}),!1===t.settings.eventRemoveOverride&&t.elements.removeButton.on("click",function(){u(t)}),!1===t.settings.eventRemoveAllOverride&&t.elements.removeAllButton.on("click",function(){!function(t){"all"!==t.settings.preserveSelectionOnMove||t.settings.moveOnSelect?"moved"!==t.settings.preserveSelectionOnMove||t.settings.moveOnSelect||c(t,2):(c(t,1),c(t,2)),t.element.find("option").each(function(t,n){var i=e(n);i.data("filtered2")||(i.prop("selected",!1),i.removeAttr("data-sortindex"))}),r(t),n(t)}(t)}),t.elements.filterInput1.on("change keyup",function(){a(t,1)}),t.elements.filterInput2.on("change keyup",function(){a(t,2)})}var v="bootstrapDualListbox",p={bootstrap2Compatible:!1,filterTextClear:"show all",filterPlaceHolder:"Filter",moveSelectedLabel:"Move selected",moveAllLabel:"Move all",removeSelectedLabel:"Remove selected",removeAllLabel:"Remove all",moveOnSelect:!0,preserveSelectionOnMove:!1,selectedListLabel:!1,nonSelectedListLabel:!1,helperSelectNamePostfix:"_helper",selectorMinimalHeight:100,showFilterInputs:!0,nonSelectedFilter:"",selectedFilter:"",infoText:"Showing all {0}",infoTextFiltered:'<span class="label label-warning">Filtered</span> {0} from {1}',infoTextEmpty:"Empty list",filterOnValues:!1,sortByInputOrder:!1,eventMoveOverride:!1,eventMoveAllOverride:!1,eventRemoveOverride:!1,eventRemoveAllOverride:!1},g=/android/i.test(navigator.userAgent.toLowerCase());t.prototype={init:function(){this.container=e('<div class="bootstrap-duallistbox-container"> <div class="box1">   <label></label>   <span class="info-container">     <span class="info"></span>     <button type="button" class="btn clear1 pull-right"></button>   </span>   <input class="filter" type="text">   <div class="btn-group buttons">     <button type="button" class="btn moveall">       <i></i>       <i></i>     </button>     <button type="button" class="btn move">       <i></i>     </button>   </div>   <select multiple="multiple"></select> </div> <div class="box2">   <label></label>   <span class="info-container">     <span class="info"></span>     <button type="button" class="btn clear2 pull-right"></button>   </span>   <input class="filter" type="text">   <div class="btn-group buttons">     <button type="button" class="btn remove">       <i></i>     </button>     <button type="button" class="btn removeall">       <i></i>       <i></i>     </button>   </div>   <select multiple="multiple"></select> </div></div>').insertBefore(this.element),this.elements={originalSelect:this.element,box1:e(".box1",this.container),box2:e(".box2",this.container),filterInput1:e(".box1 .filter",this.container),filterInput2:e(".box2 .filter",this.container),filterClear1:e(".box1 .clear1",this.container),filterClear2:e(".box2 .clear2",this.container),label1:e(".box1 > label",this.container),label2:e(".box2 > label",this.container),info1:e(".box1 .info",this.container),info2:e(".box2 .info",this.container),select1:e(".box1 select",this.container),select2:e(".box2 select",this.container),moveButton:e(".box1 .move",this.container),removeButton:e(".box2 .remove",this.container),moveAllButton:e(".box1 .moveall",this.container),removeAllButton:e(".box2 .removeall",this.container),form:e(e(".box1 .filter",this.container)[0].form)},this.originalSelectName=this.element.attr("name")||"";var t="bootstrap-duallistbox-nonselected-list_"+this.originalSelectName,n="bootstrap-duallistbox-selected-list_"+this.originalSelectName;return this.elements.select1.attr("id",t),this.elements.select2.attr("id",n),this.elements.label1.attr("for",t),this.elements.label2.attr("for",n),this.selectedElements=0,this.sortIndex=0,this.elementCount=0,this.setBootstrap2Compatible(this.settings.bootstrap2Compatible),this.setFilterTextClear(this.settings.filterTextClear),this.setFilterPlaceHolder(this.settings.filterPlaceHolder),this.setMoveSelectedLabel(this.settings.moveSelectedLabel),this.setMoveAllLabel(this.settings.moveAllLabel),this.setRemoveSelectedLabel(this.settings.removeSelectedLabel),this.setRemoveAllLabel(this.settings.removeAllLabel),this.setMoveOnSelect(this.settings.moveOnSelect),this.setPreserveSelectionOnMove(this.settings.preserveSelectionOnMove),this.setSelectedListLabel(this.settings.selectedListLabel),this.setNonSelectedListLabel(this.settings.nonSelectedListLabel),this.setHelperSelectNamePostfix(this.settings.helperSelectNamePostfix),this.setSelectOrMinimalHeight(this.settings.selectorMinimalHeight),i(this),this.setShowFilterInputs(this.settings.showFilterInputs),this.setNonSelectedFilter(this.settings.nonSelectedFilter),this.setSelectedFilter(this.settings.selectedFilter),this.setInfoText(this.settings.infoText),this.setInfoTextFiltered(this.settings.infoTextFiltered),this.setInfoTextEmpty(this.settings.infoTextEmpty),this.setFilterOnValues(this.settings.filterOnValues),this.setSortByInputOrder(this.settings.sortByInputOrder),this.setEventMoveOverride(this.settings.eventMoveOverride),this.setEventMoveAllOverride(this.settings.eventMoveAllOverride),this.setEventRemoveOverride(this.settings.eventRemoveOverride),this.setEventRemoveAllOverride(this.settings.eventRemoveAllOverride),this.element.hide(),f(this),r(this),this.element},setBootstrap2Compatible:function(e,t){return this.settings.bootstrap2Compatible=e,e?(this.container.removeClass("row").addClass("row-fluid bs2compatible"),this.container.find(".box1, .box2").removeClass("col-md-6").addClass("span6"),this.container.find(".clear1, .clear2").removeClass("btn-default btn-xs").addClass("btn-mini"),this.container.find("input, select").removeClass("form-control"),this.container.find(".btn").removeClass("btn-default"),this.container.find(".moveall > i, .move > i").removeClass("glyphicon glyphicon-arrow-right").addClass("icon-arrow-right"),this.container.find(".removeall > i, .remove > i").removeClass("glyphicon glyphicon-arrow-left").addClass("icon-arrow-left")):(this.container.removeClass("row-fluid bs2compatible").addClass("row"),this.container.find(".box1, .box2").removeClass("span6").addClass("col-md-6"),this.container.find(".clear1, .clear2").removeClass("btn-mini").addClass("btn-default btn-xs"),this.container.find("input, select").addClass("form-control"),this.container.find(".btn").addClass("btn-default"),this.container.find(".moveall > i, .move > i").removeClass("icon-arrow-right").addClass("glyphicon glyphicon-arrow-right"),this.container.find(".removeall > i, .remove > i").removeClass("icon-arrow-left").addClass("glyphicon glyphicon-arrow-left")),t&&r(this),this.element},setFilterTextClear:function(e,t){return this.settings.filterTextClear=e,this.elements.filterClear1.html(e),this.elements.filterClear2.html(e),t&&r(this),this.element},setFilterPlaceHolder:function(e,t){return this.settings.filterPlaceHolder=e,this.elements.filterInput1.attr("placeholder",e),this.elements.filterInput2.attr("placeholder",e),t&&r(this),this.element},setMoveSelectedLabel:function(e,t){return this.settings.moveSelectedLabel=e,this.elements.moveButton.attr("title",e),t&&r(this),this.element},setMoveAllLabel:function(e,t){return this.settings.moveAllLabel=e,this.elements.moveAllButton.attr("title",e),t&&r(this),this.element},setRemoveSelectedLabel:function(e,t){return this.settings.removeSelectedLabel=e,this.elements.removeButton.attr("title",e),t&&r(this),this.element},setRemoveAllLabel:function(e,t){return this.settings.removeAllLabel=e,this.elements.removeAllButton.attr("title",e),t&&r(this),this.element},setMoveOnSelect:function(e,t){if(g&&(e=!0),this.settings.moveOnSelect=e,this.settings.moveOnSelect){this.container.addClass("moveonselect");var n=this;this.elements.select1.on("change",function(){m(n)}),this.elements.select2.on("change",function(){u(n)})}else this.container.removeClass("moveonselect"),this.elements.select1.off("change"),this.elements.select2.off("change");return t&&r(this),this.element},setPreserveSelectionOnMove:function(e,t){return g&&(e=!1),this.settings.preserveSelectionOnMove=e,t&&r(this),this.element},setSelectedListLabel:function(e,t){return this.settings.selectedListLabel=e,e?this.elements.label2.show().html(e):this.elements.label2.hide().html(e),t&&r(this),this.element},setNonSelectedListLabel:function(e,t){return this.settings.nonSelectedListLabel=e,e?this.elements.label1.show().html(e):this.elements.label1.hide().html(e),t&&r(this),this.element},setHelperSelectNamePostfix:function(e,t){return this.settings.helperSelectNamePostfix=e,e?(this.elements.select1.attr("name",this.originalSelectName+e+"1"),this.elements.select2.attr("name",this.originalSelectName+e+"2")):(this.elements.select1.removeAttr("name"),this.elements.select2.removeAttr("name")),t&&r(this),this.element},setSelectOrMinimalHeight:function(e,t){this.settings.selectorMinimalHeight=e;var n=this.element.height();return this.element.height()<e&&(n=e),this.elements.select1.height(n),this.elements.select2.height(n),t&&r(this),this.element},setShowFilterInputs:function(e,t){return e?(this.elements.filterInput1.show(),this.elements.filterInput2.show()):(this.setNonSelectedFilter(""),this.setSelectedFilter(""),r(this),this.elements.filterInput1.hide(),this.elements.filterInput2.hide()),this.settings.showFilterInputs=e,t&&r(this),this.element},setNonSelectedFilter:function(e,t){if(this.settings.showFilterInputs)return this.settings.nonSelectedFilter=e,this.elements.filterInput1.val(e),t&&r(this),this.element},setSelectedFilter:function(e,t){if(this.settings.showFilterInputs)return this.settings.selectedFilter=e,this.elements.filterInput2.val(e),t&&r(this),this.element},setInfoText:function(e,t){return this.settings.infoText=e,t&&r(this),this.element},setInfoTextFiltered:function(e,t){return this.settings.infoTextFiltered=e,t&&r(this),this.element},setInfoTextEmpty:function(e,t){return this.settings.infoTextEmpty=e,t&&r(this),this.element},setFilterOnValues:function(e,t){return this.settings.filterOnValues=e,t&&r(this),this.element},setSortByInputOrder:function(e,t){return this.settings.sortByInputOrder=e,t&&r(this),this.element},setEventMoveOverride:function(e,t){return this.settings.eventMoveOverride=e,t&&r(this),this.element},setEventMoveAllOverride:function(e,t){return this.settings.eventMoveAllOverride=e,t&&r(this),this.element},setEventRemoveOverride:function(e,t){return this.settings.eventRemoveOverride=e,t&&r(this),this.element},setEventRemoveAllOverride:function(e,t){return this.settings.eventRemoveAllOverride=e,t&&r(this),this.element},getContainer:function(){return this.container},refresh:function(e){i(this),e?function(e){e.elements.select1.find("option").each(function(){e.element.find("option").data("_selected",!1)})}(this):(c(this,1),c(this,2)),r(this)},destroy:function(){return this.container.remove(),this.element.show(),e.data(this,"plugin_"+v,null),this.element}},e.fn[v]=function(n){var i,s=arguments;return void 0===n||"object"==typeof n?this.each(function(){e(this).is("select")?e.data(this,"plugin_"+v)||e.data(this,"plugin_"+v,new t(this,n)):e(this).find("select").each(function(t,i){e(i).bootstrapDualListbox(n)})}):"string"==typeof n&&"_"!==n[0]&&"init"!==n?(this.each(function(){var l=e.data(this,"plugin_"+v);l instanceof t&&"function"==typeof l[n]&&(i=l[n].apply(l,Array.prototype.slice.call(s,1)))}),void 0!==i?i:this):void 0}}(jQuery,window,document)}});if("object"==typeof t){var n=["object"==typeof module&&"object"==typeof module.exports?module.exports:null,"undefined"!=typeof window?window:null,e&&e!==window?e:null];for(var i in t)n[0]&&(n[0][i]=t[i]),n[1]&&"__esModule"!==i&&(n[1][i]=t[i]),n[2]&&(n[2][i]=t[i])}}(this);