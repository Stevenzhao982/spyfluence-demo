/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts
Released under the MIT license
 */


(function() {
  var context = this;

  (function() {
    (function() {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form',
        formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };

    }).call(this);
  }).call(context);

  var Rails = context.Rails;

  (function() {
    (function() {
      var cspNonce;

      cspNonce = Rails.cspNonce = function() {
        var meta;
        meta = document.querySelector('meta[name=csp-nonce]');
        return meta && meta.content;
      };

    }).call(this);
    (function() {
      var expando, m;

      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function(element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function(element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function(element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }
        return element[expando][key] = value;
      };

      Rails.$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };

    }).call(this);
    (function() {
      var $, csrfParam, csrfToken;

      $ = Rails.$;

      csrfToken = Rails.csrfToken = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function(xhr) {
        var token;
        token = csrfToken();
        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function() {
        var param, token;
        token = csrfToken();
        param = csrfParam();
        if ((token != null) && (param != null)) {
          return $('form input[name="' + param + '"]').forEach(function(input) {
            return input.value = token;
          });
        }
      };

    }).call(this);
    (function() {
      var CustomEvent, fire, matches, preventDefault;

      matches = Rails.matches;

      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
        preventDefault = CustomEvent.prototype.preventDefault;
        CustomEvent.prototype.preventDefault = function() {
          var result;
          result = preventDefault.call(this);
          if (this.cancelable && !this.defaultPrevented) {
            Object.defineProperty(this, 'defaultPrevented', {
              get: function() {
                return true;
              }
            });
          }
          return result;
        };
      }

      fire = Rails.fire = function(obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function(e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function(element, selector, eventType, handler) {
        return element.addEventListener(eventType, function(e) {
          var target;
          target = e.target;
          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };

    }).call(this);
    (function() {
      var AcceptHeaders, CSRFProtection, createXHR, cspNonce, fire, prepareOptions, processResponse;

      cspNonce = Rails.cspNonce, CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function(options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function() {
          var ref, response;
          response = processResponse((ref = xhr.response) != null ? ref : xhr.responseText, xhr.getResponseHeader('Content-Type'));
          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }
          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });
        if ((options.beforeSend != null) && !options.beforeSend(xhr, options)) {
          return false;
        }
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        }
      };

      prepareOptions = function(options) {
        options.url = options.url || location.href;
        options.type = options.type.toUpperCase();
        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }
        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }
        options.accept = AcceptHeaders[options.dataType];
        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }
        return options;
      };

      createXHR = function(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);
        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        CSRFProtection(xhr);
        xhr.withCredentials = !!options.withCredentials;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };
        return xhr;
      };

      processResponse = function(response, type) {
        var parser, script;
        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (error) {}
          } else if (type.match(/\b(?:java|ecma)script\b/)) {
            script = document.createElement('script');
            script.nonce = cspNonce();
            script.text = response;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');
            try {
              response = parser.parseFromString(response, type);
            } catch (error) {}
          }
        }
        return response;
      };

      Rails.href = function(element) {
        return element.href;
      };

      Rails.isCrossDomain = function(url) {
        var e, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');
        try {
          urlAnchor.href = url;
          return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
        } catch (error) {
          e = error;
          return true;
        }
      };

    }).call(this);
    (function() {
      var matches, toArray;

      matches = Rails.matches;

      toArray = function(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function(element, additionalParam) {
        var inputs, params;
        inputs = [element];
        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }
        params = [];
        inputs.forEach(function(input) {
          if (!input.name || input.disabled) {
            return;
          }
          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function(option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });
        if (additionalParam) {
          params.push(additionalParam);
        }
        return params.map(function(param) {
          if (param.name != null) {
            return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function(form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function(el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };

    }).call(this);
    (function() {
      var allowAction, fire, stopEverything;

      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function(e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      allowAction = function(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');
        if (!message) {
          return true;
        }
        answer = false;
        if (fire(element, 'confirm')) {
          try {
            answer = confirm(message);
          } catch (error) {}
          callback = fire(element, 'confirm:complete', [answer]);
        }
        return answer && callback;
      };

    }).call(this);
    (function() {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, matches, setData, stopEverything;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

      Rails.handleDisabledElement = function(e) {
        var element;
        element = this;
        if (element.disabled) {
          return stopEverything(e);
        }
      };

      Rails.enableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }
        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }
        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }
        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }
          setData(element, 'ujs:enable-with', null);
        }
        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

    }).call(this);
    (function() {
      var stopEverything;

      stopEverything = Rails.stopEverything;

      Rails.handleMethod = function(e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');
        if (!method) {
          return;
        }
        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";
        if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };

    }).call(this);
    (function() {
      var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
        slice = [].slice;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

      isRemote = function(element) {
        var value;
        value = element.getAttribute('data-remote');
        return (value != null) && value !== 'false';
      };

      Rails.handleRemote = function(e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;
        if (!isRemote(element)) {
          return true;
        }
        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }
        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';
        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }
          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);
            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }
          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }
        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return false;
            }
          },
          success: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: (withCredentials != null) && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function(e) {
        var button, form;
        button = this;
        form = button.form;
        if (!form) {
          return;
        }
        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }
        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.handleMetaClick = function(e) {
        var data, link, metaClick, method;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        if (metaClick && method === 'GET' && !data) {
          return e.stopImmediatePropagation();
        }
      };

    }).call(this);
    (function() {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMetaClick, handleMethod, handleRemote, refreshCSRFTokens;

      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMetaClick = Rails.handleMetaClick, handleMethod = Rails.handleMethod;

      if ((typeof jQuery !== "undefined" && jQuery !== null) && (jQuery.ajax != null) && !jQuery.rails) {
        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function() {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }
        window.addEventListener('pageshow', function() {
          $(Rails.formEnableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', handleMetaClick);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
          return setTimeout((function() {
            return disableElement(e);
          }), 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = Rails;
  } else if (typeof define === "function" && define.amd) {
    define(Rails);
  }
}).call(this);
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ActiveStorage=e():t.ActiveStorage=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,r){"use strict";function n(t){var e=a(document.head,'meta[name="'+t+'"]');if(e)return e.getAttribute("content")}function i(t,e){return"string"==typeof t&&(e=t,t=document),o(t.querySelectorAll(e))}function a(t,e){return"string"==typeof t&&(e=t,t=document),t.querySelector(e)}function u(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=t.disabled,i=r.bubbles,a=r.cancelable,u=r.detail,o=document.createEvent("Event");o.initEvent(e,i||!0,a||!0),o.detail=u||{};try{t.disabled=!1,t.dispatchEvent(o)}finally{t.disabled=n}return o}function o(t){return Array.isArray(t)?t:Array.from?Array.from(t):[].slice.call(t)}e.d=n,e.c=i,e.b=a,e.a=u,e.e=o},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(t&&"function"==typeof t[e]){for(var r=arguments.length,n=Array(r>2?r-2:0),i=2;i<r;i++)n[i-2]=arguments[i];return t[e].apply(t,n)}}r.d(e,"a",function(){return c});var a=r(6),u=r(8),o=r(9),s=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),f=0,c=function(){function t(e,r,i){n(this,t),this.id=++f,this.file=e,this.url=r,this.delegate=i}return s(t,[{key:"create",value:function(t){var e=this;a.a.create(this.file,function(r,n){if(r)return void t(r);var a=new u.a(e.file,n,e.url);i(e.delegate,"directUploadWillCreateBlobWithXHR",a.xhr),a.create(function(r){if(r)t(r);else{var n=new o.a(a);i(e.delegate,"directUploadWillStoreFileWithXHR",n.xhr),n.create(function(e){e?t(e):t(null,a.toJSON())})}})})}}]),t}()},function(t,e,r){"use strict";function n(){window.ActiveStorage&&Object(i.a)()}Object.defineProperty(e,"__esModule",{value:!0});var i=r(3),a=r(1);r.d(e,"start",function(){return i.a}),r.d(e,"DirectUpload",function(){return a.a}),setTimeout(n,1)},function(t,e,r){"use strict";function n(){d||(d=!0,document.addEventListener("submit",i),document.addEventListener("ajax:before",a))}function i(t){u(t)}function a(t){"FORM"==t.target.tagName&&u(t)}function u(t){var e=t.target;if(e.hasAttribute(l))return void t.preventDefault();var r=new c.a(e),n=r.inputs;n.length&&(t.preventDefault(),e.setAttribute(l,""),n.forEach(s),r.start(function(t){e.removeAttribute(l),t?n.forEach(f):o(e)}))}function o(t){var e=Object(h.b)(t,"input[type=submit]");if(e){var r=e,n=r.disabled;e.disabled=!1,e.focus(),e.click(),e.disabled=n}else e=document.createElement("input"),e.type="submit",e.style.display="none",t.appendChild(e),e.click(),t.removeChild(e)}function s(t){t.disabled=!0}function f(t){t.disabled=!1}e.a=n;var c=r(4),h=r(0),l="data-direct-uploads-processing",d=!1},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.d(e,"a",function(){return s});var i=r(5),a=r(0),u=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),o="input[type=file][data-direct-upload-url]:not([disabled])",s=function(){function t(e){n(this,t),this.form=e,this.inputs=Object(a.c)(e,o).filter(function(t){return t.files.length})}return u(t,[{key:"start",value:function(t){var e=this,r=this.createDirectUploadControllers();this.dispatch("start"),function n(){var i=r.shift();i?i.start(function(r){r?(t(r),e.dispatch("end")):n()}):(t(),e.dispatch("end"))}()}},{key:"createDirectUploadControllers",value:function(){var t=[];return this.inputs.forEach(function(e){Object(a.e)(e.files).forEach(function(r){var n=new i.a(e,r);t.push(n)})}),t}},{key:"dispatch",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(a.a)(this.form,"direct-uploads:"+t,{detail:e})}}]),t}()},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.d(e,"a",function(){return o});var i=r(1),a=r(0),u=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),o=function(){function t(e,r){n(this,t),this.input=e,this.file=r,this.directUpload=new i.a(this.file,this.url,this),this.dispatch("initialize")}return u(t,[{key:"start",value:function(t){var e=this,r=document.createElement("input");r.type="hidden",r.name=this.input.name,this.input.insertAdjacentElement("beforebegin",r),this.dispatch("start"),this.directUpload.create(function(n,i){n?(r.parentNode.removeChild(r),e.dispatchError(n)):r.value=i.signed_id,e.dispatch("end"),t(n)})}},{key:"uploadRequestDidProgress",value:function(t){var e=t.loaded/t.total*100;e&&this.dispatch("progress",{progress:e})}},{key:"dispatch",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.file=this.file,e.id=this.directUpload.id,Object(a.a)(this.input,"direct-upload:"+t,{detail:e})}},{key:"dispatchError",value:function(t){this.dispatch("error",{error:t}).defaultPrevented||alert(t)}},{key:"directUploadWillCreateBlobWithXHR",value:function(t){this.dispatch("before-blob-request",{xhr:t})}},{key:"directUploadWillStoreFileWithXHR",value:function(t){var e=this;this.dispatch("before-storage-request",{xhr:t}),t.upload.addEventListener("progress",function(t){return e.uploadRequestDidProgress(t)})}},{key:"url",get:function(){return this.input.getAttribute("data-direct-upload-url")}}]),t}()},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.d(e,"a",function(){return s});var i=r(7),a=r.n(i),u=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),o=File.prototype.slice||File.prototype.mozSlice||File.prototype.webkitSlice,s=function(){function t(e){n(this,t),this.file=e,this.chunkSize=2097152,this.chunkCount=Math.ceil(this.file.size/this.chunkSize),this.chunkIndex=0}return u(t,null,[{key:"create",value:function(e,r){new t(e).create(r)}}]),u(t,[{key:"create",value:function(t){var e=this;this.callback=t,this.md5Buffer=new a.a.ArrayBuffer,this.fileReader=new FileReader,this.fileReader.addEventListener("load",function(t){return e.fileReaderDidLoad(t)}),this.fileReader.addEventListener("error",function(t){return e.fileReaderDidError(t)}),this.readNextChunk()}},{key:"fileReaderDidLoad",value:function(t){if(this.md5Buffer.append(t.target.result),!this.readNextChunk()){var e=this.md5Buffer.end(!0),r=btoa(e);this.callback(null,r)}}},{key:"fileReaderDidError",value:function(t){this.callback("Error reading "+this.file.name)}},{key:"readNextChunk",value:function(){if(this.chunkIndex<this.chunkCount){var t=this.chunkIndex*this.chunkSize,e=Math.min(t+this.chunkSize,this.file.size),r=o.call(this.file,t,e);return this.fileReader.readAsArrayBuffer(r),this.chunkIndex++,!0}return!1}}]),t}()},function(t,e,r){!function(e){t.exports=e()}(function(t){"use strict";function e(t,e){var r=t[0],n=t[1],i=t[2],a=t[3];r+=(n&i|~n&a)+e[0]-680876936|0,r=(r<<7|r>>>25)+n|0,a+=(r&n|~r&i)+e[1]-389564586|0,a=(a<<12|a>>>20)+r|0,i+=(a&r|~a&n)+e[2]+606105819|0,i=(i<<17|i>>>15)+a|0,n+=(i&a|~i&r)+e[3]-1044525330|0,n=(n<<22|n>>>10)+i|0,r+=(n&i|~n&a)+e[4]-176418897|0,r=(r<<7|r>>>25)+n|0,a+=(r&n|~r&i)+e[5]+1200080426|0,a=(a<<12|a>>>20)+r|0,i+=(a&r|~a&n)+e[6]-1473231341|0,i=(i<<17|i>>>15)+a|0,n+=(i&a|~i&r)+e[7]-45705983|0,n=(n<<22|n>>>10)+i|0,r+=(n&i|~n&a)+e[8]+1770035416|0,r=(r<<7|r>>>25)+n|0,a+=(r&n|~r&i)+e[9]-1958414417|0,a=(a<<12|a>>>20)+r|0,i+=(a&r|~a&n)+e[10]-42063|0,i=(i<<17|i>>>15)+a|0,n+=(i&a|~i&r)+e[11]-1990404162|0,n=(n<<22|n>>>10)+i|0,r+=(n&i|~n&a)+e[12]+1804603682|0,r=(r<<7|r>>>25)+n|0,a+=(r&n|~r&i)+e[13]-40341101|0,a=(a<<12|a>>>20)+r|0,i+=(a&r|~a&n)+e[14]-1502002290|0,i=(i<<17|i>>>15)+a|0,n+=(i&a|~i&r)+e[15]+1236535329|0,n=(n<<22|n>>>10)+i|0,r+=(n&a|i&~a)+e[1]-165796510|0,r=(r<<5|r>>>27)+n|0,a+=(r&i|n&~i)+e[6]-1069501632|0,a=(a<<9|a>>>23)+r|0,i+=(a&n|r&~n)+e[11]+643717713|0,i=(i<<14|i>>>18)+a|0,n+=(i&r|a&~r)+e[0]-373897302|0,n=(n<<20|n>>>12)+i|0,r+=(n&a|i&~a)+e[5]-701558691|0,r=(r<<5|r>>>27)+n|0,a+=(r&i|n&~i)+e[10]+38016083|0,a=(a<<9|a>>>23)+r|0,i+=(a&n|r&~n)+e[15]-660478335|0,i=(i<<14|i>>>18)+a|0,n+=(i&r|a&~r)+e[4]-405537848|0,n=(n<<20|n>>>12)+i|0,r+=(n&a|i&~a)+e[9]+568446438|0,r=(r<<5|r>>>27)+n|0,a+=(r&i|n&~i)+e[14]-1019803690|0,a=(a<<9|a>>>23)+r|0,i+=(a&n|r&~n)+e[3]-187363961|0,i=(i<<14|i>>>18)+a|0,n+=(i&r|a&~r)+e[8]+1163531501|0,n=(n<<20|n>>>12)+i|0,r+=(n&a|i&~a)+e[13]-1444681467|0,r=(r<<5|r>>>27)+n|0,a+=(r&i|n&~i)+e[2]-51403784|0,a=(a<<9|a>>>23)+r|0,i+=(a&n|r&~n)+e[7]+1735328473|0,i=(i<<14|i>>>18)+a|0,n+=(i&r|a&~r)+e[12]-1926607734|0,n=(n<<20|n>>>12)+i|0,r+=(n^i^a)+e[5]-378558|0,r=(r<<4|r>>>28)+n|0,a+=(r^n^i)+e[8]-2022574463|0,a=(a<<11|a>>>21)+r|0,i+=(a^r^n)+e[11]+1839030562|0,i=(i<<16|i>>>16)+a|0,n+=(i^a^r)+e[14]-35309556|0,n=(n<<23|n>>>9)+i|0,r+=(n^i^a)+e[1]-1530992060|0,r=(r<<4|r>>>28)+n|0,a+=(r^n^i)+e[4]+1272893353|0,a=(a<<11|a>>>21)+r|0,i+=(a^r^n)+e[7]-155497632|0,i=(i<<16|i>>>16)+a|0,n+=(i^a^r)+e[10]-1094730640|0,n=(n<<23|n>>>9)+i|0,r+=(n^i^a)+e[13]+681279174|0,r=(r<<4|r>>>28)+n|0,a+=(r^n^i)+e[0]-358537222|0,a=(a<<11|a>>>21)+r|0,i+=(a^r^n)+e[3]-722521979|0,i=(i<<16|i>>>16)+a|0,n+=(i^a^r)+e[6]+76029189|0,n=(n<<23|n>>>9)+i|0,r+=(n^i^a)+e[9]-640364487|0,r=(r<<4|r>>>28)+n|0,a+=(r^n^i)+e[12]-421815835|0,a=(a<<11|a>>>21)+r|0,i+=(a^r^n)+e[15]+530742520|0,i=(i<<16|i>>>16)+a|0,n+=(i^a^r)+e[2]-995338651|0,n=(n<<23|n>>>9)+i|0,r+=(i^(n|~a))+e[0]-198630844|0,r=(r<<6|r>>>26)+n|0,a+=(n^(r|~i))+e[7]+1126891415|0,a=(a<<10|a>>>22)+r|0,i+=(r^(a|~n))+e[14]-1416354905|0,i=(i<<15|i>>>17)+a|0,n+=(a^(i|~r))+e[5]-57434055|0,n=(n<<21|n>>>11)+i|0,r+=(i^(n|~a))+e[12]+1700485571|0,r=(r<<6|r>>>26)+n|0,a+=(n^(r|~i))+e[3]-1894986606|0,a=(a<<10|a>>>22)+r|0,i+=(r^(a|~n))+e[10]-1051523|0,i=(i<<15|i>>>17)+a|0,n+=(a^(i|~r))+e[1]-2054922799|0,n=(n<<21|n>>>11)+i|0,r+=(i^(n|~a))+e[8]+1873313359|0,r=(r<<6|r>>>26)+n|0,a+=(n^(r|~i))+e[15]-30611744|0,a=(a<<10|a>>>22)+r|0,i+=(r^(a|~n))+e[6]-1560198380|0,i=(i<<15|i>>>17)+a|0,n+=(a^(i|~r))+e[13]+1309151649|0,n=(n<<21|n>>>11)+i|0,r+=(i^(n|~a))+e[4]-145523070|0,r=(r<<6|r>>>26)+n|0,a+=(n^(r|~i))+e[11]-1120210379|0,a=(a<<10|a>>>22)+r|0,i+=(r^(a|~n))+e[2]+718787259|0,i=(i<<15|i>>>17)+a|0,n+=(a^(i|~r))+e[9]-343485551|0,n=(n<<21|n>>>11)+i|0,t[0]=r+t[0]|0,t[1]=n+t[1]|0,t[2]=i+t[2]|0,t[3]=a+t[3]|0}function r(t){var e,r=[];for(e=0;e<64;e+=4)r[e>>2]=t.charCodeAt(e)+(t.charCodeAt(e+1)<<8)+(t.charCodeAt(e+2)<<16)+(t.charCodeAt(e+3)<<24);return r}function n(t){var e,r=[];for(e=0;e<64;e+=4)r[e>>2]=t[e]+(t[e+1]<<8)+(t[e+2]<<16)+(t[e+3]<<24);return r}function i(t){var n,i,a,u,o,s,f=t.length,c=[1732584193,-271733879,-1732584194,271733878];for(n=64;n<=f;n+=64)e(c,r(t.substring(n-64,n)));for(t=t.substring(n-64),i=t.length,a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n=0;n<i;n+=1)a[n>>2]|=t.charCodeAt(n)<<(n%4<<3);if(a[n>>2]|=128<<(n%4<<3),n>55)for(e(c,a),n=0;n<16;n+=1)a[n]=0;return u=8*f,u=u.toString(16).match(/(.*?)(.{0,8})$/),o=parseInt(u[2],16),s=parseInt(u[1],16)||0,a[14]=o,a[15]=s,e(c,a),c}function a(t){var r,i,a,u,o,s,f=t.length,c=[1732584193,-271733879,-1732584194,271733878];for(r=64;r<=f;r+=64)e(c,n(t.subarray(r-64,r)));for(t=r-64<f?t.subarray(r-64):new Uint8Array(0),i=t.length,a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],r=0;r<i;r+=1)a[r>>2]|=t[r]<<(r%4<<3);if(a[r>>2]|=128<<(r%4<<3),r>55)for(e(c,a),r=0;r<16;r+=1)a[r]=0;return u=8*f,u=u.toString(16).match(/(.*?)(.{0,8})$/),o=parseInt(u[2],16),s=parseInt(u[1],16)||0,a[14]=o,a[15]=s,e(c,a),c}function u(t){var e,r="";for(e=0;e<4;e+=1)r+=p[t>>8*e+4&15]+p[t>>8*e&15];return r}function o(t){var e;for(e=0;e<t.length;e+=1)t[e]=u(t[e]);return t.join("")}function s(t){return/[\u0080-\uFFFF]/.test(t)&&(t=unescape(encodeURIComponent(t))),t}function f(t,e){var r,n=t.length,i=new ArrayBuffer(n),a=new Uint8Array(i);for(r=0;r<n;r+=1)a[r]=t.charCodeAt(r);return e?a:i}function c(t){return String.fromCharCode.apply(null,new Uint8Array(t))}function h(t,e,r){var n=new Uint8Array(t.byteLength+e.byteLength);return n.set(new Uint8Array(t)),n.set(new Uint8Array(e),t.byteLength),r?n:n.buffer}function l(t){var e,r=[],n=t.length;for(e=0;e<n-1;e+=2)r.push(parseInt(t.substr(e,2),16));return String.fromCharCode.apply(String,r)}function d(){this.reset()}var p=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];return"5d41402abc4b2a76b9719d911017c592"!==o(i("hello"))&&function(t,e){var r=(65535&t)+(65535&e);return(t>>16)+(e>>16)+(r>>16)<<16|65535&r},"undefined"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||function(){function e(t,e){return t=0|t||0,t<0?Math.max(t+e,0):Math.min(t,e)}ArrayBuffer.prototype.slice=function(r,n){var i,a,u,o,s=this.byteLength,f=e(r,s),c=s;return n!==t&&(c=e(n,s)),f>c?new ArrayBuffer(0):(i=c-f,a=new ArrayBuffer(i),u=new Uint8Array(a),o=new Uint8Array(this,f,i),u.set(o),a)}}(),d.prototype.append=function(t){return this.appendBinary(s(t)),this},d.prototype.appendBinary=function(t){this._buff+=t,this._length+=t.length;var n,i=this._buff.length;for(n=64;n<=i;n+=64)e(this._hash,r(this._buff.substring(n-64,n)));return this._buff=this._buff.substring(n-64),this},d.prototype.end=function(t){var e,r,n=this._buff,i=n.length,a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(e=0;e<i;e+=1)a[e>>2]|=n.charCodeAt(e)<<(e%4<<3);return this._finish(a,i),r=o(this._hash),t&&(r=l(r)),this.reset(),r},d.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},d.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}},d.prototype.setState=function(t){return this._buff=t.buff,this._length=t.length,this._hash=t.hash,this},d.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},d.prototype._finish=function(t,r){var n,i,a,u=r;if(t[u>>2]|=128<<(u%4<<3),u>55)for(e(this._hash,t),u=0;u<16;u+=1)t[u]=0;n=8*this._length,n=n.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(n[2],16),a=parseInt(n[1],16)||0,t[14]=i,t[15]=a,e(this._hash,t)},d.hash=function(t,e){return d.hashBinary(s(t),e)},d.hashBinary=function(t,e){var r=i(t),n=o(r);return e?l(n):n},d.ArrayBuffer=function(){this.reset()},d.ArrayBuffer.prototype.append=function(t){var r,i=h(this._buff.buffer,t,!0),a=i.length;for(this._length+=t.byteLength,r=64;r<=a;r+=64)e(this._hash,n(i.subarray(r-64,r)));return this._buff=r-64<a?new Uint8Array(i.buffer.slice(r-64)):new Uint8Array(0),this},d.ArrayBuffer.prototype.end=function(t){var e,r,n=this._buff,i=n.length,a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(e=0;e<i;e+=1)a[e>>2]|=n[e]<<(e%4<<3);return this._finish(a,i),r=o(this._hash),t&&(r=l(r)),this.reset(),r},d.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},d.ArrayBuffer.prototype.getState=function(){var t=d.prototype.getState.call(this);return t.buff=c(t.buff),t},d.ArrayBuffer.prototype.setState=function(t){return t.buff=f(t.buff,!0),d.prototype.setState.call(this,t)},d.ArrayBuffer.prototype.destroy=d.prototype.destroy,d.ArrayBuffer.prototype._finish=d.prototype._finish,d.ArrayBuffer.hash=function(t,e){var r=a(new Uint8Array(t)),n=o(r);return e?l(n):n},d})},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.d(e,"a",function(){return u});var i=r(0),a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=function(){function t(e,r,a){var u=this;n(this,t),this.file=e,this.attributes={filename:e.name,content_type:e.type,byte_size:e.size,checksum:r},this.xhr=new XMLHttpRequest,this.xhr.open("POST",a,!0),this.xhr.responseType="json",this.xhr.setRequestHeader("Content-Type","application/json"),this.xhr.setRequestHeader("Accept","application/json"),this.xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),this.xhr.setRequestHeader("X-CSRF-Token",Object(i.d)("csrf-token")),this.xhr.addEventListener("load",function(t){return u.requestDidLoad(t)}),this.xhr.addEventListener("error",function(t){return u.requestDidError(t)})}return a(t,[{key:"create",value:function(t){this.callback=t,this.xhr.send(JSON.stringify({blob:this.attributes}))}},{key:"requestDidLoad",value:function(t){if(this.status>=200&&this.status<300){var e=this.response,r=e.direct_upload;delete e.direct_upload,this.attributes=e,this.directUploadData=r,this.callback(null,this.toJSON())}else this.requestDidError(t)}},{key:"requestDidError",value:function(t){this.callback('Error creating Blob for "'+this.file.name+'". Status: '+this.status)}},{key:"toJSON",value:function(){var t={};for(var e in this.attributes)t[e]=this.attributes[e];return t}},{key:"status",get:function(){return this.xhr.status}},{key:"response",get:function(){var t=this.xhr,e=t.responseType,r=t.response;return"json"==e?r:JSON.parse(r)}}]),t}()},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.d(e,"a",function(){return a});var i=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),a=function(){function t(e){var r=this;n(this,t),this.blob=e,this.file=e.file;var i=e.directUploadData,a=i.url,u=i.headers;this.xhr=new XMLHttpRequest,this.xhr.open("PUT",a,!0),this.xhr.responseType="text";for(var o in u)this.xhr.setRequestHeader(o,u[o]);this.xhr.addEventListener("load",function(t){return r.requestDidLoad(t)}),this.xhr.addEventListener("error",function(t){return r.requestDidError(t)})}return i(t,[{key:"create",value:function(t){this.callback=t,this.xhr.send(this.file.slice())}},{key:"requestDidLoad",value:function(t){var e=this.xhr,r=e.status,n=e.response;r>=200&&r<300?this.callback(null,n):this.requestDidError(t)}},{key:"requestDidError",value:function(t){this.callback('Error storing "'+this.file.name+'". Status: '+this.xhr.status)}}]),t}()}])});
/*
Turbolinks 5.1.0
Copyright © 2018 Basecamp, LLC
 */

