import{b as x,l as V,_ as U}from"./index-DoWTuyKV.js";import{f as w,a4 as D,an as B,j as F,s as q,D as o,x as e,z as l,O as c,a2 as n}from"./libs-BXdPB6rs.js";import{h as C,U as P,Q as S,s as E,B as L,e as M,S as N,F as O,t as R}from"./arcoDesign-BlYsxJJr.js";import{I as j}from"./index-DkLgg9UI.js";const z=w({__name:"setToken",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(_){const{t:a}=D(),t=B(_,"modelValue"),p=async()=>{t.value.token=await u()},u=async()=>crypto.randomUUID?crypto.randomUUID():(await x(()=>import("./uuid-84gC_vFb.js"),[],import.meta.url)).v4();return(i,r)=>{const m=C,d=P,f=S,y=j,g=E,h=V,k=L,T=M,s=N,v=O,b=R;return F(),q(s,{direction:"vertical"},{default:o(()=>[e(f,{style:{"text-align":"left"}},{default:o(()=>[e(m,null,{default:o(()=>[l(c(n(a)("page.oobe.setToken.title")),1)]),_:1}),e(d,null,{default:o(()=>[l(c(n(a)("page.oobe.setToken.description")),1)]),_:1})]),_:1}),e(b,{model:t.value,style:{"margin-top":"15vh"}},{default:o(()=>[e(v,{label:"Token",required:""},{default:o(()=>[e(s,null,{default:o(()=>[e(g,{style:{width:"27em"},placeholder:"aa-bb-cc-dd-ee-ff","allow-clear":"",modelValue:t.value.token,"onUpdate:modelValue":r[0]||(r[0]=I=>t.value.token=I),rules:[{required:!0}],"validate-trigger":"blur"},{prefix:o(()=>[e(y)]),_:1},8,["modelValue"]),e(T,{content:n(a)("page.oobe.setToken.generate")},{default:o(()=>[e(k,{class:"generate-btn",type:"text",shape:"circle",onClick:p},{icon:o(()=>[e(h)]),_:1})]),_:1},8,["content"])]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})}}}),J=U(z,[["__scopeId","data-v-e25fe9a7"]]);export{J as default};
