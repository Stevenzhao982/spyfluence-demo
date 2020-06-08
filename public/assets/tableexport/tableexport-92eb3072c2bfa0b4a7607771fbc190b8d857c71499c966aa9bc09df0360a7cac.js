!function(t){var e=function(n){function r(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}var o={};return r.m=n,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=446)}({446:function(t,e,n){n(447)},447:function(){"use strict";var Pt;(Pt=jQuery).fn.tableExport=function(e){function s(t){var e=[];return r(t,"thead").each(function(){e.push.apply(e,r(Pt(this),M.theadSelector).toArray())}),e}function l(t){var e=[];return r(t,"tbody").each(function(){e.push.apply(e,r(Pt(this),M.tbodySelector).toArray())}),M.tfootSelector.length&&r(t,"tfoot").each(function(){e.push.apply(e,r(Pt(this),M.tfootSelector).toArray())}),e}function r(t,e){var n=t[0].tagName,o=t.parents(n).length;return t.find(e).filter(function(){return o===Pt(this).closest(n).parents(n).length})}function c(t){var n=[];return Pt(t).find("thead").first().find("th").each(function(t,e){void 0!==Pt(e).attr("data-field")?n[t]=Pt(e).attr("data-field"):n[t]=t.toString()}),n}function f(t){var e,n,o=void 0!==t[0].cellIndex,r=void 0!==t[0].rowIndex,i=o||r?(e=t,n=[],_&&(n=z.filter(function(){var t=!1;return this.nodeType===e[0].nodeType&&(void 0!==this.rowIndex&&this.rowIndex===e[0].rowIndex?t=!0:void 0!==this.cellIndex&&this.cellIndex===e[0].cellIndex&&void 0!==this.parentNode.rowIndex&&void 0!==e[0].parentNode.rowIndex&&this.parentNode.rowIndex===e[0].parentNode.rowIndex&&(t=!0)),t})),!1===_||0===n.length):t.is(":visible"),a=t.data("tableexport-display");return o&&"none"!==a&&"always"!==a&&(r=void 0!==(t=Pt(t[0].parentNode))[0].rowIndex,a=t.data("tableexport-display")),r&&"none"!==a&&"always"!==a&&(a=t.closest("table").data("tableexport-display")),"none"!==a&&(!0===i||"always"===a)}function p(t,e,c,n,h){if("function"==typeof h){var o=!1;if("function"==typeof M.onIgnoreRow&&(o=M.onIgnoreRow(Pt(t),c)),!1===o&&-1===Pt.inArray(c,M.ignoreRow)&&-1===Pt.inArray(c-n,M.ignoreRow)&&f(Pt(t))){var d=r(Pt(t),e),u=0;d.each(function(t){var e,n,o,r,i,a=Pt(this),s=S(this),l=C(this);if(Pt.each(H,function(){if(c>=this.s.r&&c<=this.e.r&&u>=this.s.c&&u<=this.e.c)for(e=0;e<=this.e.c-this.s.c;++e)h(null,c,u++)}),!1===(n=a,o=d.length,r=t,i=!1,f(n)?0<M.ignoreColumn.length&&(-1!==Pt.inArray(r,M.ignoreColumn)||-1!==Pt.inArray(r-o,M.ignoreColumn)||B.length>r&&void 0!==B[r]&&-1!==Pt.inArray(B[r],M.ignoreColumn))&&(i=!0):i=!0,i)&&((l||s)&&(l=l||1,s=s||1,H.push({s:{r:c,c:u},e:{r:c+l-1,c:u+s-1}})),h(this,c,u++)),s)for(e=0;e<s-1;++e)h(null,c,u++)}),Pt.each(H,function(){if(c>=this.s.r&&c<=this.e.r&&u>=this.s.c&&u<=this.e.c)for(at=0;at<=this.e.c-this.s.c;++at)h(null,c,u++)})}}}function u(t,e,n,o){if(void 0!==o.images){var r=o.images[n];if(void 0!==r){var i=t.width/t.height,a=e.width/e.height,s=t.width,l=t.height,c=0;a<=i?(l=Math.min(t.height,e.height),s=e.width*l/e.height):i<a&&(s=Math.min(t.width,e.width),l=e.height*s/e.width),s*=19.049976/25.4,(l*=19.049976/25.4)<t.height&&(c=(t.height-l)/2);try{o.doc.addImage(r.src,t.textPos.x,t.y+c,s,l)}catch(t){}t.textPos.x+=s}}}function n(t,e){if("string"===M.outputMode)return t.output();if("base64"===M.outputMode)return T(t.output());if("window"===M.outputMode)return window.URL=window.URL||window.webkitURL,void window.open(window.URL.createObjectURL(t.output("blob")));try{var n=t.output("blob");saveAs(n,M.fileName+".pdf")}catch(n){O(M.fileName+".pdf","data:application/pdf"+(e?"":";base64")+",",e?t.output("blob"):t.output())}}function h(t,e,n){var o=0;if(void 0!==n&&(o=n.colspan),0<=o){for(var r=t.width,i=t.textPos.x,a=e.table.columns.indexOf(e.column),s=1;s<o;s++)r+=e.table.columns[a+s].width;if(1<o&&("right"===t.styles.halign?i=t.textPos.x+r-t.width:"center"===t.styles.halign&&(i=t.textPos.x+(r-t.width)/2)),t.width=r,t.textPos.x=i,void 0!==n&&1<n.rowspan&&(t.height=t.height*n.rowspan),"middle"===t.styles.valign||"bottom"===t.styles.valign){var l=("string"==typeof t.text?t.text.split(/\r\n|\r|\n/g):t.text).length||1;2<l&&(t.textPos.y-=(2-R)/2*e.row.styles.fontSize*(l-2)/3)}return!0}return!1}function d(t,e,n){if("function"==typeof n.onAutotableText)n.onAutotableText(n.doc,t,e);else{var o=t.textPos.x,r=t.textPos.y,i={halign:t.styles.halign,valign:t.styles.valign};if(e.length){for(var a=e[0];a.previousSibling;)a=a.previousSibling;for(var s=!1,l=!1;a;){var c=a.innerText||a.textContent||"",h=c.length&&" "===c[0]?" ":"",d=1<c.length&&" "===c[c.length-1]?" ":"";!0!==M.preserve.leadingWS&&(c=h+m(c)),!0!==M.preserve.trailingWS&&(c=g(c)+d),Pt(a).is("br")&&(o=t.textPos.x,r+=n.doc.internal.getFontSize()),Pt(a).is("b")?s=!0:Pt(a).is("i")&&(l=!0),(s||l)&&n.doc.setFontType(s&&l?"bolditalic":s?"bold":"italic");var u=n.doc.getStringUnitWidth(c)*n.doc.internal.getFontSize();if(u){if("linebreak"===t.styles.overflow&&o>t.textPos.x&&o+u>t.textPos.x+t.width){if(0<=".,!%*;:=-".indexOf(c.charAt(0))){var f=c.charAt(0);o+(u=n.doc.getStringUnitWidth(f)*n.doc.internal.getFontSize())<=t.textPos.x+t.width&&(n.doc.autoTableText(f,o,r,i),c=c.substring(1,c.length)),u=n.doc.getStringUnitWidth(c)*n.doc.internal.getFontSize()}o=t.textPos.x,r+=n.doc.internal.getFontSize()}if("visible"!==t.styles.overflow)for(;c.length&&o+u>t.textPos.x+t.width;)c=c.substring(0,c.length-1),u=n.doc.getStringUnitWidth(c)*n.doc.internal.getFontSize();n.doc.autoTableText(c,o,r,i),o+=u}(s||l)&&(Pt(a).is("b")?s=!1:Pt(a).is("i")&&(l=!1),n.doc.setFontType(s||l?s?"bold":"italic":"normal")),a=a.nextSibling}t.textPos.x=o,t.textPos.y=r}else n.doc.autoTableText(t.text,t.textPos.x,t.textPos.y,i)}}function a(t,e,n){return null==t?"":t.toString().replace(new RegExp(null==e?"":e.toString().replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1"),"g"),n)}function m(t){return null==t?"":t.toString().replace(/^\s+/,"")}function g(t){return null==t?"":t.toString().replace(/\s+$/,"")}function v(t){return("number"==typeof(t=a(t=a(t=t||"0",M.numbers.html.thousandsSeparator,""),M.numbers.html.decimalMark,"."))||!1!==jQuery.isNumeric(t))&&t}function y(t,e,n){var o="";if(null!==t){var r,i=Pt(t);if(i[0].hasAttribute("data-tableexport-canvas"))r="";else if(i[0].hasAttribute("data-tableexport-value"))r=(r=i.data("tableexport-value"))?r+"":"";else if(r=i.html(),"function"==typeof M.onCellHtmlData)r=M.onCellHtmlData(i,e,n,r);else if(""!==r){var a=Pt.parseHTML(r),s=0,l=0;r="",Pt.each(a,function(){Pt(this).is("input")?r+=i.find("input").eq(s++).val():Pt(this).is("select")?r+=i.find("select option:selected").eq(l++).text():Pt(this).is("br")?r+="<br>":void 0===Pt(this).html()?r+=Pt(this).text():(void 0===jQuery().bootstrapTable||!0!==Pt(this).hasClass("filterControl")&&0===Pt(t).parents(".detail-view").length)&&(r+=Pt(this).html())})}if(!0===M.htmlContent)o=Pt.trim(r);else if(r&&""!==r)if(""!==Pt(t).data("tableexport-cellformat")){var c=r.replace(/\n/g,"\u2028").replace(/(<\s*br([^>]*)>)/gi,"\u2060"),h=Pt("<div/>").html(c).contents(),d=!1;if(c="",Pt.each(h.text().split("\u2028"),function(t,e){0<t&&(c+=" "),!0!==M.preserve.leadingWS&&(e=m(e)),c+=!0!==M.preserve.trailingWS?g(e):e}),Pt.each(c.split("\u2060"),function(t,e){0<t&&(o+="\n"),!0!==M.preserve.leadingWS&&(e=m(e)),!0!==M.preserve.trailingWS&&(e=g(e)),o+=e.replace(/\u00AD/g,"")}),o=o.replace(/\u00A0/g," "),"json"===M.type||"excel"===M.type&&"xmlss"===M.mso.fileFormat||!1===M.numbers.output)!1!==(d=v(o))&&(o=Number(d));else if((M.numbers.html.decimalMark!==M.numbers.output.decimalMark||M.numbers.html.thousandsSeparator!==M.numbers.output.thousandsSeparator)&&!1!==(d=v(o))){var u=(""+d.substr(d<0?1:0)).split(".");1===u.length&&(u[1]="");var f=3<u[0].length?u[0].length%3:0;o=(d<0?"-":"")+(M.numbers.output.thousandsSeparator?(f?u[0].substr(0,f)+M.numbers.output.thousandsSeparator:"")+u[0].substr(f).replace(/(\d{3})(?=\d)/g,"$1"+M.numbers.output.thousandsSeparator):u[0])+(u[1].length?M.numbers.output.decimalMark+u[1]:"")}}else o=r;!0===M.escape&&(o=escape(o)),"function"==typeof M.onCellData&&(o=M.onCellData(i,e,n,o))}return o}function b(t){return 0<t.length&&!0===M.preventInjection&&0<="=+-@".indexOf(t.charAt(0))?"'"+t:t}function o(t,e,n){return e+"-"+n.toLowerCase()}function x(t,e){var n=/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec(t),o=e;return n&&(o=[parseInt(n[1]),parseInt(n[2]),parseInt(n[3])]),o}function w(t){var e=N(t,"text-align"),n=N(t,"font-weight"),o=N(t,"font-style"),r="";"start"===e&&(e="rtl"===N(t,"direction")?"right":"left"),700<=n&&(r="bold"),"italic"===o&&(r+=o),""===r&&(r="normal");var i={style:{align:e,bcolor:x(N(t,"background-color"),[255,255,255]),color:x(N(t,"color"),[0,0,0]),fstyle:r},colspan:S(t),rowspan:C(t)};if(null!==t){var a=t.getBoundingClientRect();i.rect={width:a.width,height:a.height}}return i}function S(t){var e=Pt(t).data("tableexport-colspan");return void 0===e&&Pt(t).is("[colspan]")&&(e=Pt(t).attr("colspan")),parseInt(e)||0}function C(t){var e=Pt(t).data("tableexport-rowspan");return void 0===e&&Pt(t).is("[rowspan]")&&(e=Pt(t).attr("rowspan")),parseInt(e)||0}function N(t,e){try{return window.getComputedStyle?(e=e.replace(/([a-z])([A-Z])/,o),window.getComputedStyle(t,null).getPropertyValue(e)):t.currentStyle?t.currentStyle[e]:t.style[e]}catch(t){}return""}function A(t,e,n){var o=N(t,e).match(/\d+/);return null!==o?(o=o[0],function(t,e,n){var o=document.createElement("div");o.style.overflow="hidden",o.style.visibility="hidden",t.appendChild(o),o.style.width=100+n;var r=100/o.offsetWidth;return t.removeChild(o),e*r}(t.parentElement,o,n)):0}function i(t){for(var e=new ArrayBuffer(t.length),n=new Uint8Array(e),o=0;o!==t.length;++o)n[o]=255&t.charCodeAt(o);return e}function k(t,e){return e&&(t+=1462),(Date.parse(t)-new Date(Date.UTC(1899,11,30)))/864e5}function j(t){var e,n,o=0;if(0===t.length)return o;for(e=0,n=t.length;e<n;e++)o=(o<<5)-o+t.charCodeAt(e),o|=0;return o}function O(t,e,n){var o=window.navigator.userAgent;if(!1!==t&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(new Blob([n]),t);else if(!1!==t&&(0<o.indexOf("MSIE ")||o.match(/Trident.*rv\:11\./))){var r=document.createElement("iframe");if(r){switch(document.body.appendChild(r),r.setAttribute("style","display:none"),r.contentDocument.open("txt/plain","replace"),r.contentDocument.write(n),r.contentDocument.close(),r.contentDocument.focus(),t.substr(t.lastIndexOf(".")+1)){case"doc":case"json":case"png":case"pdf":case"xls":case"xlsx":t+=".txt"}r.contentDocument.execCommand("SaveAs",!0,t),document.body.removeChild(r)}}else{var i=document.createElement("a");if(i){var a=null;if(!(i.style.display="none")!==t?i.download=t:i.target="_blank","object"==typeof n){window.URL=window.URL||window.webkitURL;var s=[];s.push(n),a=window.URL.createObjectURL(new Blob(s,{type:e})),i.href=a}else 0<=e.toLowerCase().indexOf("base64,")?i.href=e+T(n):i.href=e+encodeURIComponent(n);document.body.appendChild(i),document.createEvent?(null===I&&(I=document.createEvent("MouseEvents")),I.initEvent("click",!0,!1),i.dispatchEvent(I)):document.createEventObject?i.fireEvent("onclick"):"function"==typeof i.onclick&&i.onclick(),setTimeout(function(){a&&window.URL.revokeObjectURL(a),document.body.removeChild(i)},100)}}}function T(t){var e,n,o,r,i,a,s,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c="",h=0;for(t=function(t){if("string"==typeof t){t=t.replace(/\x0d\x0a/g,"\n");for(var e="",n=0;n<t.length;n++){var o=t.charCodeAt(n);o<128?e+=String.fromCharCode(o):(127<o&&o<2048?e+=String.fromCharCode(o>>6|192):(e+=String.fromCharCode(o>>12|224),e+=String.fromCharCode(o>>6&63|128)),e+=String.fromCharCode(63&o|128))}return e}return t}(t);h<t.length;)r=(e=t.charCodeAt(h++))>>2,i=(3&e)<<4|(n=t.charCodeAt(h++))>>4,a=(15&n)<<2|(o=t.charCodeAt(h++))>>6,s=63&o,isNaN(n)?a=s=64:isNaN(o)&&(s=64),c=c+l.charAt(r)+l.charAt(i)+l.charAt(a)+l.charAt(s);return c}var F,M={csvEnclosure:'"',csvSeparator:",",csvUseBOM:!0,displayTableName:!1,escape:!1,exportHiddenCells:!1,fileName:"tableExport",htmlContent:!1,ignoreColumn:[],ignoreRow:[],jsonScope:"all",jspdf:{orientation:"p",unit:"pt",format:"a4",margins:{left:20,right:10,top:10,bottom:10},onDocCreated:null,autotable:{styles:{cellPadding:2,rowHeight:12,fontSize:8,fillColor:255,textColor:50,fontStyle:"normal",overflow:"ellipsize",halign:"inherit",valign:"middle"},headerStyles:{fillColor:[52,73,94],textColor:255,fontStyle:"bold",halign:"inherit",valign:"middle"},alternateRowStyles:{fillColor:245},tableExport:{doc:null,onAfterAutotable:null,onBeforeAutotable:null,onAutotableText:null,onTable:null,outputImages:!0}}},mso:{fileFormat:"xlshtml",onMsoNumberFormat:null,pageFormat:"a4",pageOrientation:"portrait",rtl:!1,styles:[],worksheetName:""},numbers:{html:{decimalMark:".",thousandsSeparator:","},output:{decimalMark:".",thousandsSeparator:","}},onCellData:null,onCellHtmlData:null,onIgnoreRow:null,outputMode:"file",pdfmake:{enabled:!1,docDefinition:{pageOrientation:"portrait",defaultStyle:{font:"Roboto"}},fonts:{}},preserve:{leadingWS:!1,trailingWS:!1},preventInjection:!0,tbodySelector:"tr",tfootSelector:"tr",theadSelector:"tr",tableName:"Table",type:"csv"},P={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]},R=1.15,D=this,I=null,E=[],W=[],L=0,U="",B=[],H=[],z=[],_=!1;if(Pt.extend(!0,M,e),"xlsx"===M.type&&(M.mso.fileFormat=M.type,M.type="excel"),void 0!==M.excelFileFormat&&"undefined"===M.mso.fileFormat&&(M.mso.fileFormat=M.excelFileFormat),void 0!==M.excelPageFormat&&"undefined"===M.mso.pageFormat&&(M.mso.pageFormat=M.excelPageFormat),void 0!==M.excelPageOrientation&&"undefined"===M.mso.pageOrientation&&(M.mso.pageOrientation=M.excelPageOrientation),void 0!==M.excelRTL&&"undefined"===M.mso.rtl&&(M.mso.rtl=M.excelRTL),void 0!==M.excelstyles&&"undefined"===M.mso.styles&&(M.mso.styles=M.excelstyles),void 0!==M.onMsoNumberFormat&&"undefined"===M.mso.onMsoNumberFormat&&(M.mso.onMsoNumberFormat=M.onMsoNumberFormat),void 0!==M.worksheetName&&"undefined"===M.mso.worksheetName&&(M.mso.worksheetName=M.worksheetName),M.mso.pageOrientation="l"===M.mso.pageOrientation.substr(0,1)?"landscape":"portrait",B=c(D),"csv"===M.type||"tsv"===M.type||"txt"===M.type){var X="",K=0;H=[],L=0;var q=function(t,e,n){return t.each(function(){U="",p(this,e,L,n+t.length,function(o,r,i){U+=function(){var t="";if(null!==o){var e=y(o,r,i),n=null===e||""===e?"":e.toString();"tsv"===M.type?(e instanceof Date&&e.toLocaleString(),t=a(n,"\t"," ")):e instanceof Date?t=M.csvEnclosure+e.toLocaleString()+M.csvEnclosure:(0<=(t=a(t=b(n),M.csvEnclosure,M.csvEnclosure+M.csvEnclosure)).indexOf(M.csvSeparator)||/[\r\n ]/g.test(t))&&(t=M.csvEnclosure+t+M.csvEnclosure)}return t}()+("tsv"===M.type?"\t":M.csvSeparator)}),0<(U=Pt.trim(U).substring(0,U.length-1)).length&&(0<X.length&&(X+="\n"),X+=U),L++}),t.length};if(K+=q(Pt(D).find("thead").first().find(M.theadSelector),"th,td",K),r(Pt(D),"tbody").each(function(){K+=q(r(Pt(this),M.tbodySelector),"td,th",K)}),M.tfootSelector.length&&q(Pt(D).find("tfoot").first().find(M.tfootSelector),"td,th",K),X+="\n","string"===M.outputMode)return X;if("base64"===M.outputMode)return T(X);if("window"===M.outputMode)return void O(!1,"data:text/"+("csv"===M.type?"csv":"plain")+";charset=utf-8,",X);try{F=new Blob([X],{type:"text/"+("csv"===M.type?"csv":"plain")+";charset=utf-8"}),saveAs(F,M.fileName+"."+M.type,"csv"!==M.type||!1===M.csvUseBOM)}catch(Pt){O(M.fileName+"."+M.type,"data:text/"+("csv"===M.type?"csv":"plain")+";charset=utf-8,"+("csv"===M.type&&M.csvUseBOM?"\ufeff":""),X)}}else if("sql"===M.type){L=0,H=[];var Q="INSERT INTO `"+M.tableName+"` (";if(E=s(Pt(D)),Pt(E).each(function(){p(this,"th,td",L,E.length,function(t,e,n){Q+="'"+y(t,e,n)+"',"}),L++,Q=Pt.trim(Q).substring(0,Q.length-1)}),Q+=") VALUES ",W=l(Pt(D)),Pt(W).each(function(){U="",p(this,"td,th",L,E.length+W.length,function(t,e,n){U+="'"+y(t,e,n)+"',"}),3<U.length&&(Q+="("+U,Q=Pt.trim(Q).substring(0,Q.length-1),Q+="),"),L++}),Q=Pt.trim(Q).substring(0,Q.length-1),Q+=";","string"===M.outputMode)return Q;if("base64"===M.outputMode)return T(Q);try{F=new Blob([Q],{type:"text/plain;charset=utf-8"}),saveAs(F,M.fileName+".sql")}catch(Pt){O(M.fileName+".sql","data:application/sql;charset=utf-8,",Q)}}else if("json"===M.type){var V=[];H=[],E=s(Pt(D)),Pt(E).each(function(){var o=[];p(this,"th,td",L,E.length,function(t,e,n){o.push(y(t,e,n))}),V.push(o)});var Y=[];W=l(Pt(D)),Pt(W).each(function(){var o={},r=0;p(this,"td,th",L,E.length+W.length,function(t,e,n){V.length?o[V[V.length-1][r]]=y(t,e,n):o[r]=y(t,e,n),r++}),!1===Pt.isEmptyObject(o)&&Y.push(o),L++});var $="";if($="head"===M.jsonScope?JSON.stringify(V):"data"===M.jsonScope?JSON.stringify(Y):JSON.stringify({header:V,data:Y}),"string"===M.outputMode)return $;if("base64"===M.outputMode)return T($);try{F=new Blob([$],{type:"application/json;charset=utf-8"}),saveAs(F,M.fileName+".json")}catch(Pt){O(M.fileName+".json","data:application/json;charset=utf-8;base64,",$)}}else if("xml"===M.type){L=0,H=[];var J='<?xml version="1.0" encoding="utf-8"?>';J+="<tabledata><fields>",E=s(Pt(D)),Pt(E).each(function(){p(this,"th,td",L,E.length,function(t,e,n){J+="<field>"+y(t,e,n)+"</field>"}),L++}),J+="</fields><data>";var G=1;if(W=l(Pt(D)),Pt(W).each(function(){var o=1;U="",p(this,"td,th",L,E.length+W.length,function(t,e,n){U+="<column-"+o+">"+y(t,e,n)+"</column-"+o+">",o++}),0<U.length&&"<column-1></column-1>"!==U&&(J+='<row id="'+G+'">'+U+"</row>",G++),L++}),J+="</data></tabledata>","string"===M.outputMode)return J;if("base64"===M.outputMode)return T(J);try{F=new Blob([J],{type:"application/xml;charset=utf-8"}),saveAs(F,M.fileName+".xml")}catch(Pt){O(M.fileName+".xml","data:application/xml;charset=utf-8;base64,",J)}}else if("excel"===M.type&&"xmlss"===M.mso.fileFormat){var Z=[],tt=[];Pt(D).filter(function(){return f(Pt(this))}).each(function(){function t(t,e,n){var u=[];return Pt(t).each(function(){var h=0,d=0;U="",p(this,"td,th",L,n+t.length,function(t,e,n){if(null!==t){var o="",r=y(t,e,n),i="String";if(!1!==jQuery.isNumeric(r))i="Number";else{var a=(-1<(c=r).indexOf("%")?!1!==(c=v(c.replace(/%/g,"")))&&(c/=100):c=!1,c);!1!==a&&(r=a,i="Number",o+=' ss:StyleID="pct1"')}"Number"!==i&&(r=r.replace(/\n/g,"<br>"));var s=S(t),l=C(t);Pt.each(u,function(){if(L>=this.s.r&&L<=this.e.r&&d>=this.s.c&&d<=this.e.c)for(var t=0;t<=this.e.c-this.s.c;++t)d++,h++}),(l||s)&&(l=l||1,s=s||1,u.push({s:{r:L,c:d},e:{r:L+l-1,c:d+s-1}})),1<s&&(o+=' ss:MergeAcross="'+(s-1)+'"',d+=s-1),1<l&&(o+=' ss:MergeDown="'+(l-1)+'" ss:StyleID="rsp1"'),0<h&&(o+=' ss:Index="'+(d+1)+'"',h=0),U+="<Cell"+o+'><Data ss:Type="'+i+'">'+Pt("<div />").text(r).html()+"</Data></Cell>\r",d++}var c}),0<U.length&&(vt+='<Row ss:AutoFitHeight="0">\r'+U+"</Row>\r"),L++}),t.length}var e=Pt(this),n="";"string"==typeof M.mso.worksheetName&&M.mso.worksheetName.length?n=M.mso.worksheetName+" "+(tt.length+1):void 0!==M.mso.worksheetName[tt.length]&&(n=M.mso.worksheetName[tt.length]),n.length||(n=e.find("caption").text()||""),n.length||(n="Table "+(tt.length+1)),n=Pt.trim(n.replace(/[\\\/[\]*:?'"]/g,"").substring(0,31)),tt.push(Pt("<div />").text(n).html()),!1===M.exportHiddenCells&&(z=e.find("tr, th, td").filter(":hidden"),_=0<z.length),L=0,B=c(this),vt="<Table>\r";var o=t(s(e),"th,td",o);t(l(e),"td,th",o),vt+="</Table>\r",Z.push(vt)});for(var et,nt,ot={},rt={},it=0,at=tt.length;it<at;it++)nt=ot[et=tt[it]],2===(nt=ot[et]=null==nt?1:nt+1)&&(tt[rt[et]]=tt[rt[et]].substring(0,29)+"-1"),1<ot[et]?tt[it]=tt[it].substring(0,29)+"-"+ot[et]:rt[et]=it;for(var st='<?xml version="1.0" encoding="UTF-8"?>\r<?mso-application progid="Excel.Sheet"?>\r<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\r xmlns:o="urn:schemas-microsoft-com:office:office"\r xmlns:x="urn:schemas-microsoft-com:office:excel"\r xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\r xmlns:html="http://www.w3.org/TR/REC-html40">\r<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">\r  <Created>'+(new Date).toISOString()+'</Created>\r</DocumentProperties>\r<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">\r  <AllowPNG/>\r</OfficeDocumentSettings>\r<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">\r  <WindowHeight>9000</WindowHeight>\r  <WindowWidth>13860</WindowWidth>\r  <WindowTopX>0</WindowTopX>\r  <WindowTopY>0</WindowTopY>\r  <ProtectStructure>False</ProtectStructure>\r  <ProtectWindows>False</ProtectWindows>\r</ExcelWorkbook>\r<Styles>\r  <Style ss:ID="Default" ss:Name="Normal">\r    <Alignment ss:Vertical="Bottom"/>\r    <Borders/>\r    <Font/>\r    <Interior/>\r    <NumberFormat/>\r    <Protection/>\r  </Style>\r  <Style ss:ID="rsp1">\r    <Alignment ss:Vertical="Center"/>\r  </Style>\r  <Style ss:ID="pct1">\r    <NumberFormat ss:Format="Percent"/>\r  </Style>\r</Styles>\r',lt=0;lt<Z.length;lt++)st+='<Worksheet ss:Name="'+tt[lt]+'" ss:RightToLeft="'+(M.mso.rtl?"1":"0")+'">\r'+Z[lt],M.mso.rtl?st+='<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">\r<DisplayRightToLeft/>\r</WorksheetOptions>\r':st+='<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"/>\r',st+="</Worksheet>\r";if(st+="</Workbook>\r","string"===M.outputMode)return st;if("base64"===M.outputMode)return T(st);try{F=new Blob([st],{type:"application/xml;charset=utf-8"}),saveAs(F,M.fileName+".xml")}catch(Pt){O(M.fileName+".xml","data:application/xml;charset=utf-8;base64,",st)}}else if("excel"===M.type&&"xlsx"===M.mso.fileFormat){var ct=[],ht=[];L=0,(W=s(Pt(D))).push.apply(W,l(Pt(D))),Pt(W).each(function(){var s=[];p(this,"th,td",L,W.length,function(t,e,n){if(null!=t){var o=y(t,e,n),r=S(t),i=C(t);if(Pt.each(ht,function(){if(L>=this.s.r&&L<=this.e.r&&s.length>=this.s.c&&s.length<=this.e.c)for(var t=0;t<=this.e.c-this.s.c;++t)s.push(null)}),(i||r)&&(i=i||1,r=r||1,ht.push({s:{r:L,c:s.length},e:{r:L+i-1,c:s.length+r-1}})),"function"!=typeof M.onCellData&&""!==o&&o===+o&&(o=+o),s.push(""!==o?o:null),r)for(var a=0;a<r-1;++a)s.push(null)}}),ct.push(s),L++});var dt=new function t(){if(!(this instanceof t))return new t;this.SheetNames=[],this.Sheets={}},ut=function(t){for(var e={},n={s:{c:1e7,r:1e7},e:{c:0,r:0}},o=0;o!==t.length;++o)for(var r=0;r!==t[o].length;++r){n.s.r>o&&(n.s.r=o),n.s.c>r&&(n.s.c=r),n.e.r<o&&(n.e.r=o),n.e.c<r&&(n.e.c=r);var i={v:t[o][r]};if(null!==i.v){var a=XLSX.utils.encode_cell({c:r,r:o});"number"==typeof i.v?i.t="n":"boolean"==typeof i.v?i.t="b":i.v instanceof Date?(i.t="n",i.z=XLSX.SSF._table[14],i.v=k(i.v)):i.t="s",e[a]=i}}return n.s.c<1e7&&(e["!ref"]=XLSX.utils.encode_range(n)),e}(ct);ut["!merges"]=ht,XLSX.utils.book_append_sheet(dt,ut,M.mso.worksheetName);var ft=XLSX.write(dt,{type:"binary",bookType:M.mso.fileFormat,bookSST:!1});try{F=new Blob([i(ft)],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"}),saveAs(F,M.fileName+"."+M.mso.fileFormat)}catch(Pt){O(M.fileName+"."+M.mso.fileFormat,"data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8,",i(ft))}}else if("excel"===M.type||"xls"===M.type||"word"===M.type||"doc"===M.type){var pt="excel"===M.type||"xls"===M.type?"excel":"word",mt="excel"===pt?"xls":"doc",gt='xmlns:x="urn:schemas-microsoft-com:office:'+pt+'"',vt="",yt="";Pt(D).filter(function(){return f(Pt(this))}).each(function(){var t=Pt(this);""===yt&&(yt=M.mso.worksheetName||t.find("caption").text()||"Table",yt=Pt.trim(yt.replace(/[\\\/[\]*:?'"]/g,"").substring(0,31))),!1===M.exportHiddenCells&&(z=t.find("tr, th, td").filter(":hidden"),_=0<z.length),L=0,H=[],B=c(this),vt+="<table><thead>",E=s(t),Pt(E).each(function(){U="",p(this,"th,td",L,E.length,function(t,e,n){if(null!==t){var o="";for(var r in U+="<th",M.mso.styles)if(M.mso.styles.hasOwnProperty(r)){var i=Pt(t).css(M.mso.styles[r]);""!==i&&"0px none rgb(0, 0, 0)"!==i&&"rgba(0, 0, 0, 0)"!==i&&(o+=""===o?'style="':";",o+=M.mso.styles[r]+":"+i)}""!==o&&(U+=" "+o+'"');var a=S(t);0<a&&(U+=' colspan="'+a+'"');var s=C(t);0<s&&(U+=' rowspan="'+s+'"'),U+=">"+y(t,e,n)+"</th>"}}),0<U.length&&(vt+="<tr>"+U+"</tr>"),L++}),vt+="</thead><tbody>",W=l(t),Pt(W).each(function(){var c=Pt(this);U="",p(this,"td,th",L,E.length+W.length,function(t,e,n){if(null!==t){var o=y(t,e,n),r="",i=Pt(t).data("tableexport-msonumberformat");for(var a in void 0===i&&"function"==typeof M.mso.onMsoNumberFormat&&(i=M.mso.onMsoNumberFormat(t,e,n)),void 0!==i&&""!==i&&(r="style=\"mso-number-format:'"+i+"'"),M.mso.styles)M.mso.styles.hasOwnProperty(a)&&(""===(i=Pt(t).css(M.mso.styles[a]))&&(i=c.css(M.mso.styles[a])),""!==i&&"0px none rgb(0, 0, 0)"!==i&&"rgba(0, 0, 0, 0)"!==i&&(r+=""===r?'style="':";",r+=M.mso.styles[a]+":"+i));U+="<td",""!==r&&(U+=" "+r+'"');var s=S(t);0<s&&(U+=' colspan="'+s+'"');var l=C(t);0<l&&(U+=' rowspan="'+l+'"'),"string"==typeof o&&""!==o&&(o=(o=b(o)).replace(/\n/g,"<br>")),U+=">"+o+"</td>"}}),0<U.length&&(vt+="<tr>"+U+"</tr>"),L++}),M.displayTableName&&(vt+="<tr><td></td></tr><tr><td></td></tr><tr><td>"+y(Pt("<p>"+M.tableName+"</p>"))+"</td></tr>"),vt+="</tbody></table>"});var bt='<html xmlns:o="urn:schemas-microsoft-com:office:office" '+gt+' xmlns="http://www.w3.org/TR/REC-html40">';if(bt+='<meta http-equiv="content-type" content="application/vnd.ms-'+pt+'; charset=UTF-8">',bt+="<head>","excel"===pt&&(bt+="<!--[if gte mso 9]>",bt+="<xml>",bt+="<x:ExcelWorkbook>",bt+="<x:ExcelWorksheets>",bt+="<x:ExcelWorksheet>",bt+="<x:Name>",bt+=yt,bt+="</x:Name>",bt+="<x:WorksheetOptions>",bt+="<x:DisplayGridlines/>",M.mso.rtl&&(bt+="<x:DisplayRightToLeft/>"),bt+="</x:WorksheetOptions>",bt+="</x:ExcelWorksheet>",bt+="</x:ExcelWorksheets>",bt+="</x:ExcelWorkbook>",bt+="</xml>",bt+="<![endif]-->"),bt+="<style>",bt+="@page { size:"+M.mso.pageOrientation+"; mso-page-orientation:"+M.mso.pageOrientation+"; }",bt+="@page Section1 {size:"+P[M.mso.pageFormat][0]+"pt "+P[M.mso.pageFormat][1]+"pt",bt+="; margin:1.0in 1.25in 1.0in 1.25in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}",bt+="div.Section1 {page:Section1;}",bt+="@page Section2 {size:"+P[M.mso.pageFormat][1]+"pt "+P[M.mso.pageFormat][0]+"pt",bt+=";mso-page-orientation:"+M.mso.pageOrientation+";margin:1.25in 1.0in 1.25in 1.0in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}",bt+="div.Section2 {page:Section2;}",bt+="br {mso-data-placement:same-cell;}",bt+="</style>",bt+="</head>",bt+="<body>",bt+='<div class="Section'+("landscape"===M.mso.pageOrientation?"2":"1")+'">',bt+=vt,bt+="</div>",bt+="</body>",bt+="</html>","string"===M.outputMode)return bt;if("base64"===M.outputMode)return T(bt);try{F=new Blob([bt],{type:"application/vnd.ms-"+M.type}),saveAs(F,M.fileName+"."+mt)}catch(Pt){O(M.fileName+"."+mt,"data:application/vnd.ms-"+pt+";base64,",bt)}}else if("png"===M.type)html2canvas(Pt(D)[0]).then(function(t){for(var e=t.toDataURL(),n=atob(e.substring(22)),o=new ArrayBuffer(n.length),r=new Uint8Array(o),i=0;i<n.length;i++)r[i]=n.charCodeAt(i);if("string"===M.outputMode)return n;if("base64"===M.outputMode)return T(e);if("window"!==M.outputMode)try{F=new Blob([o],{type:"image/png"}),saveAs(F,M.fileName+".png")}catch(t){O(M.fileName+".png","data:image/png,",F)}else window.open(e)});else if("pdf"===M.type)if(!0===M.pdfmake.enabled){var xt=[],wt=[];L=0,H=[];for(var St=function(t,e,n){var o=0;return Pt(t).each(function(){var a=[];p(this,e,L,n,function(t,e,n){if(null!=t){var o=S(t),r=C(t),i=y(t,e,n)||" ";1<o||1<r?(o=o||1,r=r||1,a.push({colSpan:o,rowSpan:r,text:i})):a.push(i)}else a.push(" ")}),a.length&&wt.push(a),o<a.length&&(o=a.length),L++}),o},Ct=St(E=s(Pt(this)),"th,td",E.length),Nt=xt.length;Nt<Ct;Nt++)xt.push("*");St(W=l(Pt(this)),"th,td",E.length+W.length);var At={content:[{table:{headerRows:E.length,widths:xt,body:wt}}]};Pt.extend(!0,At,M.pdfmake.docDefinition),pdfMake.fonts={Roboto:{normal:"Roboto-Regular.ttf",bold:"Roboto-Medium.ttf",italics:"Roboto-Italic.ttf",bolditalics:"Roboto-MediumItalic.ttf"}},Pt.extend(!0,pdfMake.fonts,M.pdfmake.fonts),pdfMake.createPdf(At).getBuffer(function(t){try{var e=new Blob([t],{type:"application/pdf"});saveAs(e,M.fileName+".pdf")}catch(e){O(M.fileName+".pdf","application/pdf",t)}})}else if(!1===M.jspdf.autotable){var kt={dim:{w:A(Pt(D).first().get(0),"width","mm"),h:A(Pt(D).first().get(0),"height","mm")},pagesplit:!1},jt=new jsPDF(M.jspdf.orientation,M.jspdf.unit,M.jspdf.format);jt.addHTML(Pt(D).first(),M.jspdf.margins.left,M.jspdf.margins.top,kt,function(){n(jt,!1)})}else{var Ot=M.jspdf.autotable.tableExport;if("string"==typeof M.jspdf.format&&"bestfit"===M.jspdf.format.toLowerCase()){var Tt="",Ft="",Mt=0;Pt(D).each(function(){if(f(Pt(this))){var t=A(Pt(this).get(0),"width","pt");if(Mt<t){for(var e in t>P.a0[0]&&(Tt="a0",Ft="l"),P)P.hasOwnProperty(e)&&P[e][1]>t&&(Ft="l",P[Tt=e][0]>t&&(Ft="p"));Mt=t}}}),M.jspdf.format=""===Tt?"a4":Tt,M.jspdf.orientation=""===Ft?"w":Ft}null==Ot.doc&&(Ot.doc=new jsPDF(M.jspdf.orientation,M.jspdf.unit,M.jspdf.format),"function"==typeof M.jspdf.onDocCreated&&M.jspdf.onDocCreated(Ot.doc)),!0===Ot.outputImages&&(Ot.images={}),void 0!==Ot.images&&(Pt(D).filter(function(){return f(Pt(this))}).each(function(){var t=0;!(H=[])===M.exportHiddenCells&&(z=Pt(this).find("tr, th, td").filter(":hidden"),_=0<z.length),E=s(Pt(this)),W=l(Pt(this)),Pt(W).each(function(){p(this,"td,th",E.length+t,E.length+W.length,function(t){!function e(n,t,o){if(null!=n)if(n.hasAttribute("data-tableexport-canvas")){var r=(new Date).getTime();Pt(n).attr("data-tableexport-canvas",r),o.images[r]={url:'[data-tableexport-canvas="'+r+'"]',src:null}}else"undefined"!==t&&null!=t&&t.each(function(){if(Pt(this).is("img")){var t=j(this.src);o.images[t]={url:this.src,src:this.src}}e(n,Pt(this).children(),o)})}(t,Pt(t).children(),Ot)}),t++})}),E=[],W=[]),function(t,e){function r(){e(i)}function n(n){if(n.url)if(n.src){var o=new Image;i=++a,o.crossOrigin="Anonymous",o.onerror=o.onload=function(){if(o.complete&&(0===o.src.indexOf("data:image/")&&(o.width=n.width||o.width||0,o.height=n.height||o.height||0),o.width+o.height)){var t=document.createElement("canvas"),e=t.getContext("2d");t.width=o.width,t.height=o.height,e.drawImage(o,0,0),n.src=t.toDataURL("image/png")}--a||r()},o.src=n.url}else{var t=Pt(n.url);t.length&&(i=++a,html2canvas(t[0]).then(function(t){n.src=t.toDataURL("image/png"),--a||r()}))}}var i=0,a=0;if(void 0!==t.images)for(var o in t.images)t.images.hasOwnProperty(o)&&n(t.images[o]);a||r()}(Ot,function(){Pt(D).filter(function(){return f(Pt(this))}).each(function(){var i;if(L=0,!(H=[])===M.exportHiddenCells&&(z=Pt(this).find("tr, th, td").filter(":hidden"),_=0<z.length),B=c(this),Ot.columns=[],Ot.rows=[],Ot.teCells={},"function"==typeof Ot.onTable&&!1===Ot.onTable(Pt(this),M))return!0;M.jspdf.autotable.tableExport=null;var r=Pt.extend(!0,{},M.jspdf.autotable);if(M.jspdf.autotable.tableExport=Ot,r.margin={},Pt.extend(!0,r.margin,M.jspdf.margins),r.tableExport=Ot,"function"!=typeof r.beforePageContent&&(r.beforePageContent=function(t){if(1===t.pageCount){var e=t.table.rows.concat(t.table.headerRow);Pt.each(e,function(){0<this.height&&(this.height+=(2-R)/2*this.styles.fontSize,t.table.height+=(2-R)/2*this.styles.fontSize)})}}),"function"!=typeof r.createdHeaderCell&&(r.createdHeaderCell=function(t,e){if(t.styles=Pt.extend({},e.row.styles),void 0!==Ot.columns[e.column.dataKey]){var n,o=Ot.columns[e.column.dataKey];void 0!==o.rect&&(t.contentWidth=o.rect.width,void 0!==Ot.heightRatio&&0!==Ot.heightRatio||(n=e.row.raw[e.column.dataKey].rowspan?e.row.raw[e.column.dataKey].rect.height/e.row.raw[e.column.dataKey].rowspan:e.row.raw[e.column.dataKey].rect.height,Ot.heightRatio=t.styles.rowHeight/n),
(n=e.row.raw[e.column.dataKey].rect.height*Ot.heightRatio)>t.styles.rowHeight&&(t.styles.rowHeight=n)),t.styles.halign="inherit"===r.headerStyles.halign?"center":r.headerStyles.halign,t.styles.valign=r.headerStyles.valign,void 0!==o.style&&!0!==o.style.hidden&&("inherit"===r.headerStyles.halign&&(t.styles.halign=o.style.align),"inherit"===r.styles.fillColor&&(t.styles.fillColor=o.style.bcolor),"inherit"===r.styles.textColor&&(t.styles.textColor=o.style.color),"inherit"===r.styles.fontStyle&&(t.styles.fontStyle=o.style.fstyle))}}),"function"!=typeof r.createdCell&&(r.createdCell=function(t,e){var n=Ot.teCells[e.row.index+":"+e.column.dataKey];t.styles.halign="inherit"===r.styles.halign?"center":r.styles.halign,t.styles.valign=r.styles.valign,void 0!==n&&void 0!==n.style&&!0!==n.style.hidden&&("inherit"===r.styles.halign&&(t.styles.halign=n.style.align),"inherit"===r.styles.fillColor&&(t.styles.fillColor=n.style.bcolor),"inherit"===r.styles.textColor&&(t.styles.textColor=n.style.color),"inherit"===r.styles.fontStyle&&(t.styles.fontStyle=n.style.fstyle))}),"function"!=typeof r.drawHeaderCell&&(r.drawHeaderCell=function(t,e){var n=Ot.columns[e.column.dataKey];return(!0!==n.style.hasOwnProperty("hidden")||!0!==n.style.hidden)&&0<=n.rowIndex&&h(t,e,n)}),"function"!=typeof r.drawCell&&(r.drawCell=function(t,e){var n=Ot.teCells[e.row.index+":"+e.column.dataKey];if(!0!==(void 0!==n&&void 0!==n.elements&&n.elements.length&&n.elements[0].hasAttribute("data-tableexport-canvas"))){if(h(t,e,n))if(Ot.doc.rect(t.x,t.y,t.width,t.height,t.styles.fillStyle),void 0!==n&&void 0!==n.elements&&n.elements.length){var o=t.height/n.rect.height;(o>Ot.dh||void 0===Ot.dh)&&(Ot.dh=o),Ot.dw=t.width/n.rect.width;var r=t.textPos.y;!function c(h,t,d){t.each(function(){if(Pt(this).is("div")){var t=x(N(this,"background-color"),[255,255,255]),e=x(N(this,"border-top-color"),[0,0,0]),n=A(this,"border-top-width",M.jspdf.unit),o=this.getBoundingClientRect(),r=this.offsetLeft*d.dw,i=this.offsetTop*d.dh,a=o.width*d.dw,s=o.height*d.dh;d.doc.setDrawColor.apply(void 0,e),d.doc.setFillColor.apply(void 0,t),d.doc.setLineWidth(n),d.doc.rect(h.x+r,h.y+i,a,s,n?"FD":"F")}else if(Pt(this).is("img")){var l=j(this.src);u(h,this,l,d)}c(h,Pt(this).children(),d)})}(t,n.elements,Ot),t.textPos.y=r,d(t,n.elements,Ot)}else d(t,{},Ot)}else{var i=n.elements[0];u(t,i,Pt(i).attr("data-tableexport-canvas"),Ot)}return!1}),Ot.headerrows=[],E=s(Pt(this)),Pt(E).each(function(){i=0,Ot.headerrows[L]=[],p(this,"th,td",L,E.length,function(t,e,n){var o=w(t);o.title=y(t,e,n),o.key=i++,o.rowIndex=L,Ot.headerrows[L].push(o)}),L++}),0<L)for(var e=L-1;0<=e;)Pt.each(Ot.headerrows[e],function(){var t=this;0<e&&null===this.rect&&(t=Ot.headerrows[e-1][this.key]),null!==t&&0<=t.rowIndex&&(!0!==t.style.hasOwnProperty("hidden")||!0!==t.style.hidden)&&Ot.columns.push(t)}),e=0<Ot.columns.length?-1:e-1;var a=0;W=[],W=l(Pt(this)),Pt(W).each(function(){var r=[];i=0,p(this,"td,th",L,E.length+W.length,function(t,e,n){var o;void 0===Ot.columns[i]&&(o={title:"",key:i,style:{hidden:!0}},Ot.columns.push(o)),null!=t?(o=w(t)).elements=t.hasAttribute("data-tableexport-canvas")?Pt(t):Pt(t).children():(o=Pt.extend(!0,{},Ot.teCells[a+":"+(i-1)])).colspan=-1,Ot.teCells[a+":"+i++]=o,r.push(y(t,e,n))}),r.length&&(Ot.rows.push(r),a++),L++}),"function"==typeof Ot.onBeforeAutotable&&Ot.onBeforeAutotable(Pt(this),Ot.columns,Ot.rows,r),Ot.doc.autoTable(Ot.columns,Ot.rows,r),"function"==typeof Ot.onAfterAutotable&&Ot.onAfterAutotable(Pt(this),r),M.jspdf.autotable.startY=Ot.doc.autoTableEndPosY()+r.margin.top}),n(Ot.doc,void 0!==Ot.images&&!1===jQuery.isEmptyObject(Ot.images)),void 0!==Ot.headerrows&&(Ot.headerrows.length=0),void 0!==Ot.columns&&(Ot.columns.length=0),void 0!==Ot.rows&&(Ot.rows.length=0),delete Ot.doc,Ot.doc=null})}return this}}});if("object"==typeof e){var n=["object"==typeof module&&"object"==typeof module.exports?module.exports:null,"undefined"!=typeof window?window:null,t&&t!==window?t:null];for(var o in e)n[0]&&(n[0][o]=e[o]),n[1]&&"__esModule"!==o&&(n[1][o]=e[o]),n[2]&&(n[2][o]=e[o])}}(this);