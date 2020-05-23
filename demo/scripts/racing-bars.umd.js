!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("d3")):"function"==typeof define&&define.amd?define(["exports","d3"],e):e((t=t||self).racingBars={},t.d3)}(this,function(t,e){function n(){return(n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function r(t,e){for(;t.toString().length<e;)t="0"+t;return t}function a(t,e,n){var r;if(n)if(String(n).startsWith("window")){var a=+n.split("*")[1]||1;r=window.innerHeight*a}else r=+n;else r=t.getBoundingClientRect().height;return r>e?r:e}function i(t,e,n){var r;if(n)if(String(n).startsWith("window")){var a=+n.split("*")[1]||1;r=window.innerWidth*a}else r=+n;else r=t.getBoundingClientRect().width;return r>e?r:e}function o(t){var e=new Date(t);if(isNaN(+e))throw new Error('"'+t+'" is not a valid date');var n=e.getFullYear(),a=(1+e.getMonth()).toString();return""+n+(a=r(a,2))+r(e.getDate().toString(),2)}function s(t,e){var n=t.slice(0,4),r=t.slice(4,6),a=t.slice(6,8),i=new Date(n+"-"+r+"-"+a),o=String(i.getDay());return e.replace("MMM",{"01":"Jan","02":"Feb","03":"Mar","04":"Apr","05":"May","06":"Jun","07":"Jul","08":"Aug","09":"Sep",10:"Oct",11:"Nov",12:"Dec"}[r]).replace("DDD",{0:"Sun",1:"Mon",2:"Tue",3:"Wed",4:"Thu",5:"Fri",6:"Sat"}[o]).replace("YYYY",n).replace("MM",r).replace("DD",a)}t.loadData=function(t,e){switch(void 0===e&&(e="json"),e){case"json":return d3.json(t);case"csv":return d3.csv(t);case"tsv":return d3.tsv(t);case"xml":return d3.xml(t);default:throw new Error("Unsupported data type: "+e)}},t.race=function(t,u){void 0===u&&(u={});var l,c=u.dataShape||"long",d=u.fillDateGaps,f=u.selector||"#race",p=u.startDate?o(u.startDate):"",h=u.endDate?o(u.endDate):"",g=u.colorSeed||"",v=u.disableGroupColors||!1,w=Number(u.tickDuration)||500,y=Number(u.topN)||10,m=!1!==u.disableClickEvents,x=u.disableKeyboardEvents,b=!1!==u.autorun,k=!1!==u.embedStyles,D={selector:f,title:u.title||"18 years of Top Global Brands",subTitle:u.subTitle||"Brand value, $m",caption:u.caption||"Source: Interbrand",dateCounterFormat:u.dateCounterFormat||"YYYY",labelsOnBars:!1!==u.labelsOnBars,labelsWidth:u.labelsWidth||100,showControls:u.showControls||"all",inputHeight:u.height,inputWidth:u.width,minHeight:300,minWidth:500,tickDuration:w,topN:y},L={loop:u.loop||!1,tickDuration:w},C=document.querySelector(f);if(!C)throw new Error("Cannot find element with this selector: "+f);k&&((l=document.createElement("style")).innerHTML="\n.race text {\n  font-size: 16px;\n  font-family: Open Sans, sans-serif;\n}\n.race text.title {\n  font-size: 24px;\n  font-weight: 500;\n}\n.race text.subTitle {\n  font-weight: 500;\n  fill: #777777;\n}\n.race text.caption {\n  font-weight: 400;\n  font-size: 24px;\n  fill: #777777;\n}\n.race text.label {\n  font-weight: 600;\n}\n\n.race text.valueLabel {\n  font-weight: 300;\n}\n\n.race text.dateCounterText {\n  font-size: 64px;\n  font-weight: 700;\n  opacity: 0.25;\n}\n.race .tick text {\n  fill: #777777;\n}\n.race .xAxis .tick:nth-child(2) text {\n  text-anchor: start;\n}\n.race .tick line {\n  shape-rendering: CrispEdges;\n  stroke: #dddddd;\n}\n.race .tick line.origin {\n  stroke: #aaaaaa;\n}\n.race path.domain {\n  display: none;\n}\n.race .controls {\n  display: flex;\n}\n.race .controls div {\n  cursor: pointer;\n  font-size: 24px;\n  font-weight: 700;\n  width: 38px;\n  height: 38px;\n  color: #ffffff;\n  background: #777777;\n  opacity: 0.5;\n  -moz-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  margin: 5px;\n  text-align: center;\n}\n.race .controls div:hover {\n  background: #aaaaaa;\n  color: black;\n}\n.race .controls div svg {\n  margin: 7px auto;\n}\n",document.body.appendChild(l));var M,Y=function(t,r){var o,u,l,c,d,f,p,h,g,v,w;return{renderInitalView:function(t){var n=r.selector,y=r.title,m=r.subTitle,x=r.caption,b=r.dateCounterFormat,k=r.labelsOnBars,D=r.labelsWidth,L=r.showControls,C=r.inputHeight,M=r.inputWidth,Y=r.minHeight,E=r.minWidth,S=r.topN,F=t.length>0?t[0].date:"",W=document.querySelector(n);g=a(W,Y,C),v=i(W,E,M),u=e.select(n).append("svg").attr("width",v).attr("height",g),f=(g-((o={top:80,right:0,bottom:5,left:0+(k?0:D)}).bottom+o.top))/(5*S),u.append("text").attr("class","title").attr("y",24).html(y),u.append("text").attr("class","subTitle").attr("y",55).html(m),l=e.scaleLinear().domain([0,e.max(t,function(t){return t.value})]).range([o.left,v-o.right-65]),c=e.scaleLinear().domain([S,0]).range([g-o.bottom,o.top]),d=e.axisTop(l).ticks(v>500?5:2).tickSize(-(g-o.top-o.bottom)).tickFormat(function(t){return e.format(",")(t)}),u.append("g").attr("class","axis xAxis").attr("transform","translate(0, "+o.top+")").call(d).selectAll(".tick line").classed("origin",function(t){return 0===t}),u.selectAll("rect.bar").data(t,function(t){return t.name}).enter().append("rect").attr("class","bar").attr("x",l(0)+1).attr("width",function(t){return Math.abs(l(t.value)-l(0)-1)}).attr("y",function(t){return c(t.rank)+5}).attr("height",c(1)-c(0)-f).style("fill",function(t){return t.color}),h=k?function(t){return l(t.value)-8}:o.left-8,u.selectAll("text.label").data(t,function(t){return t.name}).enter().append("text").attr("class","label").attr("x",h).attr("y",function(t){return c(t.rank)+5+(c(1)-c(0))/2+1}).style("text-anchor","end").html(function(t){return t.name}),u.selectAll("text.valueLabel").data(t,function(t){return t.name}).enter().append("text").attr("class","valueLabel").attr("x",function(t){return l(t.value)+5}).attr("y",function(t){return c(t.rank)+5+(c(1)-c(0))/2+1}).text(function(t){return e.format(",.0f")(t.lastValue)}),p=u.append("text").attr("class","dateCounterText").attr("x",v-o.right-f).attr("y",g-40).style("text-anchor","end").html(s(F,b)).call(function(t,e){t.select(function(){return this.parentNode.insertBefore(this.cloneNode(!0),this)}).style("fill","#ffffff").style("stroke","#ffffff").style("stroke-width",e).style("stroke-linejoin","round").style("opacity",1)},10),u.append("text").attr("class","caption").attr("x",v-o.right-f-10).attr("y",g-o.bottom-f).style("text-anchor","end").html(x),function(t,e){t.style.position="relative";var n=u("div","controls","",t);n.style.position="absolute",n.style.top="0",n.style.right=o.right+f+"px";var r=u("div","rewind",'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-back"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>',n),a=u("div","play",'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',n),i=u("div","pause",'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>',n),s=u("div","fastforward",'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-forward"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>',n);switch(w={rewind:r,play:a,pause:i,fastforward:s},e){case"play":r.style.visibility="hidden",s.style.visibility="hidden";break;case"none":n.style.display="none"}function u(t,e,n,r){var a=document.createElement(t);return a.classList.add(e),a.innerHTML=n,r.appendChild(a),a}}(W,L)},renderFrame:function(t){if(l){var n=r.tickDuration,a=r.topN,i=r.dateCounterFormat,o=t.length>0?t[0].date:"";l.domain([0,e.max(t,function(t){return t.value})]),u.select(".xAxis").transition().duration(n).ease(e.easeLinear).call(d);var g=u.selectAll(".bar").data(t,function(t){return t.name});g.enter().append("rect").attr("class",function(t){return"bar "+t.name.replace(/\s/g,"_")}).attr("x",l(0)+1).attr("width",function(t){return Math.abs(l(t.value)-l(0)-1)}).attr("y",function(){return c(a+1)+5}).attr("height",c(1)-c(0)-f).style("fill",function(t){return t.color}).transition().duration(n).ease(e.easeLinear).attr("y",function(t){return c(t.rank)+5}),g.transition().duration(n).ease(e.easeLinear).attr("width",function(t){return Math.abs(l(t.value)-l(0)-1)}).attr("y",function(t){return c(t.rank)+5}),g.exit().transition().duration(n).ease(e.easeLinear).attr("width",function(t){return Math.abs(l(t.value)-l(0)-1)}).attr("y",function(){return c(a+1)+5}).remove();var v=u.selectAll(".label").data(t,function(t){return t.name});v.enter().append("text").attr("class","label").attr("x",h).attr("y",function(){return c(a+1)+5+(c(1)-c(0))/2}).style("text-anchor","end").html(function(t){return t.name}).transition().duration(n).ease(e.easeLinear).attr("y",function(t){return c(t.rank)+5+(c(1)-c(0))/2+1}),v.transition().duration(n).ease(e.easeLinear).attr("x",h).attr("y",function(t){return c(t.rank)+5+(c(1)-c(0))/2+1}),v.exit().transition().duration(n).ease(e.easeLinear).attr("x",h).attr("y",function(){return c(a+1)+5}).remove();var w=u.selectAll(".valueLabel").data(t,function(t){return t.name});w.enter().append("text").attr("class","valueLabel").attr("x",function(t){return l(t.value)+5}).attr("y",function(){return c(a+1)+5}).text(function(t){return e.format(",.0f")(t.lastValue)}).transition().duration(n).ease(e.easeLinear).attr("y",function(t){return c(t.rank)+5+(c(1)-c(0))/2+1}),w.transition().duration(n).ease(e.easeLinear).attr("x",function(t){return l(t.value)+5}).attr("y",function(t){return c(t.rank)+5+(c(1)-c(0))/2+1}).tween("text",function(t){var n=e.interpolateRound(t.lastValue,t.value);return function(t){this.textContent=e.format(",")(n(t))}}),w.exit().transition().duration(n).ease(e.easeLinear).attr("x",function(t){return l(t.value)+5}).attr("y",function(){return c(a+1)+5}).remove(),p.html(s(o,i))}},resize:function(e){if(!r.inputHeight&&!r.inputWidth||String(r.inputHeight).startsWith("window")||String(r.inputWidth).startsWith("window")){var n=document.querySelector(t);g=a(n,r.minHeight,r.inputHeight),v=i(n,r.minWidth,r.inputWidth);var o=n.style.position;e(),n.style.position=o}},renderAsRunning:function(t){t?(w.play.style.display="none",w.pause.style.display="unset"):(w.play.style.display="unset",w.pause.style.display="none")},getRenderedHeight:function(){return g},getRenderedWidth:function(){return v},getControlButtons:function(){return n({},w)}}}(f,D),E=function(t){var n,r,a,i,o,s;function u(){f(!0),n=e.interval(function(t){r.isLast()?(s(),o?d():l()):r.inc()},i)}function l(){n&&n.stop(),f(!1)}function c(){l(),r.setFirst(),s()}function d(){r.setFirst(),s()}function f(t){void 0===t&&(t=!0),function(t){Y.renderAsRunning(t)}(a=t)}return{tickerDateFactory:function(t,e,n,a){i=e.tickDuration,o=e.loop,s=a;var u,l=0,c=t.length-1,d=t[c];function f(){n(u=t[l])}return r={inc:function(t){void 0===t&&(t=1);var e=l+t;l=e>c?c:e,f()},dec:function(t){void 0===t&&(t=1);var e=l-t;l=e<0?0:e,f()},setFirst:function(){l=0,f()},setLast:function(){l=t.length-1,f()},update:function(){f()},getDate:function(){return u},setDate:function(e){var n=t.indexOf(e);n>-1&&(l=n,f())},isLast:function(){return u===d}}},start:u,stop:l,rewind:c,loop:d,fastForward:function(){l(),r.setLast(),s()},toggle:function(){r.isLast()?(c(),u()):a?l():u()},isRunning:function(){return a}}}(),S=function(t){var e=new Set;return t.forEach(function(t){e.add(t.date)}),Array.from(e).sort()}(t=function(t,e,a,i){var s;return"wide"===e&&(s=[],t.forEach(function(t){for(var e=0,n=Object.entries(t);e<n.length;e++){var r=n[e];s.push({date:t.date,name:r[0],value:Number(r[1])})}}),t=s),t.map(function(t){var e=n({},t);return e.value=isNaN(+e.value)?0:+e.value,e.date=o(e.date),e.color=function(t,e,n){return d3.hsl(360*(a=function(t){for(var e="",n=0;n<t.length;n++)e+=r(String(t.charCodeAt(n)),3);return e}((t.group&&!e?t.group:t.name)+n),(i=1e4*Math.sin(+a))-Math.floor(i)),.75,.75);var a,i}(e,a,i),e})}(t=function(t,e,n){return t.filter(function(t){return!e||t.date>=e}).filter(function(t){return!n||t.date<=n})}(t,p,h),c,v,g));d&&(t=function(t,e,r){var a=new Date(s(e[0],"YYYY-MM-DD")),i=new Date(s(e[e.length-1],"YYYY-MM-DD")),u={years:function(t){t.setFullYear(t.getFullYear()+1)},months:function(t){t.setMonth(t.getMonth()+1)},days:function(t){t.setDate(t.getDate()+1)}};if(!u[r])return t;for(var l=[],c=a;c<i;u[r](c))l.push(o(c));return l.forEach(function(e,r){if(!(t.filter(function(t){return t.date===e}).length>0)){var a=t.filter(function(t){return t.date===l[r-1]}).map(function(t){return n(n({},t),{},{date:e})});t.push.apply(t,a)}}),t}(t,S,d));var F,W=E.tickerDateFactory(S,L,function(e){F=function(t,e,r,a){return t.filter(function(t){return t.date===e&&!isNaN(t.value)}).map(function(t){if(!r[t.name])return t;var e=r[t.name].value;return r[t.name].date=t.date,r[t.name].value=t.value,n(n({},t),{},{lastValue:e})}).sort(function(t,e){return e.value-t.value}).slice(0,a).map(function(t,e){return n(n({},t),{},{rank:e})})}(t,W.getDate(),M,y),N(),C.dispatchEvent(new CustomEvent("dateChanged",{detail:{date:s(e,"YYYY-MM-DD")}}))},N);function A(){var t;C.innerHTML="",Y.renderInitalView(F),E.stop(),(t=Y.getControlButtons())&&(t.rewind.addEventListener("click",E.rewind),t.play.addEventListener("click",E.toggle),t.pause.addEventListener("click",E.toggle),t.fastforward.addEventListener("click",E.fastForward))}function N(){Y.renderFrame(F)}return M={},t.forEach(function(t){t.lastValue=t.value,(!M[t.name]||t.date<M[t.name].date)&&(M[t.name]={date:t.date,value:t.value})}),W.setFirst(),A(),N(),E.start(),b||E.stop(),m||(C.querySelector("svg").addEventListener("click",E.toggle),C.addEventListener("dblclick",E.fastForward)),x||document.addEventListener("keypress",function(t){switch(t.keyCode){case 32:E.toggle();break;case 97:E.rewind();break;case 115:E.toggle();break;case 100:E.fastForward()}}),window.addEventListener("resize",function(){Y.resize(function(){var t=E.isRunning();W.update(),A(),t&&E.start()})}),{start:function(){E.isRunning()||E.start()},stop:function(){E.stop()},rewind:function(){E.rewind()},fastforward:function(){E.fastForward()},loop:function(){E.loop()},inc:function(t){void 0===t&&(t=1),W.inc(t)},dec:function(t){void 0===t&&(t=1),W.dec(t)},getDate:function(){return W.getDate()},setDate:function(t){W.setDate(o(t))},getAllDates:function(){return S.map(function(t){return s(t,"YYYY-MM-DD")})},createScroller:function(){!function(){!function(){C.style.position="fixed",C.style.top="0";var t=document.createElement("div");t.style.height=10*window.innerHeight+"px",document.body.appendChild(t)}();var t=document.body.clientHeight/S.length;window.addEventListener("scroll",function(){var e=Math.ceil(window.pageYOffset/t);e<S.length?W.setDate(S[e]):W.setLast()})}()}}}});
//# sourceMappingURL=racing-bars.umd.js.map
