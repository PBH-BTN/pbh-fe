const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./welcome-DsKuxNEE.js","./index-okGCfjWd.js","./libs-CPdh8xC_.js","./arcoDesign-CD4eothr.js","./index-CWES_QPJ.css","./setToken-CMUwZHJy.js","./index-ByZN7NJf.js","./setToken-CMEbT4cy.css","./addDownloader-DJKE4ewD.js","./init-BaHlqMKI.js","./result-BJXe2Y2D.js","./result-Cp_1YuAP.css"])))=>i.map(i=>d[i]);
import{_ as c}from"./index-okGCfjWd.js";import{f as D,a6 as L,r as f,c as P,s as n,D as t,j as a,x as s,k as R,P as A,F as B,p as N,am as S,N as O,z as p,O as u,a2 as v,t as g,a8 as l}from"./libs-CPdh8xC_.js";import{R as j,ak as z,al as F,B as H,am as M,S as U,C as q,an as G}from"./arcoDesign-CD4eothr.js";const J={style:{width:"100%",minHeight:"50vh",textAlign:"center",position:"relative"}},Z=D({__name:"index",setup(K){const{t:o}=L(),e=f(1),y=P(()=>[{title:o("page.oobe.steps.welcome"),description:""},{title:o("page.oobe.steps.setToken.title"),description:o("page.oobe.steps.setToken.description")},{title:o("page.oobe.steps.addDownloader.title"),description:""},{title:o("page.oobe.steps.success.title"),description:o("page.oobe.steps.success.description")}]),r=f({token:"",downloaderConfig:{name:"",config:{basicAuth:{},verifySsl:!0,httpVersion:"HTTP_1_1",incrementBan:!0}},valid:!1}),x=[l(()=>c(()=>import("./welcome-DsKuxNEE.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url)),l(()=>c(()=>import("./setToken-CMUwZHJy.js"),__vite__mapDeps([5,1,2,3,4,6,7]),import.meta.url)),l(()=>c(()=>import("./addDownloader-DJKE4ewD.js"),__vite__mapDeps([8,1,2,3,4,9]),import.meta.url)),l(()=>c(()=>import("./result-BJXe2Y2D.js"),__vite__mapDeps([10,1,2,3,4,9,11]),import.meta.url))],k=()=>{e.value=Math.max(1,e.value-1)},b=()=>{switch(e.value){case 1:return!0;case 2:return r.value.token.length>0;case 3:return r.value.valid;case 4:return!1}},h=()=>{e.value=Math.min(4,e.value+1)};return(Q,_)=>{const V=G,C=z,w=F,d=H,E=M,m=U,I=q,T=j;return a(),n(T,{justify:"center",style:{margin:"2% auto 0","max-width":"1200px"}},{default:t(()=>[s(I,{xl:16,md:18,sm:24},{default:t(()=>[s(m,{direction:"vertical",style:{display:"flex","justify-content":"center"}},{default:t(()=>[s(C,{current:e.value},{default:t(()=>[(a(!0),R(B,null,A(y.value,i=>(a(),n(V,{key:i.title,description:i.description},{default:t(()=>[p(u(i.title),1)]),_:2},1032,["description"]))),128))]),_:1},8,["current"]),N("div",J,[(a(),n(S,null,{default:t(()=>[(a(),n(O(x[e.value-1]),{modelValue:r.value,"onUpdate:modelValue":_[0]||(_[0]=i=>r.value=i)},null,8,["modelValue"]))]),_:1}))]),s(m,{size:"large",style:{display:"flex","justify-content":"center"}},{default:t(()=>[e.value>1?(a(),n(d,{key:0,type:"secondary",onClick:k},{default:t(()=>[s(w),p(" "+u(v(o)("page.oobe.action.back")),1)]),_:1})):g("",!0),e.value<4?(a(),n(d,{key:1,type:"primary",disabled:!b(),onClick:h},{default:t(()=>[p(u(v(o)("page.oobe.action.next"))+" ",1),s(E)]),_:1},8,["disabled"])):g("",!0)]),_:1})]),_:1})]),_:1})]),_:1})}}});export{Z as default};