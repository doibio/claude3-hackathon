//v185 Copyright (c) 2008-2023 33Across Inc. All Rights Reserved

Tynt=window.Tynt||[];
(function(){var d=window,m=document,h={distro:"AFSH",id:"AFSH-"+(new Date).getTime()};Tynt.AFSHL=!0;Date.now||(Date.now=function(){return(new Date).getTime()});var e={_maxRef:600,_idMacro:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",init:function(){this._icUrl=h.protocol+(Tynt.e||"")+"ic.tynt.com";this._debUrl=h.protocol+(Tynt.e||"")+"de.tynt.com/deb/v2";this._sicUrl=h.protocol+(Tynt.e||"")+"cdn-sic.33across.com/1/javascripts/sic.js";this._apUrl=h.protocol+(Tynt.e||"")+"cdn-ap.33across.com/javascripts/ap.js";
this._chmob=this._chua=this._chuav=this._chm=this._chpv=this._chp="";this.init.fbl=function(a,c){if(c)for(var g=0;g<c.length;++g)0<g&&(e[a]+=", "),e[a]+=c[g].brand+";v="+c[g].version};var a=navigator.userAgentData;"undefined"!=typeof a&&("undefined"!=typeof a.getHighEntropyValues&&(this._chpv="pending",a.getHighEntropyValues(["model","platformVersion","fullVersionList"]).then(function(a){e._chm=a.model;e._chpv=a.platformVersion;e.init.fbl("_chuav",a.fullVersionList)})),this._chp=a.platform,this._chmob=
a.mobile,this.init.fbl("_chua",a.brands))},newEle:function(a,b,c,g){g=g||window;a=g.document.createElement(a);b&&this.extend(a,b);c&&this.extend(a.style,c);return a},injectScript:function(a,b,c){b=b||window;a=this.newEle("script",{async:"async",referrerPolicy:"unsafe-url",type:"text/javascript",src:a},null,b);this.insertEle(a,c||b.document.getElementsByTagName("script")[0])},injectSicScript:function(a){this.injectScript(this._sicUrl,window,a)},injectApolloScript:function(){this.injectScript(this._apUrl)},
injectSicIframe:function(a,b,c){var g={width:a.width+"px",height:a.height+"px",border:"0 none",margin:"0"};c&&this.extend(g,c);c=this.newEle("iframe",{referrerPolicy:"unsafe-url",src:"about:blank",frameBorder:"0",frameSpacing:"0",scrolling:"no"},g);this.insertEle(c,b);a.iframeId=this.eleId(c);a.sicWindow=c.contentWindow;a=c.contentWindow.document;a.open();a.write('<!DOCTYPE html><html><head><style type="text/css">*{margin:0;padding:0;}</style></head><body><script type="text/javascript">window.Tynt = window.parent.Tynt;\x3c/script><script type="text/javascript" src="'+
this._sicUrl+'">\x3c/script></body></html>');a.close()},insertEle:function(a,b){b?"script"==b.tagName.toLowerCase()?b.parentNode.insertBefore(a,b):b.appendChild(a):document.body.appendChild(a)},eleId:function(a){var b=a.id;b||(b="x33x"+Date.now(),a.id=b);return b},_imgs:[],injectPixel:function(a,b,c){var g;try{g=m.createElement("img")}catch(d){g=document.createElement("img")}g&&(this._imgs.push(g),b&&(g.onload=b),c&&(g.onerror=c),g.referrerPolicy="unsafe-url",g.src=a)},docUrl:function(){var a=this.getLink("canonical");
a||(a=this.getMeta("property","og:url","name","original-source"));if(a){if(0!=a.indexOf("http")){var b=h.protocol+d.location.host+d.location.pathname,c=m.getElementsByTagName("base")[0];c&&(c=c.getAttribute("href"))&&(b=c);"/"==a.charAt(0)?(c=b.indexOf("/",9),-1<c&&(b=b.slice(0,c))):(c=b.lastIndexOf("/"),b=9<c?b.slice(0,c+1):b+"/");a=b+a}return a}return""},getMeta:function(a,b,c,g){var d,e=null,f=null,n=m.getElementsByTagName("meta");for(d=0;d<n.length;++d)e||n[d].getAttribute(a)!==b?c&&!f&&n[d].getAttribute(c)===
g&&(f=n[d].getAttribute("content")||null):e=n[d].getAttribute("content")||null;return e||f},getLink:function(a,b){var c,d,e=m.getElementsByTagName("link");for(c=0;c<e.length;++c)if(d=e[c].getAttribute("rel"),e[c].getAttribute("href")&&d&&(!b&&0<=d.indexOf(a)||b&&d==a))return e[c].href;return null},extend:function(a,b){var c,d;for(c=1;c<arguments.length;++c)for(d in arguments[c])arguments[c].hasOwnProperty(d)&&(a[d]=arguments[c][d]);return a},isArray:function(a){return"undefined"!=typeof a&&"[object Array]"===
Object.prototype.toString.call(a)},inArray:function(a,b){return 0<=this.indexOf(a,b)},toArray:function(a,b){return Array.prototype.slice.call(a,b||0)},indexOf:function(a,b){if(a.indexOf)return a.indexOf(b);for(var c=0;c<a.length;++c)if(a[c]===b)return c;return-1},unique:function(a){var b,c={},d=[];for(b=0;b<a.length;++b)c[a[b]]||(c[a[b]]=!0,d.push(a[b]));return d},iframeType:function(){var a=this.iframeEle(),b=u;if(a)b=a.id&&0<=a.id.search(/google_ads?_i?frame/)?6:v;else try{window!=window.top&&(b=
"undefined"!=typeof window.$sf?w:r)}catch(c){b=r,e.clog("iframeType: "+c.message)}return b},iframeEle:function(a){var b=null;a=a||window;try{b=a.frameElement}catch(c){}return b},iframeTop:function(){var a=window,b=null;try{for(;a!=window.top;)b=a,a=a.parent}catch(c){return null}return b?this.iframeEle(b):null},getTopWin:function(){var a=window;try{for(;a.parent!==a&&a.parent.document;)a=a.parent}catch(b){}return a},isolated:function(){var a=!0;try{"function"==typeof window.top.open&&(a=!1)}catch(b){}return a},
tyntIds:function(){return this.unique(Tynt).join("~")},getPubId:function(){for(var a=null,b=0;b<Tynt.length;++b)if("string"==typeof Tynt[b]&&22==Tynt[b].length&&0>Tynt[b].indexOf("!")){a=Tynt[b];break}return a},countIds:function(a){var b,c=0;for(b=0;b<Tynt.length;++b)Tynt[b]===a&&++c;return c},_log:function(a){"undefined"==typeof Tynt.debug&&0<d.location.search.indexOf("__tcdebugmode=1")&&d.console&&d.console.log&&(Tynt.debug=!0);if(!0===Tynt.debug||1===Tynt.debug)a.unshift("[TC]"),d.console.log.apply(d.console,
a)},log:function(){h.inXOIframe()?this.clog.apply(this,arguments):this._log(this.toArray(arguments))},clog:function(){var a=this.toArray(arguments);a.unshift(h.id);this._log(a)},callIcU:function(){d._33Across.state.icDone=x;e.clog("Calling IC/U");this.injectPixel(this._icUrl+"/u",function(){d._33Across.state.icDone=q})},callIcCb:function(){var a,b,c,g,p,f;if(!d._33Across.state.icDone){d._33Across.state.icDone=x;b=this.getCookie(m.cookie,"tracertraffic");a=d.location.hash;a=/tynt=/.test(a)?a.match(/tynt=?([^?&$#]*)/)[1]:
!1;var k=this.getPrivacyParameters();g=c=this._icUrl+"/b/p?id="+this.tyntIds()+(b?"&et="+b:"")+(a?"&a="+a:"")+("string"==typeof Tynt.b?"&b="+Tynt.b:"")+"&lm="+h.type+"&ts="+Date.now()+"&dn="+h.distro+"&iso="+(this.isolated()?"1":"0")+k+"&pu="+encodeURIComponent(this.trunc(this.pageUrl(),e._maxRef));(a=this.getMeta("property","og:title"))&&a!=m.title&&(g+="&ct="+encodeURIComponent(this.trunc(a,200)));p=g;m.referrer&&(a=this.trunc(m.referrer,this._maxRef),p+="&r="+encodeURIComponent(a));f=p;if(a=m.title||
d.location.hostname)a=this.trim(this.trunc(a,200)),f+="&t="+encodeURIComponent(a);b=this.clientHints(f);e.callIcCb.rsp=function(){d._33Across.state.icDone=q};e.clog("Calling IC");this.injectPixel(b,e.callIcCb.rsp,function(){e.injectPixel(f,e.callIcCb.rsp,function(){e.injectPixel(p,e.callIcCb.rsp,function(){e.injectPixel(g,e.callIcCb.rsp,function(){e.injectPixel(c,e.callIcCb.rsp)})})})})}},callIc:function(){this.when(function(){return"pending"!=e._chpv},this.callIcCb,{timeout:300,timeoutCallback:this.callIcCb},
this)},callDeb:function(a,b,c){function g(a,b){e.clog("Calling DEB "+b+(a?"":" on IC timeout"));var c=encodeURIComponent(e.trunc(m.referrer,e._maxRef)),g=this.getPrivacyParameters(),f;f=this.clientHints("");e.injectScript(e._debUrl+"?id="+e.tyntIds()+"&dn="+h.distro+"&cc="+b+f+"&r="+c+g+"&pu="+encodeURIComponent(e.trunc(e.pageUrl(),e._maxRef)),d)}"undefined"==typeof a&&(a=1);d._33Across.state.deDone>=a||(++d._33Across.state.deDone,1!==d._33Across.state.deDone&&!0!==c||this.when(function(){return d._33Across.state.icDone==
q},g,{timeout:300,timeoutCallback:g,callbackData:d._33Across.state.deDone},this),b&&0<b.length&&setTimeout(function(){e.callDeb(a,b,!0)},b.shift()))},callDebX:function(a,b){function c(a,c){e[b?"log":"clog"]("Calling DEBx "+c+(a?"":" on IC timeout"));var f=encodeURIComponent(e.trunc(m.referrer,e._maxRef)),k=this.getPrivacyParameters(),n;n=this.clientHints("");e.injectScript(e._debUrl+"?m=xch&id="+e.tyntIds()+"&dn="+h.distro+"&cc="+c+n+"&r="+f+k+"&pu="+encodeURIComponent(e.trunc(e.pageUrl(),e._maxRef)),
d)}a||(a=10);d._33Across.state.dxDone>=a||(++d._33Across.state.dxDone,this.when(function(){return d._33Across.state.icDone==q},c,{timeout:300,timeoutCallback:c,callbackData:d._33Across.state.dxDone},this))},jsonDecode:function(a){if("function"!=typeof Array.prototype.toJSON)return JSON.stringify(a);var b=Array.prototype.toJSON;delete Array.prototype.toJSON;a=JSON.stringify(a);Array.prototype.toJSON=b;return a},getCookie:function(a,b){for(var c=b+"=",d=a.split(";"),e=0;e<d.length;e++){for(var f=d[e];" "==
f.charAt(0);)f=f.substring(1,f.length);if(0==f.indexOf(c))return f.substring(c.length,f.length)}return null},trim:function(a){return a.replace(/^\s+|\s+$/g,"")},trunc:function(a,b){var c,d;if(!a||a.length<=b)return a;c=a.substring(0,b);for(d=1;3>=d;++d)if("%"==c.charAt(c.length-d))return c.substring(0,c.length-d);return c},when:function(a,b,c,g){var e,f,h,n=null,k=null,l=a();c=c||{};e=c.interval||50;f=c.timeout;h=c.timeoutCallback||function(){};if(l)return b.call(g,l,c.callbackData),!0;n=d.setInterval(function(){if(l=
a())d.clearInterval(n),d.clearTimeout(k),b.call(g,l,c.callbackData)},e);f&&(k=d.setTimeout(function(){d.clearInterval(n);h.call(g,l,c.callbackData)},f));return!1},prob:function(a){a=parseFloat(a)||0;return Math.random()<a},on:function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},off:function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d||!1):a.detachEvent&&a.detachEvent("on"+b,c)},pageUrl:function(){return h.inXOIframe()?m.referrer:
d.location.href},clientHints:function(a){"pending"!=this._chpv&&(this._chm&&(a+="&chm="+encodeURIComponent(this._chm)),this._chpv&&(a+="&chpv="+encodeURIComponent(this._chpv)),this._chuav&&(a+="&chuav="+encodeURIComponent(this._chuav)));this._chp&&(a+="&chp="+encodeURIComponent(this._chp));"boolean"==typeof this._chmob&&(a+="&chmob="+(this._chmob?"1":"0"));this._chua&&(a+="&chua="+encodeURIComponent(this._chua));return a},getPrivacyParameters:function(){return("string"==typeof t.uspString?"&us_privacy="+
t.uspString:"")+("string"==typeof f.gppString?"&gpp="+f.gppString:"")+(Array.isArray(f.gppSid)&&0<f.gppSid.length?"&gpp_sid="+f.gppSid.join(","):"")},getUrlArgs:function(){var a,b,c,d=[];a=location.href.indexOf("?");if(-1!=a)for(b=location.href.substring(a+1,location.href.length).split("&"),a=0;a<b.length;a++)c=b[a].split("="),d[c[0]]=c[1];return d}},t={uspString:null,init:function(){var a=this,b=function(){for(var a=window,b;!b;){try{a.frames.__uspapiLocator&&(b=a)}catch(c){}if(a===window.top)break;
a=a.parent}var g={};d.__uspapi=function(a,c,d){if(b){var e="usp-"+Math.random();a={__uspapiCall:{command:a,callId:e,version:c}};g[e]=d;b.postMessage(a,"*")}else d({msg:"__uspapi not found"},!1)};e.on(window,"message",function(a){var b=a.data;if("string"===typeof a.data)try{b=JSON.parse(a.data)}catch(c){}b.__uspapiReturn&&(a=b.__uspapiReturn,g[a.callId](a.returnValue,a.success),delete g[a.callId])},!1)},c=function(){d.__uspapi("getUSPData",1,function(b,c){c&&(a.uspString=b.uspString)})};d.__uspapi||
b();try{c()}catch(g){b(),c()}Tynt.getUspString=function(){return a.uspString};Tynt.getConsentString=function(){return null}}},f={gppSid:[],gppString:null,gppPromise:null,cmpWindow:null,cmpFound:!1,timeoutMs:1E4,findCmpWindow:function(){for(var a=window,b=null;!b;){try{a.frames.__gppLocator&&(b=a)}catch(c){}if(a===window.top)break;a=a.parent}return f.cmpWindow=b},createCmpProxy:function(){var a={};d.__gpp=function(b,c,d,e){if(f.cmpWindow){var h="33x-gpp-"+Math.random();b={__gppCall:{command:b,parameter:d,
version:e,callId:h}};"function"==typeof c&&(a[h]=c);f.cmpWindow.postMessage(b,"*")}else"function"==typeof c&&c("__gppLocator not found",!1)};e.on(window,"message",function(b){var c=b.data;if("string"===typeof b.data)try{c=JSON.parse(b.data)}catch(d){c=null,e.log("JSON.parse exception:",b.data)}c&&c.__gppReturn&&(b=c.__gppReturn,a[b.callId](b.returnValue,b.success),delete a[b.callId])},!1)},isAppSec:function(a){return a&&Array.isArray(a.applicableSection)&&0<a.applicableSection.length&&0!==a.applicableSection[0]},
isAppSecs:function(a){return a&&Array.isArray(a.applicableSections)&&0<a.applicableSections.length&&0!==a.applicableSections[0]},getApplicableSections:function(a){return f.isAppSecs(a)?a.applicableSections:f.isAppSec(a)?a.applicableSection:[]},startListening:function(){e.log("startListening");var a=d.__gpp("addEventListener",f.handleEvent);a&&e.log("startListening, event returned:",a);a&&a.pingData&&"1.1"!=a.pingData.gppVersion&&f.handleEvent(a)},handleEvent:function(a){if(a&&a.pingData){var b=a.pingData;
e.log("handleEvent",b.gppVersion,a);"loaded"==b.cmpStatus&&("1.1"==b.gppVersion?b.gppString&&b.applicableSections&&f.receiveData(b):f.receiveData(d.__gpp("getGPPData")))}else e.log("handleEvent:",a)},nullData:function(){return{gpp:null,gppSid:[],usp:"function"===typeof Tynt.getUspString?Tynt.getUspString():null,coppa:null,gdpr:null}},init:function(){Tynt.getPrivacySignals=function(){null==f.gppPromise&&(f.gppPromise=new Promise(function(a,c){var d=null;f.cmpFound?d=setTimeout(function(){e.log("_gpp timed-out after "+
f.timeoutMs/1E3+" seconds.");a(f.nullData())},f.timeoutMs):a(f.nullData());f.receiveData=function(c){c&&(f.gppString=c?c.gppString:null,f.gppSid=f.getApplicableSections(c),null!=f.gppString&&(clearTimeout(d),a({gpp:"string"===typeof f.gppString?f.gppString:null,gppSid:f.gppSid,usp:"function"===typeof Tynt.getUspString?Tynt.getUspString():null,coppa:null,gdpr:null})))}}));return f.gppPromise};f.cmpFound="function"===typeof d.__gpp;if(!f.cmpFound){var a=d.location.search;"object"===typeof l&&0<a.indexOf("__tcgppver=1.0")?
l.init():"object"===typeof k&&0<a.indexOf("__tcgppver=1.1")&&k.init();f.cmpFound="function"===typeof d.__gpp}Tynt.getPrivacySignals().then(function(a){e.log("getPrivacySignals resolve:",a)},function(a){e.log("getPrivacySignals reject:",a)});"function"===typeof d.__gpp?f.startListening():h.inIframe()&&h.isolated?null==f.findCmpWindow()?e.log("CMP API not found in frame ancestors."):(f.cmpFound=!0,f.createCmpProxy(),f.startListening()):e.log("CMP API not found in _window.")}},l={pingData:{gppVersion:"1.0",
cmpStatus:"stub",cmpDisplayStatus:"hidden",supportedAPIs:["tcfeuv2","tcfcav1","uspv1"],cmpId:0},mockEvent:function(a,b){var c={eventName:a,listenerId:0,data:b,pingData:l.pingData};e.log("mockEvent",a,b,l.pingData);for(var g=0;g<d.__gpp.events.length;g++)"function"===typeof d.__gpp.events[g].callback&&(c.listenerId=g,d.__gpp.events[g].callback(c,!0))},init:function(){d.__gpp_addFrame_33=function(a){if(!d.frames[a])if(document.body){var b=document.createElement("iframe");b.style.cssText="display:none";
b.name=a;document.body.appendChild(b)}else d.setTimeout(d.__gpp_addFrame_33,10,a)};d.__gpp_mock_33=function(){var a=arguments;if(!a.length)return null;var b=a[0],c=1<a.length?a[1]:null,a=2<a.length?a[2]:null,g=null;if("ping"===b)g=l.pingData;else if("addEventListener"===b)b=++d.__gpp.lastId,d.__gpp.events.push({id:b,callback:c,parameter:a}),g={eventName:"listenerRegistered",listenerId:b,data:!0,pingData:l.pingData};else if("removeEventListener"===b){c=!1;for(b=0;b<d.__gpp.events.length;b++)if(d.__gpp.events[b].id==
a){d.__gpp.events[b].splice(b,1);c=!0;break}g={eventName:"listenerRemoved",listenerId:a,data:c,pingData:l.pingData}}else"getGPPData"===b?"loaded"==l.pingData.cmpStatus?(c=e.getUrlArgs(),a=c.__tcgppstr?c.__tcgppstr:"DBABzw~1YNY~BVQqAAAAAgA",c=(c.__tcgppsid?c.__tcgppsid:"6,7").split(",").map(function(a){return Number(a)}),g={sectionId:3,gppVersion:1,sectionList:c,applicableSections:c,gppString:a,pingData:l.pingData}):g=null:g=null;return g};d.__gpp_msgHandler_33=function(a){var b,c="string"===typeof a.data;
try{b=c?JSON.parse(a.data):a.data}catch(e){b=null}if("object"===typeof b&&null!==b&&"__gppCall"in b){var f=b.__gppCall;d.__gpp(f.command,function(b,d){var e={__gppReturn:{returnValue:b,success:d,callId:f.callId}};a.source.postMessage(c?JSON.stringify(e):e,"*")},"parameter"in f?f.parameter:null,"version"in f?f.version:1)}};d.__gpp=d.__gpp_mock_33;d.__gpp.queue=[];d.__gpp.events=[];d.__gpp.lastId=0;d.addEventListener("message",d.__gpp_msgHandler_33,!1);d.__gpp_addFrame_33("__gppLocator");setTimeout(function(){l.pingData.cmpStatus=
"loading";l.mockEvent("cmpStatus","loading");setTimeout(function(){l.pingData.cmpId=3333;l.pingData.cmpStatus="loaded";l.mockEvent("cmpStatus","loaded")},1E3)},1E3)}},k={pingData:{gppVersion:"1.1",cmpStatus:"stub",cmpDisplayStatus:"hidden",signalStatus:"not ready",supportedAPIs:["2:tcfeuv2","5:tcfcav1","6:uspv1"],cmpId:0,sectionList:[],applicableSections:[-1],gppString:"",parsedSections:{}},mockEvent:function(a,b){var c={eventName:a,listenerId:0,data:b,pingData:k.pingData};e.log("mockEvent",a,b,k.pingData);
for(var f=0;f<d.__gpp.events.length;f++)"function"===typeof d.__gpp.events[f].callback&&(c.listenerId=f,d.__gpp.events[f].callback(c,!0))},init:function(){d.__gpp_addFrame_33=function(a){if(!d.frames[a])if(document.body){var b=document.createElement("iframe");b.style.cssText="display:none";b.name=a;document.body.appendChild(b)}else d.setTimeout(d.__gpp_addFrame_33,10,a)};d.__gpp_mock_33=function(){var a=arguments;if(a.length){var b=a[0],c=1<a.length?a[1]:null,a=2<a.length?a[2]:null;if("ping"===b)"function"===
typeof c&&c(k.pingData,!0);else if("addEventListener"===b)b=++d.__gpp.lastId,d.__gpp.events.push({id:b,callback:c,parameter:a}),"function"===typeof c&&c({eventName:"listenerRegistered",listenerId:b,data:!0,pingData:k.pingData},!0);else if("removeEventListener"===b){for(var b=!1,e=0;e<d.__gpp.events.length;e++)if(d.__gpp.events[e].id==a){d.__gpp.events[e].splice(e,1);b=!0;break}"function"===typeof c&&c(b,!0)}}};d.__gpp_msgHandler_33=function(a){var b,c="string"===typeof a.data;try{b=c?JSON.parse(a.data):
a.data}catch(e){b=null}if("object"===typeof b&&null!==b&&"__gppCall"in b){var f=b.__gppCall;d.__gpp(f.command,function(b,d){var e={__gppReturn:{returnValue:b,success:d,callId:f.callId}};a.source.postMessage(c?JSON.stringify(e):e,"*")},"parameter"in f?f.parameter:null,"version"in f?f.version:"1.1")}};d.__gpp=d.__gpp_mock_33;d.__gpp.queue=[];d.__gpp.events=[];d.__gpp.lastId=0;d.addEventListener("message",d.__gpp_msgHandler_33,!1);d.__gpp_addFrame_33("__gppLocator");setTimeout(function(){k.mockEvent("signalStatus",
"not ready");setTimeout(function(){k.pingData.cmpStatus="loading";k.mockEvent("cmpStatus","loading");setTimeout(function(){var a=e.getUrlArgs(),b=a.__tcgppstr?a.__tcgppstr:"DBABzw~1YNY~BVQqAAAAAgA",a=(a.__tcgppsid?a.__tcgppsid:"6,7").split(",").map(function(a){return Number(a)});k.pingData.sectionList=a;k.pingData.applicableSections=a;k.pingData.gppString=b;k.pingData.cmpId=3333;k.pingData.cmpStatus="loaded";k.mockEvent("cmpStatus","loaded");setTimeout(function(){k.pingData.signalStatus="ready";k.mockEvent("signalStatus",
"ready")},1E3)},1E3)},1E3)},1E3)}},x=1,q=2,u=0,r=3,w=4,v=5;h.type=0;h.inIframe=function(){return this.type>u};h.inSOIframe=function(){return this.type>=v&&6>=this.type};h.inXOIframe=function(){return this.type>=r&&this.type<=w};h.init=function(){this.type=e.iframeType();this.inSOIframe()&&(d=e.getTopWin(),m=d.document);d._33Across||(d._33Across={});d._33Across.state||(d._33Across.state={icDone:0,deDone:0,dxDone:0,ivDone:!1});this.protocol="https://";e.init();this.isolated=e.isolated();t.init();f.init();
e.clog("xoi="+this.inXOIframe()+", soi="+this.inSOIframe()+", iso="+this.isolated);d._33Across.pvTs||(d._33Across.pvTs=Date.now())};h.init();h.inXOIframe()?e.clog("cross-origin iframes are not supported"):(e.callIc(),e.callDeb(1))})();