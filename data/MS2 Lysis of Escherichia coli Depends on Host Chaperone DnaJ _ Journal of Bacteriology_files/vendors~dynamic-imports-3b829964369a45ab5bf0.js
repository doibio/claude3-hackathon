(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{814:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(4),c=r.n(o);function _regeneratorRuntime(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */_regeneratorRuntime=function _regeneratorRuntime(){return t};var e,t={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(e,t,r){e[t]=r.value},c="function"==typeof Symbol?Symbol:{},i=c.iterator||"@@iterator",s=c.asyncIterator||"@@asyncIterator",l=c.toStringTag||"@@toStringTag";function define(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{define({},"")}catch(e){define=function define(e,t,r){return e[t]=r}}function wrap(e,t,r,n){var a=t&&t.prototype instanceof Generator?t:Generator,c=Object.create(a.prototype),i=new Context(n||[]);return o(c,"_invoke",{value:makeInvokeMethod(e,r,i)}),c}function tryCatch(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}t.wrap=wrap;var u="suspendedStart",d="executing",h="completed",m={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var p={};define(p,i,(function(){return this}));var f=Object.getPrototypeOf,y=f&&f(f(values([])));y&&y!==r&&n.call(y,i)&&(p=y);var g=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(p);function defineIteratorMethods(e){["next","throw","return"].forEach((function(t){define(e,t,(function(e){return this._invoke(t,e)}))}))}function AsyncIterator(e,t){function invoke(r,o,c,i){var s=tryCatch(e[r],e,o);if("throw"!==s.type){var l=s.arg,u=l.value;return u&&"object"==a()(u)&&n.call(u,"__await")?t.resolve(u.__await).then((function(e){invoke("next",e,c,i)}),(function(e){invoke("throw",e,c,i)})):t.resolve(u).then((function(e){l.value=e,c(l)}),(function(e){return invoke("throw",e,c,i)}))}i(s.arg)}var r;o(this,"_invoke",{value:function value(e,n){function callInvokeWithMethodAndArg(){return new t((function(t,r){invoke(e,n,t,r)}))}return r=r?r.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}})}function makeInvokeMethod(t,r,n){var a=u;return function(o,c){if(a===d)throw new Error("Generator is already running");if(a===h){if("throw"===o)throw c;return{value:e,done:!0}}for(n.method=o,n.arg=c;;){var i=n.delegate;if(i){var s=maybeInvokeDelegate(i,n);if(s){if(s===m)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(a===u)throw a=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a=d;var l=tryCatch(t,r,n);if("normal"===l.type){if(a=n.done?h:"suspendedYield",l.arg===m)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(a=h,n.method="throw",n.arg=l.arg)}}}function maybeInvokeDelegate(t,r){var n=r.method,a=t.iterator[n];if(a===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,maybeInvokeDelegate(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var o=tryCatch(a,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,m;var c=o.arg;return c?c.done?(r[t.resultName]=c.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):c:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function pushTryEntry(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function resetTryEntry(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function Context(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(pushTryEntry,this),this.reset(!0)}function values(t){if(t||""===t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,c=function next(){for(;++o<t.length;)if(n.call(t,o))return next.value=t[o],next.done=!1,next;return next.value=e,next.done=!0,next};return c.next=c}}throw new TypeError(a()(t)+" is not iterable")}return GeneratorFunction.prototype=GeneratorFunctionPrototype,o(g,"constructor",{value:GeneratorFunctionPrototype,configurable:!0}),o(GeneratorFunctionPrototype,"constructor",{value:GeneratorFunction,configurable:!0}),GeneratorFunction.displayName=define(GeneratorFunctionPrototype,l,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===GeneratorFunction||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,GeneratorFunctionPrototype):(e.__proto__=GeneratorFunctionPrototype,define(e,l,"GeneratorFunction")),e.prototype=Object.create(g),e},t.awrap=function(e){return{__await:e}},defineIteratorMethods(AsyncIterator.prototype),define(AsyncIterator.prototype,s,(function(){return this})),t.AsyncIterator=AsyncIterator,t.async=function(e,r,n,a,o){void 0===o&&(o=Promise);var c=new AsyncIterator(wrap(e,r,n,a),o);return t.isGeneratorFunction(r)?c:c.next().then((function(e){return e.done?e.value:c.next()}))},defineIteratorMethods(g),define(g,l,"Generator"),define(g,i,(function(){return this})),define(g,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function next(){for(;r.length;){var e=r.pop();if(e in t)return next.value=e,next.done=!1,next}return next.done=!0,next}},t.values=values,Context.prototype={constructor:Context,reset:function reset(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(resetTryEntry),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function stop(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function dispatchException(t){if(this.done)throw t;var r=this;function handle(n,a){return c.type="throw",c.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if("root"===o.tryLoc)return handle("end");if(o.tryLoc<=this.prev){var i=n.call(o,"catchLoc"),s=n.call(o,"finallyLoc");if(i&&s){if(this.prev<o.catchLoc)return handle(o.catchLoc,!0);if(this.prev<o.finallyLoc)return handle(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return handle(o.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return handle(o.finallyLoc)}}}},abrupt:function abrupt(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=e,c.arg=t,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(c)},complete:function complete(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function finish(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),resetTryEntry(r),m}},catch:function _catch(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;resetTryEntry(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function delegateYield(t,r,n){return this.delegate={iterator:values(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},t}var i=function(){var e=c()(_regeneratorRuntime().mark((function _callee4(e){var t,n,a,o,i,s,l,u,d,h,m,p,f,y,g,v,b,x,k,w,P,C,A,_,E,I,S,W,R,L,G,j,N,F,B,T,q,O,M,z,D,U,V,$,Y,J,H,K,Q,X;return _regeneratorRuntime().wrap((function _callee4$(Z){for(;;)switch(Z.prev=Z.next){case 0:if(t=Array.prototype.slice.call(document.querySelectorAll(".figure:not(.holder), .colored-block, .component-container")),n=Array.prototype.slice.call(document.querySelectorAll(".advanced-search--searchIn, .institutional-login")),a=Array.prototype.slice.call(document.querySelectorAll('[data-toggle="transplant"]')),o=Array.prototype.slice.call(document.getElementsByClassName("expandable-list")),i=Array.prototype.slice.call(document.getElementsByClassName("expandable")),s=Array.prototype.slice.call(document.getElementsByClassName("js-audio-player")),l=Array.prototype.slice.call(document.getElementsByClassName("ux-alert-container")),u=Array.prototype.slice.call(document.querySelectorAll(".figure:not(.holder),.colored-block,.component-container")),d=Array.prototype.slice.call(document.querySelectorAll(".sections-block, .sections-navbar")),h=Array.prototype.slice.call(document.getElementsByClassName("datepicker")),m=Array.prototype.slice.call(document.getElementsByClassName("ajax-uploader")),p=Array.prototype.slice.call(document.getElementsByClassName("dashboard-toolbar")),f=Array.prototype.slice.call(document.getElementsByClassName("favoriteShortlist")),y=Array.prototype.slice.call(document.getElementsByClassName("loi__banner")),g=document.querySelector("article[data-design]"),v=Array.prototype.slice.call(document.getElementsByClassName("disable-adblocker__continue-btn")),b=Array.prototype.slice.call(document.querySelectorAll(".loi-accordion, .loi-accordion__nested")),x=Array.prototype.slice.call(document.getElementsByClassName("ipRangesWidget")),k=Array.prototype.slice.call(document.getElementsByClassName("toc")),w=Array.prototype.slice.call(document.getElementsByClassName("relatedArtContainer")),P=Array.prototype.slice.call(document.querySelectorAll("[data-optimizer]")),C=Array.prototype.slice.call(document.getElementsByClassName("preview-container")),A=document.getElementById("shibboleth_search"),_=Array.prototype.slice.call(document.getElementsByClassName("show-recommended-placeholder")),E=Array.prototype.slice.call(document.querySelectorAll(".jcf, [datajcf], [data-jcf], #filter")),I=document.querySelector(".js--truncate, .issue-item__authors,.loa,.issue-item__abstract"),S=document.querySelector(".tab"),W=document.querySelector(".slideshow,.slideShow, .js-showcase-slideshow"),R=document.querySelector(".kbart-token_table, .institutionList, .profile-menu, .trusted-proxy-form, #institutionUsageReport, .alerts, #institutionUsageReport, .device-pairing__devices, .admin-manage-alerts, #pairingManagmentWidgetId, #holdingsForm"),L=document.querySelector(".tfa-form-container, .addresses, .emails-wrappers, .phones-wrappers, .social-email, .society-id-status, .claim-options li, .verify-phone-drawer .content, .request-username-form, .eCommerceAccessEntitlementWidget"),G=document.querySelector('.commerceExplainer, [data-widget-def="eCommerceCartInfoWidget"], .eCommerceCartInfoWidget, [data-widget-def="eCommercePurchaseAccessWidget"], .eCommercePurchaseAccessWidget, [data-widget-def="eCommerceCheckoutIdentityWidget"], .eCommerceCheckoutIdentityWidget, [data-widget-def="eCommerceCheckoutSummaryWidget"], .eCommerceCheckoutSummaryWidget, [data-widget-def="eCommerceCheckoutBuyingItemsWidget"], .eCommerceCheckoutBuyingItemsWidget, [data-widget-def="eCommerceCheckoutTaxWidget"], .eCommerceCheckoutTaxWidget, [data-widget-def="eCommerceCheckoutRecentlyViewedItemsWidget"], .eCommerceCheckoutRecentlyViewedItemsWidget, #recentlytabcontent, [data-widget-def="eCommerceCheckoutRecommendedItemsWidget"], .eCommerceCheckoutRecommendedItemsWidget, [data-widget-def="eCommerceCheckoutSavedForLaterItemsWidget"], .eCommerceCheckoutSavedForLaterItemsWidget, [data-widget-def="eCommerceCheckoutPaymentWidget"], .eCommerceCheckoutPaymentWidget, [data-widget-def="eCommerceCheckoutShippingWidget"], .eCommerceCheckoutShippingWidget, [data-widget-def="eCommerceCheckoutBillingWidget"], .eCommerceCheckoutBillingWidget, [data-widget-def="eCommerceCheckoutAddToCartWidget"], .eCommerceCheckoutAddToCartWidget, .add-journal-to-cart'),j=document.querySelector(".refineSearch,.advanced-search, .facet, .range-slider, .search-result, .advanced-search, .searchResultContainer, #frmSearchResults, #frmSearch, #searchResultsAll, #searchResults, .searchResult, .search-result, #searchResultContent"),N=document.querySelector(".js-editable, .js-counter, .sortable-table, .autosave-form, .pd-pdf, .pd-action-bar, .submission-authors, .basic-metadata, .funders, .draftForm, .taxonomies-input-group, .submission-list, .supplemental-files, .supplemental-links, .author-index, .authorsHistoryWidget, .advisorActionRecords, .scp"),F={},Z.prev=2,!t.length){Z.next=7;break}return Z.next=6,r.e(42).then(r.t.bind(null,415,7));case 6:F.panzoomPromise=Z.sent;case 7:Z.next=12;break;case 9:Z.prev=9,Z.t0=Z.catch(2),console.error(Z.t0);case 12:if(Z.prev=12,!n.length){Z.next=17;break}return Z.next=16,r.e(41).then(r.t.bind(null,416,7));case 16:F.magicsuggestPromise=Z.sent;case 17:Z.next=22;break;case 19:Z.prev=19,Z.t1=Z.catch(12),console.error(Z.t1);case 22:if(Z.prev=22,!a.length){Z.next=28;break}return Z.next=26,r.e(31).then(r.t.bind(null,417,7));case 26:F.transplantPromise=Z.sent,e.transplant.init(a);case 28:Z.next=33;break;case 30:Z.prev=30,Z.t2=Z.catch(22),console.error(Z.t2);case 33:if(Z.prev=33,!o.length){Z.next=39;break}return Z.next=37,r.e(15).then(r.t.bind(null,418,7));case 37:F.listPromise=Z.sent,e.list.init(o);case 39:Z.next=44;break;case 41:Z.prev=41,Z.t3=Z.catch(33),console.error(Z.t3);case 44:if(Z.prev=44,!i.length){Z.next=50;break}return Z.next=48,r.e(30).then(r.t.bind(null,419,7));case 48:F.toggleTablePromise=Z.sent,e.toggleTable.init(i);case 50:Z.next=55;break;case 52:Z.prev=52,Z.t4=Z.catch(44),console.error(Z.t4);case 55:if(Z.prev=55,!s.length){Z.next=60;break}return Z.next=59,r.e(3).then(r.t.bind(null,420,7));case 59:F.audioPlayerPromise=Z.sent;case 60:Z.next=65;break;case 62:Z.prev=62,Z.t5=Z.catch(55),console.error(Z.t5);case 65:if(Z.prev=65,!l.length){Z.next=71;break}return Z.next=69,r.e(2).then(r.t.bind(null,421,7));case 69:F.alertPopupPromise=Z.sent,e.alertPopup.init(l);case 71:Z.next=76;break;case 73:Z.prev=73,Z.t6=Z.catch(65),console.error(Z.t6);case 76:if(Z.prev=76,!u.length){Z.next=82;break}return Z.next=80,r.e(35).then(r.bind(null,422));case 80:F.figureViewerPromise=Z.sent,e.figureViewer.init(u);case 82:Z.next=87;break;case 84:Z.prev=84,Z.t7=Z.catch(76),console.error(Z.t7);case 87:if(Z.prev=87,!d.length){Z.next=93;break}return Z.next=91,r.e(28).then(r.t.bind(null,423,7));case 91:F.sidebarSectionsPromise=Z.sent,e.sidebarSections.init(d);case 93:Z.next=98;break;case 95:Z.prev=95,Z.t8=Z.catch(87),console.error(Z.t8);case 98:if(Z.prev=98,!h.length){Z.next=104;break}return Z.next=102,r.e(10).then(r.bind(null,425));case 102:F.datepickerPromise=Z.sent,e.datepicker.init(h);case 104:Z.next=109;break;case 106:Z.prev=106,Z.t9=Z.catch(98),console.error(Z.t9);case 109:if(Z.prev=109,!m.length){Z.next=115;break}return Z.next=113,r.e(36).then(r.bind(null,427));case 113:F.fileUploaderPromise=Z.sent,e.fileUploader.init(m);case 115:Z.next=120;break;case 117:Z.prev=117,Z.t10=Z.catch(109),console.error(Z.t10);case 120:if(Z.prev=120,!p.length){Z.next=125;break}return Z.next=124,r.e(9).then(r.bind(null,428));case 124:F.dashboardToolbarPromise=Z.sent;case 125:Z.next=130;break;case 127:Z.prev=127,Z.t11=Z.catch(120),console.error(Z.t11);case 130:if(Z.prev=130,!f.length){Z.next=136;break}return Z.next=134,r.e(12).then(r.t.bind(null,429,7));case 134:F.favoritesPromise=Z.sent,e.favorites.init(f);case 136:Z.next=141;break;case 138:Z.prev=138,Z.t12=Z.catch(130),console.error(Z.t12);case 141:if(Z.prev=141,!y.length){Z.next=147;break}return Z.next=145,r.e(19).then(r.bind(null,806));case 145:F.loiPromise=Z.sent,e.loi.init(y);case 147:Z.next=152;break;case 149:Z.prev=149,Z.t13=Z.catch(141),console.error(Z.t13);case 152:if(Z.prev=152,!g){Z.next=157;break}return Z.next=156,Promise.all([r.e(33),r.e(4)]).then(r.bind(null,804));case 156:F.axelPublicationContentPromise=Z.sent;case 157:Z.next=162;break;case 159:Z.prev=159,Z.t14=Z.catch(152),console.error(Z.t14);case 162:if(Z.prev=162,!v.length){Z.next=167;break}return Z.next=166,r.e(11).then(r.t.bind(null,710,7));case 166:F.disableADBlockerPromise=Z.sent;case 167:Z.next=172;break;case 169:Z.prev=169,Z.t15=Z.catch(162),console.error(Z.t15);case 172:if(Z.prev=172,!b.length){Z.next=178;break}return Z.next=176,Promise.all([r.e(1),r.e(16)]).then(r.bind(null,809));case 176:F.listOfIssuesAccordionPromise=Z.sent,e.listOfIssuesAccordion.init(b);case 178:Z.next=183;break;case 180:Z.prev=180,Z.t16=Z.catch(172),console.error(Z.t16);case 183:if(Z.prev=183,!x.length){Z.next=193;break}return Z.next=187,r.e(13).then(r.bind(null,744));case 187:return F.ipRangesPromise=Z.sent,Z.next=190,F.ipRangesPromise;case 190:B=Z.sent,T=B.default,e.ipRanges=x.map((function(e){return new T(e).initialize()}));case 193:Z.next=198;break;case 195:Z.prev=195,Z.t17=Z.catch(183),console.error(Z.t17);case 198:if(Z.prev=198,!k.length){Z.next=204;break}return Z.next=202,r.e(29).then(r.t.bind(null,745,7));case 202:F.tocPromise=Z.sent,e.toc.init(k);case 204:Z.next=209;break;case 206:Z.prev=206,Z.t18=Z.catch(198),console.error(Z.t18);case 209:if(Z.prev=209,!w.length){Z.next=219;break}return Z.next=213,r.e(8).then(r.bind(null,746));case 213:return F.crossPublishersRecommendationsPromise=Z.sent,Z.next=216,F.crossPublishersRecommendationsPromise;case 216:q=Z.sent,O=q.default,e.crossPublishersRecommendations=w.map((function(e){return new O(e).initialize()}));case 219:Z.next=224;break;case 221:Z.prev=221,Z.t19=Z.catch(209),console.error(Z.t19);case 224:if(Z.prev=224,!P.length){Z.next=234;break}return Z.next=228,r.e(21).then(r.bind(null,747));case 228:return F.optimizerPromise=Z.sent,Z.next=231,F.optimizerPromise;case 231:M=Z.sent,z=M.default,e.optimizer=new z(P).initialize();case 234:Z.next=239;break;case 236:Z.prev=236,Z.t20=Z.catch(224),console.error(Z.t20);case 239:if(Z.prev=239,!C.length){Z.next=249;break}return Z.next=243,r.e(22).then(r.bind(null,748));case 243:return F.previewPromise=Z.sent,Z.next=246,F.previewPromise;case 246:D=Z.sent,U=D.default,e.preview=C.map((function(e){return new U(e).initialize()}));case 249:Z.next=254;break;case 251:Z.prev=251,Z.t21=Z.catch(239),console.error(Z.t21);case 254:if(Z.prev=254,!A){Z.next=259;break}return Z.next=258,r.e(26).then(r.t.bind(null,749,7));case 258:F.shibbolethPromise=Z.sent;case 259:Z.next=264;break;case 261:Z.prev=261,Z.t22=Z.catch(254),console.error(Z.t22);case 264:if(Z.prev=264,!E.length){Z.next=269;break}return Z.next=268,r.e(37).then(r.bind(null,750));case 268:F.jcfPromise=Z.sent;case 269:Z.next=274;break;case 271:Z.prev=271,Z.t23=Z.catch(264),console.error(Z.t23);case 274:if(Z.prev=274,!I){Z.next=284;break}return Z.next=278,r.e(32).then(r.bind(null,757));case 278:return F.truncatePromise=Z.sent,Z.next=281,F.truncatePromise;case 281:V=Z.sent,(0,V.default)(e);case 284:Z.next=289;break;case 286:Z.prev=286,Z.t24=Z.catch(274),console.error(Z.t24);case 289:if(Z.prev=289,!S){Z.next=299;break}return Z.next=293,r.e(47).then(r.bind(null,800));case 293:return F.tabsPromise=Z.sent,Z.next=296,F.tabsPromise;case 296:$=Z.sent,(0,$.default)(e);case 299:Z.next=304;break;case 301:Z.prev=301,Z.t25=Z.catch(289),console.error(Z.t25);case 304:if(Z.prev=304,!W){Z.next=314;break}return Z.next=308,r.e(46).then(r.bind(null,807));case 308:return F.slideshowPromise=Z.sent,Z.next=311,F.slideshowPromise;case 311:Y=Z.sent,(0,Y.default)(e);case 314:Z.next=319;break;case 316:Z.prev=316,Z.t26=Z.catch(304),console.error(Z.t26);case 319:if(Z.prev=319,!R){Z.next=329;break}return Z.next=323,Promise.all([r.e(1),r.e(44)]).then(r.bind(null,802));case 323:return F.profilePromise=Z.sent,Z.next=326,F.profilePromise;case 326:J=Z.sent,(0,J.default)(e);case 329:Z.next=334;break;case 331:Z.prev=331,Z.t27=Z.catch(319),console.error(Z.t27);case 334:if(Z.prev=334,!L){Z.next=344;break}return Z.next=338,Promise.all([r.e(0),r.e(39),r.e(17)]).then(r.bind(null,799));case 338:return F.literatumAuthPromise=Z.sent,Z.next=341,F.literatumAuthPromise;case 341:H=Z.sent,(0,H.default)(e);case 344:Z.next=349;break;case 346:Z.prev=346,Z.t28=Z.catch(334),console.error(Z.t28);case 349:if(Z.prev=349,!G){Z.next=359;break}return Z.next=353,Promise.all([r.e(0),r.e(40),r.e(18)]).then(r.bind(null,798));case 353:return F.literatumCommercePromise=Z.sent,Z.next=356,F.literatumCommercePromise;case 356:K=Z.sent,(0,K.default)(e);case 359:Z.next=364;break;case 361:Z.prev=361,Z.t29=Z.catch(349),console.error(Z.t29);case 364:if(Z.prev=364,!N){Z.next=374;break}return Z.next=368,c()(_regeneratorRuntime().mark((function _callee(){return _regeneratorRuntime().wrap((function _callee$(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([F.truncatePromise].filter((function(e){return!!e})));case 2:return e.next=4,r.e(43).then(r.bind(null,803));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),_callee)})))();case 368:return F.pdPromise=Z.sent,Z.next=371,F.pdPromise;case 371:Q=Z.sent,(0,Q.default)(e);case 374:Z.next=379;break;case 376:Z.prev=376,Z.t30=Z.catch(364),console.error(Z.t30);case 379:if(Z.prev=379,!j){Z.next=389;break}return Z.next=383,c()(_regeneratorRuntime().mark((function _callee2(){return _regeneratorRuntime().wrap((function _callee2$(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([F.truncatePromise].filter((function(e){return!!e})));case 2:return e.next=4,Promise.all([r.e(45),r.e(25)]).then(r.bind(null,801));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),_callee2)})))();case 383:return F.searchPromise=Z.sent,Z.next=386,F.searchPromise;case 386:X=Z.sent,(0,X.default)(e);case 389:Z.next=394;break;case 391:Z.prev=391,Z.t31=Z.catch(379),console.error(Z.t31);case 394:if(Z.prev=394,!_.length){Z.next=400;break}return Z.next=398,c()(_regeneratorRuntime().mark((function _callee3(){return _regeneratorRuntime().wrap((function _callee3$(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([F.truncatePromise].filter((function(e){return!!e})));case 2:return e.next=4,r.e(27).then(r.t.bind(null,796,7));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),_callee3)})))();case 398:F.showRecommendedPromise=Z.sent,e.showRecommended.init(_);case 400:Z.next=405;break;case 402:Z.prev=402,Z.t32=Z.catch(394),console.error(Z.t32);case 405:return Z.abrupt("return",F);case 406:case"end":return Z.stop()}}),_callee4,null,[[2,9],[12,19],[22,30],[33,41],[44,52],[55,62],[65,73],[76,84],[87,95],[98,106],[109,117],[120,127],[130,138],[141,149],[152,159],[162,169],[172,180],[183,195],[198,206],[209,221],[224,236],[239,251],[254,261],[264,271],[274,286],[289,301],[304,316],[319,331],[334,346],[349,361],[364,376],[379,391],[394,402]])})));return function main(t){return e.apply(this,arguments)}}();t.default=i}}]);
//# sourceMappingURL=vendors~dynamic-imports-3b829964369a45ab5bf0.js.map