import{d as U,e as C}from"./index-okGCfjWd.js";import{f as O,a6 as P,r as f,c as T,ad as k,w as D,j as K,s as B,D as t,x as n,a2 as a,z as i,O as d}from"./libs-CPdh8xC_.js";import{v as V,T as j,m as G,f as q}from"./arcoDesign-CD4eothr.js";var l=(u=>(u.AUTO="AUTO",u.MANUAL="MANUAL",u))(l||{});const J=O({__name:"logModal",setup(u,{expose:v}){const{t:o,d:y}=P(),r=f(!1);v({showModal:()=>{r.value=!0}});const S=[{title:"ID",slotName:"ruleId"},{title:()=>o("page.rule_management.ruleSubscribe.updateLog.updateTime"),slotName:"updateTime"},{title:()=>o("page.rule_management.ruleSubscribe.updateLog.ruleCount"),dataIndex:"count"},{title:()=>o("page.rule_management.ruleSubscribe.updateLog.updateType"),slotName:"updateType"}],s=f(!0),L={[l.MANUAL]:"page.rule_management.ruleSubscribe.updateLog.updateType.manual",[l.AUTO]:"page.rule_management.ruleSubscribe.updateLog.updateType.auto"},A=T(()=>s.value||w.value||!c.value),{data:h,total:x,current:g,loading:w,pageSize:m,changeCurrent:z}=k(U,{defaultParams:[{pageIndex:1,pageSize:5}],pagination:{currentKey:"pageIndex",pageSizeKey:"pageSize",totalKey:"total"},onAfter:()=>{s.value=!1}});D([m,g],()=>{s.value=!0});const c=T(()=>{var p;return(p=h.value)==null?void 0:p.results});return(p,_)=>{const b=V,I=j,M=G,N=q;return K(),B(N,{visible:r.value,"onUpdate:visible":_[0]||(_[0]=e=>r.value=e),title:a(o)("page.rule_management.ruleSubscribe.updateLog"),unmountOnClose:"",width:"auto","modal-style":{width:"35vw"}},{default:t(()=>[n(M,{stripe:!0,columns:S,data:c.value,loading:A.value,pagination:{total:a(x),current:a(g),pageSize:a(m),showPageSize:!0,baseSize:4,bufferSize:1},size:"medium",onPageChange:a(z),class:"banlog-table"},{ruleId:t(({record:e})=>[n(b,{color:a(C)(e.ruleId)},{default:t(()=>[i(d(e.ruleId),1)]),_:2},1032,["color"])]),updateTime:t(({record:e})=>[n(I,null,{default:t(()=>[i(d(a(y)(e.updateTime,"long")),1)]),_:2},1024)]),updateType:t(({record:e})=>[n(b,{color:e.updateType===a(l).MANUAL?"green":"blue"},{default:t(()=>[i(d(a(o)(L[e.updateType]??"page.rule_management.ruleSubscribe.updateLog.updateType.unknown")),1)]),_:2},1032,["color"])]),_:1},8,["data","loading","pagination","onPageChange"])]),_:1},8,["visible","title"])}}});export{J as default};
