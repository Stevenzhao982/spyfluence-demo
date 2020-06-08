!function(e,t){var n=t();if("object"==typeof n){var r=["object"==typeof module&&"object"==typeof module.exports?module.exports:null,"undefined"!=typeof window?window:null,e&&e!==window?e:null];for(var i in n)r[0]&&(r[0][i]=n[i]),r[1]&&"__esModule"!==i&&(r[1][i]=n[i]),r[2]&&(r[2][i]=n[i])}}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(t){return e[t]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=404)}({10:function(e){function t(){throw new Error("setTimeout has not been defined")}function n(){throw new Error("clearTimeout has not been defined")}function r(e){if(a===setTimeout)return setTimeout(e,0);if((a===t||!a)&&setTimeout)return a=setTimeout,setTimeout(e,0);try{return a(e,0)}catch(n){try{return a.call(null,e,0)}catch(n){return a.call(this,e,0)}}}function i(){p&&f&&(p=!1,f.length?h=f.concat(h):g=-1,h.length&&o())}function o(){if(!p){var e=r(i);p=!0;for(var t=h.length;t;){for(f=h,h=[];++g<t;)f&&f[g].run();g=-1,t=h.length}f=null,p=!1,function(e){if(c===clearTimeout)return clearTimeout(e);if((c===n||!c)&&clearTimeout)return c=clearTimeout,clearTimeout(e);try{c(e)}catch(t){try{return c.call(null,e)}catch(t){return c.call(this,e)}}}(e)}}function l(e,t){this.fun=e,this.array=t}function s(){}var a,c,u=e.exports={};!function(){try{a="function"==typeof setTimeout?setTimeout:t}catch(e){a=t}try{c="function"==typeof clearTimeout?clearTimeout:n}catch(e){c=n}}();var f,h=[],p=!1,g=-1;u.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new l(e,t)),1!==h.length||p||r(o)},l.prototype.run=function(){this.fun.apply(null,this.array)},u.title="browser",u.browser=!0,u.env={},u.argv=[],u.version="",u.versions={},u.on=s,u.addListener=s,u.once=s,u.off=s,u.removeListener=s,u.removeAllListeners=s,u.emit=s,u.prependListener=s,u.prependOnceListener=s,u.listeners=function(){return[]},u.binding=function(){throw new Error("process.binding is not supported")},u.cwd=function(){return"/"},u.chdir=function(){throw new Error("process.chdir is not supported")},u.umask=function(){return 0}},2:function(e){var t;t=function(){return this}();try{t=t||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(t=window)}e.exports=t},404:function(e,t,n){"use strict";n.r(t),n.d(t,"markdown",function(){return i});var r=n(405),i={Markdown:r,parse:r.parse,toHTML:r.toHTML,toHTMLTree:r.toHTMLTree,renderJsonML:r.renderJsonML}},405:function(e,t,n){!function(e){function t(){return"Markdown.mk_block( "+uneval(this.toString())+", "+uneval(this.trailing)+", "+uneval(this.lineNumber)+" )"}function r(){var e=n(406);return"Markdown.mk_block( "+e.inspect(this.toString())+", "+e.inspect(this.trailing)+", "+e.inspect(this.lineNumber)+" )"}function i(e){for(var t=0,n=-1;-1!==(n=e.indexOf("\n",n+1));)t++;return t}function o(e,t){function n(e){this.len_after=e,this.name="close_"+t}var r=e+"_state",i="strong"==e?"em_state":"strong_state";return function(o){if(this[r][0]==t)return this[r].shift(),[o.length,new n(o.length-t.length)];var l=this[i].slice(),s=this[r].slice();this[r].unshift(t);var a=this.processInline(o.substr(t.length)),c=a[a.length-1];return this[r].shift(),c instanceof n?(a.pop(),[o.length-c.len_after,[e].concat(a)]):(this[i]=l,this[r]=s,[t.length,t])}}function l(e){return g(e)&&e.length>1&&"object"==typeof e[1]&&!g(e[1])?e[1]:void 0}function s(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function c(e){if("string"==typeof e)return s(e);var t=e.shift(),n={},r=[];for(!e.length||"object"!=typeof e[0]||e[0]instanceof Array||(n=e.shift());e.length;)r.push(c(e.shift()));var i="";for(var o in n)i+=" "+o+'="'+s(n[o])+'"';return"img"==t||"br"==t||"hr"==t?"<"+t+i+"/>":"<"+t+i+">"+r.join("")+"</"+t+">"}var u=e.Markdown=function(e){switch(typeof e){case"undefined":this.dialect=u.dialects.Gruber;break;case"object":this.dialect=e;break;default:if(!(e in u.dialects))throw new Error("Unknown Markdown dialect '"+String(e)+"'");this.dialect=u.dialects[e]}this.em_state=[],this.strong_state=[],this.debug_indent=""};e.parse=function(e,t){return new u(t).toTree(e)},e.toHTML=function(t,n,r){var i=e.toHTMLTree(t,n,r);return e.renderJsonML(i)},e.toHTMLTree=function(e,t,n){"string"==typeof e&&(e=this.parse(e,t));var r=l(e),i={};r&&r.references&&(i=r.references);var o=function s(e,t,n){var r;n=n||{};var i=e.slice(0);"function"==typeof n.preprocessTreeNode&&(i=n.preprocessTreeNode(i,t));var o=l(i);if(o){for(r in i[1]={},o)i[1][r]=o[r];o=i[1]}if("string"==typeof i)return i;switch(i[0]){case"header":i[0]="h"+i[1].level,delete i[1].level;break;case"bulletlist":i[0]="ul";break;case"numberlist":i[0]="ol";break;case"listitem":i[0]="li";break;case"para":i[0]="p";break;case"markdown":i[0]="html",o&&delete o.references;break;case"code_block":i[0]="pre",r=o?2:1;var a=["code"];a.push.apply(a,i.splice(r,i.length-r)),i[r]=a;break;case"inlinecode":i[0]="code";break;case"img":i[1].src=i[1].href,delete i[1].href;break;case"linebreak":i[0]="br";break;case"link":i[0]="a";break;case"link_ref":if(i[0]="a",!(c=t[o.ref]))return o.original;delete o.ref,o.href=c.href,c.title&&(o.title=c.title),delete o.original;break;case"img_ref":var c;if(i[0]="img",!(c=t[o.ref]))return o.original;delete o.ref,o.src=c.href,c.title&&(o.title=c.title),delete o.original}if(r=1,o){for(var u in i[1]){r=2;break}1===r&&i.splice(r,1)}for(;r<i.length;++r)i[r]=s(i[r],t,n);return i}(e,i,n);return function a(e){for(var t=l(e)?2:1;t<e.length;)"string"==typeof e[t]?t+1<e.length&&"string"==typeof e[t+1]?e[t]+=e.splice(t+1,1)[0]:++t:(a(e[t]),++t)}(o),o};var f=u.mk_block=function(e,n,i){1==arguments.length&&(n="\n\n");var o=new String(e);return o.trailing=n,o.inspect=r,o.toSource=t,null!=i&&(o.lineNumber=i),o};u.prototype.split_blocks=function(e){e=e.replace(/(\r\n|\n|\r)/g,"\n");var t,n=/([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,r=[],o=1;for(null!=(t=/^(\s*\n)/.exec(e))&&(o+=i(t[0]),n.lastIndex=t[0].length);null!==(t=n.exec(e));)"\n#"==t[2]&&(t[2]="\n",n.lastIndex--),r.push(f(t[1],t[2],o)),o+=i(t[0]);return r},u.prototype.processBlock=function(e,t){var n=this.dialect.block,r=n.__order__;if("__call__"in n)return n.__call__.call(this,e,t);for(var i=0;i<r.length;i++){var o=n[r[i]].call(this,e,t);if(o)return(!g(o)||o.length>0&&!g(o[0]))&&this.debug(r[i],"didn't return a proper array"),o}return[]},u.prototype.processInline=function(e){return this.dialect.inline.__call__.call(this,String(e))},u.prototype.toTree=function(e,t){var n=e instanceof Array?e:this.split_blocks(e),r=this.tree;try{for(this.tree=t||this.tree||["markdown"];n.length;){var i=this.processBlock(n.shift(),n);i.length&&this.tree.push.apply(this.tree,i)}return this.tree}finally{t&&(this.tree=r)}},u.prototype.debug=function(){var e=Array.prototype.slice.call(arguments);e.unshift(this.debug_indent),"undefined"!=typeof print&&print.apply(print,e),"undefined"!=typeof console&&void 0!==console.log&&console.log.apply(null,e)},u.prototype.loop_re_over_block=function(e,t,n){for(var r,i=t.valueOf();i.length&&null!=(r=e.exec(i));)i=i.substr(r[0].length),n.call(this,r);return i},u.dialects={},u.dialects.Gruber={block:{atxHeader:function(e,t){var n=e.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);if(n){var r=["header",{level:n[1].length}];return Array.prototype.push.apply(r,this.processInline(n[2])),n[0].length<e.length&&t.unshift(f(e.substr(n[0].length),e.trailing,e.lineNumber+2)),[r]}},setextHeader:function(e,t){var n=e.match(/^(.*)\n([-=])\2\2+(?:\n|$)/);if(n){var r=["header",{level:"="===n[2]?1:2},n[1]];return n[0].length<e.length&&t.unshift(f(e.substr(n[0].length),e.trailing,e.lineNumber+2)),[r]}},code:function(e,t){var n=[],r=/^(?: {0,3}\t| {4})(.*)\n?/;if(e.match(r)){e:for(;;){var i=this.loop_re_over_block(r,e.valueOf(),function(e){n.push(e[1])});if(i.length){t.unshift(f(i,e.trailing));break e}if(!t.length)break e;if(!t[0].match(r))break e;n.push(e.trailing.replace(/[^\n]/g,"").substring(2)),e=t.shift()}return[["code_block",n.join("\n")]]}},horizRule:function(e,t){var n=e.match(/^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/);if(n){var r=[["hr"]];return n[1]&&r.unshift.apply(r,this.processBlock(n[1],[])),n[3]&&t.unshift(f(n[3])),r}},lists:function(){function e(e){return new RegExp("(?:^("+a+"{0,"+e+"} {0,3})("+o+")\\s+)|(^"+a+"{0,"+(e-1)+"}[ ]{0,4})")}function t(e){return e.replace(/ {0,3}\t/g,"    ")}function n(e,t,n,r){if(t)e.push(["para"].concat(n));else{var i=e[e.length-1]instanceof Array&&"para"==e[e.length-1][0]?e[e.length-1]:e;r&&e.length>1&&n.unshift(r);for(var o=0;o<n.length;o++){var l=n[o];"string"==typeof l&&i.length>1&&"string"==typeof i[i.length-1]?i[i.length-1]+=l:i.push(l)}}}function r(e,t){for(var n=new RegExp("^("+a+"{"+e+"}.*?\\n?)*$"),r=new RegExp("^"+a+"{"+e+"}","gm"),i=[];t.length>0&&n.exec(t[0]);){var o=t.shift(),l=o.replace(r,"");i.push(f(l,o.trailing,o.lineNumber))}return i}function i(e,t,n){var r=e.list,i=r[r.length-1];if(!(i[1]instanceof Array&&"para"==i[1][0]))if(t+1==n.length)i.push(["para"].concat(i.splice(1,i.length-1)));else{var o=i.pop();i.push(["para"].concat(i.splice(1,i.length-1)),o)}}var o="[*+-]|\\d+\\.",l=/[*+-]/,s=new RegExp("^( {0,3})("+o+")[ \t]+"),a="(?: {0,3}\\t| {4})";return function(o,a){function c(e){var t=l.exec(e[2])?["bulletlist"]:["numberlist"];return g.push({list:t,indent:e[1]}),t}var u=o.match(s);if(u){for(var f,p,g=[],d=c(u),v=!1,b=[g[0].list];;){for(var y=o.split(/(?=\n)/),m="",_=0;_<y.length;_++){var k="",w=y[_].replace(/^\n/,function(e){return k=e,""}),x=e(g.length);if(void 0!==(u=w.match(x))[1]){m.length&&(n(f,v,this.processInline(m),k),v=!1,m=""),u[1]=t(u[1]);var j=Math.floor(u[1].length/4)+1;if(j>g.length)d=c(u),f.push(d),f=d[1]=["listitem"];else{var S=!1;for(p=0;p<g.length;p++)if(g[p].indent==u[1]){d=g[p].list,g.splice(p+1,g.length-(p+1)),S=!0;break}S||(++j<=g.length?(g.splice(j,g.length-j),d=g[j-1].list):(d=c(u),f.push(d))),f=["listitem"],d.push(f)}k=""}w.length>u[0].length&&(m+=k+w.substr(u[0].length))}m.length&&(n(f,v,this.processInline(m),k),v=!1,m="");var O=r(g.length,a);O.length>0&&(h(g,i,this),f.push.apply(f,this.toTree(O,[])));var M=a[0]&&a[0].valueOf()||"";if(!M.match(s)&&!M.match(/^ /))break;o=a.shift();var T=this.dialect.block.horizRule(o,a);if(T){b.push.apply(b,T);break}h(g,i,this),v=!0}return b}}}(),blockquote:function(e,t){if(e.match(/^>/m)){var n=[];if(">"!=e[0]){for(var r=e.split(/\n/),i=[],o=e.lineNumber;r.length&&">"!=r[0][0];)i.push(r.shift()),o++;var s=f(i.join("\n"),"\n",e.lineNumber);n.push.apply(n,this.processBlock(s,[])),e=f(r.join("\n"),e.trailing,o)}for(;t.length&&">"==t[0][0];){var a=t.shift();e=f(e+e.trailing+a,a.trailing,e.lineNumber)}var c=e.replace(/^> ?/gm,""),u=(this.tree,this.toTree(c,["blockquote"])),h=l(u);return h&&h.references&&(delete h.references,d(h)&&u.splice(1,1)),n.push(u),n}},referenceDefn:function(e,t){var n=/^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;if(e.match(n)){l(this.tree)||this.tree.splice(1,0,{});var r=l(this.tree);void 0===r.references&&(r.references={});var i=this.loop_re_over_block(n,e,function(e){e[2]&&"<"==e[2][0]&&">"==e[2][e[2].length-1]&&(e[2]=e[2].substring(1,e[2].length-1));var t=r.references[e[1].toLowerCase()]={href:e[2]};void 0!==e[4]?t.title=e[4]:void 0!==e[5]&&(t.title=e[5])});return i.length&&t.unshift(f(i,e.trailing)),[]}},para:function(e){return[["para"].concat(this.processInline(e))]}}},u.dialects.Gruber.inline={__oneElement__:function(e,t,n){var r,i;return t=t||this.dialect.inline.__patterns__,(r=new RegExp("([\\s\\S]*?)("+(t.source||t)+")").exec(e))?r[1]?[r[1].length,r[1]]:(r[2]in this.dialect.inline&&(i=this.dialect.inline[r[2]].call(this,e.substr(r.index),r,n||[])),i=i||[r[2].length,r[2]]):[e.length,e]},__call__:function(e,t){function n(e){"string"==typeof e&&"string"==typeof i[i.length-1]?i[i.length-1]+=e:i.push(e)}for(var r,i=[];e.length>0;)r=this.dialect.inline.__oneElement__.call(this,e,t,i),e=e.substr(r.shift()),h(r,n);return i},"]":function(){},"}":function(){},__escape__:/^\\[\\`\*_{}\[\]()#\+.!\-]/,"\\":function(e){return this.dialect.inline.__escape__.exec(e)?[2,e.charAt(1)]:[1,"\\"]},"![":function(e){var t=e.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);if(t){t[2]&&"<"==t[2][0]&&">"==t[2][t[2].length-1]&&(t[2]=t[2].substring(1,t[2].length-1)),t[2]=this.dialect.inline.__call__.call(this,t[2],/\\/)[0];var n={alt:t[1],href:t[2]||""};return void 0!==t[4]&&(n.title=t[4]),[t[0].length,["img",n]]}return(t=e.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/))?[t[0].length,["img_ref",{alt:t[1],ref:t[2].toLowerCase(),original:t[0]}]]:[2,"!["]},"[":function(e){var t=String(e),n=u.DialectHelpers.inline_until_char.call(this,e.substr(1),"]");if(!n)return[1,"["];var r,i=1+n[0],o=n[1],l=(e=e.substr(i)).match(/^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/);if(l){var s=l[1];if(i+=l[0].length,s&&"<"==s[0]&&">"==s[s.length-1]&&(s=s.substring(1,s.length-1)),!l[3])for(var a=1,c=0;c<s.length;c++)switch(s[c]){case"(":a++;break;case")":0==--a&&(i-=s.length-c,s=s.substring(0,c))}return r={href:(s=this.dialect.inline.__call__.call(this,s,/\\/)[0])||""},void 0!==l[3]&&(r.title=l[3]),[i,["link",r].concat(o)]}return(l=e.match(/^\s*\[(.*?)\]/))?[i+=l[0].length,["link_ref",r={ref:(l[1]||String(o)).toLowerCase(),original:t.substr(0,i)}].concat(o)]:1==o.length&&"string"==typeof o[0]?[i,["link_ref",r={ref:o[0].toLowerCase(),original:t.substr(0,i)},o[0]]]:[1,"["]},"<":function(e){var t;return null!=(t=e.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/))?t[3]?[t[0].length,["link",{href:"mailto:"+t[3]},t[3]]]:"mailto"==t[2]?[t[0].length,["link",{href:t[1]},t[1].substr("mailto:".length)]]:[t[0].length,["link",{href:t[1]},t[1]]]:[1,"<"]},"`":function(e){var t=e.match(/(`+)(([\s\S]*?)\1)/);return t&&t[2]?[t[1].length+t[2].length,["inlinecode",t[3]]]:[1,"`"]},"  \n":function(){return[3,["linebreak"]]}},u.dialects.Gruber.inline["**"]=o("strong","**"),u.dialects.Gruber.inline.__=o("strong","__"),u.dialects.Gruber.inline["*"]=o("em","*"),u.dialects.Gruber.inline._=o("em","_"),u.buildBlockOrder=function(e){var t=[];for(var n in e)"__order__"!=n&&"__call__"!=n&&t.push(n);e.__order__=t},u.buildInlinePatterns=function(e){var t=[];for(var n in e)if(!n.match(/^__.*__$/)){var r=n.replace(/([\\.*+?|()\[\]{}])/g,"\\$1").replace(/\n/,"\\n");t.push(1==n.length?r:"(?:"+r+")")}t=t.join("|"),e.__patterns__=t;var i=e.__call__;e.__call__=function(e,n){return null!=n?i.call(this,e,n):i.call(this,e,t)}},u.DialectHelpers={},u.DialectHelpers.inline_until_char=function(e,t){for(var n=0,r=[];;){if(e.charAt(n)==t)return[++n,r];if(n>=e.length)return null;var i=this.dialect.inline.__oneElement__.call(this,e.substr(n));n+=i[0],r.push.apply(r,i.slice(1))}},u.subclassDialect=function(e){function t(){}function n(){}return t.prototype=e.block,n.prototype=e.inline,{block:new t,inline:new n}},u.buildBlockOrder(u.dialects.Gruber.block),u.buildInlinePatterns(u.dialects.Gruber.inline),u.dialects.Maruku=u.subclassDialect(u.dialects.Gruber),u.dialects.Maruku.processMetaHash=function(e){for(var t=function(e){for(var t=e.split(""),n=[""],r=!1;t.length;){var i=t.shift();switch(i){case" ":r?n[n.length-1]+=i:n.push("");break;case"'":case'"':r=!r;break;case"\\":i=t.shift();default:n[n.length-1]+=i}}return n}(e),n={},r=0;r<t.length;++r)if(/^#/.test(t[r]))n.id=t[r].substring(1);else if(/^\./.test(t[r]))n["class"]?n["class"]=n["class"]+t[r].replace(/./," "):n["class"]=t[r].substring(1);else if(/\=/.test(t[r])){var i=t[r].split(/\=/);n[i[0]]=i[1]}return n},u.dialects.Maruku.block.document_meta=function(e){if(!(e.lineNumber>1)&&e.match(/^(?:\w+:.*\n)*\w+:.*$/)){l(this.tree)||this.tree.splice(1,0,{});var t=e.split(/\n/);for(p in t){var n=t[p].match(/(\w+):\s*(.*)$/),r=n[1].toLowerCase(),i=n[2];this.tree[1][r]=i}return[]}},u.dialects.Maruku.block.block_meta=function(e){var t=e.match(/(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/);if(t){var n,r=this.dialect.processMetaHash(t[2]);if(""===t[1]){var i=this.tree[this.tree.length-1];if(n=l(i),"string"==typeof i)return;for(a in n||(n={},i.splice(1,0,n)),r)n[a]=r[a];return[]}var o=e.replace(/\n.*$/,""),s=this.processBlock(o,[]);for(a in(n=l(s[0]))||(n={},s[0].splice(1,0,n)),r)n[a]=r[a];return s}},u.dialects.Maruku.block.definition_list=function(e,t){var n,r=/^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,i=["dl"];if(s=e.match(r)){for(var o=[e];t.length&&r.exec(t[0]);)o.push(t.shift());for(var l=0;l<o.length;++l){var s,a=(s=o[l].match(r))[1].replace(/\n$/,"").split(/\n/),c=s[2].split(/\n:\s+/);for(n=0;n<a.length;++n)i.push(["dt",a[n]]);for(n=0;n<c.length;++n)i.push(["dd"].concat(this.processInline(c[n].replace(/(\n)\s+/,"$1"))))}return[i]}},u.dialects.Maruku.block.table=function(e){var t,n,r=function(e,t){(t=t||"\\s").match(/^[\\|\[\]{}?*.+^$]$/)&&(t="\\"+t);for(var n,r=[],i=new RegExp("^((?:\\\\.|[^\\\\"+t+"])*)"+t+"(.*)");n=e.match(i);)r.push(n[1]),e=n[2];return r.push(e),r};if(n=e.match(/^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/))n[3]=n[3].replace(/^\s*\|/gm,"");else if(!(n=e.match(/^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/)))return;var i=["table",["thead",["tr"]],["tbody"]];n[2]=n[2].replace(/\|\s*$/,"").split("|");var o=[];for(h(n[2],function(e){e.match(/^\s*-+:\s*$/)?o.push({align:"right"}):e.match(/^\s*:-+\s*$/)?o.push({align:"left"}):e.match(/^\s*:-+:\s*$/)?o.push({align:"center"}):o.push({})}),n[1]=r(n[1].replace(/\|\s*$/,""),"|"),t=0;t<n[1].length;t++)i[1][1].push(["th",o[t]||{}].concat(this.processInline(n[1][t].trim())));return h(n[3].replace(/\|\s*$/gm,"").split("\n"),function(e){var n=["tr"];for(e=r(e,"|"),t=0;t<e.length;t++)n.push(["td",o[t]||{}].concat(this.processInline(e[t].trim())));i[2].push(n)},this),[i]},u.dialects.Maruku.inline["{:"]=function(e,t,n){if(!n.length)return[2,"{:"];var r=n[n.length-1];if("string"==typeof r)return[2,"{:"];var i=e.match(/^\{:\s*((?:\\\}|[^\}])*)\s*\}/);if(!i)return[2,"{:"];var o=this.dialect.processMetaHash(i[1]),s=l(r);for(var a in s||(s={},r.splice(1,0,s)),o)s[a]=o[a];return[i[0].length,""]},u.dialects.Maruku.inline.__escape__=/^\\[\\`\*_{}\[\]()#\+.!\-|:]/,u.buildBlockOrder(u.dialects.Maruku.block),u.buildInlinePatterns(u.dialects.Maruku.inline);var h,g=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)};h=Array.prototype.forEach?function(e,t,n){return e.forEach(t,n)}:function(e,t,n){for(var r=0;r<e.length;r++)t.call(n||e,e[r],r,e)};var d=function(e){for(var t in e)if(hasOwnProperty.call(e,t))return!1;return!0};e.renderJsonML=function(e,t){(t=t||{}).root=t.root||!1;var n=[];if(t.root)n.push(c(e));else for(e.shift(),!e.length||"object"!=typeof e[0]||e[0]instanceof Array||e.shift();e.length;)n.push(c(e.shift()));return n.join("\n\n")}}(t)},406:function(e,t,n){(function(e,r){function i(e,n){var r={seen:[],stylize:l};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),f(n)?r.showHidden=n:n&&t._extend(r,n),d(r.showHidden)&&(r.showHidden=!1),d(r.depth)&&(r.depth=2),d(r.colors)&&(r.colors=!1),d(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=o),s(r,e,r.depth)}function o(e,t){var n=i.styles[t];return n?"\x1b["+i.colors[n][0]+"m"+e+"\x1b["+i.colors[n][1]+"m":e}function l(e){return e}function s(e,n,r){if(e.customInspect&&n&&_(n.inspect)&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var i=n.inspect(r,e);return g(i)||(i=s(e,i,r)),i}var o=function(e,t){if(d(t))return e.stylize("undefined","undefined");if(g(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}return p(t)?e.stylize(""+t,"number"):f(t)?e.stylize(""+t,"boolean"):h(t)?e.stylize("null","null"):void 0}(e,n);if(o)return o;var l=Object.keys(n),b=function(){var e={};return l.forEach(function(t){e[t]=!0}),e}();if(e.showHidden&&(l=Object.getOwnPropertyNames(n)),m(n)&&(l.indexOf("message")>=0||l.indexOf("description")>=0))return a(n);if(0===l.length){if(_(n)){var k=n.name?": "+n.name:"";return e.stylize("[Function"+k+"]","special")}if(v(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(y(n))return e.stylize(Date.prototype.toString.call(n),"date");if(m(n))return a(n)}var w,j="",S=!1,O=["{","}"];return u(n)&&(S=!0,O=["[","]"]),_(n)&&(j=" [Function"+(n.name?": "+n.name:"")+"]"),v(n)&&(j=" "+RegExp.prototype.toString.call(n)),y(n)&&(j=" "+Date.prototype.toUTCString.call(n)),m(n)&&(j=" "+a(n)),0!==l.length||S&&0!=n.length?r<0?v(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special"):(e.seen.push(n),w=S?function(e,t,n,r,i){for(var o=[],l=0,s=t.length;l<s;++l)x(t,String(l))?o.push(c(e,t,n,r,String(l),!0)):o.push("");return i.forEach(function(i){i.match(/^\d+$/)||o.push(c(e,t,n,r,i,!0))}),o}(e,n,r,b,l):l.map(function(t){return c(e,n,r,b,t,S)}),e.seen.pop(),function(e,t,n){return e.reduce(function(e,t){return t.indexOf("\n"),e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60?n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]}(w,j,O)):O[0]+j+O[1]}function a(e){return"["+Error.prototype.toString.call(e)+"]"}function c(e,t,n,r,i,o){var l,a,c;if((c=Object.getOwnPropertyDescriptor(t,i)||{value:t[i]}).get?a=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(a=e.stylize("[Setter]","special")),x(r,i)||(l="["+i+"]"),a||(e.seen.indexOf(c.value)<0?(a=h(n)?s(e,c.value,null):s(e,c.value,n-1)).indexOf("\n")>-1&&(a=o?a.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+a.split("\n").map(function(e){return"   "+e}).join("\n")):a=e.stylize("[Circular]","special")),d(l)){if(o&&i.match(/^\d+$/))return a;(l=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(l=l.substr(1,l.length-2),l=e.stylize(l,"name")):(l=l.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),l=e.stylize(l,"string"))}return l+": "+a}function u(e){return Array.isArray(e)}function f(e){return"boolean"==typeof e}function h(e){return null===e}function p(e){return"number"==typeof e}function g(e){return"string"==typeof e}function d(e){return void 0===e}function v(e){return b(e)&&"[object RegExp]"===k(e)}function b(e){return"object"==typeof e&&null!==e}function y(e){return b(e)&&"[object Date]"===k(e)}function m(e){return b(e)&&("[object Error]"===k(e)||e instanceof Error)}function _(e){return"function"==typeof e}function k(e){return Object.prototype.toString.call(e)}function w(e){return e<10?"0"+e.toString(10):e.toString(10)}function x(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var j=/%[sdj%]/g;t.format=function(e){if(!g(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(i(arguments[n]));return t.join(" ")}n=1;for(var r=arguments,o=r.length,l=String(e).replace(j,function(e){if("%%"===e)return"%";if(n>=o)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return e}}),s=r[n];n<o;s=r[++n])h(s)||!b(s)?l+=" "+s:l+=" "+i(s);return l},t.deprecate=function(n,i){if(d(e.process))return function(){return t.deprecate(n,i).apply(this,arguments)};if(!0===r.noDeprecation)return n;var o=!1;return function(){if(!o){if(r.throwDeprecation)throw new Error(i);r.traceDeprecation?console.trace(i):console.error(i),o=!0}return n.apply(this,arguments)}};var S,O={};t.debuglog=function(e){if(d(S)&&(S=production.NODE_DEBUG||""),e=e.toUpperCase(),!O[e])if(new RegExp("\\b"+e+"\\b","i").test(S)){var n=r.pid;O[e]=function(){var r=t.format.apply(t,arguments);console.error("%s %d: %s",e,n,r)}}else O[e]=function(){};return O[e]},t.inspect=i,i.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},i.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=u,t.isBoolean=f,t.isNull=h,t.isNullOrUndefined=function(e){return null==e},t.isNumber=p,t.isString=g,t.isSymbol=function(e){return"symbol"==typeof e},t.isUndefined=d,t.isRegExp=v,t.isObject=b,t.isDate=y,t.isError=m,t.isFunction=_,t.isPrimitive=function(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e},t.isBuffer=n(407);var M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];t.log=function(){console.log("%s - %s",function(){var e=new Date,t=[w(e.getHours()),w(e.getMinutes()),w(e.getSeconds())].join(":");return[e.getDate(),M[e.getMonth()],t].join(" ")}(),t.format.apply(t,arguments))},t.inherits=n(408),t._extend=function(e,t){if(!t||!b(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e}}).call(this,n(2),n(10))},407:function(e){e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},408:function(e){"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}}})});