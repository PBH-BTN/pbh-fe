import{_ as x,l as V,c as w}from"./index-aKMY8YvX.js";import{f as U,a4 as B,al as D,j as F,s as q,t as o,y as e,v as l,x as c,a2 as n}from"./libs-CbUB4rL-.js";import{h as C,X as P,W as S,s as E,B as L,e as M,S as N,F as R,t as j}from"./arcoDesign-3SOqbcwa.js";import{I as A}from"./index-DUzEGLN6.js";const O=U({__name:"setToken",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(_){const{t:a}=B(),t=D(_,"modelValue"),p=async()=>{t.value.token=await u()},u=async()=>crypto.randomUUID?crypto.randomUUID():(await x(()=>import("./uuid-84gC_vFb.js"),[],import.meta.url)).v4();return(i,r)=>{const m=C,d=P,f=S,y=A,g=E,h=V,k=L,T=M,s=N,v=R,I=j;return F(),q(s,{direction:"vertical"},{default:o(()=>[e(f,{style:{"text-align":"left"}},{default:o(()=>[e(m,null,{default:o(()=>[l(c(n(a)("page.oobe.setToken.title")),1)]),_:1}),e(d,null,{default:o(()=>[l(c(n(a)("page.oobe.setToken.description")),1)]),_:1})]),_:1}),e(I,{model:t.value,style:{"margin-top":"15vh"}},{default:o(()=>[e(v,{label:"Token",required:""},{default:o(()=>[e(s,null,{default:o(()=>[e(g,{style:{width:"27em"},placeholder:"aa-bb-cc-dd-ee-ff","allow-clear":"",modelValue:t.value.token,"onUpdate:modelValue":r[0]||(r[0]=b=>t.value.token=b),rules:[{required:!0}],"validate-trigger":"blur"},{prefix:o(()=>[e(y)]),_:1},8,["modelValue"]),e(T,{content:n(a)("page.oobe.setToken.generate")},{default:o(()=>[e(k,{class:"generate-btn",type:"text",shape:"circle",onClick:p},{icon:o(()=>[e(h)]),_:1})]),_:1},8,["content"])]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})}}}),H=w(O,[["__scopeId","data-v-e25fe9a7"]]);export{H as default};