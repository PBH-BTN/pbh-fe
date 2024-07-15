import{u as j,g as q,a as W,_ as X}from"./index-Beqw3KqC.js";import{u as G,H as C,i as H,a as J,b as K,c as Q,d as Y,e as Z,f as ee}from"./echarts-TgJrjpti.js";import{e as ae,a6 as te,a as T,r as I,w as A,a7 as B,h as L,q as N,C as e,v as t,a2 as a,y as g,N as f,s as oe}from"./libs-DfNW6cuU.js";import{ag as i,L as le,R as se,r as ne,F as re,ah as de,t as ie,ai as pe,C as ue,v as me,V as ce,W as ge,X as fe,T as he,S as _e,w as be}from"./arcoDesign-amu4IFh0.js";const ye=ae({__name:"charts",setup(ve){const{t:l}=te();G([H,J,K,Q,Y,Z,ee]);const b=j(),r=T({field:"peerId",enableThreshold:!0,mergeSameVersion:!1}),y={text:"Loading…",color:"#4ea397",maskColor:"rgba(255, 255, 255, 0.4)"},h=I({tooltip:{trigger:"item",appendToBody:!0,formatter:'<p style="word-wrap:break-all"><b>{b}</b></p>  {c} ({d}%)'},legend:{orient:"vertical",left:"right",type:"scroll",right:10,top:20,bottom:20,data:[],textStyle:{overflow:"truncate",width:100},tooltip:{show:!0}},backgroundColor:b.isDark?"rgba(0, 0, 0, 0.0)":void 0,series:[{name:l("page.banlog.charts.options.field."+r.field),type:"pie",radius:"55%",center:["50%","60%"],data:[],emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]}),P=n=>{n==="day"?d.range=[i().startOf("day").add(-7,"day").toDate(),new Date]:d.range=[i().startOf("hour").add(-6,"hour").toDate(),new Date]};A(r,n=>{$(n.field,n.enableThreshold)});const{loading:R,run:$}=B(q,{defaultParams:["peerId",!0],onSuccess:n=>{if(n){const s=n.map(o=>(o.data===""&&(o.data=l("page.banlog.charts.options.field.empty")),o));if(r.mergeSameVersion&&r.field==="peerId"){const o=new Map;s.forEach(p=>{let c=p.data;const u=c.match(/^([-]?[a-zA-z]+)[0-9]+.*/);u&&(u==null?void 0:u.length)>=2&&(c=u[1]+"*"),o.has(c)?o.set(c,o.get(c)+p.count):o.set(c,p.count)}),h.value.legend.data=[],h.value.series[0].data=[],Array.from(o).forEach(([p,c])=>{h.value.legend.data.push(p),h.value.series[0].data.push({name:p,value:c})})}else h.value.legend.data=s.map(o=>o.data),h.value.series[0].data=s.map(o=>({name:o.data,value:o.count}))}}}),d=T({timeStep:"day",range:[i().startOf("day").add(-7,"day").toDate(),new Date]}),v=I({xAxis:{type:"time"},yAxis:{type:"value"},tooltip:{trigger:"axis"},series:[{data:[],type:"line",smooth:!0,name:l("page.banlog.charts.line.options.field")}]});A(d,n=>{U(n.range[0],n.range[1],n.timeStep)});const{loading:F,run:U}=B(W,{defaultParams:[i().startOf("day").add(-7,"day").toDate(),new Date,"day"],onSuccess:n=>{if(n){const s=new Map;for(let o=i(d.range[0]);o.isBefore(i(d.range[1]));o=o.add(1,d.timeStep))s.set(o.valueOf(),0);n.forEach(o=>{s.set(i(o.timestamp).startOf(d.timeStep).valueOf(),o.count)}),v.value.series[0].data=Array.from(s).map(([o,p])=>[new Date(o),p])}}});return(n,s)=>{const o=le,p=se,c=ne,u=re,z=de,w=ie,D=pe,x=ue,S=me,_=ce,E=ge,V=fe,O=he,k=_e,M=be;return L(),N(M,{justify:"center",align:"stretch",wrap:!0,gutter:[{xs:12,sm:12,md:12,lg:12,xl:24},{xs:12,sm:12,md:12,lg:12,xl:24}]},{default:e(()=>[t(S,{xl:12,lg:24,md:24,sm:24,xs:24},{default:e(()=>[t(x,{hoverable:"",title:a(l)("page.banlog.charts.title.line")},{extra:e(()=>[t(D,null,{content:e(()=>[t(w,{model:d},{default:e(()=>[t(u,{field:"timeStep",label:a(l)("page.banlog.charts.options.steps"),"label-col-flex":"100px"},{default:e(()=>[t(c,{modelValue:d.timeStep,"onUpdate:modelValue":s[0]||(s[0]=m=>d.timeStep=m),onChange:s[1]||(s[1]=m=>P(m))},{default:e(()=>[t(p,{value:"day"},{default:e(()=>[g(f(a(l)("page.banlog.charts.options.day")),1)]),_:1}),t(p,{value:"hour"},{default:e(()=>[g(f(a(l)("page.banlog.charts.options.hour")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),t(u,{field:"range",label:a(l)("page.banlog.charts.options.days"),"label-col-flex":"100px"},{default:e(()=>[t(z,{"show-time":"",modelValue:d.range,"onUpdate:modelValue":s[2]||(s[2]=m=>d.range=m),"value-format":"Date",shortcuts:d.timeStep==="day"?[{label:a(l)("page.banlog.charts.options.shortcut.7days"),value:()=>[a(i)().startOf("day").add(-7,"day").toDate(),new Date]},{label:a(l)("page.banlog.charts.options.shortcut.14days"),value:()=>[a(i)().startOf("day").add(-14,"day").toDate(),new Date]},{label:a(l)("page.banlog.charts.options.shortcut.30days"),value:()=>[a(i)().startOf("day").add(-30,"day").toDate(),new Date]}]:[{label:a(l)("page.banlog.charts.options.shortcut.6hours"),value:()=>[a(i)().startOf("hour").add(-6,"hour").toDate(),new Date]},{label:a(l)("page.banlog.charts.options.shortcut.12hours"),value:()=>[a(i)().startOf("hour").add(-12,"hour").toDate(),new Date]},{label:a(l)("page.banlog.charts.options.shortcut.24hours"),value:()=>[a(i)().startOf("hour").add(-24,"hour").toDate(),new Date]}]},null,8,["modelValue","shortcuts"])]),_:1},8,["label"])]),_:1},8,["model"])]),default:e(()=>[t(o,null,{default:e(()=>[g(f(a(l)("page.banlog.charts.options.more")),1)]),_:1})]),_:1})]),default:e(()=>[t(a(C),{class:"chart",option:v.value,loading:a(F),loadingOptions:y,theme:"ovilia-green",autoresize:"","init-options":{renderer:"svg"}},null,8,["option","loading"])]),_:1},8,["title"])]),_:1}),t(S,{xl:12,lg:24,md:24,sm:24,xs:24},{default:e(()=>[t(x,{hoverable:"",title:a(l)("page.banlog.charts.options.field."+r.field)},{extra:e(()=>[t(D,null,{content:e(()=>[t(w,{model:r,style:{width:"25vh"}},{default:e(()=>[t(u,{field:"field",label:a(l)("page.banlog.charts.options.field")},{default:e(()=>[t(E,{modelValue:r.field,"onUpdate:modelValue":s[3]||(s[3]=m=>r.field=m),"trigger-props":{autoFitPopupMinWidth:!0}},{default:e(()=>[t(_,{value:"peerId"},{default:e(()=>[g(f(a(l)("page.banlog.charts.options.field.peerId")),1)]),_:1}),t(_,{value:"torrentName"},{default:e(()=>[g(f(a(l)("page.banlog.charts.options.field.torrentName")),1)]),_:1}),t(_,{value:"module"},{default:e(()=>[g(f(a(l)("page.banlog.charts.options.field.module")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),t(u,{field:"enableThreshold"},{default:e(()=>[t(k,null,{default:e(()=>[t(V,{modelValue:r.enableThreshold,"onUpdate:modelValue":s[4]||(s[4]=m=>r.enableThreshold=m)},null,8,["modelValue"]),t(O,null,{default:e(()=>[g(f(a(l)("page.banlog.charts.options.thresold")),1)]),_:1})]),_:1})]),_:1}),r.field==="peerId"?(L(),N(u,{key:0,field:"mergeSameVersion"},{default:e(()=>[t(k,null,{default:e(()=>[t(V,{modelValue:r.mergeSameVersion,"onUpdate:modelValue":s[5]||(s[5]=m=>r.mergeSameVersion=m)},null,8,["modelValue"]),t(O,null,{default:e(()=>[g(f(a(l)("page.banlog.charts.options.mergeSame")),1)]),_:1})]),_:1})]),_:1})):oe("",!0)]),_:1},8,["model"])]),default:e(()=>[t(o,null,{default:e(()=>[g(f(a(l)("page.banlog.charts.options.more")),1)]),_:1})]),_:1})]),default:e(()=>[t(a(C),{class:"chart",option:h.value,loading:a(R),autoresize:"",loadingOptions:y,theme:a(b).isDark?"dark":"light","init-options":{renderer:"svg"}},null,8,["option","loading","theme"])]),_:1},8,["title"])]),_:1})]),_:1})}}}),Ve=X(ye,[["__scopeId","data-v-c14720c6"]]);export{Ve as default};