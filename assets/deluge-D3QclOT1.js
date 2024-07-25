import"./index-DF4D1ORJ.js";import{e as g,a6 as v,am as h,h as w,j as U,v as l,C as d,a2 as n,y as s,N as f,F as M}from"./libs-tLzij8UM.js";import{s as y,F as R,ai as B,X as S,R as x,r as q}from"./arcoDesign-DCmKwCeN.js";const F=g({__name:"deluge",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(V){const{t}=v(),a=h(V,"modelValue"),_={type:"string",required:!0,validator:(r,e)=>{if(r=a.value.endpoint,!r)return e("Please input URL");!r.startsWith("http://")&&!r.startsWith("https://")&&e(t("page.dashboard.editModal.label.endpoint.error.invalidSchema"));try{new URL(r),e()}catch{e(t("page.dashboard.editModal.label.endpoint.error.invalidUrl"))}}};return(r,e)=>{const u=y,i=R,b=B,p=S,m=x,c=q;return w(),U(M,null,[l(i,{field:"config.endpoint",label:n(t)("page.dashboard.editModal.label.endpoint"),"validate-trigger":"blur",required:"",rules:_},{default:d(()=>[l(u,{modelValue:a.value.endpoint,"onUpdate:modelValue":e[0]||(e[0]=o=>a.value.endpoint=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),l(i,{field:"config.password",label:n(t)("page.dashboard.editModal.label.password"),required:""},{default:d(()=>[l(b,{modelValue:a.value.password,"onUpdate:modelValue":e[1]||(e[1]=o=>a.value.password=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),l(i,{field:"config.rpcUrl",label:"RPC URL",required:""},{default:d(()=>[l(u,{modelValue:a.value.rpcUrl,"onUpdate:modelValue":e[2]||(e[2]=o=>a.value.rpcUrl=o),"allow-clear":"",placeholder:"/json"},null,8,["modelValue"])]),_:1}),l(i,{field:"config.incrementBan","default-checked":"",label:n(t)("page.dashboard.editModal.label.incrementBan")},{extra:d(()=>[s(f(n(t)("page.dashboard.editModal.label.incrementBan.description")),1)]),default:d(()=>[l(p,{modelValue:a.value.incrementBan,"onUpdate:modelValue":e[3]||(e[3]=o=>a.value.incrementBan=o)},null,8,["modelValue"])]),_:1},8,["label"]),l(i,{field:"config.httpVersion",label:n(t)("page.dashboard.editModal.label.httpVersion")},{extra:d(()=>[s(f(n(t)("page.dashboard.editModal.label.httpVersion.description")),1)]),default:d(()=>[l(c,{modelValue:a.value.httpVersion,"onUpdate:modelValue":e[4]||(e[4]=o=>a.value.httpVersion=o)},{default:d(()=>[l(m,{value:"HTTP_1_1"},{default:d(()=>[s("1.1")]),_:1}),l(m,{value:"HTTP_2"},{default:d(()=>[s("2.0")]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),l(i,{field:"config.verifySsl","default-checked":"",label:n(t)("page.dashboard.editModal.label.verifySsl")},{default:d(()=>[l(p,{modelValue:a.value.verifySsl,"onUpdate:modelValue":e[5]||(e[5]=o=>a.value.verifySsl=o)},null,8,["modelValue"])]),_:1},8,["label"])],64)}}});export{F as default};
