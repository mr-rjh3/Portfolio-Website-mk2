(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();var De={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},ce={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},nt=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],J={CSS:{},springs:{}};function O(e,t,r){return Math.min(Math.max(e,t),r)}function Z(e,t){return e.indexOf(t)>-1}function oe(e,t){return e.apply(null,t)}var l={arr:function(e){return Array.isArray(e)},obj:function(e){return Z(Object.prototype.toString.call(e),"Object")},pth:function(e){return l.obj(e)&&e.hasOwnProperty("totalLength")},svg:function(e){return e instanceof SVGElement},inp:function(e){return e instanceof HTMLInputElement},dom:function(e){return e.nodeType||l.svg(e)},str:function(e){return typeof e=="string"},fnc:function(e){return typeof e=="function"},und:function(e){return typeof e>"u"},nil:function(e){return l.und(e)||e===null},hex:function(e){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)},rgb:function(e){return/^rgb/.test(e)},hsl:function(e){return/^hsl/.test(e)},col:function(e){return l.hex(e)||l.rgb(e)||l.hsl(e)},key:function(e){return!De.hasOwnProperty(e)&&!ce.hasOwnProperty(e)&&e!=="targets"&&e!=="keyframes"}};function Be(e){var t=/\(([^)]+)\)/.exec(e);return t?t[1].split(",").map(function(r){return parseFloat(r)}):[]}function Fe(e,t){var r=Be(e),a=O(l.und(r[0])?1:r[0],.1,100),n=O(l.und(r[1])?100:r[1],.1,100),o=O(l.und(r[2])?10:r[2],.1,100),u=O(l.und(r[3])?0:r[3],.1,100),s=Math.sqrt(n/a),i=o/(2*Math.sqrt(n*a)),y=i<1?s*Math.sqrt(1-i*i):0,c=1,f=i<1?(i*s+-u)/y:-u+s;function p(m){var d=t?t*m/1e3:m;return i<1?d=Math.exp(-d*i*s)*(c*Math.cos(y*d)+f*Math.sin(y*d)):d=(c+f*d)*Math.exp(-d*s),m===0||m===1?m:1-d}function T(){var m=J.springs[e];if(m)return m;for(var d=1/6,x=0,M=0;;)if(x+=d,p(x)===1){if(M++,M>=16)break}else M=0;var v=x*d*1e3;return J.springs[e]=v,v}return t?p:T}function at(e){return e===void 0&&(e=10),function(t){return Math.ceil(O(t,1e-6,1)*e)*(1/e)}}var it=function(){var e=11,t=1/(e-1);function r(c,f){return 1-3*f+3*c}function a(c,f){return 3*f-6*c}function n(c){return 3*c}function o(c,f,p){return((r(f,p)*c+a(f,p))*c+n(f))*c}function u(c,f,p){return 3*r(f,p)*c*c+2*a(f,p)*c+n(f)}function s(c,f,p,T,m){var d,x,M=0;do x=f+(p-f)/2,d=o(x,T,m)-c,d>0?p=x:f=x;while(Math.abs(d)>1e-7&&++M<10);return x}function i(c,f,p,T){for(var m=0;m<4;++m){var d=u(f,p,T);if(d===0)return f;var x=o(f,p,T)-c;f-=x/d}return f}function y(c,f,p,T){if(!(0<=c&&c<=1&&0<=p&&p<=1))return;var m=new Float32Array(e);if(c!==f||p!==T)for(var d=0;d<e;++d)m[d]=o(d*t,c,p);function x(M){for(var v=0,g=1,w=e-1;g!==w&&m[g]<=M;++g)v+=t;--g;var A=(M-m[g])/(m[g+1]-m[g]),b=v+A*t,B=u(b,c,p);return B>=.001?i(M,b,c,p):B===0?b:s(M,v,v+t,c,p)}return function(M){return c===f&&p===T||M===0||M===1?M:o(x(M),f,T)}}return y}(),qe=function(){var e={linear:function(){return function(a){return a}}},t={Sine:function(){return function(a){return 1-Math.cos(a*Math.PI/2)}},Circ:function(){return function(a){return 1-Math.sqrt(1-a*a)}},Back:function(){return function(a){return a*a*(3*a-2)}},Bounce:function(){return function(a){for(var n,o=4;a<((n=Math.pow(2,--o))-1)/11;);return 1/Math.pow(4,3-o)-7.5625*Math.pow((n*3-2)/22-a,2)}},Elastic:function(a,n){a===void 0&&(a=1),n===void 0&&(n=.5);var o=O(a,1,10),u=O(n,.1,2);return function(s){return s===0||s===1?s:-o*Math.pow(2,10*(s-1))*Math.sin((s-1-u/(Math.PI*2)*Math.asin(1/o))*(Math.PI*2)/u)}}},r=["Quad","Cubic","Quart","Quint","Expo"];return r.forEach(function(a,n){t[a]=function(){return function(o){return Math.pow(o,n+2)}}}),Object.keys(t).forEach(function(a){var n=t[a];e["easeIn"+a]=n,e["easeOut"+a]=function(o,u){return function(s){return 1-n(o,u)(1-s)}},e["easeInOut"+a]=function(o,u){return function(s){return s<.5?n(o,u)(s*2)/2:1-n(o,u)(s*-2+2)/2}},e["easeOutIn"+a]=function(o,u){return function(s){return s<.5?(1-n(o,u)(1-s*2))/2:(n(o,u)(s*2-1)+1)/2}}}),e}();function le(e,t){if(l.fnc(e))return e;var r=e.split("(")[0],a=qe[r],n=Be(e);switch(r){case"spring":return Fe(e,t);case"cubicBezier":return oe(it,n);case"steps":return oe(at,n);default:return oe(a,n)}}function Ve(e){try{var t=document.querySelectorAll(e);return t}catch{return}}function ee(e,t){for(var r=e.length,a=arguments.length>=2?arguments[1]:void 0,n=[],o=0;o<r;o++)if(o in e){var u=e[o];t.call(a,u,o,e)&&n.push(u)}return n}function te(e){return e.reduce(function(t,r){return t.concat(l.arr(r)?te(r):r)},[])}function Te(e){return l.arr(e)?e:(l.str(e)&&(e=Ve(e)||e),e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e])}function fe(e,t){return e.some(function(r){return r===t})}function de(e){var t={};for(var r in e)t[r]=e[r];return t}function ue(e,t){var r=de(e);for(var a in e)r[a]=t.hasOwnProperty(a)?t[a]:e[a];return r}function re(e,t){var r=de(e);for(var a in t)r[a]=l.und(e[a])?t[a]:e[a];return r}function ot(e){var t=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e);return t?"rgba("+t[1]+",1)":e}function ut(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,r=e.replace(t,function(s,i,y,c){return i+i+y+y+c+c}),a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r),n=parseInt(a[1],16),o=parseInt(a[2],16),u=parseInt(a[3],16);return"rgba("+n+","+o+","+u+",1)"}function st(e){var t=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e),r=parseInt(t[1],10)/360,a=parseInt(t[2],10)/100,n=parseInt(t[3],10)/100,o=t[4]||1;function u(p,T,m){return m<0&&(m+=1),m>1&&(m-=1),m<1/6?p+(T-p)*6*m:m<1/2?T:m<2/3?p+(T-p)*(2/3-m)*6:p}var s,i,y;if(a==0)s=i=y=n;else{var c=n<.5?n*(1+a):n+a-n*a,f=2*n-c;s=u(f,c,r+1/3),i=u(f,c,r),y=u(f,c,r-1/3)}return"rgba("+s*255+","+i*255+","+y*255+","+o+")"}function ct(e){if(l.rgb(e))return ot(e);if(l.hex(e))return ut(e);if(l.hsl(e))return st(e)}function I(e){var t=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);if(t)return t[1]}function lt(e){if(Z(e,"translate")||e==="perspective")return"px";if(Z(e,"rotate")||Z(e,"skew"))return"deg"}function se(e,t){return l.fnc(e)?e(t.target,t.id,t.total):e}function P(e,t){return e.getAttribute(t)}function ge(e,t,r){var a=I(t);if(fe([r,"deg","rad","turn"],a))return t;var n=J.CSS[t+r];if(!l.und(n))return n;var o=100,u=document.createElement(e.tagName),s=e.parentNode&&e.parentNode!==document?e.parentNode:document.body;s.appendChild(u),u.style.position="absolute",u.style.width=o+r;var i=o/u.offsetWidth;s.removeChild(u);var y=i*parseFloat(t);return J.CSS[t+r]=y,y}function He(e,t,r){if(t in e.style){var a=t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),n=e.style[t]||getComputedStyle(e).getPropertyValue(a)||"0";return r?ge(e,n,r):n}}function ve(e,t){if(l.dom(e)&&!l.inp(e)&&(!l.nil(P(e,t))||l.svg(e)&&e[t]))return"attribute";if(l.dom(e)&&fe(nt,t))return"transform";if(l.dom(e)&&t!=="transform"&&He(e,t))return"css";if(e[t]!=null)return"object"}function je(e){if(l.dom(e)){for(var t=e.style.transform||"",r=/(\w+)\(([^)]*)\)/g,a=new Map,n;n=r.exec(t);)a.set(n[1],n[2]);return a}}function ft(e,t,r,a){var n=Z(t,"scale")?1:0+lt(t),o=je(e).get(t)||n;return r&&(r.transforms.list.set(t,o),r.transforms.last=t),a?ge(e,o,a):o}function he(e,t,r,a){switch(ve(e,t)){case"transform":return ft(e,t,a,r);case"css":return He(e,t,r);case"attribute":return P(e,t);default:return e[t]||0}}function pe(e,t){var r=/^(\*=|\+=|-=)/.exec(e);if(!r)return e;var a=I(e)||0,n=parseFloat(t),o=parseFloat(e.replace(r[0],""));switch(r[0][0]){case"+":return n+o+a;case"-":return n-o+a;case"*":return n*o+a}}function ze(e,t){if(l.col(e))return ct(e);if(/\s/g.test(e))return e;var r=I(e),a=r?e.substr(0,e.length-r.length):e;return t?a+t:a}function ye(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function dt(e){return Math.PI*2*P(e,"r")}function gt(e){return P(e,"width")*2+P(e,"height")*2}function vt(e){return ye({x:P(e,"x1"),y:P(e,"y1")},{x:P(e,"x2"),y:P(e,"y2")})}function $e(e){for(var t=e.points,r=0,a,n=0;n<t.numberOfItems;n++){var o=t.getItem(n);n>0&&(r+=ye(a,o)),a=o}return r}function ht(e){var t=e.points;return $e(e)+ye(t.getItem(t.numberOfItems-1),t.getItem(0))}function Re(e){if(e.getTotalLength)return e.getTotalLength();switch(e.tagName.toLowerCase()){case"circle":return dt(e);case"rect":return gt(e);case"line":return vt(e);case"polyline":return $e(e);case"polygon":return ht(e)}}function pt(e){var t=Re(e);return e.setAttribute("stroke-dasharray",t),t}function yt(e){for(var t=e.parentNode;l.svg(t)&&l.svg(t.parentNode);)t=t.parentNode;return t}function We(e,t){var r=t||{},a=r.el||yt(e),n=a.getBoundingClientRect(),o=P(a,"viewBox"),u=n.width,s=n.height,i=r.viewBox||(o?o.split(" "):[0,0,u,s]);return{el:a,viewBox:i,x:i[0]/1,y:i[1]/1,w:u,h:s,vW:i[2],vH:i[3]}}function mt(e,t){var r=l.str(e)?Ve(e)[0]:e,a=t||100;return function(n){return{property:n,el:r,svg:We(r),totalLength:Re(r)*(a/100)}}}function xt(e,t,r){function a(c){c===void 0&&(c=0);var f=t+c>=1?t+c:0;return e.el.getPointAtLength(f)}var n=We(e.el,e.svg),o=a(),u=a(-1),s=a(1),i=r?1:n.w/n.vW,y=r?1:n.h/n.vH;switch(e.property){case"x":return(o.x-n.x)*i;case"y":return(o.y-n.y)*y;case"angle":return Math.atan2(s.y-u.y,s.x-u.x)*180/Math.PI}}function we(e,t){var r=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,a=ze(l.pth(e)?e.totalLength:e,t)+"";return{original:a,numbers:a.match(r)?a.match(r).map(Number):[0],strings:l.str(e)||t?a.split(r):[]}}function me(e){var t=e?te(l.arr(e)?e.map(Te):Te(e)):[];return ee(t,function(r,a,n){return n.indexOf(r)===a})}function Ne(e){var t=me(e);return t.map(function(r,a){return{target:r,id:a,total:t.length,transforms:{list:je(r)}}})}function bt(e,t){var r=de(t);if(/^spring/.test(r.easing)&&(r.duration=Fe(r.easing)),l.arr(e)){var a=e.length,n=a===2&&!l.obj(e[0]);n?e={value:e}:l.fnc(t.duration)||(r.duration=t.duration/a)}var o=l.arr(e)?e:[e];return o.map(function(u,s){var i=l.obj(u)&&!l.pth(u)?u:{value:u};return l.und(i.delay)&&(i.delay=s?0:t.delay),l.und(i.endDelay)&&(i.endDelay=s===o.length-1?t.endDelay:0),i}).map(function(u){return re(u,r)})}function Mt(e){for(var t=ee(te(e.map(function(o){return Object.keys(o)})),function(o){return l.key(o)}).reduce(function(o,u){return o.indexOf(u)<0&&o.push(u),o},[]),r={},a=function(o){var u=t[o];r[u]=e.map(function(s){var i={};for(var y in s)l.key(y)?y==u&&(i.value=s[y]):i[y]=s[y];return i})},n=0;n<t.length;n++)a(n);return r}function Et(e,t){var r=[],a=t.keyframes;a&&(t=re(Mt(a),t));for(var n in t)l.key(n)&&r.push({name:n,tweens:bt(t[n],e)});return r}function Tt(e,t){var r={};for(var a in e){var n=se(e[a],t);l.arr(n)&&(n=n.map(function(o){return se(o,t)}),n.length===1&&(n=n[0])),r[a]=n}return r.duration=parseFloat(r.duration),r.delay=parseFloat(r.delay),r}function wt(e,t){var r;return e.tweens.map(function(a){var n=Tt(a,t),o=n.value,u=l.arr(o)?o[1]:o,s=I(u),i=he(t.target,e.name,s,t),y=r?r.to.original:i,c=l.arr(o)?o[0]:y,f=I(c)||I(i),p=s||f;return l.und(u)&&(u=y),n.from=we(c,p),n.to=we(pe(u,c),p),n.start=r?r.end:0,n.end=n.start+n.delay+n.duration+n.endDelay,n.easing=le(n.easing,n.duration),n.isPath=l.pth(o),n.isPathTargetInsideSVG=n.isPath&&l.svg(t.target),n.isColor=l.col(n.from.original),n.isColor&&(n.round=1),r=n,n})}var Ue={css:function(e,t,r){return e.style[t]=r},attribute:function(e,t,r){return e.setAttribute(t,r)},object:function(e,t,r){return e[t]=r},transform:function(e,t,r,a,n){if(a.list.set(t,r),t===a.last||n){var o="";a.list.forEach(function(u,s){o+=s+"("+u+") "}),e.style.transform=o}}};function Ye(e,t){var r=Ne(e);r.forEach(function(a){for(var n in t){var o=se(t[n],a),u=a.target,s=I(o),i=he(u,n,s,a),y=s||I(i),c=pe(ze(o,y),i),f=ve(u,n);Ue[f](u,n,c,a.transforms,!0)}})}function St(e,t){var r=ve(e.target,t.name);if(r){var a=wt(t,e),n=a[a.length-1];return{type:r,property:t.name,animatable:e,tweens:a,duration:n.end,delay:a[0].delay,endDelay:n.endDelay}}}function Lt(e,t){return ee(te(e.map(function(r){return t.map(function(a){return St(r,a)})})),function(r){return!l.und(r)})}function Ze(e,t){var r=e.length,a=function(o){return o.timelineOffset?o.timelineOffset:0},n={};return n.duration=r?Math.max.apply(Math,e.map(function(o){return a(o)+o.duration})):t.duration,n.delay=r?Math.min.apply(Math,e.map(function(o){return a(o)+o.delay})):t.delay,n.endDelay=r?n.duration-Math.max.apply(Math,e.map(function(o){return a(o)+o.duration-o.endDelay})):t.endDelay,n}var Se=0;function Ot(e){var t=ue(De,e),r=ue(ce,e),a=Et(r,e),n=Ne(e.targets),o=Lt(n,a),u=Ze(o,r),s=Se;return Se++,re(t,{id:s,children:[],animatables:n,animations:o,duration:u.duration,delay:u.delay,endDelay:u.endDelay})}var L=[],Ke=function(){var e;function t(){!e&&(!Le()||!h.suspendWhenDocumentHidden)&&L.length>0&&(e=requestAnimationFrame(r))}function r(n){for(var o=L.length,u=0;u<o;){var s=L[u];s.paused?(L.splice(u,1),o--):(s.tick(n),u++)}e=u>0?requestAnimationFrame(r):void 0}function a(){h.suspendWhenDocumentHidden&&(Le()?e=cancelAnimationFrame(e):(L.forEach(function(n){return n._onDocumentVisibility()}),Ke()))}return typeof document<"u"&&document.addEventListener("visibilitychange",a),t}();function Le(){return!!document&&document.hidden}function h(e){e===void 0&&(e={});var t=0,r=0,a=0,n,o=0,u=null;function s(v){var g=window.Promise&&new Promise(function(w){return u=w});return v.finished=g,g}var i=Ot(e);s(i);function y(){var v=i.direction;v!=="alternate"&&(i.direction=v!=="normal"?"normal":"reverse"),i.reversed=!i.reversed,n.forEach(function(g){return g.reversed=i.reversed})}function c(v){return i.reversed?i.duration-v:v}function f(){t=0,r=c(i.currentTime)*(1/h.speed)}function p(v,g){g&&g.seek(v-g.timelineOffset)}function T(v){if(i.reversePlayback)for(var w=o;w--;)p(v,n[w]);else for(var g=0;g<o;g++)p(v,n[g])}function m(v){for(var g=0,w=i.animations,A=w.length;g<A;){var b=w[g],B=b.animatable,$=b.tweens,V=$.length-1,E=$[V];V&&(E=ee($,function(rt){return v<rt.end})[0]||E);for(var H=O(v-E.start-E.delay,0,E.duration)/E.duration,Q=isNaN(H)?1:E.easing(H),S=E.to.strings,ne=E.round,ae=[],tt=E.to.numbers.length,j=void 0,R=0;R<tt;R++){var W=void 0,xe=E.to.numbers[R],be=E.from.numbers[R]||0;E.isPath?W=xt(E.value,Q*xe,E.isPathTargetInsideSVG):W=be+Q*(xe-be),ne&&(E.isColor&&R>2||(W=Math.round(W*ne)/ne)),ae.push(W)}var Me=S.length;if(!Me)j=ae[0];else{j=S[0];for(var N=0;N<Me;N++){S[N];var Ee=S[N+1],ie=ae[N];isNaN(ie)||(Ee?j+=ie+Ee:j+=ie+" ")}}Ue[b.type](B.target,b.property,j,B.transforms),b.currentValue=j,g++}}function d(v){i[v]&&!i.passThrough&&i[v](i)}function x(){i.remaining&&i.remaining!==!0&&i.remaining--}function M(v){var g=i.duration,w=i.delay,A=g-i.endDelay,b=c(v);i.progress=O(b/g*100,0,100),i.reversePlayback=b<i.currentTime,n&&T(b),!i.began&&i.currentTime>0&&(i.began=!0,d("begin")),!i.loopBegan&&i.currentTime>0&&(i.loopBegan=!0,d("loopBegin")),b<=w&&i.currentTime!==0&&m(0),(b>=A&&i.currentTime!==g||!g)&&m(g),b>w&&b<A?(i.changeBegan||(i.changeBegan=!0,i.changeCompleted=!1,d("changeBegin")),d("change"),m(b)):i.changeBegan&&(i.changeCompleted=!0,i.changeBegan=!1,d("changeComplete")),i.currentTime=O(b,0,g),i.began&&d("update"),v>=g&&(r=0,x(),i.remaining?(t=a,d("loopComplete"),i.loopBegan=!1,i.direction==="alternate"&&y()):(i.paused=!0,i.completed||(i.completed=!0,d("loopComplete"),d("complete"),!i.passThrough&&"Promise"in window&&(u(),s(i)))))}return i.reset=function(){var v=i.direction;i.passThrough=!1,i.currentTime=0,i.progress=0,i.paused=!0,i.began=!1,i.loopBegan=!1,i.changeBegan=!1,i.completed=!1,i.changeCompleted=!1,i.reversePlayback=!1,i.reversed=v==="reverse",i.remaining=i.loop,n=i.children,o=n.length;for(var g=o;g--;)i.children[g].reset();(i.reversed&&i.loop!==!0||v==="alternate"&&i.loop===1)&&i.remaining++,m(i.reversed?i.duration:0)},i._onDocumentVisibility=f,i.set=function(v,g){return Ye(v,g),i},i.tick=function(v){a=v,t||(t=a),M((a+(r-t))*h.speed)},i.seek=function(v){M(c(v))},i.pause=function(){i.paused=!0,f()},i.play=function(){i.paused&&(i.completed&&i.reset(),i.paused=!1,L.push(i),f(),Ke())},i.reverse=function(){y(),i.completed=!i.reversed,f()},i.restart=function(){i.reset(),i.play()},i.remove=function(v){var g=me(v);Qe(g,i)},i.reset(),i.autoplay&&i.play(),i}function Oe(e,t){for(var r=t.length;r--;)fe(e,t[r].animatable.target)&&t.splice(r,1)}function Qe(e,t){var r=t.animations,a=t.children;Oe(e,r);for(var n=a.length;n--;){var o=a[n],u=o.animations;Oe(e,u),!u.length&&!o.children.length&&a.splice(n,1)}!r.length&&!a.length&&t.pause()}function Pt(e){for(var t=me(e),r=L.length;r--;){var a=L[r];Qe(t,a)}}function Ct(e,t){t===void 0&&(t={});var r=t.direction||"normal",a=t.easing?le(t.easing):null,n=t.grid,o=t.axis,u=t.from||0,s=u==="first",i=u==="center",y=u==="last",c=l.arr(e),f=parseFloat(c?e[0]:e),p=c?parseFloat(e[1]):0,T=I(c?e[1]:e)||0,m=t.start||0+(c?f:0),d=[],x=0;return function(M,v,g){if(s&&(u=0),i&&(u=(g-1)/2),y&&(u=g-1),!d.length){for(var w=0;w<g;w++){if(!n)d.push(Math.abs(u-w));else{var A=i?(n[0]-1)/2:u%n[0],b=i?(n[1]-1)/2:Math.floor(u/n[0]),B=w%n[0],$=Math.floor(w/n[0]),V=A-B,E=b-$,H=Math.sqrt(V*V+E*E);o==="x"&&(H=-V),o==="y"&&(H=-E),d.push(H)}x=Math.max.apply(Math,d)}a&&(d=d.map(function(S){return a(S/x)*x})),r==="reverse"&&(d=d.map(function(S){return o?S<0?S*-1:-S:Math.abs(x-S)}))}var Q=c?(p-f)/x:f;return m+Q*(Math.round(d[v]*100)/100)+T}}function It(e){e===void 0&&(e={});var t=h(e);return t.duration=0,t.add=function(r,a){var n=L.indexOf(t),o=t.children;n>-1&&L.splice(n,1);function u(p){p.passThrough=!0}for(var s=0;s<o.length;s++)u(o[s]);var i=re(r,ue(ce,e));i.targets=i.targets||e.targets;var y=t.duration;i.autoplay=!1,i.direction=t.direction,i.timelineOffset=l.und(a)?y:pe(a,y),u(t),t.seek(i.timelineOffset);var c=h(i);u(c),o.push(c);var f=Ze(o,e);return t.delay=f.delay,t.endDelay=f.endDelay,t.duration=f.duration,t.seek(0),t.reset(),t.autoplay&&t.play(),t},t}h.version="3.2.1";h.speed=1;h.suspendWhenDocumentHidden=!0;h.running=L;h.remove=Pt;h.get=he;h.set=Ye;h.convertPx=ge;h.path=mt;h.setDashoffset=pt;h.stagger=Ct;h.timeline=It;h.easing=le;h.penner=qe;h.random=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};const K=50,At=document.querySelector(":root");var D=document.querySelector(".title .letters");D.innerHTML=D.textContent.replace(/\S/g,"<span class='letter'>$&</span>");D=document.querySelector(".subtitle .letters");D.innerHTML=D.textContent.replace(/\S/g,"<span class='letter'>$&</span>");h.timeline().add({targets:".title .line",scaleY:[0,1],opacity:[.5,1],easing:"easeOutExpo",duration:700,delay:500}).add({targets:".title .line",translateX:[0,document.querySelector(".title .letters").getBoundingClientRect().width+20],easing:"easeOutExpo",duration:700,delay:200}).add({targets:".title .letter",opacity:[0,1],easing:"easeOutExpo",duration:600,delay:h.stagger(33)},"-=730").add({targets:".title .line",scaleY:[1,0],easing:"easeOutExpo",duration:700,delay:200}).add({targets:".subtitle .letter",opacity:[0,1],easing:"easeOutExpo",duration:600,delay:h.stagger(30)});const _e=document.querySelector(".tiles"),G=document.body;let U=Math.floor(G.clientWidth/K),Y=Math.floor(G.clientHeight/K);const kt=e=>{const t=document.createElement("div");return t.classList.add("tile"),t.onclick=r=>Bt(e),t};let _=!1;const Dt=()=>{_=!_,_?document.body.classList.add("is-toggled"):document.body.classList.remove("is-toggled")},Bt=e=>{Dt(),h({targets:".tile",opacity:_?Math.random()*(.4-.2)+.2:Math.random()*(1-.6)+.6,delay:h.stagger(50,{grid:[U,Y],from:e})})},Ft=e=>{for(let t=0;t<e;t++)_e.appendChild(kt(t))},Je=()=>{_e.innerHTML="",U=Math.floor(G.clientWidth/K),Y=Math.floor(G.clientHeight/K),At.setAttribute("style",`--columns: ${U}; --rows: ${Y}; --tile-size: ${K}px;`),console.log(U,Y),Ft(U*Y)};Je();window.onresize=Je;var z=document.querySelectorAll(".box a");function Ge(e,t,r,a){h.remove(e),h({targets:e,scale:t,duration:r,elasticity:a})}function Pe(e){Ge(e,1.05,400,200)}function Ce(e){Ge(e,1,400,200)}function Xe(e,t,r,a){h.remove(e),h({targets:e,keyframes:[{scale:t,duration:r/2},{scale:1,duration:r/2}],scale:t,duration:r,elasticity:a})}for(var F=0;F<z.length;F++)z[F].addEventListener("mouseenter",function(e){Pe(e.target)},!1),z[F].addEventListener("mouseleave",function(e){Ce(e.target)},!1),z[F].addEventListener("touchstart",function(e){Pe(e.target)},!1),z[F].addEventListener("touchend",function(e){Ce(e.target)},!1),z[F].addEventListener("click",function(e){Xe(e.target,.97,150,500)},!1);var C=[!1,!1,!1];D=document.querySelector(".profile");D.innerHTML=D.textContent.replace(/\S/g,"<span class='profileLetter'>$&</span>");let q=document.querySelectorAll(".education h1");for(let e=0;e<q.length;e++)q[e].innerHTML=q[e].textContent.replace(/\S/g,"<span class='educationH1'>$&</span>");q=document.querySelectorAll(".education h3");for(let e=0;e<q.length;e++)q[e].innerHTML=q[e].textContent.replace(/\S/g,"<span class='educationH3'>$&</span>");const Ie=h.timeline({autoplay:!1}).add({targets:".square",translateX:[-100,0],opacity:[0,1],easing:"easeOutExpo",duration:1e3,delay:200}).add({targets:".profile span",opacity:[0,1],easing:"easeOutExpo",duration:700,delay:h.stagger(5)}),Ae=h({targets:".boxes.active .box",opacity:[0,1],translateY:[-100,0],easing:"easeOutExpo",duration:1e3,delay:h.stagger(100),autoplay:!1}),ke=h.timeline({autoplay:!1}).add({targets:".long-square",translateX:[-100,0],opacity:[0,1],easing:"easeOutExpo",duration:1e3,delay:h.stagger(500)}).add({targets:".education span",opacity:[0,1],easing:"easeOutExpo",duration:700,delay:h.stagger(10)});function et(){const e=window.pageYOffset,t=document.querySelectorAll("Section"),r=[];t.forEach(a=>{r.push(a.offsetTop+window.innerHeight*1.1)}),console.log(e,r[0],r[1],r[2]),e>r[0]-300&&e<r[1]-300&&(console.log(t[0]),console.log(C[0]),C[0]!=!0&&(Ie.play(),Ie.finished.then(()=>{C[0]=!0}))),e>r[1]-300&&e<r[2]-300&&(console.log(t[1]),console.log(C[1]),C[1]!=!0&&(Ae.play(),Ae.finished.then(()=>{C[1]=!0}))),e>r[2]-300&&(console.log(t[2]),console.log(C[2]),C[2]!=!0&&(ke.play(),ke.finished.then(()=>{C[2]=!0})))}const qt=document.querySelectorAll(".round"),X=document.querySelectorAll(".boxes");var k=0;function Vt(){h.remove(".boxes.active .box"),h({targets:".boxes.active .box",opacity:[1,0],translateY:[0,100],easing:"easeOutExpo",duration:1e3,delay:h.stagger(150,{direction:"reverse"}),complete:function(){X.forEach(e=>e.classList.remove("active")),X[k].classList.add("active"),h({targets:".boxes.active .box",opacity:[0,1],translateY:[-100,0],easing:"easeOutExpo",duration:1e3,delay:h.stagger(100)})}})}qt.forEach(e=>e.addEventListener("click",t=>{Xe(e,.97,150,500),console.log(e.querySelector(".arrow.right")),e.querySelector(".arrow.left")!=null&&k--,e.querySelector(".arrow.right")!=null&&k++,k<0?k=X.length-1:k>=X.length&&(k=0),console.log(k),Vt()}));et();window.onscroll=et;
