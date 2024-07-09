import{u as z,g as B,_ as M}from"./index-BDEqivmy.js";import{u as E,H as O,i as L,a as U,b as j,c as P,d as q,e as H,f as R}from"./echarts-CeIfDHi3.js";import{e as W,a6 as X,a as Y,c as C,a7 as G,r as J,h as b,q as I,C as e,v as a,a2 as r,y as c,N as f,s as K,j as Q,F as Z,O as ee}from"./libs-CfNwz28r.js";import{ah as h,L as ae,W as te,X as le,F as oe,Y as se,T as ne,S as re,u as ie,ai as de,C as ue,w as pe,x as me}from"./arcoDesign-COq-vaMw.js";const ce=W({__name:"charts",setup(fe){const{t:i,d:T}=X();E([L,U,j,P,q,H,R]);const y=z(),s=Y({field:"peerId",enableThreshold:!0,mergeSameVersion:!1}),A={text:"Loading…",color:"#4ea397",maskColor:"rgba(255, 255, 255, 0.4)"},D=C(()=>{const u={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"right",type:"scroll",right:10,top:20,bottom:20,data:[]},backgroundColor:y.isDark?"rgba(0, 0, 0, 0.0)":void 0,series:[{name:i("page.banlog.charts.options.field."+s.field),type:"pie",radius:"55%",center:["50%","60%"],data:[],emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};if(_.value){const n=new Map;_.value.results.forEach(l=>{let t=l[s.field];if(s.field==="peerId"&&t===""&&(t=i("page.banlist.banlist.listItem.empty")),s.field==="peerId"&&s.mergeSameVersion){const m=t.match(/^([-]?[a-zA-z]+)[0-9]+.*/);m&&(m==null?void 0:m.length)>=2&&(t=m[1]+"*")}n.has(t)?n.set(t,n.get(t)+1):n.set(t,1)}),u.series[0].data=Array.from(n,([l,t])=>({name:l,value:t})),s.enableThreshold&&(u.series[0].data=u.series[0].data.filter(t=>t.value/_.value.results.length>.01)),u.legend.data=u.series[0].data.map(l=>l.name)}return u}),{loading:F,data:_}=G(B,{defaultParams:[{pageIndex:1,pageSize:1e5}]}),g=J(7),N=C(()=>{const u={xAxis:{type:"category",data:[]},yAxis:{type:"value"},tooltip:{trigger:"axis"},series:[{data:[],type:"line",smooth:!0,name:i("page.banlog.charts.line.options.field")}]};if(_.value){new Date().setHours(0,0,0);const l=new Map;for(let o=g.value;o>=0;o--){const d=h().add(-1*o,"day").startOf("day");l.set(d.valueOf(),0)}const t=h().add(-1*g.value,"day").startOf("day");_.value.results.filter(o=>h(o.banAt).isAfter(t)).sort((o,d)=>o.banAt-d.banAt).forEach(o=>{const d=h(o.banAt).startOf("day").valueOf();l.has(d)?l.set(d,l.get(d)+1):l.set(d,1)}),l.forEach((o,d)=>{u.xAxis.data.push(T(d,"short")),u.series[0].data.push(o)})}return u});return(u,n)=>{const l=ae,t=te,m=le,o=oe,d=se,v=ne,x=re,V=ie,k=de,w=ue,S=pe,$=me;return b(),I($,{justify:"center",align:"stretch",wrap:!0,gutter:[{xs:12,sm:12,md:12,lg:12,xl:24},{xs:12,sm:12,md:12,lg:12,xl:24}]},{default:e(()=>[a(S,{xl:12,lg:24,md:24,sm:24,xs:24},{default:e(()=>[a(w,{hoverable:"",title:r(i)("page.banlog.charts.options.field."+s.field)},{extra:e(()=>[a(k,null,{content:e(()=>[a(V,{model:s,style:{width:"25vh"}},{default:e(()=>[a(o,{field:"field",label:r(i)("page.banlog.charts.options.field")},{default:e(()=>[a(m,{modelValue:s.field,"onUpdate:modelValue":n[0]||(n[0]=p=>s.field=p),"trigger-props":{autoFitPopupMinWidth:!0}},{default:e(()=>[a(t,{value:"peerId"},{default:e(()=>[c(f(r(i)("page.banlog.charts.options.field.peerId")),1)]),_:1}),a(t,{value:"torrentName"},{default:e(()=>[c(f(r(i)("page.banlog.charts.options.field.torrentName")),1)]),_:1}),a(t,{value:"module"},{default:e(()=>[c(f(r(i)("page.banlog.charts.options.field.module")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),a(o,{field:"enableThreshold"},{default:e(()=>[a(x,null,{default:e(()=>[a(d,{modelValue:s.enableThreshold,"onUpdate:modelValue":n[1]||(n[1]=p=>s.enableThreshold=p)},null,8,["modelValue"]),a(v,null,{default:e(()=>[c(f(r(i)("page.banlog.charts.options.thresold")),1)]),_:1})]),_:1})]),_:1}),s.field==="peerId"?(b(),I(o,{key:0,field:"mergeSameVersion"},{default:e(()=>[a(x,null,{default:e(()=>[a(d,{modelValue:s.mergeSameVersion,"onUpdate:modelValue":n[2]||(n[2]=p=>s.mergeSameVersion=p)},null,8,["modelValue"]),a(v,null,{default:e(()=>[c(f(r(i)("page.banlog.charts.options.mergeSame")),1)]),_:1})]),_:1})]),_:1})):K("",!0)]),_:1},8,["model"])]),default:e(()=>[a(l,null,{default:e(()=>[c(f(r(i)("page.banlog.charts.options.more")),1)]),_:1})]),_:1})]),default:e(()=>[a(r(O),{class:"chart",option:D.value,loading:r(F),autoresize:"",loadingOptions:A,theme:r(y).isDark?"dark":"light","init-options":{renderer:"svg"}},null,8,["option","loading","theme"])]),_:1},8,["title"])]),_:1}),a(S,{xl:12,lg:24,md:24,sm:24,xs:24},{default:e(()=>[a(w,{hoverable:"",title:r(i)("page.banlog.charts.title.line",{days:g.value})},{extra:e(()=>[a(k,null,{content:e(()=>[a(V,{model:{lastDays:g.value},style:{width:"25vh"}},{default:e(()=>[a(o,{field:"field",label:r(i)("page.banlog.charts.options.days"),"label-col-flex":"100px"},{default:e(()=>[a(m,{modelValue:g.value,"onUpdate:modelValue":n[3]||(n[3]=p=>g.value=p)},{default:e(()=>[(b(),Q(Z,null,ee([7,14,30],p=>a(t,{key:p,value:p},{default:e(()=>[c(f(p),1)]),_:2},1032,["value"])),64))]),_:1},8,["modelValue"])]),_:1},8,["label"])]),_:1},8,["model"])]),default:e(()=>[a(l,null,{default:e(()=>[c(f(r(i)("page.banlog.charts.options.more")),1)]),_:1})]),_:1})]),default:e(()=>[a(r(O),{class:"chart",option:N.value,theme:"ovilia-green",autoresize:"","init-options":{renderer:"svg"}},null,8,["option"])]),_:1},8,["title"])]),_:1})]),_:1})}}}),ye=M(ce,[["__scopeId","data-v-80cb8372"]]);export{ye as default};