(this.webpackJsonpblog_imki123=this.webpackJsonpblog_imki123||[]).push([[0],{107:function(e,t,a){},108:function(e,t,a){},110:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(23),o=a.n(l),r=a(3),s=a(4),i=(a(52),a(6));a(53);var m=c.a.memo((function(e){var t=c.a.useContext(Y);return c.a.createElement("div",{id:"headerWrapper"},c.a.createElement("div",{id:"header"},c.a.createElement("div",{className:"hover",onClick:t.slideMenu},c.a.createElement("img",{id:"menu",alt:"MENU",src:"/images/guide_icon.png"})),c.a.createElement(r.b,{to:"/"},c.a.createElement("div",{id:"title",className:"hover"},c.a.createElement("img",{id:"logo",alt:"logo",src:"/images/imcat_64.png"}),"\ud589\ubcf5\ud55c \ucf54\ub529 \ube14\ub85c\uadf8 :D")),c.a.createElement("div",{className:"hover",onClick:function(){var e=document.querySelector("#settingWrapper");e&&("block"===e.style.display?e.style.display="none":e.style.display="block")}},t.login?"imki123"===t.login.username?c.a.createElement("img",{className:"profile",alt:"PROFILE",src:"/images/avatar_small.png"}):c.a.createElement("img",{className:"profile",alt:"PROFILE",src:"/images/dog"+(Math.floor(3*Math.random())+1)+".png"}):c.a.createElement("img",{className:"profile",alt:"PROFILE",src:"/images/noavatar.png"}))))}));a(58);var u=c.a.memo((function(e){return c.a.createElement("div",{id:"body"},e.children)})),d=(a(59),a(60),a(37)),p=a.n(d);var g=c.a.memo((function(e){var t=e.menus;return c.a.createElement(c.a.Fragment,null,t&&t.map((function(e){return c.a.createElement("div",{key:e.name},c.a.createElement(r.c,{exact:!0,to:"home"===e.name?"/":"/tags/".concat(e.name),className:"list",activeClassName:"activeList"},c.a.createElement("span",{className:"menuName"},e.name.substring(0,1).toUpperCase()+e.name.substring(1)),c.a.createElement("span",{className:"menuOptions"},c.a.createElement("span",{className:"menuCnt"},e.count),c.a.createElement("span",{className:"menuExpandIcon"},e.subMenus&&e.subMenus.length>=1&&c.a.createElement(p.a,null)))),e.subMenus&&e.subMenus.length>0&&e.subMenus.map((function(e){return c.a.createElement(r.c,{exact:!0,to:"/tags/".concat(e.name),className:"list subList",activeClassName:"activeList",key:e.name},c.a.createElement("span",{className:"menuName"},e.name.substring(0,1).toUpperCase()+e.name.substring(1)),c.a.createElement("span",{className:"menuOptions"},c.a.createElement("span",{className:"menuCnt"},e.count)))})))})))}));var h=c.a.memo((function(e){var t=c.a.useContext(Y);return c.a.createElement("div",{id:"guideBack",onClick:function(e){var t=document.querySelector("#body"),a=document.querySelector("#guideWrapper"),n=document.querySelector("#content");a.parentNode.style.width="0",t.clientWidth<500?(a.style.left="-312px",n.style.width="calc(100% - 16px)"):n.style.width="calc(100% - 312px - 16px)"}},c.a.createElement("div",{id:"guideWrapper",className:"slideMenu"},c.a.createElement("div",{id:"avatar"},c.a.createElement("img",{alt:"avatar",src:"/images/avatar.png",title:"Hello :D"}),c.a.createElement("div",{id:"name"},"Im kiyoung"),c.a.createElement("div",{id:"nickName"},"imki123"),c.a.createElement("div",{id:"github"},c.a.createElement("a",{href:"https://github.com/imki123"},c.a.createElement("img",{alt:"github",src:"/images/GitHub-Mark-32px.png"})," ",c.a.createElement("span",null,"https://github.com/imki123"))),c.a.createElement("div",{id:"introduction"},"A web programmer who dreams of being a wise developer.")),c.a.createElement("div",{id:"menus"},c.a.createElement(g,{menus:t.menus}))))})),f=a(44),E=a.n(f),v=a(45),b=a.n(v),y=(a(62),a(63),a(18)),k=(a(69),a(5)),N=a.n(k);var O=c.a.memo((function(e){var t=c.a.useContext(Y),a=e.comment,l=e.post,o=e.refreshComment,r=!1,s=a.publishedDate.substring(0,16).replace("T"," ");return Object(n.useEffect)((function(){document.querySelector("#comment_".concat(l.postId,"_").concat(a.commentId," textarea")).value=a.content}),[a,l]),c.a.createElement("div",{className:"commentWrapper",id:"comment_".concat(l.postId,"_").concat(a.commentId)},c.a.createElement("div",{className:"comment"},c.a.createElement("div",{className:"commentProfile"},a.username?"imki123"===a.username?c.a.createElement("img",{alt:"PROFILE",src:"/images/avatar_small.png"}):c.a.createElement("img",{alt:"PROFILE",src:"/images/dog"+(Math.floor(3*Math.random())+1)+".png"}):c.a.createElement("img",{alt:"PROFILE",src:"/images/noavatar.png"})),c.a.createElement("div",{className:"commentContent"},a.username===t.login.username?c.a.createElement("span",{className:"commentUsername",style:{fontWeight:"bold"}},a.username):c.a.createElement("span",{className:"commentUsername"},a.username),c.a.createElement("span",{className:"commentDate"}," - ",s," ",a.updated&&"(\uc218\uc815\ub428)"),c.a.createElement("textarea",{readOnly:!0,onChange:t.resizeTextarea}))),(a.username&&a.username===t.login.username||"imki123"===t.login.username)&&c.a.createElement("div",{className:"commentButtons"},c.a.createElement("button",{className:"commentButton",onClick:function(e){var t=document.querySelector("#comment_".concat(l.postId,"_").concat(a.commentId," textarea"));if(r){if(window.confirm("\ub313\uae00\uc744 \uc218\uc815\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){r=!1,t.classList.remove("updateMode"),t.readOnly=!0;var n="https://blog-imki123-backend.herokuapp.com"+"/comments/".concat(l.postId,"/").concat(a.commentId);N.a.patch(n,{withCredentials:!0,data:{content:t.value}}).then((function(e){console.log("".concat(a.commentId,"\ubc88 \ub313\uae00 \uc218\uc815 \uc131\uacf5")),o()})).catch((function(e){return alert(e)}))}}else r=!0,t.classList.add("updateMode"),t.readOnly=!1,t.focus()}},"\uc218\uc815"),c.a.createElement("button",{className:"commentButton",style:{background:"red"},onClick:function(e){if(window.confirm("\uc0ad\uc81c \ud6c4\uc5d0\ub294 \ubcf5\uad6c\uac00 \ubd88\uac00\ud569\ub2c8\ub2e4. \uc815\ub9d0\ub85c \ub313\uae00\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){var t="https://blog-imki123-backend.herokuapp.com"+"/comments/delete/".concat(l.postId,"/").concat(a.commentId);N.a.patch(t,{withCredentials:!0}).then((function(e){console.log("".concat(a.commentId,"\ubc88 \ub313\uae00 \uc0ad\uc81c \uc131\uacf5")),o()})).catch((function(e){return alert(e)}))}}},"\uc0ad\uc81c")))})),C=a(41),w=a.n(C),S=a(38),j={en:"en_US",ko:"ko_KR"},x=function(e){var t=e.data,a=j[t.locale]||j.en,n=t.title,l=t.description,o=void 0!==t.image&&"".concat(t.image),r="https://imki123.github.io/".concat(t.canonical),s=void 0===t.type?"website":t.type,i=t.image&&(t.width||1200),m=t.image&&(t.height||630);return c.a.createElement(S.a,{titleTemplate:"%s"},c.a.createElement("html",{lang:a}),c.a.createElement("title",null,n),c.a.createElement("meta",{name:"description",content:l}),r?c.a.createElement("link",{rel:"canonical",href:r}):null,o?c.a.createElement("link",{rel:"image_src",href:o}):null,o?c.a.createElement("meta",{itemprop:"image",content:o}):null,c.a.createElement("meta",{property:"og:site_name",content:"YOUR WEB SITE"}),c.a.createElement("meta",{property:"og:title",content:n}),l?c.a.createElement("meta",{property:"og:description",content:l}):null,r?c.a.createElement("meta",{property:"og:url",content:r}):null,c.a.createElement("meta",{property:"og:locale",content:j[a]}),c.a.createElement("meta",{property:"og:type",content:s}),o?c.a.createElement("meta",{property:"og:image",content:o}):null,i?c.a.createElement("meta",{property:"og:image:width",content:i}):null,m?c.a.createElement("meta",{property:"og:image:height",content:m}):null,c.a.createElement("meta",{property:"fb:pages",content:"YOUR WEB SITE"}),c.a.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),c.a.createElement("meta",{name:"twitter:title",content:n}),l?c.a.createElement("meta",{name:"twitter:description",content:l}):null,o?c.a.createElement("meta",{name:"twitter:image",content:o}):null,c.a.createElement("meta",{name:"twitter:site",content:"@YOURWEBSITE"}),r?c.a.createElement("link",{rel:"alternate",href:t.canonical,hreflang:a}):null)};a(87),a(88);var T=c.a.memo((function(e){var t=e.list,a=e.no,n=t.publishedDate.substring(0,10).replace("T"," ");return c.a.createElement(r.b,{to:"/posts/".concat(t.postId)},c.a.createElement("div",{className:"postList no-drag"},c.a.createElement("div",{className:"postListHeader"},c.a.createElement("div",null,c.a.createElement("span",{className:"postId"},a,"."),c.a.createElement("span",{className:"postTitle"},t.title)),c.a.createElement("span",{className:"postDate"},n)),c.a.createElement("div",{className:"postBody"},t.text)))}));var I=c.a.memo((function(e){var t=e.title,a=e.list;return c.a.createElement("div",{className:"recents"},c.a.createElement("div",{className:"postListTitle"},t),a&&a.map((function(e,t){return c.a.createElement(T,{no:t+1,list:e,key:e.postId})})))}));a(89);var q=c.a.memo((function(e){var t=e.title,a=e.list;return c.a.createElement("div",{className:"recents recentComment"},c.a.createElement("div",{className:"postListTitle"},t),a&&a.map((function(e,t){return c.a.createElement("div",{key:e.title+t},c.a.createElement(r.b,{to:"/posts/".concat(e.postId,"/#comments")},c.a.createElement("div",{className:"postList no-drag"},c.a.createElement("div",{className:"postListHeader"},c.a.createElement("div",null,c.a.createElement("span",{className:"postId"},t+1,"."),c.a.createElement("span",{className:"postTitle"},e.title)),c.a.createElement("span",{className:"postDate"},e.publishedDate&&e.publishedDate.substring(0,19).replace("T"," "))),c.a.createElement("div",{className:"postBody"},c.a.createElement("span",{className:"username"},e.username),e.content))))})))}));var L=c.a.memo((function(e){var t=e.match,a=e.location,l=e.history,o=c.a.useContext(Y),i=t.params.postId,m=Object(n.useState)(!1),u=Object(s.a)(m,2),d=u[0],p=u[1],g=Object(n.useState)(),h=Object(s.a)(g,2),f=h[0],E=h[1],v=Object(n.useState)([]),b=Object(s.a)(v,2),k=b[0],C=b[1],S=Object(n.useState)(3),j=Object(s.a)(S,2),T=j[0],L=j[1],M=Object(n.useState)([]),P=Object(s.a)(M,2),B=P[0],R=P[1],_=Object(n.useState)([]),D=Object(s.a)(_,2),F=D[0],H=D[1],W=Object(n.useState)([]),z=Object(s.a)(W,2),A=z[0],U=z[1],J=Object(y.a)({modules:{syntax:!0},formats:["bold","italic","underline","strike","code-block","blockquote","size","header","align","color","background","indent","list","link","image","video","clean"],readOnly:!0}),G=J.quill,Z=J.quillRef;Object(n.useEffect)((function(){p(!1),E(!1);var e=1;i&&(e=i);var t="https://blog-imki123-backend.herokuapp.com/posts/"+e;N.a.get(t,{withCredentials:!0}).then((function(e){C(e.data.comments),p(e.data)})).catch((function(e){alert("\ucc3e\uc73c\uc2dc\ub294 \ud398\uc774\uc9c0\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.\n"+e),l.go(-1)})),t="https://blog-imki123-backend.herokuapp.com/posts/postBody/"+e,N.a.get(t).then((function(e){E(e.data.body),setTimeout((function(){var e,t=document.querySelector("#content");if(a.hash&&(e=document.querySelector(a.hash)),t&&e){var n=e.offsetTop,c=n/100;console.log("scroll",n);var l=setInterval((function(){t.scrollTop+=c,(t.scrollTop+c>=n||t.scrollTop+t.offsetHeight>=t.scrollHeight)&&clearInterval(l)}),10)}}),100)})).catch((function(e){console.log(e)})),"/"===a.pathname&&(t="https://blog-imki123-backend.herokuapp.com/posts/popular",N.a.get(t).then((function(e){H(e.data)})),t="https://blog-imki123-backend.herokuapp.com/posts/recents",N.a.get(t).then((function(e){R(e.data)})),t="https://blog-imki123-backend.herokuapp.com/comments/recent",N.a.get(t).then((function(e){U(e.data)})))}),[a,i,l]),Object(n.useEffect)((function(){G&&(f?G.setContents(f):d&&G.setText(d.text))}),[G,f,d]),Object(n.useEffect)((function(){o.setReady(!1),d&&o.setReady(!0)}));var K=function(e,t){var a,n="https://blog-imki123-backend.herokuapp.com/comments/"+d.postId;e&&e.target&&(a=e.target.querySelector("svg")),a&&a.classList.add("refreshing"),N.a.get(n,{withCredentials:!0}).then((function(e){console.log("".concat(d.postId," \ub313\uae00 \uc0c8\ub85c\uace0\uce68")),C(e.data),a&&a.classList.remove("refreshing"),t&&t()})).catch((function(e){a&&a.classList.remove("refreshing"),alert(e)}))};return Object(n.useEffect)((function(){o.resizeTextarea()}),[T,o,k]),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"post"},"/"===a.pathname?c.a.createElement(x,{data:{title:"\ud589\ubcf5\ud55c \ucf54\ub529 \ube14\ub85c\uadf8 :D",discription:"imki123\uc758 \ud589\ubcf5\ud55c \ucf54\ub529 \ube14\ub85c\uadf8\uc785\ub2c8\ub2e4 :D"}}):c.a.createElement(x,{data:{title:d.title,discription:d.text,locale:"ko"}}),c.a.createElement("div",{className:"nav"},c.a.createElement("div",null,c.a.createElement("span",null,"Tag : "),d.tags&&d.tags.map((function(e,t){return 0===t?c.a.createElement("span",{key:e},c.a.createElement(r.b,{to:"home"===e?"/":"/tags/".concat(e)},e)):c.a.createElement("span",{key:e},", ",c.a.createElement(r.b,{to:"/tags/".concat(e)},e))}))),d&&d.publishedDate.substring(0,16).replace("T"," ")),c.a.createElement("h2",{className:"postTitle"},d.title),c.a.createElement("div",{className:"postContent"},c.a.createElement("div",{id:"editor"},c.a.createElement("div",{ref:Z})),o.login&&"imki123"===o.login.username&&c.a.createElement("div",{className:"postButtons"},c.a.createElement(r.b,{to:"/quill/".concat(d.postId),className:"hover no-drag"},"\uc218\uc815"),"\xa0",c.a.createElement("button",{onClick:function(e){if(window.confirm("\uae00 \uc0ad\uc81c \uc2dc \ubcf5\uad6c\uac00 \ubd88\uac00\ud569\ub2c8\ub2e4. \ud574\ub2f9 \uae00\uc744 \uc815\ub9d0\ub85c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){var t=e.target.id,a="https://blog-imki123-backend.herokuapp.com/posts/"+t;N.a.delete(a,{withCredentials:!0}).then((function(e){console.log("".concat(t,"\ubc88 \uae00 \uc0ad\uc81c \uc131\uacf5")),l.go(-1)})).catch((function(e){return alert(e)}))}},id:d.postId,style:{background:"red"}},"\uc0ad\uc81c"))),c.a.createElement("div",{className:"writeComment"},c.a.createElement("div",{className:"commentProfile"},o.login?"imki123"===o.login.username?c.a.createElement("img",{alt:"PROFILE",src:"/images/avatar.png"}):c.a.createElement("img",{alt:"PROFILE",src:"/images/dog"+(Math.floor(3*Math.random())+1)+".png"}):c.a.createElement("img",{alt:"PROFILE",src:"/images/noavatar.png"})),c.a.createElement("div",{className:"commentContent"},o.login?c.a.createElement("span",{className:"commentUsername"},o.login.username):c.a.createElement("button",{className:"loginButton",onClick:function(){l.push("/login")}},"\ub85c\uadf8\uc778"),o.login?c.a.createElement("textarea",{onChange:o.resizeTextarea,placeholder:" \ub313\uae00\uc744 \ub0a8\uaca8\uc8fc\uc138\uc694 :D"}):c.a.createElement("textarea",{readOnly:!0,placeholder:" \ub85c\uadf8\uc778 \ud6c4\uc5d0 \ub313\uae00\uc744 \ub0a8\uaca8\uc8fc\uc138\uc694 :D"}))),c.a.createElement("div",{className:"commentButtons"},o.login&&c.a.createElement("button",{className:"commentButton",onClick:function(e){var t=document.querySelector(".commentContent textarea");if(t&&""!==t.value&&window.confirm("\ub313\uae00\uc744 \uc791\uc131\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){var a="https://blog-imki123-backend.herokuapp.com/comments/"+d.postId;N.a.patch(a,{withCredentials:!0,data:{username:o.login.username,content:t.value}}).then((function(e){console.log("".concat(d.postId," \ub313\uae00 \ucd94\uac00 \uc131\uacf5")),K(null,L(e.data.comments.length))})).catch((function(e){return alert(e)}))}}},"\ub313\uae00\uc791\uc131")),k&&k.length>0&&c.a.createElement("div",{id:"comments"},c.a.createElement("div",{className:"commentTitle"},c.a.createElement("div",{className:"commentCnt"},"\ub313\uae00 ",k.length,"\uac1c"),c.a.createElement("span",{className:"commentRefresh",onClick:K},"\ub313\uae00 \uc0c8\ub85c\uace0\uce68 ",c.a.createElement(w.a,null))),k.map((function(e,t){return t<T&&c.a.createElement(O,{post:d,comment:e,key:e.commentId,refreshComment:K})})),k.length>T&&c.a.createElement("div",{className:"more"},c.a.createElement("span",{className:"moreButton",onClick:function(e){L(T+10)}},"\ub313\uae00 \ub354\ubcf4\uae30")))),"/"===a.pathname&&c.a.createElement("div",{className:"homeLists"},c.a.createElement(I,{title:"\ucd5c\uc2e0\uae00",list:B}),c.a.createElement(I,{title:"\uc778\uae30\uae00",list:F}),c.a.createElement(q,{title:"\ucd5c\uadfc \ub313\uae00",list:A})))}));a(90);var M=c.a.memo((function(){var e=c.a.useContext(Y),t=Object(i.f)();return Object(n.useEffect)((function(){e.setReady(!0)})),c.a.createElement("div",{className:"notFound"},c.a.createElement("div",{className:"title"},"Not Found Page"),c.a.createElement("div",{className:"goHome"},c.a.createElement("span",{onClick:function(e){t.go(-1)}},"Go back")))}));a(91);var P=c.a.memo((function(e){var t=c.a.useContext(Y),a=Object(i.g)(),l=Object(i.f)(),o="",m=navigator.userAgent.toLowerCase();m.indexOf("chrome")>-1?o="chrome":m.indexOf("safari")>-1&&(o="safari");var u=Object(n.useState)(""),d=Object(s.a)(u,2),p=d[0],g=d[1],h=Object(n.useState)(""),f=Object(s.a)(h,2),E=f[0],v=f[1],b=Object(n.useState)(""),y=Object(s.a)(b,2),k=y[0],N=y[1],O=Object(n.useState)("\ub85c\uadf8\uc778"),C=Object(s.a)(O,2),w=C[0],S=C[1];Object(n.useEffect)((function(){t.setReady(!0)})),Object(n.useEffect)((function(){t.login&&"/login"===a.pathname&&l.replace("/loginStatus"),a.pathname.indexOf("register")>-1?S("\ud68c\uc6d0\uac00\uc785"):a.pathname.indexOf("withdraw")>-1?S("\ud68c\uc6d0\ud0c8\ud1f4"):S("\ub85c\uadf8\uc778")}),[a,t.login,l]);var j=function(e){e.preventDefault();var a="https://blog-imki123-backend.herokuapp.com/auth",n=document.querySelector("[name=username]");n&&(n=n.value=n.value.replace(/[^a-zA-Z0-9\uac00-\ud7a3_]/g,""));var c=document.querySelector("[name=password]");c&&(c=c.value),""===p&&c.length>=1&&""===E&&""===k?"\ud68c\uc6d0\uac00\uc785"===w?(a+="/register",fetch(a,{mode:"cors",method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:c})}).then((function(e){if(200===e.status||201===e.status)e.json().then((function(e){alert(e.username+"\ub2d8\uc758 \ud68c\uc6d0\uac00\uc785\uc5d0 \uc131\uacf5\ud588\uc2b5\ub2c8\ub2e4 :D"),l.go(-1)}));else{var t="\ud68c\uc6d0\uac00\uc785\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4 :(";409===e.status&&(t+="\n\uc774\ubbf8 \uc874\uc7ac\ud558\ub294 \uc544\uc774\ub514\uc785\ub2c8\ub2e4."),400===e.status&&(t+="\n\uc544\uc774\ub514\ub098 \ube44\ubc00\ubc88\ud638\ub97c \ud655\uc778\ud574\uc8fc\uc138\uc694."),alert(t)}})).catch((function(e){return console.error(e)}))):"\ud68c\uc6d0\ud0c8\ud1f4"===w?window.confirm("\uacc4\uc815 \ud0c8\ud1f4\uc2dc \ubcf5\uad6c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc815\ub9d0\ub85c \ud0c8\ud1f4\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")&&(a+="/withdraw",fetch(a,{mode:"cors",method:"DELETE",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t.login.username,password:c})}).then((function(e){if(200===e.status)alert("\uacc4\uc815\uc774 \ud0c8\ud1f4\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \ub610 \ub4e4\ub7ec \uc8fc\uc138\uc694 :D"),l.push("/");else{var t="\ud0c8\ud1f4\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4 :(";204===e.status&&(t+="\n\uc874\uc7ac\ud558\uc9c0 \uc54a\ub294 \uc544\uc774\ub514\uc785\ub2c8\ub2e4."),401===e.status&&(t+="\n\ube44\ubc00\ubc88\ud638\ub97c \ud655\uc778\ud574\uc8fc\uc138\uc694."),alert(t)}})).catch((function(e){return console.error(e)}))):(a+="/login",fetch(a,{mode:"cors",method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:c})}).then((function(e){if(200===e.status||201===e.status)e.json().then((function(e){t.setLogin(e),alert(e.username+"\ub2d8 \ud658\uc601\ud569\ub2c8\ub2e4 :D"),l.go(-1)}));else{var a="\ub85c\uadf8\uc778\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4 :(";401===e.status&&(a+="\n\ub85c\uadf8\uc778 \uc815\ubcf4\ub97c \ud655\uc778\ud574\uc8fc\uc138\uc694."),alert(a)}})).catch((function(e){return console.error(e)}))):alert("\uc785\ub825 \uc815\ubcf4\ub97c \ud655\uc778\ud574\uc8fc\uc138\uc694.")};return c.a.createElement("div",{id:"background"},c.a.createElement("div",{id:"loginWrapper"},c.a.createElement("form",{id:"login"},c.a.createElement(i.c,null,c.a.createElement(i.a,{path:["/login","/register","/withdraw"]},c.a.createElement("div",{className:"text"},"\uc544\uc774\ub514"),"\ud68c\uc6d0\ud0c8\ud1f4"===w?c.a.createElement("div",null,t.login.username):c.a.createElement("input",{name:"username",onChange:function(e){var t=e.target.value=e.target.value.replace(/\s/g,"_").replace(/[^a-zA-Z0-9\u3131-\u314e\u314f-\u3163\uac00-\ud7a3_]/g,"");t.length<3?g("- 3\uc790 \uc774\uc0c1 \uc785\ub825\ud574\uc8fc\uc138\uc694"):t.length>20?g("- 20\uc790 \uc774\ud558\ub85c \uc785\ub825\ud574\uc8fc\uc138\uc694"):g("")}}),c.a.createElement("div",{className:"check"},p),c.a.createElement("div",{className:"text"},"\ube44\ubc00\ubc88\ud638"),c.a.createElement("input",{name:"password",type:"password",onChange:function(e){var t=e.target.value,a=document.querySelector("[name=passwordConfirm]");a&&(a.value="",N("")),t.length<6?v("- 6\uc790 \uc774\uc0c1 \uc785\ub825\ud574\uc8fc\uc138\uc694"):t.length>20?v("- 20\uc790 \uc774\ud558\ub85c \uc785\ub825\ud574\uc8fc\uc138\uc694"):v("")},autoComplete:"currnet-password"}),c.a.createElement("div",{className:"check"},E),"\ud68c\uc6d0\uac00\uc785"===w&&c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"text"},"\ube44\ubc00\ubc88\ud638 \ud655\uc778"),c.a.createElement("input",{name:"passwordConfirm",type:"password",onChange:function(e){var t=e.target.value;t!==document.querySelector("[name=password]").value&&t.length>=1?N("- \ube44\ubc00\ubc88\ud638\uac00 \uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4"):N("")},autoComplete:"currnet-password"}),c.a.createElement("div",{className:"check",id:"checkPasswordConfirm"},k)),"\ud68c\uc6d0\ud0c8\ud1f4"===w?c.a.createElement("button",{style:{background:"red"},onClick:j},w):c.a.createElement("button",{onClick:j},w),"\ub85c\uadf8\uc778"===w&&c.a.createElement(r.b,{to:"/register",className:"loginLink"},"\ud68c\uc6d0\uac00\uc785"),"\ud68c\uc6d0\uac00\uc785"===w&&c.a.createElement(r.b,{to:"/login",className:"loginLink"},"\ub85c\uadf8\uc778"),"safari"===o&&c.a.createElement("div",{className:"text",style:{fontSize:"0.8rem",textAlign:"center"}},"(Safari\uc758 \uacbd\uc6b0 \uc124\uc815\uc744 \ubcc0\uacbd\ud574\uc8fc\uc154\uc57c \ub85c\uadf8\uc778\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4.",c.a.createElement("br",null),"\uc124\uc815 \u2192 Safari \u2192 \uac1c\uc778 \uc815\ubcf4 \ubcf4\ud638 \ubc0f \ubcf4\uc548 \u2192 ",c.a.createElement("br",null),"\ud06c\ub85c\uc2a4 \uc0ac\uc774\ud2b8 \ucd94\uc801\ubc29\uc9c0 OFF, \ubaa8\ub4e0 \ucfe0\ud0a4 \ucc28\ub2e8 OFF)")),c.a.createElement(i.a,{path:["/loginStatus"]},t.login?c.a.createElement("div",{className:"center"},t.login.username,"\ub2d8\uc740 \ud604\uc7ac ",c.a.createElement("span",{style:{color:"green"}},"\ub85c\uadf8\uc778")," \ub418\uc5b4\uc788\uc2b5\ub2c8\ub2e4 :D",c.a.createElement("br",null),c.a.createElement("span",{style:{fontSize:"0.8rem"}},"(\ub85c\uadf8\uc778\uc740 \ucd5c\ub300 \uc77c\uc8fc\uc77c\uac04 \uc720\uc9c0\ub429\ub2c8\ub2e4.)")):c.a.createElement("div",{className:"center"},"\uc7ac \ub85c\uadf8\uc778\uc774 \ud544\uc694\ud569\ub2c8\ub2e4 :D"))))))})),B=a(26),R=a(20),_=(a(92),a(93),a(42)),D=a.n(_);var F=c.a.memo((function(e){var t=e.match,a=e.location,l=e.history,o=c.a.useContext(Y),r=t.params.postId,i=Object(n.useState)(),m=Object(s.a)(i,2),u=m[0],d=m[1],p=Object(n.useState)(),g=Object(s.a)(p,2),h=g[0],f=g[1],E=Object(n.useState)(),v=Object(s.a)(E,2),b=v[0],k=v[1],O=Object(y.a)({modules:{toolbar:[["bold","italic","underline","strike"],[{size:["small",!1,"large","huge"]},{header:1},{header:2}],[{align:[]}],[{color:[]},{background:[]}],[{indent:"-1"},{indent:"+1"}],[{list:"ordered"},{list:"bullet"}],["code-block","blockquote"],["link","image","video"],["clean"]],syntax:!0,imageCompress:{quality:.7,maxWidth:1e3,maxHeight:1e3,imageType:"image/jpeg",debug:!0}},formats:["bold","italic","underline","strike","code-block","blockquote","size","header","align","color","background","indent","list","link","image","video","clean"]}),C=O.quill,w=O.quillRef,S=O.Quill;S&&!C&&S.register("modules/imageCompress",D.a),Object(n.useEffect)((function(){if(f(!1),void 0!==r&&Number(r)>=1&&C){var e="https://blog-imki123-backend.herokuapp.com/posts/"+r;N.a.get(e,{withCredentials:!0}).then((function(t){document.querySelector("[name=title]").value=t.data.title;var a,n=document.querySelectorAll("[type=radio]"),c=Object(R.a)(n);try{for(c.s();!(a=c.n()).done;){a.value.checked=!1}}catch(u){c.e(u)}finally{c.f()}if(t.data.tags){var l=document.getElementById(t.data.tags[0]);l&&(l.checked=!0);var s,i=Object(R.a)(o.menus);try{for(i.s();!(s=i.n()).done;){var m=s.value;m.name===t.data.tags[0]&&k(m.subMenus)}}catch(u){i.e(u)}finally{i.f()}}e="https://blog-imki123-backend.herokuapp.com/posts/postBody/"+r,N.a.get(e).then((function(e){"string"===typeof e.data.body?C.setText(e.data.body):C.setContents(e.data.body),d(Object(B.a)(Object(B.a)({},t.data),{},{body:e.data.body}))})).catch((function(e){alert(e),f(!0)}))})).catch((function(e){alert(e),f(!0)}))}else f(!0)}),[a,C,r,o.menus]),Object(n.useEffect)((function(){if(b&&u){var e=document.getElementById(u.tags[1]);e&&(e.checked=!0)}var t=document.querySelector("[name=newSubMenu]");t&&(t.value="")}),[b,u]),Object(n.useEffect)((function(){o.setReady(!1),(u||h)&&o.setReady(!0)}));var j=function(e){if(!o.login||o.login&&"imki123"!==o.login.username)alert("\uae00 \uc791\uc131\uc740 \ube14\ub85c\uadf8 \uc8fc\uc778\ub9cc \uac00\ub2a5\ud569\ub2c8\ub2e4 ^^;");else if(window.confirm("\uae00\uc744 \uac8c\uc2dc\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){var t=document.querySelector("[name=title]"),a=C.getContents(),n=C.getText(),c=document.querySelector("[name=mainMenu]:checked"),s=[],i=document.querySelector("[name=subMenu]:checked"),m=document.querySelector("[name=newMainMenu]"),u=document.querySelector("[name=newSubMenu]");if(c&&(s[0]=c.value),""!==m.value&&(s[0]=m.value),i&&""!==i.value&&(s[1]=i.value),""!==u.value&&(s[1]=u.value),0!==t.value.length)if(1!==C.getLength())if(s.length<1&&""===m.value)alert("\uba54\uc778\uba54\ub274\ub97c 1\uac1c \uc120\ud0dd\ud574\uc8fc\uc138\uc694.");else{var d="https://blog-imki123-backend.herokuapp.com/posts",p="POST",g="\uae00 \uc791\uc131 \uc131\uacf5";if("PATCH"===e.target.id){if(!(void 0!==r&&Number(r)>=1))return void console.log("postId \ube44\uc815\uc0c1, \uae00 \uc218\uc815 \uc2e4\ud328");d+="/"+r,p="PATCH",g="\uae00 \uc218\uc815 \uc131\uacf5"}N()(d,{method:p,withCredentials:!0,data:{title:t.value,body:a,text:n,tags:s}}).then((function(e){alert(g),r=e.data.postId,"POST"===p&&N()(),r>1?l.push("/posts/".concat(r)):l.push("/posts/1")})).catch((function(e){return alert(e)}))}else alert("\ub0b4\uc6a9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.");else alert("\uc81c\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.")}};Object(n.useEffect)((function(){var e=document.querySelector("#editor"),t=document.querySelector(".ql-toolbar");e&&t&&(e.style.marginBottom=t.clientHeight+10+"px"),window.removeEventListener("resize",(function(){})),window.addEventListener("resize",(function(){e&&t&&(e.style.marginBottom=t.clientHeight+10+"px")}))}),[a]);var x=function(e){if(o.menus){var t,a=Object(R.a)(o.menus);try{for(a.s();!(t=a.n()).done;){var n=t.value;n.name===e.target.value&&k(n.subMenus)}}catch(l){a.e(l)}finally{a.f()}}if("radio"!==e.target.type){e.target.value=e.target.value.replace(/\s/g,"_");var c=document.querySelector("[name=mainMenu]:checked");c&&(c.checked=!1)}},T=function(e){if("radio"!==e.target.type){e.target.value=e.target.value.replace(/\s/g,"_");var t=document.querySelector("[name=subMenu]:checked");t&&(t.checked=!1)}else{var a=document.querySelector("[name=newSubMenu]");a&&(a.value="")}};return c.a.createElement("div",{className:"quill"},c.a.createElement("div",{className:"quillTitle"},c.a.createElement("input",{name:"title",placeholder:"\uc81c\ubaa9"})),c.a.createElement("div",{id:"editor"},c.a.createElement("div",{ref:w}),c.a.createElement("div",{id:"tags",className:"no-drag"},c.a.createElement("div",{id:"tagsTitle"},"tags",void 0!==r&&Number(r)>=1?c.a.createElement("button",{className:"editorButton",onClick:j,id:"PATCH"},"\uae00 \uc218\uc815"):c.a.createElement("button",{className:"editorButton",onClick:j},"\uc0c8\uae00 \uc791\uc131")),c.a.createElement("div",null,"\uba54\uc778\uba54\ub274:",o.menus&&o.menus.map((function(e){return c.a.createElement("label",{key:e.name},c.a.createElement("input",{type:"radio",name:"mainMenu",value:e.name,id:e.name,onClick:x}),e.name)})),c.a.createElement("input",{name:"newMainMenu",placeholder:"\uba54\uc778\uba54\ub274 \ucd94\uac00",onChange:x,autoComplete:"off"})),c.a.createElement("div",null,"\uc11c\ube0c\uba54\ub274:",c.a.createElement("label",null,c.a.createElement("input",{type:"radio",name:"subMenu",value:"",onClick:T})," \uc120\ud0dd\uc548\ud568"),b&&b.map((function(e){return c.a.createElement("label",{key:e.name},c.a.createElement("input",{type:"radio",name:"subMenu",value:e.name,id:e.name,onClick:T})," ",e.name)})),c.a.createElement("input",{name:"newSubMenu",placeholder:"\uc11c\ube0c\uba54\ub274 \ucd94\uac00",autoComplete:"off",onChange:T})))))})),H=(a(94),a(43)),W=a.n(H);var z=c.a.memo((function(e){var t=e.postCount,a=Object(i.g)(),l=W.a.parse(a.search),o=null,s=[];if(t){var m=Number(l.page)||1,u=t-10*(m-1);o={page:m,lastPage:Math.ceil(t/10),postCount:t,startPost:u};for(var d=0;d<o.lastPage;d++)s.push(d+1)}return Object(n.useEffect)((function(){for(var e=document.querySelectorAll(".paging a"),t=0;t<e.length;t++)e[t].innerHTML===l.page?e[t].className="activePage":e[t].className="inactivePage",void 0===l.page&&"1"===e[t].innerHTML&&(e[t].className="activePage")}),[l,t]),c.a.createElement("div",{className:"paging"},s.map((function(e,t){return c.a.createElement(r.c,{path:a.pathname,to:"".concat(a.pathname,"?page=").concat(e),className:"inactivePage",key:t},e)})))}));a(107);var A=c.a.memo((function(e){var t=e.match,a=e.location,l=e.history,o=c.a.useContext(Y),r=t.params.tag,i=Object(n.useState)([]),m=Object(s.a)(i,2),u=m[0],d=m[1];return Object(n.useEffect)((function(){var e="https://blog-imki123-backend.herokuapp.com/posts/tag/"+r+a.search;N.a.get(e,{withCredentials:!0}).then((function(e){e.data.list.length<1?(alert("\ucc3e\uc73c\uc2dc\ub294 \ud398\uc774\uc9c0\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."),l.go(-1)):d(e.data.list)})).catch((function(e){return alert(e)}))}),[r,a,l]),Object(n.useEffect)((function(){o.setReady(!1),u&&o.setReady(!0)})),c.a.createElement("div",{className:"postListWrapper"},c.a.createElement("div",{className:"postListTitle"},r.substring(0,1).toUpperCase()+r.substring(1)),u&&u.map((function(e,t){return c.a.createElement(T,{no:u.length-t,list:e,key:e.postId})})),c.a.createElement(z,{postCount:u.length}))}));var U=c.a.memo((function(e){var t=c.a.useContext(Y),a=Object(i.g)();return Object(n.useEffect)((function(){var e=function(){t.resizeTextarea()};window.addEventListener("resize",e);var n=document.querySelector("#loading"),c=document.querySelector(".post");return t.ready?(n&&(n.style.display="none"),c&&(c.style.display="block"),a.hash&&setTimeout((function(){var e=document.querySelector("#content"),t=document.querySelector(a.hash);if(t){var n=e.scrollTop,c=t.offsetTop,l=(c-n)/50;if(c>n)var o=setInterval((function(){e.scrollTop+l>=c||e.scrollTop>=e.scrollHeight-e.clientHeight?clearInterval(o):e.scrollTop+=l}),10);else var r=setInterval((function(){e.scrollTop<=c?clearInterval(r):e.scrollTop+=l}),10)}}),10),setTimeout((function(){t.resizeTextarea()}),10)):(n&&(n.style.display="flex"),c&&(c.style.display="none")),window.removeEventListener("resize",e)}),[a.hash,t]),c.a.createElement("div",{id:"content",className:"slideMenu"},t.login&&"imki123"===t.login.username&&c.a.createElement(r.b,{id:"postFAB",className:"hover",to:"/quill"},c.a.createElement(E.a,null)),c.a.createElement("div",{id:"scrollFAB",className:"hover",onClick:function(e){var t=document.querySelector("#content"),a=t.scrollTop/50,n=setInterval((function(){t.scrollTop<=0?clearInterval(n):t.scrollTop-=a}),10)}},c.a.createElement(b.a,null)),c.a.createElement("div",{id:"menuFAB",className:"hover",onClick:t.slideMenu},c.a.createElement("img",{alt:"MENU",src:"/images/guide_icon.png"})),c.a.createElement("div",{id:"loading"},c.a.createElement("img",{alt:"Loading",src:"/images/loading.gif"})),c.a.createElement(i.c,null,c.a.createElement(i.a,{path:["/login","/register","/loginStatus","/withdraw"],component:P}),c.a.createElement(i.a,{path:"/quill/:postId?",component:F}),c.a.createElement(i.a,{path:"/tags/:tag",component:A}),c.a.createElement(i.a,{path:"/",exact:!0,component:L}),c.a.createElement(i.a,{path:"/posts/:postId",component:L}),c.a.createElement(i.a,{path:"/NotFoundPage",component:M}),c.a.createElement(i.a,{path:"*",component:M})),c.a.createElement("textarea",{disabled:!0,id:"fakeTextarea"}))}));a(108);var J=c.a.memo((function(e){var t=c.a.useContext(Y);return c.a.createElement("div",{id:"settingWrapper",onClick:function(e){var t=document.querySelector("#settingWrapper");e.stopPropagation(),setTimeout((function(){t.style.display="none"}),200)}},c.a.createElement("div",{id:"setting"},c.a.createElement("div",{id:"settingListWrapper"},t.login?c.a.createElement(r.b,{className:"settingList",to:"/loginStatus"},t.login.username):c.a.createElement(r.b,{className:"settingList",to:"/login"},"\ub85c\uadf8\uc778"),t.login&&c.a.createElement("div",{className:"settingList",onClick:function(e){if(window.confirm("\ub85c\uadf8\uc544\uc6c3 \ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){fetch("https://blog-imki123-backend.herokuapp.com/auth/logout",{mode:"cors",method:"POST",credentials:"include"}).then((function(e){204===e.status?(console.log("\ub85c\uadf8\uc544\uc6c3 \uc131\uacf5"),t.setLogin(!1)):console.log("\ub85c\uadf8\uc544\uc6c3 \uc2e4\ud328")})).catch((function(e){return console.error(e)}))}}},"\ub85c\uadf8\uc544\uc6c3"),!t.login&&c.a.createElement(r.b,{className:"settingList",to:"/register"},"\ud68c\uc6d0\uac00\uc785"),t.login&&c.a.createElement(r.b,{className:"settingList",to:"/withdraw"},"\ud68c\uc6d0\ud0c8\ud1f4"))))})),Y=Object(n.createContext)();var G=c.a.memo((function(){var e=Object(i.g)(),t=Object(n.useState)(!1),a=Object(s.a)(t,2),l=a[0],o=a[1],r=Object(n.useState)([]),d=Object(s.a)(r,2),p=d[0],g=d[1],f=Object(n.useState)({}),E=Object(s.a)(f,2),v=E[0],b=E[1],y=Object(n.useState)(!1),k=Object(s.a)(y,2),O=k[0],C=k[1],w=Object(n.useState)(!1),S=Object(s.a)(w,2),j=S[0],T=S[1],I=Object(n.useState)([{name:"home",count:1,order:1},{name:"programming",order:2},{name:"article",order:3}]),q=Object(s.a)(I,2),L=q[0],M=q[1],P=function(e){N.a.get("https://blog-imki123-backend.herokuapp.com/auth/check",{withCredentials:!0}).then((function(t){t.data?(console.log("\ud1a0\ud070 \uccb4\ud06c \uc131\uacf5"),C(t.data)):(console.log("\ud1a0\ud070 \uc5c6\uc74c"),C(!1)),e&&e()})).catch((function(t){e&&e()}))},B={ready:l,setReady:o,posts:p,setPosts:g,headers:v,setHeaders:b,login:O,setLogin:C,refresh:j,setRefresh:T,menus:L,setMenus:M,resizeTextarea:function(e){var t=document.querySelector("#fakeTextarea"),a=[];if(e&&e.target?a.push(e.target):a=document.querySelectorAll("textarea"),a&&t){for(var n=0;n<a.length;n++)t.style.height="1px",t.style.width=a[n].clientWidth+"px",t.value=a[n].value,a[n].style.height=5+t.scrollHeight+"px";t.value="",t.style.height="0px"}},slideMenu:function(){var e=document.querySelector("#body"),t=document.querySelector("#guideWrapper"),a=document.querySelector("#content");t.style.left.replace("px","")>-100?(t.parentNode.style.width="0",a.style.width="calc(100% - 16px)",t.style.left="-312px"):(t.style.left="0px",e.clientWidth<500?t.parentNode.style.width="100%":a.style.width="calc(100% - 312px - 16px)")},checkToken:P};return Object(n.useEffect)((function(){N.a.get("https://blog-imki123-backend.herokuapp.com/menus",{withCredentials:!0}).then((function(e){M(e.data)})).catch((function(e){return alert(e)}))}),[e.pathname,j]),Object(n.useEffect)((function(){P()}),[e.pathname,e.search,j]),c.a.createElement(Y.Provider,{value:B},c.a.createElement("div",{id:"app"},c.a.createElement(x,{data:{title:"\ud589\ubcf5\ud55c \ucf54\ub529 \ube14\ub85c\uadf8 :D",discription:"imki123\uc758 \ud589\ubcf5\ud55c \ucf54\ub529 \ube14\ub85c\uadf8\uc785\ub2c8\ub2e4 :D",image:"/images/imcat_800x400.png"}}),c.a.createElement(m,null),c.a.createElement(J,null),c.a.createElement(u,null,c.a.createElement(h,null),c.a.createElement(U,null))))})),Z=document.getElementById("root");Z.hasChildNodes()?Object(l.hydrate)(c.a.createElement(r.a,null,c.a.createElement(G,null)),Z):o.a.render(c.a.createElement(r.a,{basename:""},c.a.createElement(G,null)),document.getElementById("root"))},47:function(e,t,a){e.exports=a(110)},52:function(e,t,a){},53:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){},60:function(e,t,a){},62:function(e,t,a){},63:function(e,t,a){},69:function(e,t,a){},87:function(e,t,a){},88:function(e,t,a){},89:function(e,t,a){},90:function(e,t,a){},91:function(e,t,a){},92:function(e,t,a){},94:function(e,t,a){}},[[47,1,2]]]);
//# sourceMappingURL=main.9bd51ed6.chunk.js.map