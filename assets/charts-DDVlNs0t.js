import{g as F,_ as $}from"./index-GhcJoHFr.js";import{u as M,D as N,H as O,i as B,a as E,b as L,c as j,d as P,e as U,f as z}from"./echarts-BJEPcaot.js";import{e as H,a7 as W,A as X,aj as q,a as R,c as w,a8 as Y,r as G,h as T,j as V,v as a,C as e,a2 as r,y as c,N as f,F as J,O as K}from"./libs-C-CmtbE_.js";import{ah as h,L as Q,W as Z,X as ee,F as ae,Y as te,T as le,S as oe,u as se,ai as ne,C as re}from"./arcoDesign-B9B8WxT9.js";const ie={style:{display:"flex","align-items":"center","flex-flow":"column"}},de=H({__name:"charts",setup(ue){const{t:i,d:k}=W();M([B,E,L,j,P,U,z]),X(N,q().value?"dark":"light");const u=R({field:"peerId",enableThreshold:!0}),A={text:"Loading…",color:"#4ea397",maskColor:"rgba(255, 255, 255, 0.4)"},D=w(()=>{const d={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"right",data:[]},series:[{name:i("page.banlog.charts.options.field."+u.field),type:"pie",radius:"55%",center:["50%","60%"],data:[],emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};if(_.value){const s=new Map;_.value.results.forEach(t=>{const l=t[u.field];s.has(l)?s.set(l,s.get(l)+1):s.set(l,1)}),d.series[0].data=Array.from(s,([t,l])=>({name:t,value:l})),u.enableThreshold&&(d.series[0].data=d.series[0].data.filter(l=>l.value/_.value.results.length>.01)),d.legend.data=d.series[0].data.map(t=>t.name)}return d}),{loading:C,data:_}=Y(F,{defaultParams:[{pageIndex:1,pageSize:1e5}]}),m=G(7),I=w(()=>{const d={xAxis:{type:"category",data:[]},yAxis:{type:"value"},tooltip:{trigger:"axis"},series:[{data:[],type:"line",smooth:!0,name:i("page.banlog.charts.line.options.field")}]};if(_.value){new Date().setHours(0,0,0);const t=new Map;for(let o=m.value;o>=0;o--){const n=h().add(-1*o,"day").startOf("day");t.set(n.valueOf(),0)}const l=h().add(-1*m.value,"day").startOf("day");_.value.results.filter(o=>h(o.banAt).isAfter(l)).sort((o,n)=>o.banAt-n.banAt).forEach(o=>{const n=h(o.banAt).startOf("day").valueOf();t.has(n)?t.set(n,t.get(n)+1):t.set(n,1)}),t.forEach((o,n)=>{d.xAxis.data.push(k(n,"short")),d.series[0].data.push(o)})}return d});return(d,s)=>{const t=Q,l=Z,g=ee,o=ae,n=te,S=le,b=oe,v=se,y=ne,x=re;return T(),V("div",ie,[a(b,{direction:"vertical"},{default:e(()=>[a(x,{hoverable:"",title:r(i)("page.banlog.charts.options.field."+u.field)},{extra:e(()=>[a(y,null,{content:e(()=>[a(v,{model:u,style:{width:"25vh"}},{default:e(()=>[a(o,{field:"field",label:r(i)("page.banlog.charts.options.field")},{default:e(()=>[a(g,{modelValue:u.field,"onUpdate:modelValue":s[0]||(s[0]=p=>u.field=p),"trigger-props":{autoFitPopupMinWidth:!0}},{default:e(()=>[a(l,{value:"peerId"},{default:e(()=>[c(f(r(i)("page.banlog.charts.options.field.peerId")),1)]),_:1}),a(l,{value:"torrentName"},{default:e(()=>[c(f(r(i)("page.banlog.charts.options.field.torrentName")),1)]),_:1}),a(l,{value:"module"},{default:e(()=>[c(f(r(i)("page.banlog.charts.options.field.module")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),a(o,{field:"enableThreshold"},{default:e(()=>[a(b,null,{default:e(()=>[a(n,{modelValue:u.enableThreshold,"onUpdate:modelValue":s[1]||(s[1]=p=>u.enableThreshold=p)},null,8,["modelValue"]),a(S,null,{default:e(()=>[c(f(r(i)("page.banlog.charts.options.thresold")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),default:e(()=>[a(t,null,{default:e(()=>[c(f(r(i)("page.banlog.charts.options.more")),1)]),_:1})]),_:1})]),default:e(()=>[a(r(O),{class:"chart",option:D.value,loading:r(C),loadingOptions:A},null,8,["option","loading"])]),_:1},8,["title"]),a(x,{hoverable:"",title:r(i)("page.banlog.charts.title.line",{days:m.value})},{extra:e(()=>[a(y,null,{content:e(()=>[a(v,{model:{lastDays:m.value},style:{width:"25vh"}},{default:e(()=>[a(o,{field:"field",label:r(i)("page.banlog.charts.options.days"),"label-col-flex":"100px"},{default:e(()=>[a(g,{modelValue:m.value,"onUpdate:modelValue":s[2]||(s[2]=p=>m.value=p)},{default:e(()=>[(T(),V(J,null,K([7,14,30],p=>a(l,{key:p,value:p},{default:e(()=>[c(f(p),1)]),_:2},1032,["value"])),64))]),_:1},8,["modelValue"])]),_:1},8,["label"])]),_:1},8,["model"])]),default:e(()=>[a(t,null,{default:e(()=>[c(f(r(i)("page.banlog.charts.options.more")),1)]),_:1})]),_:1})]),default:e(()=>[a(r(O),{class:"chart",option:I.value,theme:"ovilia-green",autoresize:""},null,8,["option"])]),_:1},8,["title"])]),_:1})])}}}),_e=$(de,[["__scopeId","data-v-2c60dca9"]]);export{_e as default};
