import"./index-BzsUsWh9.js";import{e as U,a6 as A,am as B,r as x,h as _,j as y,v as a,C as t,a2 as u,y as r,N as m,q as S,s as R,F as k}from"./libs-tLzij8UM.js";import{s as q,F as C,ai as P,aj as T,R as F,r as I,X as N}from"./arcoDesign-DCmKwCeN.js";const W=U({__name:"qbittorrent",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(g){var f,b;const{t:d}=A(),l=B(g,"modelValue"),h={type:"string",required:!0,validator:(n,e)=>{if(n=l.value.endpoint,!n)return e("Please input URL");!n.startsWith("http://")&&!n.startsWith("https://")&&e(d("page.dashboard.editModal.label.endpoint.error.invalidSchema"));try{new URL(n),e()}catch{e(d("page.dashboard.editModal.label.endpoint.error.invalidUrl"))}}},i=x(!1);return((f=l.value)!=null&&f.basicAuth.pass||(b=l.value)!=null&&b.basicAuth.pass)&&(i.value=!0),(n,e)=>{const p=q,s=C,V=P,w=T,c=F,M=I,v=N;return _(),y(k,null,[a(s,{field:"config.endpoint",label:u(d)("page.dashboard.editModal.label.endpoint"),"validate-trigger":"blur",required:"",rules:h},{default:t(()=>[a(p,{modelValue:l.value.endpoint,"onUpdate:modelValue":e[0]||(e[0]=o=>l.value.endpoint=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),a(s,{field:"config.username",label:u(d)("page.dashboard.editModal.label.username")},{default:t(()=>[a(p,{modelValue:l.value.username,"onUpdate:modelValue":e[1]||(e[1]=o=>l.value.username=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),a(s,{field:"config.password",label:u(d)("page.dashboard.editModal.label.password")},{default:t(()=>[a(V,{modelValue:l.value.password,"onUpdate:modelValue":e[2]||(e[2]=o=>l.value.password=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),a(s,null,{default:t(()=>[a(w,{modelValue:i.value,"onUpdate:modelValue":e[3]||(e[3]=o=>i.value=o)},{default:t(()=>[r(m(u(d)("page.dashboard.editModal.label.useBasicAuth")),1)]),_:1},8,["modelValue"])]),_:1}),i.value?(_(),S(s,{key:0,"content-flex":!1},{default:t(()=>[a(s,{field:"config.basicAuth.user",label:"User"},{default:t(()=>[a(p,{modelValue:l.value.basicAuth.user,"onUpdate:modelValue":e[4]||(e[4]=o=>l.value.basicAuth.user=o)},null,8,["modelValue"])]),_:1}),a(s,{field:"config.basicAuth.pass",label:"Pass"},{default:t(()=>[a(V,{modelValue:l.value.basicAuth.pass,"onUpdate:modelValue":e[5]||(e[5]=o=>l.value.basicAuth.pass=o)},null,8,["modelValue"])]),_:1})]),_:1})):R("",!0),a(s,{field:"config.httpVersion",label:u(d)("page.dashboard.editModal.label.httpVersion")},{extra:t(()=>[r(m(u(d)("page.dashboard.editModal.label.httpVersion.description")),1)]),default:t(()=>[a(M,{modelValue:l.value.httpVersion,"onUpdate:modelValue":e[6]||(e[6]=o=>l.value.httpVersion=o)},{default:t(()=>[a(c,{value:"HTTP_1_1"},{default:t(()=>[r("1.1")]),_:1}),a(c,{value:"HTTP_2"},{default:t(()=>[r("2.0")]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),a(s,{field:"config.incrementBan","default-checked":"",label:u(d)("page.dashboard.editModal.label.incrementBan")},{extra:t(()=>[r(m(u(d)("page.dashboard.editModal.label.incrementBan.description")),1)]),default:t(()=>[a(v,{modelValue:l.value.incrementBan,"onUpdate:modelValue":e[7]||(e[7]=o=>l.value.incrementBan=o)},null,8,["modelValue"])]),_:1},8,["label"]),a(s,{field:"config.verifySsl","default-checked":"",label:u(d)("page.dashboard.editModal.label.verifySsl")},{default:t(()=>[a(v,{modelValue:l.value.verifySsl,"onUpdate:modelValue":e[8]||(e[8]=o=>l.value.verifySsl=o)},null,8,["modelValue"])]),_:1},8,["label"])],64)}}});export{W as default};
