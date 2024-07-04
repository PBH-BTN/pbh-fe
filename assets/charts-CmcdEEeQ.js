import{u as $,g as M,_ as N}from"./index-5wvcLFWg.js";import{u as B,H as O,i as E,a as L,b as z,c as P,d as U,e as j,f as H}from"./echarts-N-CBMVfc.js";import{e as W,a7 as X,a as q,c as w,a8 as R,r as Y,h as T,j as V,v as a,C as e,a2 as s,y as c,N as f,F as G,O as J}from"./libs-C-CmtbE_.js";import{ah as _,L as K,W as Q,X as Z,F as ee,Y as ae,T as te,S as oe,u as le,ai as se,C as ne}from"./arcoDesign-B9B8WxT9.js";const re={style:{display:"flex","align-items":"center","flex-flow":"column"}},ie=W({__name:"charts",setup(de){const{t:i,d:D}=X();B([E,L,z,P,U,j,H]);const b=$(),u=q({field:"peerId",enableThreshold:!0}),A={text:"Loading…",color:"#4ea397",maskColor:"rgba(255, 255, 255, 0.4)"},C=w(()=>{const d={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"right",data:[]},backgroundColor:b.isDark?"rgba(0, 0, 0, 0.0)":void 0,series:[{name:i("page.banlog.charts.options.field."+u.field),type:"pie",radius:"55%",center:["50%","60%"],data:[],emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};if(h.value){const n=new Map;h.value.results.forEach(t=>{const o=t[u.field];n.has(o)?n.set(o,n.get(o)+1):n.set(o,1)}),d.series[0].data=Array.from(n,([t,o])=>({name:t,value:o})),u.enableThreshold&&(d.series[0].data=d.series[0].data.filter(o=>o.value/h.value.results.length>.01)),d.legend.data=d.series[0].data.map(t=>t.name)}return d}),{loading:S,data:h}=R(M,{defaultParams:[{pageIndex:1,pageSize:1e5}]}),m=Y(7),I=w(()=>{const d={xAxis:{type:"category",data:[]},yAxis:{type:"value"},tooltip:{trigger:"axis"},series:[{data:[],type:"line",smooth:!0,name:i("page.banlog.charts.line.options.field")}]};if(h.value){new Date().setHours(0,0,0);const t=new Map;for(let l=m.value;l>=0;l--){const r=_().add(-1*l,"day").startOf("day");t.set(r.valueOf(),0)}const o=_().add(-1*m.value,"day").startOf("day");h.value.results.filter(l=>_(l.banAt).isAfter(o)).sort((l,r)=>l.banAt-r.banAt).forEach(l=>{const r=_(l.banAt).startOf("day").valueOf();t.has(r)?t.set(r,t.get(r)+1):t.set(r,1)}),t.forEach((l,r)=>{d.xAxis.data.push(D(r,"short")),d.series[0].data.push(l)})}return d});return(d,n)=>{const t=K,o=Q,g=Z,l=ee,r=ae,F=te,v=oe,y=le,x=se,k=ne;return T(),V("div",re,[a(v,{direction:"vertical"},{default:e(()=>[a(k,{hoverable:"",title:s(i)("page.banlog.charts.options.field."+u.field)},{extra:e(()=>[a(x,null,{content:e(()=>[a(y,{model:u,style:{width:"25vh"}},{default:e(()=>[a(l,{field:"field",label:s(i)("page.banlog.charts.options.field")},{default:e(()=>[a(g,{modelValue:u.field,"onUpdate:modelValue":n[0]||(n[0]=p=>u.field=p),"trigger-props":{autoFitPopupMinWidth:!0}},{default:e(()=>[a(o,{value:"peerId"},{default:e(()=>[c(f(s(i)("page.banlog.charts.options.field.peerId")),1)]),_:1}),a(o,{value:"torrentName"},{default:e(()=>[c(f(s(i)("page.banlog.charts.options.field.torrentName")),1)]),_:1}),a(o,{value:"module"},{default:e(()=>[c(f(s(i)("page.banlog.charts.options.field.module")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),a(l,{field:"enableThreshold"},{default:e(()=>[a(v,null,{default:e(()=>[a(r,{modelValue:u.enableThreshold,"onUpdate:modelValue":n[1]||(n[1]=p=>u.enableThreshold=p)},null,8,["modelValue"]),a(F,null,{default:e(()=>[c(f(s(i)("page.banlog.charts.options.thresold")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),default:e(()=>[a(t,null,{default:e(()=>[c(f(s(i)("page.banlog.charts.options.more")),1)]),_:1})]),_:1})]),default:e(()=>[a(s(O),{class:"chart",option:C.value,loading:s(S),autoresize:"",loadingOptions:A,theme:s(b).isDark?"dark":"light","init-options":{renderer:"svg"}},null,8,["option","loading","theme"])]),_:1},8,["title"]),a(k,{hoverable:"",title:s(i)("page.banlog.charts.title.line",{days:m.value})},{extra:e(()=>[a(x,null,{content:e(()=>[a(y,{model:{lastDays:m.value},style:{width:"25vh"}},{default:e(()=>[a(l,{field:"field",label:s(i)("page.banlog.charts.options.days"),"label-col-flex":"100px"},{default:e(()=>[a(g,{modelValue:m.value,"onUpdate:modelValue":n[2]||(n[2]=p=>m.value=p)},{default:e(()=>[(T(),V(G,null,J([7,14,30],p=>a(o,{key:p,value:p},{default:e(()=>[c(f(p),1)]),_:2},1032,["value"])),64))]),_:1},8,["modelValue"])]),_:1},8,["label"])]),_:1},8,["model"])]),default:e(()=>[a(t,null,{default:e(()=>[c(f(s(i)("page.banlog.charts.options.more")),1)]),_:1})]),_:1})]),default:e(()=>[a(s(O),{class:"chart",option:I.value,theme:"ovilia-green",autoresize:"","init-options":{renderer:"svg"}},null,8,["option"])]),_:1},8,["title"])]),_:1})])}}}),me=N(ie,[["__scopeId","data-v-17305936"]]);export{me as default};