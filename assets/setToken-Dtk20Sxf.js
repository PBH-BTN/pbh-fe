import{l as v,c as x}from"./index-BzsUsWh9.js";import{e as I,a6 as V,am as q,h as B,q as C,C as o,v as e,y as r,N as c,a2 as n}from"./libs-tLzij8UM.js";import{h as U,U as w,Q as F,s as N,B as S,e as D,S as M,F as L,t as P}from"./arcoDesign-DCmKwCeN.js";import{I as Q}from"./index-HmxKNo6q.js";const R=I({__name:"setToken",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(p){const{t:a}=V(),t=q(p,"modelValue"),_=()=>{t.value.token=crypto.randomUUID()};return(j,s)=>{const m=U,u=w,d=F,i=Q,f=N,g=v,y=S,h=D,l=M,k=L,T=P;return B(),C(l,{direction:"vertical"},{default:o(()=>[e(d,{style:{"text-align":"left"}},{default:o(()=>[e(m,null,{default:o(()=>[r(c(n(a)("page.oobe.setToken.title")),1)]),_:1}),e(u,null,{default:o(()=>[r(c(n(a)("page.oobe.setToken.description")),1)]),_:1})]),_:1}),e(T,{model:t.value,style:{"margin-top":"15vh"}},{default:o(()=>[e(k,{label:"Token",required:""},{default:o(()=>[e(l,null,{default:o(()=>[e(f,{style:{width:"27em"},placeholder:"aa-bb-cc-dd-ee-ff","allow-clear":"",modelValue:t.value.token,"onUpdate:modelValue":s[0]||(s[0]=b=>t.value.token=b),rules:[{required:!0}],"validate-trigger":"blur"},{prefix:o(()=>[e(i)]),_:1},8,["modelValue"]),e(h,{content:n(a)("page.oobe.setToken.generate")},{default:o(()=>[e(y,{class:"generate-btn",type:"text",shape:"circle",onClick:_},{icon:o(()=>[e(g)]),_:1})]),_:1},8,["content"])]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})}}}),H=x(R,[["__scopeId","data-v-52c5de7f"]]);export{H as default};
