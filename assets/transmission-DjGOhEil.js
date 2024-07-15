import"./index-Beqw3KqC.js";import{e as g,a6 as v,am as c,h,j as w,v as l,C as t,a2 as n,y as u,N as U,F as M}from"./libs-DfNW6cuU.js";import{s as y,F as R,a5 as S,R as x,r as P,X as T}from"./arcoDesign-amu4IFh0.js";const I=g({__name:"transmission",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(m){const{t:d}=v(),a=c(m,"modelValue"),f={type:"string",required:!0,validator:(s,e)=>{if(!s)return e("Please input URL");!s.startsWith("http://")&&!s.startsWith("https://")&&e(d("page.dashboard.editModal.label.endpoint.error.invalidSchema"));try{new URL(s),e()}catch{e(d("page.dashboard.editModal.label.endpoint.error.invalidUrl"))}}};return(s,e)=>{const i=y,r=R,V=S,p=x,_=P,b=T;return h(),w(M,null,[l(r,{field:"config.endpoint",label:n(d)("page.dashboard.editModal.label.endpoint"),"validate-trigger":"blur",required:"",rules:f},{default:t(()=>[l(i,{modelValue:a.value.endpoint,"onUpdate:modelValue":e[0]||(e[0]=o=>a.value.endpoint=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),l(r,{field:"config.username",label:n(d)("page.dashboard.editModal.label.username")},{default:t(()=>[l(i,{modelValue:a.value.username,"onUpdate:modelValue":e[1]||(e[1]=o=>a.value.username=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),l(r,{field:"config.password",label:n(d)("page.dashboard.editModal.label.password")},{default:t(()=>[l(V,{modelValue:a.value.password,"onUpdate:modelValue":e[2]||(e[2]=o=>a.value.password=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),l(r,{field:"config.rpcUrl",label:"RPC URL",required:""},{default:t(()=>[l(i,{modelValue:a.value.rpcUrl,"onUpdate:modelValue":e[3]||(e[3]=o=>a.value.rpcUrl=o),"allow-clear":"",placeholder:"/transmission/rpc"},null,8,["modelValue"])]),_:1}),l(r,{field:"config.httpVersion",label:n(d)("page.dashboard.editModal.label.httpVersion")},{extra:t(()=>[u(U(n(d)("page.dashboard.editModal.label.httpVersion.description")),1)]),default:t(()=>[l(_,{modelValue:a.value.httpVersion,"onUpdate:modelValue":e[4]||(e[4]=o=>a.value.httpVersion=o)},{default:t(()=>[l(p,{value:"HTTP_1_1"},{default:t(()=>[u("1.1")]),_:1}),l(p,{value:"HTTP_2"},{default:t(()=>[u("2.0")]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),l(r,{field:"config.verifySsl","default-checked":"",label:n(d)("page.dashboard.editModal.label.verifySsl")},{default:t(()=>[l(b,{modelValue:a.value.verifySsl,"onUpdate:modelValue":e[5]||(e[5]=o=>a.value.verifySsl=o)},null,8,["modelValue"])]),_:1},8,["label"])],64)}}});export{I as default};