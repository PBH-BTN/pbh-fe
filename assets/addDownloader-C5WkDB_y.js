const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./qbittorrent-DVPcdarm.js","./index-LAUIWOTO.js","./libs-C0Hl_kMH.js","./arcoDesign-BwLR66Jx.js","./index-OBSasn5e.css","./transmission-Jaqf-2Ee.js","./biglybt-vb3kC_zE.js","./deluge-tFyc5BOs.js"])))=>i.map(i=>d[i]);
import{C as l,_ as m}from"./index-LAUIWOTO.js";import{e as x,a6 as A,am as N,r as L,p as O,h as g,q as y,C as e,v as o,y as r,N as p,a2 as t,B as S,m as U,M as H,s as G,a8 as _}from"./libs-C0Hl_kMH.js";import{T as Q}from"./init-onoSjT2H.js";import{b as v,h as j,U as z,Q as J,R as K,r as W,F as X,s as Y,B as Z,t as $,S as ee}from"./arcoDesign-BwLR66Jx.js";const oe={href:"https://github.com/PBH-BTN/PBH-Adapter-BiglyBT"},re=x({__name:"addDownloader",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(b){const w=_(()=>m(()=>import("./qbittorrent-DVPcdarm.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url)),C=_(()=>m(()=>import("./transmission-Jaqf-2Ee.js"),__vite__mapDeps([5,1,2,3,4]),import.meta.url)),B=_(()=>m(()=>import("./biglybt-vb3kC_zE.js"),__vite__mapDeps([6,1,2,3,4]),import.meta.url)),T=_(()=>m(()=>import("./deluge-tFyc5BOs.js"),__vite__mapDeps([7,1,2,3,4]),import.meta.url)),h={[l.qBittorrent]:w,[l.Transmission]:C,[l.BiglyBT]:B,[l.Deluge]:T},{t:n}=A(),a=N(b,"modelValue"),c=L(!1),V=async()=>{c.value=!0;try{const s=await Q({name:a.value.downloaderConfig.name,config:a.value.downloaderConfig.config});if(!s.valid)throw new Error(s.message)}catch(s){return v.error(s.message),!1}finally{c.value=!1}v.success(n("page.oobe.addDownloader.test.success")),a.value.valid=!0};return(s,d)=>{const D=j,E=z,M=J,u=K,q=W,P=O("i18n-t"),f=X,R=Y,F=Z,I=$,k=ee;return g(),y(k,{direction:"vertical",style:{width:"70%"}},{default:e(()=>[o(M,{style:{"text-align":"left"}},{default:e(()=>[o(D,null,{default:e(()=>[r(p(t(n)("page.oobe.addDownloader.title")),1)]),_:1}),o(E,null,{default:e(()=>[r(p(t(n)("page.oobe.addDownloader.description")),1)]),_:1})]),_:1}),o(I,{model:a.value.downloaderConfig,"auto-label-width":""},{default:e(()=>[o(f,{field:"config.type",label:t(n)("page.dashboard.editModal.label.type"),required:""},S({default:e(()=>[o(q,{modelValue:a.value.downloaderConfig.config.type,"onUpdate:modelValue":d[0]||(d[0]=i=>a.value.downloaderConfig.config.type=i),type:"button"},{default:e(()=>[o(u,{value:t(l).qBittorrent},{default:e(()=>[r("qBittorrent")]),_:1},8,["value"]),o(u,{value:t(l).Transmission},{default:e(()=>[r("Transmission")]),_:1},8,["value"]),o(u,{value:t(l).BiglyBT},{default:e(()=>[r("BiglyBT")]),_:1},8,["value"]),o(u,{value:t(l).Deluge},{default:e(()=>[r("Deluge")]),_:1},8,["value"])]),_:1},8,["modelValue"])]),_:2},[a.value.downloaderConfig.config.type===t(l).BiglyBT?{name:"extra",fn:e(()=>[o(P,{keypath:"page.dashboard.editModal.biglybt"},{url:e(()=>[U("a",oe,p(t(n)("page.dashboard.editModal.biglybt.url")),1)]),_:1})]),key:"0"}:void 0]),1032,["label"]),o(f,{field:"name",label:t(n)("page.dashboard.editModal.label.name"),required:""},{default:e(()=>[o(R,{modelValue:a.value.downloaderConfig.name,"onUpdate:modelValue":d[1]||(d[1]=i=>a.value.downloaderConfig.name=i),"allow-clear":""},null,8,["modelValue"])]),_:1},8,["label"]),(g(),y(H(h[a.value.downloaderConfig.config.type]),{modelValue:a.value.downloaderConfig.config,"onUpdate:modelValue":d[2]||(d[2]=i=>a.value.downloaderConfig.config=i)},null,8,["modelValue"])),a.value.downloaderConfig.config.type?(g(),y(f,{key:0},{default:e(()=>[o(F,{loading:c.value,onClick:V},{default:e(()=>[r(p(t(n)("page.oobe.addDownloader.test")),1)]),_:1},8,["loading"])]),_:1})):G("",!0)]),_:1},8,["model"])]),_:1})}}});export{re as default};