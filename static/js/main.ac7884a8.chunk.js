(this.webpackJsonpblog_imki123=this.webpackJsonpblog_imki123||[]).push([[0],{105:function(e,t,a){},106:function(e,t,a){},108:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(24),l=a.n(r),o=a(3),i=a(4),s=(a(51),a(5));a(52);var m=c.a.memo((function(e){var t=c.a.useContext(A);return c.a.createElement("div",{id:"headerWrapper"},c.a.createElement("div",{id:"header"},c.a.createElement("div",{className:"hover",onClick:t.slideMenu},c.a.createElement("img",{id:"menu",alt:"MENU",src:"/images/guide_icon.png"})),c.a.createElement(o.b,{to:"/"},c.a.createElement("div",{id:"title",className:"hover"},c.a.createElement("img",{id:"logo",alt:"logo",src:"/images/imcat_64.png"}),"\ud589\ubcf5\ud55c \ucf54\ub529 \ube14\ub85c\uadf8 :D")),c.a.createElement("div",{className:"hover",onClick:function(){var e=document.querySelector("#settingWrapper");e&&("block"===e.style.display?e.style.display="none":e.style.display="block")}},t.login?"imki123"===t.login.username?c.a.createElement("img",{className:"profile",alt:"PROFILE",src:"/images/avatar_small.png"}):c.a.createElement("img",{className:"profile",alt:"PROFILE",src:"/images/dog"+(Math.floor(3*Math.random())+1)+".png"}):c.a.createElement("img",{className:"profile",alt:"PROFILE",src:"/images/noavatar.png"}))))}));a(57);var u=c.a.memo((function(e){return c.a.createElement("div",{id:"body"},e.children)})),d=(a(58),a(59),a(37)),p=a.n(d);var g=c.a.memo((function(e){var t=e.menus;return c.a.createElement(c.a.Fragment,null,t&&t.map((function(e){return c.a.createElement("div",{key:e.name},c.a.createElement(o.c,{exact:!0,to:"home"===e.name?"/":"/tags/".concat(e.name),className:"list",activeClassName:"activeList"},c.a.createElement("span",{className:"menuName"},e.name.substring(0,1).toUpperCase()+e.name.substring(1)),c.a.createElement("span",{className:"menuOptions"},c.a.createElement("span",{className:"menuCnt"},e.count),c.a.createElement("span",{className:"menuExpandIcon"},e.subMenus&&e.subMenus.length>=1&&c.a.createElement(p.a,null)))),e.subMenus&&e.subMenus.length>0&&e.subMenus.map((function(e){return c.a.createElement(o.c,{exact:!0,to:"/tags/".concat(e.name),className:"list subList",activeClassName:"activeList",key:e.name},c.a.createElement("span",{className:"menuName"},e.name.substring(0,1).toUpperCase()+e.name.substring(1)),c.a.createElement("span",{className:"menuOptions"},c.a.createElement("span",{className:"menuCnt"},e.count)))})))})))}));var h=c.a.memo((function(e){var t=c.a.useContext(A);return c.a.createElement("div",{id:"guideBack",onClick:function(e){var t=document.querySelector("#body"),a=document.querySelector("#guideWrapper"),n=document.querySelector("#content");a.parentNode.style.width="0",t.clientWidth<500?(a.style.left="-230px",n.style.width="calc(100% - 16px)"):n.style.width="calc(100% - 312px - 16px)"}},c.a.createElement("div",{id:"guideWrapper",className:"slideMenu"},c.a.createElement("div",{id:"avatar"},c.a.createElement("img",{alt:"avatar",src:"/images/avatar.png",title:"Hello :D"}),c.a.createElement("div",{id:"name"},"Im kiyoung"),c.a.createElement("div",{id:"nickName"},"imki123"),c.a.createElement("div",{id:"github"},c.a.createElement("a",{href:"https://github.com/imki123"},c.a.createElement("img",{alt:"github",src:"/images/GitHub-Mark-32px.png"})," ",c.a.createElement("span",null,"https://github.com/imki123"))),c.a.createElement("div",{id:"introduction"},"A web programmer who dreams of being a wise developer.")),c.a.createElement("div",{id:"menus"},c.a.createElement(g,{menus:t.menus}))))})),f=a(43),v=a.n(f),E=a(44),b=a.n(E),y=(a(61),a(14)),k=(a(62),a(19)),N=(a(68),a(6)),O=a.n(N);var C=c.a.memo((function(e){var t=c.a.useContext(A),a=e.comment,r=e.post,l=e.refreshComment,o=!1,i=a.publishedDate.substring(0,16).replace("T"," ");return Object(n.useEffect)((function(){document.querySelector("#comment_".concat(r.postId,"_").concat(a.commentId," textarea")).value=a.content}),[a,r]),c.a.createElement("div",{className:"commentWrapper",id:"comment_".concat(r.postId,"_").concat(a.commentId)},c.a.createElement("div",{className:"comment"},c.a.createElement("div",{className:"commentProfile"},a.username?"imki123"===a.username?c.a.createElement("img",{alt:"PROFILE",src:"/images/avatar_small.png"}):c.a.createElement("img",{alt:"PROFILE",src:"/images/dog"+(Math.floor(3*Math.random())+1)+".png"}):c.a.createElement("img",{alt:"PROFILE",src:"/images/noavatar.png"})),c.a.createElement("div",{className:"commentContent"},a.username===t.login.username?c.a.createElement("span",{className:"commentUsername",style:{fontWeight:"bold"}},a.username):c.a.createElement("span",{className:"commentUsername"},a.username),c.a.createElement("span",{className:"commentDate"}," - ",i," ",a.updated&&"(\uc218\uc815\ub428)"),c.a.createElement("textarea",{readOnly:!0,onChange:t.resizeTextarea}))),(a.username&&a.username===t.login.username||"imki123"===t.login.username)&&c.a.createElement("div",{className:"commentButtons"},c.a.createElement("button",{className:"commentButton",onClick:function(e){var t=document.querySelector("#comment_".concat(r.postId,"_").concat(a.commentId," textarea"));if(o){if(window.confirm("\ub313\uae00\uc744 \uc218\uc815\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){o=!1,t.classList.remove("updateMode"),t.readOnly=!0;var n="https://blog-imki123-backend.herokuapp.com"+"/comments/".concat(r.postId,"/").concat(a.commentId);O.a.patch(n,{withCredentials:!0,data:{content:t.value}}).then((function(e){console.log("".concat(a.commentId,"\ubc88 \ub313\uae00 \uc218\uc815 \uc131\uacf5")),l()})).catch((function(e){return alert(e)}))}}else o=!0,t.classList.add("updateMode"),t.readOnly=!1,t.focus()}},"\uc218\uc815"),c.a.createElement("button",{className:"commentButton",style:{background:"red"},onClick:function(e){if(window.confirm("\uc0ad\uc81c \ud6c4\uc5d0\ub294 \ubcf5\uad6c\uac00 \ubd88\uac00\ud569\ub2c8\ub2e4. \uc815\ub9d0\ub85c \ub313\uae00\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){var t="https://blog-imki123-backend.herokuapp.com"+"/comments/delete/".concat(r.postId,"/").concat(a.commentId);O.a.patch(t,{withCredentials:!0}).then((function(e){console.log("".concat(a.commentId,"\ubc88 \ub313\uae00 \uc0ad\uc81c \uc131\uacf5")),l()})).catch((function(e){return alert(e)}))}}},"\uc0ad\uc81c")))})),w=a(41),S=a.n(w),j=a(38),x={en:"en_US",ko:"ko_KR"},T=function(e){var t=e.data,a=x[t.locale]||x.en,n=t.title,r=t.description,l=void 0!==t.image&&"".concat(t.image),o="https://imki123.github.io/".concat(t.canonical),i=void 0===t.type?"website":t.type,s=t.image&&(t.width||1200),m=t.image&&(t.height||630);return c.a.createElement(j.a,{titleTemplate:"%s"},c.a.createElement("html",{lang:a}),c.a.createElement("title",null,n),c.a.createElement("meta",{name:"description",content:r}),o?c.a.createElement("link",{rel:"canonical",href:o}):null,l?c.a.createElement("link",{rel:"image_src",href:l}):null,l?c.a.createElement("meta",{itemprop:"image",content:l}):null,c.a.createElement("meta",{property:"og:site_name",content:"YOUR WEB SITE"}),c.a.createElement("meta",{property:"og:title",content:n}),r?c.a.createElement("meta",{property:"og:description",content:r}):null,o?c.a.createElement("meta",{property:"og:url",content:o}):null,c.a.createElement("meta",{property:"og:locale",content:x[a]}),c.a.createElement("meta",{property:"og:type",content:i}),l?c.a.createElement("meta",{property:"og:image",content:l}):null,s?c.a.createElement("meta",{property:"og:image:width",content:s}):null,m?c.a.createElement("meta",{property:"og:image:height",content:m}):null,c.a.createElement("meta",{property:"fb:pages",content:"YOUR WEB SITE"}),c.a.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),c.a.createElement("meta",{name:"twitter:title",content:n}),r?c.a.createElement("meta",{name:"twitter:description",content:r}):null,l?c.a.createElement("meta",{name:"twitter:image",content:l}):null,c.a.createElement("meta",{name:"twitter:site",content:"@YOURWEBSITE"}),o?c.a.createElement("link",{rel:"alternate",href:t.canonical,hreflang:a}):null)};a(86),a(87);var I=c.a.memo((function(e){var t=e.list,a=e.no,n=t.publishedDate.substring(0,10).replace("T"," ");return c.a.createElement(o.b,{to:"/posts/".concat(t.postId)},c.a.createElement("div",{className:"postList no-drag"},c.a.createElement("div",{className:"postListHeader"},c.a.createElement("div",null,c.a.createElement("span",{className:"postId"},a,"."),c.a.createElement("span",{className:"postTitle"},t.title)),c.a.createElement("span",{className:"postDate"},n)),c.a.createElement("div",{className:"postBody"},t.text)))}));var q=c.a.memo((function(e){var t=e.title,a=e.list;return c.a.createElement("div",{id:"recents"},c.a.createElement("div",{className:"postListTitle"},t),a&&a.map((function(e,t){return c.a.createElement(I,{no:a.length-t,list:e,key:e.postId})})))}));var M=c.a.memo((function(e){var t=e.match,a=e.location,r=e.history,l=c.a.useContext(A),s="/"===a.pathname?1:t.params.postId,m=Object(n.useState)(!1),u=Object(i.a)(m,2),d=u[0],p=u[1],g=Object(n.useState)([]),h=Object(i.a)(g,2),f=h[0],v=h[1],E=Object(n.useState)([]),b=Object(i.a)(E,2),N=b[0],w=b[1],j=Object(n.useState)(3),x=Object(i.a)(j,2),I=x[0],M=x[1],L=Object(n.useState)([]),P=Object(i.a)(L,2),R=P[0],_=P[1],B=Object(n.useState)([]),F=Object(i.a)(B,2),D=F[0],W=F[1],z=Object(k.a)({modules:{syntax:!0},formats:["bold","italic","underline","strike","code-block","blockquote","size","header","align","color","background","indent","list","link","image","video","clean"],readOnly:!0}),H=z.quill,U=z.quillRef;Object(n.useEffect)((function(){l.setReady(!1);var e="https://blog-imki123-backend.herokuapp.com/posts/"+s;O.a.get(e,{withCredentials:!0}).then((function(t){w(t.data.comments),e="https://blog-imki123-backend.herokuapp.com/posts/postBody/"+s,O.a.get(e).then((function(e){p(Object(y.a)(Object(y.a)({},t.data),{},{body:e.data.body}))})).catch((function(e){alert(e)})),l.setReady(!0)})).catch((function(e){alert("\ucc3e\uc73c\uc2dc\ub294 \ud398\uc774\uc9c0\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.\n"+e),r.go(-1)})),"/"===a.pathname&&(e="https://blog-imki123-backend.herokuapp.com/posts/popular",O.a.get(e).then((function(e){W(e.data)})),e="https://blog-imki123-backend.herokuapp.com/posts/recents",O.a.get(e).then((function(e){_(e.data)})))}),[a,s,r]),Object(n.useEffect)((function(){d&&("string"===typeof d.body?v(d.body.split("\n")):H&&H.setContents(d.body))}),[d,H]);var J=function(e,t){var a,n="https://blog-imki123-backend.herokuapp.com/comments/"+d.postId;e&&e.target&&(a=e.target.querySelector("svg")),a&&a.classList.add("refreshing"),O.a.get(n,{withCredentials:!0}).then((function(e){console.log("".concat(d.postId," \ub313\uae00 \uc0c8\ub85c\uace0\uce68")),w(e.data),a&&a.classList.remove("refreshing"),t&&t()})).catch((function(e){a&&a.classList.remove("refreshing"),alert(e)}))};return Object(n.useEffect)((function(){l.resizeTextarea()}),[I,l,N]),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"post"},"/"===a.pathname?c.a.createElement(T,{data:{title:"\ud589\ubcf5\ud55c \ucf54\ub529 \ube14\ub85c\uadf8 :D",discription:"imki123\uc758 \ud589\ubcf5\ud55c \ucf54\ub529 \ube14\ub85c\uadf8\uc785\ub2c8\ub2e4 :D"}}):c.a.createElement(T,{data:{title:d.title,discription:d.text,locale:"ko"}}),c.a.createElement("div",{className:"nav"},c.a.createElement("div",null,c.a.createElement("span",null,"Tag : "),d.tags&&d.tags.map((function(e,t){return 0===t?c.a.createElement("span",{key:e},c.a.createElement(o.b,{to:"home"===e?"/":"/tags/".concat(e)},e)):c.a.createElement("span",{key:e},", ",c.a.createElement(o.b,{to:"/tags/".concat(e)},e))}))),d&&d.publishedDate.substring(0,16).replace("T"," ")),c.a.createElement("h2",{className:"postTitle"},d.title),c.a.createElement("div",{className:"postContent"},"string"===typeof d.body?f.map((function(e,t){return c.a.createElement("p",{key:t},e)})):c.a.createElement("div",{id:"editor"},c.a.createElement("div",{ref:U})),l.login&&"imki123"===l.login.username&&c.a.createElement("div",{className:"postButtons"},c.a.createElement(o.b,{to:"/quill/".concat(d.postId),className:"hover no-drag"},"\uc218\uc815"),"\xa0",c.a.createElement("button",{onClick:function(e){if(window.confirm("\uae00 \uc0ad\uc81c \uc2dc \ubcf5\uad6c\uac00 \ubd88\uac00\ud569\ub2c8\ub2e4. \ud574\ub2f9 \uae00\uc744 \uc815\ub9d0\ub85c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){var t=e.target.id,a="https://blog-imki123-backend.herokuapp.com/posts/"+t;O.a.delete(a,{withCredentials:!0}).then((function(e){console.log("".concat(t,"\ubc88 \uae00 \uc0ad\uc81c \uc131\uacf5")),r.go(-1)})).catch((function(e){return alert(e)}))}},id:d.postId,style:{background:"red"}},"\uc0ad\uc81c"))),c.a.createElement("div",{className:"writeComment"},c.a.createElement("div",{className:"commentProfile"},l.login?"imki123"===l.login.username?c.a.createElement("img",{alt:"PROFILE",src:"/images/avatar.png"}):c.a.createElement("img",{alt:"PROFILE",src:"/images/dog"+(Math.floor(3*Math.random())+1)+".png"}):c.a.createElement("img",{alt:"PROFILE",src:"/images/noavatar.png"})),c.a.createElement("div",{className:"commentContent"},l.login?c.a.createElement("span",{className:"commentUsername"},l.login.username):c.a.createElement("button",{className:"loginButton",onClick:function(){r.push("/login")}},"\ub85c\uadf8\uc778"),l.login?c.a.createElement("textarea",{onChange:l.resizeTextarea,placeholder:" \ub313\uae00\uc744 \ub0a8\uaca8\uc8fc\uc138\uc694 :D"}):c.a.createElement("textarea",{readOnly:!0,placeholder:" \ub85c\uadf8\uc778 \ud6c4\uc5d0 \ub313\uae00\uc744 \ub0a8\uaca8\uc8fc\uc138\uc694 :D"}))),c.a.createElement("div",{className:"commentButtons"},l.login&&c.a.createElement("button",{className:"commentButton",onClick:function(e){var t=document.querySelector(".commentContent textarea");if(t&&""!==t.value&&window.confirm("\ub313\uae00\uc744 \uc791\uc131\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){var a="https://blog-imki123-backend.herokuapp.com/comments/"+d.postId;O.a.patch(a,{withCredentials:!0,data:{username:l.login.username,content:t.value}}).then((function(e){console.log("".concat(d.postId," \ub313\uae00 \ucd94\uac00 \uc131\uacf5")),J(null,M(e.data.comments.length))})).catch((function(e){return alert(e)}))}}},"\ub313\uae00\uc791\uc131")),N&&N.length>0&&c.a.createElement("div",{className:"comments"},c.a.createElement("div",{className:"commentTitle"},c.a.createElement("div",{className:"commentCnt"},"\ub313\uae00 ",N.length,"\uac1c"),c.a.createElement("span",{className:"commentRefresh",onClick:J},"\ub313\uae00 \uc0c8\ub85c\uace0\uce68 ",c.a.createElement(S.a,null))),N.map((function(e,t){return t<I&&c.a.createElement(C,{post:d,comment:e,key:e.commentId,refreshComment:J})})),N.length>I&&c.a.createElement("div",{className:"more"},c.a.createElement("span",{className:"moreButton",onClick:function(e){M(I+10)}},"\ub313\uae00 \ub354\ubcf4\uae30")))),"/"===a.pathname&&c.a.createElement("div",{className:"recents"},c.a.createElement(q,{title:"\ucd5c\uc2e0\uae00",list:R}),c.a.createElement(q,{title:"\uc778\uae30\uae00",list:D})))}));a(88);var L=c.a.memo((function(){var e=c.a.useContext(A),t=Object(s.f)();return Object(n.useEffect)((function(){e.setReady(!0)})),c.a.createElement("div",{className:"notFound"},c.a.createElement("div",{className:"title"},"Not Found Page"),c.a.createElement("div",{className:"goHome"},c.a.createElement("span",{onClick:function(e){t.go(-1)}},"Go back")))}));a(89);var P=c.a.memo((function(e){var t=c.a.useContext(A),a=Object(s.g)(),r=Object(s.f)(),l="",o=navigator.userAgent.toLowerCase();o.indexOf("chrome")>-1?l="chrome":o.indexOf("safari")>-1&&(l="safari");var m=Object(n.useState)(""),u=Object(i.a)(m,2),d=u[0],p=u[1],g=Object(n.useState)(""),h=Object(i.a)(g,2),f=h[0],v=h[1],E=Object(n.useState)(""),b=Object(i.a)(E,2),y=b[0],k=b[1],N=Object(n.useState)("\ub85c\uadf8\uc778"),O=Object(i.a)(N,2),C=O[0],w=O[1];Object(n.useEffect)((function(){t.setReady(!0)})),Object(n.useEffect)((function(){t.login&&"/login"===a.pathname&&r.replace("/loginStatus"),a.pathname.indexOf("register")>-1?w("\ud68c\uc6d0\uac00\uc785"):a.pathname.indexOf("withdraw")>-1?w("\ud68c\uc6d0\ud0c8\ud1f4"):w("\ub85c\uadf8\uc778")}),[a,t.login,r]);var S=function(e){e.preventDefault();var a="https://blog-imki123-backend.herokuapp.com/auth",n=document.querySelector("[name=username]");n&&(n=n.value=n.value.replace(/[^a-zA-Z0-9\uac00-\ud7a3_]/g,""));var c=document.querySelector("[name=password]");c&&(c=c.value),""===d&&c.length>=1&&""===f&&""===y?"\ud68c\uc6d0\uac00\uc785"===C?(a+="/register",fetch(a,{mode:"cors",method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:c})}).then((function(e){if(200===e.status||201===e.status)e.json().then((function(e){alert(e.username+"\ub2d8\uc758 \ud68c\uc6d0\uac00\uc785\uc5d0 \uc131\uacf5\ud588\uc2b5\ub2c8\ub2e4 :D"),r.go(-1)}));else{var t="\ud68c\uc6d0\uac00\uc785\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4 :(";409===e.status&&(t+="\n\uc774\ubbf8 \uc874\uc7ac\ud558\ub294 \uc544\uc774\ub514\uc785\ub2c8\ub2e4."),400===e.status&&(t+="\n\uc544\uc774\ub514\ub098 \ube44\ubc00\ubc88\ud638\ub97c \ud655\uc778\ud574\uc8fc\uc138\uc694."),alert(t)}})).catch((function(e){return console.error(e)}))):"\ud68c\uc6d0\ud0c8\ud1f4"===C?window.confirm("\uacc4\uc815 \ud0c8\ud1f4\uc2dc \ubcf5\uad6c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc815\ub9d0\ub85c \ud0c8\ud1f4\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")&&(a+="/withdraw",fetch(a,{mode:"cors",method:"DELETE",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t.login.username,password:c})}).then((function(e){if(200===e.status)alert("\uacc4\uc815\uc774 \ud0c8\ud1f4\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \ub610 \ub4e4\ub7ec \uc8fc\uc138\uc694 :D"),r.push("/");else{var t="\ud0c8\ud1f4\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4 :(";204===e.status&&(t+="\n\uc874\uc7ac\ud558\uc9c0 \uc54a\ub294 \uc544\uc774\ub514\uc785\ub2c8\ub2e4."),401===e.status&&(t+="\n\ube44\ubc00\ubc88\ud638\ub97c \ud655\uc778\ud574\uc8fc\uc138\uc694."),alert(t)}})).catch((function(e){return console.error(e)}))):(a+="/login",fetch(a,{mode:"cors",method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:c})}).then((function(e){if(200===e.status||201===e.status)e.json().then((function(e){t.setLogin(e),alert(e.username+"\ub2d8 \ud658\uc601\ud569\ub2c8\ub2e4 :D"),r.go(-1)}));else{var a="\ub85c\uadf8\uc778\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4 :(";401===e.status&&(a+="\n\ub85c\uadf8\uc778 \uc815\ubcf4\ub97c \ud655\uc778\ud574\uc8fc\uc138\uc694."),alert(a)}})).catch((function(e){return console.error(e)}))):alert("\uc785\ub825 \uc815\ubcf4\ub97c \ud655\uc778\ud574\uc8fc\uc138\uc694.")};return c.a.createElement("div",{id:"background"},c.a.createElement("div",{id:"loginWrapper"},c.a.createElement("form",{id:"login"},c.a.createElement(s.c,null,c.a.createElement(s.a,{path:["/login","/register","/withdraw"]},c.a.createElement("div",{className:"text"},"\uc544\uc774\ub514"),"\ud68c\uc6d0\ud0c8\ud1f4"===C?c.a.createElement("div",null,t.login.username):c.a.createElement("input",{name:"username",onChange:function(e){var t=e.target.value=e.target.value.replace(/\s/g,"_").replace(/[^a-zA-Z0-9\u3131-\u314e\u314f-\u3163\uac00-\ud7a3_]/g,"");t.length<3?p("- 3\uc790 \uc774\uc0c1 \uc785\ub825\ud574\uc8fc\uc138\uc694"):t.length>20?p("- 20\uc790 \uc774\ud558\ub85c \uc785\ub825\ud574\uc8fc\uc138\uc694"):p("")}}),c.a.createElement("div",{className:"check"},d),c.a.createElement("div",{className:"text"},"\ube44\ubc00\ubc88\ud638"),c.a.createElement("input",{name:"password",type:"password",onChange:function(e){var t=e.target.value,a=document.querySelector("[name=passwordConfirm]");a&&(a.value="",k("")),t.length<6?v("- 6\uc790 \uc774\uc0c1 \uc785\ub825\ud574\uc8fc\uc138\uc694"):t.length>20?v("- 20\uc790 \uc774\ud558\ub85c \uc785\ub825\ud574\uc8fc\uc138\uc694"):v("")},autoComplete:"currnet-password"}),c.a.createElement("div",{className:"check"},f),"\ud68c\uc6d0\uac00\uc785"===C&&c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"text"},"\ube44\ubc00\ubc88\ud638 \ud655\uc778"),c.a.createElement("input",{name:"passwordConfirm",type:"password",onChange:function(e){var t=e.target.value;t!==document.querySelector("[name=password]").value&&t.length>=1?k("- \ube44\ubc00\ubc88\ud638\uac00 \uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4"):k("")},autoComplete:"currnet-password"}),c.a.createElement("div",{className:"check",id:"checkPasswordConfirm"},y)),"\ud68c\uc6d0\ud0c8\ud1f4"===C?c.a.createElement("button",{style:{background:"red"},onClick:S},C):c.a.createElement("button",{onClick:S},C),"safari"===l&&c.a.createElement("div",{className:"text",style:{fontSize:"0.8rem",textAlign:"center"}},"(Safari\uc758 \uacbd\uc6b0 \uc124\uc815\uc744 \ubcc0\uacbd\ud574\uc8fc\uc154\uc57c \ub85c\uadf8\uc778\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4.",c.a.createElement("br",null),"\uc124\uc815 \u2192 Safari \u2192 \uac1c\uc778 \uc815\ubcf4 \ubcf4\ud638 \ubc0f \ubcf4\uc548 \u2192 ",c.a.createElement("br",null),"\ud06c\ub85c\uc2a4 \uc0ac\uc774\ud2b8 \ucd94\uc801\ubc29\uc9c0 OFF, \ubaa8\ub4e0 \ucfe0\ud0a4 \ucc28\ub2e8 OFF)")),c.a.createElement(s.a,{path:["/loginStatus"]},t.login?c.a.createElement("div",{className:"center"},t.login.username,"\ub2d8\uc740 \ud604\uc7ac ",c.a.createElement("span",{style:{color:"green"}},"\ub85c\uadf8\uc778")," \ub418\uc5b4\uc788\uc2b5\ub2c8\ub2e4 :D",c.a.createElement("br",null),c.a.createElement("span",{style:{fontSize:"0.8rem"}},"(\ub85c\uadf8\uc778\uc740 \ucd5c\ub300 \uc77c\uc8fc\uc77c\uac04 \uc720\uc9c0\ub429\ub2c8\ub2e4.)")):c.a.createElement("div",{className:"center"},"\uc7ac \ub85c\uadf8\uc778\uc774 \ud544\uc694\ud569\ub2c8\ub2e4 :D"))))))})),R=a(21);a(90),a(91);var _=c.a.memo((function(e){var t=e.match,a=e.location,r=e.history,l=c.a.useContext(A),o=t.params.postId,s=Object(n.useState)(),m=Object(i.a)(s,2),u=m[0],d=m[1],p=Object(n.useState)(),g=Object(i.a)(p,2),h=g[0],f=g[1],v=Object(k.a)({modules:{toolbar:[["bold","italic","underline","strike"],[{size:["small",!1,"large","huge"]},{header:1},{header:2}],[{align:[]}],[{color:[]},{background:[]}],[{indent:"-1"},{indent:"+1"}],[{list:"ordered"},{list:"bullet"}],["code-block","blockquote"],["link","image","video"],["clean"]],syntax:!0},formats:["bold","italic","underline","strike","code-block","blockquote","size","header","align","color","background","indent","list","link","image","video","clean"]}),E=v.quill,b=v.quillRef;Object(n.useEffect)((function(){if(void 0!==o&&Number(o)>=1&&E){var e="https://blog-imki123-backend.herokuapp.com/posts/"+o;O.a.get(e,{withCredentials:!0}).then((function(t){document.querySelector("[name=title]").value=t.data.title;var a,n=document.querySelectorAll("[type=radio]"),c=Object(R.a)(n);try{for(c.s();!(a=c.n()).done;){a.value.checked=!1}}catch(u){c.e(u)}finally{c.f()}if(t.data.tags){var r=document.querySelector("[value=".concat(t.data.tags[0],"]"));r&&(r.checked=!0);var i,s=Object(R.a)(l.menus);try{for(s.s();!(i=s.n()).done;){var m=i.value;m.name===t.data.tags[0]&&f(m.subMenus)}}catch(u){s.e(u)}finally{s.f()}}e="https://blog-imki123-backend.herokuapp.com/posts/postBody/"+o,O.a.get(e).then((function(e){"string"===typeof e.data.body?E.setText(e.data.body):E.setContents(e.data.body),d(Object(y.a)(Object(y.a)({},t.data),{},{body:e.data.body}))})).catch((function(e){alert(e)})),l.setReady(!0)})).catch((function(e){alert(e),l.setReady(!0)}))}else l.setReady(!0)}),[a,E,o,l.menus]),Object(n.useEffect)((function(){if(h&&u){var e=document.querySelector("[value=".concat(u.tags[1],"]"));e&&(e.checked=!0)}var t=document.querySelector("[name=newSubMenu]");t&&(t.value="")}),[h,u]);var N=function(e){if(!l.login||l.login&&"imki123"!==l.login.username)alert("\uae00 \uc791\uc131\uc740 \ube14\ub85c\uadf8 \uc8fc\uc778\ub9cc \uac00\ub2a5\ud569\ub2c8\ub2e4 ^^;");else if(window.confirm("\uae00\uc744 \uac8c\uc2dc\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){var t=document.querySelector("[name=title]"),a=E.getContents(),n=E.getText(),c=document.querySelector("[name=mainMenu]:checked"),i=[],s=document.querySelector("[name=subMenu]:checked"),m=document.querySelector("[name=newMainMenu]"),u=document.querySelector("[name=newSubMenu]");if(c&&(i[0]=c.value),""!==m.value&&(i[0]=m.value),s&&""!==s.value&&(i[1]=s.value),""!==u.value&&(i[1]=u.value),0!==t.value.length)if(1!==E.getLength())if(i.length<1&&""===m.value)alert("\uba54\uc778\uba54\ub274\ub97c 1\uac1c \uc120\ud0dd\ud574\uc8fc\uc138\uc694.");else{var d="https://blog-imki123-backend.herokuapp.com/posts",p="POST",g="\uae00 \uc791\uc131 \uc131\uacf5";if("PATCH"===e.target.id){if(!(void 0!==o&&Number(o)>=1))return void console.log("postId \ube44\uc815\uc0c1, \uae00 \uc218\uc815 \uc2e4\ud328");d+="/"+o,p="PATCH",g="\uae00 \uc218\uc815 \uc131\uacf5"}O()(d,{method:p,withCredentials:!0,data:{title:t.value,body:a,text:n,tags:i}}).then((function(e){alert(g),o=e.data.postId,"POST"===p&&O()(),o>1?r.push("/posts/".concat(o)):r.push("/posts/1")})).catch((function(e){return alert(e)}))}else alert("\ub0b4\uc6a9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.");else alert("\uc81c\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.")}};Object(n.useEffect)((function(){var e=document.querySelector("#editor"),t=document.querySelector(".ql-toolbar");e&&t&&(e.style.marginBottom=t.clientHeight+10+"px"),window.removeEventListener("resize",(function(){})),window.addEventListener("resize",(function(){e&&t&&(e.style.marginBottom=t.clientHeight+10+"px")}))}),[a]);var C=function(e){if(l.menus){var t,a=Object(R.a)(l.menus);try{for(a.s();!(t=a.n()).done;){var n=t.value;n.name===e.target.value&&f(n.subMenus)}}catch(r){a.e(r)}finally{a.f()}}if("radio"!==e.target.type){e.target.value=e.target.value.replace(/\s/g,"_");var c=document.querySelector("[name=mainMenu]:checked");c&&(c.checked=!1)}},w=function(e){if("radio"!==e.target.type){e.target.value=e.target.value.replace(/\s/g,"_");var t=document.querySelector("[name=subMenu]:checked");t&&(t.checked=!1)}else{var a=document.querySelector("[name=newSubMenu]");a&&(a.value="")}};return c.a.createElement("div",{className:"quill"},c.a.createElement("div",{className:"quillTitle"},c.a.createElement("input",{name:"title",placeholder:"\uc81c\ubaa9"})),c.a.createElement("div",{id:"editor"},c.a.createElement("div",{ref:b}),c.a.createElement("div",{id:"tags",className:"no-drag"},c.a.createElement("div",{id:"tagsTitle"},"tags",void 0!==o&&Number(o)>=1?c.a.createElement("button",{className:"editorButton",onClick:N,id:"PATCH"},"\uae00 \uc218\uc815"):c.a.createElement("button",{className:"editorButton",onClick:N},"\uc0c8\uae00 \uc791\uc131")),c.a.createElement("div",null,"\uba54\uc778\uba54\ub274:",l.menus&&l.menus.map((function(e){return c.a.createElement("label",{key:e.name},c.a.createElement("input",{type:"radio",name:"mainMenu",value:e.name,onClick:C}),e.name)})),c.a.createElement("input",{name:"newMainMenu",placeholder:"\uba54\uc778\uba54\ub274 \ucd94\uac00",onChange:C,autoComplete:"off"})),c.a.createElement("div",null,"\uc11c\ube0c\uba54\ub274:",c.a.createElement("label",null,c.a.createElement("input",{type:"radio",name:"subMenu",value:"",onClick:w})," \uc120\ud0dd\uc548\ud568"),h&&h.map((function(e){return c.a.createElement("label",{key:e.name},c.a.createElement("input",{type:"radio",name:"subMenu",value:e.name,onClick:w})," ",e.name)})),c.a.createElement("input",{name:"newSubMenu",placeholder:"\uc11c\ube0c\uba54\ub274 \ucd94\uac00",autoComplete:"off",onChange:w})))))})),B=(a(92),a(42)),F=a.n(B);var D=c.a.memo((function(e){var t=e.postCount,a=Object(s.g)(),r=F.a.parse(a.search),l=null,i=[];if(t){var m=Number(r.page)||1,u=t-10*(m-1);l={page:m,lastPage:Math.ceil(t/10),postCount:t,startPost:u};for(var d=0;d<l.lastPage;d++)i.push(d+1)}return Object(n.useEffect)((function(){for(var e=document.querySelectorAll(".paging a"),t=0;t<e.length;t++)e[t].innerHTML===r.page?e[t].className="activePage":e[t].className="inactivePage",void 0===r.page&&"1"===e[t].innerHTML&&(e[t].className="activePage")}),[r,t]),c.a.createElement("div",{className:"paging"},i.map((function(e,t){return c.a.createElement(o.c,{path:a.pathname,to:"".concat(a.pathname,"?page=").concat(e),className:"inactivePage",key:t},e)})))}));a(105);var W=c.a.memo((function(e){var t=e.match,a=e.location,r=e.history,l=c.a.useContext(A),o=t.params.tag,s=Object(n.useState)([]),m=Object(i.a)(s,2),u=m[0],d=m[1];return Object(n.useEffect)((function(){l.setReady(!1);var e="https://blog-imki123-backend.herokuapp.com/posts/tag/"+o+a.search;O.a.get(e,{withCredentials:!0}).then((function(e){e.data.list.length<1?(alert("\ucc3e\uc73c\uc2dc\ub294 \ud398\uc774\uc9c0\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."),r.go(-1)):(d(e.data.list),l.setReady(!0))})).catch((function(e){return alert(e)}))}),[o,a,r]),c.a.createElement("div",{className:"postListWrapper"},c.a.createElement("div",{className:"postListTitle"},o.substring(0,1).toUpperCase()+o.substring(1)),u&&u.map((function(e,t){return c.a.createElement(I,{no:u.length-t,list:e,key:e.postId})})),c.a.createElement(D,{postCount:u.length}))}));var z=c.a.memo((function(e){var t=c.a.useContext(A),a=Object(s.g)();return Object(n.useEffect)((function(){var e=function(){t.resizeTextarea()};window.addEventListener("resize",e);var n=document.querySelector("#loading");return t.ready?(n&&(n.style.display="none"),a.hash&&setTimeout((function(){var e=document.querySelector("#content"),t=document.querySelector(a.hash);if(t){var n=e.scrollTop,c=t.offsetTop,r=(c-n)/50;if(c>n)var l=setInterval((function(){e.scrollTop+r>=c||e.scrollTop>=e.scrollHeight-e.clientHeight?clearInterval(l):e.scrollTop+=r}),10);else var o=setInterval((function(){e.scrollTop<=c?clearInterval(o):e.scrollTop+=r}),10)}}),10),setTimeout((function(){t.resizeTextarea()}),10)):n&&(n.style.display="flex"),window.removeEventListener("resize",e)}),[a.hash,t]),c.a.createElement("div",{id:"content",className:"slideMenu"},t.login&&"imki123"===t.login.username&&c.a.createElement(o.b,{id:"postFAB",className:"hover",to:"/quill"},c.a.createElement(v.a,null)),c.a.createElement("div",{id:"scrollFAB",className:"hover",onClick:function(e){var t=document.querySelector("#content"),a=t.scrollTop/50,n=setInterval((function(){t.scrollTop<=0?clearInterval(n):t.scrollTop-=a}),10)}},c.a.createElement(b.a,null)),c.a.createElement("div",{id:"menuFAB",className:"hover",onClick:t.slideMenu},c.a.createElement("img",{alt:"MENU",src:"/images/guide_icon.png"})),c.a.createElement("div",{id:"loading"},c.a.createElement("img",{alt:"Loading",src:"/images/loading.gif"})),c.a.createElement(s.c,null,c.a.createElement(s.a,{path:["/login","/register","/loginStatus","/withdraw"],component:P}),c.a.createElement(s.a,{path:"/quill/:postId?",component:_}),c.a.createElement(s.a,{path:"/tags/:tag",component:W}),c.a.createElement(s.a,{path:"/",exact:!0,component:M}),c.a.createElement(s.a,{path:"/posts/:postId",component:M}),c.a.createElement(s.a,{path:"/NotFoundPage",component:L}),c.a.createElement(s.a,{path:"*",component:L})),c.a.createElement("textarea",{disabled:!0,id:"fakeTextarea"}))}));a(106);var H=c.a.memo((function(e){var t=c.a.useContext(A);return c.a.createElement("div",{id:"settingWrapper",onClick:function(e){var t=document.querySelector("#settingWrapper");e.stopPropagation(),setTimeout((function(){t.style.display="none"}),200)}},c.a.createElement("div",{id:"setting"},c.a.createElement("div",{id:"settingListWrapper"},t.login?c.a.createElement(o.b,{className:"settingList",to:"/loginStatus"},t.login.username):c.a.createElement(o.b,{className:"settingList",to:"/login"},"\ub85c\uadf8\uc778"),t.login&&c.a.createElement("div",{className:"settingList",onClick:function(e){if(window.confirm("\ub85c\uadf8\uc544\uc6c3 \ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){fetch("https://blog-imki123-backend.herokuapp.com/auth/logout",{mode:"cors",method:"POST",credentials:"include"}).then((function(e){204===e.status?(console.log("\ub85c\uadf8\uc544\uc6c3 \uc131\uacf5"),t.setLogin(!1)):console.log("\ub85c\uadf8\uc544\uc6c3 \uc2e4\ud328")})).catch((function(e){return console.error(e)}))}}},"\ub85c\uadf8\uc544\uc6c3"),!t.login&&c.a.createElement(o.b,{className:"settingList",to:"/register"},"\ud68c\uc6d0\uac00\uc785"),t.login&&c.a.createElement(o.b,{className:"settingList",to:"/withdraw"},"\ud68c\uc6d0\ud0c8\ud1f4"))))})),A=Object(n.createContext)();var U=c.a.memo((function(){var e=Object(s.g)(),t=Object(n.useState)(!1),a=Object(i.a)(t,2),r=a[0],l=a[1],o=Object(n.useState)([]),d=Object(i.a)(o,2),p=d[0],g=d[1],f=Object(n.useState)({}),v=Object(i.a)(f,2),E=v[0],b=v[1],y=Object(n.useState)(!1),k=Object(i.a)(y,2),N=k[0],C=k[1],w=Object(n.useState)(!1),S=Object(i.a)(w,2),j=S[0],x=S[1],I=Object(n.useState)([{name:"home",count:1,order:1},{name:"programming",count:1,order:2},{name:"article",count:1,order:3}]),q=Object(i.a)(I,2),M=q[0],L=q[1],P=function(e){O.a.get("https://blog-imki123-backend.herokuapp.com/auth/check",{withCredentials:!0}).then((function(t){t.data?(console.log("\ud1a0\ud070 \uccb4\ud06c \uc131\uacf5"),C(t.data)):(console.log("\ud1a0\ud070 \uc5c6\uc74c"),C(!1)),e&&e()})).catch((function(t){e&&e()}))},R={ready:r,setReady:l,posts:p,setPosts:g,headers:E,setHeaders:b,login:N,setLogin:C,refresh:j,setRefresh:x,menus:M,setMenus:L,resizeTextarea:function(e){var t=document.querySelector("#fakeTextarea"),a=[];if(e&&e.target?a.push(e.target):a=document.querySelectorAll("textarea"),a&&t){for(var n=0;n<a.length;n++)t.style.height="1px",t.style.width=a[n].clientWidth+"px",t.value=a[n].value,a[n].style.height=5+t.scrollHeight+"px";t.value="",t.style.height="0px"}},slideMenu:function(){var e=document.querySelector("#body"),t=document.querySelector("#guideWrapper"),a=document.querySelector("#content");t.style.left.replace("px","")>-100?(t.parentNode.style.width="0",a.style.width="calc(100% - 16px)",e.clientWidth<500?t.style.left="-230px":t.style.left="-312px"):(t.style.left="0px",e.clientWidth<500?t.parentNode.style.width="100%":a.style.width="calc(100% - 312px - 16px)")},checkToken:P};return Object(n.useEffect)((function(){O.a.get("https://blog-imki123-backend.herokuapp.com/menus",{withCredentials:!0}).then((function(e){L(e.data)})).catch((function(e){return alert(e)}))}),[e.pathname,j]),Object(n.useEffect)((function(){l(!1),P();var e=document.querySelector("#content");if(e)var t=e.scrollTop,a=setInterval((function(){var n=t/50;e.scrollTop-=n,e.scrollTop<=0&&clearInterval(a)}),10)}),[e.pathname,e.search,j]),c.a.createElement(A.Provider,{value:R},c.a.createElement("div",{id:"app"},c.a.createElement(T,{data:{title:"\ud589\ubcf5\ud55c \ucf54\ub529 \ube14\ub85c\uadf8 :D",discription:"imki123\uc758 \ud589\ubcf5\ud55c \ucf54\ub529 \ube14\ub85c\uadf8\uc785\ub2c8\ub2e4 :D"}}),c.a.createElement("img",{alt:"logo",src:"/images/imcat_64.png",className:"firstLogo"}),c.a.createElement(m,null),c.a.createElement(H,null),c.a.createElement(u,null,c.a.createElement(h,null),c.a.createElement(z,null))))})),J=document.getElementById("root");J.hasChildNodes()?Object(r.hydrate)(c.a.createElement(o.a,null,c.a.createElement(c.a.StrictMode,null,c.a.createElement(U,null))),J):l.a.render(c.a.createElement(o.a,{basename:""},c.a.createElement(c.a.StrictMode,null,c.a.createElement(U,null))),document.getElementById("root"))},46:function(e,t,a){e.exports=a(108)},51:function(e,t,a){},52:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){},68:function(e,t,a){},86:function(e,t,a){},87:function(e,t,a){},88:function(e,t,a){},89:function(e,t,a){},90:function(e,t,a){},92:function(e,t,a){}},[[46,1,2]]]);
//# sourceMappingURL=main.ac7884a8.chunk.js.map