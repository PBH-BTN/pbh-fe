import"./index-GrCLRWCM.js";import{e as _,a7 as b,an as c,h as v,j as g,v as e,C as d,a2 as s,y as r,N as w,F as U}from"./libs-C-CmtbE_.js";import{t as M,F as y,a6 as h,R as S,s as x,Y as R}from"./arcoDesign-B9B8WxT9.js";const P=_({__name:"transmission",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(p){const{t}=b(),l=c(p,"modelValue");return(T,a)=>{const u=M,n=y,m=h,i=S,f=x,V=R;return v(),g(U,null,[e(n,{field:"config.endpoint",label:s(t)("page.dashboard.editModal.label.endpoint"),rules:[{required:!0,type:"url"}]},{default:d(()=>[e(u,{modelValue:l.value.endpoint,"onUpdate:modelValue":a[0]||(a[0]=o=>l.value.endpoint=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),e(n,{field:"config.username",label:s(t)("page.dashboard.editModal.label.username")},{default:d(()=>[e(u,{modelValue:l.value.username,"onUpdate:modelValue":a[1]||(a[1]=o=>l.value.username=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),e(n,{field:"config.password",label:s(t)("page.dashboard.editModal.label.password")},{default:d(()=>[e(m,{modelValue:l.value.password,"onUpdate:modelValue":a[2]||(a[2]=o=>l.value.password=o),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),e(n,{field:"config.rpcUrl",label:"RPC URL",required:""},{default:d(()=>[e(u,{modelValue:l.value.rpcUrl,"onUpdate:modelValue":a[3]||(a[3]=o=>l.value.rpcUrl=o),"allow-clear":"",placeholder:"/transmission/rpc"},null,8,["modelValue"])]),_:1}),e(n,{field:"config.httpVersion",label:s(t)("page.dashboard.editModal.label.httpVersion")},{extra:d(()=>[r(w(s(t)("page.dashboard.editModal.label.httpVersion.description")),1)]),default:d(()=>[e(f,{modelValue:l.value.httpVersion,"onUpdate:modelValue":a[4]||(a[4]=o=>l.value.httpVersion=o)},{default:d(()=>[e(i,{value:"HTTP_1_1"},{default:d(()=>[r("1.1")]),_:1}),e(i,{value:"HTTP_2_0"},{default:d(()=>[r("2.0")]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),e(n,{field:"config.verifySsl","default-checked":"",label:s(t)("page.dashboard.editModal.label.verifySsl")},{default:d(()=>[e(V,{modelValue:l.value.verifySsl,"onUpdate:modelValue":a[5]||(a[5]=o=>l.value.verifySsl=o)},null,8,["modelValue"])]),_:1},8,["label"])],64)}}});export{P as default};