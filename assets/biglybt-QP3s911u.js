import"./index-BDEqivmy.js";import{e as _,a6 as V,am as c,h as b,j as v,v as e,C as o,a2 as u,y as i,N as g,F as y}from"./libs-CfNwz28r.js";import{t as h,F as k,R as M,s as S,Y as T}from"./arcoDesign-COq-vaMw.js";const q=_({__name:"biglybt",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(p){const{t:d}=V(),l=c(p,"modelValue");return(w,a)=>{const r=h,n=k,s=M,m=S,f=T;return b(),v(y,null,[e(n,{field:"config.endpoint",label:u(d)("page.dashboard.editModal.label.endpoint"),rules:[{required:!0,type:"url"}]},{default:o(()=>[e(r,{modelValue:l.value.endpoint,"onUpdate:modelValue":a[0]||(a[0]=t=>l.value.endpoint=t),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),e(n,{field:"config.token",label:"Token",required:""},{default:o(()=>[e(r,{modelValue:l.value.token,"onUpdate:modelValue":a[1]||(a[1]=t=>l.value.token=t),"allow-clear":""},null,8,["modelValue"])]),_:1}),e(n,{field:"config.httpVersion",label:u(d)("page.dashboard.editModal.label.httpVersion")},{extra:o(()=>[i(g(u(d)("page.dashboard.editModal.label.httpVersion.description")),1)]),default:o(()=>[e(m,{modelValue:l.value.httpVersion,"onUpdate:modelValue":a[2]||(a[2]=t=>l.value.httpVersion=t)},{default:o(()=>[e(s,{value:"HTTP_1_1"},{default:o(()=>[i("1.1")]),_:1}),e(s,{value:"HTTP_2_0"},{default:o(()=>[i("2.0")]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),e(n,{field:"config.verifySsl","default-checked":"",label:u(d)("page.dashboard.editModal.label.verifySsl")},{default:o(()=>[e(f,{modelValue:l.value.verifySsl,"onUpdate:modelValue":a[3]||(a[3]=t=>l.value.verifySsl=t)},null,8,["modelValue"])]),_:1},8,["label"])],64)}}});export{q as default};