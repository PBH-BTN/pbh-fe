import"./index-DZtU96WP.js";import{e as w,a4 as M,am as A,r as B,h as _,j as U,v as e,C as t,a6 as s,y as n,N as m,q as x,s as k,F as y}from"./libs-B3srDuu6.js";import{t as S,F as C,a6 as T,a7 as q,R as F,s as I,Y as N}from"./arcoDesign-C3_vwE-o.js";const D=w({__name:"qbittorrent",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(v){var p,f;const{t:u}=M(),a=A(v,"modelValue"),r=B(!1);return((p=a.value)!=null&&p.basicAuth.pass||(f=a.value)!=null&&f.basicAuth.pass)&&(r.value=!0),(P,l)=>{const i=S,d=C,b=T,g=q,V=F,h=I,c=N;return _(),U(y,null,[e(d,{field:"config.endpoint",label:s(u)("page.dashboard.editModal.label.endpoint"),rules:[{required:!0,type:"url"}]},{default:t(()=>[e(i,{modelValue:a.value.endpoint,"onUpdate:modelValue":l[0]||(l[0]=o=>a.value.endpoint=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),e(d,{field:"config.username",label:s(u)("page.dashboard.editModal.label.username")},{default:t(()=>[e(i,{modelValue:a.value.username,"onUpdate:modelValue":l[1]||(l[1]=o=>a.value.username=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),e(d,{field:"config.password",label:s(u)("page.dashboard.editModal.label.password")},{default:t(()=>[e(b,{modelValue:a.value.password,"onUpdate:modelValue":l[2]||(l[2]=o=>a.value.password=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),e(d,null,{default:t(()=>[e(g,{modelValue:r.value,"onUpdate:modelValue":l[3]||(l[3]=o=>r.value=o)},{default:t(()=>[n(m(s(u)("page.dashboard.editModal.label.useBasicAuth")),1)]),_:1},8,["modelValue"])]),_:1}),r.value?(_(),x(d,{key:0,"content-flex":!1},{default:t(()=>[e(d,{field:"config.basicAuth.user",label:"User"},{default:t(()=>[e(i,{modelValue:a.value.basicAuth.user,"onUpdate:modelValue":l[4]||(l[4]=o=>a.value.basicAuth.user=o)},null,8,["modelValue"])]),_:1}),e(d,{field:"config.basicAuth.pass",label:"Pass"},{default:t(()=>[e(b,{modelValue:a.value.basicAuth.pass,"onUpdate:modelValue":l[5]||(l[5]=o=>a.value.basicAuth.pass=o)},null,8,["modelValue"])]),_:1})]),_:1})):k("",!0),e(d,{field:"config.httpVersion",label:s(u)("page.dashboard.editModal.label.httpVersion")},{extra:t(()=>[n(m(s(u)("page.dashboard.editModal.label.httpVersion.description")),1)]),default:t(()=>[e(h,{modelValue:a.value.httpVersion,"onUpdate:modelValue":l[6]||(l[6]=o=>a.value.httpVersion=o)},{default:t(()=>[e(V,{value:"HTTP_1_1"},{default:t(()=>[n("1.1")]),_:1}),e(V,{value:"HTTP_2_0"},{default:t(()=>[n("2.0")]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),e(d,{field:"config.incrementBan","default-checked":"",label:s(u)("page.dashboard.editModal.label.incrementBan")},{extra:t(()=>[n(m(s(u)("page.dashboard.editModal.label.incrementBan.description")),1)]),default:t(()=>[e(c,{modelValue:a.value.incrementBan,"onUpdate:modelValue":l[7]||(l[7]=o=>a.value.incrementBan=o)},null,8,["modelValue"])]),_:1},8,["label"]),e(d,{field:"config.verifySsl","default-checked":"",label:s(u)("page.dashboard.editModal.label.verifySsl")},{default:t(()=>[e(c,{modelValue:a.value.verifySsl,"onUpdate:modelValue":l[8]||(l[8]=o=>a.value.verifySsl=o)},null,8,["modelValue"])]),_:1},8,["label"])],64)}}});export{D as default};
