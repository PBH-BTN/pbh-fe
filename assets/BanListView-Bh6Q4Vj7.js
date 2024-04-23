import{r as M,i as E,c as x,d as D,t as _e,g as le,a as he,b as be,o as ye,e as Pe,f as t,S as ge,m as F,F as Se,h as $e,j as ue,G,k as U,_ as Ce,l as C,n as B,p as j,q as ee,s as T,u as m,v as b,w as we,x as Ie,y as Le,z as xe,A as ze,B as Me,C as q,D as c,E as Be,H as de,I as te,T as ke,J as Re,K as je,L as ve,M as Te,N as De,O as He,P as Oe,Q as Ve,R as Ae}from"./index-BzyCEq1u.js";import{u as Ne,a as Ee,S as Fe,P as Ge,V as Ue,E as qe}from"./index-B9v374vr.js";import{f as pe,I as Ke,a as Ye}from"./file-TzwT7Q1L.js";const Je=(e,{emit:r})=>{var a,v;const n=M(E(e.paginationProps)&&(a=e.paginationProps.defaultCurrent)!=null?a:1),o=M(E(e.paginationProps)&&(v=e.paginationProps.defaultPageSize)!=null?v:10),$=x(()=>{var f;return E(e.paginationProps)&&(f=e.paginationProps.current)!=null?f:n.value}),w=x(()=>{var f;return E(e.paginationProps)&&(f=e.paginationProps.pageSize)!=null?f:o.value});return{current:$,pageSize:w,handlePageChange:f=>{n.value=f,r("pageChange",f)},handlePageSizeChange:f=>{o.value=f,r("pageSizeChange",f)}}};function fe(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!U(e)}var ae=D({name:"List",props:{data:{type:Array},size:{type:String,default:"medium"},bordered:{type:Boolean,default:!0},split:{type:Boolean,default:!0},loading:{type:Boolean,default:!1},hoverable:{type:Boolean,default:!1},paginationProps:{type:Object},gridProps:{type:Object},maxHeight:{type:[String,Number],default:0},bottomOffset:{type:Number,default:0},virtualListProps:{type:Object},scrollbar:{type:[Object,Boolean],default:!0}},emits:{scroll:()=>!0,reachBottom:()=>!0,pageChange:e=>!0,pageSizeChange:e=>!0},setup(e,{emit:r,slots:a}){const{scrollbar:v}=_e(e),n=le("list"),o=he(be,void 0),{componentRef:$,elementRef:w}=Ne("containerRef"),i=x(()=>e.virtualListProps),{displayScrollbar:H,scrollbarProps:f}=Ee(v);let O=0;const k=l=>{const{scrollTop:u,scrollHeight:p,offsetHeight:g}=l.target,d=Math.floor(p-(u+g));u>O&&d<=e.bottomOffset&&r("reachBottom"),r("scroll"),O=u};ye(()=>{if(w.value){const{scrollTop:l,scrollHeight:u,offsetHeight:p}=w.value;u<=l+p&&r("reachBottom")}});const{current:y,pageSize:s,handlePageChange:_,handlePageSizeChange:S}=Je(e,{emit:r}),P=l=>{if(!e.paginationProps)return l;if(e.paginationProps&&l.length>s.value){const u=(y.value-1)*s.value;return l.slice(u,u+s.value)}return l},R=l=>{let u;if(!e.gridProps)return null;const p=P(l);if(e.gridProps.span){const g=[],d=24/e.gridProps.span;for(let L=0;L<p.length;L+=d){let X;const me=L+d,oe=Math.floor(L/d);g.push(t(G.Row,{key:oe,class:`${n}-row`,gutter:e.gridProps.gutter},fe(X=p.slice(L,me).map((Z,se)=>{var ie;return t(G.Col,{key:`${oe}-${se}`,class:`${n}-col`,span:(ie=e.gridProps)==null?void 0:ie.span},{default:()=>{var ce;return[U(Z)?Z:(ce=a.item)==null?void 0:ce.call(a,{item:Z,index:se})]}})}))?X:{default:()=>[X]}))}return g}return t(G.Row,{class:`${n}-row`,gutter:e.gridProps.gutter},fe(u=p.map((g,d)=>t(G.Col,F({key:d,class:`${n}-col`},ue(e.gridProps,["gutter"])),{default:()=>{var L;return[U(g)?g:(L=a.item)==null?void 0:L.call(a,{item:g,index:d})]}})))?u:{default:()=>[u]})},I=l=>P(l).map((p,g)=>{var d;return U(p)?p:(d=a.item)==null?void 0:d.call(a,{item:p,index:g})}),Y=()=>{const l=a.default?$e(a.default()):e.data;return l&&l.length>0?e.gridProps?R(l):I(l):re()},J=()=>{if(!e.paginationProps)return null;const l=ue(e.paginationProps,["current","pageSize","defaultCurrent","defaultPageSize"]);return t(Ge,F({class:`${n}-pagination`},l,{current:y.value,pageSize:s.value,onChange:_,onPageSizeChange:S}),null)},Q=x(()=>[n,`${n}-${e.size}`,{[`${n}-bordered`]:e.bordered,[`${n}-split`]:e.split,[`${n}-hover`]:e.hoverable}]),W=x(()=>{if(e.maxHeight)return{maxHeight:Pe(e.maxHeight)?`${e.maxHeight}px`:e.maxHeight,overflowY:"auto"}}),V=x(()=>[`${n}-content`,{[`${n}-virtual`]:i.value}]),A=M(),h=()=>{var l;const u=P((l=e.data)!=null?l:[]);return u.length?t(Ue,F({ref:A,class:V.value,data:u},e.virtualListProps,{onScroll:k}),{item:({item:p,index:g})=>{var d;return(d=a.item)==null?void 0:d.call(a,{item:p,index:g})}}):re()},N=()=>a["scroll-loading"]?t("div",{class:[`${n}-item`,`${n}-scroll-loading`]},[a["scroll-loading"]()]):null,re=()=>{var l,u,p,g,d;return a["scroll-loading"]?null:(d=(g=(l=a.empty)==null?void 0:l.call(a))!=null?g:(p=o==null?void 0:(u=o.slots).empty)==null?void 0:p.call(u,{component:"list"}))!=null?d:t(qe,null,null)};return{virtualListRef:A,render:()=>{const l=H.value?Fe:"div";return t("div",{class:`${n}-wrapper`},[t(ge,{class:`${n}-spin`,loading:e.loading},{default:()=>[t(l,F({ref:$,class:Q.value,style:W.value},f.value,{onScroll:k}),{default:()=>[t("div",{class:`${n}-content-wrapper`},[a.header&&t("div",{class:`${n}-header`},[a.header()]),i.value&&!e.gridProps?t(Se,null,[h(),N()]):t("div",{role:"list",class:V.value},[Y(),N()]),a.footer&&t("div",{class:`${n}-footer`},[a.footer()])])]}),J()]})])}}},methods:{scrollIntoView(e){this.virtualListRef&&this.virtualListRef.scrollTo(e)}},render(){return this.render()}}),K=D({name:"ListItem",props:{actionLayout:{type:String,default:"horizontal"}},setup(e,{slots:r}){const a=le("list-item"),v=()=>{var n;const o=(n=r.actions)==null?void 0:n.call(r);return!o||!o.length?null:t("ul",{class:`${a}-action`},[o.map(($,w)=>t("li",{key:`${a}-action-${w}`},[$]))])};return()=>{var n,o;return t("div",{role:"listitem",class:a},[t("div",{class:`${a}-main`},[(n=r.meta)==null?void 0:n.call(r),t("div",{class:`${a}-content`},[(o=r.default)==null?void 0:o.call(r)]),e.actionLayout==="vertical"&&v()]),e.actionLayout==="horizontal"&&v(),r.extra&&t("div",{class:`${a}-extra`},[r.extra()])])}}});const Qe=D({name:"ListItemMeta",props:{title:String,description:String},setup(e,{slots:r}){const a=le("list-item-meta"),v=!!(e.title||e.description||r.title||r.description);return{prefixCls:a,hasContent:v}}});function We(e,r,a,v,n,o){return C(),B("div",{class:j(e.prefixCls)},[e.$slots.avatar?(C(),B("div",{key:0,class:j(`${e.prefixCls}-avatar`)},[ee(e.$slots,"avatar")],2)):T("v-if",!0),e.hasContent?(C(),B("div",{key:1,class:j(`${e.prefixCls}-content`)},[e.$slots.title||e.title?(C(),B("div",{key:0,class:j(`${e.prefixCls}-title`)},[ee(e.$slots,"title",{},()=>[m(b(e.title),1)])],2)):T("v-if",!0),e.$slots.description||e.description?(C(),B("div",{key:1,class:j(`${e.prefixCls}-description`)},[ee(e.$slots,"description",{},()=>[m(b(e.description),1)])],2)):T("v-if",!0)],2)):T("v-if",!0)],2)}var ne=Ce(Qe,[["render",We]]);const Xe=Object.assign(ae,{Item:Object.assign(K,{Meta:ne}),install:(e,r)=>{we(e,r);const a=Ie(r);e.component(a+ae.name,ae),e.component(a+K.name,K),e.component(a+ne.name,ne)}}),Ze=e=>(He("data-v-0cc57ea1"),e=e(),Oe(),e),et=Ze(()=>Ve("br",null,null,-1)),tt={key:0,style:{position:"absolute",transform:"translateY(-50%)"}},z=5,at=D({__name:"banList",setup(e){const r=M(),a=Le(),v=xe(),n=M(!1),o=M(5),$=M(!1);async function w(){var y;if(!i.value)return te({limit:z});if(i.value.length>o.value-z){const s=[];let _=!1;for(;s.length<o.value&&!_;){const S=await te({limit:z,lastBanTime:(y=s[s.length-1])==null?void 0:y.banMetadata.banAt});for(const P of S)if(P.banMetadata.randomId!==i.value[0].banMetadata.randomId)s.push(P);else{_=!0;break}}return _?(o.value=i.value.length+s.length,s.concat(i.value)):s}return i.value}const{data:i,refresh:H}=ze(w,{pollingInterval:x(()=>a.pollingInterval),onSuccess:a.renewLastUpdate}),f=y=>{var s,_;if(y){const S=(s=i.value)==null?void 0:s.map(P=>P.address).findIndex(P=>P.includes(y));S!==-1&&((_=r.value)==null||_.scrollIntoView({index:S,align:"auto"}))}},O=async()=>{var y;if(i.value){if(o.value=i.value.length+z,$.value=!0,n.value=!1,i.value.length<=o.value){const s=[];for(;s.length+i.value.length<o.value;){const _=await te({limit:z,lastBanTime:(y=s[s.length-1]||i.value[i.value.length-1])==null?void 0:y.banMetadata.banAt});_.length<z&&(n.value=!0),s.push(..._)}i.value=i.value.concat(s)}setTimeout(()=>{$.value=!1},n.value?1e3:0)}};Me(()=>v.endpoint,()=>{o.value=z,i.value=void 0,H()},{immediate:!0});const k=x(()=>i.value??[]);return(y,s)=>{const _=ke,S=Re,P=je,R=ve,I=Te,Y=Ke,J=Ye,Q=De,W=K,V=ge,A=Xe;return C(),q(R,{direction:"vertical",fill:""},{default:c(()=>[t(_,{heading:3},{default:c(()=>[m("封禁名单")]),_:1}),et,t(R,{class:"list-header",wrap:""},{default:c(()=>[t(S,null,{default:c(()=>[m("以下是封禁列表（按时间倒序排列）")]),_:1}),t(P,{style:{width:"250px"},placeholder:"搜索 IP 地址",onSearch:f,"allow-clear":"","search-button":""})]),_:1}),t(A,{virtualListProps:{height:500},ref_key:"banlist",ref:r,onReachBottom:O,scrollbar:!1,data:k.value},{item:c(({item:h,index:N})=>[t(W,{style:Be({marginBottom:N===k.value.length-1&&$.value?"50px":void 0})},{default:c(()=>[t(Q,{column:{xs:1,md:2,xl:3}},{title:c(()=>[t(R,{wrap:""},{default:c(()=>[t(S,{bold:"",copyable:""},{default:c(()=>[m(b(h.banMetadata.peer.address.ip)+":"+b(h.banMetadata.peer.address.port),1)]),_:2},1024),t(S,{code:""},{default:c(()=>[m(b(h.banMetadata.peer.clientName),1)]),_:2},1024)]),_:2},1024)]),default:c(()=>[t(I,{label:"反向 DNS 解析",span:1},{default:c(()=>[m(b(h.banMetadata.reverseLookup),1)]),_:2},1024),t(I,{label:"封禁时间",span:1},{default:c(()=>[m(b(new Date(h.banMetadata.banAt).toLocaleString("zh-cn")),1)]),_:2},1024),t(I,{label:"预计解封时间",span:1},{default:c(()=>[m(b(new Date(h.banMetadata.unbanAt).toLocaleString("zh-cn")),1)]),_:2},1024),t(I,{label:"发现位置",span:2},{default:c(()=>[m(b(h.banMetadata.torrent.name),1)]),_:2},1024),t(I,{label:"封禁快照",span:1},{default:c(()=>[t(Y,{class:"green"}),m(" "+b(de(pe)(h.banMetadata.peer.uploaded))+" ",1),t(J,{class:"red"}),m(" "+b(de(pe)(h.banMetadata.peer.downloaded))+" - "+b((h.banMetadata.peer.progress*100).toFixed(2))+"% ",1)]),_:2},1024),t(I,{label:"封禁原因",span:3},{default:c(()=>[m(b(h.banMetadata.description),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["style"])]),"scroll-loading":c(()=>[$.value?(C(),B("div",tt,[n.value?(C(),q(S,{key:0},{default:c(()=>[m("已经到底啦！")]),_:1})):(C(),q(V,{key:1}))])):T("",!0)]),_:1},8,["data"])]),_:1})}}}),nt=Ae(at,[["__scopeId","data-v-0cc57ea1"]]),it=D({__name:"BanListView",setup(e){return(r,a)=>{const v=ve;return C(),q(v,{direction:"vertical",fill:""},{default:c(()=>[t(nt)]),_:1})}}});export{it as default};
