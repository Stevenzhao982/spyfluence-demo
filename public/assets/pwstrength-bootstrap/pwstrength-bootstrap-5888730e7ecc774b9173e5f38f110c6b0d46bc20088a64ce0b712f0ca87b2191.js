!function(r){var e=function(r){function e(t){if(o[t])return o[t].exports;var s=o[t]={i:t,l:!1,exports:{}};return r[t].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var o={};return e.m=r,e.c=o,e.d=function(r,o,t){e.o(r,o)||Object.defineProperty(r,o,{enumerable:!0,get:t})},e.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},e.t=function(r,o){if(1&o&&(r=e(r)),8&o)return r;if(4&o&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(e.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&o&&"string"!=typeof r)for(var s in r)e.d(t,s,function(e){return r[e]}.bind(null,s));return t},e.n=function(r){var o=r&&r.__esModule?function(){return r["default"]}:function(){return r};return e.d(o,"a",o),o},e.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},e.p="",e(e.s=425)}({1:function(r){r.exports=window.jQuery},4:function(r){r.exports=function(r){return r.webpackPolyfill||(r.deprecate=function(){},r.paths=[],r.children||(r.children=[]),Object.defineProperty(r,"loaded",{enumerable:!0,get:function(){return r.l}}),Object.defineProperty(r,"id",{enumerable:!0,get:function(){return r.i}}),r.webpackPolyfill=1),r}},425:function(r,e,o){o(426)},426:function(r,e,o){(function(r){
/*!
* jQuery Password Strength plugin for Twitter Bootstrap
* Version: 3.0.1
*
* Copyright (c) 2008-2013 Tane Piper
* Copyright (c) 2013 Alejandro Blanco
* Dual licensed under the MIT and GPL licenses.
*/
!function(e){var t={};!function(r,e){"use strict";r.fallback={wordMinLength:"Your password is too short",wordMaxLength:"Your password is too long",wordInvalidChar:"Your password contains an invalid character",wordNotEmail:"Do not use your email as your password",wordSimilarToUsername:"Your password cannot contain your username",wordTwoCharacterClasses:"Use different character classes",wordRepetitions:"Too many repetitions",wordSequences:"Your password contains sequences",errorList:"Errors:",veryWeak:"Very Weak",weak:"Weak",normal:"Normal",medium:"Medium",strong:"Strong",veryStrong:"Very Strong"},r.t=function(o){var t="";return(t=e?e.t(o):r.fallback[o])===o?"":t}}(t,window.i18next);var s={};try{if(!e&&r&&r.exports){e=o(1);var n=o(427).jsdom;e=e(n().defaultView)}}catch(r){}!function(r,e){"use strict";var o={};e.forbiddenSequences=["0123456789","abcdefghijklmnopqrstuvwxyz","qwertyuiop","asdfghjkl","zxcvbnm","!@#$%^&*()_+"],o.wordNotEmail=function(r,e,o){return e.match(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i)?o:0},o.wordMinLength=function(r,e,o){var t=e.length,s=Math.pow(t,r.rules.raisePower);return t<r.common.minChar&&(s+=o),s},o.wordMaxLength=function(r,e,o){var t=e.length,s=Math.pow(t,r.rules.raisePower);return t>r.common.maxChar?o:s},o.wordInvalidChar=function(r,e,o){return r.common.invalidCharsRegExp.test(e)?o:0},o.wordMinLengthStaticScore=function(r,e,o){return e.length<r.common.minChar?0:o},o.wordMaxLengthStaticScore=function(r,e,o){return e.length>r.common.maxChar?0:o},o.wordSimilarToUsername=function(e,o,t){var s=r(e.common.usernameField).val();return s&&o.toLowerCase().match(s.replace(/[\-\[\]\/\{\}\(\)\*\+\=\?\:\.\\\^\$\|\!\,]/g,"\\$&").toLowerCase())?t:0},o.wordTwoCharacterClasses=function(r,e,o){return e.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)||e.match(/([a-zA-Z])/)&&e.match(/([0-9])/)||e.match(/(.[!,@,#,$,%,\^,&,*,?,_,~])/)&&e.match(/[a-zA-Z0-9_]/)?o:0},o.wordRepetitions=function(r,e,o){return e.match(/(.)\1\1/)?o:0},o.wordSequences=function(o,t,s){var n,i=!1;return t.length>2&&(r.each(e.forbiddenSequences,function(e,o){if(!i){var s=[o,o.split("").reverse().join("")];r.each(s,function(r,e){for(n=0;n<t.length-2;n+=1)e.indexOf(t.toLowerCase().substring(n,n+3))>-1&&(i=!0)})}}),i)?s:0},o.wordLowercase=function(r,e,o){return e.match(/[a-z]/)&&o},o.wordUppercase=function(r,e,o){return e.match(/[A-Z]/)&&o},o.wordOneNumber=function(r,e,o){return e.match(/\d+/)&&o},o.wordThreeNumbers=function(r,e,o){return e.match(/(.*[0-9].*[0-9].*[0-9])/)&&o},o.wordOneSpecialChar=function(r,e,o){return e.match(/[!,@,#,$,%,\^,&,*,?,_,~]/)&&o},o.wordTwoSpecialChar=function(r,e,o){return e.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/)&&o},o.wordUpperLowerCombo=function(r,e,o){return e.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)&&o},o.wordLetterNumberCombo=function(r,e,o){return e.match(/([a-zA-Z])/)&&e.match(/([0-9])/)&&o},o.wordLetterNumberCharCombo=function(r,e,o){return e.match(/([a-zA-Z0-9].*[!,@,#,$,%,\^,&,*,?,_,~])|([!,@,#,$,%,\^,&,*,?,_,~].*[a-zA-Z0-9])/)&&o},o.wordIsACommonPassword=function(e,o,t){return r.inArray(o,e.rules.commonPasswords)>=0?t:0},e.validation=o,e.executeRules=function(o,t){var s=0;return r.each(o.rules.activated,function(n,i){if(i){var a,c,u=o.rules.scores[n],d=e.validation[n];r.isFunction(d)||(d=o.rules.extra[n]),r.isFunction(d)&&((a=d(o,t,u))&&(s+=a),(a<0||!r.isNumeric(a)&&!a)&&(c=o.ui.spanError(o,n)).length>0&&o.instances.errors.push(c))}}),s}}(e,s);try{r&&r.exports&&(r.exports=s)}catch(r){}var i={common:{}};i.common.minChar=6,i.common.maxChar=20,i.common.usernameField="#username",i.common.invalidCharsRegExp=new RegExp(/[\s,'"]/),i.common.userInputs=[],i.common.onLoad=void 0,i.common.onKeyUp=void 0,i.common.onScore=void 0,i.common.zxcvbn=!1,i.common.zxcvbnTerms=[],i.common.events=["keyup","change","paste"],i.common.debug=!1,i.rules={},i.rules.extra={},i.rules.scores={wordNotEmail:-100,wordMinLength:-50,wordMaxLength:-50,wordInvalidChar:-100,wordSimilarToUsername:-100,wordSequences:-20,wordTwoCharacterClasses:2,wordRepetitions:-25,wordLowercase:1,wordUppercase:3,wordOneNumber:3,wordThreeNumbers:5,wordOneSpecialChar:3,wordTwoSpecialChar:5,wordUpperLowerCombo:2,wordLetterNumberCombo:2,wordLetterNumberCharCombo:2,wordIsACommonPassword:-100},i.rules.activated={wordNotEmail:!0,wordMinLength:!0,wordMaxLength:!1,wordInvalidChar:!1,wordSimilarToUsername:!0,wordSequences:!0,wordTwoCharacterClasses:!0,wordRepetitions:!0,wordLowercase:!0,wordUppercase:!0,wordOneNumber:!0,wordThreeNumbers:!0,wordOneSpecialChar:!0,wordTwoSpecialChar:!0,wordUpperLowerCombo:!0,wordLetterNumberCombo:!0,wordLetterNumberCharCombo:!0,wordIsACommonPassword:!0},i.rules.raisePower=1.4,i.rules.commonPasswords=["123456","password","12345678","qwerty","123456789","12345","1234","111111","1234567","dragon","123123","baseball","abc123","football","monkey","letmein","696969","shadow","master","666666","qwertyuiop","123321","mustang","1234567890","michael","654321","pussy","superman","1qaz2wsx","7777777","fuckyou","121212","000000","qazwsx","123qwe","killer","trustno1","jordan","jennifer","zxcvbnm","asdfgh","hunter","buster","soccer","harley","batman","andrew","tigger","sunshine","iloveyou","fuckme","2000","charlie","robert","thomas","hockey","ranger","daniel","starwars","klaster","112233","george","asshole","computer","michelle","jessica","pepper","1111","zxcvbn","555555","11111111","131313","freedom","777777","pass","fuck","maggie","159753","aaaaaa","ginger","princess","joshua","cheese","amanda","summer","love","ashley","6969","nicole","chelsea","biteme","matthew","access","yankees","987654321","dallas","austin","thunder","taylor","matrix"],i.ui={},i.ui.bootstrap2=!1,i.ui.bootstrap3=!1,i.ui.colorClasses=["danger","danger","danger","warning","warning","success"],i.ui.showProgressBar=!0,i.ui.progressBarEmptyPercentage=1,i.ui.progressBarMinPercentage=1,i.ui.progressExtraCssClasses="",i.ui.progressBarExtraCssClasses="",i.ui.showPopover=!1,i.ui.popoverPlacement="bottom",i.ui.showStatus=!1,i.ui.spanError=function(r,e){"use strict";var o=r.i18n.t(e);return o?'<span style="color: #d52929">'+o+"</span>":""},i.ui.popoverError=function(r){"use strict";var o=r.instances.errors,t="<div>"+r.i18n.t("errorList")+"<ul class='error-list' style='margin-bottom: 0;'>";return e.each(o,function(r,e){t+="<li>"+e+"</li>"}),t+="</ul></div>"},i.ui.showVerdicts=!0,i.ui.showVerdictsInsideProgressBar=!1,i.ui.useVerdictCssClass=!1,i.ui.showErrors=!1,i.ui.showScore=!1,i.ui.container=void 0,i.ui.viewports={progress:void 0,verdict:void 0,errors:void 0,score:void 0},i.ui.scores=[0,14,26,38,50],i.i18n={},i.i18n.t=t.t;var a={};!function(r,e){"use strict";var o=["error","warning","success"],t=["veryWeak","weak","normal","medium","strong","veryStrong"];e.getContainer=function(e,o){var t;return(t=r(e.ui.container))&&1===t.length||(t=o.parent()),t},e.findElement=function(r,e,o){return e?r.find(e).find(o):r.find(o)},e.getUIElements=function(r,o){var t,s;return r.instances.viewports?r.instances.viewports:(t=e.getContainer(r,o),(s={}).$progressbar=e.findElement(t,r.ui.viewports.progress,"div.progress"),r.ui.showVerdictsInsideProgressBar&&(s.$verdict=s.$progressbar.find("span.password-verdict")),r.ui.showPopover||(r.ui.showVerdictsInsideProgressBar||(s.$verdict=e.findElement(t,r.ui.viewports.verdict,"span.password-verdict")),s.$errors=e.findElement(t,r.ui.viewports.errors,"ul.error-list")),s.$score=e.findElement(t,r.ui.viewports.score,"span.password-score"),r.instances.viewports=s,s)},e.initProgressBar=function(o,t){var s=e.getContainer(o,t),n="<div class='progress ";o.ui.bootstrap2?n+=o.ui.progressBarExtraCssClasses+"'><div class='":n+=o.ui.progressExtraCssClasses+"'><div class='"+o.ui.progressBarExtraCssClasses+" progress-",n+="bar'>",o.ui.showVerdictsInsideProgressBar&&(n+="<span class='password-verdict'></span>"),n+="</div></div>",o.ui.viewports.progress?s.find(o.ui.viewports.progress).append(n):r(n).insertAfter(t)},e.initHelper=function(o,t,s,n){var i=e.getContainer(o,t);n?i.find(n).append(s):r(s).insertAfter(t)},e.initVerdict=function(r,o){e.initHelper(r,o,"<span class='password-verdict'></span>",r.ui.viewports.verdict)},e.initErrorList=function(r,o){e.initHelper(r,o,"<ul class='error-list'></ul>",r.ui.viewports.errors)},e.initScore=function(r,o){e.initHelper(r,o,"<span class='password-score'></span>",r.ui.viewports.score)},e.initPopover=function(r,e){e.popover("destroy"),e.popover({html:!0,placement:r.ui.popoverPlacement,trigger:"manual",content:" "})},e.initUI=function(r,o){r.ui.showPopover?e.initPopover(r,o):(r.ui.showErrors&&e.initErrorList(r,o),r.ui.showVerdicts&&!r.ui.showVerdictsInsideProgressBar&&e.initVerdict(r,o)),r.ui.showProgressBar&&e.initProgressBar(r,o),r.ui.showScore&&e.initScore(r,o)},e.updateProgressBar=function(o,t,s,n){var i=e.getUIElements(o,t).$progressbar,a=i.find(".progress-bar"),c="progress-";o.ui.bootstrap2&&(a=i.find(".bar"),c=""),r.each(o.ui.colorClasses,function(r,e){o.ui.bootstrap2||o.ui.bootstrap3?a.removeClass(c+"bar-"+e):a.removeClass("bg-"+e)}),o.ui.bootstrap2||o.ui.bootstrap3?a.addClass(c+"bar-"+o.ui.colorClasses[s]):a.addClass("bg-"+o.ui.colorClasses[s]),a.css("width",n+"%")},e.updateVerdict=function(r,o,t,s){var n=e.getUIElements(r,o).$verdict;n.removeClass(r.ui.colorClasses.join(" ")),t>-1&&n.addClass(r.ui.colorClasses[t]),r.ui.showVerdictsInsideProgressBar&&n.css("white-space","nowrap"),n.html(s)},e.updateErrors=function(o,t,s){var n=e.getUIElements(o,t).$errors,i="";s||r.each(o.instances.errors,function(r,e){i+="<li>"+e+"</li>"}),n.html(i)},e.updateScore=function(r,o,t,s){var n=e.getUIElements(r,o).$score,i="";s||(i=t.toFixed(2)),n.html(i)},e.updatePopover=function(r,e,o,t){var s=e.data("bs.popover"),n="",i=!0;r.ui.showVerdicts&&!r.ui.showVerdictsInsideProgressBar&&o.length>0&&(n="<h5><span class='password-verdict'>"+o+"</span></h5>",i=!1),r.ui.showErrors&&(r.instances.errors.length>0&&(i=!1),n+=r.ui.popoverError(r)),i||t?e.popover("hide"):(r.ui.bootstrap2&&(s=e.data("popover")),s.$arrow&&s.$arrow.parents("body").length>0?e.find("+ .popover .popover-content").html(n):(r.ui.bootstrap2||r.ui.bootstrap3?s.options.content=n:s.config.content=n,e.popover("show")))},e.updateFieldStatus=function(e,t,s,n){var i=t;e.ui.bootstrap2?i=t.parents(".control-group").first():e.ui.bootstrap3&&(i=t.parents(".form-group").first()),r.each(o,function(r,o){e.ui.bootstrap3?o="has-"+o:e.ui.bootstrap2||("error"===o&&(o="danger"),o="border-"+o),i.removeClass(o)}),n||(s=o[Math.floor(s/2)],e.ui.bootstrap3?s="has-"+s:e.ui.bootstrap2||("error"===s&&(s="danger"),s="border-"+s),i.addClass(s))},e.percentage=function(r,e,o){var t=Math.floor(100*e/o),s=r.ui.progressBarMinPercentage;return(t=t<=s?s:t)>100?100:t},e.getVerdictAndCssClass=function(r,e){var o,s;return void 0===e?["",0]:(o=e<=r.ui.scores[0]?0:e<r.ui.scores[1]?1:e<r.ui.scores[2]?2:e<r.ui.scores[3]?3:e<r.ui.scores[4]?4:5,s=t[o],[r.i18n.t(s),o])},e.updateUI=function(r,o,t){var s,n,i,a;s=e.getVerdictAndCssClass(r,t),i=0===t?"":s[0],s=s[1],a=r.ui.useVerdictCssClass?s:-1,r.ui.showProgressBar&&(n=void 0===t?r.ui.progressBarEmptyPercentage:e.percentage(r,t,r.ui.scores[4]),e.updateProgressBar(r,o,s,n),r.ui.showVerdictsInsideProgressBar&&e.updateVerdict(r,o,a,i)),r.ui.showStatus&&e.updateFieldStatus(r,o,s,void 0===t),r.ui.showPopover?e.updatePopover(r,o,i,void 0===t):(r.ui.showVerdicts&&!r.ui.showVerdictsInsideProgressBar&&e.updateVerdict(r,o,a,i),r.ui.showErrors&&e.updateErrors(r,o,void 0===t)),r.ui.showScore&&e.updateScore(r,o,t,void 0===t)}}(e,a),function(r,e){"use strict";var o,t,n;o=function(e){var o,t,n,i,c=r(e.target),u=c.data("pwstrength-bootstrap"),d=c.val();void 0!==u&&(u.instances.errors=[],0===d.length?i=void 0:(u.common.zxcvbn?(o=[],r.each(u.common.userInputs.concat([u.common.usernameField]),function(e,t){var s=r(t).val();s&&o.push(s)}),o=o.concat(u.common.zxcvbnTerms),i=zxcvbn(d,o).guesses,i=Math.log(i)*Math.LOG2E):i=s.executeRules(u,d),r.isFunction(u.common.onScore)&&(i=u.common.onScore(u,d,i))),a.updateUI(u,c,i),n=(t=a.getVerdictAndCssClass(u,i))[1],t=t[0],u.common.debug&&console.log(i+" - "+t),r.isFunction(u.common.onKeyUp)&&u.common.onKeyUp(e,{score:i,verdictText:t,verdictLevel:n}))},t=function(e){var t,s=r(e.target),n=s.val(),i=0;t=function(){s.val()!==n?o(e):i<3&&(i+=1,setTimeout(t,100))},setTimeout(t,100)},e.init=function(e){return this.each(function(s,n){var c=r.extend(!0,{},i),u=r.extend(!0,c,e),d=r(n);u.instances={},d.data("pwstrength-bootstrap",u),r.each(u.common.events,function(r,e){var s="paste"===e?t:o;d.on(e,s)}),a.initUI(u,d),d.trigger("keyup"),r.isFunction(u.common.onLoad)&&u.common.onLoad()}),this},e.destroy=function(){this.each(function(e,o){var t=r(o),s=t.data("pwstrength-bootstrap"),n=a.getUIElements(s,t);n.$progressbar.remove(),n.$verdict.remove(),n.$errors.remove(),t.removeData("pwstrength-bootstrap")})},e.forceUpdate=function(){this.each(function(r,e){o({target:e})})},e.addRule=function(e,o,t,s){this.each(function(n,i){var a=r(i).data("pwstrength-bootstrap");a.rules.activated[e]=s,a.rules.scores[e]=t,a.rules.extra[e]=o})},n=function(e,o,t){this.each(function(s,n){r(n).data("pwstrength-bootstrap").rules[o][e]=t})},e.changeScore=function(r,e){n.call(this,r,"scores",e)},e.ruleActive=function(r,e){n.call(this,r,"activated",e)},e.ruleIsMet=function(e){if(r.isFunction(s.validation[e])){"wordMinLength"===e?e="wordMinLengthStaticScore":"wordMaxLength"===e&&(e="wordMaxLengthStaticScore");var o=0;return this.each(function(t,n){var i=r(n).data("pwstrength-bootstrap");o+=s.validation[e](i,r(n).val(),1)}),o===this.length}r.error("Rule "+e+" does not exist on jQuery.pwstrength-bootstrap.validation")},r.fn.pwstrength=function(o){var t;return e[o]?t=e[o].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof o&&o?r.error("Method "+o+" does not exist on jQuery.pwstrength-bootstrap"):t=e.init.apply(this,arguments),t}}(e,{})}(jQuery)}).call(this,o(4)(r))},427:function(r){if(void 0===window.jsdom){var e=new Error("Cannot find module 'window.jsdom'");throw e.code="MODULE_NOT_FOUND",e}r.exports=window.jsdom}});if("object"==typeof e){var o=["object"==typeof module&&"object"==typeof module.exports?module.exports:null,"undefined"!=typeof window?window:null,r&&r!==window?r:null];for(var t in e)o[0]&&(o[0][t]=e[t]),o[1]&&"__esModule"!==t&&(o[1][t]=e[t]),o[2]&&(o[2][t]=e[t])}}(this);