(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,e){return Turbolinks.controller.visit(t,e)},clearCache:function(){return Turbolinks.controller.clearCache()},setProgressBarDelay:function(t){return Turbolinks.controller.setProgressBarDelay(t)}}}).call(this),function(){var t,e,r,n=[].slice;Turbolinks.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},Turbolinks.closest=function(e,r){return t.call(e,r)},t=function(){var t,r;return t=document.documentElement,null!=(r=t.closest)?r:function(t){var r;for(r=this;r;){if(r.nodeType===Node.ELEMENT_NODE&&e.call(r,t))return r;r=r.parentNode}}}(),Turbolinks.defer=function(t){return setTimeout(t,1)},Turbolinks.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},Turbolinks.dispatch=function(t,e){var n,o,i,s,a,u;return a=null!=e?e:{},u=a.target,n=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,n===!0),i.data=null!=o?o:{},i.cancelable&&!r&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},r=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),Turbolinks.match=function(t,r){return e.call(t,r)},e=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),Turbolinks.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}.call(this),function(){Turbolinks.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.HttpRequest=function(){function e(e,r,n){this.delegate=e,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=Turbolinks.Location.wrap(r).requestURL,this.referrer=Turbolinks.Location.wrap(n).absoluteURL,this.createXHR()}return e.NETWORK_FAILURE=0,e.TIMEOUT_FAILURE=-1,e.timeout=60,e.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},e.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},e.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},e.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},e.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},e.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},e.prototype.requestCanceled=function(){return this.endRequest()},e.prototype.notifyApplicationBeforeRequestStart=function(){return Turbolinks.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},e.prototype.notifyApplicationAfterRequestEnd=function(){return Turbolinks.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},e.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},e.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},e.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},e.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.BrowserAdapter=function(){function e(e){this.controller=e,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new Turbolinks.ProgressBar}var r,n,o;return o=Turbolinks.HttpRequest,r=o.NETWORK_FAILURE,n=o.TIMEOUT_FAILURE,e.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},e.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},e.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},e.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},e.prototype.visitRequestCompleted=function(t){return t.loadResponse()},e.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case r:case n:return this.reload();default:return t.loadResponse()}},e.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},e.prototype.visitCompleted=function(t){return t.followRedirect()},e.prototype.pageInvalidated=function(){return this.reload()},e.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},e.prototype.showProgressBar=function(){return this.progressBar.show()},e.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},e.prototype.reload=function(){return window.location.reload()},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.History=function(){function e(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return e.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},e.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},e.prototype.push=function(t,e){return t=Turbolinks.Location.wrap(t),this.update("push",t,e)},e.prototype.replace=function(t,e){return t=Turbolinks.Location.wrap(t),this.update("replace",t,e)},e.prototype.onPopState=function(t){var e,r,n,o;return this.shouldHandlePopState()&&(o=null!=(r=t.state)?r.turbolinks:void 0)?(e=Turbolinks.Location.wrap(window.location),n=o.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(e,n)):void 0},e.prototype.onPageLoad=function(t){return Turbolinks.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},e.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},e.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},e.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},e}()}.call(this),function(){Turbolinks.Snapshot=function(){function t(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return t.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},t.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},t.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},t.prototype.clone=function(){return new t({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},t.prototype.getRootLocation=function(){var t,e;return e=null!=(t=this.getSetting("root"))?t:"/",new Turbolinks.Location(e)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.body.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},t}()}.call(this),function(){var t=[].slice;Turbolinks.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){Turbolinks.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var t=function(t,r){function n(){this.constructor=t}for(var o in r)e.call(r,o)&&(t[o]=r[o]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t},e={}.hasOwnProperty;Turbolinks.SnapshotRenderer=function(e){function r(t,e,r){this.currentSnapshot=t,this.newSnapshot=e,this.isPreview=r,this.currentHeadDetails=new Turbolinks.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new Turbolinks.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return t(r,e),r.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},r.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},r.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},r.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},r.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},r.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},r.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},r.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},r.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},r.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.assignNewBody=function(){return document.body=this.newBody},r.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},r.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},r.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},r.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},r.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},r.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},r.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},r.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},r.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},r}(Turbolinks.Renderer)}.call(this),function(){var t=function(t,r){function n(){this.constructor=t}for(var o in r)e.call(r,o)&&(t[o]=r[o]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t},e={}.hasOwnProperty;Turbolinks.ErrorRenderer=function(e){function r(t){this.html=t}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(Turbolinks.Renderer)}.call(this),function(){Turbolinks.View=function(){function t(t){this.delegate=t,this.element=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return Turbolinks.Snapshot.fromElement(this.element)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,e,r){return Turbolinks.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),Turbolinks.Snapshot.wrap(t),e)},t.prototype.renderError=function(t,e){return Turbolinks.ErrorRenderer.render(this.delegate,e,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.ScrollManager=function(){function e(e){this.delegate=e,this.onScroll=t(this.onScroll,this),this.onScroll=Turbolinks.throttle(this.onScroll)}return e.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},e.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},e.prototype.scrollToElement=function(t){return t.scrollIntoView()},e.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},e.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},e.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},e}()}.call(this),function(){Turbolinks.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var e;return t.prototype.has=function(t){var r;return r=e(t),r in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var r;return r=e(t),this.snapshots[r]},t.prototype.write=function(t,r){var n;return n=e(t),this.snapshots[n]=r},t.prototype.touch=function(t){var r,n;return n=e(t),r=this.keys.indexOf(n),r>-1&&this.keys.splice(r,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},e=function(t){return Turbolinks.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.Visit=function(){function e(e,r,n){this.controller=e,this.action=n,this.performScroll=t(this.performScroll,this),this.identifier=Turbolinks.uuid(),this.location=Turbolinks.Location.wrap(r),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var r;return e.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},e.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},e.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},e.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},e.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=r(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},e.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new Turbolinks.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},e.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},e.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},e.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},e.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},e.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},e.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},e.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},e.prototype.requestCompletedWithResponse=function(t,e){return this.response=t,null!=e&&(this.redirectedToLocation=Turbolinks.Location.wrap(e)),this.adapter.visitRequestCompleted(this)},e.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},e.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},e.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},e.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},e.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},e.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},e.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},e.prototype.getTimingMetrics=function(){return Turbolinks.copyObject(this.timingMetrics)},r=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},e.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},e.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},e.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},e.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.Controller=function(){function e(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new Turbolinks.History(this),this.view=new Turbolinks.View(this),this.scrollManager=new Turbolinks.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return e.prototype.start=function(){return Turbolinks.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},e.prototype.disable=function(){return this.enabled=!1},e.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},e.prototype.clearCache=function(){return this.cache=new Turbolinks.SnapshotCache(10)},e.prototype.visit=function(t,e){var r,n;return null==e&&(e={}),t=Turbolinks.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(r=null!=(n=e.action)?n:"advance",this.adapter.visitProposedToLocationWithAction(t,r)):window.location=t:void 0},e.prototype.startVisitToLocationWithAction=function(t,e,r){var n;return Turbolinks.supported?(n=this.getRestorationDataForIdentifier(r),this.startVisit(t,e,{restorationData:n})):window.location=t},e.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},e.prototype.startHistory=function(){return this.location=Turbolinks.Location.wrap(window.location),this.restorationIdentifier=Turbolinks.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.stopHistory=function(){return this.history.stop()},e.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=Turbolinks.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},e.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=Turbolinks.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,e){var r;return this.restorationIdentifier=e,this.enabled?(r=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:r,historyChanged:!0}),this.location=Turbolinks.Location.wrap(t)):this.adapter.pageInvalidated()},e.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},e.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},e.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},e.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},e.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},e.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},e.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},e.prototype.render=function(t,e){return this.view.render(t,e)},e.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},e.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},e.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},e.prototype.pageLoaded=function(){
return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},e.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},e.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},e.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},e.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},e.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,e){return Turbolinks.dispatch("turbolinks:click",{target:t,data:{url:e.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationBeforeVisitingLocation=function(t){return Turbolinks.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationAfterVisitingLocation=function(t){return Turbolinks.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},e.prototype.notifyApplicationBeforeCachingSnapshot=function(){return Turbolinks.dispatch("turbolinks:before-cache")},e.prototype.notifyApplicationBeforeRender=function(t){return Turbolinks.dispatch("turbolinks:before-render",{data:{newBody:t}})},e.prototype.notifyApplicationAfterRender=function(){return Turbolinks.dispatch("turbolinks:render")},e.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),Turbolinks.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},e.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},e.prototype.createVisit=function(t,e,r){var n,o,i,s,a;return o=null!=r?r:{},s=o.restorationIdentifier,i=o.restorationData,n=o.historyChanged,a=new Turbolinks.Visit(this,t,e),a.restorationIdentifier=null!=s?s:Turbolinks.uuid(),a.restorationData=Turbolinks.copyObject(i),a.historyChanged=n,a.referrer=this.location,a},e.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},e.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},e.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?Turbolinks.closest(t,"a[href]:not([target]):not([download])"):void 0},e.prototype.getVisitableLocationForLink=function(t){var e;return e=new Turbolinks.Location(t.getAttribute("href")),this.locationIsVisitable(e)?e:void 0},e.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},e.prototype.nodeIsVisitable=function(t){var e;return(e=Turbolinks.closest(t,"[data-turbolinks]"))?"false"!==e.getAttribute("data-turbolinks"):!0},e.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},e.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},e.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},e}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,e,r;Turbolinks.start=function(){return e()?(null==Turbolinks.controller&&(Turbolinks.controller=t()),Turbolinks.controller.start()):void 0},e=function(){return null==window.Turbolinks&&(window.Turbolinks=Turbolinks),r()},t=function(){var t;return t=new Turbolinks.Controller,t.adapter=new Turbolinks.BrowserAdapter(t),t},r=function(){return window.Turbolinks===Turbolinks},r()&&Turbolinks.start()}.call(this);
(function() {
  var context = this;

  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        WebSocket: window.WebSocket,
        logger: window.console,
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages, ref;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return (ref = this.logger).log.apply(ref, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(context);

  var ActionCable = context.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            return false;
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new ActionCable.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
$(function() {
  c3.generate({
    bindto: '#c3-graph',
    color: { pattern: [ '#00BCD4', '#607D8B' ] },
    data: {
      columns: [
        [ 'data1', 70, 48, 42, 2, 81, 35 ],
        [ 'data2', 61, 61, 51, 94, 52, 55 ]
      ],
    }
  });

  c3.generate({
    bindto: '#c3-spline',
    color: { pattern: [ '#FF4081', '#795548' ] },
    data: {
      type: 'spline',
      columns: [
        [ 'data1', 93, 70, 98, 44, 42, 84 ],
        [ 'data2', 39, 18, 90, 4, 61, 38 ]
      ],
    }
  });

  c3.generate({
    bindto: '#c3-area',
    color: { pattern: [ '#E040FB', '#9E9E9E' ] },
    data: {
      columns: [
        [ 'data1', 313, 396, 125, 0, 0, 0 ],
        [ 'data2', 125, 446, 370, 169, 248, 434 ]
      ],
      types: {
        data1: 'area',
        data2: 'area-spline',
      },
    }
  });

  c3.generate({
    bindto: '#c3-bar',
    color: { pattern: [ '#FF5722', '#4CAF50' ] },
    data: {
      columns: [
        [ 'data1', 492, 118, 124, 332, 262, 182 ],
        [ 'data2', 205, 138, 164, 474, 244, 216 ]
      ],
      type: 'bar',
    },
    bar: {
      width: { ratio: 0.5 },
    },
  });

  c3.generate({
    bindto: '#c3-scatter',
    color: { pattern: [ '#E91E63', '#009688' ] },
    data: {
      xs: {
        setosa: 'setosa_x',
        versicolor: 'versicolor_x',
      },
      columns: [
        [ 'setosa_x', 26, 9, 95, 48, 0, 27, 73, 57, 53, 27, 35, 5, 25, 84, 45, 92, 80, 57, 27, 83, 62, 33, 91, 48, 71, 12, 80, 62, 30, 27, 82, 96, 71, 43, 0, 38, 36, 23, 9, 32, 40, 0, 53, 97, 9, 12, 22, 43, 88, 54 ],
        [ 'versicolor_x', 53, 73, 36, 57, 30, 5, 83, 70, 27, 43, 70, 21, 68, 17, 86, 75, 91, 83, 49, 51, 60, 98, 20, 5, 93, 96, 44, 86, 20, 39, 25, 7, 1, 91, 18, 85, 11, 9, 3, 85, 42, 16, 95, 38, 17, 56, 65, 79, 70, 8 ],
        [ 'setosa', 15, 47, 36, 78, 81, 6, 96, 73, 53, 72, 94, 92, 5, 75, 11, 91, 13, 10, 76, 77, 93, 97, 36, 72, 45, 48, 10, 98, 7, 35, 69, 50, 38, 46, 83, 65, 33, 86, 40, 27, 94, 97, 66, 65, 54, 29, 27, 11, 58, 21 ],
        [ 'versicolor', 92, 66, 38, 43, 30, 69, 97, 7, 49, 13, 36, 31, 40, 74, 33, 10, 9, 84, 58, 15, 72, 56, 32, 95, 50, 31, 75, 72, 74, 68, 7, 49, 25, 70, 16, 11, 76, 58, 21, 34, 30, 85, 44, 17, 6, 85, 77, 57, 88, 3 ]
      ],
      type: 'scatter'
    },
    axis: {
      x: {
        label: 'Sepal.Width',
        tick: { fit: false },
      },
      y: { label: 'Petal.Width' },
    },
  });

  c3.generate({
    bindto: '#c3-donut',
    color: { pattern: [ '#673AB7', '#E040FB', '#D32F2F', '#9E9E9E', '#0288D1' ] },
    data: {
      columns: [
        [ 'data1', 79 ],
        [ 'data2', 91 ],
        [ 'data3', 71 ],
        [ 'data4', 85 ],
        [ 'data5', 57 ]
      ],
      type : 'donut',
    },
    donut: { title: 'Some title' },
  });

  c3.generate({
    bindto: '#c3-gauge',
    data: {
      columns: [
        ['data', 67]
      ],
      type: 'gauge'
    },
    color: {
      pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'],
      threshold: {
        values: [30, 60, 90, 100]
      }
    },
    size: {
      height: 180
    }
  });
});
$(function() {
  new Chartist.Line('#chartist-graph', {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    series: [
      [ 8, 14, 5, 13, 12 ],
      [ 7, 8, 1, 3, 1 ],
      [ 5, 12, 1, 9, 7 ]
    ],
  }, {
    fullWidth: true,
    chartPadding: {
      right: 40
    }
  });

  new Chartist.Line('#chartist-bi-polar', {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [
      [ 1, -1, -2, 0, 2, -1, -2, -1 ],
      [ -2, -1, 0, -3, -2, 1, -3, 2 ],
      [ 2, -1, -1, -3, -2, 0, -1, 1 ],
      [ 1, -3, 2, -3, -3, 2, -2, -3 ] ]
  }, {
    high: 3,
    low: -3,
    showArea:  true,
    showLine:  false,
    showPoint: false,
    fullWidth: true,
    axisX: {
      showLabel: false,
      showGrid:  false
    }
  });

  new Chartist.Bar('#chartist-bars', {
    labels: ['First quarter of the year', 'Second quarter of the year', 'Third quarter of the year', 'Fourth quarter of the year'],
    series: [
      [ 75177, 30327, 33902, 45922 ],
      [ 67592, 31235, 64863, 78175 ],
      [ 1978, 1951, 8121, 8132 ] ]
  }, {
    seriesBarDistance: 10,
    axisX: { offset: 60 },
    axisY: {
      offset:        80,
      scaleMinSpace: 15,

      labelInterpolationFnc: function(value) {
        return value + ' CHF';
      },
    },
  });

  new Chartist.Bar('#chartist-h-bars', {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    series: [
      [ 8, 2, 8, 2, 1, 4, 5 ],
      [ 5, 1, 7, 4, 6, 5, 6 ] ]
  }, {
    seriesBarDistance: 10,
    reverseData:       true,
    horizontalBars:    true,
    axisY:             { offset: 70 }
  });

  function sum(a, b) {
    return a + b;
  }
  var pieData = {
    series: [ 3, 5, 7 ],
  };
  new Chartist.Pie('#chartist-pie', pieData, {
    labelInterpolationFnc: function(value) {
      return Math.round(value / pieData.series.reduce(sum) * 100) + '%';
    }
  });

  new Chartist.Pie('#chartist-gauge', {
    series: [20, 10, 30, 40],
  }, {
    donut:      true,
    donutWidth: 60,
    startAngle: 270,
    total:      200,
    showLabel:  false
  });
});
$(function() {
  // Wrap charts
  $('.chartjs-demo').each(function() {
    $(this).wrap($('<div style="height:' + this.getAttribute('height') + 'px"></div>'));
  });


  var graphChart = new Chart(document.getElementById('chart-graph').getContext("2d"), {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label:           'My First dataset',
        data:            [43, 91, 89, 16, 21, 79, 28],
        borderWidth:     1,
        backgroundColor: 'rgba(255, 193, 7, 0.3)',
        borderColor:     '#FFC107',
        borderDash:      [5, 5],
        fill: false
      }, {
        label:           'My Second dataset',
        data:            [24, 63, 29, 75, 28, 54, 38],
        borderWidth:     1,
        backgroundColor: 'rgba(233, 30, 99, 0.3)',
        borderColor:     '#E91E63',
      }],
    },

    // Demo
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var barsChart = new Chart(document.getElementById('chart-bars').getContext("2d"), {
    type: 'bar',
    data: {
      labels: ['Italy', 'UK', 'USA', 'Germany', 'France', 'Japan'],
      datasets: [{
        label: '2010 customers #',
        data: [53, 99, 14, 10, 43, 27],
        borderWidth: 1,
        backgroundColor: 'rgba(205, 220, 57, 0.3)',
        borderColor: '#CDDC39'
      }, {
        label: '2014 customers #',
        data: [55, 74, 20, 90, 67, 97],
        borderWidth: 1,
        backgroundColor: 'rgba(103, 58, 183, 0.3)',
        borderColor: '#673AB7'
      }]
    },

    // Demo
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var radarChart = new Chart(document.getElementById('chart-radar').getContext("2d"), {
    type: 'radar',
    data: {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgba(76, 175, 80, 0.3)',
        borderColor: '#4CAF50',
        pointBackgroundColor: '#4CAF50',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4CAF50',
        data: [39, 99, 77, 38, 52, 24, 89],
        borderWidth: 1
      }, {
        label: 'My Second dataset',
        backgroundColor: 'rgba(0, 150, 136, 0.3)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#009688',
        data: [6, 33, 14, 70, 58, 90, 26],
        borderWidth: 1
      }]
    },

    // Demo
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var polarAreaChart = new Chart(document.getElementById('chart-polar-area').getContext("2d"), {
    type: 'polarArea',
    data: {
      datasets: [{
        data: [ 12, 10, 14, 6, 15 ],
        backgroundColor: [ '#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB' ],
        label: 'My dataset'
      }],
      labels: [ 'Red', 'Green', 'Yellow', 'Grey', 'Blue' ]
    },

    // Demo
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var pieChart = new Chart(document.getElementById('chart-pie').getContext("2d"), {
    type: 'pie',
    data: {
      labels: [ 'Red', 'Blue', 'Yellow' ],
      datasets: [{
        data: [ 180, 272, 100 ],
        backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
        hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ]
      }]
    },

    // Demo
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var doughnutChart = new Chart(document.getElementById('chart-doughnut').getContext("2d"), {
    type: 'doughnut',
    data: {
      labels: [ 'Red', 'Blue', 'Yellow' ],
      datasets: [{
        data: [ 137, 296, 213 ],
        backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
        hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ]
      }]
    },

    // Demo
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  });

  // Resizing charts

  function resizeCharts() {
    graphChart.resize();
    barsChart.resize();
    radarChart.resize();
    polarAreaChart.resize();
    pieChart.resize();
    doughnutChart.resize();
  }

  // Initial resize
  resizeCharts();

  // For performance reasons resize charts on delayed resize event
  window.layoutHelpers.on('resize.charts-demo', resizeCharts);
});
$(function() {
  var gridColor = '#aaaaaa';
  var gridBorder = '#eeeeee';
  var legendBg = '#f5f5f5';

  $.plot($('#flot-graph'), [
    {
      label: 'Visits',
      data: [
        [ 6, 196 ], [ 7, 175 ], [ 8, 212 ], [ 9, 247 ], [ 10, 152 ], [ 11, 225 ], [ 12, 155 ], [ 13, 203 ], [ 14, 166 ], [ 15, 151 ]
      ]
    },
    {
      label: 'Returning visits',
      data: [
        [ 6, 49 ], [ 7, 56 ], [ 8, 30 ], [ 9, 29 ], [ 10, 66 ], [ 11, 2 ], [ 12, 2 ], [ 13, 8 ], [ 14, 34 ], [ 15, 63 ]
      ]
    }
  ], {
    series: {
      shadowSize: 0,
      lines: {
        show: true
      },
      points: {
        show: true,
        radius: 4
      }
    },

    grid: {
      color: gridColor,
      borderColor: gridBorder,
      borderWidth: 1,
      hoverable: true,
      clickable: true
    },

    xaxis: { tickColor: gridBorder, },
    yaxis: { tickColor: gridBorder, },
    legend: { backgroundColor: legendBg },
    tooltip: { show: true },
    colors: ["#607D8B", "#4CAF50"]
  });

  $.plot($('#flot-bars'), [
    {
      label: 'Visits',
      data: [
        [ 6, 156 ], [ 7, 195 ], [ 8, 171 ], [ 9, 211 ], [ 10, 150 ], [ 11, 169 ], [ 12, 173 ], [ 13, 200 ], [ 14, 233 ], [ 15, 161 ]
      ]
    },
    {
      label: 'Returning visits',
      data: [
        [ 6, 24 ], [ 7, 20 ], [ 8, 31 ], [ 9, 4 ], [ 10, 92 ], [ 11, 87 ], [ 12, 28 ], [ 13, 21 ], [ 14, 80 ], [ 15, 76 ]
      ]
    }
  ], {
    series: {
      shadowSize: 0,
      bars: {
        show: true,
        barWidth: .6,
        align: 'center',
        lineWidth: 1,
        fill: 0.25
      }
    },

    grid: {
      color: gridColor,
      borderColor: gridBorder,
      borderWidth: 1,
      hoverable: true,
      clickable: true
    },

    xaxis: { tickDecimals: 2, tickColor: gridBorder },
    yaxis: { tickColor: gridBorder },
    legend: { backgroundColor: legendBg },

    tooltip: { show: true },
    colors: ['#FF5722', '#0288D1']
  });

  $.plot($('#flot-categories'), [
    {
      label: 'iPhone',
      data: [
        [ "2010.Q1", 35 ], [ '2010.Q2', 67 ], [ '2010.Q3', 13 ], [ '2010.Q4', 75 ]
      ]
    },
    {
      label: 'iPad',
      data: [
        [ "2010.Q1", 18 ], [ '2010.Q2', 80 ], [ '2010.Q3', 72 ], [ '2010.Q4', 33 ]
      ]
    },
    {
      label: 'iTouch',
      data: [
        [ '2010.Q1', 32 ], [ '2010.Q2', 49 ], [ '2010.Q3', 25 ], [ '2010.Q4', 87 ]
      ]
    }
  ], {
    series: {
      shadowSize: 0,
      lines: {
        show: true,
        fill: 0.1,
        lineWidth: 1
      }
    },

    grid: {
      color: gridColor,
      borderColor: gridBorder,
      borderWidth: 1,
      hoverable: true,
      clickable: true
    },

    xaxis: { mode: 'categories', tickColor: gridBorder },
    yaxis: { tickColor: gridBorder },
    legend: { backgroundColor: legendBg },

    tooltip: {
      show: true,
      content: '%s: %y'
    },

    colors: ['#E040FB', '#E91E63', '#00BCD4']
  });

  $.plot($('#flot-pie'), [
    { label: 'Series1', data: 77 },
    { label: 'Series2', data: 81 },
    { label: 'Series3', data: 46 },
    { label: 'Series4', data: 35 },
    { label: 'Series5', data: 79 },
    { label: 'Series6', data: 84 },
    { label: 'Series7', data: 51 }
  ], {
    series: {
      shadowSize: 0,
      pie: {
        show: true,
        radius: 1,
        innerRadius: 0.5,

        label: {
          show: true,
          radius: 3 / 4,
          background: { opacity: 0 },

          formatter: function(label, series) {
            return '<div style="font-size:11px;text-align:center;color:white;">' + Math.round(series.percent) + '%</div>';
          }
        }
      }
    },

    grid: {
      color: gridColor,
      borderColor: gridBorder,
      borderWidth: 1,
      hoverable: true,
      clickable: true
    },

    xaxis: { tickColor: gridBorder },
    yaxis: { tickColor: gridBorder },
    legend: { backgroundColor: legendBg },
    colors: ['#4CAF50', '#FF5722', '#607D8B', '#009688', '#E91E63', '#795548', '#0288D1']
  });
});
$(function() {
  var map = new GMaps({
    el: '#gmaps-example',
    lat: -12.043333,
    lng: -77.028333
  });
});
$(function() {
  $('#mapael-example').mapael({
    map: {
      name: 'world_countries',
      defaultArea: {
        attrs: {
          fill: '#f4f4e8',
          stroke: '#ced8d0'
        },
        attrsHover: {
          fill: '#a4e100'
        }
      }
    }
  });
});
$(function() {
  var gridBorder = '#eeeeee';

  new Morris.Line({
    element: 'morrisjs-graph',
    data: [
      { period: '2011 Q3', licensed: 71, sorned: 41 },
      { period: '2011 Q2', licensed: 24, sorned: 80 },
      { period: '2011 Q1', licensed: 39, sorned: 28 },
      { period: '2010 Q4', licensed: 34, sorned: 38 },
      { period: '2009 Q4', licensed: 51, sorned: 11 },
      { period: '2008 Q4', licensed: 68, sorned: 67 },
      { period: '2007 Q4', licensed: 85, sorned: 6 },
      { period: '2006 Q4', licensed: 21, sorned: 87 },
      { period: '2005 Q4', licensed: 38, sorned: 94 }
    ],
    xkey: 'period',
    ykeys: ['licensed', 'sorned'],
    labels: ['Licensed', 'Off the road'],
    lineColors: ['#FFC107', '#E91E63'],
    lineWidth: 1,
    pointSize: 4,
    gridLineColor: gridBorder,
    resize: true
  });

  new Morris.Bar({
    element: 'morrisjs-bars',
    data: [
      { device: 'iPhone',     geekbench: 58 },
      { device: 'iPhone 3G',  geekbench: 39 },
      { device: 'iPhone 3GS', geekbench: 83 },
      { device: 'iPhone 4',   geekbench: 50 },
      { device: 'iPhone 4S',  geekbench: 92 },
      { device: 'iPhone 5',   geekbench: 32 }
    ],
    xkey: 'device',
    ykeys: ['geekbench'],
    labels: ['Geekbench'],
    barRatio: 0.4,
    xLabelAngle: 35,
    hideHover: 'auto',
    barColors: ['#CDDC39'],
    gridLineColor: gridBorder,
    resize: true
  });

  new Morris.Area({
    element: 'morrisjs-area',
    data: [
      { period: '2010 Q1', iphone: 7, ipad: 25, itouch: 12 },
      { period: '2010 Q2', iphone: 14, ipad: 47, itouch: 46 },
      { period: '2010 Q3', iphone: 93, ipad: 83, itouch: 66 },
      { period: '2010 Q4', iphone: 25, ipad: 1, itouch: 39 },
      { period: '2011 Q1', iphone: 95, ipad: 43, itouch: 39 },
      { period: '2011 Q2', iphone: 59, ipad: 28, itouch: 15 },
      { period: '2011 Q3', iphone: 46, ipad: 56, itouch: 60 },
      { period: '2011 Q4', iphone: 68, ipad: 82, itouch: 30 },
      { period: '2012 Q1', iphone: 4, ipad: 80, itouch: 82 },
      { period: '2012 Q2', iphone: 41, ipad: 66, itouch: 84 }
    ],
    xkey: 'period',
    ykeys: ['iphone', 'ipad', 'itouch'],
    labels: ['iPhone', 'iPad', 'iPod Touch'],
    hideHover: 'auto',
    lineColors: ['#673AB7', '#0288D1', '#9E9E9E'],
    fillOpacity: 0.1,
    behaveLikeLine: true,
    lineWidth: 1,
    pointSize: 4,
    gridLineColor: gridBorder,
    resize: true
  });

  new Morris.Donut({
    element: 'morrisjs-donut',
    data: [
      { label: 'Jam',     value: 25 },
      { label: 'Frosted', value: 40 },
      { label: 'Custard', value: 25 },
      { label: 'Sugar',   value: 10 }
    ],
    colors: ['#009688', '#4CAF50', '#D32F2F', '#795548'],
    resize: true,
    labelColor: '#888',
    formatter: function (y) { return y + "%" }
  });
});
$(function() {
  $('#sparkline-lines').sparkline2([24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61, 38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18], {
    height: '100px',
    width: '100%',
    lineColor: '#673AB7',
    fillColor: 'rgba(103, 58, 183, 0.2)',
    spotRadius: 3,
    spotColor: '#FFC107',
    minSpotColor: '#E040FB',
    maxSpotColor: '#607D8B',
    highlightSpotColor: '#FF4081',
    highlightLineColor: '#795548',
  });

  $('#sparkline-bars').sparkline2([-58, -68, -51, -91, -26, 75, 13, 82, -95, -94, -35, -94, -87, -71, 1, 47, -91, -65, -7, -90, -7, 42, -96, -21, 7, 64, -71, -43, 67, 26], {
    height: '100px',
    width: '100%',
    type: 'bar',
    barColor: '#673AB7',
    negBarColor: '#00BCD4',
  });

  $('#sparkline-tristate').sparkline2([-8, -92, -73, -29, -54, -84, -3, 70, 16, 6, 1, 81, -39, 61, -78, 35, 61, 28, 65, 43, -7, 20, -73, -70, 53, 26, 63, -41, 31, 33], {
    height: '100px',
    width: '100%',
    type: 'tristate',
    posBarColor: '#607D8B',
    negBarColor: '#E040FB',
    zeroBarColor: '#E91E63',
  });

  $('#sparkline-discrete').sparkline2([67, 20, 1, 22, 23, 67, 31, 10, 47, 68, 24, 79, 93, 56, 38, 15, 9, 15, 1, 89, 72, 52, 79, 29, 38, 2, 71, 50, 63, 69], {
    height: '100px',
    width: '100%',
    type: 'discrete',
    lineColor: '#0288D1',
  });

  $('#sparkline-bullet').sparkline2([10, 12, 12, 9, 7], {
    height: '100px',
    width: '100%',
    type: 'bullet',
    targetColor: '#0288D1',
    performanceColor: '#009688',
    rangeColors: [ '#E040FB', '#9E9E9E', '#673AB7' ],
  });

  $('#sparkline-pie').sparkline2([17, 64, 12, 77], {
    height: '100px',
    width: '100px',
    type: 'pie',
    sliceColors: [ '#FF4081', '#00BCD4', '#E91E63', '#795548' ],
  });

  $('#sparkline-box').sparkline2([4, 27, 34, 52, 54, 59, 61, 68, 78, 82, 85, 87, 91, 93, 100], {
    height: '100px',
    width: '100%',
    type: 'box',
    boxLineColor: "#4CAF50",
    boxFillColor: "#FFC107",
    whiskerColor: "#FF4081",
    outlierLineColor: "#795548",
    outlierFillColor: "#607D8B",
    medianColor: "#00BCD4",
    targetColor: "#E91E63"
  });

});
$(function() {
  var chart1 = new Chart(document.getElementById('statistics-chart-1').getContext("2d"), {
    type: 'line',
    data: {
      labels: ['2016-10', '2016-11', '2016-12', '2017-01', '2017-02', '2017-03', '2017-04', '2017-05'],
      datasets: [{
        label: 'Visits',
        data: [93, 25, 95, 59, 46, 68, 4, 41],
        borderWidth: 1,
        backgroundColor: 'rgba(28,180,255,.05)',
        borderColor: 'rgba(28,180,255,1)'
      }, {
        label: 'Returns',
        data: [83, 1, 43, 28, 56, 82, 80, 66],
        borderWidth: 1,
        borderDash: [5, 5],
        backgroundColor: 'rgba(136, 151, 170, 0.1)',
        borderColor: '#8897aa'
      }],
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: '#aaa'
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: '#aaa'
          }
        }]
      },

      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart2 = new Chart(document.getElementById('statistics-chart-2').getContext("2d"), {
    type: 'line',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
        ],
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#009688',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: 1,
        lineTension: 0
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart3 = new Chart(document.getElementById('statistics-chart-3').getContext("2d"), {
    type: 'bar',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
        ],
        borderWidth: 0,
        backgroundColor: '#673AB7',
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart4 = new Chart(document.getElementById('statistics-chart-4').getContext("2d"), {
    type: 'line',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47
        ],
        borderWidth: 1,
        backgroundColor: 'rgba(206, 221, 54, 0.2)',
        borderColor: '#cedd36',
        pointBackgroundColor: 'rgba(0,0,0,0)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: 1,

      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart5 = new Chart(document.getElementById('statistics-chart-5').getContext("2d"), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [85, 15],
        backgroundColor: ['#fff', 'rgba(255,255,255,0.3)'],
        hoverBackgroundColor: ['#fff', 'rgba(255,255,255,0.3)'],
        borderWidth: 0
      }]
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      cutoutPercentage: 94,
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart6 = new Chart(document.getElementById('statistics-chart-6').getContext("2d"), {
    type: 'pie',
    data: {
      labels: ['Desktops', 'Smartphones', 'Tablets'],
      datasets: [{
        data: [1225, 654, 211],
        backgroundColor: ['rgba(99,125,138,0.5)', 'rgba(28,151,244,0.5)', 'rgba(2,188,119,0.5)'],
        borderColor: ['#647c8a', '#2196f3', '#02bc77'],
        borderWidth: 1
      }]
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12
        }
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  new PerfectScrollbar(document.getElementById('tasks-inner'));
  new PerfectScrollbar(document.getElementById('team-todo-inner'));

  if ($('html').attr('dir') === 'rtl') {
    $('#sales-dropdown-menu').removeClass('dropdown-menu-right');
  }

  // Resizing charts

  function resizeCharts() {
    chart1.resize();
    chart2.resize();
    chart3.resize();
    chart4.resize();
    chart5.resize();
    chart6.resize();
  }

  // Initial resize
  resizeCharts();

  // For performance reasons resize charts on delayed resize event
  window.layoutHelpers.on('resize.dashboard-1', resizeCharts);
});
$(function() {
  var chart1 = new Chart(document.getElementById('statistics-chart-1').getContext("2d"), {
    type: 'bar',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
        ],
        borderWidth: 0,
        backgroundColor: 'rgba(87, 181, 255, 1)',
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart2 = new Chart(document.getElementById('statistics-chart-2').getContext("2d"), {
    type: 'line',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
        ],
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#009688',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: 1,
        lineTension: 0
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart3 = new Chart(document.getElementById('statistics-chart-3').getContext("2d"), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [54, 46],
        backgroundColor: ['#673AB7', '#f9f9f9'],
        hoverBackgroundColor: ['#673AB7', '#f9f9f9'],
        borderWidth: 0
      }]
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      cutoutPercentage: 94,
      responsive: false,
      maintainAspectRatio: false
    }
  });

  if ($('html').attr('dir') === 'rtl') {
    $('#revenue-dropdown-menu').removeClass('dropdown-menu-right');
  }

  // Resizing charts

  function resizeCharts() {
    chart1.resize();
    chart2.resize();
    chart3.resize();
  }

  // Initial resize
  resizeCharts();

  // For performance reasons resize charts on delayed resize event
  window.layoutHelpers.on('resize.dashboard-2', resizeCharts);
});
$(function() {
  var chart1 = new Chart(document.getElementById('statistics-chart-1').getContext("2d"), {
    type: 'line',
    data: {
      labels: ['2016-09', '2016-10', '2016-11', '2016-12', '2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12', '2018-01', '2018-02'],
      datasets: [{
        label: 'Sales',
        data: [137, 187, 85, 72, 85, 120, 183, 89, 143, 105, 116, 77, 76, 180, 158, 172, 143, 164],
        borderWidth: 2,
        backgroundColor: 'rgba(87, 181, 255, .85)',
        borderColor: 'rgba(87, 181, 255, 1)',
        pointBackgroundColor: 'rgba(0,0,0,0)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: 10,
      }],
    },

    options: {
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: '#aaa',
            autoSkipPadding: 50
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: '#aaa',
            maxTicksLimit: 5
          }
        }]
      },
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart2 = new Chart(document.getElementById('statistics-chart-2').getContext("2d"), {
    type: 'line',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 60
        ],
        borderWidth: 1,
        backgroundColor: 'rgba(103, 58, 183, .2)',
        borderColor: 'rgba(103, 58, 183, 1)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: 1,
        lineTension: 0
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart3 = new Chart(document.getElementById('statistics-chart-3').getContext("2d"), {
    type: 'line',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 60
        ],
        borderWidth: 1,
        backgroundColor: 'rgba(206, 221, 54, .2)',
        borderColor: 'rgba(206, 221, 54, 1)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: 1,
        lineTension: 0
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart4 = new Chart(document.getElementById('statistics-chart-4').getContext("2d"), {
    type: 'line',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 60
        ],
        borderWidth: 1,
        backgroundColor: 'rgba(136, 151, 170, .2)',
        borderColor: 'rgba(136, 151, 170, 1)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: 1,
        lineTension: 0
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  // Resizing charts

  function resizeCharts() {
    chart1.resize();
    chart2.resize();
    chart3.resize();
    chart4.resize();
  }

  // Initial resize
  resizeCharts();

  // For performance reasons resize charts on delayed resize event
  window.layoutHelpers.on('resize.dashboard-3', resizeCharts);
});
$(function() {
  var chart1 = new Chart(document.getElementById('statistics-chart-1').getContext("2d"), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [24, 76],
        backgroundColor: ['#4CAF50', 'rgba(255, 255, 255, .1)'],
        hoverBackgroundColor: ['#4CAF50', 'rgba(255, 255, 255, .1)'],
        borderWidth: 0
      }]
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      cutoutPercentage: 94,
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart2 = new Chart(document.getElementById('statistics-chart-2').getContext("2d"), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [86, 14],
        backgroundColor: ['#d9534f', 'rgba(255, 255, 255, .1)'],
        hoverBackgroundColor: ['#d9534f', 'rgba(255, 255, 255, .1)'],
        borderWidth: 0
      }]
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      cutoutPercentage: 94,
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart3 = new Chart(document.getElementById('statistics-chart-3').getContext("2d"), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [63, 37],
        backgroundColor: ['#28c3d7', 'rgba(255, 255, 255, .1)'],
        hoverBackgroundColor: ['#28c3d7', 'rgba(255, 255, 255, .1)'],
        borderWidth: 0
      }]
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      cutoutPercentage: 94,
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart4 = new Chart(document.getElementById('statistics-chart-4').getContext("2d"), {
    type: 'line',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
        ],
        borderWidth: 2,
        backgroundColor: 'rgba(87, 181, 255, .85)',
        borderColor: 'rgba(87, 181, 255, 1)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointBackgroundColor: 'rgba(0,0,0,0)',
        lineTension: 0
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart5 = new Chart(document.getElementById('statistics-chart-5').getContext("2d"), {
    type: 'bar',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
        ],
        borderWidth: 0,
        backgroundColor: '#673AB7',
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart6 = new Chart(document.getElementById('statistics-chart-6').getContext("2d"), {
    type: 'line',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
        ],
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#009688',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: 1,
        lineTension: 0
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart7 = new Chart(document.getElementById('statistics-chart-7').getContext("2d"), {
    type: 'line',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 60
        ],
        borderWidth: 1,
        backgroundColor: 'rgba(206, 221, 54, 0)',
        borderColor: 'rgba(206, 221, 54, 1)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: 1,
        lineTension: 0
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart8 = new Chart(document.getElementById('statistics-chart-8').getContext("2d"), {
    type: 'pie',
    data: {
      labels: ['Desktops', 'Smartphones', 'Tablets'],
      datasets: [{
        data: [1225, 654, 211],
        backgroundColor: ['rgba(99,125,138,0.5)', 'rgba(28,151,244,0.5)', 'rgba(2,188,119,0.5)'],
        borderColor: ['#647c8a', '#2196f3', '#02bc77'],
        borderWidth: 1
      }]
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12
        }
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart9 = new Chart(document.getElementById('statistics-chart-9').getContext("2d"), {
    type: 'bar',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
        ],
        borderWidth: 0,
        backgroundColor: '#8897AA',
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart10 = new Chart(document.getElementById('statistics-chart-10').getContext("2d"), {
    type: 'pie',
    data: {
      labels: ['18 - 24', '25 - 34', '34 - 45', '45+'],
      datasets: [{
        data: [1225, 654, 211, 402],
        backgroundColor: ['rgba(99,125,138,0.5)', 'rgba(28,151,244,0.5)', 'rgba(2,188,119,0.5)', 'rgba(206, 221, 54, 0.5)'],
        borderColor: ['#647c8a', '#2196f3', '#02bc77', 'rgba(206, 221, 54, 1)'],
        borderWidth: 1
      }]
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12
        }
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  if ($('html').attr('dir') === 'rtl') {
    $('#type-gadgets-dropdown-menu, #new-users-dropdown-menu, #age-users-dropdown-menu').removeClass('dropdown-menu-right');
  }

  // Resizing charts

  function resizeCharts() {
    chart1.resize();
    chart2.resize();
    chart3.resize();
    chart4.resize();
    chart5.resize();
    chart6.resize();
    chart7.resize();
    chart8.resize();
    chart9.resize();
    chart10.resize();
  }

  // Initial resize
  resizeCharts();

  // For performance reasons resize charts on delayed resize event
  window.layoutHelpers.on('resize.dashboard-4', resizeCharts);
});
$(function() {
  var chart1 = new Chart(document.getElementById('statistics-chart-1').getContext("2d"), {
    type: 'line',
    data: {
      labels: ['2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12', '2018-01', '2018-02'],
      datasets: [{
        label: 'Visits',
        data: [14, 37, 30, 46, 80, 42, 33, 13, 25, 6, 88, 96],
        borderWidth: 1,
        backgroundColor: 'rgba(38, 180, 255, 0.1)',
        borderColor: '#26B4FF',
        fill: false
      }, {
        label: 'Returns',
        data: [56, 17, 19, 96, 73, 46, 67, 40, 77, 43, 64, 54],
        borderWidth: 1,
        borderDash: [5, 5],
        backgroundColor: 'rgba(136, 151, 170, 0.1)',
        borderColor: '#8897aa'
      }],
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: '#aaa',
            autoSkipPadding: 50
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: '#aaa',
            maxTicksLimit: 5
          }
        }]
      },

      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart2 = new Chart(document.getElementById('statistics-chart-2').getContext("2d"), {
    type: 'bar',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
        ],
        borderWidth: 0,
        backgroundColor: '#673AB7',
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart3 = new Chart(document.getElementById('statistics-chart-3').getContext("2d"), {
    type: 'line',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
        ],
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#009688',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: 1,
        lineTension: 0
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart4 = new Chart(document.getElementById('statistics-chart-4').getContext("2d"), {
    type: 'line',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 60
        ],
        borderWidth: 1,
        backgroundColor: 'rgba(206, 221, 54, 0)',
        borderColor: 'rgba(206, 221, 54, 1)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: 1,
        lineTension: 0
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart5 = new Chart(document.getElementById('statistics-chart-5').getContext("2d"), {
    type: 'line',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 60
        ],
        borderWidth: 1,
        backgroundColor: 'rgba(136, 151, 170, .2)',
        borderColor: 'rgba(136, 151, 170, 1)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: 1,
        lineTension: 0
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart6 = new Chart(document.getElementById('statistics-chart-6').getContext("2d"), {
    type: 'pie',
    data: {
      labels: ['Desktops', 'Smartphones', 'Tablets'],
      datasets: [{
        data: [1225, 654, 211],
        backgroundColor: ['rgba(99,125,138,0.5)', 'rgba(28,151,244,0.5)', 'rgba(2,188,119,0.5)'],
        borderColor: ['#647c8a', '#2196f3', '#02bc77'],
        borderWidth: 1
      }]
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12
        }
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart7 = new Chart(document.getElementById('statistics-chart-7').getContext("2d"), {
    type: 'bar',
    data: {
      datasets: [{
        data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
          38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
        ],
        borderWidth: 0,
        backgroundColor: '#8897AA',
      }],
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var chart8 = new Chart(document.getElementById('statistics-chart-8').getContext("2d"), {
    type: 'pie',
    data: {
      labels: ['18 - 24', '25 - 34', '34 - 45', '45+'],
      datasets: [{
        data: [1225, 654, 211, 402],
        backgroundColor: ['rgba(99,125,138,0.5)', 'rgba(28,151,244,0.5)', 'rgba(2,188,119,0.5)', 'rgba(206, 221, 54, 0.5)'],
        borderColor: ['#647c8a', '#2196f3', '#02bc77', 'rgba(206, 221, 54, 1)'],
        borderWidth: 1
      }]
    },

    options: {
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12
        }
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });

  if ($('html').attr('dir') === 'rtl') {
    $('#type-gadgets-dropdown-menu, #new-users-dropdown-menu, #age-users-dropdown-menu').removeClass('dropdown-menu-right');
  }

  // Resizing charts

  function resizeCharts() {
    chart1.resize();
    chart2.resize();
    chart3.resize();
    chart4.resize();
    chart5.resize();
    chart6.resize();
    chart7.resize();
    chart8.resize();
  }

  // Initial resize
  resizeCharts();

  // For performance reasons resize charts on delayed resize event
  window.layoutHelpers.on('resize.dashboard-5', resizeCharts);
});
// Auto update layout
(function() {
  window.layoutHelpers.setAutoUpdate(true);
})();

// Collapse menu
(function() {
  if ($('#layout-sidenav').hasClass('sidenav-horizontal') || window.layoutHelpers.isSmallScreen()) {
    return;
  }

  try {
    window.layoutHelpers.setCollapsed(
      localStorage.getItem('layoutCollapsed') === 'true',
      false
    );
  } catch (e) {}
})();

$(function() {
  // Initialize sidenav
  $('#layout-sidenav').each(function() {
    new SideNav(this, {
      orientation: $(this).hasClass('sidenav-horizontal') ? 'horizontal' : 'vertical'
    });
  });

  // Initialize sidenav togglers
  $('body').on('click', '.layout-sidenav-toggle', function(e) {
    e.preventDefault();
    window.layoutHelpers.toggleCollapsed();
    if (!window.layoutHelpers.isSmallScreen()) {
      try { localStorage.setItem('layoutCollapsed', String(window.layoutHelpers.isCollapsed())); } catch (e) {}
    }
  });

  if ($('html').attr('dir') === 'rtl') {
    $('#layout-navbar .dropdown-menu').toggleClass('dropdown-menu-right');
  }
});
$(function() {
  $('#indeterminate-checkbox').prop('indeterminate', true)
  $('#disabled-indeterminate-checkbox').prop('indeterminate', true)
});
$('#duallistbox-example').bootstrapDualListbox({
  nonSelectedListLabel: 'Non-selected',
  selectedListLabel: 'Selected',
  preserveSelectionOnMove: 'moved',
  moveOnSelect: false
});
// Bootstrap Markdown
$(function() {
  $('#bs-markdown').markdown({
    iconlibrary: 'fa',
    footer: '<div id="md-character-footer"></div><small id="md-character-counter" class="text-muted">350 character left</small>',

    onChange: function(e) {
      var contentLength = e.getContent().length;

      if (contentLength > 350) {
        $('#md-character-counter')
          .removeClass('text-muted')
          .addClass('text-danger')
          .html((contentLength - 350) + ' character surplus.');
      } else {
        $('#md-character-counter')
          .removeClass('text-danger')
          .addClass('text-muted')
          .html((350 - contentLength) + ' character left.');
      }
    },
  });

  // Update character counter
  $('#markdown').trigger('change');


  // *******************************************************************
  // Fix icons

  $('.md-editor .fa-header').removeClass('fa fa-header').addClass('fas fa-heading');
  $('.md-editor .fa-picture-o').removeClass('fa fa-picture-o').addClass('far fa-image');
});

// Quill
$(function() {
  if (!window.Quill) {
    return $('#quill-editor,#quill-toolbar,#quill-bubble-editor,#quill-bubble-toolbar').remove();
  }

  var editor = new Quill('#quill-editor', {
    modules: {
      toolbar: '#quill-toolbar'
    },
    placeholder: 'Type something',
    theme: 'snow'
  });

  // Get HTML content:
  //
  // var content = editor.root.innerHTML;
  //

  var bubbleEditor = new Quill('#quill-bubble-editor', {
    placeholder: 'Compose an epic...',
    modules: {
      toolbar: '#quill-bubble-toolbar'
    },
    theme: 'bubble'
  });
});
// Autosize
$(function() {
  autosize($('#autosize-demo'));
});

// Vanilla Text Mask
$(function() {
  // Phone
  //

  vanillaTextMask.maskInput({
    inputElement: $('#text-mask-phone')[0],
    mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  });

  // Number
  //

  vanillaTextMask.maskInput({
    inputElement: $('#text-mask-number')[0],
    mask: textMaskAddons.createNumberMask({
      prefix: '$'
    })
  });

  // Email
  //

  vanillaTextMask.maskInput({
    inputElement: $('#text-mask-email')[0],
    mask: textMaskAddons.emailMask
  });

  // Date
  //

  vanillaTextMask.maskInput({
    inputElement: $('#text-mask-date')[0],
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    pipe: textMaskAddons.createAutoCorrectedDatePipe('mm/dd/yyyy')
  });
});

// Knob
$(function() {
  $('.knob-example input').knob();
});

// Bootstrap Maxlength
$(function() {
  $('.bootstrap-maxlength-example').each(function() {
    $(this).maxlength({
      warningClass: 'label label-success',
      limitReachedClass: 'label label-danger',
      separator: ' out of ',
      preText: 'You typed ',
      postText: ' chars available.',
      validate: true,
      threshold: +this.getAttribute('maxlength')
    });
  });
});

// Pwstrength-bootstrap
$(function() {
  $('#pwstrength-example').pwstrength({
    ui: {
      progressExtraCssClasses: 'pwstrength-progress',
      useVerdictCssClass: true,
      showErrors: true
    }
  });
});
// Dropzone
$(function() {
  $('#dropzone-demo').dropzone({
    parallelUploads: 2,
    maxFilesize:     50000,
    filesizeBase:    1000,
    addRemoveLinks:  true,
  });

  // Mock the file upload progress (only for the demo)
  //
  Dropzone.prototype.uploadFiles = function(files) {
    var minSteps         = 6;
    var maxSteps         = 60;
    var timeBetweenSteps = 100;
    var bytesPerStep     = 100000;
    var isUploadSuccess  = Math.round(Math.random());

    var self = this;

    for (var i = 0; i < files.length; i++) {

      var file = files[i];
      var totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

      for (var step = 0; step < totalSteps; step++) {
        var duration = timeBetweenSteps * (step + 1);

        setTimeout(function(file, totalSteps, step) {
          return function() {
            file.upload = {
              progress: 100 * (step + 1) / totalSteps,
              total: file.size,
              bytesSent: (step + 1) * file.size / totalSteps
            };

            self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
            if (file.upload.progress == 100) {

              if (isUploadSuccess) {
                file.status =  Dropzone.SUCCESS;
                self.emit('success', file, 'success', null);
              } else {
                file.status =  Dropzone.ERROR;
                self.emit('error', file, 'Some upload error', null);
              }

              self.emit('complete', file);
              self.processQueue();
            }
          };
        }(file, totalSteps, step), duration);
      }
    }
  };
});

// Flow.js
$(function() {
  var r = new Flow({
    target: 'http://posttestserver.com/post.php',
    permanentErrors: [500, 501],
    maxChunkRetries: 1,
    chunkRetryInterval: 5000,
    simultaneousUploads: 1
  });

  // Flow.js isn't supported, fall back on a different method
  if (!r.support) {
    $('.flow-error').show();
    return ;
  }

  // Show a place for dropping/selecting files
  $('.flow-drop').show();
  r.assignDrop($('.flow-drop')[0]);
  r.assignBrowse($('.flow-browse')[0]);
  r.assignBrowse($('.flow-browse-folder')[0], true);
  r.assignBrowse($('.flow-browse-image')[0], false, false, {accept: 'image/*'});

  // Handle file add event
  r.on('fileAdded', function(file){
    // Show progress bar
    $('.flow-progress, .flow-list').removeClass('d-none');

    // Add the file to the list
    $('.flow-list').append(
      '<li class="flow-file list-group-item flow-file-'+file.uniqueIdentifier+'">' +
        '<div class="flow-progress media">' +
          '<div class="media-body">' +
            '<div><strong class="flow-file-name"></strong> - <em class="flow-file-progress"><span class="text-muted">Waiting...</span></em></div>' +
            '<div><small class="flow-file-size text-muted"></small></div>' +
          '</div>' +
          '<div class="ml-3 align-self-center">' +
            '<button type="button" class="flow-file-download btn btn-sm icon-btn btn-outline-primary"><i class="ion ion-md-download"></i></button>' +
            '<button type="button" class="flow-file-pause btn btn-sm icon-btn btn-outline-warning"><i class="ion ion-md-pause"></i></button> ' +
            '<button type="button" class="flow-file-resume btn btn-sm icon-btn btn-outline-success"><i class="ion ion-md-play"></i></button> ' +
            '<button type="button" class="flow-file-cancel btn btn-sm icon-btn btn-outline-danger"><i class="ion ion-md-close"></i></button>' +
          '</div>' +
        '</div>' +
      '</li>'
    );
    var $self = $('.flow-file-'+file.uniqueIdentifier);
    $self.find('.flow-file-name').text(file.name);
    $self.find('.flow-file-size').text(readablizeBytes(file.size));
    $self.find('.flow-file-download').attr('href', '/download/' + file.uniqueIdentifier).hide();
    $self.find('.flow-file-pause').on('click', function () {
      file.pause();
      $self.find('.flow-file-pause').hide();
      $self.find('.flow-file-resume').show();
    });
    $self.find('.flow-file-resume').on('click', function () {
      file.resume();
      $self.find('.flow-file-pause').show();
      $self.find('.flow-file-resume').hide();
    }).hide();
    $self.find('.flow-file-cancel').on('click', function () {
      file.cancel();
      $self.remove();
    });
  });
  r.on('filesSubmitted', function(file) {
    r.upload();
  });
  r.on('complete', function(){
    // Hide pause/resume when the upload has completed
    $('.flow-progress .progress-resume-link, .flow-progress .progress-pause-link').hide();
  });
  r.on('fileSuccess', function(file,message){
    var $self = $('.flow-file-'+file.uniqueIdentifier);
    // Reflect that the file upload has completed
    $self.find('.flow-file-progress').text('(completed)');
    $self.find('.flow-file-pause, .flow-file-resume').remove();
    $self.find('.flow-file-download').attr('href', '/download/' + file.uniqueIdentifier).show();
  });
  r.on('fileError', function(file, message){
    // Reflect that the file upload has resulted in error
    $('.flow-file-'+file.uniqueIdentifier+' .flow-file-progress')
      .addClass('text-danger')
      .text('(file could not be uploaded: ' + message + ')');
  });
  r.on('fileProgress', function(file){
    // if (!file.averageSpeed || file.averageSpeed.indexOf('undefined') !== -1) { return; }
    console.log(file.averageSpeed)

    // Handle progress for both the file and the overall upload
    $('.flow-file-'+file.uniqueIdentifier+' .flow-file-progress')
      .html(Math.floor(file.progress()*100) + '% '
        + readablizeBytes(file.averageSpeed) + '/s '
        + secondsToStr(file.timeRemaining()) + ' remaining') ;
    $('.flow-progress .progress-bar').css({width:Math.floor(r.progress()*100) + '%'});
  });
  r.on('uploadStart', function(){
    // Show pause, hide resume
    $('.flow-progress .progress-resume-link').hide();
    $('.flow-progress .progress-pause-link').show();
  });
  r.on('catchAll', function() {
    console.log.apply(console, arguments);
  });
  window.r = {
    pause: function () {
      r.pause();
      // Show resume, hide pause
      $('.flow-file-resume').show();
      $('.flow-file-pause').hide();
      $('.flow-progress .progress-resume-link').show();
      $('.flow-progress .progress-pause-link').hide();
    },
    cancel: function() {
      r.cancel();
      $('.flow-progress .progress-resume-link').hide();
      $('.flow-progress .progress-pause-link').hide();
      $('.flow-progress .progress-bar').css({width: '0%'});
      $('.flow-file').remove();
    },
    upload: function() {
      $('.flow-file-pause').show();
      $('.flow-file-resume').hide();
      r.resume();
    },
    flow: r
  };

  function readablizeBytes(bytes) {
    if (!bytes) { return '0 kB'; }

    var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, e)).toFixed(2) + " " + s[e];
  }
  function secondsToStr (temp) {
    function numberEnding (number) {
      return (number > 1) ? 's' : '';
    }
    var years = Math.floor(temp / 31536000);
    if (years) {
      return years + ' year' + numberEnding(years);
    }
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      return days + ' day' + numberEnding(days);
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return hours + ' hour' + numberEnding(hours);
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return minutes + ' minute' + numberEnding(minutes);
    }
    var seconds = temp % 60;
    return seconds + ' second' + numberEnding(seconds);
  }
});
$(function() {
  if ($('html').attr('dir') === 'rtl') {
    $('.button-dropdown-input-group-demo .dropdown-menu-right').removeClass('dropdown-menu-right').addClass('rtled');
    $('.button-dropdown-input-group-demo .dropdown-menu:not(.rtled)').addClass('dropdown-menu-right');
  }
});
// Bootstrap Datepicker
$(function() {
  var isRtl = $('html').attr('dir') === 'rtl';

  $('#datepicker-base').datepicker({
    orientation: isRtl ? 'auto right' : 'auto left'
  });
  $('#datepicker-features').datepicker({
    calendarWeeks:         true,
    todayBtn:              'linked',
    daysOfWeekDisabled:    '1',
    clearBtn:              true,
    todayHighlight:        true,
    multidate:             true,
    daysOfWeekHighlighted: '1,2',
    orientation: isRtl ? 'auto left' : 'auto right',

    beforeShowMonth: function(date) {
      if (date.getMonth() === 8) {
        return false;
      }
    },

    beforeShowYear: function(date){
      if (date.getFullYear() === 2014) {
        return false;
      }
    }
  });
  $('#datepicker-range').datepicker({
    orientation: isRtl ? 'auto right' : 'auto left'
  });
  $('#datepicker-inline').datepicker();
});

// Bootstrap Daterangepicker
$(function() {
  var isRtl = $('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl';

  $('#daterange-1').daterangepicker({
    opens: (isRtl ? 'left' : 'right'),
    showWeekNumbers: true
  });

  $('#daterange-2').daterangepicker({
    timePicker: true,
    timePickerIncrement: 30,
    locale: {
      format: 'MM/DD/YYYY h:mm A'
    },
    opens: (isRtl ? 'left' : 'right')
  });

  $('#daterange-3').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      opens: (isRtl ? 'left' : 'right')
    }, function(start, end, label) {
      var years = moment().diff(start, 'years');

      alert("You are " + years + " years old.");
    }
  );

  // Button

  var start = moment().subtract(29, 'days');
  var end = moment();

  function cb(start, end) {
    $('#daterange-4').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  }

  $('#daterange-4').daterangepicker({
    startDate: start,
    endDate: end,
    ranges: {
     'Today': [moment(), moment()],
     'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
     'Last 7 Days': [moment().subtract(6, 'days'), moment()],
     'Last 30 Days': [moment().subtract(29, 'days'), moment()],
     'This Month': [moment().startOf('month'), moment().endOf('month')],
     'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
   },
   opens: (isRtl ? 'left' : 'right')
  }, cb);

  cb(start, end);
});

// Bootstrap Material DateTimePicker
$(function() {
  $('#b-m-dtp-date').bootstrapMaterialDatePicker({
    weekStart: 0,
    time: false,
    clearButton: true
  });

  $('#b-m-dtp-time').bootstrapMaterialDatePicker({
    date: false,
    shortTime: false,
    format: 'HH:mm'
  });

  $('#b-m-dtp-datetime').bootstrapMaterialDatePicker({
    weekStart: 1,
    format : 'dddd DD MMMM YYYY - HH:mm',
    shortTime: true,
    nowButton : true,
    minDate : new Date()
  });
});

// jQuery Timepicker
$(function() {
  var isRtl = $('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl';

  $('#timepicker-example-1').timepicker({
    scrollDefault: 'now',
    orientation: (isRtl ? 'r' : 'l')
  });

  $('#timepicker-example-2').timepicker({
    minTime: '2:00pm',
    maxTime: '11:30pm',
    showDuration: true,
    orientation: (isRtl ? 'r' : 'l')
  });

  $('#timepicker-example-3').timepicker({
    disableTimeRanges: [
      ['1am', '2am'],
      ['3am', '4:01am']
    ],
    orientation: (isRtl ? 'r' : 'l')
  });

  $('#timepicker-example-4').timepicker({
    'timeFormat': 'H:i:s',
    orientation: (isRtl ? 'r' : 'l')
  });
  $('#timepicker-example-5').timepicker({
    'timeFormat': 'h:i A',
    orientation: (isRtl ? 'r' : 'l')
  });

  $('#timepicker-example-6').timepicker({
    'step': 15,
    orientation: (isRtl ? 'r' : 'l')
  });
});

// Minicolors
$(function() {
  var isRtl = $('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl';

  $('#minicolors-hue').minicolors({
    control:  'hue',
    position: 'bottom ' + (isRtl ? 'right' : 'left'),
  });

  $('#minicolors-saturation').minicolors({
    control:  'saturation',
    position: 'bottom ' + (isRtl ? 'left' : 'right'),
  });

  $('#minicolors-wheel').minicolors({
    control:  'wheel',
    position: 'top ' + (isRtl ? 'left' : 'right'),
  });

  $('#minicolors-opacity').minicolors({
    control: 'wheel',
    opacity: true,
    position: 'bottom ' + (isRtl ? 'right' : 'left'),
  });

  $('#minicolors-brightness').minicolors({
    control:  'brightness',
    position: 'top ' + (isRtl ? 'right' : 'left'),
  });

  $('#minicolors-hidden').minicolors({
    position: 'top ' + (isRtl ? 'right' : 'left'),
  });
});
// Bootstrap Select
$(function () {
  $('.selectpicker').selectpicker();
});

// Bootstrap Multiselect
$(function() {
  $('#bs-multiselect-1,#bs-multiselect-2,#bs-multiselect-3').multiselect();
  $('#bs-multiselect-4').multiselect({
    enableClickableOptGroups: true,
    enableCollapsibleOptGroups: true,
    enableFiltering: true,
    includeSelectAllOption: true,
    buttonWidth: '100%',
    maxHeight: 400,
    dropUp: true,
    templates: {
      filter: '<li class="multiselect-item filter"><div class="input-group input-group-sm"><span class="input-group-prepend"><span class="input-group-text"><i class="ion ion-ios-search"></i></span></span><input class="form-control multiselect-search" type="text"></div></li>',
      filterClearBtn: '<span class="input-group-append"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="ion ion-md-close"></i></button></span>',
    }
  });

  // RTL
  if ($('html').attr('dir') === 'rtl') {
    $('#bs-multiselect-1,#bs-multiselect-2,#bs-multiselect-3,#bs-multiselect-4')
      .next('.btn-group')
      .find('.dropdown-menu')
      .addClass('dropdown-menu-right');
  }
});

// Select2
$(function() {
  $('.select2-demo').each(function() {
    $(this)
      .wrap('<div class="position-relative"></div>')
      .select2({
        placeholder: 'Select value',
        dropdownParent: $(this).parent()
      });
  })
});

// Bootstrap Tagsinput
$(function() {
  var $el = $('#bs-tagsinput-1');

  $el.tagsinput({
    tagClass: function(item) {
      switch (item.continent) {
        case 'Europe'   : return 'badge badge-primary';
        case 'America'  : return 'badge badge-danger';
        case 'Australia': return 'badge badge-success';
        case 'Africa'   : return 'badge badge-default';
        case 'Asia'     : return 'badge badge-warning';
      }
    },

    itemValue: 'value',
    itemText:  'text',
  });

  $el.tagsinput('add', { value: 1,  text: 'Amsterdam',  continent: 'Europe' });
  $el.tagsinput('add', { value: 4,  text: 'Washington', continent: 'America' });
  $el.tagsinput('add', { value: 7,  text: 'Sydney',     continent: 'Australia' });
  $el.tagsinput('add', { value: 10, text: 'Beijing',    continent: 'Asia' });
  $el.tagsinput('add', { value: 13, text: 'Cairo',      continent: 'Africa' });

  $('#bs-tagsinput-2').tagsinput({ tagClass: 'badge badge-primary' });
  $('#bs-tagsinput-3').tagsinput({ tagClass: 'badge badge-secondary' });
  $('#bs-tagsinput-4').tagsinput({ tagClass: 'badge badge-success' });
  $('#bs-tagsinput-5').tagsinput({ tagClass: 'badge badge-info' });
  $('#bs-tagsinput-6').tagsinput({ tagClass: 'badge badge-warning' });
  $('#bs-tagsinput-7').tagsinput({ tagClass: 'badge badge-danger' });
  $('#bs-tagsinput-8').tagsinput({ tagClass: 'badge badge-dark' });
});
// Bootstrap Slider
$(function() {
  $('#bs-slider-1').slider({
    formatter: function(value) {
      return 'Value: ' + value;
    },
  });

  $('#bs-slider-2').slider();

  $('#bs-slider-3').slider({
    reversed: true,
  });

  $('#bs-slider-4').slider({
    reversed: true,
  });

  $('#bs-slider-5').slider();

  $('#bs-slider-6').slider({
    ticks:        [0, 100, 200, 300, 400],
    ticks_labels: ['$0', '$100', '$200', '$300', '$400'],
  });

  $('#bs-slider-7').slider({
    ticks:        [0, 100, 200, 300, 400],
    ticks_labels: ['$0', '$100', '$200', '$300', '$400'],
    reversed:     true,
  });

  $('.bs-slider-variant').slider();
});

// noUiSlider
$(function() {
  var isRtl = $('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl';

  noUiSlider.create(document.getElementById('nouislider-1'), {
    start: [ 80 ],
    connect: [true, false],
    direction: isRtl ? 'rtl' : 'ltr',
    range: {
      'min': 0,
      'max': 100,
    }
  });

  // Vertical

  var slider = document.getElementById('nouislider-2');

  slider.style.height = '200px';
  slider.style.margin = '0 auto 30px';

  noUiSlider.create(slider, {
    start: [ 1450 ],
    connect: [true, false],
    orientation: 'vertical',
    direction: 'rtl',
    step: 150,
    range: {
      'min': 1300,
      'max': 3250
    }
  });

  // Range

  noUiSlider.create(document.getElementById('nouislider-3'), {
    start: [ 4000, 8000 ],
    step: 1000,
    connect: true,
    direction: isRtl ? 'rtl' : 'ltr',
    range: {
      'min': [  2000 ],
      'max': [ 10000 ]
    }
  });

  // Full

  noUiSlider.create(document.getElementById('nouislider-4'), {
    start: [ 1450, 2050, 2350, 3000 ],
    connect: true,
    behaviour: 'tap-drag',
    step: 150,
    tooltips: true,
    range: {
      'min': 1000,
      'max': 3750
    },
    pips: {
      mode: 'steps',
      stepped: true,
      density: 4
    },
    direction: isRtl ? 'rtl' : 'ltr',
  });

  var slider2 = document.getElementById('nouislider-5');

  slider2.style.height = '400px';
  slider2.style.margin = '0 auto 30px';

  noUiSlider.create(slider2, {
    start: [ 1450, 2050, 2350, 3000 ],
    connect: true,
    direction: 'rtl',
    orientation: 'vertical',
    behaviour: 'tap-drag',
    step: 150,
    tooltips: true,
    range: {
      'min': 1000,
      'max': 3750
    },
    pips: {
      mode: 'steps',
      stepped: true,
      density: 4
    }
  });

  // Colors

  var slider3 = document.getElementById('nouislider-6');
  var slider4 = document.getElementById('nouislider-7');
  var slider5 = document.getElementById('nouislider-8');
  var slider6 = document.getElementById('nouislider-9');
  var slider7 = document.getElementById('nouislider-10');
  var slider8 = document.getElementById('nouislider-11');
  var slider9 = document.getElementById('nouislider-12');

  var options =  {
    start: [ 2050, 3000 ],
    connect: true,
    behaviour: 'tap-drag',
    step: 150,
    tooltips: true,
    range: {
      'min': 1000,
      'max': 3750
    },
    pips: {
      mode: 'steps',
      stepped: true,
      density: 4
    },
    direction: isRtl ? 'rtl' : 'ltr'
  };

  noUiSlider.create(slider3, options);
  noUiSlider.create(slider4, options);
  noUiSlider.create(slider5, options);
  noUiSlider.create(slider6, options);
  noUiSlider.create(slider7, options);
  noUiSlider.create(slider8, options);
  noUiSlider.create(slider9, options);
});
$(function() {
  var isRtl = $('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl';

  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };

  var countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
    'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan',
    'Bahamas, The', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
    'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana',
    'Brazil', 'Brunei ', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia',
    'Cameroon', 'Canada', 'Cabo Verde', 'Central African Republic', 'Chad', 'Chile',
    'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the',
    'Congo, Republic of the', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia', 'Cuba',
    'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica',
    'Dominican Republic', 'Timor-Leste', 'Ecuador', 'Egypt', 'El Salvador',
    'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland',
    'France', 'Gabon', 'Gambia, The', 'Georgia', 'Germany', 'Ghana', 'Greece',
    'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See',
    'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
    'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan',
    'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait',
    'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
    'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar',
    'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
    'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco',
    'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal',
    'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea',
    'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territories', 'Panama',
    'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
    'Saint Vincent and the Grenadines', 'Samoa ', 'San Marino', 'Sao Tome and Principe',
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
    'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
    'South Korea', 'South Sudan', 'Spain ', 'Sri Lanka', 'Sudan', 'Suriname',
    'Swaziland ', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania',
    'Thailand ', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
    'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
    'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan',
    'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe '
  ];

  if (isRtl) {
    $('#typeahead-input').attr('dir', 'rtl');
  }

  $('#typeahead-input').typeahead({
    hint: !isRtl,
    highlight: true,
    minLength: 1
  },
  {
    name: 'countries',
    source: substringMatcher(countries)
  });
});
$(function() {
  // Initialize Select2 select box
  $('select[name="validation-select2"]').select2({
    allowClear:  true,
    placeholder: 'Select a framework...',
  }).change(function() {
    $(this).valid();
  });

  // Initialize Select2 multiselect box
  $('select[name="validation-select2-multi"]').select2({
    placeholder: 'Select gear...',
  }).change(function() {
    $(this).valid();
  });

  // Trigger validation on tagsinput change
  $('input[name="validation-bs-tagsinput"]').on('itemAdded itemRemoved', function() {
    $(this).valid();
  });

  // Add phone validator
  $.validator.addMethod(
    'phone_format',
    function(value, element) {
      return this.optional(element) || /^\(\d{3}\)[ ]\d{3}\-\d{4}$/.test(value);
    },
    'Invalid phone number.'
  );

  // Initialize validation
  $('#validation-form').validate({
    ignore: '.ignore, .select2-input',
    focusInvalid: false,
    rules: {
      'validation-email': {
        required: true,
        email: true
      },
      'validation-password': {
        required: true,
        minlength: 6,
        maxlength: 20
      },
      'validation-password-confirmation': {
        required: true,
        minlength: 6,
        equalTo: 'input[name="validation-password"]'
      },
      'validation-required': {
        required: true
      },
      'validation-url': {
        required: true,
        url: true
      },
      'validation-phone': {
        required: true,
        phone_format: true
      },
      'validation-select': {
        required: true
      },
      'validation-multiselect': {
        required: true,
        minlength: 2
      },
      'validation-select2': {
        required: true
      },
      'validation-select2-multi': {
        required: true,
        minlength: 2
      },
      'validation-bs-tagsinput': {
        required: true
      },
      'validation-text': {
        required: true
      },
      'validation-file': {
        required: true
      },
      'validation-switcher': {
        required: true
      },
      'validation-radios': {
        required: true
      },
      'validation-radios-custom': {
        required: true
      },
      'validation-checkbox': {
        required: true
      },
      'validation-checkbox-custom': {
        required: true
      },

      // Checkbox groups
      //

      'validation-checkbox-group-1': {
        require_from_group: [1, 'input[name="validation-checkbox-group-1"], input[name="validation-checkbox-group-2"]']
      },
      'validation-checkbox-group-2': {
        require_from_group: [1, 'input[name="validation-checkbox-group-1"], input[name="validation-checkbox-group-2"]']
      },

      'validation-checkbox-custom-group-1': {
        require_from_group: [1, 'input[name="validation-checkbox-custom-group-1"], input[name="validation-checkbox-custom-group-2"]']
      },
      'validation-checkbox-custom-group-2': {
        require_from_group: [1, 'input[name="validation-checkbox-custom-group-1"], input[name="validation-checkbox-custom-group-2"]']
      }
    },

    // Errors
    //

    errorPlacement: function errorPlacement(error, element) {
      var $parent = $(element).parents('.form-group');

      // Do not duplicate errors
      if ($parent.find('.jquery-validation-error').length) { return; }

      $parent.append(
        error.addClass('jquery-validation-error small form-text invalid-feedback')
      );
    },
    highlight: function(element) {
      var $el = $(element);
      var $parent = $el.parents('.form-group');

      $el.addClass('is-invalid');

      // Select2 and Tagsinput
      if ($el.hasClass('select2-hidden-accessible') || $el.attr('data-role') === 'tagsinput') {
        $el.parent().addClass('is-invalid');
      }
    },
    unhighlight: function(element) {
      $(element).parents('.form-group').find('.is-invalid').removeClass('is-invalid');
    }
  });

});
$(function() {
  $('.smartwizard-example').smartWizard({
    autoAdjustHeight: false,
    backButtonSupport: false,
    useURLhash: false,
    showStepURLhash: false
  });

  // Change markup for vertical wizards
  //

  $('#smartwizard-4 .sw-toolbar').appendTo($('#smartwizard-4 .sw-container'));
  $('#smartwizard-5 .sw-toolbar').appendTo($('#smartwizard-5 .sw-container'));
});

// With validation
$(function() {
  var $form = $('#smartwizard-6');
  var $btnFinish = $('<button class="btn-finish btn btn-primary hidden mr-2" type="button">Finish</button>');

  // Set up validator
  $form.validate({
    errorPlacement: function errorPlacement(error, element) {
      $(element).parents('.form-group').append(
        error.addClass('invalid-feedback small d-block')
      )
    },
    highlight: function(element) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function(element) {
      $(element).removeClass('is-invalid');
    },
    rules: {
      'wizard-confirm': {
        equalTo: 'input[name="wizard-password"]'
      }
    }
  });

  // Initialize wizard
  $form
    .smartWizard({
      autoAdjustHeight: false,
      backButtonSupport: false,
      useURLhash: false,
      showStepURLhash: false,
      toolbarSettings: {
        toolbarExtraButtons: [$btnFinish]
      }
    })
    .on('leaveStep', function(e, anchorObject, stepNumber, stepDirection) {
      // stepDirection === 'forward' :- this condition allows to do the form validation
      // only on forward navigation, that makes easy navigation on backwards still do the validation when going next
      if (stepDirection === 'forward'){ return $form.valid(); }
      return true;
    })
    .on('showStep', function(e, anchorObject, stepNumber, stepDirection) {
      var $btn = $form.find('.btn-finish');

      // Enable finish button only on last step
      if (stepNumber === 3) {
        $btn.removeClass('hidden');
      } else {
        $btn.addClass('hidden');
      }
    });

  // Click on finish button
  $form.find('.btn-finish').on('click', function(){
    if (!$form.valid()){ return; }

    // Submit form
    alert("Great! We're ready to submit form.");
    return false;
  });
});
// isSmallScreen

$('#helpers-isSmallScreen').click(function() {
  alert(window.layoutHelpers.isSmallScreen());
});

// isLayout1

$('#helpers-isLayout1').click(function() {
  alert(window.layoutHelpers.isLayout1());
});

// isCollapsed

$('#helpers-isCollapsed').click(function() {
  alert(window.layoutHelpers.isCollapsed());
});

// isFixed

$('#helpers-isFixed').click(function() {
  alert(window.layoutHelpers.isFixed());
});

// isOffcanvas

$('#helpers-isOffcanvas').click(function() {
  alert(window.layoutHelpers.isOffcanvas());
});

// isNavbarFixed

$('#helpers-isNavbarFixed').click(function() {
  alert(window.layoutHelpers.isNavbarFixed());
});

// isFooterFixed

$('#helpers-isFooterFixed').click(function() {
  alert(window.layoutHelpers.isFooterFixed());
});

// isReversed

$('#helpers-isReversed').click(function() {
  alert(window.layoutHelpers.isReversed());
});

// setCollapsed

$('#helpers-setCollapsed-false-true').click(function() {
  window.layoutHelpers.setCollapsed(false, true);
});
$('#helpers-setCollapsed-true-true').click(function() {
  window.layoutHelpers.setCollapsed(true, true);
});
$('#helpers-setCollapsed-false-false').click(function() {
  window.layoutHelpers.setCollapsed(false, false);
});
$('#helpers-setCollapsed-true-false').click(function() {
  window.layoutHelpers.setCollapsed(true, false);
});

// toggleCollapsed

$('#helpers-toggleCollapsed-true').click(function() {
  window.layoutHelpers.toggleCollapsed(true);
});
$('#helpers-toggleCollapsed-false').click(function() {
  window.layoutHelpers.toggleCollapsed(false);
});

// setPosition

$('#helpers-setPosition-collapse').click(function() {
  window.layoutHelpers.setCollapsed(true, false);
});
$('#helpers-setPosition-false-false').click(function() {
  window.layoutHelpers.setPosition(false, false);
});
$('#helpers-setPosition-true-false').click(function() {
  window.layoutHelpers.setPosition(true, false);
});
$('#helpers-setPosition-false-true').click(function() {
  window.layoutHelpers.setPosition(false, true);
});
$('#helpers-setPosition-true-true').click(function() {
  window.layoutHelpers.setPosition(true, true);
});

// setNavbarFixed

$('#helpers-setNavbarFixed-reset').click(function() {
  window.layoutHelpers.setPosition(false, false);
});
$('#helpers-setNavbarFixed-true').click(function() {
  window.layoutHelpers.setNavbarFixed(true);
});
$('#helpers-setNavbarFixed-false').click(function() {
  window.layoutHelpers.setNavbarFixed(false);
});

// setFooterFixed

$('#helpers-setFooterFixed-true').click(function() {
  window.layoutHelpers.setFooterFixed(true);
});
$('#helpers-setFooterFixed-false').click(function() {
  window.layoutHelpers.setFooterFixed(false);
});

// setReversed

$('#helpers-setReversed-true').click(function() {
  window.layoutHelpers.setReversed(true);
});
$('#helpers-setReversed-false').click(function() {
  window.layoutHelpers.setReversed(false);
});
(function(win, doc, $) {
  var themeSettings = win.themeSettings;
  var layoutHelpers = win.layoutHelpers;
  var attachMaterialRipple = win.attachMaterialRipple;
  var detachMaterialRipple = win.detachMaterialRipple;

  var firstLoad = true;
  var sidenav = null;

  doc.addEventListener('turbolinks:render', function(e) {
    // Remove unwanted merged stylesheets on each render
    if (themeSettings) {
      $('.theme-settings-bootstrap-css').slice(1).remove();
      $('.theme-settings-appwork-css').slice(1).remove();
      $('.theme-settings-theme-css').slice(1).remove();
      $('.theme-settings-colors-css').slice(1).remove();
    }

    // Setup theme settings element
    if (!firstLoad && themeSettings) {
      $('.layout-wrapper', e.data.newBody).addClass('layout-sidenav-link-no-transition');
      themeSettings.updateNavbarBg(e.data.newBody);
      themeSettings.updateSidenavBg(e.data.newBody);
      themeSettings._setup(e.data.newBody);
      setTimeout(function() {
        $('.layout-wrapper', e.data.newBody).removeClass('layout-sidenav-link-no-transition');
      }, 50);
    }
  });

  doc.addEventListener('turbolinks:load', function() {
    if (layoutHelpers) {
      // Update layout
      layoutHelpers.update();

      // Auto update layout
      layoutHelpers.setAutoUpdate(true);

      // Hide sidenav on small screens after page load
      if (layoutHelpers.isSmallScreen()) {
        layoutHelpers.setCollapsed(true, true);
      }
    }

    // Attach material ripple
    if (!firstLoad && attachMaterialRipple && doc.documentElement.classList.contains('material-style')) {
      attachMaterialRipple();
    }

    // Initialize sidenav
    $('#layout-sidenav').each(function() {
      sidenav = new win.SideNav(this, {
        orientation: $(this).hasClass('sidenav-horizontal') ? 'horizontal' : 'vertical'
      });
    });

    // Initialize sidenav togglers
    $('body').on('click', '.layout-sidenav-toggle', function(e) {
      e.preventDefault();
      layoutHelpers.toggleCollapsed();
    });

    // Swap dropdown menus in RTL mode
    if ($('html').attr('dir') === 'rtl') {
      $('#layout-navbar .dropdown-menu').toggleClass('dropdown-menu-right');
    }
  });

  doc.addEventListener('turbolinks:visit', function() {
    firstLoad = false;

    // Clean up layoutHelpers
    if (layoutHelpers) {
      layoutHelpers.destroy();
    }

    // Clean up material ripple
    if (detachMaterialRipple) {
      detachMaterialRipple();
    }

    // Destroy sidenav
    if (sidenav) {
      sidenav.destroy();
    }

    // Remove sidenav toggler listeners
    $('body').off('click', '.layout-sidenav-toggle');
  });
})(window, document, jQuery);
$(function() {
  $('#block-ui-block-page').click(function() {
    $.blockUI({
      message: '<div class="sk-folding-cube sk-primary"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div><h5 style="color: #444">LOADING...</h5>',
      css: {
        backgroundColor: 'transparent',
        border: '0',
        zIndex: 9999999
      },
      overlayCSS:  {
        backgroundColor: '#fff',
        opacity: 0.8,
        zIndex: 9999990
      }
    });

    setTimeout(function() {
      $.unblockUI();
    }, 5000);
  });

  $('#block-ui-block-element').click(function() {
    $('#block-ui-element-example').block({
      message: '<div class="sk-wave sk-primary"><div class="sk-rect sk-rect1"></div> <div class="sk-rect sk-rect2"></div> <div class="sk-rect sk-rect3"></div> <div class="sk-rect sk-rect4"></div> <div class="sk-rect sk-rect5"></div></div>',
      css: {
        backgroundColor: 'transparent',
        border: '0'
      },
      overlayCSS:  {
        backgroundColor: '#fff',
        opacity: 0.8
      }
    });
  });

  $('#block-ui-unblock-element').click(function() {
    $('#block-ui-element-example').unblock();
  });
});
$(function() {
  if (Clipboard.isSupported()) {
    new Clipboard('.clipboard-example-btn');
  } else {
    $('.clipboard-example-btn').prop('disabled', true);
  }
});
// Idle on document
//

$(function() {
  var docTimeout = 5000;

  // Handle raised idle/active events
  $(document).on("idle.idleTimer", function(event, elem, obj) {
    $("#idletimer-doc-Status")
      .val(function(i, v) {
        return v + "Idle @ " + moment().format() + " \n";
      })
      .removeClass("alert-success")
      .addClass("alert-warning");
  });
  $(document).on("active.idleTimer", function(event, elem, obj, e) {
    $('#idletimer-doc-Status')
      .val(function(i, v) {
        return v + "Active [" + e.type + "] [" + e.target.nodeName + "] @ " + moment().format() + " \n";
      })
      .addClass("alert-success")
      .removeClass("alert-warning");
  });

  // Handle button events
  $("#idletimer-doc-Pause").click(function() {
    $(document).idleTimer("pause");
    $('#idletimer-doc-Status')
      .val(function(i, v) {
        return v + "Paused @ " + moment().format() + " \n";
      });
    $(this).blur();
    return false;
  });
  $("#idletimer-doc-Resume").click(function() {
    $(document).idleTimer("resume");
    $('#idletimer-doc-Status')
      .val(function(i, v) {
        return v + "Resumed @ " + moment().format() + " \n";
      });
    $(this).blur();
    return false;
  });
  $("#idletimer-doc-Elapsed").click(function() {
    $('#idletimer-doc-Status')
      .val(function(i, v) {
        return v + "Elapsed (since becoming active): " + $(document).idleTimer("getElapsedTime") + " \n";
      });
    $(this).blur();
    return false;
  });
  $("#idletimer-doc-Destroy").click(function() {
    $(document).idleTimer("destroy");
    $('#idletimer-doc-Status')
      .val(function(i, v) {
        return v + "Destroyed: @ " + moment().format() + " \n";
      })
      .removeClass("alert-success")
      .removeClass("alert-warning");
    $(this).blur();
    return false;
  });
  $("#idletimer-doc-Init").click(function() {
    // for demo purposes show init with just object
    $(document).idleTimer({ timeout: docTimeout });
    $('#idletimer-doc-Status')
      .val(function(i, v) {
        return v + "Init: @ " + moment().format() + " \n";
      });

    //Apply classes for default state
    if ($(document).idleTimer("isIdle")) {
      $('#idletimer-doc-Status')
        .removeClass("alert-success")
        .addClass("alert-warning");
    } else {
      $('#idletimer-doc-Status')
        .addClass("alert-success")
        .removeClass("alert-warning");
    }
    $(this).blur();
    return false;
  });

  //Clear old statuses
  $('#idletimer-doc-Status').val('');

  //Start timeout, passing no options
  //Same as $.idleTimer(docTimeout, docOptions);
  $(document).idleTimer(docTimeout);

  //For demo purposes, style based on initial state
  if ($(document).idleTimer("isIdle")) {
    $("#idletimer-doc-Status")
    .val(function(i, v) {
      return v + "Initial Idle State @ " + moment().format() + " \n";
    })
    .removeClass("alert-success")
    .addClass("alert-warning");
  } else {
    $('#idletimer-doc-Status')
      .val(function(i, v) {
        return v + "Initial Active State @ " + moment().format() + " \n";
      })
      .addClass("alert-success")
      .removeClass("alert-warning");
  }
});

// Idle on element
//

$(function() {
  var elTimeout = 3000;

  // Handle raised idle/active events
  $('#idletimer-el-Status').on("idle.idleTimer", function(event, elem, obj) {
    //If you dont stop propagation it will bubble up to document event handler
    event.stopPropagation();

    $('#idletimer-el-Status')
      .val(function(i, v) {
        return v + "Idle @ " + moment().format() + " \n";
      })
      .removeClass("alert-success")
      .addClass("alert-warning");

  });
  $('#idletimer-el-Status').on("active.idleTimer", function(event) {
    //If you dont stop propagation it will bubble up to document event handler
    event.stopPropagation();

    $('#idletimer-el-Status')
      .val(function(i, v) {
        return v + "Active @ " + moment().format() + " \n";
      })
      .addClass("alert-success")
      .removeClass("alert-warning");
  });

  // Handle button events
  $("#idletimer-el-Reset").click(function() {
    $('#idletimer-el-Status')
      .idleTimer("reset")
      .val(function(i, v) {
        return v + "Reset @ " + moment().format() + " \n";
      });

    //Apply classes for default state
    if ($("#idletimer-el-Status").idleTimer("isIdle")) {
      $('#idletimer-el-Status')
        .removeClass("alert-success")
        .addClass("alert-warning");
    } else {
      $('#idletimer-el-Status')
        .addClass("alert-success")
        .removeClass("alert-warning");
    }
    $(this).blur();
    return false;
  });
  $("#idletimer-el-Remaining").click(function() {
    $('#idletimer-el-Status')
      .val(function(i, v) {
        return v + "Remaining: " + $("#idletimer-el-Status").idleTimer("getRemainingTime") + " \n";
      });
    $(this).blur();
    return false;
  });
  $("#idletimer-el-LastActive").click(function() {
    $('#idletimer-el-Status')
      .val(function(i, v) {
        return v + "LastActive: " + $("#idletimer-el-Status").idleTimer("getLastActiveTime") + " \n";
      });
    $(this).blur();
    return false;
  });
  $("#idletimer-el-State").click(function() {
    $('#idletimer-el-Status')
      .val(function(i, v) {
        return v + "State: " + ($("#idletimer-el-Status").idleTimer("isIdle")? "idle":"active") + " \n";
      });
    $(this).blur();
    return false;
  });

  //Clear value if there was one cached & start time
  $('#idletimer-el-Status').val('').idleTimer(elTimeout);

  //For demo purposes, show initial state
  if ($("#idletimer-el-Status").idleTimer("isIdle")) {
    $("#idletimer-el-Status")
      .val(function(i, v) {
        return v + "Initial Idle @ " + moment().format() + " \n";
      })
      .removeClass("alert-success")
      .addClass("alert-warning");
  } else {
    $('#idletimer-el-Status')
      .val(function(i, v) {
        return v + "Initial Active @ " + moment().format() + " \n";
      })
      .addClass("alert-success")
      .removeClass("alert-warning");
  }
});
$(function() {
  // Bind normal buttons
  Ladda.bind( '.button-demo button', { timeout: 2000 } );

  // Bind progress buttons and simulate loading progress
  Ladda.bind( '.progress-demo button', {
    callback: function( instance ) {
      var progress = 0;
      var interval = setInterval( function() {
        progress = Math.min( progress + Math.random() * 0.1, 1 );
        instance.setProgress( progress );

        if( progress === 1 ) {
          instance.stop();
          clearInterval( interval );
        }
      }, 200 );
    }
  } );
});
$(function() {
  $('.masonry-grid').masonry({
    itemSelector: '.masonry-grid-item',
    columnWidth: 160,
    originLeft: !($('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl')
  });
});
$(function() {
  $('#numeral-example-1').html(numeral(1000.1234).format('0,0'));
  $('#numeral-example-2').html(numeral(1000.1234).format('0,0.00'));
  $('#numeral-example-3').html(numeral(1000.1234).format('+0,0'));
  $('#numeral-example-4').html(numeral(1000.1234).format('.00'));
  $('#numeral-example-5').html(numeral(1000.1234).format('$0,0.00'));
});
$(function() {
  new PerfectScrollbar(document.getElementById('perfect-scrollbar-example-1'));
  new PerfectScrollbar(document.getElementById('perfect-scrollbar-example-2'));
  new PerfectScrollbar(document.getElementById('perfect-scrollbar-example-3'));
});
$(function() {
  $('#vegas-example').vegas({
    slides: [
      { src: "/img/bg/1.jpg" },
      { src: "/img/bg/2.jpg" },
      { src: "/img/bg/3.jpg" },
      { src: "/img/bg/4.jpg" },
      { src: "/img/bg/5.jpg" }
    ],
    transition: [ 'fade', 'zoomOut', 'zoomIn', 'blur' ],
    animation: [ 'kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight' ]
  });

  // Progess color
  $('#vegas-example .vegas-timer-progress').css('background', 'rgba(0,0,0,.2)');

  // Overlays
  $('#vegas-dark-overlay-example, #vegas-light-overlay-example').vegas({
    overlay: true,
    timer: false,
    shuffle: true,
    slides: [
      { src: "/img/bg/1.jpg" },
      { src: "/img/bg/2.jpg" },
      { src: "/img/bg/3.jpg" },
      { src: "/img/bg/4.jpg" },
      { src: "/img/bg/5.jpg" }
    ],
    transition: [ 'fade', 'blur' ],
  });

  // Fixed bg
  $('#vegas-fixed-bg-example').vegas({
    overlay: false,
    timer: false,
    shuffle: true,
    slides: [
      { src: "/img/bg/1.jpg" },
      { src: "/img/bg/2.jpg" },
      { src: "/img/bg/3.jpg" },
      { src: "/img/bg/4.jpg" },
      { src: "/img/bg/5.jpg" }
    ],
    transition: [ 'fade', 'blur' ],
  });
});
$(function() {

  $('.account-settings-multiselect').each(function() {
    $(this)
      .wrap('<div class="position-relative"></div>')
      .select2({
        dropdownParent: $(this).parent()
      });
  });

  $('.account-settings-tagsinput').tagsinput({ tagClass: 'badge badge-default' });

});
$(function() {

  $('.article-edit-tagsinput').tagsinput({ tagClass: 'badge badge-default' });

  if (!window.Quill) {
    $('#article-editor,#article-editor-toolbar').remove();
    $('#article-editor-fallback').removeClass('d-none');
  } else {
    $('#article-editor-fallback').remove();
    new Quill('#article-editor', {
      modules: {
        toolbar: '#article-editor-toolbar'
      },
      theme: 'snow'
    });
  }

});
$(function() {

  var statuses = {
    1: ['Published', 'success'],
    2: ['Draft', 'info'],
    3: ['Deleted', 'default']
  };

  $('#article-list').dataTable({
    ajax: '/json/pages_articles_list.json',
    columnDefs: [ {
      targets: [6],
      orderable: false,
      searchable: false
    }],
    createdRow: function (row, data, index) {

      // *********************************************************************
      // Article link

      $('td', row).eq(1).html('').append(
        '<a href="javascript:void(0)">' + data[1] + '</a>'
      );

      // *********************************************************************
      // Status

      $('td', row).eq(5).html('').append(
        '<span class="badge badge-outline-' + statuses[data[5]][1] + '">' + statuses[data[5]][0] + '</span>'
      );

      // *********************************************************************
      // Actions

      $('td', row).eq(6).addClass('text-center text-nowrap').html('').append(
        '<button type="button" class="btn btn-default btn-xs icon-btn md-btn-flat article-tooltip" title="Edit"><i class="ion ion-md-create"></i></button>&nbsp;&nbsp;' +
        '<button type="button" class="btn btn-default btn-xs icon-btn md-btn-flat article-tooltip" title="Remove"><i class="ion ion-md-close"></i></button>'
      );

    }
  });

  // Tooltips

  $('body').tooltip({
    selector: '.article-tooltip'
  });

});
$(function() {

  $('.chat-scroll').each(function() {
    new PerfectScrollbar(this, {
      suppressScrollX: true,
      wheelPropagation: true
    });
  });

  $('.chat-sidebox-toggler').click(function(e) {
    e.preventDefault();
    $('.chat-wrapper').toggleClass('chat-sidebox-open');
  });

});
$(function() {

  function openSidenav() {
    $('.clients-wrapper').addClass('clients-sidebox-open');
  }

  function closeSidenav() {
    $('.clients-wrapper').removeClass('clients-sidebox-open');
    $('.clients-table tr.bg-light').removeClass('bg-light');
  }

  function selectClient(row) {
    openSidenav();
    $('.clients-table tr.bg-light').removeClass('bg-light');
    $(row).addClass('bg-light');
  }

  $('body').on('click', '.clients-table tr', function() {
    // Load client data here
    // ...

    // Select client
    selectClient(this);
  });

  $('body').on('click', '.clients-sidebox-close', function(e) {
    e.preventDefault();
    closeSidenav();
  });

  // Setup scrollbars

  $('.clients-scroll').each(function() {
    new PerfectScrollbar(this, {
      suppressScrollX: true,
      wheelPropagation: true
    });
  });

});
$(function() {

  var $container = $('.contacts-row-view, .contacts-col-view');

  // Initial setup
  $container
    .removeClass('contacts-row-view contacts-col-view')
    .addClass($('[name="contacts-view"]').val());

  $('[name="contacts-view"]').on('change', function() {
    $container
      .removeClass('contacts-row-view contacts-col-view')
      .addClass(this.value);
  });

  if ($('html').attr('dir') === 'rtl') {
    $('.contacts-dropdown-menu').removeClass('dropdown-menu-right');
  }

});
$(function() {

  var isRtl = $('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl';

  var statuses = {
    1: ['Shipped', 'success'],
    2: ['Pending', 'warning'],
    3: ['Sent', 'info'],
    4: ['Cancelled', 'danger']
  };

  $('#order-list').dataTable({
    ajax: '/json/pages_e-commerce_order-list.json',
    order: [[ 0, 'desc' ]],
    columnDefs: [ {
      targets: [5],
      orderable: false,
      searchable: false
    }],
    createdRow: function (row, data, index) {
      // Add extra padding and set minimum width
      $('td', row).addClass('align-middle');

      // *********************************************************************
      // Amount

      $('td', row).eq(2).html('').append(
        numeral(data[2]).format('$0,0.00')
      );

      // *********************************************************************
      // Status

      $('td', row).eq(4).html('').append(
        '<span class="badge badge-outline-' + statuses[data[4]][1] + '">' + statuses[data[4]][0] + '</span>'
      );

      // *********************************************************************
      // Actions

      $('td', row).eq(5).addClass('text-nowrap').html('').append(
        '<a href="javascript:void(0)" class="btn btn-default btn-xs icon-btn btn-md-flat order-tooltip" title="Show"><i class="ion ion-md-eye"></i></a>&nbsp;' +
        '<a href="javascript:void(0)" class="btn btn-default btn-xs icon-btn btn-md-flat order-tooltip" title="Edit"><i class="ion ion-md-create"></i></a>'
      );

    }
  });

  // Tooltips

  $('body').tooltip({
    selector: '.order-tooltip'
  });

});
$(function() {

  $('.product-edit-multiselect').each(function() {
    $(this)
      .wrap('<div class="position-relative"></div>')
      .select2({
        dropdownParent: $(this).parent()
      });
  });

  if (!window.Quill) {
    $('#product-editor,#product-editor-toolbar').remove();
    $('#product-editor-fallback').removeClass('d-none');
  } else {
    $('#product-editor-fallback').remove();
    new Quill('#product-editor', {
      modules: {
        toolbar: '#product-editor-toolbar'
      },
      theme: 'snow'
    });
  }

  $('.product-discount-period').daterangepicker({
      opens: ($('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl') ? 'right' : 'left',
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
  });

  $('.product-discount-period').on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
  });

  $('.product-discount-period').on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
  });

  dragula([document.getElementById('product-images')], {
    moves: function (el, container, handle) {
      return handle.classList.contains('product-image-move');
    }
  });

});
$(function() {

  $('#product-item-images').on('click', 'a', function(e) {
    e.preventDefault();

    // Select only visible thumbnails
    var links = $('#product-item-images').find('a');

    window.blueimpGallery(links, {
      container: '#product-item-lightbox',
      carousel: true,
      hidePageScrollbars: true,
      disableScroll: true,
      index: this
    });
  });

});
$(function() {

  var isRtl = $('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl';

  var statuses = {
    1: ['Published', 'success'],
    2: ['Out of stock', 'danger'],
    3: ['Pending', 'info']
  };

  $('#product-list').dataTable({
    ajax: '/json/pages_e-commerce_product-list.json',
    "columns": [
      { "data": "1" },
      { "data": "2" },
      { "data": "3" },
      { "data": "4" },
      { "data": "5" },
      { "data": "6" },
      { "data": "7" },
      { "data": "8" }
    ],
    order: [[ 1, 'desc' ]],
    columnDefs: [ {
      targets: [7],
      orderable: false,
      searchable: false
    }],
    createdRow: function (row, data, index) {
      // Add extra padding and set minimum width
      $('td', row).addClass('py-2 align-middle').eq(0).css('min-width', '300px');

      // *********************************************************************
      // Product name

      $('td', row).eq(0).html('').append(
        '<div class="media align-items-center">' +
          '<img class="ui-w-40 d-block" src="/img/uikit/' + data[0] + '" alt="">' +
          '<a href="javascript:void(0)" class="media-body d-block text-dark ml-3">' + data[1] + '</a>' +
        '</div>'
      );

      // *********************************************************************
      // Price

      $('td', row).eq(3).html('').append(
        numeral(data[4]).format('$0,0.00')
      );

      // *********************************************************************
      // Views

      $('td', row).eq(5).html('').append(
        numeral(data[6]).format('0,0')
      );

      // *********************************************************************
      // Status

      $('td', row).eq(6).html('').append(
        '<span class="badge badge-outline-' + statuses[data[7]][1] + '">' + statuses[data[7]][0] + '</span>'
      );

      // *********************************************************************
      // Actions

      $('td', row).eq(7).addClass('text-nowrap').html('').append(
        '<a href="javascript:void(0)" class="btn btn-default btn-xs icon-btn md-btn-flat product-tooltip" title="Show"><i class="ion ion-md-eye"></i></a>&nbsp;' +
        '<a href="javascript:void(0)" class="btn btn-default btn-xs icon-btn md-btn-flat product-tooltip" title="Edit"><i class="ion ion-md-create"></i></a>'
      );

    }
  });

  // Filters

  noUiSlider
    .create(document.getElementById('product-sales-slider'), {
      start: [ 10, 834 ],
      step: 10,
      connect: true,
      tooltips: true,
      direction: isRtl ? 'rtl' : 'ltr',
      range: {
        'min': [  10 ],
        'max': [ 834 ]
      },
      format: {
    	  to: function (value) {
    		  return Math.round(value);
    	  },
    	  from: function (value) {
    		  return value;
    	  }
    	}
    })
    .on('update', function(values) {
      document.getElementById('product-sales-slider-value').innerHTML = values.join(' - ')
    });

  noUiSlider
    .create(document.getElementById('product-price-slider'), {
      start: [ 10, 2000 ],
      step: 50,
      connect: true,
      tooltips: true,
      direction: isRtl ? 'rtl' : 'ltr',
      range: {
        'min': [ 10 ],
        'max': [ 2000 ]
      },
      format: {
    	  to: function (value) {
          return numeral(value).format('$0,0');
    	  },
    	  from: function (value) {
          return value.replace(/[\$\,]/g, '');
    	  }
    	}
    })
    .on('update', function(values) {
      document.getElementById('product-price-slider-value').innerHTML = values.join(' - ')
    });

  // Tooltips

  $('body').tooltip({
    selector: '.product-tooltip'
  });

});
$(function() {

  // Checkboxes

  $('.file-manager-container').on('change', '.file-item-checkbox input', function() {
    $(this).parents('.file-item')[this.checked ? 'addClass': 'removeClass']('selected border-primary');
  });

  // Focus

  $('.file-manager-container').on('focusin', '.file-item', function() {
    $(this).addClass('focused');
  });

  $('.file-manager-container').on('focusout', '.file-item', function() {
    if ($('.file-item-actions.show').length) return;
    $(this).removeClass('focused');
  });

  $('.file-manager-container').on('hide.bs.dropdown', '.file-item-actions', function() {
    if ($(this).parents('.file-item').find(':focus').length) return;
    $(this).parents('.file-item').removeClass('focused');
  });

  // Change view

  $('[name="file-manager-view"]').on('change', function() {
    $('.file-manager-container')
      .removeClass('file-manager-col-view file-manager-row-view')
      .addClass(this.value);
  });

  // RTL

  if ($('html').attr('dir') === 'rtl') {
    $('.file-manager-actions .dropdown-menu').addClass('dropdown-menu-right');
    $('.file-item-actions .dropdown-menu').removeClass('dropdown-menu-right');
  }

});
$(function() {

  $('#gallery-thumbnails').on('click', '.gallery-thumbnail > .img-thumbnail', function(e) {
    e.preventDefault();

    // Select only visible thumbnails
    var links = $('#gallery-thumbnails').find('.gallery-thumbnail:not(.d-none) > .img-thumbnail');

    window.blueimpGallery(links, {
      container: '#gallery-lightbox',
      carousel: true,
      hidePageScrollbars: true,
      disableScroll: true,
      index: this
    });
  });

  var msnry = new Masonry('#gallery-thumbnails', {
    itemSelector: '.gallery-thumbnail:not(.d-none)',
    columnWidth: '.gallery-sizer',
    originLeft: !($('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl')
  });

  $('#gallery-filter').on('click', '.nav-link', function(e) {
    e.preventDefault();

    // Set active filter
    $('#gallery-filter .nav-link').removeClass('active');
    $(this).addClass('active');

    // Show all
    if (this.getAttribute('href') === '#all') {
      $('#gallery-thumbnails .gallery-thumbnail').removeClass('d-none');

    // Show thumbnails only with selected tag
    } else {
      $('#gallery-thumbnails .gallery-thumbnail:not([data-tag="' + this.getAttribute('href').replace('#', '') + '"])').addClass('d-none');
      $('#gallery-thumbnails .gallery-thumbnail[data-tag="' + this.getAttribute('href').replace('#', '') + '"]').removeClass('d-none');
    }

    // Relayout
    msnry.layout();
  });

});
$(function() {

  // Drag&Drop

  dragula(
    Array.prototype.slice.call(document.querySelectorAll('.kanban-box'))
  );

  // RTL

  if ($('html').attr('dir') === 'rtl') {
    $('.kanban-board-actions .dropdown-menu').removeClass('dropdown-menu-right');
  }

});
$(function() {

  // Collapse sidenav by default
  window.layoutHelpers.setCollapsed(true, false);

  // Enable tooltips
  $('.messages-tooltip').tooltip();

  $('.messages-scroll').each(function() {
    new PerfectScrollbar(this, {
      suppressScrollX: true,
      wheelPropagation: true
    });
  });

  $('.messages-sidebox-toggler').click(function(e) {
    e.preventDefault();
    $('.messages-wrapper, .messages-card').toggleClass('messages-sidebox-open');
  });

  // New message
  // {

    if (!window.Quill) {
      $('#message-editor,#message-editor-toolbar').remove();
      $('#message-editor-fallback').removeClass('d-none');
    } else {
      $('#message-editor-fallback').remove();
      new Quill('#message-editor', {
        modules: {
          toolbar: '#message-editor-toolbar'
        },
        placeholder: 'Type your message...',
        theme: 'snow'
      });
    }

  // }

});
$(function() {

  // Drag&Drop

  dragula(Array.prototype.slice.call(document.querySelectorAll('.project-task-list')), {
    moves: function (el, container, handle) {
      return handle.classList.contains('project-task-handle');
    }
  });

  // RTL

  if ($('html').attr('dir') === 'rtl') {
    $('.project-task-actions .dropdown-menu, .project-priority .dropdown-menu').removeClass('dropdown-menu-right');
  }

});
$(function() {

  // RTL

  if ($('html').attr('dir') === 'rtl') {
    $('.project-actions .dropdown-menu').removeClass('dropdown-menu-right');
  }

});
$(function() {

  // Drag&Drop

  dragula(Array.prototype.slice.call(document.querySelectorAll('.task-list')), {
    moves: function (el, container, handle) {
      return handle.classList.contains('task-list-handle');
    }
  });

  // RTL

  if ($('html').attr('dir') === 'rtl') {
    $('.task-list-actions .dropdown-menu').removeClass('dropdown-menu-right');
  }

});
$(function() {

  // RTL

  if ($('html').attr('dir') === 'rtl') {
    $('.team-actions .dropdown-menu').removeClass('dropdown-menu-right');
  }

});
$(function() {

  $('.ticket-assignee').tooltip();

  $('#ticket-tags').tagsinput({ tagClass: 'badge badge-primary' });

  $('#ticket-upload-dropzone').dropzone({
    parallelUploads: 2,
    maxFilesize:     50000,
    filesizeBase:    1000,
    addRemoveLinks:  true
  });

});
$(function() {

  $('#tickets-list').dataTable({
    ajax: '/json/pages_tickets_list.json',
    columnDefs: [ {
      targets: [6],
      orderable: false,
      searchable: false
    }],
    createdRow: function (row, data, index) {
      // Add extra padding and set minimum width
      $('td', row).addClass('py-3').eq(1).css('min-width', '300px');

      // *********************************************************************
      // Setup priorities

      var priorityColors = { 1: 'btn-danger', 2: 'btn-success', 3: 'btn-warning' };

      // Priority dropdown
      var priorityDropdown = $(
        '<div class="ticket-priority btn-group">' +
          '<button type="button" class="btn btn-xs md-btn-flat dropdown-toggle" data-toggle="dropdown"></button>' +
          '<div class="dropdown-menu">' +
            '<a class="dropdown-item" href="javascript:void(0)" data-priority="1">High</a>' +
            '<a class="dropdown-item" href="javascript:void(0)" data-priority="2">Medium</a>' +
            '<a class="dropdown-item" href="javascript:void(0)" data-priority="3">Low</a>' +
          '</div>' +
        '</div>'
      );

      // Set up active priority
      priorityDropdown
        .find('.dropdown-toggle')
        .addClass(priorityColors[data[4]])
        .text(
          priorityDropdown.find('[data-priority="' + data[4] + '"]')
            .addClass('active')
            .text()
        );

      // Append dropdown
      $('td', row).eq(4).html('').append(priorityDropdown);


      // *********************************************************************
      // Setup statuses

      // Status dropdown
      var statusDropdown = $(
        '<div class="ticket-status btn-group">' +
          '<button type="button" class="btn btn-outline-secondary btn-xs md-btn-flat dropdown-toggle" data-toggle="dropdown"></button>' +
          '<div class="dropdown-menu">' +
            '<a class="dropdown-item" href="javascript:void(0)" data-status="1">Open</a>' +
            '<a class="dropdown-item" href="javascript:void(0)" data-status="2">Reopened</a>' +
            '<a class="dropdown-item" href="javascript:void(0)" data-status="3">In progress</a>' +
            '<a class="dropdown-item" href="javascript:void(0)" data-status="4">Closed</a>' +
          '</div>' +
        '</div>'
      );

      // Set up active priority
      statusDropdown
        .find('.dropdown-toggle')
        .text(
          statusDropdown.find('[data-status="' + data[5] + '"]')
            .addClass('active')
            .text()
        );

      // Append dropdown
      $('td', row).eq(5).html('').append(statusDropdown);


      // *********************************************************************
      // Setup actions

      $('td', row).eq(6).html('').append(
        '<a href="javascript:void(0)" class="btn btn-default btn-xs icon-btn md-btn-flat product-tooltip" title="Edit"><i class="ion ion-md-create"></i></a>&nbsp;' +
        '<a href="javascript:void(0)" class="btn btn-default btn-xs icon-btn md-btn-flat product-tooltip" title="Remove"><i class="ion ion-md-close"></i></a>'
      );

    }
  });


  // Datepicker

  $('#tickets-list-created').daterangepicker({
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    opens: ($('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl') ? 'right' : 'left'
  });

  // Tooltips

  $('body').tooltip({
    selector: '.product-tooltip'
  });

});
$(function() {

  $('.user-edit-multiselect').each(function() {
    $(this)
      .wrap('<div class="position-relative"></div>')
      .select2({
        dropdownParent: $(this).parent()
      });
  });

  $('.user-edit-tagsinput').tagsinput({ tagClass: 'badge badge-default' });

});
$(function() {

  var isRtl = $('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl';

  var roles = {
    1: 'User',
    2: 'Author',
    3: 'Staff',
    4: 'Admin'
  };

  var statuses = {
    1: ['Active', 'success'],
    2: ['Banned', 'danger'],
    3: ['Deleted', 'default']
  };

  $('#user-list').dataTable({
    ajax: '/json/pages_users_list.json',
    columnDefs: [ {
      targets: [8],
      orderable: false,
      searchable: false
    }],
    createdRow: function (row, data, index) {

      // *********************************************************************
      // Account link

      $('td', row).eq(1).html('').append(
        '<a href="javascript:void(0)">' + data[1] + '</a>'
      );

      // *********************************************************************
      // Verified

      $('td', row).eq(5).html('').append(
        '<span class="ion ion-md-' + (data[5] ? 'checkmark text-primary' : 'close text-light') + '">'
      );

      // *********************************************************************
      // Role

      $('td', row).eq(6).html('').append(
        roles[data[6]]
      );

      // *********************************************************************
      // Status

      $('td', row).eq(7).html('').append(
        '<span class="badge badge-outline-' + statuses[data[7]][1] + '">' + statuses[data[7]][0] + '</span>'
      );

      // *********************************************************************
      // Actions

      $('td', row).eq(8).addClass('text-center text-nowrap').html('').append(
        '<button type="button" class="btn btn-default btn-xs icon-btn md-btn-flat user-tooltip" title="Edit"><i class="ion ion-md-create"></i></button>&nbsp;&nbsp;' +
        '<div class="btn-group">' +
          '<button type="button" class="btn btn-default btn-xs icon-btn md-btn-flat dropdown-toggle hide-arrow user-tooltip" title="Actions" data-toggle="dropdown"><i class="ion ion-ios-settings"></i></button>' +
          '<div class="dropdown-menu' + (isRtl ? '' : ' dropdown-menu-right') + '">' +
            '<a class="dropdown-item" href="javascript:void(0)">View profile</a>' +
            '<a class="dropdown-item" href="javascript:void(0)">Ban user</a>' +
            '<a class="dropdown-item" href="javascript:void(0)">Remove</a>' +
          '</div>' +
        '</div>'
      );

    }
  });

  // Tooltips

  $('body').tooltip({
    selector: '.user-tooltip'
  });

  // Filters

  $('#user-list-latest-activity').daterangepicker({
      opens: isRtl ? 'right' : 'left',
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
  });

  $('#user-list-latest-activity').on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
  });

  $('#user-list-latest-activity').on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
  });

});
$(function() {

  // Tooltips

  $('body').tooltip({
    selector: '.vacancy-tooltip'
  });

});
$(function() {
  var $table = $('#bootstrap-table-example');
  var $remove = $('#bootstrap-table-remove');
  var selections = [];

  function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
      return row.id;
    });
  }

  $table.bootstrapTable({
    height: 500,
    iconsPrefix: 'opacity-75 ion',
    icons: {
      paginationSwitchDown: 'ion-ios-arrow-down icon-chevron-down',
      paginationSwitchUp: 'ion-ios-arrow-up icon-chevron-up',
      refresh: 'ion-md-refresh icon-refresh',
      columns: 'ion-md-apps icon-th',
      detailOpen: 'ion-md-add icon-plus',
      detailClose: 'ion-md-remove icon-minus',
      export: 'ion-md-cloud-download icon-share'
    },
    detailFormatter: function detailFormatter(index, row) {
      var html = [];

      $.each(row, function (key, value) {
        html.push('<p><b>' + key + ':</b> ' + (typeof value === 'undefined' ? false : value) + '</p>');
      });

      return html.join('');
    },
    columns: [
      [
        {
          field: 'state',
          checkbox: true,
          rowspan: 2,
          align: 'center',
          valign: 'middle'
        }, {
          title: 'Item ID',
          field: 'id',
          rowspan: 2,
          align: 'center',
          valign: 'middle',
          sortable: true,
          footerFormatter: function totalTextFormatter(data) {
            return 'Total';
          }
        }, {
          title: 'Item Detail',
          colspan: 3,
          align: 'center'
        }
      ],
      [
        {
          field: 'name',
          title: 'Item Name',
          sortable: true,
          editable: true,
          footerFormatter: function totalNameFormatter(data) {
            return data.length;
          },
          align: 'center'
        }, {
          field: 'price',
          title: 'Item Price',
          sortable: true,
          align: 'center',
          editable: {
            type: 'text',
            title: 'Item Price',
            validate: function (value) {
              value = $.trim(value);

              if (!value) { return 'This field is required'; }
              if (!/^\$/.test(value)) { return 'This field needs to start width $.' }

              var data = $table.bootstrapTable('getData');
              var index = $(this).parents('tr').data('index');

              // console.log(data[index]);
              return '';
            }
          },
          footerFormatter: function totalPriceFormatter(data) {
            var total = 0;

            $.each(data, function (i, row) {
              total += +(row.price.substring(1));
            });

            return '$' + total;
          }
        }, {
          field: 'operate',
          title: 'Item Operate',
          align: 'center',
          events: {
            'click .like': function (e, value, row, index) {
              alert('You click like action, row: ' + JSON.stringify(row));
            },
            'click .remove': function (e, value, row, index) {
              $table.bootstrapTable('remove', {
                field: 'id',
                values: [row.id]
              });
            }
          },
          formatter: function operateFormatter(value, row, index) {
            return [
              '<a class="btn btn-xs icon-btn btn-outline-default borderless like" href="javascript:void(0)" title="Like">',
              '<i class="ion ion-md-heart"></i>',
              '</a>  ',
              '<a class="btn btn-xs icon-btn btn-outline-danger borderless remove" href="javascript:void(0)" title="Remove">',
              '<i class="ion ion-md-close"></i>',
              '</a>'
            ].join('');
          }
        }
      ]
    ]
  });


  // Make bootstrapTable compatible with Bootstrap 4
  if ($('body').attr('dir') !== 'rtl' && $('html').attr('dir') !== 'rtl') {
    $('.bootstrap-table .pull-right .dropdown-menu').addClass('dropdown-menu-right');
    $('.bootstrap-table .pull-left .dropdown-menu').removeClass('dropdown-menu-right');
  } else {
    $('.bootstrap-table .pull-left .dropdown-menu').addClass('dropdown-menu-right');
  }


  // sometimes footer render error.
  setTimeout(function () {
    $table.bootstrapTable('resetView');
  }, 200);

  $table.on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table', function () {
    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
    // save your data, here just save the current page
    selections = getIdSelections();
    // push or splice the selections if you want to save all data selections
  });

  $table.on('all.bs.table', function(e, name, args) {
    // console.log(name, args);
  });

  $remove.click(function() {
    var ids = getIdSelections();

    $table.bootstrapTable('remove', {
      field: 'id',
      values: ids
    });
    $remove.prop('disabled', true);
  });

});
$(function() {
  $('.datatables-demo').dataTable();
});
$(function () {
  new SideNav($('#sidenav-app-brand-1')[0]);
  new SideNav($('#sidenav-app-brand-2')[0]);
  new SideNav($('#sidenav-app-brand-3')[0]);

  $('#sidenav-app-brand-toggle-collapsed').click(function () {
    $('#sidenav-app-brand-1').toggleClass('sidenav-collapsed');
    $('#sidenav-app-brand-2').toggleClass('sidenav-collapsed');
    $('#sidenav-app-brand-3').toggleClass('sidenav-collapsed');
  });
});
$(function() {
  if ($('html').attr('dir') === 'rtl') {
    $('#nesting-button-group-demo .dropdown-menu').addClass('dropdown-menu-right');
    $('#vertical-button-group-demo .dropdown-menu').addClass('dropdown-menu-right');
  }
});
// Swiper
$(function() {
  var defaultSwiper = new Swiper('#swiper-default');

  var swiperWithArrows = new Swiper('#swiper-with-arrows', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  var swiperWithPagination = new Swiper('#swiper-with-pagination', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });

  var swiperWithFractionPagination = new Swiper('#swiper-with-fraction-pagination', {
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction'
    }
  });

  var swiperWithProgress = new Swiper('#swiper-with-progress', {
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  var swiperWithScrollbar = new Swiper('#swiper-with-scrollbar', {
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: true
    }
  });

  var verticalSwiper = new Swiper('#swiper-vertical', {
    direction: 'vertical',
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });

  var swiperMultipleSlides = new Swiper('#swiper-multiple-slides', {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });

  var swiperFadeEffect = new Swiper('#swiper-fade-effect', {
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  var swiper3dCubeEffect = new Swiper('#swiper-3d-cube-effect', {
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94
    },
    pagination: {
      el: '.swiper-pagination'
    }
  });

  var swiper3dCoverflowEffect = new Swiper('#swiper-3d-coverflow-effect', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: '.swiper-pagination'
    }
  });

  var swiper3dFlipEffect = new Swiper('#swiper-3d-flip-effect', {
    effect: 'flip',
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
});
$(function () {
  $('[data-toggle="cropper-example-tooltip"]').tooltip({ container: 'body' });

  var URL = window.URL || window.webkitURL;
  var $image = $('#cropper-example-image');
  var $download = $('#cropper-example-download');
  var options = {
    aspectRatio: 16 / 9,
    preview: '.cropper-example-preview',
    crop: function (e) {
      $('#cropper-example-dataX').val(Math.round(e.detail.x));
      $('#cropper-example-dataY').val(Math.round(e.detail.y));
      $('#cropper-example-dataHeight').val(Math.round(e.detail.height));
      $('#cropper-example-dataWidth').val(Math.round(e.detail.width));
      $('#cropper-example-dataRotate').val(e.detail.rotate);
      $('#cropper-example-dataScaleX').val(e.detail.scaleX);
      $('#cropper-example-dataScaleY').val(e.detail.scaleY);
    }
  };

  var originalImageURL = $image.attr('src');
  var uploadedImageURL;

  // Cropper
  $image.cropper(options);

  // IE10 fix
  if (typeof document.documentMode === 'number' && document.documentMode < 11) {
    options = $.extend({}, options, {zoomOnWheel: false});
    setTimeout(function() {
      $image.cropper('destroy').cropper(options);
    }, 1000);
  }

  // Buttons
  if (!$.isFunction(document.createElement('canvas').getContext)) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }
  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }


  // Download
  if (typeof $download[0].download === 'undefined') {
    $download.addClass('disabled');
  }

  // Methods
  $('.cropper-example-buttons').on('click', '[data-method]', function () {
    var $this = $(this);
    var data = $this.data();
    var result;

    if ($this.prop('disabled') || $this.hasClass('disabled')) {
      return;
    }

    if ($image.data('cropper') && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (data.method === 'rotate') {
        $image.cropper('clear');
      }

      result = $image.cropper(data.method, data.option, data.secondOption);

      if (data.method === 'rotate') {
        $image.cropper('crop');
      }

      switch (data.method) {
        case 'scaleX':
        case 'scaleY':
          $(this).data('option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {

            // Bootstrap's Modal
            $('#cropper-example-getCroppedCanvasModal').modal().find('.modal-body').html(result);

            if (!$download.hasClass('disabled')) {
              $download.attr('href', result.toDataURL('image/jpeg'));
            }
          }

          break;

        case 'destroy':
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            $image.attr('src', originalImageURL);
          }

          break;
      }
    }
  });

  // Import image
  var $inputImage = $('#cropper-example-inputImage');

  if (URL) {
    $inputImage.change(function () {
      var files = this.files;
      var file;

      if (!$image.data('cropper')) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          uploadedImageURL = URL.createObjectURL(file);
          $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
          $inputImage.val('');
        } else {
          window.alert('Please choose an image file.');
        }
      }
    });
  } else {
    $inputImage.prop('disabled', true).parent().addClass('disabled');
  }
});
// Dragula
$(function() {
  dragula([$('#dragula-left')[0], $('#dragula-right')[0]], {
    revertOnSpill: true
  });

  // Copying
  dragula([$('#dragula-left-copy')[0], $('#dragula-right-copy')[0]], {
    copy: true
  });

  // Drag handle
  dragula([$('#dragula-left-drag-handles')[0], $('#dragula-right-drag-handles')[0]], {
    moves: function (el, container, handle) {
      return handle.classList.contains('handle');
    }
  });
});

// Sortable.js
$(function() {
  Sortable.create(document.getElementById('sortable-1'), { animation: 150 });
  Sortable.create(document.getElementById('sortable-2'), { animation: 150 });
  Sortable.create(document.getElementById('sortable-3'), { animation: 150 });
  Sortable.create(document.getElementById('sortable-4'), {
    animation: 150,
    handle: '.ion'
  });
});
$(function() {
  if ($('html').attr('dir') === 'rtl') {
    $('#hover-dropdown-demo .dropdown-menu').addClass('dropdown-menu-right');
    $('#nesting-dropdown-demo > .dropdown-menu').addClass('dropdown-menu-right');
    $('#btn-dropdown-demo .dropdown-menu').addClass('dropdown-menu-right');
  }
});

// Bootstrap menu
$(function() {
  var isRtl = $('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl';

  new BootstrapMenu('#bs-menu-example', {
    menuPosition: isRtl ? 'belowRight' : 'belowLeft',
    actionsGroups: [
      ['actionName', 'anotherActionName' ],
      ['thirdActionName']
    ],
    actions: {
      actionName: {
        name: 'Action',
        onClick: function() {
          toastr.info("'Action' clicked!");
        }
      },
      anotherActionName: {
        name: 'Another action',
        iconClass: 'ion ion-md-create',
        onClick: function() {
          toastr.info("'Another action' clicked!");
        }
      },
      thirdActionName: {
        name: 'A third action',
        iconClass: 'ion ion-md-unlock',
        onClick: function() {
          toastr.info("'A third action' clicked!");
        }
      }
    }
  });
});
$(function () {
  var today = new Date();
  var y = today.getFullYear();
  var m = today.getMonth();
  var d = today.getDate();

  var eventList = [{
    title: 'All Day Event',
    start: new Date(y, m, d - 12)
  },
  {
    title: 'Long Event',
    start: new Date(y, m, d - 8),
    end: new Date(y, m, d - 5),
    className: 'fc-event-warning'
  },
  {
    id: 999,
    title: 'Repeating Event',
    start: new Date(y, m, d - 6, 16, 0)
  },
  {
    id: 999,
    title: 'Repeating Event',
    start: new Date(y, m, d + 1, 16, 0),
    className: 'fc-event-success',
  },
  {
    title: 'Conference',
    start: new Date(y, m, d - 4),
    end: new Date(y, m, d - 2),
  },
  {
    title: 'Meeting',
    start: new Date(y, m, d - 3, 10, 30),
    end: new Date(y, m, d - 3, 12, 30),
    className: 'fc-event-danger'
  },
  {
    title: 'Lunch',
    start: new Date(y, m, d  - 3, 12, 0),
    className: 'fc-event-info'
  },
  {
    title: 'Meeting',
    start: new Date(y, m, d - 3, 14, 30),
    className: 'fc-event-dark'
  },
  {
    title: 'Happy Hour',
    start: new Date(y, m, d - 3, 17, 30)
  },
  {
    title: 'Dinner',
    start: new Date(y, m, d - 3, 20, 0)
  },
  {
    title: 'Birthday Party',
    start: new Date(y, m, d - 2, 7, 0)
  },
  {
    title: 'Background event',
    start: new Date(y, m, d + 5),
    end: new Date(y, m, d + 7),
    rendering: 'background'
  },
  {
    title: 'Click for Google',
    url: 'http://google.com/',
    start: new Date(y, m, d + 13)
  }];

  // Default view
  // color classes: [ fc-event-success | fc-event-info | fc-event-warning | fc-event-danger | fc-event-dark ]
  $('#fullcalendar-default-view').fullCalendar({
    // Bootstrap styling
    themeSystem: 'bootstrap4',
    bootstrapFontAwesome: {
      close: ' ion ion-md-close',
      prev: ' ion ion-ios-arrow-back scaleX--1-rtl',
      next: ' ion ion-ios-arrow-forward scaleX--1-rtl',
      prevYear: ' ion ion-ios-arrow-dropleft-circle scaleX--1-rtl',
      nextYear: ' ion ion-ios-arrow-dropright-circle scaleX--1-rtl'
    },

    header: {
      left: 'title',
      center: 'month,agendaWeek,agendaDay',
      right: 'prev,next today'
    },

    defaultDate: today,
    navLinks: true, // can click day/week names to navigate views
    selectable: true,
    selectHelper: true,
    weekNumbers: true, // Show week numbers
    nowIndicator: true, // Show "now" indicator
    firstDay: 1, // Set "Monday" as start of a week
    businessHours: {
      dow: [1, 2, 3, 4, 5], // Monday - Friday
      start: '9:00',
      end: '18:00',
    },
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: eventList,
    select: function (start, end) {
      $('#fullcalendar-default-view-modal')
        .on('shown.bs.modal', function() {
          $(this).find('input[type="text"]').trigger('focus');
        })
        .on('hidden.bs.modal', function() {
          $(this)
            .off('shown.bs.modal hidden.bs.modal submit')
            .find('input[type="text"], select').val('');
          $('#fullcalendar-default-view').fullCalendar('unselect');
        })
        .on('submit', function(e) {
          e.preventDefault();
          var title = $(this).find('input[type="text"]').val();
          var className = $(this).find('select').val() || null;

          if (title) {
            var eventData = {
              title: title,
              start: start,
              end: end,
              className: className
            }
            $('#fullcalendar-default-view').fullCalendar('renderEvent', eventData, true);
          }

          $(this).modal('hide');
        })
        .modal('show');
    },
    eventClick: function(calEvent, jsEvent, view) {
      alert('Event: ' + calEvent.title);
    }
  });

  // List view
  // color classes: [ fc-event-success | fc-event-info | fc-event-warning | fc-event-danger | fc-event-dark ]
  $('#fullcalendar-list-view').fullCalendar({
    // Bootstrap styling
    themeSystem: 'bootstrap4',
    bootstrapFontAwesome: {
      close: ' ion ion-md-close',
      prev: ' ion ion-ios-arrow-back scaleX--1-rtl',
      next: ' ion ion-ios-arrow-forward scaleX--1-rtl',
      prevYear: ' ion ion-ios-arrow-dropleft-circle scaleX--1-rtl',
      nextYear: ' ion ion-ios-arrow-dropright-circle scaleX--1-rtl'
    },

    header: {
      left: 'title',
      center: 'listDay,listWeek,month',
      right: 'prev,next today'
    },

    // customize the button names,
    views: {
      listDay: {
        buttonText: 'list day'
      },
      listWeek: {
        buttonText: 'list week'
      }
    },

    defaultView: 'listWeek',
    defaultDate: today,
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: eventList
  });
});
// Photoswipe
$(function() {
  // Utility function (see src/libs/photoswipe/photoswipe.es6)
  // See the docs: http://photoswipe.com/documentation/getting-started.html
  //
  initPhotoSwipeFromDOM('#photoswipe-example');
});

// Blueimp Gallery
$(function() {
  // Lightbox
  $('#blueimp-gallery-example').on('click', '.img-thumbnail', function(e) {
    e.preventDefault();

    var links = $('#blueimp-gallery-example').find('.img-thumbnail');

    window.blueimpGallery(links, {
      container: '#blueimp-gallery-example-container',
      carousel: true,
      hidePageScrollbars: true,
      disableScroll: true,
      index: this
    });
  });

  // Carousel
  window.blueimpGallery([
    '/img/bg/9.jpg',
    '/img/bg/10.jpg',
    '/img/bg/11.jpg',
    '/img/bg/12.jpg',
    '/img/bg/13.jpg',
  ], {
    container: '#blueimp-carousel-example',
    carousel: true
  });
});
$(function() {
  var options = {
    tooltips: {
      controls: false,
      seek: true
    }
  };

  var videoPlayer = plyr.setup(document.getElementById('plyr-video-player'), options)[0];
  var audioPlayer = plyr.setup(document.getElementById('plyr-audio-player'), options)[0];

  // RTL: Fix time displaying
  if ($('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl') {
    function plyrRtlTooltip(instance, e) {
      var duration = instance.getDuration();
      var container = instance.getContainer();

      if (!options.tooltips.seek || duration === 0 || !container) { return; }

      var clientRect = container.querySelector('.plyr__progress').getBoundingClientRect();

      // Revert percents
      var percent = 100 - (100 / clientRect.width * (e.pageX - clientRect.left));

      percent = percent < 0 ? 0 : (percent > 100 ? 100 : percent);

      var time = duration / 100 * percent;

      var secs = ("0" + parseInt(time % 60)).slice(-2);
      var mins = ("0" + parseInt((time / 60) % 60)).slice(-2);
      var hours = parseInt((time / 60 / 60) % 60);
      var displayHours = parseInt((duration / 60 / 60) % 60) > 0;

      container.querySelector('.plyr__progress .plyr__tooltip').innerHTML =
        (displayHours ? hours + ":" : "") + mins + ":" + secs;
    }

    videoPlayer.on('mouseenter mouseleave mousemove', function(e) {
      plyrRtlTooltip(videoPlayer, e);
    });
    audioPlayer.on('mouseenter mouseleave mousemove', function(e) {
      plyrRtlTooltip(audioPlayer, e);
    });
  }
});
// Bootstrap modals
$(function() {
  $('[name=modals-default-size]').on('change', function() {
    $('#modals-default .modal-dialog').removeClass('modal-sm').removeClass('modal-lg');

    if (this.value !== 'md') {
      $('#modals-default .modal-dialog').addClass('modal-' + this.value);
    }
  });

  $('[name=modals-top-size]').on('change', function() {
    $('#modals-top .modal-dialog').removeClass('modal-sm').removeClass('modal-lg');

    if (this.value !== 'md') {
      $('#modals-top .modal-dialog').addClass('modal-' + this.value);
    }
  });

  $('[name=modals-fill-in-size]').on('change', function() {
    $('#modals-fill-in .modal-dialog').removeClass('modal-sm').removeClass('modal-lg');

    if (this.value !== 'md') {
      $('#modals-fill-in .modal-dialog').addClass('modal-' + this.value);
    }
  });
});

// Bootbox
$(function() {
  $('#bootbox-alert').on('click', function() {
    bootbox.alert({
      message:   'Hello world!',
      className: 'bootbox-sm',

      callback: function() {
        alert('Hello world callback');
      },
    });
  });

  $('#bootbox-confirm').on('click', function() {
    bootbox.confirm({
      message:   'Are you sure?',
      className: 'bootbox-sm',

      callback: function(result) {
        alert('Confirm result: ' + result);
      },
    });
  });

  $('#bootbox-prompt').on('click', function() {
    bootbox.prompt({
      title: 'What is your name?',

      callback: function(result) {
        if (result === null) {
          alert('Prompt dismissed');
        } else {
          alert('Hi ' + result + '!');
        }
      },
    });
  });

  $('#bootbox-custom').on('click', function() {
    bootbox.dialog({
      title:     'Custom title',
      message:   'I am a custom dialog',
      className: 'bootbox-lg',

      buttons: {
        success: {
          label:     'Success!',
          className: 'btn-success',

          callback: function() {
            alert('great success');
          },
        },
        danger: {
          label:     'Danger!',
          className: 'btn-danger',

          callback: function() {
            alert('uh oh, look out!');
          },
        },
        main: {
          label:     'Click ME!',
          className: 'btn-primary',

          callback: function() {
            alert('Primary button');
          },
        }
      },
    });
  });
});

// Bootstrap SweetAlert
$(function() {
  $('#sweetalert-example-1').click(function(){
    swal("Here's a message!", "It's pretty, isn't it?")
  });

  $('#sweetalert-example-2').click(function(){
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel plx!",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function(isConfirm) {
      if (isConfirm) {
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
      } else {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  });

  $('#sweetalert-example-3').click(function(){
    swal({
      title: "Ajax request example",
      text: "Submit to run ajax request",
      type: "info",
      showCancelButton: true,
      closeOnConfirm: false,
      showLoaderOnConfirm: true
    }, function () {
      setTimeout(function () {
        swal("Ajax request finished!");
      }, 2000);
    });
  });

  $('#sweetalert-example-4').click(function(){
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "info",
      showCancelButton: true,
      confirmButtonClass: 'btn-info',
      confirmButtonText: 'Info!'
    });
  });

  $('#sweetalert-example-5').click(function(){
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "success",
      showCancelButton: true,
      confirmButtonClass: 'btn-success',
      confirmButtonText: 'Success!'
    });
  });

  $('#sweetalert-example-6').click(function(){
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: 'btn-warning',
      confirmButtonText: 'Warning!'
    });
  });

  $('#sweetalert-example-7').click(function(){
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "error",
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Danger!'
    });
  });
});
$(function() {
  if ($('html').attr('dir') === 'rtl') {
    $('#navbar-example-1 .dropdown-menu').addClass('dropdown-menu-right');
  }
});

// Mega dropdown
$(function() {
  if ($('html').attr('dir') === 'rtl') {
    $('#navbar-example-14 .dropdown-menu').addClass('dropdown-menu-right');
    $('#navbar-example-15 .dropdown-menu').addClass('dropdown-menu-right');
  }

  $('.navbar-example-14-mega-dropdown, .navbar-example-15-mega-dropdown').each(function() {
    new MegaDropdown(this);
  });
});

// Search
$(function() {
  $('#navbar-example-16 .navbar-search-input > input').on('focus', function() {
    $('#navbar-example-16 .navbar-search-box').addClass('active');
  });
  $('#navbar-example-16 .navbar-search-cancel').on('click', function(e) {
    e.preventDefault();
    $('#navbar-example-16 .navbar-search-box').removeClass('active');
  });
});
$(function() {
  if ($('html').attr('dir') === 'rtl') {
    $('#nav-light-demo .dropdown-menu').addClass('dropdown-menu-right');
    $('#nav-dropdowns-demo .dropdown-menu').addClass('dropdown-menu-right');
  }
});
// Growl
$(function() {
  var isRtl = $('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl';

  $('#growl-default').click(function() {
    $.growl({
      title:    'Growl',
      message:  'The kitten is awake!',
      location: isRtl ? 'tl' : 'tr'
    });
  });

  $('#growl-notice').click(function() {
    $.growl.notice({
      message:  'The kitten is cute!',
      location: isRtl ? 'tl' : 'tr'
    });
  });

  $('#growl-warning').click(function() {
    $.growl.warning({
      message:  'The kitten is ugly!',
      location: isRtl ? 'tl' : 'tr'
    });
  });

  $('#growl-error').click(function() {
    $.growl.error({
      message:  'The kitten is attacking!',
      location: isRtl ? 'tl' : 'tr'
    });
  });

  $('#growl-static').click(function() {
    $.growl({
      title:    'Growl',
      message:  'The kitten is awake!',
      duration: 9999 * 9999,
      location: isRtl ? 'tl' : 'tr'
    });
  });

  $('#growl-small').click(function() {
    $.growl({
      title:   'Growl',
      message: 'The kitten is awake!',
      size:    'small',
      location: isRtl ? 'tl' : 'tr'
    });
  });

  $('#growl-large').click(function() {
    $.growl({
      title:   'Growl',
      message: 'The kitten is awake!',
      size:    'large',
      location: isRtl ? 'tl' : 'tr'
    });
  });
});

// Toastr
$(function() {
  var curMsgIndex = -1;

  function getMessage() {
    var msgs = [
      'My name is Inigo Montoya. You killed my father. Prepare to die!',
      'Are you the six fingered man?',
      'Inconceivable!',
      'I do not think that means what you think it means.',
      'Have fun storming the castle!',
    ];

    curMsgIndex++;

    if (curMsgIndex === msgs.length) { curMsgIndex = 0; }

    return msgs[curMsgIndex];
  };

  $('#toastr-show').click(function() {
    var msg   = $('#toastr-message').val() || getMessage();
    var title = $('#toastr-title').val() || '';
    var type  = $('#toastr-type').val();

    toastr[type](msg, title, {
      positionClass:     $('input[name="toastr-position"]:checked').val(),
      closeButton:       $('#toastr-close-button').prop('checked'),
      progressBar:       $('#toastr-progress-bar').prop('checked'),
      preventDuplicates: $('#toastr-prevent-duplicates').prop('checked'),
      newestOnTop:       $('#toastr-newest-on-top').prop('checked'),
      rtl:               $('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl'
    });
  });

  $('#toastr-clear').on('click', function() {
    toastr.clear();
  });
});
// Vertical
$(function() {
  new SideNav($('#sidenav-1')[0]);

  $('#sidenav-1-toggle-collapsed').click(function() {
    $('#sidenav-1').toggleClass('sidenav-collapsed');
  });
});

// Horizontal
$(function() {
  new SideNav($('#sidenav-2')[0], {
    orientation: 'horizontal'
  });
});

// Horizontal (Show dropdown on hover)
$(function() {
  new SideNav($('#sidenav-3')[0], {
    orientation: 'horizontal',
    showDropdownOnHover: true
  });
});

// Horizontal (within container)
$(function() {
  new SideNav($('#sidenav-4')[0], {
    orientation: 'horizontal'
  });
});

// No animation
$(function() {
  new SideNav($('#sidenav-5')[0], {
    animate: false
  });

  new SideNav($('#sidenav-6')[0], {
    orientation: 'horizontal',
    animate: false
  });

  $('#sidenav-5-toggle-collapsed').click(function() {
    $('#sidenav-5').toggleClass('sidenav-collapsed');
  });
});

// No accordion
$(function() {
  new SideNav($('#sidenav-7')[0], {
    accordion: false
  });

  new SideNav($('#sidenav-8')[0], {
    orientation: 'horizontal',
    accordion: false
  });

  $('#sidenav-7-toggle-collapsed').click(function() {
    $('#sidenav-7').toggleClass('sidenav-collapsed');
  });
});

// Elements
$(function() {
  $('.sidenavs-9').each(function() {
    new SideNav(this);
  });

  $('#sidenavs-9-toggle-collapsed').click(function() {
    $('.sidenavs-9').toggleClass('sidenav-collapsed');
  });
});

// Colors (vertical)
$(function() {
  $('.sidenavs-10').each(function() {
    new SideNav(this);
  });

  $('#sidenavs-10-toggle-collapsed').click(function() {
    $('.sidenavs-10').toggleClass('sidenav-collapsed');
  });
});

// Colors (horizontal)
$(function() {
  $('.sidenavs-11').each(function() {
    new SideNav(this, {
      orientation: 'horizontal'
    });
  });
});

// With background
$(function() {
  $('.sidenavs-12').each(function() {
    new SideNav(this);
  });

  $('#sidenavs-12-toggle-collapsed').click(function() {
    $('.sidenavs-12').toggleClass('sidenav-collapsed');
  });
});
$(function() {
  // Tooltips

  if ($('html').attr('dir') === 'rtl') {
    $('.tooltip-demo [data-placement=right]').attr('data-placement', 'left').addClass('rtled');
    $('.tooltip-demo [data-placement=left]:not(.rtled)').attr('data-placement', 'right').addClass('rtled');
  }
  $('[data-toggle="tooltip"]').tooltip();

  // Popovers

  if ($('html').attr('dir') === 'rtl') {
    $('.popover-demo [data-placement=right]').attr('data-placement', 'left').addClass('rtled');
    $('.popover-demo [data-placement=left]:not(.rtled)').attr('data-placement', 'right').addClass('rtled');
  }
  $('[data-toggle="popover"]').popover();

});
$(function() {
  var tour = new Tour({
    backdrop: true,
    steps: [
      {
        element: "#tour-1",
        title: "Title of first step",
        content: "Content of first step",
        smartPlacement: true
      },
      {
        element: "#tour-2",
        title: "Title of second step",
        content: "Content of second step",
        smartPlacement: true
      },
      {
        element: "#tour-3",
        title: "Title of third step",
        content: "Content of third step",
        smartPlacement: true
      },
      {
        element: "#tour-4",
        title: "Title of fourth step",
        content: "Content of fourth step",
        smartPlacement: true
      },
      {
        element: "#tour-5",
        title: "Title of fifth step",
        content: "Content of fifth step",
        smartPlacement: true
      }
    ]
  });
  // Initialize the tour
  tour.init();

  $('#bs-tour-example').click(function() {
    tour.restart();
  });
});
// Nestable
$(function() {
  function updateOutput(e) {
    var list   = e.length ? e : $(e.target);
    var output = list.data('output');

    output.val(window.JSON ? window.JSON.stringify(list.nestable('serialize')) :
                             'JSON browser support required for this demo.');
  };

  $('#nestable').nestable({ group: 1 }).on('change', updateOutput);
  $('#nestable2').nestable({ group: 1 }).on('change', updateOutput);

  // output initial serialised data
  updateOutput($('#nestable').data('output', $('#nestable-output')));
  updateOutput($('#nestable2').data('output', $('#nestable2-output')));

  $('#nestable-menu').on('click', function(e) {
    var target = $(e.target);
    var action = target.data('action');

    if (action === 'expand-all') {
      $('.dd').nestable('expandAll');
    }
    if (action === 'collapse-all') {
      $('.dd').nestable('collapseAll');
    }
  });

  $('#nestable3').nestable();
});

// jsTree
$(function() {
  $('#jstree-example-1').jstree();
  $('#jstree-example-2').jstree({
    core : {
      data : [
        {
          text: 'css',
          children: [
            { text: 'app.css', type: 'css' },
            { text: 'style.css', type: 'css' },
          ],
        },
        {
          text: 'img',
          state: {
            opened: true
          },
          children: [
            { text: 'bg.jpg', type: 'img' },
            { text: 'logo.png', type: 'img' },
            { text: 'avatar.png', type: 'img' },
          ],
        },
        {
          text: 'js',
          state: {
            opened: true
          },
          children: [
            { text: 'jquery.js', type: 'js' },
            { text: 'app.js', type: 'js' },
          ],
        },
        { text: 'index.html', type: 'html' },
        { text: 'page-one.html', type: 'html' },
        { text: 'page-two.html', type: 'html' }
      ]
    },
    plugins: [ 'types' ],
    types: {
      default: { icon: 'ion ion-ios-folder' },
      html: { icon: 'ion ion-logo-html5 text-danger' },
      css: { icon: 'ion ion-logo-css3 text-info' },
      img: { icon: 'ion ion-ios-image text-success' },
      js: { icon: 'ion ion-logo-nodejs text-warning' }
    }
  });
});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




;
