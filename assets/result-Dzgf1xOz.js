import{u as h}from"./index-CPSKlt_k.js";import{I as B}from"./init-BuBP2O0B.js";import{e as C,a6 as S,am as V,r as p,h as l,q as m,a2 as a,j as w,C as e,y as r,N as u,v as i}from"./libs-tLzij8UM.js";import{J as I,B as M,S as N,ac as q}from"./arcoDesign-DCmKwCeN.js";const E={key:1},H=C({__name:"result",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(k){const{t}=S(),s=V(k,"modelValue"),n=p(!0),d=p(!1),c=p(""),{setAuthToken:b}=h(),f=()=>{n.value=!0,B({token:s.value.token,downloader:{name:s.value.downloaderConfig.name,config:s.value.downloaderConfig.config}}).then(o=>{o.code===200||o.code===201?(d.value=!0,b(s.value.token)):c.value=o.message,n.value=!1}).catch(o=>{c.value=o.message,n.value=!1})};return f(),(o,_)=>{const x=I,g=M,v=N,y=q;return n.value?(l(),m(x,{key:0,style:{"margin-top":"200px"},tip:a(t)("page.oobe.result.initlizing")},null,8,["tip"])):(l(),w("div",E,[d.value?(l(),m(y,{key:0,status:"success",title:a(t)("page.oobe.result.title"),style:{"margin-top":"200px"}},{subtitle:e(()=>[r(u(a(t)("page.oobe.result.description")),1)]),extra:e(()=>[i(v,null,{default:e(()=>[i(g,{type:"primary",href:"/"},{default:e(()=>[r(u(a(t)("page.oobe.result.goto")),1)]),_:1})]),_:1})]),_:1},8,["title"])):(l(),m(y,{key:1,status:"error",title:a(t)("page.oobe.result.title.error"),style:{"margin-top":"200px"}},{subtitle:e(()=>[r(u(c.value),1)]),extra:e(()=>[i(v,null,{default:e(()=>[i(g,{type:"primary",onClick:_[0]||(_[0]=T=>f())},{default:e(()=>[r(u(a(t)("page.oobe.result.retry")),1)]),_:1})]),_:1})]),_:1},8,["title"]))]))}}});export{H as default};
