!function(e){var t={};function __webpack_require__(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,__webpack_require__),n.l=!0,n.exports}__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,r){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(__webpack_require__.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)__webpack_require__.d(r,n,function(t){return e[t]}.bind(null,n));return r},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=57)}({0:function(e,t){function _typeof(t){return e.exports=_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,_typeof(t)}e.exports=_typeof,e.exports.__esModule=!0,e.exports.default=e.exports},49:function(e,t,r){var n=r(0);function lazyLoadLogic(e,t){var r=function parseJson(e){var t;try{t=JSON.parse(e)}catch(r){t=JSON.parse('{"type":"image" , "src":"'+e+'"}')}return t}(e.dataset[t]);switch(r.type){case"image":r.src.length>0&&(e.src=r.src,e.removeAttribute("data-"+t));break;case"mathjax":var n=r.selector||".NLM_disp-formula",o=function closestElement(e,t){if(Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(t.matches(e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null}),null!=e)return e.closest(t)}(e,n);if(""===o.id){var a=function guidGenerator(){var e=function S4(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}();o.setAttribute("id",a)}"remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)}),e.remove(),MathJax.Hub.Queue(["Typeset",MathJax.Hub,o.id]),"function"==typeof callback&&callback.call(this);break;case"sketchfab":var i=e.dataset.url,c=e.querySelector("a.thumbnail"),u=new XMLHttpRequest;e.removeAttribute("data-url"),u.open("GET",i,!0),u.onload=function(){200===u.status&&(responseAsJson=JSON.parse(u.responseText),function replaceImageWith3DIframe(e,t,r){if(e){r.querySelector(".figureDownloadOptions").style.display="none",t.style.display="none",function insertAfterNode(e,t){0===t.parentNode.getElementsByClassName("sketchfab-embed-wrapper").length&&t.insertAdjacentHTML("afterend",e)}(e,r.querySelector(".figureInfo"));var n=r.querySelector("iframe"),o=n.offsetWidth;n.style.height=9*o/16}}(responseAsJson.html,c,e))},u.send();break;case"backgroundImage":i="url('"+r.src+"')",e.style.backgroundImage=i;break;case"addClass":e.classList.add(r.className)}}window.lazyLoad=function(e,t,r,o,a){var i,c;if(r=r||{root:null,rootMargin:"10%",threshold:0},o)i=o;else{var u=e.match(/data-(\w+[\-\w+]*)/g)[0];i=u.substring(u.indexOf("data-")+5).replace(/(-\S)*/g,(function(e){return e.toUpperCase()})).replace(/\-*/g,(function(e){return e.replace("-","")}))}c=t?"object"==n(t)?t:document.querySelector(t):document;var s=[].slice.call(c.querySelectorAll(e));if("IntersectionObserver"in window){var l=new IntersectionObserver((function(e,t){e.forEach((function(e){if(e.isIntersecting){var r=e.target;t.unobserve(r),lazyLoadLogic(r,i)}}))}),r);s.forEach((function(e){l.observe(e)}))}else{var p=!1,_=function lazyLoad(){!1===p&&(p=!0,setTimeout((function(){s.forEach((function(e){e.getBoundingClientRect().top<=window.innerHeight+window.innerHeight*parseInt(r.rootMargin)/100&&e.getBoundingClientRect().bottom>=0&&"none"!==getComputedStyle(e).display&&(lazyLoadLogic(e,i),0===(s=s.filter((function(t){return t!==e}))).length&&(document.removeEventListener("scroll",lazyLoad),window.removeEventListener("resize",lazyLoad),window.removeEventListener("orientationchange",lazyLoad)))})),p=!1}),200))};document.addEventListener("scroll",_),window.addEventListener("resize",_),window.addEventListener("orientationchange",_)}}},57:function(e,t,r){"use strict";r.r(t);r(49);document.addEventListener("DOMContentLoaded",(function(){lazyLoad("[data-src]")}),!1)}});
//# sourceMappingURL=build.lazyload.bundle-a3f892232e28f44957a2.js.map