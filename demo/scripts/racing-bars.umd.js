!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("d3")):"function"==typeof define&&define.amd?define(["exports","d3"],e):e((t=t||self).racingBars={},t.d3)}(this,function(t,e){function n(){return(n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}t.loadData=function(t,e){switch(void 0===e&&(e="json"),e){case"json":return d3.json(t);case"csv":return d3.csv(t);case"tsv":return d3.tsv(t);case"xml":return d3.xml(t);default:throw new Error("Unsupported data type: "+e)}},t.race=function(t,r){void 0===r&&(r={});var a,i,o,s,u,l,c,d,f,h,v,p=r.dataShape||"",g=r.fillDateGaps,y=r.selector||"#race",w=r.title||"18 years of Top Global Brands",m=r.subTitle||"Brand value, $m",x=r.dateCounterFormat||"YYYY",k=r.startDate?$(r.startDate):"",b=r.endDate?$(r.endDate):"",D=r.loop,L=r.caption||"Source: Interbrand",M=!1!==r.labelsOnBars,Y=r.labelsWidth||100,E=r.colorSeed||"",S=r.disableGroupColors,C=+r.tickDuration||500,A=+r.top_n||10,j=r.height,B=r.width,F=r.disableClickEvents||!0,N=r.disableKeyboardEvents,T=r.showControls||"all",O=!1!==r.autorun,W=document.querySelector(y),q=Z(j),H=tt(B);t=function(t,r){var a;return void 0===r&&(r=""),"wide"===r&&(a=[],t.forEach(function(t){for(var e=0,n=Object.entries(t);e<n.length;e++){var r=n[e];a.push({date:t.date,name:r[0],value:Number(r[1])})}}),t=a),t.map(function(t){var r=n({},t);return r.value=isNaN(+r.value)?0:+r.value,r.date=$(r.date),r.color=function(t){return e.hsl(360*function(t){var e=function(t){for(var e="",n=0;n<t.length;n++)e+=X(String(t.charCodeAt(n)),3);return e}(t),n=1e4*Math.sin(+e);return n-Math.floor(n)}((t.group&&!S?t.group:t.name)+E),.75,.75)}(r),r})}(t=function(t,e,n){return t.filter(function(t){return!e||t.date>=e}).filter(function(t){return!n||t.date<=n})}(t,k,b),p),g&&(t=function(t,e,r){var a=new Date(Q(e[0],"YYYY-MM-DD")),i=new Date(Q(e[e.length-1],"YYYY-MM-DD")),o={years:function(t){t.setFullYear(t.getFullYear()+1)},months:function(t){t.setMonth(t.getMonth()+1)},days:function(t){t.setDate(t.getDate()+1)}};if(!o[r])return t;for(var s=[],u=a;u<i;o[r](u))s.push($(u));return s.forEach(function(e,r){if(!(t.filter(function(t){return t.date===e}).length>0)){var a=t.filter(function(t){return t.date===s[r-1]}).map(function(t){return n(n({},t),{},{date:e})});t.push.apply(t,a)}}),t}(t,J(t),g));var V,G=function(e){var r,a=0,i=e.length-1,o=e[i];function s(){r=e[a],V=function(t,e,r){var a=t.filter(function(t){return t.date===e&&!isNaN(t.value)}).map(function(t){if(!f)return t;var e=f[t.name].value;return f[t.name].date=t.date,f[t.name].value=t.value,n(n({},t),{},{lastValue:e})}).sort(function(t,e){return e.value-t.value}).slice(0,r);return a.forEach(function(t,e){return t.rank=e}),a}(t,G.getDate(),A),nt(),W.dispatchEvent(new CustomEvent("dateChanged",{detail:{date:Q(r,"YYYY-MM-DD")}}))}return{inc:function(t){void 0===t&&(t=1);var e=a+t;a=e>i?i:e,s()},dec:function(t){void 0===t&&(t=1);var e=a-t;a=e<0?0:e,s()},setFirst:function(){a=0,s()},setLast:function(){a=e.length-1,s()},update:function(){s()},set:function(t){var n=e.indexOf(t);n>-1&&(a=n,s())},getDate:function(){return r},isLast:function(){return r===o},getDates:function(){return[].concat(e)}}}(J(t));function J(t){var e=new Set;return t.forEach(function(t){e.add(t.date)}),Array.from(e).sort()}function R(){U(!0),v=e.interval(function(t){G.isLast()?(nt(),D?I():z()):G.inc()},C)}function z(){v.stop(),U(!1)}function _(){z(),G.setFirst(),nt()}function I(){G.setFirst(),nt()}function K(){z(),G.setLast(),nt()}function P(){G.isLast()?(_(),R()):h?z():R()}function U(t){void 0===t&&(t=!0);var e=document.querySelector(y+" .play"),n=document.querySelector(y+" .pause");t?(h=!0,e.style.display="none",n.style.display="unset"):(h=!1,e.style.display="unset",n.style.display="none")}function $(t){var e=new Date(t);if(isNaN(+e))throw new Error('"'+t+'" is not a valid date');var n=e.getFullYear(),r=(1+e.getMonth()).toString();return""+n+(r=X(r,2))+X(e.getDate().toString(),2)}function Q(t,e){void 0===e&&(e=x);var n=t.slice(0,4),r=t.slice(4,6),a=t.slice(6,8),i=new Date(n+"-"+r+"-"+a).getDay();return e.replace("MMM",{"01":"Jan","02":"Feb","03":"Mar","04":"Apr","05":"May","06":"Jun","07":"Jul","08":"Aug","09":"Sep",10:"Oct",11:"Nov",12:"Dec"}[r]).replace("DDD",{0:"Sun",1:"Mon",2:"Tue",3:"Wed",4:"Thu",5:"Fri",6:"Sat"}[i]).replace("YYYY",n).replace("MM",r).replace("DD",a)}function X(t,e){for(;t.toString().length<e;)t="0"+t;return t}function Z(t){var e;if(t)if(String(t).startsWith("window")){var n=+t.split("*")[1]||1;e=window.innerHeight*n}else e=+t;else e=W.getBoundingClientRect().height;return e>300?e:300}function tt(t){var e;if(t)if(String(t).startsWith("window")){var n=+t.split("*")[1]||1;e=window.innerWidth*n}else e=+t;else e=W.getBoundingClientRect().width;return e>500?e:500}function et(){i=e.select(y).append("svg").attr("width",H).attr("height",q),l=(q-((a={top:80,right:0,bottom:5,left:0+(M?0:Y)}).bottom+a.top))/(5*A),i.append("text").attr("class","title").attr("y",24).html(w),i.append("text").attr("class","subTitle").attr("y",55).html(m),o=e.scaleLinear().domain([0,e.max(V,function(t){return t.value})]).range([a.left,H-a.right-65]),s=e.scaleLinear().domain([A,0]).range([q-a.bottom,a.top]),u=e.axisTop(o).ticks(H>500?5:2).tickSize(-(q-a.top-a.bottom)).tickFormat(function(t){return e.format(",")(t)}),i.append("g").attr("class","axis xAxis").attr("transform","translate(0, "+a.top+")").call(u).selectAll(".tick line").classed("origin",function(t){return 0===t}),i.selectAll("rect.bar").data(V,function(t){return t.name}).enter().append("rect").attr("class","bar").attr("x",o(0)+1).attr("width",function(t){return Math.abs(o(t.value)-o(0)-1)}).attr("y",function(t){return s(t.rank)+5}).attr("height",s(1)-s(0)-l).style("fill",function(t){return t.color}),d=M?function(t){return o(t.value)-8}:a.left-8,i.selectAll("text.label").data(V,function(t){return t.name}).enter().append("text").attr("class","label").attr("x",d).attr("y",function(t){return s(t.rank)+5+(s(1)-s(0))/2+1}).style("text-anchor","end").html(function(t){return t.name}),i.selectAll("text.valueLabel").data(V,function(t){return t.name}).enter().append("text").attr("class","valueLabel").attr("x",function(t){return o(t.value)+5}).attr("y",function(t){return s(t.rank)+5+(s(1)-s(0))/2+1}).text(function(t){return e.format(",.0f")(t.lastValue)}),c=i.append("text").attr("class","dateCounterText").attr("x",H-a.right-l).attr("y",q-40).style("text-anchor","end").html(Q(G.getDate(),x)).call(function(t,e){t.select(function(){return this.parentNode.insertBefore(this.cloneNode(!0),this)}).style("fill","#ffffff").style("stroke","#ffffff").style("stroke-width",e).style("stroke-linejoin","round").style("opacity",1)},10),i.append("text").attr("class","caption").attr("x",H-a.right-l-10).attr("y",q-a.bottom-l).style("text-anchor","end").html(L),function(){W.style.position="relative";var t=r("div","controls","",W);t.style.position="absolute",t.style.top="0",t.style.right=a.right+l+"px";var e=r("div","rewind",'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-back"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>',t);e.addEventListener("click",_),r("div","play",'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',t).addEventListener("click",P),r("div","pause",'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>',t).addEventListener("click",P);var n=r("div","fastforward",'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-forward"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>',t);switch(n.addEventListener("click",K),T){case"play":e.style.visibility="hidden",n.style.visibility="hidden";break;case"none":t.style.display="none"}function r(t,e,n,r){var a=document.createElement(t);return a.classList.add(e),a.innerHTML=n,r.appendChild(a),a}}(),U(!1)}function nt(){if(o){o.domain([0,e.max(V,function(t){return t.value})]),i.select(".xAxis").transition().duration(C).ease(e.easeLinear).call(u);var t=i.selectAll(".bar").data(V,function(t){return t.name});t.enter().append("rect").attr("class",function(t){return"bar "+t.name.replace(/\s/g,"_")}).attr("x",o(0)+1).attr("width",function(t){return Math.abs(o(t.value)-o(0)-1)}).attr("y",function(){return s(A+1)+5}).attr("height",s(1)-s(0)-l).style("fill",function(t){return t.color}).transition().duration(C).ease(e.easeLinear).attr("y",function(t){return s(t.rank)+5}),t.transition().duration(C).ease(e.easeLinear).attr("width",function(t){return Math.abs(o(t.value)-o(0)-1)}).attr("y",function(t){return s(t.rank)+5}),t.exit().transition().duration(C).ease(e.easeLinear).attr("width",function(t){return Math.abs(o(t.value)-o(0)-1)}).attr("y",function(){return s(A+1)+5}).remove();var n=i.selectAll(".label").data(V,function(t){return t.name});n.enter().append("text").attr("class","label").attr("x",d).attr("y",function(){return s(A+1)+5+(s(1)-s(0))/2}).style("text-anchor","end").html(function(t){return t.name}).transition().duration(C).ease(e.easeLinear).attr("y",function(t){return s(t.rank)+5+(s(1)-s(0))/2+1}),n.transition().duration(C).ease(e.easeLinear).attr("x",d).attr("y",function(t){return s(t.rank)+5+(s(1)-s(0))/2+1}),n.exit().transition().duration(C).ease(e.easeLinear).attr("x",d).attr("y",function(){return s(A+1)+5}).remove();var r=i.selectAll(".valueLabel").data(V,function(t){return t.name});r.enter().append("text").attr("class","valueLabel").attr("x",function(t){return o(t.value)+5}).attr("y",function(){return s(A+1)+5}).text(function(t){return e.format(",.0f")(t.lastValue)}).transition().duration(C).ease(e.easeLinear).attr("y",function(t){return s(t.rank)+5+(s(1)-s(0))/2+1}),r.transition().duration(C).ease(e.easeLinear).attr("x",function(t){return o(t.value)+5}).attr("y",function(t){return s(t.rank)+5+(s(1)-s(0))/2+1}).tween("text",function(t){var n=e.interpolateRound(t.lastValue,t.value);return function(t){this.textContent=e.format(",")(n(t))}}),r.exit().transition().duration(C).ease(e.easeLinear).attr("x",function(t){return o(t.value)+5}).attr("y",function(){return s(A+1)+5}).remove(),c.html(Q(G.getDate(),x))}}return f={},t.forEach(function(t){t.lastValue=t.value,(!f[t.name]||t.date<f[t.name].date)&&(f[t.name]={date:t.date,value:t.value})}),G.setFirst(),et(),nt(),R(),O||z(),F||(W.querySelector("svg").addEventListener("click",P),W.addEventListener("dblclick",K)),N||document.addEventListener("keypress",function(t){switch(t.keyCode){case 32:P();break;case 97:_();break;case 115:P();break;case 100:K()}}),window.addEventListener("resize",function(){if(!r.height&&!r.width||String(r.height).startsWith("window")||String(r.width).startsWith("window")){q=Z(r.height),H=tt(r.width);var t=h,e=W.style.position;z(),W.innerHTML="",G.update(),et(),t&&R(),W.style.position=e}}),{start:function(){h||R()},stop:function(){z()},rewind:function(){_()},fastforward:function(){K()},loop:function(){I()},inc:function(t){void 0===t&&(t=1),G.inc(t)},dec:function(t){void 0===t&&(t=1),G.dec(t)},getCurrentDate:function(){return G.getDate()},getDates:function(){return G.getDates().map(function(t){return Q(t,"YYYY-MM-DD")})},setDate:function(t){G.set($(t))},createScroller:function(){!function(){!function(){W.style.position="fixed",W.style.top="0";var t=document.createElement("div");t.style.height=10*window.innerHeight+"px",document.body.appendChild(t)}();var t=G.getDates(),e=document.body.clientHeight/t.length;window.addEventListener("scroll",function(){var n=Math.ceil(window.pageYOffset/e);n<t.length?G.set(t[n]):G.setLast()})}()}}}});
//# sourceMappingURL=racing-bars.umd.js.map
