(window.webpackJsonp=window.webpackJsonp||[]).push([[81,8],{1005:function(e,t,r){"use strict";r.r(t);var n=r(13),o=(r(68),r(147),r(79),r(130),r(63),r(20)),c={name:"WebinarList",layout:"qklayoutc",data:function(){return{DataList:"",webName:"",qkName:"",router_id:"",showPagination:!1}},asyncData:function(e){return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,c,d,l,_;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.route,n=e.params,t.next=3,o.a.get("/webinar/index",{xRequestPath:n.id});case 3:return c=t.sent,t.next=6,o.a.get("/common/info?act=".concat(r.path),{xRequestPath:n.id});case 6:return d=t.sent,l=n.id,_="",_="evcna"==l?"Roundtables":"ir"==l||"microstructures"==l?"Forums":"Webinars",t.abrupt("return",{DataList:c.data.list,qkName:c.data.journal_path,metaData:d.data,webName:_});case 11:case"end":return t.stop()}}),t)})))()},head:function(){var e,t,r,n="https://www.oaepublish.com"+this.$route.path;return{title:this.metaData.title,link:[{rel:"canonical",href:n}],meta:[{name:"description",content:null===(e=this.metaData.description)||void 0===e?void 0:e.replace(/<[^>]+>/g,"")},{name:"keywords",content:null===(t=this.metaData.keywords)||void 0===t?void 0:t.replace(/<[^>]+>/g,"")},{name:"twitter:title",title:this.metaData.title},{name:"twitter:type",content:"OAE Publishing Inc."},{name:"twitter:description",content:null===(r=this.metaData.description)||void 0===r?void 0:r.replace(/<[^>]+>/g,"")},{property:"og:url",content:n},{property:"og:type",content:"OAE Publishing Inc."},{property:"og:site_name",title:this.metaData.title},{property:"og:title",title:this.metaData.title}]}},mounted:function(){}},d=(r(909),r(17)),component=Object(d.a)(c,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"article_cont"},[t("Breadcrumb",{attrs:{bread:"Webinars"}}),e._v(" "),t("div",{staticClass:"wrapper"},[e._l(e.DataList,(function(r,n){return t("div",{key:n,staticClass:"data_content"},[1==r.type?t("h2",{staticClass:"oae_header"},[e._v("Completed "+e._s(e.webName))]):e._e(),e._v(" "),2==r.type?t("h2",{staticClass:"oae_header"},[e._v("Ongoing "+e._s(e.webName))]):e._e(),e._v(" "),3==r.type?t("h2",{staticClass:"oae_header"},[e._v("Partner's Meeting")]):e._e(),e._v(" "),t("div",{staticClass:"line_list"}),e._v(" "),t("div",{staticClass:"data_list web_list"},[e._l(r.list,(function(i){return["164"!=i.id&&"149"!=i.id&&"144"!=i.id?t("div",{key:i.id,staticClass:"data_item"},[t("nuxt-link",{attrs:{to:"about"!=i.location_type?"/webinars/"+e.qkName+"."+i.id:"/"+e.$route.params.id+"/"+i.location_path}},[t("div",{staticClass:"item_top"},[t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i.list_image,expression:"i.list_image"}],attrs:{alt:""}})])])],1):e._e()]}))],2)])})),e._v(" "),0==e.DataList.length?t("div",{},[t("el-empty",{attrs:{description:" "}},[t("p",{staticStyle:{color:"#6d6d6d"}},[e._v("Coming soon")])])],1):e._e()],2)],1)}),[],!1,null,"54cf2163",null);t.default=component.exports;installComponents(component,{Breadcrumb:r(589).default})},587:function(e,t,r){e.exports={}},588:function(e,t,r){"use strict";r(587)},589:function(e,t,r){"use strict";r.r(t);r(80),r(68),r(73),r(83),r(84);var n=r(38),o=(r(45),r(72),r(85),r(42));function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var d={name:"Breadcrumb",props:["bread"],data:function(){return{breadOne:"",breadTwo:"",breadTre:""}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(o.b)(["NavName","top"])),created:function(){this.checkHref(this.NavName)},methods:{checkHref:function(e){var t=this,r=this.$route.path;e.length>0&&e.forEach((function(e){e.children?e.children.forEach((function(i){i.children?i.children.forEach((function(n){n.url==r&&(t.breadOne=e.name,t.breadTwo=i.name,t.breadTre=n.name)})):i.url==r&&(t.breadOne=e.name,t.breadTwo=i.name)})):e.url==r&&(t.breadOne=e.name)}))}}},l=d,_=(r(588),r(17)),component=Object(_.a)(l,(function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"art_bread wrapper"},[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/"+e.$route.params.id}}},[e._v("Home")]),e._v(" "),e.breadOne?t("el-breadcrumb-item",[e._v(e._s(e.breadOne))]):e._e(),e._v(" "),e.breadTwo?t("el-breadcrumb-item",[e._v(e._s(e.breadTwo))]):e._e(),e._v(" "),e.breadTre?t("el-breadcrumb-item",[e._v(e._s(e.breadTre))]):e._e(),e._v(" "),e.breadTre||e.breadTwo||e.breadOne?e._e():t("el-breadcrumb-item",[e._v(e._s(e.bread))])],1)],1),e._v(" "),t("div",{staticClass:"wrapper wrapper2"},[t("div",{staticClass:"top_line2"}),e._v(" "),e.breadTre?t("h1",{staticClass:"oae_header_tit"},[e._v(e._s(e.breadTre))]):e.breadTwo?t("h1",{staticClass:"oae_header_tit"},[e._v(e._s(e.breadTwo))]):e.breadOne?t("h1",{staticClass:"oae_header_tit"},[e._v(e._s(e.breadOne))]):e.breadTre||e.breadTwo||e.breadOne?e._e():t("h1",{staticClass:"oae_header_tit"},[e._v(e._s(e.bread))]),e._v(" "),t("div",{staticClass:"line_list_2"})])])}),[],!1,null,"68bbded6",null);t.default=component.exports},772:function(e,t,r){e.exports={}},909:function(e,t,r){"use strict";r(772)}}]);