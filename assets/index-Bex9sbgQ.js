const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dummyChart-CGiFjX7x.js","./echarts-BfBCkNDR.js","./libs-CbUB4rL-.js","./index-BwayAyKO.js","./arcoDesign-3SOqbcwa.js","./index-1C2KzMiq.css"])))=>i.map(i=>d[i]);
import{u as B,a as F,g as j,b as M,f as re,_ as ke,c as xe}from"./index-BwayAyKO.js";import{u as N,E as q,i as W,a as ce,b as ne,c as G,d as le,e as ue,f as Se,g as Oe}from"./echarts-BfBCkNDR.js";import{f as V,a4 as L,c as C,a as X,r as $,w as J,a5 as Y,j as y,s as x,t as l,y as n,a2 as s,v as b,x as _,u as Te,l as Ve,a6 as Ce,q as Re,o as Ae,I as Le,k as A,F as ae,P as oe,A as pe,n as Pe,M as Ie,N as Ue,p as ie}from"./libs-CbUB4rL-.js";import{aj as f,L as H,R as ze,r as Be,F as K,ak as te,t as Q,a3 as Z,C as z,al as me,am as he,V as fe,T as ge,S as _e,an as ve,e as ye,B as $e,af as Ee,w as Fe,v as je}from"./arcoDesign-3SOqbcwa.js";import{I as Me}from"./index-DUzEGLN6.js";async function Ne(p,e=!1){const a=B();await a.serverAvailable;const t=new URLSearchParams({type:"count",field:p,filter:e?"0.01":"0"}),r=new URL(F(a.endpoint,"api/statistic/analysis/field?"+t.toString()),location.href);return fetch(r,{headers:j()}).then(o=>(a.assertResponseLogin(o),o.json()))}async function qe(p,e,a){const t=B();await t.serverAvailable;const r=new URL(F(t.endpoint,"api/chart/geoip"),location.href),o=p.getTime(),d=e.getTime();return r.searchParams.append("startAt",o.toString()),r.searchParams.append("endAt",d.toString()),r.searchParams.append("bannedOnly",String(a)),fetch(r,{headers:j()}).then(v=>(t.assertResponseLogin(v),v.json()))}async function We(p,e,a){const t=B();await t.serverAvailable;const r=new URLSearchParams({startAt:p.getTime().toString(),endAt:e.getTime().toString(),type:a,field:"banAt"}),o=new URL(F(t.endpoint,"api/statistic/analysis/date?"+r.toString()),location.href);return fetch(o,{headers:j()}).then(d=>(t.assertResponseLogin(d),d.json()))}async function Ge(p,e){const a=B();await a.serverAvailable;const t=new URLSearchParams({startAt:p.getTime().toString(),endAt:e.getTime().toString()}),r=new URL(F(a.endpoint,"api/chart/trend?"+t.toString()),location.href);return fetch(r,{headers:j()}).then(o=>(a.assertResponseLogin(o),o.json()))}async function Xe(p,e){const a=B();await a.serverAvailable;const t=new URLSearchParams({startAt:p.getTime().toString(),endAt:e.getTime().toString()}),r=new URL(F(a.endpoint,"api/chart/traffic?"+t.toString()),location.href);return fetch(r,{headers:j()}).then(o=>(a.assertResponseLogin(o),o.json()))}const Je=V({__name:"banLine",setup(p){const{t:e}=L(),a=C(()=>({text:e("page.charts.loading"),color:t.isDark?"rgb(60, 126, 255)":"rgb(22, 93, 255)",textColor:t.isDark?"rgba(255, 255, 255, 0.9)":"rgb(29, 33, 41)",maskColor:t.isDark?"rgba(0, 0, 0, 0.4)":"rgba(255, 255, 255, 0.4)"})),t=M();N([W,ce,ne,G]);const r=i=>{i==="day"?o.range=[f().startOf("day").add(-7,"day").toDate(),new Date]:o.range=[f().startOf("hour").add(-6,"hour").toDate(),new Date]},o=X({timeStep:"day",range:[f().startOf("day").add(-7,"day").toDate(),new Date]}),d=$({xAxis:{type:"time",max:"dataMax"},yAxis:{type:"value"},tooltip:{trigger:"axis"},series:[{data:[],type:"line",name:e("page.charts.line.options.field")}]});J(o,i=>{m(i.range[0],i.range[1],i.timeStep)});const{loading:v,run:m}=Y(We,{defaultParams:[f().startOf("day").add(-7,"day").toDate(),new Date,"day"],onSuccess:i=>{if(i.data){const c=new Map;for(let u=f(o.range[0]);u.isBefore(f(o.range[1]));u=u.add(1,o.timeStep))c.set(u.valueOf(),0);i.data.forEach(u=>{c.set(f(u.timestamp).startOf(o.timeStep).valueOf(),u.count)}),d.value.series[0].data=Array.from(c).sort(([u],[h])=>u-h).map(([u,h])=>[new Date(u),h])}}});return(i,c)=>{const u=H,h=ze,g=Be,D=K,S=te,O=Q,R=Z,P=z;return y(),x(P,{hoverable:"",title:s(e)("page.charts.title.line")},{extra:l(()=>[n(R,null,{content:l(()=>[n(O,{model:o},{default:l(()=>[n(D,{field:"timeStep",label:s(e)("page.charts.options.steps"),"label-col-flex":"100px"},{default:l(()=>[n(g,{modelValue:o.timeStep,"onUpdate:modelValue":c[0]||(c[0]=T=>o.timeStep=T),onChange:c[1]||(c[1]=T=>r(T))},{default:l(()=>[n(h,{value:"day"},{default:l(()=>[b(_(s(e)("page.charts.options.day")),1)]),_:1}),n(h,{value:"hour"},{default:l(()=>[b(_(s(e)("page.charts.options.hour")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),n(D,{field:"range",label:s(e)("page.charts.options.days"),"label-col-flex":"100px"},{default:l(()=>[n(S,{"show-time":"",modelValue:o.range,"onUpdate:modelValue":c[2]||(c[2]=T=>o.range=T),"value-format":"Date",shortcuts:o.timeStep==="day"?[{label:s(e)("page.charts.options.shortcut.7days"),value:()=>[s(f)().startOf("day").add(-7,"day").toDate(),new Date]},{label:s(e)("page.charts.options.shortcut.14days"),value:()=>[s(f)().startOf("day").add(-14,"day").toDate(),new Date]},{label:s(e)("page.charts.options.shortcut.30days"),value:()=>[s(f)().startOf("day").add(-30,"day").toDate(),new Date]}]:[{label:s(e)("page.charts.options.shortcut.6hours"),value:()=>[s(f)().startOf("hour").add(-6,"hour").toDate(),new Date]},{label:s(e)("page.charts.options.shortcut.12hours"),value:()=>[s(f)().startOf("hour").add(-12,"hour").toDate(),new Date]},{label:s(e)("page.charts.options.shortcut.24hours"),value:()=>[s(f)().startOf("hour").add(-24,"hour").toDate(),new Date]}]},null,8,["modelValue","shortcuts"])]),_:1},8,["label"])]),_:1},8,["model"])]),default:l(()=>[n(u,null,{default:l(()=>[b(_(s(e)("page.charts.options.more")),1)]),_:1})]),_:1})]),default:l(()=>[n(s(q),{class:"chart",option:d.value,loading:s(v),loadingOptions:a.value,theme:"ovilia-green",autoresize:"","init-options":{renderer:"svg"}},null,8,["option","loading","loadingOptions"])]),_:1},8,["title"])}}}),Ye=V({__name:"fieldPie",setup(p){const{t:e}=L();N([W,le,ue,G]);const a=M(),t=X({field:"peerId",enableThreshold:!0,mergeSameVersion:!1}),r=C(()=>({text:e("page.charts.loading"),color:a.isDark?"rgb(60, 126, 255)":"rgb(22, 93, 255)",textColor:a.isDark?"rgba(255, 255, 255, 0.9)":"rgb(29, 33, 41)",maskColor:a.isDark?"rgba(0, 0, 0, 0.4)":"rgba(255, 255, 255, 0.4)"})),o=$({tooltip:{trigger:"item",appendToBody:!0,formatter:'<p style="word-wrap:break-all"><b>{b}</b></p>  {c} ({d}%)'},legend:{orient:"vertical",left:"right",type:"scroll",right:10,top:20,bottom:20,data:[],textStyle:{overflow:"truncate",width:100},tooltip:{show:!0}},backgroundColor:a.isDark?"rgba(0, 0, 0, 0.0)":void 0,series:[{name:e("page.charts.options.field."+t.field),type:"pie",radius:"55%",center:["50%","60%"],data:[],emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]});J(t,m=>{v(m.field,m.enableThreshold)});const{loading:d,run:v}=Y(Ne,{defaultParams:["peerId",!0],onSuccess:m=>{if(m.data){const i=m.data.map(c=>(c.data===""&&(c.data=e("page.charts.options.field.empty")),c));if(t.mergeSameVersion&&t.field==="peerId"){const c=new Map;i.forEach(u=>{let h=u.data;const g=h.match(/^([-]?[a-zA-z]+)[0-9]+.*/);g&&(g==null?void 0:g.length)>=2&&(h=g[1]+"*"),c.has(h)?c.set(h,c.get(h)+u.count):c.set(h,u.count)}),o.value.legend.data=[],o.value.series[0].data=[],Array.from(c).forEach(([u,h])=>{o.value.legend.data.push(u),o.value.series[0].data.push({name:u,value:h})})}else o.value.legend.data=i.map(c=>c.data),o.value.series[0].data=i.map(c=>({name:c.data,value:c.count}))}}});return(m,i)=>{const c=H,u=me,h=he,g=K,D=fe,S=ge,O=_e,R=Q,P=Z,T=z;return y(),x(T,{hoverable:"",title:s(e)("page.charts.options.field."+t.field)},{extra:l(()=>[n(P,null,{content:l(()=>[n(R,{model:t,style:{width:"25vh"}},{default:l(()=>[n(g,{field:"field",label:s(e)("page.charts.options.field")},{default:l(()=>[n(h,{modelValue:t.field,"onUpdate:modelValue":i[0]||(i[0]=I=>t.field=I),"trigger-props":{autoFitPopupMinWidth:!0}},{default:l(()=>[n(u,{value:"peerId"},{default:l(()=>[b(_(s(e)("page.charts.options.field.peerId")),1)]),_:1}),n(u,{value:"torrentName"},{default:l(()=>[b(_(s(e)("page.charts.options.field.torrentName")),1)]),_:1}),n(u,{value:"module"},{default:l(()=>[b(_(s(e)("page.charts.options.field.module")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),n(g,{field:"enableThreshold"},{default:l(()=>[n(O,null,{default:l(()=>[n(D,{modelValue:t.enableThreshold,"onUpdate:modelValue":i[1]||(i[1]=I=>t.enableThreshold=I)},null,8,["modelValue"]),n(S,null,{default:l(()=>[b(_(s(e)("page.charts.options.thresold")),1)]),_:1})]),_:1})]),_:1}),t.field==="peerId"?(y(),x(g,{key:0,field:"mergeSameVersion"},{default:l(()=>[n(O,null,{default:l(()=>[n(D,{modelValue:t.mergeSameVersion,"onUpdate:modelValue":i[2]||(i[2]=I=>t.mergeSameVersion=I)},null,8,["modelValue"]),n(S,null,{default:l(()=>[b(_(s(e)("page.charts.options.mergeSame")),1)]),_:1})]),_:1})]),_:1})):Te("",!0)]),_:1},8,["model"])]),default:l(()=>[n(c,null,{default:l(()=>[b(_(s(e)("page.charts.options.more")),1)]),_:1})]),_:1})]),default:l(()=>[n(s(q),{class:"chart",option:o.value,loading:s(d),autoresize:"",loadingOptions:r.value,theme:s(a).isDark?"dark":"light","init-options":{renderer:"svg"}},null,8,["option","loading","loadingOptions","theme"])]),_:1},8,["title"])}}}),He=V({__name:"trends",setup(p){N([ne,W,ce,G]);const{t:e}=L(),a=X({range:[f().startOf("day").add(-7,"day").toDate(),new Date]}),t=M(),r=C(()=>({text:e("page.charts.loading"),color:t.isDark?"rgb(60, 126, 255)":"rgb(22, 93, 255)",textColor:t.isDark?"rgba(255, 255, 255, 0.9)":"rgb(29, 33, 41)",maskColor:t.isDark?"rgba(0, 0, 0, 0.4)":"rgba(255, 255, 255, 0.4)"})),o=$({xAxis:{type:"time",max:"dataMax"},yAxis:{type:"value"},tooltip:{trigger:"axis"},series:[{data:[],type:"line",color:"#A5A051",areaStyle:{color:"#A5A051"},name:e("page.charts.trends.options.peers")},{data:[],type:"line",color:"#DB4D6D",areaStyle:{color:"#DB4D6D"},name:e("page.charts.trends.options.bans")}]});J(a,m=>{v(m.range[0],m.range[1])});const{loading:d,run:v}=Y(Ge,{defaultParams:[f().startOf("day").add(-7,"day").toDate(),new Date],onSuccess:m=>{m.data&&(o.value.series[0].data=m.data.connectedPeersTrend.sort((i,c)=>i.key-c.key).map(i=>[new Date(i.key),i.value]),o.value.series[1].data=m.data.bannedPeersTrend.sort((i,c)=>i.key-c.key).map(i=>[new Date(i.key),i.value]))}});return(m,i)=>{const c=H,u=te,h=K,g=Q,D=Z,S=z;return y(),x(S,{hoverable:"",title:s(e)("page.charts.title.trends")},{extra:l(()=>[n(D,null,{content:l(()=>[n(g,{model:a},{default:l(()=>[n(h,{field:"range",label:s(e)("page.charts.options.days"),"label-col-flex":"100px"},{default:l(()=>[n(u,{"show-time":"",modelValue:a.range,"onUpdate:modelValue":i[0]||(i[0]=O=>a.range=O),"value-format":"Date",shortcuts:[{label:s(e)("page.charts.options.shortcut.7days"),value:()=>[s(f)().startOf("day").add(-7,"day").toDate(),new Date]},{label:s(e)("page.charts.options.shortcut.14days"),value:()=>[s(f)().startOf("day").add(-14,"day").toDate(),new Date]},{label:s(e)("page.charts.options.shortcut.30days"),value:()=>[s(f)().startOf("day").add(-30,"day").toDate(),new Date]}]},null,8,["modelValue","shortcuts"])]),_:1},8,["label"])]),_:1},8,["model"])]),default:l(()=>[n(c,null,{default:l(()=>[b(_(s(e)("page.charts.options.more")),1)]),_:1})]),_:1})]),default:l(()=>[n(s(q),{class:"chart",option:o.value,loading:s(d),loadingOptions:r.value,theme:"ovilia-green",autoresize:"","init-options":{renderer:"svg"}},null,8,["option","loading","loadingOptions"])]),_:1},8,["title"])}}}),Ke=V({__name:"traffic",setup(p){N([W,le,Se,ne,Oe,G]);const e=X({range:[f().startOf("day").add(-7,"day").toDate(),new Date]}),a=M(),t=C(()=>({text:r("page.charts.loading"),color:a.isDark?"rgb(60, 126, 255)":"rgb(22, 93, 255)",textColor:a.isDark?"rgba(255, 255, 255, 0.9)":"rgb(29, 33, 41)",maskColor:a.isDark?"rgba(0, 0, 0, 0.4)":"rgba(255, 255, 255, 0.4)"})),{t:r,d:o}=L(),d=$({tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:function(i){var c;return((c=i[0])==null?void 0:c.name)+":<br/>"+i.map(u=>`${u.marker} ${u.seriesName}: ${re(u.value)}`).join("<br>")}},legend:{data:[r("page.charts.traffic.options.download"),r("page.charts.traffic.options.upload")]},xAxis:[{type:"category",axisTick:{show:!1},data:[]}],yAxis:[{type:"value",axisLabel:{formatter:i=>re(i)}}],series:[{name:r("page.charts.traffic.options.download"),type:"bar",barGap:0,emphasis:{focus:"series"},data:[]},{name:r("page.charts.traffic.options.upload"),type:"bar",emphasis:{focus:"series"},data:[]}]});J(e,i=>{m(i.range[0],i.range[1])});const{loading:v,run:m}=Y(Xe,{defaultParams:[f().startOf("day").add(-7,"day").toDate(),new Date],onSuccess:i=>{i.data&&(d.value.xAxis[0].data.splice(0),d.value.series[0].data.splice(0),d.value.series[1].data.splice(0),i.data.journal.forEach(c=>{d.value.xAxis[0].data.push(o(new Date(c.timestamp),"short")),d.value.series[0].data.push(c.downloaded),d.value.series[1].data.push(c.uploaded)}))}});return(i,c)=>{const u=H,h=te,g=K,D=Q,S=ve,O=ye,R=Z,P=z;return y(),x(P,{hoverable:"",title:s(r)("page.charts.title.traffic")},{extra:l(()=>[n(R,null,{content:l(()=>[n(D,{model:e},{default:l(()=>[n(g,{field:"range",label:s(r)("page.charts.options.days"),"label-col-flex":"100px"},{default:l(()=>[n(h,{"show-time":"",modelValue:e.range,"onUpdate:modelValue":c[0]||(c[0]=T=>e.range=T),"value-format":"Date",shortcuts:[{label:s(r)("page.charts.options.shortcut.7days"),value:()=>[s(f)().startOf("day").add(-7,"day").toDate(),new Date]},{label:s(r)("page.charts.options.shortcut.14days"),value:()=>[s(f)().startOf("day").add(-14,"day").toDate(),new Date]},{label:s(r)("page.charts.options.shortcut.30days"),value:()=>[s(f)().startOf("day").add(-30,"day").toDate(),new Date]}]},null,8,["modelValue","shortcuts"])]),_:1},8,["label"])]),_:1},8,["model"])]),default:l(()=>[n(u,null,{default:l(()=>[b(_(s(r)("page.charts.options.more")),1)]),_:1}),n(O,{content:s(r)("page.charts.tooltip.traffic")},{default:l(()=>[n(S)]),_:1},8,["content"])]),_:1})]),default:l(()=>[n(s(q),{class:"chart",option:d.value,loading:s(v),loadingOptions:t.value,theme:"ovilia-green",autoresize:"","init-options":{renderer:"svg"}},null,8,["option","loading","loadingOptions"])]),_:1},8,["title"])}}}),Qe=V({__name:"plusWarpper",props:{title:{}},setup(p){const e=Ce(()=>ke(()=>import("./dummyChart-CGiFjX7x.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url)),{t:a}=L(),t=B(),r=C(()=>t.plusStatus),o=()=>{t.emmitter.emit("open-plus-modal")};return(d,v)=>{var h;const m=Me,i=$e,c=Ee,u=z;return(h=r.value)!=null&&h.activated?Ve(d.$slots,"default",{key:0},void 0,!0):(y(),x(u,{key:1,hoverable:"",title:d.title},{default:l(()=>[n(c,{class:"overlay",status:"warning",title:s(a)("page.charts.locked")},{icon:l(()=>[n(m)]),subtitle:l(()=>[b(_(s(a)("page.charts.locked.tips")),1)]),extra:l(()=>[n(i,{type:"primary",onClick:o},{default:l(()=>[b(_(s(a)("page.charts.locked.active")),1)]),_:1})]),_:1},8,["title"]),n(s(e))]),_:1},8,["title"]))}}}),se=xe(Qe,[["__scopeId","data-v-fa9c84e8"]]);var Ze=Object.defineProperty,et=(p,e,a)=>e in p?Ze(p,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):p[e]=a,w=(p,e,a)=>et(p,typeof e!="symbol"?e+"":e,a);const be=(p,e)=>{const a=p.__vccOpts||p;for(const[t,r]of e)a[t]=r;return a},tt={},at={class:"cell"};function ot(p,e){return y(),A("span",at,_(""))}const st=be(tt,[["render",ot]]),nt=V({__name:"TileView",props:{tile:{}},setup(p){const e=p,{tile:a}=pe(e),t=C(()=>{var r=["tile"];return r.push("tile"+a.value.value),a.value.mergedInto||r.push("position_"+a.value.row+"_"+a.value.column),a.value.mergedInto&&r.push("merged"),a.value.isNew()&&r.push("new"),a.value.hasMoved()&&(r.push("row_from_"+a.value.fromRow()+"_to_"+a.value.toRow()),r.push("column_from_"+a.value.fromColumn()+"_to_"+a.value.toColumn()),r.push("isMoving")),r.join(" ")});return(r,o)=>(y(),A("span",{class:Pe(t.value)},_(s(a).value),3))}}),lt={class:"overlay"},rt={class:"message"},it=V({__name:"GameEndOverlay",props:{board:{},onrestart:{type:Function}},setup(p){const e=p,{board:a}=pe(e),t=C(()=>a.value.hasWon()||a.value.hasLost()),r=C(()=>a.value.hasWon()?"Good Job!":a.value.hasLost()?"Game Over":""),o=()=>{e.onrestart&&e.onrestart()};return(d,v)=>Ie((y(),A("div",lt,[ie("p",rt,_(r.value),1),ie("button",{class:"tryAgain",onClick:o},"Try again")],512)),[[Ue,t.value]])}}),we=class De{constructor(e,a,t){w(this,"value"),w(this,"row"),w(this,"column"),w(this,"oldRow"),w(this,"oldColumn"),w(this,"markForDeletion"),w(this,"mergedInto"),w(this,"id"),this.value=e||0,this.row=a||-1,this.column=t||-1,this.oldRow=-1,this.oldColumn=-1,this.markForDeletion=!1,this.mergedInto=null,this.id=De.id++}moveTo(e,a){this.oldRow=this.row,this.oldColumn=this.column,this.row=e,this.column=a}isNew(){return this.oldRow===-1&&!this.mergedInto}hasMoved(){return this.fromRow()!==-1&&(this.fromRow()!==this.toRow()||this.fromColumn()!==this.toColumn())||this.mergedInto!==null}fromRow(){return this.mergedInto?this.row:this.oldRow}fromColumn(){return this.mergedInto?this.column:this.oldColumn}toRow(){return this.mergedInto?this.mergedInto.row:this.row}toColumn(){return this.mergedInto?this.mergedInto.column:this.column}};w(we,"id",0);let dt=we;const E=class k{constructor(){w(this,"tiles"),w(this,"cells"),w(this,"won"),this.tiles=[],this.cells=[];for(let e=0;e<k.size;++e)this.cells[e]=[this.addTile(),this.addTile(),this.addTile(),this.addTile()];this.addRandomTile(),this.setPositions(),this.won=!1}addTile(e){const a=new dt(e);return this.tiles.push(a),a}moveLeft(){let e=!1;for(let a=0;a<k.size;++a){const t=this.cells[a].filter(o=>o.value!=0),r=[];for(let o=0;o<k.size;++o){let d=t.length>0?t.shift():this.addTile();if(t.length>0&&t[0].value===d.value){const v=d;d=this.addTile(d.value),v.mergedInto=d;const m=t.shift();m.mergedInto=d,d.value+=m.value}r[o]=d,this.won=this.won||d.value===2048,e=e||d.value!==this.cells[a][o].value}this.cells[a]=r}return e}setPositions(){this.cells.forEach((e,a)=>{e.forEach((t,r)=>{t.oldRow=t.row,t.oldColumn=t.column,t.row=a,t.column=r,t.markForDeletion=!1})})}addRandomTile(){const e=[];for(let o=0;o<k.size;++o)for(let d=0;d<k.size;++d)this.cells[o][d].value===0&&e.push({r:o,c:d});const a=Math.floor(Math.random()*e.length),t=e[a],r=Math.random()<k.fourProbability?4:2;this.cells[t.r][t.c]=this.addTile(r)}move(e){this.clearOldTiles();for(let t=0;t<e;++t)this.cells=this.rotateLeft(this.cells);const a=this.moveLeft();for(let t=e;t<4;++t)this.cells=this.rotateLeft(this.cells);return a&&this.addRandomTile(),this.setPositions(),this}clearOldTiles(){this.tiles=this.tiles.filter(e=>!e.markForDeletion),this.tiles.forEach(e=>e.markForDeletion=!0)}hasWon(){return this.won}hasLost(){let e=!1;for(let a=0;a<k.size;++a)for(let t=0;t<k.size;++t){e=e||this.cells[a][t].value===0;for(let r=0;r<4;++r){const o=a+k.deltaX[r],d=t+k.deltaY[r];o<0||o>=k.size||d<0||d>=k.size||(e=e||this.cells[a][t].value===this.cells[o][d].value)}}return!e}rotateLeft(e){const a=e.length,t=e[0].length,r=[];for(let o=0;o<a;++o){r.push([]);for(let d=0;d<t;++d)r[o][d]=e[d][t-o-1]}return r}};w(E,"size",4),w(E,"fourProbability",.1),w(E,"deltaX",[-1,0,1,0]),w(E,"deltaY",[0,-1,0,1]);let de=E;const ct={class:"board",tabIndex:"1"},ut=V({__name:"BoardView",setup(p){const e=$(new de),a=o=>{if(!e.value.hasWon()&&o.keyCode>=37&&o.keyCode<=40){o.preventDefault();var d=o.keyCode-37;e.value.move(d)}},t=()=>{e.value=new de};Ae(()=>{window.addEventListener("keydown",a)}),Le(()=>{window.removeEventListener("keydown",a)});const r=C(()=>e.value.tiles.filter(o=>o.value!=0));return(o,d)=>(y(),A("div",ct,[(y(!0),A(ae,null,oe(e.value.cells,(v,m)=>(y(),A("div",{key:m},[(y(!0),A(ae,null,oe(v,(i,c)=>(y(),x(st,{key:c}))),128))]))),128)),(y(!0),A(ae,null,oe(r.value,(v,m)=>(y(),x(nt,{tile:v,key:m},null,8,["tile"]))),128)),n(it,{board:e.value,onrestart:t},null,8,["board"])]))}}),pt={name:"vue-2048",components:{BoardView:ut}};function mt(p,e,a,t,r,o){const d=Re("BoardView");return y(),x(d,{style:{margin:"0 auto"}})}const ee=be(pt,[["render",mt]]),ht=p=>{p.component(ee.name,ee)};ee.install=ht;const ft=V({__name:"2048",setup(p){const{t:e}=L();return(a,t)=>{const r=ve,o=ye,d=z;return y(),x(d,{hoverable:"",title:"2048"},{extra:l(()=>[n(o,{content:s(e)("page.charts.tooltip.2048")},{default:l(()=>[n(r)]),_:1},8,["content"])]),default:l(()=>[n(s(ee),{style:{margin:"0 auto"}})]),_:1})}}}),gt=V({__name:"ispPie",setup(p){const{t:e}=L();N([W,le,ue,G]);const a=M(),t=X({field:"isp",enableThreshold:!0,bannedOnly:!0,range:[f().startOf("day").add(-7,"day").toDate(),new Date]}),r=C(()=>({text:e("page.charts.loading"),color:a.isDark?"rgb(60, 126, 255)":"rgb(22, 93, 255)",textColor:a.isDark?"rgba(255, 255, 255, 0.9)":"rgb(29, 33, 41)",maskColor:a.isDark?"rgba(0, 0, 0, 0.4)":"rgba(255, 255, 255, 0.4)"})),o=$({tooltip:{trigger:"item",appendToBody:!0,formatter:'<p style="word-wrap:break-all"><b>{b}</b></p>  {c} ({d}%)'},legend:{orient:"vertical",left:"right",type:"scroll",right:10,top:20,bottom:20,data:[],textStyle:{overflow:"truncate",width:100},tooltip:{show:!0}},backgroundColor:a.isDark?"rgba(0, 0, 0, 0.0)":void 0,series:[{name:"",type:"pie",radius:"55%",center:["50%","60%"],data:[],emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]});J(t,m=>{v(m.range[0],m.range[1],t.bannedOnly)});const{loading:d,run:v}=Y(qe,{defaultParams:[f().startOf("day").add(-7,"day").toDate(),new Date,t.bannedOnly],onSuccess:m=>{if(m.data){const i=m.data[t.field];let c;if(t.enableThreshold){const h=i.reduce((g,D)=>g+D.value,0)*.01;c=i.filter(g=>g.value>=h)}else c=i;o.value.legend.data=c.map(u=>u.key),o.value.series[0].data=c.map(u=>({name:u.key==="N/A"&&t.field==="province"?e("page.charts.data.province.na"):u.key,value:u.value})),o.value.series[0].name=e("page.charts.options.field."+t.field)}}});return(m,i)=>{const c=H,u=me,h=he,g=K,D=te,S=fe,O=ge,R=_e,P=Q,T=Z,I=z;return y(),x(I,{hoverable:"",title:s(e)("page.charts.title.geoip")+(t.bannedOnly?s(e)("page.charts.subtitle.bannedOnly"):"")},{extra:l(()=>[n(T,null,{content:l(()=>[n(P,{model:t},{default:l(()=>[n(g,{field:"field",label:s(e)("page.charts.options.field")},{default:l(()=>[n(h,{modelValue:t.field,"onUpdate:modelValue":i[0]||(i[0]=U=>t.field=U),"trigger-props":{autoFitPopupMinWidth:!0}},{default:l(()=>[n(u,{value:"isp"},{default:l(()=>[b(_(s(e)("page.charts.options.field.isp")),1)]),_:1}),n(u,{value:"province"},{default:l(()=>[b(_(s(e)("page.charts.options.field.province")),1)]),_:1}),n(u,{value:"city"},{default:l(()=>[b(_(s(e)("page.charts.options.field.city")),1)]),_:1}),n(u,{value:"region"},{default:l(()=>[b(_(s(e)("page.charts.options.field.region")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),n(g,{field:"range",label:s(e)("page.charts.options.days"),"label-col-flex":"100px"},{default:l(()=>[n(D,{"show-time":"",modelValue:t.range,"onUpdate:modelValue":i[1]||(i[1]=U=>t.range=U),"value-format":"Date",shortcuts:[{label:s(e)("page.charts.options.shortcut.7days"),value:()=>[s(f)().startOf("day").add(-7,"day").toDate(),new Date]},{label:s(e)("page.charts.options.shortcut.14days"),value:()=>[s(f)().startOf("day").add(-14,"day").toDate(),new Date]},{label:s(e)("page.charts.options.shortcut.30days"),value:()=>[s(f)().startOf("day").add(-30,"day").toDate(),new Date]}]},null,8,["modelValue","shortcuts"])]),_:1},8,["label"]),n(g,{field:"enableThreshold"},{default:l(()=>[n(R,null,{default:l(()=>[n(S,{modelValue:t.enableThreshold,"onUpdate:modelValue":i[2]||(i[2]=U=>t.enableThreshold=U)},null,8,["modelValue"]),n(O,null,{default:l(()=>[b(_(s(e)("page.charts.options.thresold")),1)]),_:1})]),_:1})]),_:1}),n(g,{field:"bannedOnly"},{default:l(()=>[n(R,null,{default:l(()=>[n(S,{modelValue:t.bannedOnly,"onUpdate:modelValue":i[3]||(i[3]=U=>t.bannedOnly=U)},null,8,["modelValue"]),n(O,null,{default:l(()=>[b(_(s(e)("page.charts.options.bannedOnly")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),default:l(()=>[n(c,null,{default:l(()=>[b(_(s(e)("page.charts.options.more")),1)]),_:1})]),_:1})]),default:l(()=>[n(s(q),{class:"chart",option:o.value,loading:s(d),autoresize:"",loadingOptions:r.value,theme:s(a).isDark?"dark":"light","init-options":{renderer:"svg"}},null,8,["option","loading","loadingOptions","theme"])]),_:1},8,["title"])}}}),Dt=V({__name:"index",setup(p){const{t:e}=L();return(a,t)=>{const r=je,o=Fe;return y(),x(o,{justify:"center",align:"stretch",wrap:!0,gutter:[{xs:12,sm:12,md:12,lg:12,xl:24},{xs:12,sm:12,md:12,lg:12,xl:24}]},{default:l(()=>[n(r,{xl:12,lg:24,md:24,sm:24,xs:24},{default:l(()=>[n(Je)]),_:1}),n(r,{xl:12,lg:24,md:24,sm:24,xs:24},{default:l(()=>[n(Ye)]),_:1}),n(r,{xl:12,lg:24,md:24,sm:24,xs:24},{default:l(()=>[n(se,{title:s(e)("page.charts.title.trends")},{default:l(()=>[n(He)]),_:1},8,["title"])]),_:1}),n(r,{xl:12,lg:24,md:24,sm:24,xs:24},{default:l(()=>[n(se,{title:s(e)("page.charts.title.traffic")},{default:l(()=>[n(Ke)]),_:1},8,["title"])]),_:1}),n(r,{xl:12,lg:24,md:24,sm:24,xs:24},{default:l(()=>[n(se,{title:s(e)("page.charts.title.geoip")},{default:l(()=>[n(gt)]),_:1},8,["title"])]),_:1}),n(r,{xl:12,lg:24,md:24,sm:24,xs:24},{default:l(()=>[n(ft)]),_:1})]),_:1})}}});export{Dt as default};
